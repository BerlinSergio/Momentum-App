import { useTranslation } from 'react-i18next';
import MomentumGlassHeader from './components/MomentumGlassHeader';
import { useState } from 'react';
import UserAvatar from './components/UserAvatar';
import { useWallpaper } from './context/WallpaperContext';
import { useThemeStore } from './store/useThemeStore';
import { getWallpaperPair } from './data/defaultWallpapers';
import { Sliders, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { toast } from './components/ui/toast/index.js';

export default function BackgroundPreviewBlurControlDarkMode({ setActiveTab, goBack }) {
  const { t } = useTranslation();
  const { currentWallpaper, blurLevel, setBlurLevel } = useWallpaper();
  const activeBackgroundId = useThemeStore((s) => s.activeBackgroundId);
  const customWallpaper = useThemeStore((s) => s.customWallpaper);
  const storeWallpapers = useThemeStore((s) => s.wallpapers);
  const downloadedWallpapers = useThemeStore((s) => s.downloadedWallpapers);
  const {
    blurIntensity = 18,
    syncWithDarkMode = true,
    dimWallpaper = true,
    applyPreferences,
  } = useThemeStore();

  const isNoneActive = activeBackgroundId === 'none';
  const bgPair = getWallpaperPair(activeBackgroundId, customWallpaper, true, storeWallpapers || downloadedWallpapers);
  const currentBgImage = bgPair.activeImage;
  const activeGradient = bgPair.bg?.darkGradient || 'linear-gradient(135deg, #090D16 0%, #1e293b 100%)';
  const activeTitle = isNoneActive ? 'Pure Minimal' : (bgPair.name || currentWallpaper?.title || 'Serene Horizon');

  const [draftBlur, setDraftBlur] = useState(blurIntensity || blurLevel || 18);
  const [draftSyncWithDark, setDraftSyncWithDark] = useState(syncWithDarkMode);
  const [draftDimWallpaper, setDraftDimWallpaper] = useState(dimWallpaper);

  const handleApply = () => {
    applyPreferences({
      blurIntensity: draftBlur,
      syncWithDarkMode: draftSyncWithDark,
      dimWallpaper: draftDimWallpaper,
    });
    if (setBlurLevel) {
      setBlurLevel(draftBlur);
    }
    toast.success(`Blur intensity of ${draftBlur}px applied to all screens!`);
  };

  const handleReset = () => {
    setDraftBlur(18);
    setDraftSyncWithDark(true);
    setDraftDimWallpaper(true);
    toast.info(t('toasts.blurReset', 'Blur intensity reset to default 18px'));
  };

  return (
    <>
      {/* Top Header Bar */}
      <MomentumGlassHeader isDarkMode={true}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
            <Sliders className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-white tracking-tight">
            {t('appearance.backgroundBlurControl', 'Background Blur Control')}</h1>
</div>
<div className="flex items-center gap-2">
          <button onClick={() => (goBack ? goBack('background_wallpaper_library_dark_mode') : (setActiveTab ? setActiveTab('background_wallpaper_library_dark_mode') : window.history.back()))} className="p-2 rounded-full text-slate-300 hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <UserAvatar 
            setActiveTab={setActiveTab} 
          />
        </div>
      </MomentumGlassHeader>

      <main className="flex-1 flex flex-col relative w-full px-margin pb-safe bg-slate-900">
        <div className="flex flex-col w-full pb-8 select-none">
          {/* Interactive Background Canvas Wrapper */}
          <div className="relative w-full overflow-hidden rounded-3xl p-5 mb-5 space-y-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
            {/* Simulated Immersive Wallpaper Layer */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-300 ease-out transform scale-105"
              id="wallpaper-surface"
              style={{
                backgroundImage: isNoneActive ? 'none' : (currentBgImage ? `url("${currentBgImage}"), ${activeGradient}` : activeGradient),
                backgroundColor: '#090D16',
                filter: isNoneActive ? 'none' : `blur(${draftBlur}px)`,
              }}
            />
            {/* Dynamic Dimming Scrim Layer */}
            <div
              className={`absolute inset-0 transition-opacity duration-300 ease-in-out pointer-events-none ${
                draftDimWallpaper && !isNoneActive ? 'bg-black/35' : 'bg-transparent'
              }`}
              id="wallpaper-dim-layer"
            />

            {/* Inner Context Area */}
            <div className="relative z-10 p-space-md flex flex-col gap-3 min-h-[440px]">
              {/* Top Micro Sub-bar inside Preview Shell */}
              <div
                className="flex items-center justify-between px-space-md py-space-xs rounded-full bg-slate-900/80 border border-white/10 shadow-sm"
                style={{ backdropFilter: isNoneActive ? 'none' : `blur(${draftBlur}px)`, WebkitBackdropFilter: isNoneActive ? 'none' : `blur(${draftBlur}px)` }}
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                  <span className="text-xs text-slate-300 font-semibold">{isNoneActive ? t('wallpapers.pureMinimalSolidSimulator', 'Pure Minimal Solid Simulator') : t('wallpapers.liveCanvasSimulator', 'Live Canvas Simulator')}</span>
                </div>
                <div className="flex items-center gap-1 bg-primary/20 px-2 py-0.5 rounded-full border border-primary/30">
                  <span className="material-symbols-outlined text-[13px] text-primary">{isNoneActive ? 'format_paint' : 'wallpaper'}</span>
                  <span className="text-xs text-primary font-bold">{activeTitle}</span>
                </div>
              </div>

              {/* Live Mockup UI Preview Container */}
              <div className="flex flex-col gap-2.5 my-auto px-1 py-2">
                {/* Mock Floating Header Pill */}
                <div
                  className="self-start px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/10 shadow-sm flex items-center gap-2"
                  style={{ backdropFilter: `blur(${draftBlur}px)`, WebkitBackdropFilter: `blur(${draftBlur}px)` }}
                >
                  <span className="material-symbols-outlined text-primary text-[15px]" style={{ fontVariationSettings: '"FILL" 1' }}>wb_twilight</span>
                  <p className="text-xs text-slate-200 font-medium">Aisha <span className="text-slate-500 mx-1">•</span> <span className="text-primary font-bold">{t('prayer.fajrIn12m', 'Fajr in 12m')}</span></p>
                </div>

                {/* Mock Card 1: Daily Task Widget */}
                <div
                  className="p-3.5 rounded-2xl flex items-center justify-between bg-black/40 border border-white/10 shadow-lg"
                  style={{ backdropFilter: `blur(${draftBlur}px)`, WebkitBackdropFilter: `blur(${draftBlur}px)` }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow-sm shrink-0">
                      <span className="material-symbols-outlined text-white text-[16px]">check</span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{t('tasks.reviewFinancialMilestones', 'Review financial milestones')}</h4>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px] text-teal-400">schedule</span> {t('tasks.focusRoutine15m', 'Focus routine • 15 mins')}
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-bold shrink-0">{t('tasks.priority', 'Priority')}</span>
                </div>

                {/* Mock Card 2: Prayer Times Card with Serene Motifs */}
                <div
                  className="p-4 rounded-2xl relative overflow-hidden bg-black/40 border border-white/10 shadow-lg"
                  style={{ backdropFilter: `blur(${draftBlur}px)`, WebkitBackdropFilter: `blur(${draftBlur}px)` }}
                >
                  <div className="absolute -right-3 -bottom-3 opacity-15 pointer-events-none text-primary">
                    <span className="material-symbols-outlined text-[72px]">mosque</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-teal-400 text-[18px]">bedtime</span>
                      <span className="text-xs font-bold text-white">{t('prayer.nextFajrPrayer', 'Next: Fajr Prayer')}</span>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary/20 text-primary">05:14 AM</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden mb-1.5">
                    <div className="bg-primary h-full rounded-full w-4/5"></div>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">{t('prayer.calmFocusWindow', 'Calm focus window')}</span>
                    <span className="font-bold text-primary">{t('tasbeeh.percentCompleted', '{{percent}}% completed', { percent: 82 })}</span>
                  </div>
                </div>

                {/* Mock Dock Nav Bar Preview */}
                <div
                  className="mx-auto w-11/12 py-2 px-4 rounded-full bg-slate-900/85 border border-white/10 shadow-lg flex items-center justify-between mt-1"
                  style={{ backdropFilter: `blur(${draftBlur}px)`, WebkitBackdropFilter: `blur(${draftBlur}px)` }}
                >
                  <div className="flex items-center gap-1 text-primary">
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>home</span>
                    <span className="text-xs font-bold">{t('nav.home', 'Home')}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30 -my-2">
                    <span className="material-symbols-outlined text-[18px]">add</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                    <span className="text-xs font-medium">{t('nav.planner', 'Planner')}</span>
                  </div>
                </div>
              </div>

              {/* Quick Blur Indicator Badge */}
              <div className="self-center mt-auto">
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-900/90 border border-white/10 shadow-sm text-slate-200 flex items-center gap-1.5"
                  id="floating-badge-val"
                  style={{ backdropFilter: `blur(${draftBlur}px)`, WebkitBackdropFilter: `blur(${draftBlur}px)` }}
                >
                  <span className="material-symbols-outlined text-[14px] text-primary">blur_on</span>
                  Live Rendering: {draftBlur}px blur
                </span>
              </div>
            </div>
          </div>

          {/* Blur Control Floating Panel */}
          <div className="w-full flex flex-col rounded-3xl p-5 mb-5 space-y-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
            {/* Header of Controller Card */}
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-bold text-white">{t('appearance.backgroundBlurIntensity', 'Background Blur Intensity')}</h2>
              <span className="px-3.5 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold tracking-tight shadow-xs">
                {draftBlur} px
              </span>
            </div>

            {/* Active Blur Description Callout */}
            <div className="px-3.5 py-2.5 rounded-2xl flex items-center justify-between bg-white/5 border border-white/10 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">recommend</span>
                <span className="text-xs font-semibold text-slate-200" id="blur-status-label">
                  {draftBlur === 0
                    ? 'Zero Blur (Crystal Clarity)'
                    : draftBlur <= 8
                    ? 'Subtle Depth (Minimal Focus)'
                    : draftBlur <= 20
                    ? 'Soft Focus (Optimal Contrast)'
                    : draftBlur <= 32
                    ? 'Deep Sanctuary Focus'
                    : 'Dreamy Ethereal Aura'}
                </span>
              </div>
              <span className="text-[10px] text-teal-400 font-bold uppercase tracking-wider">
                {draftBlur <= 20 ? 'Optimal Contrast' : 'Immersive'}
              </span>
            </div>

            {/* Custom Stepped Range Slider Area */}
            <div className="flex flex-col gap-2.5">
              <div className="relative flex items-center w-full py-1">
                <input
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-800 accent-primary"
                  id="blur-range-slider"
                  max="40"
                  min="0"
                  step="1"
                  type="range"
                  value={draftBlur}
                  onChange={(e) => { const val = parseInt(e.target.value, 10) || 0; setDraftBlur(val); applyPreferences({ blurIntensity: val }); if (setBlurLevel) setBlurLevel(val); }}
                />
              </div>

              {/* Quick Preset Stop Chips */}
              <div className="grid grid-cols-5 gap-2 pt-1">
                {[
                  { label: 'Crisp', val: 0 },
                  { label: 'Subtle', val: 8 },
                  { label: 'Soft', val: 18 },
                  { label: 'Deep', val: 28 },
                  { label: 'Dreamy', val: 40 },
                ].map((preset) => {
                  const isActive = draftBlur === preset.val;
                  return (
                    <button
                      key={preset.val}
                      onClick={() => { setDraftBlur(preset.val); applyPreferences({ blurIntensity: preset.val }); if (setBlurLevel) setBlurLevel(preset.val); }}
                      className={`rounded-2xl p-2.5 text-center transition-all border font-medium text-xs flex flex-col items-center justify-center gap-0.5 ${
                        isActive
                          ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30 font-bold'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                      type="button"
                    >
                      <span>{preset.label}</span>
                      <span className="text-[10px] opacity-75">{preset.val}px</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Secondary Preferences / Toggles */}
            <div className="flex flex-col gap-3 pt-2">
              {/* Sync with Dark Mode Toggle */}
              <label className="flex items-center justify-between p-3.5 rounded-2xl cursor-pointer bg-white/5 border border-white/10 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[18px]">sync_alt</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{t('wallpapers.syncBlurDarkMode', 'Sync Blur with Dark Mode')}</div>
                    <div className="text-[11px] text-slate-400">{t('wallpapers.syncBlurDarkModeDesc', 'Auto-scales depth when dark theme triggers')}</div>
                  </div>
                </div>
                <input
                  checked={draftSyncWithDark}
                  onChange={(e) => { const next = e.target.checked; setDraftSyncWithDark(next); applyPreferences({ syncWithDarkMode: next }); }}
                  className="w-5 h-5 rounded accent-primary cursor-pointer"
                  type="checkbox"
                />
              </label>

              {/* Soft Dim Toggle */}
              <label className="flex items-center justify-between p-3.5 rounded-2xl cursor-pointer bg-white/5 border border-white/10 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[18px]">brightness_medium</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{t('wallpapers.dimWallpaper', 'Dim wallpaper slightly')}</div>
                    <div className="text-[11px] text-slate-400">{t('wallpapers.dimWallpaperDesc', '+10% subtle scrim to enhance readability')}</div>
                  </div>
                </div>
                <input
                  checked={draftDimWallpaper}
                  onChange={(e) => { const next = e.target.checked; setDraftDimWallpaper(next); applyPreferences({ dimWallpaper: next }); }}
                  className="w-5 h-5 rounded accent-primary cursor-pointer"
                  id="dim-toggle"
                  type="checkbox"
                />
              </label>
            </div>

            {/* Dual Action Buttons */}
            <div className="flex flex-row items-center gap-3 pt-3">
              <button
                onClick={handleReset}
                className="h-12 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-xs shrink-0"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                <span>{t('wallpapers.resetBlur', 'Reset Blur')}</span>
              </button>
              <button
                onClick={handleApply}
                className="flex-1 h-12 rounded-xl bg-primary hover:brightness-105 active:scale-[0.99] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-primary/30 transition-all"
                type="button"
              >
                <span>{t('wallpapers.applyToAll', 'Apply to All')}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
