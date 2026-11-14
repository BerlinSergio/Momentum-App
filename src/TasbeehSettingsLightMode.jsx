import React, { useState } from 'react';
import UserAvatar from './components/UserAvatar';
import { useTasbeehStore } from './store/useTasbeehStore';
import { 
  ArrowLeft, SlidersHorizontal, Eye, CheckCircle2, Sparkles, Check, PlusCircle, RotateCcw, ArrowRight, Lock 
} from 'lucide-react';

export default function TasbeehSettingsLightMode({ setActiveTab, goBack }) {
  const { 
    keepAwakeEnabled, 
    keepAwake,
    fullScreenTapEnabled, 
    fullScreenTap,
    volumeKeysEnabled, 
    volumeKeys,
    autoLoopEnabled, 
    autoLoop,
    toggleKeepAwake, 
    toggleFullScreenTap, 
    toggleVolumeKeys, 
    toggleAutoLoop,
    reset,
    increment,
    saveSession,
    currentCount,
    activePreset
  } = useTasbeehStore();

  const [showToast, setShowToast] = useState(false);
  const [previewPulse, setPreviewPulse] = useState(false);

  const isKeepAwakeActive = keepAwakeEnabled ?? keepAwake ?? true;
  const isFullScreenTapActive = fullScreenTapEnabled ?? fullScreenTap ?? false;
  const isVolumeKeysActive = volumeKeysEnabled ?? volumeKeys ?? true;
  const isAutoLoopActive = autoLoopEnabled ?? autoLoop ?? true;

  const handleContinueCounting = () => {
    increment();
    if (setActiveTab) setActiveTab('tasbeeh_main_light_mode');
  };

  const handleStartNewSession = () => {
    reset();
    if (setActiveTab) setActiveTab('tasbeeh_main_light_mode');
  };

  const handleLogAndHistory = () => {
    if (currentCount > 0) {
      saveSession(currentCount);
      reset();
    }
    if (setActiveTab) setActiveTab('tasbeeh_history_light_mode');
  };

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      if (setActiveTab) setActiveTab('tasbeeh_main_light_mode');
    }, 850);
  };

  const handleLivePreview = () => {
    setPreviewPulse(true);
    setTimeout(() => setPreviewPulse(false), 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between select-none relative">
      {/* Toast Feedback Notification */}
      {showToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-4 py-2.5 rounded-2xl bg-primary text-white font-semibold text-xs shadow-xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-teal-300" />
          <span>Preferences Saved Successfully!</span>
        </div>
      )}

      <div className="flex-1">
        {/* Top Header Bar */}
        <div className="sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex items-center justify-between px-5 pt-6 pb-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30">
              <SlidersHorizontal className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>
              Tasbeeh Preferences
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button 
              type="button"
              onClick={() => (goBack ? goBack('tasbeeh_main_light_mode') : (setActiveTab ? setActiveTab('tasbeeh_main_light_mode') : window.history.back()))}
              className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer select-none"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <UserAvatar 
            setActiveTab={setActiveTab} 
          />
          </div>
        </div>

        {/* Counter Behavior Card */}
        <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center flex-shrink-0 shadow-sm">
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
              <input 
                type="checkbox" 
                checked={isKeepAwakeActive} 
                onChange={toggleKeepAwake} 
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-inner"></div>
            </label>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Full Screen Tap Mode</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Tap anywhere on screen to count instead of button</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input 
                type="checkbox" 
                checked={isFullScreenTapActive} 
                onChange={toggleFullScreenTap} 
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-inner"></div>
            </label>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Volume Keys for Counting</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Use hardware volume up button to increment</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input 
                type="checkbox" 
                checked={isVolumeKeysActive} 
                onChange={toggleVolumeKeys} 
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-inner"></div>
            </label>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Auto-Loop to Next Cycle</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Automatically restart count after reaching target</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input 
                type="checkbox" 
                checked={isAutoLoopActive} 
                onChange={toggleAutoLoop} 
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-inner"></div>
            </label>
          </div>
        </div>

        {/* Completion Ritual Preview Card */}
        <div className="flex items-center justify-between px-5 mb-2.5">
          <span className="text-[10px] font-bold text-slate-900 uppercase tracking-wider" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>COMPLETION RITUAL PREVIEW</span>
          <button 
            type="button"
            onClick={handleLivePreview}
            className="text-xs font-semibold text-primary hover:text-primary flex items-center gap-1 cursor-pointer select-none"
          >
            <Eye className="w-3.5 h-3.5"/>Live Preview
          </button>
        </div>

        <div className={`block mx-5 mb-6 p-6 rounded-3xl text-center space-y-4 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg transition-transform duration-300 ${previewPulse ? 'scale-[1.02] ring-2 ring-primary' : ''}`}>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-bold bg-primary/10 border border-primary/20 text-primary shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary"/>
            <Sparkles className="w-3.5 h-3.5 text-amber-500"/>
            <span>TARGET REACHED • {activePreset?.target || 33} OF {activePreset?.target || 33}</span>
          </div>

          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-primary-container text-white flex items-center justify-center mx-auto shadow-md shadow-primary/30 ring-4 ring-primary/20">
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
            <button 
              type="button"
              onClick={handleContinueCounting}
              className="w-full py-3.5 px-5 rounded-2xl bg-primary hover:bg-primary text-white font-semibold text-xs shadow-md shadow-primary/25 flex items-center justify-center gap-2 transition-all cursor-pointer select-none active:scale-[0.99]"
            >
              <PlusCircle className="w-4 h-4"/>
              <span>Continue Counting (+)</span>
            </button>
            <button 
              type="button"
              onClick={handleStartNewSession}
              className="w-full py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center justify-center gap-1.5 transition-colors cursor-pointer select-none"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500"/>
              <span>Start New Session</span>
            </button>
            <button 
              type="button"
              onClick={handleLogAndHistory}
              className="text-xs font-semibold text-primary hover:text-primary block mx-auto transition-colors pt-1 cursor-pointer select-none"
            >
              Log & View in History →
            </button>
          </div>
        </div>

        {/* Standardized Bottom Save Action & Sync Footer */}
        <div className="px-5 pb-10 space-y-2.5 text-center">
          <button 
            type="button"
            onClick={handleSave}
            className="btn-primary w-full cursor-pointer select-none"
          >
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