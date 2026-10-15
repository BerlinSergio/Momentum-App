import React from 'react';

import { 
  ArrowLeft, Moon, LayoutGrid, ChevronLeft, ChevronDown, ChevronRight, ArrowLeftRight, Sun, CheckCircle2, BookOpen, Clock, Heart, Plus, Home, Wallet, CheckSquare, Grid 
} from 'lucide-react';

export default function IslamicHijriCalendarLightMode({ setActiveTab }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      {/* TOP HEADER BAR */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
            <Moon className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-slate-900 tracking-tight">
            Islamic Hijri Calendar
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveTab && setActiveTab('home_dashboard_light_mode')}
            className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            A
          </div>
        </div>
      </div>

      {/* MAIN HIJRI CALENDAR CONTAINER */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        {/* Month Selector & Cross-Calendar Sync */}
        <div className="flex items-center justify-between">
          <button className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700">
            <ChevronLeft className="w-4 h-4"/>
          </button>
          <div className="flex items-center gap-1.5">
            <h2 className="text-lg font-bold text-slate-900">Rabi' al-Thani 1448 AH</h2>
            <ChevronDown className="w-4 h-4 text-indigo-600"/>
          </div>
          <button className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700">
            <ChevronRight className="w-4 h-4"/>
          </button>
        </div>
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium">
          <ArrowLeftRight className="w-3.5 h-3.5 text-indigo-600"/>
          <span>October 2026 CE • Aqrab 1405 SH</span>
        </div>

        {/* Event Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
          <button className="px-3.5 py-1.5 rounded-2xl bg-indigo-600 text-white text-xs font-semibold shadow-sm shadow-indigo-600/30 whitespace-nowrap">
            All Events (5)
          </button>
          <button className="px-3.5 py-1.5 rounded-2xl bg-slate-100 text-slate-600 text-xs font-semibold hover:bg-slate-200 whitespace-nowrap">
            Spiritual & Prayers (3)
          </button>
          <button className="px-3.5 py-1.5 rounded-2xl bg-slate-100 text-slate-600 text-xs font-semibold hover:bg-slate-200 whitespace-nowrap">
            Fasting & Sunnah (2)
          </button>
        </div>

        {/* Calendar Days & Number Grid */}
        <div className="grid grid-cols-7 gap-1 text-center pt-2">
          {/* Weekdays header */}
          <div className="text-xs font-semibold text-slate-500 py-1">Ahad</div>
          <div className="text-xs font-semibold text-slate-500 py-1">Ith</div>
          <div className="text-xs font-semibold text-slate-500 py-1">Thul</div>
          <div className="text-xs font-semibold text-slate-500 py-1">Arba</div>
          <div className="text-xs font-semibold text-slate-500 py-1">Kham</div>
          <div className="text-xs font-bold text-indigo-600 py-1 bg-indigo-50 rounded-lg">Jum</div>
          <div className="text-xs font-semibold text-slate-500 py-1">Sabt</div>
          
          {/* Previous Month Pad */}
          <div className="h-10 flex items-center justify-center text-slate-400 font-normal">30</div>
          
          {/* Current Month Days */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`d1-${i}`} className="h-10 flex items-center justify-center text-slate-800 font-medium">{i + 1}</div>
          ))}
          {/* Friday */}
          <div className="h-10 flex items-center justify-center text-indigo-600 font-bold bg-indigo-50/50 rounded-lg">5</div>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`d2-${i}`} className="h-10 flex items-center justify-center text-slate-800 font-medium">{i + 6}</div>
          ))}
          {/* Friday */}
          <div className="h-10 flex items-center justify-center text-indigo-600 font-bold bg-indigo-50/50 rounded-lg">12</div>
          
          {/* Day 13 Active */}
          <div className="h-10 flex items-center justify-center">
            <div className="w-9 h-9 mx-auto rounded-full bg-indigo-600 text-white font-bold flex flex-col items-center justify-center shadow-md shadow-indigo-600/40 relative">
              13
              <span className="w-1 h-1 rounded-full bg-white absolute bottom-1"></span>
            </div>
          </div>

          {Array.from({ length: 5 }).map((_, i) => (
            <div key={`d3-${i}`} className="h-10 flex items-center justify-center text-slate-800 font-medium">{i + 14}</div>
          ))}
          {/* Friday */}
          <div className="h-10 flex items-center justify-center text-indigo-600 font-bold bg-indigo-50/50 rounded-lg">19</div>
          
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`d4-${i}`} className="h-10 flex items-center justify-center text-slate-800 font-medium">{i + 20}</div>
          ))}
          {/* Friday */}
          <div className="h-10 flex items-center justify-center text-indigo-600 font-bold bg-indigo-50/50 rounded-lg">26</div>

          {Array.from({ length: 3 }).map((_, i) => (
            <div key={`d5-${i}`} className="h-10 flex items-center justify-center text-slate-800 font-medium">{i + 27}</div>
          ))}

          {/* Next Month Pad */}
          <div className="h-10 flex items-center justify-center text-slate-400 font-normal">1</div>
          <div className="h-10 flex items-center justify-center text-slate-400 font-normal">2</div>
        </div>
      </div>

      {/* SELECTED HIJRI DAY & EVENTS CONTAINER */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-3 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        {/* Day Header & Solar/CE Equivalence */}
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 leading-tight">
            Saturday, 13 Rabi' al-Thani 1448 AH
          </h3>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-violet-50 border border-violet-200/80 text-violet-700">
            24 Oct 2026 • 2 Aqrab
          </span>
        </div>
        <p className="text-xs font-normal text-slate-500 mb-4">
          First of Ayyam al-Beed (White Days) • Qiyam & Sunnah Fasting
        </p>

        {/* Standardized rounded-2xl Hijri Event Tiles */}
        {/* Tile 1 */}
        <div className="p-3.5 rounded-2xl transition-all flex items-center justify-between gap-3 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
              <Sun className="w-4 h-4"/>
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-semibold text-slate-900 truncate">Ayyam al-Beed (White Days Fasting)</h4>
              <p className="text-[11px] font-normal text-slate-500">Dawn (05:12 AM) – Sunset (06:42 PM)</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">Sunnah</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 ml-1"/>
          </div>
        </div>

        {/* Tile 2 */}
        <div className="p-3.5 rounded-2xl transition-all flex items-center justify-between gap-3 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-4 h-4"/>
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-semibold text-slate-900 truncate">Surah Al-Kahf & Tafsir Study</h4>
              <p className="text-[11px] font-normal text-slate-500">04:45 PM – 05:45 PM</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">Spiritual</span>
            <Clock className="w-4 h-4 text-slate-400 ml-1"/>
          </div>
        </div>

        {/* Tile 3 */}
        <div className="p-3.5 rounded-2xl transition-all flex items-center justify-between gap-3 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <Heart className="w-4 h-4"/>
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-semibold text-slate-900 truncate">Family & Community Iftar Sharing</h4>
              <p className="text-[11px] font-normal text-slate-500">06:15 PM – 07:15 PM</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">Community</span>
            <Clock className="w-4 h-4 text-slate-400 ml-1"/>
          </div>
        </div>

        {/* Primary Action Button */}
        <button className="btn-primary w-full mt-2">
          <Plus className="w-4 h-4"/>
          Add Hijri Event
        </button>
      </div>

      {/* Floating Bottom Navigation Dock */}
      <div className="fixed bottom-6 inset-x-4 z-40">
        <div className="relative w-full h-16 rounded-full bg-white/90 backdrop-blur-xl border border-slate-200/50 shadow-lg flex items-center justify-around px-2">
          {/* Nav Item 1: Home */}
          <button 
            className="flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-slate-600 active:scale-95 transition-all w-14" 
            onClick={() => setActiveTab && setActiveTab('home')}
          >
            <Home className="w-6 h-6" strokeWidth={2} />
            <span className="text-[10px] font-semibold leading-none">Home</span>
          </button>
          
          {/* Nav Item 2: Finance */}
          <button 
            className="flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-slate-600 active:scale-95 transition-all w-14 relative"
            onClick={() => setActiveTab && setActiveTab('finance')}
          >
            <Wallet className="w-6 h-6" strokeWidth={2} />
            <span className="text-[10px] font-semibold leading-none">Finance</span>
          </button>
          
          {/* Center Action Button (+) */}
          <div className="relative -top-5 flex items-center justify-center">
            <button className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 active:scale-95 transition-transform ring-4 ring-slate-50">
              <Plus className="w-7 h-7" strokeWidth={2.5} />
            </button>
          </div>
          
          {/* Nav Item 4: Tasks (Active) */}
          <button className="flex flex-col items-center justify-center gap-1 text-indigo-600 active:scale-95 transition-all w-14 relative">
            <div className="absolute -top-3 w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
            <CheckSquare className="w-6 h-6 fill-indigo-50" strokeWidth={2} />
            <span className="text-[10px] font-bold leading-none">Tasks</span>
          </button>
          
          {/* Nav Item 5: More */}
          <button className="flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-slate-600 active:scale-95 transition-all w-14">
            <Grid className="w-6 h-6" strokeWidth={2} />
            <span className="text-[10px] font-semibold leading-none">More</span>
          </button>
        </div>
      </div>
    </div>
  );
}
