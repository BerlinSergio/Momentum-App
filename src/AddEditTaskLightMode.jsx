import React from 'react';

import { CheckSquare, ArrowLeft } from 'lucide-react';

export default function AddEditTaskLightMode({ setActiveTab }) {
  return (
    <>
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
            <CheckSquare className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-indigo-950 tracking-tight" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>
            Add / Edit Task
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setActiveTab && setActiveTab('home_dashboard_light_mode')} className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"><ArrowLeft className="w-5 h-5"/></button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            A
          </div>
        </div>
      </div><main className="flex-1 w-full max-w-md mx-auto px-4 py-4 space-y-5 pb-20 relative">
  {/* Ambient Backdrop Glow Spots */}
  <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
    <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-indigo-100/40 blur-[100px]"></div>
    <div className="absolute top-2/3 -right-20 w-80 h-80 rounded-full bg-teal-100/30 blur-[120px]"></div>
  </div>

  {/* Status Bar */}
  <div className="flex flex-row items-center justify-between w-full px-2 pt-2">
    <span className="h-9 px-3.5 rounded-full flex items-center justify-center gap-1.5 bg-slate-100 border border-slate-200 text-slate-800 text-xs font-medium shadow-sm whitespace-nowrap shrink-0" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>
      &bull; EDITING TASK #1
    </span>
    <button aria-label="Delete Task" className="h-9 px-3.5 rounded-full flex items-center justify-center gap-1.5 bg-rose-500/90 hover:bg-rose-600 text-white font-medium text-xs shadow-sm shadow-rose-500/20 border border-rose-400/30 transition-all active:scale-95 whitespace-nowrap shrink-0" type="button">
      <span className="material-symbols-outlined text-[16px]">delete</span>
      <span>Delete</span>
    </button>
  </div>

  {/* Main Task Form Surface */}
  <form className="flex flex-col gap-5" id="task-edit-form">
    
    {/* Card: Basic Info */}
    <div className="rounded-3xl p-5 space-y-5 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
      {/* Task Title Field */}
      <div className="flex flex-col">
        <label className="text-sm font-semibold tracking-wide text-slate-900 flex items-center justify-between mb-2.5" htmlFor="task-title">
          <span>Task Title</span>
          <span className="text-xs text-slate-500 font-medium tracking-normal">Required</span>
        </label>
        <div className="text-slate-900 placeholder-slate-400 rounded-2xl px-4 py-3 flex items-center justify-between focus-within:border-indigo-500 transition-all bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <input className="flex-1 bg-transparent border-none text-slate-900 placeholder-slate-400 focus:outline-none text-sm" id="task-title" type="text" defaultValue="Review Q4 product roadmap &amp; quarterly OKRs" />
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200/80">
            <button aria-label="Clear Title" className="btn-secondary" type="button">
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
            <button aria-label="Voice Input" className="text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center" type="button">
              <span className="material-symbols-outlined text-[18px]">mic</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-col">
        <label className="text-sm font-semibold tracking-wide text-slate-900 flex items-center justify-between mb-2.5">Category</label>
        <div aria-label="Task Category" className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar" role="radiogroup">
          <button aria-checked="true" className="rounded-2xl px-4 py-2 text-sm bg-indigo-600 text-white font-medium flex items-center gap-1.5 shadow-md shrink-0" role="radio" type="button">
            <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>work</span>
            <span>Work</span>
          </button>
          <button aria-checked="false" className="rounded-2xl px-4 py-2 text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium flex items-center gap-1.5 transition-colors shrink-0" role="radio" type="button">
            <span className="material-symbols-outlined text-[16px]">person</span>
            <span>Personal</span>
          </button>
          <button aria-checked="false" className="rounded-2xl px-4 py-2 text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium flex items-center gap-1.5 transition-colors shrink-0" role="radio" type="button">
            <span className="material-symbols-outlined text-[16px]">star</span>
            <span>Spiritual</span>
          </button>
          <button aria-checked="false" className="rounded-2xl px-4 py-2 text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium flex items-center gap-1.5 transition-colors shrink-0" role="radio" type="button">
            <span className="material-symbols-outlined text-[16px]">favorite</span>
            <span>Health</span>
          </button>
        </div>
      </div>

      {/* Priority Level */}
      <div className="flex flex-col">
        <label className="text-sm font-semibold tracking-wide text-slate-900 flex items-center justify-between mb-2.5">Priority Level</label>
        <div className="grid grid-cols-4 p-1 rounded-2xl gap-1 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg" role="radiogroup">
          <button aria-checked="false" className="rounded-2xl py-2 text-sm text-slate-500 hover:bg-slate-100 transition-colors font-medium" role="radio" type="button">Low</button>
          <button aria-checked="false" className="rounded-2xl py-2 text-sm text-slate-500 hover:bg-slate-100 transition-colors font-medium" role="radio" type="button">Medium</button>
          <button aria-checked="true" className="rounded-2xl py-2 text-sm font-semibold bg-indigo-600 text-white shadow-md flex items-center justify-center gap-1" role="radio" type="button">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            <span>High</span>
          </button>
          <button aria-checked="false" className="rounded-2xl py-2 text-sm text-slate-500 hover:bg-slate-100 transition-colors font-medium" role="radio" type="button">Urgent</button>
        </div>
      </div>
    </div>

    {/* Card: Schedule Container */}
    <div className="rounded-3xl p-5 space-y-4 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
      <label className="text-sm font-semibold tracking-wide text-slate-900 flex items-center justify-between mb-2.5">Date &amp; Duration</label>
      
      <div className="grid grid-cols-3 gap-2.5">
        <div className="rounded-2xl p-3 flex flex-col items-start gap-1 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
          </div>
          <span className="text-xs text-slate-500 font-medium">Due Date</span>
          <span className="text-xs font-semibold text-slate-800 whitespace-nowrap">Oct 24, 2026</span>
        </div>

        <div className="rounded-2xl p-3 flex flex-col items-start gap-1 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
          </div>
          <span className="text-xs text-slate-500 font-medium">Start Time</span>
          <span className="text-xs font-semibold text-slate-800 whitespace-nowrap">11:00 AM</span>
        </div>

        <div className="rounded-2xl p-3 flex flex-col items-start gap-1 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-[16px]">timelapse</span>
          </div>
          <span className="text-xs text-slate-500 font-medium">Estimate</span>
          <span className="text-xs font-semibold text-slate-800 whitespace-nowrap">45 mins</span>
        </div>
      </div>
    </div>

    {/* Card: Alerts */}
    <div className="rounded-3xl p-5 space-y-4 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
      <div className="flex items-center justify-between p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">notifications_active</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-800">Reminder</span>
            <span className="text-xs text-slate-500">15 minutes before</span>
          </div>
        </div>
        <button className="flex items-center gap-0.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-indigo-600 text-xs font-semibold transition-colors" type="button">
          <span>Change</span>
          <span className="material-symbols-outlined text-[14px]">expand_more</span>
        </button>
      </div>

      <div className="flex items-center justify-between p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-slate-800">Persistent Alert</span>
          <span className="text-xs text-slate-500 mt-0.5">Keep alert visible until checked</span>
        </div>
        <button aria-checked="true" className="w-12 h-6 bg-emerald-500 rounded-full relative p-0.5 transition-colors shadow-inner flex items-center justify-end" role="switch" type="button">
          <span className="w-5 h-5 bg-white rounded-full shadow-md transform"></span>
        </button>
      </div>
    </div>

    {/* Card: Description & Notes Field */}
    <div className="rounded-3xl p-5 space-y-4 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
      <label className="text-sm font-semibold tracking-wide text-slate-900 flex items-center justify-between mb-2.5" htmlFor="task-desc">
        <span>Description &amp; Notes</span>
        <span className="text-xs text-slate-500 font-medium tracking-normal">84 / 200</span>
      </label>
      <textarea className="bg-slate-50/80 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-2xl p-4 w-full focus:outline-none focus:border-indigo-500 shadow-inner resize-none text-sm transition-all min-h-[100px]" id="task-desc" rows="3" defaultValue="Finalize mobile release milestones with design engineering team and prepare presentation deck."></textarea>
    </div>

    {/* Card: Sub-tasks Section */}
    <div className="rounded-3xl p-5 space-y-4 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
      <div className="text-sm font-semibold tracking-wide text-slate-900 flex items-center justify-between mb-2.5">
        <span>Sub-tasks (2)</span>
        <button className="btn-primary" type="button">
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span>Add Step</span>
        </button>
      </div>
      
      <div className="flex flex-col gap-2">
        {/* Step 1 */}
        <div className="flex items-center justify-between p-3 rounded-2xl transition-colors bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <label className="flex items-center gap-3 flex-1 cursor-pointer">
            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[14px] font-bold">check</span>
            </span>
            <span className="text-sm text-slate-400 line-through select-none">Present slides 1-12</span>
          </label>
          <button aria-label="Delete step 1" className="btn-secondary" type="button">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
        
        {/* Step 2 */}
        <div className="flex items-center justify-between p-3 rounded-2xl transition-colors bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <label className="flex items-center gap-3 flex-1 cursor-pointer">
            <span className="w-5 h-5 rounded-full bg-white border border-slate-300 shrink-0 flex items-center justify-center"></span>
            <span className="text-sm text-slate-800 select-none">Send recap email</span>
          </label>
          <button aria-label="Delete step 2" className="btn-secondary" type="button">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      </div>
    </div>

    {/* Actions Area */}
    <div className="flex flex-col gap-3 pt-2">
      <button className="btn-primary w-full" type="button">
        <span>Save Task Changes</span>
        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
      </button>
      <div className="grid grid-cols-2 gap-3">
        <button className="btn-secondary w-full" type="button">
          Cancel
        </button>
        <button className="btn-danger w-full" type="button">
          <span className="material-symbols-outlined text-[16px]">delete_outline</span>
          Delete Task
        </button>
      </div>
    </div>

  </form>
</main>
    </>
  );
}
