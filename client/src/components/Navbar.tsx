import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User as UserIcon, Menu, X, Heart, Shield } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 md:px-8 max-w-[1500px] h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            E
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-slate-900 tracking-tight leading-none group-hover:text-blue-600 transition-colors">
              Eklavya
            </span>
            <span className="text-[10px] font-semibold text-slate-500 mt-0.5">
              Hands That Care • HIT Haldia
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-700">
          <Link
            to="/"
            className={`px-3 py-2 rounded-md transition-colors ${
              isActive('/')
                ? 'text-blue-600 font-semibold bg-blue-50'
                : 'hover:text-blue-600 hover:bg-slate-50'
            }`}
          >
            Home
          </Link>

          <Link
            to="/vision"
            className={`px-3 py-2 rounded-md transition-colors ${
              isActive('/vision')
                ? 'text-blue-600 font-semibold bg-blue-50'
                : 'hover:text-blue-600 hover:bg-slate-50'
            }`}
          >
            Vision & Mission
          </Link>

          <Link
            to="/faculty"
            className={`px-3 py-2 rounded-md transition-colors ${
              isActive('/faculty')
                ? 'text-blue-600 font-semibold bg-blue-50'
                : 'hover:text-blue-600 hover:bg-slate-50'
            }`}
          >
            Faculty Coordinator
          </Link>

          <Link
            to="/members"
            className={`px-3 py-2 rounded-md transition-colors ${
              isActive('/members')
                ? 'text-blue-600 font-semibold bg-blue-50'
                : 'hover:text-blue-600 hover:bg-slate-50'
            }`}
          >
            Our Team
          </Link>

          <Link
            to="/alumni"
            className={`px-3 py-2 rounded-md transition-colors ${
              isActive('/alumni')
                ? 'text-blue-600 font-semibold bg-blue-50'
                : 'hover:text-blue-600 hover:bg-slate-50'
            }`}
          >
            Alumni
          </Link>

          <Link
            to="/events"
            className={`px-3 py-2 rounded-md transition-colors ${
              isActive('/events')
                ? 'text-blue-600 font-semibold bg-blue-50'
                : 'hover:text-blue-600 hover:bg-slate-50'
            }`}
          >
            Events
          </Link>

          <Link
            to="/donate"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md font-semibold transition-colors ${
              isActive('/donate')
                ? 'bg-rose-600 text-white'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
            }`}
          >
            <Heart size={14} className={isActive('/donate') ? 'fill-white text-white' : 'fill-rose-500 text-rose-500'} />
            <span>Donate Us</span>
          </Link>

          {isAdmin && (
            <Link
              to="/admin"
              className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-semibold hover:bg-amber-100 transition-colors"
            >
              <Shield size={14} />
              <span>Admin</span>
            </Link>
          )}
        </nav>

        {/* Right Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-md">
                <UserIcon size={14} className="text-blue-600" />
                {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-xs text-rose-600 hover:bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-md font-semibold transition-colors"
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-xs font-semibold text-slate-700 hover:text-blue-600 px-3 py-2 rounded-md hover:bg-slate-50 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md shadow-sm transition-colors"
              >
                Join Us
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-md"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2 text-sm font-medium">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block p-2 rounded-md hover:bg-slate-50">
            Home
          </Link>
          <Link to="/vision" onClick={() => setMobileMenuOpen(false)} className="block p-2 rounded-md hover:bg-slate-50">
            Vision & Mission
          </Link>
          <Link to="/faculty" onClick={() => setMobileMenuOpen(false)} className="block p-2 rounded-md hover:bg-slate-50">
            Faculty Coordinator
          </Link>
          <Link to="/members" onClick={() => setMobileMenuOpen(false)} className="block p-2 rounded-md hover:bg-slate-50">
            Our Team
          </Link>
          <Link to="/alumni" onClick={() => setMobileMenuOpen(false)} className="block p-2 rounded-md hover:bg-slate-50">
            Alumni
          </Link>
          <Link to="/events" onClick={() => setMobileMenuOpen(false)} className="block p-2 rounded-md hover:bg-slate-50">
            Events
          </Link>
          <Link to="/donate" onClick={() => setMobileMenuOpen(false)} className="block p-2 rounded-md bg-rose-50 text-rose-700 font-semibold">
            Donate Us
          </Link>

          <div className="pt-2 border-t border-slate-200">
            {isAuthenticated ? (
              <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="w-full text-left p-2 text-rose-600 font-semibold">
                Logout ({user?.name})
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-center p-2 bg-slate-100 rounded-md">
                  Sign In
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="text-center p-2 bg-blue-600 text-white rounded-md font-semibold">
                  Join Us
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
