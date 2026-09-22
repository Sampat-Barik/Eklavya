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
      className={`rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border border-slate-900/[0.08] bg-white hover:border-slate-300 transition-colors shadow-2xs ${className}`}
    >
      {/* Date Stamp + Details */}
      <div className="flex items-start sm:items-center gap-4 flex-1">
        {/* Crisp Monospace / Serif Date Stamp */}
        <div className="w-14 h-16 rounded-lg bg-slate-900 text-white flex flex-col items-center justify-center shrink-0">
          <span className="text-[9px] font-mono font-medium tracking-wider uppercase text-slate-400">
            {monthStr}
          </span>
          <span className="text-xl font-serif font-normal leading-none mt-0.5">
            {dayStr}
          </span>
        </div>

        {/* Event Details */}
        <div className="space-y-1 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="editorial-badge-blue text-[10px]">
              {event.category}
            </span>
            {event.isUpcoming ? (
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                Upcoming
              </span>
            ) : (
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Past
              </span>
            )}
          </div>

          <h3 className="font-serif text-lg font-normal text-slate-900 leading-snug">
            {event.title}
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
            {event.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1 font-normal">
            <div className="flex items-center gap-1.5">
              <MapPin size={12} className="text-slate-400 shrink-0" />
              <span>{event.location}</span>
            </div>
            {event.time && (
              <div className="flex items-center gap-1.5">
                <Clock size={12} className="text-slate-400 shrink-0" />
                <span className="font-mono text-[11px]">{event.time}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 font-mono text-[11px]">
              <Users size={12} className="text-slate-400 shrink-0" />
              <span>{attendeeCount} Pledged</span>
            </div>
          </div>
        </div>
      </div>

      {/* RSVP Action */}
      <div className="shrink-0 w-full sm:w-auto">
        {event.isUpcoming ? (
          <button
            onClick={handleRsvp}
            className={`w-full sm:w-auto px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer ${
              hasRsvpd
                ? 'bg-emerald-700 text-white shadow-2xs'
                : 'bg-slate-900 hover:bg-slate-800 text-white shadow-2xs'
            }`}
          >
            {hasRsvpd ? (
              <>
                <CheckCircle2 size={14} />
                <span>Pledged</span>
              </>
            ) : (
              <>
                <Calendar size={13} />
                <span>Join Drive</span>
              </>
            )}
          </button>
        ) : (
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block text-center sm:text-right">
            Concluded
          </span>
        )}
      </div>
    </div>
  );
};
