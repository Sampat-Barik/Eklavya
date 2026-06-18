import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User as UserIcon } from 'lucide-react';

export const Navbar = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo / Brand Name */}
        <Link to="/" className="text-xl font-bold tracking-tight hover:text-accent transition-colors">
          Eklavya Training
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <Link to="/about" className="hover:text-accent transition-colors">About</Link>
          <Link to="/events" className="hover:text-accent transition-colors">Events</Link>
          <Link to="/members" className="hover:text-accent transition-colors">Members</Link>
          
          {/* Only show Admin Dashboard link if user is an admin */}
          {isAdmin && (
            <Link to="/admin" className="hover:text-accent font-semibold transition-colors">
              Admin Dashboard
            </Link>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 text-sm">
                <UserIcon size={16} />
                Hello, {user?.name}
              </span>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground px-3 py-1.5 rounded-md text-sm transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="hover:text-accent transition-colors">Login</Link>
              <Link 
                to="/register" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2 rounded-md font-medium transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
