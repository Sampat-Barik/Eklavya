import React from 'react';
import { Mail, ExternalLink, GraduationCap, BookOpen, ShieldCheck } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const Faculty: React.FC = () => {
  return (
    <div className="max-w-[1720px] 2xl:max-w-[1800px] w-full mx-auto px-6 sm:px-10 lg:px-16 py-10 sm:py-16 space-y-16 sm:space-y-24">
      {/* 1. Open Architectural Page Header */}
      <div className="border-b border-slate-200 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-blue-700 font-bold">
              <GraduationCap size={14} className="text-blue-600" />
              <span>Academic Patronage & Guidance • HIT Haldia</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
              Faculty Mentorship & <br className="hidden sm:inline" />
              Institutional Leadership.
            </h1>
            <p className="text-slate-700 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
              Eklavya operates under the mentorship of the Department of Computer Science & Engineering (AIML) at Haldia Institute of Technology, bridging technical education with direct community service.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
            <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-xl p-5 w-full sm:w-auto lg:w-full space-y-2.5 shadow-sm">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                <span>PARENT DEPARTMENT</span>
                <span className="font-bold text-slate-900">CSE (AIML)</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                <span>INSTITUTION</span>
                <span className="font-bold text-slate-900">HIT HALDIA</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                <span>STATUS</span>
                <span className="font-bold text-emerald-700">OFFICIALLY RECOGNIZED</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Department Leadership: Prof. (Dr.) Bidesh Chakraborty */}
      <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Portrait & Actions (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <ImageWithFallback
                alt="Prof.(Dr.) Bidesh Chakraborty"
                fallbackType="avatar"
                initials="BC"
                className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl border border-slate-200 object-cover shadow-sm"
              />
              <span className="absolute -bottom-2.5 font-mono text-[10px] uppercase tracking-wider bg-slate-900 text-white px-3 py-0.5 rounded-full font-bold">
                DEPARTMENT HEAD
              </span>
            </div>

            <div className="pt-2">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                Prof. (Dr.) Bidesh Chakraborty
              </h2>
              <span className="font-mono text-xs text-blue-700 font-bold block mt-0.5">
                Professor & Head of Department
              </span>
              <p className="text-xs text-slate-600 mt-1 max-w-xs font-normal">
                Dept. of Computer Science & Engineering (AIML), Haldia Institute of Technology
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1 w-full justify-center">
              <a
                href="mailto:bidesh.chakraborty@hithaldia.ac.in"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-mono font-semibold transition-colors shadow-xs"
              >
                <Mail size={13} />
                <span>EMAIL</span>
              </a>
              <a
                href="https://scholar.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-50 hover:bg-white text-slate-900 border border-slate-200 rounded-lg text-xs font-mono font-semibold transition-colors shadow-xs"
              >
                <span>SCHOLAR</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Leadership Narrative (8 cols) */}
          <div className="lg:col-span-8 space-y-5 border-t lg:border-t-0 lg:border-l border-slate-200 pt-6 lg:pt-0 lg:pl-10">
            <span className="font-mono text-xs uppercase tracking-wider text-blue-700 font-bold block">
              Institutional Patron's Message
            </span>
            <blockquote className="font-serif text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              "Technical competence without humanitarian empathy produces incomplete engineers. Eklavya represents the conscience of our student community."
            </blockquote>
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-normal">
              As the Head of the CSE (AIML) Department, Prof. Chakraborty provides institutional oversight, ensuring student volunteers balance rigorous academic milestones with transformative grassroots social service. His patronship enables Eklavya to access campus laboratories, seminar halls, and logistics for our educational and animal welfare drives.
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-800 font-medium">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2">
                <BookOpen size={16} className="text-blue-600 shrink-0" />
                <span>Academic & Curriculum Alignment</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                <span>Institutional Authorization & Safety</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Faculty Coordinator: Dr. Upasana Adhikary */}
      <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Portrait & Actions (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <ImageWithFallback
                alt="Dr. Upasana Adhikary"
                fallbackType="avatar"
                initials="UA"
                className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl border border-slate-200 object-cover shadow-sm"
              />
              <span className="absolute -bottom-2.5 font-mono text-[10px] uppercase tracking-wider bg-emerald-600 text-white px-3 py-0.5 rounded-full font-bold">
                FACULTY COORDINATOR
              </span>
            </div>

            <div className="pt-2">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                Dr. Upasana Adhikary
              </h2>
              <span className="font-mono text-xs text-emerald-700 font-bold block mt-0.5">
                Assistant Professor & Society Mentor
              </span>
              <p className="text-xs text-slate-600 mt-1 max-w-xs font-normal">
                Dept. of Computer Science & Engineering (AIML), Haldia Institute of Technology
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1 w-full justify-center">
              <a
                href="mailto:upasana.adhikari@hithaldia.ac.in"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-mono font-semibold transition-colors shadow-xs"
              >
                <Mail size={13} />
                <span>EMAIL</span>
              </a>
              <a
                href="https://scholar.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-50 hover:bg-white text-slate-900 border border-slate-200 rounded-lg text-xs font-mono font-semibold transition-colors shadow-xs"
              >
                <span>SCHOLAR</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Mentorship Narrative (8 cols) */}
          <div className="lg:col-span-8 space-y-5 border-t lg:border-t-0 lg:border-l border-slate-200 pt-6 lg:pt-0 lg:pl-10">
            <span className="font-mono text-xs uppercase tracking-wider text-emerald-700 font-bold block">
              Coordinator's Guiding Philosophy
            </span>
            <blockquote className="font-serif text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              "Witnessing engineering students step outside air-conditioned classrooms to teach village children and treat injured animals is true character formation."
            </blockquote>
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-normal">
              Dr. Upasana Adhikary directly coordinates society operations, vetting the daily evening school curriculum, monitoring student attendance metrics, and guiding the student executive committee in event execution, budget governance, and annual community drives across Haldia.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="font-serif text-base font-bold text-slate-900 block">Weekly</span>
                <span className="text-xs text-slate-600 font-medium">Operations Review</span>
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="font-serif text-base font-bold text-slate-900 block">Pedagogy</span>
                <span className="text-xs text-slate-600 font-medium">Curriculum Guidance</span>
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="font-serif text-base font-bold text-slate-900 block">Ethics</span>
                <span className="text-xs text-slate-600 font-medium">Volunteer Standards</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
