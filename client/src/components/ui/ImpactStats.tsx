import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ImpactMetric } from '../../types/ngo';
import { TrendingUp, Users, Heart, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ImpactStatsProps {
  metrics: ImpactMetric[];
  className?: string;
}

export const ImpactStats: React.FC<ImpactStatsProps> = ({ metrics, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Set numbers immediately
        countersRef.current.forEach((el, index) => {
          if (el && metrics[index]) {
            el.textContent = `${metrics[index].prefix || ''}${metrics[index].value}${metrics[index].suffix || ''}`;
          }
        });
        return;
      }

      // Animated counters via GSAP
      metrics.forEach((metric, index) => {
        const targetEl = countersRef.current[index];
        if (!targetEl) return;

        const counterObj = { val: 0 };
        gsap.to(counterObj, {
          val: metric.value,
          duration: 2.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          onUpdate: () => {
            const current = Math.round(counterObj.val);
            targetEl.textContent = `${metric.prefix || ''}${current}${metric.suffix || ''}`;
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [metrics]);

  const getIcon = (category: string) => {
    switch (category) {
      case 'education':
        return <BookOpen size={16} className="text-blue-600" />;
      case 'animal':
        return <Heart size={16} className="text-rose-500" />;
      default:
        return <Users size={16} className="text-amber-600" />;
    }
  };

  return (
    <div ref={containerRef} className={`grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 ${className}`}>
      {metrics.map((metric, i) => (
        <div
          key={metric.id}
          className="editorial-card-warm p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group"
        >
          {/* Subtle background glow pill */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors pointer-events-none" />

          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center">
              {getIcon(metric.category)}
            </div>
            {metric.trend && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-full">
                <TrendingUp size={11} />
                <span>{metric.trend}</span>
              </span>
            )}
          </div>

          <div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-slate-900 tracking-tight flex items-baseline">
              <span
                ref={(el) => {
                  countersRef.current[i] = el;
                }}
              >
                {metric.prefix}0{metric.suffix}
              </span>
            </div>
            <h4 className="font-extrabold text-sm sm:text-base text-slate-800 mt-2">
              {metric.label}
            </h4>
            <p className="text-xs text-slate-500 mt-1 font-normal leading-relaxed">
              {metric.sublabel}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
