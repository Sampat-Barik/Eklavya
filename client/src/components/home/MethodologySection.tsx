import { Compass, BookOpen, ShieldCheck, type LucideIcon } from 'lucide-react';

interface MethodologyStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
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
      bullets: [
        'Scholarships for formal school admissions',
        'Student leadership training at HIT Haldia',
        'Zero administrative overhead, direct impact'
      ]
    }
  ];

  return (
    <section className="py-8 sm:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Sticky Editorial Statement (5 cols) */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/[0.04] border border-slate-900/[0.08] text-slate-800 text-[11px] font-mono tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            <span>OUR METHODOLOGY</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-serif font-normal text-slate-900 tracking-[-0.02em] leading-[1.08]">
            How The System Protects <br />
            <span className="italic font-normal text-slate-700">
              Every Life & Journey
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            From the initial distress call to formal school enrollment, our student-powered framework ensures total accountability, clinical compassion, and permanent transformation without administrative bureaucracy.
          </p>

          <div className="pt-4 border-t border-slate-900/[0.08] space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Execution Principle
            </span>
            <p className="font-serif italic text-slate-800 text-base">
              "Action on the ground, led directly by engineers with empathy."
            </p>
          </div>
        </div>

        {/* Right Column: Borderless Numbered Narrative Rows (7 cols) */}
        <div className="lg:col-span-7 space-y-8 divide-y divide-slate-900/[0.08]">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className={`flex flex-col sm:flex-row items-start gap-6 sm:gap-8 ${idx > 0 ? 'pt-8' : ''}`}
              >
                {/* Step Number & Icon */}
                <div className="flex sm:flex-col items-center sm:items-start gap-4 shrink-0">
                  <span className="font-serif font-normal text-4xl sm:text-5xl text-slate-300 leading-none">
                    {item.step}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                    <Icon size={18} strokeWidth={1.75} />
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3 flex-1">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                      {item.subtitle}
                    </span>
                    <h3 className="text-2xl font-serif font-normal text-slate-900 mt-0.5">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed font-normal">
                    {item.description}
                  </p>

                  <ul className="space-y-2 pt-2">
                    {item.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
