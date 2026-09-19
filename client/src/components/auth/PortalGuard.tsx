import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AccessDenied } from '../../pages/AccessDenied';

interface PortalGuardProps {
  children?: React.ReactNode;
}

export const PortalGuard: React.FC<PortalGuardProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.isSuspended) {
    return <AccessDenied />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default PortalGuard;
