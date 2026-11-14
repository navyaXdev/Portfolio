import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

export const AmbientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

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

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
      phase: number;
    }

    let particles: Particle[] = [];
    const count = Math.min(Math.floor((width * height) / 45000), 28);

    function initParticles() {
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.14,
          vy: (Math.random() - 0.5) * 0.14,
          radius: Math.random() * 1.4 + 0.6,
          baseAlpha: Math.random() * 0.22 + 0.1,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    initParticles();

    let time = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.01;

      // Draw floating stardust particles & delicate connection filaments
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Smooth atmospheric floating motion
        p1.x += p1.vx + Math.sin(time + p1.phase) * 0.08;
        p1.y += p1.vy + Math.cos(time + p1.phase) * 0.08;

        if (p1.x < 0) p1.x = width;
        else if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        else if (p1.y > height) p1.y = 0;

        const dynamicAlpha = p1.baseAlpha * (0.8 + 0.2 * Math.sin(time * 1.5 + p1.phase));

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = isLight
          ? `rgba(0, 143, 104, ${dynamicAlpha * 0.85})`
          : `rgba(0, 245, 160, ${dynamicAlpha})`;
        ctx.fill();

        // Connect nearby points with delicate hairline filaments
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - dist / 110) * (isLight ? 0.08 : 0.04);
            ctx.strokeStyle = isLight
              ? `rgba(0, 143, 104, ${lineAlpha})`
              : `rgba(0, 245, 160, ${lineAlpha})`;
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
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-500 select-none">
      {/* 1. Atmospheric Ambient Lighting Spots (Slow breathing radial illumination) */}
      <div
        className={`absolute -top-40 right-1/4 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full blur-[110px] sm:blur-[160px] transition-all duration-1000 pointer-events-none ${
          isLight ? 'bg-emerald-500/[0.035]' : 'bg-emerald-500/[0.04]'
        }`}
      />
      <div
        className={`absolute top-1/3 -left-48 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] rounded-full blur-[100px] sm:blur-[150px] transition-all duration-1000 pointer-events-none ${
          isLight ? 'bg-cyan-500/[0.025]' : 'bg-cyan-500/[0.03]'
        }`}
      />
      <div
        className={`absolute -bottom-40 right-1/3 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full blur-[110px] sm:blur-[160px] transition-all duration-1000 pointer-events-none ${
          isLight ? 'bg-emerald-500/[0.025]' : 'bg-emerald-500/[0.03]'
        }`}
      />

      {/* 2. Floating Stardust Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60 pointer-events-none" />

      {/* 3. High-End Architectural Grid with Delicate Geometry */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none transition-opacity duration-500"
        style={{
          backgroundImage: `linear-gradient(to right, ${isLight ? '#000000' : '#ffffff'} 1px, transparent 1px), linear-gradient(to bottom, ${isLight ? '#000000' : '#ffffff'} 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  );
};
