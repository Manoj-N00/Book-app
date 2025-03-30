import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  useTheme,
} from '@mui/material';
import {
  Book as BookIcon,
  LibraryBooks as LibraryIcon,
  TrendingUp as TrendingIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { bookService, Book } from '../services/bookService';

const Dashboard: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [stats, setStats] = useState({
    totalBooks: 0,
    recentlyAdded: 0,
  });
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const booksData = await bookService.getBooks();
      setBooks(booksData);
      
      const now = new Date();
      const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const recentBooks = booksData.filter(
        (book) => new Date(book.createdAt) > lastWeek
      );

      setStats({
        totalBooks: booksData.length,
        recentlyAdded: recentBooks.length,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const StatCard = ({ title, value, icon, color }: any) => (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        height: '100%',
        background: `linear-gradient(45deg, ${color}22 30%, ${color}11 90%)`,
        border: `1px solid ${color}33`,
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" component="div">
            {value}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: `${color}22`,
            borderRadius: '50%',
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
      </Box>
    </Paper>
  );

  const RecentBookCard = ({ book }: { book: Book }) => (
    <Card sx={{ display: 'flex', mb: 2 }}>
      <CardMedia
        component="div"
        sx={{
          width: 100,
          backgroundColor: theme.palette.grey[200],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <BookIcon sx={{ fontSize: 40, color: theme.palette.grey[500] }} />
      </CardMedia>
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" component="div">
          {book.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          by {book.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Added on {new Date(book.createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Dashboard
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/books')}
        >
          Add New Book
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Total Books"
            value={stats.totalBooks}
            icon={<LibraryIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Recently Added"
            value={stats.recentlyAdded}
            icon={<TrendingIcon sx={{ fontSize: 40, color: theme.palette.success.main }} />}
            color={theme.palette.success.main}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Reading Now"
            value={Math.floor(stats.totalBooks * 0.3)}
            icon={<BookIcon sx={{ fontSize: 40, color: theme.palette.info.main }} />}
            color={theme.palette.info.main}
          />
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Recently Added Books
            </Typography>
            <Box sx={{ mt: 2 }}>
              {books
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 3)
                .map((book) => (
                  <RecentBookCard key={book._id} book={book} />
                ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;