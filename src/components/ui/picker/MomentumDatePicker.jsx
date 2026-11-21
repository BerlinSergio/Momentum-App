import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, X, Check } from 'lucide-react';
import useNavigationStore from '../../../store/useNavigationStore';
import { getLocalDateKey, getNow } from '../../../utils/timeService';
import { useTranslation } from 'react-i18next';
import { useLocaleStore } from '../../../store/useLocaleStore';

const WEEKDAYS_MAP = {
  en: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  'ps-AF': ['ات', 'دو', 'در', 'څل', 'پن', 'جم', 'شن'],
  'fa-AF': ['یک', 'دو', 'سه', 'چهار', 'پنج', 'جم', 'شن'],
};

const MONTH_NAMES_MAP = {
  en: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ],
  'ps-AF': [
    'جنوري', 'فبروري', 'مارچ', 'اپریل', 'می', 'جون',
    'جولای', 'اګست', 'سپتمبر', 'اکتوبر', 'نومبر', 'دسمبر'
  ],
  'fa-AF': [
    'جنوری', 'فبروری', 'مارچ', 'اپریل', 'می', 'جون',
    'جولای', 'اگست', 'سپتمبر', 'اکتوبر', 'نوامبر', 'دسمبر'
  ],
};

/**
 * Universal Momentum Date Picker Modal
 * Standardized date picker providing a polished, responsive, accessible
 * calendar grid experience across Mobile, Tablet, and Desktop.
 */
