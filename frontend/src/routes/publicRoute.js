// src/routes/publicRoutes.js
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

export default PublicRoute;