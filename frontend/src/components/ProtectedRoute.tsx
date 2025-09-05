import React from 'react';
import { Navigate } from 'react-router-dom';

// This component checks if a user is authenticated
// If they are, it renders the page they're trying to access
// If not, it redirects them to the login page

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // User is not authenticated, redirect to login
    return <Navigate to="/login" />;
  }

  // User is authenticated, render the requested component
  return <>{children}</>;
};

export default ProtectedRoute;