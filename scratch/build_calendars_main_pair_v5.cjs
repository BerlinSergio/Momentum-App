const fs = require('fs');
const path = require('path');

function generateScreenCode(isDark) {
  const modeName = isDark ? 'DarkMode' : 'LightMode';
  const textHeadline = isDark ? 'text-white' : 'text-slate-900';
  const textBody = isDark ? 'text-slate-300' : 'text-slate-800';
  const textMuted = isDark ? 'text-slate-400' : 'text-slate-500';
  const textVariant = isDark ? 'text-on-surface-variant' : 'text-slate-600';
  const cardBg = isDark
    ? 'bg-surface-container-high/60 backdrop-blur-xl border border-white/10 shadow-lg'
    : 'bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg';
  const innerCardBg = isDark
    ? 'bg-surface-container/70 backdrop-blur-xl border border-white/10 shadow-md'
    : 'bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg';
  const activeGreenBox = isDark
    ? 'bg-emerald-500/20 backdrop-blur-xl border border-emerald-400/50 shadow-lg ring-2 ring-emerald-400 shadow-emerald-500/25'
    : 'bg-emerald-500/15 backdrop-blur-xl border border-emerald-500/40 shadow-lg ring-2 ring-emerald-500 shadow-emerald-500/20';
  const upcomingCard = isDark
    ? 'bg-sky-500/15 backdrop-blur-xl border border-sky-400/30 shadow-md ring-1 ring-sky-400/50'
    : 'bg-sky-500/10 backdrop-blur-xl border border-sky-400/40 shadow-md ring-1 ring-sky-400/60';
  const segPillBg = isDark
    ? 'bg-slate-800/90 border border-white/10 text-slate-400'
    : 'bg-slate-100/90 border border-slate-200/60 text-slate-500';
  const segPillActive = isDark
    ? 'bg-slate-700 text-primary font-bold shadow-sm'
    : 'bg-white text-primary font-bold shadow-sm';
  const segPillInactive = isDark
    ? 'text-slate-400 font-medium hover:text-white'
    : 'text-slate-500 font-medium hover:text-slate-800';

  return `import { useState, useEffect, useMemo } from 'react';
import BottomNavBar from './components/BottomNavBar';
import { Calendar, Bell, CheckSquare } from 'lucide-react';
import { getShamsiDate, getIslamicDateParts } from './utils/afghanCalendar';
import { useTaskStore } from './store/useTaskStore';

const parseTimeToMinutes = (timeStr, estimateStr) => {
  if (!timeStr || typeof timeStr !== 'string') return null;
  const cleaned = timeStr.trim().toLowerCase();
  if (cleaned.includes('all day') || cleaned.includes('throughout')) {
    return { startMinutes: 0, endMinutes: 1440, isAllDay: true };
  }
  const match12 = cleaned.match(/^(\\d{1,2}):(\\d{2})\\s*(am|pm)?$/i);
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
        const m = est.match(/(\\d+)\\s*min/);
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

export default function CalendarsMain${modeName}({ setActiveTab }) {
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [viewMode, setViewMode] = useState('Agenda');
  const { tasks, toggleTaskStatus } = useTaskStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const shamsiDate = useMemo(() => getShamsiDate(currentTime), [currentTime]);
  const islamicDate = useMemo(() => getIslamicDateParts(currentTime), [currentTime]);

  const userCityLabel = useMemo(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kabul';
      const parts = tz.split('/');
      return parts[parts.length - 1].replace(/_/g, ' ') || 'Local Time';
    } catch {
      return 'Kabul';
    }
  }, []);

  const todayIsoStr = useMemo(() => {
    const y = currentTime.getFullYear();
    const m = String(currentTime.getMonth() + 1).padStart(2, '0');
    const d = String(currentTime.getDate()).padStart(2, '0');
    return \`\${y}-\${m}-\${d}\`;
  }, [currentTime]);

  const currentMinutes = useMemo(() => {
    return currentTime.getHours() * 60 + currentTime.getMinutes();
  }, [currentTime]);

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
    const dayOfWeek = (currentTime.getDay() + 1) % 7;
    const startOfWeek = new Date(currentTime);
    startOfWeek.setDate(currentTime.getDate() - dayOfWeek);
    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      const isToday = d.toDateString() === currentTime.toDateString();
      const isl = getIslamicDateParts(d);
      const sh = getShamsiDate(d);
      days.push({
        date: d,
        weekdayShort: d.toLocaleDateString('en-US', { weekday: 'short' }),
        gregorianDay: d.getDate(),
        hijriDay: isl.hd,
        shamsiDay: sh.jd,
        isToday,
      });
    }
    return days;
  }, [currentTime]);

  const monthGridDays = useMemo(() => {
    const year = currentTime.getFullYear();
    const month = currentTime.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < firstDayIndex; i++) {
      cells.push({ dayNumber: null, isCurrentMonth: false, isToday: false });
    }
    for (let d = 1; d <= totalDays; d++) {
      const isToday = d === currentTime.getDate();
      cells.push({ dayNumber: d, isCurrentMonth: true, isToday });
    }
    return cells;
  }, [currentTime]);

  const handleOpenAddTask = () => {
    if (setActiveTab) {
      setActiveTab(${isDark ? "'add_edit_task_dark_mode'" : "'add_edit_task_light_mode'"});
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
          <h1 className="text-base font-bold ${textHeadline} tracking-tight" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>
            Calendars &amp; Time
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" aria-label="Notifications" className="p-2 rounded-full ${textMuted} hover:text-primary transition-colors cursor-pointer pointer-events-auto">
            <Bell className="w-5 h-5"/>
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-primary-container text-white font-bold text-xs flex items-center justify-center shadow-sm">
            A
          </div>
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
                <span className="text-[13px] ${textHeadline}">✨</span>
                <span className="font-label-sm text-label-sm ${textHeadline} font-semibold tracking-wide uppercase" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>Tri-Calendar Sync</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high/60 backdrop-blur-xl">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-label-sm text-label-sm ${textBody} font-medium" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>{\`\${userCityLabel} • \${currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}\`}</span>
              </div>
            </div>
            <h2 className="font-headline-lg text-headline-lg ${textHeadline} tracking-tight mt-3" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>Calendars &amp; Time</h2>
            <p className="font-body-sm text-body-sm ${textBody} mt-0.5" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>Harmonize civil, spiritual, and solar rhythms seamlessly</p>
          </div>

          {/* Triple-Date Hero Glass Card */}
          <div className="relative rounded-2xl p-space-lg overflow-hidden ${cardBg}">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-secondary to-tertiary-container"></div>
            <div className="flex items-center justify-between mb-3">
              <div className="inline-flex items-center gap-1.5 bg-primary/10 px-2.5 py-1 rounded-full text-primary">
                <span className="material-symbols-outlined text-[15px]">today</span>
                <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider">Active Confluence</span>
              </div>
              <button type="button" onClick={() => setCurrentTime(new Date())} className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-on-primary font-label-sm text-label-sm shadow-sm transition-transform active:scale-95 cursor-pointer pointer-events-auto" id="todayJumpBtn">
                <span className="w-1.5 h-1.5 rounded-full bg-on-primary"></span>
                <span>Today</span>
              </button>
            </div>

            <div className="space-y-3 mt-1">
              {/* Gregorian */}
              <div className="flex items-center justify-between p-2.5 rounded-xl ${innerCardBg}">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
                    <span className="material-symbols-outlined text-[17px]">event</span>
                  </div>
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Civil • Gregorian</p>
                    <p className="font-headline-sm text-headline-sm text-on-surface">{currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm text-primary font-semibold px-2 py-0.5 rounded-md bg-primary-fixed/50">Primary</span>
              </div>

              {/* Islamic Hijri */}
              <div className="flex items-center justify-between p-2.5 rounded-xl ${innerCardBg}">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                    <span className="material-symbols-outlined text-[17px]">dark_mode</span>
                  </div>
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Spiritual • Hijri Qamari</p>
                    <p className="font-headline-sm text-headline-sm text-on-surface">{\`\${islamicDate.hd} \${islamicDate.hm} \${islamicDate.hy} AH\`}</p>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm text-secondary font-semibold px-2 py-0.5 rounded-md bg-secondary-fixed/50">Qamari</span>
              </div>

              {/* Afghan Shamsi */}
              <div className="flex items-center justify-between p-2.5 rounded-xl ${innerCardBg}">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                    <span className="material-symbols-outlined text-[17px]">wb_sunny</span>
                  </div>
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Solar • Hijri Shamsi</p>
                    <p className="font-headline-sm text-headline-sm text-on-surface">{\`\${shamsiDate.jd} \${shamsiDate.monthInfo.nameEn} \${shamsiDate.jy} SH\`}</p>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm text-tertiary font-semibold px-2 py-0.5 rounded-md bg-tertiary-fixed/50">Solar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Strip Header with Functional View Selector */}
        <div className="rounded-2xl p-space-md ${cardBg}">
          <div className="flex items-center justify-between pb-2 border-b border-white/20">
            <div className="flex items-center gap-1.5">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold px-1">
                {\`\${currentTime.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} • \${shamsiDate.monthInfo.nameEn}\`}
              </span>
            </div>
            {/* Functional View Selector Toggle */}
            <div className="inline-flex p-1 rounded-xl ${segPillBg} shadow-sm font-sans">
              {['Week', 'Month', 'Agenda'].map((mode) => {
                const isSelected = viewMode === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setViewMode(mode)}
                    className={\`px-3 py-1 rounded-lg text-xs font-sans transition-all cursor-pointer pointer-events-auto \${
                      isSelected ? '${segPillActive}' : '${segPillInactive}'
                    }\`}
                  >
                    {mode}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Conditional View Header Rendering */}
          {viewMode === 'Month' && (
            <div className="pt-3">
              <div className="grid grid-cols-7 gap-1 text-center font-bold text-[11px] ${textMuted} mb-2">
                <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center font-sans">
                {monthGridDays.map((cell, idx) => {
                  if (!cell.dayNumber) {
                    return <div key={\`empty-\${idx}\`} className="h-8"></div>;
                  }
                  return (
                    <div
                      key={\`day-\${cell.dayNumber}\`}
                      className={\`h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-all \${
                        cell.isToday
                          ? 'bg-primary text-white font-bold shadow-md scale-105'
                          : '${textHeadline} hover:bg-white/40'
                      }\`}
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
                    <div key={dItem.date.toISOString()} className={\`flex flex-col items-center py-2 px-1 rounded-xl transition-all \${isAct ? 'bg-primary text-on-primary shadow-md scale-105 transform z-10' : '${innerCardBg}'}\`}>
                      <span className={\`font-label-sm text-[10px] uppercase \${isAct ? 'text-on-primary/80 font-semibold' : '${textMuted}'}\`}>{dItem.weekdayShort}</span>
                      <span className={\`font-headline-sm text-headline-sm mt-0.5 font-bold \${isAct ? 'text-on-primary' : 'text-on-surface'}\`}>{dItem.gregorianDay}</span>
                      <div className="flex items-center justify-center gap-0.5 mt-1">
                        <span className={\`font-label-sm text-[9px] font-medium \${isAct ? 'text-secondary-fixed font-bold' : 'text-secondary'}\`}>{dItem.hijriDay}</span>
                        <span className={\`text-[8px] \${isAct ? 'text-on-primary/60' : 'text-outline-variant'}\`}>•</span>
                        <span className={\`font-label-sm text-[9px] font-medium \${isAct ? 'text-tertiary-fixed font-bold' : 'text-tertiary'}\`}>{dItem.shamsiDay}</span>
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
                <h2 className="font-headline-sm text-headline-sm ${textHeadline}" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>Harmonized Flow</h2>
                <p className="font-body-sm text-body-sm ${textBody}" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>{\`\${currentTime.toLocaleDateString('en-US', { weekday: 'long' })} • \${agendaTasks.length} Live Scheduled Milestones\`}</p>
              </div>
              {/* Functional + New Item Action Button */}
              <button
                type="button"
                onClick={handleOpenAddTask}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm shadow-sm hover:scale-105 active:scale-95 transition-transform cursor-pointer pointer-events-auto"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>New Item</span>
              </button>
            </div>

            {/* Empty State Handling */}
            {agendaTasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 rounded-2xl ${cardBg} text-center my-4 space-y-3 font-sans">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <CheckSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm ${textHeadline} font-bold">No tasks scheduled for today</h3>
                  <p className="font-body-sm text-body-sm ${textMuted} mt-1">Your harmonized flow is clear. Enjoy the stillness or add a milestone.</p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenAddTask}
                  className="flex items-center gap-1 px-4 py-2 rounded-full bg-primary text-on-primary font-label-sm text-label-sm shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer pointer-events-auto"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  <span>Add Milestone</span>
                </button>
              </div>
            ) : (
              /* Timeline Items List with The Green Box & Dynamic Store Mapping */
              <div className="space-y-2.5">
                {agendaTasks.map((evt, idx) => {
                  const isActive = activeTask && activeTask.id === evt.id;
                  const isUpcoming = upcomingTask && upcomingTask.id === evt.id;
                  const itemCardClass = isActive
                    ? '${activeGreenBox}'
                    : isUpcoming
                    ? '${upcomingCard}'
                    : '${innerCardBg}';

                  return (
                    <div key={evt.id || \`agenda-task-\${idx}\`} className={\`flex items-start gap-3 p-3.5 rounded-2xl transition-all duration-300 \${itemCardClass}\`}>
                      <div className="flex flex-col items-center pt-0.5 min-w-[62px]">
                        <span className={\`font-label-sm text-label-sm font-bold \${isActive ? 'text-emerald-700 dark:text-emerald-400' : 'text-on-surface'}\`}>{evt.timeStr}</span>
                        {evt.completed && (
                          <span className="text-[10px] text-teal-600 dark:text-teal-400 font-bold uppercase mt-0.5">Done</span>
                        )}
                      </div>
                      <div className={\`w-1.5 self-stretch rounded-full my-0.5 \${isActive ? 'bg-emerald-500 shadow-sm shadow-emerald-500' : (evt.accent === 'primary' ? 'bg-primary' : evt.accent === 'secondary' ? 'bg-secondary' : 'bg-tertiary')}\`}></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1.5">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className={\`font-headline-sm text-headline-sm truncate \${isActive ? 'text-emerald-800 dark:text-emerald-300 font-bold' : 'text-on-surface'} \${evt.completed ? 'line-through opacity-70' : ''}\`}>{evt.title}</span>
                            <span className={\`material-symbols-outlined text-[16px] shrink-0 \${isActive ? 'text-emerald-600 dark:text-emerald-400' : (evt.accent === 'primary' ? 'text-primary' : evt.accent === 'secondary' ? 'text-secondary' : 'text-tertiary')}\`}>{evt.icon}</span>
                          </div>
                          {/* Active Green Box Pulse Badge */}
                          {isActive && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-600 text-white uppercase tracking-wider animate-pulse flex items-center gap-1 shadow-sm shrink-0">
                              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>Now Active
                            </span>
                          )}
                          {/* Upcoming Badge */}
                          {isUpcoming && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-sky-600 text-white uppercase tracking-wider shadow-sm flex items-center gap-1 shrink-0">
                              Up Next
                            </span>
                          )}
                        </div>
                        {evt.description && (
                          <p className="font-body-sm text-body-sm mt-0.5 ${textVariant}">{evt.description}</p>
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
            <div className="p-4 rounded-2xl ${cardBg}">
              <h3 className="font-headline-sm text-headline-sm ${textHeadline} font-bold mb-1">Week Rhythm &amp; Harmony</h3>
              <p className="font-body-sm text-body-sm ${textBody}">Confluence of 7 days across Civil, Spiritual, and Solar timecycles.</p>
              <div className="mt-3 space-y-2">
                {weekDays.map((wd) => (
                  <div key={wd.date.toISOString()} className="flex items-center justify-between p-2 rounded-xl bg-black/5 dark:bg-white/5">
                    <span className="text-xs font-semibold">{wd.weekdayShort} • {wd.gregorianDay}</span>
                    <span className="text-[11px] ${textMuted}">Hijri: {wd.hijriDay} | Shamsi: {wd.shamsiDay}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {viewMode === 'Month' && (
          <div className="flex-1 overflow-y-auto pb-32 space-y-3" id="monthViewSection">
            <div className="p-4 rounded-2xl ${cardBg}">
              <h3 className="font-headline-sm text-headline-sm ${textHeadline} font-bold mb-1">Monthly Alignment</h3>
              <p className="font-body-sm text-body-sm ${textBody}">Full monthly confluence matching civil solar calendar with seasonal transitions.</p>
              <div className="mt-3 flex items-center justify-around p-3 rounded-xl bg-black/5 dark:bg-white/5 text-xs">
                <div>Civil: <strong className="text-primary">{currentTime.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</strong></div>
                <div>Shamsi: <strong className="text-tertiary">{shamsiDate.monthInfo.nameEn} {shamsiDate.jy}</strong></div>
                <div>Hijri: <strong className="text-secondary">{islamicDate.hm} {islamicDate.hy}</strong></div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Standardized Bottom Navigation Bar with Functional onPlusClick */}
      <BottomNavBar
        activeTab="more"
        isDarkMode={${isDark}}
        setActiveTab={setActiveTab}
        onPlusClick={handleOpenAddTask}
      />
    </div>
  );
}
`;
}

const lightCode = generateScreenCode(false);
const darkCode = generateScreenCode(true);

fs.writeFileSync(path.resolve('src/CalendarsMainLightMode.jsx'), lightCode, 'utf8');
fs.writeFileSync(path.resolve('src/CalendarsMainDarkMode.jsx'), darkCode, 'utf8');

const lightLines = lightCode.split(/\r?\n/).length;
const darkLines = darkCode.split(/\r?\n/).length;

console.log(`Generated CalendarsMain without quote card: Light (${lightLines} lines) vs Dark (${darkLines} lines)`);
if (lightLines === darkLines) {
  console.log('✓ EXACT 1:1 LINE COUNT MATCH');
} else {
  console.error('MISMATCH');
  process.exit(1);
}

