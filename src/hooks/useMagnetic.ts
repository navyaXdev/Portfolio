import { useRef, useEffect } from 'react';

export function useMagnetic<T extends HTMLElement>(strength: number = 0.25) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip on touch devices or reduced motion
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      el.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
      el.style.transition = 'transform 0.15s ease-out';
    };

    const handleMouseLeave = () => {
      el.style.transform = 'translate3d(0, 0, 0)';
      el.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return ref;
}
