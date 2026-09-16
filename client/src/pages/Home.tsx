import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Heart, Clock, Calendar as CalendarIcon, Sun, ArrowRight, Activity, Camera } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const Home: React.FC = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentSeconds, setCurrentSeconds] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase()
      );
      setCurrentSeconds(`${now.getSeconds()} SEC`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 max-w-6xl space-y-8 pb-12">
      {/* Neobrutalist Hero Section (Matching Screenshot 4) */}
      <div className="bg-white border-[2.5px] border-slate-950 rounded-3xl p-8 md:p-12 shadow-[5px_5px_0px_0px_#0f172a] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Headline */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#fbcfe8] border-2 border-slate-950 rounded-full text-xs font-black text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]">
            <Activity size={14} className="text-pink-700" />
            <span>SYSTEM ONLINE</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Smart Crowd Management & <span className="text-blue-600 underline decoration-yellow-300 decoration-4">Eklavya Welfare</span> System
          </h1>

          <p className="text-slate-700 text-sm md:text-base font-medium leading-relaxed">
            AI-powered real-time monitoring, prediction, free education initiatives, and secure database-backed ticket & member management for a safer experience.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/events"
              className="px-5 py-2.5 bg-[#bfdbfe] hover:bg-[#93c5fd] text-slate-950 border-2 border-slate-950 rounded-xl font-black text-xs shadow-[3px_3px_0px_0px_#0f172a] flex items-center gap-2 transition-all"
            >
              <span>View Live Crowd</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/donate"
              className="px-5 py-2.5 bg-[#fef08a] hover:bg-[#fde047] text-slate-950 border-2 border-slate-950 rounded-xl font-black text-xs shadow-[3px_3px_0px_0px_#0f172a] transition-all"
            >
              Verify Ticket / Support
            </Link>
          </div>
        </div>

        {/* Right Live Feed Placeholder Card */}
        <div className="lg:col-span-5">
          <div className="relative bg-[#0f172a] border-2 border-slate-950 rounded-2xl p-6 shadow-[4px_4px_0px_0px_#0f172a] text-center space-y-3">
            <div className="absolute top-3 left-3 bg-[#ef4444] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-slate-950 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
              LIVE FEED
            </div>
            <div className="pt-6 pb-4 flex flex-col items-center justify-center text-slate-400">
              <Camera size={40} className="mb-2 opacity-70" />
              <span className="text-xs font-mono font-bold">CCTV_FRONT_GATE_01</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Neobrutalist Widget Cards (Time, Date, Weather - Matching Screenshot 4) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Current Time */}
        <div className="bg-white border-[2.5px] border-slate-950 rounded-2xl p-6 shadow-[4px_4px_0px_0px_#0f172a] text-center space-y-2">
          <div className="w-12 h-12 mx-auto bg-[#e0f2fe] border-2 border-slate-950 rounded-2xl flex items-center justify-center shadow-[2px_2px_0px_0px_#0f172a]">
            <Clock size={24} className="text-blue-700" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">CURRENT TIME</span>
          <div className="text-2xl md:text-3xl font-black text-slate-950">{currentTime || '07:52 AM'}</div>
          <div className="text-[11px] font-mono font-bold text-slate-500">{currentSeconds}</div>
        </div>

        {/* Card 2: Calendar Date */}
        <div className="bg-[#bfdbfe] border-[2.5px] border-slate-950 rounded-2xl p-6 shadow-[4px_4px_0px_0px_#0f172a] text-center space-y-2">
          <div className="w-12 h-12 mx-auto bg-white border-2 border-slate-950 rounded-2xl flex items-center justify-center shadow-[2px_2px_0px_0px_#0f172a]">
            <CalendarIcon size={24} className="text-slate-950" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 block">CALENDAR DATE</span>
          <div className="text-2xl font-black text-slate-950">
            {new Date().toLocaleDateString(undefined, { weekday: 'long' })}
          </div>
          <div className="text-xs font-bold text-slate-800">
            {new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </div>

        {/* Card 3: Location & Weather */}
        <div className="bg-[#fef08a] border-[2.5px] border-slate-950 rounded-2xl p-6 shadow-[4px_4px_0px_0px_#0f172a] relative">
          <div className="absolute top-4 right-4 w-9 h-9 bg-white border-2 border-slate-950 rounded-xl flex items-center justify-center shadow-[2px_2px_0px_0px_#0f172a]">
            <Sun size={20} className="text-amber-500" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 block">LOCATION</span>
          <div className="text-base font-black text-slate-950 mb-2">HALDIA</div>
          <div className="text-3xl font-black text-slate-950">25°C <span className="text-sm font-bold">Sunny</span></div>
          <div className="flex gap-2 text-[10px] font-bold text-slate-800 pt-3">
            <span className="bg-white/80 border border-slate-950 px-2 py-0.5 rounded-md">H: 32°</span>
            <span className="bg-white/80 border border-slate-950 px-2 py-0.5 rounded-md">L: 24°</span>
            <span className="bg-white/80 border border-slate-950 px-2 py-0.5 rounded-md">HUM: 45%</span>
          </div>
        </div>
      </div>

      {/* Neobrutalist Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border-2 border-slate-950 rounded-2xl p-5 shadow-[3px_3px_0px_0px_#0f172a] text-center">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">STUDENTS TAUGHT</span>
          <div className="text-3xl font-black text-blue-600 mt-1">150+</div>
        </div>

        <div className="bg-[#e9d5ff] border-2 border-slate-950 rounded-2xl p-5 shadow-[3px_3px_0px_0px_#0f172a] text-center">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 block">HIT VOLUNTEERS</span>
          <div className="text-3xl font-black text-purple-900 mt-1">60+</div>
        </div>

        <div className="bg-[#a7f3d0] border-2 border-slate-950 rounded-2xl p-5 shadow-[3px_3px_0px_0px_#0f172a] text-center">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 block">COMMUNITY DRIVES</span>
          <div className="text-3xl font-black text-emerald-900 mt-1">25+</div>
        </div>

        <div className="bg-[#fbcfe8] border-2 border-slate-950 rounded-2xl p-5 shadow-[3px_3px_0px_0px_#0f172a] text-center">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 block">ANIMALS RESCUED</span>
          <div className="text-3xl font-black text-rose-900 mt-1">50+</div>
        </div>
      </div>

      {/* Main Initiatives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border-[2.5px] border-slate-950 rounded-3xl p-8 shadow-[4px_4px_0px_0px_#0f172a] space-y-4">
          <div className="w-12 h-12 bg-[#bfdbfe] border-2 border-slate-950 rounded-2xl flex items-center justify-center shadow-[2px_2px_0px_0px_#0f172a]">
            <BookOpen size={24} className="text-slate-950" />
          </div>
          <h3 className="text-2xl font-black text-slate-950">Free Primary Education</h3>
          <p className="text-slate-700 text-xs font-medium leading-relaxed">
            Free daily evening school classes for underprivileged children in Haldia. Our volunteers teach Mathematics, English, and Science while providing stationery kits.
          </p>
          <ImageWithFallback
            alt="Education Drive Placeholder"
            fallbackType="banner"
            className="h-40 w-full rounded-xl"
          />
        </div>

        <div className="bg-white border-[2.5px] border-slate-950 rounded-3xl p-8 shadow-[4px_4px_0px_0px_#0f172a] space-y-4">
          <div className="w-12 h-12 bg-[#fbcfe8] border-2 border-slate-950 rounded-2xl flex items-center justify-center shadow-[2px_2px_0px_0px_#0f172a]">
            <Heart size={24} className="text-rose-600" />
          </div>
          <h3 className="text-2xl font-black text-slate-950">Animal Care & Rescue</h3>
          <p className="text-slate-700 text-xs font-medium leading-relaxed">
            Our animal welfare team responds to distress calls across Haldia Campus, providing medical treatment, anti-rabies vaccinations, and feeding drives.
          </p>
          <ImageWithFallback
            alt="Animal Welfare Drive Placeholder"
            fallbackType="banner"
            className="h-40 w-full rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};
