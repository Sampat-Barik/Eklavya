import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Hero } from '../components/home/Hero';
import { AboutImpactSection } from '../components/home/AboutImpactSection';
import { ProgramsSection } from '../components/home/ProgramsSection';
import { EventsSection } from '../components/home/EventsSection';
import { StoriesSection } from '../components/home/StoriesSection';
import { CTASection } from '../components/home/CTASection';
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
            y: 36
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 88%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 space-y-16 sm:space-y-24 py-4 pb-24">
      {/* 1. Full-screen Hero with 3D Scene */}
      <div className="gsap-reveal-section">
        <Hero />
      </div>

      {/* 2. About / Impact Section with Animated Statistics */}
      <div className="gsap-reveal-section">
        <AboutImpactSection />
      </div>

      {/* 3. Causes or Programs Section */}
      <div className="gsap-reveal-section">
        <ProgramsSection />
      </div>

      {/* 4. Events Section (Future Database Driven) */}
      <div className="gsap-reveal-section">
        <EventsSection />
      </div>

      {/* 5. Stories / Posts Gallery (Future MongoDB Content) */}
      <div className="gsap-reveal-section">
        <StoriesSection />
      </div>

      {/* 6. Volunteer & Donation CTA Section */}
      <div className="gsap-reveal-section">
        <CTASection />
      </div>

      {/* 7. Contact Section */}
      <div className="gsap-reveal-section">
        <ContactSection />
      </div>
    </div>
  );
};
