import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, CheckCircle2, Compass } from 'lucide-react';
import { SectionHeading } from '../UI/SectionHeading';
import { profileData } from '../../data/profile';

export const About: React.FC = () => {
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
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const checkpoints = [
    'Linux Internals & Daily Terminal Driver',
    'Low-Level Memory & Logic in C',
    'Python Scripting & Automation Tooling',
    'Network Fundamentals & Socket Diagnostics',
    'Web Architecture & Frontend Standards (HTML/CSS/JS)',
    'Version Control & Source Code on GitHub'
  ];

  return (
    <section id="about" className="py-24 relative border-t border-white/5 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="01"
          tag="ABOUT ME"
          title="Curiosity at the System Level."
          subtitle="Understanding systems from the inside out — from low-level memory logic to full-stack applications and real-world attack vectors."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Story & Academic Context (7 cols) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-7 space-y-6 text-cyber-silver/90 text-base sm:text-lg leading-relaxed font-body"
          >
            <motion.p variants={itemVariants}>
              I am <strong className="text-white font-semibold">Dinesh Patra</strong>, a first-year undergraduate student pursuing a B.Sc. with a genuine enthusiasm for software engineering, Linux systems, and cybersecurity. Rather than viewing technology merely from high-level abstractions, I enjoy turning ideas into functional software and understanding how systems behave from the inside out.
            </motion.p>

            <motion.p variants={itemVariants}>
              I began with <strong className="text-white">Python</strong> and <strong className="text-white">C</strong> for foundational programming logic, memory concepts, and algorithmic thinking. I picked up web fundamentals (<strong className="text-white">HTML, CSS, JavaScript</strong>) to understand how web pages render and interact with client-side state, and I spend significant time working directly in the terminal—mastering Bash scripting, Linux filesystem permissions, and network diagnostics.
            </motion.p>

            <motion.p variants={itemVariants}>
              My end game is <strong className="text-emerald-glow">Professional Web Penetration Testing</strong>. Every programming language, networking concept, and security tool I study right now is part of building a solid technical foundation toward that goal.
            </motion.p>

            {/* Academic Credential Card with Subtle Bevel */}
            <motion.div
              variants={itemVariants}
              className="mt-8 p-6 sm:p-7 rounded-2xl glass-card border-l-4 border-l-emerald-glow border border-white/5 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-glow/10 text-emerald-glow shrink-0 border border-emerald-glow/20">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono text-emerald-glow uppercase tracking-wider mb-1 font-semibold">
                    Academic Background
                  </div>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-white">
                    {profileData.education.degree}
                  </h3>
                  <p className="text-sm text-cyber-muted mt-1">
                    {profileData.education.focus} · {profileData.education.status}
                  </p>
                  <p className="text-xs text-cyber-silver/70 font-mono mt-3">
                    // Grounding academic CS theory with intense practical laboratory experimentation
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Technical Focus Checkpoints */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              {checkpoints.map((focus, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-cyber-silver">
                  <CheckCircle2 className="w-4 h-4 text-emerald-glow shrink-0" />
                  <span>{focus}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Verified Stats & Pillars (5 cols) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Verified Statistics Grid with Staggered Cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {profileData.stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-4 sm:p-5 rounded-2xl glass-card border border-white/5 relative overflow-hidden group hover:border-emerald-glow/30 transition-all duration-300 shadow-sm hover:-translate-y-1"
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white group-hover:text-emerald-glow transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-[11px] sm:text-xs font-mono font-medium text-cyber-silver mt-1">
                    {stat.label}
                  </div>
                  <div className="text-[10px] font-mono text-cyber-muted mt-0.5 sm:mt-1">
                    {stat.detail}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Core Philosophy Pillars */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono uppercase tracking-widest text-cyber-muted px-1 flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-emerald-glow" />
                <span>// Engineering Pillars</span>
              </div>
              {profileData.pillars.map((pillar, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-5 rounded-2xl glass-card border border-white/5 hover:border-emerald-glow/20 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-2.5 font-display font-bold text-white text-base mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-glow" />
                    <h4>{pillar.title}</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-cyber-muted font-body leading-relaxed">
                    {pillar.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
