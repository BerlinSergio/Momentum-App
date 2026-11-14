const fs = require('fs');

function buildScreen(isDark) {
  const modeSuffix = isDark ? 'dark_mode' : 'light_mode';
  const compName = isDark ? 'CalendarsMainDarkMode' : 'CalendarsMainLightMode';

  // Common tokens
  const titleColor = isDark ? 'text-white' : 'text-slate-900';
  const bodyColor = isDark ? 'text-slate-300' : 'text-slate-800';
  const mutedColor = isDark ? 'text-slate-400' : 'text-slate-500';
  const cardBg = isDark
    ? 'bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl'
    : 'bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg';
  const headerTextShadow = isDark
    ? ''
    : " style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}";
  const subTextShadow = isDark
    ? ''
    : " style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}";

  const activeCardBg = isDark
    ? 'bg-primary/20 backdrop-blur-xl border border-primary/40 shadow-xl ring-2 ring-primary shadow-primary/30'
    : 'bg-primary/10 backdrop-blur-xl border border-primary/30 shadow-lg ring-2 ring-primary shadow-primary/20';

  const upcomingCardBg = isDark
    ? 'bg-emerald-950/40 backdrop-blur-xl border border-emerald-500/30 shadow-xl ring-1.5 ring-emerald-400/70'
    : 'bg-emerald-50/90 backdrop-blur-xl border border-emerald-300/60 shadow-lg ring-1.5 ring-emerald-500/70';

  return `import { useState, useEffect, useMemo } from 'react';
import BottomNavBar from './components/BottomNavBar';
import { Calendar, Bell } from 'lucide-react';
import { getShamsiDate, getIslamicDateParts } from './utils/afghanCalendar';

const AGENDA_EVENTS = [
  {
    id: 'fajr',
    timeStr: '05:12',
    period: 'AM',
    hours: 5,
    minutes: 12,
    title: 'Fajr & Morning Reflection',
    icon: 'bedtime',
    accent: 'secondary',
    description: 'Congregational prayer followed by 15-min mindfulness',
    badgeText: 'Islamic Spiritual • Dawn Horizon',
  },
  {
    id: 'work',
    timeStr: '10:00',
    period: 'AM',
    hours: 10,
    minutes: 0,
    title: 'Q4 Financial & Budget Review',
    icon: 'business_center',
    accent: 'primary',
    description: 'Strategic alignment session with regional operations lead',
    badgeText: 'Civil Calendar • Q4 Milestone',
  },
  {
    id: 'dhuhr',
    timeStr: '01:05',
    period: 'PM',
    hours: 13,
    minutes: 5,
    title: 'Dhuhr Prayer & Pause',
    icon: 'wb_sunny',
    accent: 'secondary',
    description: 'Midday spiritual stillness & hydration check',
    badgeText: 'Islamic Spiritual • Solar Zenith',
  },
  {
    id: 'walk',
    timeStr: '03:30',
    period: 'PM',
    hours: 15,
    minutes: 30,
    title: 'Autumn Tea & Family Walk',
    icon: 'nature_people',
    accent: 'tertiary',
    description: 'Outdoor gathering celebrating the seasonal shift',
    badgeText: 'Solar Shamsi • Afternoon Flow',
  },
  {
    id: 'isha',
    timeStr: '07:15',
    period: 'PM',
    hours: 19,
    minutes: 15,
    title: 'Isha Prayer & Night Reading',
    icon: 'menu_book',
    accent: 'secondary',
    description: 'Closing cycle of the day; 20 minutes philosophical prose',
    badgeText: 'Islamic Spiritual • Nightfall',
  },
];

export default function ${compName}({ setActiveTab }) {
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const shamsiDate = useMemo(() => getShamsiDate(currentTime), [currentTime]);
  const islamicDate = useMemo(() => getIslamicDateParts(currentTime), [currentTime]);

  const currentTotalMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

  const getEventStatus = (index) => {
    const evt = AGENDA_EVENTS[index];
    const evtMinutes = evt.hours * 60 + evt.minutes;
    const nextEvt = AGENDA_EVENTS[index + 1];
    const nextMinutes = nextEvt ? nextEvt.hours * 60 + nextEvt.minutes : evtMinutes + 90;

    if (currentTotalMinutes >= evtMinutes && currentTotalMinutes < nextMinutes) {
      return 'active';
    }

    if (currentTotalMinutes < evtMinutes) {
      const prevEvt = AGENDA_EVENTS[index - 1];
      const prevMinutes = prevEvt ? prevEvt.hours * 60 + prevEvt.minutes : -1;
      if (currentTotalMinutes >= prevMinutes) {
        return 'upcoming';
      }
    }

    const lastEvt = AGENDA_EVENTS[AGENDA_EVENTS.length - 1];
    const lastEvtEnd = lastEvt.hours * 60 + lastEvt.minutes + 90;
    if (currentTotalMinutes >= lastEvtEnd && index === 0) {
      return 'upcoming';
    }

    return currentTotalMinutes > nextMinutes ? 'past' : 'future';
  };

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

  return (
    <>
      {/* Top Header Bar */}
      <div className="sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold ${titleColor} tracking-tight"${headerTextShadow}>
            Calendars &amp; Time
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full ${isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'} transition-colors"><Bell className="w-5 h-5"/></button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-primary-container text-white font-bold text-xs flex items-center justify-center shadow-sm">
            A
          </div>
        </div>
      </div><main className="flex flex-col relative w-full pb-36 min-h-screen bg-transparent px-margin"><div className="flex flex-col w-full pb-16 space-y-4">
{/*  Subtle Ambient Glow Orbs  */}
<div className="relative w-full">
<div className="absolute -top-10 -left-6 w-52 h-52 bg-secondary-fixed/40 rounded-full blur-3xl pointer-events-none"></div>
<div className="absolute top-24 -right-8 w-60 h-60 bg-tertiary-fixed/30 rounded-full blur-3xl pointer-events-none"></div>
{/*  Header Section  */}
<div className="relative flex flex-col pt-1 pb-2">
<div className="flex items-center justify-between">
<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-xl shadow-sm">
<span className="text-[13px] ${isDark ? 'text-slate-200' : 'text-slate-800'}">✨</span>
<span className="font-label-sm text-label-sm ${titleColor} font-semibold tracking-wide uppercase"${headerTextShadow}>Tri-Calendar Sync</span>
</div>
<div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high/60 backdrop-blur-xl">
<span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
<span className="font-label-sm text-label-sm ${bodyColor} font-medium"${subTextShadow}>{\`Kabul • \${currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}\`}</span>
</div>
</div>
<h2 className="font-headline-lg text-headline-lg ${titleColor} tracking-tight mt-3"${headerTextShadow}>Calendars &amp; Time</h2>
<p className="font-body-sm text-body-sm ${bodyColor} mt-0.5"${subTextShadow}>Harmonize civil, spiritual, and solar rhythms seamlessly</p>
</div>
{/*  Triple-Date Hero Glass Card  */}
<div className="relative rounded-2xl p-space-lg overflow-hidden ${cardBg}">
{/*  Top Decorative Aura Bar  */}
<div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-secondary to-tertiary-container"></div>
<div className="flex items-center justify-between mb-3">
<div className="inline-flex items-center gap-1.5 bg-primary/10 px-2.5 py-1 rounded-full text-primary">
<span className="material-symbols-outlined text-[15px]">today</span>
<span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider">Active Confluence</span>
</div>
<button onClick={() => setCurrentTime(new Date())} className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-on-primary font-label-sm text-label-sm shadow-sm transition-transform active:scale-95" id="todayJumpBtn">
<span className="w-1.5 h-1.5 rounded-full bg-on-primary"></span>
<span>Today</span>
</button>
</div>
{/*  Dates Stack  */}
<div className="space-y-3 mt-1">
{/*  Gregorian  */}
<div className="flex items-center justify-between p-2.5 rounded-xl ${cardBg}">
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
{/*  Islamic / Hijri  */}
<div className="flex items-center justify-between p-2.5 rounded-xl ${cardBg}">
<div className="flex items-center gap-2.5">
<div className="w-7 h-7 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
<span className="material-symbols-outlined text-[17px]">bedtime</span>
</div>
<div>
<p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Lunar • Hijri Qamari</p>
<p className="font-headline-sm text-headline-sm text-on-surface">{islamicDate.formatted}</p>
</div>
</div>
<span className="font-label-sm text-label-sm text-secondary font-medium px-2 py-0.5 rounded-md bg-secondary-fixed/50">Active Phase</span>
</div>
{/*  Solar / Afghan Shamsi  */}
<div className="flex items-center justify-between p-2.5 rounded-xl ${cardBg}">
<div className="flex items-center gap-2.5">
<div className="w-7 h-7 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
<span className="material-symbols-outlined text-[17px]">wb_sunny</span>
</div>
<div>
<p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Solar • Hijri Shamsi</p>
<p className="font-headline-sm text-headline-sm text-on-surface">{\`\${shamsiDate.jd} \${shamsiDate.monthInfo.nameEn}, \${shamsiDate.jy} SH (\${shamsiDate.monthInfo.nameFa})\`}</p>
</div>
</div>
<span className="font-label-sm text-label-sm text-tertiary font-medium px-2 py-0.5 rounded-md bg-tertiary-fixed/50">{shamsiDate.monthInfo.season}</span>
</div>
</div>
</div>
</div>
{/*  Calendar System Selection Carousel/Stack  */}
<div className="flex flex-col space-y-2.5">
<div className="flex items-center justify-between px-1">
<h3 className="font-headline-sm text-headline-sm ${titleColor}"${headerTextShadow}>Dedicated Systems</h3>
<span className="font-label-sm text-label-sm ${bodyColor}"${subTextShadow}>Tap to enter system</span>
</div>
{/*  Card 1: Gregorian  */}
<div onClick={() => setActiveTab && setActiveTab('gregorian_calendar_${modeSuffix}')} className="group relative flex items-center justify-between p-3.5 rounded-2xl transition-all duration-200 active:scale-[0.98] cursor-pointer ${cardBg}" role="button" tabIndex={0}>
<div className="flex items-center gap-3">
<div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
<span className="material-symbols-outlined text-[24px]">calendar_month</span>
</div>
<div className="min-w-0">
<div className="flex items-center gap-1.5 mb-0.5">
<span className="font-headline-sm text-headline-sm text-on-surface">Gregorian</span>
<span className="px-2 py-0.2 rounded-full bg-primary-fixed-dim/40 text-on-primary-fixed-variant font-label-sm text-[10px] font-semibold tracking-wider uppercase">Civil • Work</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
<span className="font-medium text-on-surface">{currentTime.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span> • Civil &amp; Work Agenda
          </p>
</div>
</div>
<div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
<span className="material-symbols-outlined text-[18px]">chevron_right</span>
</div>
</div>
{/*  Card 2: Islamic Hijri  */}
<div onClick={() => setActiveTab && setActiveTab('islamic_hijri_calendar_${modeSuffix}')} className="group relative flex items-center justify-between p-3.5 rounded-2xl transition-all duration-200 active:scale-[0.98] cursor-pointer ${cardBg}" role="button" tabIndex={0}>
<div className="flex items-center gap-3">
<div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
<span className="material-symbols-outlined text-[24px]">nights_stay</span>
</div>
<div className="min-w-0">
<div className="flex items-center gap-1.5 mb-0.5">
<span className="font-headline-sm text-headline-sm text-on-surface">Hijri Qamari</span>
<span className="px-2 py-0.2 rounded-full bg-secondary-fixed/50 text-on-secondary-fixed-variant font-label-sm text-[10px] font-semibold tracking-wider uppercase">Spiritual • Moon</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
<span className="font-medium text-on-surface">{\`\${islamicDate.hm} \${islamicDate.hy} AH\`}</span> • Spiritual &amp; Lunar Flow
          </p>
</div>
</div>
<div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:text-secondary transition-colors">
<span className="material-symbols-outlined text-[18px]">chevron_right</span>
</div>
</div>
{/*  Card 3: Afghan Solar  */}
<div onClick={() => setActiveTab && setActiveTab('afghan_solar_hijri_shamsi_calendar_${modeSuffix}')} className="group relative flex items-center justify-between p-3.5 rounded-2xl transition-all duration-200 active:scale-[0.98] cursor-pointer ${cardBg}" role="button" tabIndex={0}>
<div className="flex items-center gap-3">
<div className="w-11 h-11 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary transition-colors">
<span className="material-symbols-outlined text-[24px]">filter_vintage</span>
</div>
<div className="min-w-0">
<div className="flex items-center gap-1.5 mb-0.5">
<span className="font-headline-sm text-headline-sm text-on-surface">Hijri Shamsi</span>
<span className="px-2 py-0.2 rounded-full bg-tertiary-fixed/60 text-on-tertiary-fixed-variant font-label-sm text-[10px] font-semibold tracking-wider uppercase">Solar • Seasonal</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
<span className="font-medium text-on-surface">{\`\${shamsiDate.monthInfo.nameEn} \${shamsiDate.jy} SH\`}</span> • {shamsiDate.monthInfo.season}
          </p>
</div>
</div>
<div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:text-tertiary transition-colors">
<span className="material-symbols-outlined text-[18px]">chevron_right</span>
</div>
</div>
</div>
{/*  Integrated Multi-Calendar Week Strip  */}
<div className="rounded-3xl p-5 mb-5 space-y-3 ${cardBg}">
{/*  View Switcher & Month Navigation  */}
<div className="flex items-center justify-between pb-1">
<div className="flex items-center gap-1">
<button className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface">
<span className="material-symbols-outlined text-[16px]">chevron_left</span>
</button>
<span className="font-headline-sm text-headline-sm text-on-surface px-1">{\`\${currentTime.toLocaleDateString('en-US', { month: 'long' })} • \${shamsiDate.monthInfo.nameEn}\`}</span>
<button className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface">
<span className="material-symbols-outlined text-[16px]">chevron_right</span>
</button>
</div>
{/*  Segmented Pill for Views  */}
<div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200/60 text-slate-500 shadow-sm">
<button className="px-3 py-1 rounded-lg bg-white text-primary font-semibold text-xs shadow-sm">Week</button>
<button className="px-3 py-1 rounded-lg text-slate-500 font-medium text-xs hover:text-slate-700 transition-colors">Month</button>
<button className="px-3 py-1 rounded-lg text-slate-500 font-medium text-xs hover:text-slate-700 transition-colors">Agenda</button>
</div>
</div>
{/*  Synchronized 7-Day Matrix  */}
<div className="grid grid-cols-7 gap-1 text-center">
{weekDays.map((dItem) => {
  const isAct = dItem.isToday;
  return (
    <div key={dItem.date.toISOString()} className={\`flex flex-col items-center py-2 px-1 rounded-xl transition-all \${isAct ? 'bg-primary text-on-primary shadow-md scale-105 transform z-10' : '${cardBg}'}\`}>
      <span className={\`font-label-sm text-[10px] uppercase \${isAct ? 'text-on-primary/80 font-semibold' : '${mutedColor}'}\`}>{dItem.weekdayShort}</span>
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
{/*  Micro Legend for Multi-Strip  */}
<div className="flex items-center justify-center gap-4 pt-1 font-label-sm text-[10px] text-on-surface-variant">
<span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Civil Date</span>
<span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Hijri Qamari</span>
<span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Solar Shamsi</span>
</div>
</div>
{/*  Harmonized Day Timeline  */}
<div className="space-y-3">
<div className="flex items-center justify-between px-1">
<div>
<h2 className="font-headline-sm text-headline-sm ${titleColor}"${headerTextShadow}>Harmonized Flow</h2>
<p className="font-body-sm text-body-sm ${bodyColor}"${subTextShadow}>{\`\${currentTime.toLocaleDateString('en-US', { weekday: 'long' })} • \${AGENDA_EVENTS.length} intertwined milestones\`}</p>
</div>
<button className="btn-primary">
<span className="material-symbols-outlined text-[16px]">add</span>
<span>New Item</span>
</button>
</div>
{/*  Timeline Items List  */}
<div className="space-y-2">
{AGENDA_EVENTS.map((evt, idx) => {
  const status = getEventStatus(idx);
  const isActive = status === 'active';
  const isUpcoming = status === 'upcoming';
  const itemCardClass = isActive ? '${activeCardBg}' : (isUpcoming ? '${upcomingCardBg}' : '${cardBg}');
  return (
    <div key={evt.id} className={\`flex items-start gap-3 p-3.5 rounded-2xl transition-all duration-300 \${itemCardClass}\`}>
      <div className="flex flex-col items-center pt-0.5 min-w-[54px]">
        <span className={\`font-label-sm text-label-sm font-bold \${isActive ? 'text-primary' : 'text-on-surface'}\`}>{evt.timeStr}</span>
        <span className={\`font-label-sm text-[10px] uppercase \${isActive ? 'text-primary font-bold' : '${mutedColor}'}\`}>{evt.period}</span>
      </div>
      <div className={\`w-1 self-stretch rounded-full my-0.5 \${isActive ? 'bg-primary shadow-sm shadow-primary' : (evt.accent === 'primary' ? 'bg-primary' : evt.accent === 'secondary' ? 'bg-secondary' : 'bg-tertiary')}\`}></div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1.5">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className={\`font-headline-sm text-headline-sm truncate \${isActive ? 'text-primary font-bold' : 'text-on-surface'}\`}>{evt.title}</span>
            <span className={\`material-symbols-outlined text-[16px] shrink-0 \${evt.accent === 'primary' ? 'text-primary' : evt.accent === 'secondary' ? 'text-secondary' : 'text-tertiary'}\`}>{evt.icon}</span>
          </div>
          {isActive && (
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-primary text-white uppercase tracking-wider animate-pulse flex items-center gap-1 shadow-sm shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>Now Active
            </span>
          )}
          {isUpcoming && (
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-600 text-white uppercase tracking-wider shadow-sm flex items-center gap-1 shrink-0">
              Up Next
            </span>
          )}
        </div>
        <p className={\`font-body-sm text-body-sm mt-0.5 \${isDark ? 'text-slate-300' : 'text-slate-600'}\`}>{evt.description}</p>
        <div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-md bg-surface-container-high/60 text-on-surface-variant font-label-sm text-[10px]">
          <span>{evt.badgeText}</span>
        </div>
      </div>
    </div>
  );
})}
</div>
</div>
{/*  Micro-Reflection Quote Pill  */}
<div className="rounded-2xl p-4 flex items-center gap-3 ${cardBg}">
<div className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-xs shrink-0">
<span className="material-symbols-outlined text-[18px]">auto_awesome</span>
</div>
<div className="min-w-0">
<p className="font-label-sm text-label-sm text-on-surface font-semibold">Tri-Equilibrium Synchronized</p>
<p className="font-body-sm text-body-sm text-on-surface-variant truncate">“He who orders his hours in rhythm finds stillness in motion.”</p>
</div>
</div>
</div>
</main>
      <BottomNavBar activeTab="more" isDarkMode={${isDark ? 'true' : 'false'}} setActiveTab={setActiveTab} />
    </>
  );
}
`;
}

const lightCode = buildScreen(false);
const darkCode = buildScreen(true);

fs.writeFileSync('src/CalendarsMainLightMode.jsx', lightCode, 'utf8');
fs.writeFileSync('src/CalendarsMainDarkMode.jsx', darkCode, 'utf8');

console.log('CalendarsMain files generated successfully');
console.log('Light lines:', lightCode.split('\n').length);
console.log('Dark lines:', darkCode.split('\n').length);

