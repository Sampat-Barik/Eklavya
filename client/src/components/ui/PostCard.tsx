import React from 'react';
import type { StoryPost } from '../../types/ngo';
import { Clock, ArrowRight, User } from 'lucide-react';

interface PostCardProps {
  story: StoryPost;
  onReadMore: (story: StoryPost) => void;
  className?: string;
}

export const PostCard: React.FC<PostCardProps> = ({ story, onReadMore, className = '' }) => {
  return (
    <div
      className={`editorial-card flex flex-col justify-between overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 group bg-white ${className}`}
    >
      {/* Post Thumbnail */}
      <div className="relative h-48 overflow-hidden bg-slate-100 cursor-pointer" onClick={() => onReadMore(story)}>
        <img
          src={story.imageUrl}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

        <div className="absolute top-3 left-3">
          <span className="editorial-badge-blue text-[10px]">
            {story.category}
          </span>
        </div>

        <div className="absolute bottom-3 right-3 flex items-center gap-1 text-[11px] font-semibold text-white bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full">
          <Clock size={11} />
          <span>{story.readTime}</span>
        </div>
      </div>

      {/* Post Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2 cursor-pointer" onClick={() => onReadMore(story)}>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
            {story.title}
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3 font-normal">
            {story.excerpt}
          </p>
        </div>

        {/* Author info & Read More trigger */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
              <User size={13} />
            </div>
            <div className="leading-tight">
              <span className="text-xs font-bold text-slate-800 block truncate max-w-[120px]">
                {story.author.name}
              </span>
              <span className="text-[10px] text-slate-400">
                {story.publishedAt}
              </span>
            </div>
          </div>

          <button
            onClick={() => onReadMore(story)}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 group/link transition-colors"
          >
            <span>Read Story</span>
            <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
