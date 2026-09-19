import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SectionTitle } from '../ui/SectionTitle';
import { EventCard } from '../ui/EventCard';
import type { NGOEvent } from '../../types/ngo';
import { ngoService } from '../../services/ngoService';
import { Calendar, ArrowRight } from 'lucide-react';

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

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((ev) => <EventCard key={ev._id} event={ev} />)
        ) : (
          <div className="editorial-card p-10 text-center space-y-3">
            <Calendar size={32} className="text-slate-400 mx-auto" />
            <p className="text-sm font-semibold text-slate-600">No events found in this category.</p>
          </div>
        )}
      </div>

      {/* Bottom Link to full Events Page */}
      <div className="flex justify-center pt-2">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 text-xs font-bold transition-colors border border-slate-200/80"
        >
          <span>View All Historical Drives & Archives</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
};
