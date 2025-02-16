// src/App.js
import React from 'react';
import { AuthProvider } from './auth/AuthContext';
import AppRouter from './AppRouter';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;