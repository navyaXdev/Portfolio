import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Completely disable on touch devices, screens without hover capability, or reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const noHover = !window.matchMedia('(hover: hover)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || noHover || prefersReducedMotion) {
      return;
    }

    // Add root class to hide the native Windows/browser cursor on desktop
    document.documentElement.classList.add('has-custom-cursor');

    const container = containerRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!container || !dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let isHovering = false;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        container.style.opacity = '1';
      }

      // Zero-lag dot positioning: direct GPU translate
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    const render = () => {
      // Natural, high-end fluid lerp easing for trailing ring
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const handleMouseDown = () => {
      ring.classList.add('cursor-clicking');
    };

    const handleMouseUp = () => {
      ring.classList.remove('cursor-clicking');
    };

    const handleMouseLeave = () => {
      isVisible = false;
      container.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      isVisible = true;
      container.style.opacity = '1';
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], input, textarea, select, .interactive-hover, [data-cursor-hover]');
      if (interactive) {
        if (!isHovering) {
          isHovering = true;
          ring.classList.add('cursor-hovering');
          dot.classList.add('dot-hovering');
        }
      } else {
        if (isHovering) {
          isHovering = false;
          ring.classList.remove('cursor-hovering');
          dot.classList.remove('dot-hovering');
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] opacity-0 transition-opacity duration-300 will-change-[opacity]"
      style={{ pointerEvents: 'none' }}
    >
      {/* Precision Center Dot — 100% zero-latency tracking */}
      <div
        ref={dotRef}
        className="cursor-dot-inner fixed top-0 left-0 -ml-[3px] -mt-[3px] w-[6px] h-[6px] rounded-full bg-emerald-glow pointer-events-none shadow-[0_0_8px_#00F5A0] will-change-transform transition-[background-color] duration-150 ease-out"
        style={{ pointerEvents: 'none' }}
      />

      {/* Trailing Luxury Ring — smooth rAF fluid lerp */}
      <div
        ref={ringRef}
        className="luxury-cursor-ring fixed top-0 left-0 -ml-[15px] -mt-[15px] w-[30px] h-[30px] rounded-full border border-emerald-glow/40 pointer-events-none will-change-transform transition-[width,height,margin,border-color,background-color] duration-200 ease-out"
        style={{ pointerEvents: 'none' }}
      />
    </div>
  );
};
