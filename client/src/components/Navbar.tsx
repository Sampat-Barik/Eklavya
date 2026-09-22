import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ChevronDown, 
  User as UserIcon, 
  LogOut, 
  Menu, 
  X, 
  Sparkles, 
  Heart, 
  Shield, 
  GraduationCap, 
  Users, 
  Compass, 
  type LucideIcon 
} from 'lucide-react';

interface SubmenuItem {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
  isExternal?: boolean;
}

export const Navbar: React.FC = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  const navRef = useRef<HTMLDivElement>(null);

  const isHomePage = location.pathname === '/';

  // Scroll detection for adaptive transparent-to-glass header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Nav menus structure
  const aboutItems: SubmenuItem[] = [
    {
      name: 'Vision & Mission',
      description: 'Our foundational philosophy, values & goals',
      href: '/vision',
      icon: Compass,
    },
    {
      name: 'Faculty Coordinator',
      description: 'Academic mentorship & institutional leadership',
      href: '/faculty',
      icon: GraduationCap,
    },
    {
      name: 'Our Team',
      description: 'Active student executive body & field members',
      href: '/members',
      icon: Users,
    },
    {
      name: 'Esteemed Alumni',
      description: 'Former campus leaders continuing the legacy',
      href: '/alumni',
      icon: Sparkles,
    },
  ];



  const portalItems: SubmenuItem[] = [
    {
      name: 'User Portal',
      description: 'Attendance, certificates, events & notifications',
      href: '/portal',
      icon: UserIcon,
    },
    ...(isAdmin
      ? [
          {
            name: 'Admin Console',
            description: 'System approvals, verification & logs',
            href: '/admin',
            icon: Shield,
          },
        ]
      : []),
  ];

  // Helper to toggle desktop dropdown
  const toggleDropdown = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  // Helper to toggle mobile accordion
  const toggleMobileAccordion = (name: string) => {
    setMobileAccordion((prev) => (prev === name ? null : name));
  };

  return (
    <header
      ref={navRef}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isHomePage && !isScrolled
          ? 'bg-transparent border-b border-transparent py-4'
          : 'bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-3'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
        {/* Left: Brand Identity & Compact Status */}
        <div className="flex items-center gap-3.5 sm:gap-4">
          <Link to="/" className="flex items-center gap-2.5 group focus:outline-none">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform shadow-xs">
              <img
                src="/eklavya_logo.png"
                alt="Eklavya Emblem"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-black text-lg text-slate-900 tracking-tight leading-none group-hover:text-blue-600 transition-colors">
                Eklavya
              </span>
              <span className="text-[10px] font-bold text-blue-600 tracking-wider uppercase mt-0.5">
                Hands That Care • HIT Haldia
              </span>
            </div>
          </Link>

          {/* Compact Live Status Indicator */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50/90 border border-emerald-200/90 text-[10px] font-bold text-emerald-700 shadow-xs">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span className="tracking-wide">Operations Active</span>
          </div>
        </div>

        {/* Center: Desktop Navigation with Accessible Dropdowns */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 text-xs font-semibold text-slate-700">
          {/* 1. Standalone Home Link */}
          <Link
            to="/"
            className={`px-3.5 py-1.5 rounded-full transition-all ${
              location.pathname === '/'
                ? 'text-blue-600 font-extrabold bg-blue-50'
                : 'hover:text-blue-600 hover:bg-slate-100/80'
            }`}
          >
            Home
          </Link>

          {/* 2. About Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('about')}
              aria-expanded={openDropdown === 'about'}
              aria-haspopup="true"
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition-all focus:outline-none ${
                ['/vision', '/faculty', '/members', '/alumni'].includes(location.pathname) ||
                openDropdown === 'about'
                  ? 'text-blue-600 font-extrabold bg-blue-50'
                  : 'hover:text-blue-600 hover:bg-slate-100/80'
              }`}
            >
              <span>About</span>
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${
                  openDropdown === 'about' ? 'rotate-180 text-blue-600' : 'text-slate-400'
                }`}
              />
            </button>

            {openDropdown === 'about' && (
              <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl p-2 z-50 animate-fadeIn">
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                  About Eklavya Society
                </div>
                {aboutItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-blue-50/70 transition-colors group"
                    >
                      <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-blue-600 group-hover:text-white transition-colors mt-0.5">
                        <Icon size={14} />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 block">
                          {item.name}
                        </span>
                        <span className="text-[11px] text-slate-500 font-normal leading-tight block mt-0.5">
                          {item.description}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3. Our Work Tab */}
          <Link
            to="/our-work"
            className={`px-3.5 py-1.5 rounded-full transition-all ${
              ['/our-work', '/work', '/programs'].includes(location.pathname)
                ? 'text-blue-600 font-extrabold bg-blue-50'
                : 'hover:text-blue-600 hover:bg-slate-100/80'
            }`}
          >
            Our Work
          </Link>

          {/* 4. Events Tab */}
          <Link
            to="/events"
            className={`px-3.5 py-1.5 rounded-full transition-all ${
              location.pathname === '/events'
                ? 'text-blue-600 font-extrabold bg-blue-50'
                : 'hover:text-blue-600 hover:bg-slate-100/80'
            }`}
          >
            Events
          </Link>

          {/* 4. Portal Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('portal')}
              aria-expanded={openDropdown === 'portal'}
              aria-haspopup="true"
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition-all focus:outline-none ${
                location.pathname.startsWith('/portal') ||
                location.pathname.startsWith('/admin') ||
                openDropdown === 'portal'
                  ? 'text-blue-600 font-extrabold bg-blue-50'
                  : 'hover:text-blue-600 hover:bg-slate-100/80'
              }`}
            >
              <span>Portal</span>
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${
                  openDropdown === 'portal' ? 'rotate-180 text-blue-600' : 'text-slate-400'
                }`}
              />
            </button>

            {openDropdown === 'portal' && (
              <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl p-2 z-50 animate-fadeIn">
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                  Member & Admin Services
                </div>
                {portalItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-blue-50/70 transition-colors group"
                    >
                      <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-blue-600 group-hover:text-white transition-colors mt-0.5">
                        <Icon size={14} />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 block">
                          {item.name}
                        </span>
                        <span className="text-[11px] text-slate-500 font-normal leading-tight block mt-0.5">
                          {item.description}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

        </nav>

        {/* Right: Help Us Button & Auth / Portal Controls */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Top Right "Help Us" Action Button */}
          <Link
            to="/help-us"
            className="flex items-center gap-1.5 text-xs font-extrabold px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all group"
          >
            <Heart size={14} className="text-rose-300 fill-rose-300 group-hover:scale-125 transition-transform" />
            <span>Help Us</span>
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                to="/portal"
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                  location.pathname.startsWith('/portal')
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-700 bg-slate-100 hover:bg-slate-200/80'
                }`}
              >
                <UserIcon
                  size={13}
                  className={location.pathname.startsWith('/portal') ? 'text-white' : 'text-blue-600'}
                />
                <span>My Portal</span>
              </Link>
              <button
                onClick={handleLogout}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors focus:outline-none"
                title={`Logout (${user?.name || 'User'})`}
                aria-label="Logout"
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-xs font-semibold text-slate-700 hover:text-blue-600 px-3.5 py-1.5 rounded-full hover:bg-slate-100/80 transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-800 hover:bg-slate-100 rounded-full focus:outline-none"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Drawer with Accordion Submenus */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-[1400px] mx-auto bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-4 space-y-2 text-sm font-semibold shadow-2xl animate-fadeIn">
          {/* 1. Home */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3.5 py-2 rounded-xl transition-colors ${
              location.pathname === '/' ? 'bg-blue-50 text-blue-600 font-bold' : 'hover:bg-slate-50 text-slate-800'
            }`}
          >
            Home
          </Link>

          {/* 2. About Accordion */}
          <div className="border border-slate-100 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleMobileAccordion('about')}
              className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-50 text-slate-800 text-left"
            >
              <span>About</span>
              <ChevronDown
                size={15}
                className={`transition-transform duration-200 ${
                  mobileAccordion === 'about' ? 'rotate-180 text-blue-600' : 'text-slate-400'
                }`}
              />
            </button>
            {mobileAccordion === 'about' && (
              <div className="p-2 space-y-1 bg-white">
                {aboutItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-1.5 text-xs text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 3. Our Work */}
          <Link
            to="/our-work"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3.5 py-2 rounded-xl transition-colors ${
              ['/our-work', '/work', '/programs'].includes(location.pathname)
                ? 'bg-blue-50 text-blue-600 font-bold'
                : 'hover:bg-slate-50 text-slate-800'
            }`}
          >
            Our Work
          </Link>

          {/* 4. Events */}
          <Link
            to="/events"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3.5 py-2 rounded-xl transition-colors ${
              location.pathname === '/events' ? 'bg-blue-50 text-blue-600 font-bold' : 'hover:bg-slate-50 text-slate-800'
            }`}
          >
            Events
          </Link>

          {/* 4. Portal Accordion */}
          <div className="border border-slate-100 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleMobileAccordion('portal')}
              className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-50 text-slate-800 text-left"
            >
              <span>Portal</span>
              <ChevronDown
                size={15}
                className={`transition-transform duration-200 ${
                  mobileAccordion === 'portal' ? 'rotate-180 text-blue-600' : 'text-slate-400'
                }`}
              />
            </button>
            {mobileAccordion === 'portal' && (
              <div className="p-2 space-y-1 bg-white">
                {portalItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-1.5 text-xs text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 5. Mobile Help Us Action Button */}
          <Link
            to="/help-us"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/20"
          >
            <Heart size={15} className="text-rose-300 fill-rose-300" />
            <span>Help Us — Donate & Support</span>
          </Link>

          {/* Bottom Auth Link */}
          <div className="pt-2 border-t border-slate-100">
            {isAuthenticated ? (
              <div className="flex items-center justify-between px-3.5 py-2 bg-slate-50 rounded-xl">
                <span className="text-xs text-slate-600">
                  Signed in as <strong className="text-slate-900">{user?.name}</strong>
                </span>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-rose-600 font-bold hover:underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
