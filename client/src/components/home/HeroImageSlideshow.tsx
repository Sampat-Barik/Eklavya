import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, BookOpen, Heart, MapPin, Pause, Play, Image as ImageIcon } from 'lucide-react';

export interface HeroSlide {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  category: string;
  location: string;
}

// Built-in Demo Slides using local Eklavya photos + curated community impact images
const DEMO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    imageUrl: '/eklavya_human_hero.jpg',
    title: 'Evening Primary Education for 150+ Children',
    subtitle: 'Daily after-school tutoring in Maths, Science & English by HIT student engineers.',
    category: 'Village Classes',
    location: 'Ranichak & Khudiram Centres'
  },
  {
    id: 'slide-2',
    imageUrl: '/eklavya_animal_care.jpg',
    title: '24/7 Street Animal Rescue & Medical Care',
    subtitle: 'Wound dressing, emergency surgery funds, anti-rabies vaccination & daily feeding stations.',
    category: 'Veterinary Squad',
    location: 'HIT Campus & Municipal Belt'
  },
  {
    id: 'slide-3',
    imageUrl: '/eklavya_hero_bg.jpg',
    title: 'Rural Relief & Winter Blanket Distribution',
    subtitle: 'Delivering warmth, dry ration kits, and emergency flood aid to riverside settlements.',
    category: 'Community Relief',
    location: 'Riverside Settlements, Haldia'
  },
  {
    id: 'slide-4',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
    title: 'Inspiring Dreams Beyond the Classroom',
    subtitle: 'Equipping rural children with schoolbags, notebooks, pencils & science kits.',
    category: 'Education Outreach',
    location: 'Gandhi Nagar Community Centre'
  },
  {
    id: 'slide-5',
    imageUrl: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=80',
    title: 'Compassionate Youth for Voiceless Lives',
    subtitle: 'HIT volunteers united to ensure every stray animal finds shelter, food, and healing.',
    category: 'Animal Welfare',
    location: 'HIT Campus Periphery'
  }
];

interface HeroImageSlideshowProps {
  slides?: HeroSlide[];
  backendEndpoint?: string;
  autoPlayInterval?: number;
}

