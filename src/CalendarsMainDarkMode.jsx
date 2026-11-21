import { useTranslation } from 'react-i18next';
import { useState, useMemo } from 'react';
import UserAvatar from './components/UserAvatar';
import { Calendar, Bell, CheckSquare } from 'lucide-react';
import { getShamsiDate, getIslamicDateParts } from './utils/afghanCalendar';
import { useTaskStore } from './store/useTaskStore';
import { useLocationStore } from './store/useLocationStore';
import { useAppTime } from './hooks/useAppTime';
import { useNotificationStore } from './store/useNotificationStore';

const parseTimeToMinutes = (timeStr, estimateStr) => {
  if (!timeStr || typeof timeStr !== 'string') return null;
  const cleaned = timeStr.trim().toLowerCase();
  if (cleaned.includes('all day') || cleaned.includes('throughout')) {
    return { startMinutes: 0, endMinutes: 1440, isAllDay: true };
  }
  const match12 = cleaned.match(/^(\d{1,2}):(\d{2})\s*(am|pm)?$/i);
  if (match12) {
    let hours = parseInt(match12[1], 10);
    const minutes = parseInt(match12[2], 10);
    const period = match12[3];
    if (period) {
      if (period.toLowerCase() === 'pm' && hours < 12) hours += 12;
      if (period.toLowerCase() === 'am' && hours === 12) hours = 0;
    }
    const startMinutes = hours * 60 + minutes;
    let duration = 45;
    if (estimateStr) {
      const est = estimateStr.toLowerCase();
      if (est.includes('hour') || est.includes('hr')) {
        duration = Math.round((parseFloat(est) || 1) * 60);
      } else {
        const m = est.match(/(\d+)\s*min/);
        if (m) duration = parseInt(m[1], 10);
      }
    }
    return { startMinutes, endMinutes: Math.min(startMinutes + duration, 1440), isAllDay: false };
  }
  return null;
};

const getCategoryMeta = (category) => {
  const cat = (category || '').toLowerCase();
  if (cat.includes('spirit') || cat.includes('prayer') || cat.includes('deen')) {
    return { icon: 'bedtime', accent: 'secondary', badgeText: 'Spiritual • Daily Practice' };
  }
  if (cat.includes('work') || cat.includes('study') || cat.includes('biz')) {
    return { icon: 'business_center', accent: 'primary', badgeText: 'Work • Productivity' };
  }
  if (cat.includes('health') || cat.includes('fit')) {
    return { icon: 'fitness_center', accent: 'tertiary', badgeText: 'Health • Vitality' };
  }
  if (cat.includes('person') || cat.includes('home') || cat.includes('family')) {
    return { icon: 'nature_people', accent: 'primary', badgeText: 'Personal • Harmony' };
  }
  return { icon: 'calendar_today', accent: 'primary', badgeText: category || 'Daily Routine' };
};

