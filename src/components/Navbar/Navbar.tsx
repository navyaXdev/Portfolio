import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { profileData } from '../../data/profile';
import { ThemeToggle } from './ThemeToggle';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'github', label: 'GitHub' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useScrollSpy(NAV_ITEMS.map(item => item.id), 120);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open & listen for Escape
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 ${
        isMobileMenuOpen ? 'z-50' : 'z-40'
      } transition-all duration-300 ${
        isScrolled
          ? 'bg-void-950/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-lg shadow-black/50'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2.5 group text-left focus:outline-none focus:ring-1 focus:ring-emerald-glow rounded-md px-1 shrink-0"
          aria-label="Dinesh Patra - Home"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyber-cyan/15 border border-emerald-glow/40 flex items-center justify-center text-emerald-glow font-display font-extrabold text-xs tracking-wider group-hover:border-emerald-glow group-hover:shadow-glow-sm transition-all">
            DP
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xs sm:text-sm font-bold tracking-wider text-white group-hover:text-emerald-glow transition-colors">
              DINESH PATRA
            </span>
            <span className="font-mono text-[10px] text-cyber-muted -mt-0.5 tracking-wide">
              Technology Explorer
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-void-900/60 border border-white/5 rounded-full px-2 xl:px-3 py-1 backdrop-blur-md">
          {NAV_ITEMS.map(item => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative px-2.5 xl:px-3.5 py-1 xl:py-1.5 rounded-full font-mono text-[11px] xl:text-xs tracking-wider uppercase transition-all duration-200 select-none ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-cyber-muted hover:text-cyber-silver hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 rounded-full bg-emerald-glow/15 border border-emerald-glow/40 shadow-glow-sm -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Desktop Right Actions: Theme Toggle, GitHub & Status Pill */}
        <div className="hidden lg:flex items-center gap-2.5 xl:gap-3 shrink-0">
          <div className="hidden xl:flex items-center gap-2 text-[11px] font-mono text-cyber-silver bg-void-900/80 border border-white/10 px-3 py-1.5 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-glow opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-glow" />
            </span>
            <span className="text-white/90">Available for Work</span>
          </div>

          <ThemeToggle />

          <a
            href={profileData.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Profile"
            className="p-2 rounded-lg bg-void-900 border border-white/10 text-cyber-silver hover:text-emerald-glow hover:border-emerald-glow/40 transition-all"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Actions: Theme Toggle & Hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 min-w-[44px] min-h-[44px] rounded-xl bg-void-900 border border-white/10 text-white hover:text-emerald-glow focus:outline-none focus:ring-2 focus:ring-emerald-glow/40 flex items-center justify-center transition-colors select-none"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation-menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-emerald-glow" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer with Smooth Animation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            id="mobile-navigation-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden fixed inset-x-0 top-[58px] sm:top-[68px] bottom-0 bg-void-950/98 backdrop-blur-2xl border-t border-white/10 z-50 flex flex-col justify-between p-5 sm:p-6 overflow-y-auto"
            onClick={e => {
              if (e.target === e.currentTarget) setIsMobileMenuOpen(false);
            }}
          >
            <div className="space-y-1.5 pt-2">
              <div className="text-[11px] font-mono text-cyber-muted uppercase tracking-widest px-3 mb-2 flex items-center justify-between">
                <span>// Navigation Index</span>
                <span className="text-[10px] text-emerald-glow/80 font-mono">DINESH PATRA</span>
              </div>
              {NAV_ITEMS.map(item => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-mono text-xs sm:text-sm uppercase tracking-wider text-left transition-all min-h-[46px] select-none ${
                      isActive
                        ? 'bg-emerald-glow/15 text-emerald-glow border border-emerald-glow/30 font-bold shadow-glow-sm'
                        : 'text-cyber-silver hover:bg-white/5 hover:text-white border border-transparent'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive ? (
                      <span className="text-[11px] font-bold text-emerald-glow flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-glow" />
                        ACTIVE
                      </span>
                    ) : (
                      <span className="text-white/20 text-xs font-mono">→</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mobile Footer Drawer details */}
            <div className="pt-5 border-t border-white/10 space-y-3.5">
              <div className="flex items-center gap-2.5 text-xs font-mono text-cyber-silver bg-void-900 border border-white/10 px-3.5 py-2.5 rounded-xl">
                <span className="w-2 h-2 rounded-full bg-emerald-glow shrink-0 shadow-glow-sm animate-pulse" />
                <span className="truncate">{profileData.status.message}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1">
                <a
                  href={profileData.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-void-900 border border-white/10 font-mono text-xs text-cyber-silver hover:text-emerald-glow hover:border-emerald-glow/30 transition-all min-h-[44px]"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={profileData.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-void-900 border border-white/10 font-mono text-xs text-cyber-silver hover:text-emerald-glow hover:border-emerald-glow/30 transition-all min-h-[44px]"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={`mailto:${profileData.contact.email}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-void-900 border border-white/10 font-mono text-xs text-cyber-silver hover:text-emerald-glow hover:border-emerald-glow/30 transition-all min-h-[44px]"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
