import {useLocaleStore} from '../store/useLocaleStore.js';
import {displayDigits,formatHomeDate} from '../i18n/displayDate.js';
import { useMemo } from 'react';
import { useTimeStore } from '../store/useTimeStore';
import {
  formatDate,
  formatTime,
  isToday as checkIsToday,
  isTomorrow as checkIsTomorrow,
  isYesterday as checkIsYesterday,
  isPastDate as checkIsPastDate,
  addCalendarDays,
  getCalendarDaysDiff,
  formatUtcOffset,
  getTimezoneDisplayLabel,
  getNow,
} from '../utils/timeService';

/**
 * Custom React hook for unified access to Momentum's synchronized time system.
 * Avoids unnecessary second-by-second re-renders while guaranteeing accurate civil dates,
 * timezone reactivity, and midnight rollovers.
 */
export function useAppTime() {
  const locale=useLocaleStore(s=>s.currentLocale);
  const numberSystem=useLocaleStore(s=>s.numberSystem);
  const effectiveTimezone = useTimeStore((s) => s.effectiveTimezone);
  const timezoneMode = useTimeStore((s) => s.timezoneMode);
  const manualTimezone = useTimeStore((s) => s.manualTimezone);
  const currentDateKey = useTimeStore((s) => s.currentDateKey);
  const currentMonthKey = useTimeStore((s) => s.currentMonthKey);
  const currentYear = useTimeStore((s) => s.currentYear);
  const currentMonth = useTimeStore((s) => s.currentMonth);
  const currentDay = useTimeStore((s) => s.currentDay);
  const currentHour = useTimeStore((s) => s.currentHour);
  const currentMinute = useTimeStore((s) => s.currentMinute);
  const currentWeekday = useTimeStore((s) => s.currentWeekday);
  const dayEpoch = useTimeStore((s) => s.dayEpoch);
  const minuteEpoch = useTimeStore((s) => s.minuteEpoch);
  const timeFormat = useTimeStore((s) => s.timeFormat);

  const setTimezoneMode = useTimeStore((s) => s.setTimezoneMode);
  const setManualTimezone = useTimeStore((s) => s.setManualTimezone);
  const refreshTime = useTimeStore((s) => s.refreshTime);
  const setTimeFormat = useTimeStore((s) => s.setTimeFormat);

  const now = useMemo(() => {
    void minuteEpoch;
    void dayEpoch;
    return getNow();
  }, [minuteEpoch, dayEpoch]);

  const greeting = useMemo(() => {
    if (currentHour >= 5 && currentHour < 12) return 'Good morning';
    if (currentHour >= 12 && currentHour < 17) return 'Good afternoon';
    if (currentHour >= 17 && currentHour < 21) return 'Good evening';
    return 'Good night';
  }, [currentHour]);

  const formattedDate = useMemo(() => {
    return formatHomeDate(now,locale,numberSystem,effectiveTimezone);
  }, [now,effectiveTimezone,locale,numberSystem]);

  const formattedTime = useMemo(() => {
    return displayDigits(formatTime(now,timeFormat==='24h',effectiveTimezone),numberSystem);
  }, [now,timeFormat,effectiveTimezone,numberSystem]);

  const timezoneLabel = useMemo(() => {
    return getTimezoneDisplayLabel(effectiveTimezone, now);
  }, [effectiveTimezone, now]);

  const utcOffset = useMemo(() => {
    return formatUtcOffset(effectiveTimezone, now);
  }, [effectiveTimezone, now]);

  return {
    now,
    effectiveTimezone,
    timezoneMode,
    manualTimezone,
    currentDateKey,
    currentMonthKey,
    currentYear,
    currentMonth,
    currentDay,
    currentHour,
    currentMinute,
    currentWeekday,
    dayEpoch,
    minuteEpoch,
    timeFormat,
    greeting,
    formattedDate,
    formattedTime,
    timezoneLabel,
    utcOffset,
    setTimezoneMode,
    setManualTimezone,
    refreshTime,
    setTimeFormat,
    isToday: (target) => checkIsToday(target, effectiveTimezone),
    isTomorrow: (target) => checkIsTomorrow(target, effectiveTimezone),
    isYesterday: (target) => checkIsYesterday(target, effectiveTimezone),
    isPastDate: (target) => checkIsPastDate(target, effectiveTimezone),
    addDays: (dateKey, amount) => addCalendarDays(dateKey, amount),
    getDaysDiff: (k1, k2) => getCalendarDaysDiff(k1, k2),
  };
}
