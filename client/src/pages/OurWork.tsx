import React from 'react';
import { ProgramsSection } from '../components/home/ProgramsSection';
import { Compass, BookOpen, Heart, Users } from 'lucide-react';

export const OurWork: React.FC = () => {
  return (
    <div className="max-w-[1720px] 2xl:max-w-[1800px] w-full mx-auto px-6 sm:px-10 lg:px-16 py-10 sm:py-16 space-y-16 sm:space-y-24">
      {/* 1. Open Architectural Page Header */}
      <div className="border-b border-slate-200 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-blue-700 font-bold">
              <Compass size={14} className="text-blue-600" />
              <span>Ground Welfare & Field Operations • HIT Haldia</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
              Direct Actions <br className="hidden sm:inline" />
              Making Real Change.
            </h1>
            <p className="text-slate-700 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
              Explore our active grassroots welfare initiatives in and around Haldia. Each project is designed, funded, and staffed entirely by dedicated undergraduate engineering students.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
            <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-xl p-5 w-full sm:w-auto lg:w-full space-y-2.5 shadow-sm">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                <span>ACTIVE CAUSES</span>
                <span className="font-bold text-slate-900">4 INITIATIVES</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                <span>CHILDREN ENROLLED</span>
                <span className="font-bold text-slate-900">150+ STUDENTS</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                <span>ANIMALS RESCUED</span>
                <span className="font-bold text-emerald-700">120+ ANNUAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Direct Actions & Causes Section */}
      <div>
        <ProgramsSection />
      </div>

      {/* 3. Operational Highlights & Ethical Standards */}
      <div className="border-t border-slate-200 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-md space-y-3 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <BookOpen size={18} strokeWidth={1.75} />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900">Education Continuity</h3>
            <p className="text-xs text-slate-700 leading-relaxed font-normal">
              Classes are sustained 6 days every week. We ensure curriculum progression, periodic tests, and zero dropouts due to lack of study supplies.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-md space-y-3 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Heart size={18} strokeWidth={1.75} />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900">Humane Veterinary Care</h3>
            <p className="text-xs text-slate-700 leading-relaxed font-normal">
              All animal treatments are supervised by qualified veterinary doctors. Every surgical intervention and anti-rabies vial is audited and logged.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-md space-y-3 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600">
              <Users size={18} strokeWidth={1.75} />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900">Student Ownership</h3>
            <p className="text-xs text-slate-700 leading-relaxed font-normal">
              No commercial intermediaries or third-party contractors. 100% of donor funding translates directly into field aid and supplies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
