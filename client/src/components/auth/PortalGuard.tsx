import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface PortalGuardProps {
  children?: React.ReactNode;
}

export const PortalGuard: React.FC<PortalGuardProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.isSuspended) {
    return <Navigate to="/access-denied" replace />;
  }

  // All authenticated users (Level 1 to 5) can access their personal portal:
  // Profile, attended events, donations, certificates, and announcements.
  return children ? <>{children}</> : <Outlet />;
};

export default PortalGuard;
