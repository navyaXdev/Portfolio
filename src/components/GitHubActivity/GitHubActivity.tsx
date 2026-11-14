import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Star, 
  GitFork, 
  Search, 
  Calendar, 
  AlertCircle,
  ArrowUpRight
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

  // Filter
  const filteredRepos = repos.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLang = selectedLanguage === 'All' || repo.language === selectedLanguage;
    return matchesSearch && matchesLang;
  });

  return (
    <section id="github" className="py-24 relative border-t border-white/5 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="03"
          tag="REAL-TIME TELEMETRY"
          title="Live GitHub Repositories"
          subtitle="Explore all my public code, tools, and repositories synced directly from the GitHub REST API."
        />

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-cyber-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-void-900 border border-white/10 rounded-lg text-xs font-mono text-white placeholder-cyber-muted focus:outline-none focus:border-emerald-glow/50"
            />
          </div>

          {/* Language filter pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {languages.slice(0, 6).map(lang => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`text-[11px] font-mono px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                  selectedLanguage === lang
                    ? 'bg-emerald-glow/20 text-emerald-glow border border-emerald-glow/40 font-bold'
                    : 'bg-void-900 text-cyber-muted hover:text-white border border-white/5'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Telemetry Status Pill */}
          <div className="flex items-center gap-2 font-mono text-xs text-cyber-muted shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-glow animate-pulse" />
            <span>{isCached ? 'Cache Verified' : 'Live Sync Active'}</span>
          </div>
        </div>

        {/* Error Notification banner if API is unreachable */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-cyber-amber/10 border border-cyber-amber/20 flex items-center gap-3 text-xs font-mono text-cyber-amber">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>GitHub API notice: {error}. Showing verified offline repository cache.</span>
          </div>
        )}

        {/* Skeleton loading grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="p-6 rounded-xl glass-card border border-white/5 space-y-4 animate-pulse">
                <div className="h-5 w-2/3 bg-white/10 rounded" />
                <div className="h-4 w-full bg-white/5 rounded" />
                <div className="h-4 w-4/5 bg-white/5 rounded" />
                <div className="pt-4 flex items-center justify-between">
                  <div className="h-3 w-16 bg-white/10 rounded" />
                  <div className="h-3 w-12 bg-white/10 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredRepos.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-xl glass-card border border-white/5">
            <Github className="w-12 h-12 text-cyber-muted mx-auto mb-3 opacity-50" />
            <h4 className="text-base font-display font-bold text-white mb-1">
              No matching repositories found
            </h4>
            <p className="text-xs font-mono text-cyber-muted">
              Try adjusting your search criteria or resetting the language filter.
            </p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepos.map(repo => {
              const langColor = repo.language ? (LANGUAGE_COLORS[repo.language] || '#00F5A0') : '#777777';
              return (
                <motion.div
                  key={repo.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 rounded-xl glass-card border border-white/5 hover:border-emerald-glow/40 transition-all flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    {/* Top Row: Repo Title & Fork / Archive badge */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-base font-bold text-white group-hover:text-emerald-glow transition-colors flex items-center gap-2 line-clamp-1"
                      >
                        <Github className="w-4 h-4 text-cyber-muted shrink-0 group-hover:text-emerald-glow" />
                        <span className="truncate">{repo.name}</span>
                      </a>

                      <div className="flex items-center gap-1 shrink-0">
                        {repo.fork && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-cyber-muted border border-white/5 uppercase">
                            Fork
                          </span>
                        )}
                        {repo.archived && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-amber/10 text-cyber-amber border border-cyber-amber/20 uppercase">
                            Archived
                          </span>
                        )}
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyber-muted hover:text-emerald-glow p-1 transition-colors"
                          aria-label={`Open repository ${repo.name}`}
                        >
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* Repo Description */}
                    <p className="text-xs sm:text-[13px] text-cyber-muted font-body leading-relaxed line-clamp-3 mb-4">
                      {repo.description || '// No description provided for this repository.'}
                    </p>

                    {/* Topics badges */}
                    {repo.topics && repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {repo.topics.slice(0, 3).map(topic => (
                          <span
                            key={topic}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-void-950 text-emerald-glow/80 border border-emerald-glow/15"
                          >
                            #{topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom Metadata: Language dot, Stars, Forks, Updated */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-cyber-silver">
                    <div className="flex items-center gap-3">
                      {repo.language && (
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: langColor }}
                          />
                          <span className="text-[11px] text-white/90">{repo.language}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-1 text-cyber-muted">
                        <Star className="w-3 h-3 text-cyber-amber" />
                        <span>{repo.stargazers_count}</span>
                      </div>

                      <div className="flex items-center gap-1 text-cyber-muted">
                        <GitFork className="w-3 h-3 text-cyber-cyan" />
                        <span>{repo.forks_count}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-cyber-muted">
                      <Calendar className="w-3 h-3" />
                      <span>{formatRelativeTime(repo.updated_at)}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};
