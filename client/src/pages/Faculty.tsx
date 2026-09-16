import React from 'react';
import { Mail, ExternalLink, Users, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const Faculty: React.FC = () => {
  return (
    <div className="container mx-auto px-4 max-w-5xl space-y-8 pb-12">
      {/* Top Header Banner */}
      <div className="bg-white border-[2.5px] border-slate-950 rounded-3xl p-8 md:p-10 shadow-[5px_5px_0px_0px_#0f172a] text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#bfdbfe] border-2 border-slate-950 rounded-full text-xs font-black text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]">
          <Sparkles size={14} className="text-blue-700" />
          <span>INSTITUTIONAL LEADERSHIP & GUIDANCE</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-950">Faculty Co-ordinator</h1>
        <p className="text-slate-700 text-xs font-bold max-w-lg mx-auto">
          Guiding our social initiatives, mentoring student volunteers, and ensuring our programs align with academic excellence.
        </p>
      </div>

      {/* Section 1: Department Leadership - Prof.(Dr.) Bidesh Chakraborty */}
      <div className="bg-white border-[2.5px] border-slate-950 rounded-3xl p-8 shadow-[5px_5px_0px_0px_#0f172a] space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-950 pb-2">
          <span className="px-3 py-1 bg-[#fef08a] border-2 border-slate-950 rounded-full text-xs font-black text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]">
            Head of Department
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <ImageWithFallback
            alt="Prof.(Dr.) Bidesh Chakraborty"
            fallbackType="avatar"
            initials="BC"
            className="w-32 h-32 rounded-2xl border-2 border-slate-950 shadow-[3px_3px_0px_0px_#0f172a] shrink-0"
          />

          <div className="space-y-3 flex-1">
            <div>
              <h2 className="text-2xl font-black text-slate-950">Prof. (Dr.) Bidesh Chakraborty</h2>
              <p className="text-xs font-extrabold text-blue-700">Professor & Head of Department</p>
              <p className="text-xs font-bold text-slate-600">
                Department of Computer Science Engineering (AIML), Haldia Institute of Technology
              </p>
            </div>

            <p className="text-slate-700 text-xs font-medium leading-relaxed bg-[#f8fafc] border-2 border-slate-950 p-4 rounded-2xl shadow-[2px_2px_0px_0px_#0f172a]">
              As the Head of Department, Prof. Chakraborty provides strategic leadership for the CSE AIML department, oversees academic programs, and supports our NGO's initiatives through institutional guidance and academic excellence.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-bold">
              <a
                href="mailto:bidesh.chakraborty@hithaldia.ac.in"
                className="px-4 py-2 bg-[#bfdbfe] hover:bg-[#93c5fd] border-2 border-slate-950 text-slate-950 rounded-xl shadow-[2px_2px_0px_0px_#0f172a] flex items-center gap-1.5 transition-all"
              >
                <Mail size={14} />
                <span>Contact</span>
              </a>
              <a
                href="https://scholar.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white hover:bg-slate-50 border-2 border-slate-950 text-slate-950 rounded-xl shadow-[2px_2px_0px_0px_#0f172a] flex items-center gap-1.5 transition-all"
              >
                <span>View Profile</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Faculty Coordinator - Dr. Upasana Adhikary */}
      <div className="bg-white border-[2.5px] border-slate-950 rounded-3xl p-8 shadow-[5px_5px_0px_0px_#0f172a] space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-950 pb-2">
          <span className="px-3 py-1 bg-[#a7f3d0] border-2 border-slate-950 rounded-full text-xs font-black text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]">
            Faculty Coordinator
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <ImageWithFallback
            alt="Dr. Upasana Adhikary"
            fallbackType="avatar"
            initials="UA"
            className="w-32 h-32 rounded-2xl border-2 border-slate-950 shadow-[3px_3px_0px_0px_#0f172a] shrink-0"
          />

          <div className="space-y-3 flex-1">
            <div>
              <h2 className="text-2xl font-black text-slate-950">Dr. Upasana Adhikary</h2>
              <p className="text-xs font-extrabold text-emerald-800">Assistant Professor</p>
              <p className="text-xs font-bold text-slate-600">
                Department of Computer Science Engineering (AIML), Haldia Institute of Technology
              </p>
            </div>

            <p className="text-slate-700 text-xs font-medium leading-relaxed bg-[#f8fafc] border-2 border-slate-950 p-4 rounded-2xl shadow-[2px_2px_0px_0px_#0f172a]">
              As the Faculty Coordinator of our NGO society, Prof. Adhikary guides our social initiatives, mentors student volunteers, and ensures our programs align with academic excellence and community service values.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-bold">
              <a
                href="mailto:upasana.adhikari@hithaldia.ac.in"
                className="px-4 py-2 bg-[#a7f3d0] hover:bg-[#6ee7b7] border-2 border-slate-950 text-slate-950 rounded-xl shadow-[2px_2px_0px_0px_#0f172a] flex items-center gap-1.5 transition-all"
              >
                <Mail size={14} />
                <span>Contact</span>
              </a>
              <a
                href="https://scholar.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white hover:bg-slate-50 border-2 border-slate-950 text-slate-950 rounded-xl shadow-[2px_2px_0px_0px_#0f172a] flex items-center gap-1.5 transition-all"
              >
                <span>View Profile</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t-2 border-slate-950">
          <div className="bg-[#fef08a] border-2 border-slate-950 p-4 rounded-2xl shadow-[3px_3px_0px_0px_#0f172a] space-y-1">
            <div className="flex items-center gap-1.5 font-black text-xs text-slate-950">
              <BookOpen size={16} />
              <span>Academic Excellence</span>
            </div>
            <p className="text-[11px] font-bold text-slate-800">
              Leading research in AI/ML and guiding students towards innovative solutions.
            </p>
          </div>

          <div className="bg-[#bfdbfe] border-2 border-slate-950 p-4 rounded-2xl shadow-[3px_3px_0px_0px_#0f172a] space-y-1">
            <div className="flex items-center gap-1.5 font-black text-xs text-slate-950">
              <Users size={16} />
              <span>Community Engagement</span>
            </div>
            <p className="text-[11px] font-bold text-slate-800">
              Fostering social responsibility and community service among student volunteers.
            </p>
          </div>

          <div className="bg-[#e9d5ff] border-2 border-slate-950 p-4 rounded-2xl shadow-[3px_3px_0px_0px_#0f172a] space-y-1">
            <div className="flex items-center gap-1.5 font-black text-xs text-slate-950">
              <ShieldCheck size={16} />
              <span>NGO Leadership</span>
            </div>
            <p className="text-[11px] font-bold text-slate-800">
              Coordinating social welfare programs and volunteer activities across Haldia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
