import React from 'react';

import { Calendar, ArrowLeft } from 'lucide-react';

export default function AfghanSolarHijriShamsiCalendarDarkMode({ setActiveTab }) {
  return (
    <>
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-white tracking-tight">
            Afghan Solar Calendar
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setActiveTab && setActiveTab('home_dashboard_dark_mode')} className="p-2 rounded-full text-slate-300 hover:bg-slate-800 transition-colors"><ArrowLeft className="w-5 h-5"/></button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            A
          </div>
        </div>
      </div><main className="flex flex-col relative w-full pb-safe min-h-screen bg-surface px-margin"><div className="flex flex-col w-full pb-28 space-y-4">
{/*  Subtle Atmospheric Backdrop Glow  */}
<div className="relative w-full rounded-2xl p-space-lg overflow-hidden bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
<div className="absolute -top-12 -right-12 w-48 h-48 bg-primary-fixed-dim/40 rounded-full blur-3xl pointer-events-none"></div>
<div className="absolute -bottom-10 -left-10 w-44 h-44 bg-secondary-fixed/50 rounded-full blur-3xl pointer-events-none"></div>
{/*  Seasonal & Cultural Top Banner  */}
<div className="relative z-10 flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="px-space-md py-1 rounded-full bg-surface-container-high/80 text-secondary font-label-md text-label-md flex items-center gap-1 shadow-sm">
<span>🍂</span>
<span>پاییز • Autumn</span>
</span>
<span className="px-space-md py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm">
          Month 8 of 12
        </span>
</div>
<div className="flex items-center gap-1 px-space-md py-1 rounded-full bg-surface-container-lowest/80 text-slate-400 font-label-sm text-label-sm shadow-sm">
<span className="material-symbols-outlined text-[16px] text-tertiary">water_drop</span>
<span>Aquifer Season</span>
</div>
</div>
{/*  Month & Year Controls  */}
<div className="flex items-center justify-between mt-4">
  <button aria-label="Previous Month" className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors">
    <span className="material-symbols-outlined text-[18px]">chevron_left</span>
  </button>
  <div className="flex flex-col items-center text-center px-2">
    <div className="flex items-center gap-2">
      <h2 className="text-xl font-bold tracking-tight text-white">Aqrab 1405 SH</h2>
      <span className="text-sm font-medium tracking-wide text-slate-400 font-bahij">عقرب ۱۴۰۵</span>
    </div>
    <p className="text-xs font-normal mt-0.5 text-slate-400">
      Scorpio (<span className="font-bahij">لړم</span>) • Oct 23 – Nov 21, 2026 • 30 Days
    </p>
  </div>
  <button aria-label="Next Month" className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors">
    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
  </button>
</div>
{/*  Solar Calendar Grid (30 Days)  */}
{/*  Solar Calendar Grid (30 Days)  */}
<div className="rounded-3xl p-5 mb-4 flex flex-col bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
{/*  Afghan Weekday Headers: Saturday (Shanbeh) through Friday (Jom'eh)  */}
<div className="grid grid-cols-7 gap-1 text-center mb-2 pb-1">
<div className="flex flex-col py-1">
<span className="text-xs font-normal text-slate-400 uppercase">Sh</span>
<span className="text-xs font-normal font-bahij text-slate-400" dir="rtl">شنبه</span>
</div>
<div className="flex flex-col py-1">
<span className="text-xs font-normal text-slate-400 uppercase">Yak</span>
<span className="text-xs font-normal font-bahij text-slate-400" dir="rtl">یکشنبه</span>
</div>
<div className="flex flex-col py-1">
<span className="text-xs font-normal text-slate-400 uppercase">Do</span>
<span className="text-xs font-normal font-bahij text-slate-400" dir="rtl">دوشنبه</span>
</div>
<div className="flex flex-col py-1">
<span className="text-xs font-normal text-slate-400 uppercase">Seh</span>
<span className="text-xs font-normal font-bahij text-slate-400" dir="rtl">سه‌شنبه</span>
</div>
<div className="flex flex-col py-1">
<span className="text-xs font-normal text-slate-400 uppercase">Ch</span>
<span className="text-xs font-normal font-bahij text-slate-400" dir="rtl">چهارشنبه</span>
</div>
<div className="flex flex-col py-1">
<span className="text-xs font-normal text-slate-400 uppercase">Panj</span>
<span className="text-xs font-normal font-bahij text-slate-400" dir="rtl">پنج‌شنبه</span>
</div>
{/*  Friday Weekend Highlight  */}
<div className="flex flex-col py-1 rounded-lg bg-secondary-fixed/30 text-secondary">
<span className="text-xs font-bold text-indigo-400">Jom</span>
<span className="text-xs font-bold font-bahij text-indigo-400" dir="rtl">جمعه</span>
</div>
</div>
{/*  Calendar 30-Day Grid Layout (1405 SH Aqrab starts Friday: offset 6)  */}
<div className="grid grid-cols-7 gap-1">
{/*  Trailing previous month spacers (Hamal/Mizan tail)  */}
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all opacity-40 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
        <span className="text-xs font-bold font-mono">25</span>
        <span className="text-[10px] leading-tight opacity-90">17</span>
        <span className="text-[9px] opacity-60"></span>
      </div>
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all opacity-40 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
        <span className="text-xs font-bold font-mono">26</span>
        <span className="text-[10px] leading-tight opacity-90">18</span>
        <span className="text-[9px] opacity-60"></span>
      </div>
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all opacity-40 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
        <span className="text-xs font-bold font-mono">27</span>
        <span className="text-[10px] leading-tight opacity-90">19</span>
        <span className="text-[9px] opacity-60"></span>
      </div>
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all opacity-40 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
        <span className="text-xs font-bold font-mono">28</span>
        <span className="text-[10px] leading-tight opacity-90">20</span>
        <span className="text-[9px] opacity-60"></span>
      </div>
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all opacity-40 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
        <span className="text-xs font-bold font-mono">29</span>
        <span className="text-[10px] leading-tight opacity-90">21</span>
        <span className="text-[9px] opacity-60"></span>
      </div>
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all opacity-40 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
        <span className="text-xs font-bold font-mono">30</span>
        <span className="text-[10px] leading-tight opacity-90">22</span>
        <span className="text-[9px] opacity-60"></span>
      </div>
{/*  Day 1 (Friday - Start of Aqrab 1405)  */}
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all hover:bg-slate-800/50 cursor-pointer">
        <span className="text-xs font-bold font-mono text-slate-300">۱</span>
        <span className="text-[10px] leading-tight opacity-90 text-slate-400">23</span>
        <span className="text-[9px] opacity-60 text-slate-500">12</span>
      </div>
{/*  Day 2 (Saturday - TODAY)  */}
<div className="min-h-[58px] p-1.5 rounded-xl bg-gradient-to-br from-primary via-primary-container to-secondary text-on-primary shadow-md relative overflow-hidden ring-2 ring-primary-fixed">
<div className="flex items-center justify-between">
<span className="font-headline-sm text-headline-sm font-bold text-on-primary">۲</span>
<span className="px-1 py-0.2 rounded-full bg-surface-container-lowest/20 text-[9px] font-bold">TODAY</span>
</div>
<div className="flex items-center justify-between text-[10px] text-on-primary/90 mt-1">
<span className="font-label-sm font-semibold">24 Oct</span>
<span className="text-[9px]">13 R2</span>
</div>
</div>
{/*  Day 3 (Sunday - UN Day)  */}
<div className="min-h-[58px] p-1.5 rounded-xl flex flex-col justify-between relative cursor-pointer bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
<div className="flex items-center justify-between">
<span className="font-headline-sm text-headline-sm text-on-surface">۳</span>
<span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
</div>
<div className="flex items-center justify-between text-[10px] text-on-surface-variant">
<span className="font-label-sm">25</span>
<span className="text-[9px] text-outline">14</span>
</div>
</div>
{/*  Day 4  */}
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all hover:bg-slate-800/50 cursor-pointer">
        <span className="text-xs font-bold font-mono text-slate-300">۴</span>
        <span className="text-[10px] leading-tight opacity-90 text-slate-400">26</span>
        <span className="text-[9px] opacity-60 text-slate-500">15</span>
      </div>
{/*  Day 5  */}
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all hover:bg-slate-800/50 cursor-pointer">
        <span className="text-xs font-bold font-mono text-slate-300">۵</span>
        <span className="text-[10px] leading-tight opacity-90 text-slate-400">27</span>
        <span className="text-[9px] opacity-60 text-slate-500">16</span>
      </div>
{/*  Day 6  */}
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all hover:bg-slate-800/50 cursor-pointer">
        <span className="text-xs font-bold font-mono text-slate-300">۶</span>
        <span className="text-[10px] leading-tight opacity-90 text-slate-400">28</span>
        <span className="text-[9px] opacity-60 text-slate-500">17</span>
      </div>
{/*  Day 7 (Farmers Day)  */}
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all hover:bg-slate-800/50 cursor-pointer">
        <span className="text-xs font-bold font-mono text-slate-300">۷</span>
        <span className="text-[10px] leading-tight opacity-90 text-slate-400">29</span>
        <span className="text-[9px] opacity-60 text-slate-500">18</span>
      </div>
{/*  Day 8 (Friday Weekend)  */}
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all hover:bg-slate-800/50 cursor-pointer">
        <span className="text-xs font-bold font-mono text-slate-300">۸</span>
        <span className="text-[10px] leading-tight opacity-90 text-slate-400">30</span>
        <span className="text-[9px] opacity-60 text-slate-500">19</span>
      </div>
{/*  Day 9 to Day 15  */}
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all hover:bg-slate-800/50 cursor-pointer">
        <span className="text-xs font-bold font-mono text-slate-300">۹</span>
        <span className="text-[10px] leading-tight opacity-90 text-slate-400">31</span>
        <span className="text-[9px] opacity-60 text-slate-500">20</span>
      </div>
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all hover:bg-slate-800/50 cursor-pointer">
        <span className="text-xs font-bold font-mono text-slate-300">۱۰</span>
        <span className="text-[10px] leading-tight opacity-90 text-slate-400">1 Nov</span>
        <span className="text-[9px] opacity-60 text-slate-500">21</span>
      </div>
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all hover:bg-slate-800/50 cursor-pointer">
        <span className="text-xs font-bold font-mono text-slate-300">۱۱</span>
        <span className="text-[10px] leading-tight opacity-90 text-slate-400">2</span>
        <span className="text-[9px] opacity-60 text-slate-500">22</span>
      </div>
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all hover:bg-slate-800/50 cursor-pointer">
        <span className="text-xs font-bold font-mono text-slate-300">۱۲</span>
        <span className="text-[10px] leading-tight opacity-90 text-slate-400">3</span>
        <span className="text-[9px] opacity-60 text-slate-500">23</span>
      </div>
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all hover:bg-slate-800/50 cursor-pointer">
        <span className="text-xs font-bold font-mono text-slate-300">۱۳</span>
        <span className="text-[10px] leading-tight opacity-90 text-slate-400">4</span>
        <span className="text-[9px] opacity-60 text-slate-500">24</span>
      </div>
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all hover:bg-slate-800/50 cursor-pointer">
        <span className="text-xs font-bold font-mono text-slate-300">۱۴</span>
        <span className="text-[10px] leading-tight opacity-90 text-slate-400">5</span>
        <span className="text-[9px] opacity-60 text-slate-500">25</span>
      </div>
{/*  Day 15 (Friday)  */}
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all hover:bg-slate-800/50 cursor-pointer">
        <span className="text-xs font-bold font-mono text-slate-300">۱۵</span>
        <span className="text-[10px] leading-tight opacity-90 text-slate-400">6</span>
        <span className="text-[9px] opacity-60 text-slate-500">26</span>
      </div>
{/*  Day 16 to Day 22  */}
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all hover:bg-slate-800/50 cursor-pointer">
        <span className="text-xs font-bold font-mono text-slate-300">۱۶</span>
        <span className="text-[10px] leading-tight opacity-90 text-slate-400">7</span>
        <span className="text-[9px] opacity-60 text-slate-500">27</span>
      </div>
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all hover:bg-slate-800/50 cursor-pointer">
        <span className="text-xs font-bold font-mono text-slate-300">۱۷</span>
        <span className="text-[10px] leading-tight opacity-90 text-slate-400">8</span>
        <span className="text-[9px] opacity-60 text-slate-500">28</span>
      </div>
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all hover:bg-slate-800/50 cursor-pointer">
        <span className="text-xs font-bold font-mono text-slate-300">۱۸</span>
        <span className="text-[10px] leading-tight opacity-90 text-slate-400">9</span>
        <span className="text-[9px] opacity-60 text-slate-500">29</span>
      </div>
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all hover:bg-slate-800/50 cursor-pointer">
        <span className="text-xs font-bold font-mono text-slate-300">۱۹</span>
        <span className="text-[10px] leading-tight opacity-90 text-slate-400">10</span>
        <span className="text-[9px] opacity-60 text-slate-500">30</span>
      </div>
{/*  Day 20 (Literature Day)  */}
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all hover:bg-slate-800/50 cursor-pointer">
        <span className="text-xs font-bold font-mono text-slate-300">۲۰</span>
        <span className="text-[10px] leading-tight opacity-90 text-slate-400">11</span>
        <span className="text-[9px] opacity-60 text-slate-500">1 J1</span>
      </div>
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all hover:bg-slate-800/50 cursor-pointer">
        <span className="text-xs font-bold font-mono text-slate-300">۲۱</span>
        <span className="text-[10px] leading-tight opacity-90 text-slate-400">12</span>
        <span className="text-[9px] opacity-60 text-slate-500">2</span>
      </div>
{/*  Day 22 (Friday)  */}
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all hover:bg-slate-800/50 cursor-pointer">
        <span className="text-xs font-bold font-mono text-slate-300">۲۲</span>
        <span className="text-[10px] leading-tight opacity-90 text-slate-400">13</span>
        <span className="text-[9px] opacity-60 text-slate-500">3</span>
      </div>
{/*  Day 23 to Day 29  */}
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all hover:bg-slate-800/50 cursor-pointer">
        <span className="text-xs font-bold font-mono text-slate-300">۲۳</span>
        <span className="text-[10px] leading-tight opacity-90 text-slate-400">14</span>
        <span className="text-[9px] opacity-60 text-slate-500">4</span>
      </div>
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all hover:bg-slate-800/50 cursor-pointer">
        <span className="text-xs font-bold font-mono text-slate-300">۲۴</span>
        <span className="text-[10px] leading-tight opacity-90 text-slate-400">15</span>
        <span className="text-[9px] opacity-60 text-slate-500">5</span>
      </div>
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all hover:bg-slate-800/50 cursor-pointer">
        <span className="text-xs font-bold font-mono text-slate-300">۲۵</span>
        <span className="text-[10px] leading-tight opacity-90 text-slate-400">16</span>
        <span className="text-[9px] opacity-60 text-slate-500">6</span>
      </div>
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all hover:bg-slate-800/50 cursor-pointer">
        <span className="text-xs font-bold font-mono text-slate-300">۲۶</span>
        <span className="text-[10px] leading-tight opacity-90 text-slate-400">17</span>
        <span className="text-[9px] opacity-60 text-slate-500">7</span>
      </div>
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all hover:bg-slate-800/50 cursor-pointer">
        <span className="text-xs font-bold font-mono text-slate-300">۲۷</span>
        <span className="text-[10px] leading-tight opacity-90 text-slate-400">18</span>
        <span className="text-[9px] opacity-60 text-slate-500">8</span>
      </div>
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all hover:bg-slate-800/50 cursor-pointer">
        <span className="text-xs font-bold font-mono text-slate-300">۲۸</span>
        <span className="text-[10px] leading-tight opacity-90 text-slate-400">19</span>
        <span className="text-[9px] opacity-60 text-slate-500">9</span>
      </div>
{/*  Day 29 (Friday)  */}
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all hover:bg-slate-800/50 cursor-pointer">
        <span className="text-xs font-bold font-mono text-slate-300">۲۹</span>
        <span className="text-[10px] leading-tight opacity-90 text-slate-400">20</span>
        <span className="text-[9px] opacity-60 text-slate-500">10</span>
      </div>
{/*  Day 30 (Last Day of Aqrab)  */}
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all hover:bg-slate-800/50 cursor-pointer">
        <span className="text-xs font-bold font-mono text-slate-300">۳۰</span>
        <span className="text-[10px] leading-tight opacity-90 text-slate-400">21</span>
        <span className="text-[9px] opacity-60 text-slate-500">11</span>
      </div>
{/*  Spacers for next month (Qaws / Sagittarius)  */}
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all opacity-40 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
        <span className="text-xs font-bold font-mono">1</span>
        <span className="text-[10px] leading-tight opacity-90">22</span>
        <span className="text-[9px] opacity-60"></span>
      </div>
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all opacity-40 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
        <span className="text-xs font-bold font-mono">2</span>
        <span className="text-[10px] leading-tight opacity-90">23</span>
        <span className="text-[9px] opacity-60"></span>
      </div>
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all opacity-40 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
        <span className="text-xs font-bold font-mono">3</span>
        <span className="text-[10px] leading-tight opacity-90">24</span>
        <span className="text-[9px] opacity-60"></span>
      </div>
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all opacity-40 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
        <span className="text-xs font-bold font-mono">4</span>
        <span className="text-[10px] leading-tight opacity-90">25</span>
        <span className="text-[9px] opacity-60"></span>
      </div>
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all opacity-40 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
        <span className="text-xs font-bold font-mono">5</span>
        <span className="text-[10px] leading-tight opacity-90">26</span>
        <span className="text-[9px] opacity-60"></span>
      </div>
<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all opacity-40 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
        <span className="text-xs font-bold font-mono">6</span>
        <span className="text-[10px] leading-tight opacity-90">27</span>
        <span className="text-[9px] opacity-60"></span>
      </div>
</div>
</div>


{/*  Selected Date Details: 2 Aqrab 1405 SH  */}
<div className="rounded-3xl p-5 mb-4 space-y-4 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
{/*  Header of Selected Date  */}
<div className="flex items-start justify-between">
<div>
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
<h3 className="text-base font-bold tracking-tight text-white">Shanbeh, 2 Aqrab 1405</h3>
</div>
<p className="font-body-sm text-body-sm text-slate-200 font-medium mt-0.5">
          24 October 2026 • 13 Rabi' al-Thani 1448 AH
        </p>
</div>
<span className="px-space-md py-1 rounded-full bg-secondary-fixed/50 text-secondary font-label-sm text-label-sm font-semibold">
        امروز
      </span>
</div>
{/* Solar & Astronomical Insight Pill Grid (Flattened) */}
<div className="flex items-center gap-6 pt-2">
  <div className="flex items-center gap-2">
    <span className="material-symbols-outlined text-primary text-[20px]">wb_twilight</span>
    <span className="text-sm font-semibold text-white">10h 52m Daylight</span>
  </div>
  <div className="flex items-center gap-2">
    <span className="material-symbols-outlined text-secondary text-[20px]">agriculture</span>
    <span className="text-sm font-semibold text-white">Mid-Autumn Harvest</span>
  </div>
</div>
</div>

{/* Cultural & National Occasions Ahead */}
<div className="rounded-3xl p-5 mb-5 space-y-4 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
<div className="space-y-2 pt-1">
<div className="flex items-center justify-between">
<span className="text-base font-bold tracking-tight text-white">Afghan Solar Highlights</span>
<span className="text-xs font-medium text-slate-300">Aqrab Festivals</span>
</div>
{/*  Card 1  */}
<div className="flex items-start gap-3">
<div className="rounded-2xl w-12 h-12 bg-indigo-950/40 border border-indigo-500/30 text-indigo-400 flex flex-col items-center justify-center shrink-0">
<span className="font-headline-sm text-[13px] font-bold text-indigo-400 leading-none">۳</span>
<span className="font-label-sm text-[9px] text-indigo-400 uppercase">Aqrab</span>
</div>
<div className="min-w-0 flex-1">
<div className="flex items-center gap-1.5">
<h4 className="font-label-md text-label-md text-white truncate">UN Day in Afghanistan</h4>
<span className="px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold">Tomorrow</span>
</div>
<p className="font-body-sm text-body-sm text-slate-200 font-medium line-clamp-1">
            Youth development roundtables & regional humanitarian dialogues.
          </p>
</div>
</div>
{/*  Card 2  */}
<div className="flex items-start gap-3">
<div className="rounded-2xl w-12 h-12 bg-indigo-950/40 border border-indigo-500/30 text-indigo-400 flex flex-col items-center justify-center shrink-0">
<span className="font-headline-sm text-[13px] font-bold text-indigo-400 leading-none">۷</span>
<span className="font-label-sm text-[9px] text-indigo-400 uppercase">Aqrab</span>
</div>
<div className="min-w-0 flex-1">
<h4 className="font-label-md text-label-md text-white truncate">Pomegranate Harvest Festival</h4>
<p className="font-body-sm text-body-sm text-slate-200 font-medium line-clamp-1">
            جشن انار قندهار و تاشقرغان • Cultural agro-expos and market fairs.
          </p>
</div>
</div>
{/*  Card 3  */}
<div className="flex items-start gap-3">
<div className="rounded-2xl w-12 h-12 bg-slate-800/80 text-slate-400 flex flex-col items-center justify-center shrink-0">
<span className="font-headline-sm text-[13px] font-bold text-white leading-none">۲۰</span>
<span className="font-label-sm text-[9px] text-white uppercase">Aqrab</span>
</div>
<div className="min-w-0 flex-1">
<h4 className="font-label-md text-label-md text-white truncate">Eastern Literature & Iqbal Day</h4>
<p className="font-body-sm text-body-sm text-slate-200 font-medium line-clamp-1">
            Poetic recitations across Kabul, Balkh, and Herat universities.
          </p>
</div>
</div>
</div>
</div>

{/* Scheduled Routines for 2 Aqrab */}
<div className="rounded-3xl p-5 mb-5 space-y-4 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
<div className="space-y-2 pt-2">
<div className="flex items-center justify-between">
<span className="text-base font-bold tracking-tight text-white">Daily Schedule (امروز)</span>
<span className="text-xs font-medium text-slate-300">2 Reminders</span>
</div>
<div className="space-y-1.5">
<div className="flex items-center justify-between py-1">
<div className="flex items-center gap-space-sm">
<span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
<span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
</span>
<span className="font-body-md text-body-md text-white font-medium">Kabul Central Market Logistics Check</span>
</div>
<span className="font-label-sm text-label-sm text-primary font-semibold">11:30 AM</span>
</div>
<div className="flex items-center justify-between py-1">
<div className="flex items-center gap-space-sm">
<span className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center">
<span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
</span>
<span className="font-body-md text-body-md text-white font-medium">Garden & Orchard Winterization Prep</span>
</div>
<span className="font-label-sm text-label-sm text-secondary font-semibold">04:30 PM</span>
</div>
</div>
</div>
</div>

{/* Primary Momentum Gradient Action Trigger */}
<div className="pt-2">
<button className="btn-primary w-full">
<span className="material-symbols-outlined w-5 h-5 flex-shrink-0 text-white text-[20px] flex items-center justify-center">add_circle</span>
<span className="text-center leading-snug text-sm sm:text-base">Add Solar Event / National Reminder</span>
</button>
</div>
</div></div></main>
    </>
  );
}
