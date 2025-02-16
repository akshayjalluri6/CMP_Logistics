// src/services/api.js
import axios from 'axios';

const API_BASE = '/api/v1/supervisor';

export const fetchRides = async () => {
  try {
    const response = await axios.get(`${API_BASE}/rides`);
    return response.data;
  } catch (error) {
    console.error('Error fetching rides:', error);
    throw error;
  }
};

export const fetchVehicles = async () => {
  try {
    const response = await axios.get(`${API_BASE}/vehicles`);
    return response.data;
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    throw error;
  }
};