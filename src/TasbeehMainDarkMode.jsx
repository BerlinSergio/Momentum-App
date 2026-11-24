import { useTranslation } from 'react-i18next';
import MomentumGlassHeader from './components/MomentumGlassHeader';
import { useEffect } from 'react';
import UserAvatar from './components/UserAvatar';
import { useTasbeehStore, computeTodayTotal } from './store/useTasbeehStore';
import { 
  Sparkles, History, Settings, Volume2, VolumeX, MoreVertical, Repeat, Award, Flag, RotateCcw, Undo2, Pointer, Edit2, PlusCircle, Clock, Lightbulb, Home, Wallet, Plus, CheckSquare, MoreHorizontal
} from 'lucide-react';

export default function TasbeehMainDarkMode({ setActiveTab }) {
  const { t } = useTranslation();
  const {
    currentCount,
    lapCount,
    dailyGoal,
    hapticsEnabled,
    soundEnabled,
    keepAwakeEnabled,
    keepAwake,
    fullScreenTapEnabled,
    fullScreenTap,
    volumeKeysEnabled,
    volumeKeys,
    activePreset,
    historyLogs,
    increment,
    decrement,
    reset,
    saveSession,
    toggleHaptics,
    toggleSound,
    setTarget,
  } = useTasbeehStore();

  const target = Number(activePreset?.target) || 33;
  const progressRatio = target > 0 ? Math.min(1, Math.max(0, currentCount / target)) : 0;
  const strokeDashoffset = Math.round(264 - (progressRatio * 264));
  const goal = dailyGoal || 1000;
  const todayTotal = computeTodayTotal(historyLogs, currentCount);
  const goalPercentage = Math.min(100, Math.round((todayTotal / goal) * 100));

  // Volume Keys for Counting
  useEffect(() => {
    if (!volumeKeysEnabled && !volumeKeys) return;
    const handleKeyDown = (e) => {
      if (e.key === 'AudioVolumeUp' || e.code === 'AudioVolumeUp' || e.key === 'ArrowUp') {
        e.preventDefault();
        increment();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [volumeKeysEnabled, volumeKeys, increment]);

  // Keep Screen Awake during Dhikr
  useEffect(() => {
    if (!keepAwakeEnabled && !keepAwake) return;
    let wakeLock = null;
    const requestWakeLock = async () => {
      try {
        if (typeof window !== 'undefined' && 'wakeLock' in navigator) {
          wakeLock = await navigator.wakeLock.request('screen');
        }
      } catch {
        // Silently ignore if unsupported
      }
    };
    requestWakeLock();
    return () => {
      if (wakeLock) {
        wakeLock.release().catch(() => {});
      }
    };
  }, [keepAwakeEnabled, keepAwake]);

  const handleReset = () => {
    if (currentCount > 0) {
      saveSession(currentCount);
    }
    reset();
  };

  const handleSaveAndLog = () => {
    if (currentCount > 0) {
      saveSession(currentCount);
      reset();
    }
    if (setActiveTab) {
      setActiveTab('tasbeeh_history_dark_mode');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between select-none">
      <div 
        onClick={(e) => {
          const isTapEnabled = fullScreenTapEnabled ?? fullScreenTap ?? false;
          if (isTapEnabled && !e.target.closest('button, nav, a, input, select')) {
            increment();
          }
        }}
        className="flex-1 pb-28"
      >
        {/* Top Header Bar */}
        <MomentumGlassHeader isDarkMode={true}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-base font-bold text-white tracking-tight">
              {t('tasbeeh.digitalTasbeeh', 'Digital Tasbeeh')}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button 
              type="button"
              onClick={() => setActiveTab && setActiveTab('tasbeeh_history_dark_mode')}
              aria-label={t('tasbeeh.dhikrHistory', 'Dhikr History')}
              className="p-2 rounded-full text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer select-none"
            >
              <History className="w-5 h-5" />
            </button>
            <button 
              type="button"
              onClick={() => setActiveTab && setActiveTab('tasbeeh_settings_dark_mode')}
              aria-label={t('tasbeeh.tasbeehSettings', 'Tasbeeh Settings')}
              className="p-2 rounded-full text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer select-none"
            >
              <Settings className="w-5 h-5" />
            </button>
            <UserAvatar 
              setActiveTab={setActiveTab} 
            />
          </div>
        </MomentumGlassHeader>

        {/* Current Dhikr Card */}
        <div className="block mx-5 my-3 p-5 rounded-3xl space-y-3 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary/15 border border-primary/80 text-primary">
                <Sparkles className="w-3 h-3 text-primary" />CURRENT DHIKR
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-800 border border-slate-700 text-slate-300">
                {t('tasbeeh.spiritualFocus', 'Spiritual Focus')}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button 
                type="button"
                onClick={toggleSound}
                title={soundEnabled ? 'Sound enabled' : 'Sound muted'}
                className={`p-1.5 rounded-xl transition-colors cursor-pointer select-none ${
                  soundEnabled ? 'text-primary bg-primary/20 hover:bg-primary/15' : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button 
                type="button"
                onClick={() => setActiveTab && setActiveTab('tasbeeh_settings_dark_mode')}
                aria-label="More Options"
                className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 cursor-pointer select-none"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="text-center py-1 space-y-1">
            <h2 style={{ fontFamily: 'ArabQuranIslamic, serif' }} className="text-center text-2xl font-bold font-quran text-white" dir="rtl">{activePreset?.arabic || 'سُبْحَانَ ٱللَّٰهِ'}</h2>
            <p className="text-sm font-semibold text-slate-200">{activePreset?.transliteration || t('tasbeeh.subhanallahTranslit', 'Subhanallah')}</p>
            <p className="text-xs font-normal italic text-slate-400">“{activePreset?.meaning || t('tasbeeh.subhanallahMeaning', 'Glory be to Allah')}”</p>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <button 
              type="button"
              onClick={() => setActiveTab && setActiveTab('new_edit_tasbeeh_dark_mode')}
              className="text-xs font-semibold text-primary hover:text-primary flex items-center gap-1.5 cursor-pointer select-none active:scale-95 transition-transform"
            >
              <Repeat className="w-3.5 h-3.5" />{t('tasbeeh.selectDhikr', 'Change Phrase')}
            </button>
            <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>Round <strong className="text-slate-200 font-bold">{lapCount + 1}</strong>
            </span>
          </div>
        </div>

        {/* Daily Dedication / Goal Pill Card */}
        <div 
          onClick={() => setActiveTab && setActiveTab('tasbeeh_history_dark_mode')}
          className="block mx-5 mb-4 p-3.5 rounded-2xl flex items-center justify-between bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl cursor-pointer hover:bg-black/40 active:scale-[0.99] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-violet-900/40 text-violet-400 flex items-center justify-center flex-shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {t('tasbeeh.dailyDedication', 'Daily Dedication')}
              </span>
              <span className="text-xs font-bold text-white"><strong className="text-sm font-bold">{todayTotal}</strong> counts</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-teal-400 flex items-center gap-1 justify-end">
              <Flag className="w-3.5 h-3.5" />
              Goal {goal.toLocaleString()}
            </span>
            <span className="text-[10px] font-medium text-slate-400">{t('tasbeeh.goalCompleted', '{{percent}}% completed', { percent: goalPercentage })}</span>
          </div>
        </div>

        {/* Center Circular Counter Hero Section */}
        <div className="block mx-5 mb-5 p-6 rounded-3xl flex flex-col items-center space-y-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
          <div className="relative w-52 h-52 mx-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                className="text-slate-800"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="url(#counterGradient)"
                strokeWidth="8"
                strokeDasharray="264"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-200"
              />
              <defs>
                <linearGradient id="counterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--color-primary)" />
                  <stop offset="100%" stopColor="var(--color-primary-container)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                COUNTER
              </span>
              <span className="text-5xl font-extrabold text-white tracking-tight my-0.5 font-display">
                {currentCount}
              </span>
              <span className="text-xs font-medium text-slate-400">
                of <strong className="text-primary font-bold">{target}</strong> Target
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 pt-1 text-xs font-semibold text-slate-400">
            <button 
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 hover:text-white active:scale-95 transition-all cursor-pointer select-none"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('tasbeeh.reset', 'Reset')}</span>
            </button>
            <button 
              type="button"
              onClick={toggleHaptics}
              title={t('tasbeeh.toggleHaptics', 'Toggle haptics')}
              className="flex items-center gap-1.5 text-teal-400 hover:text-teal-300 active:scale-95 transition-all cursor-pointer select-none"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${hapticsEnabled ? 'bg-teal-500' : 'bg-slate-700'}`}></span>
              <span>{hapticsEnabled ? t('tasbeeh.hapticsOn', 'Haptics: On') : t('tasbeeh.hapticsOff', 'Haptics: Off')}</span>
            </button>
            <button 
              type="button"
              onClick={decrement}
              className="flex items-center gap-1.5 hover:text-white active:scale-95 transition-all cursor-pointer select-none"
            >
              <Undo2 className="w-3.5 h-3.5" />
              <span>{t('common.undo', 'Undo')}</span>
            </button>
          </div>

          <button 
            type="button"
            onClick={increment}
            className="w-full py-5 px-6 rounded-3xl bg-gradient-to-r from-primary via-primary to-teal-600 hover:from-primary hover:to-teal-700 text-white shadow-xl shadow-black/60 flex items-center justify-center gap-3 transition-all active:scale-[0.98] select-none mt-4 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center">
              <Pointer className="w-5 h-5 text-white stroke-[2.2]" />
            </div>
            <div className="text-left">
              <span className="text-sm font-bold tracking-wide uppercase block">
                {t('tasbeeh.tapToCount', 'TAP TO COUNT')}
              </span>
              <span className="text-[10px] font-normal text-white/80 block">
                {t('tasbeeh.tactileTouchDesc', 'Thumb-friendly tactile touch')}
              </span>
            </div>
          </button>
        </div>

        {/* Target Selector Row */}
        <div className="block mx-5 mb-4 p-4 rounded-3xl space-y-2.5 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t('tasbeeh.selectTarget', 'Select Target')}</span>
            <button 
              type="button"
              onClick={() => setActiveTab && setActiveTab('new_edit_tasbeeh_dark_mode')}
              className="text-xs font-semibold text-primary hover:text-primary cursor-pointer select-none"
            >
              Standard Tasbeeh
            </button>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {[33, 99, 100, 1000].map((t) => (
              <button 
                key={t}
                type="button"
                onClick={() => setTarget(t)}
                className={`py-2 rounded-2xl text-xs transition-all cursor-pointer select-none active:scale-95 ${
                  target === t 
                    ? 'bg-primary text-white font-bold shadow-sm' 
                    : 'bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 font-semibold'
                }`}
              >
                {t}
              </button>
            ))}
            <button 
              type="button"
              onClick={() => setActiveTab && setActiveTab('new_edit_tasbeeh_dark_mode')}
              title={t('tasbeeh.editCustomDhikr', 'Edit Custom Dhikr')}
              className="py-2 rounded-2xl bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 text-xs font-semibold flex items-center justify-center cursor-pointer select-none active:scale-95"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3-Action Quick Grid */}
        <div className="grid grid-cols-3 gap-2.5 mx-5 mb-4">
          <button 
            type="button"
            onClick={handleReset}
            className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 text-slate-200 hover:bg-slate-800 shadow-sm flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer select-none active:scale-95"
          >
            <RotateCcw className="w-4 h-4 text-primary" />
            <span className="text-[11px] font-semibold">{t('tasbeeh.resetCount', 'Reset Count')}</span>
          </button>
          <button 
            type="button"
            className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 text-slate-200 hover:bg-slate-800 shadow-sm flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer select-none active:scale-95"
          >
            <PlusCircle className="w-4 h-4 text-primary" />
            <span className="text-[11px] font-semibold">{t('tasbeeh.newPhrase', 'New Phrase')}</span>
          </button>
          <button 
            type="button"
            onClick={handleSaveAndLog}
            className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 text-slate-200 hover:bg-slate-800 shadow-sm flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer select-none active:scale-95"
          >
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-[11px] font-semibold">{currentCount > 0 ? t('tasbeeh.logSession', 'Log Session') : t('tasbeeh.viewLog', 'View Log')}</span>
          </button>
        </div>

        {/* Mindful Consistency Hadith Card */}
        <div className="block mx-5 p-4 rounded-3xl flex items-start gap-3 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
          <div className="w-8 h-8 rounded-xl bg-slate-800 text-teal-400 flex items-center justify-center flex-shrink-0 shadow-sm">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-200">{t('tasbeeh.mindfulConsistency', 'Mindful Consistency')}</h4>
            <p className="text-[11px] font-medium text-slate-300 italic mt-0.5 leading-relaxed">{t('tasbeeh.mostLovedDeedsQuote', 'The deeds most loved by Allah are those done regularly, even if small. (Sahih al-Bukhari)')}</p>
          </div>
        </div>
      </div>

    </div>
  );
}
