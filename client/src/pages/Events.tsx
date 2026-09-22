import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

interface EventItem {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  isUpcoming?: boolean;
  category?: string;
  imageUrl?: string;
}

export const Events: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'past'>('all');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');
        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();
        setEvents(data);
      } catch {
        setEvents([
          {
            _id: '1',
            title: 'Flood Relief & Emergency Ration Distribution Camp',
            description: 'Mobilizing student volunteers to deliver dry rations, bottled drinking water, and first-aid kits to flood-affected families along the Haldia riverside colonies.',
            date: '2026-08-10',
            location: 'Haldia Riverside Colony, Haldia',
            isUpcoming: true,
            category: 'Disaster Relief'
          },
          {
            _id: '2',
            title: 'Annual Book, Stationery & Uniform Drive 2026',
            description: 'Mobilizing college donations to distribute complete school supplies, bags, notebooks, and geometry sets to 150+ underprivileged children attending our evening school.',
            date: '2026-07-20',
            location: 'Student Activity Center, HIT Campus',
            isUpcoming: true,
            category: 'Education'
          },
          {
            _id: '3',
            title: 'Mega Anti-Rabies Vaccination & Animal Health Camp',
            description: 'Inoculating over 80 stray dogs in and around the Haldia Campus perimeter in partnership with local veterinary surgeons and certified student handlers.',
            date: '2026-05-15',
            location: 'HIT Campus & Municipal Perimeter',
            isUpcoming: false,
            category: 'Animal Care'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((e) => {
    if (activeTab === 'upcoming') return e.isUpcoming;
    if (activeTab === 'past') return !e.isUpcoming;
    return true;
  });

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 sm:space-y-24">
      {/* 1. Open Architectural Page Header */}
      <div className="border-b border-slate-900/[0.08] pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-700 font-bold">
              <Calendar size={14} className="text-blue-600" />
              <span>Ground Mobilizations & Calendar • Eklavya Society</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
              Field Campaigns & <br className="hidden sm:inline" />
              Community Drives.
            </h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
              Explore upcoming outreach initiatives, anti-rabies vaccination rounds, textbook donation campaigns, and flood relief operations led by student volunteers.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
            <div className="bg-slate-50 border border-slate-900/[0.08] rounded-xl p-4 w-full sm:w-auto lg:w-full space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-600">
                <span>OPERATIONAL BASE</span>
                <span className="font-bold text-slate-900">HIT SAC</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-600">
                <span>MOBILIZATION</span>
                <span className="font-bold text-slate-900">STUDENTS & ALUMNI</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-600">
                <span>PARTICIPATION</span>
                <span className="font-bold text-blue-700">OPEN TO ALL STUDENTS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`font-mono text-xs uppercase tracking-wider font-bold px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-900/[0.08] text-slate-700 hover:bg-slate-50'
            }`}
          >
            All Drives
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`font-mono text-xs uppercase tracking-wider font-bold px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'upcoming'
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-900/[0.08] text-slate-700 hover:bg-slate-50'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`font-mono text-xs uppercase tracking-wider font-bold px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'past'
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-900/[0.08] text-slate-700 hover:bg-slate-50'
            }`}
          >
            Past Records
          </button>
        </div>

        <span className="font-mono text-xs text-slate-500">
          SHOWING {filteredEvents.length} DOCUMENTED DRIVES
        </span>
      </div>

      {/* 3. Event Cards Grid */}
      {loading ? (
        <div className="text-center py-16 text-slate-500 font-mono text-xs">QUERYING EVENT REGISTRY...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredEvents.map((event) => {
            const eventDate = new Date(event.date);
            const month = eventDate.toLocaleString('default', { month: 'short' }).toUpperCase();
            const day = eventDate.getDate();
            const year = eventDate.getFullYear();

            return (
              <div
                key={event._id}
                className="bg-white border border-slate-900/[0.08] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xs flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Header Bar with Date & Badges */}
                  <div className="flex items-start justify-between gap-4 border-b border-slate-900/[0.06] pb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-50 border border-slate-900/[0.08] rounded-xl p-2.5 text-center min-w-[54px]">
                        <span className="font-mono text-[10px] uppercase font-bold text-slate-500 block leading-tight">
                          {month}
                        </span>
                        <span className="font-serif text-2xl font-extrabold text-slate-900 block leading-tight">
                          {day}
                        </span>
                        <span className="font-mono text-[9px] text-slate-400 block leading-tight">
                          {year}
                        </span>
                      </div>

                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-blue-700 font-bold block">
                          {event.category || 'General Drive'}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          HIT Haldia Action Protocol
                        </span>
                      </div>
                    </div>

                    <span
                      className={`font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md font-bold ${
                        event.isUpcoming
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {event.isUpcoming ? 'MOBILIZING' : 'ARCHIVED'}
                    </span>
                  </div>

                  {/* Title & Location */}
                  <div className="space-y-2">
                    <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                      {event.title}
                    </h2>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                      <MapPin size={13} className="text-blue-600 shrink-0" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                    {event.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-900/[0.06]">
                  <button className="w-full py-2.5 bg-slate-50 hover:bg-slate-900 hover:text-white text-slate-800 border border-slate-900/10 font-mono text-xs uppercase tracking-wider font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                    <span>{event.isUpcoming ? 'REGISTER AS VOLUNTEER' : 'VIEW FIELD DISPATCH'}</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
