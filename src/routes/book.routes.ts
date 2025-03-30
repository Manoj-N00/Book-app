import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
} from '../controllers/book.controller';

const router = Router();

// All routes are protected with authentication
router.use(authenticate);

// Book management routes
router.post('/', createBook);
router.get('/', getBooks);
router.get('/:id', getBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;