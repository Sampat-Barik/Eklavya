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
    <section id="programs" className="space-y-10 py-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-6">
        <SectionTitle
          badge="OUR CAUSES & INITIATIVES"
          badgeVariant="blue"
          title="Direct Actions Making Real Change"
          highlightWord="Real Change"
          subtitle="Explore our active grassroot welfare initiatives in and around Haldia. Each project is powered entirely by dedicated college students."
        />

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-200/60 rounded-full shrink-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {filteredPrograms.map((program) => (
          <ProgramCard key={program._id} program={program} />
        ))}
      </div>
    </section>
  );
};
