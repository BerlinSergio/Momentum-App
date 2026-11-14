import React, { useState, useEffect, useMemo } from 'react';
import UserAvatar from './components/UserAvatar';
import { useProfileStore } from './store/useProfileStore';
import { useTasbeehStore } from './store/useTasbeehStore';
import { useNotesStore } from './store/useNotesStore';
import { usePrayerStore } from './store/usePrayerStore';
import { useLocationStore } from './store/useLocationStore';
import { useNavigationStore } from './store/useNavigationStore';
import { getHijriDateParts, HIJRI_MONTHS } from './utils/afghanCalendar.js';
import { getDailyQuote, DAILY_QUOTES } from './data/dailyQuotes.js';
import {
  Sparkles, Bell, ChevronRight, Moon, Repeat, PenLine, Calendar,
  Settings, Quote, Heart, Share2, Check, CheckCircle2, BookOpen
} from 'lucide-react';

function getNextPrayerInfo(city) {
  const lat = city?.lat || 34.5553;
  const lng = city?.lng || 69.2075;
  const tzOffsetHours = 4.5;
  const d = new Date();
  const start = new Date(d.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((d - start) / (1000 * 60 * 60 * 24));
  const b = (2 * Math.PI * (dayOfYear - 81)) / 364;
  const eot = 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);
  const declination = 23.45 * Math.sin((2 * Math.PI * (284 + dayOfYear)) / 365) * (Math.PI / 180);
  const latRad = lat * (Math.PI / 180);
  const solarNoonMinutes = 720 - 4 * lng - eot + tzOffsetHours * 60;
  const solarNoon = solarNoonMinutes / 60;
  function hourAngle(altitudeDeg) {
    const altRad = altitudeDeg * (Math.PI / 180);
    const cosHA = (Math.sin(altRad) - Math.sin(latRad) * Math.sin(declination)) / (Math.cos(latRad) * Math.cos(declination));
    if (cosHA > 1 || cosHA < -1) return null;
    return (Math.acos(cosHA) * (180 / Math.PI)) / 15;
  }
  const fajrHA = hourAngle(-18) || 1.7;
  const sunriseHA = hourAngle(-0.833) || 1.4;
  const asrAlt = (Math.atan(1 / (1 + Math.tan(Math.abs(latRad - declination))))) * (180 / Math.PI);
  const asrHA = hourAngle(asrAlt) || 1.0;
  const sunsetHA = sunriseHA;
  const ishaHA = hourAngle(-18) || 1.7;
  const prayers = [
    { name: 'Fajr', hours: solarNoon - fajrHA },
    { name: 'Dhuhr', hours: solarNoon },
    { name: 'Asr', hours: solarNoon + asrHA },
    { name: 'Maghrib', hours: solarNoon + sunsetHA },
    { name: 'Isha', hours: solarNoon + ishaHA },
  ];
  const currentHours = d.getHours() + d.getMinutes() / 60;
  for (let i = 0; i < prayers.length; i++) {
    if (currentHours < prayers[i].hours) {
      return prayers[i].name;
    }
  }
  return 'Fajr';
}

