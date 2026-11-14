import React, { useState } from 'react';
import { Mail, Github, Linkedin, Copy, Check, ArrowUpRight, ShieldCheck, MessageSquare } from 'lucide-react';
import { SectionHeading } from '../UI/SectionHeading';
import { Button } from '../UI/Button';
import { profileData } from '../../data/profile';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" className="py-24 relative border-t border-white/5 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="07"
          tag="GET IN TOUCH"
          title="Let's Connect & Collaborate"
          subtitle="Open for cybersecurity mentorship, internship opportunities, software development roles, and technical discussions."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Direct Contact Card (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl glass-card border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-emerald-glow uppercase tracking-wider mb-4">
                <MessageSquare className="w-4 h-4" />
                <span>// Direct Transmission Channel</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white mb-4">
                Have a project, security query, or opportunity?
              </h3>

              <p className="text-sm sm:text-base text-cyber-muted leading-relaxed font-body mb-8">
                I am actively seeking collaborations, open-source projects, and cybersecurity internship positions. Whether you are discussing vulnerability analysis, Linux server orchestration, or innovative software architectures, my inbox is always open.
              </p>

              {/* Direct Email Address display & Copy widget */}
              <div className="p-4 sm:p-5 rounded-xl bg-void-950/80 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="p-2.5 rounded-lg bg-emerald-glow/10 text-emerald-glow shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-cyber-muted uppercase tracking-wider">
                      Primary Contact Email
                    </div>
                    <a
                      href={`mailto:${profileData.contact.email}`}
                      className="text-sm sm:text-base font-mono font-bold text-white hover:text-emerald-glow transition-colors break-all"
                    >
                      {profileData.contact.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-void-900 border border-white/10 text-xs font-mono text-cyber-silver hover:text-white hover:border-emerald-glow/40 transition-all shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-glow" />
                      <span className="text-emerald-glow font-bold">Email Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* CTA action buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-4 border-t border-white/5 w-full">
              <Button
                variant="primary"
                size="md"
                asLink
                href={`mailto:${profileData.contact.email}`}
                icon={<Mail className="w-4 h-4" />}
                className="w-full sm:w-auto min-h-[48px]"
              >
                Send Email Directly
              </Button>

              <Button
                variant="glass"
                size="md"
                asLink
                href={profileData.contact.github}
                target="_blank"
                icon={<Github className="w-4 h-4" />}
                className="w-full sm:w-auto min-h-[48px]"
              >
                Explore GitHub
              </Button>
            </div>
          </div>

          {/* Social Profiles & Verification Links (5 cols) */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            {/* GitHub Card */}
            <a
              href={profileData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl glass-card border border-white/5 hover:border-emerald-glow/40 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-void-900 border border-white/10 group-hover:border-emerald-glow/30 transition-colors">
                  <Github className="w-6 h-6 text-white group-hover:text-emerald-glow transition-colors" />
                </div>
                <div>
                  <div className="text-xs font-mono text-cyber-muted uppercase tracking-wider">
                    GitHub Profile
                  </div>
                  <div className="text-base font-display font-bold text-white group-hover:text-emerald-glow transition-colors">
                    github.com/navyaXdev
                  </div>
                  <div className="text-xs font-mono text-emerald-glow mt-0.5">
                    10 Public Repositories
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-cyber-muted group-hover:text-emerald-glow transition-colors shrink-0" />
            </a>

            {/* LinkedIn Card */}
            <a
              href={profileData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl glass-card border border-white/5 hover:border-emerald-glow/40 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-void-900 border border-white/10 group-hover:border-emerald-glow/30 transition-colors">
                  <Linkedin className="w-6 h-6 text-white group-hover:text-emerald-glow transition-colors" />
                </div>
                <div>
                  <div className="text-xs font-mono text-cyber-muted uppercase tracking-wider">
                    LinkedIn Profile
                  </div>
                  <div className="text-base font-display font-bold text-white group-hover:text-emerald-glow transition-colors">
                    linkedin.com/in/dinesh-patra
                  </div>
                  <div className="text-xs font-mono text-cyber-silver mt-0.5">
                    Connect Professionally
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-cyber-muted group-hover:text-emerald-glow transition-colors shrink-0" />
            </a>

            {/* Trust & Location Card */}
            <div className="p-6 rounded-2xl glass-card border border-white/5">
              <div className="flex items-center gap-2 font-mono text-xs text-cyber-silver mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-glow" />
                <span>Verified Identity</span>
              </div>
              <div className="text-sm text-cyber-muted leading-relaxed font-body">
                Location: <span className="text-white">India (Available for Remote Global Roles)</span><br />
                Response Time: <span className="text-emerald-glow">Typically within 24 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
