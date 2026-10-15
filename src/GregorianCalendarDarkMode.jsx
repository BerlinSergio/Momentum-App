import React from 'react';

import { ArrowLeft, Calendar, LayoutGrid, ChevronLeft, ChevronDown, ChevronRight, ArrowLeftRight, Banknote, CheckCircle2, Briefcase, Clock, Heart, Plus } from 'lucide-react';

export default function GregorianCalendarDarkMode({ setActiveTab }) {
  return (
    <>
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-white tracking-tight">
            Gregorian Calendar
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setActiveTab && setActiveTab('home_dashboard_dark_mode')} className="p-2 rounded-full text-slate-300 hover:bg-slate-800 transition-colors"><ArrowLeft className="w-5 h-5"/></button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            A
          </div>
        </div>
      </div>

      <main className="flex-1 flex flex-col w-full pb-[120px] bg-transparent relative z-10">
        
        {/* MAIN CALENDAR CONTAINER */}
        <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <button className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300">
                <ChevronLeft className="w-4 h-4"/>
              </button>
              <div className="flex items-center gap-1.5">
                <h2 className="text-lg font-bold text-white">October 2026</h2>
                <ChevronDown className="w-4 h-4 text-indigo-400"/>
              </div>
              <button className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300">
                <ChevronRight className="w-4 h-4"/>
              </button>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium">
              <ArrowLeftRight className="w-3.5 h-3.5 text-indigo-400"/>
              <span>Rabi' al-Thani 1448 AH • Aqrab 1405 SH</span>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            <button className="px-3.5 py-1.5 rounded-2xl bg-indigo-600 text-white text-xs font-semibold shadow-sm shadow-indigo-900/30 flex-shrink-0">
              All Events 6
            </button>
            <button className="px-3.5 py-1.5 rounded-2xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 flex-shrink-0">
              Work & Tasks 3
            </button>
            <button className="px-3.5 py-1.5 rounded-2xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 flex-shrink-0">
              Finance 2
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mt-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
              <div key={day} className={`text-xs text-center pb-2 ${day === 'Fri' ? 'text-indigo-400 font-bold' : 'font-semibold text-slate-500'}`}>
                {day}
              </div>
            ))}
            
            {/* Calendar Days */}
            {/* Previous month days */}
            {[27, 28, 29, 30].map(d => (
              <div key={`prev-${d}`} className="aspect-square flex flex-col items-center justify-center rounded-full text-slate-600 font-normal hover:bg-slate-800">
                {d}
              </div>
            ))}
            
            {/* Current month days */}
            {[...Array(31)].map((_, i) => {
              const d = i + 1;
              if (d === 24) {
                return (
                  <div key={d} className="aspect-square w-9 h-9 mx-auto rounded-full bg-indigo-600 text-white font-bold flex flex-col items-center justify-center shadow-lg shadow-indigo-950/60 relative">
                    <span>{d}</span>
                    <span className="w-1 h-1 rounded-full bg-white absolute bottom-1.5"></span>
                  </div>
                );
              }
              return (
                <div key={d} className="aspect-square flex flex-col items-center justify-center rounded-full text-slate-200 font-medium hover:bg-slate-800">
                  {d}
                  {d === 5 || d === 12 || d === 19 ? <span className="w-1 h-1 rounded-full bg-indigo-500 mt-0.5"></span> : null}
                </div>
              );
            })}
          </div>
        </div>

        {/* SELECTED DAY & EVENTS CONTAINER */}
        <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-3 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
          <div className="flex flex-col gap-1.5 mb-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white leading-tight">Saturday, October 24, 2026</h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-violet-500/15 border border-violet-500/30 text-violet-400">13 Rabi' al-Thani • 2 Aqrab</span>
            </div>
            <p className="text-xs font-normal text-slate-400">Day 297 of 365 • Week 43 • 68 days remaining in 2026</p>
          </div>

          <div className="p-3.5 rounded-2xl transition-all flex items-center justify-between gap-3 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-500/15 text-teal-400 flex items-center justify-center flex-shrink-0">
                <Banknote className="w-4 h-4"/>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">Quarterly Investment Review</h4>
                <p className="text-[11px] font-normal text-slate-400">09:30 AM – 10:30 AM</p>
              </div>
            </div>
            <div className="flex items-center flex-shrink-0">
              <span className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-teal-500/15 text-teal-400 border border-teal-500/30">Finance</span>
              <CheckCircle2 className="w-4 h-4 text-teal-500 ml-1.5"/>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl transition-all flex items-center justify-between gap-3 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-4 h-4"/>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">Sprint Planning & Task Sync</h4>
                <p className="text-[11px] font-normal text-slate-400">02:00 PM – 03:00 PM</p>
              </div>
            </div>
            <div className="flex items-center flex-shrink-0">
              <span className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">Work</span>
              <Clock className="w-4 h-4 text-slate-500 ml-1.5"/>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl transition-all flex items-center justify-between gap-3 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-violet-500/15 text-violet-400 flex items-center justify-center flex-shrink-0">
                <Heart className="w-4 h-4"/>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">Family Dinner Prep & Catch-up</h4>
                <p className="text-[11px] font-normal text-slate-400">05:00 PM – 06:15 PM</p>
              </div>
            </div>
            <div className="flex items-center flex-shrink-0">
              <span className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-violet-500/15 text-violet-400 border border-violet-500/30">Personal</span>
              <Clock className="w-4 h-4 text-slate-500 ml-1.5"/>
            </div>
          </div>

          <button className="btn-primary w-full mt-2">
            <Plus className="w-4 h-4" />
            Add Gregorian Event
          </button>
        </div>
      </main>
    </>
  );
}
