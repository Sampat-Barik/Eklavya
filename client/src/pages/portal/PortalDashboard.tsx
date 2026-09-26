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
  AlertCircle,
  TrendingUp,
  Sparkles,
  BookOpen,
  ShieldCheck,
  Flame,
  FileCheck
} from 'lucide-react';
import type { EventRegistration, AnnouncementItem } from '../../types/auth';

interface EnrichedEventRegistration extends EventRegistration {
  thumbnailUrl?: string;
  countdownDays?: number;
}

export const PortalDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalRegistrations: 2,
    totalHours: 9.5,
    totalCertificates: 2,
    totalDonations: 1
  });
  const [upcomingEvents, setUpcomingEvents] = useState<EnrichedEventRegistration[]>([]);
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
            const enriched = (data.upcomingRegistrations || []).map((e: EventRegistration, idx: number) => ({
              ...e,
              thumbnailUrl:
                idx === 0
                  ? 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=400&q=80'
                  : 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=400&q=80',
              countdownDays: idx === 0 ? 3 : 16
            }));
            setUpcomingEvents(enriched);
            setAnnouncements(data.recentAnnouncements || []);
            setLoading(false);
            return;
          }
        } catch {
          // Fallback to local demo data
        }
      }

      // Local mock fallback with rich thumbnails and countdowns
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
          category: 'Community Welfare',
          thumbnailUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=400&q=80',
          countdownDays: 3
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
          category: 'Animal Welfare',
          thumbnailUrl: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=400&q=80',
          countdownDays: 16
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
      {/* 1. Header / Hero Section: Vibrant "Impact Card" */}
      <div className="relative overflow-hidden rounded-3xl shadow-lg shadow-teal-950/10 min-h-[220px] sm:min-h-[240px] flex items-center bg-gradient-to-r from-teal-900 to-teal-700">
        {/* Background Image of Community Volunteers with Darkened Overlay */}
        <img
          src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1600&q=80"
          alt="Eklavya Volunteer Drive"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-25 mix-blend-overlay"
        />

        {/* Deep Teal Gradient Overlay for Contrast & Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-950/80 via-teal-900/70 to-teal-800/80 backdrop-blur-[0.5px]" />

        {/* User Profile Glass Card */}
        <div className="relative z-10 w-full p-6 sm:p-8 md:p-10">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Avatar & User Details */}
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="relative shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white/60 shadow-lg overflow-hidden bg-teal-800/80 flex items-center justify-center">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                {/* Active Status Beacon */}
                <span
                  className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-xs"
                  title="Member Active"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-200">
                    Welcome back
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/25 border border-emerald-400/40 text-emerald-300 text-[10px] font-extrabold uppercase tracking-wider">
                    <Sparkles size={11} className="text-emerald-300" />
                    <span>Active Member</span>
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black tracking-tight text-white">
                  {user.name}
                </h1>
                <p className="text-xs sm:text-sm text-teal-100/90 font-medium">
                  {user.department ? `${user.department} • Batch ${user.batch || '2026'}` : user.email}
                </p>
              </div>
            </div>

            {/* Actions: Frosted Glass Edit & Vibrant Energy CTA */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/portal/profile"
                className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs font-bold backdrop-blur-sm transition-all"
              >
                <span>Edit Profile</span>
              </Link>
              <Link
                to="/portal/events"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-600 hover:to-emerald-500 text-white text-xs font-extrabold shadow-md shadow-emerald-500/25 transition-all flex items-center gap-1.5 hover:scale-[1.02] active:scale-98"
              >
                <span>Register Events</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Metric Cards: Frosted Glass Cards with Mint Icon Wrappers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Metric 1: Event Registrations */}
        <Link
          to="/portal/events"
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-emerald-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Event Registrations
              </span>
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-teal-700 flex items-center justify-center p-2 group-hover:scale-110 transition-transform">
                <Calendar size={18} />
              </div>
            </div>
            <div className="flex items-baseline gap-2.5">
              <span className="text-3xl sm:text-4xl font-serif font-black text-teal-950">
                {stats.totalRegistrations}
              </span>
              <span className="inline-flex items-center text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                <TrendingUp size={11} className="mr-0.5 text-emerald-700" /> +12% this month
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-50">
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="text-teal-800 font-bold flex items-center gap-1">
                <CheckCircle2 size={12} className="text-emerald-600" />
                <span>Active & Upcoming</span>
              </span>
              <span className="text-slate-400 font-medium">2 / 3 Target</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-teal-700 h-full rounded-full w-2/3" />
            </div>
          </div>
        </Link>

        {/* Metric 2: Hours Logged */}
        <Link
          to="/portal/attendance"
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-emerald-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Hours Logged
              </span>
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-teal-700 flex items-center justify-center p-2 group-hover:scale-110 transition-transform">
                <Clock size={18} />
              </div>
            </div>
            <div className="flex items-baseline gap-2.5">
              <span className="text-3xl sm:text-4xl font-serif font-black text-teal-950">
                {stats.totalHours}
              </span>
              <span className="text-sm font-bold text-slate-500">hrs</span>
              <span className="inline-flex items-center text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                <Flame size={11} className="mr-0.5 text-emerald-700" /> +3.5 this wk
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-50">
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="text-teal-800 font-bold">Verified on field</span>
              <span className="text-slate-400 font-medium">Goal: 15h</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-600 h-full rounded-full w-[63%]" />
            </div>
          </div>
        </Link>

        {/* Metric 3: Certificates Earned */}
        <Link
          to="/portal/certificates"
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-emerald-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Certificates Earned
              </span>
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-teal-700 flex items-center justify-center p-2 group-hover:scale-110 transition-transform">
                <Award size={18} />
              </div>
            </div>
            <div className="flex items-baseline gap-2.5">
              <span className="text-3xl sm:text-4xl font-serif font-black text-teal-950">
                {stats.totalCertificates}
              </span>
              <span className="inline-flex items-center text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                <Sparkles size={11} className="mr-0.5 text-emerald-700" /> Verified
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-50">
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="text-teal-800 font-bold">Level 2 Cadre Badge</span>
              <span className="text-slate-400 font-medium">2 / 3 Badges</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-teal-600 h-full rounded-full w-2/3" />
            </div>
          </div>
        </Link>

        {/* Metric 4: Donations Verified */}
        <Link
          to="/portal/donations"
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-emerald-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Donations Verified
              </span>
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-teal-700 flex items-center justify-center p-2 group-hover:scale-110 transition-transform">
                <Heart size={18} className="fill-current text-teal-700" />
              </div>
            </div>
            <div className="flex items-baseline gap-2.5">
              <span className="text-3xl sm:text-4xl font-serif font-black text-teal-950">
                {stats.totalDonations}
              </span>
              <span className="inline-flex items-center text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                <FileCheck size={11} className="mr-0.5 text-emerald-700" /> 100% Tax-Exempt
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-50">
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="text-teal-800 font-bold">Official Receipts Ready</span>
              <span className="text-emerald-600 font-bold">Verified</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-600 h-full rounded-full w-full" />
            </div>
          </div>
        </Link>
      </div>

      {/* 3. Main Split Section: Drives with Visual Thumbnails vs Bulletin Notice Board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left: Upcoming Registered Drives (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                <Calendar size={18} />
              </div>
              <h2 className="text-lg font-serif font-black text-slate-900">
                My Upcoming Registered Drives
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 text-[10px] font-bold border border-teal-200/60">
                {upcomingEvents.length} Active
              </span>
            </div>
            <Link
              to="/portal/events"
              className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 group"
            >
              <span>View All</span>
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="bg-white rounded-2xl p-8 text-center text-xs text-slate-500 border border-slate-200/80">
              Loading registered drives...
            </div>
          ) : upcomingEvents.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center space-y-3 border border-slate-200/80">
              <p className="text-xs text-slate-500">You have no upcoming event registrations.</p>
              <Link
                to="/portal/events"
                className="inline-block px-4 py-2 rounded-xl bg-teal-700 text-white font-bold text-xs hover:bg-teal-800 transition-colors"
              >
                Browse & Register Drives
              </Link>
            </div>
          ) : (
            <div className="space-y-3.5">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-teal-200 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                >
                  <div className="flex items-start gap-4 min-w-0">
                    {/* Square Thumbnail Image Placeholder */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-slate-100 shadow-xs">
                      <img
                        src={
                          event.thumbnailUrl ||
                          'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=400&q=80'
                        }
                        alt={event.eventTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-[10px] font-bold uppercase tracking-wider border border-teal-200/60">
                          {event.category}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200/60">
                          {event.status}
                        </span>
                        {/* Countdown Badge */}
                        {event.countdownDays !== undefined && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200 font-extrabold text-[10px]">
                            <Flame size={11} className="text-orange-600" />
                            <span>{event.countdownDays} Days Left</span>
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-sm text-slate-900 group-hover:text-teal-800 transition-colors line-clamp-1">
                        {event.eventTitle}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1.5 text-slate-600">
                          <Clock size={13} className="text-teal-600" />
                          <span>{event.date}</span>
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="flex items-center gap-1.5 text-slate-600">
                          <MapPin size={13} className="text-emerald-600" />
                          <span className="truncate max-w-[200px]">{event.location}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/portal/events"
                    className="self-stretch sm:self-auto text-center px-4 py-2 rounded-xl border border-teal-200 bg-teal-50/50 hover:bg-teal-700 hover:text-white hover:border-teal-700 text-teal-800 text-xs font-bold transition-all shrink-0"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Society Notice Board - Genuine Bulletin Aesthetics (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                <Bell size={18} />
              </div>
              <h2 className="text-lg font-serif font-black text-slate-900">
                Society Notice Board
              </h2>
            </div>
            <Link
              to="/portal/announcements"
              className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 group"
            >
              <span>All Notices</span>
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="space-y-3.5">
            {announcements.map((ann) => {
              const isHighPriority = ann.priority === 'High';
              return (
                <div
                  key={ann.id}
                  className={`rounded-2xl p-5 border transition-all shadow-xs hover:shadow-md space-y-3 ${
                    isHighPriority
                      ? 'bg-rose-50/70 border-rose-200 hover:border-rose-300'
                      : 'bg-teal-50/40 border-teal-100 hover:border-teal-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 font-mono">
                      {ann.date}
                    </span>

                    {isHighPriority ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-800 border border-rose-200/80">
                        <AlertCircle size={11} className="text-rose-600" />
                        <span>High Priority</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-100/70 text-teal-800 border border-teal-200/60">
                        {ann.category || 'General Notice'}
                      </span>
                    )}
                  </div>

                  <h3
                    className={`font-serif font-bold text-sm ${
                      isHighPriority ? 'text-rose-950' : 'text-slate-900'
                    }`}
                  >
                    {ann.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {ann.content}
                  </p>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                          isHighPriority
                            ? 'bg-rose-100 text-rose-700'
                            : 'bg-teal-100 text-teal-800'
                        }`}
                      >
                        {ann.author.toLowerCase().includes('animal') ? (
                          <ShieldCheck size={14} />
                        ) : (
                          <BookOpen size={14} />
                        )}
                      </div>
                      <span className="text-[11px] font-bold text-slate-700">{ann.author}</span>
                    </div>

                    <Link
                      to="/portal/announcements"
                      className="text-[11px] font-bold text-teal-700 hover:text-teal-900 hover:underline"
                    >
                      Read Notice →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

