import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Target } from 'lucide-react';
import { SectionHeading } from '../UI/SectionHeading';
import { roadmapData } from '../../data/roadmap';
import { Badge } from '../UI/Badge';
import { EASINGS, DURATIONS, VIEWPORT_CONFIG } from '../../utils/motion';

export const Roadmap: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Scroll-linked progress line
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 70%']
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001
  });

  return (
    <section id="roadmap" className="py-24 relative border-t border-white/5 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="06"
          tag="STRATEGIC DIRECTION"
          title="Cybersecurity Roadmap & Vision"
          subtitle="A structured, discipline-driven pathway from systems fundamentals to professional Web Penetration Testing."
        />

        {/* Mission / Target Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: DURATIONS.entrance, ease: EASINGS.luxuryDecel }}
          className="p-6 sm:p-8 rounded-2xl glass-card border border-emerald-glow/25 relative overflow-hidden mb-16 shadow-[0_0_30px_rgba(0,245,160,0.06)] group"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-glow via-cyber-cyan to-transparent" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 font-mono text-xs text-emerald-glow uppercase tracking-widest">
                <Target className="w-4 h-4 animate-pulse" />
                <span>// CAREER OBJECTIVE LOCKED</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                Professional <span className="gradient-emerald">Web Penetration Tester</span>
              </h3>
              <p className="text-sm text-cyber-muted leading-relaxed font-body">
                My objective is to legally assess web applications, identify vulnerabilities before malicious actors exploit them, and help build resilient digital infrastructure. Every low-level line of C, every packet captured, and every Linux utility I learn today builds toward this goal.
              </p>
            </div>

            <div className="shrink-0 p-4 rounded-xl bg-void-900 border border-white/10 flex flex-col items-center justify-center text-center w-full sm:w-auto shadow-sm">
              <span className="text-[11px] font-mono text-cyber-muted uppercase tracking-wider">Current Focus</span>
              <span className="text-sm font-mono font-bold text-emerald-glow mt-0.5">Phases 03 &amp; 04</span>
              <span className="text-[10px] font-mono text-cyber-silver/70 mt-1">Labs &amp; Web App Security</span>
            </div>
          </div>
        </motion.div>

        {/* Structured Connected Timeline Spine */}
        <div ref={timelineRef} className="relative space-y-12 ml-2 sm:ml-4 md:ml-8">
          
          {/* Continuous Vertical Connecting Spine Line with Progress Reveal */}
          <div 
            className="timeline-track-rail absolute left-0 top-[26px] bottom-[26px] w-10 pointer-events-none" 
            aria-hidden="true"
          >
            {/* Inactive background track */}
            <div className="timeline-line top-0 bottom-0 h-full bg-white/10" />

            {/* Active illuminated progress line */}
            <motion.div 
              style={{ scaleY, transformOrigin: 'top' }}
              className="timeline-line top-0 h-full bg-gradient-to-b from-emerald-glow via-cyber-cyan to-emerald-dim shadow-[0_0_12px_rgba(0,245,160,0.5)]"
            />
          </div>

          {roadmapData.map((step, idx) => {
            const isCompleted = step.status === 'completed';
            const isInProgress = step.status === 'in-progress';

            return (
              <motion.div
                key={step.phase}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_CONFIG}
                transition={{ duration: DURATIONS.entrance, delay: idx * 0.06, ease: EASINGS.luxuryDecel }}
                className="relative pl-14 sm:pl-16 group"
              >
                {/* Mathematically Centered Timeline Node Anchor */}
                <div className="timeline-node-anchor absolute left-0 top-1.5 w-10 h-10 flex items-center justify-center pointer-events-none">
                  {/* Subtle pulsing halo for active in-progress milestone */}
                  {isInProgress && (
                    <span className="absolute w-10 h-10 rounded-full bg-cyber-cyan/20 animate-ping pointer-events-none" />
                  )}

                  {/* Outer Circular Ring */}
                  <div 
                    className={`timeline-node w-8 h-8 rounded-full pointer-events-auto transition-transform duration-300 group-hover:scale-110 z-10 ${
                      isCompleted
                        ? 'bg-void-950 border-2 border-emerald-glow text-emerald-glow shadow-[0_0_12px_rgba(0,245,160,0.4)]'
                        : isInProgress
                        ? 'bg-void-950 border-2 border-cyber-cyan text-cyber-cyan shadow-[0_0_16px_rgba(0,184,217,0.5)]'
                        : 'bg-void-950 border-2 border-white/20 text-cyber-muted'
                    }`}
                  >
                    {/* Inner Centering Wrapper */}
                    <div className="timeline-node-inner w-full h-full">
                      {/* Inner Green / Cyan / Muted Dot */}
                      <div 
                        className={`timeline-dot rounded-full transition-all duration-300 ${
                          isCompleted
                            ? 'w-2.5 h-2.5 bg-emerald-glow shadow-[0_0_8px_#00F5A0]'
                            : isInProgress
                            ? 'w-2.5 h-2.5 bg-cyber-cyan shadow-[0_0_10px_#00B8D9] animate-pulse'
                            : 'w-2 h-2 bg-white/30'
                        }`} 
                      />
                    </div>
                  </div>
                </div>

                {/* Milestone Content Card */}
                <div className={`p-5 sm:p-6 md:p-7 rounded-2xl glass-card border transition-all duration-300 group-hover:-translate-y-1 relative overflow-hidden ${
                  isInProgress
                    ? 'border-cyber-cyan/35 shadow-[0_0_24px_rgba(0,184,217,0.08)] bg-void-900/95'
                    : isCompleted
                    ? 'border-emerald-glow/20 bg-void-900/80 hover:border-emerald-glow/35'
                    : 'border-white/5 opacity-85 hover:opacity-100 hover:border-white/15'
                }`}>
                  {/* Subtle top hover beam */}
                  <div className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent ${
                    isInProgress ? 'via-cyber-cyan' : 'via-emerald-glow/0 group-hover:via-emerald-glow'
                  } to-transparent transition-all duration-500`} />

                  {/* Card Header: Phase, Status Badge, Step Number */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-cyber-muted uppercase tracking-wider">
                        {step.phase}
                      </span>
                      <span className="text-white/20">•</span>
                      {isCompleted ? (
                        <Badge variant="emerald" size="sm">
                          COMPLETED
                        </Badge>
                      ) : isInProgress ? (
                        <Badge variant="cyan" size="sm" pulseDot>
                          ACTIVE FOCUS
                        </Badge>
                      ) : (
                        <Badge variant="muted" size="sm">
                          UPCOMING
                        </Badge>
                      )}
                    </div>

                    <span className="text-xs font-mono text-cyber-muted">
                      Milestone {idx + 1} of {roadmapData.length}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-xl sm:text-2xl font-display font-bold text-white mb-2 group-hover:text-emerald-glow transition-colors">
                    {step.title}
                  </h4>

                  {/* Summary */}
                  <p className="text-sm text-cyber-silver leading-relaxed font-body mb-5">
                    {step.summary}
                  </p>

                  {/* Key Deliverables Matrix */}
                  <div className="pt-4 border-t border-white/5">
                    <div className="text-[11px] font-mono text-cyber-muted uppercase tracking-widest mb-3">
                      // Core Milestones &amp; Deliverables
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {step.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2.5 text-xs text-cyber-silver/90">
                          <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                            isCompleted
                              ? 'bg-emerald-glow'
                              : isInProgress
                              ? 'bg-cyber-cyan'
                              : 'bg-white/30'
                          }`} />
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
