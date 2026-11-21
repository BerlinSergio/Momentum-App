import { useTranslation } from 'react-i18next';
import { useState, useMemo } from 'react';
import { 
  ArrowLeft, Clock, Bell, Volume2, Flame, 
  Check, RotateCcw, Pencil, Trash2, AlertCircle, 
  CalendarDays, Ban, BookOpen 
} from 'lucide-react';
import { 
  useRoutineStore, 
  isRoutineScheduledForDate, 
  isRoutineCompletedForDate, 
  getStreakStatistics, 
  calculateRoutineCurrentStreak,
  deriveWeekdaysFromFrequency,
  WEEKDAY_TOKENS 
} from './store/useRoutineStore';
import { useNavigationStore } from './store/useNavigationStore';
import { playRoutineSound, stopRoutineSound } from './utils/routineAudio';
import { getLocalDateKey } from './utils/timeService';
import { toast } from './components/ui/toast/index.js';

export default function RoutineDetailsDarkMode({ setActiveTab, goBack, route }) {
  const { t } = useTranslation();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  const routeParams = useNavigationStore((s) => s.routeParams) || route?.params || {};
  const routineId = routeParams.routineId;
  const dateKey = routeParams.dateKey || getLocalDateKey();

  const rawRoutines = useRoutineStore((s) => s.routines);
  const routines = useMemo(() => rawRoutines || [], [rawRoutines]);
  const toggleRoutineCompletion = useRoutineStore((s) => s.toggleRoutineCompletion);
  const deleteRoutine = useRoutineStore((s) => s.deleteRoutine);
  const setEditingRoutineId = useRoutineStore((s) => s.setEditingRoutineId);

  const routine = useMemo(() => {
    return routines.find((r) => r.id === routineId);
  }, [routines, routineId]);

  const handleBack = () => {
    stopRoutineSound();
    if (typeof goBack === 'function') {
      goBack('daily_routine_dark_mode');
    } else if (setActiveTab) {
      setActiveTab('daily_routine_dark_mode');
    } else {
      useNavigationStore.getState().navigateTo('daily_routine_dark_mode');
    }
  };

  const handleEdit = () => {
    if (!routine) return;
    stopRoutineSound();
    setEditingRoutineId(routine.id);
    const nav = setActiveTab || useNavigationStore.getState().navigateTo;
    nav('add_edit_routine_dark_mode', { routineId: routine.id, dateKey });
  };

  const handleConfirmDelete = () => {
    if (!routine) return;
    stopRoutineSound();
    deleteRoutine(routine.id);
    toast.success(t('routines.routineDeleted', 'Routine deleted'));
    setIsDeleteModalOpen(false);
    handleBack();
  };

  const handlePreviewSound = () => {
    if (!routine) return;
    setIsPlayingSound(true);
    playRoutineSound(routine.reminderSound || t('routines.serenityBell', 'Serenity Bell'));
    setTimeout(() => {
      setIsPlayingSound(false);
    }, 1800);
  };

  const todayKey = getLocalDateKey();
  const isToday = dateKey === todayKey;

  const displayDate = useMemo(() => {
    try {
      const parts = dateKey.split('-');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        return d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
      }
      return dateKey;
    } catch {
      return dateKey;
    }
  }, [dateKey]);

  const isScheduled = routine ? isRoutineScheduledForDate(routine, dateKey) : false;
  const isCompleted = routine ? isRoutineCompletedForDate(routine, dateKey) : false;
  const currentStreak = routine ? calculateRoutineCurrentStreak(routine, dateKey) : 0;
  const streakStats = useMemo(() => {
    return routine ? getStreakStatistics(routine, 16, dateKey) : { scheduledCount: 0, completedCount: 0, percentage: 0, text: '' };
  }, [routine, dateKey]);

  const activeWeekdayNums = useMemo(() => {
    if (!routine) return [];
    return deriveWeekdaysFromFrequency(routine.frequency, routine.weekdays);
  }, [routine]);

  const getCategoryBadgeClass = (cat) => {
    const c = String(cat || '').toLowerCase();
    if (c.includes('spirit')) return 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
    if (c.includes('health') || c.includes('fitness')) return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
    if (c.includes('work') || c.includes('study')) return 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30';
    if (c.includes('person') || c.includes('family')) return 'bg-purple-500/20 text-purple-400 border border-purple-500/30';
    return 'bg-slate-800 text-slate-300 border border-slate-700';
  };

  if (!routine) {
    return (
      <div className="w-full max-w-md mx-auto min-h-screen relative font-sans text-white p-5 flex flex-col justify-between pb-32">
        <div className="flex items-center justify-between pt-2 mb-8">
          <button
            type="button"
            onClick={handleBack}
            aria-label={t('common.back', 'Back')}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-xl border border-white/10 text-white hover:bg-black/60 transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-bold text-white tracking-wide">{t('routines.routineDetails', 'Routine Details')}</h1>
          <div className="w-10" />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl my-auto">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-white mb-2">{t('routines.routineNotFound', 'Routine Not Found')}</h2>
          <p className="text-xs text-slate-400 max-w-xs mb-6">
            {t('routines.routineNotFoundDesc', 'The requested daily routine could not be located. It may have been deleted or the link is invalid.')}
          </p>
          <button
            type="button"
            onClick={handleBack}
            className="px-6 py-3 rounded-2xl bg-primary text-white text-xs font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all cursor-pointer"
          >
            {t('routines.returnToRoutine', 'Return to Daily Routine')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto min-h-screen relative font-sans text-white p-5 flex flex-col pb-36">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pt-2 mb-6">
        <button
          type="button"
          onClick={handleBack}
          aria-label={t('common.back', 'Back')}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-xl border border-white/10 text-white hover:bg-black/60 transition-all active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-bold text-white tracking-wide">{t('routines.routineDetails', 'Routine Details')}</h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleEdit}
            aria-label={t('routines.editRoutine', 'Edit Routine')}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-xl border border-white/10 text-slate-300 hover:text-white hover:bg-black/60 transition-all active:scale-95 cursor-pointer"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            aria-label={t('routines.deleteRoutine', 'Delete Routine')}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-xl border border-white/10 text-rose-400 hover:bg-rose-500/20 transition-all active:scale-95 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Date Context Banner */}
        <div className="p-3.5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-slate-300">
              {displayDate}
            </span>
          </div>
          {isToday && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/20 text-primary border border-primary/30">
              {t('common.today', 'Today')}
            </span>
          )}
        </div>

        {/* Routine Title, Category & Streak Banner */}
        <div className="p-5 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            {routine.category && (
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${getCategoryBadgeClass(routine.category)}`}>
                {routine.category}
              </span>
            )}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{t('routines.dayStreak', { count: currentStreak })}</span>
            </div>
          </div>

          <h2 className={`text-xl font-bold leading-snug break-words ${isCompleted ? 'line-through text-slate-400 decoration-primary/70' : 'text-white'}`}>
            {routine.title}
          </h2>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-300 pt-1">
            <span className="flex items-center gap-1.5 text-primary">
              <Clock className="w-4 h-4" /> {routine.time}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">
              {routine.duration || routine.durationMinutes || 25} {t('common.mins', 'mins')}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">
              {routine.frequency || t('routines.everyDay', 'Every Day')}
            </span>
          </div>
        </div>

        {/* Schedule & Active Weekday Pills */}
        <div className="p-5 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('routines.recurrenceActiveDays', 'Recurrence & Active Days')}</h3>
            <span className="text-[11px] font-semibold text-primary">{routine.frequency || t('routines.everyDay', 'Every Day')}</span>
          </div>

          <div className="grid grid-cols-7 gap-1.5 pt-1">
            {WEEKDAY_TOKENS.map((token, idx) => {
              const isActive = activeWeekdayNums.includes(idx);
              return (
                <div
                  key={token}
                  className={`flex flex-col items-center py-2 rounded-xl text-center transition-all ${
                    isActive
                      ? 'bg-primary text-white font-bold shadow-sm shadow-primary/25 border border-primary/40'
                      : 'bg-slate-800/40 text-slate-500 border border-slate-700/40 font-medium'
                  }`}
                >
                  <span className="text-[10px]">{token}</span>
                  <span className="text-[11px] mt-0.5">{isActive ? '✓' : '—'}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reminder & Audio Preview Card */}
        <div className="p-5 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('tasks.reminderAndCue', 'Reminder & Auditory Cue')}</h3>
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">
                  {routine.reminderEnabled ? (routine.reminder || t('routines.atStart', 'At start')) : t('common.disabled', 'Disabled')}
                </p>
                <p className="text-[11px] text-slate-400">
                  {routine.reminderSound || t('routines.serenityBell', 'Serenity Bell')}
                </p>
              </div>
            </div>

            {routine.reminderEnabled && routine.reminderSound !== 'Silent' && (
              <button
                type="button"
                onClick={handlePreviewSound}
                aria-label={t('routines.previewSound', 'Preview Sound')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer ${
                  isPlayingSound
                    ? 'bg-primary text-white shadow-md shadow-primary/20 animate-pulse'
                    : 'bg-white/10 hover:bg-white/20 text-slate-200'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isPlayingSound ? t('common.loading', 'Playing…') : t('routines.testAudio', 'Test Audio')}</span>
              </button>
            )}
          </div>
        </div>

        {/* Mindful Intent & Notes */}
        <div className="p-5 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl space-y-2">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">{t('routines.mindfulReflection', 'Mindful Intent & Reflection')}</h3>
          </div>
          {routine.notes ? (
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap break-words pt-1 bg-white/5 p-3.5 rounded-2xl border border-white/5 italic">
              &ldquo;{routine.notes}&rdquo;
            </p>
          ) : (
            <p className="text-xs text-slate-500 italic py-1">
              {t('routines.noMindfulIntentSpecified', 'No mindful intent or notes specified for this routine.')}
            </p>
          )}
        </div>

        {/* Consistency Statistics */}
        <div className="p-5 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('routines.consistencyRecord', 'Consistency Record')}</h3>
            <p className="text-xs font-bold text-amber-400">{streakStats.percentage}% {t('routines.consistency', 'Consistency')}</p>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-amber-500 to-primary h-full transition-all duration-300"
              style={{ width: `${streakStats.percentage}%` }}
            />
          </div>
          <p className="text-xs text-slate-400">
            {streakStats.text}
          </p>
        </div>
      </div>

      {/* Floating Bottom Action Bar */}
      <div className="fixed bottom-6 left-0 right-0 max-w-md mx-auto px-5 z-40 flex items-center gap-3">
        {!isScheduled ? (
          <div 
            aria-disabled="true"
            className="flex-1 py-3.5 px-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-slate-400 font-bold text-xs flex items-center justify-center gap-2 cursor-not-allowed select-none shadow-lg"
          >
            <Ban className="w-4 h-4" /> {t('routines.notScheduledForDay', 'Not Scheduled for this Day')}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              toggleRoutineCompletion(routine.id, dateKey);
              if (isCompleted) {
                toast.info(t('routines.routineUncompleted', 'Routine uncompleted'));
              } else {
                toast.success(t('routines.routineCompletedToday', 'Routine completed for today!'));
              }
            }}
            aria-label={isCompleted ? t('routines.undoCompletion', 'Undo Routine Completion') : t('routines.markDone', 'Mark Routine as Done')}
            className={`flex-1 py-3.5 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 cursor-pointer ${
              isCompleted
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 shadow-emerald-500/10'
                : 'bg-primary text-white shadow-primary/25 hover:bg-primary/90'
            }`}
          >
            {isCompleted ? (
              <>
                <RotateCcw className="w-4 h-4" /> {t('routines.completedUndo', 'Completed — Undo')}
              </>
            ) : (
              <>
                <Check className="w-4 h-4 stroke-[2.5]" /> {t('routines.markDone', 'Mark as Done')}
              </>
            )}
          </button>
        )}

        <button
          type="button"
          onClick={handleEdit}
          aria-label={t('routines.editRoutine', 'Edit Routine')}
          className="py-3.5 px-5 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-black/80 transition-all active:scale-95 shadow-lg cursor-pointer"
        >
          <Pencil className="w-4 h-4" /> {t('common.edit', 'Edit')}
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 max-w-xs w-full shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{t('routines.deleteRoutineTitle', 'Delete Routine?')}</h3>
              <p className="text-xs text-slate-400 mt-1">
                {t('routines.deleteRoutineConfirm', { defaultValue: 'Are you sure you want to delete "{{title}}"? This action cannot be undone.', title: routine.title })}
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-700 transition-all active:scale-95 cursor-pointer"
              >
                {t('common.cancel', 'Cancel')}
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-rose-500 text-white font-bold text-xs hover:bg-rose-600 shadow-md shadow-rose-500/20 transition-all active:scale-95 cursor-pointer"
              >
                {t('common.delete', 'Delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}