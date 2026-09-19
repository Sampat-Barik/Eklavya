import React from 'react';

interface SectionTitleProps {
  badge: string;
  badgeVariant?: 'blue' | 'amber' | 'rose' | 'green';
  title: string;
  highlightWord?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  badge,
  badgeVariant = 'blue',
  title,
  highlightWord,
  subtitle,
  align = 'left',
  className = ''
}) => {
  const badgeClasses = {
    blue: 'editorial-badge-blue',
    amber: 'editorial-badge-amber',
    rose: 'editorial-badge-rose',
    green: 'editorial-badge-green'
  }[badgeVariant];

  const alignmentClass = align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start';

  return (
    <div className={`flex flex-col space-y-3.5 max-w-3xl ${alignmentClass} ${className}`}>
      <span className={badgeClasses}>
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
        {badge}
      </span>

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-slate-900 tracking-tight leading-[1.12]">
        {highlightWord && title.includes(highlightWord) ? (
          <>
            {title.split(highlightWord)[0]}
            <span className="editorial-highlight text-blue-700 italic font-normal">
              {highlightWord}
            </span>
            {title.split(highlightWord)[1]}
          </>
        ) : (
          title
        )}
      </h2>

      {subtitle && (
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};
