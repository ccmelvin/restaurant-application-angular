# Restaurant Management Application

This is a Next.js application for managing restaurant information, migrated from an Angular application.

## Features

- User authentication (login/signup)
- Restaurant management (CRUD operations)
- Responsive design with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:

   ```text
   npm install
   ```

3. Start the JSON Server (API):

   ```text
   npm run server
   ```

4. In a separate terminal, start the Next.js development server:

   ```text
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/app` - Next.js app router pages
- `/src/components` - React components
- `/lib` - Utility functions and type definitions
- `/public` - Static assets

## Technologies Used

- Next.js 14
- React 18
- Tailwind CSS
- JSON Server (for backend API)
- TypeScript
- Zustand (for state management)

## Wireframes and Prototype

### Wireframes

The application's layout structure based on Bootstrap components:

- Login Page

  ```text
  ┌────────────────────────────┐
  │     Restaurant Record      │
  │         Login             │
  ├────────────────────────────┤
  │ ┌──────────────────────┐   │
  │ │ Email address        │   │
  │ └──────────────────────┘   │
  │ ┌──────────────────────┐   │
  │ │ Password             │   │
  │ └──────────────────────┘   │
  │ ┌──────────────────────┐   │
  │ │        Login         │   │
  │ └──────────────────────┘   │
  │                            │
  │ New User? Click to Sign up │
  └────────────────────────────┘
  ```

- Restaurant Dashboard

  ```text
  ┌────────────────────────────────────────┐
  │ Restaurant Record App     [Add] [Logout]│
  ├────────────────────────────────────────┤
  │ ┌────────────────────────────────────┐ │
  │ │  Restaurant Records Management     │ │
  │ │  You can save Records of Restaurant│ │
  │ │  [Source Code]                     │ │
  │ └────────────────────────────────────┘ │
  │                                        │
  │ ┌────────────────────────────────────┐ │
  │ │ ID │ Name │ Email │ Address │ ...  │ │
  │ ├────────────────────────────────────┤ │
  │ │    │      │       │         │      │ │
  │ │    │      │       │         │      │ │
  │ │    │      │       │         │      │ │
  │ └────────────────────────────────────┘ │
  └────────────────────────────────────────┘
  ```

- Add/Edit Modal
  
  ```text
  ┌────────────────────────────┐
  │ Records         [x]        │
  ├────────────────────────────┤
  │ ┌──────────────────────┐   │
  │ │ Name                 │   │
  │ └──────────────────────┘   │
  │ ┌──────────────────────┐   │
  │ │ Email                │   │
  │ └──────────────────────┘   │
  │ ┌──────────────────────┐   │
  │ │ Address              │   │
  │ └──────────────────────┘   │
  │ ┌──────────────────────┐   │
  │ │ Mobile               │   │
  │ └──────────────────────┘   │
  │ ┌──────────────────────┐   │
  │ │ Services             │   │
  │ └──────────────────────┘   │
  │                            │
  │ [Close]    [Add Details]   │
  └────────────────────────────┘
  ```

### Interactive Prototype

A clickable prototype is available on Figma, demonstrating the user flow and interactions:

Key User Flows and Technical Implementation:

1. User Authentication Flow

   - Login:
     - Email and password validation
     - Local storage for user session
     - Error handling with user feedback
     - Loading states during authentication
   - Registration:
     - Basic form validation
     - New user account creation
     - Redirect to login after signup

2. Restaurant Management Flow
   - Restaurant Creation:
     - Modal-based form interface
     - Input validation for required fields
     - Success/error notifications
     - Form state management
   - Restaurant List:
     - Tabular data display
     - Basic loading states
     - Restaurant details (name, email, address, phone, services)
     - Immediate UI updates after actions
   - Edit/Delete:
     - Inline edit functionality
     - Confirmation before delete
     - Modal form reuse for editing
     - Automatic list refresh after changes

3. Navigation System
   - Header:
     - Bootstrap navbar implementation
     - Add Restaurant button
     - Logout functionality
   - Responsive Design:
     - Bootstrap-based layout
     - Mobile-friendly interface
     - Bootstrap modal dialogs

## License

This project is licensed under the MIT License.
