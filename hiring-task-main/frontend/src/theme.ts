import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#000000',
      light: '#212121',
      dark: '#000000',
    },
    secondary: {
      main: '#FFFFFF',
      light: '#F5F5F5',
      dark: '#E0E0E0',
    },
    background: {
      default: '#121212',
      paper: 'rgba(30, 30, 30, 0.95)',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.85)',
    },
    grey: {
      50: '#121212',
      100: '#1E1E1E',
      200: '#2C2C2C',
      300: '#3D3D3D',
      400: '#4F4F4F',
      500: '#666666',
      600: '#808080',
      700: '#999999',
      800: '#B3B3B3',
      900: '#CCCCCC',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 16,
          padding: 24,
          margin: '16px 0',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontSize: '0.95rem',
          fontWeight: 500,
          padding: '10px 24px',
          transition: 'all 0.2s ease',
        },
        contained: {
          background: '#FFFFFF',
          color: '#000000',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          '&:hover': {
            background: '#F5F5F5',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
            transform: 'translateY(-1px)',
          },
        },
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.2)',
          borderWidth: '1.5px',
          '&:hover': {
            borderColor: 'rgba(255, 255, 255, 0.5)',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
              transition: 'border-color 0.3s ease',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.4)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FFFFFF',
            },
          },
        },
      },
    },
  },
  typography: {
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
  },
});