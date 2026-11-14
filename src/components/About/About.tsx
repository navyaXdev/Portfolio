import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../UI/SectionHeading';
import { profileData } from '../../data/profile';

export const About: React.FC = () => {
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-cyber-silver/90 text-base sm:text-lg leading-relaxed font-body"
          >
            <p>
              I am <strong className="text-white font-semibold">Dinesh Patra</strong>, a first-year undergraduate student pursuing a B.Sc. with a genuine enthusiasm for software engineering, Linux systems, and cybersecurity. Rather than viewing technology merely from high-level abstractions, I enjoy turning ideas into functional software and understanding how systems behave from the inside out.
            </p>

            <p>
              I began with <strong className="text-white">Python</strong> and <strong className="text-white">C</strong> for foundational programming logic, memory concepts, and algorithmic thinking. I picked up web fundamentals (<strong className="text-white">HTML, CSS, JavaScript</strong>) to understand how web pages render and interact with client-side state, and I spend significant time working directly in the terminal—mastering Bash scripting, Linux filesystem permissions, and network diagnostics.
            </p>

            <p>
              My end game is <strong className="text-emerald-glow">Professional Web Penetration Testing</strong>. Every programming language, networking concept, and security tool I study right now is part of building a solid technical foundation toward that goal.
            </p>

            {/* Education & Academic Card */}
            <div className="mt-8 p-6 rounded-xl glass-card border-l-4 border-l-emerald-glow">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-emerald-glow/10 text-emerald-glow shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono text-emerald-glow uppercase tracking-wider mb-1">
                    Academic Background
                  </div>
                  <h3 className="text-lg font-display font-bold text-white">
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
            </div>

            {/* Technical Focus Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              {[
                'Linux Internals & Daily Terminal Driver',
                'Low-Level Memory & Logic in C',
                'Python Scripting & Automation Tooling',
                'Network Fundamentals & Socket Diagnostics',
                'Web Architecture & Frontend Standards (HTML/CSS/JS)',
                'Version Control & Source Code on GitHub'
              ].map((focus, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm text-cyber-silver">
                  <CheckCircle2 className="w-4 h-4 text-emerald-glow shrink-0" />
                  <span>{focus}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Verified Stats & Pillars (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Verified Statistics Grid */}
            <div className="grid grid-cols-2 gap-4">
              {profileData.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl glass-card border border-white/5 relative overflow-hidden group hover:border-emerald-glow/30"
                >
                  <div className="text-3xl sm:text-4xl font-display font-black text-white group-hover:text-emerald-glow transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-xs font-mono font-medium text-cyber-silver mt-1.5">
                    {stat.label}
                  </div>
                  <div className="text-[10px] font-mono text-cyber-muted mt-1">
                    {stat.detail}
                  </div>
                </div>
              ))}
            </div>

            {/* Core Philosophy Pillars */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono uppercase tracking-widest text-cyber-muted px-1">
                // Engineering Pillars
              </div>
              {profileData.pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl glass-card border border-white/5 hover:border-emerald-glow/20 transition-all"
                >
                  <div className="flex items-center gap-2.5 font-display font-bold text-white text-base mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-glow" />
                    <h4>{pillar.title}</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-cyber-muted font-body leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
