import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

import { PageTransition } from '../components/ui/PageTransition';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] font-sans antialiased text-[#1C2826] flex flex-col justify-between selection:bg-[#C25E38] selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content with Branded Page Transition */}
      <main className="flex-grow">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};
