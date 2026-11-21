/**
 * Momentum Centralized Motion Variants
 * 
 * Reusable Framer Motion variants supporting directional screen transitions,
 * microinteractions, list item sequencing, and accessible reduced-motion fallbacks.
 */

import { DURATION, EASING, SPRINGS, SCALE } from './motionTokens.js';

// ── Screen / Page Navigation Variants ─────────────────────────────────────────

export const pageVariants = {
  // Forward navigation: slides in from right, exits slightly to left
  forward: {
    initial: { opacity: 0, x: 20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: DURATION.navigation,
        ease: EASING.easeOut,
      },
    },
    exit: {
      opacity: 0,
      x: -16,
      transition: {
        duration: DURATION.fast,
        ease: EASING.easeIn,
      },
    },
  },

  // Backward navigation (goBack): enters from left, exits to right
  backward: {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: DURATION.navigation,
        ease: EASING.easeOut,
      },
    },
    exit: {
      opacity: 0,
      x: 16,
      transition: {
        duration: DURATION.fast,
        ease: EASING.easeIn,
      },
    },
  },

  // Top-level tab switch (Home <-> Tasks <-> Finance <-> More): subtle crossfade + scale
  tab: {
    initial: { opacity: 0, scale: 0.99 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: DURATION.normal,
        ease: EASING.easeOut,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.995,
      transition: {
        duration: DURATION.fast,
        ease: EASING.easeIn,
      },
    },
  },

  // Modal / Fullscreen sheet: scales up slightly with opacity
  modal: {
    initial: { opacity: 0, scale: 0.95, y: 12 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: SPRINGS.sheet,
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      y: 8,
      transition: { duration: DURATION.fast, ease: EASING.easeIn },
    },
  },

  // Reduced motion: pure opacity fade without translation
  reduced: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: DURATION.fast, ease: 'linear' },
    },
    exit: {
      opacity: 0,
      transition: { duration: DURATION.fast, ease: 'linear' },
    },
  },
};

// ── Interactive Controls & Buttons ───────────────────────────────────────────

export const buttonTapVariants = {
  idle: { scale: 1 },
  tap: { scale: SCALE.activeButton, transition: { duration: DURATION.micro, ease: EASING.easeOut } },
  hover: { scale: SCALE.hoverButton, transition: { duration: DURATION.fast, ease: EASING.easeOut } },
};

export const cardTapVariants = {
  idle: { scale: 1 },
  tap: { scale: SCALE.activeCard, transition: { duration: DURATION.micro, ease: EASING.easeOut } },
  hover: { scale: SCALE.hoverCard, transition: { duration: DURATION.fast, ease: EASING.easeOut } },
};

// ── Staggered Containers & List Items ─────────────────────────────────────────

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.02,
    },
  },
};

export const fadeInUpItem = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.fast,
      ease: EASING.easeOut,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: DURATION.fast },
  },
};

// ── Checkmarks, Celebrations & Error Feedback ─────────────────────────────────

export const checkmarkVariants = {
  unchecked: { pathLength: 0, opacity: 0 },
  checked: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: DURATION.normal, ease: EASING.easeOut },
  },
};

export const popScaleVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: SPRINGS.bouncy,
  },
  exit: { scale: 0.8, opacity: 0, transition: { duration: DURATION.micro } },
};

export const errorShakeVariants = {
  idle: { x: 0 },
  shake: {
    x: [0, -8, 8, -6, 6, -3, 3, 0],
    transition: { duration: 0.4, ease: 'easeInOut' },
  },
};

// ── Bottom Sheet & Dialog Overlays ───────────────────────────────────────────

export const bottomSheetVariants = {
  hidden: { y: '100%', opacity: 0.5 },
  visible: {
    y: 0,
    opacity: 1,
    transition: SPRINGS.sheet,
  },
  exit: {
    y: '100%',
    opacity: 0,
    transition: { duration: DURATION.fast, ease: EASING.easeIn },
  },
};

export const backdropVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.fast, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: DURATION.micro, ease: 'easeIn' },
  },
};

export default {
  pageVariants,
  buttonTapVariants,
  cardTapVariants,
  staggerContainer,
  fadeInUpItem,
  checkmarkVariants,
  popScaleVariants,
  errorShakeVariants,
  bottomSheetVariants,
  backdropVariants,
};
