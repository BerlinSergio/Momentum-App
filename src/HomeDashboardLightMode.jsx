import React from 'react';
import { Sparkles, Bell, Wallet, CreditCard, CheckSquare, Moon, Clock, Sun, CheckCircle2, ChevronRight, Plus, Home, Grid, Check } from 'lucide-react';


export default function HomeDashboardLightMode() {
  return (
    <>
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="Momentum Logo" 
            className="w-10 h-10 object-cover rounded-xl aspect-square flex-shrink-0 shadow-md shadow-indigo-600/30" 
          />
          <h1 className="text-base font-bold text-slate-900 tracking-tight">
            Momentum
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"><Bell className="w-5 h-5"/></button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            A
          </div>
        </div>
      </div>

      <main className="flex-1 flex flex-col w-full pb-[120px] bg-transparent relative z-10">
        
        {/* User Greeting Section - No Overlap */}
        <div className="px-5 pt-3 pb-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
              Good morning, Aisha <span>👋</span>
            </h1>
            <p className="text-xs font-normal text-slate-500 mt-0.5">Stay consistent. Small steps every day.</p>
            <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider block mt-1">
              Monday, 24 Oct
            </span>
          </div>
          <div className="w-12 h-12 rounded-full ring-2 ring-indigo-100 shadow-sm overflow-hidden flex-shrink-0 bg-slate-200 flex items-center justify-center">
            {/* Fallback image if not present */}
            <span className="text-lg font-bold text-slate-500">A</span>
          </div>
        </div>

        {/* FINANCIAL HEALTH HERO CARD */}
        <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-indigo-600" />
              <h2 className="text-sm font-bold text-slate-900">Financial Health</h2>
            </div>
            <span className="text-xs font-semibold text-indigo-600">October</span>
          </div>
          
          <div className="grid grid-cols-3 gap-2.5 pt-1">
            <div className="p-3 rounded-2xl text-center bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
              <span className="text-[11px] font-medium text-slate-500 block">Income</span>
              <p className="text-base font-bold text-slate-900 mt-0.5">$6,200</p>
              <span className="text-[10px] font-semibold text-emerald-600 inline-flex items-center gap-0.5 mt-0.5">↗ +8.4%</span>
            </div>
            <div className="p-3 rounded-2xl text-center bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
              <span className="text-[11px] font-medium text-slate-500 block">Expenses</span>
              <p className="text-base font-bold text-slate-900 mt-0.5">$3,450</p>
              <span className="text-[10px] font-medium text-slate-500 inline-flex items-center gap-0.5 mt-0.5">✔ Safe limit</span>
            </div>
            <div className="p-3 rounded-2xl text-center bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
              <span className="text-[11px] font-medium text-indigo-700 block">Saved</span>
              <p className="text-base font-bold text-indigo-700 mt-0.5">+$2,750</p>
              <span className="text-[10px] font-semibold text-indigo-600 inline-flex items-center gap-0.5 mt-0.5">44.3%</span>
            </div>
          </div>

          <div className="pt-2">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-medium text-slate-600">Savings Target ($3,000)</span>
              <span className="font-bold text-indigo-600">91.6%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500" style={{ width: '91.6%' }}></div>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS GRID */}
        <div className="grid grid-cols-4 gap-3 mx-5 mb-5">
          <button className="p-3.5 rounded-2xl transition-all flex flex-col items-center justify-center text-center gap-2 group bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
            <CreditCard className="w-5 h-5 text-indigo-600" />
            <span className="text-xs font-semibold text-slate-700">Log Cost</span>
          </button>
          <button className="p-3.5 rounded-2xl transition-all flex flex-col items-center justify-center text-center gap-2 group bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
            <CheckSquare className="w-5 h-5 text-violet-600" />
            <span className="text-xs font-semibold text-slate-700">Add Task</span>
          </button>
          <button className="p-3.5 rounded-2xl transition-all flex flex-col items-center justify-center text-center gap-2 group bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
            <Moon className="w-5 h-5 text-teal-600" />
            <span className="text-xs font-semibold text-slate-700">Prayers</span>
          </button>
          <button className="p-3.5 rounded-2xl transition-all flex flex-col items-center justify-center text-center gap-2 group bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-semibold text-slate-700">Reflect</span>
          </button>
        </div>

        {/* ROUTINE & PRAYER CARD */}
        <div className="block mx-5 mb-5 p-5 rounded-3xl relative overflow-hidden space-y-4 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              <h2 className="text-sm font-bold text-slate-900">Routine & Prayer</h2>
            </div>
            <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">Edit</button>
          </div>

          <div className="p-3.5 rounded-2xl flex items-center justify-between relative z-10 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white text-indigo-600 flex items-center justify-center shadow-sm border border-indigo-100/80">
                <Sun className="w-4 h-4"/>
              </div>
              <div>
                <span className="text-[11px] font-medium text-slate-500">Next: Dhuhr in 1h 45m</span>
                <h3 className="text-base font-bold text-slate-900">1:05 PM</h3>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-600 text-white shadow-sm">Upcoming</span>
          </div>

          <div className="relative pt-2 pb-1">
            {/* Clean Mosque Silhouette Artwork Vector */}
            <div className="absolute right-0 bottom-0 left-0 h-28 pointer-events-none z-0 flex items-end justify-end pr-2 overflow-hidden">
              <svg 
                viewBox="0 0 300 100" 
                fill="currentColor" 
                className="w-64 h-24 text-indigo-100/80"
                preserveAspectRatio="none"
              >
                {/* Left Minaret */}
                <rect x="50" y="30" width="8" height="70" rx="2" />
                <path d="M54 15 L48 30 L60 30 Z" />
                <circle cx="54" cy="13" r="2" />

                {/* Small Left Dome */}
                <path d="M75 100 C75 55, 115 55, 115 100 Z" />
                <path d="M95 45 L93 55 L97 55 Z" />

                {/* Grand Center Dome */}
                <path d="M110 100 C110 35, 175 35, 175 100 Z" />
                <path d="M142.5 25 L140 37 L145 37 Z" />
                <circle cx="142.5" cy="22" r="2.5" />

                {/* Small Right Dome */}
                <path d="M170 100 C170 58, 205 58, 205 100 Z" />
                <path d="M187.5 48 L185.5 58 L189.5 58 Z" />

                {/* Right Tall Minaret */}
                <rect x="220" y="20" width="10" height="80" rx="2" />
                <path d="M225 5 L218 20 L232 20 Z" />
                <circle cx="225" cy="3" r="2.5" />
              </svg>
            </div>

            {/* The 5 Prayer Time Columns (Semi-transparent / clear backdrop so mosque is visible behind) */}
            <div className="grid grid-cols-5 gap-2 relative z-10 text-center">
              {/* Fajr */}
              <div className="p-2.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
                <span className="text-[10px] text-slate-500 font-medium block">Fajr</span>
                <p className="text-xs font-bold text-slate-800 mt-0.5">5:12 AM</p>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mx-auto mt-1"/>
              </div>

              {/* Dhuhr (Active) */}
              <div className="p-2.5 rounded-2xl text-indigo-700 ring-1 ring-indigo-300 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
                <span className="text-[10px] font-semibold text-indigo-600 block">Dhuhr</span>
                <p className="text-xs font-bold text-indigo-700 mt-0.5">1:05 PM</p>
                <Clock className="w-3.5 h-3.5 text-indigo-600 mx-auto mt-1"/>
              </div>

              {/* Asr */}
              <div className="p-2.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
                <span className="text-[10px] text-slate-500 font-medium block">Asr</span>
                <p className="text-xs font-semibold text-slate-700 mt-0.5">4:28 PM</p>
                <div className="w-2 h-2 rounded-full bg-slate-300 mx-auto mt-2"></div>
              </div>

              {/* Maghrib */}
              <div className="p-2.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
                <span className="text-[10px] text-slate-500 font-medium block">Maghrib</span>
                <p className="text-xs font-semibold text-slate-700 mt-0.5">6:42 PM</p>
                <div className="w-2 h-2 rounded-full bg-slate-300 mx-auto mt-2"></div>
              </div>

              {/* Isha */}
              <div className="p-2.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
                <span className="text-[10px] text-slate-500 font-medium block">Isha</span>
                <p className="text-xs font-semibold text-slate-700 mt-0.5">8:05 PM</p>
                <div className="w-2 h-2 rounded-full bg-slate-300 mx-auto mt-2"></div>
              </div>
            </div>
          </div>
        </div>

        {/* TODAY'S TASKS */}
        <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-3 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-indigo-600" />
              <h2 className="text-sm font-bold text-slate-900">Today's Tasks</h2>
            </div>
            <button className="btn-primary">
              <Plus className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold">Add Task</span>
            </button>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between p-3.5 rounded-2xl transition-colors cursor-pointer group bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-sm shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-sm font-semibold text-slate-900 line-through opacity-60 truncate">Drink 500ml water</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 text-slate-500 text-[11px] font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>10:00 AM</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl transition-colors cursor-pointer group bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-5 h-5 rounded-full bg-white border border-slate-300 flex items-center justify-center text-transparent group-hover:border-indigo-400 transition-all shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-sm font-semibold text-slate-900 truncate">Review quarterly budget</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 text-slate-500 text-[11px] font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>11:30 AM</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl transition-colors cursor-pointer group bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-5 h-5 rounded-full bg-white border border-slate-300 flex items-center justify-center text-transparent group-hover:border-indigo-400 transition-all shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-sm font-semibold text-slate-900 truncate">Read 20 min Quran & reflection</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 text-slate-500 text-[11px] font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>8:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* MINDFUL STREAK BANNER */}
        <div className="block mx-5 mb-28 p-4 rounded-3xl flex items-start gap-3.5 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-600 shrink-0 shadow-sm border border-slate-200/60">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-sm font-bold text-slate-900">Mindful Streak: 14 Days</span>
            <span className="text-xs font-normal text-slate-500 pr-2">"Peace comes from within. Do not seek it without."</span>
          </div>
          <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-indigo-600 shrink-0 shadow-sm mt-1 border border-slate-200/60">
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </main>

      {/* FLOATING BOTTOM DOCK */}
      <nav className="fixed bottom-0 w-full z-50 pb-safe pointer-events-none">
        <div className="px-5 pb-5 pt-2">
          <div className="pointer-events-auto mx-auto max-w-md h-16 px-2 rounded-full bg-white/90 backdrop-blur-3xl shadow-lg border border-slate-200/50 flex items-center justify-between">
            <button className="flex flex-col items-center justify-center flex-1 h-full rounded-full transition-all text-indigo-600">
              <Home className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-bold">Home</span>
            </button>
            <button className="flex flex-col items-center justify-center flex-1 h-full rounded-full text-slate-500 transition-all hover:text-slate-800">
              <Wallet className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-semibold">Finance</span>
            </button>
            <div className="flex items-center justify-center px-2">
              <button className="w-14 h-14 -mt-6 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/40 hover:scale-105 active:scale-95 transition-transform ring-4 ring-white">
                <Plus className="w-6 h-6" />
              </button>
            </div>
            <button className="flex flex-col items-center justify-center flex-1 h-full rounded-full text-slate-500 transition-all hover:text-slate-800">
              <CheckSquare className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-semibold">Tasks</span>
            </button>
            <button className="flex flex-col items-center justify-center flex-1 h-full rounded-full text-slate-500 transition-all hover:text-slate-800">
              <Grid className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-semibold">More</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
