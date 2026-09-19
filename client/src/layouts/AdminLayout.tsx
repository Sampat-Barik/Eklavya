import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Wallet,
  Calendar,
  Monitor,
  Users,
  GraduationCap,
  Briefcase,
  Heart,
  CheckSquare,
  Clock,
  Mail,
  ShieldCheck,
  Award,
  Key,
  LogOut,
  Menu,
  X,
  ArrowUpRight
} from 'lucide-react';
import type { AdminModule } from '../types/auth';

interface SidebarItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  moduleKey: AdminModule;
  superAdminOnly?: boolean;
}

export const AdminLayout: React.FC = () => {
  const { user, logout, hasModulePermission, isSuperAdmin } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems: SidebarItem[] = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, moduleKey: 'dashboard' },
    { name: 'Donations', path: '/admin/donations', icon: Wallet, moduleKey: 'donations' },
    { name: 'Events', path: '/admin/events', icon: Calendar, moduleKey: 'events' },
    { name: 'Online Events', path: '/admin/online-events', icon: Monitor, moduleKey: 'online_events' },
    { name: 'Members', path: '/admin/members', icon: Users, moduleKey: 'members' },
    { name: 'Alumni', path: '/admin/alumni', icon: GraduationCap, moduleKey: 'alumni' },
    { name: 'Teachers', path: '/admin/teachers', icon: Briefcase, moduleKey: 'teachers' },
    { name: 'Volunteers', path: '/admin/volunteers', icon: Heart, moduleKey: 'volunteers' },
    { name: 'Attendance', path: '/admin/attendance', icon: CheckSquare, moduleKey: 'attendance' },
    { name: 'GD Schedule', path: '/admin/schedules/gd', icon: Clock, moduleKey: 'gd_schedule' },
    { name: 'VE Schedule', path: '/admin/schedules/ve', icon: Clock, moduleKey: 've_schedule' },
    { name: 'CW Schedule', path: '/admin/schedules/cw', icon: Clock, moduleKey: 'cw_schedule' },
    { name: 'Photo Schedule', path: '/admin/schedules/photo', icon: Calendar, moduleKey: 'photo_schedule' },
    { name: 'Send Email', path: '/admin/send-email', icon: Mail, moduleKey: 'send_email' },
    { name: 'User Approvals', path: '/admin/approvals', icon: ShieldCheck, moduleKey: 'user_approvals', superAdminOnly: true },
    { name: 'Certificate', path: '/admin/certificates', icon: Award, moduleKey: 'certificates' },
    { name: 'Access Management', path: '/admin/access-management', icon: Key, moduleKey: 'access_management', superAdminOnly: true }
  ];

  // Filter navigation items based on user permissions
  const visibleNavItems = navItems.filter((item) => {
    if (isSuperAdmin) return true;
    if (item.superAdminOnly && !isSuperAdmin) return false;
    return hasModulePermission(item.moduleKey);
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] flex antialiased">
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
            E
          </div>
          <span className="font-extrabold text-base text-slate-900">Eklavya Admin</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 rounded-lg border border-slate-200 text-slate-700"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Left Sidebar Shell */}
      <aside
        className={`fixed lg:sticky top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Logo Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border-2 border-cyan-500 flex items-center justify-center text-cyan-600 font-bold text-xs">
                E
              </div>
              <div className="leading-none">
                <span className="font-black text-sm text-slate-900 tracking-tight block">EKLAVYA</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">HANDS THAT CARE</span>
              </div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
              Admin
            </span>
          </div>

          {/* Navigation Items List */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-0.5 text-xs font-semibold">
            {visibleNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/admin'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`
                  }
                >
                  <Icon size={16} className="shrink-0" />
                  <span className="truncate">{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Profile & Logout */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border border-slate-300 bg-white flex items-center justify-center font-bold text-slate-700 text-xs shadow-xs">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="leading-tight overflow-hidden flex-1">
              <span className="font-bold text-xs text-slate-900 block truncate">{user?.name}</span>
              <span className="text-[10px] font-semibold text-blue-600 capitalize block truncate">
                {user?.role ? user.role.replace('_', ' ') : 'Admin'}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-xs">
            <NavLink
              to="/"
              className="text-[11px] font-bold text-slate-500 hover:text-blue-600 flex items-center gap-1"
            >
              <span>Public Site</span>
              <ArrowUpRight size={12} />
            </NavLink>

            <button
              onClick={handleLogout}
              className="text-[11px] font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1.5 transition-colors"
            >
              <LogOut size={13} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pt-14 lg:pt-0">
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-[1600px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
