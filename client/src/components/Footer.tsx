import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-900/[0.08] bg-white/70 backdrop-blur-md mt-24 text-slate-900">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14">
          {/* Brand Column (5 cols) */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl border border-slate-900/10 p-1 bg-white shadow-2xs shrink-0">
                <img src="/eklavya_logo.png" alt="Eklavya Crest" className="w-full h-full object-contain" />
              </div>
              <div className="leading-none">
                <span className="font-serif font-extrabold text-xl tracking-tight text-slate-900">Eklavya</span>
                <span className="block font-mono text-[10px] uppercase tracking-wider text-slate-600 mt-1">
                  Socio-Animal Welfare Society • HIT Haldia
                </span>
              </div>
            </div>

            <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed max-w-md">
              A student-driven humanitarian and animal rescue society at Haldia Institute of Technology. Marching forward to provide free evening primary education to village children and 24/7 medical rescue for stray animals.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://www.instagram.com/eklavyaofficial_?igsh=MXg3eGN6eHR5Y2tqeA=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-slate-900/10 bg-white flex items-center justify-center text-slate-600 hover:text-pink-600 hover:border-pink-300 transition-colors shadow-2xs"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-slate-900/10 bg-white flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-colors shadow-2xs"
                aria-label="Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.592 9 4.75V8z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-slate-900/10 bg-white flex items-center justify-center text-slate-600 hover:text-sky-600 hover:border-sky-300 transition-colors shadow-2xs"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Column (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-slate-700 font-bold block">
              Navigation
            </span>
            <ul className="space-y-2 text-xs sm:text-sm font-medium text-slate-600">
              <li>
                <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/vision" className="hover:text-blue-600 transition-colors">Vision & Mission</Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-blue-600 transition-colors">Upcoming Drives</Link>
              </li>
              <li>
                <Link to="/help-us" className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700">
                  <span>Help Us</span>
                  <ArrowUpRight size={13} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Community Column (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-slate-700 font-bold block">
              Community
            </span>
            <ul className="space-y-2 text-xs sm:text-sm font-medium text-slate-600">
              <li>
                <Link to="/faculty" className="hover:text-blue-600 transition-colors">Faculty Mentor</Link>
              </li>
              <li>
                <Link to="/members" className="hover:text-blue-600 transition-colors">Active Squad</Link>
              </li>
              <li>
                <Link to="/alumni" className="hover:text-blue-600 transition-colors">Esteemed Alumni</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-blue-600 transition-colors">Portal Login</Link>
              </li>
            </ul>
          </div>

          {/* Coordinates Column (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-slate-700 font-bold block">
              Campus Headquarters
            </span>
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <MapPin size={15} className="text-slate-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Student Activity Center, Haldia Institute of Technology, Purba Medinipur, WB 721657
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={15} className="text-slate-600 shrink-0" />
                <a href="mailto:eklavya.official.haldia@gmail.com" className="hover:text-blue-600 transition-colors font-mono">
                  eklavya.official.haldia@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Hairline Divided Bottom Bar */}
        <div className="border-t border-slate-900/[0.08] mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-600 gap-3">
          <p>© 2026 Eklavya Society. Affiliated with Haldia Institute of Technology.</p>
          <p className="font-mono text-[11px] text-slate-600">
            ENGINEERED WITH EMPATHY • HANDS THAT CARE
          </p>
        </div>
      </div>
    </footer>
  );
};
