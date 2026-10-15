import React from 'react';

import { 
  ArrowLeft, FolderArchive, RotateCcw, BookOpen, Sparkles, Minus, Plus, Flag, Bell, ArrowRight, X, Trash2 
} from 'lucide-react';

export default function NewEditTasbeehLightMode({ setActiveTab }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-10">
      {/* TOP HEADER */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-indigo-950 tracking-tight" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>
            New Dhikr
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveTab && setActiveTab('home_dashboard_light_mode')}
            className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            A
          </div>
        </div>
      </div>

      {/* Sub-bar */}
      <div className="flex items-center justify-between px-5 pt-2 pb-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 border border-indigo-200/80 text-indigo-950" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
            NEW DHIKR
          </span>
          <span className="text-xs font-medium text-slate-800" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>Custom Counter</span>
        </div>
        <button className="p-1.5 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-slate-100 transition-colors">
          <RotateCcw className="w-4 h-4"/>
        </button>
      </div>

      {/* DHIKR TITLE & ENHANCED ARABIC SCRIPT BOX */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              Dhikr Title <span className="text-indigo-600">*</span>
            </label>
            <span className="text-[11px] font-normal text-slate-400">Primary Name</span>
          </div>
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
            <input 
              type="text" 
              defaultValue="Astaghfirullah wa Atubu Ilayh" 
              className="bg-transparent text-sm font-semibold text-slate-900 w-full focus:outline-none" 
            />
            <BookOpen className="w-4 h-4 text-indigo-600 flex-shrink-0 ml-2" />
          </div>
        </div>

        {/* Elegant Arabic Script Preview Box (Light Mode) */}
        <div className="relative overflow-hidden rounded-2xl p-6 text-center bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          
          {/* Symmetrical Islamic Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-200/35 via-transparent to-transparent pointer-events-none"></div>

          {/* Refined Islamic Geometric Arabesque / Star Watermark (Properly Centered & Scaled) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.07] pointer-events-none">
            <svg 
              className="w-48 h-48 text-indigo-900" 
              viewBox="0 0 200 200" 
              fill="currentColor"
            >
              {/* 8-Point Islamic Star Motif */}
              <g transform="translate(100, 100)">
                <rect x="-45" y="-45" width="90" height="90" rx="6" fill="currentColor" />
                <rect x="-45" y="-45" width="90" height="90" rx="6" transform="rotate(45)" fill="currentColor" />
                <circle cx="0" cy="0" r="32" fill="none" stroke="currentColor" strokeWidth="4" className="text-white" />
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
          <div className="absolute inset-2 rounded-xl border border-dashed border-indigo-200/60 pointer-events-none"></div>

          {/* Content Layer */}
          <div className="relative z-10 space-y-2">
            <span className="inline-block px-3 py-0.5 rounded-full text-[10px] font-bold tracking-wider text-indigo-700 bg-white/90 border border-indigo-200/70 shadow-2xs uppercase">
              PREVIEW (SCRIPT)
            </span>

            <h3 
              className="text-2xl sm:text-3xl font-bold text-indigo-950 font-quran leading-relaxed py-2 select-all tracking-wide"
              dir="rtl"
            >
              أَسْتَغْفِرُ اللهَ وَأَتُوبُ إِلَيْهِ
            </h3>
          </div>
        </div>

        {/* Preset Suggestions Carousel */}
        <div className="pt-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600"/>
              Preset Suggestions
            </span>
            <span className="text-[10px] text-slate-400 font-normal">Tap to fill</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            <button className="px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold whitespace-nowrap hover:bg-indigo-100">
              SubhanAllah
            </button>
            <button className="px-3 py-1.5 rounded-xl bg-slate-50 text-slate-700 border border-slate-200 text-xs font-medium whitespace-nowrap hover:bg-slate-100">
              Alhamdulillah
            </button>
            <button className="px-3 py-1.5 rounded-xl bg-slate-50 text-slate-700 border border-slate-200 text-xs font-medium whitespace-nowrap hover:bg-slate-100">
              Allahu Akbar
            </button>
            <button className="px-3 py-1.5 rounded-xl bg-slate-50 text-slate-700 border border-slate-200 text-xs font-medium whitespace-nowrap hover:bg-slate-100">
              La Ilaha Illallah
            </button>
          </div>
        </div>
      </div>

      {/* TRANSLITERATION & MEANING CARD */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-2 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700">Transliteration & Meaning</label>
          <span className="text-[11px] font-normal text-slate-400">Optional</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <p className="text-xs font-normal text-slate-700 leading-relaxed">
            I seek forgiveness of Allah and repent to Him.
          </p>
        </div>
      </div>

      {/* TARGET COUNT & STEPPER CARD */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700">Target Count</span>
          <span className="text-xs font-bold text-indigo-600">100 cycles</span>
        </div>
        
        {/* 6 Presets Grid */}
        <div className="grid grid-cols-6 gap-1.5">
          <button className="py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700 hover:bg-slate-100">33</button>
          <button className="py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700 hover:bg-slate-100">99</button>
          <button className="py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-sm shadow-indigo-600/30">100</button>
          <button className="py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700 hover:bg-slate-100">500</button>
          <button className="py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700 hover:bg-slate-100">1000</button>
          <button className="py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] font-semibold text-slate-700 hover:bg-slate-100">Custom</button>
        </div>

        {/* Stepper Block */}
        <div className="p-4 rounded-2xl flex items-center justify-between bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <button className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 font-bold flex items-center justify-center shadow-xs hover:bg-slate-50 transition-colors">
            <Minus className="w-4 h-4"/>
          </button>
          <div className="text-center">
            <h4 className="text-3xl font-bold text-indigo-600">100</h4>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mt-0.5">Beads Count</span>
          </div>
          <button className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 font-bold flex items-center justify-center shadow-xs hover:bg-slate-50 transition-colors">
            <Plus className="w-4 h-4"/>
          </button>
        </div>
      </div>

      {/* DAILY GOAL & REMINDER CARD */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        {/* Daily Goal Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
              <Flag className="w-4 h-4 text-indigo-600"/>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-900">Daily Goal</span>
              <span className="text-[11px] font-normal text-slate-500">Track towards daily momentum ring</span>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        <div className="flex items-center gap-2 p-1 rounded-xl bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <button className="flex-1 py-1.5 rounded-lg bg-white shadow-sm text-xs font-semibold text-indigo-600">
            Daily Practice
          </button>
          <button className="flex-1 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-700">
            Specific Occasions
          </button>
        </div>

        <div className="w-full h-px bg-black/5 my-2"></div>

        {/* Reminder Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-violet-50 flex items-center justify-center">
              <Bell className="w-4 h-4 text-violet-600"/>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-900">Reminder Notice</span>
              <span className="text-[11px] font-normal text-slate-500">Gentle prompt before evening</span>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <span className="text-xs font-semibold text-slate-600">Preferred Window</span>
          <span className="text-xs font-bold text-slate-900">After Asr (5:15 PM)</span>
        </div>
      </div>

      {/* STANDARDIZED BOTTOM ACTION BUTTONS */}
      <div className="px-5 pb-10 space-y-3">
        {/* Primary Save Button */}
        <button className="btn-primary w-full">
          Save Tasbeeh
          <ArrowRight className="w-4 h-4"/>
        </button>

        {/* Balanced Secondary Buttons Row */}
        <div className="w-full flex items-center gap-3">
          <button className="btn-secondary flex-1">
            <X className="w-4 h-4 text-slate-500"/>
            Cancel
          </button>
          <button className="btn-danger flex-1">
            <Trash2 className="w-4 h-4 text-rose-500"/>
            Delete Tasbeeh
          </button>
        </div>
      </div>

    </div>
  );
}
