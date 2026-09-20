import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const [displayChildren, setDisplayChildren] = useState<React.ReactNode>(children);
  const prevPath = useRef<string>(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevPath.current) {
      prevPath.current = location.pathname;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        setDisplayChildren(children);
        window.scrollTo({ top: 0 });
        return;
      }

      // Fast, silky page transition without blocking the screen
      setIsNavigating(true);
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      setDisplayChildren(children);

      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setDisplayChildren(children);
    }
  }, [location.pathname, children]);

  return (
    <div className="relative min-h-screen">
      {/* Sleek Top Glowing Progress Indicator */}
      <div
        aria-hidden="true"
        className={`fixed top-0 left-0 right-0 h-[3px] z-[9999] pointer-events-none transition-all duration-300 ${
          isNavigating
            ? 'opacity-100 bg-gradient-to-r from-blue-600 via-amber-400 to-rose-500 shadow-[0_0_12px_rgba(37,99,235,0.7)]'
            : 'opacity-0'
        }`}
      />

      {/* Subtle Floating Navigation Pulse */}
      {isNavigating && (
        <div 
          aria-hidden="true"
          className="fixed bottom-6 right-6 z-[9999] pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 text-white backdrop-blur-md border border-white/10 shadow-2xl animate-fadeIn"
        >
          <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 animate-spin" style={{ animationDuration: '4s' }}>
            <img src="/eklavya_logo.png" alt="" className="w-full h-full object-contain" />
          </div>
          <span className="text-[11px] font-semibold text-slate-200 tracking-wide">
            Loading...
          </span>
        </div>
      )}

      {/* Fluid Page Content with Subtle Micro-fade */}
      <div
        className={`transition-all duration-200 ease-out ${
          isNavigating ? 'opacity-90 -translate-y-0.5' : 'opacity-100 translate-y-0'
        }`}
      >
        {displayChildren}
      </div>
    </div>
  );
};
