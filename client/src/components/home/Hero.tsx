import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, BookOpen, Activity, Sparkles, MapPin } from 'lucide-react';
import { Scene3D } from '../3d/Scene3D';

export const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full pt-4 pb-8 overflow-hidden">
      {/* Soft atmospheric ambient glow gradients */}
      <div className="absolute top-4 left-6 w-[450px] h-[450px] bg-blue-100/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-16 right-10 w-[420px] h-[420px] bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Asymmetric Hero Card Container */}
      <div className="rounded-[36px] p-6 sm:p-10 lg:p-12 xl:p-14 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl shadow-slate-200/40 relative overflow-hidden">
        {/* Subtle decorative edge accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Bold Asymmetric Branding & High-Contrast CTAs */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">
            {/* Top Operational Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-50/90 border border-blue-200/80 text-blue-900 text-xs font-bold tracking-wide shadow-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="uppercase tracking-wider text-[11px] font-extrabold text-blue-900">
                HIT Haldia Socio-Animal Welfare Society
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[11px] text-emerald-700 font-extrabold flex items-center gap-1">
                Active On-Ground
              </span>
            </div>

            {/* Headline with Asymmetric Accents */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-serif font-black text-slate-900 tracking-tight leading-[1.08]">
                Nurturing Minds,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-500">
                  Protecting Lives.
                </span>
              </h1>
              <div className="flex items-center gap-3 pt-1">
                <span className="h-0.5 w-10 bg-amber-500 inline-block rounded-full" />
                <p className="font-serif italic text-lg sm:text-xl text-slate-700 font-medium">
                  "Hands That Care" — Student-Led Grassroot Compassion
                </p>
              </div>
            </div>

            {/* Mission Copy */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-xl">
              Student-powered social welfare from Haldia Institute of Technology. Providing daily free evening school to <strong className="text-slate-900 font-semibold underline decoration-blue-300 underline-offset-4">150+ rural village children</strong> and round-the-clock emergency medical rescue, feeding & sterilization to <strong className="text-slate-900 font-semibold underline decoration-rose-300 underline-offset-4">120+ street animals</strong> across Haldia.
            </p>

            {/* High-Contrast Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => scrollToSection('live-operations')}
                className="bg-blue-600 hover:bg-blue-700 active:scale-98 text-white px-7 py-4 rounded-2xl text-xs sm:text-sm font-extrabold shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 transition-all hover:-translate-y-0.5 flex items-center gap-2.5 group cursor-pointer"
              >
                <Activity size={16} className="text-blue-200 group-hover:animate-pulse" />
                <span>Explore Field Operations</span>
                <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
              </button>

              <Link
                to="/donate"
                className="border border-slate-300 hover:border-slate-900 bg-white hover:bg-slate-900 text-slate-800 hover:text-white px-6 py-4 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 shadow-xs group hover:-translate-y-0.5"
              >
                <Heart size={15} className="text-rose-500 group-hover:scale-125 transition-transform fill-current" />
                <span>Contribute Aid</span>
              </Link>

              <button
                onClick={() => scrollToSection('how-we-work')}
                className="text-xs font-bold text-slate-500 hover:text-blue-600 underline underline-offset-4 px-2 py-3 transition-colors cursor-pointer"
              >
                Our Methodology →
              </button>
            </div>

            {/* Quick Micro-Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100 max-w-lg">
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-serif font-black text-blue-600">150+</div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Children Taught Daily
                </p>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-serif font-black text-rose-600">120+</div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Animals Rescued
                </p>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-serif font-black text-amber-600">60+</div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Active HIT Volunteers
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Engaging Interactive Visual Preview Console */}
          <div className="lg:col-span-6 relative w-full flex items-center justify-center">
            <div className="w-full h-[460px] sm:h-[520px] rounded-[30px] overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 border border-slate-800 shadow-2xl relative group">
              
              {/* 3D Scene Container */}
              <Scene3D />

              {/* Decorative Subtle Grid Lines overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

              {/* Floating Telemetry Badge 1: Top-Right with slow float */}
              <div className="absolute top-5 right-5 z-20 pointer-events-none animate-float-slow hidden sm:block">
                <div className="glass-panel-dark px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/20 backdrop-blur-xl">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/30">
                    <BookOpen size={17} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-blue-400 font-extrabold tracking-wider block leading-tight">
                      Village Classes
                    </span>
                    <span className="text-white text-xs font-bold">150+ Rural Children</span>
                  </div>
                </div>
              </div>

              {/* Floating Telemetry Badge 2: Bottom-Left with reverse float */}
              <div className="absolute bottom-5 left-5 z-20 pointer-events-none animate-float-reverse hidden sm:block">
                <div className="glass-panel-dark px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/20 backdrop-blur-xl">
                  <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-md shadow-rose-600/30">
                    <Heart size={17} className="fill-current" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-rose-400 font-extrabold tracking-wider block leading-tight">
                      Veterinary Squad
                    </span>
                    <span className="text-white text-xs font-bold">120+ Rescued & Vaccinated</span>
                  </div>
                </div>
              </div>

              {/* Live Mission Status Banner Bottom Right */}
              <div className="absolute bottom-5 right-5 z-20 pointer-events-none">
                <div className="bg-slate-900/90 border border-slate-700/80 px-3.5 py-1.5 rounded-xl shadow-lg flex items-center gap-2 text-[11px] font-semibold text-slate-300 backdrop-blur-md">
                  <MapPin size={13} className="text-amber-400" />
                  <span>Haldia Sector Radar Active</span>
                </div>
              </div>

              {/* Top Left Console Pill */}
              <div className="absolute top-5 left-5 z-20 pointer-events-none">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/50 border border-white/15 backdrop-blur-md text-[11px] font-semibold text-white">
                  <Sparkles size={13} className="text-blue-400" />
                  <span>Interactive 3D Field Sim</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

