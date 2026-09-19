import React, { useEffect } from 'react';
import type { StoryPost } from '../../types/ngo';
import { X, Clock, Calendar, User, Quote, Sparkles } from 'lucide-react';

interface StoryModalProps {
  story: StoryPost | null;
  onClose: () => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({ story, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (story) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [story, onClose]);

  if (!story) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      {/* Backdrop overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Window */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-200 z-10 p-6 sm:p-10 space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          aria-label="Close story"
        >
          <X size={18} />
        </button>

        {/* Header Tags */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="editorial-badge-blue text-xs">
            {story.category}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Clock size={13} />
            <span>{story.readTime}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Calendar size={13} />
            <span>{story.publishedAt}</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
          {story.title}
        </h2>

        {/* Featured Image */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm max-h-72">
          <img
            src={story.imageUrl}
            alt={story.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Impact Quote Highlight */}
        {story.impactHighlight && (
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3.5">
            <Quote className="text-amber-600 shrink-0 mt-0.5" size={20} />
            <p className="text-xs sm:text-sm font-semibold text-amber-900 italic leading-relaxed">
              "{story.impactHighlight}"
            </p>
          </div>
        )}

        {/* Story Body */}
        <div className="space-y-4 text-slate-700 text-sm leading-relaxed font-normal whitespace-pre-line">
          {story.content}
        </div>

        {/* Author Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <User size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">{story.author.name}</h4>
              <p className="text-[11px] text-slate-500">{story.author.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs font-bold text-blue-600">
            <Sparkles size={14} />
            <span>Verified Field Report</span>
          </div>
        </div>
      </div>
    </div>
  );
};
