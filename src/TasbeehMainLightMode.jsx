import React from 'react';

import { 
  Sparkles, History, Settings, Volume2, MoreVertical, Repeat, Award, Flag, RotateCcw, Undo2, Pointer, Edit2, PlusCircle, Clock, Lightbulb, Home, Wallet, Plus, CheckSquare, MoreHorizontal, ArrowLeft 
} from 'lucide-react';

export default function TasbeehMainLightMode({ setActiveTab }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between select-none">
      <div className="flex-1 overflow-y-auto pb-28">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 pt-6 pb-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">Digital Tasbeeh</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors">
              <History className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
              A
            </div>
          </div>
        </div>

        {/* Current Dhikr Card */}
        <div className="block mx-5 my-3 p-5 rounded-3xl space-y-3 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-50 border border-indigo-200/80 text-indigo-700">
                <Sparkles className="w-3 h-3 text-indigo-600" />CURRENT DHIKR
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-50 border border-slate-200 text-slate-500">
                Spiritual Focus
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500">
                <Volume2 className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="text-center py-1 space-y-1">
            <h2 style={{ fontFamily: 'ArabQuranIslamic, serif' }} className="text-2xl font-bold font-quran text-slate-900" dir="rtl">سُبْحَانَ اللَّهِ وَبِحَمْدِهِ</h2>
            <p className="text-sm font-semibold text-slate-800">SubhanAllah wa bi-Hamdih</p>
            <p className="text-xs font-normal italic text-slate-500">“Glory be to Allah and Praise Him”</p>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5">
              <Repeat className="w-3.5 h-3.5" />Change Phrase
            </button>
            <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>Round <strong className="text-slate-700 font-bold">1</strong> of 3
            </span>
          </div>
        </div>

        {/* Daily Dedication / Goal Pill Card */}
        <div className="block mx-5 mb-4 p-3.5 rounded-2xl flex items-center justify-between bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center flex-shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Daily Dedication</span>
              <span className="text-xs font-bold text-slate-900"><strong className="text-sm font-bold">428</strong> counts</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-teal-600 flex items-center gap-1 justify-end">
              <Flag className="w-3.5 h-3.5" />
              Goal 1,000
            </span>
            <span className="text-[10px] font-medium text-slate-400">43% completed</span>
          </div>
        </div>

        {/* Center Circular Counter Hero Section */}
        <div className="block mx-5 mb-5 p-6 rounded-3xl flex flex-col items-center space-y-4 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="relative w-52 h-52 mx-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                className="text-slate-100"
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
              <span className="text-[10px] font-bold text-slate-600 tracking-widest uppercase">
                COUNTER
              </span>
              <span className="text-5xl font-extrabold text-slate-900 tracking-tight my-0.5">
                27
              </span>
              <span className="text-xs font-medium text-slate-500">
                of <strong className="text-indigo-600 font-bold">33</strong> Target
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 pt-1 text-xs font-semibold text-slate-500">
            <button className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
            <span className="flex items-center gap-1.5 text-teal-600">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
              <span>Haptics: Soft</span>
            </span>
            <button className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
              <Undo2 className="w-3.5 h-3.5" />
              <span>Undo</span>
            </button>
          </div>

          <button className="w-full py-5 px-6 rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-teal-600 hover:from-indigo-700 hover:to-teal-700 text-white shadow-lg shadow-indigo-600/35 flex items-center justify-center gap-3 transition-all active:scale-[0.98] select-none mt-4">
            <div className="w-9 h-9 rounded-2xl bg-white/70 backdrop-blur-md flex items-center justify-center">
              <Pointer className="w-5 h-5 text-white stroke-[2.2]" />
            </div>
            <div className="text-left">
              <span className="text-sm font-bold tracking-wide uppercase block">TAP TO COUNT</span>
              <span className="text-[10px] font-normal text-white/80 block">Thumb-friendly tactile touch</span>
            </div>
          </button>
        </div>

        {/* Target Selector Row */}
        <div className="block mx-5 mb-4 p-4 rounded-3xl space-y-2.5 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Select Target</span>
            <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">Standard Tasbeeh</button>
          </div>
          <div className="grid grid-cols-5 gap-2">
            <button className="py-2 rounded-2xl bg-indigo-600 text-white text-xs font-bold shadow-sm">33</button>
            <button className="py-2 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-700 hover:bg-slate-100 text-xs font-semibold">99</button>
            <button className="py-2 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-700 hover:bg-slate-100 text-xs font-semibold">100</button>
            <button className="py-2 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-700 hover:bg-slate-100 text-xs font-semibold">1000</button>
            <button className="py-2 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-600 hover:bg-slate-100 text-xs font-semibold flex items-center justify-center"><Edit2 className="w-3.5 h-3.5" /></button>
          </div>
        </div>

        {/* 3-Action Quick Grid */}
        <div className="grid grid-cols-3 gap-2.5 mx-5 mb-4">
          <button className="p-3 rounded-2xl bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50 shadow-sm flex flex-col items-center justify-center gap-1.5 transition-colors">
            <RotateCcw className="w-4 h-4 text-indigo-600" />
            <span className="text-[11px] font-semibold">Reset Count</span>
          </button>
          <button className="p-3 rounded-2xl bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50 shadow-sm flex flex-col items-center justify-center gap-1.5 transition-colors">
            <PlusCircle className="w-4 h-4 text-indigo-600" />
            <span className="text-[11px] font-semibold">New Phrase</span>
          </button>
          <button className="p-3 rounded-2xl bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50 shadow-sm flex flex-col items-center justify-center gap-1.5 transition-colors">
            <Clock className="w-4 h-4 text-indigo-600" />
            <span className="text-[11px] font-semibold">View Log</span>
          </button>
        </div>

        {/* Mindful Consistency Hadith Card */}
        <div className="block mx-5 p-4 rounded-3xl flex items-start gap-3 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="w-8 h-8 rounded-xl bg-white text-teal-600 flex items-center justify-center flex-shrink-0 shadow-sm">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Mindful Consistency</h4>
            <p className="text-[11px] font-medium text-slate-600 italic mt-0.5 leading-relaxed">“The deeds most loved by Allah are those done regularly, even if small.” (Sahih al-Bukhari)</p>
          </div>
        </div>
      </div>

      {/* Floating Navigation Dock */}
      <div className="fixed bottom-0 w-full z-50 pointer-events-none pb-5">
        <div className="px-5">
          <nav className="pointer-events-auto w-full h-[68px] rounded-3xl bg-white/85 backdrop-blur-3xl shadow-[0_16px_40px_rgba(30,45,90,0.12)] border border-slate-100 flex items-center justify-between px-2 relative">
            <a aria-current="page" className="flex flex-col items-center justify-center flex-1 h-full transition-all gap-0.5 text-indigo-600 font-semibold" href="#">
              <div className="w-9 h-7 flex items-center justify-center rounded-full">
                <Home className="w-5 h-5" />
              </div>
              <span className="text-[10px]">Home</span>
            </a>
            <a className="flex flex-col items-center justify-center flex-1 h-full text-slate-400 hover:text-slate-600 transition-all gap-0.5" href="#">
              <div className="w-9 h-7 flex items-center justify-center rounded-full">
                <Wallet className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium">Finance</span>
            </a>
            <div className="flex flex-col items-center justify-center flex-1 h-full relative">
              <a aria-label="Record Dhikr" className="absolute -top-5 w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 via-violet-600 to-teal-500 flex items-center justify-center text-white shadow-[0_10px_24px_-2px_rgba(99,102,241,0.45)] hover:scale-105 active:scale-95 transition-transform ring-4 ring-slate-50/80" href="#">
                <Plus className="w-7 h-7" />
              </a>
            </div>
            <a className="flex flex-col items-center justify-center flex-1 h-full text-slate-400 hover:text-slate-600 transition-all gap-0.5" href="#">
              <div className="w-9 h-7 flex items-center justify-center rounded-full">
                <CheckSquare className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium">Tasks</span>
            </a>
            <a className="flex flex-col items-center justify-center flex-1 h-full text-slate-400 hover:text-slate-600 transition-all gap-0.5" href="#">
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
