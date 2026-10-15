import React from 'react';

import { 
  ArrowLeft, Compass, Sun, Radio, Search, Check, ArrowRight 
} from 'lucide-react';

export default function TimezoneSelectionLightMode({ setActiveTab }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between relative select-none">
      <div className="flex-1 overflow-y-auto">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-slate-900 tracking-tight">
            Timezone Selection
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

        {/* Active Timezone Hero Card */}
        <div className="block mx-5 my-3 p-5 rounded-3xl space-y-4 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-indigo-50 border border-indigo-200/80 text-indigo-700 shadow-sm">
              <Compass className="w-3.5 h-3.5 text-indigo-600"/>
              ACTIVE TIMEZONE
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/70">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
              Astronomical Sync
            </span>
          </div>

          <div className="flex items-baseline justify-between pt-1">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Asia/Kabul</h2>
              <span className="text-xs font-medium text-slate-500 mt-0.5 block">UTC +4:30 • Kabul, Afghanistan</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-indigo-600">10:48</span>
              <span className="text-xs font-bold text-slate-500 ml-1">AM</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl flex items-center justify-between bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-500"/>
              <span className="text-xs font-semibold text-slate-800">Solar Noon Offset: <strong className="text-indigo-600 font-bold">+12m 40s</strong></span>
            </div>
            <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200/80 px-2 py-0.5 rounded-full">
              CALIBRATED
            </span>
          </div>

          <p className="text-[11px] font-normal text-slate-700 leading-relaxed pt-0.5">
            Used to calculate astronomical Fajr, Sunrise, Dhuhr, Asr, Maghrib, and Isha solar coordinates with celestial precision.
          </p>
        </div>

        {/* Auto-detect via GPS Card */}
        <div className="block mx-5 mb-4 p-4 rounded-3xl bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="w-full flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 shadow-sm">
                <Radio className="w-5 h-5"/>
              </div>
              <div className="flex flex-col">
                <h3 className="text-xs font-bold text-slate-900">Auto-detect via GPS</h3>
                <p className="text-[11px] font-normal text-slate-500 mt-0.5">Calibrate horizons automatically</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
            </label>
          </div>
        </div>

        {/* Search Input */}
        <div className="mx-5 mb-3">
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
            <Search className="w-4 h-4 text-slate-400"/>
            <input 
              type="text" 
              placeholder="Search city, country, or UTC offset..." 
              className="w-full bg-transparent text-xs font-normal text-slate-900 focus:outline-none placeholder-slate-400"
            />
          </div>
        </div>

        {/* Continent Filter Chips */}
        <div className="flex items-center gap-2 px-5 mb-4 overflow-x-auto scrollbar-none pb-1">
          <button className="px-3.5 py-1.5 rounded-2xl bg-indigo-600 text-white text-xs font-semibold shadow-sm whitespace-nowrap">
            All
          </button>
          <button className="px-3.5 py-1.5 rounded-2xl bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50 text-xs font-semibold whitespace-nowrap shadow-sm">
            Asia
          </button>
          <button className="px-3.5 py-1.5 rounded-2xl bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50 text-xs font-semibold whitespace-nowrap shadow-sm">
            Europe
          </button>
          <button className="px-3.5 py-1.5 rounded-2xl bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50 text-xs font-semibold whitespace-nowrap shadow-sm">
            Americas
          </button>
          <button className="px-3.5 py-1.5 rounded-2xl bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50 text-xs font-semibold whitespace-nowrap shadow-sm">
            Africa
          </button>
          <button className="px-3.5 py-1.5 rounded-2xl bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50 text-xs font-semibold whitespace-nowrap shadow-sm">
            Oceania
          </button>
        </div>

        {/* Timezone List Container */}
        <div className="mx-5 space-y-2.5 pb-36">
          {/* 1. Selected Zone (Asia/Kabul) */}
          <div className="p-3.5 rounded-2xl flex items-center justify-between cursor-pointer bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 stroke-[2.5]"/>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900">Asia/Kabul</h4>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-indigo-100 border border-indigo-200/80 text-indigo-700">UTC+4:30</span>
                </div>
                <p className="text-[11px] font-normal text-slate-500 mt-0.5">Kabul, Afghanistan</p>
              </div>
            </div>
            <span className="text-xs font-bold text-indigo-600">10:48 <span className="text-[10px] font-normal text-slate-500">AM</span></span>
          </div>

          {/* Other Zones */}
          {[
            { zone: 'Asia/Dubai', utc: 'UTC+4:00', location: 'Dubai, UAE', time: '10:18 AM' },
            { zone: 'Asia/Riyadh', utc: 'UTC+3:00', location: 'Riyadh, Saudi Arabia', time: '09:18 AM' },
            { zone: 'Asia/Karachi', utc: 'UTC+5:00', location: 'Karachi, Pakistan', time: '11:18 AM' },
            { zone: 'Europe/Istanbul', utc: 'UTC+3:00', location: 'Istanbul, Turkey', time: '09:18 AM' },
            { zone: 'Europe/London', utc: 'BST+1', location: 'London, United Kingdom', time: '07:18 AM' },
            { zone: 'Europe/Paris', utc: 'CEST+2', location: 'Paris, France', time: '08:18 AM' },
            { zone: 'America/New_York', utc: 'EDT-4', location: 'New York, USA', time: '02:18 AM' },
            { zone: 'Asia/Tashkent', utc: 'UTC+5:00', location: 'Tashkent, Uzbekistan', time: '11:18 AM' },
            { zone: 'Asia/Tehran', utc: 'UTC+3:30', location: 'Tehran, Iran', time: '09:48 AM' },
            { zone: 'Asia/Doha', utc: 'UTC+3:00', location: 'Doha, Qatar', time: '09:18 AM' },
          ].map((item) => (
            <div key={item.zone} className="p-3.5 rounded-2xl flex items-center justify-between transition-colors cursor-pointer bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-semibold text-slate-800">{item.zone}</h4>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-slate-100 text-slate-600">{item.utc}</span>
                  </div>
                  <p className="text-[11px] font-normal text-slate-400 mt-0.5">{item.location}</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-slate-700">{item.time}</span>
            </div>
          ))}
        </div>

      </div>

      {/* FIXED BOTTOM CONFIRMATION DOCK (ZERO OVERLAP) */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-slate-50 via-slate-50/95 to-transparent pointer-events-none z-30">
        <button className="btn-primary w-full">
          <span>Confirm Timezone Selection</span>
          <ArrowRight className="w-4 h-4 stroke-[2.2]"/>
        </button>
      </div>

    </div>
  );
}
