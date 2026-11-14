import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Cpu } from 'lucide-react';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('INITIALIZING_CORE');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const stages = [
      { at: 20, text: 'LOADING_SYS_MODULES' },
      { at: 50, text: 'VERIFYING_REPOSITORIES' },
      { at: 80, text: 'CONFIGURING_SECURITY_SANDBOX' },
      { at: 95, text: 'RENDERING_LUXURY_INTERFACE' },
      { at: 100, text: 'SYSTEM_READY' }
    ];

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete();
          }, 250);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 14) + 6;
        const capped = Math.min(next, 100);

        const currentStage = stages.find(s => capped <= s.at);
        if (currentStage) {
          setStage(currentStage.text);
        }

        return capped;
      });
    }, 35);

    // Hard safety timeout in case of any animation stalls
    const safetyTimer = setTimeout(() => {
      clearInterval(timer);
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 1500);

    return () => {
      clearInterval(timer);
      clearTimeout(safetyTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.01 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9990] flex flex-col items-center justify-center bg-void-950 text-white select-none overflow-hidden"
        >
          {/* Subtle background ambient blur */}
          <div className="absolute w-96 h-96 bg-emerald-glow/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 text-center">
            {/* High-tech animated brand mark */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyber-cyan/15 border border-emerald-glow/40 flex items-center justify-center shadow-glow-sm mb-6"
            >
              <span className="font-display font-extrabold text-2xl text-emerald-glow tracking-wider">DP</span>
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-glow shadow-glow-sm" />
            </motion.div>

            {/* Profile Identity */}
            <div className="font-display font-bold text-lg tracking-wider text-white mb-1">
              DINESH PATRA
            </div>
            <div className="font-mono text-xs text-cyber-muted tracking-widest uppercase mb-8">
              Cybersecurity Enthusiast · Developer
            </div>

            {/* Progress Bar Container */}
            <div className="w-full h-1.5 bg-void-800 rounded-full overflow-hidden p-0.5 border border-white/10 mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-dim to-emerald-glow rounded-full shadow-glow-sm transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Status & Counter */}
            <div className="w-full flex items-center justify-between font-mono text-[11px] text-cyber-muted">
              <span className="flex items-center gap-1.5 text-cyber-silver">
                <Cpu className="w-3 h-3 text-emerald-glow animate-spin" />
                <span>{stage}</span>
              </span>
              <span className="text-emerald-glow font-bold tabular-nums">
                {progress}%
              </span>
            </div>

            {/* Verification signature */}
            <div className="mt-8 flex items-center gap-2 text-[10px] font-mono text-white/30">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-glow/50" />
              <span>CRYPTOGRAPHIC PROTOCOL INITIALIZED</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
