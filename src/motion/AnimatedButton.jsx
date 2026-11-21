import { motion } from 'framer-motion';
import { useAppMotion } from './useAppMotion.js';

/**
 * Standardized Animated Button Component
 * 
 * Provides tactile press and hover microinteractions while strictly honoring
 * accessibility, keyboard navigation, and reduced-motion settings.
 */
export default function AnimatedButton({
  children,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  style,
  scaleOnTap = 0.96,
  scaleOnHover = 1.02,
  ariaLabel,
  title,
  ...rest
}) {
  const { shouldReduceMotion } = useAppMotion();

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      title={title}
      whileTap={disabled || shouldReduceMotion ? undefined : { scale: scaleOnTap }}
      whileHover={disabled || shouldReduceMotion ? undefined : { scale: scaleOnHover }}
      transition={{ duration: 0.12, ease: 'easeOut' }}
      className={`select-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
