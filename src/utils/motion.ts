import { Variants, Transition } from 'framer-motion';

/**
 * Dinesh Patra Luxury Portfolio — Unified Motion Design System
 * 
 * Provides consistent, hardware-accelerated easing curves, durations,
 * stagger sequences, and reduced-motion fallbacks across the entire website.
 */

// Premium Easing Curves
export const EASINGS = {
  // Luxury editorial deceleration: rapid start with long, graceful deceleration
  luxuryDecel: [0.16, 1, 0.3, 1] as const,
  // Snappy responsive feedback for buttons & toggles
  snappy: [0.25, 1, 0.5, 1] as const,
  // Smooth symmetric ease for continuous ambient loops
  ambient: [0.4, 0, 0.2, 1] as const,
  // Gentle elastic pop for icons & badges
  gentlePop: [0.34, 1.56, 0.64, 1] as const,
};

// Standardized Durations (in seconds)
export const DURATIONS = {
  micro: 0.2,
  fast: 0.35,
  standard: 0.55,
  entrance: 0.75,
  cinematic: 0.95,
  long: 1.2,
};

// Standardized Viewport Triggers
export const VIEWPORT_CONFIG = {
  once: true,
  margin: '-50px',
  amount: 0.15 as const,
};

// Standard Container Stagger Variants
export const createContainerVariants = (
  staggerChildren = 0.08,
  delayChildren = 0.05
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

// Standard Item Entrance Variants (Fade + Subtle Upward Glide)
export const itemFadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.entrance,
      ease: EASINGS.luxuryDecel,
    },
  },
};

// Masked Slide-Up for Typography & Word Reveals
export const maskedSlideUp: Variants = {
  hidden: { y: '115%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: DURATIONS.cinematic,
      ease: EASINGS.luxuryDecel,
    },
  },
};

// Subtle Scale + Fade for Cards and Modals
export const cardScaleFade: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: DURATIONS.standard,
      ease: EASINGS.luxuryDecel,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    transition: {
      duration: DURATIONS.fast,
      ease: EASINGS.snappy,
    },
  },
};

// Hairline Luminous Line Expansion
export const lineExpansion: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: DURATIONS.cinematic,
      delay: 0.2,
      ease: EASINGS.luxuryDecel,
    },
  },
};

// Hover State Presets for Interactive Cards
export const cardHoverTransition: Transition = {
  duration: 0.3,
  ease: EASINGS.luxuryDecel,
};
