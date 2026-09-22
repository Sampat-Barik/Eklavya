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
      className={`flex flex-col justify-between overflow-hidden rounded-xl border border-[#E5E0D8] bg-white/85 backdrop-blur-md shadow-2xs hover:border-[#C25E38]/50 transition-all duration-200 group ${className}`}
    >
      {/* Post Thumbnail */}
      <div className="relative h-44 sm:h-48 overflow-hidden bg-[#FAF8F5] cursor-pointer" onClick={() => onReadMore(story)}>
        <img
          src={story.imageUrl}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C2826]/80 via-transparent to-transparent" />

        <div className="absolute top-3 left-3">
          <span className="editorial-badge-terracotta text-[10px]">
            {story.category}
          </span>
        </div>

        <div className="absolute bottom-2.5 right-3 flex items-center gap-1 text-[10px] font-mono text-white bg-[#1C2826]/80 backdrop-blur-md px-2 py-0.5 rounded">
          <Clock size={10} />
          <span>{story.readTime}</span>
        </div>
      </div>

      {/* Post Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5 cursor-pointer" onClick={() => onReadMore(story)}>
          <h3 className="font-serif text-lg sm:text-xl font-normal text-[#1C2826] group-hover:text-[#C25E38] transition-colors leading-snug">
            {story.title}
          </h3>
          <p className="text-[#1C2826]/70 text-xs sm:text-sm leading-relaxed line-clamp-3 font-normal">
            {story.excerpt}
          </p>
        </div>

        {/* Author info & Read More trigger */}
        <div className="pt-3 border-t border-[#E5E0D8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#FAF8F5] border border-[#E5E0D8] text-[#C25E38] flex items-center justify-center text-xs">
              <User size={12} />
            </div>
            <div className="leading-tight">
              <span className="text-xs font-semibold text-[#1C2826] block truncate max-w-[120px]">
                {story.author.name}
              </span>
              <span className="text-[10px] font-mono text-[#1C2826]/50">
                {story.publishedAt}
              </span>
            </div>
          </div>

          <button
            onClick={() => onReadMore(story)}
            className="text-xs font-semibold text-[#1C2826] hover:text-[#C25E38] flex items-center gap-1 group/link transition-colors cursor-pointer"
          >
            <span>Read Dispatch</span>
            <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
