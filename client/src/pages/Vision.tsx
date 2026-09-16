import React from 'react';
import { BookOpen, Heart, Users, Target, ShieldCheck, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const Vision: React.FC = () => {
  return (
    <div className="container mx-auto px-4 md:px-8 max-w-[1500px] space-y-8 pb-12">
      {/* Top Banner */}
      <div className="bg-white border-[2.5px] border-slate-950 rounded-3xl p-8 md:p-12 shadow-[5px_5px_0px_0px_#0f172a] text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#e9d5ff] border-2 border-slate-950 rounded-full text-xs font-black text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]">
          <Sparkles size={14} className="text-purple-700" />
          <span>OUR PURPOSE & CORE VALUES</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tight">Vision & Mission</h1>
        <p className="text-slate-700 text-sm md:text-base font-medium max-w-2xl mx-auto">
          Eklavya - HIT's Socio-Animal Welfare Society is dedicated to transforming lives through free primary education, compassionate animal care, and student empowerment.
        </p>
      </div>

      {/* Main Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border-[2.5px] border-slate-950 rounded-2xl p-6 shadow-[4px_4px_0px_0px_#0f172a] space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#bfdbfe] border-2 border-slate-950 flex items-center justify-center shadow-[2px_2px_0px_0px_#0f172a]">
            <BookOpen size={24} className="text-slate-950" />
          </div>
          <h2 className="text-xl font-black text-slate-950">Free Primary Education</h2>
          <p className="text-slate-700 text-xs font-medium leading-relaxed">
            We conduct daily evening school sessions for children from underprivileged families living around Haldia, providing books, stationary, and holistic learning opportunities.
          </p>
        </div>

        <div className="bg-white border-[2.5px] border-slate-950 rounded-2xl p-6 shadow-[4px_4px_0px_0px_#0f172a] space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#fbcfe8] border-2 border-slate-950 flex items-center justify-center shadow-[2px_2px_0px_0px_#0f172a]">
            <Heart size={24} className="text-rose-600" />
          </div>
          <h2 className="text-xl font-black text-slate-950">Animal Welfare & Rescue</h2>
          <p className="text-slate-700 text-xs font-medium leading-relaxed">
            Our animal care wing rescues injured stray animals, provides vaccination & feeding drives, and advocates for animal rights across Haldia Campus.
          </p>
        </div>

        <div className="bg-white border-[2.5px] border-slate-950 rounded-2xl p-6 shadow-[4px_4px_0px_0px_#0f172a] space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#fef08a] border-2 border-slate-950 flex items-center justify-center shadow-[2px_2px_0px_0px_#0f172a]">
            <Users size={24} className="text-slate-950" />
          </div>
          <h2 className="text-xl font-black text-slate-950">Student Empowerment</h2>
          <p className="text-slate-700 text-xs font-medium leading-relaxed">
            We nurture leadership, empathy, and tech skills among college volunteers, offering real-world event management and web development experience.
          </p>
        </div>
      </div>

      {/* Objectives Section */}
      <div className="bg-[#fef9c3] border-[2.5px] border-slate-950 rounded-3xl p-8 md:p-10 shadow-[5px_5px_0px_0px_#0f172a] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-slate-950 rounded-full text-xs font-black text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]">
            <Target size={14} className="text-amber-600" />
            <span>LONG TERM OBJECTIVES</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-950">
            Marching Forward With Empathy and Education
          </h2>
          <p className="text-slate-800 text-xs font-medium leading-relaxed">
            Founded by students of Haldia Institute of Technology, Eklavya bridges the gap between privileges and opportunities. Every child deserves to read, every animal deserves shelter, and every youth deserves a chance to serve.
          </p>
          <ul className="space-y-2 text-xs font-bold text-slate-900 pt-2">
            <li className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-blue-700 shrink-0" />
              <span>Establish 3 permanent learning centers in Haldia by 2027</span>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-blue-700 shrink-0" />
              <span>Expand medical & anti-rabies vaccination coverage for 200+ stray dogs</span>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-blue-700 shrink-0" />
              <span>Build mentorship channels linking our alumni network with active student volunteers</span>
            </li>
          </ul>
        </div>

        <div className="md:col-span-5">
          <ImageWithFallback
            alt="Eklavya Objectives Placeholder"
            fallbackType="banner"
            className="h-56 w-full rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};
