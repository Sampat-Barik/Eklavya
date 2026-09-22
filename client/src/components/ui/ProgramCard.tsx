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
      className={`flex flex-col justify-between overflow-hidden rounded-2xl border border-[#E5E0D8] bg-white/85 backdrop-blur-md shadow-2xs hover:border-[#C25E38]/40 hover:shadow-xs transition-all duration-300 group ${className}`}
    >
      {/* Visual Header with Image */}
      <div className="relative h-52 sm:h-60 overflow-hidden bg-[#FAF8F5]">
        <img
          src={program.imageUrl}
          alt={program.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
        />
        {/* Darkened gradient overlay for high contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C2826]/90 via-[#1C2826]/30 to-[#1C2826]/50" />

        {/* Top Badges with Backdrop Blur */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
          {renderCategoryBadge(program.category)}
          {program.isFeatured && (
            <span className="bg-[#1C2826]/80 text-[#FAF8F5] text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md border border-white/20 shadow-xs">
              Active Priority
            </span>
          )}
        </div>

        {/* Bottom Beneficiary Pill with Backdrop Blur */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1.5 bg-[#1C2826]/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20 shadow-xs">
            <Users size={12} className="text-[#C25E38] shrink-0" />
            <span className="text-[11px] font-medium text-[#FAF8F5]">{program.beneficiariesCount}+ {program.beneficiariesUnit}</span>
          </div>
          <div className="flex items-center gap-1 bg-[#1C2826]/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20 text-[11px] font-mono text-[#FAF8F5]/80 shadow-xs">
            <span>{program.activeVolunteers} Volunteers</span>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-2.5">
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1C2826] leading-snug group-hover:text-[#C25E38] transition-colors">
            {program.title}
          </h3>
          <p className="text-[#1C2826]/70 text-xs sm:text-sm leading-relaxed font-normal">
            {program.description}
          </p>
        </div>

        {/* Funding Progress Meter */}
        <div className="space-y-2 pt-4 border-t border-[#E5E0D8]">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#1C2826] font-mono">
              ₹{program.raisedAmount.toLocaleString()} <span className="font-normal text-[#1C2826]/50">raised</span>
            </span>
            <span className="font-mono text-xs font-bold text-[#1C2826]">{percentRaised}%</span>
          </div>

          <div className="w-full h-2 bg-[#E5E0D8]/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1C2826] rounded-full transition-all duration-700"
              style={{ width: `${percentRaised}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[11px] font-mono text-[#1C2826]/60">
            <span>Student Field Unit</span>
            <span>Target: ₹{program.goalAmount.toLocaleString()}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-1">
          <Link
            to="/help-us"
            className="w-full py-2.5 px-4 rounded-xl bg-[#1C2826] hover:bg-[#C25E38] text-white text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 group/btn shadow-2xs"
          >
            <Heart size={13} className="text-[#C25E38] group-hover:text-white fill-current transition-colors" />
            <span>Support This Drive</span>
            <ArrowUpRight size={13} className="opacity-60 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
