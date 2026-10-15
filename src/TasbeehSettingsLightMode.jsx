import React from 'react';

import { 
  ArrowLeft, FolderArchive, SlidersHorizontal, Eye, CheckCircle2, Sparkles, Check, PlusCircle, RotateCcw, ArrowRight, Lock 
} from 'lucide-react';

export default function TasbeehSettingsLightMode({ setActiveTab }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between select-none">
      <div className="flex-1 overflow-y-auto">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
            <SlidersHorizontal className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-indigo-950 tracking-tight" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>
            Tasbeeh Preferences
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

        {/* Counter Behavior Card */}
        <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm">
              <SlidersHorizontal className="w-5 h-5"/>
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 leading-snug">Counter Behavior</h2>
              <p className="text-xs font-normal text-slate-500 mt-0.5">Physical button mappings and screen states</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Keep Screen Awake during Dhikr</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Prevents auto-locking while counting beads</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input type="checkbox" defaultChecked className="sr-only peer"/>
              <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
            </label>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Full Screen Tap Mode</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Tap anywhere on screen to count instead of button</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input type="checkbox" className="sr-only peer"/>
              <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
            </label>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Volume Keys for Counting</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Use hardware volume up button to increment</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input type="checkbox" defaultChecked className="sr-only peer"/>
              <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
            </label>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Auto-Loop to Next Cycle</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Automatically restart count after reaching target</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input type="checkbox" className="sr-only peer"/>
              <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
            </label>
          </div>
        </div>

        {/* Completion Ritual Preview Card */}
        <div className="flex items-center justify-between px-5 mb-2.5">
          <span className="text-[10px] font-bold text-indigo-950 uppercase tracking-wider" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>COMPLETION RITUAL PREVIEW</span>
          <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
            <Eye className="w-3.5 h-3.5"/>Live Preview
          </button>
        </div>

        <div className="block mx-5 mb-6 p-6 rounded-3xl text-center space-y-4 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-bold bg-violet-50 border border-violet-200/80 text-violet-700 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-violet-600"/>
            <Sparkles className="w-3.5 h-3.5 text-amber-500"/>
            <span>TARGET REACHED • 33 OF 33</span>
          </div>

          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-600/30 ring-4 ring-indigo-50">
            <Check className="w-7 h-7 stroke-[2.8] text-white"/>
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Alhamdulillah! Cycle Complete
            </h3>
            <p className="text-xs font-normal text-slate-500 max-w-xs mx-auto leading-relaxed">
              May Allah accept your dhikr and fill your day with barakah and tranquility.
            </p>
          </div>

          <div className="pt-2 space-y-2.5">
            <button className="w-full py-3.5 px-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all">
              <PlusCircle className="w-4 h-4"/>
              <span>Continue Counting (+)</span>
            </button>
            <button className="w-full py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center justify-center gap-1.5 transition-colors">
              <RotateCcw className="w-3.5 h-3.5 text-slate-500"/>
              <span>Start New Session</span>
            </button>
            <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 block mx-auto transition-colors pt-1">
              Log & View in History →
            </button>
          </div>
        </div>

        {/* Standardized Bottom Save Action & Sync Footer */}
        <div className="px-5 pb-10 space-y-2.5 text-center">
          <button className="btn-primary w-full">
            <span>Save Tasbeeh Preferences</span>
            <ArrowRight className="w-4 h-4"/>
          </button>
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-normal text-slate-400">
            <Lock className="w-3 h-3 text-slate-400"/>
            <span style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>Preferences sync automatically to your local device</span>
          </div>
        </div>

      </div>
    </div>
  );
}
