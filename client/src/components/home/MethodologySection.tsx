import React from 'react';
import { Compass, BookOpen, ShieldCheck, ArrowRight, type LucideIcon } from 'lucide-react';

interface MethodologyStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  accentBg: string;
  bullets: string[];
}

export const MethodologySection: React.FC = () => {
  const steps: MethodologyStep[] = [
    {
      step: '01',
      title: 'Identify & Reach',
      subtitle: 'Field Scouting & Rapid Rescue',
      description: 'Our volunteer scouts map rural clusters around Haldia to find out-of-school children, while our emergency helpline receives real-time distress calls for injured street animals.',
      icon: Compass,
      accent: 'text-blue-500',
      accentBg: 'from-blue-500/10 to-transparent',
      bullets: [
        'Weekly surveys in Purba Medinipur villages',
        'Direct helpline for animal road accidents',
        'Immediate first-aid dispatch within 15 minutes'
      ]
    },
    {
      step: '02',
      title: 'Nurture & Educate',
      subtitle: 'Daily Evening Classes & Medical Care',
      description: 'Every evening after university hours, student mentors teach foundational mathematics, science, and languages, while our veterinary squad administers medical dressings and rabies vaccines.',
      icon: BookOpen,
      accent: 'text-amber-500',
      accentBg: 'from-amber-500/10 to-transparent',
      bullets: [
        '100% free daily syllabus coaching',
        'Healthy evening nutrition & milk provided',
        'Sterilization & vaccination drives for campus strays'
      ]
    },
    {
      step: '03',
      title: 'Empower & Sustain',
      subtitle: 'Formal Schooling & Lifelong Dignity',
      description: 'We transition enrolled rural children into formal accredited schools, sponsor their exam fees and uniforms, and build permanent community awareness for animal coexistence.',
      icon: ShieldCheck,
      accent: 'text-emerald-500',
      accentBg: 'from-emerald-500/10 to-transparent',
      bullets: [
        'Scholarships for formal school admissions',
        'Student leadership training at HIT Haldia',
        'Zero administrative overhead, direct impact'
      ]
    }
  ];

  return (
    <section className="space-y-10 py-6">
      {/* Section Header with Eyebrow Pill */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider">
            <span>METHODOLOGY</span>
            <span className="text-amber-400 font-extrabold">• HOW WE DELIVER CHANGE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-slate-900 tracking-tight leading-tight">
            How The System Protects <br />
            <span className="editorial-highlight text-blue-600 font-normal italic">
              Every Life & Journey
            </span>
          </h2>
        </div>
        <p className="text-slate-600 text-sm sm:text-base max-w-md font-normal leading-relaxed">
          From first distress call to lifelong graduation, our student-powered framework ensures accountability, compassion, and permanent transformation.
        </p>
      </div>

      {/* 3-Column Editorial Methodology Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {steps.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.step}
              className="relative rounded-3xl bg-white border border-slate-200/90 p-7 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 group hover:-translate-y-1 overflow-hidden"
            >
              {/* Subtle top gradient accent */}
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${
                  item.step === '01'
                    ? 'from-blue-600 to-cyan-500'
                    : item.step === '02'
                    ? 'from-amber-500 to-orange-500'
                    : 'from-emerald-500 to-teal-500'
                }`}
              />

              <div className="space-y-6">
                {/* Step Number & Icon Header */}
                <div className="flex items-center justify-between">
                  <span className="font-serif font-black text-4xl sm:text-5xl text-slate-200 group-hover:text-slate-900 transition-colors">
                    {item.step}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-800 group-hover:scale-110 transition-transform shadow-xs">
                    <Icon size={22} className={item.accent} />
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">
                    {item.subtitle}
                  </span>
                  <h3 className="text-2xl font-serif font-black text-slate-900 mt-1">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                  {item.description}
                </p>

                {/* Key Checklist Bullets */}
                <ul className="space-y-2 pt-2 border-t border-slate-100">
                  {item.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Card Action */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600 group-hover:underline flex items-center gap-1.5">
                  Learn about our ground operations
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
