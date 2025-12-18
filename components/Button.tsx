import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'black';
  fullWidth?: boolean;
  withArrow?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  withArrow = false,
  className = '',
  ...props 
}) => {
  // Base styles: Pill shape, bold
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed gap-2";
  
  const variants = {
    primary: "bg-accent-orange text-white hover:bg-orange-600 shadow-lg hover:shadow-orange-200",
    black: "bg-accent-dark text-white hover:bg-gray-800 shadow-lg",
    secondary: "bg-white text-text-main border border-gray-200 hover:border-accent-orange hover:text-accent-orange hover:shadow-md",
    outline: "bg-transparent border-2 border-accent-dark text-text-main hover:bg-accent-dark hover:text-white",
    ghost: "bg-transparent text-text-main hover:bg-gray-100",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
      {withArrow && <ArrowUpRight size={18} />}
    </button>
  );
};