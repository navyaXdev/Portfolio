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
  align = 'left',
}) => {
  const words = title.split(' ');

  return (
    <div
      className={`mb-12 md:mb-16 ${
        align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-3xl'
      }`}
    >
      {/* 1. Animated Index & Tag with Shimmer Badge */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`flex items-center gap-2.5 font-mono text-xs tracking-widest uppercase text-emerald-glow mb-3 ${
          align === 'center' ? 'justify-center' : ''
        }`}
      >
        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/50 text-[10px] font-bold">
          {index}
        </span>
        <span className="text-emerald-glow/50">//</span>
        <span className="text-cyber-silver font-semibold tracking-wider">{tag}</span>
      </motion.div>

      {/* 2. Word-by-Word Masked Cinematic Title Reveal */}
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white leading-[1.15] flex flex-wrap gap-x-2.5 gap-y-1 ${
          align === 'center' ? 'justify-center' : ''
        }`}
      >
        {words.map((word, idx) => (
          <span key={idx} className="inline-block overflow-hidden py-0.5">
            <motion.span
              initial={{ y: '110%', opacity: 0, rotateZ: 2 }}
              whileInView={{ y: '0%', opacity: 1, rotateZ: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.7,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h2>

      {/* 3. Refined Decorative Animated Luminous Line */}
      <div className={`mt-4 mb-4 flex items-center ${align === 'center' ? 'justify-center' : ''}`}>
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: align === 'center' ? 0.5 : 0 }}
          className="h-[2px] w-24 bg-gradient-to-r from-emerald-glow via-cyan-400 to-transparent rounded-full shadow-[0_0_12px_rgba(0,245,160,0.4)]"
        />
      </div>

      {/* 4. Smooth Staggered Subtitle Entrance */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg text-cyber-muted font-body leading-relaxed max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
