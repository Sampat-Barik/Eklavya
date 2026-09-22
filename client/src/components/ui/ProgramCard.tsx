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
      className={`flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-900/[0.08] bg-white shadow-2xs hover:border-slate-300 hover:shadow-sm transition-all duration-300 group ${className}`}
    >
      {/* Visual Header with Image */}
      <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-100">
        <img
          src={program.imageUrl}
          alt={program.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
          <span className={getCategoryBadgeClass(program.category)}>
            {program.category}
          </span>
          {program.isFeatured && (
            <span className="bg-slate-900/90 text-white text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded backdrop-blur-md border border-white/10">
              Active Priority
            </span>
          )}
        </div>

        {/* Bottom Beneficiary Pill */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-2.5 py-0.5 rounded border border-white/10">
            <Users size={11} className="text-slate-300" />
            <span className="text-[11px] font-medium">{program.beneficiariesCount}+ {program.beneficiariesUnit}</span>
          </div>
          <div className="flex items-center gap-1 bg-slate-900/80 backdrop-blur-md px-2.5 py-0.5 rounded border border-white/10 text-[11px] font-mono text-slate-300">
            <span>{program.activeVolunteers} Volunteers</span>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-2">
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-slate-900 leading-snug group-hover:text-blue-900 transition-colors">
            {program.title}
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3 font-normal">
            {program.description}
          </p>
        </div>

        {/* Funding Progress Meter */}
        <div className="space-y-2 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-800 font-mono">
              ₹{program.raisedAmount.toLocaleString()} <span className="font-normal text-slate-400">raised</span>
            </span>
            <span className="font-mono text-xs font-bold text-slate-900">{percentRaised}%</span>
          </div>

          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-slate-900 rounded-full transition-all duration-700"
              style={{ width: `${percentRaised}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[11px] font-mono text-slate-400">
            <span>Student Field Unit</span>
            <span>Target: ₹{program.goalAmount.toLocaleString()}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-1">
          <Link
            to="/help-us"
            className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-2 group/btn shadow-2xs"
          >
            <Heart size={13} className="text-rose-400 fill-current" />
            <span>Support This Drive</span>
            <ArrowUpRight size={13} className="opacity-60 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
