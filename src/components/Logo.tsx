import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  showTagline = false,
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: { icon: 'w-7 h-7', text: 'text-lg', sub: 'text-[9px]' },
    md: { icon: 'w-9 h-9', text: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl', sub: 'text-xs' }
  }[size];

  return (
    <Link 
      to="/" 
      className={`group flex items-center gap-3 transition-opacity duration-200 hover:opacity-90 ${className}`}
      aria-label="Nexora Technologies - Home"
    >
      {/* Geometric Futuristic Glyph */}
      <div className={`relative flex items-center justify-center ${sizeClasses.icon} rounded-xl bg-[#0d121f] border border-blue-500/30 p-1.5 shadow-[0_0_20px_rgba(59,130,246,0.2)] group-hover:border-blue-400/60 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.35)] transition-all duration-300`}>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-violet-500/10 opacity-70 group-hover:opacity-100 transition-opacity"></div>
        <svg 
          viewBox="0 0 64 64" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-full relative z-10"
        >
          <defs>
            <linearGradient id="logoN" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8"/>
              <stop offset="50%" stopColor="#3b82f6"/>
              <stop offset="100%" stopColor="#8b5cf6"/>
            </linearGradient>
            <linearGradient id="logoAccent" x1="64" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#06b6d4"/>
              <stop offset="100%" stopColor="#4f46e5"/>
            </linearGradient>
          </defs>
          {/* Precision Stylized Nexora 'N' Geometry */}
          <path 
            d="M16 48 L16 16 L26 16 L40 38 L40 16 L48 16 L48 48 L38 48 L24 26 L24 48 Z" 
            fill="url(#logoN)"
          />
          <circle cx="44" cy="20" r="3" fill="#38bdf8" />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-extrabold tracking-wider text-white font-['Plus_Jakarta_Sans'] ${sizeClasses.text}`}>
            NEXORA
          </span>
          <span className="text-[10px] font-semibold tracking-widest px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase">
            Tech
          </span>
        </div>
        {showTagline && (
          <span className={`text-slate-400 tracking-wide font-medium mt-1 ${sizeClasses.sub}`}>
            Building Tomorrow's Digital World
          </span>
        )}
      </div>
    </Link>
  );
};

