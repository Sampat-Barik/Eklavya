import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, Activity, TrendingUp, Sparkles } from 'lucide-react';
import { HeroImageSlideshow } from './HeroImageSlideshow';

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
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 text-[11px] font-mono tracking-wider uppercase font-bold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <Sparkles size={12} className="text-cyan-600" />
            <span>HIT Haldia Socio-Animal Welfare Society</span>
            <span className="text-emerald-400">•</span>
            <span className="font-sans normal-case text-xs font-semibold text-cyan-700">Active On-Ground Daily</span>
          </div>

          {/* Monumental Editorial Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-[76px] font-serif font-extrabold text-slate-900 tracking-[-0.03em] leading-[1.03]">
              Nurturing Minds,{' '}
              <span className="italic font-normal block sm:inline bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent drop-shadow-sm">
                Protecting Lives.
              </span>
            </h1>
            <p className="font-serif italic text-xl sm:text-2xl text-slate-600 font-normal">
              "Hands That Care" — Student-Led Grassroot Compassion
            </p>
          </div>

          {/* Mission Copy with High Legibility */}
          <p className="text-slate-700 text-base sm:text-lg leading-[1.7] font-normal max-w-xl">
            Student-driven social welfare from Haldia Institute of Technology. Providing daily free evening school to <strong className="text-cyan-700 font-bold">150+ rural village children</strong> and round-the-clock emergency medical rescue, feeding & sterilization to <strong className="text-emerald-700 font-bold">120+ street animals</strong> across Haldia.
          </p>

          {/* High-Contrast Crisp Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => scrollToSection('live-operations')}
              className="bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 active:scale-98 text-white px-7 py-4 rounded-xl text-xs sm:text-sm font-semibold font-mono uppercase tracking-wider shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all hover:-translate-y-0.5 flex items-center gap-2.5 group cursor-pointer"
            >
              <Activity size={16} className="text-cyan-100" strokeWidth={1.75} />
              <span>Explore Field Operations</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" strokeWidth={1.75} />
            </button>

            <Link
              to="/help-us"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20 group hover:-translate-y-0.5"
            >
              <Heart size={15} className="text-white group-hover:scale-110 transition-transform fill-current" strokeWidth={1.75} />
              <span>Help Us</span>
            </Link>

            <button
              onClick={() => scrollToSection('how-we-work')}
              className="text-xs font-mono uppercase tracking-wider text-cyan-700 font-bold hover:text-cyan-900 hover:underline underline-offset-4 px-2 py-3 transition-colors cursor-pointer"
            >
              Our Methodology →
            </button>
          </div>

          {/* Micro-Metrics Strip with Fine Hairlines & Sparklines */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200 max-w-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-900">150+</span>
                <span className="inline-flex items-center text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-semibold">
                  <TrendingUp size={10} className="mr-0.5 text-emerald-600" /> +14%
                </span>
              </div>
              <p className="text-[11px] font-mono tracking-wider text-cyan-700 font-bold uppercase">
                Children Taught Daily
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-900">120+</span>
                <span className="inline-flex items-center text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-semibold">
                  <TrendingUp size={10} className="mr-0.5 text-emerald-600" /> +18%
                </span>
              </div>
              <p className="text-[11px] font-mono tracking-wider text-emerald-700 font-bold uppercase">
                Animals Rescued
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-900">60+</span>
                <span className="inline-flex items-center text-[10px] font-mono text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 font-semibold">
                  Active
                </span>
              </div>
              <p className="text-[11px] font-mono tracking-wider text-blue-700 font-bold uppercase">
                HIT Volunteers
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Field Photo Slideshow (5 cols) */}
        <div className="lg:col-span-5 relative w-full flex items-center justify-center">
          <div className="w-full h-[480px] sm:h-[540px] rounded-[28px] overflow-hidden shadow-2xl relative group">
            {/* Live Field Image Slideshow (Demo mode with backend API readiness) */}
            <HeroImageSlideshow />
          </div>
        </div>
      </div>
    </section>
  );
};

