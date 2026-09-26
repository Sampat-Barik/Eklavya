import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      const raf = requestAnimationFrame(() => setIsNavigating(true));
      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 250);

      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(timer);
      };
    }
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen">
      {/* Sleek Top Glowing Progress Indicator */}
      <div
        aria-hidden="true"
        className={`fixed top-0 left-0 right-0 h-[3px] z-[9999] pointer-events-none transition-all duration-300 ${
          isNavigating
            ? 'opacity-100 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 shadow-[0_0_12px_rgba(16,185,129,0.7)]'
            : 'opacity-0'
        }`}
      />

      {/* Fluid Page Content with Subtle Micro-fade */}
      <div
        className={`transition-all duration-200 ease-out ${
          isNavigating ? 'opacity-90 -translate-y-0.5' : 'opacity-100 translate-y-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
};
