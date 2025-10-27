import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // get token from localStorage

  if (!token) {
    // Not logged in, redirect to login
    return <Navigate to="/" replace />;
  }

  // Logged in, render the protected page
  return children;
};

export default ProtectedRoute;
