import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { AlertTriangle, Trash2, Info, HelpCircle, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useNavigationStore from '../../../store/useNavigationStore';
import { useLocaleStore } from '../../../store/useLocaleStore';
import { useConfirmStore } from './confirmService';

const VARIANT_ICONS = {
  destructive: Trash2,
  warning: AlertTriangle,
  info: Info,
  default: HelpCircle,
};

const VARIANT_CONFIGS = {
  destructive: {
    dark: {
      badge: 'text-rose-400 bg-rose-500/15 border border-rose-500/30',
      confirmBtn: 'bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white shadow-lg shadow-rose-600/25',
    },
    light: {
      badge: 'text-rose-600 bg-rose-50 border border-rose-200',
      confirmBtn: 'bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white shadow-lg shadow-rose-600/20',
    },
  },
  warning: {
    dark: {
      badge: 'text-amber-400 bg-amber-500/15 border border-amber-500/30',
      confirmBtn: 'bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white shadow-lg shadow-amber-600/25',
    },
    light: {
      badge: 'text-amber-600 bg-amber-50 border border-amber-200',
      confirmBtn: 'bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white shadow-lg shadow-amber-600/20',
    },
  },
  info: {
    dark: {
      badge: 'text-sky-400 bg-sky-500/15 border border-sky-500/30',
      confirmBtn: 'bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white shadow-lg shadow-sky-600/25',
    },
    light: {
      badge: 'text-sky-600 bg-sky-50 border border-sky-200',
      confirmBtn: 'bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white shadow-lg shadow-sky-600/20',
    },
  },
  default: {
    dark: {
      badge: 'text-emerald-400 bg-emerald-500/15 border border-emerald-500/30',
      confirmBtn: 'bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25',
    },
    light: {
      badge: 'text-emerald-600 bg-emerald-50 border border-emerald-200',
      confirmBtn: 'bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20',
    },
  },
};

export default function MomentumConfirmDialog() {
  const { t, i18n } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const activeTab = useNavigationStore((s) => s.activeTab) || '';
  const isDark = activeTab.toLowerCase().includes('dark') || !activeTab.toLowerCase().includes('light');
  const storeLocale = useLocaleStore((s) => s.currentLocale);
  const storeIsRtl = useLocaleStore((s) => s.isRTL);
  const fontClass = useLocaleStore((s) => s.fontClass) || 'font-sans';
  const isRtl = storeIsRtl || storeLocale === 'fa-AF' || storeLocale === 'ps-AF' || i18n.language === 'fa-AF' || i18n.language === 'ps-AF' || (typeof document !== 'undefined' && document.documentElement.dir === 'rtl');

  const dialogProps = useConfirmStore((s) => s.dialogProps);
  const handleConfirmAction = useConfirmStore((s) => s.handleConfirm);
  const handleCancelAction = useConfirmStore((s) => s.handleCancel);

  // Responsive device check for mobile vs desktop sheet/modal animation
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 640 : false));
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [promptVal, setPromptVal] = useState('');
  const confirmBtnRef = useRef(null);
  const cancelBtnRef = useRef(null);
  const inputRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!dialogProps) return;
    setPromptVal(dialogProps.defaultValue || '');

    // Focus management
    const timer = setTimeout(() => {
      if (dialogProps.type === 'prompt') {
        inputRef.current?.focus();
        inputRef.current?.select?.();
      } else if (dialogProps.variant === 'destructive') {
        // Safe UX practice: Default focus on Cancel for destructive actions
        cancelBtnRef.current?.focus();
      } else {
        confirmBtnRef.current?.focus();
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [dialogProps]);

  // Keyboard navigation
  useEffect(() => {
    if (!dialogProps) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleCancelAction();
      } else if (e.key === 'Enter') {
        // If Enter is pressed inside an input or outside cancel button, trigger confirm
        if (e.target !== cancelBtnRef.current) {
          e.preventDefault();
          if (dialogProps.type === 'prompt') {
            handleConfirmAction(promptVal);
          } else {
            handleConfirmAction(true);
          }
        }
      } else if (e.key === 'Tab') {
        // Simple focus containment
        if (!dialogRef.current) return;
        const focusables = dialogRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dialogProps, promptVal, handleCancelAction, handleConfirmAction]);

  if (!dialogProps) return null;

  const {
    id,
    type = 'confirm',
    variant = 'default',
    title,
    titleKey,
    message,
    messageKey,
    confirmLabel,
    confirmLabelKey,
    cancelLabel,
    cancelLabelKey,
    placeholder,
    placeholderKey,
    inputType = 'text',
    params = {},
  } = dialogProps;

  // Resolve localized strings
  const resolvedTitle = titleKey ? t(titleKey, params) : (title || (variant === 'destructive' ? t('confirm.deleteTitle') : variant === 'warning' ? t('confirm.discardTitle') : t('confirm.confirm')));
  const resolvedMessage = messageKey ? t(messageKey, params) : message;

  let resolvedConfirmLabel = '';
  if (confirmLabelKey) {
    resolvedConfirmLabel = t(confirmLabelKey, params);
  } else if (confirmLabel) {
    resolvedConfirmLabel = confirmLabel;
  } else if (type === 'prompt') {
    resolvedConfirmLabel = t('confirm.save', 'Save');
  } else if (variant === 'destructive') {
    resolvedConfirmLabel = t('confirm.delete', 'Delete');
  } else if (variant === 'warning') {
    resolvedConfirmLabel = t('confirm.discard', 'Discard');
  } else {
    resolvedConfirmLabel = t('confirm.confirm', 'Confirm');
  }

  let resolvedCancelLabel = '';
  if (cancelLabelKey) {
    resolvedCancelLabel = t(cancelLabelKey, params);
  } else if (cancelLabel) {
    resolvedCancelLabel = cancelLabel;
  } else if (variant === 'warning') {
    resolvedCancelLabel = t('confirm.keepEditing', 'Keep editing');
  } else {
    resolvedCancelLabel = t('confirm.cancel', 'Cancel');
  }

  const resolvedPlaceholder = placeholderKey ? t(placeholderKey, params) : placeholder;

  const IconComponent = VARIANT_ICONS[variant] || HelpCircle;
  const variantTokens = (VARIANT_CONFIGS[variant] || VARIANT_CONFIGS.default)[isDark ? 'dark' : 'light'];

  // Desktop vs Mobile motion variants
  const mobileVariants = {
    initial: { opacity: 0, y: '100%' },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: '100%' },
  };

  const desktopVariants = {
    initial: { opacity: 0, scale: 0.94, y: 16 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.96, y: 12 },
  };

  return (
    <div
      data-testid="momentum-confirmation-viewport"
      className="fixed inset-0 z-[850] flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-x-hidden overflow-y-auto"
      style={{
        paddingBottom: isMobile ? 'env(safe-area-inset-bottom, 0px)' : undefined,
      }}
    >
      {/* Backdrop */}
      <motion.div
        data-testid="momentum-dialog-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={handleCancelAction}
        className={`fixed inset-0 backdrop-blur-md transition-colors ${
          isDark ? 'bg-black/60' : 'bg-slate-900/35'
        }`}
        aria-hidden="true"
      />

      {/* Dialog / Bottom Sheet Card */}
      <motion.div
        ref={dialogRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="momentum-dialog-title"
        aria-describedby="momentum-dialog-desc"
        data-testid={`momentum-dialog-${variant}`}
        data-dialog-id={id}
        data-dialog-type={type}
        data-dialog-variant={variant}
        dir={isRtl ? 'rtl' : 'ltr'}
        variants={shouldReduceMotion ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } } : (isMobile ? mobileVariants : desktopVariants)}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={
          isMobile
            ? { type: 'spring', damping: 28, stiffness: 350 }
            : { duration: 0.22, ease: [0.16, 1, 0.3, 1] }
        }
        className={`relative z-10 w-full sm:max-w-[440px] select-none ${fontClass} overflow-hidden ${
          isMobile
            ? 'rounded-t-[2.5rem] rounded-b-none border-t px-6 pt-3 pb-8'
            : 'rounded-3xl border p-6 my-auto shadow-2xl'
        } ${
          isDark
            ? 'bg-slate-900/95 backdrop-blur-2xl border-white/10 text-white shadow-[0_24px_60px_rgba(0,0,0,0.65)]'
            : 'bg-white/95 backdrop-blur-2xl border-slate-200/90 text-slate-900 shadow-[0_24px_50px_rgba(15,23,42,0.18)]'
        }`}
      >
        {/* Mobile Drag Indicator Bar */}
        {isMobile && (
          <div className="flex justify-center pb-3">
            <div
              className={`w-12 h-1.5 rounded-full ${
                isDark ? 'bg-white/20' : 'bg-slate-300'
              }`}
            />
          </div>
        )}

        {/* Dialog Header */}
        <div className="flex items-start gap-4 mb-4">
          {/* Variant Icon Badge */}
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${variantTokens.badge}`}
          >
            <IconComponent className="w-5 h-5" />
          </div>

          <div className="flex-1 min-w-0 pt-0.5">
            <h2
              id="momentum-dialog-title"
              className="text-base sm:text-lg font-bold leading-tight tracking-tight break-words"
            >
              {resolvedTitle}
            </h2>
            {resolvedMessage && (
              <p
                id="momentum-dialog-desc"
                className={`mt-1.5 text-xs sm:text-sm leading-relaxed break-words ${
                  isDark ? 'text-slate-300/90' : 'text-slate-600'
                }`}
              >
                {resolvedMessage}
              </p>
            )}
          </div>

          {/* Dismiss button on desktop */}
          {!isMobile && (
            <button
              type="button"
              onClick={handleCancelAction}
              aria-label={resolvedCancelLabel}
              className={`p-1.5 rounded-xl transition-colors cursor-pointer shrink-0 ${
                isDark
                  ? 'text-slate-400 hover:text-white hover:bg-white/10'
                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Prompt Input Field (When type === 'prompt') */}
        {type === 'prompt' && (
          <div className="mb-5 mt-2">
            <input
              ref={inputRef}
              type={inputType}
              value={promptVal}
              onChange={(e) => setPromptVal(e.target.value)}
              placeholder={resolvedPlaceholder}
              data-testid="momentum-dialog-prompt-input"
              className={`w-full px-4 py-3 rounded-2xl text-sm font-medium outline-none transition-all ${
                isDark
                  ? 'bg-slate-800/80 border border-white/15 text-white placeholder-slate-500 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20'
                  : 'bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
              }`}
            />
          </div>
        )}

        {/* Action Buttons */}
        <div
          className={`flex gap-3 pt-2 ${
            isMobile ? 'flex-col-reverse' : 'flex-row justify-end'
          }`}
        >
          {/* Cancel / Secondary Action */}
          <button
            ref={cancelBtnRef}
            type="button"
            data-testid="momentum-dialog-cancel-btn"
            onClick={handleCancelAction}
            className={`px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
              isMobile ? 'w-full py-3' : ''
            } ${
              isDark
                ? 'bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10 active:bg-white/5'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 active:bg-slate-150'
            }`}
          >
            {resolvedCancelLabel}
          </button>

          {/* Confirm / Primary Action */}
          <button
            ref={confirmBtnRef}
            type="button"
            data-testid="momentum-dialog-confirm-btn"
            onClick={() => {
              if (type === 'prompt') {
                handleConfirmAction(promptVal);
              } else {
                handleConfirmAction(true);
              }
            }}
            className={`px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all cursor-pointer active:scale-[0.98] ${
              isMobile ? 'w-full py-3' : ''
            } ${variantTokens.confirmBtn}`}
          >
            {resolvedConfirmLabel}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
