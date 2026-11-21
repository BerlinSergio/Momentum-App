import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigationStore } from '../../store/useNavigationStore';
import { useTranslation } from 'react-i18next';

/**
 * Standard Momentum BackButton component
 * Integrates with global useNavigationStore history stack, supporting custom goBack,
 * fallback screens, and browser history popstate.
 *
 * @param {Object} props
 * @param {function} [props.goBack] - Optional custom goBack handler
 * @param {string} [props.fallback] - Fallback screen if history stack is empty
 * @param {boolean} [props.isDarkMode] - Dark or light mode styling
 * @param {string} [props.className] - Custom styling overrides
 */
export default function BackButton({
  goBack: customGoBack,
  fallback,
  isDarkMode = true,
  className,
  ...props
}) {
  const { t } = useTranslation();
  const storeGoBack = useNavigationStore((s) => s.goBack);

  const handleClick = (e) => {
    e.preventDefault();
    if (typeof customGoBack === 'function') {
      customGoBack(fallback);
    } else {
      storeGoBack(fallback);
    }
  };

  const defaultStyles = isDarkMode
    ? 'p-2 rounded-full text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer select-none'
    : 'p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer select-none';

  return (
    <motion.button
      type="button"
      data-testid="back-button"
      onClick={handleClick}
      whileTap={{ scale: 0.90 }}
      whileHover={{ scale: 1.08 }}
      transition={{ duration: 0.12, ease: 'easeOut' }}
      className={className || defaultStyles}
      aria-label={props['aria-label'] || t('common.back')}
      {...props}
    >
      <ArrowLeft className="w-5 h-5 rtl:rotate-180 transition-transform" />
    </motion.button>
  );
}

