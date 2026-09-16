import React from 'react';
import { BookOpen, Heart, Users, Target, ShieldCheck, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const Vision: React.FC = () => {
  return (
    <div className="container mx-auto px-4 md:px-8 max-w-[1500px] space-y-8 pb-16">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-xl text-center space-y-4 border border-slate-800">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs font-semibold text-blue-300">
          <Sparkles size={14} />
          <span>OUR PURPOSE & CORE VALUES</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight">Vision & Mission</h1>
        <p className="text-slate-300 text-sm md:text-base font-normal max-w-2xl mx-auto">
          Eklavya - HIT's Socio-Animal Welfare Society is dedicated to transforming lives through free primary education, compassionate animal care, and student empowerment.
        </p>
      </div>

      {/* Main Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center">
            <BookOpen size={24} />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Free Primary Education</h2>
          <p className="text-slate-600 text-xs leading-relaxed">
            We conduct daily evening school sessions for children from underprivileged families living around Haldia, providing books, stationary, and holistic learning opportunities.
          </p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center">
            <Heart size={24} />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Animal Welfare & Rescue</h2>
          <p className="text-slate-600 text-xs leading-relaxed">
            Our animal care wing rescues injured stray animals, provides vaccination & feeding drives, and advocates for animal rights across Haldia Campus.
          </p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
            <Users size={24} />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Student Empowerment</h2>
          <p className="text-slate-600 text-xs leading-relaxed">
            We nurture leadership, empathy, and tech skills among college volunteers, offering real-world event management and web development experience.
          </p>
        </div>
      </div>

      {/* Objectives Section */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-slate-50 border border-blue-200/80 rounded-3xl p-8 md:p-10 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-blue-200 rounded-full text-xs font-bold text-blue-700 shadow-sm">
            <Target size={14} />
            <span>LONG TERM OBJECTIVES</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900">
            Marching Forward With Empathy and Education
          </h2>
          <p className="text-slate-700 text-xs leading-relaxed">
            Founded by students of Haldia Institute of Technology, Eklavya bridges the gap between privileges and opportunities. Every child deserves to read, every animal deserves shelter, and every youth deserves a chance to serve.
          </p>
          <ul className="space-y-2 text-xs font-bold text-slate-800 pt-1">
            <li className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-blue-600 shrink-0" />
              <span>Establish 3 permanent learning centers in Haldia by 2027</span>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-blue-600 shrink-0" />
              <span>Expand medical & anti-rabies vaccination coverage for 200+ stray dogs</span>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-blue-600 shrink-0" />
              <span>Build mentorship channels linking our alumni network with active student volunteers</span>
            </li>
          </ul>
        </div>

        <div className="md:col-span-5">
          <ImageWithFallback
            alt="Eklavya Objectives Placeholder"
            fallbackType="banner"
            className="h-56 w-full rounded-2xl shadow-md"
          />
        </div>
      </div>
    </div>
  );
};
