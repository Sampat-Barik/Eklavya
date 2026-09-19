import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Users,
  GraduationCap,
  Calendar,
  UserCheck,
  Heart,
  ClipboardList,
  Clock,
  Plus,
  Mail,
  ArrowUpRight
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { user, allUsers } = useAuth();

  const pendingRequests = allUsers.filter((u) => u.adminRequest?.status === 'pending');

  const stats = [
    { label: 'Total Members', value: '18', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Alumni', value: '36', icon: GraduationCap, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Total Events', value: '17', icon: Calendar, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Total Users', value: `${allUsers.length + 840}`, icon: UserCheck, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Total Volunteers', value: '0', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'Total Registrations', value: '0', icon: ClipboardList, color: 'text-teal-600', bg: 'bg-teal-50' },
    { label: 'Pending Approvals', value: `${pendingRequests.length}`, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' }
  ];

  const recentEvents = [
    {
      id: '1',
      title: 'Flood Relief Camp',
      year: '2026',
      img: '/eklavya_human_hero.jpg'
    },
    {
      id: '2',
      title: 'Survey 2k26',
      year: '2026',
      img: '/eklavya_hero_bg.jpg'
    },
    {
      id: '3',
      title: "Rabindra Jayanti & Mother's Day",
      year: '2026',
      img: '/eklavya_animal_care.jpg'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-slate-900">
            Welcome back, {user?.name || 'Admin'} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">Here's what's happening with Eklavya today</p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-2 text-xs font-semibold text-slate-600">
          <Calendar size={14} className="text-blue-600" />
          <span>Sunday, September 20, 2026</span>
        </div>
      </div>

      {/* Metrics Grid matching Screenshot 1 */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 flex items-center justify-between shadow-xs"
            >
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500">{stat.label}</span>
                <div className="text-2xl sm:text-3xl font-serif font-black text-slate-900">{stat.value}</div>
              </div>
              <div className={`w-11 h-11 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
                <Icon size={20} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions & Recent Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Quick Actions */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-base font-bold text-slate-900">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <Link
              to="/admin/events"
              className="p-4 rounded-2xl border-2 border-blue-500/80 bg-white hover:bg-blue-50/50 text-blue-700 text-xs font-bold transition-all flex items-center gap-2.5 shadow-xs"
            >
              <Plus size={16} />
              <span>Add New Event</span>
            </Link>

            <Link
              to="/admin/members"
              className="p-4 rounded-2xl border-2 border-purple-500/80 bg-white hover:bg-purple-50/50 text-purple-700 text-xs font-bold transition-all flex items-center gap-2.5 shadow-xs"
            >
              <Plus size={16} />
              <span>Add New Member</span>
            </Link>

            <Link
              to="/admin/approvals"
              className="p-4 rounded-2xl border-2 border-amber-500/80 bg-white hover:bg-amber-50/50 text-amber-800 text-xs font-bold transition-all flex items-center gap-2.5 shadow-xs"
            >
              <Users size={16} />
              <span>View Pending Approvals ({pendingRequests.length})</span>
            </Link>

            <Link
              to="/admin/send-email"
              className="p-4 rounded-2xl border-2 border-emerald-500/80 bg-white hover:bg-emerald-50/50 text-emerald-800 text-xs font-bold transition-all flex items-center gap-2.5 shadow-xs"
            >
              <Mail size={16} />
              <span>Send Email</span>
            </Link>
          </div>
        </div>

        {/* Recent Events List matching Screenshot 1 */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Recent Events</h2>
            <Link to="/admin/events" className="text-xs font-bold text-slate-500 hover:text-blue-600 flex items-center gap-1">
              <span>View All</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>

          <div className="space-y-3">
            {recentEvents.map((ev) => (
              <div
                key={ev.id}
                className="p-3 bg-white border border-slate-200/90 rounded-2xl flex items-center justify-between gap-3 shadow-xs hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                    <img src={ev.img} alt={ev.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-slate-900">{ev.title}</h3>
                    <span className="text-[10px] text-slate-400">{ev.year}</span>
                  </div>
                </div>
                <ArrowUpRight size={15} className="text-slate-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
