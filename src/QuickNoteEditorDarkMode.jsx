import React from 'react';

import { 
  ArrowLeft, Share2, MoreVertical, Sparkles, Pin, Palette, Trash2, Play, Mic, X, Camera, CheckSquare, List, Tag, Edit3, Bell, Clock, ArrowRight 
} from 'lucide-react';

export default function QuickNoteEditorDarkMode({ setActiveTab }) {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col text-white">
      {/* 1. TOP HEADER & STATUS BAR */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <Edit3 className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-white tracking-tight">
            Quick Note Editor
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveTab && setActiveTab('home_dashboard_dark_mode')}
            className="p-2 rounded-full text-slate-300 hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            A
          </div>
        </div>
      
      </div>

      {/* 2. AUTOSAVED & QUICK UTILITIES SUB-BAR */}
      <div className="flex items-center justify-between px-5 py-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400"/>
          Autosaved • 10:45 AM
        </span>
        <div className="flex items-center gap-1 text-slate-400">
          <button className="p-2 rounded-xl hover:bg-slate-800 transition-colors"><Pin className="w-4 h-4 text-slate-300"/></button>
          <button className="p-2 rounded-xl hover:bg-slate-800 transition-colors"><Palette className="w-4 h-4 text-slate-300"/></button>
          <button className="p-2 rounded-xl hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 transition-colors"><Trash2 className="w-4 h-4"/></button>
        </div>
      </div>

      {/* CATEGORY TAGS ROW */}
      <div className="flex items-center gap-2 px-5 mb-4 overflow-x-auto scrollbar-none pb-1">
        <button className="px-3.5 py-1.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium whitespace-nowrap flex items-center gap-1.5 hover:bg-slate-800 shadow-2xs">
          <span>💡</span> Idea
        </button>
        <button className="px-3.5 py-1.5 rounded-2xl bg-indigo-600 text-white text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 shadow-sm">
          <span>✅</span> Checklist
        </button>
        <button className="px-3.5 py-1.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium whitespace-nowrap flex items-center gap-1.5 hover:bg-slate-800 shadow-2xs">
          <span>✨</span> Spiritual
        </button>
        <button className="px-3.5 py-1.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium whitespace-nowrap flex items-center gap-1.5 hover:bg-slate-800 shadow-2xs">
          <span>💼</span> Work
        </button>
        <button className="px-3.5 py-1.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium whitespace-nowrap flex items-center gap-1.5 hover:bg-slate-800 shadow-2xs">
          <span>🌱</span> Personal
        </button>
      </div>

      {/* MAIN QUICK NOTE CARD */}
      <div className="block mx-5 mb-4 p-5 rounded-3xl space-y-4 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
        {/* Title Row */}
        <div className="flex items-center justify-between">
          <input 
            type="text" 
            defaultValue="Friday Family Dinner Prep" 
            className="text-lg font-bold text-white bg-transparent w-full focus:outline-none"
          />
          <span className="w-2.5 h-2.5 rounded-full bg-teal-400 flex-shrink-0"></span>
        </div>
        
        {/* Color Tint Selector */}
        <div className="flex items-center gap-3 pt-1">
          <span className="text-xs font-medium text-slate-500">Tint:</span>
          <div className="flex items-center gap-2">
            <button className="w-6 h-6 rounded-full bg-slate-800 border-2 border-indigo-500 ring-2 ring-indigo-500/30"></button>
            <button className="w-6 h-6 rounded-full bg-emerald-900 hover:scale-110 transition-transform"></button>
            <button className="w-6 h-6 rounded-full bg-violet-900 hover:scale-110 transition-transform"></button>
            <button className="w-6 h-6 rounded-full bg-sky-900 hover:scale-110 transition-transform"></button>
            <button className="w-6 h-6 rounded-full bg-amber-900 hover:scale-110 transition-transform"></button>
          </div>
        </div>

        {/* Body Paragraph */}
        <p className="text-sm font-normal text-slate-200 leading-relaxed pt-1">Pick up fresh figs, organic honey, and cardamom pods from the local market before Asr prayer. Remind Uncle Tariq about arriving at 6:30 PM. Prepare the outdoor seating with warm lanterns.</p>
        
        {/* Embedded Audio Player Card */}
        <div className="p-3.5 rounded-2xl flex items-center justify-between gap-3 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-sm hover:bg-violet-500 transition-colors flex-shrink-0">
              <Play className="w-4 h-4 fill-white ml-0.5"/>
            </button>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-bold text-white">Audio Memo 01</h4>
                <Mic className="w-3 h-3 text-slate-400"/>
                <span className="text-[11px] font-semibold text-violet-400">0:42</span>
              </div>
              {/* Soundwave Bars */}
              <div className="flex items-center gap-1 mt-1.5 h-3">
                <span className="w-1 h-3 bg-violet-500 rounded-full"></span>
                <span className="w-1 h-2 bg-violet-400 rounded-full"></span>
                <span className="w-1 h-4 bg-violet-500 rounded-full"></span>
                <span className="w-1 h-1.5 bg-violet-700 rounded-full"></span>
                <span className="w-1 h-3 bg-violet-600 rounded-full"></span>
                <span className="w-1 h-2 bg-violet-400 rounded-full"></span>
              </div>
            </div>
          </div>
          <button className="p-1.5 text-slate-400 hover:text-slate-300 transition-colors">
            <X className="w-4 h-4"/>
          </button>
        </div>

        {/* Embedded Photo Attachment */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xs group">
          <img src="/inspiration_table.jpg" alt="Outdoor Table" className="w-full h-44 object-cover"/>
          <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5"/>
            <span>Inspiration_Table_Setup.jpg</span>
          </div>
          <button className="absolute bottom-2.5 right-2.5 p-1.5 rounded-xl bg-black/60 backdrop-blur-md text-white/80 hover:text-white transition-colors">
            <X className="w-4 h-4"/>
          </button>
        </div>

        {/* Editor Quick Toolbar Strip */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <div className="flex items-center gap-2 text-slate-400">
            <button className="p-2 rounded-xl hover:bg-slate-800 transition-colors"><CheckSquare className="w-4 h-4"/></button>
            <button className="p-2 rounded-xl hover:bg-slate-800 transition-colors"><List className="w-4 h-4"/></button>
            <button className="p-2 rounded-xl hover:bg-slate-800 transition-colors"><Mic className="w-4 h-4"/></button>
            <button className="p-2 rounded-xl hover:bg-slate-800 transition-colors"><Camera className="w-4 h-4"/></button>
            <button className="p-2 rounded-xl hover:bg-slate-800 transition-colors"><Tag className="w-4 h-4"/></button>
          </div>
          <button className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-indigo-300 text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-700 transition-colors shadow-2xs">
            <Edit3 className="w-3.5 h-3.5 text-indigo-400"/>
            Scribble
          </button>
        </div>
      </div>

      {/* REMINDER SETTING CARD */}
      <div className="block mx-5 mb-4 p-4 rounded-3xl flex items-center justify-between bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-slate-800 text-violet-400 flex items-center justify-center flex-shrink-0 shadow-2xs">
            <Bell className="w-5 h-5"/>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Reminder: Today at 5:00 PM</h4>
            <p className="text-[11px] font-normal text-slate-400 mt-0.5">Triggers 1 hour before Asr prayer</p>
          </div>
        </div>
        <button className="px-3 py-1 rounded-xl text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
          Edit
        </button>
      </div>

      {/* METADATA ROW & STANDARDIZED ACTION BUTTONS */}
      <div className="flex items-center justify-between px-6 mb-4 text-[11px] font-medium text-slate-500">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-slate-500"/>
          <span>Created Today • 10:45 AM</span>
        </div>
        <span>48 words • 284 chars</span>
      </div>

      {/* Action Buttons Container */}
      <div className="px-5 pb-10 space-y-3">
        <button className="btn-primary w-full">
          <span>Save Quick Note</span>
          <ArrowRight className="w-4 h-4"/>
        </button>

        <div className="flex items-center gap-3">
          <button className="btn-secondary">
            <X className="w-4 h-4 text-slate-400"/>
            Cancel Changes
          </button>
          <button className="btn-danger">
            <Trash2 className="w-4 h-4 text-rose-400"/>
            Delete Note
          </button>
        </div>
      </div>
    </div>
  );
}
