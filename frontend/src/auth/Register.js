// src/auth/Register.js
import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    password: '',
    phone_no: '',
    role: 'user', // Default role
    address: '',
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      toast.success('Registration successful');
      navigate('/login');
    } catch (error) {
      toast.error('Registration failed');
    }
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
        Register
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
        <TextField
          fullWidth
          margin="normal"
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={(e) =>
            setFormData({ ...formData, first_name: e.target.value })
          }
          required
        />
        {/* Add other fields similarly */}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{ marginTop: '1rem' }}
        >
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Register;