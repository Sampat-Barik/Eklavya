import React, { useState, useEffect } from 'react';
import { Users, Heart, BookOpen, Clock, ShieldCheck, type LucideIcon } from 'lucide-react';

interface MetricTickerItem {
  id: string;
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
}

export const LiveOperationsTicker: React.FC = () => {
  const tickerItems: MetricTickerItem[] = [
    {
      id: '1',
      label: 'Rural Children Enrolled',
      value: '150+',
      detail: 'Daily Evening Classes Active',
      icon: BookOpen,
    },
    {
      id: '2',
      label: 'Animals Rescued & Treated',
      value: '120+',
      detail: 'Vaccination & Wound Care',
      icon: Heart,
    },
    {
      id: '3',
      label: 'HIT Student Volunteers',
      value: '60+',
      detail: 'Daily Roster on Ground',
      icon: Users,
    },
    {
      id: '4',
      label: 'Emergency Response Time',
      value: '< 15 mins',
      detail: 'Across Haldia Campus Vicinity',
      icon: Clock,
    },
    {
      id: '5',
      label: 'Student-Led Transparency',
      value: '100%',
      detail: 'Direct Field Deployment',
      icon: ShieldCheck,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tickerItems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [tickerItems.length]);

  return (
    <div className="w-full border-y border-slate-200 bg-white/90 backdrop-blur-md py-4 sm:py-5 shadow-sm">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Live Status Kicker */}
        <div className="flex items-center gap-3 shrink-0 self-start md:self-center pl-2">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-mono font-bold uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Live Telemetry</span>
          </div>
          <div className="h-4 w-[1px] bg-slate-200 hidden md:block" />
        </div>

        {/* Desktop Multi-column View with Tabular Alignment */}
        <div className="hidden lg:grid grid-cols-5 gap-4 divide-x divide-slate-200 w-full pl-2">
          {tickerItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="flex items-center gap-3 px-3">
                <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                  <Icon size={14} strokeWidth={1.75} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-serif font-extrabold text-base text-slate-900 leading-tight">
                    {item.value}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-700 truncate uppercase tracking-wider font-bold mt-0.5">
                    {item.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden w-full overflow-hidden">
          <div
            key={currentIndex}
            className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm"
          >
            <div className="flex items-center gap-3">
              {(() => {
                const item = tickerItems[currentIndex];
                const Icon = item.icon;
                return (
                  <>
                    <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                      <Icon size={15} strokeWidth={1.75} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-extrabold text-base text-slate-900">
                          {item.value}
                        </span>
                        <span className="text-xs font-bold text-slate-700">
                          {item.label}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 block font-normal">
                        {item.detail}
                      </span>
                    </div>
                  </>
                );
              })()}
            </div>

            <div className="flex gap-1 shrink-0">
              {tickerItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to metric ${idx + 1}`}
                  className={`h-1 rounded-full transition-all ${
                    idx === currentIndex ? 'w-4 bg-emerald-600' : 'w-1.5 bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

