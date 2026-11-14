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

const CATEGORIES = ['All', 'Programming', 'Systems & Networking'] as const;

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredSkills = activeCategory === 'All'
    ? skillsData
    : skillsData.filter(s => s.category === activeCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal': return <Terminal className="w-5 h-5 text-emerald-glow" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-cyber-cyan" />;
      case 'Code2': return <Code2 className="w-5 h-5 text-cyber-amber" />;
      case 'Layout': return <Layout className="w-5 h-5 text-emerald-glow" />;
      case 'Server': return <Server className="w-5 h-5 text-emerald-glow" />;
      case 'Network': return <Network className="w-5 h-5 text-cyber-cyan" />;
      case 'GitBranch': return <GitBranch className="w-5 h-5 text-emerald-glow" />;
      default: return <Terminal className="w-5 h-5 text-emerald-glow" />;
    }
  };

  return (
    <section id="skills" className="py-24 relative border-t border-white/5 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="02"
          tag="CORE COMPETENCIES"
          title="Technical Fundamentals"
          subtitle="A focused and genuine overview of the programming languages, systems, and networking foundations I actively study and understand."
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-white/10">
          <div className="flex items-center gap-1.5 text-xs font-mono text-cyber-muted mr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </div>

          {CATEGORIES.map(category => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3.5 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wider transition-all select-none ${
                  isActive
                    ? 'bg-emerald-glow text-void-950 font-bold shadow-glow-sm'
                    : 'bg-void-900/60 text-cyber-silver hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid: Clean 4-col / 2-col layout */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          <AnimatePresence>
            {filteredSkills.map((skill: SkillItem) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                key={skill.name}
                className="p-6 rounded-xl glass-card border border-white/5 hover:border-emerald-glow/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-lg bg-void-900 border border-white/10 group-hover:border-emerald-glow/30 transition-colors">
                      {getIcon(skill.icon)}
                    </div>
                    <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded bg-white/5 text-cyber-muted border border-white/5">
                      {skill.category === 'Programming' ? 'Lang' : 'Sys'}
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
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
