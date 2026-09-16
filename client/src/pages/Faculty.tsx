import React from 'react';
import { Mail, ExternalLink, Users, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const Faculty: React.FC = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 space-y-8 pb-16 py-4">
      {/* Top Header Banner */}
      <div className="editorial-card p-8 md:p-12 text-center space-y-4 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white relative overflow-hidden shadow-xl border border-blue-900/50">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/20 backdrop-blur-md border border-blue-400/30 rounded-full text-xs font-bold text-blue-300">
          <Sparkles size={14} />
          <span>INSTITUTIONAL LEADERSHIP & GUIDANCE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-extrabold tracking-tight">Faculty Coordinator</h1>
        <p className="text-slate-300 text-sm max-w-xl mx-auto font-normal leading-relaxed">
          Guiding our social initiatives, mentoring student volunteers, and ensuring our programs align with academic excellence.
        </p>
      </div>

      {/* Section 1: Department Leadership - Prof.(Dr.) Bidesh Chakraborty */}
      <div className="editorial-card p-8 md:p-10 space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <span className="px-4 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-extrabold">
            Head of Department
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <ImageWithFallback
            alt="Prof.(Dr.) Bidesh Chakraborty"
            fallbackType="avatar"
            initials="BC"
            className="w-32 h-32 rounded-full border-2 border-slate-200 shadow-md shrink-0 object-cover"
          />

          <div className="space-y-3 flex-1">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-extrabold text-slate-900">Prof. (Dr.) Bidesh Chakraborty</h2>
              <p className="text-xs md:text-sm font-bold text-blue-600">Professor & Head of Department</p>
              <p className="text-xs font-medium text-slate-500">
                Department of Computer Science Engineering (AIML), Haldia Institute of Technology
              </p>
            </div>

            <p className="text-slate-600 text-xs md:text-sm leading-relaxed bg-blue-50/40 border border-blue-100 p-5 rounded-2xl font-normal">
              As the Head of Department, Prof. Chakraborty provides strategic leadership for the CSE AIML department, oversees academic programs, and supports our NGO's initiatives through institutional guidance and academic excellence.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-semibold">
              <a
                href="mailto:bidesh.chakraborty@hithaldia.ac.in"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-transform hover:scale-105 flex items-center gap-2 shadow-md shadow-blue-500/20"
              >
                <Mail size={14} />
                <span>Contact</span>
              </a>
              <a
                href="https://scholar.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-white border border-slate-300 text-slate-800 rounded-full hover:bg-slate-50 flex items-center gap-2 transition-all shadow-sm"
              >
                <span>View Profile</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Faculty Coordinator - Dr. Upasana Adhikary */}
      <div className="editorial-card p-8 md:p-10 space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <span className="px-4 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-extrabold">
            Faculty Coordinator
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <ImageWithFallback
            alt="Dr. Upasana Adhikary"
            fallbackType="avatar"
            initials="UA"
            className="w-32 h-32 rounded-full border-2 border-slate-200 shadow-md shrink-0 object-cover"
          />

          <div className="space-y-3 flex-1">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-extrabold text-slate-900">Dr. Upasana Adhikary</h2>
              <p className="text-xs md:text-sm font-bold text-blue-600">Assistant Professor</p>
              <p className="text-xs font-medium text-slate-500">
                Department of Computer Science Engineering (AIML), Haldia Institute of Technology
              </p>
            </div>

            <p className="text-slate-600 text-xs md:text-sm leading-relaxed bg-blue-50/40 border border-blue-100 p-5 rounded-2xl font-normal">
              As the Faculty Coordinator of our NGO society, Prof. Adhikary guides our social initiatives, mentors student volunteers, and ensures our programs align with academic excellence and community service values.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-semibold">
              <a
                href="mailto:upasana.adhikari@hithaldia.ac.in"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-transform hover:scale-105 flex items-center gap-2 shadow-md shadow-blue-500/20"
              >
                <Mail size={14} />
                <span>Contact</span>
              </a>
              <a
                href="https://scholar.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-white border border-slate-300 text-slate-800 rounded-full hover:bg-slate-50 flex items-center gap-2 transition-all shadow-sm"
              >
                <span>View Profile</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          <div className="bg-blue-50/60 border border-blue-100 p-5 rounded-2xl space-y-1">
            <div className="flex items-center gap-2 font-bold text-xs text-blue-900">
              <BookOpen size={16} />
              <span>Academic Excellence</span>
            </div>
            <p className="text-xs text-slate-600">
              Leading research in AI/ML and guiding students towards innovative solutions.
            </p>
          </div>

          <div className="bg-blue-50/60 border border-blue-100 p-5 rounded-2xl space-y-1">
            <div className="flex items-center gap-2 font-bold text-xs text-blue-900">
              <Users size={16} />
              <span>Community Engagement</span>
            </div>
            <p className="text-xs text-slate-600">
              Fostering social responsibility and community service among student volunteers.
            </p>
          </div>

          <div className="bg-blue-50/60 border border-blue-100 p-5 rounded-2xl space-y-1">
            <div className="flex items-center gap-2 font-bold text-xs text-blue-900">
              <ShieldCheck size={16} />
              <span>NGO Leadership</span>
            </div>
            <p className="text-xs text-slate-600">
              Coordinating social welfare programs and volunteer activities across Haldia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
