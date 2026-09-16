import React, { useState } from 'react';
import { User, Image as ImageIcon, Sparkles } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
  fallbackType?: 'avatar' | 'banner' | 'card' | 'logo';
  initials?: string;
  className?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackType = 'card',
  initials,
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(!src);

  if (hasError || !src) {
    if (fallbackType === 'avatar') {
      return (
        <div
          className={`flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white font-bold select-none rounded-full shadow-inner ${className}`}
          title={alt}
        >
          {initials ? (
            <span className="text-sm md:text-base tracking-wider">{initials.substring(0, 2).toUpperCase()}</span>
          ) : (
            <User className="w-1/2 h-1/2 opacity-90" />
          )}
        </div>
      );
    }

    if (fallbackType === 'banner') {
      return (
        <div
          className={`relative overflow-hidden bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex flex-col items-center justify-center p-6 border border-slate-700/50 ${className}`}
        >
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:16px_16px]" />
          <Sparkles className="w-10 h-10 text-cyan-400 mb-2 animate-pulse relative z-10 opacity-80" />
          <p className="text-xs md:text-sm font-medium text-slate-300 relative z-10 text-center">{alt}</p>
        </div>
      );
    }

    if (fallbackType === 'logo') {
      return (
        <div
          className={`flex items-center justify-center bg-primary text-primary-foreground font-black rounded-lg ${className}`}
        >
          <span className="text-lg">E</span>
        </div>
      );
    }

    // Default 'card' fallback
    return (
      <div
        className={`flex flex-col items-center justify-center bg-slate-800/60 dark:bg-slate-900/60 text-slate-400 border border-slate-700/40 rounded-lg p-4 ${className}`}
        title={alt}
      >
        <ImageIcon className="w-8 h-8 opacity-60 mb-2" />
        <span className="text-xs font-medium text-slate-400 text-center line-clamp-1">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={className}
      {...props}
    />
  );
};
