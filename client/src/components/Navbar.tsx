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
    <header className="sticky top-0 z-50 bg-[#f8fafc]/90 backdrop-blur-md border-b border-slate-200/80 py-3.5 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Brand Logo - Vibrant Blue Branding */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-base tracking-tighter shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            E
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg text-slate-900 tracking-tight leading-none group-hover:text-blue-600 transition-colors">
              Eklavya
            </span>
            <span className="text-[10px] font-bold text-blue-600 tracking-wider uppercase mt-0.5">
              Hands That Care • HIT Haldia
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 text-xs font-semibold text-slate-700">
          <Link
            to="/"
            className={`px-3.5 py-2 rounded-full transition-all ${
              isActive('/')
                ? 'text-blue-600 font-extrabold bg-blue-50'
                : 'hover:text-blue-600 hover:bg-slate-100'
            }`}
          >
            Home
          </Link>

          <Link
            to="/vision"
            className={`px-3.5 py-2 rounded-full transition-all ${
              isActive('/vision')
                ? 'text-blue-600 font-extrabold bg-blue-50'
                : 'hover:text-blue-600 hover:bg-slate-100'
            }`}
          >
            Vision & Mission
          </Link>

          <Link
            to="/faculty"
            className={`px-3.5 py-2 rounded-full transition-all ${
              isActive('/faculty')
                ? 'text-blue-600 font-extrabold bg-blue-50'
                : 'hover:text-blue-600 hover:bg-slate-100'
            }`}
          >
            Faculty
          </Link>

          <Link
            to="/members"
            className={`px-3.5 py-2 rounded-full transition-all ${
              isActive('/members')
                ? 'text-blue-600 font-extrabold bg-blue-50'
                : 'hover:text-blue-600 hover:bg-slate-100'
            }`}
          >
            Our Team
          </Link>

          <Link
            to="/alumni"
            className={`px-3.5 py-2 rounded-full transition-all ${
              isActive('/alumni')
                ? 'text-blue-600 font-extrabold bg-blue-50'
                : 'hover:text-blue-600 hover:bg-slate-100'
            }`}
          >
            Alumni
          </Link>

          <Link
            to="/events"
            className={`px-3.5 py-2 rounded-full transition-all ${
              isActive('/events')
                ? 'text-blue-600 font-extrabold bg-blue-50'
                : 'hover:text-blue-600 hover:bg-slate-100'
            }`}
          >
            Events
          </Link>

          {isAuthenticated && (
            <Link
              to="/portal"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold transition-colors text-xs ml-1 ${
                location.pathname.startsWith('/portal')
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/60'
              }`}
            >
              <UserIcon size={13} />
              <span>User Portal</span>
            </Link>
          )}

          {isAdmin && (
            <Link
              to="/admin"
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 font-bold hover:bg-amber-100 transition-colors text-xs ml-1"
            >
              <Shield size={13} />
              <span>Admin</span>
            </Link>
          )}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/donate"
            className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-transform hover:scale-105 shadow-md shadow-blue-500/20"
          >
            <Heart size={13} className="fill-white text-white" />
            <span>Donate Us</span>
            <ArrowUpRight size={14} className="opacity-90" />
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
              <Link
                to="/portal"
                className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full transition-colors ${
                  location.pathname.startsWith('/portal')
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-800 bg-slate-100 hover:bg-slate-200'
                }`}
              >
                <UserIcon size={13} className={location.pathname.startsWith('/portal') ? 'text-white' : 'text-blue-600'} />
                <span>My Portal</span>
              </Link>
              <button
                onClick={handleLogout}
                className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
                title="Logout"
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
              <Link
                to="/login"
                className="text-xs font-semibold text-slate-700 hover:text-blue-600 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/donate"
                className="text-xs font-bold text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white px-4 py-1.5 rounded-full transition-all"
              >
                Contribute
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
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 max-w-[1400px] mx-auto bg-white border border-slate-200 rounded-2xl p-5 space-y-3 text-sm font-semibold shadow-xl">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 rounded-xl hover:bg-slate-50">
            Home
          </Link>
          <Link to="/vision" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 rounded-xl hover:bg-slate-50">
            Vision & Mission
          </Link>
          <Link to="/faculty" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 rounded-xl hover:bg-slate-50">
            Faculty Coordinator
          </Link>
          <Link to="/members" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 rounded-xl hover:bg-slate-50">
            Our Team
          </Link>
          <Link to="/alumni" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 rounded-xl hover:bg-slate-50">
            Alumni
          </Link>
          <Link to="/events" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 rounded-xl hover:bg-slate-50">
            Events
          </Link>
          {isAdmin && (
            <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 font-bold">
              Admin Dashboard
            </Link>
          )}
          {isAuthenticated && (
            <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 rounded-xl hover:bg-slate-50">
              My Profile & Certificates
            </Link>
          )}
          <Link to="/donate" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-blue-600 text-white font-semibold">
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
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-center py-2 bg-slate-100 rounded-xl">
                  Sign In
                </Link>
                <Link to="/donate" onClick={() => setMobileMenuOpen(false)} className="text-center py-2 bg-blue-600 text-white rounded-xl font-semibold">
                  Contribute
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
