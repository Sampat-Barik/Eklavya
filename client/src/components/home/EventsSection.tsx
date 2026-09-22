import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SectionTitle } from '../ui/SectionTitle';
import { EventCard } from '../ui/EventCard';
import type { NGOEvent } from '../../types/ngo';
import { ngoService } from '../../services/ngoService';
import { Calendar, ArrowRight, MapPin } from 'lucide-react';

export const EventsSection: React.FC = () => {
  const [events, setEvents] = useState<NGOEvent[]>([]);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    const loadEvents = async () => {
      const data = await ngoService.getEvents();
      setEvents(data);
    };
    loadEvents();
  }, []);

  const filteredEvents = events.filter((e) => {
    if (filter === 'upcoming') return e.isUpcoming;
    if (filter === 'past') return !e.isUpcoming;
    return true;
  });

  return (
    <section id="events" className="space-y-10 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-6">
        <SectionTitle
          badge="CAMPUS & COMMUNITY CALENDAR"
          badgeVariant="green"
          title="Upcoming Drives & Field Events"
          highlightWord="Field Events"
          subtitle="Stay updated with our ongoing educational drives, health checkups, food distributions, and vaccination camps across Haldia."
        />

        <div className="flex items-center gap-1.5 p-1.5 bg-slate-200/60 rounded-full shrink-0">
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              filter === 'upcoming'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-blue-600'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              filter === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setFilter('past')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              filter === 'past'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Past Milestones
          </button>
        </div>
      </div>

      {/* Asymmetric Events & Calendar Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Events Timeline Stream (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((ev) => <EventCard key={ev._id} event={ev} />)
          ) : (
            <div className="editorial-card p-10 text-center space-y-3">
              <Calendar size={32} className="text-slate-400 mx-auto" />
              <p className="text-sm font-semibold text-slate-600">No events found in this category.</p>
            </div>
          )}

          {/* Link to full Events Page */}
          <div className="pt-2">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 text-xs font-bold transition-colors border border-slate-200/80"
            >
              <span>View All Historical Drives & Archives</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Right Column: Next Major Drive Spotlight Card (5 cols) */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-7 sm:p-8 border border-blue-900/60 shadow-xl relative overflow-hidden space-y-6">
            {/* Subtle glow circle */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between">
              <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Next Field Mobilization</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400 font-semibold">
                HIT Haldia Campus
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-white leading-snug">
                Weekly Mega Teaching & Vaccination Drive
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                Join 40+ student volunteers at HIT Gate 1 as we depart for village tutoring centers and street animal first-aid routes across Haldia.
              </p>
            </div>

            <div className="space-y-3 pt-2 border-t border-white/10 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <Calendar size={15} className="text-blue-400 shrink-0" />
                <span className="font-semibold text-white">Every Sunday • 4:00 PM IST</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin size={15} className="text-amber-400 shrink-0" />
                <span>Assembly: Student Activity Center, HIT Haldia</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/register"
                className="w-full py-3.5 px-5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 hover:scale-102"
              >
                <span>Join Volunteer Roster</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

