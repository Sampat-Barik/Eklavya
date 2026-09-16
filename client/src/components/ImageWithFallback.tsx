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
          className={`flex items-center justify-center bg-[#bfdbfe] text-[#0f172a] font-extrabold border-2 border-slate-950 shadow-[2px_2px_0px_0px_#0f172a] select-none rounded-full ${className}`}
          title={alt}
        >
          {initials ? (
            <span className="text-sm md:text-base tracking-wider uppercase">{initials.substring(0, 2)}</span>
          ) : (
            <User className="w-1/2 h-1/2 text-slate-900" />
          )}
        </div>
      );
    }

    if (fallbackType === 'banner') {
      return (
        <div
          className={`relative overflow-hidden bg-[#e0f2fe] border-2 border-slate-950 shadow-[3px_3px_0px_0px_#0f172a] text-slate-900 flex flex-col items-center justify-center p-6 ${className}`}
        >
          <Sparkles className="w-8 h-8 text-blue-600 mb-1" />
          <p className="text-xs md:text-sm font-bold text-slate-900 text-center">{alt}</p>
        </div>
      );
    }

    if (fallbackType === 'logo') {
      return (
        <div
          className={`flex items-center justify-center bg-[#e9d5ff] text-slate-950 font-black border-2 border-slate-950 rounded-xl shadow-[2px_2px_0px_0px_#0f172a] ${className}`}
        >
          <span className="text-lg">E</span>
        </div>
      );
    }

    // Default 'card' fallback
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#fef08a] text-slate-900 border-2 border-slate-950 shadow-[2px_2px_0px_0px_#0f172a] rounded-xl p-4 ${className}`}
        title={alt}
      >
        <ImageIcon className="w-6 h-6 text-slate-900 mb-1" />
        <span className="text-xs font-bold text-slate-900 text-center line-clamp-1">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={`border-2 border-slate-950 shadow-[3px_3px_0px_0px_#0f172a] ${className}`}
      {...props}
    />
  );
};
