import React from 'react';
import { cn } from '../../utils/cn';
import { useMagnetic } from '../../hooks/useMagnetic';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  asLink?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  magnetic?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  asLink = false,
  href,
  target,
  rel,
  magnetic = true,
  icon,
  iconPosition = 'right',
  className,
  ...props
}) => {
  const magneticRef = useMagnetic<HTMLButtonElement>(0.2);
  const magneticLinkRef = useMagnetic<HTMLAnchorElement>(0.2);

  const baseStyles = 'relative inline-flex items-center justify-center font-mono font-medium tracking-wider uppercase transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-glow/40 active:scale-[0.98] select-none';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2.5 gap-1.5 min-h-[44px]',
    md: 'text-xs sm:text-sm px-5 py-3 gap-2 min-h-[46px]',
    lg: 'text-sm sm:text-base px-7 py-3.5 gap-2.5 min-h-[50px]'
  };

  const variantStyles = {
    primary: 'bg-emerald-glow text-void-950 font-semibold shadow-glow-sm hover:shadow-glow-md hover:bg-emerald-dim',
    outline: 'bg-transparent text-emerald-glow border border-emerald-glow/30 hover:border-emerald-glow hover:bg-emerald-glow/10 hover:text-white',
    ghost: 'bg-transparent text-cyber-muted hover:text-white hover:bg-white/5',
    glass: 'bg-white/5 backdrop-blur-md text-white border border-white/10 hover:border-emerald-glow/40 hover:bg-white/10'
  };

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (asLink && href) {
    return (
      <a
        ref={magnetic ? magneticLinkRef : undefined}
        href={href}
        target={target}
        rel={target === '_blank' ? (rel || 'noopener noreferrer') : rel}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={magnetic ? magneticRef : undefined}
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {content}
    </button>
  );
};
