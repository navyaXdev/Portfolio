import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Cpu, 
  Code2, 
  Layout, 
  Server, 
  Network, 
  GitBranch,
  Filter
} from 'lucide-react';
import { SectionHeading } from '../UI/SectionHeading';
import { skillsData } from '../../data/skills';
import { SkillItem } from '../../types';
import { EASINGS, DURATIONS } from '../../utils/motion';

const CATEGORIES = ['All', 'Programming', 'Systems & Networking'] as const;

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredSkills = activeCategory === 'All'
    ? skillsData
    : skillsData.filter(s => s.category === activeCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal': return <Terminal className="w-5 h-5 text-emerald-glow group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-cyber-cyan group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300" />;
      case 'Code2': return <Code2 className="w-5 h-5 text-cyber-amber group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" />;
      case 'Layout': return <Layout className="w-5 h-5 text-emerald-glow group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300" />;
      case 'Server': return <Server className="w-5 h-5 text-emerald-glow group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" />;
      case 'Network': return <Network className="w-5 h-5 text-cyber-cyan group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300" />;
      case 'GitBranch': return <GitBranch className="w-5 h-5 text-emerald-glow group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" />;
      default: return <Terminal className="w-5 h-5 text-emerald-glow group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" />;
    }
  };

  return (
    <section id="skills" className="py-24 relative border-t border-white/5 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="02"
          tag="CORE COMPETENCIES"
          title="Technical Fundamentals"
          subtitle="A disciplined and authentic overview of the programming languages, systems, and networking foundations I actively study and understand."
        />

        {/* Category Filter Tabs with Sliding Active Pill */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-white/10">
          <div className="flex items-center gap-1.5 text-xs font-mono text-cyber-muted mr-2">
            <Filter className="w-3.5 h-3.5 text-emerald-glow" />
            <span>Filter Category:</span>
          </div>

          {CATEGORIES.map(category => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all select-none min-h-[42px] flex items-center justify-center ${
                  isActive
                    ? 'text-void-950 font-bold'
                    : 'text-cyber-silver hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSkillCategory"
                    className="absolute inset-0 bg-emerald-glow rounded-lg -z-10 shadow-glow-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{category}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid: Clean 4-col / 2-col layout with Staggered Entrance */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill: SkillItem, index: number) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 18, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: DURATIONS.fast,
                  delay: index * 0.04,
                  ease: EASINGS.luxuryDecel,
                }}
                key={skill.name}
                className="relative overflow-hidden p-6 rounded-2xl glass-card border border-white/5 hover:border-emerald-glow/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between min-h-[250px] group shadow-sm hover:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.85),0_0_20px_-5px_rgba(0,245,160,0.12)]"
              >
                {/* Subtle Top Gradient Hover Accent */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-glow/0 to-transparent group-hover:via-emerald-glow transition-all duration-500" />
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-void-900 border border-white/10 group-hover:border-emerald-glow/30 transition-colors">
                      {getIcon(skill.icon)}
                    </div>
                    <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-white/5 text-cyber-muted border border-white/5">
                      {skill.category === 'Programming' ? 'Language' : 'Systems'}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-white group-hover:text-emerald-glow transition-colors">
                    {skill.name}
                  </h3>

                  <div className="text-xs font-mono text-emerald-glow/90 mt-1 mb-3">
                    {skill.focus}
                  </div>

                  <p className="text-xs sm:text-[13px] text-cyber-muted leading-relaxed font-body">
                    {skill.description}
                  </p>
                </div>

                <div className="pt-4 mt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-cyber-muted">
                  <span>Verified Competency</span>
                  <span className="text-emerald-glow/70 font-semibold">// Active Study</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
