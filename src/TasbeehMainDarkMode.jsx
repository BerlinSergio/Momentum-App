import React from 'react';

import { 
  Sparkles, History, Settings, Volume2, MoreVertical, Repeat, Award, Flag, RotateCcw, Undo2, Pointer, Edit2, PlusCircle, Clock, Lightbulb, Home, Wallet, Plus, CheckSquare, MoreHorizontal, ArrowLeft 
} from 'lucide-react';

export default function TasbeehMainDarkMode({ setActiveTab }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between select-none">
      <div className="flex-1 overflow-y-auto pb-28">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 pt-6 pb-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-base font-bold text-white tracking-tight">Digital Tasbeeh</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full text-slate-300 hover:bg-slate-800 transition-colors">
              <History className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full text-slate-300 hover:bg-slate-800 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
              A
            </div>
          </div>
        </div>

        {/* Current Dhikr Card */}
        <div className="block mx-5 my-3 p-5 rounded-3xl space-y-3 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-900/50 border border-indigo-700/80 text-indigo-300">
                <Sparkles className="w-3 h-3 text-indigo-400" />CURRENT DHIKR
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-800 border border-slate-700 text-slate-300">
                Spiritual Focus
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400">
                <Volume2 className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="text-center py-1 space-y-1">
            <h2 style={{ fontFamily: 'ArabQuranIslamic, serif' }} className="text-2xl font-bold font-quran text-white" dir="rtl">سُبْحَانَ اللَّهِ وَبِحَمْدِهِ</h2>
            <p className="text-sm font-semibold text-slate-200">SubhanAllah wa bi-Hamdih</p>
            <p className="text-xs font-normal italic text-slate-400">“Glory be to Allah and Praise Him”</p>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
            <button className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5">
              <Repeat className="w-3.5 h-3.5" />Change Phrase
            </button>
            <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>Round <strong className="text-slate-200 font-bold">1</strong> of 3
            </span>
          </div>
        </div>

        {/* Daily Dedication / Goal Pill Card */}
        <div className="block mx-5 mb-4 p-3.5 rounded-2xl flex items-center justify-between bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-violet-900/40 text-violet-400 flex items-center justify-center flex-shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Daily Dedication</span>
              <span className="text-xs font-bold text-white"><strong className="text-sm font-bold">428</strong> counts</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-teal-400 flex items-center gap-1 justify-end">
              <Flag className="w-3.5 h-3.5" />
              Goal 1,000
            </span>
            <span className="text-[10px] font-medium text-slate-400">43% completed</span>
          </div>
        </div>

        {/* Center Circular Counter Hero Section */}
        <div className="block mx-5 mb-5 p-6 rounded-3xl flex flex-col items-center space-y-4 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
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
                strokeDashoffset="48"
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-300"
              />
              <defs>
                <linearGradient id="counterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="100%" stopColor="#0d9488" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                COUNTER
              </span>
              <span className="text-5xl font-extrabold text-white tracking-tight my-0.5">
                27
              </span>
              <span className="text-xs font-medium text-slate-400">
                of <strong className="text-indigo-400 font-bold">33</strong> Target
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 pt-1 text-xs font-semibold text-slate-400">
            <button className="flex items-center gap-1.5 hover:text-white transition-colors">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
            <span className="flex items-center gap-1.5 text-teal-400">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
              <span>Haptics: Soft</span>
            </span>
            <button className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Undo2 className="w-3.5 h-3.5" />
              <span>Undo</span>
            </button>
          </div>

          <button className="w-full py-5 px-6 rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-teal-600 hover:from-indigo-700 hover:to-teal-700 text-white shadow-xl shadow-black/60 flex items-center justify-center gap-3 transition-all active:scale-[0.98] select-none mt-4">
            <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Pointer className="w-5 h-5 text-white stroke-[2.2]" />
            </div>
            <div className="text-left">
              <span className="text-sm font-bold tracking-wide uppercase block">TAP TO COUNT</span>
              <span className="text-[10px] font-normal text-white/80 block">Thumb-friendly tactile touch</span>
            </div>
          </button>
        </div>

        {/* Target Selector Row */}
        <div className="block mx-5 mb-4 p-4 rounded-3xl space-y-2.5 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Select Target</span>
            <button className="text-xs font-semibold text-indigo-400 hover:text-indigo-300">Standard Tasbeeh</button>
          </div>
          <div className="grid grid-cols-5 gap-2">
            <button className="py-2 rounded-2xl bg-indigo-600 text-white text-xs font-bold shadow-sm">33</button>
            <button className="py-2 rounded-2xl bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 text-xs font-semibold">99</button>
            <button className="py-2 rounded-2xl bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 text-xs font-semibold">100</button>
            <button className="py-2 rounded-2xl bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 text-xs font-semibold">1000</button>
            <button className="py-2 rounded-2xl bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 text-xs font-semibold flex items-center justify-center"><Edit2 className="w-3.5 h-3.5" /></button>
          </div>
        </div>

        {/* 3-Action Quick Grid */}
        <div className="grid grid-cols-3 gap-2.5 mx-5 mb-4">
          <button className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80 text-slate-200 hover:bg-slate-800 shadow-sm flex flex-col items-center justify-center gap-1.5 transition-colors">
            <RotateCcw className="w-4 h-4 text-indigo-400" />
            <span className="text-[11px] font-semibold">Reset Count</span>
          </button>
          <button className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80 text-slate-200 hover:bg-slate-800 shadow-sm flex flex-col items-center justify-center gap-1.5 transition-colors">
            <PlusCircle className="w-4 h-4 text-indigo-400" />
            <span className="text-[11px] font-semibold">New Phrase</span>
          </button>
          <button className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80 text-slate-200 hover:bg-slate-800 shadow-sm flex flex-col items-center justify-center gap-1.5 transition-colors">
            <Clock className="w-4 h-4 text-indigo-400" />
            <span className="text-[11px] font-semibold">View Log</span>
          </button>
        </div>

        {/* Mindful Consistency Hadith Card */}
        <div className="block mx-5 p-4 rounded-3xl flex items-start gap-3 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
          <div className="w-8 h-8 rounded-xl bg-slate-800 text-teal-400 flex items-center justify-center flex-shrink-0 shadow-sm">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-200">Mindful Consistency</h4>
            <p className="text-[11px] font-medium text-slate-300 italic mt-0.5 leading-relaxed">“The deeds most loved by Allah are those done regularly, even if small.” (Sahih al-Bukhari)</p>
          </div>
        </div>
      </div>

      {/* Floating Navigation Dock */}
      <div className="fixed bottom-0 w-full z-50 pointer-events-none pb-5">
        <div className="px-5">
          <nav className="pointer-events-auto w-full h-[68px] rounded-3xl bg-slate-900/85 backdrop-blur-3xl shadow-[0_16px_40px_rgba(0,0,0,0.4)] border border-slate-800 flex items-center justify-between px-2 relative">
            <a aria-current="page" className="flex flex-col items-center justify-center flex-1 h-full transition-all gap-0.5 text-indigo-400 font-semibold" href="#">
              <div className="w-9 h-7 flex items-center justify-center rounded-full">
                <Home className="w-5 h-5" />
              </div>
              <span className="text-[10px]">Home</span>
            </a>
            <a className="flex flex-col items-center justify-center flex-1 h-full text-slate-400 hover:text-slate-300 transition-all gap-0.5" href="#">
              <div className="w-9 h-7 flex items-center justify-center rounded-full">
                <Wallet className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium">Finance</span>
            </a>
            <div className="flex flex-col items-center justify-center flex-1 h-full relative">
              <a aria-label="Record Dhikr" className="absolute -top-5 w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 via-violet-600 to-teal-500 flex items-center justify-center text-white shadow-[0_10px_24px_-2px_rgba(99,102,241,0.45)] hover:scale-105 active:scale-95 transition-transform ring-4 ring-slate-950/80" href="#">
                <Plus className="w-7 h-7" />
              </a>
            </div>
            <a className="flex flex-col items-center justify-center flex-1 h-full text-slate-400 hover:text-slate-300 transition-all gap-0.5" href="#">
              <div className="w-9 h-7 flex items-center justify-center rounded-full">
                <CheckSquare className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium">Tasks</span>
            </a>
            <a className="flex flex-col items-center justify-center flex-1 h-full text-slate-400 hover:text-slate-300 transition-all gap-0.5" href="#">
              <div className="w-9 h-7 flex items-center justify-center rounded-full">
                <MoreHorizontal className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium">More</span>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
