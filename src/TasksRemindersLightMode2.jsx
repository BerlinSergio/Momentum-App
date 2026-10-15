import React from 'react';

import {
  Sparkles,
  Bell,
  CheckCircle2,
  Plus,
  Circle,
  MoreVertical,
  MoreHorizontal,
  Sun,
  SlidersHorizontal,
  Droplet,
  Calendar,
  ChevronRight,
  ChevronDown,
  History,
  Home,
  Wallet,
  CheckSquare
} from 'lucide-react';

export default function TasksRemindersLightMode2() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between select-none">
      <div className="flex-1 overflow-y-auto pb-32">
        
        {/* Top Header & Title Row */}
        <div className="flex items-center justify-between px-5 pt-6 pb-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
              <Sparkles className="w-5 h-5 text-white"/>
            </div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">Tasks & Reminders</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors">
              <Bell className="w-5 h-5"/>
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
              A
            </div>
          </div>
        </div>

        {/* Title & Profile Avatar Banner */}
        <div className="flex items-center justify-between px-5 pt-2 pb-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Tasks & Reminders</h1>
            <p className="text-xs font-normal text-slate-500 mt-0.5">Organize your day with mindful focus</p>
          </div>
          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-indigo-100 shadow-sm flex-shrink-0">
            {/* Placeholder for avatar image */}
            <div className="w-full h-full bg-indigo-100 flex items-center justify-center text-indigo-400">
              <span className="font-bold text-lg">A</span>
            </div>
          </div>
        </div>

        {/* Daily Momentum Hero Card */}
        <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600"/>
                Daily Momentum
              </span>
              <div className="flex items-baseline gap-2">
                <h2 className="text-2xl font-bold text-slate-900">8 of 12</h2>
                <span className="text-xs font-medium text-slate-500">Completed</span>
              </div>
              <p className="text-[11px] font-medium text-indigo-600 mt-1 flex items-center gap-1">
                4 tasks remaining today • Keep your momentum ✨
              </p>
            </div>
            
            {/* 67% Circular Mini Progress Ring */}
            <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-slate-100" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-indigo-600" strokeDasharray="67, 100" strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <span className="absolute text-xs font-bold text-slate-800">67%</span>
            </div>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-400 w-[67%] transition-all duration-500"></div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-100">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600"/>
              Consistency score: High
            </span>
            <button className="btn-primary">
              <Plus className="w-3.5 h-3.5"/>
              <span>Add Task</span>
            </button>
          </div>
        </div>

        {/* Filter Pill Chips */}
        <div className="flex items-center gap-2 px-5 mb-5">
          <button className="flex-1 py-2 px-3 rounded-2xl bg-indigo-600 text-white text-xs font-semibold shadow-sm text-center">
            Today (5)
          </button>
          <button className="flex-1 py-2 px-3 rounded-2xl bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50 text-xs font-semibold shadow-sm text-center transition-colors">
            Upcoming (4)
          </button>
          <button className="flex-1 py-2 px-3 rounded-2xl bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50 text-xs font-semibold shadow-sm text-center transition-colors">
            Done (8)
          </button>
        </div>

        {/* Today's Focus Section & Detailed Tiles */}
        <div className="flex items-center justify-between px-5 mb-3">
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-indigo-600"/>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Today's Focus</h3>
          </div>
          <button className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5"/>Time & Priority
          </button>
        </div>

        {/* Card 1 */}
        <div className="block mx-5 mb-3 p-4 rounded-2xl transition-colors space-y-2 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Circle className="w-5 h-5 text-slate-300"/>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-50 text-rose-700 uppercase">High Priority</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-600 uppercase">Work</span>
            </div>
            <button className="text-slate-400 hover:bg-slate-50 rounded-full p-1"><MoreVertical className="w-4 h-4"/></button>
          </div>
          <div className="pl-7">
            <h4 className="text-sm font-semibold text-slate-900">Review Q4 product roadmap</h4>
            <p className="text-[10px] text-slate-500 mt-1">🕒 11:00 AM • 🔔 15m before</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="block mx-5 mb-3 p-4 rounded-2xl transition-colors space-y-2 relative overflow-hidden bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-violet-50/50 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-center justify-between relative">
            <div className="flex items-center gap-2">
              <Circle className="w-5 h-5 text-slate-300"/>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-violet-50 text-violet-700 uppercase">Spiritual</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-600 uppercase">Midday</span>
            </div>
            <button className="text-slate-400 hover:bg-slate-50 rounded-full p-1"><MoreVertical className="w-4 h-4"/></button>
          </div>
          <div className="pl-7 relative">
            <h4 className="text-sm font-semibold text-slate-900">Dhuhr Prayer & reflection</h4>
            <p className="text-[10px] text-slate-500 mt-1">🕒 1:05 PM • 🔔 Adhan chime</p>
          </div>
        </div>

        {/* Card 3 (Segmented Progress) */}
        <div className="block mx-5 mb-3 p-4 rounded-2xl transition-colors space-y-2.5 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplet className="w-5 h-5 text-teal-500"/>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-teal-50 text-teal-700 uppercase">Wellness</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-600 uppercase">Hourly</span>
            </div>
            <span className="text-[10px] font-bold text-teal-600">1,500 / 2,000 ml</span>
          </div>
          <div className="pl-7 space-y-2.5">
            <h4 className="text-sm font-semibold text-slate-900">Drink 2L daily water quota</h4>
            <div className="grid grid-cols-4 gap-1.5 h-2">
              <div className="bg-teal-600 rounded-full h-full"></div>
              <div className="bg-teal-600 rounded-full h-full"></div>
              <div className="bg-teal-600 rounded-full h-full"></div>
              <div className="bg-slate-200 rounded-full h-full"></div>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1">☕ Last sip 42m ago</span>
              <button className="bg-teal-700 text-white rounded-xl py-1 px-3 text-[10px] font-bold shadow-sm hover:bg-teal-600 transition-colors">+250 ml</button>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="block mx-5 mb-3 p-4 rounded-2xl transition-colors space-y-2 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Circle className="w-5 h-5 text-slate-300"/>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-50 text-purple-700 uppercase">Personal</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-600 uppercase">Normal</span>
            </div>
            <button className="text-slate-400 hover:bg-slate-50 rounded-full p-1"><MoreVertical className="w-4 h-4"/></button>
          </div>
          <div className="pl-7">
            <h4 className="text-sm font-semibold text-slate-900">Grocery run & meal prep</h4>
            <p className="text-[10px] text-slate-500 mt-1">🕒 5:30 PM • 📍 At arrival reminder</p>
          </div>
        </div>

        {/* Upcoming Days Section */}
        <div className="block mx-5 mb-4 p-5 rounded-3xl space-y-3 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-600"/>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Upcoming Days</h3>
            </div>
            <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">View Week</button>
          </div>
          <div className="p-3 rounded-2xl flex items-center justify-between transition-colors cursor-pointer bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center justify-center w-10 h-10 rounded-xl bg-slate-100 text-slate-600">
                <span className="text-[9px] font-bold uppercase">Tue</span>
                <span className="text-sm font-bold">25</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Team Sprint Planning</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">10:00 AM • Product Strategy</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400"/>
          </div>
          <div className="p-3 rounded-2xl flex items-center justify-between transition-colors cursor-pointer bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center justify-center w-10 h-10 rounded-xl bg-slate-100 text-slate-600">
                <span className="text-[9px] font-bold uppercase">Wed</span>
                <span className="text-sm font-bold">26</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Car maintenance checkup</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">2:00 PM • Auto Service Center</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400"/>
          </div>
        </div>

        {/* Completed Earlier Accordion Card */}
        <div className="block mx-5 mb-32 p-5 rounded-3xl space-y-3 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="flex items-center justify-between pb-2 border-t-0 border-slate-100 cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4"/>
              </div>
              <h4 className="text-xs font-bold text-slate-900">Completed Earlier</h4>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">7</span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400"/>
          </div>
          
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <span className="text-teal-500">✔</span>
              <span className="line-through">Morning workout & stretch — 6:30 AM</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <span className="text-teal-500">✔</span>
              <span className="line-through">Fajr prayer & gratitude journaling — 5:12 AM</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <span className="text-teal-500">✔</span>
              <span className="line-through">Morning hydration (500ml) — 5:45 AM</span>
            </div>
          </div>
          
          <div className="pt-3 border-t border-slate-100">
            <button className="flex items-center justify-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 w-full transition-colors">
              <History className="w-3.5 h-3.5"/>View Archive
            </button>
          </div>
        </div>

      </div>

      {/* Floating Navigation Dock */}
      <div className="fixed bottom-0 w-full z-50 pointer-events-none pb-5">
        <div className="px-5">
          <nav className="pointer-events-auto w-full h-[68px] rounded-3xl bg-white/85 backdrop-blur-3xl shadow-[0_16px_40px_rgba(30,45,90,0.12)] border border-slate-100 flex items-center justify-between px-2 relative">
            <a aria-current="page" className="flex flex-col items-center justify-center flex-1 h-full transition-all gap-0.5 text-slate-400 hover:text-slate-600" href="#">
              <div className="w-9 h-7 flex items-center justify-center rounded-full">
                <Home className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium">Home</span>
            </a>
            <a className="flex flex-col items-center justify-center flex-1 h-full text-slate-400 hover:text-slate-600 transition-all gap-0.5" href="#">
              <div className="w-9 h-7 flex items-center justify-center rounded-full">
                <Wallet className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium">Finance</span>
            </a>
            <div className="flex flex-col items-center justify-center flex-1 h-full relative">
              <a aria-label="Record Dhikr" className="absolute -top-5 w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 via-violet-600 to-teal-500 flex items-center justify-center text-white shadow-[0_10px_24px_-2px_rgba(99,102,241,0.45)] hover:scale-105 active:scale-95 transition-transform ring-4 ring-slate-50/80" href="#">
                <Plus className="w-7 h-7" />
              </a>
            </div>
            <a className="flex flex-col items-center justify-center flex-1 h-full text-indigo-600 transition-all gap-0.5 font-semibold" href="#">
              <div className="w-9 h-7 flex items-center justify-center rounded-full">
                <CheckSquare className="w-5 h-5" />
              </div>
              <span className="text-[10px]">Tasks</span>
            </a>
            <a className="flex flex-col items-center justify-center flex-1 h-full text-slate-400 hover:text-slate-600 transition-all gap-0.5" href="#">
              <div className="w-9 h-7 flex items-center justify-center rounded-full">
                <MoreHorizontal className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium">More</span>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
