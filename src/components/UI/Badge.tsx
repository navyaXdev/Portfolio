import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'cyan' | 'amber' | 'crimson' | 'muted';
  size?: 'sm' | 'md';
  pulseDot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'emerald',
  size = 'md',
  pulseDot = false,
  className
}) => {
  const variantStyles = {
    emerald: 'bg-emerald-glow/10 text-emerald-glow border-emerald-glow/20',
    cyan: 'bg-cyber-cyan/10 text-cyber-cyan border-cyber-cyan/25',
    amber: 'bg-cyber-amber/10 text-cyber-amber border-cyber-amber/25',
    crimson: 'bg-cyber-crimson/10 text-cyber-crimson border-cyber-crimson/25',
    muted: 'bg-white/5 text-cyber-silver border-white/10'
  };

  const dotColors = {
    emerald: 'bg-emerald-glow',
    cyan: 'bg-cyber-cyan',
    amber: 'bg-cyber-amber',
    crimson: 'bg-cyber-crimson',
    muted: 'bg-cyber-silver'
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5',
    md: 'text-xs px-3 py-1'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-mono tracking-wider uppercase rounded-full border transition-colors',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {pulseDot && (
        <span className="relative flex h-2 w-2">
          <span className={cn('animate-ping absolute inline-flex h-full w-full rounded-full opacity-75', dotColors[variant])} />
          <span className={cn('relative inline-flex rounded-full h-2 w-2', dotColors[variant])} />
        </span>
      )}
      {children}
    </span>
  );
};
