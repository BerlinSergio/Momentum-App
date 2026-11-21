import { useTranslation } from 'react-i18next';
import { useState, useEffect, useMemo } from 'react';
import UserAvatar from './components/UserAvatar';
import { useProfileStore } from './store/useProfileStore';
import { useTasbeehStore } from './store/useTasbeehStore';
import { useNotesStore, calculateReflectionStreak } from './store/useNotesStore';
import { usePrayerStore, calculateRate } from './store/usePrayerStore';
import { useLocationStore } from './store/useLocationStore';
import { useNavigationStore } from './store/useNavigationStore';
import { useNotificationStore } from './store/useNotificationStore';
import { getHijriDateParts, HIJRI_MONTHS } from './utils/afghanCalendar.js';
import { getDailyQuote } from './data/dailyQuotes.js';
import { getNextPrayerInfo } from './utils/prayerTimes.js';
import { toast } from './components/ui/toast/index.js';
import {
  Sparkles, Bell, ChevronRight, Moon, Repeat, PenLine, Calendar,
  Settings, Quote, Heart, Share2, Check, CheckCircle2, BookOpen
} from 'lucide-react';

export default function MoreDarkMode({ setActiveTab }) {
  const { t } = useTranslation();
  const unreadNotifCount = useNotificationStore((s) => s.notifications?.filter((n) => !n.read).length || 0);
  const fullName = useProfileStore((s) => s.fullName);
  const displayName = (!fullName || fullName.trim().toLowerCase() === 'milad wardak' || fullName.trim().toLowerCase() === 'user profile') ? 'Milad Wardak' : fullName;
  const currentCount = useTasbeehStore((s) => s.currentCount) || 0;
  const historyLogs = useTasbeehStore((s) => s.historyLogs);
  const prayerLogs = usePrayerStore((s) => s.prayerLogs);
  const notes = useNotesStore((s) => s.notes);
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
    const logs = historyLogs || [];
    const logsSum = logs.reduce((acc, log) => acc + (Number(log?.count) || 0), 0);
    return logsSum + Number(currentCount || 0);
  }, [historyLogs, currentCount]);
  const punctualPercentage = useMemo(() => {
    return calculateRate(prayerLogs || []);
  }, [prayerLogs]);
  const reflectionStreak = useMemo(() => {
    return calculateReflectionStreak(notes || []);
  }, [notes]);
  const reflectionDays = useMemo(() => `${reflectionStreak} d`, [reflectionStreak]);
  const calculationMethod = usePrayerStore((s) => s.calculationMethod) || 'Karachi';
  const madhab = usePrayerStore((s) => s.madhab) || 'Hanafi';
  const nextPrayerName = useMemo(() => {
    const lat = selectedCity?.latitude != null ? Number(selectedCity.latitude) : 34.5553;
    const lng = selectedCity?.longitude != null ? Number(selectedCity.longitude) : 69.2075;
    const timezone = selectedCity?.timezone || 'Asia/Kabul';
    const info = getNextPrayerInfo({
      baseDate: currentDate,
      latitude: lat,
      longitude: lng,
      timezone,
      calculationMethod,
      madhab,
    });
    return info.nextPrayer?.name || 'Fajr';
  }, [selectedCity, currentDate, calculationMethod, madhab]);
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
      } catch (err) {
        void err;
      }
      toast.success(exists ? 'Quote removed from favorites' : 'Quote added to favorites');
      return updated;
    });
  };
  const handleShareQuote = async (e) => {
    e.stopPropagation();
    const text = `${todayQuote.quote} — ${todayQuote.surah}`;
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        const sharePromise = navigator.share({ title: 'Daily Radiance • Momentum', text, url: window.location.origin });
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Share timeout')), 250));
        await Promise.race([sharePromise, timeoutPromise]);
        setShareFeedback('Shared!');
        toast.success(t('toasts.quoteShared', 'Daily quote shared'));
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
        toast.success(t('toasts.quoteCopied', 'Daily quote copied to clipboard'));
        setTimeout(() => setShareFeedback(''), 2000);
        return;
      } catch (err) {
        void err;
      }
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
      toast.success(t('toasts.quoteCopied', 'Daily quote copied to clipboard'));
      setTimeout(() => setShareFeedback(''), 2000);
    } catch {
      setShareFeedback('Copied!');
      toast.success(t('toasts.quoteCopied', 'Daily quote copied to clipboard'));
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
          <h1 className="text-base font-bold text-white tracking-tight">{t('more.more', 'More')}</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('notifications_settings_dark_mode')}
            aria-label={t('nav.notifications', 'Notifications')}
            className="relative p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer pointer-events-auto"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-slate-900" />
            )}
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
              <p className="text-xs font-normal text-slate-400 leading-snug mt-0.5">{t('more.momentumMember', 'Momentum Member')}</p>
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); navigateTo('settings_profile_dark_mode'); }}
            aria-label={t('settings.profile', 'Profile Settings')}
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
            <span className="text-[11px] font-medium text-slate-400">{t('more.adhkar', 'Adhkar')}</span>
          </div>
          <div
            onClick={(e) => { e.stopPropagation(); navigateTo('prayer_times_dark_mode'); }}
            className="flex flex-col items-center justify-center py-1 border-r border-white/10 active:scale-95 transition-transform text-center cursor-pointer pointer-events-auto"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span className="text-base font-bold text-white tracking-tight leading-none">{punctualPercentage}%</span>
            </div>
            <span className="text-[11px] font-medium text-slate-400">{t('more.punctual', 'Punctual')}</span>
          </div>
          <div
            onClick={(e) => { e.stopPropagation(); navigateTo('notes_main_dark_mode'); }}
            className="flex flex-col items-center justify-center py-1 active:scale-95 transition-transform text-center cursor-pointer pointer-events-auto"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <BookOpen className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span className="text-base font-bold text-white tracking-tight leading-none">{reflectionDays}</span>
            </div>
            <span className="text-[11px] font-medium text-slate-400">{t('more.reflection', 'Reflection')}</span>
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className="flex items-center justify-between px-5 mb-3">
        <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">{t('more.ecosystemEssentials', 'Ecosystem Essentials')}</span>
        <span className="text-xs font-medium text-slate-500">{t('more.modulesCount', '5 Modules')}</span>
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
              <span className="text-[15px] font-semibold text-slate-100 tracking-tight leading-tight">{t('nav.prayer', 'Prayer Times')}</span>
              <span className="text-[12px] text-slate-400 line-clamp-1 leading-tight">{t('more.accurateTimetable', 'Accurate prayer timetable')}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-xs font-semibold text-emerald-400">{t('more.nextPrayerFormat', 'Next: {{name}}', { name: nextPrayerName })}</span>
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
              <span className="text-[15px] font-semibold text-slate-100 tracking-tight leading-tight">{t('nav.tasbeeh', 'Tasbeeh')}</span>
              <span className="text-[12px] text-slate-400 line-clamp-1 leading-tight">{t('more.dhikrBeadsDesc', 'Vibrational daily dhikr beads')}</span>
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
              <span className="text-[15px] font-semibold text-slate-100 tracking-tight leading-tight">{t('nav.notes', 'Notes')}</span>
              <span className="text-[12px] text-slate-400 line-clamp-1 leading-tight">{t('more.mindfulNotesDesc', 'Mindful daily thoughts and scratchpad')}</span>
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
              <span className="text-[15px] font-semibold text-slate-100 tracking-tight leading-tight">{t('nav.calendar', 'Calendars')}</span>
              <span className="text-[12px] text-slate-400 line-clamp-1 leading-tight">{t('more.calendarSyncDesc', 'Synchronized lunar and standard schedule')}</span>
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
              <span className="text-[15px] font-semibold text-slate-100 tracking-tight leading-tight">{t('settings.profileSettings', 'Settings & Preferences')}</span>
              <span className="text-[12px] text-slate-400 line-clamp-1 leading-tight">{t('more.securitySettingsDesc', 'Security, encrypted backup & settings')}</span>
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
              <span className="text-xs font-bold tracking-wide uppercase">{t('more.dailyRadiance', 'Daily Radiance')}</span>
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
              aria-label={t('common.share', 'Share')}
              className="flex items-center gap-1 text-xs font-bold text-primary hover:text-primary/80 transition-colors cursor-pointer pointer-events-auto px-2 py-1 rounded-lg hover:bg-primary/10 active:scale-95"
            >
              {shareFeedback ? (
                <>
                  <Check className="w-3.5 h-3.5 text-teal-400" />
                  <span className="text-teal-400">{shareFeedback}</span>
                </>
              ) : (
                <>
                  <span>{t('common.share', 'Share')}</span>
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