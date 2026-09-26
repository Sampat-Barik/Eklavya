import React from 'react';
import { Plus, Search, Filter, Layers } from 'lucide-react';

interface AdminModulePlaceholderProps {
  title: string;
  subtitle: string;
  badge?: string;
  actionLabel?: string;
}

export const AdminModulePlaceholder: React.FC<AdminModulePlaceholderProps> = ({
  title,
  subtitle,
  badge = 'Active Module',
  actionLabel = 'Create New Record'
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-100/90 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-serif font-black text-teal-950">{title}</h1>
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-teal-900 border border-emerald-200">
              {badge}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
        </div>

        <button
          onClick={() => alert(`Action triggered for ${title}`)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-800 to-emerald-700 hover:from-teal-900 hover:to-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm shadow-teal-900/10 transition-all cursor-pointer"
        >
          <Plus size={14} />
          <span>{actionLabel}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-emerald-100/90 rounded-2xl p-4 flex flex-col sm:flex-row gap-3 shadow-xs">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={`Search ${title.toLowerCase()}...`}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-teal-600 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer">
            <Filter size={13} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="bg-white border border-emerald-100/90 rounded-2xl p-12 text-center space-y-3 min-h-[340px] flex flex-col items-center justify-center shadow-xs">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-teal-800 flex items-center justify-center border border-emerald-200/60 shadow-xs">
          <Layers size={26} />
        </div>
        <h3 className="font-serif text-lg font-bold text-teal-950">{title} Workspace</h3>
        <p className="text-xs text-slate-500 max-w-sm leading-relaxed font-normal">
          This administrative module is active and protected under your operational role permissions.
        </p>
      </div>
    </div>
  );
};
