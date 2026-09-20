import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Hero } from '../components/home/Hero';
import { LiveOperationsTicker } from '../components/home/LiveOperationsTicker';
import { LiveOperationsMap } from '../components/home/LiveOperationsMap';
import { MethodologySection } from '../components/home/MethodologySection';
import { AboutImpactSection } from '../components/home/AboutImpactSection';
import { ProgramsSection } from '../components/home/ProgramsSection';
import { EventsSection } from '../components/home/EventsSection';
import { StoriesSection } from '../components/home/StoriesSection';

gsap.registerPlugin(ScrollTrigger);

export const Home: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Subtle entrance reveal animations for page sections
      const sections = gsap.utils.toArray<HTMLElement>('.gsap-reveal-section');

      sections.forEach((section) => {
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 28,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 space-y-12 sm:space-y-16 py-2 pb-12">
      {/* 1. Asymmetrical Hero with 3D Scene */}
      <div className="gsap-reveal-section">
        <Hero />
      </div>

      {/* 2. Compact Live Operations Ticker */}
      <div className="gsap-reveal-section">
        <LiveOperationsTicker />
      </div>

      {/* 3. Interactive Ground Operations & Field Action Console */}
      <div id="live-operations" className="gsap-reveal-section scroll-mt-24">
        <LiveOperationsMap />
      </div>

      {/* 4. Editorial Methodology ("How We Deliver Change") */}
      <div id="how-we-work" className="gsap-reveal-section scroll-mt-24">
        <MethodologySection />
      </div>

      {/* 5. Purpose & Core Impact with Authenticity Story & Metrics */}
      <div className="gsap-reveal-section">
        <AboutImpactSection />
      </div>

      {/* 6. Active Causes & Initiatives */}
      <div id="programs" className="gsap-reveal-section scroll-mt-24">
        <ProgramsSection />
      </div>

      {/* 7. Upcoming Events & Ground Drives */}
      <div className="gsap-reveal-section">
        <EventsSection />
      </div>

      {/* 8. Field Stories & Grassroot Gallery */}
      <div className="gsap-reveal-section">
        <StoriesSection />
      </div>
    </div>
  );
};
