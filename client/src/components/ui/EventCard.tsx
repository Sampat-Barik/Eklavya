import React, { useState } from 'react';
import type { NGOEvent } from '../../types/ngo';
import { MapPin, Clock, Calendar, CheckCircle2, Users } from 'lucide-react';

interface EventCardProps {
  event: NGOEvent;
  className?: string;
}

export const EventCard: React.FC<EventCardProps> = ({ event, className = '' }) => {
  const [hasRsvpd, setHasRsvpd] = useState(false);
  const [attendeeCount, setAttendeeCount] = useState(event.attendeesCount);

  // Parse date into Month & Day
  const dateObj = new Date(event.date);
  const monthStr = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const dayStr = dateObj.getDate();

  const handleRsvp = () => {
    if (!hasRsvpd) {
      setHasRsvpd(true);
      setAttendeeCount((prev) => prev + 1);
    } else {
      setHasRsvpd(false);
      setAttendeeCount((prev) => prev - 1);
    }
  };

  return (
    <div
      className={`editorial-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-slate-200/90 hover:border-blue-300 transition-all ${className}`}
    >
      {/* Date Badge + Details */}
      <div className="flex items-start sm:items-center gap-5 flex-1">
        {/* Modern Rounded Calendar Stamp */}
        <div className="w-16 h-18 rounded-2xl bg-gradient-to-b from-blue-600 to-indigo-700 text-white flex flex-col items-center justify-center shrink-0 shadow-md shadow-blue-600/20">
          <span className="text-[10px] font-black tracking-widest uppercase opacity-85">
            {monthStr}
          </span>
          <span className="text-2xl font-serif font-black leading-none mt-0.5">
            {dayStr}
          </span>
        </div>

        {/* Info */}
        <div className="space-y-1.5 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="editorial-badge-blue text-[10px]">
              {event.category}
            </span>
            {event.isUpcoming ? (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/70">
                Upcoming Drive
              </span>
            ) : (
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                Completed Milestone
              </span>
            )}
          </div>

          <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            {event.title}
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
            {event.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1 font-medium">
            <div className="flex items-center gap-1">
              <MapPin size={13} className="text-blue-600 shrink-0" />
              <span>{event.location}</span>
            </div>
            {event.time && (
              <div className="flex items-center gap-1">
                <Clock size={13} className="text-amber-600 shrink-0" />
                <span>{event.time}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Users size={13} className="text-slate-400 shrink-0" />
              <span>{attendeeCount} Supporters Pledged</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="shrink-0 w-full sm:w-auto">
        {event.isUpcoming ? (
          <button
            onClick={handleRsvp}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm ${
              hasRsvpd
                ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 hover:scale-105'
            }`}
          >
            {hasRsvpd ? (
              <>
                <CheckCircle2 size={15} />
                <span>Pledge Confirmed</span>
              </>
            ) : (
              <>
                <Calendar size={14} />
                <span>Contribute to Drive</span>
              </>
            )}
          </button>
        ) : (
          <span className="text-xs font-bold text-slate-400 italic">
            Drive Concluded
          </span>
        )}
      </div>
    </div>
  );
};
