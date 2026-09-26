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
  ExternalLink
} from 'lucide-react';
import type { AdminModule } from '../types/auth';

interface SidebarItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  moduleKey: AdminModule;
  superAdminOnly?: boolean;
}

interface NavGroup {
  groupName: string;
  items: SidebarItem[];
}

export const AdminLayout: React.FC = () => {
  const { user, logout, hasModulePermission, isSuperAdmin } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navGroups: NavGroup[] = [
    {
      groupName: 'OVERVIEW & GOVERNANCE',
      items: [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, moduleKey: 'dashboard' },
        { name: 'Access Management', path: '/admin/access-management', icon: Key, moduleKey: 'access_management', superAdminOnly: true }
      ]
    },
    {
      groupName: 'OPERATIONS & SCHEDULES',
      items: [
        { name: 'Events', path: '/admin/events', icon: Calendar, moduleKey: 'events' },
        { name: 'Online Events', path: '/admin/online-events', icon: Monitor, moduleKey: 'online_events' },
        { name: 'GD Schedule', path: '/admin/schedules/gd', icon: Clock, moduleKey: 'gd_schedule' },
        { name: 'VE Schedule', path: '/admin/schedules/ve', icon: Clock, moduleKey: 've_schedule' },
        { name: 'CW Schedule', path: '/admin/schedules/cw', icon: Clock, moduleKey: 'cw_schedule' },
        { name: 'Photo Schedule', path: '/admin/schedules/photo', icon: Calendar, moduleKey: 'photo_schedule' }
      ]
    },
    {
      groupName: 'COMMUNITY & CADRE',
      items: [
        { name: 'Members', path: '/admin/members', icon: Users, moduleKey: 'members' },
        { name: 'Alumni', path: '/admin/alumni', icon: GraduationCap, moduleKey: 'alumni' },
        { name: 'Teachers', path: '/admin/teachers', icon: Briefcase, moduleKey: 'teachers' },
        { name: 'Volunteers', path: '/admin/volunteers', icon: Heart, moduleKey: 'volunteers' },
        { name: 'Attendance', path: '/admin/attendance', icon: CheckSquare, moduleKey: 'attendance' }
      ]
    },
    {
      groupName: 'LEDGER & APPROVALS',
      items: [
        { name: 'Donations & Ledger', path: '/admin/donations', icon: Wallet, moduleKey: 'donations' },
        { name: 'User Approvals', path: '/admin/approvals', icon: ShieldCheck, moduleKey: 'user_approvals', superAdminOnly: true },
        { name: 'Certificates', path: '/admin/certificates', icon: Award, moduleKey: 'certificates' },
        { name: 'Broadcast Email', path: '/admin/send-email', icon: Mail, moduleKey: 'send_email' }
      ]
    }
  ];

  const filterItem = (item: SidebarItem) => {
    if (isSuperAdmin) return true;
    if (item.superAdminOnly && !isSuperAdmin) return false;
    return hasModulePermission(item.moduleKey);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9FAFB] via-[#ECFDF5]/30 to-[#F0FDF4]/50 flex antialiased text-slate-800 selection:bg-teal-700 selection:text-white">
      {/* Mobile Top Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 px-4 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-800 to-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            E
          </div>
          <div>
            <span className="font-serif font-black text-sm text-teal-950 block leading-tight">Eklavya Console</span>
            <span className="text-[9px] font-mono text-emerald-700 font-bold uppercase tracking-wider">HIT Haldia Admin</span>
          </div>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-xl border border-emerald-100 bg-emerald-50/50 text-teal-900 active:scale-95 transition-transform"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Backdrop for mobile drawer */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Left Sidebar Shell */}
      <aside
        className={`fixed lg:sticky top-0 bottom-0 left-0 z-50 w-68 bg-white/95 backdrop-blur-xl border-r border-emerald-100/90 flex flex-col justify-between transition-transform duration-300 shadow-xl shadow-teal-950/5 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Logo Brand Header */}
          <div className="p-5 border-b border-emerald-100/80 flex items-center justify-between bg-gradient-to-r from-emerald-50/50 via-teal-50/30 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-teal-800 to-emerald-600 flex items-center justify-center text-white font-serif font-black text-sm shadow-md shadow-teal-900/20">
                E
              </div>
              <div className="leading-tight">
                <span className="font-serif font-black text-sm text-teal-950 tracking-tight block">EKLAVYA</span>
                <span className="text-[9px] font-mono font-bold text-emerald-700 uppercase tracking-widest block">
                  HANDS THAT CARE
                </span>
              </div>
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-teal-900 border border-emerald-200">
              Admin
            </span>
          </div>

          {/* Navigation Items List with Categories */}
          <nav className="flex-1 overflow-y-auto p-3.5 space-y-5 text-xs">
            {navGroups.map((group) => {
              const visibleItems = group.items.filter(filterItem);
              if (visibleItems.length === 0) return null;

              return (
                <div key={group.groupName} className="space-y-1">
                  <div className="px-3 pb-1 text-[10px] font-mono uppercase tracking-wider font-extrabold text-slate-400">
                    {group.groupName}
                  </div>

                  {visibleItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/admin'}
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 ${
                            isActive
                              ? 'bg-gradient-to-r from-teal-800 to-emerald-700 text-white font-bold shadow-md shadow-teal-950/20'
                              : 'text-slate-600 hover:text-teal-950 hover:bg-emerald-50/70 font-semibold'
                          }`
                        }
                      >
                        <Icon size={16} className="shrink-0" />
                        <span className="truncate">{item.name}</span>
                      </NavLink>
                    );
                  })}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Profile & Quick Actions */}
        <div className="p-4 border-t border-emerald-100/90 bg-slate-50/70 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-teal-800 to-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-sm shadow-teal-900/10">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="leading-tight overflow-hidden flex-1">
              <span className="font-bold text-xs text-teal-950 block truncate">{user?.name || 'Administrator'}</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider block truncate">
                  {user?.role ? user.role.replace('_', ' ') : 'Super Admin'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 text-xs">
            <NavLink
              to="/"
              className="text-[11px] font-bold text-slate-500 hover:text-teal-800 flex items-center gap-1 transition-colors"
            >
              <span>Public Site</span>
              <ExternalLink size={12} className="opacity-70" />
            </NavLink>

            <button
              onClick={handleLogout}
              className="text-[11px] font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut size={13} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 pt-14 lg:pt-0">
        <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 max-w-[1640px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
