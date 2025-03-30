import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Tabs,
  Tab,
  useTheme,
} from '@mui/material';
import {
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
  LibraryBooks as LibraryIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleTabChange = (_: React.SyntheticEvent, value: string) => {
    navigate(value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          backgroundColor: 'transparent',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Toolbar sx={{ px: { xs: 2, sm: 4 } }}>
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              mr: 4,
              fontWeight: 600,
              background: 'linear-gradient(45deg, #FFFFFF 30%, #E0E0E0 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Book Management
          </Typography>
          <Tabs 
            value={location.pathname} 
            onChange={handleTabChange}
            textColor="inherit"
            sx={{
              '& .MuiTab-root': {
                minHeight: 64,
                minWidth: 120,
                color: theme.palette.text.secondary,
                fontSize: '0.95rem',
                fontWeight: 500,
                transition: 'all 0.2s ease',
                '&.Mui-selected': {
                  color: theme.palette.secondary.main,
                },
                '&:hover': {
                  color: theme.palette.secondary.light,
                }
              }
            }}
          >
            <Tab 
              icon={<DashboardIcon />} 
              label="Dashboard" 
              value="/"
              iconPosition="start"
            />
            <Tab 
              icon={<LibraryIcon />} 
              label="Books" 
              value="/books"
              iconPosition="start"
            />
          </Tabs>
          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body1">{user?.name}</Typography>
            <IconButton 
              color="inherit" 
              onClick={handleLogout} 
              title="Logout"
              sx={{ '&:hover': { transform: 'scale(1.1)' } }}
            >
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          backgroundColor: theme.palette.background.default,
          minHeight: 'calc(100vh - 64px)',
          px: { xs: 2, sm: 4 },
          py: { xs: 3, sm: 4 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;