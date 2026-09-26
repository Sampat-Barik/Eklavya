import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  MapPin,
  Clock,
  CheckCircle2,
  BookmarkCheck,
  Search,
  Filter,
  Users,
  Video,
  Sparkles
} from 'lucide-react';
import type { EventRegistration } from '../../types/auth';

interface AvailableEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'In-Person Event' | 'Online Webinar';
  category: string;
  registrationOpen: boolean;
}

export const PortalEvents: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'browse' | 'registrations'>('browse');
  const [availableEvents, setAvailableEvents] = useState<AvailableEvent[]>([]);
  const [myRegistrations, setMyRegistrations] = useState<EventRegistration[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [registeringId, setRegisteringId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const [eventsRes, regsRes] = await Promise.all([
            fetch('http://localhost:5000/api/portal/events', {
              headers: { Authorization: `Bearer ${token}` }
            }),
            fetch('http://localhost:5000/api/portal/my-registrations', {
              headers: { Authorization: `Bearer ${token}` }
            })
          ]);
          if (eventsRes.ok && regsRes.ok) {
            setAvailableEvents(await eventsRes.json());
            setMyRegistrations(await regsRes.json());
            return;
          }
        } catch {
          // Local fallback
        }
      }

      // Default mock data
      setAvailableEvents([
        {
          id: 'event-1',
          title: 'Flood Relief & Ration Distribution Camp 2026',
          description: 'Distributing essential food kits, medicines, and water purification packs to families in low-lying riverside blocks.',
          date: 'October 12, 2026',
          time: '09:00 AM - 02:00 PM',
          location: 'Haldia Riverside Ghat',
          type: 'In-Person Event',
          category: 'Community Welfare',
          registrationOpen: true
        },
        {
          id: 'event-2',
          title: 'Free Evening School: Science & Math Mentorship',
          description: 'Interactive STEM mentorship sessions for rural primary students to foster foundational learning and curiosity.',
          date: 'October 18, 2026',
          time: '04:00 PM - 06:30 PM',
          location: 'Debhog Village Community Hall',
          type: 'In-Person Event',
          category: 'Child Education',
          registrationOpen: true
        },
        {
          id: 'event-3',
          title: 'Animal Care & First-Aid Protocol Webinar',
          description: 'Online certified training session on emergency canine care, rabies identification, and sterile wound dressing.',
          date: 'October 25, 2026',
          time: '06:00 PM - 07:30 PM',
          location: 'Google Meet (Live Online)',
          type: 'Online Webinar',
          category: 'Animal Welfare',
          registrationOpen: true
        },
        {
          id: 'event-4',
          title: 'Winter Warmth Clothes Collection Event',
          description: 'Sorting and quality-checking donated winter clothes and blankets before dispatching to rural elderly homes.',
          date: 'November 05, 2026',
          time: '10:00 AM - 01:00 PM',
          location: 'HIT Campus Student Center',
          type: 'In-Person Event',
          category: 'Community Welfare',
          registrationOpen: true
        }
      ]);

      setMyRegistrations([
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
          id: 'reg-3',
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
    };

    fetchEvents();
  }, [user]);

  const isUserRegistered = (eventId: string) => {
    return myRegistrations.some((r) => r.eventId === eventId);
  };

  const handleRegister = async (event: AvailableEvent) => {
    setRegisteringId(event.id);
    const token = localStorage.getItem('token');

    try {
      if (token) {
        const res = await fetch(`http://localhost:5000/api/portal/events/${event.id}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            eventTitle: event.title,
            date: event.date,
            location: event.location,
            category: event.category
          })
        });

        if (res.ok) {
          const data = await res.json();
          setMyRegistrations((prev) => [...prev, data.registration]);
          setFeedback(`Registered successfully for ${event.title}!`);
          setRegisteringId(null);
          setTimeout(() => setFeedback(null), 4000);
          return;
        }
      }
    } catch {
      // Local fallback
    }

    const newReg: EventRegistration = {
      id: `reg-${event.id}-${myRegistrations.length + 1}`,
      userId: user?.id || 'demo-user',
      userEmail: user?.email || 'user@gmail.com',
      eventId: event.id,
      eventTitle: event.title,
      date: event.date,
      location: event.location,
      status: 'Confirmed',
      registeredAt: new Date().toISOString(),
      category: event.category
    };

    setMyRegistrations((prev) => [...prev, newReg]);
    setFeedback(`Registered successfully for ${event.title}!`);
    setRegisteringId(null);
    setTimeout(() => setFeedback(null), 4000);
  };

  const filteredEvents = availableEvents.filter((e) => {
    const matchesQuery =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = filterCategory === 'all' || e.category === filterCategory;
    return matchesQuery && matchesCat;
  });

  return (
    <div className="space-y-8">
      {/* Top Header & Tab Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-serif font-black text-slate-900 tracking-tight">
            Events & Volunteering
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Explore active volunteer events, webinars, and track your confirmed registrations.
          </p>
        </div>

        <div className="flex items-center p-1 bg-slate-100 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'browse'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Browse Events ({availableEvents.length})
          </button>
          <button
            onClick={() => setActiveTab('registrations')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'registrations'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookmarkCheck size={14} className="text-blue-600" />
            <span>My Registrations ({myRegistrations.length})</span>
          </button>
        </div>
      </div>

      {feedback && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 shadow-xs">
          <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {activeTab === 'browse' ? (
        <>
          {/* Search & Filter Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search events by keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter size={14} className="text-slate-500" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none"
              >
                <option value="all">All Categories</option>
                <option value="Community Welfare">Community Welfare</option>
                <option value="Child Education">Child Education</option>
                <option value="Animal Welfare">Animal Welfare</option>
              </select>
            </div>
          </div>

          {/* Events List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEvents.map((event) => {
              const registered = isUserRegistered(event.id);
              return (
                <div
                  key={event.id}
                  className="editorial-card p-6 bg-white hover:border-blue-300 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-extrabold uppercase tracking-wide border border-blue-100">
                        {event.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                        {event.type === 'Online Webinar' ? <Video size={12} className="text-indigo-600" /> : <Users size={12} className="text-blue-600" />}
                        <span>{event.type}</span>
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-base text-slate-900 tracking-tight leading-snug">
                      {event.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {event.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="space-y-1 text-xs text-slate-500">
                      <div className="flex items-center gap-2">
                        <Clock size={13} className="text-slate-400" />
                        <span>{event.date} • {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={13} className="text-slate-400" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    {registered ? (
                      <div className="w-full py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold text-center flex items-center justify-center gap-1.5">
                        <CheckCircle2 size={14} className="text-emerald-600" />
                        <span>Registered (Confirmed)</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleRegister(event)}
                        disabled={registeringId === event.id}
                        className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                      >
                        <Sparkles size={13} />
                        <span>{registeringId === event.id ? 'Registering...' : 'Register as Volunteer'}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* My Registrations Tab */
        <div className="space-y-4">
          {myRegistrations.length === 0 ? (
            <div className="editorial-card p-12 text-center space-y-3 bg-slate-50/50">
              <p className="text-xs text-slate-500">You have not registered for any events yet.</p>
              <button
                onClick={() => setActiveTab('browse')}
                className="px-4 py-2 rounded-xl bg-teal-800 text-white text-xs font-bold hover:bg-teal-700 transition-colors"
              >
                Browse Upcoming Events
              </button>
            </div>
          ) : (
            myRegistrations.map((reg) => (
              <div
                key={reg.id}
                className="editorial-card p-5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wide">
                      {reg.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      {reg.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">{reg.eventTitle}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span>{reg.date}</span>
                    <span>•</span>
                    <span>{reg.location}</span>
                    <span>•</span>
                    <span className="text-slate-400">Registered on {new Date(reg.registeredAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="self-start sm:self-auto">
                  <button
                    onClick={() => alert(`Volunteer Pass for ${user?.name}\nEvent: ${reg.eventTitle}\nStatus: ${reg.status}`)}
                    className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold transition-colors"
                  >
                    View Pass
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
