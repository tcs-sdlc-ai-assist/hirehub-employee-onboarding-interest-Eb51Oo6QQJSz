import React from 'react';
import { loadAdminAuthToken } from '../utils/storage';
import AdminLogin from './AdminLogin';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = !!loadAdminAuthToken();

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;