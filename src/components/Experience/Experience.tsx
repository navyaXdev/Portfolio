import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../UI/SectionHeading';
import { timelineData } from '../../data/timeline';
import { Badge } from '../UI/Badge';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative border-t border-white/5 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="04"
          tag="JOURNEY & GROWTH"
          title="Learning Milestones & Hackathons"
          subtitle="A transparent, verifiable timeline of my development progression—from algorithmic fundamentals in C to hackathons and systems engineering."
        />

        {/* Timeline container */}
        <div className="relative border-l border-white/10 ml-4 sm:ml-8 md:ml-32 pl-6 sm:pl-10 space-y-12">
          {timelineData.map((milestone, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-void-950 border-2 border-emerald-glow flex items-center justify-center group-hover:scale-125 transition-transform shadow-glow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-glow" />
              </div>

              {/* Timestamp label pinned to left on desktop */}
              <div className="md:absolute md:-left-40 md:top-1.5 font-mono text-xs sm:text-sm font-bold text-emerald-glow mb-2 md:mb-0">
                {milestone.period}
              </div>

              {/* Milestone Card */}
              <div className="p-6 sm:p-8 rounded-2xl glass-card border border-white/5 hover:border-emerald-glow/30 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-cyber-muted uppercase tracking-wider">
                      {milestone.organization || 'Independent'}
                    </span>
                    <span className="text-white/20">/</span>
                    <span className="font-mono text-xs text-emerald-glow">
                      {milestone.role}
                    </span>
                  </div>

                  {milestone.verifiedEvent && (
                    <Badge variant="emerald" size="sm">
                      Verified Milestone
                    </Badge>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-3">
                  {milestone.title}
                </h3>

                <p className="text-sm sm:text-base text-cyber-silver/90 font-body leading-relaxed mb-6">
                  {milestone.description}
                </p>

                {/* Key Highlights Bullet points */}
                <div className="space-y-2 mb-6">
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
                      className="text-[11px] font-mono px-2.5 py-1 rounded bg-void-950 text-cyber-muted border border-white/5"
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
