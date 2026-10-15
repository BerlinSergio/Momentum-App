import React from 'react';

import { Sparkles, Bell, Flame, CheckCircle2, Plus, Pencil, Trash2, Home, CreditCard, CheckSquare, Grid } from 'lucide-react';

export default function DailyRoutineLightMode({ setActiveTab }) {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden"><div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[120vw] h-[55vh] rounded-full bg-gradient-to-b from-surface-variant/40 via-surface-container/20 to-transparent blur-3xl"></div><div className="absolute top-[40%] right-[-10%] w-[80vw] h-[40vh] rounded-full bg-gradient-to-tr from-secondary-fixed/20 via-tertiary-fixed/10 to-transparent blur-3xl"></div></div>
      
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-slate-900 tracking-tight">
            Daily Routine
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"><Bell className="w-5 h-5"/></button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            A
          </div>
        </div>
      </div>

      <main className="flex-1 flex flex-col relative w-full pb-[120px] bg-transparent z-10">
        <div className="px-5 mb-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Daily Routine</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 border border-indigo-200/80 text-indigo-700 uppercase tracking-wider shadow-sm">Active</span>
            </div>
            <p className="text-xs font-medium text-slate-500 mt-1">Build daily consistency and focus</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white flex items-center justify-center font-bold text-sm shadow-md ring-2 ring-slate-100 flex-shrink-0">
            U
          </div>
        </div>

        <div className="block mx-5 mb-5 p-5 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1 flex-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 border border-amber-200/80 text-amber-700 shadow-sm mb-1 whitespace-nowrap">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                14-Day Routine Streak
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">4 of 6 Done</h2>
              <p className="text-xs text-slate-500 font-medium">Keep steady. Small steps build profound growth.</p>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 pt-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                2 upcoming today
              </div>
            </div>
            {/* Centered Circular Progress Ring */}
            <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path className="text-slate-100" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-indigo-600" strokeDasharray="67, 100" strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-sm font-black text-slate-900 leading-none">67%</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">Today</span>
              </div>
            </div>
          </div>
          <button className="btn-primary  mt-4">
            <Plus className="w-4 h-4" />
            Add Routine
          </button>
        </div>

        <div className="flex items-center gap-2 px-5 mb-4 overflow-x-auto scrollbar-none">
          <button className="px-4 py-2 rounded-2xl bg-indigo-600 text-white text-xs font-bold shadow-sm whitespace-nowrap">All (6)</button>
          <button className="px-4 py-2 rounded-2xl bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50 text-xs font-semibold whitespace-nowrap">Morning (3)</button>
          <button className="px-4 py-2 rounded-2xl bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50 text-xs font-semibold whitespace-nowrap">Afternoon (1)</button>
          <button className="px-4 py-2 rounded-2xl bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50 text-xs font-semibold whitespace-nowrap">Evening (2)</button>
        </div>

        {/* Item 1 */}
        <div className="block mx-5 mb-3 p-4 rounded-3xl transition-all flex items-center justify-between gap-3 bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <button aria-label="Toggle routine" className="w-6 h-6 rounded-full bg-indigo-50 border border-indigo-200/80 flex items-center justify-center text-indigo-600 shadow-sm flex-shrink-0 mt-0.5 transition-transform" type="button">
              <CheckCircle2 className="w-4 h-4" />
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-900 truncate">Morning Fajr & Tahajjud</h3>
                <span className="text-xs font-semibold text-indigo-600 flex-shrink-0">05:15 AM</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/80 text-[10px] font-semibold whitespace-nowrap inline-flex items-center">Every Day</span>
                <span className="inline-flex items-center gap-1 text-slate-500 text-[10px] font-medium">
                  <Bell className="w-3 h-3" />
                  <span>Adhan enabled</span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"><Pencil className="w-4 h-4" /></button>
            <button className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-slate-100"><Trash2 className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Item 2 */}
        <div className="block mx-5 mb-3 p-4 rounded-3xl transition-all flex items-center justify-between gap-3 bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <button aria-label="Toggle routine" className="w-6 h-6 rounded-full bg-indigo-50 border border-indigo-200/80 flex items-center justify-center text-indigo-600 shadow-sm flex-shrink-0 mt-0.5 transition-transform" type="button">
              <CheckCircle2 className="w-4 h-4" />
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-900 truncate">Hydration & Mindfulness</h3>
                <span className="text-xs font-semibold text-indigo-600 flex-shrink-0">06:30 AM</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/80 text-[10px] font-semibold whitespace-nowrap inline-flex items-center">Mon–Fri</span>
                <span className="inline-flex items-center gap-1 text-slate-500 text-[10px] font-medium">
                  <Sparkles className="w-3 h-3" />
                  <span>15 mins</span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"><Pencil className="w-4 h-4" /></button>
            <button className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-slate-100"><Trash2 className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Item 3 */}
        <div className="block mx-5 mb-3 p-4 rounded-3xl transition-all flex items-center justify-between gap-3 bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <button aria-label="Toggle routine" className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200/80 flex items-center justify-center flex-shrink-0 mt-0.5 transition-transform" type="button"></button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-900 truncate">Deep Focus Session</h3>
                <span className="text-xs font-semibold text-slate-500 flex-shrink-0">09:30 AM</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/80 text-[10px] font-semibold whitespace-nowrap inline-flex items-center">Mon–Fri</span>
                <span className="inline-flex items-center gap-1 text-slate-500 text-[10px] font-medium">
                  <Bell className="w-3 h-3" />
                  <span>10m before (DND)</span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"><Pencil className="w-4 h-4" /></button>
            <button className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-slate-100"><Trash2 className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Item 4 */}
        <div className="block mx-5 mb-3 p-4 rounded-3xl transition-all flex items-center justify-between gap-3 bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <button aria-label="Toggle routine" className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200/80 flex items-center justify-center flex-shrink-0 mt-0.5 transition-transform" type="button"></button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-900 truncate">Dhuhr & Reading</h3>
                <span className="text-xs font-semibold text-slate-500 flex-shrink-0">01:15 PM</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/80 text-[10px] font-semibold whitespace-nowrap inline-flex items-center">Every Day</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"><Pencil className="w-4 h-4" /></button>
            <button className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-slate-100"><Trash2 className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Item 5 */}
        <div className="block mx-5 mb-3 p-4 rounded-3xl transition-all flex items-center justify-between gap-3 bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <button aria-label="Toggle routine" className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200/80 flex items-center justify-center flex-shrink-0 mt-0.5 transition-transform" type="button"></button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-900 truncate">Evening Walk & Asr</h3>
                <span className="text-xs font-semibold text-slate-500 flex-shrink-0">04:45 PM</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/80 text-[10px] font-semibold whitespace-nowrap inline-flex items-center">Every Day</span>
                <span className="inline-flex items-center gap-1 text-slate-500 text-[10px] font-medium">
                  <Sparkles className="w-3 h-3" />
                  <span>30 mins</span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"><Pencil className="w-4 h-4" /></button>
            <button className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-slate-100"><Trash2 className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Item 6 */}
        <div className="block mx-5 mb-3 p-4 rounded-3xl transition-all flex items-center justify-between gap-3 opacity-50 hover:opacity-100 bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <button aria-label="Toggle routine" className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200/80 flex items-center justify-center flex-shrink-0 mt-0.5 transition-transform" type="button"></button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-900 truncate line-through">Family Time</h3>
                <span className="text-xs font-semibold text-slate-400 flex-shrink-0 line-through">07:00 PM</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                <span className="px-2 py-0.5 rounded-full bg-slate-100/50 text-slate-500 border border-slate-200/50 text-[10px] font-semibold whitespace-nowrap inline-flex items-center">Weekends</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"><Pencil className="w-4 h-4" /></button>
            <button className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-slate-100"><Trash2 className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="block mx-5 my-5 p-4 rounded-3xl flex items-start gap-3.5 text-slate-800 bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Sparkles className="w-5 h-5 text-indigo-600"/>
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-slate-800 italic leading-relaxed">
              "Consistent small deeds lead to profound inner peace."
            </p>
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block mt-1.5">
              Daily Mindfulness Reflection
            </span>
          </div>
        </div>

      </main>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 backdrop-blur-xl border-t border-slate-200/80 text-slate-500 px-4 py-3 rounded-t-3xl shadow-lg flex items-center justify-between z-40">
        <button className="flex flex-col items-center gap-1 text-slate-500 hover:text-indigo-600"><Home className="w-5 h-5" /><span className="text-[10px] font-medium">Home</span></button>
        <button className="flex flex-col items-center gap-1 text-slate-500 hover:text-indigo-600"><CreditCard className="w-5 h-5" /><span className="text-[10px] font-medium">Finance</span></button>
        {/* Floating Elevated Plus Button */}
        <div className="relative -top-5">
          <button className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/40 border-4 border-white">
            <Plus className="w-6 h-6" />
          </button>
        </div>
        <button className="flex flex-col items-center gap-1 text-indigo-600 font-bold"><CheckSquare className="w-5 h-5" /><span className="text-[10px]">Tasks</span></button>
        <button className="flex flex-col items-center gap-1 text-slate-500 hover:text-indigo-600"><Grid className="w-5 h-5" /><span className="text-[10px] font-medium">More</span></button>
      </div>

    </>
  );
}