export default function CalendarsMainDarkMode({ setActiveTab }) {
  const { t } = useTranslation();
  const {
    now,
    currentDateKey,
    currentYear,
    currentMonth,
    currentDay,
    currentHour,
    currentMinute,
    effectiveTimezone,
    formattedDate,
    formattedTime,
    refreshTime
  } = useAppTime();
  const [viewMode, setViewMode] = useState('Agenda');
  const { tasks, toggleTaskStatus } = useTaskStore();
  const selectedCity = useLocationStore((s) => s.selectedCity);
  const unreadNotifCount = useNotificationStore((s) => s.notifications?.filter((n) => !n.read).length || 0);

  const shamsiDate = useMemo(() => getShamsiDate(now, effectiveTimezone), [now, effectiveTimezone]);
  const islamicDate = useMemo(() => getIslamicDateParts(now, effectiveTimezone), [now, effectiveTimezone]);

  const userCityLabel = useMemo(() => {
    if (selectedCity?.name) return selectedCity.name;
    try {
      const tz = effectiveTimezone || Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kabul';
      const parts = tz.split('/');
      return parts[parts.length - 1].replace(/_/g, ' ') || 'Local Time';
    } catch {
      return 'Kabul';
    }
  }, [selectedCity, effectiveTimezone]);

  const todayIsoStr = currentDateKey;

  const currentMinutes = useMemo(() => {
    return currentHour * 60 + currentMinute;
  }, [currentHour, currentMinute]);

  const agendaTasks = useMemo(() => {
    const all = Array.isArray(tasks) ? tasks : [];
    const filtered = all.filter((t) => {
      if (!t.dueDate) return true;
      return t.dueDate === todayIsoStr || t.dueDate.startsWith(todayIsoStr);
    });

    const mapped = filtered.map((t) => {
      const parsed = parseTimeToMinutes(t.startTime, t.estimate);
      const meta = getCategoryMeta(t.category);
      return {
        id: t.id,
        title: t.title || 'Untitled Task',
        description: t.description || '',
        timeStr: t.startTime || 'All day',
        category: t.category || 'General',
        priority: t.priority || 'Medium',
        status: t.status || 'todo',
        completed: t.status === 'done',
        parsed,
        icon: meta.icon,
        accent: meta.accent,
        badgeText: meta.badgeText,
      };
    });

    mapped.sort((a, b) => {
      const aTime = a.parsed && !a.parsed.isAllDay ? a.parsed.startMinutes : 9999;
      const bTime = b.parsed && !b.parsed.isAllDay ? b.parsed.startMinutes : 9999;
      return aTime - bTime;
    });

    return mapped;
  }, [tasks, todayIsoStr]);

  const activeTask = useMemo(() => {
    return agendaTasks.find((item) => {
      if (!item.parsed || item.parsed.isAllDay) return false;
      return currentMinutes >= item.parsed.startMinutes && currentMinutes < item.parsed.endMinutes;
    });
  }, [agendaTasks, currentMinutes]);

  const upcomingTask = useMemo(() => {
    if (activeTask) {
      return agendaTasks.find((item) => {
        if (item.id === activeTask.id || item.completed) return false;
        if (!item.parsed || item.parsed.isAllDay) return false;
        return item.parsed.startMinutes >= activeTask.parsed.endMinutes;
      });
    }
    return agendaTasks.find((item) => {
      if (item.completed) return false;
      if (!item.parsed || item.parsed.isAllDay) return false;
      return item.parsed.startMinutes > currentMinutes;
    });
  }, [agendaTasks, activeTask, currentMinutes]);

  const weekDays = useMemo(() => {
    const days = [];
    const dayOfWeek = (now.getDay() + 1) % 7;
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - dayOfWeek);
    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      const isToday = d.toDateString() === now.toDateString();
      const isl = getIslamicDateParts(d, effectiveTimezone);
      const sh = getShamsiDate(d, effectiveTimezone);
      days.push({
        date: d,
        weekdayShort: d.toLocaleDateString('en-US', { weekday: 'short', timeZone: effectiveTimezone }),
        gregorianDay: d.getDate(),
        hijriDay: isl.hd,
        shamsiDay: sh.jd,
        isToday,
      });
    }
    return days;
  }, [now, effectiveTimezone]);

  const monthGridDays = useMemo(() => {
    const year = currentYear;
    const month = currentMonth - 1;
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < firstDayIndex; i++) {
      cells.push({ dayNumber: null, isCurrentMonth: false, isToday: false });
    }
    for (let d = 1; d <= totalDays; d++) {
      const isToday = d === currentDay;
      cells.push({ dayNumber: d, isCurrentMonth: true, isToday });
    }
    return cells;
  }, [currentYear, currentMonth, currentDay]);

  const handleOpenAddTask = () => {
    if (setActiveTab) {
      setActiveTab('add_edit_task_dark_mode');
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-transparent font-sans flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Top Header Bar */}
      <header className="sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex items-center justify-between px-5 pt-6 pb-2 pointer-events-auto shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-white tracking-tight" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>
            {t('calendar.calendarsAndTime', 'Calendars & Time')}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab && setActiveTab('notifications_settings_dark_mode')}
            aria-label="Notifications"
            className="relative p-2 rounded-full text-slate-400 hover:text-primary transition-colors cursor-pointer pointer-events-auto"
          >
            <Bell className="w-5 h-5"/>
            {unreadNotifCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-slate-900" />
            )}
          </button>
          <UserAvatar 
            setActiveTab={setActiveTab} 
          />
        </div>
      </header>

      {/* Main Scroll Container with Scroll Trap Fix */}
      <main className="flex-1 overflow-y-auto w-full px-margin pb-32 space-y-4">
        {/* Subtle Ambient Glow Orbs */}
        <div className="relative w-full">
          <div className="absolute -top-10 -left-6 w-52 h-52 bg-secondary-fixed/40 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute top-24 -right-8 w-60 h-60 bg-tertiary-fixed/30 rounded-full blur-3xl pointer-events-none"></div>

          {/* Header Section */}
          <div className="relative flex flex-col pt-1 pb-2">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-xl shadow-sm">
                <span className="text-[13px] text-white">✨</span>
                <span className="font-label-sm text-label-sm text-white font-semibold tracking-wide uppercase" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>{t('calendar.triCalendarSync', 'Tri-Calendar Sync')}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high/60 backdrop-blur-xl">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-label-sm text-label-sm text-slate-300 font-medium" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>{`${userCityLabel} • ${formattedTime}`}</span>
              </div>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-white tracking-tight mt-3" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>{t('calendar.calendarsAndTime', 'Calendars & Time')}</h2>
            <p className="font-body-sm text-body-sm text-slate-300 mt-0.5" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>{t('calendar.harmonizeRhythms', 'Harmonize civil, spiritual, and solar rhythms seamlessly')}</p>
          </div>

          {/* Triple-Date Hero Glass Card with Polished Single-Line Horizontal Layout */}
          <div className="relative rounded-2xl p-space-lg overflow-hidden bg-surface-container-high/60 backdrop-blur-xl border border-white/10 shadow-lg">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-secondary to-tertiary-container"></div>
            <div className="flex items-center justify-between mb-3">
              <div className="inline-flex items-center gap-1.5 bg-primary/10 px-2.5 py-1 rounded-full text-primary">
                <span className="material-symbols-outlined text-[15px]">today</span>
                <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider">{t('calendar.activeConfluence', 'Active Confluence')}</span>
              </div>
              <button type="button" onClick={() => refreshTime()} className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-on-primary font-label-sm text-label-sm shadow-sm transition-transform active:scale-95 cursor-pointer pointer-events-auto" id="todayJumpBtn">
                <span className="w-1.5 h-1.5 rounded-full bg-on-primary"></span>
                <span>{t('calendar.today', 'Today')}</span>
              </button>
            </div>

            {/* Consistent Spacing & Padding for Single-Line Date Cards Stack */}
            <div className="space-y-2.5 mt-2">
              {/* 1. Gregorian Date Card */}
              <div className="flex items-center justify-between px-3.5 py-3 rounded-2xl bg-surface-container/70 backdrop-blur-xl border border-white/10 shadow-md transition-all">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mr-2.5">
                  <span className="material-symbols-outlined text-[19px]">event</span>
                </div>
                <div className="flex-1 min-w-0 pr-2 flex flex-col justify-center">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap">{t('calendar.civilGregorian', 'Civil • Gregorian')}</span>
                  <span className="text-[13px] font-bold text-white whitespace-nowrap mt-0.5">{formattedDate}</span>
                </div>
                <span className="flex-shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-primary/20 text-primary border border-primary/30">{t('calendar.primary', 'Primary')}</span>
              </div>

              {/* 2. Islamic Hijri Date Card */}
              <div className="flex items-center justify-between px-3.5 py-3 rounded-2xl bg-surface-container/70 backdrop-blur-xl border border-white/10 shadow-md transition-all">
                <div className="w-9 h-9 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary flex-shrink-0 mr-2.5">
                  <span className="material-symbols-outlined text-[19px]">dark_mode</span>
                </div>
                <div className="flex-1 min-w-0 pr-2 flex flex-col justify-center">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap">{t('calendar.spiritualHijriQamari', 'Spiritual • Hijri Qamari')}</span>
                  <span className="text-[13px] font-bold text-white whitespace-nowrap mt-0.5">{`${islamicDate.hd} ${islamicDate.hm} ${islamicDate.hy} AH`}</span>
                </div>
                <span className="flex-shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-secondary/20 text-secondary border border-secondary/30">{t('calendar.qamari', 'Qamari')}</span>
              </div>

              {/* 3. Afghan Shamsi Date Card */}
              <div className="flex items-center justify-between px-3.5 py-3 rounded-2xl bg-surface-container/70 backdrop-blur-xl border border-white/10 shadow-md transition-all">
                <div className="w-9 h-9 rounded-xl bg-tertiary/15 flex items-center justify-center text-tertiary flex-shrink-0 mr-2.5">
                  <span className="material-symbols-outlined text-[19px]">wb_sunny</span>
                </div>
                <div className="flex-1 min-w-0 pr-2 flex flex-col justify-center">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap">{t('calendar.solarHijriShamsi', 'Solar • Hijri Shamsi')}</span>
                  <span className="text-[13px] font-bold text-white whitespace-nowrap mt-0.5">{`${shamsiDate.jd} ${shamsiDate.monthInfo.nameEn} ${shamsiDate.jy} SH`}</span>
                </div>
                <span className="flex-shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-tertiary/20 text-tertiary border border-tertiary/30">{t('calendar.solar', 'Solar')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Systems */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="font-headline-sm text-headline-sm text-white font-semibold">{t('calendar.dedicatedSystems', 'Dedicated Systems')}</h2>
            <span className="font-label-sm text-label-sm text-slate-400">{t('calendar.tapToEnterSystem', 'Tap to enter system')}</span>
          </div>

          <div className="space-y-2.5">
            {/* 1. Gregorian (CIVIL • WORK) */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => setActiveTab && setActiveTab('gregorian_calendar_dark_mode')}
              className="group relative flex items-center justify-between p-3.5 rounded-2xl bg-surface-container/70 backdrop-blur-xl border border-white/10 shadow-md hover:scale-[1.01] transition-all cursor-pointer pointer-events-auto"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors flex-shrink-0 mr-3">
                <span className="material-symbols-outlined text-[24px]">calendar_month</span>
              </div>
              <div className="flex-1 min-w-0 pr-2 flex flex-col justify-center">
                <div className="flex items-center gap-2">
                  <span className="font-headline-sm text-headline-sm text-white font-bold whitespace-nowrap">{t('calendar.gregorian', 'Gregorian')}</span>
                  <span className="px-2 py-0.5 rounded-full bg-primary/15 text-primary font-label-sm text-[10px] font-semibold tracking-wider uppercase whitespace-nowrap">{t('calendar.civilWork', 'CIVIL • WORK')}</span>
                </div>
                <span className="text-[10.5px] font-medium text-on-surface-variant whitespace-nowrap mt-0.5 tracking-tight">{`${now.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: effectiveTimezone })} • ${t('calendar.civilWorkAgenda', 'Civil & Work Agenda')}`}</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors flex-shrink-0">
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </div>
            </div>

            {/* 2. Hijri Qamari (SPIRITUAL • MOON) */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => setActiveTab && setActiveTab('islamic_hijri_calendar_dark_mode')}
              className="group relative flex items-center justify-between p-3.5 rounded-2xl bg-surface-container/70 backdrop-blur-xl border border-white/10 shadow-md hover:scale-[1.01] transition-all cursor-pointer pointer-events-auto"
            >
              <div className="w-11 h-11 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors flex-shrink-0 mr-3">
                <span className="material-symbols-outlined text-[24px]">nights_stay</span>
              </div>
              <div className="flex-1 min-w-0 pr-2 flex flex-col justify-center">
                <div className="flex items-center gap-2">
                  <span className="font-headline-sm text-headline-sm text-white font-bold whitespace-nowrap">{t('calendar.hijriQamari', 'Hijri Qamari')}</span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary/15 text-secondary font-label-sm text-[10px] font-semibold tracking-wider uppercase whitespace-nowrap">{t('calendar.spiritualMoon', 'SPIRITUAL • MOON')}</span>
                </div>
                <span className="text-[10.5px] font-medium text-on-surface-variant whitespace-nowrap mt-0.5 tracking-tight">{`${islamicDate.hd} ${islamicDate.hm} ${islamicDate.hy} AH • ${t('calendar.lunarCyclesPrayers', 'Lunar Cycles & Prayers')}`}</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-on-surface-variant group-hover:text-secondary transition-colors flex-shrink-0">
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </div>
            </div>

            {/* 3. Hijri Shamsi (SOLAR • SEASONAL) */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => setActiveTab && setActiveTab('afghan_solar_hijri_shamsi_calendar_dark_mode')}
              className="group relative flex items-center justify-between p-3.5 rounded-2xl bg-surface-container/70 backdrop-blur-xl border border-white/10 shadow-md hover:scale-[1.01] transition-all cursor-pointer pointer-events-auto"
            >
              <div className="w-11 h-11 rounded-xl bg-tertiary/15 flex items-center justify-center text-tertiary group-hover:bg-tertiary group-hover:text-white transition-colors flex-shrink-0 mr-3">
                <span className="material-symbols-outlined text-[24px]">yard</span>
              </div>
              <div className="flex-1 min-w-0 pr-2 flex flex-col justify-center">
                <div className="flex items-center gap-2">
                  <span className="font-headline-sm text-headline-sm text-white font-bold whitespace-nowrap">{t('calendar.hijriShamsi', 'Hijri Shamsi')}</span>
                  <span className="px-2 py-0.5 rounded-full bg-tertiary/15 text-tertiary font-label-sm text-[10px] font-semibold tracking-wider uppercase whitespace-nowrap">{t('calendar.solarSeasonal', 'SOLAR • SEASONAL')}</span>
                </div>
                <span className="text-[10.5px] font-medium text-on-surface-variant whitespace-nowrap mt-0.5 tracking-tight">{`${shamsiDate.jd} ${shamsiDate.monthInfo.nameEn} ${shamsiDate.jy} SH • ${t('calendar.solarRhythmSeasons', 'Solar Rhythm & Seasons')}`}</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-on-surface-variant group-hover:text-tertiary transition-colors flex-shrink-0">
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Strip Header with Functional View Selector */}
        <div className="rounded-2xl p-space-md bg-surface-container-high/60 backdrop-blur-xl border border-white/10 shadow-lg">
          <div className="flex items-center justify-between pb-2 border-b border-white/20">
            <div className="flex items-center gap-1.5">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold px-1">
                {`${now.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: effectiveTimezone })} • ${shamsiDate.monthInfo.nameEn}`}
              </span>
            </div>
            {/* Functional View Selector Toggle */}
            <div className="inline-flex p-1 rounded-xl bg-slate-800/90 border border-white/10 text-slate-400 shadow-sm font-sans">
              {['Week', 'Month', 'Agenda'].map((mode) => {
                const isSelected = viewMode === mode;
                const label = mode === 'Week' ? t('calendar.week', 'Week') : mode === 'Month' ? t('calendar.month', 'Month') : t('calendar.agenda', 'Agenda');
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setViewMode(mode)}
                    className={`px-3 py-1 rounded-lg text-xs font-sans transition-all cursor-pointer pointer-events-auto ${
                      isSelected ? 'bg-slate-700 text-primary font-bold shadow-sm' : 'text-slate-400 font-medium hover:text-white'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Conditional View Header Rendering */}
          {viewMode === 'Month' && (
            <div className="pt-3">
              <div className="grid grid-cols-7 gap-1 text-center font-bold text-[11px] text-slate-400 mb-2">
                <span>{t('calendar.weekdays.sun', 'Sun')}</span>
                <span>{t('calendar.weekdays.mon', 'Mon')}</span>
                <span>{t('calendar.weekdays.tue', 'Tue')}</span>
                <span>{t('calendar.weekdays.wed', 'Wed')}</span>
                <span>{t('calendar.weekdays.thu', 'Thu')}</span>
                <span>{t('calendar.weekdays.fri', 'Fri')}</span>
                <span>{t('calendar.weekdays.sat', 'Sat')}</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center font-sans">
                {monthGridDays.map((cell, idx) => {
                  if (!cell.dayNumber) {
                    return <div key={`empty-${idx}`} className="h-8"></div>;
                  }
                  return (
                    <div
                      key={`day-${cell.dayNumber}`}
                      className={`h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-all ${
                        cell.isToday
                          ? 'bg-primary text-white font-bold shadow-md scale-105'
                          : 'text-white hover:bg-white/40'
                      }`}
                    >
                      {cell.dayNumber}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {(viewMode === 'Week' || viewMode === 'Agenda') && (
            <div className="pt-3">
              <div className="grid grid-cols-7 gap-1 text-center">
                {weekDays.map((dItem) => {
                  const isAct = dItem.isToday;
                  return (
                    <div key={dItem.date.toISOString()} className={`flex flex-col items-center py-2 px-1 rounded-xl transition-all ${isAct ? 'bg-primary text-on-primary shadow-md scale-105 transform z-10' : 'bg-surface-container/70 backdrop-blur-xl border border-white/10 shadow-md'}`}>
                      <span className={`font-label-sm text-[10px] uppercase ${isAct ? 'text-on-primary/80 font-semibold' : 'text-slate-400'}`}>{dItem.weekdayShort}</span>
                      <span className={`font-headline-sm text-headline-sm mt-0.5 font-bold ${isAct ? 'text-on-primary' : 'text-on-surface'}`}>{dItem.gregorianDay}</span>
                      <div className="flex items-center justify-center gap-0.5 mt-1">
                        <span className={`font-label-sm text-[9px] font-medium ${isAct ? 'text-secondary-fixed font-bold' : 'text-secondary'}`}>{dItem.hijriDay}</span>
                        <span className={`text-[8px] ${isAct ? 'text-on-primary/60' : 'text-outline-variant'}`}>•</span>
                        <span className={`font-label-sm text-[9px] font-medium ${isAct ? 'text-tertiary-fixed font-bold' : 'text-tertiary'}`}>{dItem.shamsiDay}</span>
                      </div>
                      {isAct && <span className="w-1.5 h-1.5 rounded-full bg-white mt-1 animate-pulse"></span>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Dynamic View Content Section: Live Agenda Powered by Global Store */}
        {viewMode === 'Agenda' && (
          <div className="flex-1 overflow-y-auto pb-32 space-y-3" id="agendaViewSection">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-headline-sm text-headline-sm text-white" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>{t('calendar.harmonizedFlow', 'Harmonized Flow')}</h2>
                <p className="font-body-sm text-body-sm text-slate-300" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>{`${now.toLocaleDateString('en-US', { weekday: 'long', timeZone: effectiveTimezone })} • ${agendaTasks.length} ${t('calendar.liveMilestones', 'Live Scheduled Milestones')}`}</p>
              </div>
              {/* Functional + New Item Action Button */}
              <button
                type="button"
                onClick={handleOpenAddTask}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm shadow-sm hover:scale-105 active:scale-95 transition-transform cursor-pointer pointer-events-auto"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>{t('calendar.newItem', 'New Item')}</span>
              </button>
            </div>

            {/* Empty State Handling */}
            {agendaTasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-surface-container-high/60 backdrop-blur-xl border border-white/10 shadow-lg text-center my-4 space-y-3 font-sans">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <CheckSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-white font-bold">{t('calendar.noTasksToday', 'No tasks scheduled for today')}</h3>
                  <p className="font-body-sm text-body-sm text-slate-400 mt-1">{t('calendar.clearScheduleDesc', 'Your harmonized flow is clear. Enjoy the stillness or add a milestone.')}</p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenAddTask}
                  className="flex items-center gap-1 px-4 py-2 rounded-full bg-primary text-on-primary font-label-sm text-label-sm shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer pointer-events-auto"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  <span>{t('calendar.addMilestone', 'Add Milestone')}</span>
                </button>
              </div>
            ) : (
              /* Timeline Items List with The Green Box & Dynamic Store Mapping */
              <div className="space-y-2.5">
                {agendaTasks.map((evt, idx) => {
                  const isActive = activeTask && activeTask.id === evt.id;
                  const isUpcoming = upcomingTask && upcomingTask.id === evt.id;
                  const itemCardClass = isActive
                    ? 'bg-emerald-500/20 backdrop-blur-xl border border-emerald-400/50 shadow-lg ring-2 ring-emerald-400 shadow-emerald-500/25'
                    : isUpcoming
                    ? 'bg-sky-500/15 backdrop-blur-xl border border-sky-400/30 shadow-md ring-1 ring-sky-400/50'
                    : 'bg-surface-container/70 backdrop-blur-xl border border-white/10 shadow-md';

                  return (
                    <div key={evt.id || `agenda-task-${idx}`} className={`flex items-start gap-3 p-3.5 rounded-2xl transition-all duration-300 ${itemCardClass}`}>
                      <div className="flex flex-col items-center pt-0.5 min-w-[62px]">
                        <span className={`font-label-sm text-label-sm font-bold ${isActive ? 'text-emerald-700 dark:text-emerald-400' : 'text-on-surface'}`}>{evt.timeStr}</span>
                        {evt.completed && (
                          <span className="text-[10px] text-teal-600 dark:text-teal-400 font-bold uppercase mt-0.5">{t('common.done', 'Done')}</span>
                        )}
                      </div>
                      <div className={`w-1.5 self-stretch rounded-full my-0.5 ${isActive ? 'bg-emerald-500 shadow-sm shadow-emerald-500' : (evt.accent === 'primary' ? 'bg-primary' : evt.accent === 'secondary' ? 'bg-secondary' : 'bg-tertiary')}`}></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1.5">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className={`font-headline-sm text-headline-sm truncate ${isActive ? 'text-emerald-800 dark:text-emerald-300 font-bold' : 'text-on-surface'} ${evt.completed ? 'line-through opacity-70' : ''}`}>{evt.title}</span>
                            <span className={`material-symbols-outlined text-[16px] shrink-0 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : (evt.accent === 'primary' ? 'text-primary' : evt.accent === 'secondary' ? 'text-secondary' : 'text-tertiary')}`}>{evt.icon}</span>
                          </div>
                          {/* Active Green Box Pulse Badge */}
                          {isActive && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-600 text-white uppercase tracking-wider animate-pulse flex items-center gap-1 shadow-sm shrink-0">
                              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>{t('common.active', 'Now Active')}
                            </span>
                          )}
                          {/* Upcoming Badge */}
                          {isUpcoming && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-sky-600 text-white uppercase tracking-wider shadow-sm flex items-center gap-1 shrink-0">
                              {t('calendar.upNext', 'Up Next')}
                            </span>
                          )}
                        </div>
                        {evt.description && (
                          <p className="font-body-sm text-body-sm mt-0.5 text-on-surface-variant">{evt.description}</p>
                        )}
                        <div className="flex items-center justify-between mt-1.5">
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container-high/60 text-on-surface-variant font-label-sm text-[10px]">
                            <span>{evt.badgeText}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => toggleTaskStatus && toggleTaskStatus(evt.id)}
                            className="text-[11px] font-semibold text-primary hover:underline cursor-pointer pointer-events-auto"
                          >
                            {evt.completed ? 'Reopen' : 'Mark Done'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {viewMode === 'Week' && (
          <div className="flex-1 overflow-y-auto pb-32 space-y-3" id="weekViewSection">
            <div className="p-4 rounded-2xl bg-surface-container-high/60 backdrop-blur-xl border border-white/10 shadow-lg">
              <h3 className="font-headline-sm text-headline-sm text-white font-bold mb-1">{t('calendar.weekRhythmHarmony', 'Week Rhythm & Harmony')}</h3>
              <p className="font-body-sm text-body-sm text-slate-300">{t('calendar.confluence7Days', 'Confluence of 7 days across Civil, Spiritual, and Solar timecycles.')}</p>
              <div className="mt-3 space-y-2">
                {weekDays.map((wd) => (
                  <div key={wd.date.toISOString()} className="flex items-center justify-between p-2 rounded-xl bg-black/5 dark:bg-white/5">
                    <span className="text-xs font-semibold">{wd.weekdayShort} • {wd.gregorianDay}</span>
                    <span className="text-[11px] text-slate-400">{t('calendar.hijriDay', 'Hijri')}: {wd.hijriDay} | {t('calendar.solarDay', 'Shamsi')}: {wd.shamsiDay}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {viewMode === 'Month' && (
          <div className="flex-1 overflow-y-auto pb-32 space-y-3" id="monthViewSection">
            <div className="p-4 rounded-2xl bg-surface-container-high/60 backdrop-blur-xl border border-white/10 shadow-lg">
              <h3 className="font-headline-sm text-headline-sm text-white font-bold mb-1">{t('calendar.monthlyAlignment', 'Monthly Alignment')}</h3>
              <p className="font-body-sm text-body-sm text-slate-300">{t('calendar.monthlyAlignmentDesc', 'Full monthly confluence matching civil solar calendar with seasonal transitions.')}</p>
              <div className="mt-3 flex items-center justify-around p-3 rounded-xl bg-black/5 dark:bg-white/5 text-xs">
                <div>{t('calendar.civilGregorian', 'Civil')}: <strong className="text-primary">{now.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: effectiveTimezone })}</strong></div>
                <div>{t('calendar.solarDay', 'Shamsi')}: <strong className="text-tertiary">{shamsiDate.monthInfo.nameEn} {shamsiDate.jy}</strong></div>
                <div>{t('calendar.hijriDay', 'Hijri')}: <strong className="text-secondary">{islamicDate.hm} {islamicDate.hy}</strong></div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
