import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Heart, Quote, ArrowUpRight, Sparkles, Users } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const Home: React.FC = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 space-y-12 py-4 pb-16">
      {/* Exact Dribbble "Enamo" Style Hero Card */}
      <div className="relative rounded-[36px] md:rounded-[44px] overflow-hidden min-h-[580px] md:min-h-[640px] flex flex-col justify-between p-6 md:p-12 shadow-2xl border border-slate-200/50">
        {/* Background Image with Vignette & Fog Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: `url('/eklavya_hero_bg.jpg')` }}
        />
        {/* Deep atmospheric overlay matching nature reference design */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/75 backdrop-brightness-95" />

        {/* Top Floating Badge Bar inside Hero */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide">
            <Sparkles size={14} className="text-amber-300" />
            <span>Socio-Animal Welfare Society • HIT Haldia</span>
          </div>

          <Link
            to="/donate"
            className="hidden sm:flex items-center gap-1.5 bg-[#0e0e0e] hover:bg-black text-white px-5 py-2 rounded-full text-xs font-semibold tracking-wide border border-white/20 shadow-lg transition-transform hover:scale-105"
          >
            <span>Contact Us</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Centered Main Hero Title & Call to Actions */}
        <div className="relative z-10 my-auto text-center space-y-6 max-w-4xl mx-auto py-10">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] drop-shadow-md">
            Nurturing Minds,<br />
            Restoring the Future
          </h1>

          <p className="text-slate-100/90 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed drop-shadow">
            Marching forward with the thirst of providing free primary education to needy children in underprivileged areas & compassionate medical care to stray animals in Haldia.
          </p>

          {/* Dual Pill Action Buttons - Exact Dribbble Layout */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/register"
              className="bg-[#0e0e0e] hover:bg-black text-white px-8 py-3.5 rounded-full text-sm font-semibold shadow-2xl transition-all hover:scale-105 flex items-center gap-2 border border-white/10"
            >
              <span>Join The Mission</span>
            </Link>

            <Link
              to="/donate"
              className="bg-white/25 hover:bg-white/35 backdrop-blur-md text-white border border-white/40 px-8 py-3.5 rounded-full text-sm font-semibold transition-all hover:bg-white/40 shadow-lg flex items-center gap-2"
            >
              <Heart size={16} className="fill-rose-400 text-rose-400" />
              <span>Donate Now</span>
            </Link>
          </div>
        </div>

        {/* Bottom Hero Subtle Tagline */}
        <div className="relative z-10 text-center text-xs font-medium text-white/70 tracking-wider uppercase">
          ✦ Haldia Institute of Technology • Student-Led Non-Profit Society ✦
        </div>
      </div>

      {/* Intro Heading Section - "Hey Everyone 👋" Dribbble Aesthetic */}
      <div className="enamo-card p-8 md:p-12 space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight">
            Hey Everyone 👋
          </h2>
        </div>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-4xl font-normal">
          Eklavya is a dedicated social welfare society operating under Haldia Institute of Technology. Our student volunteers unite with a passionate mission: to bring quality primary education to children in surrounding underprivileged villages while actively protecting, feeding, and providing emergency medical treatment to stray animals across Haldia.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <BookOpen size={20} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">Daily Free Classes</h4>
              <p className="text-xs text-slate-500">Evening schools for village kids</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
              <Heart size={20} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">Animal Healthcare</h4>
              <p className="text-xs text-slate-500">Vaccinations & feeding drives</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Users size={20} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">HIT Volunteers</h4>
              <p className="text-xs text-slate-500">Student led student driven</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Card */}
      <div className="bg-slate-900 text-white rounded-[32px] p-8 md:p-10 flex items-start gap-4 shadow-xl">
        <Quote className="text-amber-400 shrink-0 mt-1" size={32} />
        <div className="space-y-2">
          <p className="text-slate-100 text-base md:text-xl font-medium leading-relaxed italic">
            "A Social Welfare society of Haldia Institute of Technology, marching forward with the thirst of providing free primary education to needy children in underprivileged areas."
          </p>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest pt-1">
            — Eklavya Executive Team • HIT Haldia
          </div>
        </div>
      </div>

      {/* Our Key Initiatives Grid */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">What We Do</span>
            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Our Key Initiatives</h2>
          </div>
          <p className="text-xs text-slate-500 max-w-md">
            Empowering underprivileged children through education and protecting stray animals in Haldia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Free Education Card */}
          <div className="enamo-card p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold">
                <BookOpen size={24} />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-950">Free Primary Education</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-normal">
                We conduct free daily evening school classes for underprivileged children near Haldia. Student volunteers teach Mathematics, English, Science, and distribute free notebooks, books, and stationery items.
              </p>
            </div>
            <ImageWithFallback
              alt="Free Education Drive"
              fallbackType="banner"
              className="h-52 w-full rounded-[24px] object-cover shadow-sm"
            />
          </div>

          {/* Animal Welfare Card */}
          <div className="enamo-card p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold">
                <Heart size={24} />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-950">Animal Care & Rescue</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-normal">
                Our active animal welfare team responds to distress calls around Haldia Campus, providing medical treatment, anti-rabies vaccinations, emergency first-aid, and regular feeding drives for stray animals.
              </p>
            </div>
            <ImageWithFallback
              alt="Animal Care Rescue Drive"
              fallbackType="banner"
              className="h-52 w-full rounded-[24px] object-cover shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Our Impact Stats Cards */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Our Reach</span>
          <h2 className="text-3xl font-extrabold text-slate-950">Our Community Impact</h2>
          <p className="text-xs text-slate-500">Measuring our service reach across HIT Campus and local Haldia communities</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="enamo-card p-6 text-center space-y-2">
            <div className="text-4xl md:text-5xl font-extrabold text-slate-950">150+</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">Children Educated</div>
          </div>

          <div className="enamo-card p-6 text-center space-y-2">
            <div className="text-4xl md:text-5xl font-extrabold text-slate-950">60+</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">HIT Student Volunteers</div>
          </div>

          <div className="enamo-card p-6 text-center space-y-2">
            <div className="text-4xl md:text-5xl font-extrabold text-slate-950">25+</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">Community Drives</div>
          </div>

          <div className="enamo-card p-6 text-center space-y-2">
            <div className="text-4xl md:text-5xl font-extrabold text-slate-950">50+</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">Stray Animals Rescued</div>
          </div>
        </div>
      </div>

      {/* Call to Action Banner */}
      <div className="enamo-card p-8 md:p-12 text-center space-y-6 bg-gradient-to-r from-slate-900 to-slate-950 text-white">
        <h3 className="text-3xl md:text-4xl font-extrabold">Ready to make a difference?</h3>
        <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto">
          Join our team of HIT Haldia student volunteers or contribute to our education and animal welfare fund today.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link
            to="/register"
            className="bg-white hover:bg-slate-100 text-slate-950 px-8 py-3.5 rounded-full text-sm font-bold shadow-lg transition-transform hover:scale-105"
          >
            Become a Volunteer
          </Link>
          <Link
            to="/donate"
            className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-8 py-3.5 rounded-full text-sm font-semibold transition-colors"
          >
            Donate to Eklavya
          </Link>
        </div>
      </div>
    </div>
  );
};
