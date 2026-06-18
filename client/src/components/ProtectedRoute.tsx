import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  requireAdmin?: boolean;
}

/**
 * A wrapper component that protects routes from unauthorized access.
 * If the user is not logged in, they are redirected to the login page.
 * If requireAdmin is true, but the user is not an admin, they are redirected to the home page.
 */
export const ProtectedRoute = ({ requireAdmin = false }: ProtectedRouteProps) => {
  const { isAuthenticated, isAdmin } = useAuth();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If the route requires admin privileges but the user is not an admin, redirect home
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // If all checks pass, render the child routes (Outlet)
  return <Outlet />;
};
