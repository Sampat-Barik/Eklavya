import React from 'react';
import { Award, BookOpen, GraduationCap, Quote, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const Faculty: React.FC = () => {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pb-16">
      {/* Top Banner */}
      <div className="py-16 bg-gradient-to-b from-blue-950/60 to-slate-950 border-b border-slate-800 text-center px-4">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/40 border border-blue-700/40 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={14} />
            Patron & Guidance
          </div>
          <h1 className="text-4xl font-extrabold text-white">Faculty Co-ordinator</h1>
          <p className="text-slate-400 text-sm">
            Mentoring and guiding Eklavya's student volunteers to drive sustainable socio-animal welfare initiatives.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Faculty Image / Fallback Avatar */}
            <div className="shrink-0">
              <ImageWithFallback
                alt="Prof. Dr. Arunangshu Giri"
                fallbackType="avatar"
                initials="AG"
                className="w-40 h-40 md:w-48 md:h-48 rounded-2xl border-4 border-slate-800 shadow-xl"
              />
            </div>

            {/* Profile Info */}
            <div className="space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-semibold px-2.5 py-1 rounded-md bg-cyan-950/60 text-cyan-400 border border-cyan-800/50">
                <GraduationCap size={14} />
                HOD, Department of Management Studies
              </div>
              <h2 className="text-3xl font-black text-white">Prof. Dr. Arunangshu Giri</h2>
              <p className="text-slate-400 text-sm font-medium">
                Faculty Co-ordinator, Eklavya - Haldia Institute of Technology
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                  <Award size={14} className="text-amber-400" />
                  <span>20+ Years Academic Leadership</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                  <BookOpen size={14} className="text-blue-400" />
                  <span>Author & Social Researcher</span>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-slate-800" />

          {/* Mentors Message */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Quote className="text-cyan-400" size={20} />
              Mentor's Message to Students
            </h3>
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 text-slate-300 text-sm leading-relaxed space-y-4 italic">
              <p>
                "Education is not merely about acquiring technical knowledge; true education lies in using that knowledge to uplift those who are underserved in our society. Eklavya embodies the true spirit of empathy, hard work, and youth leadership."
              </p>
              <p>
                "Through free evening classes for young children and compassionate care for stray animals, our students at Haldia Institute of Technology demonstrate that technical excellence and human compassion walk hand in hand."
              </p>
            </div>
          </div>

          {/* Guidance Domains */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
              <h4 className="text-white font-semibold text-sm mb-1">Strategic Guidance</h4>
              <p className="text-slate-400 text-xs">
                Oversees organizational ethics, institutional permissions, and long-term socio-educational goals.
              </p>
            </div>
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
              <h4 className="text-white font-semibold text-sm mb-1">Student Mentorship</h4>
              <p className="text-slate-400 text-xs">
                Provides continuous advice on event execution, team synergy, and social impact tracking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
