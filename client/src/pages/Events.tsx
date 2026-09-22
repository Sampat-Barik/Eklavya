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
    <div className="max-w-[1720px] 2xl:max-w-[1800px] w-full mx-auto px-6 sm:px-10 lg:px-16 py-10 sm:py-16 space-y-16 sm:space-y-24">
      {/* 1. Open Architectural Page Header */}
      <div className="border-b border-[#E5E0D8] pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#C25E38] font-bold">
              <Calendar size={14} className="text-[#C25E38]" />
              <span>Ground Mobilizations & Calendar • Eklavya Society</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#1C2826] leading-[1.08]">
              Field Campaigns & <br className="hidden sm:inline" />
              Community Drives.
            </h1>
            <p className="text-[#1C2826]/70 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
              Explore upcoming outreach initiatives, anti-rabies vaccination rounds, textbook donation campaigns, and flood relief operations led by student volunteers.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
            <div className="bg-white/85 backdrop-blur-md border border-[#E5E0D8] rounded-xl p-5 w-full sm:w-auto lg:w-full space-y-2.5 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-mono text-[#1C2826]/60">
                <span>OPERATIONAL BASE</span>
                <span className="font-bold text-[#1C2826]">HIT SAC</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-[#1C2826]/60">
                <span>MOBILIZATION</span>
                <span className="font-bold text-[#1C2826]">STUDENTS & ALUMNI</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-[#1C2826]/60">
                <span>PARTICIPATION</span>
                <span className="font-bold text-[#C25E38]">OPEN TO ALL STUDENTS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 p-1 bg-[#E5E0D8]/40 border border-[#E5E0D8] rounded-xl">
          <button
            onClick={() => setActiveTab('all')}
            className={`font-mono text-xs uppercase tracking-wider font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#1C2826] text-[#FAF8F5]'
                : 'text-[#1C2826]/70 hover:text-[#1C2826]'
            }`}
          >
            All Drives
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`font-mono text-xs uppercase tracking-wider font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'upcoming'
                ? 'bg-[#1C2826] text-[#FAF8F5]'
                : 'text-[#1C2826]/70 hover:text-[#1C2826]'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`font-mono text-xs uppercase tracking-wider font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'past'
                ? 'bg-[#1C2826] text-[#FAF8F5]'
                : 'text-[#1C2826]/70 hover:text-[#1C2826]'
            }`}
          >
            Past Records
          </button>
        </div>

        <span className="font-mono text-xs text-[#1C2826]/60">
          SHOWING {filteredEvents.length} DOCUMENTED DRIVES
        </span>
      </div>

      {/* 3. Event Cards Grid */}
      {loading ? (
        <div className="text-center py-16 text-[#1C2826]/60 font-mono text-xs">QUERYING EVENT REGISTRY...</div>
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
                className="bg-white/85 backdrop-blur-md border border-[#E5E0D8] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xs flex flex-col justify-between hover:border-[#C25E38]/40 transition-colors"
              >
                <div className="space-y-4">
                  {/* Top Header Bar with Date & Badges */}
                  <div className="flex items-start justify-between gap-4 border-b border-[#E5E0D8] pb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl p-2.5 text-center min-w-[54px]">
                        <span className="font-mono text-[10px] uppercase font-bold text-[#1C2826]/50 block leading-tight">
                          {month}
                        </span>
                        <span className="font-serif text-2xl font-normal text-[#1C2826] block leading-tight">
                          {day}
                        </span>
                        <span className="font-mono text-[9px] text-[#1C2826]/40 block leading-tight">
                          {year}
                        </span>
                      </div>

                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#C25E38] font-bold block">
                          {event.category || 'General Drive'}
                        </span>
                        <span className="text-xs text-[#1C2826]/60 font-medium">
                          HIT Haldia Action Protocol
                        </span>
                      </div>
                    </div>

                    <span
                      className={`font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md font-bold ${
                        event.isUpcoming
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-[#FAF8F5] text-[#1C2826]/60 border border-[#E5E0D8]'
                      }`}
                    >
                      {event.isUpcoming ? 'MOBILIZING' : 'ARCHIVED'}
                    </span>
                  </div>

                  {/* Title & Location */}
                  <div className="space-y-2">
                    <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#1C2826] leading-snug">
                      {event.title}
                    </h2>
                    <div className="flex items-center gap-1.5 text-xs text-[#1C2826]/60 font-mono">
                      <MapPin size={13} className="text-[#C25E38] shrink-0" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <p className="text-[#1C2826]/70 text-xs sm:text-sm leading-relaxed font-normal">
                    {event.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E5E0D8]">
                  <button className="w-full py-2.5 bg-[#FAF8F5] hover:bg-[#1C2826] hover:text-white text-[#1C2826] border border-[#E5E0D8] font-mono text-xs uppercase tracking-wider font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer">
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
