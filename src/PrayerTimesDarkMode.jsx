import { useTranslation } from 'react-i18next';
import { useState, useEffect, useMemo } from 'react';
import UserAvatar from './components/UserAvatar';
import { useLocationStore } from './store/useLocationStore';
import { useSettingsStore } from './store/useSettingsStore';
import { usePrayerStore, INITIAL_CANONICAL_PRAYERS } from './store/usePrayerStore';
import { useNotificationStore } from './store/useNotificationStore';
import { getHijriDateParts } from './utils/afghanCalendar';
import { toast } from './components/ui/toast/index.js';
import {
  DEFAULT_KABUL_COORDINATES,
  CALCULATION_METHODS,
  MADHABS,
  HIGH_LATITUDE_RULES,
  getPrayerDate,
  getNextPrayerInfo,
} from './utils/prayerTimes';
import {
  Sparkles, Bell, BellRing, BellOff, MapPin, Compass, Calendar, Check, CheckCircle2, Bookmark,
  Clock, Sunrise, Moon, RefreshCw, Sliders, X, AlertCircle
} from 'lucide-react';

const DAILY_INSPIRATION_QUOTES = [
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

export default function PrayerTimesDarkMode({ setActiveTab }) {
  const { t } = useTranslation();
  const unreadNotifCount = useNotificationStore((s) => s.notifications?.filter((n) => !n.read).length || 0);
  const selectedCity = useLocationStore((s) => s.selectedCity);
  const lat = selectedCity?.latitude != null ? Number(selectedCity.latitude) : DEFAULT_KABUL_COORDINATES.latitude;
  const lng = selectedCity?.longitude != null ? Number(selectedCity.longitude) : DEFAULT_KABUL_COORDINATES.longitude;
  const prayerTimezone = selectedCity?.timezone || DEFAULT_KABUL_COORDINATES.timezone;

  // Authoritative prayer calculation settings from usePrayerStore
  const calculationMethod = usePrayerStore((s) => s.calculationMethod) || 'Karachi';
  const madhab = usePrayerStore((s) => s.madhab) || 'Hanafi';
  const highLatitudeRule = usePrayerStore((s) => s.highLatitudeRule) || 'recommended';
  const polarCircleResolution = usePrayerStore((s) => s.polarCircleResolution) || 'AqrabBalad';
  const prayerAdjustments = usePrayerStore((s) => s.prayerAdjustments);

  const setCalculationMethod = usePrayerStore((s) => s.setCalculationMethod);
  const setMadhab = usePrayerStore((s) => s.setMadhab);
  const setHighLatitudeRule = usePrayerStore((s) => s.setHighLatitudeRule);

  // Prayer history & user worship logs (SEPARATED FROM AUTOMATIC TIMERS)
  const prayerLogs = usePrayerStore((s) => s.prayerLogs) || [];
  const togglePrayer = usePrayerStore((s) => s.togglePrayer);

  // Notification offset and preferences
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
    ? `Notifications Active (${offsetValue}m before)`
    : (offsetValue === 0 || Number(offsetValue) === 0 ? 'Notifications Active' : 'Notifications Active (15m before)');

  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Calculate next prayer data using centralized engine with explicit parameters
  const [nextPrayerData, setNextPrayerData] = useState(() =>
    getNextPrayerInfo({
      baseDate: new Date(),
      latitude: lat,
      longitude: lng,
      timezone: prayerTimezone,
      calculationMethod,
      madhab,
      highLatitudeRule,
      polarCircleResolution,
      adjustments: prayerAdjustments,
    })
  );

  const [countdown, setCountdown] = useState(() => {
    const info = getNextPrayerInfo({
      baseDate: new Date(),
      latitude: lat,
      longitude: lng,
      timezone: prayerTimezone,
      calculationMethod,
      madhab,
      highLatitudeRule,
      polarCircleResolution,
      adjustments: prayerAdjustments,
    });
    const diffMs = info.prayerDate ? Math.max(0, info.prayerDate.getTime() - Date.now()) : 0;
    const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return {
      formatted: `${hours} : ${minutes} : ${seconds}`,
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

      let info = getNextPrayerInfo({
        baseDate: now,
        latitude: lat,
        longitude: lng,
        timezone: prayerTimezone,
        calculationMethod,
        madhab,
        highLatitudeRule,
        polarCircleResolution,
        adjustments: prayerAdjustments,
      });

      let diffMs = info.prayerDate ? info.prayerDate.getTime() - currentNowMs : 0;

      // Transition Logic: If countdown reached 00 : 00 : 00
      // CRITICAL ARCHITECTURAL SEPARATION:
      // Countdown reaching zero advances schedule state only.
      // It DOES NOT fabricate or create a completed prayer history record!
      if (diffMs <= 0) {
        info = getNextPrayerInfo({
          baseDate: new Date(),
          latitude: lat,
          longitude: lng,
          timezone: prayerTimezone,
          calculationMethod,
          madhab,
          highLatitudeRule,
          polarCircleResolution,
          adjustments: prayerAdjustments,
        });
        diffMs = info.prayerDate ? Math.max(0, info.prayerDate.getTime() - Date.now()) : 0;
      }

      setNextPrayerData(info);

      const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
      const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
      const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
      const seconds = (totalSeconds % 60).toString().padStart(2, '0');

      setCountdown({
        formatted: `${hours} : ${minutes} : ${seconds}`,
        hours,
        minutes,
        seconds,
        diffMs,
      });
    };

    updateCountdown();
    const timerId = setInterval(updateCountdown, 1000);
    return () => clearInterval(timerId);
  }, [lat, lng, prayerTimezone, calculationMethod, madhab, highLatitudeRule, polarCircleResolution, prayerAdjustments]);

  const prayersList = nextPrayerData.prayers || INITIAL_CANONICAL_PRAYERS;
  const displayedDate = useMemo(() => {
    return nextPrayerData.isTomorrow
      ? new Date(currentTime.getTime() + 86400000)
      : currentTime;
  }, [nextPrayerData.isTomorrow, currentTime]);

  const sunTwilight = nextPrayerData.sunTwilight;
  const dailyQuote = useMemo(() => getDailyInspiration(displayedDate), [displayedDate]);

  // Dynamic Hijri and Gregorian date strings in the target prayer location's timezone
  const dynamicHijriDate = useMemo(() => {
    try {
      const hijri = getHijriDateParts(displayedDate, prayerTimezone);
      return hijri?.formatted || '13 Rabi\' al-Thani 1448 AH';
    } catch {
      return '13 Rabi\' al-Thani 1448 AH';
    }
  }, [displayedDate, prayerTimezone]);

  const formattedGregorianDate = useMemo(() => {
    try {
      return displayedDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: prayerTimezone,
      });
    } catch {
      return displayedDate.toDateString();
    }
  }, [displayedDate, prayerTimezone]);

  const isUnconfigured = selectedCity?.status === 'unconfigured';
  const locationBadge = selectedCity?.mode === 'auto' || selectedCity?.isGps
    ? 'GPS AUTO'
    : selectedCity?.isCustom
    ? 'CUSTOM'
    : 'MANUAL';

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col pb-28 font-sans font-inter antialiased select-none">
      {/* Top Header */}
      <div className="sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-semibold text-white tracking-tight font-sans">
            {t('prayer.title', 'Prayer Times')}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {/* Calculation Settings Button */}
          <button
            type="button"
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer pointer-events-auto"
            title={t('prayer.configureCalculationMethod', 'Configure Calculation Method & Asr')}
            data-testid="prayer-settings-btn"
          >
            <Sliders className="w-5 h-5" />
          </button>
          <button 
            type="button"
            onClick={() => (setActiveTab ? setActiveTab('notifications_settings_dark_mode') : null)}
            className="relative p-2 rounded-full hover:bg-slate-800 text-slate-400 transition-colors cursor-pointer pointer-events-auto"
            title={t('prayer.openNotificationSettings', 'Open Notification Settings')}
          >
            <Bell className="w-5 h-5" />
            {unreadNotifCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-slate-900" />
            )}
          </button>
          <UserAvatar setActiveTab={setActiveTab} />
        </div>
      </div>

      {/* Title & Alerts Row */}
      <div className="flex items-center justify-between px-5 pt-2 pb-1">
        <div>
          <h2 className="text-xl font-semibold text-white tracking-tight font-sans">{t('prayer.title', 'Prayer Times')}</h2>
          <p className="text-xs font-medium text-slate-400 mt-0.5 font-sans">{t('prayer.staySpiritualRhythm', 'Stay connected to your spiritual rhythm')}</p>
        </div>
        <button
          type="button"
          onClick={() => (setActiveTab ? setActiveTab('notifications_settings_dark_mode') : null)}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shadow-2xs cursor-pointer active:scale-95 transition-all ${
            isAlertsActive ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-white/5 text-slate-500 border border-white/10'
          }`}
          title={isAlertsActive ? 'Prayer Alerts Active (Tap to configure)' : 'Prayer Alerts Off (Tap to configure)'}
        >
          {isAlertsActive ? (
            <BellRing className="w-3.5 h-3.5 text-primary" />
          ) : (
            <BellOff className="w-3.5 h-3.5 text-slate-400" />
          )}
          <span>{isAlertsActive ? t('prayer.alertsOn', 'Alerts On') : t('prayer.alertsOff', 'Alerts Off')}</span>
        </button>
      </div>

      {/* Unconfigured Location Warning Banner if applicable */}
      {isUnconfigured && (
        <div className="mx-5 my-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3 text-xs text-amber-300">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>{t('prayer.prayerLocationNotConfigured', 'Prayer location not configured. Showing default times.')}</span>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab && setActiveTab('city_selection_dark_mode')}
            className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 font-semibold text-amber-200 transition-colors whitespace-nowrap cursor-pointer pointer-events-auto"
          >
            {t('common.configure', 'Configure')}
          </button>
        </div>
      )}

      {/* Top Location & Date Widget */}
      <div className="flex flex-col gap-3.5 mx-5 my-3 bg-black/40 backdrop-blur-md border border-white/10 shadow-xl rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div 
            onClick={() => setActiveTab && setActiveTab('city_selection_dark_mode')}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            title={t('prayer.tapChangeCity', 'Tap to change city or coordinates')}
          >
            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-xs font-semibold text-white font-sans">
              {selectedCity?.name || t('cities.kabul', 'Kabul')}{selectedCity?.country ? `, ${selectedCity.country}` : ''}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-primary/20 text-primary border border-primary/30 uppercase">
              {locationBadge}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full border text-violet-300 bg-violet-500/20 border-violet-500/30">
            <Compass className="w-3.5 h-3.5" />
            <span>{nextPrayerData.qibla?.text || '251° WSW'}</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2.5 border-t border-slate-800 text-slate-400 text-[11px] font-medium font-sans">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400 font-medium">{formattedGregorianDate}</span>
          </div>
          <span className="font-semibold text-slate-300">
            {dynamicHijriDate}
          </span>
        </div>
      </div>

      {/* Next Prayer Hero Card */}
      <div className="flex flex-col gap-3.5 mx-5 mb-4 p-4 sm:p-5 rounded-2xl relative overflow-hidden bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl">
        {/* Top Header: Badge on Left, Adhan in Location on Right */}
        <div className="flex justify-between items-center w-full">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/20">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-bold text-[10px] tracking-wider text-primary uppercase font-sans">
              {nextPrayerData.isTomorrow ? t('prayer.tomorrow', 'TOMORROW') : t('prayer.nextPrayer', 'NEXT PRAYER')}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 font-sans">
            <BellRing className="w-3.5 h-3.5 text-primary" />
            <span>{t('prayer.adhanIn', 'Adhan in')} {selectedCity?.name || t('cities.kabul', 'Kabul')}</span>
          </div>
        </div>

        {/* Primary Prayer & Scheduled Time */}
        <div className="flex items-start justify-between pt-0.5">
          <div>
            <span className="text-2xl sm:text-3xl font-semibold text-white tracking-tight block font-sans">
              {nextPrayerData.nextPrayer?.name ? t('prayer.' + nextPrayerData.nextPrayer.name.toLowerCase(), nextPrayerData.nextPrayer.name) : t('prayer.fajr', 'Fajr')}
            </span>
            <span className="text-xs font-medium text-slate-400 mt-0.5 block font-sans">
              {nextPrayerData.nextPrayer?.subtitle ? nextPrayerData.nextPrayer.subtitle : t('prayer.prayerSubtitleDynamic', '{{name}} prayer', { name: nextPrayerData.nextPrayer?.name ? t('prayer.' + nextPrayerData.nextPrayer.name.toLowerCase(), nextPrayerData.nextPrayer.name) : t('prayer.fajr', 'Fajr') })}
            </span>
          </div>
          <div className="text-right">
            <span className="text-2xl sm:text-3xl font-semibold text-primary font-mono block tracking-tight">
              {nextPrayerData.nextPrayer?.time || '05:00 AM'}
            </span>
            <span className="text-[10px] font-medium text-slate-400 block mt-0.5 font-sans">
              {t('prayer.adhanTime', 'Adhan Time')}
            </span>
          </div>
        </div>

        {/* Monospace Countdown Timer */}
        <div className="pt-0.5">
          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 block font-sans">{t('prayer.timeRemaining', 'Time Remaining')}</span>
          <span className="font-mono text-3xl font-bold tracking-widest text-white leading-none block mt-1">
            {countdown.formatted}
          </span>
        </div>

        {/* Notification Button */}
        <button 
          type="button"
          onClick={() => (setActiveTab ? setActiveTab('notifications_settings_dark_mode') : null)}
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

      {/* {t('prayer.canonicalPrayers', 'Canonical Prayers')} */}
<div className="block mx-5 mb-4 p-4 rounded-2xl space-y-2 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-xs font-semibold text-slate-400 tracking-wider uppercase font-sans">
            {t('prayer.canonicalPrayers', 'Canonical Prayers')}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500">
              {calculationMethod} • {madhab}
            </span>
            {nextPrayerData.isTomorrow && (
              <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold uppercase rounded-full font-sans">
                TOMORROW
              </span>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          {prayersList.map((prayer) => {
            const prayerDate = prayer.prayerDate || getPrayerDate(prayer.time, nextPrayerData.isTomorrow, currentTime, prayerTimezone);
            const nowEpoch = currentTime.getTime();
            const isFutureTime = prayerDate ? prayerDate.getTime() > nowEpoch : true;
            const isPast = !isFutureTime;
            const isNext = isFutureTime && (prayer.id === nextPrayerData.nextPrayer?.id);
            const isFuture = isFutureTime && !isNext;

            // Worship History Integrity:
            // Check actual user-recorded worship in prayerLogs for today's civil date
            const targetDateKey = nextPrayerData.dateKey;
            const userLog = prayerLogs.find(
              (l) => (l.prayerId === prayer.id || l.name?.toLowerCase() === prayer.id) && l.date === targetDateKey
            );

            const isCompleted = userLog?.status === 'completed';
            const isMissed = userLog?.status === 'missed';
            const isUnrecorded = isPast && !userLog;

            return (
              <div
                key={prayer.id}
                onClick={() => {
                  if (isPast) {
                    togglePrayer(prayer.id, prayerDate, targetDateKey);
                    if (isCompleted) {
                      toast.info(`${prayer.name} prayer unlogged`);
                    } else {
                      toast.success(`${prayer.name} prayer logged`);
                    }
                  }
                }}
                className={`py-3 px-3.5 rounded-xl flex items-center justify-between bg-white/5 border border-white/10 transition-all select-none border ${
                  isNext
                    ? 'border-primary/40 ring-1 ring-primary/20 bg-primary/5'
                    : isCompleted
                    ? 'border-emerald-500/30'
                    : isMissed
                    ? 'border-amber-500/30'
                    : 'border-transparent opacity-75'
                } ${isPast ? `hover:bg-white/10 cursor-pointer active:scale-[0.99]` : 'cursor-default'}`}
                title={isFuture ? 'Future prayer (locked until time arrives)' : isNext ? 'Upcoming next prayer' : 'Tap to toggle user worship completion'}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                    isCompleted
                      ? 'bg-emerald-500/20 text-emerald-500'
                      : isNext
                      ? 'bg-primary/20 text-primary'
                      : isMissed
                      ? 'bg-amber-500/20 text-amber-500'
                      : 'bg-white/5 text-slate-400'
                  }`}>
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
                    <div className={`text-xs sm:text-sm font-semibold font-sans ${
                      isCompleted
                        ? 'text-emerald-500 line-through opacity-85'
                        : isNext
                        ? 'text-white'
                        : isMissed
                        ? 'text-white'
                        : 'text-slate-400'
                    }`}>
                      {prayer.name ? t('prayer.' + (prayer.key || prayer.name).toLowerCase(), prayer.name) : prayer.name}
                    </div>
                    <div className="text-[10px] font-medium text-slate-400 font-sans">
                      {prayer.subtitle ? prayer.subtitle : t('prayer.prayerSubtitleDynamic', '{{name}} prayer', { name: t('prayer.' + (prayer.key || prayer.name).toLowerCase(), prayer.name) })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className={`text-xs sm:text-sm font-semibold font-mono ${
                    isCompleted ? 'text-emerald-500' : isNext ? 'text-primary' : isMissed ? 'text-white' : 'text-slate-400'
                  }`}>
                    {prayer.time}
                  </span>
                  <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full font-sans ${
                    isCompleted
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      : isNext
                      ? 'bg-primary/20 text-primary border border-primary/30'
                      : isMissed
                      ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                      : isUnrecorded
                      ? 'bg-white/5 text-slate-400 border border-white/10'
                      : 'text-slate-400 bg-white/5 border border-white/5'
                  }`}>
                    {isCompleted ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
                        <span>{t('prayer.completed', 'Completed')}</span>
                      </>
                    ) : isNext ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                        <span>{t('prayer.next', 'Next')}</span>
                      </>
                    ) : isMissed ? (
                      <>
                        <Clock className="w-3 h-3 text-amber-500" />
                        <span>{t('prayer.missed', 'Missed')}</span>
                      </>
                    ) : isUnrecorded ? (
                      <>
                        <span>{t('prayer.logPrayer', 'Log Prayer')}</span>
                      </>
                    ) : (
                      <>
                        <span>{t('prayer.upcoming', 'Upcoming')}</span>
                      </>
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sun & Twilight Reference Grid */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-xs font-semibold text-slate-400 tracking-wider uppercase font-sans">
            {t('prayer.sunTwilightReference', 'Sun & Twilight Reference')}
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 shadow-sm rounded-2xl p-3 flex flex-col items-center justify-center text-center gap-1.5">
            <Sunrise className="w-5 h-5 text-amber-500 dark:text-amber-400 flex-shrink-0" />
            <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wide leading-tight font-sans block">
              {t('prayer.sunrise', 'Sunrise')}
            </span>
            <span className="text-sm font-bold text-white font-mono block">
              {sunTwilight?.sunrise || '--:--'}
            </span>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 shadow-sm rounded-2xl p-3 flex flex-col items-center justify-center text-center gap-1.5">
            <Moon className="w-5 h-5 text-indigo-500 dark:text-indigo-400 flex-shrink-0" />
            <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wide leading-tight font-sans block">
              {t('prayer.midnight', 'Midnight')}
            </span>
            <span className="text-sm font-bold text-white font-mono block">
              {sunTwilight?.midnight || '--:--'}
            </span>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 shadow-sm rounded-2xl p-3 flex flex-col items-center justify-center text-center gap-1.5">
            <Sparkles className="w-5 h-5 text-violet-500 dark:text-violet-400 flex-shrink-0" />
            <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wide leading-tight font-sans block">
              {t('prayer.tahajjud', 'Tahajjud')}
            </span>
            <span className="text-sm font-bold text-white font-mono block">
              {sunTwilight?.tahajjud || '--:--'}
            </span>
          </div>
        </div>
      </div>

      {/* Daily Spiritual Inspiration Widget */}
      <div className="block mx-5 mb-6 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-primary">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] font-semibold tracking-wider uppercase font-sans">{t('prayer.dailyInspiration', 'Daily Inspiration')}</span>
          </div>
          <button
            type="button"
            onClick={() => setIsBookmarked((prev) => !prev)}
            className="p-1 -mr-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 transition-transform cursor-pointer pointer-events-auto"
            title={isBookmarked ? "Remove Bookmark" : "Bookmark Inspiration"}
            aria-label={isBookmarked ? "Remove Bookmark" : "Bookmark Inspiration"}
          >
            <Bookmark className={`w-4 h-4 transition-colors ${isBookmarked ? 'text-indigo-400 fill-indigo-400' : 'text-slate-400'}`} />
          </button>
        </div>
        <p className="text-xs sm:text-sm font-medium italic leading-relaxed text-slate-200 font-sans">
          "{dailyQuote.ayah}"
        </p>
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 pt-1 font-sans">
          <span>— {dailyQuote.surah}</span>
          <span className="text-[10px] font-medium text-teal-500 dark:text-teal-400 font-sans">{t('prayer.ayahOfTheDay', 'Ayah of the Day')}</span>
        </div>
      </div>

      {/* Prayer Calculation Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <Sliders className="w-5 h-5 text-primary" />
                <h3 className="text-base font-semibold text-white">{t('prayer.calculationSettings', 'Prayer Calculation Settings')}</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-300">
              {/* 1. Calculation Method */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                  {t('prayer.calculationMethod', 'Calculation Method')}
                </label>
                <select
                  value={calculationMethod}
                  onChange={(e) => setCalculationMethod(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:border-primary"
                  data-testid="method-select"
                >
                  {CALCULATION_METHODS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.shortName})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  {t('prayer.adjustsSolarAngles', 'Adjusts the astronomical solar angles for Fajr and Isha calculations.')}
                </p>
              </div>

              {/* 2. Asr Juristic Convention (Madhab) */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                  {t('prayer.asrJuristicConvention', 'Asr Juristic Convention (Madhab)')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {MADHABS.map((m) => {
                    const isSelected = madhab === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setMadhab(m.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-primary/20 border-primary text-white'
                            : 'bg-slate-800/50 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                        }`}
                        data-testid={`madhab-${m.id}`}
                      >
                        <div className="font-semibold text-xs">{m.name}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{m.description}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. High Latitude Rule */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                  {t('prayer.highLatitudeRule', 'High Latitude Rule')}
                </label>
                <select
                  value={highLatitudeRule}
                  onChange={(e) => setHighLatitudeRule(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:border-primary"
                  data-testid="high-lat-select"
                >
                  {HIGH_LATITUDE_RULES.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} — {r.description}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  {t('prayer.preventsTwilightFailures', 'Prevents twilight failures in high-latitude regions during summer.')}
                </p>
              </div>

              {/* Note on Mosque Schedules */}
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 text-[11px] text-slate-400 leading-relaxed">
                <span className="font-semibold text-slate-300 block mb-0.5">
                  {t('prayer.noteOnMosqueSchedules', 'Note on Mosque Schedules')}
                </span>
                <p>
                  {t('prayer.prepareAblutions', 'Prepare your mind and ablutions peacefully before entry time.')}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/80 flex justify-end">
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-primary text-white font-semibold text-xs hover:bg-primary/90 transition-all cursor-pointer"
              >
                Apply &amp; Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
