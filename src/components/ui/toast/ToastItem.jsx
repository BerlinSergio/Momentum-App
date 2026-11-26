import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import useNavigationStore from '../../../store/useNavigationStore';

const TOAST_ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const TOAST_STYLES = {
  dark: {
    base: 'bg-slate-900/95 backdrop-blur-2xl border-white/10 text-white shadow-[0_12px_32px_rgba(0,0,0,0.45)]',
    success: {
      badge: 'text-emerald-400 bg-emerald-500/15 border border-emerald-500/30',
      title: 'text-emerald-300',
    },
    error: {
      badge: 'text-rose-400 bg-rose-500/15 border border-rose-500/30',
      title: 'text-rose-300',
    },
    warning: {
      badge: 'text-amber-400 bg-amber-500/15 border border-amber-500/30',
      title: 'text-amber-300',
    },
    info: {
      badge: 'text-sky-400 bg-sky-500/15 border border-sky-500/30',
      title: 'text-sky-300',
    },
    closeBtn: 'text-slate-400 hover:text-white hover:bg-white/10',
  },
  light: {
    base: 'bg-white/95 backdrop-blur-2xl border-slate-200/90 text-slate-900 shadow-[0_12px_30px_rgba(0,0,0,0.12)]',
    success: {
      badge: 'text-emerald-600 bg-emerald-50 border border-emerald-200',
      title: 'text-emerald-800',
    },
    error: {
      badge: 'text-rose-600 bg-rose-50 border border-rose-200',
      title: 'text-rose-800',
    },
    warning: {
      badge: 'text-amber-600 bg-amber-50 border border-amber-200',
      title: 'text-amber-800',
    },
    info: {
      badge: 'text-sky-600 bg-sky-50 border border-sky-200',
      title: 'text-sky-800',
    },
    closeBtn: 'text-slate-500 hover:text-slate-900 hover:bg-slate-100',
  },
};

export default function ToastItem({ toast, onClose }) {
  const shouldReduceMotion = useReducedMotion();
  const activeTab = useNavigationStore((s) => s.activeTab) || '';
  const isDark = activeTab.toLowerCase().includes('dark') || !activeTab.toLowerCase().includes('light');

  const themeTokens = isDark ? TOAST_STYLES.dark : TOAST_STYLES.light;
  const variantTokens = themeTokens[toast.type] || themeTokens.info;
  const IconComponent = TOAST_ICONS[toast.type] || Info;

  const isAssertive = toast.type === 'error' || toast.type === 'warning';

  return (
    <motion.div
      layout="position"
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -20, scale: 0.95 }}
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.95 }}
      transition={{ type: 'spring', damping: 25, stiffness: 380 }}
      role={isAssertive ? 'alert' : 'status'}
      aria-live={isAssertive ? 'assertive' : 'polite'}
      data-testid={`momentum-toast-${toast.type}`}
      data-toast="item"
      data-toast-id={toast.id}
      data-toast-type={toast.type}
      className={`pointer-events-none flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-xl select-none font-sans text-xs max-w-[92vw] sm:max-w-md ${themeTokens.base}`}
    >
      {/* Icon Badge */}
      <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${variantTokens.badge}`}>
        <IconComponent className="w-4 h-4" />
      </div>

      {/* Message Text */}
      <div className="flex-1 min-w-0 pr-1">
        <p className="font-semibold text-xs leading-snug break-words">
          {toast.message}
        </p>
      </div>

      {/* Manual Dismiss Button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss notification"
        className={`pointer-events-auto p-1 rounded-lg transition-colors cursor-pointer shrink-0 ${themeTokens.closeBtn}`}
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}
