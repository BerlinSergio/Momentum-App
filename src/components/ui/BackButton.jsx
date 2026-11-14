import { ArrowLeft } from 'lucide-react';
import { useNavigationStore } from '../../store/useNavigationStore';

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
    <button
      type="button"
      onClick={handleClick}
      className={className || defaultStyles}
      aria-label="Go back"
      {...props}
    >
      <ArrowLeft className="w-5 h-5" />
    </button>
  );
}

