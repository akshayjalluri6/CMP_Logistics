// src/AppRouter.js
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './routes/privateRoutes';
import PublicRoute from './routes/publicRoutes';
import SupervisorDashboard from './components/Dashboard/SupervisorDashboard';
import MisInputsDashboard from './components/Dashboard/MisInputsDashboard';
import ManagerDashboard from './components/Dashboard/ManagerDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import Login from './auth/Login';
import Register from './auth/Register';
import Unauthorized from './components/Unauthorized';

const AppRouter = () => (
  <Routes>
    {/* Public Routes */}
    <Route
      path="/login"
      element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      }
    />
    <Route
      path="/register"
      element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      }
    />

    {/* Private Routes */}
    <Route
      path="/"
      element={
        <PrivateRoute allowedRoles={['supervisor']}>
          <SupervisorDashboard />
        </PrivateRoute>
      }
    />
    <Route
      path="/mis"
      element={
        <PrivateRoute allowedRoles={['misInputsteam']}>
          <MisInputsDashboard />
        </PrivateRoute>
      }
    />
    <Route
      path="/manager"
      element={
        <PrivateRoute allowedRoles={['manager']}>
          <ManagerDashboard />
        </PrivateRoute>
      }
    />
    <Route
      path="/admin"
      element={
        <PrivateRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </PrivateRoute>
      }
    />
    <Route path="/unauthorized" element={<Unauthorized />} />

    {/* Default Redirect */}
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default AppRouter;