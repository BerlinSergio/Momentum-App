import React from 'react';

import { 
  ArrowLeft, SlidersHorizontal, BellRing, Bell, Moon, Sun, Sunrise, ArrowRight 
} from 'lucide-react';

export default function PrayerNotificationSettingsDarkMode({ setActiveTab }) {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col text-white">
      {/* Top Header & Title */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <BellRing className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-white tracking-tight">
            Prayer Notification Settings
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

      {/* Description badge & subtitle */}
      <div className="px-5 pt-2 pb-4">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 mb-1">
          <SlidersHorizontal className="w-3.5 h-3.5"/>
          <span>PREFERENCES • AUDIO & ALERTS</span>
        </div>
        <p className="text-xs font-normal text-slate-400">Configure gentle auditory reminders, Adhan cues, and early mindfulness alerts for each daily prayer.</p>
      </div>

      {/* MASTER PRAYER ALERTS CARD */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
        <div className="w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl p-3 shrink-0 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
              <BellRing className="w-5 h-5 text-indigo-400"/>
            </div>
            <div className="flex flex-col">
              <div className="text-sm font-bold text-white">Master Prayer Alerts</div>
              <div className="text-xs font-medium text-slate-400 mt-0.5">Push alerts, full Adhan, & pre-cues</div>
            </div>
          </div>
          <button className="w-12 h-7 rounded-full bg-indigo-600 p-0.5 flex items-center justify-end transition-colors shadow-sm focus:outline-none shrink-0" type="button">
            <span className="w-6 h-6 rounded-full bg-white shadow-md"></span>
          </button>
        </div>
      </div>

      {/* TIMING PREFERENCES CARD */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-3.5 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Timing Preferences</h3>
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <div className="text-sm font-semibold text-white">At Prayer Time (Adhan)</div>
          </div>
          <button className="w-12 h-7 rounded-full bg-indigo-600 p-0.5 flex items-center justify-end transition-colors shadow-sm focus:outline-none">
            <span className="w-6 h-6 rounded-full bg-white shadow-md"></span>
          </button>
        </div>

        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <div className="text-sm font-semibold text-white flex items-center gap-2">
              15 Minutes Before
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Recommended</span>
            </div>
          </div>
          <button className="w-12 h-7 rounded-full bg-indigo-600 p-0.5 flex items-center justify-end transition-colors shadow-sm focus:outline-none">
            <span className="w-6 h-6 rounded-full bg-white shadow-md"></span>
          </button>
        </div>

        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <div className="text-sm font-semibold text-white">10 Minutes Before</div>
          </div>
          <button className="w-12 h-7 rounded-full bg-slate-700 p-0.5 flex items-center justify-start transition-colors shadow-sm focus:outline-none">
            <span className="w-6 h-6 rounded-full bg-slate-400 shadow-md"></span>
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-white">5 Minutes Before</div>
          </div>
          <button className="w-12 h-7 rounded-full bg-slate-700 p-0.5 flex items-center justify-start transition-colors shadow-sm focus:outline-none">
            <span className="w-6 h-6 rounded-full bg-slate-400 shadow-md"></span>
          </button>
        </div>
      </div>

      {/* INDIVIDUAL PRAYER REMINDERS CARD */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-3.5 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Individual Prayer Reminders</h3>
          <span className="text-xs font-medium text-indigo-400">5 Configured</span>
        </div>

        {/* Fajr */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <Sunrise className="w-5 h-5 text-indigo-400"/>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-200">Fajr</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">Loud / Wake Up</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mt-0.5">
                05:12 AM • <button className="text-indigo-400 hover:underline">Change Reciter / Tone</button>
              </div>
            </div>
          </div>
          <button className="w-12 h-7 rounded-full bg-indigo-600 p-0.5 flex items-center justify-end transition-colors shadow-sm focus:outline-none">
            <span className="w-6 h-6 rounded-full bg-white shadow-md"></span>
          </button>
        </div>

        {/* Dhuhr */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <Sun className="w-5 h-5 text-amber-400"/>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-200">Dhuhr</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-800 text-slate-300 border border-slate-700">Standard</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mt-0.5">
                01:05 PM • <button className="text-indigo-400 hover:underline">Change Reciter / Tone</button>
              </div>
            </div>
          </div>
          <button className="w-12 h-7 rounded-full bg-indigo-600 p-0.5 flex items-center justify-end transition-colors shadow-sm focus:outline-none">
            <span className="w-6 h-6 rounded-full bg-white shadow-md"></span>
          </button>
        </div>

        {/* Asr */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <Sun className="w-5 h-5 text-orange-400"/>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-200">Asr</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-800 text-slate-300 border border-slate-700">Standard</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mt-0.5">
                04:28 PM • <button className="text-indigo-400 hover:underline">Change Reciter / Tone</button>
              </div>
            </div>
          </div>
          <button className="w-12 h-7 rounded-full bg-indigo-600 p-0.5 flex items-center justify-end transition-colors shadow-sm focus:outline-none">
            <span className="w-6 h-6 rounded-full bg-white shadow-md"></span>
          </button>
        </div>

        {/* Maghrib */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <Moon className="w-5 h-5 text-indigo-400"/>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-200">Maghrib</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-800 text-slate-300 border border-slate-700">Standard</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mt-0.5">
                05:42 PM • <button className="text-indigo-400 hover:underline">Change Reciter / Tone</button>
              </div>
            </div>
          </div>
          <button className="w-12 h-7 rounded-full bg-indigo-600 p-0.5 flex items-center justify-end transition-colors shadow-sm focus:outline-none">
            <span className="w-6 h-6 rounded-full bg-white shadow-md"></span>
          </button>
        </div>

        {/* Isha */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Moon className="w-5 h-5 text-indigo-400"/>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-200">Isha</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Quiet Mode</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mt-0.5">
                07:15 PM • <button className="text-indigo-400 hover:underline">Change Reciter / Tone</button>
              </div>
            </div>
          </div>
          <button className="w-12 h-7 rounded-full bg-indigo-600 p-0.5 flex items-center justify-end transition-colors shadow-sm focus:outline-none">
            <span className="w-6 h-6 rounded-full bg-white shadow-md"></span>
          </button>
        </div>
      </div>

      {/* AUDIO & HAPTICS CARD */}
      <div className="block mx-5 mb-6 p-5 rounded-3xl space-y-3.5 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <div className="text-sm font-semibold text-white">Vibration & Haptics</div>
          </div>
          <button className="w-12 h-7 rounded-full bg-indigo-600 p-0.5 flex items-center justify-end transition-colors shadow-sm focus:outline-none">
            <span className="w-6 h-6 rounded-full bg-white shadow-md"></span>
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-white">Respect Do Not Disturb</div>
            <div className="text-xs font-medium text-slate-400">Override focus modes for Fajr only</div>
          </div>
          <button className="w-12 h-7 rounded-full bg-slate-700 p-0.5 flex items-center justify-start transition-colors shadow-sm focus:outline-none">
            <span className="w-6 h-6 rounded-full bg-slate-400 shadow-md"></span>
          </button>
        </div>
      </div>

      {/* STANDARDIZED BOTTOM ACTIONS */}
      <div className="px-5 pb-10 space-y-3">
        <button className="btn-primary w-full">
          <span>Save Notification Settings</span>
          <ArrowRight className="w-4 h-4"/>
        </button>
        <button className="w-full py-3 text-xs font-semibold text-slate-400 hover:text-white transition-colors text-center">
          Reset to Default Schedule
        </button>
      </div>
    </div>
  );
}

