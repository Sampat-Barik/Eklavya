import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AccessDenied } from '../../pages/AccessDenied';
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
    return <AccessDenied />;
  }

  // Normal registered users have zero administrative rights
  if (user.role === 'registered_user') {
    return <AccessDenied />;
  }

  // Super Admin always has unrestricted access
  if (user.role === 'super_admin') {
    return children ? <>{children}</> : <Outlet />;
  }

  // Check allowed roles
  if (allowedRoles && allowedRoles.length > 0 && !hasRole(allowedRoles)) {
    return <AccessDenied />;
  }

  // Check required module permission
  if (requiredModule && !hasModulePermission(requiredModule)) {
    return <AccessDenied />;
  }

  return children ? <>{children}</> : <Outlet />;
};
