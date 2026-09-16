import { Link } from 'react-router-dom';
import { Heart, Mail, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-20 container mx-auto px-4 max-w-6xl pb-8">
      <div className="bg-white border-[2.5px] border-slate-950 rounded-3xl p-8 md:p-10 shadow-[5px_5px_0px_0px_#0f172a] space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2 font-black text-2xl text-slate-950">
              <span className="px-3 py-1 bg-[#e9d5ff] border-2 border-slate-950 rounded-xl shadow-[2px_2px_0px_0px_#0f172a]">
                EKLAVYA
              </span>
            </div>
            <p className="text-slate-700 text-xs font-medium leading-relaxed">
              A Socio-Animal Welfare society of Haldia Institute of Technology, marching forward with the thirst of providing free primary education to needy children in underprivileged areas and rescuing stray animals.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://www.instagram.com/eklavyaofficial_?igsh=MXg3eGN6eHR5Y2tqeA=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#fbcfe8] border-2 border-slate-950 flex items-center justify-center text-slate-950 shadow-[2px_2px_0px_0px_#0f172a] hover:bg-[#f472b6] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#bfdbfe] border-2 border-slate-950 flex items-center justify-center text-slate-950 shadow-[2px_2px_0px_0px_#0f172a] hover:bg-[#93c5fd] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.592 9 4.75V8z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#a7f3d0] border-2 border-slate-950 flex items-center justify-center text-slate-950 shadow-[2px_2px_0px_0px_#0f172a] hover:bg-[#6ee7b7] transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h3 className="text-slate-950 font-black text-sm uppercase tracking-wider border-b-2 border-slate-950 pb-1">Quick Links</h3>
            <ul className="space-y-1.5 text-xs font-bold text-slate-700">
              <li>
                <Link to="/" className="hover:text-blue-600 transition-colors">Dashboard</Link>
              </li>
              <li>
                <Link to="/vision" className="hover:text-blue-600 transition-colors">Vision & Mission</Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-blue-600 transition-colors">Upcoming Events</Link>
              </li>
              <li>
                <Link to="/donate" className="hover:text-blue-600 transition-colors">Donate Us</Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-2">
            <h3 className="text-slate-950 font-black text-sm uppercase tracking-wider border-b-2 border-slate-950 pb-1">Community</h3>
            <ul className="space-y-1.5 text-xs font-bold text-slate-700">
              <li>
                <Link to="/faculty" className="hover:text-blue-600 transition-colors">Faculty Co-ordinator</Link>
              </li>
              <li>
                <Link to="/members" className="hover:text-blue-600 transition-colors">Our Team & Members</Link>
              </li>
              <li>
                <Link to="/alumni" className="hover:text-blue-600 transition-colors">Esteemed Alumni</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-2">
            <h3 className="text-slate-950 font-black text-sm uppercase tracking-wider border-b-2 border-slate-950 pb-1">Contact Us</h3>
            <div className="space-y-2 text-xs font-bold text-slate-700">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-slate-950 shrink-0 mt-0.5" />
                <span>Haldia Institute of Technology, HIT Campus, Haldia, West Bengal 721657</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-slate-950 shrink-0" />
                <a href="mailto:eklavya.official.haldia@gmail.com" className="hover:text-blue-600 transition-colors">
                  eklavya.official.haldia@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-slate-950 pt-4 flex flex-col md:flex-row justify-between items-center text-xs font-bold text-slate-700 gap-2">
          <p>© 2026 Eklavya - Smart Pilgrim & Socio-Animal Welfare System.</p>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart size={14} className="text-rose-500 fill-rose-500 inline" />
            <span>by Eklavya Tech Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
