import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define user interface
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  [key: string]: string | number | undefined;
}

// Define post interface
interface Post {
  id: number;
  title: string;
  content: string;
  [key: string]: string | number;
}

// Define comment interface
interface Comment {
  id: number;
  postId: number;
  content: string;
  [key: string]: string | number;
}

// Define database structure
interface DbData {
  posts: Post[];
  signup: User[];
  comments: Comment[];
  profile: {
    name: string;
    [key: string]: string;
  };
}

// Helper function to read the db.json file
function readDbFile(): DbData {
  try {
    const dbPath = path.join(process.cwd(), 'db.json');
    console.log('Reading DB file from:', dbPath);
    const fileContent = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading db.json:', error);
    // Return a default structure if file doesn't exist
    return { posts: [], signup: [], comments: [], profile: { name: "typicode" } };
  }
}

// Helper function to write to the db.json file
function writeDbFile(data: DbData): void {
  try {
    const dbPath = path.join(process.cwd(), 'db.json');
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    console.log('Successfully wrote to db.json');
  } catch (error) {
    console.error('Error writing to db.json:', error);
    throw error;
  }
}

// Named export for POST method
export async function POST(request: Request) {
  try {
    const userData = await request.json();
    console.log('Received signup data:', userData);

    const dbData = readDbFile();

    // Check if email already exists
    const existingUser = dbData.signup.find((user: User) => user.email === userData.email);
    if (existingUser) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
    }

    // Generate a new ID
    const newId = dbData.signup.length > 0
      ? Math.max(...dbData.signup.map((user: User) => user.id)) + 1
      : 1;

    const newUser = { ...userData, id: newId } as User;
    dbData.signup.push(newUser);

    writeDbFile(dbData);

    // Return user data without password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: userPassword, ...userWithoutPassword } = newUser;

    return NextResponse.json({
      user: userWithoutPassword,
      message: 'Signup successful'
    }, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({
      error: 'Signup failed: ' + (error instanceof Error ? error.message : String(error))
    }, { status: 500 });
  }
}