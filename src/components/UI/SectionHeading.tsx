import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  index: string;
  tag: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  index,
  tag,
  title,
  subtitle,
  align = 'left'
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-3xl'}`}
    >
      <div className={`flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-emerald-glow mb-3 ${align === 'center' ? 'justify-center' : ''}`}>
        <span className="text-white/40">{index}</span>
        <span className="text-emerald-glow/60">//</span>
        <span>{tag}</span>
      </div>

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white leading-[1.15]">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-cyber-muted font-body leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
