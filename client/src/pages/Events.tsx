import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';

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
      } catch (err) {
        console.error("Using fallback events dataset:", err);
        setEvents([
          {
            _id: '1',
            title: 'Flood Relief & Ration Distribution Camp 2026',
            description: 'Distributing essential food items, clean water kits, and emergency medicines to flood-affected families near Haldia riverside.',
            date: '2026-08-10',
            location: 'Haldia Riverside Colony',
            isUpcoming: true,
            category: 'Social Relief'
          },
          {
            _id: '2',
            title: 'Annual Book & Stationery Drive',
            description: 'Collecting notebooks, bags, geometry sets, and storybooks for 150+ underprivileged children enrolled in our evening classes.',
            date: '2026-07-20',
            location: 'HIT Student Activity Center',
            isUpcoming: true,
            category: 'Education'
          },
          {
            _id: '3',
            title: 'Mega Anti-Rabies Vaccination Drive',
            description: 'Vaccinating over 80 stray dogs in and around the Haldia Campus in collaboration with local veterinary experts.',
            date: '2026-05-15',
            location: 'HIT Campus & Surrounding Area',
            isUpcoming: false,
            category: 'Animal Welfare'
          },
          {
            _id: '4',
            title: 'Winter Cloth Distribution Drive',
            description: 'Distributed 300+ warm blankets and jackets to elderly citizens and children in local slums during peak winter.',
            date: '2025-12-22',
            location: 'Haldia Township & Slum Areas',
            isUpcoming: false,
            category: 'Social Relief'
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
    <div className="bg-slate-950 text-slate-100 min-h-screen pb-16">
      {/* Top Banner */}
      <div className="py-16 bg-gradient-to-b from-blue-950/70 via-slate-900 to-slate-950 border-b border-slate-800 text-center px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/40 border border-blue-700/50 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={14} />
            Community Service & Welfare Drives
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">Events & Campaigns</h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Stay updated with our ongoing educational drives, animal rescue camps, and student community initiatives.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl space-y-8">
        {/* Tab Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'upcoming'
                ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Upcoming Drives
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'past'
                ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Past Accomplishments
          </button>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-400">Loading events...</div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-16 text-slate-400 bg-slate-900/40 border border-slate-800 rounded-2xl">
            No events found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredEvents.map((event) => (
              <div
                key={event._id}
                className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-3xl overflow-hidden shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <ImageWithFallback
                    src={event.imageUrl}
                    alt={event.title}
                    fallbackType="banner"
                    className="h-48 w-full object-cover border-b border-slate-800"
                  />
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 border border-cyan-800/60 px-3 py-1 rounded-full">
                        {event.category || 'Drive'}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          event.isUpcoming
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/80'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {event.isUpcoming ? 'Upcoming' : 'Completed'}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-white leading-snug">{event.title}</h2>

                    <div className="space-y-1.5 text-xs text-slate-300">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-cyan-400 shrink-0" />
                        <span>{new Date(event.date).toLocaleDateString(undefined, { dateStyle: 'full' })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-rose-400 shrink-0" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                      {event.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-cyan-400 hover:text-cyan-300 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors">
                    <span>{event.isUpcoming ? 'Register / Participate' : 'View Drive Gallery'}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
