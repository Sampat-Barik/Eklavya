import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User as UserIcon, Menu, X, Heart, Shield, ArrowUpRight } from 'lucide-react';

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
    <header className="sticky top-0 z-50 bg-[#f4f4f4]/80 backdrop-blur-md py-3 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-full px-5 md:px-8 py-2.5 shadow-sm flex items-center justify-between transition-all">
        {/* Brand Logo - Dribbble "enamo" styled */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-extrabold text-sm shadow-sm group-hover:scale-105 transition-transform">
            @
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-xl text-slate-900 tracking-tight">
              eklavya
            </span>
            <span className="hidden xl:inline text-[10px] font-medium text-slate-400 border-l border-slate-200 pl-2">
              Hands That Care
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-xs font-semibold text-slate-700">
          <Link
            to="/"
            className={`px-3 py-1.5 rounded-full transition-colors ${
              isActive('/')
                ? 'text-slate-950 font-bold bg-slate-100'
                : 'hover:text-slate-950 hover:bg-slate-50'
            }`}
          >
            Home
          </Link>

          <Link
            to="/vision"
            className={`px-3 py-1.5 rounded-full transition-colors ${
              isActive('/vision')
                ? 'text-slate-950 font-bold bg-slate-100'
                : 'hover:text-slate-950 hover:bg-slate-50'
            }`}
          >
            About Us
          </Link>

          <Link
            to="/faculty"
            className={`px-3 py-1.5 rounded-full transition-colors ${
              isActive('/faculty')
                ? 'text-slate-950 font-bold bg-slate-100'
                : 'hover:text-slate-950 hover:bg-slate-50'
            }`}
          >
            Faculty
          </Link>

          <Link
            to="/members"
            className={`px-3 py-1.5 rounded-full transition-colors ${
              isActive('/members')
                ? 'text-slate-950 font-bold bg-slate-100'
                : 'hover:text-slate-950 hover:bg-slate-50'
            }`}
          >
            Our Team
          </Link>

          <Link
            to="/alumni"
            className={`px-3 py-1.5 rounded-full transition-colors ${
              isActive('/alumni')
                ? 'text-slate-950 font-bold bg-slate-100'
                : 'hover:text-slate-950 hover:bg-slate-50'
            }`}
          >
            Alumni
          </Link>

          <Link
            to="/events"
            className={`px-3 py-1.5 rounded-full transition-colors ${
              isActive('/events')
                ? 'text-slate-950 font-bold bg-slate-100'
                : 'hover:text-slate-950 hover:bg-slate-50'
            }`}
          >
            Events
          </Link>

          {isAdmin && (
            <Link
              to="/admin"
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 font-bold hover:bg-amber-100 transition-colors text-xs"
            >
              <Shield size={13} />
              <span>Admin</span>
            </Link>
          )}
        </nav>

        {/* Right Action & Auth Buttons - Matching Dribbble Black Pill CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/donate"
            className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-slate-900 hover:bg-black text-white font-semibold text-xs transition-transform hover:scale-105 shadow-md"
          >
            <Heart size={13} className="fill-rose-400 text-rose-400" />
            <span>Donate Us</span>
            <ArrowUpRight size={14} className="opacity-80" />
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
              <span className="flex items-center gap-1 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full">
                <UserIcon size={13} className="text-slate-900" />
                {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
                title="Logout"
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 border-l border-slate-200 pl-3">
              <Link
                to="/login"
                className="text-xs font-semibold text-slate-700 hover:text-slate-950 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="text-xs font-semibold text-slate-900 border border-slate-300 hover:bg-slate-100 px-4 py-1.5 rounded-full transition-colors"
              >
                Join Us
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-800 hover:bg-slate-100 rounded-full"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-[1400px] mx-auto bg-white border border-slate-200 rounded-3xl p-5 space-y-3 text-sm font-semibold shadow-xl animate-in slide-in-from-top duration-200">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 rounded-2xl hover:bg-slate-50">
            Home
          </Link>
          <Link to="/vision" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 rounded-2xl hover:bg-slate-50">
            About Us (Vision & Mission)
          </Link>
          <Link to="/faculty" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 rounded-2xl hover:bg-slate-50">
            Faculty Coordinator
          </Link>
          <Link to="/members" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 rounded-2xl hover:bg-slate-50">
            Our Team
          </Link>
          <Link to="/alumni" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 rounded-2xl hover:bg-slate-50">
            Alumni
          </Link>
          <Link to="/events" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 rounded-2xl hover:bg-slate-50">
            Events
          </Link>
          <Link to="/donate" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-slate-900 text-white font-semibold">
            <span>Donate Us</span>
            <ArrowUpRight size={16} />
          </Link>

          <div className="pt-2 border-t border-slate-100">
            {isAuthenticated ? (
              <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-2 text-rose-600 font-semibold">
                Logout ({user?.name})
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-center py-2 bg-slate-100 rounded-2xl">
                  Sign In
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="text-center py-2 bg-slate-900 text-white rounded-2xl font-semibold">
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
