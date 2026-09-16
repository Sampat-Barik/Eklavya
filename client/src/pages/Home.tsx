import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Heart, ArrowRight, Quote } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 md:px-8 max-w-[1500px] space-y-12 py-8">
      {/* Warm Hero Banner matching real student NGO site */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-8 md:p-12 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-5">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider bg-blue-500/20 border border-blue-400/30 text-blue-300 px-3 py-1 rounded-md">
            Haldia Institute of Technology • Socio-Animal Welfare Society
          </span>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Eklavya — Hands That Care
          </h1>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl font-normal">
            Marching forward with the thirst of providing free primary education to needy children in underprivileged areas and providing compassionate care & medical treatment to stray animals in Haldia.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/donate"
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-lg shadow-md flex items-center gap-2 transition-colors"
            >
              <Heart size={16} className="fill-white" />
              <span>Donate & Support</span>
            </Link>
            <Link
              to="/events"
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs rounded-lg flex items-center gap-2 transition-colors"
            >
              <span>View Ongoing Drives</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <ImageWithFallback
            alt="Eklavya Education Session"
            fallbackType="banner"
            className="h-60 w-full rounded-xl shadow-md"
          />
        </div>
      </div>

      {/* Intro Quote Banner */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 md:p-8 flex items-start gap-4">
        <Quote className="text-blue-600 shrink-0 mt-1" size={26} />
        <p className="text-slate-700 text-sm md:text-base font-medium leading-relaxed italic">
          "A Social Welfare society of Haldia Institute of Technology, marching forward with the thirst of providing free primary education to needy children in underprivileged areas."
        </p>
      </div>

      {/* Our Key Initiatives */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-2xl font-bold text-slate-900">Our Key Initiatives</h2>
          <p className="text-xs text-slate-500">Empowering children through education and protecting stray animals in Haldia</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free Education Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg flex items-center justify-center">
              <BookOpen size={22} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900">Free Primary Education</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                We conduct free daily evening school classes for underprivileged children near Haldia. Student volunteers teach Mathematics, English, Science, and distribute notebooks and stationery.
              </p>
            </div>
            <ImageWithFallback
              alt="Free Education Drive"
              fallbackType="banner"
              className="h-44 w-full rounded-lg"
            />
          </div>

          {/* Animal Welfare Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-rose-50 text-rose-600 border border-rose-200 rounded-lg flex items-center justify-center">
              <Heart size={22} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900">Animal Care & Rescue</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Our active animal welfare team responds to distress calls around Haldia Campus, providing medical treatment, anti-rabies vaccinations, and regular feeding drives for stray animals.
              </p>
            </div>
            <ImageWithFallback
              alt="Animal Care Rescue Drive"
              fallbackType="banner"
              className="h-44 w-full rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Our Impact Stats */}
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-slate-900">Our Impact</h2>
          <p className="text-xs text-slate-500">Measuring our service reach across HIT Campus and local Haldia communities</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-1">
            <div className="text-3xl font-extrabold text-blue-600">150+</div>
            <div className="text-xs font-semibold text-slate-700">Children Educated</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-1">
            <div className="text-3xl font-extrabold text-indigo-600">60+</div>
            <div className="text-xs font-semibold text-slate-700">HIT Student Volunteers</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-1">
            <div className="text-3xl font-extrabold text-emerald-600">25+</div>
            <div className="text-xs font-semibold text-slate-700">Community Drives</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-1">
            <div className="text-3xl font-extrabold text-rose-600">50+</div>
            <div className="text-xs font-semibold text-slate-700">Stray Animals Rescued</div>
          </div>
        </div>
      </div>
    </div>
  );
};