export default function MoreDarkMode({ setActiveTab, goBack }) {
  const fullName = useProfileStore((s) => s.fullName);
  const displayName = (!fullName || fullName.trim().toLowerCase() === 'milad wardak' || fullName.trim().toLowerCase() === 'user profile') ? 'Milad Wardak' : fullName;
  const currentCount = useTasbeehStore((s) => s.currentCount) || 0;
  const historyLogs = useTasbeehStore((s) => s.historyLogs) || [];
  const punctualPercentage = usePrayerStore((s) => s.punctualPercentage) ?? 0;
  const reflectionStreak = useNotesStore((s) => s.reflectionStreak) || 0;
  const selectedCity = useLocationStore((s) => s.selectedCity);
  const [shareFeedback, setShareFeedback] = useState('');
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [likedQuoteIds, setLikedQuoteIds] = useState(() => {
    try {
      const stored = localStorage.getItem('momentum-liked-radiance-quotes');
      if (stored) return JSON.parse(stored);
      if (localStorage.getItem('momentum-saved-radiance-quote') === 'true') {
        return [getDailyQuote().id || 1];
      }
      return [];
    } catch { return []; }
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const navigateTo = (target) => {
    if (setActiveTab) {
      setActiveTab(target);
    } else {
      useNavigationStore.getState().navigateTo(target);
    }
  };

  const totalAdhkar = useMemo(() => {
    const logsSum = (historyLogs || []).reduce((acc, log) => acc + (Number(log?.count) || 0), 0);
    return logsSum + Number(currentCount || 0);
  }, [historyLogs, currentCount]);
  const reflectionDays = useMemo(() => `${reflectionStreak || 0} d`, [reflectionStreak]);
  const nextPrayerName = useMemo(() => getNextPrayerInfo(selectedCity), [selectedCity]);
  const hijriFormatted = useMemo(() => {
    const p = getHijriDateParts(new Date());
    const m = HIJRI_MONTHS[p.hm - 1]?.nameEn || 'Rabi\' al-Thani';
    const shortMonth = m.replace('al-Awwal', 'I').replace('al-Thani', 'II').replace('al-Akhirah', 'II');
    return `${p.hd} ${shortMonth}`;
  }, []);
  const todayQuote = useMemo(() => getDailyQuote(currentDate), [currentDate]);
  const isQuoteLiked = useMemo(() => {
    return Boolean(todayQuote?.id && likedQuoteIds.includes(todayQuote.id));
  }, [likedQuoteIds, todayQuote]);

  const handleToggleLike = (e) => {
    e.stopPropagation();
    if (!todayQuote?.id) return;
    setLikedQuoteIds((prev) => {
      const exists = prev.includes(todayQuote.id);
      const updated = exists ? prev.filter((id) => id !== todayQuote.id) : [...prev, todayQuote.id];
      try {
        localStorage.setItem('momentum-liked-radiance-quotes', JSON.stringify(updated));
        localStorage.setItem('momentum-saved-radiance-quote', String(!exists));
      } catch {}
      return updated;
    });
  };
  const handleShareQuote = async (e) => {
    e.stopPropagation();
    const text = `${todayQuote.quote} — ${todayQuote.surah}`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'Daily Radiance • Momentum', text, url: window.location.origin });
        setShareFeedback('Shared!');
        setTimeout(() => setShareFeedback(''), 2000);
        return;
      } catch (err) {
        if (err.name === 'AbortError') return;
      }
    }
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        setShareFeedback('Copied!');
        setTimeout(() => setShareFeedback(''), 2000);
        return;
      } catch {}
    }
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setShareFeedback('Copied!');
      setTimeout(() => setShareFeedback(''), 2000);
    } catch {
      setShareFeedback('Copied!');
      setTimeout(() => setShareFeedback(''), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] pb-36 font-sans text-white">
      {/* Header */}
      <div className="sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Momentum Logo"
            className="w-10 h-10 object-cover rounded-xl aspect-square flex-shrink-0 shadow-md shadow-primary/30"
          />
          <h1 className="text-base font-bold text-white tracking-tight">More</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('notifications_settings_dark_mode')}
            aria-label="Notifications"
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer pointer-events-auto"
          >
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Profile Hero Card */}
      <div
        onClick={() => navigateTo('settings_profile_dark_mode')}
        className="block mx-5 mb-6 p-5 rounded-[24px] bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl cursor-pointer pointer-events-auto transition-all active:scale-[0.99] hover:border-white/20 select-none"
      >
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <UserAvatar
              size="w-16 h-16"
              textSize="text-xl"
              setActiveTab={setActiveTab}
            />
            <div className="flex flex-col justify-center min-w-0 flex-1">
              <h2 className="text-base font-bold text-white tracking-tight leading-snug">{displayName}</h2>
              <p className="text-xs font-normal text-slate-400 leading-snug mt-0.5">Momentum Member</p>
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); navigateTo('settings_profile_dark_mode'); }}
            aria-label="Profile Settings"
            className="w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer pointer-events-auto flex-shrink-0"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-3 pt-4 border-t border-white/5">
          <div
            onClick={(e) => { e.stopPropagation(); navigateTo('tasbeeh_main_dark_mode'); }}
            className="flex flex-col items-center justify-center py-1 border-r border-white/10 active:scale-95 transition-transform text-center cursor-pointer pointer-events-auto"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
              <span className="text-base font-bold text-white tracking-tight leading-none">{totalAdhkar}</span>
            </div>
            <span className="text-[11px] font-medium text-slate-400">Adhkar</span>
          </div>
          <div
            onClick={(e) => { e.stopPropagation(); navigateTo('prayer_times_dark_mode'); }}
            className="flex flex-col items-center justify-center py-1 border-r border-white/10 active:scale-95 transition-transform text-center cursor-pointer pointer-events-auto"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span className="text-base font-bold text-white tracking-tight leading-none">{punctualPercentage}%</span>
            </div>
            <span className="text-[11px] font-medium text-slate-400">Punctual</span>
          </div>
          <div
            onClick={(e) => { e.stopPropagation(); navigateTo('notes_main_dark_mode'); }}
            className="flex flex-col items-center justify-center py-1 active:scale-95 transition-transform text-center cursor-pointer pointer-events-auto"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <BookOpen className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span className="text-base font-bold text-white tracking-tight leading-none">{reflectionDays}</span>
            </div>
            <span className="text-[11px] font-medium text-slate-400">Reflection</span>
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className="flex items-center justify-between px-5 mb-3">
        <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">Ecosystem Essentials</span>
        <span className="text-xs font-medium text-slate-500">5 Modules</span>
      </div>

      {/* Ecosystem Essentials List */}
      <div className="space-y-3 px-5 mb-6">

        {/* Prayer Times */}
        <div
          onClick={() => navigateTo('prayer_times_dark_mode')}
          className="flex items-center justify-between w-full p-4 rounded-3xl active:scale-[0.98] transition-all cursor-pointer pointer-events-auto bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl hover:border-emerald-500/30 select-none"
        >
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Moon className="w-5 h-5" />
            </div>
            <div className="flex flex-col items-start justify-center gap-0.5 min-w-0 flex-1">
              <span className="text-[15px] font-semibold text-slate-100 tracking-tight leading-tight">Prayer Times</span>
              <span className="text-[12px] text-slate-400 line-clamp-1 leading-tight">Accurate prayer timetable</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-xs font-semibold text-emerald-400">Next: {nextPrayerName}</span>
            <ChevronRight className="w-5 h-5 text-slate-500 flex-shrink-0" />
          </div>
        </div>

        {/* Tasbeh */}
        <div
          onClick={() => navigateTo('tasbeeh_main_dark_mode')}
          className="flex items-center justify-between w-full p-4 rounded-3xl active:scale-[0.98] transition-all cursor-pointer pointer-events-auto bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl hover:border-teal-500/30 select-none"
        >
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <div className="w-11 h-11 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center flex-shrink-0">
              <Repeat className="w-5 h-5" />
            </div>
            <div className="flex flex-col items-start justify-center gap-0.5 min-w-0 flex-1">
              <span className="text-[15px] font-semibold text-slate-100 tracking-tight leading-tight">Tasbeh</span>
              <span className="text-[12px] text-slate-400 line-clamp-1 leading-tight">Vibrational daily dhikr beads</span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-500 flex-shrink-0" />
        </div>

        {/* Notes */}
        <div
          onClick={() => navigateTo('notes_main_dark_mode')}
          className="flex items-center justify-between w-full p-4 rounded-3xl active:scale-[0.98] transition-all cursor-pointer pointer-events-auto bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl hover:border-amber-500/30 select-none"
        >
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
              <PenLine className="w-5 h-5" />
            </div>
            <div className="flex flex-col items-start justify-center gap-0.5 min-w-0 flex-1">
              <span className="text-[15px] font-semibold text-slate-100 tracking-tight leading-tight">Notes</span>
              <span className="text-[12px] text-slate-400 line-clamp-1 leading-tight">Mindful daily thoughts and scratchpad</span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-500 flex-shrink-0" />
        </div>

        {/* Calendars */}
        <div
          onClick={() => navigateTo('calendars_main_dark_mode')}
          className="flex items-center justify-between w-full p-4 rounded-3xl active:scale-[0.98] transition-all cursor-pointer pointer-events-auto bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl hover:border-blue-400/30 select-none"
        >
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <div className="w-11 h-11 rounded-2xl bg-primary/20 text-blue-400 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="flex flex-col items-start justify-center gap-0.5 min-w-0 flex-1">
              <span className="text-[15px] font-semibold text-slate-100 tracking-tight leading-tight">Calendars</span>
              <span className="text-[12px] text-slate-400 line-clamp-1 leading-tight">Synchronized lunar and standard schedule</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-xs font-normal text-slate-400">{hijriFormatted}</span>
            <ChevronRight className="w-5 h-5 text-slate-500 flex-shrink-0" />
          </div>
        </div>

        {/* Settings & Preferences */}
        <div
          onClick={() => navigateTo('settings_profile_dark_mode')}
          className="flex items-center justify-between w-full p-4 rounded-3xl active:scale-[0.98] transition-all cursor-pointer pointer-events-auto bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl hover:border-slate-500/30 select-none"
        >
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <div className="w-11 h-11 rounded-2xl bg-slate-800 text-slate-300 flex items-center justify-center flex-shrink-0">
              <Settings className="w-5 h-5" />
            </div>
            <div className="flex flex-col items-start justify-center gap-0.5 min-w-0 flex-1">
              <span className="text-[15px] font-semibold text-slate-100 tracking-tight leading-tight">Settings & Preferences</span>
              <span className="text-[12px] text-slate-400 line-clamp-1 leading-tight">Notifications, cloud backup & privacy</span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-500 flex-shrink-0" />
        </div>
      </div>

      {/* Daily Radiance Card */}
      <div className="block mx-5 mb-5 relative overflow-hidden rounded-3xl p-5 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl select-none">
        <Quote className="absolute -right-4 -bottom-4 w-24 h-24 text-white/5 rotate-12 pointer-events-none" />
        <div className="relative z-10 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-primary">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold tracking-wide uppercase">Daily Radiance</span>
            </div>
            <button
              onClick={handleToggleLike}
              aria-label={isQuoteLiked ? "Remove quote from favorites" : "Save quote to favorites"}
              className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm cursor-pointer pointer-events-auto transition-transform active:scale-90 ${isQuoteLiked ? 'bg-rose-500/20 text-rose-400' : 'bg-white/5 text-slate-400 hover:text-rose-400'}`}
            >
              <Heart className={`w-4 h-4 ${isQuoteLiked ? 'fill-current' : ''}`} />
            </button>
          </div>
          <p className="text-base font-medium text-white italic leading-relaxed pr-4">
            {todayQuote.quote}
          </p>
          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <span className="text-xs font-normal text-slate-400">{todayQuote.surah}</span>
            <button
              onClick={handleShareQuote}
              aria-label="Share Quote"
              className="flex items-center gap-1 text-xs font-bold text-primary hover:text-primary/80 transition-colors cursor-pointer pointer-events-auto px-2 py-1 rounded-lg hover:bg-primary/10 active:scale-95"
            >
              {shareFeedback ? (
                <>
                  <Check className="w-3.5 h-3.5 text-teal-400" />
                  <span className="text-teal-400">{shareFeedback}</span>
                </>
              ) : (
                <>
                  <span>Share</span>
                  <Share2 className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}