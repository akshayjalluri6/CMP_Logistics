// src/routes/privateRoutes.js
import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { toast } from 'react-toastify';

const PrivateRoute = ({ allowedRoles, children }) => {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) {
      // Optionally, show a loading spinner
    }
  }, [loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    toast.warning('Unauthorized access');
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;