import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Star, 
  GitFork, 
  Search, 
  Calendar, 
  AlertCircle,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import { SectionHeading } from '../UI/SectionHeading';
import { useGitHubRepos } from '../../hooks/useGitHubRepos';

const LANGUAGE_COLORS: Record<string, string> = {
  Python: '#3572A5',
  JavaScript: '#F1E05A',
  TypeScript: '#3178C6',
  'C++': '#F34B7D',
  C: '#555555',
  Shell: '#89E051',
  HTML: '#E34C26',
  CSS: '#563D7C',
  Dockerfile: '#384D54',
  Markdown: '#083FA1',
};

// Subtle Animated Counting Numbers
const AnimatedCounter: React.FC<{ value: number }> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (value <= 0) {
      setDisplayValue(0);
      return;
    }
    const duration = 1000;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(ease * value));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [value]);

  return <span>{displayValue}</span>;
};

function formatRelativeTime(dateString: string): string {
  try {
    const diff = Date.now() - new Date(dateString).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'today';
    if (days === 1) return 'yesterday';
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;
    const years = Math.floor(months / 12);
    return `${years}y ago`;
  } catch {
    return 'recently';
  }
}

export const GitHubActivity: React.FC = () => {
  const { repos, loading, error, isCached } = useGitHubRepos();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');

  // Extract unique languages
  const languages = ['All', ...Array.from(new Set(repos.map(r => r.language).filter(Boolean))) as string[]];

  // Filter logic
  const filteredRepos = repos.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLang = selectedLanguage === 'All' || repo.language === selectedLanguage;
    return matchesSearch && matchesLang;
  });

  return (
    <section id="github" className="py-24 relative border-t border-white/5 scroll-mt-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cinematic Section Heading with Masked Title & Expanding Luminous Line */}
        <SectionHeading
          index="03"
          tag="REAL-TIME TELEMETRY"
          title="Live GitHub Ecosystem"
          subtitle="Explore all my public code, tools, and repositories synced directly from the GitHub REST API."
        />

        {/* Filter, Search & Telemetry Controls Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-4 border-b border-white/10"
        >
          {/* Search Input with Focus Ring & Glow */}
          <div className="relative w-full md:w-80 group">
            <Search className="w-4 h-4 text-cyber-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-emerald-glow transition-colors" />
            <input
              type="text"
              placeholder="Search repositories by name or topic..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-void-900 border border-white/10 rounded-xl text-xs font-mono text-white placeholder-cyber-muted focus:outline-none focus:border-emerald-glow/50 focus:ring-1 focus:ring-emerald-glow/30 transition-all shadow-inner"
            />
          </div>

          {/* Animated Language Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <div className="flex items-center gap-1 text-xs font-mono text-cyber-muted mr-1 shrink-0 hidden sm:flex">
              <Filter className="w-3 h-3 text-emerald-glow" />
              <span>Language:</span>
            </div>
            {languages.slice(0, 7).map(lang => {
              const isSelected = selectedLanguage === lang;
              return (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`relative text-[11px] font-mono px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all duration-300 min-h-[36px] flex items-center justify-center ${
                    isSelected
                      ? 'text-emerald-glow font-bold shadow-[0_0_12px_rgba(0,245,160,0.2)]'
                      : 'text-cyber-muted hover:text-white'
                  }`}
                >
                  {/* Sliding active pill indicator */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeLangPill"
                      className="absolute inset-0 bg-emerald-glow/15 border border-emerald-glow/40 rounded-lg -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  {!isSelected && (
                    <div className="absolute inset-0 bg-void-900 border border-white/5 rounded-lg -z-10 hover:border-white/15 transition-colors" />
                  )}
                  <span>{lang}</span>
                </button>
              );
            })}
          </div>

          {/* Telemetry Status Pill */}
          <div className="flex items-center gap-2 font-mono text-xs text-cyber-muted shrink-0 self-end md:self-center bg-void-900/80 px-3 py-1.5 rounded-full border border-white/5 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px]">{isCached ? 'Cache Verified' : 'Live Sync Active'}</span>
            <span className="text-white/20">•</span>
            <span className="text-cyber-silver font-semibold text-[11px]">{repos.length} Repos</span>
          </div>
        </motion.div>

        {/* Error Notification banner if API is unreachable */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-cyber-amber/10 border border-cyber-amber/20 flex items-center gap-3 text-xs font-mono text-cyber-amber"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>GitHub API notice: {error}. Showing verified offline repository cache.</span>
          </motion.div>
        )}

        {/* Premium Skeleton Loading Experience */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div
                key={i}
                className="p-6 rounded-2xl glass-card border border-white/5 space-y-4 relative overflow-hidden"
              >
                {/* Shimmer beam */}
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                <div className="h-5 w-2/3 bg-white/10 rounded-lg" />
                <div className="h-4 w-full bg-white/5 rounded" />
                <div className="h-4 w-4/5 bg-white/5 rounded" />
                <div className="pt-4 flex items-center justify-between border-t border-white/5">
                  <div className="h-3 w-16 bg-white/10 rounded" />
                  <div className="h-3 w-12 bg-white/10 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredRepos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 p-8 rounded-2xl glass-card border border-white/5"
          >
            <Github className="w-12 h-12 text-cyber-muted mx-auto mb-3 opacity-50" />
            <h4 className="text-base font-display font-bold text-white mb-1">
              No matching repositories found
            </h4>
            <p className="text-xs font-mono text-cyber-muted">
              Try adjusting your search query or switching to 'All' languages.
            </p>
          </motion.div>
        ) : (
          /* Staggered Animated Repository Cards Grid with 3D Entrance & Hover Elevations */
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredRepos.map((repo, idx) => {
                const langColor = repo.language ? (LANGUAGE_COLORS[repo.language] || '#00F5A0') : '#777777';
                return (
                  <motion.div
                    key={repo.id}
                    layout
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.93, transition: { duration: 0.25 } }}
                    transition={{
                      duration: 0.55,
                      delay: Math.min(idx * 0.05, 0.3),
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group relative p-6 rounded-2xl glass-card border border-white/5 hover:border-emerald-glow/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-2 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.9),0_0_24px_-6px_rgba(0,245,160,0.18)] overflow-hidden"
                  >
                    {/* Subtle Top Gradient Hover Accent */}
                    <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-glow/0 to-transparent group-hover:via-emerald-glow transition-all duration-500" />

                    <div>
                      {/* Top Row: Repo Title & Animated External Link Icon */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-display font-bold text-lg text-white group-hover:text-emerald-glow transition-colors break-words flex items-center gap-1.5"
                        >
                          <Github className="w-4 h-4 text-cyber-muted group-hover:text-emerald-glow shrink-0 transition-colors" />
                          <span className="truncate">{repo.name}</span>
                        </a>

                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-void-900 border border-white/5 text-cyber-muted group-hover:text-white group-hover:border-emerald-glow/40 group-hover:bg-emerald-glow/10 transition-all shrink-0"
                          aria-label={`Open repository ${repo.name}`}
                        >
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-[13px] text-cyber-muted leading-relaxed font-body mb-6 line-clamp-3">
                        {repo.description || '// No description provided for this repository.'}
                      </p>
                    </div>

                    {/* Bottom Metadata Strip: Language Badge & Animated Counters */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                      {/* Language Indicator */}
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                          style={{ backgroundColor: langColor }}
                        />
                        <span className="text-cyber-silver text-[11px] font-medium">
                          {repo.language || 'Plain Text'}
                        </span>
                      </div>

                      {/* Real Stars & Forks & Time with Animated Counting */}
                      <div className="flex items-center gap-3 text-cyber-muted text-[11px]">
                        {repo.stargazers_count > 0 && (
                          <span className="flex items-center gap-1 text-cyber-silver font-semibold" title={`${repo.stargazers_count} stars`}>
                            <Star className="w-3.5 h-3.5 text-cyber-amber fill-cyber-amber/20" />
                            <AnimatedCounter value={repo.stargazers_count} />
                          </span>
                        )}

                        {repo.forks_count > 0 && (
                          <span className="flex items-center gap-1 text-cyber-silver font-semibold" title={`${repo.forks_count} forks`}>
                            <GitFork className="w-3.5 h-3.5 text-cyber-cyan" />
                            <AnimatedCounter value={repo.forks_count} />
                          </span>
                        )}

                        <span className="flex items-center gap-1" title="Last updated">
                          <Calendar className="w-3 h-3 text-cyber-muted" />
                          <span>{formatRelativeTime(repo.updated_at)}</span>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};
