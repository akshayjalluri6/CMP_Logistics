// src/services/auth.js
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE = '/api/v1/auth';

export const authenticateUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE}/login`, credentials);
    return response.data;
  } catch (error) {
    toast.error('Login failed');
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(`${API_BASE}/logout`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (userDetails) => {
  try {
    const response = await axios.post(`${API_BASE}/signup`, userDetails);
    return response.data;
  } catch (error) {
    toast.error('Registration failed');
    throw error;
  }
};