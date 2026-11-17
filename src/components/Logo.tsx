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
      sub: 'text-[11px]' 
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
      {/* 3D Isometric Faceted Nexus 'N' Logo Mark */}
      <div 
        className={`relative flex items-center justify-center ${sizeClasses.icon} bg-gradient-to-br from-[#0c1224] via-[#090d18] to-[#050811] border border-cyan-500/40 p-2 shadow-[0_0_20px_rgba(6,182,212,0.22)] group-hover:border-cyan-400/80 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.45)] group-hover:scale-105 transition-all duration-300 shrink-0 overflow-hidden`}
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(6,182,212,0.25),transparent_70%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-600/20 pointer-events-none"></div>

        {/* Precision 3D Vector Isometric Nexus Glyph */}
        <svg 
          viewBox="0 0 64 64" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-full relative z-10 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
        >
          <defs>
            {/* Left Pillar Gradient (Cyan to Royal Blue) */}
            <linearGradient id="nexusLeft" x1="12" y1="12" x2="26" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>

            {/* Diagonal Bridge Gradient (Royal Blue to Neon Violet) */}
            <linearGradient id="nexusBridge" x1="18" y1="14" x2="48" y2="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>

            {/* Right Pillar Gradient (Neon Violet to Electric Magenta) */}
            <linearGradient id="nexusRight" x1="38" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>

            {/* Specular Edge Highlight */}
            <linearGradient id="specularGleam" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Left Vertical Monolith with Beveled Cap */}
          <path 
            d="M14 50V16.8C14 15.2 15.3 14 16.9 14H24C25.7 14 27 15.3 27 17V50H14Z" 
            fill="url(#nexusLeft)" 
          />

          {/* Right Vertical Monolith */}
          <path 
            d="M37 14H47.1C48.7 14 50 15.3 50 17V47.2C50 48.8 48.7 50 47.1 50H40C38.3 50 37 48.7 37 47V14Z" 
            fill="url(#nexusRight)" 
          />

          {/* Dynamic 3D Isometric Cross-Nexus Blade */}
          <path 
            d="M16 16.5L47.5 47.5H38.5L14 23V16.5H16Z" 
            fill="url(#nexusBridge)" 
          />

          {/* Inner Depth Shadow Facet */}
          <path 
            d="M27 28L37 38V47L27 37V28Z" 
            fill="#090d18" 
            fillOpacity="0.45" 
          />

          {/* Top Specular Edge Highlight */}
          <path 
            d="M16 14H24M37 14H47" 
            stroke="url(#specularGleam)" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
          />

          {/* Floating Luminous Tech Node */}
          <circle cx="48" cy="16" r="3.2" fill="#22d3ee" className="animate-pulse" />
          <circle cx="48" cy="16" r="5" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.6" />
        </svg>
      </div>

      {/* Typography: NEXORA Wordmark & Tech Badge */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span 
            className={`font-display font-extrabold tracking-[0.16em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 group-hover:from-white group-hover:via-cyan-100 group-hover:to-violet-200 transition-all duration-300 ${sizeClasses.text}`}
          >
            NEXORA
          </span>
          <span 
            className={`inline-flex items-center gap-1 font-mono font-bold uppercase tracking-widest rounded-full bg-gradient-to-r from-cyan-950/70 via-blue-950/70 to-purple-950/70 border border-cyan-500/35 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.25)] ${sizeClasses.badge}`}
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
