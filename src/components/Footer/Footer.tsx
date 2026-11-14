import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, ShieldCheck } from 'lucide-react';
import { profileData } from '../../data/profile';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative bg-void-950 border-t border-white/10 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/5">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyber-cyan/15 border border-emerald-glow/40 flex items-center justify-center text-emerald-glow font-display font-bold text-xs tracking-wider">
                DP
              </div>
              <span className="font-display text-sm font-bold text-white tracking-wider">
                DINESH PATRA
              </span>
            </div>
            <p className="text-xs text-cyber-muted font-body max-w-sm">
              Cybersecurity Enthusiast · Developer · Technology Explorer. Building practical digital solutions with discipline and clarity.
            </p>
          </div>

          {/* Social links */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={profileData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-void-900 border border-white/5 text-cyber-muted hover:text-emerald-glow hover:border-emerald-glow/30 transition-all"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={profileData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-void-900 border border-white/5 text-cyber-muted hover:text-emerald-glow hover:border-emerald-glow/30 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${profileData.contact.email}`}
              className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-void-900 border border-white/5 text-cyber-muted hover:text-emerald-glow hover:border-emerald-glow/30 transition-all"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-void-900 border border-white/10 text-xs font-mono text-cyber-silver hover:text-white hover:border-emerald-glow/40 transition-all"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5 text-emerald-glow" />
              <span>TOP</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-cyber-muted">
          <div>
            © {new Date().getFullYear()} Dinesh Patra. Technology Explorer &amp; Developer.
          </div>
          <div className="flex items-center gap-2 text-cyber-silver">
            <span className="text-emerald-glow font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Identity</span>
            </span>
            <span className="text-white/20">·</span>
            <span>Built with React &amp; TypeScript</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
