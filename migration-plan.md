# Migration Plan: Angular Restaurant App to Next.js with Tailwind CSS

## 1. Setup Next.js Project

```bash
npx create-next-app@latest restaurant-app-next
```

Select the following options:

- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- App Router: Yes
- Import alias: Yes (use @/ as the prefix)

## 2. Data Structure Migration

Create a data layer that mimics your current JSON server setup:

1. Install required packages:

```bash
npm install json-server
```

1. Keep your existing `db.json` file

## 3. Component Structure

Create the following directory structure:

``` bash
/app
  /page.tsx (Home/Login page)
  /signup/page.tsx
  /restaurants/page.tsx
/components
  /auth
    LoginForm.tsx
    SignupForm.tsx
  /restaurant
    RestaurantForm.tsx
    RestaurantList.tsx
    RestaurantCard.tsx
/lib
  /api.ts (API service functions)
  /types.ts (TypeScript interfaces)
```

## 4. API Routes Implementation

Create API routes in `/app/api`:

```bash
/app/api
  /auth
    /login/route.ts
    /signup/route.ts
  /restaurants
    /route.ts (GET, POST)
    /[id]/route.ts (GET, PUT, DELETE)
```

## 5. Authentication Implementation

1. Install authentication packages:

```bash
npm install next-auth
```

1. Configure Next-Auth in `/app/api/auth/[...nextauth]/route.ts`

## 6. UI Migration with Tailwind

1. Create reusable UI components with Tailwind classes
2. Implement responsive design using Tailwind's utility classes

## 7. State Management

1. Use React Context or a lightweight state management solution:

```bash
npm install zustand
```

## 8. Migration Steps

1. Start with core data models and types
2. Implement API routes
3. Create authentication flow
4. Build UI components
5. Connect components to API
6. Add form validation
7. Implement routing and navigation
8. Add error handling and loading states

## 9. Testing

1. Install testing libraries:

```bash
npm install jest @testing-library/react @testing-library/jest-dom
```

1. Configure Jest in `jest.config.js`

## 10. Deployment

1. Configure environment variables
2. Choose a deployment platform (Vercel recommended for Next.js)
3. Set up CI/CD pipeline

## Sample Code for Key Components

### Restaurant Type Definition (lib/types.ts)

```typescript
export interface Restaurant {
  id?: number;
  name: string;
  address: string;
  email: string;
  services: string;
  mobile: number;
}

export interface User {
  id?: number;
  name: string;
  email: string;
  mobile: number;
  password: string;
}
```

### API Service (lib/api.ts)

```typescript
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

// Auth API functions
export async function login(email: string, password: string) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}
```
