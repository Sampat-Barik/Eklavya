import React, { useState, useEffect } from 'react';
import { Users, Heart, BookOpen, Clock, ShieldCheck, type LucideIcon } from 'lucide-react';

interface MetricTickerItem {
  id: string;
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  badgeColor: string;
}

export const LiveOperationsTicker: React.FC = () => {
  const tickerItems: MetricTickerItem[] = [
    {
      id: '1',
      label: 'Rural Children Enrolled',
      value: '150+',
      detail: 'Daily Evening Classes Active',
      icon: BookOpen,
      badgeColor: 'text-blue-600 bg-blue-50 border-blue-100',
    },
    {
      id: '2',
      label: 'Animals Rescued & Treated',
      value: '120+',
      detail: 'Vaccination & Wound Care',
      icon: Heart,
      badgeColor: 'text-rose-600 bg-rose-50 border-rose-100',
    },
    {
      id: '3',
      label: 'HIT Student Volunteers',
      value: '60+',
      detail: 'Daily Roster on Ground',
      icon: Users,
      badgeColor: 'text-amber-600 bg-amber-50 border-amber-100',
    },
    {
      id: '4',
      label: 'Emergency Response Time',
      value: '< 15 mins',
      detail: 'Across Haldia Campus Vicinity',
      icon: Clock,
      badgeColor: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
    {
      id: '5',
      label: 'Student-Led Transparency',
      value: '100%',
      detail: 'Direct Field Deployment',
      icon: ShieldCheck,
      badgeColor: 'text-indigo-600 bg-indigo-50 border-indigo-100',
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
    <div className="w-full">
      <div className="relative rounded-2xl bg-white border border-slate-200/90 p-3 sm:p-4 text-slate-900 shadow-xs overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Live Beacon */}
          <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Live Field Ticker</span>
            </div>
            <div className="h-4 w-[1px] bg-slate-200 hidden md:block" />
          </div>

          {/* Desktop Multi-column View */}
          <div className="hidden lg:grid grid-cols-5 gap-3 divide-x divide-slate-100 w-full pl-2">
            {tickerItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="flex items-center gap-3 px-3">
                  <div className={`p-2 rounded-xl border ${item.badgeColor}`}>
                    <Icon size={16} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-serif font-black text-sm tracking-tight text-slate-900 leading-none">
                      {item.value}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 truncate mt-0.5">
                      {item.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile/Tablet Carousel */}
          <div className="lg:hidden w-full overflow-hidden">
            <div
              key={currentIndex}
              className="flex items-center justify-between bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                {(() => {
                  const item = tickerItems[currentIndex];
                  const Icon = item.icon;
                  return (
                    <>
                      <div className={`p-2 rounded-xl border ${item.badgeColor}`}>
                        <Icon size={16} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-black text-base text-slate-900">
                            {item.value}
                          </span>
                          <span className="text-xs font-bold text-slate-700">
                            {item.label}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 block">
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
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentIndex ? 'w-4 bg-blue-600' : 'w-1.5 bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
