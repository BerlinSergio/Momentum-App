/**
 * Momentum Motion Hook — useAppMotion
 * 
 * Provides unified access to reduced-motion state, directional navigation variants,
 * and calibrated microinteraction helpers.
 */

import { useReducedMotion } from 'framer-motion';
import { pageVariants, buttonTapVariants, cardTapVariants } from './motionVariants.js';
import { DURATION, EASING, SPRINGS } from './motionTokens.js';

export function useAppMotion() {
  const systemReducedMotion = useReducedMotion();
  const shouldReduceMotion = Boolean(systemReducedMotion);

  /**
   * Resolves appropriate page animation variants based on direction
   * @param {'forward' | 'backward' | 'tab' | 'modal'} direction
   */
  const getPageVariants = (direction = 'tab') => {
    if (shouldReduceMotion) {
      return pageVariants.reduced;
    }
    return pageVariants[direction] || pageVariants.tab;
  };

  /**
   * Safe interactive button tap prop generator
   */
  const getButtonTapProps = (disabled = false) => {
    if (disabled || shouldReduceMotion) {
      return {};
    }
    return {
      whileTap: buttonTapVariants.tap,
      whileHover: buttonTapVariants.hover,
    };
  };

  /**
   * Safe interactive card tap prop generator
   */
  const getCardTapProps = (disabled = false) => {
    if (disabled || shouldReduceMotion) {
      return {};
    }
    return {
      whileTap: cardTapVariants.tap,
      whileHover: cardTapVariants.hover,
    };
  };

  return {
    shouldReduceMotion,
    getPageVariants,
    getButtonTapProps,
    getCardTapProps,
    DURATION,
    EASING,
    SPRINGS,
  };
}

export default useAppMotion;
