import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Heart, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const Home: React.FC = () => {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-blue-950/70 via-slate-900 to-slate-950 border-b border-slate-800/80 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:32px_32px]" />
        <div className="container mx-auto max-w-5xl relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/50 border border-blue-700/60 text-cyan-300 text-xs font-semibold uppercase tracking-wider shadow-lg">
            <Sparkles size={14} className="animate-spin-slow" />
            A Socio-Animal Welfare Society of HIT Haldia
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
            HANDS THAT CARE
            <span className="block text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent mt-2">
              Nurturing Excellence, Inspiring Tomorrow
            </span>
          </h1>

          <p className="text-slate-300 text-base md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            Marching forward with the thirst of providing free primary education to needy children in underprivileged areas and rescuing stray animals in Haldia.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/donate"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white font-bold shadow-xl shadow-rose-500/20 transition-all hover:scale-[1.03]"
            >
              <Heart size={18} className="fill-white" />
              <span>Donate & Support</span>
            </Link>
            <Link
              to="/events"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold transition-all hover:scale-[1.03]"
            >
              <Calendar size={18} className="text-cyan-400" />
              <span>Explore Events</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Stats Banner */}
      <section className="py-12 bg-slate-900/60 border-b border-slate-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800/80">
              <div className="text-3xl md:text-4xl font-black text-cyan-400">150+</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Students Taught Daily</div>
            </div>
            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800/80">
              <div className="text-3xl md:text-4xl font-black text-blue-400">60+</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Active HIT Volunteers</div>
            </div>
            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800/80">
              <div className="text-3xl md:text-4xl font-black text-indigo-400">25+</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Community Drives</div>
            </div>
            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800/80">
              <div className="text-3xl md:text-4xl font-black text-rose-400">50+</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Stray Animals Rescued</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Initiatives */}
      <section className="py-20 container mx-auto px-4 max-w-6xl space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-black text-white">Our Main Pillars of Action</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Combining education, animal welfare, and tech innovation to serve Haldia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Primary Education Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 hover:border-cyan-500/50 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                <BookOpen size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white">Free Primary Education</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                We conduct free daily evening school classes for underprivileged children in Haldia. Our student volunteers teach Mathematics, English, Science, and art while supplying free notebooks and uniforms.
              </p>
            </div>
            <ImageWithFallback
              alt="Free Education Class Placeholder"
              fallbackType="banner"
              className="h-44 w-full rounded-2xl border border-slate-800"
            />
          </div>

          {/* Animal Welfare Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 hover:border-rose-500/50 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
                <Heart size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white">Animal Care & Rescue</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Our active animal rescue team responds to animal distress calls around Haldia Campus, providing medical aid, rabies vaccinations, and daily feeding drives for stray dogs and cats.
              </p>
            </div>
            <ImageWithFallback
              alt="Animal Care Rescue Drive Placeholder"
              fallbackType="banner"
              className="h-44 w-full rounded-2xl border border-slate-800"
            />
          </div>
        </div>
      </section>

      {/* Featured Callout Banner */}
      <section className="py-16 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-y border-slate-800">
        <div className="container mx-auto px-4 max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Want to join Eklavya as a Volunteer?</h2>
            <p className="text-slate-300 text-xs md:text-sm">
              Whether you want to teach children, rescue animals, organize events, or build web applications, there's a place for you!
            </p>
          </div>
          <Link
            to="/register"
            className="shrink-0 px-6 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-xl shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-all"
          >
            <span>Register Now</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};
