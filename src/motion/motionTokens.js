/**
 * Momentum Centralized Motion Design Tokens
 * 
 * Provides calibrated durations, easing curves, and spring configurations
 * engineered for high-performance mobile and desktop web/native execution.
 */

export const DURATION = {
  instant: 0,
  micro: 0.12,      // 120ms: tap feedback, checkmark reveal, toggle thumb
  fast: 0.18,       // 180ms: badge changes, dropdown expand, tooltips
  normal: 0.26,     // 260ms: sheets, cards, bottom nav indicators
  navigation: 0.3,  // 300ms: page transitions
  celebration: 0.45,// 450ms: celebratory confetti / streak counter completion
  gentle: 0.5,      // 500ms: background crossfade, chart morphing
};

export const EASING = {
  // Cubic bezier easing curves
  easeOut: [0.16, 1, 0.3, 1],       // Smooth deceleration (Standard)
  easeInOut: [0.4, 0, 0.2, 1],      // Natural acceleration + deceleration
  easeIn: [0.7, 0, 0.84, 0],        // Exit deceleration
  anticipate: [0.36, 0, 0.66, -0.56],// Subtle wind-up
};

export const SPRINGS = {
  // Highly calibrated springs for touch & physical feedback
  snappy: { type: 'spring', damping: 25, stiffness: 350, mass: 0.8 },
  gentle: { type: 'spring', damping: 28, stiffness: 260, mass: 1 },
  bouncy: { type: 'spring', damping: 16, stiffness: 320, mass: 0.9 },
  sheet: { type: 'spring', damping: 26, stiffness: 300, mass: 1 },
  pill: { type: 'spring', damping: 30, stiffness: 380, mass: 0.7 },
  subtleTap: { scale: 0.96, transition: { duration: 0.1, ease: 'easeOut' } },
  cardTap: { scale: 0.985, transition: { duration: 0.12, ease: 'easeOut' } },
};

export const SCALE = {
  activeButton: 0.96,
  activeCard: 0.985,
  hoverCard: 1.01,
  hoverButton: 1.02,
  pulse: 1.04,
};

export default {
  DURATION,
  EASING,
  SPRINGS,
  SCALE,
};
