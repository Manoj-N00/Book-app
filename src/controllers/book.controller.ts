import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, description, isbn } = req.body;
    const book = await prisma.book.create({
      data: {
        title,
        author,
        description,
        isbn,
        userId: req.user?.userId || '',
      }
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: 'Error creating book', error });
  }
};

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany({
      where: { userId: req.user?.userId }});
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
};

export const getBook = async (req: Request, res: Response) => {
  try {
    const book = await prisma.book.findFirst({
      where: { 
        id: req.params.id,
        userId: req.user?.userId
      }});
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book', error });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { title, author, description, isbn } = req.body;
    const book = await prisma.book.updateMany({
      where: { 
        id: req.params.id,
        userId: req.user?.userId
      },
      data: { 
        title,
        author,
        description,
        isbn
      }
    });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: 'Error updating book', error });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await prisma.book.findFirst({
      where: {
        id: req.params.id,
        userId: req.user?.userId
      }
    });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    await prisma.book.delete({
      where: { id: book.id }
    });
    res.json({ message: 'Book deleted successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error });
  }
};