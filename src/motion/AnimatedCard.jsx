import { motion } from 'framer-motion';
import { useAppMotion } from './useAppMotion.js';

/**
 * Standardized Animated Card Component
 * 
 * Provides subtle elevation, hover feedback, and optional tap microinteraction
 * for dashboard widgets, list rows, and interactive settings cards.
 */
export default function AnimatedCard({
  children,
  onClick,
  className = '',
  style,
  clickable = false,
  scaleOnTap = 0.985,
  scaleOnHover = 1.01,
  layout = false,
  layoutId,
  ...rest
}) {
  const { shouldReduceMotion } = useAppMotion();
  const isClickable = clickable || Boolean(onClick);

  return (
    <motion.div
      onClick={onClick}
      layout={layout}
      layoutId={layoutId}
      whileTap={isClickable && !shouldReduceMotion ? { scale: scaleOnTap } : undefined}
      whileHover={isClickable && !shouldReduceMotion ? { scale: scaleOnHover } : undefined}
      transition={{ duration: 0.16, ease: 'easeOut' }}
      className={`${isClickable ? 'cursor-pointer select-none' : ''} ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
