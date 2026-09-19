import React, { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  User,
  LayoutDashboard,
  Calendar,
  Clock,
  Award,
  Megaphone,
  Heart,
  LogOut,
  ArrowUpRight,
  Menu,
  X,
  Sparkles,
  ShieldAlert
} from 'lucide-react';

export const UserPortalLayout: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  if (!isAuthenticated || !user) {
    navigate('/login');
    return null;
  }

  if (user.isSuspended) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="editorial-card p-10 max-w-md w-full text-center space-y-4 border-rose-200 bg-rose-50/20 shadow-lg">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
            <ShieldAlert size={28} />
          </div>
          <h2 className="text-2xl font-serif font-black text-slate-900">Account Suspended</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your member account has been temporarily suspended. Please contact the society administration.
          </p>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Overview', path: '/portal', icon: LayoutDashboard, exact: true },
    { name: 'My Profile', path: '/portal/profile', icon: User },
    { name: 'Events & Registrations', path: '/portal/events', icon: Calendar },
    { name: 'My Attendance', path: '/portal/attendance', icon: Clock },
    { name: 'My Certificates', path: '/portal/certificates', icon: Award },
    { name: 'Announcements', path: '/portal/announcements', icon: Megaphone },
    { name: 'Donation History', path: '/portal/donations', icon: Heart }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col antialiased">
      {/* 1. Dedicated Portal Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          {/* Brand & Portal Badge */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center font-extrabold text-base shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform">
                E
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-black text-lg text-slate-900 tracking-tight leading-none group-hover:text-blue-600 transition-colors">
                  Eklavya
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                  Hands That Care
                </span>
              </div>
            </Link>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/70 text-blue-700 text-[11px] font-extrabold uppercase tracking-wide">
              <Sparkles size={12} className="text-blue-600" />
              <span>User Portal</span>
            </span>
          </div>

          {/* Right User Bar */}
          <div className="flex items-center gap-3">
            {/* Public Site Link */}
            <Link
              to="/"
              className="hidden md:inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-blue-600 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <span>Public Site</span>
              <ArrowUpRight size={13} />
            </Link>

            {/* Staff / Admin Link if user has administrative rights */}
            {user.role !== 'registered_user' && (
              <Link
                to="/admin"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200 hover:bg-amber-100 px-3 py-1.5 rounded-xl transition-colors"
              >
                <span>Admin Panel</span>
                <ArrowUpRight size={13} />
              </Link>
            )}

            {/* User Pill */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-100 to-indigo-100 border border-blue-200/60 flex items-center justify-center font-bold text-blue-800 text-xs shadow-xs overflow-hidden">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user.name.charAt(0).toUpperCase()
                )}
              </div>
              <div className="hidden lg:flex flex-col text-left leading-tight">
                <span className="text-xs font-bold text-slate-900 max-w-[140px] truncate">{user.name}</span>
                <span className="text-[10px] font-semibold text-blue-600 capitalize">
                  {user.role === 'registered_user' ? 'Member' : user.role.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Logout Action */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100"
              aria-label="Toggle navigation"
            >
              {mobileNavOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Desktop Secondary Horizontal Navigation Bar */}
        <div className="hidden lg:block border-t border-slate-100 bg-slate-50/70">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto py-1">
            {navLinks.map((tab) => {
              const Icon = tab.icon;
              const active = tab.exact ? location.pathname === tab.path : location.pathname.startsWith(tab.path);
              return (
                <NavLink
                  key={tab.path}
                  to={tab.path}
                  end={tab.exact}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs shadow-blue-500/20'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                    }`
                  }
                >
                  <Icon size={14} className={active ? 'text-white' : 'text-slate-500'} />
                  <span>{tab.name}</span>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileNavOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white p-4 space-y-1.5 shadow-lg">
            {navLinks.map((tab) => {
              const Icon = tab.icon;
              return (
                <NavLink
                  key={tab.path}
                  to={tab.path}
                  end={tab.exact}
                  onClick={() => setMobileNavOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`
                  }
                >
                  <Icon size={16} />
                  <span>{tab.name}</span>
                </NavLink>
              );
            })}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold px-2">
              <Link to="/" onClick={() => setMobileNavOpen(false)} className="text-slate-600 hover:text-blue-600">
                Public Website →
              </Link>
              <button onClick={handleLogout} className="text-rose-600">
                Log Out
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Member Content Area */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-6 px-4 text-center text-xs text-slate-500 font-medium">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© 2026 Eklavya — Hands That Care (HIT Haldia). Member Portal.</span>
          <div className="flex items-center gap-4 text-slate-400">
            <Link to="/" className="hover:text-blue-600 transition-colors">Public Home</Link>
            <Link to="/events" className="hover:text-blue-600 transition-colors">Public Events</Link>
            <Link to="/donate" className="hover:text-blue-600 transition-colors">Contribute</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
