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
    <section id="stories" className="space-y-10 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-6">
        <SectionTitle
          badge="VOICES FROM THE FIELD"
          badgeVariant="rose"
          title="Stories of Transformed Lives"
          highlightWord="Transformed Lives"
          subtitle="Real accounts of village children excelling in school, stray animals rehabilitated from critical injuries, and the students behind the missions."
        />

        <div className="text-xs font-bold text-slate-500 max-w-xs text-right hidden md:block">
          Direct dispatches written by HIT student coordinators & volunteers
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {stories.map((story) => (
          <PostCard
            key={story._id}
            story={story}
            onReadMore={(st) => setSelectedStory(st)}
          />
        ))}
      </div>

      {/* Full Story Reader Modal */}
      <StoryModal
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
      />
    </section>
  );
};
