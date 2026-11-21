import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  CheckSquare,
  CreditCard,
  TrendingUp,
  Clock,
  Sparkles,
  X,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function QuickActionsSheet({
  isOpen,
  onClose,
  onSelectAction,
  isDark = true,
}) {
  const { t } = useTranslation();

  const actions = useMemo(() => [
    {
      id: 'new_note',
      title: t('quickActions.newNote', 'New Note'),
      subtitle: t('quickActions.newNoteSub', 'Quick thought or list'),
      icon: FileText,
      colorDark: 'text-indigo-400 bg-indigo-500/15 border-indigo-500/30',
      colorLight: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    },
    {
      id: 'add_task',
      title: t('quickActions.newTask', 'New Task'),
      subtitle: t('quickActions.newTaskSub', 'Todo with deadline'),
      icon: CheckSquare,
      colorDark: 'text-violet-400 bg-violet-500/15 border-violet-500/30',
      colorLight: 'text-violet-600 bg-violet-50 border-violet-200',
    },
    {
      id: 'add_expense',
      title: t('quickActions.logExpense', 'Log Expense'),
      subtitle: t('quickActions.logExpenseSub', 'Cash or card outflow'),
      icon: CreditCard,
      colorDark: 'text-rose-400 bg-rose-500/15 border-rose-500/30',
      colorLight: 'text-rose-600 bg-rose-50 border-rose-200',
    },
    {
      id: 'add_income',
      title: t('quickActions.addIncome', 'Add Income'),
      subtitle: t('quickActions.addIncomeSub', 'Deposit or salary inflow'),
      icon: TrendingUp,
      colorDark: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30',
      colorLight: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
    {
      id: 'add_routine',
      title: t('quickActions.newRoutine', 'New Routine'),
      subtitle: t('quickActions.newRoutineSub', 'Daily habit & block'),
      icon: Clock,
      colorDark: 'text-sky-400 bg-sky-500/15 border-sky-500/30',
      colorLight: 'text-sky-600 bg-sky-50 border-sky-200',
    },
    {
      id: 'new_tasbeeh',
      title: t('quickActions.newTasbeeh', 'New Tasbeeh'),
      subtitle: t('quickActions.newTasbeehSub', 'Custom dhikr counter'),
      icon: Sparkles,
      colorDark: 'text-amber-400 bg-amber-500/15 border-amber-500/30',
      colorLight: 'text-amber-600 bg-amber-50 border-amber-200',
    },
  ], [t]);

  // Listen for Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          data-testid="quick-actions-portal-root"
          className="fixed inset-0 z-[120] flex flex-col justify-end lg:justify-center lg:items-center pointer-events-auto select-none p-0 lg:p-6"
        >
          {/* Blurred Backdrop */}
          <motion.div
            key="quick-actions-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
          />

          {/* Modal / Sheet Panel */}
          <motion.div
            key="quick-actions-panel"
            initial={{ y: '100%', opacity: 0.8, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: '100%', opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            role="dialog"
            aria-modal="true"
            aria-label={t('quickActions.title', 'Quick Actions')}
            style={{
              background: isDark ? 'rgba(16, 22, 44, 0.88)' : 'rgba(255, 255, 255, 0.88)',
              backdropFilter: isDark ? 'blur(24px) saturate(140%)' : 'blur(24px) saturate(145%)',
              WebkitBackdropFilter: isDark ? 'blur(24px) saturate(140%)' : 'blur(24px) saturate(145%)',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(255, 255, 255, 0.7)',
              boxShadow: isDark ? '0 25px 60px rgba(0, 0, 0, 0.5)' : '0 25px 60px rgba(0, 0, 0, 0.12)',
            }}
            className={`relative z-10 w-full max-w-full lg:max-w-[520px] rounded-t-[2.5rem] lg:rounded-[28px] p-5 lg:p-6 pb-8 lg:pb-6 pb-safe font-sans ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {/* Grab Handle (Visible on mobile, hidden on desktop) */}
            <div className="flex justify-center mb-3 lg:hidden">
              <div
                className={`w-12 h-1.5 rounded-full ${
                  isDark ? 'bg-slate-700/80' : 'bg-slate-300'
                }`}
              />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-1 mb-4 lg:mb-5">
              <div>
                <h3 className="text-base lg:text-lg font-bold tracking-tight">
                  {t('quickActions.title', 'Quick Actions')}
                </h3>
                <p
                  className={`text-xs mt-0.5 ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  {t('quickActions.subtitle', 'Create or record something new')}
                </p>
              </div>
              <button
                type="button"
                data-testid="quick-actions-close-btn"
                onClick={onClose}
                aria-label={t('common.close', 'Close')}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer active:scale-95 ${
                  isDark
                    ? 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Actions Grid */}
            <div className="grid grid-cols-2 gap-3 lg:gap-3.5">
              {actions.map((action) => {
                const IconComponent = action.icon;
                const badgeColor = isDark ? action.colorDark : action.colorLight;

                return (
                  <button
                    key={action.id}
                    type="button"
                    data-testid={`quick-action-item-${action.id}`}
                    onClick={() => {
                      onClose();
                      onSelectAction(action.id);
                    }}
                    className={`p-3.5 lg:p-4 rounded-2xl flex flex-col text-left rtl:text-right gap-2.5 border transition-all duration-150 cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
                      isDark
                        ? 'bg-white/5 hover:bg-white/10 border-white/10 shadow-lg shadow-black/20'
                        : 'bg-slate-50/80 hover:bg-white border-slate-200/80 shadow-sm'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 lg:w-11 lg:h-11 rounded-xl flex items-center justify-center border shadow-xs ${badgeColor}`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="w-full min-w-0">
                      <span
                        className={`text-xs lg:text-sm font-bold block truncate ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {action.title}
                      </span>
                      <span
                        className={`text-[11px] block leading-tight mt-0.5 whitespace-normal break-words line-clamp-2 ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {action.subtitle}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
