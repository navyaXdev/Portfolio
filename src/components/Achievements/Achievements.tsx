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
import { EASINGS, DURATIONS, VIEWPORT_CONFIG } from '../../utils/motion';

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
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_CONFIG}
              transition={{ duration: DURATIONS.entrance, ease: EASINGS.luxuryDecel }}
              className="p-6 sm:p-8 md:p-10 rounded-2xl glass-card border border-emerald-glow/20 relative overflow-hidden shadow-[0_0_40px_rgba(0,245,160,0.04)]"
            >
              {/* Top gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-glow via-cyber-cyan to-transparent" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                
                {/* Left Preview Column: Certificate Preview with Smooth Mask Reveal (5 cols) */}
                <div className="lg:col-span-5 flex flex-col items-center">
                  <motion.div 
                    initial={{ clipPath: 'inset(10% 0% 0% 0%)', opacity: 0 }}
                    whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: DURATIONS.cinematic, ease: EASINGS.luxuryDecel }}
                    onClick={() => verifiedItem.image && setSelectedImage(verifiedItem.image)}
                    className="relative group w-full cursor-pointer rounded-2xl overflow-hidden bg-void-950 border border-white/10 hover:border-emerald-glow/50 transition-all shadow-xl aspect-[1.414/1] max-w-md"
                    title="Click to view full certificate"
                  >
                    {verifiedItem.image && (
                      <img 
                        src={verifiedItem.image} 
                        alt="NYC CodeQuest Certificate of Achievement — Round 3 Qualifier" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
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
                  </motion.div>

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

                  {/* Title & Organization Hierarchy */}
                  <div>
                    <div className="font-mono text-xs text-cyber-silver flex items-center gap-2 mb-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-glow" />
                      <span className="uppercase tracking-widest">{verifiedItem.organization}</span>
                      {verifiedItem.organizerDetail && (
                        <>
                          <span className="text-white/20">•</span>
                          <span>{verifiedItem.organizerDetail}</span>
                        </>
                      )}
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                      {verifiedItem.achievementTitle || verifiedItem.title}
                    </h3>

                    <div className="text-sm font-mono text-emerald-glow mt-1">
                      {verifiedItem.title} · Issued to Dinesh Patra
                    </div>
                  </div>

                  {/* Factual Citation Quote */}
                  {verifiedItem.citation && (
                    <div className="p-4 rounded-xl bg-void-900/80 border border-white/5 text-xs sm:text-sm text-cyber-silver/90 font-body leading-relaxed italic">
                      "{verifiedItem.citation}"
                    </div>
                  )}

                  {/* Authorized Signatory Credential Info */}
                  {verifiedItem.signatory && (
                    <div className="text-xs font-mono text-cyber-muted">
                      Authorized Signatory:{' '}
                      <strong className="text-white font-medium">{verifiedItem.signatory.name}</strong> ({verifiedItem.signatory.role})
                    </div>
                  )}

                  {/* Interactive CTAs */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => verifiedItem.image && setSelectedImage(verifiedItem.image)}
                      icon={<ZoomIn className="w-4 h-4" />}
                      className="w-full sm:w-auto min-h-[44px]"
                    >
                      View Full Certificate
                    </Button>

                    {verifiedItem.image && (
                      <a
                        href={verifiedItem.image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-void-900 border border-white/10 hover:border-emerald-glow/40 text-xs font-mono text-cyber-silver hover:text-white transition-all min-h-[44px]"
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
              viewport={VIEWPORT_CONFIG}
              transition={{ duration: DURATIONS.entrance, delay: 0.1, ease: EASINGS.luxuryDecel }}
              className="p-6 sm:p-8 rounded-2xl glass-card border border-white/10 hover:border-cyber-amber/30 transition-all relative overflow-hidden"
            >
              {/* Top indicator bar */}
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

                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                    {pendingItem.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-cyber-silver/90 font-body leading-relaxed">
                    {pendingItem.description}
                  </p>

                  {pendingItem.tags && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {pendingItem.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-void-950 text-cyber-muted border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right side verification notice */}
                <div className="shrink-0 p-4 rounded-xl bg-void-950/80 border border-white/5 flex flex-col items-center justify-center text-center">
                  <Clock className="w-5 h-5 text-cyber-amber mb-1.5 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-cyber-amber uppercase">
                    Evaluation in Progress
                  </span>
                  <span className="text-[10px] font-mono text-cyber-muted mt-1 max-w-[160px]">
                    Official announcement pending organizer release
                  </span>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>

      {/* Interactive Lightbox Modal for Certificate Preview */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-void-950/90 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[92vh] flex flex-col bg-void-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 px-6 border-b border-white/10 bg-void-950/80">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-glow" />
                  <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    Official Credential Preview
                  </span>
                  <span className="text-white/20">|</span>
                  <span className="font-mono text-xs text-cyber-silver">
                    {verifiedItem?.credentialId}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {verifiedItem?.credentialId && (
                    <button
                      onClick={() => handleCopyId(verifiedItem.credentialId!)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-void-900 border border-white/10 text-xs font-mono text-cyber-silver hover:text-white transition-colors"
                    >
                      {copiedId === verifiedItem.credentialId ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-glow" />
                          <span className="text-emerald-glow">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy ID</span>
                        </>
                      )}
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedImage(null)}
                    className="p-1.5 rounded-lg bg-void-900 border border-white/10 text-cyber-muted hover:text-white hover:border-emerald-glow/40 transition-colors"
                    aria-label="Close Preview"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Image Viewport */}
              <div className="p-3 sm:p-6 overflow-auto flex items-center justify-center bg-void-950/50">
                <img
                  src={selectedImage}
                  alt="Full Resolution Verified Certificate"
                  className="max-h-[76vh] w-auto object-contain rounded-lg shadow-2xl border border-white/5"
                />
              </div>

              {/* Modal Footer */}
              <div className="p-3 px-6 border-t border-white/10 bg-void-950/80 flex items-center justify-between text-xs font-mono text-cyber-muted">
                <span>Verified by NYC CodeQuest / NYX Hackathon Official Organizers</span>
                <span className="hidden sm:inline">Press Esc or click backdrop to close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
