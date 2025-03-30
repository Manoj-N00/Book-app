import axios from 'axios';

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

const API_URL = 'http://localhost:5000/api';

export const bookService = {
  getBooks: async (): Promise<Book[]> => {
    const response = await axios.get(`${API_URL}/books`);
    return response.data;
  },

  getBook: async (id: string): Promise<Book> => {
    const response = await axios.get(`${API_URL}/books/${id}`);
    return response.data;
  },

  createBook: async (bookData: Omit<Book, '_id' | 'owner' | 'createdAt' | 'updatedAt'>): Promise<Book> => {
    const response = await axios.post(`${API_URL}/books`, bookData);
    return response.data;
  },

  updateBook: async (id: string, bookData: Partial<Book>): Promise<Book> => {
    const response = await axios.put(`${API_URL}/books/${id}`, bookData);
    return response.data;
  },

  deleteBook: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/books/${id}`);
  },
};