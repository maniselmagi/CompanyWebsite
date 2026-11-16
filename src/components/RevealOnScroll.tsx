import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  variant?: 'fade-up' | 'fade-down' | 'fade-in' | 'scale-up' | 'slide-right' | 'slide-left';
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

export const RevealOnScroll: React.FC<RevealProps> = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 700,
  className = '',
  threshold = 0.12
}) => {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) return;

    const currentElement = elementRef.current;
    if (!currentElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(currentElement);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    observer.observe(currentElement);

    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, [isVisible, threshold]);

  const getVariantStyles = () => {
    if (isVisible) {
      return 'opacity-100 translate-y-0 translate-x-0 scale-100';
    }

    switch (variant) {
      case 'fade-up':
        return 'opacity-0 translate-y-7';
      case 'fade-down':
        return 'opacity-0 -translate-y-7';
      case 'scale-up':
        return 'opacity-0 scale-95 translate-y-3';
      case 'slide-right':
        return 'opacity-0 -translate-x-7';
      case 'slide-left':
        return 'opacity-0 translate-x-7';
      case 'fade-in':
      default:
        return 'opacity-0';
    }
  };

  return (
    <div
      ref={elementRef}
      className={`transition-all ${getVariantStyles()} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {children}
    </div>
  );
};
