import { motion } from 'framer-motion';
import { useAppMotion } from './useAppMotion.js';

/**
 * Standardized Page Transition Wrapper
 * 
 * Applies directional transition variants (forward, backward, tab, modal)
 * to screen components, automatically adapting to reduced motion preferences.
 */
export default function PageTransition({
  children,
  screenKey,
  direction = 'tab',
  className = 'w-full h-full flex flex-col',
  style,
}) {
  const { getPageVariants } = useAppMotion();
  const variants = getPageVariants(direction);

  return (
    <motion.div
      key={screenKey}
      data-screen-key={screenKey}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      className={className}
      style={{
        ...style,
        // A persistent transform layer turns descendant fixed controls into
        // scroll-relative elements and wastes GPU memory on mobile.
        willChange: 'auto',
      }}
    >
      {children}
    </motion.div>
  );
}
