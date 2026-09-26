import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { UserRole, AdminModule } from '../../types/auth';

interface RoleGuardProps {
  allowedRoles?: UserRole[];
  requiredModule?: AdminModule;
  children?: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  allowedRoles,
  requiredModule,
  children
}) => {
  const { user, isAuthenticated, hasRole, hasModulePermission } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.isSuspended) {
    return <Navigate to="/access-denied" replace />;
  }

  // Normal registered users have zero administrative rights
  if (user.role === 'registered_user') {
    return <Navigate to="/access-denied" replace />;
  }

  // Super Admin always has unrestricted access
  if (user.role === 'super_admin') {
    return children ? <>{children}</> : <Outlet />;
  }

  // Check allowed roles
  if (allowedRoles && allowedRoles.length > 0 && !hasRole(allowedRoles)) {
    return <Navigate to="/access-denied" replace />;
  }

  // Check required module permission
  if (requiredModule && !hasModulePermission(requiredModule)) {
    return <Navigate to="/access-denied" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
