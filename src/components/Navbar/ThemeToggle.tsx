import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`relative p-2 rounded-xl transition-all duration-300 group flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-emerald-glow/50 select-none ${
        isDark
          ? 'bg-void-900 border border-white/10 text-cyber-silver hover:text-emerald-glow hover:border-emerald-glow/40 shadow-sm'
          : 'bg-white border border-black/10 text-zinc-700 hover:text-emerald-600 hover:border-emerald-500/40 shadow-sm'
      } ${className}`}
      aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} luxury theme`}
      title={`Switch to ${isDark ? 'Light' : 'Dark'} theme`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center"
          >
            <Moon className="w-4 h-4 text-emerald-glow group-hover:drop-shadow-[0_0_8px_rgba(0,245,160,0.5)] transition-all" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center"
          >
            <Sun className="w-4 h-4 text-amber-500 group-hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.5)] transition-all" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen reader only hint */}
      <span className="sr-only">
        {isDark ? 'Activate Light Theme' : 'Activate Dark Theme'}
      </span>
    </button>
  );
};
