import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, BookOpen, Activity } from 'lucide-react';
import { Scene3D } from '../3d/Scene3D';

export const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full pt-2 pb-6 overflow-hidden">
      {/* Soft ambient background glows */}
      <div className="absolute top-10 left-1/4 w-80 h-80 bg-blue-100/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-24 right-1/4 w-80 h-80 bg-amber-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Hero Card Container */}
      <div className="rounded-[32px] p-6 sm:p-10 lg:p-12 bg-white/95 backdrop-blur-sm border border-slate-200/80 shadow-sm relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 space-y-6">
            {/* Top Brand Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 shadow-xs">
              <div className="w-5 h-5 rounded-full overflow-hidden shrink-0">
                <img src="/eklavya_logo.png" alt="" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs font-bold tracking-wide uppercase">
                Socio-Animal Welfare Society • HIT Haldia
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-serif font-black text-slate-900 tracking-tight leading-[1.1]">
                Nurturing Minds,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Protecting Lives.
                </span>
              </h1>
              <p className="font-serif italic text-lg sm:text-xl text-slate-500 font-normal">
                "Hands That Care"
              </p>
            </div>

            {/* Mission Copy */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-xl">
              Student-powered social welfare from Haldia Institute of Technology. Providing daily free evening school to 150+ rural village children and 24/7 medical rescue, feeding & vaccination to 120+ stray animals across Haldia.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => scrollToSection('live-operations')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-extrabold shadow-md shadow-blue-500/20 transition-all hover:scale-105 flex items-center gap-2 group"
              >
                <Activity size={15} />
                <span>Explore Field Operations</span>
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => scrollToSection('how-we-work')}
                className="border border-slate-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white text-slate-800 px-6 py-3.5 rounded-full text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 shadow-xs"
              >
                <span>Our Methodology</span>
              </button>

              <Link
                to="/events"
                className="text-xs font-bold text-slate-500 hover:text-blue-600 underline underline-offset-4 px-2 py-2 transition-colors"
              >
                Upcoming Drives →
              </Link>
            </div>

            {/* Quick Impact Counters */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100">
              <div>
                <span className="text-2xl font-serif font-black text-blue-600">150+</span>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                  Children Taught
                </p>
              </div>
              <div>
                <span className="text-2xl font-serif font-black text-rose-600">120+</span>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                  Animals Rescued
                </p>
              </div>
              <div>
                <span className="text-2xl font-serif font-black text-amber-600">60+</span>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                  HIT Volunteers
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Clean, Polished 3D Scene */}
          <div className="lg:col-span-6 relative w-full flex items-center justify-center">
            <div className="w-full h-[420px] sm:h-[480px] rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 border border-slate-800 shadow-xl relative group">
              <Scene3D />

              {/* Floating Telemetry Chip Top */}
              <div className="absolute top-4 right-4 z-20 pointer-events-none hidden sm:block">
                <div className="glass-panel-dark px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-bold text-white border border-white/10">
                  <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                    <BookOpen size={13} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-blue-400 font-extrabold block leading-tight">Village Classes</span>
                    <span className="text-white text-[11px]">150+ Children</span>
                  </div>
                </div>
              </div>

              {/* Floating Telemetry Chip Bottom */}
              <div className="absolute bottom-4 left-4 z-20 pointer-events-none hidden sm:block">
                <div className="glass-panel-dark px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-bold text-white border border-white/10">
                  <div className="w-6 h-6 rounded-lg bg-rose-600 text-white flex items-center justify-center">
                    <Heart size={13} className="fill-current" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-rose-400 font-extrabold block leading-tight">Veterinary Squad</span>
                    <span className="text-white text-[11px]">120+ Lives Saved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
