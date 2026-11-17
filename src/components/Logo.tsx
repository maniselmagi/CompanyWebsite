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
    sm: { 
      icon: 'w-8 h-8 rounded-xl', 
      text: 'text-lg', 
      badge: 'text-[8px] px-1.5 py-0.5',
      sub: 'text-[9px]' 
    },
    md: { 
      icon: 'w-10 h-10 rounded-2xl', 
      text: 'text-xl sm:text-2xl', 
      badge: 'text-[9px] px-2 py-0.5',
      sub: 'text-[10px]' 
    },
    lg: { 
      icon: 'w-14 h-14 rounded-2xl', 
      text: 'text-3xl sm:text-4xl', 
      badge: 'text-[10px] px-2.5 py-1',
      sub: 'text-xs' 
    }
  }[size];

  return (
    <Link 
      to="/" 
      className={`group flex items-center gap-3.5 transition-all duration-300 hover:opacity-95 ${className}`}
      aria-label="NEXORA TECHNOLOGIES - Building Tomorrow's Digital World"
    >
      {/* Brand Icon: Iconic 3D Faceted Nexus 'N' Monogram */}
      <div 
        className={`relative flex items-center justify-center ${sizeClasses.icon} bg-gradient-to-br from-[#0b1020] via-[#080d1a] to-[#040710] border border-cyan-500/40 p-1.5 shadow-[0_0_20px_rgba(6,182,212,0.25)] group-hover:border-cyan-400/80 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] group-hover:scale-105 transition-all duration-300 shrink-0 overflow-hidden`}
      >
        {/* Ambient Backlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(6,182,212,0.3),transparent_70%)] pointer-events-none"></div>

        {/* Clean, Bold, Recognizable 'N' Vector Mark */}
        <svg 
          viewBox="0 0 64 64" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-full relative z-10"
        >
          <defs>
            {/* Left Pillar: High-Tech Cyan to Royal Blue */}
            <linearGradient id="logoLeftPillar" x1="12" y1="12" x2="24" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00f2fe" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>

            {/* Diagonal Blade: Electric Blue to Vivid Violet */}
            <linearGradient id="logoDiagonal" x1="16" y1="12" x2="48" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#9333ea" />
            </linearGradient>

            {/* Right Pillar: Vivid Violet to Neon Magenta */}
            <linearGradient id="logoRightPillar" x1="40" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>

          {/* Left Vertical Pillar */}
          <rect x="12" y="12" width="12" height="40" rx="3" fill="url(#logoLeftPillar)" />

          {/* Right Vertical Pillar */}
          <rect x="40" y="12" width="12" height="40" rx="3" fill="url(#logoRightPillar)" />

          {/* Dynamic 3D Diagonal Cross-Blade Connecting Left & Right */}
          <path 
            d="M14 15.5L48 48.5H38L12 22.5V15.5H14Z" 
            fill="url(#logoDiagonal)" 
          />

          {/* Depth Shadow Junction */}
          <path 
            d="M24 25.5L34 35.5V44L24 34V25.5Z" 
            fill="#030712" 
            fillOpacity="0.4" 
          />

          {/* Tech Signal Pulse Dot */}
          <circle cx="48" cy="15" r="3.2" fill="#00f2fe" />
        </svg>
      </div>

      {/* Brand Wordmark & Sub-Badge */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span 
            className={`font-display font-black tracking-[0.16em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 group-hover:from-white group-hover:via-cyan-100 group-hover:to-violet-200 transition-all duration-300 ${sizeClasses.text}`}
          >
            NEXORA
          </span>
          <span 
            className={`inline-flex items-center gap-1 font-mono font-bold uppercase tracking-widest rounded-md bg-gradient-to-r from-cyan-950/70 via-blue-950/70 to-purple-950/70 border border-cyan-500/35 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)] ${sizeClasses.badge}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>TECH</span>
          </span>
        </div>
        
        {showTagline && (
          <span className={`text-slate-400 tracking-wider font-medium mt-0.5 ${sizeClasses.sub}`}>
            Building Tomorrow's Digital World.
          </span>
        )}
      </div>
    </Link>
  );
};
