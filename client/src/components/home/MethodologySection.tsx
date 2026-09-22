import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Compass, BookOpen, ShieldCheck, CheckCircle2, Zap, Award, Users, type LucideIcon } from 'lucide-react';

interface MethodologyStep {
  step: string;
  phaseTag: string;
  title: string;
  subtitle: string;
  description: string;
  impactMetric: {
    label: string;
    value: string;
    icon: LucideIcon;
  };
  icon: LucideIcon;
  bullets: string[];
}

// 3D Tilt Card Component using Framer Motion
const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`perspective-1000 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const MethodologySection: React.FC = () => {
  const steps: MethodologyStep[] = [
    {
      step: '01',
      phaseTag: 'PHASE 01 • RAPID SCOUTING & RESCUE',
      title: 'Identify & Reach',
      subtitle: 'Cluster Mapping & Emergency Dispatch',
      description:
        'Volunteer student scouts survey rural colonies across Purba Medinipur to map out-of-school children, while our 24/7 campus helpline receives real-time distress calls for injured animals.',
      impactMetric: {
        value: '15-Min Dispatch',
        label: 'Emergency Response',
        icon: Zap,
      },
      icon: Compass,
      bullets: [
        'Door-to-door educational baseline surveys in Purba Medinipur',
        '24/7 dedicated helpline for road accidents and distress calls',
        'Immediate first-aid and medical triage dispatched within 15 minutes',
      ],
    },
    {
      step: '02',
      phaseTag: 'PHASE 02 • SYSTEMIC EDUCATION & CARE',
      title: 'Nurture & Educate',
      subtitle: 'Daily Evening Classes & Veterinary Clinics',
      description:
        'Every evening after university hours, engineering volunteers teach foundational STEM and literacy, while our animal welfare squad administers antiseptic dressings, post-operative care, and rabies vaccinations.',
      impactMetric: {
        value: '150+ Daily',
        label: 'Nutritional Meals & Classes',
        icon: Users,
      },
      icon: BookOpen,
      bullets: [
        '100% free daily academic coaching tailored to learning levels',
        'Daily nutritional snacks, boiled eggs, and fresh milk provided',
        'Routine vaccination & sterilization drives covering campus strays',
      ],
    },
    {
      step: '03',
      phaseTag: 'PHASE 03 • SUSTAINABLE REINTEGRATION',
      title: 'Empower & Sustain',
      subtitle: 'Accredited Schooling & Lifelong Dignity',
      description:
        'We transition enrolled rural children into formal accredited schools, sponsor their full admission and uniform fees, and build permanent community awareness for animal coexistence.',
      impactMetric: {
        value: '100% Retention',
        label: 'Zero Dropout Pipeline',
        icon: Award,
      },
      icon: ShieldCheck,
      bullets: [
        'Full scholarships and uniform sponsorship for formal schooling',
        'Leadership & civic volunteer training for HIT undergraduates',
        'Zero overhead deductions—100% direct-to-ground resource allocation',
      ],
    },
  ];

  return (
    <section className="relative bg-[#FAF8F5] border-y border-[#E5E0D8] -mx-4 sm:-mx-8 lg:-mx-12 px-4 sm:px-8 lg:px-12 py-16 sm:py-24 my-10 overflow-hidden">
      {/* Editorial Watermark Texture */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(#C25E38_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[radial-gradient(#C25E38_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />

      <div className="max-w-[1360px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* Left Side (40% width): Sticky Editorial Column */}
          <div className="w-full lg:w-[40%] lg:sticky lg:top-28 self-start space-y-6 lg:pr-4">
            {/* Terracotta Kicker Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C25E38]/10 border border-[#C25E38]/20 text-[#C25E38] text-xs font-mono font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#C25E38] animate-pulse" />
              <span>OUR METHODOLOGY</span>
            </div>

            {/* Headline in Deep Forest / Charcoal */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#1C2826] tracking-tight leading-[1.12]">
              How The System <br className="hidden sm:inline" />
              Protects Every Life & <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#C25E38]">
                Every Journey.
              </span>
            </h2>

            <p className="text-[#1C2826]/75 text-sm sm:text-base leading-relaxed font-normal">
              From the initial distress call to formal school enrollment, our student-powered framework ensures total operational accountability, clinical compassion, and permanent transformation without bureaucratic friction.
            </p>

            {/* Micro Execution Stats */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-white/80 backdrop-blur-sm border border-[#E5E0D8] rounded-xl p-3.5 space-y-1">
                <span className="font-mono text-base font-bold text-[#1C2826] block">6 Days/Wk</span>
                <span className="text-[11px] font-mono text-[#C25E38] uppercase tracking-wider block font-bold">Field Execution</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm border border-[#E5E0D8] rounded-xl p-3.5 space-y-1">
                <span className="font-mono text-base font-bold text-[#1C2826] block">100% Direct</span>
                <span className="text-[11px] font-mono text-[#C25E38] uppercase tracking-wider block font-bold">Zero Bureaucracy</span>
              </div>
            </div>

            {/* Thesis Quote Box */}
            <div className="pt-6 border-t border-[#E5E0D8] space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#C25E38] font-bold block">
                The Execution Principle
              </span>
              <blockquote className="font-serif italic text-[#1C2826] text-base sm:text-lg leading-snug">
                "Action on the ground, led directly by engineers with empathy."
              </blockquote>
            </div>
          </div>

          {/* Right Side (60% width): Scrollytelling Glass Cards with 3D Tilt */}
          <div className="w-full lg:w-[60%] space-y-8 sm:space-y-10">
            {steps.map((item, index) => {
              const Icon = item.icon;
              const MetricIcon = item.impactMetric.icon;

              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <TiltCard>
                    <div className="relative bg-white/85 backdrop-blur-md border border-[#E5E0D8] rounded-3xl p-7 sm:p-10 shadow-[0_4px_24px_-4px_rgba(28,40,38,0.05)] hover:shadow-[0_16px_36px_-6px_rgba(194,94,56,0.12)] hover:border-[#C25E38]/30 transition-all duration-300 overflow-hidden group">
                      
                      {/* Oversized Subtle Background Number */}
                      <span className="absolute -top-2 right-4 font-serif text-7xl sm:text-8xl font-extrabold text-[#1C2826]/[0.06] select-none pointer-events-none group-hover:text-[#C25E38]/[0.10] transition-colors duration-500">
                        {item.step}
                      </span>

                      {/* Top Row: Phase Tag + Micro Impact Badge */}
                      <div className="flex flex-wrap items-center justify-between gap-3 relative z-10 border-b border-[#E5E0D8]/80 pb-4 mb-5">
                        <span className="font-mono text-[11px] font-bold text-[#C25E38] tracking-wider uppercase bg-[#C25E38]/10 border border-[#C25E38]/20 px-3 py-1 rounded-full">
                          {item.phaseTag}
                        </span>

                        {/* Impact Metric Badge */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C2826]/5 border border-[#1C2826]/10 text-[#1C2826]">
                          <MetricIcon size={13} className="text-[#C25E38]" />
                          <span className="font-mono text-[11px] font-bold">{item.impactMetric.value}</span>
                          <span className="text-[10px] text-[#1C2826]/60 hidden sm:inline">• {item.impactMetric.label}</span>
                        </div>
                      </div>

                      {/* Header with Icon and Title */}
                      <div className="relative z-10 flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#C25E38]/10 border border-[#C25E38]/20 flex items-center justify-center text-[#C25E38] shrink-0 group-hover:bg-[#C25E38] group-hover:text-white transition-colors duration-300">
                          <Icon size={22} strokeWidth={1.75} />
                        </div>
                        <div>
                          <span className="text-xs font-mono uppercase tracking-wider text-[#C25E38] font-bold block">
                            {item.subtitle}
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#1C2826] mt-0.5">
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="relative z-10 text-[#1C2826]/75 text-sm sm:text-base leading-relaxed font-normal mb-6">
                        {item.description}
                      </p>

                      {/* Tactical Execution Bullets */}
                      <div className="relative z-10 pt-4 border-t border-[#E5E0D8]/80 space-y-2.5">
                        {item.bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm text-[#1C2826]/85 font-medium">
                            <CheckCircle2 size={15} className="text-[#C25E38] shrink-0 mt-0.5" strokeWidth={2} />
                            <span className="leading-snug">{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