export default function MomentumDatePicker({
  isOpen,
  onClose,
  value,
  onSelect,
  onChange,
  title: propTitle,
  minDate,
  maxDate,
  isDark: propIsDark,
}) {
  const { t } = useTranslation();
  const currentLocale = useLocaleStore((s) => s.currentLocale);
  const title = propTitle || t('pickers.selectDate');
  const WEEKDAYS = WEEKDAYS_MAP[currentLocale] || WEEKDAYS_MAP.en;
  const MONTH_NAMES = MONTH_NAMES_MAP[currentLocale] || MONTH_NAMES_MAP.en;
  const shouldReduceMotion = useReducedMotion();
  const activeTab = useNavigationStore((s) => s.activeTab) || '';
  const isDark = typeof propIsDark === 'boolean'
    ? propIsDark
    : activeTab.toLowerCase().includes('dark') || !activeTab.toLowerCase().includes('light');

  // Normalize incoming value to canonical YYYY-MM-DD
  const parseCanonicalDate = (val) => {
    if (!val) return getLocalDateKey(getNow());
    const str = String(val).trim().slice(0, 10);
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
      return str;
    }
    const d = new Date(val);
    if (!isNaN(d.getTime())) {
      return getLocalDateKey(d);
    }
    return getLocalDateKey(getNow());
  };

  const initialDate = useMemo(() => parseCanonicalDate(value), [value]);

  const [draftDate, setDraftDate] = useState(initialDate);
  const [viewYear, setViewYear] = useState(() => parseInt(initialDate.slice(0, 4), 10));
  const [viewMonth, setViewMonth] = useState(() => parseInt(initialDate.slice(5, 7), 10) - 1);

  // Sync state whenever modal opens or value changes
  useEffect(() => {
    if (isOpen) {
      const parsed = parseCanonicalDate(value);
      setDraftDate(parsed);
      setViewYear(parseInt(parsed.slice(0, 4), 10));
      setViewMonth(parseInt(parsed.slice(5, 7), 10) - 1);
    }
  }, [isOpen, value]);

  // Keyboard Escape listener
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

  // Compute calendar days for current viewMonth & viewYear
  const calendarDays = useMemo(() => {
    const days = [];
    const firstDayIndex = new Date(Date.UTC(viewYear, viewMonth, 1)).getUTCDay();
    const daysInCurrentMonth = new Date(Date.UTC(viewYear, viewMonth + 1, 0)).getUTCDate();
    const daysInPrevMonth = new Date(Date.UTC(viewYear, viewMonth, 0)).getUTCDate();

    // Previous month padding
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const prevMonth = viewMonth === 0 ? 11 : viewMonth - 1;
      const prevYear = viewMonth === 0 ? viewYear - 1 : viewYear;
      const key = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      days.push({ day, key, isCurrentMonth: false, year: prevYear, month: prevMonth });
    }

    // Current month days
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      const key = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      days.push({ day: i, key, isCurrentMonth: true, year: viewYear, month: viewMonth });
    }

    // Next month padding to fill a complete 35 or 42 grid
    const remaining = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
      const nextMonth = viewMonth === 11 ? 0 : viewMonth + 1;
      const nextYear = viewMonth === 11 ? viewYear + 1 : viewYear;
      const key = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      days.push({ day: i, key, isCurrentMonth: false, year: nextYear, month: nextMonth });
    }

    return days;
  }, [viewYear, viewMonth]);

  const todayKey = useMemo(() => getLocalDateKey(getNow()), []);

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleSelectDay = (key, year, month) => {
    if (minDate && key < minDate) return;
    if (maxDate && key > maxDate) return;
    setDraftDate(key);
    if (year !== viewYear || month !== viewMonth) {
      setViewYear(year);
      setViewMonth(month);
    }
  };

  const handleTodayClick = () => {
    setDraftDate(todayKey);
    setViewYear(parseInt(todayKey.slice(0, 4), 10));
    setViewMonth(parseInt(todayKey.slice(5, 7), 10) - 1);
  };

  const handleConfirm = () => {
    if (onSelect) {
      onSelect(draftDate);
    }
    if (onChange) {
      onChange(draftDate);
    }
    onClose();
  };

  // Formatted human-readable preview of selected draft date
  const displayPreview = useMemo(() => {
    if (!draftDate) return '';
    try {
      const [y, m, d] = draftDate.split('-').map(Number);
      const dt = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
      return dt.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
      });
    } catch {
      return draftDate;
    }
  }, [draftDate]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end sm:justify-center items-center pointer-events-auto select-none p-0 sm:p-4 font-sans">
          {/* Backdrop */}
          <motion.div
            key="datepicker-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal / Bottom Sheet Panel */}
          <motion.div
            key="datepicker-panel"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            data-testid="momentum-date-picker-modal"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className={`relative z-10 w-full max-w-sm rounded-t-[2.5rem] sm:rounded-3xl p-5 shadow-2xl border transition-colors ${
              isDark
                ? 'bg-slate-900/95 backdrop-blur-2xl border-white/10 text-white shadow-black/60'
                : 'bg-white/95 backdrop-blur-2xl border-slate-200/90 text-slate-900 shadow-slate-900/20'
            }`}
            style={{
              paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))',
            }}
          >
            {/* Grab Handle for Mobile */}
            <div className="sm:hidden flex justify-center mb-2">
              <div className={`w-12 h-1.5 rounded-full ${isDark ? 'bg-slate-700/80' : 'bg-slate-300'}`} />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  isDark ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'
                }`}>
                  <CalendarIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight">{title}</h3>
                  <p className={`text-[11px] font-medium ${isDark ? 'text-primary' : 'text-primary font-semibold'}`}>
                    {displayPreview}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={t('pickers.closeDatePicker')}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Month / Year Navigator */}
            <div className="flex items-center justify-between py-3">
              <button
                type="button"
                onClick={handlePrevMonth}
                aria-label={t('pickers.previousMonth')}
                className={`p-1.5 rounded-xl border transition-colors cursor-pointer active:scale-95 ${
                  isDark
                    ? 'border-white/10 hover:bg-white/5 text-slate-300'
                    : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
              </button>

              <div className="flex items-center gap-1.5 font-bold text-xs">
                <span>{MONTH_NAMES[viewMonth]}</span>
                <span>{viewYear}</span>
              </div>

              <button
                type="button"
                onClick={handleNextMonth}
                aria-label={t('pickers.nextMonth')}
                className={`p-1.5 rounded-xl border transition-colors cursor-pointer active:scale-95 ${
                  isDark
                    ? 'border-white/10 hover:bg-white/5 text-slate-300'
                    : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>

            {/* Weekday Labels */}
            <div className="grid grid-cols-7 gap-1 text-center mb-1">
              {WEEKDAYS.map((wd) => (
                <span
                  key={wd}
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    isDark ? 'text-slate-500' : 'text-slate-400'
                  }`}
                >
                  {wd}
                </span>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map(({ day, key, isCurrentMonth, year, month }) => {
                const isSelected = key === draftDate;
                const isCurrentToday = key === todayKey;
                const isDisabled = (minDate && key < minDate) || (maxDate && key > maxDate);

                return (
                  <button
                    key={key}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => handleSelectDay(key, year, month)}
                    aria-label={`Select ${key}`}
                    aria-selected={isSelected}
                    className={`h-9 w-full rounded-xl text-xs font-semibold flex flex-col items-center justify-center relative transition-all active:scale-90 cursor-pointer ${
                      isSelected
                        ? 'bg-primary text-white font-bold shadow-md shadow-primary/30 z-10'
                        : isCurrentMonth
                        ? isDark
                          ? 'text-white hover:bg-white/10'
                          : 'text-slate-800 hover:bg-slate-100'
                        : isDark
                        ? 'text-slate-600 hover:text-slate-400'
                        : 'text-slate-300 hover:text-slate-500'
                    } ${isDisabled ? 'opacity-25 cursor-not-allowed pointer-events-none' : ''}`}
                  >
                    <span>{day}</span>
                    {isCurrentToday && !isSelected && (
                      <span className="w-1 h-1 rounded-full bg-primary absolute bottom-1" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-4 mt-2 border-t border-white/10 dark:border-white/10 gap-2">
              <button
                type="button"
                data-testid="date-picker-today-btn"
                onClick={handleTodayClick}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer active:scale-95 ${
                  isDark
                    ? 'text-slate-400 hover:text-white hover:bg-white/5'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {t('common.today')}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  data-testid="date-picker-cancel-btn"
                  onClick={onClose}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer active:scale-95 ${
                    isDark
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="button"
                  data-testid="date-picker-confirm-btn"
                  onClick={handleConfirm}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-primary text-white shadow-md shadow-primary/30 hover:bg-primary-hover active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{t('common.apply')}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
