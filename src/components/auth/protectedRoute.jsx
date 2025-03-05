import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const authToken = localStorage.getItem('authToken'); // Check if authToken exists

  return authToken ? <Outlet /> : <Navigate to="/loginsignup" replace />;
};

export default ProtectedRoute;
