import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Helper function to read the db.json file
function readDbFile() {
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
function writeDbFile(data) {
  try {
    const dbPath = path.join(process.cwd(), 'db.json');
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    console.log('Successfully wrote to db.json');
  } catch (error) {
    console.error('Error writing to db.json:', error);
    throw error;
  }
}

// Named export for GET method
export async function GET() {
  try {
    const dbData = readDbFile();
    return NextResponse.json(dbData.posts);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch restaurants: ' + (error instanceof Error ? error.message : String(error)) 
    }, { status: 500 });
  }
}

// Named export for POST method
export async function POST(request) {
  try {
    const data = await request.json();
    console.log('Creating restaurant:', data);
    
    const dbData = readDbFile();
    
    // Generate a new ID
    const newId = dbData.posts.length > 0 
      ? Math.max(...dbData.posts.map((post) => post.id)) + 1 
      : 1;
    
    const newRestaurant = { id: newId, ...data };
    dbData.posts.push(newRestaurant);
    
    writeDbFile(dbData);
    
    return NextResponse.json(newRestaurant, { status: 201 });
  } catch (error) {
    console.error('Error creating restaurant:', error);
    return NextResponse.json({ 
      error: 'Failed to create restaurant: ' + (error instanceof Error ? error.message : String(error)) 
    }, { status: 500 });
  }
}