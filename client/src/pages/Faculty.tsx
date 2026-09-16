import React from 'react';
import { Mail, ExternalLink, Users, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const Faculty: React.FC = () => {
  return (
    <div className="container mx-auto px-4 md:px-8 max-w-[1500px] space-y-8 pb-16">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 md:p-10 shadow-xl text-center space-y-3 border border-slate-800">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs font-semibold text-blue-300">
          <Sparkles size={14} />
          <span>INSTITUTIONAL LEADERSHIP & GUIDANCE</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black">Faculty Co-ordinator</h1>
        <p className="text-slate-300 text-xs max-w-lg mx-auto">
          Guiding our social initiatives, mentoring student volunteers, and ensuring our programs align with academic excellence.
        </p>
      </div>

      {/* Section 1: Department Leadership - Prof.(Dr.) Bidesh Chakraborty */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <span className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-xs font-bold">
            Head of Department
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <ImageWithFallback
            alt="Prof.(Dr.) Bidesh Chakraborty"
            fallbackType="avatar"
            initials="BC"
            className="w-32 h-32 rounded-2xl border border-slate-200 shadow-md shrink-0"
          />

          <div className="space-y-3 flex-1">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Prof. (Dr.) Bidesh Chakraborty</h2>
              <p className="text-xs font-bold text-blue-600">Professor & Head of Department</p>
              <p className="text-xs font-medium text-slate-500">
                Department of Computer Science Engineering (AIML), Haldia Institute of Technology
              </p>
            </div>

            <p className="text-slate-600 text-xs font-normal leading-relaxed bg-slate-50 border border-slate-200/80 p-4 rounded-2xl">
              As the Head of Department, Prof. Chakraborty provides strategic leadership for the CSE AIML department, oversees academic programs, and supports our NGO's initiatives through institutional guidance and academic excellence.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-bold">
              <a
                href="mailto:bidesh.chakraborty@hithaldia.ac.in"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all"
              >
                <Mail size={14} />
                <span>Contact</span>
              </a>
              <a
                href="https://scholar.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl shadow-sm flex items-center gap-1.5 transition-all"
              >
                <span>View Profile</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Faculty Coordinator - Dr. Upasana Adhikary */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold">
            Faculty Coordinator
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <ImageWithFallback
            alt="Dr. Upasana Adhikary"
            fallbackType="avatar"
            initials="UA"
            className="w-32 h-32 rounded-2xl border border-slate-200 shadow-md shrink-0"
          />

          <div className="space-y-3 flex-1">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Dr. Upasana Adhikary</h2>
              <p className="text-xs font-bold text-emerald-600">Assistant Professor</p>
              <p className="text-xs font-medium text-slate-500">
                Department of Computer Science Engineering (AIML), Haldia Institute of Technology
              </p>
            </div>

            <p className="text-slate-600 text-xs font-normal leading-relaxed bg-slate-50 border border-slate-200/80 p-4 rounded-2xl">
              As the Faculty Coordinator of our NGO society, Prof. Adhikary guides our social initiatives, mentors student volunteers, and ensures our programs align with academic excellence and community service values.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-bold">
              <a
                href="mailto:upasana.adhikari@hithaldia.ac.in"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md shadow-emerald-500/20 flex items-center gap-1.5 transition-all"
              >
                <Mail size={14} />
                <span>Contact</span>
              </a>
              <a
                href="https://scholar.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl shadow-sm flex items-center gap-1.5 transition-all"
              >
                <span>View Profile</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
          <div className="bg-amber-50/60 border border-amber-200 p-4 rounded-2xl space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-xs text-amber-900">
              <BookOpen size={16} />
              <span>Academic Excellence</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Leading research in AI/ML and guiding students towards innovative solutions.
            </p>
          </div>

          <div className="bg-blue-50/60 border border-blue-200 p-4 rounded-2xl space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-xs text-blue-900">
              <Users size={16} />
              <span>Community Engagement</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Fostering social responsibility and community service among student volunteers.
            </p>
          </div>

          <div className="bg-purple-50/60 border border-purple-200 p-4 rounded-2xl space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-xs text-purple-900">
              <ShieldCheck size={16} />
              <span>NGO Leadership</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Coordinating social welfare programs and volunteer activities across Haldia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
