import React from 'react';

import { Calendar, Bell } from 'lucide-react';

export default function CalendarsMainLightMode({ setActiveTab }) {
  return (
    <>
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-indigo-950 tracking-tight" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>
            Calendars & Time
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"><Bell className="w-5 h-5"/></button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            A
          </div>
        </div>
      </div><main className="flex flex-col relative w-full pb-28 min-h-screen bg-surface px-margin"><div className="flex flex-col w-full pb-8 space-y-4">
{/*  Subtle Ambient Glow Orbs  */}
<div className="relative w-full">
<div className="absolute -top-10 -left-6 w-52 h-52 bg-secondary-fixed/40 rounded-full blur-3xl pointer-events-none"></div>
<div className="absolute top-24 -right-8 w-60 h-60 bg-tertiary-fixed/30 rounded-full blur-3xl pointer-events-none"></div>
{/*  Header Section  */}
<div className="relative flex flex-col pt-1 pb-2">
<div className="flex items-center justify-between">
<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md shadow-sm">
<span className="text-[13px] text-slate-800" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>✨</span>
<span className="font-label-sm text-label-sm text-indigo-950 font-semibold tracking-wide uppercase" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>Tri-Calendar Sync</span>
</div>
<div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high/60 backdrop-blur-md">
<span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
<span className="font-label-sm text-label-sm text-slate-800 font-medium" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>Kabul (UTC+4:30)</span>
</div>
</div>
<h2 className="font-headline-lg text-headline-lg text-indigo-950 tracking-tight mt-3" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>Calendars & Time</h2>
<p className="font-body-sm text-body-sm text-slate-800 mt-0.5" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>Harmonize civil, spiritual, and solar rhythms seamlessly</p>
</div>
{/*  Triple-Date Hero Glass Card  */}
<div className="relative rounded-2xl p-space-lg overflow-hidden bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
{/*  Top Decorative Aura Bar  */}
<div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-secondary to-tertiary-container"></div>
<div className="flex items-center justify-between mb-3">
<div className="inline-flex items-center gap-1.5 bg-primary/10 px-2.5 py-1 rounded-full text-primary">
<span className="material-symbols-outlined text-[15px]">today</span>
<span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider">Active Confluence</span>
</div>
<button className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-on-primary font-label-sm text-label-sm shadow-sm transition-transform active:scale-95" id="todayJumpBtn">
<span className="w-1.5 h-1.5 rounded-full bg-on-primary"></span>
<span>Today</span>
</button>
</div>
{/*  Dates Stack  */}
<div className="space-y-3 mt-1">
{/*  Gregorian  */}
<div className="flex items-center justify-between p-2.5 rounded-xl bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<div className="flex items-center gap-2.5">
<div className="w-7 h-7 rounded-lg bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
<span className="material-symbols-outlined text-[17px]">event</span>
</div>
<div>
<p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Civil • Gregorian</p>
<p className="font-headline-sm text-headline-sm text-on-surface">Saturday, Oct 24, 2026</p>
</div>
</div>
<span className="font-label-sm text-label-sm text-primary font-semibold px-2 py-0.5 rounded-md bg-primary-fixed/50">Primary</span>
</div>
{/*  Islamic / Hijri  */}
<div className="flex items-center justify-between p-2.5 rounded-xl bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<div className="flex items-center gap-2.5">
<div className="w-7 h-7 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
<span className="material-symbols-outlined text-[17px]">bedtime</span>
</div>
<div>
<p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Lunar • Hijri Qamari</p>
<p className="font-headline-sm text-headline-sm text-on-surface">13 Rabi' al-Thani, 1448 AH</p>
</div>
</div>
<span className="font-label-sm text-label-sm text-secondary font-medium px-2 py-0.5 rounded-md bg-secondary-fixed/50">Gibbous 96%</span>
</div>
{/*  Solar / Afghan Shamsi  */}
<div className="flex items-center justify-between p-2.5 rounded-xl bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<div className="flex items-center gap-2.5">
<div className="w-7 h-7 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
<span className="material-symbols-outlined text-[17px]">wb_sunny</span>
</div>
<div>
<p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Solar • Hijri Shamsi</p>
<p className="font-headline-sm text-headline-sm text-on-surface">2 Aqrab, 1405 SH (عقرب)</p>
</div>
</div>
<span className="font-label-sm text-label-sm text-tertiary font-medium px-2 py-0.5 rounded-md bg-tertiary-fixed/50">Mid-Autumn</span>
</div>
</div>
</div>
</div>
{/*  Calendar System Selection Carousel/Stack  */}
<div className="flex flex-col space-y-2.5">
<div className="flex items-center justify-between px-1">
<h3 className="font-headline-sm text-headline-sm text-indigo-950" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>Dedicated Systems</h3>
<span className="font-label-sm text-label-sm text-slate-800" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>Tap to enter system</span>
</div>
{/*  Card 1: Gregorian  */}
<div className="group relative flex items-center justify-between p-3.5 rounded-2xl transition-all duration-200 active:scale-[0.98] bg-white/70 backdrop-blur-md border border-white/80 shadow-lg" role="button" tabIndex={0}>
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
<span className="font-medium text-on-surface">October 2026</span> • 4 agenda items this week
          </p>
</div>
</div>
<div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
<span className="material-symbols-outlined text-[18px]">chevron_right</span>
</div>
</div>
{/*  Card 2: Islamic Hijri  */}
<div className="group relative flex items-center justify-between p-3.5 rounded-2xl transition-all duration-200 active:scale-[0.98] bg-white/70 backdrop-blur-md border border-white/80 shadow-lg" role="button" tabIndex={0}>
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
<span className="font-medium text-on-surface">Rabi' al-Thani 1448</span> • White Days in 2 days
          </p>
</div>
</div>
<div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:text-secondary transition-colors">
<span className="material-symbols-outlined text-[18px]">chevron_right</span>
</div>
</div>
{/*  Card 3: Afghan Solar  */}
<div className="group relative flex items-center justify-between p-3.5 rounded-2xl transition-all duration-200 active:scale-[0.98] bg-white/70 backdrop-blur-md border border-white/80 shadow-lg" role="button" tabIndex={0}>
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
<span className="font-medium text-on-surface">Aqrab 1405 SH</span> • Autumn Harvest Season
          </p>
</div>
</div>
<div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:text-tertiary transition-colors">
<span className="material-symbols-outlined text-[18px]">chevron_right</span>
</div>
</div>
</div>
{/*  Integrated Multi-Calendar Week Strip  */}
<div className="rounded-3xl p-5 mb-5 space-y-3 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
{/*  View Switcher & Month Navigation  */}
<div className="flex items-center justify-between pb-1">
<div className="flex items-center gap-1">
<button className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface">
<span className="material-symbols-outlined text-[16px]">chevron_left</span>
</button>
<span className="font-headline-sm text-headline-sm text-on-surface px-1">October • Aqrab</span>
<button className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface">
<span className="material-symbols-outlined text-[16px]">chevron_right</span>
</button>
</div>
{/*  Segmented Pill for Views  */}
<div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200/60 text-slate-500 shadow-sm">
<button className="px-3 py-1 rounded-lg bg-white text-indigo-600 font-semibold text-xs shadow-sm">Week</button>
<button className="px-3 py-1 rounded-lg text-slate-500 font-medium text-xs hover:text-slate-700 transition-colors">Month</button>
<button className="px-3 py-1 rounded-lg text-slate-500 font-medium text-xs hover:text-slate-700 transition-colors">Agenda</button>
</div>
</div>
{/*  Synchronized 7-Day Matrix  */}
<div className="grid grid-cols-7 gap-1 text-center">
{/*  Day 1: Wed 21  */}
<div className="flex flex-col items-center py-2 px-1 rounded-xl transition-colors bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<span className="font-label-sm text-[10px] text-on-surface-variant uppercase">Wed</span>
<span className="font-headline-sm text-headline-sm text-on-surface mt-0.5">21</span>
<div className="flex items-center justify-center gap-0.5 mt-1">
<span className="font-label-sm text-[9px] text-secondary font-medium">10</span>
<span className="text-outline-variant text-[8px]">•</span>
<span className="font-label-sm text-[9px] text-tertiary font-medium">29</span>
</div>
</div>
{/*  Day 2: Thu 22  */}
<div className="flex flex-col items-center py-2 px-1 rounded-xl transition-colors bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<span className="font-label-sm text-[10px] text-on-surface-variant uppercase">Thu</span>
<span className="font-headline-sm text-headline-sm text-on-surface mt-0.5">22</span>
<div className="flex items-center justify-center gap-0.5 mt-1">
<span className="font-label-sm text-[9px] text-secondary font-medium">11</span>
<span className="text-outline-variant text-[8px]">•</span>
<span className="font-label-sm text-[9px] text-tertiary font-medium">30</span>
</div>
</div>
{/*  Day 3: Fri 23  */}
<div className="flex flex-col items-center py-2 px-1 rounded-xl bg-secondary-fixed/20 transition-colors">
<span className="font-label-sm text-[10px] text-secondary font-semibold uppercase">Fri</span>
<span className="font-headline-sm text-headline-sm text-secondary font-bold mt-0.5">23</span>
<div className="flex items-center justify-center gap-0.5 mt-1">
<span className="font-label-sm text-[9px] text-secondary font-semibold">12</span>
<span className="text-outline-variant text-[8px]">•</span>
<span className="font-label-sm text-[9px] text-tertiary font-medium">1</span>
</div>
<span className="w-1 h-1 rounded-full bg-secondary mt-1"></span>
</div>
{/*  Day 4: Sat 24 (ACTIVE TODAY)  */}
<div className="relative flex flex-col items-center py-2 px-1 rounded-xl bg-primary text-on-primary shadow-sm scale-105 transform z-10">
<span className="font-label-sm text-[10px] text-on-primary/80 uppercase font-semibold">Sat</span>
<span className="font-headline-sm text-headline-sm text-on-primary font-bold mt-0.5">24</span>
<div className="flex items-center justify-center gap-0.5 mt-1">
<span className="font-label-sm text-[9px] text-secondary-fixed font-bold">13</span>
<span className="text-on-primary/60 text-[8px]">•</span>
<span className="font-label-sm text-[9px] text-tertiary-fixed font-bold">2</span>
</div>
<span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed mt-1"></span>
</div>
{/*  Day 5: Sun 25  */}
<div className="flex flex-col items-center py-2 px-1 rounded-xl transition-colors bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<span className="font-label-sm text-[10px] text-on-surface-variant uppercase">Sun</span>
<span className="font-headline-sm text-headline-sm text-on-surface mt-0.5">25</span>
<div className="flex items-center justify-center gap-0.5 mt-1">
<span className="font-label-sm text-[9px] text-secondary font-medium">14</span>
<span className="text-outline-variant text-[8px]">•</span>
<span className="font-label-sm text-[9px] text-tertiary font-medium">3</span>
</div>
</div>
{/*  Day 6: Mon 26  */}
<div className="flex flex-col items-center py-2 px-1 rounded-xl transition-colors bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<span className="font-label-sm text-[10px] text-on-surface-variant uppercase">Mon</span>
<span className="font-headline-sm text-headline-sm text-on-surface mt-0.5">26</span>
<div className="flex items-center justify-center gap-0.5 mt-1">
<span className="font-label-sm text-[9px] text-secondary font-medium">15</span>
<span className="text-outline-variant text-[8px]">•</span>
<span className="font-label-sm text-[9px] text-tertiary font-medium">4</span>
</div>
<span className="w-1 h-1 rounded-full bg-primary mt-1"></span>
</div>
{/*  Day 7: Tue 27  */}
<div className="flex flex-col items-center py-2 px-1 rounded-xl transition-colors bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<span className="font-label-sm text-[10px] text-on-surface-variant uppercase">Tue</span>
<span className="font-headline-sm text-headline-sm text-on-surface mt-0.5">27</span>
<div className="flex items-center justify-center gap-0.5 mt-1">
<span className="font-label-sm text-[9px] text-secondary font-medium">16</span>
<span className="text-outline-variant text-[8px]">•</span>
<span className="font-label-sm text-[9px] text-tertiary font-medium">5</span>
</div>
</div>
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
<h2 className="font-headline-sm text-headline-sm text-indigo-950" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>Harmonized Flow</h2>
<p className="font-body-sm text-body-sm text-slate-800" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>Saturday • 5 intertwined milestones</p>
</div>
<button className="btn-primary">
<span className="material-symbols-outlined text-[16px]">add</span>
<span>New Item</span>
</button>
</div>
{/*  Timeline Items List  */}
<div className="space-y-2">
{/*  Item 1: Fajr Prayer  */}
<div className="flex items-start gap-3 p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<div className="flex flex-col items-center pt-0.5 min-w-[54px]">
<span className="font-label-sm text-label-sm font-bold text-on-surface">05:12</span>
<span className="font-label-sm text-[10px] text-on-surface-variant uppercase">AM</span>
</div>
<div className="w-1 self-stretch rounded-full bg-secondary my-0.5"></div>
<div className="flex-1 min-w-0">
<div className="flex items-center gap-1.5">
<span className="font-headline-sm text-headline-sm text-on-surface truncate">Fajr & Morning Reflection</span>
<span className="material-symbols-outlined text-secondary text-[16px]">bedtime</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Congregational prayer followed by 15-min mindfulness</p>
<div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-md bg-secondary-fixed/40 text-on-secondary-fixed font-label-sm text-[10px]">
<span>Islamic Spiritual • 13 Rabi' II</span>
</div>
</div>
</div>
{/*  Item 2: Gregorian Work Event  */}
<div className="flex items-start gap-3 p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<div className="flex flex-col items-center pt-0.5 min-w-[54px]">
<span className="font-label-sm text-label-sm font-bold text-on-surface">10:00</span>
<span className="font-label-sm text-[10px] text-on-surface-variant uppercase">AM</span>
</div>
<div className="w-1 self-stretch rounded-full bg-primary my-0.5"></div>
<div className="flex-1 min-w-0">
<div className="flex items-center gap-1.5">
<span className="font-headline-sm text-headline-sm text-on-surface truncate">Q4 Financial & Budget Review</span>
<span className="material-symbols-outlined text-primary text-[16px]">business_center</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Strategic alignment session with regional operations lead</p>
<div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-md bg-primary-fixed/40 text-on-primary-fixed font-label-sm text-[10px]">
<span>Civil Calendar • Q4 Milestone</span>
</div>
</div>
</div>
{/*  Item 3: Dhuhr Prayer  */}
<div className="flex items-start gap-3 p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<div className="flex flex-col items-center pt-0.5 min-w-[54px]">
<span className="font-label-sm text-label-sm font-bold text-on-surface">01:05</span>
<span className="font-label-sm text-[10px] text-on-surface-variant uppercase">PM</span>
</div>
<div className="w-1 self-stretch rounded-full bg-secondary my-0.5"></div>
<div className="flex-1 min-w-0">
<div className="flex items-center gap-1.5">
<span className="font-headline-sm text-headline-sm text-on-surface truncate">Dhuhr Prayer & Pause</span>
<span className="material-symbols-outlined text-secondary text-[16px]">wb_sunny</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Midday spiritual stillness & hydration check</p>
<div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-md bg-secondary-fixed/40 text-on-secondary-fixed font-label-sm text-[10px]">
<span>Islamic Spiritual • Solar Zenith</span>
</div>
</div>
</div>
{/*  Item 4: Solar Seasonal Event  */}
<div className="flex items-start gap-3 p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<div className="flex flex-col items-center pt-0.5 min-w-[54px]">
<span className="font-label-sm text-label-sm font-bold text-on-surface">03:30</span>
<span className="font-label-sm text-[10px] text-on-surface-variant uppercase">PM</span>
</div>
<div className="w-1 self-stretch rounded-full bg-tertiary my-0.5"></div>
<div className="flex-1 min-w-0">
<div className="flex items-center gap-1.5">
<span className="font-headline-sm text-headline-sm text-on-surface truncate">Autumn Tea & Family Walk</span>
<span className="material-symbols-outlined text-tertiary text-[16px]">nature_people</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Outdoor gathering celebrating the onset of month of Aqrab</p>
<div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-md bg-tertiary-fixed/50 text-on-tertiary-fixed font-label-sm text-[10px]">
<span>Solar Shamsi • 2 Aqrab Season</span>
</div>
</div>
</div>
{/*  Item 5: Isha Prayer & Study  */}
<div className="flex items-start gap-3 p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<div className="flex flex-col items-center pt-0.5 min-w-[54px]">
<span className="font-label-sm text-label-sm font-bold text-on-surface">07:15</span>
<span className="font-label-sm text-[10px] text-on-surface-variant uppercase">PM</span>
</div>
<div className="w-1 self-stretch rounded-full bg-secondary my-0.5"></div>
<div className="flex-1 min-w-0">
<div className="flex items-center gap-1.5">
<span className="font-headline-sm text-headline-sm text-on-surface truncate">Isha Prayer & Night Reading</span>
<span className="material-symbols-outlined text-secondary text-[16px]">menu_book</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Closing cycle of the day; 20 minutes philosophical prose</p>
<div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-md bg-secondary-fixed/40 text-on-secondary-fixed font-label-sm text-[10px]">
<span>Islamic Spiritual • Nightfall</span>
</div>
</div>
</div>
</div>
</div>
{/*  Micro-Reflection Quote Pill  */}
<div className="rounded-2xl p-4 flex items-center gap-3 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<div className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-xs shrink-0">
<span className="material-symbols-outlined text-[18px]">auto_awesome</span>
</div>
<div className="min-w-0">
<p className="font-label-sm text-label-sm text-on-surface font-semibold">Tri-Equilibrium Synchronized</p>
<p className="font-body-sm text-body-sm text-on-surface-variant truncate">“He who orders his hours in rhythm finds stillness in motion.”</p>
</div>
</div>
</div>
</main><nav className="fixed bottom-0 w-full z-50 pb-safe px-margin pointer-events-none" data-active-classes="font-label-md"><div className="pointer-events-auto mx-auto max-w-md mb-space-md h-16 rounded-lg bg-surface-container-lowest/85 backdrop-blur-3xl shadow-[0_16px_40px_rgba(30,45,90,0.12)] flex items-center justify-around px-space-xs"><a aria-current="page" className="flex flex-col items-center justify-center min-w-[52px] h-12 transition-colors text-primary font-label-md" data-path="momentum-home" href="#"><span className="material-symbols-outlined text-[22px]">home</span><span className="font-label-sm text-label-sm mt-0.5">Home</span></a><a className="flex flex-col items-center justify-center min-w-[52px] h-12 text-on-surface-variant hover:text-on-surface transition-colors" data-path="calendar-finance" href="#"><span className="material-symbols-outlined text-[22px]">payments</span><span className="font-label-sm text-label-sm mt-0.5">Finance</span></a><div className="relative flex items-center justify-center min-w-[52px] h-12"><a aria-label="Create new calendar item" className="absolute -top-5 w-14 h-14 rounded-full bg-gradient-to-tr from-primary via-secondary to-tertiary-container text-on-primary flex items-center justify-center shadow-[0_10px_24px_-2px_rgba(79,107,255,0.45)] ring-4 ring-surface" data-path="quick-create-event" href="#"><span className="material-symbols-outlined text-[28px]">add</span></a></div><a className="flex flex-col items-center justify-center min-w-[52px] h-12 text-on-surface-variant hover:text-on-surface transition-colors" data-path="calendar-tasks" href="#"><span className="material-symbols-outlined text-[22px]">check_circle</span><span className="font-label-sm text-label-sm mt-0.5">Tasks</span></a><a className="flex flex-col items-center justify-center min-w-[52px] h-12 text-on-surface-variant hover:text-on-surface transition-colors" data-path="calendar-more" href="#"><span className="material-symbols-outlined text-[22px]">grid_view</span><span className="font-label-sm text-label-sm mt-0.5">More</span></a></div></nav>
    </>
  );
}
