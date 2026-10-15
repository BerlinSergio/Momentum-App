import React from 'react';

import { ArrowLeft, Calendar, LayoutGrid, ChevronLeft, ChevronDown, ChevronRight, ArrowLeftRight, Banknote, CheckCircle2, Briefcase, Clock, Heart, Plus } from 'lucide-react';

export default function GregorianCalendarLightMode({ setActiveTab }) {
  return (
    <>
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-slate-900 tracking-tight">
            Gregorian Calendar
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setActiveTab && setActiveTab('home_dashboard_light_mode')} className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"><ArrowLeft className="w-5 h-5"/></button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            A
          </div>
        </div>
      </div>

      <main className="flex-1 flex flex-col w-full pb-[120px] bg-transparent relative z-10">
        
        {/* MAIN CALENDAR CONTAINER */}
        <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <button className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700">
                <ChevronLeft className="w-4 h-4"/>
              </button>
              <div className="flex items-center gap-1.5">
                <h2 className="text-lg font-bold text-slate-900">October 2026</h2>
                <ChevronDown className="w-4 h-4 text-indigo-600"/>
              </div>
              <button className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700">
                <ChevronRight className="w-4 h-4"/>
              </button>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium">
              <ArrowLeftRight className="w-3.5 h-3.5 text-indigo-600"/>
              <span>Rabi' al-Thani 1448 AH • Aqrab 1405 SH</span>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            <button className="px-3.5 py-1.5 rounded-2xl bg-indigo-600 text-white text-xs font-semibold shadow-sm shadow-indigo-600/30 flex-shrink-0">
              All Events 6
            </button>
            <button className="px-3.5 py-1.5 rounded-2xl bg-slate-100 text-slate-600 text-xs font-semibold hover:bg-slate-200 flex-shrink-0">
              Work & Tasks 3
            </button>
            <button className="px-3.5 py-1.5 rounded-2xl bg-slate-100 text-slate-600 text-xs font-semibold hover:bg-slate-200 flex-shrink-0">
              Finance 2
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mt-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
              <div key={day} className={`text-xs text-center pb-2 ${day === 'Fri' ? 'text-indigo-600 font-bold' : 'font-semibold text-slate-500'}`}>
                {day}
              </div>
            ))}
            
            {/* Calendar Days */}
            {/* Previous month days */}
            {[27, 28, 29, 30].map(d => (
              <div key={`prev-${d}`} className="aspect-square flex flex-col items-center justify-center rounded-full text-slate-400 font-normal hover:bg-slate-50">
                {d}
              </div>
            ))}
            
            {/* Current month days */}
            {[...Array(31)].map((_, i) => {
              const d = i + 1;
              if (d === 24) {
                return (
                  <div key={d} className="aspect-square w-9 h-9 mx-auto rounded-full bg-indigo-600 text-white font-bold flex flex-col items-center justify-center shadow-md shadow-indigo-600/40 relative">
                    <span>{d}</span>
                    <span className="w-1 h-1 rounded-full bg-white absolute bottom-1.5"></span>
                  </div>
                );
              }
              return (
                <div key={d} className="aspect-square flex flex-col items-center justify-center rounded-full text-slate-800 font-medium hover:bg-slate-100">
                  {d}
                  {d === 5 || d === 12 || d === 19 ? <span className="w-1 h-1 rounded-full bg-indigo-400 mt-0.5"></span> : null}
                </div>
              );
            })}
          </div>
        </div>

        {/* SELECTED DAY & EVENTS CONTAINER */}
        <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-3 bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
          <div className="flex flex-col gap-1.5 mb-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 leading-tight">Saturday, October 24, 2026</h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-violet-50 border border-violet-200/80 text-violet-700">13 Rabi' al-Thani • 2 Aqrab</span>
            </div>
            <p className="text-xs font-normal text-slate-500">Day 297 of 365 • Week 43 • 68 days remaining in 2026</p>
          </div>

          <div className="p-3.5 rounded-2xl transition-all flex items-center justify-between gap-3 bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
                <Banknote className="w-4 h-4"/>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-900">Quarterly Investment Review</h4>
                <p className="text-[11px] font-normal text-slate-500">09:30 AM – 10:30 AM</p>
              </div>
            </div>
            <div className="flex items-center flex-shrink-0">
              <span className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-teal-50 text-teal-700 border border-teal-200">Finance</span>
              <CheckCircle2 className="w-4 h-4 text-teal-600 ml-1.5"/>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl transition-all flex items-center justify-between gap-3 bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-4 h-4"/>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-900">Sprint Planning & Task Sync</h4>
                <p className="text-[11px] font-normal text-slate-500">02:00 PM – 03:00 PM</p>
              </div>
            </div>
            <div className="flex items-center flex-shrink-0">
              <span className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">Work</span>
              <Clock className="w-4 h-4 text-slate-400 ml-1.5"/>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl transition-all flex items-center justify-between gap-3 bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center flex-shrink-0">
                <Heart className="w-4 h-4"/>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-900">Family Dinner Prep & Catch-up</h4>
                <p className="text-[11px] font-normal text-slate-500">05:00 PM – 06:15 PM</p>
              </div>
            </div>
            <div className="flex items-center flex-shrink-0">
              <span className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-violet-50 text-violet-700 border border-violet-200">Personal</span>
              <Clock className="w-4 h-4 text-slate-400 ml-1.5"/>
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
