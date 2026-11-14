import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Clock, 
  ExternalLink, 
  ZoomIn, 
  X, 
  Copy, 
  Check, 
  FileText,
  Sparkles
} from 'lucide-react';
import { SectionHeading } from '../UI/SectionHeading';
import { achievementsData } from '../../data/achievements';
import { Button } from '../UI/Button';

export const Achievements: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const verifiedItem = achievementsData.find(a => a.id === 'nyc-codequest-2026') || achievementsData[0];
  const pendingItem = achievementsData.find(a => a.id === 'smart-india-hackathon') || achievementsData[1];

  // Copy credential ID handler
  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage]);

  return (
    <section id="achievements" className="py-24 relative border-t border-white/5 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="05"
          tag="VERIFIED CREDENTIALS & HACKATHONS"
          title="Hackathons & Achievements"
          subtitle="Documented hackathon participations, competitive qualifications, and institutional credentials verified by official organizers."
        />

        <div className="space-y-10">
          
          {/* 1. Verified Achievement: NYC CodeQuest */}
          {verifiedItem && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="p-6 sm:p-8 md:p-10 rounded-2xl glass-card border border-emerald-glow/20 relative overflow-hidden shadow-[0_0_40px_rgba(0,245,160,0.04)]"
            >
              {/* Subtle top gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-glow via-cyber-cyan to-transparent" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                
                {/* Left Preview Column: Certificate Preview (5 cols) */}
                <div className="lg:col-span-5 flex flex-col items-center">
                  <div 
                    onClick={() => verifiedItem.image && setSelectedImage(verifiedItem.image)}
                    className="relative group w-full cursor-pointer rounded-xl overflow-hidden bg-void-950 border border-white/10 hover:border-emerald-glow/50 transition-all shadow-xl aspect-[1.414/1] max-w-md"
                    title="Click to view full certificate"
                  >
                    {verifiedItem.image && (
                      <img 
                        src={verifiedItem.image} 
                        alt="NYC CodeQuest Certificate of Achievement — Round 3 Qualifier" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-void-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4 text-center">
                      <div className="p-3 rounded-full bg-emerald-glow/20 text-emerald-glow border border-emerald-glow/40 shadow-glow-sm">
                        <ZoomIn className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs font-semibold text-white tracking-wider">
                        Click to Expand Certificate
                      </span>
                      <span className="font-mono text-[10px] text-cyber-muted">
                        Full-resolution official document
                      </span>
                    </div>

                    {/* Floating Corner Badge on thumbnail */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-void-950/90 border border-emerald-glow/30 backdrop-blur-md">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-glow" />
                      <span className="font-mono text-[10px] font-bold text-white tracking-wider">
                        CERTIFIED
                      </span>
                    </div>
                  </div>

                  {/* Thumbnail footer caption */}
                  <div className="w-full flex items-center justify-between text-[11px] font-mono text-cyber-muted mt-3 max-w-md px-1">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-cyber-silver" />
                      <span>Document: PNG (1.5 MB)</span>
                    </span>
                    <button
                      onClick={() => verifiedItem.image && setSelectedImage(verifiedItem.image)}
                      className="text-emerald-glow hover:underline flex items-center gap-1 font-bold"
                    >
                      <span>Open Preview</span>
                      <ZoomIn className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Right Details Column: Metadata & Official Citation (7 cols) */}
                <div className="lg:col-span-7 space-y-5">
                  
                  {/* Status & Credential ID Header Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-glow/10 border border-emerald-glow/30 text-emerald-glow font-mono text-xs font-bold tracking-wider uppercase shadow-glow-sm">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Verified Achievement</span>
                      </span>
                    </div>

                    {/* Credential ID widget with copy */}
                    {verifiedItem.credentialId && (
                      <div className="flex items-center gap-1.5 bg-void-900 border border-white/10 px-3 py-1 rounded-lg">
                        <span className="text-[10px] font-mono text-cyber-muted uppercase">ID:</span>
                        <code className="text-xs font-mono font-bold text-cyber-silver">
                          {verifiedItem.credentialId}
                        </code>
                        <button
                          onClick={() => handleCopyId(verifiedItem.credentialId!)}
                          title="Copy Credential ID"
                          className="ml-1 p-1 text-cyber-muted hover:text-emerald-glow transition-colors"
                          aria-label="Copy Certificate ID"
                        >
                          {copiedId === verifiedItem.credentialId ? (
                            <Check className="w-3.5 h-3.5 text-emerald-glow" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Title & Hackathon Name */}
                  <div>
                    <div className="flex items-center gap-2 font-mono text-xs text-cyber-muted uppercase tracking-wider mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-glow" />
                      <span>{verifiedItem.organization}</span>
                      <span className="text-white/20">·</span>
                      <span className="text-cyber-silver">Round 3</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                      {verifiedItem.achievementTitle}
                    </h3>

                    <p className="text-xs sm:text-sm font-mono text-emerald-glow mt-1">
                      Certificate of Achievement · Issued to Dinesh Patra
                    </p>
                  </div>

                  {/* Official Citation Quote Box */}
                  {verifiedItem.citation && (
                    <blockquote className="p-4 rounded-xl bg-void-900/80 border-l-2 border-emerald-glow border-y border-r border-white/5 font-body text-xs sm:text-sm text-cyber-silver/90 italic leading-relaxed">
                      "{verifiedItem.citation}"
                    </blockquote>
                  )}

                  {/* Organizer & Signatory Meta */}
                  {verifiedItem.signatory && (
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-1 text-xs font-mono text-cyber-muted">
                      <div>
                        <span className="text-cyber-muted">Authorized Signatory: </span>
                        <strong className="text-white font-semibold">{verifiedItem.signatory.name}</strong>
                        <span className="text-white/30"> ({verifiedItem.signatory.role})</span>
                      </div>
                    </div>
                  )}

                  {/* Interactive CTAs */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => verifiedItem.image && setSelectedImage(verifiedItem.image)}
                      icon={<ZoomIn className="w-4 h-4" />}
                    >
                      View Full Certificate
                    </Button>

                    {verifiedItem.image && (
                      <a
                        href={verifiedItem.image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-void-900 border border-white/10 hover:border-emerald-glow/40 text-xs font-mono text-cyber-silver hover:text-white transition-all"
                      >
                        <span>Open in New Tab</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* 2. Pending Participation: Smart India Hackathon (SIH) */}
          {pendingItem && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="p-6 sm:p-8 rounded-2xl glass-card border border-white/10 hover:border-cyber-amber/30 transition-all relative overflow-hidden"
            >
              {/* Subtle top indicator bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyber-amber/40 via-cyber-cyan/30 to-transparent" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3 max-w-3xl">
                  {/* Status header */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-amber/10 border border-cyber-amber/30 text-cyber-amber font-mono text-xs font-bold uppercase tracking-wider">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-amber opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-amber" />
                      </span>
                      <span>Result Awaited</span>
                    </span>

                    <span className="text-white/20">/</span>

                    <span className="font-mono text-xs text-cyber-muted">
                      {pendingItem.organization}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white">
                    {pendingItem.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-cyber-muted font-body leading-relaxed">
                    {pendingItem.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {pendingItem.tags.map(tag => (
                      <span 
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-void-900 border border-white/5 text-[11px] font-mono text-cyber-silver"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Status Callout Box */}
                <div className="shrink-0 p-5 rounded-xl bg-void-950/80 border border-white/10 flex flex-col items-center justify-center text-center w-full md:w-64">
                  <div className="p-2.5 rounded-full bg-cyber-amber/10 text-cyber-amber mb-2">
                    <Clock className="w-5 h-5 animate-pulse" />
                  </div>
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Evaluation in Progress
                  </span>
                  <span className="text-[11px] font-mono text-cyber-muted mt-1">
                    Official announcement pending
                  </span>
                  <span className="text-[10px] font-mono text-emerald-glow/80 mt-2 bg-void-900 px-2 py-0.5 rounded border border-white/5">
                    Records auto-updated on release
                  </span>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>

      {/* Lightbox / High-Resolution Certificate Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-void-950/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[92vh] flex flex-col bg-void-900 border border-white/15 rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Modal Top Bar */}
              <div className="p-4 bg-void-950 border-b border-white/10 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-glow" />
                  <span className="font-mono text-xs font-bold text-white tracking-wider">
                    NYC CodeQuest Certificate of Achievement
                  </span>
                  <span className="hidden sm:inline-block text-white/20">|</span>
                  <code className="hidden sm:inline-block text-[11px] font-mono text-emerald-glow bg-void-900 px-2 py-0.5 rounded">
                    CERT-2026-MFDX9C
                  </code>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={selectedImage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-void-900 border border-white/10 text-cyber-silver hover:text-emerald-glow hover:border-emerald-glow/30 transition-all text-xs flex items-center gap-1 px-2.5 font-mono"
                    title="Open full image in new tab"
                  >
                    <span>Full Resolution</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => setSelectedImage(null)}
                    className="p-1.5 rounded-lg bg-void-900 border border-white/10 text-cyber-muted hover:text-white hover:border-white/20 transition-all"
                    aria-label="Close certificate preview"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Image Body with natural scrolling if oversized */}
              <div className="p-4 sm:p-6 overflow-auto flex items-center justify-center bg-void-950/60">
                <img
                  src={selectedImage}
                  alt="Official NYC CodeQuest Certificate of Achievement for Dinesh Patra"
                  className="max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl border border-white/5"
                />
              </div>

              {/* Modal Bottom Verification Strip */}
              <div className="p-3 bg-void-950 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-cyber-muted px-6">
                <span>Signatory: Harsh Vandana Sharma (CEO &amp; Founder)</span>
                <span className="text-emerald-glow font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Officially Verified Credential</span>
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
