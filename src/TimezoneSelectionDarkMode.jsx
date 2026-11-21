import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useProfileStore } from './store/useProfileStore';
import { useTimeStore } from './store/useTimeStore';
import { useAppTime } from './hooks/useAppTime';
import { formatUtcOffset, formatTime, normalizeIanaTimezone } from './utils/timeService';
import { toast } from './components/ui/toast/index.js';

import { 
  ArrowLeft, Compass, Sun, Radio, Search, Check, ArrowRight 
} from 'lucide-react';

export default function TimezoneSelectionDarkMode({ setActiveTab, goBack }) {
  const { t } = useTranslation();
  const profileTimezone = useProfileStore((s) => s.timezone);
  const updateProfile = useProfileStore((s) => s.updateProfile);
  const timezoneMode = useTimeStore((s) => s.timezoneMode);
  const effectiveTimezone = useTimeStore((s) => s.effectiveTimezone);
  const setTimezoneMode = useTimeStore((s) => s.setTimezoneMode);
  const setManualTimezone = useTimeStore((s) => s.setManualTimezone);

  const { now } = useAppTime();
  const [selectedZone, setSelectedZone] = useState(effectiveTimezone || profileTimezone || 'Asia/Kabul');

  const handleSelectZone = (zoneStr) => {
    setSelectedZone(zoneStr);
    const normalized = normalizeIanaTimezone(zoneStr);
    setManualTimezone(normalized);
    if (updateProfile) {
      updateProfile({ timezone: zoneStr });
    }
    toast.success(`Timezone set to ${zoneStr}`);
  };

  const handleConfirm = () => {
    if (selectedZone) {
      const normalized = normalizeIanaTimezone(selectedZone);
      setManualTimezone(normalized);
      if (updateProfile) {
        updateProfile({ timezone: selectedZone });
      }
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
              {t('calendar.timezoneSelection', 'Timezone Selection')}
            </h1>
          </div>
        </div>

        {/* ACTIVE TIMEZONE CARD */}
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
              <h2 className="text-2xl font-bold text-white tracking-tight">{effectiveTimezone}</h2>
              <span className="text-xs font-medium text-slate-400 mt-0.5 block">{formatUtcOffset(effectiveTimezone, now)} • {effectiveTimezone.replace('_', ' ')}</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-primary">{formatTime(now, false, effectiveTimezone)}</span>
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
            {t('calendar.astroTimezoneDesc', 'Used to calculate astronomical Fajr, Sunrise, Dhuhr, Asr, Maghrib, and Isha solar coordinates with celestial precision.')}
          </p>
        </div>

        {/* Auto-detect via GPS */}
        <div className="block mx-5 mb-4 p-4 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
          <div className="w-full flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-primary/15 border border-primary/50 text-primary flex items-center justify-center shrink-0 shadow-sm">
                <Radio className="w-5 h-5"/>
              </div>
              <div className="flex flex-col">
                <h3 className="text-xs font-bold text-white">{t('calendar.autoDetectGPS', 'Auto-detect via GPS')}</h3>
                <p className="text-[11px] font-normal text-slate-400 mt-0.5">{t('calendar.calibrateHorizons', 'Calibrate horizons automatically')}</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={timezoneMode === 'auto'}
                onChange={(e) => setTimezoneMode(e.target.checked ? 'auto' : 'manual')}
                className="sr-only peer"
              />
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
              <span className="text-xs font-semibold text-white block">{t('calendar.needSelectCity', 'Need to select your City or GPS?')}</span>
              <span className="text-[11px] text-slate-400 block">{t('calendar.switchToCity', 'Switch to City & Location Database')}</span>
            </div>
          </div>
          <span className="text-xs font-semibold text-primary flex items-center gap-1">
            {t('calendar.city', 'City')} <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Search Input */}
        <div className="mx-5 mb-3">
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
            <Search className="w-4 h-4 text-slate-400"/>
            <input 
              type="text" 
              placeholder={t('calendar.searchTimezonePlaceholder', 'Search city, country, or UTC offset...')} className="w-full bg-transparent text-xs font-normal text-white focus:outline-none placeholder-slate-400"
            />
          </div>
        </div>

        {/* Continent Filter Chips */}
        <div className="flex items-center gap-2 px-5 mb-4 overflow-x-auto scrollbar-none pb-1">
          <button className="px-3.5 py-1.5 rounded-2xl bg-primary text-white text-xs font-semibold shadow-sm whitespace-nowrap">
            {t('calendar.continents.all', 'All')}
          </button>
          <button className="px-3.5 py-1.5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 text-slate-300 hover:bg-slate-800 text-xs font-semibold whitespace-nowrap shadow-sm">
            {t('calendar.continents.asia', 'Asia')}
          </button>
          <button className="px-3.5 py-1.5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 text-slate-300 hover:bg-slate-800 text-xs font-semibold whitespace-nowrap shadow-sm">
            {t('calendar.continents.europe', 'Europe')}
          </button>
          <button className="px-3.5 py-1.5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 text-slate-300 hover:bg-slate-800 text-xs font-semibold whitespace-nowrap shadow-sm">
            {t('calendar.continents.americas', 'Americas')}
          </button>
          <button className="px-3.5 py-1.5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 text-slate-300 hover:bg-slate-800 text-xs font-semibold whitespace-nowrap shadow-sm">
            {t('calendar.continents.africa', 'Africa')}
          </button>
          <button className="px-3.5 py-1.5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 text-slate-300 hover:bg-slate-800 text-xs font-semibold whitespace-nowrap shadow-sm">
            {t('calendar.continents.oceania', 'Oceania')}
          </button>
        </div>

        {/* Timezone List Container */}
        <div className="mx-5 space-y-2.5 pb-36">
          {[
            { zone: 'Asia/Kabul', location: 'Kabul, Afghanistan' },
            { zone: 'Asia/Dubai', location: 'Dubai, UAE' },
            { zone: 'Asia/Riyadh', location: 'Riyadh, Saudi Arabia' },
            { zone: 'Asia/Karachi', location: 'Karachi, Pakistan' },
            { zone: 'Europe/Istanbul', location: 'Istanbul, Turkey' },
            { zone: 'Europe/London', location: 'London, United Kingdom' },
            { zone: 'Europe/Paris', location: 'Paris, France' },
            { zone: 'America/New_York', location: 'New York, USA' },
            { zone: 'Asia/Tashkent', location: 'Tashkent, Uzbekistan' },
            { zone: 'Asia/Tehran', location: 'Tehran, Iran' },
            { zone: 'Asia/Doha', location: 'Doha, Qatar' },
          ].map((item) => {
            const isItemActive = effectiveTimezone === item.zone || selectedZone.includes(item.zone);
            const utcOffset = formatUtcOffset(item.zone, now);
            const timeStr = formatTime(now, false, item.zone);
            return (
              <div
                key={item.zone}
                onClick={() => handleSelectZone(`${item.zone} (${utcOffset})`)}
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
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-slate-800 text-slate-300">{utcOffset}</span>
                    </div>
                    <p className="text-[11px] font-normal text-slate-400 mt-0.5">{item.location}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-300">{timeStr}</span>
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
              <span>{t('calendar.confirmTimezoneSelection', 'Confirm Timezone Selection')}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2]"/>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
