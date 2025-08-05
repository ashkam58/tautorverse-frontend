// src/components/ProtectedRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

// This component can check for general authentication or specific roles
const ProtectedRoute = ({ allowedRoles }) => {
  const { userInfo } = useSelector((state) => state.auth);

  // 1. Check if user is logged in
  if (!userInfo) {
    // If not, redirect them to the login page
    return <Navigate to="/login" replace />;
  }

  // 2. If allowedRoles are specified, check if the user's role is included
  if (allowedRoles && !allowedRoles.includes(userInfo.role)) {
    // If their role is not allowed, redirect them to a "not found" or "unauthorized" page (or home for simplicity)
    return <Navigate to="/" replace />;
  }

  // 3. If all checks pass, render the child component
  return <Outlet />;
};

export default ProtectedRoute;