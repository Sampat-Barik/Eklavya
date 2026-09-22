import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, BookOpen, Activity, MapPin } from 'lucide-react';
import { Scene3D } from '../3d/Scene3D';

export const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full pt-6 pb-12 sm:pb-16 lg:pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Editorial Branding, Statement & CTAs (7 cols) */}
        <div className="lg:col-span-7 space-y-8 text-left">
          {/* Subtle Institutional Kicker */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/[0.04] border border-slate-900/[0.08] text-slate-800 text-[11px] font-mono tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            <span>HIT Haldia Socio-Animal Welfare Society</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600 font-sans normal-case text-xs font-medium">Active On-Ground Daily</span>
          </div>

          {/* Monumental Editorial Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-serif font-normal text-slate-900 tracking-[-0.03em] leading-[1.03]">
              Nurturing Minds,{' '}
              <span className="italic font-normal block sm:inline text-slate-800">
                Protecting Lives.
              </span>
            </h1>
            <p className="font-serif italic text-xl sm:text-2xl text-slate-600 font-normal">
              "Hands That Care" — Student-Led Grassroot Compassion
            </p>
          </div>

          {/* Mission Copy with High Legibility */}
          <p className="text-slate-600 text-base sm:text-lg leading-[1.7] font-normal max-w-xl">
            Student-driven social welfare from Haldia Institute of Technology. Providing daily free evening school to <strong className="text-slate-900 font-semibold">150+ rural village children</strong> and round-the-clock emergency medical rescue, feeding & sterilization to <strong className="text-slate-900 font-semibold">120+ street animals</strong> across Haldia.
          </p>

          {/* High-Contrast Crisp Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => scrollToSection('live-operations')}
              className="bg-slate-950 hover:bg-slate-800 active:scale-98 text-white px-7 py-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wide shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 flex items-center gap-2.5 group cursor-pointer"
            >
              <Activity size={16} className="text-slate-300" strokeWidth={1.75} />
              <span>Explore Field Operations</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" strokeWidth={1.75} />
            </button>

            <Link
              to="/help-us"
              className="border border-slate-300 hover:border-slate-900 bg-white hover:bg-slate-50 text-slate-900 px-6 py-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-xs group hover:-translate-y-0.5"
            >
              <Heart size={15} className="text-rose-500 group-hover:scale-110 transition-transform fill-current" strokeWidth={1.75} />
              <span>Help Us</span>
            </Link>

            <button
              onClick={() => scrollToSection('how-we-work')}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 underline underline-offset-4 px-2 py-3 transition-colors cursor-pointer"
            >
              Our Methodology →
            </button>
          </div>

          {/* Unboxed Micro-Metrics Strip with Fine Hairlines */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-900/[0.08] max-w-lg">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-serif font-normal text-slate-900">150+</div>
              <p className="text-[11px] font-mono tracking-wider text-slate-500 uppercase">
                Children Taught Daily
              </p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-serif font-normal text-slate-900">120+</div>
              <p className="text-[11px] font-mono tracking-wider text-slate-500 uppercase">
                Animals Rescued
              </p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-serif font-normal text-slate-900">60+</div>
              <p className="text-[11px] font-mono tracking-wider text-slate-500 uppercase">
                HIT Volunteers
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Architectural Visual Console (5 cols) */}
        <div className="lg:col-span-5 relative w-full flex items-center justify-center">
          <div className="w-full h-[480px] sm:h-[540px] rounded-[28px] overflow-hidden bg-slate-950 border border-slate-900 shadow-2xl relative group">
            
            {/* 3D Scene Viewport */}
            <Scene3D />

            {/* Subtle Viewport Hairline Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            {/* Telemetry Badge 1: Top-Right */}
            <div className="absolute top-5 right-5 z-20 pointer-events-none animate-float-slow hidden sm:block">
              <div className="glass-panel-dark px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-2.5 border border-white/[0.08] backdrop-blur-xl">
                <div className="w-7 h-7 rounded-lg bg-blue-600/90 text-white flex items-center justify-center">
                  <BookOpen size={14} strokeWidth={1.75} />
                </div>
                <div>
                  <span className="text-[9px] font-mono uppercase text-slate-400 tracking-wider block leading-tight">
                    Village Classes
                  </span>
                  <span className="text-white text-xs font-semibold">150+ Rural Scholars</span>
                </div>
              </div>
            </div>

            {/* Telemetry Badge 2: Bottom-Left */}
            <div className="absolute bottom-5 left-5 z-20 pointer-events-none animate-float-reverse hidden sm:block">
              <div className="glass-panel-dark px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-2.5 border border-white/[0.08] backdrop-blur-xl">
                <div className="w-7 h-7 rounded-lg bg-rose-600/90 text-white flex items-center justify-center">
                  <Heart size={14} className="fill-current" strokeWidth={1.75} />
                </div>
                <div>
                  <span className="text-[9px] font-mono uppercase text-slate-400 tracking-wider block leading-tight">
                    Veterinary Squad
                  </span>
                  <span className="text-white text-xs font-semibold">120+ Rescued & Treated</span>
                </div>
              </div>
            </div>

            {/* Radar Coordinates Tag: Bottom Right */}
            <div className="absolute bottom-5 right-5 z-20 pointer-events-none">
              <div className="bg-slate-900/90 border border-slate-800 px-3 py-1 rounded-lg flex items-center gap-1.5 text-[10px] font-mono text-slate-400 backdrop-blur-md">
                <MapPin size={11} className="text-amber-400" />
                <span>22.06° N, 88.07° E</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
