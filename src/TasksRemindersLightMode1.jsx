import React, { useState } from 'react';

import {
  CheckSquare,
  Bell,
  CheckCircle2,
  Plus,
  Circle,
  MoreVertical,
  MoreHorizontal,
  Droplet,
  ChevronRight,
  CheckCheck,
  Home,
  Wallet
} from 'lucide-react';

export default function TasksRemindersLightMode1() {
  const [activeFilter, setActiveFilter] = useState('today');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between select-none">
      <div className="flex-1 overflow-y-auto pb-36">
        
        {/* Top Header & Title Row */}
        <div className="flex items-center justify-between px-5 pt-6 pb-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
              <CheckSquare className="w-5 h-5 text-white"/>
            </div>
            <h1 className="text-base font-bold text-indigo-950 tracking-tight" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>Tasks</h1>
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
            <h2 className="text-2xl font-bold text-indigo-950 tracking-tight" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>Tasks & Reminders</h2>
            <p className="text-xs font-normal text-slate-800 mt-0.5" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>Organize your day with mindful focus</p>
          </div>
          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-indigo-100 shadow-sm flex-shrink-0">
            {/* We'll use a placeholder colored div as image may not exist */}
            <div className="w-full h-full bg-indigo-100 flex items-center justify-center text-indigo-400">
              <span className="font-bold text-lg text-indigo-950" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>A</span>
            </div>
          </div>
        </div>

        {/* Daily Completion Hero Card */}
        <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5"/>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Daily Completion</span>
                <span className="text-base font-bold text-slate-900">8 of 12 Completed</span>
              </div>
            </div>
            <button className="btn-primary">
              <Plus className="w-3.5 h-3.5"/>
              <span>Add Task</span>
            </button>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden mr-3">
                <div className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 w-[67%] transition-all duration-500"></div>
              </div>
              <span className="text-xs font-bold text-indigo-600">67%</span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-medium pt-0.5">
              <span className="text-slate-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                4 tasks remaining today
              </span>
              <span className="text-indigo-600 font-semibold flex items-center gap-1">
                Keep your momentum ✨
              </span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 px-5 mb-5">
          <button 
            onClick={() => setActiveFilter('today')}
            className={`flex-1 py-2 px-3 rounded-2xl text-xs font-semibold shadow-sm text-center transition-all active:scale-95 cursor-pointer select-none ${activeFilter === 'today' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50'}`}
          >
            Today (5)
          </button>
          <button 
            onClick={() => setActiveFilter('upcoming')}
            className={`flex-1 py-2 px-3 rounded-2xl text-xs font-semibold shadow-sm text-center transition-all active:scale-95 cursor-pointer select-none ${activeFilter === 'upcoming' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50'}`}
          >
            Upcoming (4)
          </button>
          <button 
            onClick={() => setActiveFilter('done')}
            className={`flex-1 py-2 px-3 rounded-2xl text-xs font-semibold shadow-sm text-center transition-all active:scale-95 cursor-pointer select-none ${activeFilter === 'done' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50'}`}
          >
            Done (8)
          </button>
        </div>

        {/* Today's Focus Section & Task Tiles */}
        <div className="flex items-center justify-between px-5 mb-3">
          <h3 className="text-xs font-bold text-indigo-950 uppercase tracking-wider" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>Today's Focus</h3>
          <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 active:scale-95 transition-all cursor-pointer select-none">Sort by Time</button>
        </div>

        {activeFilter === 'done' ? (
          <div className="mx-5 my-4 p-8 rounded-3xl border backdrop-blur-xl flex flex-col items-center justify-center text-center bg-white/60 border-white/60 shadow-sm">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-indigo-50/80 text-indigo-600">
              <CheckCircle2 className="w-8 h-8"/>
            </div>
            <h3 className="text-base font-semibold mb-1 text-slate-900">
              All Caught Up!
            </h3>
            <p className="text-xs max-w-[240px] leading-relaxed mb-5 text-slate-600">
              No pending completed tasks to archive. Enjoy your mindful peace.
            </p>
            <button 
              onClick={() => setActiveFilter('today')}
              className="px-5 py-2.5 rounded-xl font-medium text-xs flex items-center gap-2 bg-indigo-600 text-white shadow-md active:scale-95 transition-all cursor-pointer select-none"
            >
              Back to Today
            </button>
          </div>
        ) : (
          <div className="px-5 space-y-3 mb-6">
            {/* Task 1 */}
            <div className="p-3.5 rounded-2xl flex items-center justify-between opacity-80 transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer select-none bg-white/70 hover:bg-white/80 backdrop-blur-md border border-white/80 shadow-lg">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                <div>
                  <span className="line-through text-xs font-medium text-slate-400 block">Morning workout & stretch</span>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">🕒 7:00 AM • 🔔 6:50 AM</span>
                </div>
              </div>
            </div>

            {/* Task 2 */}
            <div className="p-3.5 rounded-2xl flex items-center justify-between transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer select-none bg-white/70 hover:bg-white/80 backdrop-blur-md border border-white/80 shadow-lg">
              <div className="flex items-center gap-3">
                <Circle className="w-5 h-5 text-violet-500" />
                <div>
                  <span className="text-xs font-semibold text-slate-900 block">Review Q4 product roadmap</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-violet-50 text-violet-600 uppercase">#Work</span>
                    <span className="text-[10px] text-slate-500">🕒 11:00 AM • 🔔 15m before</span>
                  </div>
                </div>
              </div>
              <button aria-label="Task options" className="p-1 rounded-full text-slate-400 hover:bg-slate-50 active:scale-90 transition-transform cursor-pointer select-none">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            {/* Task 3 */}
            <div className="p-3.5 rounded-2xl flex items-center justify-between transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer select-none relative overflow-hidden bg-white/70 hover:bg-white/80 backdrop-blur-md border border-white/80 shadow-lg">
              <div className="flex items-center gap-3">
                <Circle className="w-5 h-5 text-teal-500" />
                <div>
                  <span className="text-xs font-semibold text-slate-900 block">Dhuhr Prayer & reflection</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-teal-50 text-teal-600 uppercase">#Spiritual</span>
                    <span className="text-[10px] text-slate-500">🕒 1:05 PM • 🔔 Adhan chime</span>
                  </div>
                </div>
              </div>
              <button aria-label="Notification chime" className="p-1.5 rounded-full bg-slate-50 text-slate-600 hover:bg-slate-100 active:scale-90 transition-transform cursor-pointer select-none">
                <Bell className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Task 4 */}
            <div className="p-3.5 rounded-2xl flex items-center justify-between transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer select-none bg-white/70 hover:bg-white/80 backdrop-blur-md border border-white/80 shadow-lg">
              <div className="flex items-center gap-3">
                <Droplet className="w-5 h-5 text-cyan-500" />
                <div>
                  <span className="text-xs font-semibold text-slate-900 block">Drink 2L daily water quota</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-cyan-50 text-cyan-600 uppercase">3/4 DONE</span>
                    <span className="text-[10px] text-slate-500">🕒 Throughout day • 🔔 Hourly</span>
                  </div>
                </div>
              </div>
              <button className="py-1 px-2.5 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-700 text-[10px] font-bold active:scale-95 transition-all cursor-pointer select-none">
                +250ml
              </button>
            </div>

            {/* Task 5 */}
            <div className="p-3.5 rounded-2xl flex items-center justify-between transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer select-none bg-white/70 hover:bg-white/80 backdrop-blur-md border border-white/80 shadow-lg">
              <div className="flex items-center gap-3">
                <Circle className="w-5 h-5 text-slate-500" />
                <div>
                  <span className="text-xs font-semibold text-slate-900 block">Grocery run & meal prep</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-50 text-purple-600 uppercase">#Personal</span>
                    <span className="text-[10px] text-slate-500">🕒 5:30 PM • 🔔 At arrival</span>
                  </div>
                </div>
              </div>
              <button aria-label="Task options" className="p-1 rounded-full text-slate-400 hover:bg-slate-50 active:scale-90 transition-transform cursor-pointer select-none">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Upcoming Days Section */}
        <div className="block mx-5 p-5 rounded-3xl space-y-3.5 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Upcoming Days</h3>
            <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 active:scale-95 transition-all cursor-pointer select-none">View Week</button>
          </div>

          <div className="p-3 rounded-2xl flex items-center justify-between transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer select-none bg-white/70 hover:bg-white/80 backdrop-blur-md border border-white/80 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center justify-center w-9 h-9 rounded-xl bg-slate-100 text-slate-600">
                <span className="text-[8px] font-bold uppercase">Tue</span>
                <span className="text-xs font-bold">25</span>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-900 block">Team Sprint Planning</span>
                <span className="text-[10px] text-slate-500">10:00 AM • Product Strategy</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          <div className="p-3 rounded-2xl flex items-center justify-between transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer select-none bg-white/70 hover:bg-white/80 backdrop-blur-md border border-white/80 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center justify-center w-9 h-9 rounded-xl bg-slate-100 text-slate-600">
                <span className="text-[8px] font-bold uppercase">Wed</span>
                <span className="text-xs font-bold">26</span>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-900 block">Car maintenance checkup</span>
                <span className="text-[10px] text-slate-500">2:00 PM • Auto Service Center</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCheck className="w-4 h-4 text-teal-600"/>
              <div>
                <h4 className="text-xs font-semibold text-slate-800">Completed Earlier (7)</h4>
                <p className="text-[10px] text-slate-400">Fajr prayer, Journaling, Hydration...</p>
              </div>
            </div>
            <button className="px-3 py-1 rounded-xl text-xs font-semibold text-indigo-600 hover:bg-indigo-50 active:scale-95 transition-all cursor-pointer select-none">
              Restore
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
