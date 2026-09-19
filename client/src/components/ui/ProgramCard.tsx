import React from 'react';
import { Link } from 'react-router-dom';
import type { ProgramCause } from '../../types/ngo';
import { Heart, Users, ArrowUpRight } from 'lucide-react';

interface ProgramCardProps {
  program: ProgramCause;
  className?: string;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({ program, className = '' }) => {
  const percentRaised = Math.min(100, Math.round((program.raisedAmount / program.goalAmount) * 100));

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Education':
        return 'editorial-badge-blue';
      case 'Animal Welfare':
        return 'editorial-badge-rose';
      case 'Emergency Relief':
        return 'editorial-badge-amber';
      default:
        return 'editorial-badge-green';
    }
  };

  return (
    <div
      className={`editorial-card flex flex-col justify-between overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 group bg-white ${className}`}
    >
      {/* Visual Header with Image & Overlay */}
      <div className="relative h-56 overflow-hidden bg-slate-100">
        <img
          src={program.imageUrl}
          alt={program.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className={getCategoryBadgeClass(program.category)}>
            {program.category}
          </span>
          {program.isFeatured && (
            <span className="bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
              ★ Active Drive
            </span>
          )}
        </div>

        {/* Bottom Beneficiary Pill */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold">
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            <Users size={12} className="text-blue-400" />
            <span>{program.beneficiariesCount}+ {program.beneficiariesUnit}</span>
          </div>
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            <span>{program.activeVolunteers} Volunteers</span>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-2.5">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
            {program.title}
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3 font-normal">
            {program.description}
          </p>
        </div>

        {/* Funding Progress Meter (Visual telemetry like Image 4) */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">
              ₹{program.raisedAmount.toLocaleString()} <span className="font-normal text-slate-400">raised</span>
            </span>
            <span className="font-bold text-blue-600">{percentRaised}%</span>
          </div>

          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-sky-400 rounded-full transition-all duration-1000"
              style={{ width: `${percentRaised}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[11px] text-slate-400">
            <span>Direct Student Ground Work</span>
            <span>Goal: ₹{program.goalAmount.toLocaleString()}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Link
            to="/donate"
            className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 group/btn shadow-sm"
          >
            <Heart size={14} className="text-rose-400 group-hover/btn:scale-110 transition-transform fill-current" />
            <span>Support This Cause</span>
            <ArrowUpRight size={14} className="opacity-70 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
