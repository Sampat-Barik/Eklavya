import React from 'react';
import { BookOpen, Heart, Users, Target, ShieldCheck, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const Vision: React.FC = () => {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pb-16">
      {/* Header Banner */}
      <div className="relative py-20 bg-gradient-to-b from-blue-950/80 via-slate-900 to-slate-950 border-b border-slate-800 text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:24px_24px]" />
        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/40 border border-blue-700/50 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={14} />
            Our Purpose & Core Values
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
            Vision & Mission
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Eklavya - HIT's Socio-Animal Welfare Society is dedicated to transforming lives through free primary education, compassionate animal care, and student empowerment.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-5xl space-y-16">
        {/* Main Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 hover:border-blue-500/50 transition-all hover:-translate-y-1 shadow-xl">
            <div className="w-14 h-14 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6">
              <BookOpen size={28} />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">Free Primary Education</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              We conduct daily evening school sessions for children from underprivileged families living around Haldia, providing books, stationary, and holistic learning opportunities.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 hover:border-rose-500/50 transition-all hover:-translate-y-1 shadow-xl">
            <div className="w-14 h-14 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-6">
              <Heart size={28} />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">Animal Welfare & Rescue</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Our animal care wing rescues injured stray animals, provides vaccination & feeding drives, and advocates for animal rights across Haldia Campus.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 hover:border-cyan-500/50 transition-all hover:-translate-y-1 shadow-xl">
            <div className="w-14 h-14 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-6">
              <Users size={28} />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">Student Empowerment</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              We nurture leadership, empathy, and tech skills among college volunteers, offering real-world event management and web development experience.
            </p>
          </div>
        </div>

        {/* Detailed Vision Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 space-y-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 space-y-4">
              <div className="inline-flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <Target size={18} />
                OUR LONG-TERM OBJECTIVES
              </div>
              <h2 className="text-3xl font-extrabold text-white">
                Marching Forward With Empathy and Education
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Founded by students of Haldia Institute of Technology, Eklavya bridges the gap between privileges and opportunities. Every child deserves to read, every animal deserves shelter, and every youth deserves a chance to serve.
              </p>
              <ul className="space-y-3 text-sm text-slate-300 pt-2">
                <li className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-cyan-400 shrink-0" />
                  <span>Establish 3 permanent learning centers in Haldia by 2027</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-cyan-400 shrink-0" />
                  <span>Expand medical & anti-rabies vaccination coverage for 200+ stray dogs</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-cyan-400 shrink-0" />
                  <span>Build mentorship channels linking our alumni network with active student volunteers</span>
                </li>
              </ul>
            </div>

            <div className="w-full md:w-1/2">
              <ImageWithFallback
                alt="Eklavya Education Session Placeholder"
                fallbackType="banner"
                className="h-64 w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
