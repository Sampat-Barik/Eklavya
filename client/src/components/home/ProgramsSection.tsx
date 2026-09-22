import React, { useState, useEffect } from 'react';
import { SectionTitle } from '../ui/SectionTitle';
import { ProgramCard } from '../ui/ProgramCard';
import type { ProgramCause } from '../../types/ngo';
import { ngoService } from '../../services/ngoService';

export const ProgramsSection: React.FC = () => {
  const [programs, setPrograms] = useState<ProgramCause[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const loadPrograms = async () => {
      const data = await ngoService.getPrograms();
      setPrograms(data);
    };
    loadPrograms();
  }, []);

  const categories = ['All', 'Education', 'Animal Welfare', 'Emergency Relief', 'Student Empowerment'];

  const filteredPrograms = programs.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
  });

  return (
    <section id="programs" className="space-y-10 py-6 sm:py-10">
      {/* Section Header - Left-Aligned Editorial */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#E5E0D8] pb-6">
        {/* Left-aligned Title */}
        <SectionTitle
          badge="OUR CAUSES & INITIATIVES"
          badgeVariant="terracotta"
          title="Direct Actions Making Real Change"
          highlightWord="Real Change"
          subtitle="Explore our active grassroots welfare initiatives in and around Haldia. Each project is powered entirely by dedicated college students."
          align="left"
        />

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#E5E0D8]/40 rounded-xl shrink-0 border border-[#E5E0D8]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1C2826] text-[#FAF8F5] font-bold shadow-2xs'
                  : 'text-[#1C2826]/70 hover:text-[#1C2826] font-medium'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Balanced Responsive 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {filteredPrograms.map((program) => (
          <ProgramCard key={program._id} program={program} />
        ))}
      </div>
    </section>
  );
};
