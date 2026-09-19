import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';
import { Scene3D } from '../3d/Scene3D';

export const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full pt-4 pb-12 overflow-hidden">
      {/* Background ambient warm glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="editorial-card p-6 sm:p-10 md:p-14 bg-gradient-to-br from-white via-white to-amber-50/20 border border-slate-200/90 shadow-sm relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Bold Typography & Emotional Mission */}
          <div className="lg:col-span-6 space-y-6 z-10">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-200/80 text-blue-700 rounded-full text-xs font-bold tracking-wide uppercase shadow-xs">
              <Sparkles size={14} className="text-blue-600 animate-spin" style={{ animationDuration: '8s' }} />
              <span>Socio-Animal Welfare Society • HIT Haldia</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black text-slate-900 tracking-tight leading-[1.05]">
              <span className="editorial-highlight text-blue-600 font-normal italic">
                Nurturing
              </span>{' '}
              Young Minds,<br />
              Protecting Every Life.
            </h1>

            {/* Mission Statement */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal max-w-xl">
              Driven by passionate student engineers from Haldia Institute of Technology. Delivering free daily primary education to rural village children and emergency medical rescue & feeding to stray animals across Haldia.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                to="/donate"
                className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-4 rounded-full text-sm font-extrabold shadow-xl shadow-blue-500/25 transition-all hover:scale-105 flex items-center gap-2 group"
              >
                <Heart size={16} className="text-rose-300 fill-current group-hover:scale-110 transition-transform" />
                <span>Donate Now</span>
              </Link>

              <button
                onClick={() => scrollToSection('donate-action')}
                className="border-2 border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 px-7 py-4 rounded-full text-sm font-extrabold transition-all flex items-center gap-2 shadow-xs"
              >
                <span>Contribute to the Team</span>
                <ArrowRight size={15} />
              </button>

              <button
                onClick={() => scrollToSection('programs')}
                className="text-xs font-bold text-slate-500 hover:text-blue-600 underline underline-offset-4 px-2 py-2 transition-colors"
              >
                Explore Programs ↓
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80">
              <div className="space-y-0.5">
                <span className="text-2xl sm:text-3xl font-serif font-black text-blue-600">150+</span>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Children Taught</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-2xl sm:text-3xl font-serif font-black text-rose-600">120+</span>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Animals Rescued</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-2xl sm:text-3xl font-serif font-black text-amber-600">60+</span>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">HIT Volunteers</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Canvas Scene */}
          <div className="lg:col-span-6 relative z-10 w-full flex items-center justify-center">
            <div className="w-full h-[460px] sm:h-[520px] rounded-[32px] overflow-hidden bg-gradient-to-b from-slate-950/5 to-blue-950/10 border border-slate-200/80 shadow-xl relative group">
              <Scene3D />

              {/* Floating Telemetry Glass Chip Top */}
              <div className="absolute top-4 right-4 z-20 pointer-events-none hidden sm:block">
                <div className="glass-panel px-3.5 py-2 rounded-2xl shadow-lg flex items-center gap-2.5 text-xs font-bold text-slate-800 animate-float-slow">
                  <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                    <BookOpen size={14} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-blue-600 font-extrabold block">Daily Village Classes</span>
                    <span>150+ Rural Children</span>
                  </div>
                </div>
              </div>

              {/* Floating Telemetry Glass Chip Bottom */}
              <div className="absolute bottom-4 left-4 z-20 pointer-events-none hidden sm:block">
                <div className="glass-panel px-3.5 py-2 rounded-2xl shadow-lg flex items-center gap-2.5 text-xs font-bold text-slate-800">
                  <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                    <ShieldCheck size={14} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-emerald-600 font-extrabold block">100% Student Led</span>
                    <span>Direct Ground Action</span>
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
