import React, { useEffect, useState } from 'react';

/**
 * AmbientGlowFollower
 * Luxury interactive cursor aura inspired by Lusion.co and Awwwards sites.
 * Creates an ultra-subtle, GPU-accelerated radial light that softly follows the pointer on desktop,
 * illuminating glass card borders and background grids without causing layout thrash or mobile drag.
 */
export const AmbientGlowFollower: React.FC = () => {
  const [position, setPosition] = useState({ x: -400, y: -400 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only mount on devices with a fine pointer (desktop / laptop mice)
    if (typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isFinePointer || prefersReducedMotion) return;

    let rafId: number;
    let targetX = -400;
    let targetY = -400;
    let currentX = -400;
    let currentY = -400;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const animate = () => {
      // Smooth lerp (linear interpolation) for organic fluid cursor trailing
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      setPosition({ x: currentX, y: currentY });
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
    <div
      aria-hidden="true"
      className="fixed pointer-events-none z-30 hidden lg:block -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ease-out"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '520px',
        height: '520px',
        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, rgba(139, 92, 246, 0.04) 40%, rgba(0, 0, 0, 0) 70%)',
        filter: 'blur(35px)',
        opacity: isVisible ? 1 : 0,
      }}
    />
  );
};
