import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { PageTransition } from '../components/ui/PageTransition';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9FAFB] via-[#ECFDF5] to-[#F0FDF4] font-sans antialiased text-slate-900 flex flex-col justify-between selection:bg-teal-700 selection:text-white relative overflow-x-hidden">
      {/* 5-Layer Botanical Background Orchestrator Wrapper */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none text-emerald-900/10">
        {/* Top Left */}
        <img
          src="/bg-leaf-1.svg"
          alt=""
          aria-hidden="true"
          className="absolute -top-10 -left-10 w-96 opacity-20 -rotate-12"
          style={{ filter: 'invert(40%) sepia(20%) saturate(150%) hue-rotate(110deg)' }}
        />

        {/* Mid Right */}
        <img
          src="/bg-leaf-2.svg"
          alt=""
          aria-hidden="true"
          className="absolute top-[30%] -right-16 w-80 opacity-15 rotate-45"
          style={{ filter: 'invert(40%) sepia(20%) saturate(150%) hue-rotate(110deg)' }}
        />

        {/* Center Watermark */}
        <img
          src="/bg-leaf-3.svg"
          alt=""
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] opacity-5"
          style={{ filter: 'invert(40%) sepia(20%) saturate(150%) hue-rotate(110deg)' }}
        />

        {/* Bottom Left */}
        <img
          src="/bg-leaf-4.svg"
          alt=""
          aria-hidden="true"
          className="absolute bottom-[15%] -left-20 w-[28rem] opacity-10 rotate-12"
          style={{ filter: 'invert(40%) sepia(20%) saturate(150%) hue-rotate(110deg)' }}
        />

        {/* Bottom Right */}
        <img
          src="/bg-leaf-5.svg"
          alt=""
          aria-hidden="true"
          className="absolute -bottom-10 -right-10 w-96 opacity-20 -rotate-12"
          style={{ filter: 'invert(40%) sepia(20%) saturate(150%) hue-rotate(110deg)' }}
        />
      </div>

      {/* Top Navbar */}
      <Navbar />

      {/* Main Content with Branded Page Transition */}
      <main className="flex-grow relative z-10">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>

      {/* Global Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};


