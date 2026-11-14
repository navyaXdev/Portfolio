import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

export const AmbientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes: fewer, calmer, extremely subtle
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }

    let particles: Particle[] = [];
    const count = Math.min(Math.floor((width * height) / 50000), 24);

    function initParticles() {
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          radius: Math.random() * 1.2 + 0.6,
          alpha: Math.random() * 0.2 + 0.08,
        });
      }
    }

    initParticles();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particles and faint geometric connection lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0) p1.x = width;
        else if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        else if (p1.y > height) p1.y = 0;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = isLight
          ? `rgba(5, 150, 105, ${p1.alpha * 0.6})`
          : `rgba(0, 245, 160, ${p1.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isLight
              ? `rgba(5, 150, 105, ${(1 - dist / 100) * 0.04})`
              : `rgba(0, 245, 160, ${(1 - dist / 100) * 0.035})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isLight]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-void-950 transition-colors duration-300">
      {/* Calm, luxurious ambient lighting spots */}
      <div className={`absolute -top-32 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] transition-all duration-700 ${
        isLight ? 'bg-emerald-500/[0.03]' : 'bg-emerald-500/[0.035]'
      }`} />
      <div className={`absolute top-1/2 -left-48 w-[450px] h-[450px] rounded-full blur-[160px] transition-all duration-700 ${
        isLight ? 'bg-cyan-500/[0.02]' : 'bg-cyan-500/[0.025]'
      }`} />

      {/* Subtle particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50" />

      {/* High-end subtle architectural grid */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none transition-opacity duration-300"
        style={{
          backgroundImage: `linear-gradient(to right, ${isLight ? '#000000' : '#ffffff'} 1px, transparent 1px), linear-gradient(to bottom, ${isLight ? '#000000' : '#ffffff'} 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />
    </div>
  );
};
