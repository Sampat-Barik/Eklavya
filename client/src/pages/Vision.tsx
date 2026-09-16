import React from 'react';
import { BookOpen, Heart, Users, Target, ShieldCheck, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const Vision: React.FC = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 space-y-8 pb-16 py-4">
      {/* Top Banner Card */}
      <div className="editorial-card p-8 md:p-12 text-center space-y-4 bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white relative overflow-hidden shadow-xl border border-blue-800/40">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/20 backdrop-blur-md border border-blue-400/30 rounded-full text-xs font-bold text-blue-300">
          <Sparkles size={14} />
          <span>OUR PURPOSE & CORE VALUES</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-extrabold tracking-tight">Vision & Mission</h1>
        <p className="text-slate-200 text-sm md:text-base font-normal max-w-2xl mx-auto leading-relaxed">
          Eklavya — HIT's Socio-Animal Welfare Society is dedicated to transforming lives through free primary education, compassionate animal care, and student empowerment.
        </p>
      </div>

      {/* Main Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="editorial-card p-8 space-y-4">
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
            <BookOpen size={22} />
          </div>
          <h2 className="text-xl font-serif font-extrabold text-slate-900">Free Primary Education</h2>
          <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
            We conduct daily evening school sessions for children from underprivileged families living around Haldia, providing books, stationery, and holistic learning opportunities.
          </p>
        </div>

        <div className="editorial-card p-8 space-y-4">
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
            <Heart size={22} />
          </div>
          <h2 className="text-xl font-serif font-extrabold text-slate-900">Animal Welfare & Rescue</h2>
          <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
            Our animal care wing rescues injured stray animals, provides vaccination & feeding drives, and advocates for animal rights across Haldia Campus.
          </p>
        </div>

        <div className="editorial-card p-8 space-y-4">
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
            <Users size={22} />
          </div>
          <h2 className="text-xl font-serif font-extrabold text-slate-900">Student Empowerment</h2>
          <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
            We nurture leadership, empathy, and tech skills among college volunteers, offering real-world event management and society experience.
          </p>
        </div>
      </div>

      {/* Objectives Section */}
      <div className="editorial-card p-8 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-bold">
            <Target size={14} />
            <span>LONG TERM OBJECTIVES</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-extrabold text-slate-900">
            Marching Forward With Empathy and Education
          </h2>
          <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-normal">
            Founded by students of Haldia Institute of Technology, Eklavya bridges the gap between privileges and opportunities. Every child deserves to read, every animal deserves shelter, and every youth deserves a chance to serve.
          </p>
          <ul className="space-y-2.5 text-xs md:text-sm font-semibold text-slate-800 pt-2">
            <li className="flex items-center gap-2.5">
              <ShieldCheck size={18} className="text-blue-600 shrink-0" />
              <span>Establish permanent learning centers in Haldia by 2027</span>
            </li>
            <li className="flex items-center gap-2.5">
              <ShieldCheck size={18} className="text-blue-600 shrink-0" />
              <span>Expand medical & anti-rabies vaccination coverage for stray animals</span>
            </li>
            <li className="flex items-center gap-2.5">
              <ShieldCheck size={18} className="text-blue-600 shrink-0" />
              <span>Build mentorship channels linking our alumni network with active volunteers</span>
            </li>
          </ul>
        </div>

        <div className="md:col-span-5">
          <ImageWithFallback
            alt="Eklavya Objectives Placeholder"
            fallbackType="banner"
            className="h-60 w-full rounded-[24px] object-cover shadow-sm"
          />
        </div>
      </div>
    </div>
  );
};
