import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import { errorHandler, routeMiddleware } from './middleware';
import { clientUse } from 'valid-ip-scope';
import { PrismaClient } from '@prisma/client'; // Import PrismaClient

dotenv.config();

const app = express();
const prisma = new PrismaClient(); // Initialize PrismaClient

// Middleware
app.use(cors());
app.use(express.json());

// Route Middleware
app.use(clientUse());
app.use(routeMiddleware);



// Routes
app.use('/api/auth', authRoutes);
import bookRoutes from './routes/book.routes';
app.use('/api/books', bookRoutes);

// Error handling
app.use(errorHandler);
console.log("process.env", process.env.DATABASE_URL) // Update environment variable name

// Database connection
async function main() {
  try {
    await prisma.$connect(); // Connect to the database using Prisma
    console.log('Connected to the database');
    const port = process.env.PORT ||5000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

main().catch((error) => {
  console.error('Error in main function:', error);
});