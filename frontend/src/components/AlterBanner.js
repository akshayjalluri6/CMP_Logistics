// src/components/AlertBanner.js
import { Alert } from '@mui/material';
import { useAuth } from '../auth/AuthContext';

const AlertBanner = () => {
  const { user } = useAuth();

  return (
    <Alert severity="success" sx={{ mb: 2 }}>
      Welcome, {user?.name}! Your role is: {user?.role}.
    </Alert>
  );
};

export default AlertBanner;