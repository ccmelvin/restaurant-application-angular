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
export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id);
    console.log('Fetching restaurant with ID:', id);
    
    const dbData = readDbFile();
    
    const restaurant = dbData.posts.find((post) => post.id === id);
    
    if (!restaurant) {
      return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 });
    }
    
    return NextResponse.json(restaurant);
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch restaurant: ' + (error instanceof Error ? error.message : String(error)) 
    }, { status: 500 });
  }
}

// Named export for PUT method
export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id);
    const data = await request.json();
    console.log('Updating restaurant with ID:', id, data);
    
    const dbData = readDbFile();
    
    const index = dbData.posts.findIndex((post) => post.id === id);
    
    if (index === -1) {
      return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 });
    }
    
    const updatedRestaurant = { ...dbData.posts[index], ...data, id };
    dbData.posts[index] = updatedRestaurant;
    
    writeDbFile(dbData);
    
    return NextResponse.json(updatedRestaurant);
  } catch (error) {
    console.error('Error updating restaurant:', error);
    return NextResponse.json({ 
      error: 'Failed to update restaurant: ' + (error instanceof Error ? error.message : String(error)) 
    }, { status: 500 });
  }
}

// Named export for DELETE method
export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    console.log('Deleting restaurant with ID:', id);
    
    const dbData = readDbFile();
    
    const index = dbData.posts.findIndex((post) => post.id === id);
    
    if (index === -1) {
      return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 });
    }
    
    dbData.posts.splice(index, 1);
    
    writeDbFile(dbData);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    return NextResponse.json({ 
      error: 'Failed to delete restaurant: ' + (error instanceof Error ? error.message : String(error)) 
    }, { status: 500 });
  }
}