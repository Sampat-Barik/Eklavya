import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

import { PageTransition } from '../components/ui/PageTransition';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#faf8f5] font-sans antialiased text-slate-900 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
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
