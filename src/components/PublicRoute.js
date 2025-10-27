import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (token) {
    // User is already logged in, redirect to /users
    return <Navigate to="/users" replace />;
  }

  // User not logged in, show the page (login)
  return children;
};

export default PublicRoute;
