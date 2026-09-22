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
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        countersRef.current.forEach((el, index) => {
          if (el && metrics[index]) {
            el.textContent = `${metrics[index].prefix || ''}${metrics[index].value}${metrics[index].suffix || ''}`;
          }
        });
        return;
      }

      metrics.forEach((metric, index) => {
        const targetEl = countersRef.current[index];
        if (!targetEl) return;

        const counterObj = { val: 0 };
        gsap.to(counterObj, {
          val: metric.value,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 88%',
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
        return <BookOpen size={14} className="text-[#C25E38]" strokeWidth={1.75} />;
      case 'animal':
        return <Heart size={14} className="text-[#C25E38]" strokeWidth={1.75} />;
      default:
        return <Users size={14} className="text-[#C25E38]" strokeWidth={1.75} />;
    }
  };

  return (
    <div ref={containerRef} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {metrics.map((metric, i) => (
        <div
          key={metric.id}
          className="rounded-xl bg-white/85 backdrop-blur-md border border-[#E5E0D8] p-5 sm:p-6 flex flex-col justify-between hover:border-[#C25E38]/40 transition-colors shadow-2xs group"
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] flex items-center justify-center">
              {getIcon(metric.category)}
            </div>
            {metric.trend && (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono tracking-wide text-emerald-800 bg-emerald-50/80 border border-emerald-200/60 px-2 py-0.5 rounded">
                <TrendingUp size={10} />
                <span>{metric.trend}</span>
              </span>
            )}
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-serif font-normal text-[#1C2826] tracking-tight flex items-baseline">
              <span
                ref={(el) => {
                  countersRef.current[i] = el;
                }}
              >
                {metric.prefix}0{metric.suffix}
              </span>
            </div>
            <h4 className="font-semibold text-xs sm:text-sm text-[#1C2826] mt-1.5 leading-snug">
              {metric.label}
            </h4>
            <p className="text-xs text-[#1C2826]/60 mt-1 font-normal leading-relaxed">
              {metric.sublabel}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
