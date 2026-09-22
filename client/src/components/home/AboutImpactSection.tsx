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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-900/[0.08] pb-6">
        <SectionTitle
          badge="OUR PURPOSE & IMPACT"
          badgeVariant="amber"
          title="Bridging Hope for Children & Animals"
          highlightWord="Hope"
          subtitle="Founded and led entirely by students of Haldia Institute of Technology, Eklavya unites technical student power with grassroot social welfare."
        />

        {/* Minimal Category Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0 self-start md:self-auto text-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Impact
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`px-3.5 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
              activeTab === 'education'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Education
          </button>
          <button
            onClick={() => setActiveTab('animal')}
            className={`px-3.5 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
              activeTab === 'animal'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Animal Rescue
          </button>
        </div>
      </div>

      {/* Asymmetric Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        
        {/* Left Column: Authentic Field Photography & Narrative (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-white border border-slate-900/[0.08] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xs">
          <div className="space-y-3">
            <h3 className="font-serif text-2xl font-normal text-slate-900 leading-snug">
              Grassroot Compassion, Real Engineering Leadership
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
              Every afternoon as university lectures conclude, Eklavya student volunteers assemble at rural settlements around Haldia. We teach underprivileged children foundational literacy and numeracy, while our veterinary squad administers field dressings and rabies immunizations.
            </p>
          </div>

          {/* Documentary Photo Frame */}
          <div className="relative rounded-xl overflow-hidden border border-slate-200/80 shadow-2xs h-60 group">
            <img
              src="/eklavya_human_hero.jpg"
              alt="Eklavya evening school class"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider text-slate-800 border border-white/60">
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
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-center">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
              <BookOpen size={14} className="text-slate-700 mx-auto" strokeWidth={1.75} />
              <div className="text-[11px] font-semibold text-slate-900">Free Schools</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
              <Heart size={14} className="text-slate-700 mx-auto" strokeWidth={1.75} />
              <div className="text-[11px] font-semibold text-slate-900">Animal Aid</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
              <Users size={14} className="text-slate-700 mx-auto" strokeWidth={1.75} />
              <div className="text-[11px] font-semibold text-slate-900">HIT Students</div>
            </div>
          </div>
        </div>

        {/* Right Column: Numeric Metrics & Leadership Quote (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <ImpactStats metrics={filteredMetrics} />

          {/* Editorial Leadership Quote */}
          <div className="bg-slate-900 text-white rounded-2xl p-7 flex items-start gap-4 border border-slate-800 shadow-sm">
            <Quote className="text-slate-400 shrink-0 mt-1" size={24} strokeWidth={1.75} />
            <div className="space-y-2">
              <p className="font-serif text-sm sm:text-base font-normal italic leading-relaxed text-slate-200">
                "Our measure of success is simple: one child writing their own future, one injured animal nursed back to health. Pure student energy dedicated to humanity."
              </p>
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                — Eklavya Student Executive Committee • HIT Haldia
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
