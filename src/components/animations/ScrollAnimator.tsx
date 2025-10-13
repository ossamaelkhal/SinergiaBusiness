'use client';

import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ScrollAnimatorProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Atraso em milissegundos
  duration?: number; // Duração em milissegundos
}

const ScrollAnimator: React.FC<ScrollAnimatorProps> = ({ 
  children, 
  className, 
  delay = 150, 
  duration = 500 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Desconecta o observer após a animação para otimização
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // A animação começa quando 10% do elemento está visível
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    // Cleanup
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const style = {
    '--delay': `${delay}ms`,
    '--duration': `${duration}ms`,
  } as React.CSSProperties;

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all transform-gpu',
        isVisible
          ? 'opacity-100 translate-y-0 animate-in fade-in slide-in-from-bottom-10 duration-500 ease-out'
          : 'opacity-0 translate-y-10',
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};

export default ScrollAnimator;
