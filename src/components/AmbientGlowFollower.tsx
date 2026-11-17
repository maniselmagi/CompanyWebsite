import React, { useEffect, useState } from 'react';

/**
 * AmbientGlowFollower
 * Luxury interactive cursor aura and magnetic precision pointer inspired by Lusion.co and Awwwards sites.
 * Features:
 * - Fluid radial atmospheric ambient glow
 * - Precision metallic cursor dot with inertial trailing ring
 * - Automatic hover state expansion over interactive elements
 */
export const AmbientGlowFollower: React.FC = () => {
  const [position, setPosition] = useState({ x: -400, y: -400 });
  const [ringPosition, setRingPosition] = useState({ x: -400, y: -400 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isFinePointer || prefersReducedMotion) return;

    let rafId: number;
    let targetX = -400;
    let targetY = -400;
    let currentX = -400;
    let currentY = -400;
    let ringX = -400;
    let ringY = -400;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, input, [role="button"], canvas, .interactive-hover');
        setIsHovering(!!interactive);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const animate = () => {
      // Fast lerp for dot
      currentX += (targetX - currentX) * 0.25;
      currentY += (targetY - currentY) * 0.25;

      // Smooth damped lerp for outer ring
      ringX += (targetX - ringX) * 0.12;
      ringY += (targetY - ringY) * 0.12;

      setPosition({ x: currentX, y: currentY });
      setRingPosition({ x: ringX, y: ringY });
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Large Ambient Atmospheric Glow */}
      <div
        aria-hidden="true"
        className="fixed pointer-events-none z-30 hidden lg:block -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '560px',
          height: '560px',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, rgba(139, 92, 246, 0.04) 40%, rgba(0, 0, 0, 0) 70%)',
          filter: 'blur(40px)',
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* 2. Precision Inertial Outer Ring */}
      <div
        aria-hidden="true"
        className={`fixed pointer-events-none z-50 hidden lg:block -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-200 ease-out ${
          isHovering
            ? 'w-12 h-12 border-cyan-400/80 bg-cyan-400/10 backdrop-blur-[2px] shadow-[0_0_20px_rgba(6,182,212,0.4)]'
            : 'w-7 h-7 border-slate-400/30'
        }`}
        style={{
          left: `${ringPosition.x}px`,
          top: `${ringPosition.y}px`,
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* 3. Central Core Point */}
      <div
        aria-hidden="true"
        className={`fixed pointer-events-none z-50 hidden lg:block -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-150 ${
          isHovering
            ? 'w-1.5 h-1.5 bg-cyan-300 shadow-[0_0_10px_#38bdf8]'
            : 'w-1.5 h-1.5 bg-white/80'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
};
