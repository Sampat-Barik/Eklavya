import React from 'react';
import { TestimonialsAndFAQSection } from './TestimonialsAndFAQSection';
import { ContactSection } from './ContactSection';

/* Decorative Botanical Sage Leaf Silhouettes matching Image 4 */
const LeafBranchTopRight = () => (
  <svg
    className="absolute -right-6 top-8 w-32 sm:w-44 h-auto text-emerald-600/15 pointer-events-none select-none hidden lg:block"
    viewBox="0 0 140 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M130 270 C100 200 80 130 30 10"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M90 200 C70 180 50 185 45 205 C55 215 75 215 90 200 Z"
      fill="currentColor"
      opacity="0.8"
    />
    <path
      d="M105 230 C125 220 130 200 120 190 C110 195 105 215 105 230 Z"
      fill="currentColor"
      opacity="0.7"
    />
    <path
      d="M75 150 C50 130 30 140 25 160 C40 170 60 165 75 150 Z"
      fill="currentColor"
      opacity="0.8"
    />
    <path
      d="M90 175 C110 165 115 145 105 135 C95 140 88 160 90 175 Z"
      fill="currentColor"
      opacity="0.7"
    />
    <path
      d="M60 95 C35 75 20 85 18 105 C30 115 48 110 60 95 Z"
      fill="currentColor"
      opacity="0.8"
    />
    <path
      d="M70 115 C90 105 95 85 85 75 C75 80 68 100 70 115 Z"
      fill="currentColor"
      opacity="0.7"
    />
    <path
      d="M48 40 C25 20 15 35 20 50 C35 60 48 52 48 40 Z"
      fill="currentColor"
      opacity="0.85"
    />
  </svg>
);

const LeafBranchMidLeft = () => (
  <svg
    className="absolute -left-6 top-1/2 -translate-y-20 w-32 sm:w-44 h-auto text-emerald-600/15 pointer-events-none select-none hidden lg:block"
    viewBox="0 0 140 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 270 C40 200 60 130 110 10"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M50 200 C70 180 90 185 95 205 C85 215 65 215 50 200 Z"
      fill="currentColor"
      opacity="0.8"
    />
    <path
      d="M35 230 C15 220 10 200 20 190 C30 195 35 215 35 230 Z"
      fill="currentColor"
      opacity="0.7"
    />
    <path
      d="M65 150 C90 130 110 140 115 160 C100 170 80 165 65 150 Z"
      fill="currentColor"
      opacity="0.8"
    />
    <path
      d="M50 175 C30 165 25 145 35 135 C45 140 52 160 50 175 Z"
      fill="currentColor"
      opacity="0.7"
    />
    <path
      d="M80 95 C105 75 120 85 122 105 C110 115 92 110 80 95 Z"
      fill="currentColor"
      opacity="0.8"
    />
    <path
      d="M70 115 C50 105 45 85 55 75 C65 80 72 100 70 115 Z"
      fill="currentColor"
      opacity="0.7"
    />
    <path
      d="M92 40 C115 20 125 35 120 50 C105 60 92 52 92 40 Z"
      fill="currentColor"
      opacity="0.85"
    />
  </svg>
);

const LeafBranchBottomRight = () => (
  <svg
    className="absolute -right-6 bottom-12 w-32 sm:w-44 h-auto text-emerald-600/15 pointer-events-none select-none hidden lg:block"
    viewBox="0 0 140 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M130 270 C100 200 80 130 30 10"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M90 200 C70 180 50 185 45 205 C55 215 75 215 90 200 Z"
      fill="currentColor"
      opacity="0.8"
    />
    <path
      d="M75 150 C50 130 30 140 25 160 C40 170 60 165 75 150 Z"
      fill="currentColor"
      opacity="0.8"
    />
    <path
      d="M60 95 C35 75 20 85 18 105 C30 115 48 110 60 95 Z"
      fill="currentColor"
      opacity="0.8"
    />
  </svg>
);

export const CommunityLowerSection: React.FC = () => {
  return (
    <div className="relative rounded-3xl bg-gradient-to-b from-[#F9FAFB] to-[#ECFDF5] border border-emerald-100/90 shadow-sm p-6 sm:p-10 lg:p-14 overflow-hidden space-y-16 sm:space-y-20">
      {/* Decorative Botanical Leaf Silhouettes on Margins */}
      <LeafBranchTopRight />
      <LeafBranchMidLeft />
      <LeafBranchBottomRight />

      {/* Part 1: Voices from the Ground & Campus + Frequently Asked Questions */}
      <div className="relative z-10">
        <TestimonialsAndFAQSection />
      </div>

      {/* Part 2: Connect with Our Campus Society (Split Section) */}
      <div className="relative z-10">
        <ContactSection />
      </div>
    </div>
  );
};
