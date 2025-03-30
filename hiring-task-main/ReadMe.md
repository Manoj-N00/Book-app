# Book Management Application

A full-stack application for managing your book collection. Users can add, edit, delete, and view their book collection through a modern and user-friendly interface.

## Features

- User authentication and authorization
- Add new books to collection
- Edit existing book details
- Delete books from collection
- View all books in collection
- Dashboard with statistics

## Tech Stack

### Frontend
- React with TypeScript
- Material-UI (MUI) for components
- Vite for build tooling

### Backend
- Node.js with Express
- TypeScript
- Prisma ORM
- PostgreSQL database

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- PostgreSQL database

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hiring-task-main
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

## Environment Setup

1. Copy the example environment file and update with your settings:
```bash
cp .env.example .env
```

2. Update the `.env` file with your database credentials and other configuration:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/bookdb"
JWT_SECRET="your-secret-key"
PORT=3000
```

## Database Setup

1. Run database migrations:
```bash
npx prisma migrate dev
```

## Running the Application

### Backend

1. Start the backend server:
```bash
npm run dev
```
The server will start on http://localhost:3000

### Frontend

1. In a new terminal, navigate to the frontend directory:
```bash
cd frontend
```

2. Start the frontend development server:
```bash
npm run dev
```
The frontend will be available at http://localhost:5173

## API Documentation

### Authentication

- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Books

- GET `/api/books` - Get all books
- POST `/api/books` - Create a new book
- PUT `/api/books/:id` - Update a book
- DELETE `/api/books/:id` - Delete a book

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
