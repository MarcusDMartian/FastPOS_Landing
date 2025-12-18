import React from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  variant?: 'default' | 'pattern' | 'gray';
}

export const Section: React.FC<SectionProps> = ({ id, className = '', children, variant = 'default' }) => {
  let bgClass = 'bg-white';
  if (variant === 'pattern') bgClass = 'bg-white bg-dot-pattern';
  if (variant === 'gray') bgClass = 'bg-gray-50';

  return (
    <section 
      id={id} 
      className={`py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${bgClass} ${className}`}
    >
      {variant === 'pattern' && (
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none opacity-80"></div>
      )}
      <div className="max-w-6xl mx-auto relative z-10">
        {children}
      </div>
    </section>
  );
};