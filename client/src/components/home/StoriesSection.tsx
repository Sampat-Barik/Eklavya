import React, { useState, useEffect } from 'react';
import { SectionTitle } from '../ui/SectionTitle';
import { PostCard } from '../ui/PostCard';
import { StoryModal } from '../ui/StoryModal';
import type { StoryPost } from '../../types/ngo';
import { ngoService } from '../../services/ngoService';

export const StoriesSection: React.FC = () => {
  const [stories, setStories] = useState<StoryPost[]>([]);
  const [selectedStory, setSelectedStory] = useState<StoryPost | null>(null);

  useEffect(() => {
    const loadStories = async () => {
      const data = await ngoService.getStories();
      setStories(data);
    };
    loadStories();
  }, []);

  return (
    <section id="stories" className="space-y-10 py-6 sm:py-10">
      {/* Header - Right Aligned Asymmetric */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-slate-200 pb-6">
        <div className="text-xs text-slate-700 max-w-sm order-2 sm:order-1 font-normal leading-relaxed">
          <span className="font-bold text-blue-700 block mb-1">Authentic Field Dispatches</span>
          Direct dispatches written by HIT student coordinators, village teachers & veterinary first-responders.
        </div>

        <SectionTitle
          badge="VOICES FROM THE FIELD"
          badgeVariant="green"
          title="Stories of Transformed Lives"
          highlightWord="Transformed Lives"
          subtitle="Real accounts of village children excelling in school, stray animals rehabilitated from critical injuries, and the students behind the missions."
          align="right"
          className="order-1 sm:order-2"
        />
      </div>

      {/* Asymmetric 5:7 Stories Grid */}
      {stories.length >= 2 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Featured Story Spotlight (Left Column 5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <PostCard
              story={stories[0]}
              onReadMore={(st) => setSelectedStory(st)}
              className="h-full border border-slate-700/80 shadow-xl"
            />
          </div>

          {/* Secondary Field Dispatches (Right Column 7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {stories.slice(1).map((story) => (
              <PostCard
                key={story._id}
                story={story}
                onReadMore={(st) => setSelectedStory(st)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {stories.map((story) => (
            <PostCard
              key={story._id}
              story={story}
              onReadMore={(st) => setSelectedStory(st)}
            />
          ))}
        </div>
      )}

      {/* Full Story Reader Modal */}
      <StoryModal
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
      />
    </section>
  );
};
