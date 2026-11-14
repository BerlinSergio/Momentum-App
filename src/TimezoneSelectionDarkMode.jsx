import React, { useState } from 'react';
import UserAvatar from './components/UserAvatar';
import { useProfileStore } from './store/useProfileStore';

import { 
  ArrowLeft, Compass, Sun, Radio, Search, Check, ArrowRight 
} from 'lucide-react';

export default function TimezoneSelectionDarkMode({ setActiveTab, goBack }) {
  const profileTimezone = useProfileStore((s) => s.timezone);
  const updateProfile = useProfileStore((s) => s.updateProfile);
  const [selectedZone, setSelectedZone] = useState(profileTimezone || 'Asia/Kabul (UTC+4:30)');

  const handleSelectZone = (zoneStr) => {
    setSelectedZone(zoneStr);
    if (updateProfile) {
      updateProfile({ timezone: zoneStr });
    }
    try {
      const raw = localStorage.getItem('momentum-profile-storage');
      const parsed = raw ? JSON.parse(raw) : { state: {} };
      parsed.state = { ...(parsed.state || {}), timezone: zoneStr };
      localStorage.setItem('momentum-profile-storage', JSON.stringify(parsed));
    } catch {}
  };

  const handleConfirm = () => {
    if (updateProfile && selectedZone) {
      updateProfile({ timezone: selectedZone });
    }
    if (goBack) goBack('settings_profile_dark_mode');
    else if (setActiveTab) setActiveTab('settings_profile_dark_mode');
    else window.history.back();
  };

  const handleBack = () => {
    if (goBack) goBack('settings_profile_dark_mode');
    else if (setActiveTab) setActiveTab('settings_profile_dark_mode');
    else window.history.back();
  };
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between relative select-none">
      <div className="flex-1">
        
        {/* Top Header Bar (Standardized: Back arrow on far left, clean title, no redundant icon or avatar) */}
        <div className="sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex items-center justify-between px-5 pt-6 pb-2">
          <div className="flex items-center gap-3">
            <button 
              type="button"
              onClick={handleBack}
              aria-label="Go back"
              className="p-2 -ml-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer pointer-events-auto"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-base font-bold text-white tracking-tight">
              Timezone Selection
            </h1>
          </div>
        </div>

        {/* Active Timezone Hero Card */}
        <div className="block mx-5 my-3 p-5 rounded-3xl space-y-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-primary/20 border border-primary/80 text-primary shadow-sm">
              <Compass className="w-3.5 h-3.5 text-primary"/>
              ACTIVE TIMEZONE
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-teal-400 bg-teal-950/50 px-2.5 py-0.5 rounded-full border border-teal-700/70">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
              Astronomical Sync
            </span>
          </div>

          <div className="flex items-baseline justify-between pt-1">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Asia/Kabul</h2>
              <span className="text-xs font-medium text-slate-400 mt-0.5 block">UTC +4:30 • Kabul, Afghanistan</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-primary">10:48</span>
              <span className="text-xs font-bold text-slate-400 ml-1">AM</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl flex items-center justify-between bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-400"/>
              <span className="text-xs font-semibold text-slate-200">Solar Noon Offset: <strong className="text-primary font-bold">+12m 40s</strong></span>
            </div>
            <span className="text-[10px] font-bold text-teal-300 bg-teal-900/40 border border-teal-700/80 px-2 py-0.5 rounded-full">
              CALIBRATED
            </span>
          </div>

          <p className="text-[11px] font-normal text-slate-400 leading-relaxed pt-0.5">
            Used to calculate astronomical Fajr, Sunrise, Dhuhr, Asr, Maghrib, and Isha solar coordinates with celestial precision.
          </p>
        </div>

        {/* Auto-detect via GPS Card */}
        <div className="block mx-5 mb-4 p-4 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
          <div className="w-full flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-primary/15 border border-primary/50 text-primary flex items-center justify-center shrink-0 shadow-sm">
                <Radio className="w-5 h-5"/>
              </div>
              <div className="flex flex-col">
                <h3 className="text-xs font-bold text-white">Auto-detect via GPS</h3>
                <p className="text-[11px] font-normal text-slate-400 mt-0.5">Calibrate horizons automatically</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-12 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-inner"></div>
            </label>
          </div>
        </div>

        {/* Quick link to City Selection */}
        <div
          onClick={() => setActiveTab && setActiveTab('city_selection_dark_mode')}
          className="mx-5 mb-4 p-3.5 rounded-3xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 cursor-pointer transition-all active:scale-[0.99] flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-xs font-semibold text-white block">Need to select your City or GPS?</span>
              <span className="text-[11px] text-slate-400 block">Switch to City &amp; Location Database</span>
            </div>
          </div>
          <span className="text-xs font-semibold text-primary flex items-center gap-1">
            City <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Search Input */}
        <div className="mx-5 mb-3">
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
            <Search className="w-4 h-4 text-slate-400"/>
            <input 
              type="text" 
              placeholder="Search city, country, or UTC offset..." 
              className="w-full bg-transparent text-xs font-normal text-white focus:outline-none placeholder-slate-400"
            />
          </div>
        </div>

        {/* Continent Filter Chips */}
        <div className="flex items-center gap-2 px-5 mb-4 overflow-x-auto scrollbar-none pb-1">
          <button className="px-3.5 py-1.5 rounded-2xl bg-primary text-white text-xs font-semibold shadow-sm whitespace-nowrap">
            All
          </button>
          <button className="px-3.5 py-1.5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 text-slate-300 hover:bg-slate-800 text-xs font-semibold whitespace-nowrap shadow-sm">
            Asia
          </button>
          <button className="px-3.5 py-1.5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 text-slate-300 hover:bg-slate-800 text-xs font-semibold whitespace-nowrap shadow-sm">
            Europe
          </button>
          <button className="px-3.5 py-1.5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 text-slate-300 hover:bg-slate-800 text-xs font-semibold whitespace-nowrap shadow-sm">
            Americas
          </button>
          <button className="px-3.5 py-1.5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 text-slate-300 hover:bg-slate-800 text-xs font-semibold whitespace-nowrap shadow-sm">
            Africa
          </button>
          <button className="px-3.5 py-1.5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 text-slate-300 hover:bg-slate-800 text-xs font-semibold whitespace-nowrap shadow-sm">
            Oceania
          </button>
        </div>

        {/* Timezone List Container */}
        <div className="mx-5 space-y-2.5 pb-36">
          {/* 1. Selected Zone (Asia/Kabul) */}
          <div
            onClick={() => handleSelectZone('Asia/Kabul (UTC+4:30)')}
            className={`p-3.5 rounded-2xl flex items-center justify-between cursor-pointer backdrop-blur-xl border transition-all select-none ${
              selectedZone.includes('Asia/Kabul')
                ? 'bg-primary/20 border-primary/50 shadow-lg'
                : 'bg-black/40 border-white/10 shadow-xl hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 stroke-[2.5]"/>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-white">Asia/Kabul</h4>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-primary/20 border border-primary/40 text-primary">UTC+4:30</span>
                </div>
                <p className="text-[11px] font-normal text-slate-400 mt-0.5">Kabul, Afghanistan</p>
              </div>
            </div>
            <span className="text-xs font-bold text-primary">10:48 <span className="text-[10px] font-normal text-slate-400">AM</span></span>
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
          ].map((item) => {
            const isItemActive = selectedZone.includes(item.zone);
            return (
              <div
                key={item.zone}
                onClick={() => handleSelectZone(`${item.zone} (${item.utc})`)}
                className={`p-3.5 rounded-2xl flex items-center justify-between transition-colors cursor-pointer backdrop-blur-xl border select-none ${
                  isItemActive
                    ? 'bg-primary/20 border-primary/50 shadow-lg'
                    : 'bg-black/40 border-white/10 shadow-xl hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isItemActive ? 'bg-primary text-white' : 'border border-slate-600'
                  }`}>
                    {isItemActive ? (
                      <Check className="w-3 h-3 stroke-[2.5] text-white"/>
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-semibold text-slate-200">{item.zone}</h4>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-slate-800 text-slate-300">{item.utc}</span>
                    </div>
                    <p className="text-[11px] font-normal text-slate-400 mt-0.5">{item.location}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-300">{item.time}</span>
              </div>
            );
          })}

          {/* In-Flow Confirmation Action Button */}
          <div className="pt-3">
            <button
              type="button"
              onClick={handleConfirm}
              className="btn-primary w-full h-12 py-3 rounded-2xl text-sm font-semibold shadow-lg shadow-primary/30 flex items-center justify-center gap-2 cursor-pointer select-none"
            >
              <span>Confirm Timezone Selection</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2]"/>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
