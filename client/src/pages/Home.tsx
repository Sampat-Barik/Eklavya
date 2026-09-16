import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Heart, Quote, Sparkles, Users, ArrowRight } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 space-y-16 py-6 pb-20">
      {/* Editorial Bold Split Hero Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white border border-slate-200/90 rounded-[36px] p-8 md:p-14 shadow-sm relative overflow-hidden">
        {/* Subtle background ambient accent */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-100/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />

        {/* Left Column: Bold Typography & Actions */}
        <div className="lg:col-span-6 space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 border border-amber-200/80 text-amber-900 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles size={14} className="text-amber-600" />
            <span>Socio-Animal Welfare Society • HIT Haldia</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-extrabold text-[#111317] tracking-tight leading-[1.06]">
            <span className="italic font-normal text-amber-800">Nurturing</span> Minds,<br />
            Restoring Hope.
          </h1>

          <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-xl font-normal">
            Marching forward with the thirst of providing free primary education to needy children in underprivileged areas & compassionate medical care to stray animals in Haldia.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/register"
              className="bg-[#111317] hover:bg-black text-white px-8 py-4 rounded-full text-sm font-bold shadow-xl transition-all hover:scale-105 flex items-center gap-2"
            >
              <span>Join The Mission</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              to="/donate"
              className="border-2 border-[#111317] hover:bg-[#111317] hover:text-white text-[#111317] px-8 py-4 rounded-full text-sm font-extrabold transition-all flex items-center gap-2 shadow-sm"
            >
              <Heart size={16} className="fill-current text-rose-500" />
              <span>Donate Now</span>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
            <div className="space-y-0.5">
              <span className="text-2xl font-serif font-extrabold text-[#111317]">150+</span>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Children Educated Daily</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-2xl font-serif font-extrabold text-[#111317]">60+</span>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">HIT Student Volunteers</p>
            </div>
          </div>
        </div>

        {/* Right Column: Authentic Photography Hero Frame */}
        <div className="lg:col-span-6 relative z-10">
          <div className="relative rounded-[28px] overflow-hidden border-4 border-slate-100 shadow-2xl group">
            <img
              src="/eklavya_human_hero.jpg"
              alt="Eklavya Outdoor Evening Class in Village"
              className="w-full h-[420px] md:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

            {/* Photo Caption Badge */}
            <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-lg flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-extrabold text-amber-800 uppercase tracking-wider block">
                  ✦ Authentic Field Drive
                </span>
                <p className="text-xs font-bold text-slate-900">
                  Evening School Session under Banyan Tree, Haldia
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shrink-0">
                Active Drive
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Intro Mission Statement Card - "Hey Everyone 👋" */}
      <div className="editorial-card p-8 md:p-14 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">ABOUT OUR SOCIETY</span>
            <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-[#111317]">
              Hey Everyone 👋
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-bold max-w-sm">
            Student-Led Non-Profit Society • Haldia Institute of Technology
          </p>
        </div>

        <p className="text-slate-700 text-base md:text-lg leading-relaxed max-w-4xl font-normal">
          Eklavya is a social welfare society founded and driven by students of Haldia Institute of Technology. Our members unite with a dual commitment: delivering free primary education to children in surrounding rural villages and providing emergency care, vaccinations, and daily feeding to stray animals across Haldia.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#111317] text-white flex items-center justify-center font-bold">
              <BookOpen size={20} />
            </div>
            <h4 className="font-extrabold text-base text-[#111317]">Free Primary Education</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Daily evening classes teaching Math, Science, and English to underprivileged village children.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#111317] text-white flex items-center justify-center font-bold">
              <Heart size={20} />
            </div>
            <h4 className="font-extrabold text-base text-[#111317]">Stray Animal Welfare</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Medical first-aid, anti-rabies vaccination drives, and campus animal feeding squads.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#111317] text-white flex items-center justify-center font-bold">
              <Users size={20} />
            </div>
            <h4 className="font-extrabold text-base text-[#111317]">Volunteer Leadership</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Nurturing student leadership, social responsibility, and engineering talent for social good.
            </p>
          </div>
        </div>
      </div>

      {/* Quote Banner */}
      <div className="bg-[#111317] text-white rounded-[32px] p-8 md:p-12 flex items-start gap-6 shadow-xl">
        <Quote className="text-amber-400 shrink-0 mt-1" size={36} />
        <div className="space-y-3">
          <p className="font-serif text-lg md:text-2xl font-normal leading-relaxed italic text-slate-100">
            "A Social Welfare society of Haldia Institute of Technology, marching forward with the thirst of providing free primary education to needy children in underprivileged areas."
          </p>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest pt-1">
            — Eklavya Executive Society • HIT Haldia
          </div>
        </div>
      </div>

      {/* Key Initiatives Grid with Authentic Photos */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">WHAT WE DO</span>
            <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-[#111317]">
              Our Core Initiatives
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-bold max-w-md">
            Direct ground impact serving education and animal protection across Haldia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Initiative 1: Education */}
          <div className="editorial-card p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-full text-xs font-bold uppercase">
                <BookOpen size={14} />
                <span>Primary Education</span>
              </div>
              <h3 className="text-2xl font-serif font-extrabold text-[#111317]">
                Free Daily Evening Schools
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-normal">
                We conduct free daily evening school classes for underprivileged children living near Haldia. Student volunteers teach Mathematics, English, Science, and distribute notebooks, stationary, and study materials.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm h-60">
              <img
                src="/eklavya_human_hero.jpg"
                alt="Free Primary Education Drive"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Initiative 2: Animal Welfare */}
          <div className="editorial-card p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-rose-50 text-rose-900 border border-rose-200 rounded-full text-xs font-bold uppercase">
                <Heart size={14} />
                <span>Animal Welfare</span>
              </div>
              <h3 className="text-2xl font-serif font-extrabold text-[#111317]">
                Animal Rescue & Feeding
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-normal">
                Our active animal welfare team responds to distress calls around Haldia Campus, providing medical treatment, anti-rabies vaccinations, emergency first-aid, and daily feeding drives for stray animals.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm h-60">
              <img
                src="/eklavya_animal_care.jpg"
                alt="Animal Rescue and Feeding Drive"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Impact Statistics */}
      <div className="bg-[#111317] text-white rounded-[36px] p-10 md:p-16 space-y-8 shadow-2xl">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">OUR IMPACT IN NUMBERS</span>
          <h2 className="text-3xl md:text-5xl font-serif font-extrabold">Measuring Our Reach</h2>
          <p className="text-slate-300 text-xs md:text-sm font-normal">
            Continuous service reach across HIT Campus and local Haldia communities
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1">
            <div className="text-4xl md:text-5xl font-serif font-extrabold text-amber-300">150+</div>
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wide">Children Educated</div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1">
            <div className="text-4xl md:text-5xl font-serif font-extrabold text-amber-300">60+</div>
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wide">HIT Volunteers</div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1">
            <div className="text-4xl md:text-5xl font-serif font-extrabold text-amber-300">25+</div>
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wide">Community Drives</div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1">
            <div className="text-4xl md:text-5xl font-serif font-extrabold text-amber-300">50+</div>
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wide">Animals Rescued</div>
          </div>
        </div>
      </div>

      {/* Action Banner */}
      <div className="editorial-card p-10 md:p-14 text-center space-y-6">
        <h3 className="text-3xl md:text-4xl font-serif font-extrabold text-[#111317]">
          Ready to make a meaningful impact?
        </h3>
        <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto font-normal">
          Become a student volunteer or contribute to our education and animal welfare drives today.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link
            to="/register"
            className="bg-[#111317] hover:bg-black text-white px-8 py-4 rounded-full text-sm font-bold shadow-xl transition-all hover:scale-105"
          >
            Become a Volunteer
          </Link>
          <Link
            to="/donate"
            className="border-2 border-[#111317] text-[#111317] hover:bg-[#111317] hover:text-white px-8 py-4 rounded-full text-sm font-bold transition-all"
          >
            Donate to Eklavya
          </Link>
        </div>
      </div>
    </div>
  );
};
