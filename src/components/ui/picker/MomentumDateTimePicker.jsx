import { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, X, Check, ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import useNavigationStore from '../../../store/useNavigationStore';
import { getLocalDateKey, getLocalDateParts, getNow } from '../../../utils/timeService';
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
 * Universal Momentum Combined Date & Time Picker Modal
 * Combines date calendar grid and time steppers into a cohesive tabbed dialog.
 */
export default function MomentumDateTimePicker({
  isOpen,
  onClose,
  value,
  onSelect,
  onChange,
  title: propTitle,
  isDark: propIsDark,
}) {
  const { t } = useTranslation();
  const currentLocale = useLocaleStore((s) => s.currentLocale);
  const title = propTitle || t('pickers.pickDateTime');
  const WEEKDAYS = WEEKDAYS_MAP[currentLocale] || WEEKDAYS_MAP.en;
  const MONTH_NAMES = MONTH_NAMES_MAP[currentLocale] || MONTH_NAMES_MAP.en;
  const shouldReduceMotion = useReducedMotion();
  const activeTab = useNavigationStore((s) => s.activeTab) || '';
  const isDark = typeof propIsDark === 'boolean'
    ? propIsDark
    : activeTab.toLowerCase().includes('dark') || !activeTab.toLowerCase().includes('light');

  // Parse incoming value (can be "YYYY-MM-DDTHH:mm" or "YYYY-MM-DD HH:mm")
  const parseInitial = (val) => {
    const now = getNow();
    const nowParts = getLocalDateParts(now);
    const defaultDate = getLocalDateKey(now);
    const defaultTime = `${String(nowParts.hour12).padStart(2, '0')}:${String(nowParts.minutes).padStart(2, '0')} ${nowParts.isPM ? 'PM' : 'AM'}`;

    if (!val || typeof val !== 'string') {
      return {
        date: defaultDate,
        hour: nowParts.hour12,
        minute: nowParts.minutes,
        period: nowParts.isPM ? 'PM' : 'AM',
      };
    }

    const str = val.trim();
    // Split date and time by T or space
    const parts = str.split(/[T ]/);
    const datePart = parts[0] && /^\d{4}-\d{2}-\d{2}$/.test(parts[0]) ? parts[0] : defaultDate;

    let hour = nowParts.hour12;
    let minute = nowParts.minutes;
    let period = nowParts.isPM ? 'PM' : 'AM';

    if (parts[1]) {
      const timeMatch = parts[1].match(/^(\d{1,2}):(\d{2})/);
      if (timeMatch) {
        let h = parseInt(timeMatch[1], 10);
        minute = parseInt(timeMatch[2], 10);
        if (h >= 12) {
          period = 'PM';
          hour = h > 12 ? h - 12 : 12;
        } else {
          period = 'AM';
          hour = h === 0 ? 12 : h;
        }
      }
    }

    return { date: datePart, hour, minute, period };
  };

  const parsed = useMemo(() => parseInitial(value), [value]);

  const [activeSubTab, setActiveSubTab] = useState('date'); // 'date' | 'time'
  const [draftDate, setDraftDate] = useState(parsed.date);
  const [draftHour, setDraftHour] = useState(parsed.hour);
  const [draftMinute, setDraftMinute] = useState(parsed.minute);
  const [draftPeriod, setDraftPeriod] = useState(parsed.period);

  const [viewYear, setViewYear] = useState(() => parseInt(parsed.date.slice(0, 4), 10));
  const [viewMonth, setViewMonth] = useState(() => parseInt(parsed.date.slice(5, 7), 10) - 1);

  // Sync state whenever modal opens or value changes
  useEffect(() => {
    if (isOpen) {
      const p = parseInitial(value);
      setDraftDate(p.date);
      setDraftHour(p.hour);
      setDraftMinute(p.minute);
      setDraftPeriod(p.period);
      setViewYear(parseInt(p.date.slice(0, 4), 10));
      setViewMonth(parseInt(p.date.slice(5, 7), 10) - 1);
      setActiveSubTab('date');
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

  // Calendar calculations
  const calendarDays = useMemo(() => {
    const days = [];
    const firstDayIndex = new Date(Date.UTC(viewYear, viewMonth, 1)).getUTCDay();
    const daysInCurrentMonth = new Date(Date.UTC(viewYear, viewMonth + 1, 0)).getUTCDate();
    const daysInPrevMonth = new Date(Date.UTC(viewYear, viewMonth, 0)).getUTCDate();

    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const prevMonth = viewMonth === 0 ? 11 : viewMonth - 1;
      const prevYear = viewMonth === 0 ? viewYear - 1 : viewYear;
      const key = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      days.push({ day, key, isCurrentMonth: false, year: prevYear, month: prevMonth });
    }

    for (let i = 1; i <= daysInCurrentMonth; i++) {
      const key = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      days.push({ day: i, key, isCurrentMonth: true, year: viewYear, month: viewMonth });
    }

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

  const handleConfirm = () => {
    let h24 = Math.max(1, Math.min(12, Number(draftHour) || 1));
    if (draftPeriod === 'PM' && h24 < 12) h24 += 12;
    if (draftPeriod === 'AM' && h24 === 12) h24 = 0;
    const h24Pad = String(h24).padStart(2, '0');
    const mPad = String(Math.max(0, Math.min(59, Number(draftMinute) || 0))).padStart(2, '0');
    const isoDateTime = `${draftDate}T${h24Pad}:${mPad}`;

    if (onSelect) {
      onSelect(isoDateTime);
    }
    if (onChange) {
      onChange(isoDateTime);
    }
    onClose();
  };

  const displayPreview = useMemo(() => {
    const h12Pad = String(draftHour).padStart(2, '0');
    const mPad = String(draftMinute).padStart(2, '0');
    return `${draftDate} at ${h12Pad}:${mPad} ${draftPeriod}`;
  }, [draftDate, draftHour, draftMinute, draftPeriod]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="momentum-picker-overlay flex flex-col justify-end sm:justify-center items-center pointer-events-auto select-none p-0 sm:p-4 font-sans">
          {/* Backdrop */}
          <motion.div
            key="datetimepicker-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal / Bottom Sheet Panel */}
          <motion.div
            key="datetimepicker-panel"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            data-testid="momentum-datetime-picker-modal"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className={`momentum-picker-panel relative z-10 w-full max-w-sm rounded-t-[2.5rem] sm:rounded-3xl p-5 shadow-2xl border transition-colors ${
              isDark
                ? 'bg-slate-900/95 backdrop-blur-2xl border-white/10 text-white shadow-black/60'
                : 'bg-white/95 backdrop-blur-2xl border-slate-200/90 text-slate-900 shadow-slate-900/20'
            }`}
            style={{
              paddingBottom: 'calc(1.25rem + var(--momentum-inset-bottom, 0px))',
            }}
          >
            {/* Grab Handle for Mobile */}
            <div className="sm:hidden flex justify-center mb-2">
              <div className={`w-12 h-1.5 rounded-full ${isDark ? 'bg-slate-700/80' : 'bg-slate-300'}`} />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 dark:border-white/10">
              <div>
                <h3 className="text-sm font-bold tracking-tight">{title}</h3>
                <p className="text-[11px] font-medium text-primary mt-0.5">
                  {displayPreview}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close Date & Time Picker"
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Segmented Mode Selector: [ Date ] [ Time ] */}
            <div className="flex rounded-xl p-1 mt-3 mb-2 bg-black/20 dark:bg-black/20 border border-white/5">
              <button
                type="button"
                data-testid="dt-tab-date"
                onClick={() => setActiveSubTab('date')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeSubTab === 'date'
                    ? 'bg-primary text-white shadow-sm'
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>{t('common.date', 'Date')}</span>
</button>
<button type="button"
                data-testid="dt-tab-time"
                onClick={() => setActiveSubTab('time')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeSubTab === 'time'
                    ? 'bg-primary text-white shadow-sm'
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{t('common.time', 'Time')}</span>
              </button>
            </div>

            {/* Tab 1: Date View */}
            {activeSubTab === 'date' && (
              <div>
                {/* Month / Year Navigator */}
                <div className="flex items-center justify-between py-2">
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    aria-label="Previous Month"
                    className={`p-1.5 rounded-xl border transition-colors cursor-pointer active:scale-95 ${
                      isDark ? 'border-white/10 hover:bg-white/5 text-slate-300' : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    <span>{MONTH_NAMES[viewMonth]}</span>
                    <span>{viewYear}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleNextMonth}
                    aria-label="Next Month"
                    className={`p-1.5 rounded-xl border transition-colors cursor-pointer active:scale-95 ${
                      isDark ? 'border-white/10 hover:bg-white/5 text-slate-300' : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Weekday Labels */}
                <div className="grid grid-cols-7 gap-1 text-center mb-1">
                  {WEEKDAYS.map((wd) => (
                    <span key={wd} className="text-[10px] font-bold uppercase text-slate-400">
                      {wd}
                    </span>
                  ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map(({ day, key, isCurrentMonth, year, month }) => {
                    const isSelected = key === draftDate;
                    const isCurrentToday = key === todayKey;

                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          setDraftDate(key);
                          if (year !== viewYear || month !== viewMonth) {
                            setViewYear(year);
                            setViewMonth(month);
                          }
                        }}
                        aria-label={`Select ${key}`}
                        aria-selected={isSelected}
                        className={`h-8 w-full rounded-xl text-xs font-semibold flex flex-col items-center justify-center relative transition-all active:scale-90 cursor-pointer ${
                          isSelected
                            ? 'bg-primary text-white font-bold shadow-md shadow-primary/30 z-10'
                            : isCurrentMonth
                            ? isDark ? 'text-white hover:bg-white/10' : 'text-slate-800 hover:bg-slate-100'
                            : isDark ? 'text-slate-600' : 'text-slate-300'
                        }`}
                      >
                        <span>{day}</span>
                        {isCurrentToday && !isSelected && (
                          <span className="w-1 h-1 rounded-full bg-primary absolute bottom-1" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 2: Time View */}
            {activeSubTab === 'time' && (
              <div className="py-4 flex items-center justify-center gap-3">
                {/* Hour Stepper */}
                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    data-testid="time-hour-increment"
                    onClick={() => setDraftHour((h) => (h === 12 ? 1 : h + 1))}
                    aria-label="Increment Hour"
                    className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300"
                  >
                    <ChevronUp className="w-5 h-5" />
                  </button>
                  <div className={`w-16 h-14 rounded-2xl flex items-center justify-center border text-2xl font-extrabold ${
                    isDark ? 'bg-black/30 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}>
                    {String(draftHour).padStart(2, '0')}
                  </div>
                  <button
                    type="button"
                    data-testid="time-hour-decrement"
                    onClick={() => setDraftHour((h) => (h === 1 ? 12 : h - 1))}
                    aria-label="Decrement Hour"
                    className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </button>
                  <span className="text-[10px] uppercase font-bold text-slate-400 mt-1">{t('pickers.hours', 'Hours')}</span>
                </div>

                <span className="text-xl font-bold text-slate-400 -mt-5">:</span>

                {/* Minute Stepper */}
                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    data-testid="time-minute-increment"
                    onClick={() => setDraftMinute((m) => (m + 5) % 60)}
                    aria-label="Increment Minute"
                    className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300"
                  >
                    <ChevronUp className="w-5 h-5" />
                  </button>
                  <div className={`w-16 h-14 rounded-2xl flex items-center justify-center border text-2xl font-extrabold ${
                    isDark ? 'bg-black/30 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}>
                    {String(draftMinute).padStart(2, '0')}
                  </div>
                  <button
                    type="button"
                    data-testid="time-minute-decrement"
                    onClick={() => setDraftMinute((m) => (m - 5 + 60) % 60)}
                    aria-label="Decrement Minute"
                    className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </button>
                  <span className="text-[10px] uppercase font-bold text-slate-400 mt-1">{t('pickers.minutes', 'Minutes')}</span>
                </div>

                {/* Period Stepper (AM / PM) */}
                <div className="flex flex-col gap-2 -mt-4 pl-1">
                  {['AM', 'PM'].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setDraftPeriod(p)}
                      aria-label={`Select ${p}`}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                        draftPeriod === p
                          ? 'bg-primary text-white shadow-md shadow-primary/30 border border-primary'
                          : isDark
                          ? 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Actions */}
            <div className="flex items-center justify-end pt-4 mt-2 border-t border-white/10 dark:border-white/10 gap-2">
              <button
                type="button"
                onClick={onClose}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer active:scale-95 ${
                  isDark
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {t('common.cancel', 'Cancel')}
              </button>
              <button
                type="button"
                data-testid="dt-picker-confirm-btn"
                onClick={handleConfirm}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-primary text-white shadow-md shadow-primary/30 hover:bg-primary-hover active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{t('common.apply', 'Apply')}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>, document.body
  );
}
