import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { NextRequest } from 'next/server';

// Define user interface
interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  [key: string]: string | undefined; 
}

// Define user without password
type UserWithoutPassword = Omit<User, 'password'> & { password?: never };

// Define post interface
interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  [key: string]: string;
}

// Define comment interface
interface Comment {
  id: string;
  postId: string;
  content: string;
  authorId: string;
  [key: string]: string;
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

// Named export for POST method
export async function POST(request: NextRequest) {
  try {
    const { email, password }: { email: string; password: string } = await request.json();
    console.log('Login attempt for:', email);

    const dbData = readDbFile();

    // Find user with matching email and password
    const user = dbData.signup.find((user) =>
      user.email === email && user.password === password
    );

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Create a copy of user without the password using object destructuring
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: userPassword, ...userWithoutPassword } = user;

    return NextResponse.json({
      user: userWithoutPassword as UserWithoutPassword,
      message: `${user.name} logged in successfully`
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({
      error: 'Login failed: ' + (error instanceof Error ? error.message : String(error))
    }, { status: 500 });
  }
}
