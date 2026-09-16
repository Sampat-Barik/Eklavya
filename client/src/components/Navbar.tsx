import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User as UserIcon, Menu, X, ChevronDown, Heart, Shield } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [communityDropdown, setCommunityDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-cyan-400 text-xl tracking-tighter">
              E
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg md:text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              EKLAVYA
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400 -mt-1">
              Hands That Care
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          <Link
            to="/"
            className={`px-3 py-2 rounded-lg transition-colors ${
              isActive('/') ? 'text-cyan-400 bg-slate-900' : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            Home
          </Link>

          {/* About Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setAboutDropdown(true)}
            onMouseLeave={() => setAboutDropdown(false)}
          >
            <button
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                isActive('/vision') ? 'text-cyan-400 bg-slate-900' : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <span>About Us</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${aboutDropdown ? 'rotate-180' : ''}`} />
            </button>
            {aboutDropdown && (
              <div className="absolute top-full left-0 w-48 pt-2 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-xl p-1 text-sm">
                  <Link
                    to="/vision"
                    onClick={() => setAboutDropdown(false)}
                    className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
                  >
                    Vision & Mission
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Community Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setCommunityDropdown(true)}
            onMouseLeave={() => setCommunityDropdown(false)}
          >
            <button
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                ['/faculty', '/members', '/alumni'].includes(location.pathname)
                  ? 'text-cyan-400 bg-slate-900'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <span>Community</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${communityDropdown ? 'rotate-180' : ''}`} />
            </button>
            {communityDropdown && (
              <div className="absolute top-full left-0 w-52 pt-2 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-xl p-1 text-sm">
                  <Link
                    to="/faculty"
                    onClick={() => setCommunityDropdown(false)}
                    className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
                  >
                    Faculty Co-ordinator
                  </Link>
                  <Link
                    to="/members"
                    onClick={() => setCommunityDropdown(false)}
                    className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
                  >
                    Our Team & Members
                  </Link>
                  <Link
                    to="/alumni"
                    onClick={() => setCommunityDropdown(false)}
                    className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
                  >
                    Esteemed Alumni
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/events"
            className={`px-3 py-2 rounded-lg transition-colors ${
              isActive('/events') ? 'text-cyan-400 bg-slate-900' : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            Events
          </Link>

          <Link
            to="/donate"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors font-medium ${
              isActive('/donate')
                ? 'text-rose-400 bg-rose-950/40 border border-rose-900/50'
                : 'text-rose-300 hover:text-rose-200 hover:bg-rose-950/30'
            }`}
          >
            <Heart size={15} className="fill-rose-500 text-rose-500" />
            <span>Donate Us</span>
          </Link>

          {isAdmin && (
            <Link
              to="/admin"
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-amber-400 hover:bg-amber-950/30 transition-colors font-semibold"
            >
              <Shield size={15} />
              <span>Admin</span>
            </Link>
          )}
        </nav>

        {/* Right CTA / Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 text-xs font-medium text-slate-300 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
                <UserIcon size={14} className="text-cyan-400" />
                {user?.name || 'Member'}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs bg-slate-900 hover:bg-red-950/40 text-slate-300 hover:text-red-400 border border-slate-800 hover:border-red-900/60 px-3 py-1.5 rounded-lg transition-colors"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-xs font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-900 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 px-4 py-2 rounded-lg shadow-md shadow-cyan-500/20 transition-all hover:scale-[1.02]"
              >
                Join Us
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3 text-sm animate-in slide-in-from-top duration-200">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg hover:bg-slate-900 text-slate-200"
          >
            Home
          </Link>

          <div className="pl-3 space-y-1 border-l-2 border-slate-800">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block px-3 py-1">About Us</span>
            <Link
              to="/vision"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-1.5 text-slate-300 hover:text-cyan-400"
            >
              Vision & Mission
            </Link>
          </div>

          <div className="pl-3 space-y-1 border-l-2 border-slate-800">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block px-3 py-1">Community</span>
            <Link
              to="/faculty"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-1.5 text-slate-300 hover:text-cyan-400"
            >
              Faculty Co-ordinator
            </Link>
            <Link
              to="/members"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-1.5 text-slate-300 hover:text-cyan-400"
            >
              Our Team & Members
            </Link>
            <Link
              to="/alumni"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-1.5 text-slate-300 hover:text-cyan-400"
            >
              Esteemed Alumni
            </Link>
          </div>

          <Link
            to="/events"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg hover:bg-slate-900 text-slate-200"
          >
            Events
          </Link>

          <Link
            to="/donate"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-950/40 text-rose-300 font-medium"
          >
            <Heart size={16} className="fill-rose-500 text-rose-500" />
            <span>Donate Us</span>
          </Link>

          {isAdmin && (
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg bg-amber-950/40 text-amber-300 font-medium"
            >
              Admin Dashboard
            </Link>
          )}

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2 text-red-400 bg-red-950/40 rounded-lg"
              >
                Logout ({user?.name})
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 bg-slate-900 text-slate-200 rounded-lg"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold rounded-lg"
                >
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
