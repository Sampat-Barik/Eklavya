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

  const renderCategoryBadge = (category: string) => {
    let dotColor = 'bg-sky-400';
    let textColor = 'text-sky-100';

    if (category === 'Education') {
      dotColor = 'bg-blue-400';
      textColor = 'text-blue-100';
    } else if (category === 'Animal Welfare') {
      dotColor = 'bg-rose-400';
      textColor = 'text-rose-100';
    } else if (category === 'Emergency Relief') {
      dotColor = 'bg-amber-400';
      textColor = 'text-amber-100';
    } else {
      dotColor = 'bg-emerald-400';
      textColor = 'text-emerald-100';
    }

    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider font-bold bg-slate-950/70 backdrop-blur-md border border-white/20 shadow-xs">
        <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
        <span className={textColor}>{category}</span>
      </span>
    );
  };

  return (
    <div
      className={`flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-900/[0.08] bg-white shadow-2xs hover:border-slate-300 hover:shadow-sm transition-all duration-300 group ${className}`}
    >
      {/* Visual Header with Image */}
      <div className="relative h-52 sm:h-60 overflow-hidden bg-slate-100">
        <img
          src={program.imageUrl}
          alt={program.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
        />
        {/* Darkened gradient overlay for high contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-slate-950/50" />

        {/* Top Badges with Backdrop Blur */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
          {renderCategoryBadge(program.category)}
          {program.isFeatured && (
            <span className="bg-slate-950/75 text-white text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md border border-white/20 shadow-xs">
              Active Priority
            </span>
          )}
        </div>

        {/* Bottom Beneficiary Pill with Backdrop Blur */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1.5 bg-slate-950/75 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20 shadow-xs">
            <Users size={12} className="text-blue-300 shrink-0" />
            <span className="text-[11px] font-medium text-slate-100">{program.beneficiariesCount}+ {program.beneficiariesUnit}</span>
          </div>
          <div className="flex items-center gap-1 bg-slate-950/75 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20 text-[11px] font-mono text-slate-200 shadow-xs">
            <span>{program.activeVolunteers} Volunteers</span>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-2.5">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 leading-snug group-hover:text-blue-900 transition-colors">
            {program.title}
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
            {program.description}
          </p>
        </div>

        {/* Funding Progress Meter */}
        <div className="space-y-2 pt-4 border-t border-slate-900/[0.06]">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-800 font-mono">
              ₹{program.raisedAmount.toLocaleString()} <span className="font-normal text-slate-400">raised</span>
            </span>
            <span className="font-mono text-xs font-bold text-slate-900">{percentRaised}%</span>
          </div>

          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-slate-900 rounded-full transition-all duration-700"
              style={{ width: `${percentRaised}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[11px] font-mono text-slate-500">
            <span>Student Field Unit</span>
            <span>Target: ₹{program.goalAmount.toLocaleString()}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-1">
          <Link
            to="/help-us"
            className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 group/btn shadow-2xs"
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
