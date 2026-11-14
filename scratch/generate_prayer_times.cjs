const fs = require('fs');

function generateScreen(mode) {
  const isDark = mode === 'dark';
  const componentName = isDark ? 'PrayerTimesDarkMode' : 'PrayerTimesLightMode';
  const targetNotificationRoute = isDark ? 'notifications_settings_dark_mode' : 'notifications_settings_light_mode';

  // Semantic Tokens
  const rootBg = isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-800';
  const locationCardBg = isDark
    ? 'bg-black/40 backdrop-blur-md border border-white/10 shadow-xl rounded-2xl p-4'
    : 'bg-white/80 backdrop-blur-md border border-white shadow-sm rounded-2xl p-4';
  const cardBg = isDark 
    ? 'bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl' 
    : 'bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg rounded-2xl';
  const innerBoxBg = isDark 
    ? 'bg-white/5 border border-white/10' 
    : 'bg-slate-100/80 border border-slate-200/60';
  const sunItemCard = isDark
    ? 'bg-white/5 backdrop-blur-md border border-white/10 shadow-sm rounded-2xl p-3 flex flex-col items-center justify-center text-center gap-1.5'
    : 'bg-white/60 backdrop-blur-md border border-white/40 shadow-sm rounded-2xl p-3 flex flex-col items-center justify-center text-center gap-1.5';
  const itemHover = isDark ? 'hover:bg-white/10' : 'hover:bg-slate-100';
  const titleText = isDark ? 'text-white' : 'text-slate-800';
  const subText = isDark ? 'text-slate-400' : 'text-slate-500';
  const headerBtnHover = isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600';
  const locationBorder = isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500';
  const locationDate = isDark ? 'text-slate-300' : 'text-slate-700';
  const badgeAuto = isDark ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-primary/10 text-primary border border-primary/20';
  const compassPill = isDark ? 'text-violet-300 bg-violet-500/20 border-violet-500/30' : 'text-violet-600 bg-violet-50 border-violet-200';
  const countdownColor = isDark ? 'text-white' : 'text-slate-800';
  const quoteCardBg = isDark 
    ? 'bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl p-5' 
    : 'bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm rounded-2xl p-5';
  const quoteText = isDark ? 'text-slate-200' : 'text-slate-700';
  const canonicalHeaderTitle = isDark ? 'text-slate-400' : 'text-slate-500';
  const tomorrowBadgeStyle = isDark 
    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
    : 'bg-indigo-100 text-indigo-700';
  const bookmarkActiveColor = isDark 
    ? 'text-indigo-400 fill-indigo-400' 
    : 'text-indigo-600 fill-indigo-600';
  const alertsBadgeActive = isDark
    ? 'bg-primary/20 text-primary border border-primary/30'
    : 'bg-indigo-100 text-indigo-700 border border-indigo-200';
  const alertsBadgeInactive = isDark
    ? 'bg-white/5 text-slate-500 border border-white/10'
    : 'bg-slate-100 text-slate-500 border border-slate-200';
  const alertsBadgeIconColor = isDark ? 'text-primary' : 'text-indigo-700';

  return `import React, { useState, useEffect } from 'react';
import UserAvatar from './components/UserAvatar';
import { useLocationStore } from './store/useLocationStore';
import { useSettingsStore } from './store/useSettingsStore';
import { usePrayerStore, INITIAL_CANONICAL_PRAYERS } from './store/usePrayerStore';
import {
  DEFAULT_KABUL_COORDINATES,
  calculatePrayerTimes,
  calculateSunAndTwilight,
  getPrayerDate,
  getNextPrayerInfo,
} from './utils/prayerTimes';
import {
  Sparkles, Bell, BellRing, BellOff, MapPin, Compass, Calendar, Check, CheckCircle2, Bookmark,
  Clock, Sunrise, Moon, RefreshCw
} from 'lucide-react';

export {
  DEFAULT_KABUL_COORDINATES,
  calculatePrayerTimes,
  calculateSunAndTwilight,
  getPrayerDate,
  getNextPrayerInfo,
};

export const DAILY_INSPIRATION_QUOTES = [
  {
    ayah: "Guard strictly your habit of prayers, especially the middle prayer, and stand before Allah in profound devotion.",
    surah: "Surah Al-Baqarah 2:238",
  },
  {
    ayah: "Verily, in the remembrance of Allah do hearts find rest.",
    surah: "Surah Ar-Ra'd 13:28",
  },
  {
    ayah: "And seek help through patience and prayer; and indeed, it is difficult except for the humbly submissive.",
    surah: "Surah Al-Baqarah 2:45",
  },
  {
    ayah: "Indeed, prayer prohibits immorality and wrongdoing, and the remembrance of Allah is greater.",
    surah: "Surah Al-Ankabut 29:45",
  },
  {
    ayah: "And establish prayer at the two ends of the day and at the approach of the night. Indeed, good deeds do away with misdeeds.",
    surah: "Surah Hud 11:114",
  },
  {
    ayah: "So remember Me; I will remember you. And be grateful to Me and do not deny Me.",
    surah: "Surah Al-Baqarah 2:152",
  },
  {
    ayah: "And whoever fears Allah — He will make for him a way out, and will provide for him from where he does not expect.",
    surah: "Surah At-Talaq 65:2-3",
  },
  {
    ayah: "Indeed, with hardship comes ease. Most certainly, with hardship comes ease.",
    surah: "Surah Ash-Sharh 94:5-6",
  },
  {
    ayah: "And He found you lost and guided you, and He found you in need and made you self-sufficient.",
    surah: "Surah Ad-Duha 93:7-8",
  },
  {
    ayah: "O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient.",
    surah: "Surah Al-Baqarah 2:153",
  },
  {
    ayah: "My Lord, make me an establisher of prayer, and many from my descendants. Our Lord, and accept my supplication.",
    surah: "Surah Ibrahim 14:40",
  },
  {
    ayah: "Say, 'Indeed, my prayer, my rites of sacrifice, my living and my dying are for Allah, Lord of the worlds.'",
    surah: "Surah Al-An'am 6:162",
  },
];

function getDailyInspiration(baseDate = new Date()) {
  const d = baseDate;
  const startOfYear = new Date(d.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((d.getTime() - startOfYear.getTime()) / 86400000);
  const index = Math.abs(dayOfYear) % DAILY_INSPIRATION_QUOTES.length;
  return DAILY_INSPIRATION_QUOTES[index];
}

export default function ${componentName}({ setActiveTab, goBack }) {
  const selectedCity = useLocationStore((s) => s.selectedCity);
  const lat = Number(selectedCity?.latitude) || DEFAULT_KABUL_COORDINATES.latitude;
  const lng = Number(selectedCity?.longitude) || DEFAULT_KABUL_COORDINATES.longitude;
  const storedPrayers = usePrayerStore((s) => s.prayers) || INITIAL_CANONICAL_PRAYERS;
  const togglePrayer = usePrayerStore((s) => s.togglePrayer);
  const advanceToNextPrayer = usePrayerStore((s) => s.advanceToNextPrayer);
  const logPrayer = usePrayerStore((s) => s.logPrayer);

  const prayerNotificationOffset = useSettingsStore(
    (s) => s.prayerNotificationOffset ?? s.adhanOffset
  );
  const prayerStoreOffset = usePrayerStore(
    (s) => s.prayerNotificationOffset ?? s.adhanOffset
  );
  const offsetValue = prayerNotificationOffset !== undefined ? prayerNotificationOffset : prayerStoreOffset;

  const masterEnabled = useSettingsStore((s) => s.masterEnabled !== false);
  const settingsPrayerAlertsEnabled = useSettingsStore((s) => s.prayerAlertsEnabled !== false);
  const prayerStoreAlertsEnabled = usePrayerStore((s) => s.prayerAlertsEnabled !== false);
  const isAlertsActive = masterEnabled && settingsPrayerAlertsEnabled && prayerStoreAlertsEnabled;

  const notificationText = !isAlertsActive
    ? 'Notifications Paused'
    : (offsetValue !== undefined && offsetValue !== null && Number(offsetValue) > 0)
    ? \`Notifications Active (\${offsetValue}m before)\`
    : (offsetValue === 0 || Number(offsetValue) === 0 ? 'Notifications Active' : 'Notifications Active (15m before)');

  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [nextPrayerData, setNextPrayerData] = useState(() => getNextPrayerInfo(new Date(), lat, lng, storedPrayers));
  const [countdown, setCountdown] = useState(() => {
    const info = getNextPrayerInfo(new Date(), lat, lng, storedPrayers);
    const diffMs = Math.max(0, info.prayerDate.getTime() - Date.now());
    const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return {
      formatted: \`\${hours} : \${minutes} : \${seconds}\`,
      hours,
      minutes,
      seconds,
      diffMs,
    };
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const currentNowMs = Date.now();
      setCurrentTime(now);

      let info = getNextPrayerInfo(now, lat, lng, storedPrayers);
      let diffMs = info.prayerDate.getTime() - currentNowMs;

      // Transition Logic: If countdown reached 00 : 00 : 00
      if (diffMs <= 0) {
        if (advanceToNextPrayer) {
          advanceToNextPrayer(info.nextPrayer.id);
        } else if (logPrayer) {
          logPrayer(info.nextPrayer.id, { status: 'completed', isOnTime: true });
        }
        info = getNextPrayerInfo(new Date(), lat, lng, storedPrayers);
        diffMs = Math.max(0, info.prayerDate.getTime() - Date.now());
      }

      setNextPrayerData(info);

      const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
      const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
      const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
      const seconds = (totalSeconds % 60).toString().padStart(2, '0');

      setCountdown({
        formatted: \`\${hours} : \${minutes} : \${seconds}\`,
        hours,
        minutes,
        seconds,
        diffMs,
      });
    };

    updateCountdown();
    const timerId = setInterval(updateCountdown, 1000);
    return () => clearInterval(timerId);
  }, [lat, lng, storedPrayers, advanceToNextPrayer, logPrayer]);

  const prayersList = nextPrayerData.prayers;
  const displayedDate = nextPrayerData.isTomorrow
    ? new Date(currentTime.getTime() + 86400000)
    : currentTime;

  const sunTwilight = nextPrayerData.sunTwilight;
  const dailyQuote = getDailyInspiration(displayedDate);

  return (
    <div className="min-h-screen ${rootBg} flex flex-col pb-28 font-sans font-inter antialiased select-none">
      {/* Top Header */}
      <div className="sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-semibold ${titleText} tracking-tight font-sans">Prayer Times</h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={() => (setActiveTab ? setActiveTab('${targetNotificationRoute}') : null)}
            className="p-2 rounded-full ${headerBtnHover} transition-colors cursor-pointer pointer-events-auto"
            title="Open Notification Settings"
          >
            <Bell className="w-5 h-5" />
          </button>
          <UserAvatar setActiveTab={setActiveTab} />
        </div>
      </div>

      {/* Title & Alerts Row */}
      <div className="flex items-center justify-between px-5 pt-2 pb-1">
        <div>
          <h2 className="text-xl font-semibold ${titleText} tracking-tight font-sans">Prayer Times</h2>
          <p className="text-xs font-medium ${subText} mt-0.5 font-sans">Stay connected to your spiritual rhythm</p>
        </div>
        <button
          type="button"
          onClick={() => (setActiveTab ? setActiveTab('${targetNotificationRoute}') : null)}
          className={\`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shadow-2xs cursor-pointer active:scale-95 transition-all \${
            isAlertsActive ? '${alertsBadgeActive}' : '${alertsBadgeInactive}'
          }\`}
          title={isAlertsActive ? 'Prayer Alerts Active (Tap to configure)' : 'Prayer Alerts Off (Tap to configure)'}
        >
          {isAlertsActive ? (
            <BellRing className={\`w-3.5 h-3.5 ${alertsBadgeIconColor}\`} />
          ) : (
            <BellOff className="w-3.5 h-3.5 text-slate-400" />
          )}
          <span>{isAlertsActive ? 'Alerts On' : 'Alerts Off'}</span>
        </button>
      </div>

      {/* Top Location & Date Widget */}
      <div className="flex flex-col gap-3.5 mx-5 my-3 ${locationCardBg}">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-xs font-semibold ${titleText} font-sans">{selectedCity?.name || 'Kabul'}, {selectedCity?.country || 'Afghanistan'}</span>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold ${badgeAuto}">AUTO</span>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full border ${compassPill}">
            <Compass className="w-3.5 h-3.5" />
            <span>247° WSW</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2.5 border-t ${locationBorder} text-[11px] font-medium font-sans">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="${subText} font-medium">{displayedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <span className="font-semibold ${locationDate}">
            {nextPrayerData.isTomorrow ? '14 Rabi\\' al-Thani 1448 AH' : '13 Rabi\\' al-Thani 1448 AH'}
          </span>
        </div>
      </div>

      {/* Next Prayer Hero Card */}
      <div className="flex flex-col gap-3.5 mx-5 mb-4 p-4 sm:p-5 rounded-2xl relative overflow-hidden ${cardBg}">
        {/* Top Header: Badge on Left, Adhan in Kabul on Right with strict flex justify-between items-center */}
        <div className="flex justify-between items-center w-full">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/20">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-bold text-[10px] tracking-wider text-primary uppercase font-sans">
              {nextPrayerData.isTomorrow ? 'TOMORROW' : 'NEXT PRAYER'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium ${subText} font-sans">
            <BellRing className="w-3.5 h-3.5 text-primary" />
            <span>Adhan in {selectedCity?.name || 'Kabul'}</span>
          </div>
        </div>

        {/* Primary Prayer & Scheduled Time: Clean Flexbox integration without nested white background box */}
        <div className="flex items-start justify-between pt-0.5">
          <div>
            <span className="text-2xl sm:text-3xl font-semibold ${titleText} tracking-tight block font-sans">
              {nextPrayerData.nextPrayer.name}
            </span>
            <span className="text-xs font-medium ${subText} mt-0.5 block font-sans">
              {nextPrayerData.nextPrayer.subtitle || \`\${nextPrayerData.nextPrayer.name} prayer\`}
            </span>
          </div>
          <div className="text-right">
            <span className="text-2xl sm:text-3xl font-semibold text-primary font-mono block tracking-tight">
              {nextPrayerData.nextPrayer.time}
            </span>
            <span className="text-[10px] font-medium ${subText} block mt-0.5 font-sans">
              Adhan Time
            </span>
          </div>
        </div>

        {/* Sleek Inline Monospace Countdown Timer with Real-Time Synced Zero-Padding */}
        <div className="pt-0.5">
          <span className="text-[10px] font-medium uppercase tracking-wider ${subText} block font-sans">Time Remaining</span>
          <span className="font-mono text-3xl font-bold tracking-widest ${countdownColor} leading-none block mt-1">
            {countdown.formatted}
          </span>
        </div>

        {/* Perfectly Centered Notification Button */}
        <button 
          type="button"
          onClick={() => (setActiveTab ? setActiveTab('${targetNotificationRoute}') : null)}
          className="w-full max-w-sm mx-auto py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:brightness-105 active:scale-[0.99] text-white text-xs font-semibold flex justify-center items-center gap-2.5 shadow-md shadow-indigo-500/20 cursor-pointer pointer-events-auto transition-all mt-0.5 text-center font-sans"
        >
          {isAlertsActive ? (
            <Check className="w-4 h-4 text-emerald-300 flex-shrink-0" />
          ) : (
            <BellOff className="w-4 h-4 text-white/80 flex-shrink-0" />
          )}
          <Bell className="w-4 h-4 text-white flex-shrink-0" />
          <span className="font-semibold tracking-tight">{notificationText}</span>
          <RefreshCw className="w-3.5 h-3.5 text-white/80 animate-spin-slow flex-shrink-0" />
        </button>
      </div>

      {/* Streamlined Canonical Prayers List with Date-Aware Chronological State */}
      <div className="block mx-5 mb-4 p-4 rounded-2xl space-y-2 ${cardBg}">
        {/* Canonical Prayers Section Header */}
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-xs font-semibold ${canonicalHeaderTitle} tracking-wider uppercase font-sans">
            Canonical Prayers
          </h3>
          {nextPrayerData.isTomorrow && (
            <span className="px-2.5 py-1 ${tomorrowBadgeStyle} text-[10px] font-bold uppercase rounded-full font-sans">
              TOMORROW
            </span>
          )}
        </div>

        <div className="space-y-1.5">
          {prayersList.map((prayer) => {
            const prayerDate = prayer.prayerDate || getPrayerDate(prayer.time, nextPrayerData.isTomorrow, currentTime);
            const isFutureTime = prayerDate.getTime() > Date.now();
            const isPast = !isFutureTime;
            const isNext = isFutureTime && (prayer.id === nextPrayerData.nextPrayer.id);
            const isFuture = isFutureTime && !isNext;

            // Date-Aware state determination:
            // 1. If in the future, it can NEVER be marked Missed. It defaults to 'Upcoming' (or 'Next').
            // 2. If in the past, it defaults to Completed unless explicitly toggled to 'missed'.
            const isCompleted = isPast && (prayer.status === 'completed' || prayer.status === 'upcoming' || prayer.status === undefined || prayer.status !== 'missed');
            const isMissed = isPast && !isCompleted;

            return (
              <div
                key={prayer.id}
                onClick={() => (isPast ? togglePrayer(prayer.id, prayerDate) : null)}
                className={\`py-3 px-3.5 rounded-xl flex items-center justify-between ${innerBoxBg} transition-all select-none border \${
                  isNext
                    ? 'border-primary/40 ring-1 ring-primary/20 bg-primary/5'
                    : isCompleted
                    ? 'border-emerald-500/30'
                    : isMissed
                    ? 'border-amber-500/30'
                    : 'border-transparent opacity-75'
                } \${isPast ? \`${itemHover} cursor-pointer active:scale-[0.99]\` : 'cursor-default'}\`}
                title={isFuture ? 'Future prayer (locked until time arrives)' : isNext ? 'Upcoming next prayer' : 'Tap to toggle completion'}
              >
                <div className="flex items-center gap-3">
                  <div className={\`w-8 h-8 rounded-xl flex items-center justify-center transition-colors \${
                    isCompleted
                      ? 'bg-emerald-500/20 text-emerald-500'
                      : isNext
                      ? 'bg-primary/20 text-primary'
                      : isMissed
                      ? 'bg-amber-500/20 text-amber-500'
                      : 'bg-white/5 text-slate-400'
                  }\`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : isNext ? (
                      <Sparkles className="w-4 h-4 text-primary" />
                    ) : isMissed ? (
                      <Clock className="w-4 h-4 text-amber-500" />
                    ) : (
                      <Clock className="w-4 h-4 text-slate-500" />
                    )}
                  </div>
                  <div>
                    <div className={\`text-xs sm:text-sm font-semibold font-sans \${
                      isCompleted
                        ? 'text-emerald-500 line-through opacity-85'
                        : isNext
                        ? '${titleText}'
                        : isMissed
                        ? '${titleText}'
                        : '${subText}'
                    }\`}>
                      {prayer.name}
                    </div>
                    <div className="text-[10px] font-medium ${subText} font-sans">
                      {prayer.subtitle || \`\${prayer.name} prayer\`}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className={\`text-xs sm:text-sm font-semibold font-mono \${
                    isCompleted ? 'text-emerald-500' : isNext ? 'text-primary' : isMissed ? '${titleText}' : '${subText}'
                  }\`}>
                    {prayer.time}
                  </span>
                  <span className={\`inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full font-sans \${
                    isCompleted
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      : isNext
                      ? 'bg-primary/20 text-primary border border-primary/30'
                      : isMissed
                      ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                      : 'text-slate-400 bg-white/5 border border-white/5'
                  }\`}>
                    {isCompleted ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
                        <span>Completed</span>
                      </>
                    ) : isNext ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                        <span>Next</span>
                      </>
                    ) : isMissed ? (
                      <>
                        <Clock className="w-3 h-3 text-amber-500" />
                        <span>Missed</span>
                      </>
                    ) : (
                      <>
                        <span>Upcoming</span>
                      </>
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sun & Twilight Reference Grid: Modern 3-Column Glassmorphic Rectangular Mini-Cards */}
      <div className="block mx-5 mb-4 p-4 rounded-2xl ${cardBg}">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-xs font-semibold ${canonicalHeaderTitle} tracking-wider uppercase font-sans">
            Sun &amp; Twilight Reference
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="${sunItemCard}">
            <Sunrise className="w-5 h-5 text-amber-500 dark:text-amber-400 flex-shrink-0" />
            <span className="text-[10px] sm:text-xs font-semibold ${subText} uppercase tracking-wide leading-tight font-sans block">
              Sunrise
            </span>
            <span className="text-sm font-bold ${titleText} font-mono block">
              {sunTwilight.sunrise}
            </span>
          </div>
          <div className="${sunItemCard}">
            <Moon className="w-5 h-5 text-indigo-500 dark:text-indigo-400 flex-shrink-0" />
            <span className="text-[10px] sm:text-xs font-semibold ${subText} uppercase tracking-wide leading-tight font-sans block">
              Midnight
            </span>
            <span className="text-sm font-bold ${titleText} font-mono block">
              {sunTwilight.midnight}
            </span>
          </div>
          <div className="${sunItemCard}">
            <Sparkles className="w-5 h-5 text-violet-500 dark:text-violet-400 flex-shrink-0" />
            <span className="text-[10px] sm:text-xs font-semibold ${subText} uppercase tracking-wide leading-tight font-sans block">
              Tahajjud
            </span>
            <span className="text-sm font-bold ${titleText} font-mono block">
              {sunTwilight.tahajjud}
            </span>
          </div>
        </div>
      </div>

      {/* Daily Spiritual Inspiration Widget */}
      <div className="block mx-5 mb-6 ${quoteCardBg}">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-primary">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] font-semibold tracking-wider uppercase font-sans">Daily Inspiration</span>
          </div>
          <button
            type="button"
            onClick={() => setIsBookmarked((prev) => !prev)}
            className="p-1 -mr-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 transition-transform cursor-pointer pointer-events-auto"
            title={isBookmarked ? "Remove Bookmark" : "Bookmark Inspiration"}
            aria-label={isBookmarked ? "Remove Bookmark" : "Bookmark Inspiration"}
          >
            <Bookmark className={\`w-4 h-4 transition-colors \${isBookmarked ? '${bookmarkActiveColor}' : 'text-slate-400'}\`} />
          </button>
        </div>
        <p className="text-xs sm:text-sm font-medium italic leading-relaxed ${quoteText} font-sans">
          "{dailyQuote.ayah}"
        </p>
        <div className="flex items-center justify-between text-[11px] font-semibold ${subText} pt-1 font-sans">
          <span>— {dailyQuote.surah}</span>
          <span className="text-[10px] font-medium text-teal-500 dark:text-teal-400 font-sans">Ayah of the Day</span>
        </div>
      </div>
    </div>
  );
}
`;
}

const darkCode = generateScreen('dark');
const lightCode = generateScreen('light');

fs.writeFileSync('src/PrayerTimesDarkMode.jsx', darkCode, 'utf8');
fs.writeFileSync('src/PrayerTimesLightMode.jsx', lightCode, 'utf8');

console.log('PrayerTimesDarkMode lines:', darkCode.split('\n').length);
console.log('PrayerTimesLightMode lines:', lightCode.split('\n').length);
