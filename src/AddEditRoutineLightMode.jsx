import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import UserAvatar from './components/UserAvatar';
import { 
  Clock, 
  ArrowLeft, 
  Trash2, 
  Sparkles, 
  Check, 
  X, 
  Volume2, 
  AlertCircle,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { useRoutineForm } from './hooks/useRoutineForm';
import { ROUTINE_CATEGORIES, ROUTINE_SUGGESTIONS } from './data/routineSuggestions';
import { SOUND_OPTIONS, playRoutineSound } from './utils/routineAudio';
import { WEEKDAY_TOKENS } from './store/useRoutineStore';
import { MomentumTimePicker } from './components/ui/picker/index.js';

export default function AddEditRoutineLightMode({ setActiveTab, goBack }) {
  const { t } = useTranslation();
  const form = useRoutineForm({
    setActiveTab,
    goBack,
    defaultFallbackRoute: 'daily_routine_light_mode',
  });

  const [suggestCategory, setSuggestCategory] = useState('All');

  const filteredSuggestions = suggestCategory === 'All'
    ? ROUTINE_SUGGESTIONS
    : ROUTINE_SUGGESTIONS.filter((s) => s.category === suggestCategory);

  return (
    <>
      {/* Top Sticky Header Bar */}
      <div className="sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex items-center justify-between px-5 pt-6 pb-2 pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <h1 
            className="text-base font-bold text-slate-900 tracking-tight"
            style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}
          >
            {form.isEditing ? t('routines.editRoutine', 'Edit Routine') : t('routines.addRoutine', 'Add Routine')}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            type="button"
            aria-label={t('common.back', 'Back')}
            onClick={form.handleCancel} 
            className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <UserAvatar setActiveTab={setActiveTab} />
        </div>
      </div>

      <main className="flex-1 w-full max-w-md lg:max-w-5xl mx-auto px-4 lg:px-8 py-4 pb-32">
        {/* Validation Error Banner */}
        {form.errorMessage && (
          <div 
            role="alert"
            className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold shadow-sm"
          >
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span className="flex-1">{form.errorMessage}</span>
            <button 
              type="button" 
              onClick={() => form.setErrorMessage('')} 
              className="p-1 hover:bg-rose-100 rounded-lg text-rose-700 cursor-pointer"
              aria-label={t('common.close', 'Close')}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Header Status Bar */}
        <div className="flex flex-row items-center justify-between w-full px-1 pt-1">
          <div className="flex items-center gap-1.5">
            <span className="h-8 px-3 rounded-full bg-slate-100 text-slate-800 font-medium text-xs shadow-sm flex items-center justify-center gap-1.5 border border-slate-200/60 whitespace-nowrap shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              {form.isEditing ? `ROUTINE #${form.existingRoutine?.id.toUpperCase()}` : t('routines.newRoutineUpper', 'NEW ROUTINE')}
            </span>
            <span className="h-8 px-2.5 rounded-full bg-primary/10 text-slate-800 font-medium text-xs border border-primary/20 flex items-center justify-center whitespace-nowrap shrink-0">
              {form.isEditing ? t('routines.editingMode', 'Editing Mode') : t('routines.newRoutine', 'New Routine')}
            </span>
          </div>

          {/* Delete Action: strictly shown in Edit Routine mode */}
          {form.isEditing && (
            <button 
              type="button"
              aria-label={t('routines.deleteRoutine', 'Delete Routine')}
              onClick={form.handleDelete} 
              className="h-8 px-3 rounded-full flex items-center justify-center gap-1.5 bg-rose-500/90 hover:bg-rose-600 text-white font-medium text-xs shadow-sm shadow-rose-500/20 border border-rose-400/30 transition-all active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t('common.delete', 'Delete')}</span>
            </button>
          )}
        </div>

                {/* Responsive Layout: 2-Column Grid on Desktop (>= 1024px), Single Column on Mobile */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-6 items-start gap-5">
          {/* ── LEFT COLUMN (Cols 1-7 on Desktop): Name, Category, Target Time, Cadence ── */}
          <div className="w-full lg:col-span-7 flex flex-col gap-5">
            {/* Card 1: Routine Name & Sphere/Category Container */}
        <div className="rounded-3xl p-5 space-y-4 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-medium text-slate-800 text-sm" htmlFor="routine-name">
                {t('routines.routineName', 'Routine Name')}
              </label>
              <button 
                type="button"
                onClick={() => form.setIsSuggestOpen(true)}
                className="text-xs text-primary hover:text-primary-light flex items-center gap-1 font-semibold transition-colors cursor-pointer active:scale-95 px-2 py-0.5 rounded-lg hover:bg-primary/10"
              >
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>{t('routines.smartSuggest', 'Smart Suggest')}</span>
              </button>
            </div>

            <div className="text-slate-900 rounded-2xl px-4 py-3 flex items-center gap-3 focus-within:shadow-[0_0_0_2px_rgba(99,102,241,0.4)] transition-all bg-white border border-slate-200 shadow-sm">
              <span className="material-symbols-outlined text-primary text-[20px] pointer-events-none shrink-0">
                menu_book
              </span>
              <input 
                id="routine-name"
                type="text" 
                value={form.title}
                onChange={(e) => form.handleTitleChange(e.target.value)}
                placeholder={t('routines.routineNamePlaceholder', 'e.g. Evening Reading & Quran Reflection')}
                className="flex-1 bg-transparent border-none text-slate-900 placeholder-slate-400 focus:outline-none text-base"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="space-y-3 pt-1">
            <label className="block font-medium text-slate-800 text-sm">
              {t('tasks.sphereCategory', 'Sphere / Category')}
            </label>
            <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1 scroll-smooth">
              {ROUTINE_CATEGORIES.map((cat) => {
                const isSelected = form.category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => form.handleCategorySelect(cat.id)}
                    className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-primary text-white shadow-md shadow-primary/30 border border-primary font-bold'
                        : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
            {/* Card 2: 2-Column Split Card for Target Time & Duration */}
        <div className="rounded-3xl p-5 grid grid-cols-2 divide-x divide-slate-200 gap-4 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
          {/* Target Time Column */}
          <div 
            onClick={form.handleOpenTimePicker}
            role="button"
            tabIndex={0}
            data-testid="routine-time-tile"
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); form.handleOpenTimePicker(); } }}
            aria-label={`Target time: ${form.time}. Tap to edit`}
            className="flex flex-col justify-between cursor-pointer group hover:opacity-95 transition-all select-none"
          >
            <div className="flex items-center justify-between text-primary text-xs font-semibold">
              <span>{t('routines.targetTime', 'TARGET TIME')}</span>
              <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">schedule</span>
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">{form.timeParts.num}</span>
              <span className="text-sm text-primary font-semibold">{form.timeParts.mod}</span>
            </div>
            <span className="text-xs text-slate-500 mt-1 line-clamp-1 group-hover:text-slate-700">
              {form.scheduleSubtitle}
            </span>
          </div>
          
          {/* Duration Column */}
          <div className="flex flex-col justify-between pl-4">
            <div className="flex items-center justify-between text-amber-600 text-xs font-semibold">
              <span>{t('routines.durationUpper', 'DURATION')}</span>
              <span className="material-symbols-outlined text-[18px]">timelapse</span>
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">{form.duration}</span>
              <span className="text-sm text-slate-500 font-medium">{t('common.minutesShort', 'min')}</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 mt-2">
              {[15, 25, 45, 60].map((mins) => {
                const isSelected = form.duration === mins;
                return (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => form.handleDurationSelect(mins)}
                    className={`rounded-full py-1 text-xs font-medium text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-primary text-white shadow-md shadow-primary/30 border border-primary font-bold'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    {mins}m
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => {
                form.setCustomDurationInput(String(form.duration || 25));
                form.setIsCustomDurationOpen(true);
              }}
              className={`mt-1.5 w-full py-1 rounded-full text-[11px] font-semibold text-center transition-all cursor-pointer ${
                ![15, 25, 45, 60].includes(form.duration)
                  ? 'bg-primary/10 text-primary border border-primary/30'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-800 border border-slate-200'
              }`}
            >
              {![15, 25, 45, 60].includes(form.duration) ? `${t('common.custom', 'Custom')} (${form.duration}m)` : t('common.custom', 'Custom')}
            </button>
          </div>
        </div>
            {/* Card 3: Cadence & Repeat Container */}
        <div className="rounded-3xl p-5 space-y-4 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
          <div className="flex items-center justify-between">
            <label className="font-medium text-slate-800 text-sm">{t('routines.cadenceRepeat', 'Cadence & Repeat')}</label>
            <span className="text-xs text-primary font-semibold">
              {t('routines.activeDaysPerWeek', { count: form.weekdays.length })}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200 shadow-inner">
            {['Every Day', 'Mon–Fri', 'Custom Days'].map((preset) => {
              const isSelected = form.frequency === preset;
              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => form.handleFrequencyPreset(preset)}
                  className={`py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white text-primary font-bold shadow-sm border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  {preset === 'Every Day' ? t('routines.everyDay', 'Every Day') : preset === 'Mon–Fri' ? t('routines.monFri', 'Mon–Fri') : t('routines.customDays', 'Custom Days')}
                </button>
              );
            })}
          </div>

          {/* 7 Circular Weekday Selection Buttons */}
          <div className="flex items-center justify-between w-full mt-3 px-1">
            {WEEKDAY_TOKENS.map((token, dayIdx) => {
              const isSelected = form.weekdays.includes(dayIdx);
              const singleLetter = token[0];
              return (
                <button
                  key={token}
                  type="button"
                  aria-label={`${token} (${isSelected ? 'active' : 'inactive'})`}
                  onClick={() => form.handleToggleWeekday(dayIdx)}
                  className={`w-9 h-9 rounded-full flex flex-col items-center justify-center font-medium text-xs transition-all cursor-pointer active:scale-95 ${
                    isSelected
                      ? 'bg-primary text-white shadow-md shadow-primary/30 font-bold'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span className="leading-none">{singleLetter}</span>
                  {isSelected && (
                    <Check className="w-2.5 h-2.5 stroke-[3] leading-none mt-0.5 text-white" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
          </div>

          {/* ── RIGHT COLUMN (Cols 8-12 on Desktop): Alerts, Notes, Streak, Actions ── */}
          <div className="w-full lg:col-span-5 flex flex-col gap-5">
            {/* Card 4: Alert & Awareness */}
        <div className="rounded-3xl p-5 space-y-4 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
          <div className="flex items-center justify-between">
            <label className="font-medium text-slate-800 text-sm">{t('routines.alertAwareness', 'Alert & Awareness')}</label>
            <span className="text-xs text-amber-600 flex items-center gap-1 font-medium">
              <span className={`w-1.5 h-1.5 rounded-full ${form.reminderEnabled ? 'bg-amber-500 animate-pulse' : 'bg-slate-400'}`}></span>
              {form.reminderEnabled ? form.reminderSound : t('routines.remindersMuted', 'Reminders Muted')}
            </span>
          </div>

          {/* Gentle Reminders Toggle */}
          <div className="rounded-2xl p-4 flex items-center justify-between bg-white/80 backdrop-blur-xl border border-white/50 shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                form.reminderEnabled 
                  ? 'bg-amber-50 border border-amber-200 text-amber-600 shadow-sm'
                  : 'bg-slate-100 border border-slate-200 text-slate-400'
              }`}>
                <span className="material-symbols-outlined text-[20px]">notifications_active</span>
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">{t('tasks.gentleReminders', 'Gentle Reminders')}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {form.reminderEnabled ? t('routines.notifyBeforeCommences', 'Notify before routine commences') : t('routines.remindersMuted', 'Reminders currently muted')}
                </p>
              </div>
            </div>
            <button 
              type="button"
              role="switch"
              aria-checked={form.reminderEnabled}
              aria-label={t('tasks.toggleGentleReminders', 'Toggle gentle reminders')}
              onClick={form.handleReminderToggle}
              className={`w-12 h-6 rounded-full relative p-0.5 transition-colors shadow-inner flex items-center cursor-pointer ${
                form.reminderEnabled ? 'bg-emerald-500 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <span className="w-5 h-5 bg-white rounded-full shadow-md"></span>
            </button>
          </div>

          {/* Timing & Sound Selectors */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            {/* Notify Timing */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-slate-600 pl-1">{t('routines.notifyTiming', 'Notify Timing')}</span>
              <button 
                type="button"
                disabled={!form.reminderEnabled}
                onClick={() => form.setIsNotifyTimingPickerOpen(true)}
                className={`text-slate-800 rounded-2xl px-4 py-3 flex items-center justify-between text-sm bg-white border border-slate-200 shadow-sm text-left transition-all ${
                  form.reminderEnabled ? 'hover:bg-slate-50 cursor-pointer' : 'opacity-40 cursor-not-allowed'
                }`}
              >
                <span className="flex items-center gap-1.5 truncate">
                  <span className="material-symbols-outlined text-[16px] text-primary shrink-0">schedule</span>
                  <span className="truncate">
                    {form.reminderOffset === 0 ? t('routines.atStart', 'At start') : `${form.reminderOffset} ${t('routines.minsBefore', 'm before')}`}
                  </span>
                </span>
                <span className="material-symbols-outlined text-[18px] text-slate-400 shrink-0">expand_more</span>
              </button>
            </div>

            {/* Auditory Cue */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-slate-600 pl-1">{t('tasks.auditoryCue', 'Auditory Cue')}</span>
              <button 
                type="button"
                disabled={!form.reminderEnabled}
                onClick={() => form.setIsSoundPickerOpen(true)}
                className={`text-slate-800 rounded-2xl px-4 py-3 flex items-center justify-between text-sm bg-white border border-slate-200 shadow-sm text-left transition-all ${
                  form.reminderEnabled ? 'hover:bg-slate-50 cursor-pointer' : 'opacity-40 cursor-not-allowed'
                }`}
              >
                <span className="flex items-center gap-1.5 truncate">
                  <span className="material-symbols-outlined text-[16px] text-primary shrink-0">music_note</span>
                  <span className="truncate">{form.reminderSound}</span>
                </span>
                <span className="material-symbols-outlined text-[18px] text-slate-400 shrink-0">expand_more</span>
              </button>
            </div>
          </div>
        </div>
            {/* Card 5: Mindful Intent & Notes */}
        <div className="rounded-3xl p-5 space-y-3 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
          <div className="flex items-center justify-between">
            <label className="font-medium text-slate-800 text-sm" htmlFor="routine-notes">
              {t('routines.mindfulIntentNotes', 'Mindful Intent & Notes')}
            </label>
            <span className="text-xs text-slate-400 font-medium">{t('common.optional', 'Optional')}</span>
          </div>
          <div className="relative">
            <textarea 
              id="routine-notes"
              rows="3" 
              value={form.notes}
              onChange={(e) => form.handleNotesChange(e.target.value)}
              placeholder={t('routines.mindfulNotesPlaceholder', 'Optional notes or reflection goals...')}
              className="bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-2xl p-4 w-full focus:outline-none focus:shadow-[0_0_0_2px_rgba(99,102,241,0.4)] shadow-inner min-h-[100px] resize-none text-sm transition-all pb-8"
            />
            <div className="absolute bottom-3 right-4 flex items-center text-xs font-medium pointer-events-none">
              <span className={form.notes.length > 200 ? 'text-amber-600 font-bold' : 'text-slate-400'}>
                {form.notes.length}/200
              </span>
            </div>
          </div>
        </div>
            {/* Card 6: Streak Protected Widget (Real data only) */}
        <div className="rounded-2xl p-4 mb-4 flex items-center justify-between bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex flex-col min-w-0">
              <p className="font-semibold text-slate-800 text-sm truncate">{form.streakStats.headline}</p>
              <p className="text-xs text-slate-500 mt-0.5 truncate">{form.streakStats.description}</p>
            </div>
          </div>
          <span className="text-base font-bold text-emerald-600 shrink-0 pl-3">
            {form.streakStats.streakBadge}
          </span>
        </div>
            <div className="rounded-3xl p-5 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
              {/* Bottom Action Buttons */}
        <div className="space-y-3 pt-2">
          <button 
            type="button"
            disabled={form.isSubmitting}
            onClick={form.handleSave} 
            className="btn-primary w-full flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <span>{form.isSubmitting ? t('common.loading', 'Saving...') : (form.isEditing ? t('routines.updateRoutine', 'Update Routine') : t('routines.saveChanges', 'Save Routine Changes'))}</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
          <div className={`grid ${form.isEditing ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
            <button 
              type="button"
              onClick={form.handleCancel} 
              className="btn-secondary w-full cursor-pointer hover:bg-slate-100"
            >
              {t('common.cancel', 'Cancel')}
            </button>
            {form.isEditing && (
              <button 
                type="button"
                onClick={form.handleDelete} 
                className="btn-danger w-full flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">delete_outline</span>
                <span>{t('routines.deleteRoutine', 'Delete Routine')}</span>
              </button>
            )}
          </div>
        </div>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL 1: Smart Suggest Drawer */}
      {form.isSuggestOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-md p-4 animate-fadeIn"
        >
          <div className="w-full max-w-md max-h-[85vh] rounded-3xl bg-white border border-slate-200 shadow-2xl flex flex-col overflow-hidden">
            <div className="px-5 pt-5 pb-3 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-slate-900 text-base">{t('routines.smartSuggestions', 'Smart Routine Suggestions')}</h3>
              </div>
              <button 
                type="button"
                onClick={() => form.setIsSuggestOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                aria-label={t('common.close', 'Close')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category tabs */}
            <div className="flex items-center gap-2 px-5 py-3 overflow-x-auto no-scrollbar border-b border-slate-100 bg-slate-50">
              {['All', ...ROUTINE_CATEGORIES.map((c) => c.name)].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSuggestCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    suggestCategory === cat 
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat === 'All' ? t('common.all', 'All') : cat}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
              {filteredSuggestions.map((sug) => (
                <div
                  key={sug.id}
                  onClick={() => form.handleApplySuggestion(sug)}
                  className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-primary/50 transition-all cursor-pointer group flex items-start justify-between gap-3"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 truncate group-hover:text-primary transition-colors">
                        {sug.title}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-200 text-slate-700">
                        {sug.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2">{sug.notes}</p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                      <span>{sug.time}</span>
                      <span>•</span>
                      <span>{sug.duration}m</span>
                      <span>•</span>
                      <span>{sug.frequency}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-primary shrink-0 mt-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Target Time Picker */}
      <MomentumTimePicker
        isOpen={form.isTimePickerOpen}
        onClose={() => form.setIsTimePickerOpen(false)}
        value={form.time}
        onSelect={(newTime) => {
          form.setTime(newTime);
          form.setIsDirty(true);
        }}
        title={t('routines.selectTargetTime', 'Select Target Time')}
      />

      {/* MODAL 3: Custom Duration */}
      {form.isCustomDurationOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-md p-4 animate-fadeIn"
        >
          <div className="w-full max-w-xs rounded-3xl bg-white border border-slate-200 shadow-2xl p-5 space-y-4">
            <h3 className="font-bold text-slate-900 text-base">{t('routines.customDuration', 'Custom Duration')}</h3>
            <div>
              <label className="text-xs text-slate-600 block mb-1.5">{t('routines.minutesRange', 'Minutes (1 - 360)')}</label>
              <input
                type="number"
                min="1"
                max="360"
                value={form.customDurationInput}
                onChange={(e) => form.setCustomDurationInput(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-bold text-center text-lg focus:outline-none focus:border-primary"
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => form.setIsCustomDurationOpen(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                {t('common.cancel', 'Cancel')}
              </button>
              <button 
                type="button"
                onClick={form.handleApplyCustomDuration}
                className="px-4 py-1.5 rounded-lg text-xs font-bold bg-primary text-white cursor-pointer"
              >
                {t('common.apply', 'Apply')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Notify Timing Picker */}
      {form.isNotifyTimingPickerOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-md p-4 animate-fadeIn"
        >
          <div className="w-full max-w-xs rounded-3xl bg-white border border-slate-200 shadow-2xl p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">{t('routines.notifyTiming', 'Notify Timing')}</h3>
              <button 
                type="button"
                onClick={() => form.setIsNotifyTimingPickerOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1.5">
              {[
                { offset: 0, labelKey: 'routines.atStart', defaultLabel: 'At start' },
                { offset: 5, labelKey: 'routines.mins5Before', defaultLabel: '5 minutes before' },
                { offset: 10, labelKey: 'routines.mins10Before', defaultLabel: '10 minutes before' },
                { offset: 15, labelKey: 'routines.mins15Before', defaultLabel: '15 minutes before' },
                { offset: 30, labelKey: 'routines.mins30Before', defaultLabel: '30 minutes before' },
              ].map(({ offset, labelKey, defaultLabel }) => {
                const isSelected = form.reminderOffset === offset;
                return (
                  <button
                    key={offset}
                    type="button"
                    onClick={() => form.handleReminderOffsetSelect(offset)}
                    className={`w-full p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{t(labelKey, defaultLabel)}</span>
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: Auditory Cue */}
      {form.isSoundPickerOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-md p-4 animate-fadeIn"
        >
          <div className="w-full max-w-sm rounded-3xl bg-white border border-slate-200 shadow-2xl p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">{t('tasks.auditoryCue', 'Auditory Cue')}</h3>
              <button 
                type="button"
                onClick={() => form.setIsSoundPickerOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              {SOUND_OPTIONS.map((snd) => {
                const isSelected = form.reminderSound === snd.id;
                return (
                  <div
                    key={snd.id}
                    className={`p-3 rounded-2xl flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-primary/10 border border-primary/30 text-primary'
                        : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div 
                      onClick={() => form.handleSoundSelect(snd.id)} 
                      className="flex-1 cursor-pointer"
                    >
                      <p className="font-bold text-xs">{snd.name}</p>
                      <p className="text-[11px] text-slate-500">{snd.description}</p>
                    </div>
                    {snd.id !== 'Silent' && (
                      <button
                        type="button"
                        aria-label={`Preview ${snd.name}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          playRoutineSound(snd.id);
                        }}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-primary transition-colors cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </>
  );
}