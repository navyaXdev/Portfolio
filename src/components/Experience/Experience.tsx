import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { CheckCircle2, Calendar } from 'lucide-react';
import { SectionHeading } from '../UI/SectionHeading';
import { timelineData } from '../../data/timeline';
import { Badge } from '../UI/Badge';
import { EASINGS, DURATIONS, VIEWPORT_CONFIG } from '../../utils/motion';

export const Experience: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  // Progressive scroll-linked timeline draw
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 85%', 'end 70%'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <section id="experience" className="py-24 relative border-t border-white/5 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="04"
          tag="JOURNEY & GROWTH"
          title="Learning Milestones & Hackathons"
          subtitle="A transparent, verifiable timeline of my development progression—from algorithmic fundamentals in C to hackathons and systems engineering."
        />

        {/* Timeline container with progressive scroll tracking */}
        <div ref={timelineRef} className="relative ml-2 sm:ml-6 md:ml-40 space-y-12">
          {/* Continuous Vertical Connecting Spine Line with Active Scroll Draw */}
          <div 
            className="timeline-track-rail absolute left-0 top-[26px] bottom-[26px] w-10 pointer-events-none" 
            aria-hidden="true"
          >
            {/* Inactive track */}
            <div className="timeline-line top-0 bottom-0 h-full bg-white/10" />

            {/* Active progressive illuminated line */}
            <motion.div
              style={{ scaleY, transformOrigin: 'top' }}
              className="timeline-line top-0 h-full bg-gradient-to-b from-emerald-glow via-cyber-cyan to-emerald-dim shadow-[0_0_12px_rgba(0,245,160,0.5)]"
            />
          </div>

          {timelineData.map((milestone, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_CONFIG}
              transition={{
                duration: DURATIONS.entrance,
                delay: idx * 0.06,
                ease: EASINGS.luxuryDecel,
              }}
              className="relative pl-14 sm:pl-16 group"
            >
              {/* Timestamp label pinned to left on desktop */}
              <div className="md:absolute md:-left-36 md:top-2 md:w-32 md:text-right font-mono text-xs sm:text-sm font-bold text-emerald-glow mb-2 md:mb-0 flex items-center md:justify-end gap-1.5">
                <Calendar className="w-3.5 h-3.5 md:hidden" />
                <span>{milestone.period}</span>
              </div>

              {/* Mathematically Centered Timeline Node Anchor */}
              <div className="timeline-node-anchor absolute left-0 top-1.5 w-10 h-10 flex items-center justify-center pointer-events-none">
                {/* Outer Circular Ring with Luminous Response */}
                <div className="timeline-node w-5 h-5 rounded-full bg-void-950 border-2 border-emerald-glow shadow-glow-sm pointer-events-auto transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_12px_rgba(0,245,160,0.8)]">
                  {/* Inner Centering Wrapper */}
                  <div className="timeline-node-inner w-full h-full">
                    {/* Inner Green Dot */}
                    <div className="timeline-dot w-1.5 h-1.5 rounded-full bg-emerald-glow shadow-[0_0_6px_#00F5A0]" />
                  </div>
                </div>
              </div>

              {/* Milestone Card with Subtle Hover Physics */}
              <div className="p-5 sm:p-6 md:p-8 rounded-2xl glass-card border border-white/5 hover:border-emerald-glow/35 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-[0_16px_36px_-10px_rgba(0,0,0,0.85),0_0_20px_-5px_rgba(0,245,160,0.1)] relative overflow-hidden">
                {/* Subtle top hover beam */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-glow/0 to-transparent group-hover:via-emerald-glow transition-all duration-500" />

                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-cyber-muted uppercase tracking-wider">
                      {milestone.organization || 'Independent'}
                    </span>
                    <span className="text-white/20">/</span>
                    <span className="font-mono text-xs text-emerald-glow font-semibold">
                      {milestone.role}
                    </span>
                  </div>

                  {milestone.verifiedEvent && (
                    <Badge variant="emerald" size="sm" pulseDot>
                      Verified Milestone
                    </Badge>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-3 group-hover:text-emerald-glow transition-colors">
                  {milestone.title}
                </h3>

                <p className="text-sm sm:text-base text-cyber-silver/90 font-body leading-relaxed mb-6">
                  {milestone.description}
                </p>

                {/* Key Highlights Bullet points */}
                <div className="space-y-2.5 mb-6">
                  {milestone.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-cyber-silver">
                      <CheckCircle2 className="w-4 h-4 text-emerald-glow shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Technology Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                  {milestone.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-void-950 text-cyber-muted border border-white/5 group-hover:border-white/10 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
