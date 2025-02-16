// src/auth/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateUser, logoutUser } from '../services/auth';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await authenticateUser(credentials);
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data);
      navigate('/');
      toast.success('Logged in successfully');
    } catch (error) {
      toast.error('Invalid credentials');
    }
    setLoading(false);
  };

  const logout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem('user');
      setUser(null);
      navigate('/login');
      toast.success('Logged out');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};