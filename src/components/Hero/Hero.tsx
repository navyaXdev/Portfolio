import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail, ChevronDown, MapPin, Compass, ShieldCheck } from 'lucide-react';
import { Button } from '../UI/Button';
import { Badge } from '../UI/Badge';
import { profileData } from '../../data/profile';
import dineshPortrait from '../../assets/dinesh-patra.jpg';

export const Hero: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Subtle interactive 3D parallax on portrait card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 120, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
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

  // Cinematic staggered text container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden scroll-mt-24">
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
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2.5 mb-6">
              <Badge variant="emerald" pulseDot size="sm">
                OPEN TO WORK &amp; INTERNSHIPS
              </Badge>
              <span className="font-mono text-xs text-cyber-muted hidden sm:inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-glow/70 shrink-0" />
                <span>India · Remote Friendly</span>
              </span>
            </motion.div>

            {/* Name Heading with Editorial Typography */}
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-6xl xl:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.05] mb-4">
              DINESH{' '}
              <span className="gradient-emerald inline-block">
                PATRA
              </span>
            </motion.h1>

            {/* Professional Positioning Roles */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2 text-sm sm:text-base font-mono text-emerald-glow tracking-wider mb-5">
              <span>Cybersecurity Enthusiast</span>
              <span className="text-white/20">|</span>
              <span>Developer</span>
              <span className="text-white/20">|</span>
              <span>Technology Explorer</span>
            </motion.div>

            {/* Main Credibility Statement */}
            <motion.p variants={itemVariants} className="text-lg sm:text-xl lg:text-2xl text-cyber-silver font-display font-medium leading-relaxed max-w-2xl mb-5">
              "{profileData.bio}"
            </motion.p>

            {/* Academic Credential Pill */}
            <motion.p variants={itemVariants} className="text-sm text-cyber-muted font-body leading-relaxed max-w-xl mb-8">
              First-year B.Sc. student grounding computer science theory in practical systems engineering, Linux environments, and hands-on web application security.
            </motion.p>

            {/* Three Distinct High-Impact CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3.5 mb-10 w-full sm:w-auto">
              <Button
                variant="primary"
                size="md"
                onClick={() => scrollTo('experience')}
                icon={<Compass className="w-4 h-4" />}
                className="w-full sm:w-auto min-h-[46px]"
              >
                Explore My Journey
              </Button>

              <Button
                variant="outline"
                size="md"
                onClick={() => scrollTo('contact')}
                icon={<Mail className="w-4 h-4" />}
                className="w-full sm:w-auto min-h-[46px]"
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
                className="w-full sm:w-auto min-h-[46px]"
              >
                GitHub Profile
              </Button>
            </motion.div>

            {/* Verified Direct Links */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/5 w-full">
              <span className="font-mono text-xs text-cyber-muted uppercase tracking-wider hidden sm:inline">
                Direct Profiles:
              </span>
              <div className="flex items-center gap-5">
                <a
                  href={profileData.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-mono text-xs text-cyber-silver hover:text-emerald-glow transition-colors group"
                >
                  <Github className="w-4 h-4 text-cyber-muted group-hover:text-emerald-glow" />
                  <span>github.com/navyaXdev</span>
                  <ArrowUpRight className="w-3 h-3 text-white/30 group-hover:text-emerald-glow opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <a
                  href={profileData.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-mono text-xs text-cyber-silver hover:text-emerald-glow transition-colors group"
                >
                  <Linkedin className="w-4 h-4 text-cyber-muted group-hover:text-emerald-glow" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-white/30 group-hover:text-emerald-glow opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <a
                  href={`mailto:${profileData.contact.email}`}
                  className="flex items-center gap-1.5 font-mono text-xs text-cyber-silver hover:text-emerald-glow transition-colors group"
                >
                  <Mail className="w-4 h-4 text-cyber-muted group-hover:text-emerald-glow" />
                  <span>Email</span>
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Large Luxury Portrait Framing with 3D Tilt (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 w-full flex justify-center lg:justify-end [perspective:1200px]"
          >
            <motion.div
              ref={cardRef}
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative group max-w-sm sm:max-w-md w-full cursor-default select-none"
            >
              {/* Subtle ambient lighting behind portrait */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-emerald-glow/20 via-transparent to-cyan-500/10 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none" />

              {/* Main Portrait Card Container */}
              <div className="relative rounded-3xl overflow-hidden bg-void-900 border border-white/10 ring-1 ring-emerald-glow/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.85)] transition-shadow duration-500 group-hover:shadow-[0_25px_70px_-10px_rgba(0,0,0,0.95)]">
                {/* Natural 1:1 aspect ratio container for full-resolution rendering */}
                <div className="relative aspect-square w-full overflow-hidden bg-void-950">
                  <img
                    src={dineshPortrait}
                    alt="Dinesh Patra — Professional Portrait"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
                    loading="eager"
                  />
                </div>

                {/* Bottom Card Identity Strip */}
                <div className="p-5 bg-void-900/90 backdrop-blur-md border-t border-white/5 flex items-center justify-between">
                  <div>
                    <div className="text-base font-display font-bold text-white">
                      Dinesh Patra
                    </div>
                    <div className="text-xs font-mono text-emerald-glow/90 mt-0.5">
                      B.Sc. First-Year Student
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-cyber-silver bg-void-950 px-3 py-1.5 rounded-full border border-white/5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-glow" />
                    <span>Verified</span>
                  </div>
                </div>
              </div>
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
