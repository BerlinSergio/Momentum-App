import React, { useState } from 'react';
import UserAvatar from './components/UserAvatar';
import { useTasbeehStore } from './store/useTasbeehStore';
import { 
  ArrowLeft, RotateCcw, BookOpen, Sparkles, Minus, Plus, Flag, Bell, ArrowRight, X, Trash2 
} from 'lucide-react';

export default function NewEditTasbeehDarkMode({ setActiveTab, goBack }) {
  const { activePreset, updateActivePreset, reset } = useTasbeehStore();

  const [title, setTitle] = useState(activePreset?.transliteration || 'Astaghfirullah wa Atubu Ilayh');
  const [arabic, setArabic] = useState(activePreset?.arabic || 'أَسْتَغْفِرُ اللهَ وَأَتُوبُ إِلَيْهِ');
  const [meaning, setMeaning] = useState(activePreset?.meaning || 'I seek forgiveness of Allah and repent to Him.');
  const [targetCount, setTargetCount] = useState(Number(activePreset?.target) || 100);
  const [dailyGoalEnabled, setDailyGoalEnabled] = useState(true);
  const [goalType, setGoalType] = useState('daily');
  const [reminderEnabled, setReminderEnabled] = useState(true);

  const SUGGESTIONS = [
    { title: 'SubhanAllah', arabic: 'سُبْحَانَ ٱللَّٰهِ', meaning: 'Glory be to Allah', target: 33 },
    { title: 'Alhamdulillah', arabic: 'ٱلْحَمْدُ لِلَّٰهِ', meaning: 'All praise is for Allah', target: 33 },
    { title: 'Allahu Akbar', arabic: 'ٱللَّٰهُ أَكْبَرُ', meaning: 'Allah is the Greatest', target: 34 },
    { title: 'La Ilaha Illallah', arabic: 'لَا إِلَٰهَ إِلَّا ٱللَّٰهُ', meaning: 'There is no god but Allah', target: 100 },
  ];

  const handleApplySuggestion = (sug) => {
    setTitle(sug.title);
    setArabic(sug.arabic);
    setMeaning(sug.meaning);
    setTargetCount(sug.target);
  };

  const handleResetDefaults = () => {
    setTitle('Astaghfirullah wa Atubu Ilayh');
    setArabic('أَسْتَغْفِرُ اللهَ وَأَتُوبُ إِلَيْهِ');
    setMeaning('I seek forgiveness of Allah and repent to Him.');
    setTargetCount(100);
  };

  const handleSave = () => {
    updateActivePreset({
      transliteration: title.trim() || 'Dhikr',
      arabic: arabic.trim(),
      meaning: meaning.trim(),
      target: Number(targetCount) || 33,
    });
    if (setActiveTab) setActiveTab('tasbeeh_main_dark_mode');
  };

  const handleCancel = () => {
    if (goBack) goBack('tasbeeh_main_dark_mode');
    else if (setActiveTab) setActiveTab('tasbeeh_main_dark_mode');
  };

  const handleDelete = () => {
    if (window.confirm('Reset this Dhikr preset back to Subhanallah (33)?')) {
      updateActivePreset({
        id: 'p1',
        arabic: 'سُبْحَانَ ٱللَّٰهِ',
        transliteration: 'Subhanallah',
        meaning: 'Glory be to Allah',
        target: 33,
      });
      reset();
      if (setActiveTab) setActiveTab('tasbeeh_main_dark_mode');
    }
  };

  const handleCustomTarget = () => {
    const custom = window.prompt('Enter custom target bead count:', String(targetCount));
    if (custom !== null) {
      const num = parseInt(custom, 10);
      if (!isNaN(num) && num > 0) {
        setTargetCount(num);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] font-sans pb-10 select-none text-white">
      {/* TOP HEADER */}
      <div className="sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-white tracking-tight">
            New Dhikr
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={handleCancel}
            className="p-2 rounded-full text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer select-none"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <UserAvatar 
            setActiveTab={setActiveTab} 
          />
        </div>
      </div>

      {/* Sub-bar */}
      <div className="flex flex-row items-center justify-between w-full px-5 pt-2 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-9 inline-flex items-center justify-center gap-1.5 px-3.5 rounded-full text-xs font-bold bg-primary/15 border border-primary/30 text-primary shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            NEW DHIKR
          </span>
          <span className="text-xs font-medium text-slate-400">Custom Counter</span>
        </div>
        <button 
          type="button"
          onClick={handleResetDefaults}
          className="h-9 px-3 rounded-full flex items-center justify-center gap-1.5 text-xs font-semibold bg-slate-800/80 border border-slate-700/80 text-slate-300 hover:text-primary hover:bg-slate-700/80 transition-colors shadow-sm active:scale-95 cursor-pointer select-none"
        >
          <RotateCcw className="w-3.5 h-3.5"/>
          <span>Reset</span>
        </button>
      </div>

      {/* DHIKR TITLE & ENHANCED ARABIC SCRIPT BOX */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
              Dhikr Title <span className="text-primary">*</span>
            </label>
            <span className="text-[11px] font-normal text-slate-500">Primary Name</span>
          </div>
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-transparent text-sm font-semibold text-white w-full focus:outline-none" 
              placeholder="e.g. Astaghfirullah wa Atubu Ilayh"
            />
            <BookOpen className="w-4 h-4 text-primary flex-shrink-0 ml-2" />
          </div>
        </div>

        {/* Elegant Arabic Script Preview Box (Dark Mode) */}
        <div className="relative overflow-hidden rounded-2xl p-6 text-center bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
          
          {/* Symmetrical Islamic Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent pointer-events-none"></div>

          {/* Refined Islamic Geometric Arabesque / Star Watermark (Properly Centered & Scaled) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.07] pointer-events-none">
            <svg 
              className="w-48 h-48 text-primary" 
              viewBox="0 0 200 200" 
              fill="currentColor"
            >
              {/* 8-Point Islamic Star Motif */}
              <g transform="translate(100, 100)">
                <rect x="-45" y="-45" width="90" height="90" rx="6" fill="currentColor" />
                <rect x="-45" y="-45" width="90" height="90" rx="6" transform="rotate(45)" fill="currentColor" />
                <circle cx="0" cy="0" r="32" fill="none" stroke="currentColor" strokeWidth="4" className="text-slate-900" />
                <circle cx="0" cy="0" r="48" fill="none" stroke="currentColor" strokeWidth="2" />
                {/* Radiating Accent Petals */}
                <path d="M0 -75 L10 -55 L-10 -55 Z" />
                <path d="M0 75 L10 55 L-10 55 Z" />
                <path d="M-75 0 L-55 10 L-55 -10 Z" />
                <path d="M75 0 L55 10 L55 -10 Z" />
                <path d="M53 -53 L45 -35 L35 -45 Z" />
                <path d="M-53 -53 L-45 -35 L-35 -45 Z" />
                <path d="M53 53 L45 35 L35 45 Z" />
                <path d="M-53 53 L-45 35 L-35 45 Z" />
              </g>
            </svg>
          </div>

          {/* Subtle Ornamental Inner Border Accent */}
          <div className="absolute inset-2 rounded-xl border border-dashed border-primary/30 pointer-events-none"></div>

          {/* Content Layer */}
          <div className="relative z-10 space-y-2">
            <span className="inline-block px-3 py-0.5 rounded-full text-[10px] font-bold tracking-wider text-primary bg-primary/20 border border-primary/50 shadow-2xs uppercase">
              PREVIEW (SCRIPT)
            </span>

            <h3 
              className="text-2xl sm:text-3xl font-bold text-primary/70 font-quran leading-relaxed py-2 select-all tracking-wide"
              dir="rtl"
            >
              {arabic}
            </h3>
          </div>
        </div>

        {/* Preset Suggestions Carousel */}
        <div className="pt-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-primary"/>
              Preset Suggestions
            </span>
            <span className="text-[10px] text-slate-500 font-normal">Tap to fill</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            {SUGGESTIONS.map((sug) => {
              const isActive = title === sug.title;
              return (
                <button 
                  key={sug.title}
                  type="button"
                  onClick={() => handleApplySuggestion(sug)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer select-none ${
                    isActive 
                      ? 'bg-primary/15 text-primary border border-primary/30 shadow-2xs' 
                      : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 font-medium'
                  }`}
                >
                  {sug.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* TRANSLITERATION & MEANING CARD */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-2 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300">Transliteration & Meaning</label>
          <span className="text-[11px] font-normal text-slate-500">Optional</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
          <input 
            type="text"
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
            placeholder="Meaning of this dhikr..."
            className="bg-transparent text-xs font-normal text-slate-300 leading-relaxed w-full focus:outline-none"
          />
        </div>
      </div>

      {/* TARGET COUNT & STEPPER CARD */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300">Target Count</span>
          <span className="text-xs font-bold text-primary">{targetCount} cycles</span>
        </div>
        
        {/* 6 Presets Grid */}
        <div className="grid grid-cols-6 gap-1.5">
          {[33, 99, 100, 500, 1000].map((num) => (
            <button 
              key={num}
              type="button"
              onClick={() => setTargetCount(num)}
              className={`py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none ${
                targetCount === num 
                  ? 'bg-primary text-white font-bold shadow-sm shadow-primary/30' 
                  : 'bg-slate-800 border border-slate-700/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {num}
            </button>
          ))}
          <button 
            type="button"
            onClick={handleCustomTarget}
            className={`py-2 rounded-xl text-[11px] font-semibold transition-all cursor-pointer select-none ${
              ![33, 99, 100, 500, 1000].includes(targetCount)
                ? 'bg-primary text-white font-bold shadow-sm shadow-primary/30'
                : 'bg-slate-800 border border-slate-700/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Custom
          </button>
        </div>

        {/* Stepper Block */}
        <div className="p-4 rounded-2xl flex items-center justify-between bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
          <button 
            type="button"
            onClick={() => setTargetCount((prev) => Math.max(1, prev - 1))}
            className="w-10 h-10 rounded-full bg-slate-700 border border-slate-600 text-white font-bold flex items-center justify-center shadow-xs hover:bg-slate-600 transition-colors cursor-pointer select-none active:scale-95"
          >
            <Minus className="w-4 h-4"/>
          </button>
          <div className="text-center">
            <h4 className="text-3xl font-bold text-primary">{targetCount}</h4>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mt-0.5">Beads Count</span>
          </div>
          <button 
            type="button"
            onClick={() => setTargetCount((prev) => prev + 1)}
            className="w-10 h-10 rounded-full bg-slate-700 border border-slate-600 text-white font-bold flex items-center justify-center shadow-xs hover:bg-slate-600 transition-colors cursor-pointer select-none active:scale-95"
          >
            <Plus className="w-4 h-4"/>
          </button>
        </div>
      </div>

      {/* DAILY GOAL & REMINDER CARD */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
        {/* Daily Goal Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
              <Flag className="w-4 h-4 text-primary"/>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Daily Goal</span>
              <span className="text-[11px] font-normal text-slate-400">Track towards daily momentum ring</span>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={dailyGoalEnabled} 
              onChange={() => setDailyGoalEnabled(!dailyGoalEnabled)} 
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-300 after:border-slate-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary peer-checked:after:bg-white"></div>
          </label>
        </div>

        <div className="flex items-center gap-2 p-1 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
          <button 
            type="button"
            onClick={() => setGoalType('daily')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer select-none ${
              goalType === 'daily' ? 'bg-slate-700 shadow-sm text-primary font-semibold' : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            Daily Practice
          </button>
          <button 
            type="button"
            onClick={() => setGoalType('occasions')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer select-none ${
              goalType === 'occasions' ? 'bg-slate-700 shadow-sm text-primary font-semibold' : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            Specific Occasions
          </button>
        </div>

        <div className="w-full h-px bg-white/10 my-2"></div>

        {/* Reminder Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-violet-900/30 flex items-center justify-center">
              <Bell className="w-4 h-4 text-violet-400"/>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Reminder Notice</span>
              <span className="text-[11px] font-normal text-slate-400">Gentle prompt before evening</span>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={reminderEnabled} 
              onChange={() => setReminderEnabled(!reminderEnabled)} 
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-300 after:border-slate-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600 peer-checked:after:bg-white"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
          <span className="text-xs font-semibold text-slate-400">Preferred Window</span>
          <span className="text-xs font-bold text-white">After Asr (5:15 PM)</span>
        </div>
      </div>

      {/* STANDARDIZED BOTTOM ACTION BUTTONS */}
      <div className="px-5 pb-10 space-y-3">
        {/* Primary Save Button */}
        <button 
          type="button"
          onClick={handleSave}
          className="btn-primary w-full h-12 rounded-2xl flex items-center justify-center gap-2 cursor-pointer select-none"
        >
          <span>Save Tasbeeh</span>
          <ArrowRight className="w-4 h-4"/>
        </button>

        {/* Balanced Secondary Buttons Row */}
        <div className="flex flex-row items-center justify-between gap-3 w-full">
          <button 
            type="button"
            onClick={handleCancel}
            className="btn-secondary flex-1 h-12 rounded-2xl flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer select-none"
          >
            <X className="w-4 h-4 text-slate-400"/>
            <span>Cancel</span>
          </button>
          <button 
            type="button"
            onClick={handleDelete}
            className="btn-danger flex-1 h-12 rounded-2xl flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer select-none"
          >
            <Trash2 className="w-4 h-4 text-rose-400"/>
            <span>Delete Tasbeeh</span>
          </button>
        </div>
      </div>

    </div>
  );
}