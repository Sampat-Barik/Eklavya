import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { CommunityGlobe } from './CommunityGlobe';
import { Sparkles, Heart } from 'lucide-react';

interface Scene3DProps {
  className?: string;
}

const LoadingFallback: React.FC = () => (
  <div className="w-full h-full flex flex-col items-center justify-center space-y-3 bg-gradient-to-br from-blue-950/20 to-slate-900/10 rounded-3xl p-6 backdrop-blur-sm">
    <div className="relative w-16 h-16 flex items-center justify-center">
      <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-ping" />
      <div className="w-12 h-12 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
      <Sparkles size={18} className="text-blue-500 absolute" />
    </div>
    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
      Connecting Eklavya Network...
    </span>
  </div>
);

const StaticFallback: React.FC = () => (
  <div className="relative w-full h-full min-h-[380px] rounded-3xl overflow-hidden border border-slate-200/80 shadow-xl bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 flex items-center justify-center p-8 text-center text-white">
    <div className="space-y-4 max-w-sm z-10">
      <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center shadow-lg backdrop-blur-md">
        <Heart size={28} className="text-blue-400" />
      </div>
      <h3 className="font-serif text-2xl font-bold">Hands That Care</h3>
      <p className="text-xs text-slate-300 leading-relaxed font-normal">
        A student-powered welfare movement delivering daily education to village children and rescuing stray animals in Haldia.
      </p>
    </div>
  </div>
);

export const Scene3D: React.FC<Scene3DProps> = ({ className = '' }) => {
  const [hasWebGL] = useState<boolean>(() => {
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch {
      return false;
    }
  });

  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (!hasWebGL) {
    return <StaticFallback />;
  }

  return (
    <div className={`relative w-full h-full min-h-[420px] md:min-h-[500px] select-none ${className}`}>
      {/* Decorative ambient radial glow */}
      <div className="absolute inset-0 bg-radial from-blue-500/10 via-transparent to-transparent pointer-events-none rounded-3xl" />

      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 48 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full rounded-3xl"
      >
        <Suspense fallback={<LoadingFallback />}>
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={1.2} color="#93c5fd" />
          <pointLight position={[-10, -10, -5]} intensity={0.8} color="#fbbf24" />
          <directionalLight position={[0, 5, 5]} intensity={0.5} color="#ffffff" />
          <CommunityGlobe reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>

      {/* Floating Interactive HUD Tags */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full border border-slate-200 shadow-sm text-[11px] font-bold text-blue-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Interactive 3D Community Sphere</span>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 z-10 pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200 shadow-sm text-[10px] font-bold text-slate-600 flex items-center gap-2">
          <span>Drag / Hover to rotate</span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
        </div>
      </div>
    </div>
  );
};
