import React, { useState, useEffect } from 'react';
import { SectionTitle } from '../ui/SectionTitle';
import { ImpactStats } from '../ui/ImpactStats';
import type { ImpactMetric } from '../../types/ngo';
import { ngoService } from '../../services/ngoService';
import { BookOpen, Heart, Users, Quote } from 'lucide-react';

export const AboutImpactSection: React.FC = () => {
  const [metrics, setMetrics] = useState<ImpactMetric[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'education' | 'animal'>('all');

  useEffect(() => {
    const loadMetrics = async () => {
      const data = await ngoService.getImpactMetrics();
      setMetrics(data);
    };
    loadMetrics();
  }, []);

  const filteredMetrics = metrics.filter((m) => {
    if (activeTab === 'all') return true;
    return m.category === activeTab || m.category === 'community';
  });

  return (
    <section id="about" className="space-y-10 py-6 sm:py-10">
      {/* Top Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E5E0D8] pb-6">
        <SectionTitle
          badge="OUR PURPOSE & IMPACT"
          badgeVariant="terracotta"
          title="Bridging Hope for Children & Animals"
          highlightWord="Hope"
          subtitle="Founded and led entirely by students of Haldia Institute of Technology, Eklavya unites technical student power with grassroot social welfare."
        />

        {/* Minimal Category Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-[#E5E0D8]/40 border border-[#E5E0D8] rounded-lg shrink-0 self-start md:self-auto text-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-white text-[#1C2826] shadow-2xs font-semibold'
                : 'text-[#1C2826]/70 hover:text-[#1C2826]'
            }`}
          >
            All Impact
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`px-3.5 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
              activeTab === 'education'
                ? 'bg-white text-[#1C2826] shadow-2xs font-semibold'
                : 'text-[#1C2826]/70 hover:text-[#1C2826]'
            }`}
          >
            Education
          </button>
          <button
            onClick={() => setActiveTab('animal')}
            className={`px-3.5 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
              activeTab === 'animal'
                ? 'bg-white text-[#1C2826] shadow-2xs font-semibold'
                : 'text-[#1C2826]/70 hover:text-[#1C2826]'
            }`}
          >
            Animal Rescue
          </button>
        </div>
      </div>

      {/* Asymmetric Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        
        {/* Left Column: Authentic Field Photography & Narrative (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-white/85 backdrop-blur-md border border-[#E5E0D8] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs">
          <div className="space-y-3">
            <h3 className="font-serif text-2xl font-normal text-[#1C2826] leading-snug">
              Grassroot Compassion, Real Engineering Leadership
            </h3>
            <p className="text-[#1C2826]/75 text-xs sm:text-sm leading-relaxed font-normal">
              Every afternoon as university lectures conclude, Eklavya student volunteers assemble at rural settlements around Haldia. We teach underprivileged children foundational literacy and numeracy, while our veterinary squad administers field dressings and rabies immunizations.
            </p>
          </div>

          {/* Documentary Photo Frame */}
          <div className="relative rounded-xl overflow-hidden border border-[#E5E0D8] shadow-2xs h-60 group">
            <img
              src="/eklavya_human_hero.jpg"
              alt="Eklavya evening school class"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C2826]/80 via-[#1C2826]/20 to-transparent" />
            
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider text-[#1C2826] border border-[#E5E0D8]">
              📍 Haldia Rural Periphery
            </div>

            <div className="absolute bottom-3 left-4 right-4 text-white text-xs flex items-center justify-between">
              <span className="font-medium">Daily Evening School Center</span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300">
                4:30 PM Daily
              </span>
            </div>
          </div>

          {/* Core Pillars Trio */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#E5E0D8] text-center">
            <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] space-y-1">
              <BookOpen size={14} className="text-[#C25E38] mx-auto" strokeWidth={1.75} />
              <div className="text-[11px] font-semibold text-[#1C2826]">Free Schools</div>
            </div>
            <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] space-y-1">
              <Heart size={14} className="text-[#C25E38] mx-auto" strokeWidth={1.75} />
              <div className="text-[11px] font-semibold text-[#1C2826]">Animal Aid</div>
            </div>
            <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] space-y-1">
              <Users size={14} className="text-[#C25E38] mx-auto" strokeWidth={1.75} />
              <div className="text-[11px] font-semibold text-[#1C2826]">HIT Students</div>
            </div>
          </div>
        </div>

        {/* Right Column: Numeric Metrics & Leadership Quote (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <ImpactStats metrics={filteredMetrics} />

          {/* Editorial Leadership Quote */}
          <div className="bg-[#1C2826] text-[#FAF8F5] rounded-2xl p-7 flex items-start gap-4 border border-[#2D3E3A] shadow-xs">
            <Quote className="text-[#C25E38] shrink-0 mt-1" size={24} strokeWidth={1.75} />
            <div className="space-y-2">
              <p className="font-serif text-sm sm:text-base font-normal italic leading-relaxed text-[#FAF8F5]/90">
                "Our measure of success is simple: one child writing their own future, one injured animal nursed back to health. Pure student energy dedicated to humanity."
              </p>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#FAF8F5]/60">
                — Eklavya Student Executive Committee • HIT Haldia
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
