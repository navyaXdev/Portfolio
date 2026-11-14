import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail, ChevronDown, MapPin, Code2, ShieldCheck } from 'lucide-react';
import { Button } from '../UI/Button';
import { Badge } from '../UI/Badge';
import { profileData } from '../../data/profile';
import dineshPortrait from '../../assets/dinesh-patra.jpg';
import { EASINGS, DURATIONS } from '../../utils/motion';
import { useTheme } from '../../context/ThemeContext';

export const Hero: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  // =========================================================================
  // SUBTLE 3D MOUSE-HOVER TILT & DYNAMIC GLARE SPECULAR INTERACTION
  // Strictly isolated to Dinesh's Desktop Portrait Card (Zero effect on network)
  // =========================================================================
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isHovered = useMotionValue(0);

  // Buttery-smooth spring physics: rapid response with natural damping, 0 jitter
  const springConfig = { stiffness: 140, damping: 20, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6.5, -6.5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6.5, 6.5]), springConfig);
  const glareOpacity = useSpring(isHovered, { stiffness: 180, damping: 22 });

  // Dynamic specular lighting reflection that follows pointer
  const glareBackground = useTransform([mouseX, mouseY], ([mx, my]) => {
    const x = ((mx as number) + 0.5) * 100;
    const y = ((my as number) + 0.5) * 100;
    return isLight
      ? `radial-gradient(circle 340px at ${x}% ${y}%, rgba(255, 255, 255, 0.65) 0%, rgba(0, 143, 104, 0.14) 40%, transparent 75%)`
      : `radial-gradient(circle 340px at ${x}% ${y}%, rgba(0, 245, 160, 0.16) 0%, rgba(6, 182, 212, 0.08) 35%, transparent 75%)`;
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable on touch devices or reduced-motion preference
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    isHovered.set(1);
  };

  const handleMouseLeave = () => {
    // Smoothly returns to natural equilibrium
    mouseX.set(0);
    mouseY.set(0);
    isHovered.set(0);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth'
      });
    }
  };

  // Cinematic Staggered Sequences
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATIONS.entrance, ease: EASINGS.luxuryDecel },
    },
  };

  const titleWords = ['Cybersecurity', 'Enthusiast', '•', 'Developer', '•', 'Technology', 'Explorer'];
  const bioWords = profileData.bio.split(' ');

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden scroll-mt-24">
      {/* Soft ambient lighting spot */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/[0.035] blur-[140px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Personal Introduction & Positioning (7 cols) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Status & Availability Badge */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2.5 mb-4 sm:mb-5">
              <Badge variant="emerald" pulseDot size="sm">
                OPEN TO WORK &amp; INTERNSHIPS
              </Badge>
              <span className="font-mono text-xs text-cyber-muted inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-glow/70 shrink-0" />
                <span>India · Remote Friendly</span>
              </span>
            </motion.div>

            {/* Name Heading with Word-by-Word Masked Cinematic Reveal */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.08] mb-3 sm:mb-4 flex flex-wrap items-center gap-x-3.5"
            >
              <span className="inline-block overflow-hidden py-0.5">
                <motion.span
                  initial={{ y: '115%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: DURATIONS.cinematic, ease: EASINGS.luxuryDecel }}
                  className="inline-block"
                >
                  DINESH
                </motion.span>
              </span>
              <span className="inline-block overflow-hidden py-0.5">
                <motion.span
                  initial={{ y: '115%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: DURATIONS.cinematic, delay: 0.1, ease: EASINGS.luxuryDecel }}
                  className="gradient-emerald inline-block"
                >
                  PATRA
                </motion.span>
              </span>
            </motion.h1>

            {/* Expanding Hairline Luminous Accent Line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: DURATIONS.cinematic, delay: 0.25, ease: EASINGS.luxuryDecel }}
              style={{ originX: 0 }}
              className="h-[2px] w-28 bg-gradient-to-r from-emerald-glow via-cyan-400 to-transparent rounded-full shadow-[0_0_12px_rgba(0,245,160,0.5)] mb-4"
            />

            {/* Staggered Professional Positioning Words */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2 text-xs sm:text-sm md:text-base font-mono text-emerald-glow tracking-wider mb-4 sm:mb-5">
              {titleWords.map((word, idx) => (
                <span key={idx} className={word === '•' ? 'text-white/20' : ''}>
                  {word}
                </span>
              ))}
            </motion.div>

            {/* Mobile Portrait Card (Visible on mobile screens < lg, hidden on desktop lg+) */}
            <motion.div
              variants={itemVariants}
              className="block lg:hidden w-full max-w-[270px] sm:max-w-[300px] mx-auto my-5"
            >
              <div className="relative rounded-2xl overflow-hidden bg-void-900 border border-white/10 ring-1 ring-emerald-glow/20 shadow-[0_12px_36px_-10px_rgba(0,0,0,0.85)]">
                <div className="relative aspect-square w-full overflow-hidden bg-void-950">
                  <img
                    src={dineshPortrait}
                    alt="Dinesh Patra — Professional Portrait"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-void-950/80 to-transparent pointer-events-none" />
                </div>
                <div className="p-3.5 bg-void-900/95 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-display font-bold text-white">Dinesh Patra</div>
                    <div className="text-[11px] font-mono text-emerald-glow mt-0.5">B.Sc. First-Year Student</div>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-cyber-silver bg-void-950 px-2.5 py-1 rounded-full border border-white/10 shadow-sm">
                    <ShieldCheck className="w-3 h-3 text-emerald-glow" />
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main Credibility Statement with Word-by-Word Progressive Reveal */}
            <motion.div variants={itemVariants} className="text-base sm:text-xl lg:text-2xl text-cyber-silver font-display font-medium leading-relaxed max-w-2xl mb-4 sm:mb-5">
              <span>"</span>
              {bioWords.map((word, wIdx) => (
                <span key={wIdx} className="inline-block mr-1.5 overflow-hidden py-0.5">
                  <motion.span
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: DURATIONS.standard,
                      delay: 0.25 + wIdx * 0.02,
                      ease: EASINGS.luxuryDecel,
                    }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
              <span>"</span>
            </motion.div>

            {/* Academic Credential Pill */}
            <motion.p variants={itemVariants} className="text-xs sm:text-sm text-cyber-muted font-body leading-relaxed max-w-xl mb-6 sm:mb-8">
              First-year B.Sc. student grounding computer science theory in practical systems engineering, Linux environments, and hands-on web application security.
            </motion.p>

            {/* Three High-Impact CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8 w-full sm:w-auto">
              <Button
                variant="primary"
                size="md"
                onClick={() => scrollTo('skills')}
                icon={<Code2 className="w-4 h-4" />}
                className="w-full sm:w-auto min-h-[48px]"
              >
                Explore Skills
              </Button>

              <Button
                variant="outline"
                size="md"
                onClick={() => scrollTo('contact')}
                icon={<Mail className="w-4 h-4" />}
                className="w-full sm:w-auto min-h-[48px]"
              >
                Contact Me
              </Button>

              <Button
                variant="glass"
                size="md"
                asLink
                href={profileData.contact.github}
                target="_blank"
                icon={<Github className="w-4 h-4" />}
                className="w-full sm:w-auto min-h-[48px]"
              >
                GitHub Profile
              </Button>
            </motion.div>

            {/* Verified Direct Links with Staggered Entrance */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 sm:gap-6 pt-5 border-t border-white/5 w-full">
              <span className="font-mono text-xs text-cyber-muted uppercase tracking-wider hidden sm:inline">
                Direct Profiles:
              </span>
              <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                <a
                  href={profileData.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-mono text-xs text-cyber-silver hover:text-emerald-glow transition-colors group py-1"
                >
                  <Github className="w-4 h-4 text-cyber-muted group-hover:text-emerald-glow" />
                  <span>github.com/navyaXdev</span>
                  <ArrowUpRight className="w-3 h-3 text-white/30 group-hover:text-emerald-glow opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <a
                  href={profileData.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-mono text-xs text-cyber-silver hover:text-emerald-glow transition-colors group py-1"
                >
                  <Linkedin className="w-4 h-4 text-cyber-muted group-hover:text-emerald-glow" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-white/30 group-hover:text-emerald-glow opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <a
                  href={`mailto:${profileData.contact.email}`}
                  className="flex items-center gap-1.5 font-mono text-xs text-cyber-silver hover:text-emerald-glow transition-colors group py-1"
                >
                  <Mail className="w-4 h-4 text-cyber-muted group-hover:text-emerald-glow" />
                  <span>Email</span>
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Prominent Luxury Portrait with Subtle 3D Tilt Parallax (Desktop lg+) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: DURATIONS.cinematic, delay: 0.2, ease: EASINGS.luxuryDecel }}
            className="hidden lg:flex lg:col-span-5 w-full justify-end [perspective:1200px]"
          >
            <motion.div
              id="hero-portrait-card"
              data-hero-tilt-card="true"
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative group max-w-sm sm:max-w-md w-full cursor-default select-none"
            >
              {/* Subtle ambient lighting aura behind portrait */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-emerald-glow/20 via-transparent to-cyan-500/15 rounded-3xl blur-2xl opacity-40 group-hover:opacity-75 transition-opacity duration-700 pointer-events-none" />

              {/* Main Portrait Card Container with Cinematic Mask Reveal */}
              <motion.div
                initial={{ clipPath: 'inset(10% 0% 0% 0%)', opacity: 0 }}
                animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
                transition={{ duration: DURATIONS.long, delay: 0.25, ease: EASINGS.luxuryDecel }}
                className="relative rounded-3xl overflow-hidden bg-void-900 border border-white/10 ring-1 ring-emerald-glow/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.85)] transition-all duration-500 group-hover:border-emerald-glow/40 group-hover:shadow-[0_25px_70px_-10px_rgba(0,0,0,0.95),0_0_30px_rgba(0,245,160,0.12)]"
              >
                {/* Dynamic Specular Sheen / Pointer-Following Light Reflection */}
                <motion.div
                  style={{
                    opacity: glareOpacity,
                    background: glareBackground,
                  }}
                  className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300"
                />

                {/* Natural 1:1 aspect ratio container for authentic full-resolution rendering */}
                <div className="relative aspect-square w-full overflow-hidden bg-void-950">
                  <img
                    src={dineshPortrait}
                    alt="Dinesh Patra — Professional Portrait"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
                    loading="eager"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-void-950/80 to-transparent pointer-events-none z-10" />
                </div>

                {/* Bottom Card Identity Strip */}
                <div className="p-5 bg-void-900/95 backdrop-blur-md border-t border-white/5 flex items-center justify-between relative z-10">
                  <div>
                    <div className="text-base font-display font-bold text-white tracking-wide">
                      Dinesh Patra
                    </div>
                    <div className="text-xs font-mono text-emerald-glow/90 mt-0.5">
                      B.Sc. First-Year Student
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-cyber-silver bg-void-950 px-3 py-1.5 rounded-full border border-white/10 shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-glow" />
                    <span>Verified Identity</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Prompt */}
        <div className="hidden lg:flex justify-center mt-12">
          <button
            onClick={() => scrollTo('about')}
            className="flex flex-col items-center gap-1 text-cyber-muted hover:text-emerald-glow transition-colors font-mono text-xs tracking-widest uppercase opacity-70 hover:opacity-100"
            aria-label="Scroll to About section"
          >
            <span>Explore Overview</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-emerald-glow" />
          </button>
        </div>
      </div>
    </section>
  );
};
