# Restaurant Management Application Migration Project

This repository contains a Restaurant Management Application that is being migrated from Angular to Next.js. The project serves as a portfolio piece demonstrating the process of modernizing a web application while maintaining its core functionality.

## Project Overview

The application is a restaurant management system that allows users to:

- Sign up and log in to manage restaurants
- Add, edit, and delete restaurant records
- View a list of restaurants with their details
- Manage restaurant information including name, email, and contact details

## Repository Structure

The repository contains both the original Angular application and the migrated Next.js version:

```text
/
├── src/                    # Original Angular application
├── restaurant-app-next/    # Migrated Next.js application
└── migration-plan.md       # Detailed migration documentation
```

### Original Angular Application (src/)

- Built with Angular framework
- Uses Bootstrap for styling
- Implements REST API communication
- Features authentication system
- Contains restaurant management CRUD operations

### Next.js Migration (restaurant-app-next/)

- Modern React-based implementation
- Enhanced with TypeScript
- Improved routing and API handling
- Maintained feature parity with Angular version
- Better performance and developer experience

## Migration Process

The migration from Angular to Next.js follows a systematic approach:

1. Project setup and planning
2. Data structure migration
3. API routes implementation
4. Component migration
5. Authentication flow setup
6. State management implementation
7. Testing and debugging
8. UI/UX refinement
9. Performance optimization
10. Documentation

For detailed information about the migration process, please refer to the [Migration Process Document](restaurant-app-next/MIGRATION_PROCESS.md).

## Technologies Used

Original Angular Application:

- Angular
- TypeScript
- Bootstrap
- RxJS
- JSON Server

Next.js Migration:

- Next.js 13+
- React
- TypeScript
- Tailwind CSS
- Next Auth
- JSON Server

## Getting Started

### Running the Angular Version

```bash
# Install dependencies
npm install

# Start JSON Server
json-server --watch db.json

# Run the application
ng serve
```

### Running the Next.js Version

```bash
cd restaurant-app-next

# Install dependencies
npm install

# Start JSON Server
json-server --watch db.json

# Run the development server
npm run dev
```

## Portfolio Context

This project serves as a demonstration of

- Framework migration skills
- Modern web development practices
- Full-stack development capabilities
- Understanding of authentication and security
- Code organization and documentation
- API design and implementation

## Learning Outcomes

Through this migration project, the following skills were demonstrated:

- Understanding of both Angular and Next.js frameworks
- TypeScript implementation in different contexts
- State management approaches
- Authentication implementation
- API route handling
- Performance optimization techniques
- Project documentation

## Future Improvements

Planned enhancements for the Next.js version:

- Enhanced UI/UX with modern design patterns
- Implementation of real-time updates
- Advanced search and filtering capabilities
- Image upload and management
- Role-based access control
- Analytics dashboard

## Contributing

This is a portfolio project, but suggestions and feedback are welcome. Please feel free to open an issue or submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).
