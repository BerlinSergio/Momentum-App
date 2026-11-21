import React, { useState } from 'react';
import UserAvatar from './components/UserAvatar';
import { useTranslation } from 'react-i18next';
import { useTasbeehStore } from './store/useTasbeehStore';
import { toast } from './components/ui/toast/index.js';
import { 
  ArrowLeft, SlidersHorizontal, Eye, CheckCircle2, Sparkles, Check, PlusCircle, RotateCcw, ArrowRight, Lock 
} from 'lucide-react';

export default function TasbeehSettingsDarkMode({ setActiveTab, goBack }) {
  const { t } = useTranslation();
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

  const [previewPulse, setPreviewPulse] = useState(false);

  const isKeepAwakeActive = keepAwakeEnabled ?? keepAwake ?? true;
  const isFullScreenTapActive = fullScreenTapEnabled ?? fullScreenTap ?? false;
  const isVolumeKeysActive = volumeKeysEnabled ?? volumeKeys ?? true;
  const isAutoLoopActive = autoLoopEnabled ?? autoLoop ?? true;

  const handleContinueCounting = () => {
    increment();
    if (setActiveTab) setActiveTab('tasbeeh_main_dark_mode');
  };

  const handleStartNewSession = () => {
    reset();
    if (setActiveTab) setActiveTab('tasbeeh_main_dark_mode');
  };

  const handleLogAndHistory = () => {
    if (currentCount > 0) {
      saveSession(currentCount);
      reset();
    }
    if (setActiveTab) setActiveTab('tasbeeh_history_dark_mode');
  };

  const handleSave = () => {
    toast.success(t('toasts.prefsSaved', 'Preferences saved successfully!'));
    if (setActiveTab) setActiveTab('tasbeeh_main_dark_mode');
    else if (goBack) goBack('tasbeeh_main_dark_mode');
  };

  const handleLivePreview = () => {
    setPreviewPulse(true);
    setTimeout(() => setPreviewPulse(false), 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between select-none relative">
      <div className="flex-1">
        {/* Top Header Bar */}
        <div className="sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex items-center justify-between px-5 pt-6 pb-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
              <SlidersHorizontal className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-base font-bold text-white tracking-tight">
              {t('tasbeeh.tasbeehPreferences', 'Tasbeeh Preferences')}</h1>
</div>
<div className="flex items-center gap-2">
            <button 
              type="button"
              onClick={() => (goBack ? goBack('tasbeeh_main_dark_mode') : (setActiveTab ? setActiveTab('tasbeeh_main_dark_mode') : window.history.back()))}
              className="p-2 rounded-full text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer select-none"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <UserAvatar 
            setActiveTab={setActiveTab} 
          />
          </div>
        </div>

        {/* Counter Behavior Card */}
        <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/15 border border-primary/50 text-primary flex items-center justify-center flex-shrink-0 shadow-sm">
              <SlidersHorizontal className="w-5 h-5"/>
            </div>
            <div>
              <h2 className="text-sm font-bold text-white leading-snug">
                {t('tasbeeh.counterBehavior', 'Counter Behavior')}
              </h2>
              <p className="text-xs font-normal text-slate-400 mt-0.5">
                {t('tasbeeh.physicalButtonMappings', 'Physical button mappings and screen states')}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <div>
              <h4 className="text-xs font-bold text-white">
                {t('tasbeeh.keepScreenAwake', 'Keep Screen Awake during Dhikr')}
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {t('tasbeeh.preventsAutoLock', 'Prevents auto-locking while counting beads')}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input 
                type="checkbox" 
                checked={isKeepAwakeActive} 
                onChange={toggleKeepAwake} 
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-inner"></div>
            </label>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-800">
            <div>
              <h4 className="text-xs font-bold text-white">
                {t('tasbeeh.fullScreenTapMode', 'Full Screen Tap Mode')}
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {t('tasbeeh.tapAnywhereScreen', 'Tap anywhere on screen to count instead of button')}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input 
                type="checkbox" 
                checked={isFullScreenTapActive} 
                onChange={toggleFullScreenTap} 
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-inner"></div>
            </label>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-800">
            <div>
              <h4 className="text-xs font-bold text-white">
                {t('tasbeeh.volumeKeysCounting', 'Volume Keys for Counting')}
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {t('tasbeeh.useHardwareVolume', 'Use hardware volume up button to increment')}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input 
                type="checkbox" 
                checked={isVolumeKeysActive} 
                onChange={toggleVolumeKeys} 
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-inner"></div>
            </label>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-800">
            <div>
              <h4 className="text-xs font-bold text-white">
                {t('tasbeeh.autoLoopNextCycle', 'Auto-Loop to Next Cycle')}
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {t('tasbeeh.autoRestartCount', 'Automatically restart count after reaching target')}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input 
                type="checkbox" 
                checked={isAutoLoopActive} 
                onChange={toggleAutoLoop} 
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-inner"></div>
            </label>
          </div>
        </div>

        {/* Completion Ritual Preview Card */}
        <div className="flex items-center justify-between px-5 mb-2.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t('tasbeeh.completionRitualPreview', 'Completion Ritual Preview')}</span>
          <button 
            type="button"
            onClick={handleLivePreview}
            className="text-xs font-semibold text-primary hover:text-primary flex items-center gap-1 cursor-pointer select-none"
          >
            <Eye className="w-3.5 h-3.5"/>
            <span>{t('tasbeeh.livePreview', 'Live Preview')}</span>
          </button>
        </div>

        <div className={`block mx-5 mb-6 p-6 rounded-3xl text-center space-y-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl transition-transform duration-300 ${previewPulse ? 'scale-[1.02] ring-2 ring-primary' : ''}`}>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-bold bg-primary/20 border border-primary/30 text-primary shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary"/>
            <Sparkles className="w-3.5 h-3.5 text-amber-400"/>
            <span>{t('tasbeeh.targetReached', 'TARGET REACHED')} • {activePreset?.target || 33} OF {activePreset?.target || 33}</span>
          </div>

          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-primary-container text-white flex items-center justify-center mx-auto shadow-lg shadow-black/40 ring-4 ring-slate-800">
            <Check className="w-7 h-7 stroke-[2.8] text-white"/>
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-bold text-white tracking-tight">
              {t('tasbeeh.cycleComplete', 'Alhamdulillah! Cycle Complete')}
            </h3>
            <p className="text-xs font-normal text-slate-400 max-w-xs mx-auto leading-relaxed">
              {t('tasbeeh.mayAllahAccept', 'May Allah accept your dhikr and fill your day with barakah and tranquility.')}
            </p>
          </div>

          <div className="pt-2 space-y-2.5">
            <button 
              type="button"
              onClick={handleContinueCounting}
              className="w-full py-3.5 px-5 rounded-2xl bg-primary hover:bg-primary text-white font-semibold text-xs shadow-md shadow-primary/30 flex items-center justify-center gap-2 transition-all cursor-pointer select-none active:scale-[0.99]"
            >
              <PlusCircle className="w-4 h-4"/>
              <span>{t('tasbeeh.continueCounting', 'Continue Counting (+)')}</span>
            </button>
            <button 
              type="button"
              onClick={handleStartNewSession}
              className="w-full py-2.5 text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer select-none"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400"/>
              <span>{t('tasbeeh.startNewSession', 'Start New Session')}</span>
            </button>
            <button 
              type="button"
              onClick={handleLogAndHistory}
              className="text-xs font-semibold text-primary hover:text-primary block mx-auto transition-colors pt-1 cursor-pointer select-none"
            >
              {t('tasbeeh.logViewHistory', 'Log & View in History →')}
            </button>
          </div>
        </div>

        {/* Standardized Bottom Save Action & Sync Footer */}
        <div className="px-5 pb-10 space-y-2.5 text-center">
          <button 
            type="button"
            onClick={handleSave}
            className="btn-primary w-full flex items-center justify-center gap-2 cursor-pointer select-none"
          >
            <span>{t('tasbeeh.savePreferences', 'Save Tasbeeh Preferences')}</span>
            <ArrowRight className="w-4 h-4"/>
          </button>
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-normal text-slate-500">
            <Lock className="w-3 h-3 text-slate-500"/>
            <span>{t('settings.preferencesSyncSecurely', 'Preferences sync automatically to your local device')}</span>
          </div>
        </div>

      </div>
    </div>
  );
}