import React from 'react';

import { 
  Sparkles, Bell, ChevronRight, TrendingUp, Moon, Repeat, PenLine, Calendar, Settings, Quote, Heart, Share2, Home, Wallet, Plus, CheckSquare, LayoutGrid, ArrowLeft 
} from 'lucide-react';

export default function MoreDarkMode({ setActiveTab }) {
  return (
    <div className="min-h-screen bg-[#0B0F19] pb-28 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="Momentum Logo" 
            className="w-10 h-10 object-cover rounded-xl aspect-square flex-shrink-0 shadow-md shadow-indigo-600/30" 
          />
          <h1 className="text-base font-bold text-white tracking-tight">More</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            U
          </div>
        </div>
      </div>
      <p className="px-5 text-xs font-normal text-slate-400 mb-5">
        Spiritual tools, mindful finance & preferences
      </p>

      {/* Profile Hero Card */}
      <div className="block mx-5 mb-6 p-5 rounded-3xl bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-indigo-500/30">
              A
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">Aisha M.</h2>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 text-[10px] font-bold tracking-wide uppercase">PRO</span>
              </div>
              <p className="text-sm font-normal text-slate-400">Level 4 Streak • 28 Days Active</p>
            </div>
          </div>
          <button className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 text-indigo-400 flex items-center justify-center transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
          <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
            <span className="text-base font-bold text-indigo-400">142</span>
            <span className="text-xs font-normal text-slate-400">Adhkar</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
            <span className="text-base font-bold text-teal-400">96%</span>
            <span className="text-xs font-normal text-slate-400">Punctual</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
            <span className="text-base font-bold text-rose-400">18 d</span>
            <span className="text-xs font-normal text-slate-400">Reflection</span>
          </div>
        </div>
      </div>

      {/* Ecosystem Essentials */}
      <div className="flex items-center justify-between px-5 mb-3">
        <h3 className="text-sm font-bold text-white tracking-tight">Ecosystem Essentials</h3>
        <span className="text-xs font-normal text-slate-400">6 Modules</span>
      </div>

      <div className="mx-5 mb-6 space-y-3">
        {/* Income & Cashflow */}
        <div className="flex items-center justify-between p-4 rounded-3xl active:scale-[0.98] transition-transform cursor-pointer bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Income & Cashflow</span>
              <span className="text-xs font-normal text-slate-400">Salary, passive streams & deposits</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-indigo-400">$3,450</span>
            <ChevronRight className="w-5 h-5 text-slate-500" />
          </div>
        </div>

        {/* Prayer Times & Qibla */}
        <div className="flex items-center justify-between p-4 rounded-3xl active:scale-[0.98] transition-transform cursor-pointer bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <Moon className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">Prayer Times & Qibla</span>
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
              </div>
              <span className="text-xs font-normal text-slate-400">Local timetable, Adhan & compass</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-teal-400">Next: Dhuhr</span>
            <ChevronRight className="w-5 h-5 text-slate-500" />
          </div>
        </div>

        {/* Digital Tasbeeh & Dhikr */}
        <div className="flex items-center justify-between p-4 rounded-3xl active:scale-[0.98] transition-transform cursor-pointer bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <Repeat className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Digital Tasbeeh & Dhikr</span>
              <span className="text-xs font-normal text-slate-400">Morning/evening Adhkar & counters</span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-500" />
        </div>

        {/* Notes & Reflections */}
        <div className="flex items-center justify-between p-4 rounded-3xl active:scale-[0.98] transition-transform cursor-pointer bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <PenLine className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Notes & Reflections</span>
              <span className="text-xs font-normal text-slate-400">Mindful daily thoughts and scratchpad</span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-500" />
        </div>

        {/* Calendars & Hijri Dates */}
        <div className="flex items-center justify-between p-4 rounded-3xl active:scale-[0.98] transition-transform cursor-pointer bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Calendars & Hijri Dates</span>
              <span className="text-xs font-normal text-slate-400">Synchronized lunar and standard schedule</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-normal text-slate-400">14 Shawwal</span>
            <ChevronRight className="w-5 h-5 text-slate-500" />
          </div>
        </div>

        {/* Settings & Preferences */}
        <div className="flex items-center justify-between p-4 rounded-3xl active:scale-[0.98] transition-transform cursor-pointer bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-300 flex items-center justify-center">
              <Settings className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Settings & Preferences</span>
              <span className="text-xs font-normal text-slate-400">Notifications, cloud backup & privacy</span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-500" />
        </div>
      </div>

      {/* Daily Radiance Card */}
      <div className="block mx-5 mb-5 relative overflow-hidden rounded-3xl p-5 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
        <Quote className="absolute -right-4 -bottom-4 w-24 h-24 text-white/5 rotate-12" />
        <div className="relative z-10 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-indigo-400">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold tracking-wide uppercase">Daily Radiance</span>
            </div>
            <button className="w-8 h-8 rounded-full bg-white/5 text-slate-400 hover:text-rose-400 flex items-center justify-center shadow-sm">
              <Heart className="w-4 h-4" />
            </button>
          </div>
          <p className="text-base font-medium text-white italic leading-relaxed pr-4">
            “Indeed, with hardship comes ease. Keep moving forward one step at a time.”
          </p>
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-normal text-slate-400">Surah Ash-Sharh • 94:6</span>
            <button className="flex items-center gap-1 text-xs font-bold text-indigo-400">
              <span>Share</span>
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Bottom Navigation Dock (Dark Mode) */}
      <div className="fixed bottom-4 left-5 right-5 z-30">
        <nav className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-full px-4 py-2.5 shadow-2xl shadow-black/60 flex items-center justify-between">
          
          {/* Home Tab */}
          <button 
            onClick={() => setActiveTab && setActiveTab('home')}
            className="flex flex-col items-center justify-center gap-0.5 text-slate-500 hover:text-slate-300 transition-colors flex-1"
          >
            <Home className="w-5 h-5"/>
            <span className="text-[10px] font-medium">Home</span>
          </button>

          {/* Finance Tab */}
          <button 
            onClick={() => setActiveTab && setActiveTab('finance')}
            className="flex flex-col items-center justify-center gap-0.5 text-slate-500 hover:text-slate-300 transition-colors flex-1"
          >
            <Wallet className="w-5 h-5"/>
            <span className="text-[10px] font-medium">Finance</span>
          </button>

          {/* Center Action (+) Button */}
          <div className="relative -top-3 flex-shrink-0 px-1">
            <button className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-950/60 ring-4 ring-slate-900 hover:scale-105 active:scale-95 transition-all">
              <Plus className="w-6 h-6 stroke-[2.5]"/>
            </button>
          </div>

          {/* Tasks Tab */}
          <button 
            onClick={() => setActiveTab && setActiveTab('tasks')}
            className="flex flex-col items-center justify-center gap-0.5 text-slate-500 hover:text-slate-300 transition-colors flex-1"
          >
            <CheckSquare className="w-5 h-5"/>
            <span className="text-[10px] font-medium">Tasks</span>
          </button>

          {/* More Tab (Active) */}
          <button className="flex flex-col items-center justify-center gap-0.5 text-indigo-400 transition-colors flex-1">
            <LayoutGrid className="w-5 h-5"/>
            <span className="text-[10px] font-bold">More</span>
          </button>

        </nav>
      </div>
    </div>
  );
}
