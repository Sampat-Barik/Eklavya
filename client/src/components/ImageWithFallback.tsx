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
          className={`flex items-center justify-center bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black border border-slate-200 shadow-inner select-none rounded-full ${className}`}
          title={alt}
        >
          {initials ? (
            <span className="text-sm md:text-base tracking-wider uppercase">{initials.substring(0, 2)}</span>
          ) : (
            <User className="w-1/2 h-1/2 text-white" />
          )}
        </div>
      );
    }

    if (fallbackType === 'banner') {
      return (
        <div
          className={`relative overflow-hidden bg-gradient-to-br from-slate-900 to-blue-950 text-white flex flex-col items-center justify-center p-6 border border-slate-800 shadow-md ${className}`}
        >
          <Sparkles className="w-7 h-7 text-blue-400 mb-1 opacity-80" />
          <p className="text-xs md:text-sm font-semibold text-slate-200 text-center">{alt}</p>
        </div>
      );
    }

    if (fallbackType === 'logo') {
      return (
        <div className={`flex items-center justify-center rounded-full overflow-hidden p-0.5 ${className}`}>
          <img src="/eklavya_logo.png" alt={alt} className="w-full h-full object-contain" />
        </div>
      );
    }

    // Default 'card' fallback
    return (
      <div
        className={`flex flex-col items-center justify-center bg-slate-50 text-slate-500 border border-slate-200 rounded-xl p-4 ${className}`}
        title={alt}
      >
        <ImageIcon className="w-6 h-6 text-slate-400 mb-1" />
        <span className="text-xs font-semibold text-slate-500 text-center line-clamp-1">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={`border border-slate-200/80 shadow-sm ${className}`}
      {...props}
    />
  );
};
