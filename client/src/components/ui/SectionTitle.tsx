import React from 'react';

interface SectionTitleProps {
  badge: string;
  badgeVariant?: 'blue' | 'amber' | 'rose' | 'green' | 'terracotta';
  title: string;
  highlightWord?: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  badge,
  badgeVariant = 'terracotta',
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
    green: 'editorial-badge-green',
    terracotta: 'editorial-badge-terracotta'
  }[badgeVariant];

  const alignmentClass = {
    center: 'text-center items-center mx-auto',
    right: 'text-left sm:text-right items-start sm:items-end sm:ml-auto',
    left: 'text-left items-start'
  }[align];

  return (
    <div className={`flex flex-col space-y-3.5 max-w-2xl ${alignmentClass} ${className}`}>
      <div className={`flex items-center gap-3 ${align === 'right' ? 'sm:flex-row-reverse' : ''}`}>
        <span className={badgeClasses}>
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75" />
          {badge}
        </span>
        <span className="h-px w-10 bg-[#E5E0D8] hidden sm:inline-block" />
      </div>

      <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-serif font-extrabold text-[#1C2826] tracking-[-0.02em] leading-[1.12]">
        {highlightWord && title.includes(highlightWord) ? (
          <>
            {title.split(highlightWord)[0]}
            <span className="italic text-[#C25E38] font-normal">
              {highlightWord}
            </span>
            {title.split(highlightWord)[1]}
          </>
        ) : (
          title
        )}
      </h2>

      {subtitle && (
        <p className="text-[#1C2826]/75 text-sm sm:text-base leading-relaxed font-normal max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};
