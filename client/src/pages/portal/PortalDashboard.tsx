import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Calendar,
  Clock,
  Award,
  Heart,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Bell,
  AlertCircle
} from 'lucide-react';
import type { EventRegistration, AnnouncementItem } from '../../types/auth';

export const PortalDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalRegistrations: 2,
    totalHours: 9.5,
    totalCertificates: 2,
    totalDonations: 1
  });
  const [upcomingEvents, setUpcomingEvents] = useState<EventRegistration[]>([]);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await fetch('http://localhost:5000/api/portal/dashboard', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            setStats({
              totalRegistrations: data.stats.totalRegistrations,
              totalHours: data.stats.totalHoursVolunteered,
              totalCertificates: data.stats.totalCertificates,
              totalDonations: data.stats.totalDonations
            });
            setUpcomingEvents(data.upcomingRegistrations || []);
            setAnnouncements(data.recentAnnouncements || []);
            setLoading(false);
            return;
          }
        } catch {
          // Fallback to local demo data
        }
      }

      // Local mock fallback for fast visual demo
      setUpcomingEvents([
        {
          id: 'reg-1',
          userId: user?.id || '',
          userEmail: user?.email || '',
          eventId: 'event-1',
          eventTitle: 'Flood Relief & Ration Distribution Camp 2026',
          date: 'October 12, 2026',
          location: 'Haldia Riverside Ghat',
          status: 'Confirmed',
          registeredAt: '2026-09-18T10:30:00Z',
          category: 'Community Welfare'
        },
        {
          id: 'reg-2',
          userId: user?.id || '',
          userEmail: user?.email || '',
          eventId: 'event-3',
          eventTitle: 'Animal Care & First-Aid Protocol Webinar',
          date: 'October 25, 2026',
          location: 'Google Meet (Live Online)',
          status: 'Confirmed',
          registeredAt: '2026-09-19T14:00:00Z',
          category: 'Animal Welfare'
        }
      ]);

      setAnnouncements([
        {
          id: 'ann-1',
          title: 'Weekend Animal Vaccination & Rabies Prevention Camp',
          date: 'September 22, 2026',
          author: 'Animal Welfare Coordinator',
          category: 'Animal Care',
          priority: 'High',
          content: 'Volunteers are requested to gather at Central Lawn by 8:30 AM with safety gloves and hydration kits.'
        },
        {
          id: 'ann-2',
          title: 'Village Evening School: Mid-Semester Stationary Drive',
          date: 'September 20, 2026',
          author: 'Education Cell',
          category: 'Child Education',
          priority: 'Normal',
          content: 'Collection of notebooks, pencils, and geometry boxes will be coordinated at Student Activity Centre.'
        }
      ]);
      setLoading(false);
    };

    fetchDashboardData();
  }, [user]);

  if (!user) return null;

  return (
    <div className="space-y-8">
      {/* 1. Welcome Member Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 p-6 sm:p-8 md:p-10 text-white shadow-lg shadow-blue-900/10">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center font-serif font-black text-2xl sm:text-3xl text-white shadow-inner overflow-hidden">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                user.name.charAt(0).toUpperCase()
              )}
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-200">
                  Welcome back
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-extrabold uppercase tracking-wider">
                  Active Member
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black tracking-tight">
                {user.name}
              </h1>
              <p className="text-xs sm:text-sm text-blue-100/80 font-medium">
                {user.department ? `${user.department} • Batch ${user.batch || '2026'}` : user.email}
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              to="/portal/profile"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold backdrop-blur-sm transition-all flex items-center gap-1.5"
            >
              <span>Edit Profile</span>
            </Link>
            <Link
              to="/portal/events"
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-blue-50 text-blue-800 text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>Register Events</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
      </div>

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Link
          to="/portal/events"
          className="editorial-card p-5 hover:border-blue-300 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500">Event Registrations</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar size={16} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-black text-slate-900">
            {stats.totalRegistrations}
          </div>
          <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
            <CheckCircle2 size={12} />
            <span>Active & Upcoming</span>
          </div>
        </Link>

        <Link
          to="/portal/attendance"
          className="editorial-card p-5 hover:border-blue-300 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500">Hours Logged</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Clock size={16} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-black text-slate-900">
            {stats.totalHours} hrs
          </div>
          <div className="text-[11px] text-blue-600 font-bold mt-1">Verified on field</div>
        </Link>

        <Link
          to="/portal/certificates"
          className="editorial-card p-5 hover:border-blue-300 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500">Certificates Earned</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Award size={16} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-black text-slate-900">
            {stats.totalCertificates}
          </div>
          <div className="text-[11px] text-amber-700 font-bold mt-1">Verified & Commended</div>
        </Link>

        <Link
          to="/portal/donations"
          className="editorial-card p-5 hover:border-blue-300 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500">Donations Verified</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Heart size={16} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-black text-slate-900">
            {stats.totalDonations}
          </div>
          <div className="text-[11px] text-slate-500 font-bold mt-1">Receipts Available</div>
        </Link>
      </div>

      {/* 3. Main Split Section: Upcoming Registrations vs Society Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Upcoming Registrations */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-serif font-black text-slate-900 flex items-center gap-2">
              <Calendar size={18} className="text-blue-600" />
              <span>My Upcoming Registered Drives</span>
            </h2>
            <Link
              to="/portal/events"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          {loading ? (
            <div className="editorial-card p-8 text-center text-xs text-slate-500">Loading events...</div>
          ) : upcomingEvents.length === 0 ? (
            <div className="editorial-card p-8 text-center space-y-3 bg-slate-50/50">
              <p className="text-xs text-slate-500">You have no upcoming event registrations.</p>
              <Link
                to="/portal/events"
                className="inline-block px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors"
              >
                Browse & Register Drives
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="editorial-card p-5 hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                        {event.category}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                        {event.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-slate-900">{event.eventTitle}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{event.date}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        <span>{event.location}</span>
                      </span>
                    </div>
                  </div>
                  <Link
                    to="/portal/events"
                    className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Announcements Notice Board */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-serif font-black text-slate-900 flex items-center gap-2">
              <Bell size={18} className="text-amber-500" />
              <span>Society Notice Board</span>
            </h2>
            <Link
              to="/portal/announcements"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>All Notices</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div className="space-y-3">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="editorial-card p-4 border-l-4 border-l-blue-600 bg-white space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {ann.date}
                  </span>
                  {ann.priority === 'High' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                      <AlertCircle size={10} />
                      High Priority
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-xs text-slate-900">{ann.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{ann.content}</p>
                <div className="text-[11px] text-blue-600 font-semibold">{ann.author}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
