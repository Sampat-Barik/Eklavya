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
      } catch {
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
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 space-y-8 pb-16 py-4">
      {/* Top Banner */}
      <div className="editorial-card p-8 md:p-12 text-center space-y-4 bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white relative overflow-hidden shadow-xl border border-blue-800/40">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/20 backdrop-blur-md border border-blue-400/30 rounded-full text-xs font-bold text-blue-300">
          <Sparkles size={14} />
          <span>COMMUNITY DRIVES</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-extrabold tracking-tight">Events & Campaigns</h1>
        <p className="text-slate-200 text-sm max-w-xl mx-auto font-normal leading-relaxed">
          Stay updated with our ongoing educational drives, animal rescue camps, and student community initiatives.
        </p>
      </div>

      {/* Filter Tab Pills */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
            activeTab === 'all'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'bg-slate-200/80 text-slate-700 hover:bg-slate-300'
          }`}
        >
          All Events
        </button>
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
            activeTab === 'upcoming'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'bg-slate-200/80 text-slate-700 hover:bg-slate-300'
          }`}
        >
          Upcoming Drives
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
            activeTab === 'past'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'bg-slate-200/80 text-slate-700 hover:bg-slate-300'
          }`}
        >
          Past Accomplishments
        </button>
      </div>

      {/* Events Grid */}
      {loading ? (
        <div className="text-center py-16 text-slate-500 font-semibold">Loading events...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event._id}
              className="editorial-card p-8 space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <ImageWithFallback
                  src={event.imageUrl}
                  alt={event.title}
                  fallbackType="banner"
                  className="h-52 w-full rounded-[24px] object-cover shadow-sm"
                />

                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full">
                    {event.category || 'Drive'}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                      event.isUpcoming ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {event.isUpcoming ? 'Upcoming' : 'Completed'}
                  </span>
                </div>

                <h2 className="text-2xl font-serif font-extrabold text-slate-900 leading-snug">{event.title}</h2>

                <div className="space-y-1.5 text-xs font-semibold text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-blue-600" />
                    <span>{new Date(event.date).toLocaleDateString(undefined, { dateStyle: 'full' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-blue-600" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-normal">
                  {event.description}
                </p>
              </div>

              <button className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-full shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]">
                <span>{event.isUpcoming ? 'Register / Participate' : 'View Drive Gallery'}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