export const HeroImageSlideshow: React.FC<HeroImageSlideshowProps> = ({
  slides: propSlides,
  backendEndpoint,
  autoPlayInterval = 4500
}) => {
  const [backendSlides, setBackendSlides] = useState<HeroSlide[] | null>(null);
  const slides = propSlides && propSlides.length > 0 ? propSlides : backendSlides || DEMO_SLIDES;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Optional: Fetch images from user's backend if an endpoint is provided
  useEffect(() => {
    if (!backendEndpoint) return;

    const fetchBackendSlides = async () => {
      try {
        const res = await fetch(backendEndpoint);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setBackendSlides(data);
          } else if (data.slides && Array.isArray(data.slides)) {
            setBackendSlides(data.slides);
          }
        }
      } catch {
        // Graceful fallback to demo mode
        console.info('Backend slideshow endpoint not yet reachable, continuing in demo mode.');
      }
    };

    fetchBackendSlides();
  }, [backendEndpoint]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Autoplay handler
  useEffect(() => {
    if (isPlaying && !isHovered && slides.length > 1) {
      timerRef.current = setInterval(handleNext, autoPlayInterval);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isHovered, slides.length, autoPlayInterval, handleNext]);

  const currentSlide = slides[currentIndex] || DEMO_SLIDES[0];

  return (
    <div
      className="relative w-full h-full min-h-[440px] sm:min-h-[500px] rounded-[28px] overflow-hidden select-none bg-slate-950 shadow-2xl group border border-emerald-900/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Slides with Crossfade Animation */}
      {slides.map((slide, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={slide.id || index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.imageUrl}
              alt={slide.title}
              className={`w-full h-full object-cover object-center transition-transform duration-[6000ms] ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
              loading={index === 0 ? 'eager' : 'lazy'}
            />

            {/* Darker Vignette & Deep Teal Scrim for High-Contrast Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/30" />
            <div className="absolute inset-0 bg-teal-950/15 mix-blend-multiply" />
          </div>
        );
      })}

      {/* Top Floating Badge: Mode Indicator */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-950/80 backdrop-blur-md rounded-full border border-emerald-500/30 shadow-lg text-[11px] font-bold text-emerald-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Real Ground Impact • Live Gallery</span>
          <Sparkles size={12} className="text-amber-300" />
        </div>
      </div>

      {/* Floating Telemetry Badge 1: Top-Right (Village Scholars) */}
      <div className="absolute top-4 right-4 z-20 pointer-events-none hidden sm:block">
        <div className="bg-slate-950/80 backdrop-blur-xl px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-2.5 border border-cyan-500/30 text-white">
          <div className="w-7 h-7 rounded-xl bg-cyan-900/60 text-cyan-300 border border-cyan-400/30 flex items-center justify-center">
            <BookOpen size={14} strokeWidth={2} />
          </div>
          <div>
            <span className="text-[9px] font-mono uppercase text-cyan-200/70 tracking-wider block leading-tight">
              Village Classes
            </span>
            <span className="text-cyan-300 text-xs font-bold">150+ Rural Scholars</span>
          </div>
        </div>
      </div>

      {/* Floating Telemetry Badge 2: Bottom-Left (Animal Rescue) */}
      <div className="absolute bottom-24 left-5 z-20 pointer-events-none hidden sm:block">
        <div className="bg-slate-950/80 backdrop-blur-xl px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-2.5 border border-emerald-500/30 text-white">
          <div className="w-7 h-7 rounded-xl bg-emerald-900/60 text-emerald-300 border border-emerald-400/30 flex items-center justify-center">
            <Heart size={14} className="fill-current text-emerald-400" />
          </div>
          <div>
            <span className="text-[9px] font-mono uppercase text-emerald-200/70 tracking-wider block leading-tight">
              Veterinary Squad
            </span>
            <span className="text-emerald-300 text-xs font-bold">120+ Rescued & Treated</span>
          </div>
        </div>
      </div>

      {/* Bottom Content Overlay: Caption, Category & Location */}
      <div className="absolute bottom-0 inset-x-0 z-20 p-5 sm:p-6 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent pt-14">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-mono uppercase tracking-wider font-extrabold flex items-center gap-1">
            <ImageIcon size={11} />
            <span>{currentSlide.category}</span>
          </span>
          <span className="text-slate-400 text-xs flex items-center gap-1 font-medium">
            <MapPin size={11} className="text-emerald-400" />
            <span className="truncate max-w-[200px]">{currentSlide.location}</span>
          </span>
        </div>

        <h3 className="text-lg sm:text-2xl font-serif font-black text-white leading-tight drop-shadow-md">
          {currentSlide.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 line-clamp-2 max-w-xl font-normal leading-relaxed">
          {currentSlide.subtitle}
        </p>

        {/* Carousel Bottom Bar: Indicators & Controls */}
        <div className="flex items-center justify-between pt-4 mt-2 border-t border-white/10">
          {/* Slide Indicator Dots / Pills */}
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === currentIndex
                    ? 'w-7 h-2 bg-emerald-400 ring-2 ring-emerald-300/40'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Interactive Navigation Controls */}
          <div className="flex items-center gap-2">
            {/* Play/Pause Toggle */}
            <button
              onClick={() => setIsPlaying((prev) => !prev)}
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer border border-white/15"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={13} /> : <Play size={13} className="ml-0.5" />}
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              aria-label="Previous slide"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer border border-white/15"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              aria-label="Next slide"
              className="w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white backdrop-blur-md flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-emerald-950/40 border border-emerald-400/40"
            >
              <ChevronRight size={16} />
            </button>

            {/* Slide Index Badge */}
            <span className="text-[11px] font-mono text-slate-300 font-bold ml-1">
              {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
