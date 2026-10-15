import React from 'react';

import { 
  ArrowLeft, Share2, MoreVertical, CloudCheck, Eye, Pin, Calendar, 
  Clock, Leaf, TrendingUp, ArrowRight, XCircle, Trash2, Bold, Italic, 
  Type, List, ListOrdered, Quote, Image as ImageIcon, Mic, Plus, FileText
} from 'lucide-react';

export default function LongNoteEditorLightMode({ setActiveTab }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-32">
      {/* TOP HEADER & STATUS BAR */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-indigo-950 tracking-tight" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>
            Note Editor Details
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
      
      {/* Timestamp & Pinned Row */}
      <div className="flex items-center justify-between px-5 py-2.5">
        <span className="text-xs font-semibold text-indigo-950 font-semibold flex items-center gap-1.5" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>
          <CloudCheck className="w-4 h-4 text-slate-400"/>
          Saved • Oct 24, 2026, 11:20 AM
        </span>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100">
            <Eye className="w-4 h-4"/>
          </button>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-violet-50 border border-violet-200/80 text-violet-700 flex items-center gap-1 text-indigo-950" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>
            <Pin className="w-3.5 h-3.5 text-violet-600 rotate-45"/>
            Pinned
          </span>
        </div>
      </div>

      {/* NOTE TITLE & METADATA CARD */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight outline-none focus:text-indigo-600 transition-colors cursor-text" contentEditable="true" suppressContentEditableWarning={true}>
          Q4 Strategic Reflection & Habit Synthesis
        </h2>
        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          <span className="px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-600 text-xs font-medium flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500"/>Sat, Oct 24 • 11:20 AM
          </span>
          <span className="px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-600 text-xs font-medium flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-500"/>6 min read • 840 words
          </span>
        </div>
        <div className="flex items-center gap-2 pt-1">
          <span className="px-2.5 py-1 rounded-xl bg-violet-50 border border-violet-200/80 text-violet-700 text-xs font-bold flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5 text-violet-600"/>Spiritual Growth
          </span>
          <span className="px-2.5 py-1 rounded-xl bg-teal-50 border border-teal-200/80 text-teal-700 text-xs font-bold flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-teal-600"/>Quarterly Review
          </span>
        </div>
      </div>

      {/* RICH NOTE CONTENT BODY */}
      <div className="space-y-4 px-5 mb-6">
        <h3 className="text-base font-bold text-indigo-950" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>
          1. Morning Momentum & Spiritual Alignment
        </h3>
        <p className="text-sm text-slate-800 leading-relaxed font-normal" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>
          Over the last 90 days, locking in Fajr followed by 20 minutes of Quranic reflection created an unprecedented sense of barakah in my daily workflow. The cognitive clarity achieved before 7:00 AM consistently outweighed late-night work bursts.
        </p>
        
        {/* Quote Callout Block */}
        <div className="p-4 bg-indigo-50/50 border-l-4 border-indigo-500 rounded-r-2xl shadow-sm relative my-5 flex gap-3">
          <span className="text-3xl font-serif text-slate-800 leading-none flex-shrink-0" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>“</span>
          <div>
            <p className="text-sm font-medium text-slate-800 italic leading-relaxed" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>"The deeds most loved by Allah are those done regularly, even if small."</p>
            <span className="text-[11px] font-semibold text-slate-800 block mt-1.5" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>— Daily anchor principle that sustained the 14-day streak</span>
          </div>
        </div>

        <h3 className="text-base font-bold text-indigo-950" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>
          2. Focus Windows & Routine Guardrails
        </h3>
        <p className="text-sm text-slate-800 leading-relaxed font-normal" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>
          Consistently capping deep work sessions at 90 minutes protected energy reserves. Pairing routine tasks with hydration alerts reduced afternoon fatigue significantly.
        </p>
      </div>

      {/* QUARTERLY MILESTONES CHECKLIST */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-3 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Quarterly Milestones</h3>
        <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group">
          <input type="checkbox" className="hidden peer" defaultChecked />
          <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-sm transition-transform group-active:scale-95">
            <span className="text-white text-[12px] font-bold">✓</span>
          </div>
          <span className="text-sm font-normal text-slate-500 line-through flex-1">
            Review monthly prayer habit streak metrics
          </span>
          <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/50 px-2 py-0.5 rounded-full">Done</span>
        </label>
        
        <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group">
          <input type="checkbox" className="hidden peer" defaultChecked />
          <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-sm transition-transform group-active:scale-95">
            <span className="text-white text-[12px] font-bold">✓</span>
          </div>
          <span className="text-sm font-normal text-slate-500 line-through flex-1">
            Consolidate investment and emergency buffer
          </span>
          <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/50 px-2 py-0.5 rounded-full">Done</span>
        </label>

        <label className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-colors cursor-pointer group">
          <input type="checkbox" className="hidden peer" />
          <div className="w-6 h-6 rounded-full bg-white border border-slate-300 flex items-center justify-center text-transparent transition-transform group-active:scale-95">
            <span className="text-[12px] font-bold">✓</span>
          </div>
          <span className="text-sm font-medium text-slate-800 flex-1">
            Draft Q1 goals outline for family retreat
          </span>
          <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/50">Pending</span>
        </label>
      </div>

      {/* ATTACHMENTS & MEDIA CAROUSEL */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-3 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        <div className="flex items-center justify-between pb-2">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-slate-400" />
            Attachments & Media (3)
          </h3>
          <button className="btn-primary">
            <Plus className="w-3.5 h-3.5" />
            Add Item
          </button>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none snap-x scroll-smooth">
          {/* Attachment 1 */}
          <div className="snap-start min-w-[150px] p-3.5 rounded-2xl transition-all flex flex-col gap-2 relative bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
            <div className="relative h-24 w-full overflow-hidden rounded-xl bg-slate-200">
              <img className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeoilMROxN5rslAxq5_gp_GsUHOhySI_czZCoT5pSTWonQcVm_-CXwO1y6MGMtSqaAXW7q2_EBl3BY1OPXZWiphvRjtrfw4uhTQZneGTMKN_19ltajDp8_IZNEqDXuRYBJgVnBX8GUdKwEt2p8FpO3epeqPLEzOzMmLYlWIqrDlyqgXOWmaJ8LRLxLqCJrhP1TmSBeZCjT7Rww6AdnUdSsGsdxw--lB6RTPhLCZMRdQouCia2YbsQ" alt="Dawn" />
              <span className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white font-semibold text-[9px]">
                1.8 MB
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-900 truncate">Dawn_Focus.jpg</span>
              <span className="text-[10px] font-normal text-slate-500">Sunrise reflection</span>
            </div>
          </div>
          
          {/* Attachment 2 */}
          <div className="snap-start min-w-[150px] p-3.5 rounded-2xl transition-all flex flex-col gap-2 relative bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
            <div className="relative h-24 w-full overflow-hidden rounded-xl bg-slate-200">
              <img className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyIv9-i3XKKs1okzhg6U6RLVRrWcJaxlaZ9HiwjElhA_5ehlDJ4M7KROpK8D0D_1lJP2vxvISs3lwrU8e_LXJ89kxodLxqsskAIQ2BGZg-bp5c4euhv34WAP1qOKh68OeauGa0M_BcpwHxZvv22eWCLTPpYTY3NPSsst5EaNTwOnHHVgsIC7ZeI8NIOKQ3NpsbvlTl_CikPVqRjPpWhWYtcSgmt6Sf-HKREON-1nTg6urtpPUceJw" alt="MindMap" />
              <span className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white font-semibold text-[9px]">
                2.4 MB
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-900 truncate">MindMap_Q4.png</span>
              <span className="text-[10px] font-normal text-slate-500">Habit structure</span>
            </div>
          </div>
          
          {/* Attachment 3: Voice Note */}
          <div className="snap-start min-w-[150px] p-3.5 rounded-2xl transition-all flex flex-col justify-between relative bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
                <Mic className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-slate-900 truncate">Reflection_V...m4a</span>
                <span className="text-[10px] font-normal text-slate-500">3m 15s</span>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between gap-0.5 h-8 px-2 rounded-lg bg-white border border-slate-100">
              <div className="w-1 h-3 rounded-full bg-indigo-400 animate-pulse"></div>
              <div className="w-1 h-6 rounded-full bg-indigo-400"></div>
              <div className="w-1 h-4 rounded-full bg-indigo-400"></div>
              <div className="w-1 h-7 rounded-full bg-indigo-400"></div>
              <div className="w-1 h-5 rounded-full bg-indigo-400"></div>
              <div className="w-1 h-3 rounded-full bg-indigo-400"></div>
              <div className="w-1 h-7 rounded-full bg-indigo-400"></div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM ACTIONS & FORMATTING TOOLBAR */}
      <div className="px-5 pb-28 space-y-3">
        <button className="btn-primary w-full">
          Save Journal Note
          <ArrowRight className="w-4 h-4"/>
        </button>
        <div className="w-full flex items-center gap-3">
          <button className="btn-secondary flex-1">
            <XCircle className="w-4 h-4 text-slate-500"/>
            Cancel Draft
          </button>
          <button className="btn-danger flex-1">
            <Trash2 className="w-4 h-4 text-rose-500"/>
            Delete Note
          </button>
        </div>
      </div>

      {/* Floating Format Toolbar */}
      <div className="fixed bottom-4 left-5 right-5 bg-white/95 backdrop-blur-md border border-slate-200/85 shadow-lg rounded-2xl p-2.5 flex items-center justify-between z-20">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          <button className="w-9 h-9 rounded-full hover:bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 transition-colors">
            <Bold className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 rounded-full hover:bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 transition-colors">
            <Italic className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 rounded-full hover:bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 transition-colors">
            <Type className="w-4 h-4" />
          </button>
          <div className="w-[1px] h-5 bg-slate-200 mx-1"></div>
          <button className="w-9 h-9 rounded-full hover:bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 transition-colors">
            <List className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 rounded-full hover:bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 transition-colors">
            <ListOrdered className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 rounded-full hover:bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 transition-colors">
            <Quote className="w-4 h-4" />
          </button>
          <div className="w-[1px] h-5 bg-slate-200 mx-1"></div>
          <button className="w-9 h-9 rounded-full hover:bg-slate-100 text-indigo-600 flex items-center justify-center shrink-0 transition-colors">
            <ImageIcon className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm ml-1 transition-opacity hover:opacity-90">
            <Mic className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
