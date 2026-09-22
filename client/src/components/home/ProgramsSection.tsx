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
      {/* Section Header - Right Aligned Asymmetric */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-slate-200/80 pb-6">
        {/* Category Filter Pills on Left */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-200/60 rounded-full shrink-0 order-2 sm:order-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Right-aligned Title */}
        <SectionTitle
          badge="OUR CAUSES & INITIATIVES"
          badgeVariant="blue"
          title="Direct Actions Making Real Change"
          highlightWord="Real Change"
          subtitle="Explore our active grassroot welfare initiatives in and around Haldia. Each project is powered entirely by dedicated college students."
          align="right"
          className="order-1 sm:order-2"
        />
      </div>

      {/* Asymmetric Programs Layout */}
      {filteredPrograms.length >= 2 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Flagship Program Spotlight (Left Side 7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <ProgramCard
              program={filteredPrograms[0]}
              className="h-full border-2 border-blue-500/20 shadow-lg"
            />
          </div>

          {/* Secondary Stacked Programs (Right Side 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {filteredPrograms.slice(1).map((program) => (
              <ProgramCard key={program._id} program={program} className="flex-1" />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {filteredPrograms.map((program) => (
            <ProgramCard key={program._id} program={program} />
          ))}
        </div>
      )}
    </section>
  );
};

