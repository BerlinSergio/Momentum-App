import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppMotion } from './useAppMotion.js';
import { backdropVariants, bottomSheetVariants } from './motionVariants.js';
import { SPRINGS } from './motionTokens.js';

/**
 * Standardized Animated Modal & Bottom Sheet Component
 * 
 * Manages backdrop fade, sheet/dialog spring entrance and exit, keyboard Escape listener,
 * and backdrop dismissal.
 */
export default function AnimatedModal({
  isOpen,
  onClose,
  children,
  type = 'dialog', // 'dialog' | 'sheet'
  ariaLabel = 'Modal Dialog',
  className = '',
  backdropClassName = 'bg-black/60 backdrop-blur-sm',
}) {
  const { shouldReduceMotion } = useAppMotion();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const dialogVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.95, y: shouldReduceMotion ? 0 : 12 },
    visible: { opacity: 1, scale: 1, y: 0, transition: SPRINGS.sheet },
    exit: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.96, y: shouldReduceMotion ? 0 : 8, transition: { duration: 0.16 } },
  };

  const contentVariants = type === 'sheet' ? bottomSheetVariants : dialogVariants;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto select-none overflow-hidden">
          {/* Backdrop */}
          <motion.div
            key="animated-modal-backdrop"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
            onClick={onClose}
            className={`fixed inset-0 ${backdropClassName}`}
          />

          {/* Modal Content */}
          <motion.div
            key="animated-modal-content"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={contentVariants}
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            className={`relative z-10 ${className}`}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
