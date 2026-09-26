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
    const dotColors: Record<string, string> = {
      'Education': 'bg-[#2563EB]',
      'Animal Welfare': 'bg-[#059669]',
      'Emergency Relief': 'bg-[#D97706]',
    };
    const dotColor = dotColors[category] || 'bg-[#10B981]';

    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider font-bold bg-white/90 backdrop-blur-md border border-slate-200 shadow-xs text-slate-900">
        <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
        <span className="text-slate-900 font-bold">{category}</span>
      </span>
    );
  };

  return (
    <div
      className={`flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-md shadow-md hover:border-emerald-500/40 hover:shadow-lg transition-all duration-300 group ${className}`}
    >
      {/* Visual Header with Image */}
      <div className="relative h-52 sm:h-60 overflow-hidden bg-slate-100">
        <img
          src={program.imageUrl}
          alt={program.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Darkened gradient overlay for high contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

        {/* Top Badges with Backdrop Blur */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
          {renderCategoryBadge(program.category)}
          {program.isFeatured && (
            <span className="bg-white/90 text-slate-900 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md border border-slate-200 shadow-xs font-bold">
              Active Priority
            </span>
          )}
        </div>

        {/* Bottom Beneficiary Pill with Backdrop Blur */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs">
            <Users size={12} className="text-emerald-600 shrink-0" />
            <span className="text-[11px] font-medium text-slate-900">{program.beneficiariesCount}+ {program.beneficiariesUnit}</span>
          </div>
          <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-200 text-[11px] font-mono text-slate-800 shadow-xs">
            <span>{program.activeVolunteers} Volunteers</span>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-2.5">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
            {program.title}
          </h3>
          <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-normal">
            {program.description}
          </p>
        </div>

        {/* Funding Progress Meter */}
        <div className="space-y-2 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-900 font-mono">
              ₹{program.raisedAmount.toLocaleString()} <span className="font-normal text-slate-500">raised</span>
            </span>
            <span className="font-mono text-xs font-bold text-slate-900">{percentRaised}%</span>
          </div>

          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 rounded-full transition-all duration-700"
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
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 group/btn shadow-xs"
          >
            <Heart size={13} className="text-white group-hover:scale-110 fill-current transition-transform" />
            <span>Support This Drive</span>
            <ArrowUpRight size={13} className="opacity-80 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
