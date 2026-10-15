import React from 'react';

import { 
  ArrowLeft, Bell, CheckCircle2, Sparkles, Moon, ArrowRight, MoonStar as Mosque 
} from 'lucide-react';

export default function NotificationsSettingsLightMode({ setActiveTab }) {
  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      {/* TOP HEADER BAR */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
            <Bell className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-slate-900 tracking-tight">
            Notification & Calm Alerts
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

      {/* MASTER NOTIFICATION TOGGLE CARD */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl flex items-center justify-between gap-4 text-white bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs flex-shrink-0">
            <Bell className="w-5 h-5"/>
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 leading-snug">Allow Momentum Notifications</h2>
            <p className="text-xs font-normal text-slate-500 mt-0.5 leading-relaxed">
              Mindful chimes, prayer calls, and gentle daily agenda alerts.
            </p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
          <input type="checkbox" defaultChecked className="sr-only peer" />
          <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
        </label>
      </div>

      {/* PRAYER & ADHAN ALERTS CARD */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Mosque className="w-4 h-4"/>
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Prayer & Adhan Alerts</h3>
              <p className="text-[11px] font-normal text-slate-500">5 daily prayers configured</p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 border border-emerald-200/70 text-emerald-700">Active</span>
        </div>

        <div className="p-1 rounded-2xl bg-slate-100/80 border border-slate-200/70 flex items-center gap-1">
          <button className="flex-1 py-1.5 rounded-xl bg-white text-xs font-semibold text-indigo-700 shadow-xs text-center">Muted Chime</button>
          <button className="flex-1 py-1.5 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 text-center">Full Adhan</button>
          <button className="flex-1 py-1.5 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 text-center">Vibration</button>
        </div>

        <div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-semibold text-slate-800">Timing Offset</span>
            <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">Exact time</button>
          </div>
          <p className="text-[11px] font-normal text-slate-500">Prepare your mind and ablutions peacefully before entry time.</p>

          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <div className="p-3 rounded-2xl flex items-center justify-between cursor-pointer bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
              <div>
                <p className="text-xs font-bold text-indigo-900">Exact (0m)</p>
                <span className="text-[10px] font-medium text-indigo-600">At adhan</span>
              </div>
              <CheckCircle2 className="w-4 h-4 text-indigo-600"/>
            </div>
            <div className="p-3 rounded-2xl flex items-center justify-between cursor-pointer bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
              <div>
                <p className="text-xs font-semibold text-slate-800">5m before</p>
                <span className="text-[10px] font-normal text-slate-500">Gentle buzz</span>
              </div>
              <div className="w-4 h-4 rounded-full border border-slate-300"></div>
            </div>
            <div className="p-3 rounded-2xl flex items-center justify-between cursor-pointer bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
              <div>
                <p className="text-xs font-semibold text-slate-800">10m before</p>
                <span className="text-[10px] font-normal text-slate-500">Ablution prep</span>
              </div>
              <div className="w-4 h-4 rounded-full border border-slate-300"></div>
            </div>
            <div className="p-3 rounded-2xl flex items-center justify-between cursor-pointer bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
              <div>
                <p className="text-xs font-semibold text-slate-800">15m before</p>
                <span className="text-[10px] font-normal text-slate-500">Early pause</span>
              </div>
              <div className="w-4 h-4 rounded-full border border-slate-300"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-1.5 pt-1 text-center">
          <div className="p-2 rounded-xl bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
            <span className="text-[10px] font-medium text-slate-500 block">Fajr</span>
            <span className="text-xs font-bold text-indigo-600 mt-0.5 block">05:12</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mx-auto mt-1 block"></span>
          </div>
          <div className="p-2 rounded-xl bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
            <span className="text-[10px] font-medium text-slate-500 block">Dhuhr</span>
            <span className="text-xs font-bold text-indigo-600 mt-0.5 block">12:30</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mx-auto mt-1 block"></span>
          </div>
          <div className="p-2 rounded-xl bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
            <span className="text-[10px] font-medium text-slate-500 block">Asr</span>
            <span className="text-xs font-bold text-indigo-600 mt-0.5 block">15:45</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mx-auto mt-1 block"></span>
          </div>
          <div className="p-2 rounded-xl bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
            <span className="text-[10px] font-medium text-slate-500 block">Maghrib</span>
            <span className="text-xs font-bold text-indigo-600 mt-0.5 block">18:18</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mx-auto mt-1 block"></span>
          </div>
          <div className="p-2 rounded-xl bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
            <span className="text-[10px] font-medium text-slate-500 block">Isha</span>
            <span className="text-xs font-bold text-indigo-600 mt-0.5 block">19:42</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mx-auto mt-1 block"></span>
          </div>
        </div>
      </div>

      {/* TASKS & HABIT REMINDERS CARD */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-indigo-600"/>
          <h3 className="text-xs font-bold text-slate-900">Tasks & Habit Reminders</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-slate-900">Due Task Alerts</p>
              <p className="text-[11px] font-normal text-slate-500 mt-0.5">15 mins before due</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-slate-900">Daily Habit Check-in</p>
              <p className="text-[11px] font-normal text-slate-500 mt-0.5">Everyday at 08:30 PM</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-slate-900">Overdue Milestone Pushes</p>
              <p className="text-[11px] font-normal text-slate-500 mt-0.5">Gentle nudges for pending target goals</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
            </label>
          </div>
        </div>
      </div>

      {/* MINDFULNESS & ROUTINES CARD */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-teal-600"/>
          <h3 className="text-xs font-bold text-slate-900">Mindfulness & Routines</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-slate-900">Morning Intention & Fajr</p>
              <p className="text-[11px] font-normal text-slate-500 mt-0.5">05:00 AM • Soft morning rise</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-slate-900">Midday Pause & Hydration</p>
              <p className="text-[11px] font-normal text-slate-500 mt-0.5">01:00 PM • 3 deep breaths chime</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-slate-900">Evening Wind-down & Murāqabah</p>
              <p className="text-[11px] font-normal text-slate-500 mt-0.5">09:30 PM • Gratitude journaling alert</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-slate-900">Daily Radiance Quote</p>
              <p className="text-[11px] font-normal text-slate-500 mt-0.5">08:00 AM • Curated wisdom nugget</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
            </label>
          </div>
        </div>
      </div>

      {/* ZEN FOCUS / DO NOT DISTURB CARD */}
      <div className="block mx-5 mb-6 p-5 rounded-3xl flex items-center justify-between gap-3.5 text-white bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-white border border-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 shadow-2xs">
            <Moon className="w-5 h-5"/>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Zen Focus / Do Not Disturb</h4>
            <p className="text-[11px] font-normal text-slate-600 mt-0.5 leading-relaxed">
              Silence all civil alerts between 10:30 PM and 04:30 AM while preserving Fajr Adhan.
            </p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
          <input type="checkbox" defaultChecked className="sr-only peer" />
          <div className="w-12 h-6 bg-indigo-200/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-indigo-100 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
        </label>
      </div>

      {/* PROPERLY POSITIONED BOTTOM ACTION BUTTON */}
      <div className="px-5 pb-12 text-center space-y-2.5">
        <button className="btn-primary w-full">
          Save Notification Settings
          <ArrowRight className="w-4 h-4"/>
        </button>
        <p className="text-[11px] font-normal text-slate-400">
          Preferences sync securely across your connected devices.
        </p>
      </div>
    </div>
  );
}
