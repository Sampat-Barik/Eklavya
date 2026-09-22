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
    <section id="events" className="space-y-10 py-6 sm:py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-900/[0.08] pb-6">
        <SectionTitle
          badge="CAMPUS & COMMUNITY CALENDAR"
          badgeVariant="green"
          title="Upcoming Drives & Field Events"
          highlightWord="Field Events"
          subtitle="Stay updated with our ongoing educational drives, health checkups, food distributions, and vaccination camps across Haldia."
        />

        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0 self-start md:self-auto text-xs">
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
              filter === 'upcoming'
                ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setFilter('past')}
            className={`px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
              filter === 'past'
                ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Past Milestones
          </button>
        </div>
      </div>

      {/* Asymmetric 7:5 Events & Calendar Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Events Timeline Stream (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((ev) => <EventCard key={ev._id} event={ev} />)
          ) : (
            <div className="rounded-xl border border-slate-200 bg-white p-10 text-center space-y-3">
              <Calendar size={28} className="text-slate-400 mx-auto" />
              <p className="text-xs font-medium text-slate-500">No events found in this category.</p>
            </div>
          )}

          {/* Link to full Events Page */}
          <div className="pt-2">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              <span>View full historical drives and campus archives</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Right Column: Next Major Drive Spotlight Card (5 cols) */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <div className="rounded-2xl bg-slate-950 text-white p-7 sm:p-8 border border-slate-900 shadow-sm relative overflow-hidden space-y-6">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-white/10 text-slate-300 border border-white/10 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Next Field Mobilization</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                HIT Haldia
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-normal text-white leading-snug">
                Weekly Mega Teaching & Vaccination Drive
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-normal">
                Join 40+ student volunteers at HIT Gate 1 as we depart for village tutoring centers and street animal first-aid routes across Haldia.
              </p>
            </div>

            <div className="space-y-2.5 pt-3 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex items-center gap-2.5 font-mono">
                <Calendar size={13} className="text-slate-400 shrink-0" />
                <span className="text-slate-200">Every Sunday • 4:00 PM IST</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin size={13} className="text-slate-400 shrink-0" />
                <span>Assembly: Student Activity Center, HIT Haldia</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/register"
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-2xs"
              >
                <span>Join Volunteer Roster</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
