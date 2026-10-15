import React from 'react';

import { 
  ArrowLeft, FolderArchive, Calendar, SlidersHorizontal, CheckCircle2, Upload, Play, Quote, PlusCircle, History 
} from 'lucide-react';

export default function DhikrHistoryDarkMode({ setActiveTab }) {
  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col justify-between relative overflow-x-hidden select-none">
      
      {/* SCROLLABLE MAIN CONTENT (pb-40 guarantees that no card is hidden) */}
      <div className="flex-1 overflow-y-auto pb-40">
        
        {/* 1. TOP HEADER BAR */}
        <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <History className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-white tracking-tight">
            Dhikr History
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveTab && setActiveTab('home_dashboard_dark_mode')}
            className="p-2 rounded-full text-slate-300 hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            A
          </div>
        </div>
      </div>

        {/* 2. SUB-BAR: DATE & DESCRIPTION */}
        <div className="px-5 pt-2 pb-3">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-indigo-400"/>
              <span>Today • Oct 24, 2026</span>
            </div>
            <button className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 shadow-2xs transition-colors">
              <SlidersHorizontal className="w-4 h-4"/>
            </button>
          </div>
          <p className="text-xs font-normal text-slate-400">
            Reflect upon your daily dhikr milestones and spiritual consistency.
          </p>
        </div>

        {/* 3. TODAY'S RECITATIONS HERO CARD (ROUNDED-3XL WITH SOFT SHADOW) */}
        <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Today's Recitations</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-300 bg-teal-950/40 px-2.5 py-0.5 rounded-full border border-teal-500/30">
              <CheckCircle2 className="w-3 h-3 text-teal-400"/>
              Surpassed Goal
            </span>
          </div>

          <div className="pt-0.5">
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-bold text-indigo-400">1,254</h2>
              <span className="text-xs font-medium text-slate-400">dhikr completed</span>
            </div>
          </div>

          {/* 3-Column Metrics Grid */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800">
            <div className="p-2.5 rounded-2xl text-center bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
              <span className="text-[10px] font-medium text-slate-400 block">Sessions</span>
              <span className="text-sm font-bold text-white mt-0.5 block">8</span>
              <span className="text-[10px] text-slate-400 block">Target 6</span>
            </div>
            <div className="p-2.5 rounded-2xl text-center bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
              <span className="text-[10px] font-medium text-slate-400 block">Active Streak</span>
              <span className="text-sm font-bold text-white mt-0.5 block">14d 🔥</span>
              <span className="text-[10px] text-slate-400 block">Personal best</span>
            </div>
            <div className="p-2.5 rounded-2xl text-center bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
              <span className="text-[10px] font-medium text-slate-400 block">Goal Met</span>
              <span className="text-sm font-bold text-teal-400 mt-0.5 block">125%</span>
              <span className="text-[10px] text-slate-400 block">1,000 baseline</span>
            </div>
          </div>

          {/* Time Filter Segmented Tabs */}
          <div className="p-1 rounded-2xl bg-slate-800/80 border border-slate-700/70 flex items-center gap-1">
            <button className="flex-1 py-1.5 rounded-xl bg-slate-700 text-xs font-semibold text-white shadow-xs text-center">Today</button>
            <button className="flex-1 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white text-center">This Week</button>
            <button className="flex-1 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white text-center">This Month</button>
            <button className="flex-1 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white text-center">All Time</button>
          </div>
        </div>

        {/* 4. TIMELINE HEADER */}
        <div className="flex items-center justify-between px-5 mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Timeline</h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-950/50 border border-indigo-500/30 text-indigo-300">
              5 Recorded
            </span>
          </div>
          <button className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300">
            <span>Export Log</span>
            <Upload className="w-3.5 h-3.5"/>
          </button>
        </div>

        {/* 5. TIMELINE CARDS (ROUNDED-3XL WITH SOFT SHADOWS) */}
        
        {/* Card 1 */}
        <div className="block mx-5 mb-3.5 p-4 rounded-3xl space-y-3 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400"/>
              <span className="text-xs font-medium text-slate-400">Today • 08:45 PM</span>
            </div>
            <span className="text-xs font-semibold text-teal-400">Completed</span>
          </div>
          <h4 className="text-sm font-bold text-white">SubhanAllah wa bi-Hamdih</h4>
          <div className="grid grid-cols-3 gap-2 text-xs border-t border-slate-800 pt-2.5">
            <div>
              <span className="text-[10px] text-slate-400 block">Total Recited</span>
              <span className="font-bold text-white">100 <span className="text-slate-500 font-normal">/ 100</span></span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Duration</span>
              <span className="font-semibold text-slate-300">4m 12s</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Session Type</span>
              <span className="font-semibold text-slate-300 truncate block">Evening Adhkar</span>
            </div>
          </div>
          <button className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-colors shadow-2xs">
            <Play className="w-3.5 h-3.5 fill-slate-200"/>
            Repeat
          </button>
        </div>

        {/* Card 2 */}
        <div className="block mx-5 mb-3.5 p-4 rounded-3xl space-y-3 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400"/>
              <span className="text-xs font-medium text-slate-400">Today • 05:30 PM</span>
            </div>
            <span className="text-xs font-semibold text-teal-400">Completed</span>
          </div>
          <h4 className="text-sm font-bold text-white">Astaghfirullah</h4>
          <div className="grid grid-cols-3 gap-2 text-xs border-t border-slate-800 pt-2.5">
            <div>
              <span className="text-[10px] text-slate-400 block">Total Recited</span>
              <span className="font-bold text-white">100 <span className="text-slate-500 font-normal">/ 100</span></span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Duration</span>
              <span className="font-semibold text-slate-300">3m 45s</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Session Type</span>
              <span className="font-semibold text-slate-300 truncate block">Post-Asr Dhikr</span>
            </div>
          </div>
          <button className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-colors shadow-2xs">
            <Play className="w-3.5 h-3.5 fill-slate-200"/>
            Repeat
          </button>
        </div>

        {/* Card 3 */}
        <div className="block mx-5 mb-3.5 p-4 rounded-3xl space-y-3 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-400"/>
              <span className="text-xs font-medium text-slate-400">Today • 01:25 PM</span>
            </div>
            <span className="text-[11px] font-bold text-indigo-300 bg-indigo-950/50 border border-indigo-500/30 px-2.5 py-0.5 rounded-full">
              Full Set (100)
            </span>
          </div>
          <h4 className="text-sm font-bold text-white">Ayatul Kursi & Tasbeeh Fatimah</h4>
          <p className="text-[11px] font-normal text-slate-400">
            SubhanAllah 33 • Alhamdulillah 33 • Allahu Akbar 34
          </p>
          <div className="grid grid-cols-3 gap-2 text-xs border-t border-slate-800 pt-2.5">
            <div>
              <span className="text-[10px] text-slate-400 block">Total Recited</span>
              <span className="font-bold text-white">100 <span className="text-slate-500 font-normal">/ 100</span></span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Duration</span>
              <span className="font-semibold text-slate-300">5m 10s</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Session Type</span>
              <span className="font-semibold text-slate-300 truncate block">Post-Dhuhr</span>
            </div>
          </div>
          <button className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-colors shadow-2xs">
            <Play className="w-3.5 h-3.5 fill-slate-200"/>
            Repeat
          </button>
        </div>

        {/* Card 4 (FULL UNTRUNCATED TEXT) */}
        <div className="block mx-5 mb-3.5 p-4 rounded-3xl space-y-3 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400"/>
              <span className="text-xs font-medium text-slate-400">Today • 06:15 AM</span>
            </div>
            <span className="text-xs font-semibold text-teal-400">Completed</span>
          </div>
          <h4 className="text-sm font-bold text-white leading-snug">
            La ilaha illallahu wahdahu la sharika lah
          </h4>
          <div className="grid grid-cols-3 gap-2 text-xs border-t border-slate-800 pt-2.5">
            <div>
              <span className="text-[10px] text-slate-400 block">Total Recited</span>
              <span className="font-bold text-white">100 <span className="text-slate-500 font-normal">/ 100</span></span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Duration</span>
              <span className="font-semibold text-slate-300">6m 20s</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Session Type</span>
              <span className="font-semibold text-slate-300 truncate block">Morning Adhkar</span>
            </div>
          </div>
          <button className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-colors shadow-2xs">
            <Play className="w-3.5 h-3.5 fill-slate-200"/>
            Repeat
          </button>
        </div>

        {/* Timeline Divider */}
        <div className="text-center my-4">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
            Yesterday • Oct 23
          </span>
        </div>

        {/* Card 5 */}
        <div className="block mx-5 mb-3.5 p-4 rounded-3xl space-y-3 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-400"/>
              <span className="text-xs font-medium text-slate-400">Yesterday • 04:10 PM</span>
            </div>
            <span className="text-[11px] font-bold text-indigo-300 bg-indigo-950/50 border border-indigo-500/30 px-2.5 py-0.5 rounded-full">
              Friday Special
            </span>
          </div>
          <h4 className="text-sm font-bold text-white">Salawat upon the Prophet ﷺ</h4>
          <div className="grid grid-cols-3 gap-2 text-xs border-t border-slate-800 pt-2.5">
            <div>
              <span className="text-[10px] text-slate-400 block">Total Recited</span>
              <span className="font-bold text-white">500 <span className="text-slate-500 font-normal">/ 500</span></span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Duration</span>
              <span className="font-semibold text-slate-300">18m 40s</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Session Type</span>
              <span className="font-semibold text-slate-300 truncate block">Jummah Sunnah</span>
            </div>
          </div>
          <button className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-colors shadow-2xs">
            <Play className="w-3.5 h-3.5 fill-slate-200"/>
            Repeat
          </button>
        </div>

        {/* Quote Card */}
        <div className="block mx-5 mb-4 p-5 rounded-3xl space-y-2 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
          <div className="w-8 h-8 rounded-full bg-slate-800 text-indigo-400 flex items-center justify-center shadow-2xs">
            <Quote className="w-4 h-4"/>
          </div>
          <p className="text-xs font-medium italic text-indigo-200 leading-relaxed">
            "The remembrance of Allah brings peace to the heart."
          </p>
          <span className="text-[11px] font-normal text-indigo-400 block text-right">
            — Surah Ar-Ra'd 13:28
          </span>
        </div>

      </div>

      {/* 6. FIXED FLOATING ACTION BAR WITH BACKDROP SHIELD (ZERO OVERLAP) */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent pointer-events-none z-30">
        <button className="pointer-events-auto w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm shadow-xl shadow-black/60 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]">
          <PlusCircle className="w-5 h-5 stroke-[2.2]"/>
          <span>Start New Dhikr Session</span>
        </button>
      </div>

    </div>
  );
}
