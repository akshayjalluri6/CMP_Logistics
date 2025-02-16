// src/components/Navigation.js
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CMP Logistics
        </Typography>
        {user ? (
          <div>
            <Button color="inherit" onClick={() => navigate('/profile')}>
              {user.name}
            </Button>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button color="inherit" onClick={() => navigate('/login')}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;