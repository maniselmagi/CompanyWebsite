import React, { useRef, useState, useEffect } from 'react';

interface Hero3DTextProps {
  className?: string;
}

export const Hero3DText: React.FC<Hero3DTextProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [styleVars, setStyleVars] = useState<React.CSSProperties>({
    '--rx': '0deg',
    '--ry': '0deg',
    '--tz': '15px'
  } as React.CSSProperties);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let targetRx = 0;
    let targetRy = 0;
    let currentRx = 0;
    let currentRy = 0;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      // Relative to center of text container
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      const nx = Math.max(-1, Math.min(1, x / (rect.width / 2)));
      const ny = Math.max(-1, Math.min(1, y / (rect.height / 2)));

      // Subtle, refined 3D tilt angles
      targetRy = nx * 14;  // -14deg to +14deg
      targetRx = -ny * 10; // -10deg to +10deg
    };

    const handleMouseLeave = () => {
      targetRx = 0;
      targetRy = 0;
      setIsHovered(false);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      currentRx = lerp(currentRx, targetRx, 0.08);
      currentRy = lerp(currentRy, targetRy, 0.08);

      setStyleVars({
        '--rx': `${currentRx.toFixed(2)}deg`,
        '--ry': `${currentRy.toFixed(2)}deg`,
        '--tz': isHovered ? '28px' : '15px'
      } as React.CSSProperties);

      animId = requestAnimationFrame(tick);
    };

    // Attach listener to window with boundary check or container
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);
    animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (el) {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animId);
    };
  }, [isHovered]);

  return (
    <div 
      ref={containerRef}
      style={styleVars}
      className={`hero-3d-text-container select-none cursor-default perspective-[1200px] ${className}`}
    >
      <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[58px] font-black tracking-tight leading-[1.08] transition-transform duration-200">
        <span className="text-3d-chrome block">
          Commercial <span className="whitespace-nowrap">Self-Order</span> Kiosks
        </span>
        <span className="text-3d-hologram block mt-2 sm:mt-3">
          &amp; <span className="whitespace-nowrap">Next-Gen</span> Software Engineering.
        </span>
      </h1>
    </div>
  );
};
