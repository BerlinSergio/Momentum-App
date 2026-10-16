import React, { useState } from 'react';

import { 
  PenTool, Search, Bell, Sparkles, SlidersHorizontal, ChevronRight, Mic, BookOpen, FolderArchive, Folder, Home, Wallet, Plus, CheckSquare, LayoutGrid, ArrowLeft, SearchX 
} from 'lucide-react';

export default function NotesMainLightMode({ setActiveTab }) {
  const [searchQuery, setSearchQuery] = useState('');
  const hasMatch = searchQuery.trim() === '' || 'ayah to ponder tonight friday gathering audio sync q4 strategic reflection habit synthesis tafseer notes surah al-mulk quarterly investment family budget'.includes(searchQuery.toLowerCase().trim());

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-36">
      {/* 1. TOP HEADER */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
            <PenTool className="w-5 h-5 text-white"/>
          </div>
          <h1 className="text-base font-bold text-indigo-950 tracking-tight" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>Notes Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors">
            <Search className="w-5 h-5"/>
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            A
          </div>
        </div>
      </div>

      {/* Mindful Sanctuary Banner */}
      <div className="block mx-5 my-3 p-4 rounded-3xl flex items-center justify-between bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        <div>
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
            Mindful Sanctuary
          </span>
          <h2 className="text-sm font-bold text-slate-900 mt-0.5">Notes & Reflections</h2>
          <p className="text-[11px] font-normal text-slate-500 mt-0.5 max-w-[200px]">
            Capture mindful thoughts, fleeting flashes, and deep introspective journals.
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-violet-100 text-violet-700 border border-violet-200/80 flex items-center gap-1 flex-shrink-0 shadow-2xs">
          <Sparkles className="w-3 h-3 text-violet-600"/>
          Zen Active
        </span>
      </div>

      {/* 2. SEARCH BAR & HORIZONTAL FILTER CHIPS */}
      <div className="flex items-center gap-2 px-5 mb-3">
        <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <Search className="w-4 h-4 text-slate-400 shrink-0"/>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes, tags, or voice memos..." 
            className="w-full bg-transparent text-xs font-normal text-slate-900 focus:outline-none placeholder-slate-400"
          />
        </div>
        <button className="p-2.5 rounded-2xl bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50 shadow-xs transition-colors shrink-0">
          <SlidersHorizontal className="w-4 h-4"/>
        </button>
      </div>

      <div className="flex items-center gap-2 px-5 mb-5 overflow-x-auto scrollbar-none">
        <button className="px-3.5 py-1.5 rounded-2xl bg-indigo-600 text-white text-xs font-semibold shadow-sm whitespace-nowrap active:scale-95 transition-all cursor-pointer select-none">
          All Notes (14)
        </button>
        <button className="px-3.5 py-1.5 rounded-2xl bg-white border border-slate-200/80 text-slate-600 text-xs font-semibold whitespace-nowrap hover:bg-slate-50 active:scale-95 transition-all cursor-pointer select-none">
          📌 Pinned (3)
        </button>
        <button className="px-3.5 py-1.5 rounded-2xl bg-white border border-slate-200/80 text-slate-600 text-xs font-semibold whitespace-nowrap hover:bg-slate-50 active:scale-95 transition-all cursor-pointer select-none">
          ⚡ Quick Notes (8)
        </button>
        <button className="px-3.5 py-1.5 rounded-2xl bg-white border border-slate-200/80 text-slate-600 text-xs font-semibold whitespace-nowrap hover:bg-slate-50 active:scale-95 transition-all cursor-pointer select-none">
          📖 Long Notes (6)
        </button>
      </div>

      {!hasMatch ? (
        <div className="mx-5 my-4 p-8 rounded-3xl border backdrop-blur-xl flex flex-col items-center justify-center text-center bg-white/60 border-white/60 shadow-sm">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-indigo-50/80 text-indigo-600">
            <SearchX className="w-8 h-8"/>
          </div>
          <h3 className="text-base font-semibold mb-1 text-slate-900">
            No Notes Found
          </h3>
          <p className="text-xs max-w-[240px] leading-relaxed mb-5 text-slate-600">
            No notes match your search criteria. Try a different keyword or create a new note.
          </p>
          <button 
            onClick={() => setSearchQuery('')}
            className="px-5 py-2.5 rounded-xl font-medium text-xs flex items-center gap-2 bg-indigo-600 text-white shadow-md active:scale-95 transition-all cursor-pointer select-none"
          >
            Clear Search Filter
          </button>
        </div>
      ) : (
        <>
          {/* 3. QUICK NOTES SECTION */}
          <div className="flex items-center justify-between px-5 mb-3">
            <div className="flex items-center gap-1.5">
              <span className="text-amber-500 text-slate-800" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>⚡</span>
              <h3 className="text-xs font-bold text-indigo-950 uppercase tracking-wider" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>Quick Notes</h3>
              <span className="text-xs text-slate-800" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>• Fleeting</span>
            </div>
            <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-0.5 active:scale-95 transition-all cursor-pointer select-none">
              See all <ChevronRight className="w-3.5 h-3.5"/>
            </button>
          </div>

          <div className="block mx-5 mb-3 p-4 rounded-2xl transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer select-none space-y-2 bg-white/70 hover:bg-white/80 backdrop-blur-md border border-white/80 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold">#Spiritual</span>
                <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">📌 Pinned</span>
              </div>
              <span className="text-[10px] font-normal text-slate-400">10:30 AM</span>
            </div>
            <h4 className="text-sm font-semibold text-slate-900 truncate">Ayah to ponder tonight</h4>
            <p className="text-xs font-medium text-slate-500 italic">"And your Lord will give you, and you will be satisfied." (Surah Ad-Duha: 5)</p>
            <div className="flex items-center justify-between pt-2 border-t border-slate-50">
              <span className="text-[10px] font-semibold text-teal-600">🌱 Evening Dhikr</span>
              <PenTool className="w-3.5 h-3.5 text-slate-400"/>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mx-5 mb-6">
            <div className="p-3.5 rounded-2xl space-y-2 transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer select-none bg-white/70 hover:bg-white/80 backdrop-blur-md border border-white/80 shadow-lg">
              <span className="text-[10px] font-semibold text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded">#Daily</span>
              <h4 className="text-xs font-semibold text-slate-900 truncate">Friday Gathering</h4>
              <div className="flex flex-col gap-1 text-[11px] font-normal text-slate-500">
                <span className="line-through">✔ Fresh Medjool dates</span>
                <span className="line-through">✔ Cardamom & cinnamon</span>
                <span>⚪ Almond milk</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] font-medium text-slate-400">9:15 AM</span>
                <span className="text-[10px] font-bold text-teal-600">3/4 Done</span>
              </div>
            </div>
            <div className="p-3.5 rounded-2xl space-y-2 transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer select-none bg-white/70 hover:bg-white/80 backdrop-blur-md border border-white/80 shadow-lg">
              <span className="text-[10px] font-semibold text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded">#Work</span>
              <h4 className="text-xs font-semibold text-slate-900 truncate">Audio Sync</h4>
              <p className="text-[11px] font-normal text-slate-500 line-clamp-3">Add offline prayer audio sync for travel mode. Check background sync...</p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] font-medium text-slate-400">Yesterday</span>
                <Mic className="w-3.5 h-3.5 text-violet-600"/>
              </div>
            </div>
          </div>

          {/* 4. LONG NOTES SECTION */}
          <div className="flex items-center justify-between px-5 mb-3">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-600"/>
              <h3 className="text-xs font-bold text-indigo-950 uppercase tracking-wider" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>Long Notes</h3>
              <span className="text-xs text-slate-800" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>• Journal & Studies</span>
            </div>
            <span className="text-xs font-medium text-slate-800" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>6 Total</span>
          </div>

          <div className="block mx-5 mb-3 p-4 rounded-2xl transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer select-none space-y-3 bg-white/70 hover:bg-white/80 backdrop-blur-md border border-white/80 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-violet-50 text-violet-600 text-[10px] font-semibold">Personal Growth</span>
              <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">📌 Pinned</span>
            </div>
            <h4 className="text-sm font-semibold text-slate-900 truncate">Q4 Strategic Reflection & Habit Synthesis</h4>
            <p className="text-xs font-normal text-slate-500 line-clamp-2">Looking back at the past quarter's personal momentum, spiritual consistency, and health target...</p>
            <div className="flex gap-2">
              <div className="flex-1 h-12 rounded-xl flex items-center px-3 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
                 <Mic className="w-4 h-4 text-indigo-500 mr-2"/>
                 <span className="text-[10px] font-semibold text-slate-600">Voice Note</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-slate-200 overflow-hidden shrink-0">
                 <img src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=200" alt="journal" className="w-full h-full object-cover"/>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-[10px] font-medium text-slate-400">Oct 24, 2026 • 6 min read • 3 items</span>
              <button className="text-[10px] font-bold text-indigo-600 flex items-center gap-0.5 active:scale-95 transition-all cursor-pointer select-none">Read <ChevronRight className="w-3 h-3"/></button>
            </div>
          </div>

          <div className="block mx-5 mb-3 p-4 rounded-2xl transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer select-none space-y-3 bg-white/70 hover:bg-white/80 backdrop-blur-md border border-white/80 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-600 text-[10px] font-semibold">Spiritual Study</span>
            </div>
            <h4 className="text-sm font-semibold text-slate-900 truncate">Tafseer Notes: Surah Al-Mulk Deep Dive</h4>
            <p className="text-xs font-normal text-slate-500 line-clamp-2">Contemplating the sovereignty of creation and mindfulness before sleep. Verses 1-5 linguistic breakdown and classical commentary...</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-16 rounded-xl bg-slate-200 overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1629813589973-585a21008f51?auto=format&fit=crop&q=80&w=300" alt="calligraphy" className="w-full h-full object-cover"/>
              </div>
              <div className="h-16 rounded-xl bg-slate-200 overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=300" alt="window" className="w-full h-full object-cover"/>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-[10px] font-medium text-slate-400">Oct 21, 2026 • 12 min read • 2 photos</span>
              <button className="text-[10px] font-bold text-indigo-600 flex items-center gap-0.5 active:scale-95 transition-all cursor-pointer select-none">Read <ChevronRight className="w-3 h-3"/></button>
            </div>
          </div>

          <div className="block mx-5 mb-6 p-4 rounded-2xl transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer select-none space-y-3 bg-white/70 hover:bg-white/80 backdrop-blur-md border border-white/80 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 text-[10px] font-semibold">Finance</span>
            </div>
            <h4 className="text-sm font-semibold text-slate-900 truncate">Quarterly Investment & Family Budget Review</h4>
            <p className="text-xs font-normal text-slate-500 line-clamp-2">Reviewing emergency fund allocations, savings rate improvements, and zakat distribution schedule for upcoming month with halāl equity indices comparison.</p>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-md bg-slate-50 text-slate-600 text-[10px] font-semibold flex items-center gap-1 border border-slate-100">Target Savings: 32%</span>
              <span className="px-2 py-1 rounded-md bg-slate-50 text-slate-600 text-[10px] font-semibold flex items-center gap-1 border border-slate-100">Zakat Prepared</span>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-[10px] font-medium text-slate-400">Oct 18, 2026 • 4 min read</span>
              <button className="text-[10px] font-bold text-indigo-600 flex items-center gap-0.5 active:scale-95 transition-all cursor-pointer select-none">Read <ChevronRight className="w-3 h-3"/></button>
            </div>
          </div>
        </>
      )}

      {/* 5. STANDARDIZED ARCHIVE EMPTY STATE CONTAINER */}
      <div className="block mx-5 mb-28 p-6 rounded-3xl text-center space-y-3 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        <div className="block w-12 h-12 rounded-2xl text-indigo-600 flex items-center justify-center mx-auto text-indigo-400 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <FolderArchive className="w-6 h-6"/>
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900">No archived notes yet</h4>
          <p className="text-xs font-normal text-slate-500 max-w-xs mx-auto mt-1 leading-relaxed">
            Keep writing! Your mindful library expands and grows with every gentle thought, ayah reflection, and daily goal.
          </p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-xs font-semibold text-indigo-600 inline-flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer select-none shadow-2xs">
          <Folder className="w-3.5 h-3.5 text-indigo-600"/>
          View Archive Drawer
        </button>
      </div>

      {/* 6. REDESIGN FLOATING "+ WRITE" ACTION BUTTON */}
      <div className="fixed bottom-24 right-5 z-20">
        <button 
          onClick={() => setActiveTab && setActiveTab('quick_note_editor_light_mode')}
          className="py-3 px-5 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-semibold text-xs shadow-lg shadow-indigo-600/40 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer select-none"
        >
          <PenTool className="w-4 h-4 stroke-[2.2]"/>
          <span>New Note</span>
        </button>
      </div>

      {/* Bottom Navigation Dock (Light Mode) */}
      <div className="fixed bottom-4 left-5 right-5 z-30">
        <nav className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-full px-4 py-2.5 shadow-xl shadow-slate-200/60 flex items-center justify-between">
          <button onClick={() => setActiveTab && setActiveTab('home')} className="flex flex-col items-center justify-center gap-0.5 text-indigo-600 transition-colors flex-1">
            <Home className="w-5 h-5"/>
            <span className="text-[10px] font-bold">Home</span>
          </button>
          <button onClick={() => setActiveTab && setActiveTab('finance')} className="flex flex-col items-center justify-center gap-0.5 text-slate-400 hover:text-slate-600 transition-colors flex-1">
            <Wallet className="w-5 h-5"/>
            <span className="text-[10px] font-medium">Finance</span>
          </button>
          <div className="relative -top-3 flex-shrink-0 px-1">
            <button className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/40 ring-4 ring-white hover:scale-105 active:scale-95 transition-all">
              <Plus className="w-6 h-6 stroke-[2.5]"/>
            </button>
          </div>
          <button onClick={() => setActiveTab && setActiveTab('tasks')} className="flex flex-col items-center justify-center gap-0.5 text-slate-400 hover:text-slate-600 transition-colors flex-1">
            <CheckSquare className="w-5 h-5"/>
            <span className="text-[10px] font-medium">Tasks</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-0.5 text-slate-400 hover:text-slate-600 transition-colors flex-1">
            <LayoutGrid className="w-5 h-5"/>
            <span className="text-[10px] font-medium">More</span>
          </button>
        </nav>
      </div>

    </div>
  );
}
