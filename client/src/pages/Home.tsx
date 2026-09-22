import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Hero } from '../components/home/Hero';
import { LiveOperationsTicker } from '../components/home/LiveOperationsTicker';
import { LiveOperationsMap } from '../components/home/LiveOperationsMap';
import { MethodologySection } from '../components/home/MethodologySection';
import { AboutImpactSection } from '../components/home/AboutImpactSection';
import { EventsSection } from '../components/home/EventsSection';
import { StoriesSection } from '../components/home/StoriesSection';
import { ContactSection } from '../components/home/ContactSection';

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
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 space-y-20 sm:space-y-28 lg:space-y-32 py-4 pb-24">
      {/* 1. Open Asymmetrical Hero with 3D Scene */}
      <div className="gsap-reveal-section">
        <Hero />
      </div>

      {/* 2. Hairline-Bounded Live Operations Ticker */}
      <div className="gsap-reveal-section">
        <LiveOperationsTicker />
      </div>

      {/* 3. Interactive Ground Operations Command Console */}
      <div id="live-operations" className="gsap-reveal-section scroll-mt-24">
        <LiveOperationsMap />
      </div>

      {/* 4. Staggered Editorial Methodology ("How We Deliver Change") */}
      <div id="how-we-work" className="gsap-reveal-section scroll-mt-24">
        <MethodologySection />
      </div>

      {/* 5. Bento-Style Purpose & Core Impact with Authenticity Story & Metrics */}
      <div className="gsap-reveal-section">
        <AboutImpactSection />
      </div>


      {/* 7. Upcoming Events & Ground Drives (7:5 Split) */}
      <div className="gsap-reveal-section">
        <EventsSection />
      </div>

      {/* 8. Field Stories & Grassroot Dispatches (5:7 Split) */}
      <div className="gsap-reveal-section">
        <StoriesSection />
      </div>

      {/* 9. Campus Hub & Direct Contact */}
      <div id="contact" className="gsap-reveal-section scroll-mt-24">
        <ContactSection />
      </div>
    </div>
  );
};
