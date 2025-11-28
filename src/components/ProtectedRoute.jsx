import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect unauthenticated users to the login page
    return <Navigate to="/" replace />;
  }

  // Render the children (the protected page) if authenticated
  return children;
};

export default ProtectedRoute;