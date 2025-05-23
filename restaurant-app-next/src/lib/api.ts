import { Restaurant, User } from './types';

// Restaurant API functions
export async function getRestaurants(): Promise<Restaurant[]> {
  const res = await fetch('/api/restaurants');
  return res.json();
}

export async function addRestaurant(data: Restaurant): Promise<Restaurant> {
  const res = await fetch('/api/restaurants', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function updateRestaurant(id: number, data: Restaurant): Promise<Restaurant> {
  const res = await fetch(`/api/restaurants/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteRestaurant(id: number): Promise<void> {
  await fetch(`/api/restaurants/${id}`, {
    method: 'DELETE'
  });
}

// Auth API functions
export async function login(email: string, password: string) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

export async function signup(userData: User) {
  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return res.json();
}