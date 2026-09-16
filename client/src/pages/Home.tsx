import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Heart, Users, Calendar, ArrowRight, Sparkles, Quote } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 md:px-8 max-w-[1500px] space-y-12 pb-16">
      {/* Sleek Hero Banner matching live site */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 md:p-14 shadow-xl shadow-slate-900/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-slate-800">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-400/20 rounded-full text-xs font-semibold text-blue-300">
            <Sparkles size={14} className="text-blue-400" />
            <span>HALDIA INSTITUTE OF TECHNOLOGY</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase leading-tight">
              Hands That Care
            </h1>
            <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent uppercase tracking-wider">
              Nurturing Excellence, Inspiring Tomorrow
            </p>
          </div>

          <p className="text-slate-300 text-sm md:text-base font-normal leading-relaxed max-w-2xl">
            A Social Welfare society of Haldia Institute of Technology, marching forward with the thirst of providing free primary education to needy children in underprivileged areas and caring for stray animals.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/donate"
              className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-500/20 flex items-center gap-2 transition-all hover:-translate-y-0.5"
            >
              <Heart size={16} className="fill-white" />
              <span>Donate & Support</span>
            </Link>
            <Link
              to="/events"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs rounded-xl shadow-md backdrop-blur-sm flex items-center gap-2 transition-all hover:-translate-y-0.5"
            >
              <span>Explore Events</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <ImageWithFallback
            alt="Eklavya Social Welfare Drive"
            fallbackType="banner"
            className="h-64 w-full rounded-2xl shadow-2xl"
          />
        </div>
      </div>

      {/* Intro Quote Banner Card */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-cyan-50 border border-blue-200/80 rounded-2xl p-6 md:p-8 shadow-sm flex items-start gap-4">
        <Quote className="text-blue-600 shrink-0 mt-1" size={28} />
        <p className="text-slate-800 text-sm md:text-base font-medium leading-relaxed italic">
          "A Social Welfare society of Haldia Institute of Technology, marching forward with the thirst of providing free primary education to needy children in underprivileged areas."
        </p>
      </div>

      {/* Section 1: Recent Events Highlight */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900">Recent Events</h2>
            <p className="text-xs text-slate-500">Highlighting our latest community welfare campaigns</p>
          </div>
          <a
            href="https://www.instagram.com/eklavyaofficial_?igsh=MXg3eGN6eHR5Y2tqeA=="
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span>Follow on Instagram</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <ImageWithFallback
              alt="Flood Relief Camp 2026"
              fallbackType="banner"
              className="h-48 w-full rounded-xl"
            />
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-1 rounded-full">
                Relief Drive
              </span>
              <h3 className="text-lg font-bold text-slate-900">Flood Relief & Ration Distribution Camp</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Distributing food rations, clean water kits, and essential emergency supplies to flood-affected families near Haldia riverside.
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <ImageWithFallback
              alt="Annual Stationery Drive 2026"
              fallbackType="banner"
              className="h-48 w-full rounded-xl"
            />
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-full">
                Education Drive
              </span>
              <h3 className="text-lg font-bold text-slate-900">Annual Book & Stationery Drive</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Providing free notebooks, bags, and art supplies for over 150 underprivileged children enrolled in our evening classes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Our Impact (3 Stat Cards matching netlify site) */}
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-black text-slate-900">Our Impact</h2>
          <p className="text-xs text-slate-500">Measuring our reach across Haldia Institute of Technology and local communities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-2 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 mx-auto bg-blue-50 text-blue-600 border border-blue-200 rounded-2xl flex items-center justify-center">
              <Users size={24} />
            </div>
            <div className="text-4xl font-black text-slate-900">60+</div>
            <div className="text-xs font-bold text-slate-600">Total Active Members</div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-2 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 mx-auto bg-amber-50 text-amber-600 border border-amber-200 rounded-2xl flex items-center justify-center">
              <BookOpen size={24} />
            </div>
            <div className="text-4xl font-black text-slate-900">150+</div>
            <div className="text-xs font-bold text-slate-600">Total Students Educated</div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-2 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 mx-auto bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-2xl flex items-center justify-center">
              <Calendar size={24} />
            </div>
            <div className="text-4xl font-black text-slate-900">25+</div>
            <div className="text-xs font-bold text-slate-600">Services & Drives Provided</div>
          </div>
        </div>
      </div>

      {/* Section 3: Caring for Our Furry Friends */}
      <div className="bg-gradient-to-r from-rose-50 via-pink-50 to-rose-50 border border-rose-200/80 rounded-3xl p-8 md:p-10 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-7 space-y-3">
          <span className="px-3 py-1 bg-rose-100 text-rose-700 border border-rose-300 rounded-full text-xs font-bold">
            ANIMAL WELFARE WING
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900">Caring for Our Furry Friends</h2>
          <p className="text-slate-700 text-xs md:text-sm leading-relaxed">
            Our animal welfare team responds to distress calls, providing medical treatment, anti-rabies vaccinations, and feeding drives for stray dogs and cats across Haldia Campus.
          </p>
          <div className="flex gap-4 pt-2 text-xs font-bold text-slate-800">
            <div className="bg-white border border-rose-200 px-4 py-2 rounded-xl shadow-sm">
              <span className="text-rose-600 font-black text-lg block">50+</span>
              <span>Animals Rescued</span>
            </div>
            <div className="bg-white border border-rose-200 px-4 py-2 rounded-xl shadow-sm">
              <span className="text-rose-600 font-black text-lg block">20+</span>
              <span>Adoption Stories</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-5">
          <ImageWithFallback
            alt="Animal Care Rescue Drive"
            fallbackType="banner"
            className="h-48 w-full rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};
