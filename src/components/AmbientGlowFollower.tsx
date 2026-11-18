import React, { useEffect, useRef } from 'react';

/**
 * AmbientGlowFollower
 * High-performance pointer illumination for desktop displays with fine pointer.
 * Completely disables itself on mobile/touch screens (zero CPU/memory footprint).
 * Uses direct transform styling on a ref without triggering React component re-renders.
 */
export const AmbientGlowFollower: React.FC = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Completely disable on mobile, touch, or reduced motion devices
    const isTouchOrMobile = window.innerWidth < 1024 || !window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouchOrMobile || prefersReducedMotion) return;

    const el = glowRef.current;
    if (!el) return;

    let rafId: number;
    let targetX = -500;
    let targetY = -500;
    let currentX = -500;
    let currentY = -500;
    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        el.style.opacity = '1';
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      el.style.opacity = '0';
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      el.style.transform = `translate3d(${currentX - 260}px, ${currentY - 260}px, 0)`;
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
  }, []);

  // Hidden on touch/mobile via CSS as well as JS
  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="fixed pointer-events-none z-30 hidden lg:block opacity-0 transition-opacity duration-300 ease-out will-change-transform"
      style={{
        width: '520px',
        height: '520px',
        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, rgba(139, 92, 246, 0.03) 40%, rgba(0, 0, 0, 0) 70%)',
        filter: 'blur(35px)',
      }}
    />
  );
};
