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
      {/* Asymmetric Section Header - Right Aligned */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-slate-200/80 pb-6">
        <p className="text-slate-600 text-sm sm:text-base max-w-md font-normal leading-relaxed order-2 sm:order-1">
          From first distress call to formal school enrollment, our student-powered framework ensures total accountability, clinical compassion, and permanent transformation.
        </p>

        <div className="space-y-2 text-left sm:text-right order-1 sm:order-2 sm:ml-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>METHODOLOGY</span>
            <span className="text-amber-400 font-extrabold">• HOW WE DELIVER CHANGE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-slate-900 tracking-tight leading-tight">
            How The System Protects <br className="hidden sm:inline" />
            <span className="editorial-highlight text-blue-600 font-normal italic">
              Every Life & Journey
            </span>
          </h2>
        </div>
      </div>

      {/* 3-Column Asymmetric Editorial Methodology Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          const isFeatured = idx === 1; // Middle card is prominent core engine
          return (
            <div
              key={item.step}
              className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-2 overflow-hidden ${
                isFeatured
                  ? 'bg-gradient-to-b from-white via-amber-50/20 to-white border-2 border-amber-400/80 shadow-lg shadow-amber-500/10 md:-translate-y-2'
                  : 'bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300'
              }`}
            >
              {/* Subtle top gradient accent */}
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${
                  item.step === '01'
                    ? 'from-blue-600 to-cyan-500'
                    : item.step === '02'
                    ? 'from-amber-500 via-orange-500 to-amber-600'
                    : 'from-emerald-500 to-teal-500'
                }`}
              />

              {isFeatured && (
                <div className="absolute top-4 right-5">
                  <span className="bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                    ★ Core Engine
                  </span>
                </div>
              )}

              <div className="space-y-6">
                {/* Step Number & Icon Header */}
                <div className="flex items-center justify-between">
                  <span className="font-serif font-black text-4xl sm:text-5xl text-slate-200 group-hover:text-slate-900 transition-colors">
                    {item.step}
                  </span>
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-xs ${
                      isFeatured
                        ? 'bg-amber-100 text-amber-900 border border-amber-200'
                        : 'bg-slate-50 border border-slate-100 text-slate-800'
                    }`}
                  >
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
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-xs font-semibold text-slate-700">
                      <span
                        className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                          isFeatured ? 'bg-amber-500' : 'bg-blue-600'
                        }`}
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Card Action */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <a
                  href="#live-operations"
                  className={`text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    isFeatured
                      ? 'text-amber-700 hover:text-amber-800'
                      : 'text-blue-600 hover:text-blue-700'
                  }`}
                >
                  <span>Inspect active ground operations</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
