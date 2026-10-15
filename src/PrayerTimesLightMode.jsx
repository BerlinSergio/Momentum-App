import React from 'react';

import { 
  Sparkles, Bell, BellRing, MapPin, Compass, Calendar, CheckCircle2, Bookmark, ArrowLeft 
} from 'lucide-react';

export default function PrayerTimesLightMode({ setActiveTab }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-28">
      {/* Top Header */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
            <Sparkles className="w-5 h-5 text-white"/>
          </div>
          <h1 className="text-base font-bold text-indigo-950 tracking-tight" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>Prayer Times</h1>
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

      {/* Title & Alerts Row */}
      <div className="flex items-center justify-between px-5 pt-2 pb-1">
        <div>
          <h2 className="text-xl font-bold text-indigo-950 tracking-tight" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>Prayer Times</h2>
          <p className="text-xs font-normal text-slate-800 mt-0.5" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>Stay connected to your spiritual rhythm</p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 border border-indigo-200/80 text-slate-800 shadow-2xs" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>
          <BellRing className="w-3.5 h-3.5 text-indigo-600"/>
          Alerts On
        </span>
      </div>

      {/* Location & Dual Calendar Strip */}
      <div className="block mx-5 my-3 p-4 rounded-3xl space-y-2.5 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-600"/>
            <span className="text-xs font-bold text-slate-900">Kabul, Afghanistan</span>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/70">AUTO</span>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-violet-700 bg-violet-50 px-2.5 py-0.5 rounded-full border border-violet-200/70">
            <Compass className="w-3.5 h-3.5 text-violet-600"/>
            <span>247° WSW</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] font-medium text-slate-500">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400"/>
            <span>Saturday, Oct 24, 2026</span>
          </div>
          <span className="font-semibold text-slate-700">13 Rabi' al-Thani 1448 AH</span>
        </div>
      </div>

      {/* Next Prayer Hero Card */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-4 relative overflow-hidden bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100/80">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
            <span className="font-bold text-[10px] tracking-wider text-indigo-800 uppercase">Next Prayer</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500 text-xs font-medium">
            <BellRing className="w-3.5 h-3.5 text-indigo-500"/>
            <span>Adhan in Kabul</span>
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-3xl font-bold text-slate-900 tracking-tight block">Dhuhr</span>
            <span className="text-xs font-medium text-slate-500 mt-0.5 block">Midday Prayer • 4 Rak'ahs</span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-indigo-600 tracking-tight block">01:05 PM</span>
            <span className="text-[10px] font-semibold text-slate-400 block mt-0.5">Solar Zenith Passed</span>
          </div>
        </div>
        
        <div className="rounded-2xl p-3 flex items-center justify-around text-center bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="flex flex-col items-center">
            <div className="w-12 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
              <span className="text-xl font-bold text-slate-900">02</span>
            </div>
            <span className="text-[10px] font-semibold text-slate-500 mt-1">Hours</span>
          </div>
          <span className="text-xl font-bold text-indigo-300 pb-3">:</span>
          <div className="flex flex-col items-center">
            <div className="w-12 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
              <span className="text-xl font-bold text-slate-900">14</span>
            </div>
            <span className="text-[10px] font-semibold text-slate-500 mt-1">Mins</span>
          </div>
          <span className="text-xl font-bold text-indigo-300 pb-3">:</span>
          <div className="flex flex-col items-center">
            <div className="w-12 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
              <span className="text-xl font-bold text-indigo-600">32</span>
            </div>
            <span className="text-[10px] font-semibold text-slate-500 mt-1">Secs</span>
          </div>
        </div>

        <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-md shadow-indigo-600/30">
          <Bell className="w-4 h-4"/>
          <span>Notification Active (15m before)</span>
        </button>
      </div>

      {/* Canonical Prayers List Container */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-2.5 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Canonical Prayers</h3>
          <span className="text-xs font-medium text-slate-400">5 Obligatory</span>
        </div>
        
        <div className="p-3 rounded-2xl flex items-center justify-between bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <Sparkles className="w-5 h-5"/>
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Fajr</div>
              <div className="text-xs font-medium text-slate-500">Dawn prayer</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-slate-900">05:12 AM</div>
            <div className="flex items-center justify-end gap-1 text-[10px] font-semibold text-teal-600">
              <CheckCircle2 className="w-3 h-3"/>
              <span>Completed</span>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-2xl flex items-center justify-between bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="flex items-center gap-3 pl-1">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
              <Sparkles className="w-5 h-5"/>
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                Dhuhr <BellRing className="w-3.5 h-3.5 text-indigo-500 animate-pulse"/>
              </div>
              <div className="text-xs font-medium text-slate-500">Midday prayer</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-indigo-700">01:05 PM</div>
            <div className="px-2 py-0.5 mt-0.5 rounded-full bg-indigo-100 border border-indigo-200/80 text-indigo-700 text-[9px] font-bold">
              Next • In 2h 14m
            </div>
          </div>
        </div>

        <div className="p-3 rounded-2xl flex items-center justify-between bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <Sparkles className="w-5 h-5"/>
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Asr</div>
              <div className="text-xs font-medium text-slate-500">Late afternoon prayer</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-slate-900">04:28 PM</div>
            <div className="text-[10px] font-medium text-slate-400 flex items-center justify-end gap-1 mt-0.5">
              <Bell className="w-3 h-3"/> Upcoming
            </div>
          </div>
        </div>

        <div className="p-3 rounded-2xl flex items-center justify-between bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <Sparkles className="w-5 h-5"/>
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Maghrib</div>
              <div className="text-xs font-medium text-slate-500">Sunset prayer</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-slate-900">05:42 PM</div>
            <div className="text-[10px] font-medium text-slate-400 flex items-center justify-end gap-1 mt-0.5">
              <Bell className="w-3 h-3"/> Upcoming
            </div>
          </div>
        </div>

        <div className="p-3 rounded-2xl flex items-center justify-between bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <Sparkles className="w-5 h-5"/>
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Isha</div>
              <div className="text-xs font-medium text-slate-500">Night prayer</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-slate-900">07:15 PM</div>
            <div className="text-[10px] font-medium text-slate-400 flex items-center justify-end gap-1 mt-0.5">
              <Bell className="w-3 h-3"/> Upcoming
            </div>
          </div>
        </div>
      </div>

      {/* Sun & Twilight Reference */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        <div className="grid grid-cols-3 gap-2.5 text-center">
          <div className="flex flex-col items-center p-2.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
            <span className="text-[10px] font-semibold text-slate-500 leading-tight">Sunrise / Shuruq</span>
            <span className="text-xs font-bold text-slate-900 mt-1">06:31 AM</span>
          </div>
          <div className="flex flex-col items-center p-2.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
            <span className="text-[10px] font-semibold text-slate-500 leading-tight">Midnight / Nisf</span>
            <span className="text-xs font-bold text-slate-900 mt-1">12:14 AM</span>
          </div>
          <div className="flex flex-col items-center p-2.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
            <span className="text-[10px] font-semibold text-slate-500 leading-tight">Tahajjud Third</span>
            <span className="text-xs font-bold text-slate-900 mt-1">03:45 AM</span>
          </div>
        </div>
      </div>

      {/* Daily Spiritual Contemplation Card */}
      <div className="block mx-5 mb-28 p-5 rounded-3xl space-y-2.5 text-slate-200 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        <p className="text-sm font-medium text-slate-800 italic leading-relaxed">
          "Guard strictly your habit of prayers, especially the middle prayer, and stand before Allah in profound devotion."
        </p>
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>— Surah Al-Baqarah 2:238</span>
          <Bookmark className="w-4 h-4 text-violet-500"/>
        </div>
      </div>
    </div>
  );
}
