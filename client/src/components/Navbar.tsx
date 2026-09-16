import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User as UserIcon, Menu, X, Heart, Shield, Sparkles } from 'lucide-react';

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
    <header className="sticky top-3 z-50 container mx-auto px-4 md:px-8 max-w-[1500px] mb-6">
      <div className="relative flex items-center justify-between">
        {/* Main Floating Glass Navbar Container */}
        <div className="w-full bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl p-2.5 md:p-3 shadow-lg shadow-slate-900/5 flex items-center justify-between gap-2">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 pl-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-white flex items-center justify-center font-black shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Sparkles size={18} />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base md:text-lg tracking-tight bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 bg-clip-text text-transparent leading-none">
                EKLAVYA
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mt-0.5">
                Hands That Care
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-semibold text-slate-700">
            <Link
              to="/"
              className={`px-3.5 py-2 rounded-xl transition-all ${
                isActive('/')
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                  : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              Home
            </Link>

            <Link
              to="/vision"
              className={`px-3.5 py-2 rounded-xl transition-all ${
                isActive('/vision')
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                  : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              Vision & Mission
            </Link>

            <Link
              to="/faculty"
              className={`px-3.5 py-2 rounded-xl transition-all ${
                isActive('/faculty')
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                  : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              Faculty
            </Link>

            <Link
              to="/members"
              className={`px-3.5 py-2 rounded-xl transition-all ${
                isActive('/members')
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                  : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              Our Team
            </Link>

            <Link
              to="/alumni"
              className={`px-3.5 py-2 rounded-xl transition-all ${
                isActive('/alumni')
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                  : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              Alumni
            </Link>

            <Link
              to="/events"
              className={`px-3.5 py-2 rounded-xl transition-all ${
                isActive('/events')
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                  : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              Events
            </Link>

            <Link
              to="/donate"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold transition-all border ${
                isActive('/donate')
                  ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-500/20'
                  : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
              }`}
            >
              <Heart size={14} className={isActive('/donate') ? 'fill-white text-white' : 'fill-rose-500 text-rose-500'} />
              <span>Donate Us</span>
            </Link>

            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 font-bold hover:bg-amber-100 transition-all"
              >
                <Shield size={14} />
                <span>Admin</span>
              </Link>
            )}
          </nav>

          {/* Right Action Pills */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>HIT HALDIA</span>
            </div>

            {isAuthenticated ? (
              <div className="flex items-center gap-2 pl-1">
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-2 bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 border border-slate-200 rounded-xl transition-all"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-md shadow-blue-500/20 transition-all hover:-translate-y-0.5"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 bg-slate-100 border border-slate-200 rounded-xl"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* User Profile Floating Corner Button */}
        {isAuthenticated && user && (
          <div className="hidden lg:flex absolute -right-14 top-1/2 -translate-y-1/2">
            <div
              className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-md shadow-slate-900/5 text-blue-600"
              title={user.name}
            >
              <UserIcon size={20} />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 bg-white border border-slate-200 rounded-2xl p-4 shadow-xl space-y-2 text-sm font-semibold">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-2 rounded-xl bg-slate-50 text-slate-800"
          >
            Home
          </Link>
          <Link
            to="/vision"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-2 rounded-xl bg-slate-50 text-slate-800"
          >
            Vision & Mission
          </Link>
          <Link
            to="/faculty"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-2 rounded-xl bg-slate-50 text-slate-800"
          >
            Faculty Co-ordinator
          </Link>
          <Link
            to="/members"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-2 rounded-xl bg-slate-50 text-slate-800"
          >
            Our Team
          </Link>
          <Link
            to="/alumni"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-2 rounded-xl bg-slate-50 text-slate-800"
          >
            Alumni
          </Link>
          <Link
            to="/events"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-2 rounded-xl bg-slate-50 text-slate-800"
          >
            Events
          </Link>
          <Link
            to="/donate"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-2 rounded-xl bg-rose-50 text-rose-700 font-bold border border-rose-200"
          >
            Donate Us
          </Link>

          {isAuthenticated ? (
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center p-2 bg-rose-50 text-rose-600 rounded-xl border border-rose-200"
            >
              Logout ({user?.name})
            </button>
          ) : (
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center p-2 bg-slate-100 text-slate-800 rounded-xl"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center p-2 bg-blue-600 text-white font-bold rounded-xl"
              >
                Join Us
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
