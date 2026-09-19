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
    <section id="about" className="space-y-12 py-8">
      {/* Top Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-6">
        <SectionTitle
          badge="OUR PURPOSE & IMPACT"
          badgeVariant="amber"
          title="Bridging Hope for Children & Animals"
          highlightWord="Hope"
          subtitle="Founded and led entirely by students of Haldia Institute of Technology, Eklavya unites technical student power with grassroot social welfare."
        />

        {/* Metric Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-200/70 rounded-full shrink-0 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Impact
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'education'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-blue-600'
            }`}
          >
            Education
          </button>
          <button
            onClick={() => setActiveTab('animal')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'animal'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-rose-600'
            }`}
          >
            Animal Rescue
          </button>
        </div>
      </div>

      {/* Split Story & Impact Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Authentic Society Story & Photo */}
        <div className="lg:col-span-5 editorial-card p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-slate-900">
              Grassroot Compassion, Real Engineering Leadership
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
              Every afternoon as college lectures end, Eklavya volunteers gather at rural settlements around Haldia. We teach underprivileged children who lack access to tuition or school supplies, and our veterinary response squad responds to injured animals across the campus vicinity.
            </p>
          </div>

          {/* Photo Frame */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm h-52 group">
            <img
              src="/eklavya_human_hero.jpg"
              alt="Eklavya evening school class"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-white text-[11px] font-semibold flex items-center justify-between">
              <span>Daily Evening School Drive</span>
              <span className="bg-blue-600/90 backdrop-blur-xs px-2 py-0.5 rounded-full text-[10px]">
                Active Daily
              </span>
            </div>
          </div>

          {/* Core Pillars Trio */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
            <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 space-y-1">
              <BookOpen size={16} className="text-blue-600 mx-auto" />
              <div className="text-[11px] font-bold text-slate-900">Free Schools</div>
            </div>
            <div className="p-2.5 rounded-xl bg-rose-50/60 border border-rose-100 space-y-1">
              <Heart size={16} className="text-rose-600 mx-auto" />
              <div className="text-[11px] font-bold text-slate-900">Animal Aid</div>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-100 space-y-1">
              <Users size={16} className="text-amber-600 mx-auto" />
              <div className="text-[11px] font-bold text-slate-900">HIT Students</div>
            </div>
          </div>
        </div>

        {/* Right Column: Animated Numeric Statistics Grid */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <ImpactStats metrics={filteredMetrics} />

          {/* Leadership Quote Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-7 flex items-start gap-4 shadow-xl border border-blue-900/40">
            <Quote className="text-blue-400 shrink-0 mt-1" size={28} />
            <div className="space-y-1.5">
              <p className="font-serif text-sm sm:text-base font-normal italic leading-relaxed text-slate-200">
                "Our measure of success is simple: one child writing their own future, one injured animal nursed back to strength. Pure youth energy dedicated to humanity."
              </p>
              <div className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">
                — Eklavya Student Executive Committee • HIT Haldia
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
