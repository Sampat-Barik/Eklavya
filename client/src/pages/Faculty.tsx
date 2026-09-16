import React from 'react';
import { Award, BookOpen, GraduationCap, Quote, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const Faculty: React.FC = () => {
  return (
    <div className="container mx-auto px-4 max-w-4xl space-y-8 pb-12">
      {/* Top Banner */}
      <div className="bg-white border-[2.5px] border-slate-950 rounded-3xl p-8 md:p-10 shadow-[5px_5px_0px_0px_#0f172a] text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#bfdbfe] border-2 border-slate-950 rounded-full text-xs font-black text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]">
          <Sparkles size={14} className="text-blue-700" />
          <span>PATRON & GUIDANCE</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-950">Faculty Co-ordinator</h1>
        <p className="text-slate-700 text-xs font-medium max-w-lg mx-auto">
          Mentoring and guiding Eklavya's student volunteers to drive sustainable socio-animal welfare initiatives.
        </p>
      </div>

      {/* Main Faculty Card */}
      <div className="bg-white border-[2.5px] border-slate-950 rounded-3xl p-8 md:p-10 shadow-[5px_5px_0px_0px_#0f172a] space-y-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <ImageWithFallback
            alt="Prof. Dr. Arunangshu Giri"
            fallbackType="avatar"
            initials="AG"
            className="w-36 h-36 rounded-2xl border-2 border-slate-950 shadow-[4px_4px_0px_0px_#0f172a]"
          />

          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#e9d5ff] border-2 border-slate-950 rounded-full text-xs font-black text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]">
              <GraduationCap size={14} />
              HOD, Department of Management Studies
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-950">Prof. Dr. Arunangshu Giri</h2>
            <p className="text-slate-700 text-xs font-bold">
              Faculty Co-ordinator, Eklavya - Haldia Institute of Technology
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2 text-xs font-bold">
              <span className="bg-[#fef08a] border-2 border-slate-950 px-3 py-1 rounded-xl shadow-[2px_2px_0px_0px_#0f172a] flex items-center gap-1">
                <Award size={14} /> 20+ Years Leadership
              </span>
              <span className="bg-[#a7f3d0] border-2 border-slate-950 px-3 py-1 rounded-xl shadow-[2px_2px_0px_0px_#0f172a] flex items-center gap-1">
                <BookOpen size={14} /> Social Researcher
              </span>
            </div>
          </div>
        </div>

        {/* Mentor Quote Box */}
        <div className="bg-[#fef08a] border-2 border-slate-950 rounded-2xl p-6 shadow-[4px_4px_0px_0px_#0f172a] space-y-3">
          <div className="flex items-center gap-2 font-black text-sm text-slate-950">
            <Quote size={18} />
            <span>MENTOR'S MESSAGE TO STUDENTS</span>
          </div>
          <p className="text-slate-900 text-xs font-bold italic leading-relaxed">
            "Education is not merely about acquiring technical knowledge; true education lies in using that knowledge to uplift those who are underserved in our society. Eklavya embodies the true spirit of empathy, hard work, and youth leadership among our students at Haldia Institute of Technology."
          </p>
        </div>
      </div>
    </div>
  );
};
