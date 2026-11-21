import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Clock, X, Check, ChevronUp, ChevronDown } from 'lucide-react';
import useNavigationStore from '../../../store/useNavigationStore';
import { getLocalDateParts, getNow } from '../../../utils/timeService';
import { useTranslation } from 'react-i18next';

export default function MomentumTimePicker({
  isOpen,
  onClose,
  value,
  onSelect,
  onChange,
  title: propTitle,
  isDark: propIsDark,
  outputFormat = 'auto', // 'auto' (mirrors input format) | '12h' | '24h'
}) {
  const { t } = useTranslation();
  const title = propTitle || t('pickers.selectTime');

  const TIME_PRESETS = useMemo(() => [
    { label: t('home.morning', { defaultValue: 'Morning' }), time: '08:00 AM' },
    { label: t('prayer.dhuhr', { defaultValue: 'Noon' }), time: '12:00 PM' },
    { label: t('home.afternoon', { defaultValue: 'Afternoon' }), time: '03:00 PM' },
    { label: t('home.evening', { defaultValue: 'Evening' }), time: '06:00 PM' },
    { label: t('home.night', { defaultValue: 'Night' }), time: '08:30 PM' },
  ], [t]);
  const shouldReduceMotion = useReducedMotion();
  const activeTab = useNavigationStore((s) => s.activeTab) || '';
  const isDark = typeof propIsDark === 'boolean'
    ? propIsDark
    : activeTab.toLowerCase().includes('dark') || !activeTab.toLowerCase().includes('light');

  // Decompose any incoming time string into { hour12, minute, period, is24h }
  const parseTimeString = (val) => {
    const fallbackNow = () => {
      const parts = getLocalDateParts(getNow());
      return {
        hour12: parts.hour12,
        minute: parts.minutes,
        period: parts.isPM ? 'PM' : 'AM',
        is24h: false,
      };
    };

    if (!val || typeof val !== 'string') return fallbackNow();

    const str = val.trim();

    // 12-hour format: "08:30 PM" or "8:30am"
    const match12 = str.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
    if (match12) {
      let h = parseInt(match12[1], 10);
      const m = Math.min(59, Math.max(0, parseInt(match12[2], 10)));
      const p = match12[3] ? match12[3].toUpperCase() : (h >= 12 ? 'PM' : 'AM');
      const is24h = !match12[3] && h > 12;

      if (h > 12) {
        h = h % 12 || 12;
      } else if (h === 0) {
        h = 12;
      }

      return {
        hour12: h,
        minute: m,
        period: p,
        is24h,
      };
    }

    return fallbackNow();
  };

  const parsedInitial = useMemo(() => parseTimeString(value), [value]);

  const [hour, setHour] = useState(parsedInitial.hour12);
  const [minute, setMinute] = useState(parsedInitial.minute);
  const [period, setPeriod] = useState(parsedInitial.period);

  // Sync state whenever modal opens or value changes
  useEffect(() => {
    if (isOpen) {
      const parsed = parseTimeString(value);
      setHour(parsed.hour12);
      setMinute(parsed.minute);
      setPeriod(parsed.period);
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

  const handleHourStep = (delta) => {
    setHour((h) => {
      let next = h + delta;
      if (next > 12) next = 1;
      if (next < 1) next = 12;
      return next;
    });
  };

  const handleMinuteStep = (delta) => {
    setMinute((m) => {
      let next = (m + delta + 60) % 60;
      return next;
    });
  };

  const handlePresetSelect = (presetTime) => {
    const parsed = parseTimeString(presetTime);
    setHour(parsed.hour12);
    setMinute(parsed.minute);
    setPeriod(parsed.period);
  };

  const handleNowClick = () => {
    const parts = getLocalDateParts(getNow());
    setHour(parts.hour12);
    setMinute(parts.minutes);
    setPeriod(parts.isPM ? 'PM' : 'AM');
  };

  const handleConfirm = () => {
    const h12Pad = String(hour).padStart(2, '0');
    const mPad = String(minute).padStart(2, '0');

    // Determine target format
    let targetFormat = outputFormat;
    if (targetFormat === 'auto') {
      if (typeof value === 'string' && /^\d{2}:\d{2}$/.test(value.trim())) {
        targetFormat = '24h';
      } else {
        targetFormat = '12h';
      }
    }

    let resultString = '';
    if (targetFormat === '24h') {
      let h24 = hour;
      if (period === 'PM' && h24 < 12) h24 += 12;
      if (period === 'AM' && h24 === 12) h24 = 0;
      resultString = `${String(h24).padStart(2, '0')}:${mPad}`;
    } else {
      resultString = `${h12Pad}:${mPad} ${period}`;
    }

    if (onSelect) {
      onSelect(resultString);
    }
    if (onChange) {
      onChange(resultString);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end sm:justify-center items-center pointer-events-auto select-none p-0 sm:p-4 font-sans">
          {/* Backdrop */}
          <motion.div
            key="timepicker-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal / Bottom Sheet Panel */}
          <motion.div
            key="timepicker-panel"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            data-testid="momentum-time-picker-modal"
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
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight">{title}</h3>
                  <p className="text-[11px] font-medium text-primary">
                    {String(hour).padStart(2, '0')}:{String(minute).padStart(2, '0')} {period}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={t('pickers.closeTimePicker')}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Interactive Clock Stepper Columns */}
            <div className="py-5 flex items-center justify-center gap-3">
              {/* Hour Column */}
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  data-testid="time-hour-increment"
                  onClick={() => handleHourStep(1)}
                  aria-label={t('pickers.incrementHour')}
                  className={`p-2 rounded-xl transition-colors cursor-pointer active:scale-90 ${
                    isDark ? 'hover:bg-white/10 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <ChevronUp className="w-5 h-5" />
                </button>
                <div className={`w-18 h-16 rounded-2xl flex items-center justify-center border text-3xl font-extrabold tracking-tight ${
                  isDark ? 'bg-black/30 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}>
                  {String(hour).padStart(2, '0')}
                </div>
                <button
                  type="button"
                  data-testid="time-hour-decrement"
                  onClick={() => handleHourStep(-1)}
                  aria-label={t('pickers.decrementHour')}
                  className={`p-2 rounded-xl transition-colors cursor-pointer active:scale-90 ${
                    isDark ? 'hover:bg-white/10 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mt-1">{t('pickers.hours')}</span>
              </div>

              <span className="text-2xl font-bold text-slate-400 -mt-6">:</span>

              {/* Minute Column */}
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  data-testid="time-minute-increment"
                  onClick={() => handleMinuteStep(1)}
                  aria-label={t('pickers.incrementMinute')}
                  className={`p-2 rounded-xl transition-colors cursor-pointer active:scale-90 ${
                    isDark ? 'hover:bg-white/10 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <ChevronUp className="w-5 h-5" />
                </button>
                <div className={`w-18 h-16 rounded-2xl flex items-center justify-center border text-3xl font-extrabold tracking-tight ${
                  isDark ? 'bg-black/30 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}>
                  {String(minute).padStart(2, '0')}
                </div>
                <button
                  type="button"
                  data-testid="time-minute-decrement"
                  onClick={() => handleMinuteStep(-1)}
                  aria-label={t('pickers.decrementMinute')}
                  className={`p-2 rounded-xl transition-colors cursor-pointer active:scale-90 ${
                    isDark ? 'hover:bg-white/10 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mt-1">{t('pickers.minutes')}</span>
              </div>

              {/* AM/PM Column */}
              <div className="flex flex-col gap-2 -mt-4 pl-1">
                {['AM', 'PM'].map((p) => {
                  const isSelected = period === p;
                  return (
                    <button
                      key={p}
                      type="button"
                      data-testid="time-ampm-toggle"
                      onClick={() => setPeriod(p)}
                      aria-label={`Select ${p}`}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                        isSelected
                          ? 'bg-primary text-white shadow-md shadow-primary/30 border border-primary'
                          : isDark
                          ? 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Presets */}
            <div className="pt-2 pb-1 border-t border-white/10 dark:border-white/10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2 px-1">
                {t('pickers.quickShortcuts', 'Quick Shortcuts')}
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={handleNowClick}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer active:scale-95 ${
                    isDark
                      ? 'bg-primary/15 border-primary/30 text-primary hover:bg-primary/25'
                      : 'bg-primary/10 border-primary/20 text-primary hover:bg-primary/20'
                  }`}
                >
                  {t('pickers.now')}
                </button>
                {TIME_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handlePresetSelect(preset.time)}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer active:scale-95 ${
                      isDark
                        ? 'border-white/10 text-slate-300 hover:bg-white/5'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end pt-4 mt-2 border-t border-white/10 dark:border-white/10 gap-2">
              <button
                type="button"
                data-testid="time-picker-cancel-btn"
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
                data-testid="time-picker-confirm-btn"
                onClick={handleConfirm}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-primary text-white shadow-md shadow-primary/30 hover:bg-primary-hover active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{t('common.apply')}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
