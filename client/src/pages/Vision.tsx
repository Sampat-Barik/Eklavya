import React from 'react';
import { BookOpen, Heart, Users, Target, CheckCircle2, Compass } from 'lucide-react';

export const Vision: React.FC = () => {
  return (
    <div className="max-w-[1720px] 2xl:max-w-[1800px] w-full mx-auto px-6 sm:px-10 lg:px-16 py-10 sm:py-16 space-y-20 sm:space-y-28">
      {/* 1. Architectural Open Page Header */}
      <div className="border-b border-[#E5E0D8] pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#C25E38] font-bold">
              <Compass size={14} className="text-[#C25E38]" />
              <span>Institutional Charter • Eklavya Society</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#1C2826] leading-[1.08]">
              Vision, Mission & <br className="hidden sm:inline" />
              Guiding Principles.
            </h1>
            <p className="text-[#1C2826]/70 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
              Founded at Haldia Institute of Technology, Eklavya operates on the moral conviction that no child should lack education due to poverty, and no stray animal should suffer without medical care and shelter.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
            <div className="bg-white/85 backdrop-blur-md border border-[#E5E0D8] rounded-xl p-5 w-full sm:w-auto lg:w-full space-y-2.5 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-mono text-[#1C2826]/60">
                <span>HEADQUARTERS</span>
                <span className="font-bold text-[#1C2826]">HIT CAMPUS</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-[#1C2826]/60">
                <span>ESTABLISHED</span>
                <span className="font-bold text-[#1C2826]">HALDIA, WB</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-[#1C2826]/60">
                <span>ORGANIZATION</span>
                <span className="font-bold text-[#C25E38]">100% VOLUNTEER RUN</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Asymmetric Bento Grid: Core Pillars */}
      <div className="space-y-8">
        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-wider text-[#C25E38] font-bold block">
            Three Operational Pillars
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#1C2826]">
            How We Translate Conviction into Tangible Action
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Flagship Pillar (7 cols) */}
          <div className="lg:col-span-7 bg-white/85 backdrop-blur-md border border-[#E5E0D8] rounded-2xl p-8 sm:p-10 space-y-6 relative overflow-hidden shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="font-serif text-2xl sm:text-3xl font-normal text-[#1C2826]">01</span>
              <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] flex items-center justify-center text-[#C25E38]">
                <BookOpen size={20} strokeWidth={1.75} />
              </div>
            </div>

            <div className="space-y-3">
              <span className="inline-block font-mono text-[11px] uppercase tracking-wider text-[#C25E38] font-bold">
                Daily Evening School Wing
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1C2826]">
                Free Primary Education & Academic Mentorship
              </h3>
              <p className="text-[#1C2826]/75 text-sm leading-relaxed font-normal">
                Every evening from 5:00 PM to 7:30 PM, volunteer undergraduate engineers conduct structured tutoring sessions for children from underprivileged families living around Haldia. Beyond basic literacy and arithmetic, we provide free textbooks, notebooks, geometry sets, and nutritious refreshments.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E5E0D8]">
              <div>
                <span className="font-serif text-xl sm:text-2xl font-normal text-[#1C2826] block">150+</span>
                <span className="text-xs text-[#1C2826]/60 font-medium">Students Enrolled</span>
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl font-normal text-[#1C2826] block">6 Days</span>
                <span className="text-xs text-[#1C2826]/60 font-medium">Per Week Schedule</span>
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl font-normal text-[#1C2826] block">100%</span>
                <span className="text-xs text-[#1C2826]/60 font-medium">Free Study Materials</span>
              </div>
            </div>
          </div>

          {/* Secondary Pillars Stack (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Pillar 02 */}
            <div className="bg-white/85 backdrop-blur-md border border-[#E5E0D8] rounded-2xl p-7 space-y-4 shadow-2xs flex-1">
              <div className="flex items-center justify-between">
                <span className="font-serif text-xl font-normal text-[#1C2826]">02</span>
                <div className="w-9 h-9 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] flex items-center justify-center text-[#C25E38]">
                  <Heart size={18} strokeWidth={1.75} />
                </div>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#C25E38] font-bold block mb-1">
                  Ground Rescue Wing
                </span>
                <h3 className="font-serif text-xl font-normal text-[#1C2826] mb-2">
                  Animal Welfare & Medical Rescue
                </h3>
                <p className="text-[#1C2826]/75 text-xs sm:text-sm leading-relaxed font-normal">
                  Dedicated emergency response squad covering HIT campus and Haldia municipality: treating injured dogs, funding veterinary surgeries, organizing regular anti-rabies vaccinations, and running daily feeding drives.
                </p>
              </div>
            </div>

            {/* Pillar 03 */}
            <div className="bg-white/85 backdrop-blur-md border border-[#E5E0D8] rounded-2xl p-7 space-y-4 shadow-2xs flex-1">
              <div className="flex items-center justify-between">
                <span className="font-serif text-xl font-normal text-[#1C2826]">03</span>
                <div className="w-9 h-9 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] flex items-center justify-center text-[#C25E38]">
                  <Users size={18} strokeWidth={1.75} />
                </div>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#C25E38] font-bold block mb-1">
                  Youth Development
                </span>
                <h3 className="font-serif text-xl font-normal text-[#1C2826] mb-2">
                  Student Leadership & Civic Responsibility
                </h3>
                <p className="text-[#1C2826]/75 text-xs sm:text-sm leading-relaxed font-normal">
                  Cultivating civic conscience among young engineers. Volunteers gain hands-on grassroots project management, team mobilization, and ethical grounding that shapes their careers long after graduation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Objectives & Tactical Milestones: 7:5 Split */}
      <div className="border-t border-[#E5E0D8] pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#C25E38] font-bold">
                <Target size={14} />
                <span>Strategic Roadmap 2026–2028</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#1C2826]">
                Marching Forward With Empathy and Engineering Rigor
              </h2>
            </div>

            <p className="text-[#1C2826]/75 text-sm sm:text-base leading-relaxed font-normal">
              Every initiative launched by Eklavya is documented, audited, and sustained through student continuity. We do not run temporary photo-ops; we build lasting grassroots infrastructure.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-4 bg-white/85 backdrop-blur-md border border-[#E5E0D8] rounded-xl shadow-2xs">
                <CheckCircle2 size={18} className="text-[#C25E38] shrink-0 mt-0.5" strokeWidth={1.75} />
                <div>
                  <h4 className="text-sm font-semibold text-[#1C2826]">Permanent Community Learning Lab</h4>
                  <p className="text-xs text-[#1C2826]/70 mt-0.5 font-normal">Establish a dedicated classroom equipped with computer terminals and a physical library near Haldia.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white/85 backdrop-blur-md border border-[#E5E0D8] rounded-xl shadow-2xs">
                <CheckCircle2 size={18} className="text-[#C25E38] shrink-0 mt-0.5" strokeWidth={1.75} />
                <div>
                  <h4 className="text-sm font-semibold text-[#1C2826]">Campus Sterilization & Vaccination Protocol</h4>
                  <p className="text-xs text-[#1C2826]/70 mt-0.5 font-normal">Partner with Haldia municipal vets to achieve 100% anti-rabies immunity across the campus perimeter.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white/85 backdrop-blur-md border border-[#E5E0D8] rounded-xl shadow-2xs">
                <CheckCircle2 size={18} className="text-[#C25E38] shrink-0 mt-0.5" strokeWidth={1.75} />
                <div>
                  <h4 className="text-sm font-semibold text-[#1C2826]">Alumni-Sponsored Student Scholarships</h4>
                  <p className="text-xs text-[#1C2826]/70 mt-0.5 font-normal">Bridge promising rural students from our evening school into accredited secondary and vocational schooling.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-[#1C2826] text-[#FAF8F5] rounded-2xl p-8 sm:p-10 space-y-6 relative overflow-hidden border border-[#2D3E3A] shadow-xs">
              <div className="space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#C25E38] font-bold block">
                  The Founder's Pledge
                </span>
                <blockquote className="font-serif text-xl sm:text-2xl font-normal leading-snug italic text-[#FAF8F5]/90">
                  "True education does not merely train an engineer to build machines; it inspires them to heal the society they inhabit."
                </blockquote>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#FAF8F5]/60 font-mono">
                <span>Eklavya Constitution</span>
                <span className="text-[#C25E38] font-bold">ARTICLE II, SEC. 1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
