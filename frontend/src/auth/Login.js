// src/auth/Login.js
import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        padding: '20px',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{ marginTop: '1rem' }}
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;