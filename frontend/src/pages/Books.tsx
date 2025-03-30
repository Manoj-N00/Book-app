import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Box,
  CardMedia,
  Grow,
  Snackbar,
  Alert,
  useTheme,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { bookService, Book } from '../services/bookService';

const Books: React.FC = () => {
  const theme = useTheme();
  const [books, setBooks] = useState<Book[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Partial<Book> | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await bookService.getBooks();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleOpen = (book?: Book) => {
    if (book) {
      setSelectedBook(book);
      setFormData({
        title: book.title,
        author: book.author,
        description: book.description,
      });
    } else {
      setSelectedBook(null);
      setFormData({
        title: '',
        author: '',
        description: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBook(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedBook?._id) {
        const updatedBook = await bookService.updateBook(selectedBook._id, formData);
        setBooks(books.map(book => book._id === selectedBook._id ? updatedBook : book));
      } else {
        const newBook = await bookService.createBook(formData);
        setBooks([...books, newBook]);
      }
      handleClose();
      setSnackbar({
        open: true,
        message: selectedBook ? 'Book updated successfully' : 'Book added successfully',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error saving book:', error);
      setSnackbar({
        open: true,
        message: 'Error saving book',
        severity: 'error',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await bookService.deleteBook(id);
        setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
        setSnackbar({
          open: true,
          message: 'Book deleted successfully',
          severity: 'success',
        });
      } catch (error) {
        console.error('Error deleting book:', error);
        setSnackbar({
          open: true,
          message: 'Error deleting book',
          severity: 'error',
        });
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          My Books
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Book
        </Button>
      </Box>

      <Grid container spacing={3}>
        {books.map((book, index) => (
          <Grow in={true} timeout={300 * (index + 1)} key={book.id}>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[4],
                },
              }}>
                <CardMedia
                  component="div"
                  sx={{
                    height: 140,
                    backgroundColor: theme.palette.grey[200],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h2" color={theme.palette.grey[400]}>
                    📚
                  </Typography>
                </CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {book.title}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    by {book.author}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {book.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                  <IconButton 
                    onClick={() => handleOpen(book)} 
                    size="small" 
                    color="primary"
                    sx={{ '&:hover': { transform: 'scale(1.1)' } }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    onClick={() => handleDelete(book.id)} 
                    size="small" 
                    color="error"
                    sx={{ '&:hover': { transform: 'scale(1.1)' } }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          </Grow>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {selectedBook ? 'Edit Book' : 'Add New Book'}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="Title"
              type="text"
              fullWidth
              value={formData.title}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              name="author"
              label="Author"
              type="text"
              fullWidth
              value={formData.author}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              name="description"
              label="Description"
              type="text"
              fullWidth
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {selectedBook ? 'Save' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity as 'success' | 'error'}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Books;