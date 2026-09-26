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
  ArrowRight,
  Sparkles,
  MapPin,
  TrendingUp,
  ShieldAlert,
  Compass
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { user, allUsers } = useAuth();

  const pendingRequests = allUsers.filter((u) => u.adminRequest?.status === 'pending');

  const stats = [
    {
      label: 'Total Members',
      value: '18',
      trend: '+4 this semester',
      subtext: 'Active student cadre',
      icon: Users,
      trendColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      label: 'Total Alumni',
      value: '36',
      trend: '100% placed',
      subtext: 'Graduated engineers network',
      icon: GraduationCap,
      trendColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      label: 'Total Events',
      value: '17',
      trend: '3 active this week',
      subtext: 'Haldia field deployments',
      icon: Calendar,
      trendColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      label: 'Registered Users',
      value: `${allUsers.length + 840}`,
      trend: '+18% growth',
      subtext: 'Verified portal accounts',
      icon: UserCheck,
      trendColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      label: 'Active Volunteers',
      value: '42',
      trend: 'On-duty today',
      subtext: 'Covering 3 centres',
      icon: Heart,
      trendColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      label: 'Event Registrations',
      value: '28',
      trend: 'Upcoming confirmed',
      subtext: 'Students & community',
      icon: ClipboardList,
      trendColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      label: 'Pending Approvals',
      value: `${pendingRequests.length}`,
      trend: pendingRequests.length > 0 ? 'Requires Action' : 'All clear',
      subtext: 'Role elevation requests',
      icon: Clock,
      trendColor: pendingRequests.length > 0 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
    }
  ];

  const recentEvents = [
    {
      id: '1',
      title: 'Flood Relief & Ration Distribution Camp',
      category: 'Social Relief',
      year: '2026',
      date: 'Oct 12, 2026',
      img: '/eklavya_human_hero.jpg'
    },
    {
      id: '2',
      title: 'Mega Academic Supplies & Book Distribution',
      category: 'Education',
      year: '2026',
      date: 'Oct 28, 2026',
      img: '/eklavya_hero_bg.jpg'
    },
    {
      id: '3',
      title: 'Rabies Vaccination & Health Camp',
      category: 'Animal Welfare',
      year: '2026',
      date: 'Nov 05, 2026',
      img: '/eklavya_animal_care.jpg'
    }
  ];

  const centresSummary = [
    {
      name: 'HIT College Campus Hub',
      focus: 'Central HQ & Animal Rescue Triage',
      status: 'Active 24/7',
      squad: '28 Volunteers On-Duty',
      dot: 'bg-emerald-500'
    },
    {
      name: 'Ranichak Evening School',
      focus: 'Primary Tutoring & Nutrition Station',
      status: 'Active Now',
      squad: '14 Volunteers On-Duty',
      dot: 'bg-emerald-500'
    },
    {
      name: 'Khudiram Centre',
      focus: 'Remedial Literacy & Community Care',
      status: 'Active Now',
      squad: '12 Volunteers On-Duty',
      dot: 'bg-emerald-500'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b border-emerald-100/90 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100/80 text-teal-900 text-[10px] font-mono font-extrabold uppercase tracking-wider border border-emerald-200">
              Admin Governance Center
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-xs font-semibold text-emerald-800 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>All 3 Centres Online</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-teal-950 tracking-tight">
            Welcome back, {user?.name || 'Administrator'} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Here's what's happening across Eklavya ground operations, society rosters, and verified records today.
          </p>
        </div>

        {/* Live Date & Operations Pill */}
        <div className="flex items-center gap-2.5 self-start lg:self-auto">
          <div className="px-4 py-2 rounded-2xl bg-white/90 backdrop-blur-md border border-emerald-100 shadow-xs flex items-center gap-2 text-xs font-bold text-teal-950">
            <Calendar size={14} className="text-teal-700" />
            <span>
              {new Date().toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-sm border border-emerald-50 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-teal-700 flex items-center justify-center group-hover:scale-105 transition-transform border border-emerald-100">
                    <Icon size={18} />
                  </div>
                </div>

                <div className="flex items-baseline gap-2.5">
                  <div className="text-3xl sm:text-4xl font-serif font-black text-teal-900">
                    {stat.value}
                  </div>
                  <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full ${stat.trendColor}`}>
                    <TrendingUp size={11} className="mr-0.5" />
                    {stat.trend}
                  </span>
                </div>
              </div>

              <div className="mt-3.5 pt-2.5 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                {stat.subtext}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action Command Center */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-serif font-bold text-teal-950 flex items-center gap-2">
            <Sparkles size={17} className="text-emerald-600" />
            <span>Quick Command Actions</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">Society administrative shortcuts</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <Link
            to="/admin/events"
            className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-emerald-50 hover:border-teal-600 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-100 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                <Plus size={16} />
              </div>
              <ArrowRight size={14} className="text-slate-400 group-hover:text-teal-700 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <h3 className="font-bold text-xs text-teal-950 group-hover:text-teal-800">Add New Event</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Publish community relief, education, or welfare</p>
            </div>
          </Link>

          <Link
            to="/admin/members"
            className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-emerald-50 hover:border-teal-600 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                <Users size={16} />
              </div>
              <ArrowRight size={14} className="text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <h3 className="font-bold text-xs text-teal-950 group-hover:text-teal-800">Add New Member</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Onboard student volunteers to official cadre</p>
            </div>
          </Link>

          <Link
            to="/admin/approvals"
            className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-emerald-50 hover:border-teal-600 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <ShieldAlert size={16} />
              </div>
              {pendingRequests.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-extrabold border border-amber-300">
                  {pendingRequests.length} Pending
                </span>
              )}
            </div>
            <div>
              <h3 className="font-bold text-xs text-teal-950 group-hover:text-teal-800">Review Approvals</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Verify role elevation requests & credentials</p>
            </div>
          </Link>

          <Link
            to="/admin/send-email"
            className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-emerald-50 hover:border-teal-600 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center border border-cyan-100 group-hover:bg-cyan-700 group-hover:text-white transition-colors">
                <Mail size={16} />
              </div>
              <ArrowRight size={14} className="text-slate-400 group-hover:text-cyan-700 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <h3 className="font-bold text-xs text-teal-950 group-hover:text-teal-800">Broadcast Email</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Send circulars to volunteers & faculty</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Main Split Section: Recent Events & Operational Centres Quick-Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Events (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-serif font-bold text-teal-950 flex items-center gap-2">
              <Calendar size={18} className="text-teal-700" />
              <span>Recent & Upcoming Field Events</span>
            </h2>
            <Link
              to="/admin/events"
              className="text-xs font-bold text-teal-800 hover:text-teal-950 flex items-center gap-1 group"
            >
              <span>Manage Events</span>
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentEvents.map((ev) => (
              <div
                key={ev.id}
                className="p-3.5 bg-white/80 backdrop-blur-sm border border-emerald-50 rounded-2xl flex items-center justify-between gap-4 shadow-xs hover:border-teal-300 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <img src={ev.img} alt={ev.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 text-[10px] font-bold border border-teal-200/60">
                        {ev.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 font-semibold">{ev.date}</span>
                    </div>
                    <h3 className="font-bold text-xs text-teal-950 truncate group-hover:text-teal-800 transition-colors">
                      {ev.title}
                    </h3>
                  </div>
                </div>

                <Link
                  to="/admin/events"
                  className="p-2 rounded-xl text-slate-400 hover:text-teal-800 hover:bg-teal-50 transition-colors shrink-0"
                >
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Live Operational Centres Quick Status (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-serif font-bold text-teal-950 flex items-center gap-2">
              <Compass size={18} className="text-emerald-700" />
              <span>Ground Centres Operational Status</span>
            </h2>
            <Link
              to="/#ground-centres"
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
            >
              <span>View Map</span>
              <MapPin size={12} />
            </Link>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-emerald-50 shadow-xs space-y-3.5">
            {centresSummary.map((centre, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${centre.dot} animate-pulse`} />
                    <h4 className="font-bold text-xs text-teal-950">{centre.name}</h4>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {centre.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">{centre.focus}</p>
                <div className="text-[10px] font-mono text-teal-800 font-bold">
                  {centre.squad}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
