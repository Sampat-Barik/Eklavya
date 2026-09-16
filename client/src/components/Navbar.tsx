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
    <header className="sticky top-3 z-50 container mx-auto px-4 max-w-6xl mb-6">
      <div className="relative flex items-center justify-between">
        {/* Main Floating Navbar Pill */}
        <div className="w-full bg-white border-[2.5px] border-slate-950 rounded-2xl p-2.5 md:p-3 shadow-[4px_4px_0px_0px_#0f172a] flex items-center justify-between gap-2">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 pl-2 group">
            <div className="w-9 h-9 rounded-xl bg-[#e9d5ff] border-2 border-slate-950 flex items-center justify-center font-black text-slate-950 shadow-[2px_2px_0px_0px_#0f172a] group-hover:bg-[#d8b4fe] transition-colors">
              <Sparkles size={18} className="text-purple-700" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base md:text-lg tracking-tight text-slate-950 leading-none">
                EKLAVYA
              </span>
              <span className="text-[9px] uppercase font-black tracking-wider text-slate-600 mt-0.5">
                Hands That Care
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-bold text-slate-800">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-lg transition-all ${
                isActive('/')
                  ? 'bg-slate-950 text-white border-2 border-slate-950 shadow-[2px_2px_0px_0px_#0f172a]'
                  : 'hover:bg-slate-100 hover:text-slate-950'
              }`}
            >
              Dashboard
            </Link>

            <Link
              to="/vision"
              className={`px-3 py-1.5 rounded-lg transition-all ${
                isActive('/vision')
                  ? 'bg-slate-950 text-white border-2 border-slate-950 shadow-[2px_2px_0px_0px_#0f172a]'
                  : 'hover:bg-slate-100 hover:text-slate-950'
              }`}
            >
              Vision
            </Link>

            <Link
              to="/faculty"
              className={`px-3 py-1.5 rounded-lg transition-all ${
                isActive('/faculty')
                  ? 'bg-slate-950 text-white border-2 border-slate-950 shadow-[2px_2px_0px_0px_#0f172a]'
                  : 'hover:bg-slate-100 hover:text-slate-950'
              }`}
            >
              Faculty
            </Link>

            <Link
              to="/members"
              className={`px-3 py-1.5 rounded-lg transition-all ${
                isActive('/members')
                  ? 'bg-slate-950 text-white border-2 border-slate-950 shadow-[2px_2px_0px_0px_#0f172a]'
                  : 'hover:bg-slate-100 hover:text-slate-950'
              }`}
            >
              Members
            </Link>

            <Link
              to="/alumni"
              className={`px-3 py-1.5 rounded-lg transition-all ${
                isActive('/alumni')
                  ? 'bg-slate-950 text-white border-2 border-slate-950 shadow-[2px_2px_0px_0px_#0f172a]'
                  : 'hover:bg-slate-100 hover:text-slate-950'
              }`}
            >
              Alumni
            </Link>

            <Link
              to="/events"
              className={`px-3 py-1.5 rounded-lg transition-all ${
                isActive('/events')
                  ? 'bg-slate-950 text-white border-2 border-slate-950 shadow-[2px_2px_0px_0px_#0f172a]'
                  : 'hover:bg-slate-100 hover:text-slate-950'
              }`}
            >
              Events
            </Link>

            <Link
              to="/donate"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-slate-950 font-bold transition-all shadow-[2px_2px_0px_0px_#0f172a] ${
                isActive('/donate')
                  ? 'bg-[#fbcfe8] text-slate-950'
                  : 'bg-[#fce7f3] text-slate-950 hover:bg-[#fbcfe8]'
              }`}
            >
              <Heart size={14} className="fill-rose-500 text-rose-500" />
              <span>Donate Us</span>
            </Link>

            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#fef08a] border-2 border-slate-950 text-slate-950 font-bold shadow-[2px_2px_0px_0px_#0f172a] hover:bg-[#fde047]"
              >
                <Shield size={14} />
                <span>Admin</span>
              </Link>
            )}
          </nav>

          {/* Right Action Pills (Live Status & Profile) */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#a7f3d0] border-2 border-slate-950 rounded-full text-[11px] font-black shadow-[2px_2px_0px_0px_#0f172a]">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>LIVE STATUS</span>
            </div>

            {isAuthenticated ? (
              <div className="flex items-center gap-2 pl-1">
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-1.5 bg-[#fecdd3] hover:bg-[#fda4af] border-2 border-slate-950 rounded-xl shadow-[2px_2px_0px_0px_#0f172a] transition-all"
                >
                  <LogOut size={16} className="text-slate-950" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-3.5 py-1.5 bg-[#bfdbfe] hover:bg-[#93c5fd] text-slate-950 border-2 border-slate-950 rounded-xl font-bold text-xs shadow-[2px_2px_0px_0px_#0f172a] transition-all"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 bg-slate-100 border-2 border-slate-950 rounded-xl shadow-[2px_2px_0px_0px_#0f172a]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* User Profile Floating Corner Button */}
        {isAuthenticated && user && (
          <div className="hidden lg:flex absolute -right-14 top-1/2 -translate-y-1/2">
            <div
              className="w-10 h-10 bg-white border-2 border-slate-950 rounded-xl flex items-center justify-center shadow-[3px_3px_0px_0px_#0f172a]"
              title={user.name}
            >
              <UserIcon size={20} className="text-slate-950" />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 bg-white border-[2.5px] border-slate-950 rounded-2xl p-4 shadow-[4px_4px_0px_0px_#0f172a] space-y-2 text-sm font-bold">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-2 rounded-xl border border-slate-950 bg-slate-50"
          >
            Dashboard
          </Link>
          <Link
            to="/vision"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-2 rounded-xl border border-slate-950 bg-slate-50"
          >
            Vision & Mission
          </Link>
          <Link
            to="/faculty"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-2 rounded-xl border border-slate-950 bg-slate-50"
          >
            Faculty Co-ordinator
          </Link>
          <Link
            to="/members"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-2 rounded-xl border border-slate-950 bg-slate-50"
          >
            Our Team
          </Link>
          <Link
            to="/alumni"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-2 rounded-xl border border-slate-950 bg-slate-50"
          >
            Alumni
          </Link>
          <Link
            to="/events"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-2 rounded-xl border border-slate-950 bg-slate-50"
          >
            Events
          </Link>
          <Link
            to="/donate"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-2 rounded-xl border-2 border-slate-950 bg-[#fbcfe8]"
          >
            Donate Us
          </Link>

          {isAuthenticated ? (
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center p-2 bg-[#fecdd3] border-2 border-slate-950 rounded-xl"
            >
              Logout ({user?.name})
            </button>
          ) : (
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center p-2 bg-[#bfdbfe] border-2 border-slate-950 rounded-xl"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center p-2 bg-[#fef08a] border-2 border-slate-950 rounded-xl"
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
