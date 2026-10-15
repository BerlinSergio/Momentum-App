import React from 'react';
import { useWallpaper } from './context/WallpaperContext';

import { Sliders, ArrowLeft } from 'lucide-react';

export default function BackgroundPreviewBlurControlLightMode({ setActiveTab }) {
  const { currentWallpaper, blurLevel, setBlurLevel } = useWallpaper();
  return (
    <>
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
            <Sliders className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-indigo-950 tracking-tight" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>
            Background Blur Control
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setActiveTab && setActiveTab('home_dashboard_light_mode')} className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"><ArrowLeft className="w-5 h-5"/></button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            A
          </div>
        </div>
      </div><main className="flex-1 flex flex-col relative w-full px-margin pb-safe bg-surface"><div className="flex flex-col w-full pb-8 select-none">
{/*  Interactive Background Canvas Wrapper  */}
<div className="relative w-full overflow-hidden rounded-3xl p-5 mb-5 space-y-4 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
{/*  Simulated Immersive Wallpaper Layer  */}
<div className="absolute inset-0 bg-cover bg-center transition-all duration-300 ease-out transform scale-105" data-alt="A tranquil minimalist sunrise over calm ocean water with soft pastel peach, lavender, ethereal cyan atmospheric sky, silky gradient light, serene and meditative fine art photography." id="wallpaper-surface" style={{backgroundImage: `url('${currentWallpaper?.url || 'https://picsum.photos/seed/serene-dawn/720/1280'}')`, filter: `blur(${blurLevel}px)`}}>
</div>
{/*  Dynamic Dimming Scrim Layer  */}
<div className="absolute inset-0 bg-on-background/10 transition-opacity duration-300 ease-in-out pointer-events-none" id="wallpaper-dim-layer"></div>
{/*  Inner Context Area  */}
<div className="relative z-10 p-space-md flex flex-col gap-3 min-h-[440px]">
{/*  Top Micro Sub-bar inside Preview Shell  */}
<div className="flex items-center justify-between px-space-md py-space-xs rounded-full bg-surface-container-lowest/80 backdrop-blur-md shadow-sm">
<div className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
<span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Live Canvas Simulator</span>
</div>
<div className="flex items-center gap-1 bg-surface-container-high/60 px-2 py-0.5 rounded-full">
<span className="material-symbols-outlined text-[13px] text-primary">wallpaper</span>
<span className="font-label-sm text-label-sm text-primary font-semibold">{currentWallpaper?.title || 'Serene Horizon'}</span>
</div>
</div>
{/*  Live Mockup UI Preview Container  */}
<div className="flex flex-col gap-2.5 my-auto px-1 py-2">
{/*  Mock Floating Header Pill  */}
<div className="self-start px-3.5 py-1.5 rounded-full bg-surface-container-lowest/75 backdrop-blur-xl shadow-sm flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[15px]" style={{fontVariationSettings: '"FILL" 1'}}>wb_twilight</span>
<p className="font-label-md text-label-md text-on-surface">Good morning, Aisha <span className="text-outline mx-1">•</span> <span className="text-tertiary font-semibold">Fajr in 12m</span></p>
</div>
{/*  Mock Card 1: Daily Task Widget  */}
<div className="p-3.5 rounded-2xl flex items-center justify-between bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<div className="flex items-center gap-3 min-w-0">
<div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow-sm shrink-0">
<span className="material-symbols-outlined text-on-primary text-[16px]">check</span>
</div>
<div className="min-w-0">
<h4 className="font-headline-sm text-headline-sm text-on-surface truncate">Review financial milestones</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[13px] text-tertiary">schedule</span> Focus routine • 15 mins
              </p>
</div>
</div>
<span className="px-2 py-1 rounded-full bg-surface-container text-on-primary-fixed-variant font-label-sm text-label-sm shrink-0">Priority</span>
</div>
{/*  Mock Card 2: Prayer Times Card with Serene Motifs  */}
<div className="p-4 rounded-2xl relative overflow-hidden bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<div className="absolute -right-3 -bottom-3 opacity-15 pointer-events-none text-secondary">
<span className="material-symbols-outlined text-[72px]">mosque</span>
</div>
<div className="flex items-center justify-between mb-2.5">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-secondary text-[18px]">bedtime</span>
<span className="font-headline-sm text-headline-sm text-on-surface">Next: Fajr Prayer</span>
</div>
<span className="font-label-md text-label-md px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed">05:14 AM</span>
</div>
<div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden mb-1.5">
<div className="bg-gradient-to-r from-tertiary-fixed-dim via-primary to-secondary h-full rounded-full w-4/5"></div>
</div>
<div className="flex justify-between items-center text-on-surface-variant">
<span className="font-body-sm text-body-sm">Calm focus window</span>
<span className="font-label-sm text-label-sm font-semibold text-primary">82% completed</span>
</div>
</div>
{/*  Mock Dock Nav Bar Preview  */}
<div className="mx-auto w-11/12 py-2 px-4 rounded-full bg-surface-container-lowest/80 backdrop-blur-xl shadow-lg flex items-center justify-between mt-1">
<div className="flex items-center gap-1 text-primary">
<span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>home</span>
<span className="font-label-sm text-label-sm font-semibold">Home</span>
</div>
<div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary via-secondary to-tertiary flex items-center justify-center shadow-md -my-3">
<span className="material-symbols-outlined text-on-primary text-[20px]">add</span>
</div>
<div className="flex items-center gap-1 text-on-surface-variant opacity-70">
<span className="material-symbols-outlined text-[18px]">calendar_today</span>
<span className="font-label-sm text-label-sm">Planner</span>
</div>
</div>
</div>
{/*  Quick Blur Indicator Badge  */}
<div className="self-center mt-auto">
<span className="font-label-sm text-label-sm font-semibold px-3 py-1 rounded-full bg-surface-container-lowest/85 backdrop-blur-md shadow-sm text-on-surface flex items-center gap-1.5" id="floating-badge-val">
<span className="material-symbols-outlined text-[14px] text-primary">blur_on</span>
          Live Rendering: {blurLevel}px blur
        </span>
</div>
</div>
</div>
{/*  Blur Control Floating Panel  */}
<div className="w-full flex flex-col rounded-3xl p-5 mb-5 space-y-4 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
{/*  Header of Controller Card  */}
<div className="flex items-center justify-between mb-2">
<h2 className="text-base font-bold text-slate-800">Background Blur Intensity</h2>
<span className="px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold tracking-tight shadow-sm">{blurLevel} px</span>
</div>
{/*  Active Blur Description Callout  */}
<div className="px-3.5 py-2 rounded-2xl flex items-center justify-between bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[20px]">recommend</span>
<span className="font-body-md text-body-md text-on-surface font-medium" id="blur-status-label">{blurLevel <= 8 ? 'Subtle Depth (Minimal)' : blurLevel <= 20 ? 'Soft Focus (Recommended)' : 'Deep Focus (Maximum)'}</span>
</div>
<span className="font-label-sm text-label-sm text-tertiary font-semibold uppercase tracking-wider">Optimal Contrast</span>
</div>
{/*  Custom Stepped Range Slider Area  */}
<div className="flex flex-col gap-2.5">
<div className="relative flex items-center w-full py-1">
<input className="w-full h-2 rounded-full appearance-none cursor-pointer bg-surface-container-highest accent-primary" id="blur-range-slider" max="40" min="0" step="1" type="range" value={blurLevel} onChange={(e) => setBlurLevel(parseInt(e.target.value, 10) || 0)}/>
</div>
{/*  Quick Preset Stop Chips  */}
<div className="grid grid-cols-5 gap-2 pt-1">
<button onClick={() => setBlurLevel(0)} className="rounded-2xl p-2.5 text-center transition-all border font-medium text-xs bg-slate-50 border-slate-200/70 text-slate-700 hover:bg-slate-100 flex flex-col items-center justify-center gap-0.5" data-val="0" type="button">
<span>Crisp</span>
<span className="text-[10px] opacity-70">0px</span>
</button>
<button onClick={() => setBlurLevel(8)} className="rounded-2xl p-2.5 text-center transition-all border font-medium text-xs bg-slate-50 border-slate-200/70 text-slate-700 hover:bg-slate-100 flex flex-col items-center justify-center gap-0.5" data-val="8" type="button">
<span>Subtle</span>
<span className="text-[10px] opacity-70">8px</span>
</button>
<button onClick={() => setBlurLevel(18)} className="rounded-2xl p-2.5 text-center transition-all border font-medium text-xs bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/30 flex flex-col items-center justify-center gap-0.5" data-val="18" type="button">
<span>Soft</span>
<span className="text-[10px] opacity-80">18px</span>
</button>
<button onClick={() => setBlurLevel(28)} className="rounded-2xl p-2.5 text-center transition-all border font-medium text-xs bg-slate-50 border-slate-200/70 text-slate-700 hover:bg-slate-100 flex flex-col items-center justify-center gap-0.5" data-val="28" type="button">
<span>Deep</span>
<span className="text-[10px] opacity-70">28px</span>
</button>
<button onClick={() => setBlurLevel(40)} className="rounded-2xl p-2.5 text-center transition-all border font-medium text-xs bg-slate-50 border-slate-200/70 text-slate-700 hover:bg-slate-100 flex flex-col items-center justify-center gap-0.5" data-val="40" type="button">
<span>Dreamy</span>
<span className="text-[10px] opacity-70">40px</span>
</button>
</div>
</div>
{/*  Secondary Preferences / Toggles  */}
<div className="flex flex-col gap-3 pt-2">
{/*  Sync with Dark Mode Toggle  */}
<label className="flex items-center justify-between p-3.5 rounded-2xl cursor-pointer bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
<span className="material-symbols-outlined text-[18px]">sync_alt</span>
</div>
<div>
<div className="font-headline-sm text-headline-sm text-on-surface">Sync Blur with Dark Mode</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">Auto-scales depth when dark theme triggers</div>
</div>
</div>
<input checked="" className="w-5 h-5 rounded accent-primary cursor-pointer" type="checkbox"/>
</label>
{/*  Soft Dim Toggle  */}
<label className="flex items-center justify-between p-3.5 rounded-2xl cursor-pointer bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface">
<span className="material-symbols-outlined text-[18px]">brightness_medium</span>
</div>
<div>
<div className="font-headline-sm text-headline-sm text-on-surface">Dim wallpaper slightly</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">+10% subtle scrim to enhance readability</div>
</div>
</div>
<input checked="" className="w-5 h-5 rounded accent-primary cursor-pointer" id="dim-toggle" onchange="toggleWallpaperDim(this.checked)" type="checkbox"/>
</label>
</div>
{/*  Dual Action Buttons  */}
<div className="flex flex-row items-center gap-3 pt-3">
<button onClick={() => setBlurLevel(14)} className="h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-sm shrink-0" type="button">
<span className="material-symbols-outlined text-[18px]">restart_alt</span>
<span>Reset Blur</span>
</button>
<button onClick={() => setActiveTab && setActiveTab('home_dashboard_light_mode')} className="flex-1 h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all" type="button">
<span>Apply to All</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
</div>
</div>
{/*  Toast Confirmation Feedback  */}
<div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-full bg-inverse-surface text-inverse-on-surface font-body-sm text-body-sm flex items-center gap-2 shadow-xl opacity-0 pointer-events-none transition-all duration-300" id="toast-feedback">
<span className="material-symbols-outlined text-tertiary-fixed text-[18px]">check_circle</span>
<span id="toast-message" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>Blur intensity updated to 18px</span>
</div>
</div>
</main>
    </>
  );
}
