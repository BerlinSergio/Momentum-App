import React from 'react';

import { Palette, ArrowLeft } from 'lucide-react';

export default function AppearanceLightMode({ setActiveTab }) {
  return (
    <>
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
            <Palette className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-slate-900 tracking-tight">
            Appearance
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setActiveTab && setActiveTab('home_dashboard_light_mode')} className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"><ArrowLeft className="w-5 h-5"/></button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            A
          </div>
        </div>
      </div><main className="flex-1 flex flex-col relative w-full px-margin pb-safe bg-surface"><div className="flex flex-col w-full pb-12">
{/*  Top Utility Bar: Secondary Action Context  */}
<div className="flex items-center justify-between py-space-sm mb-space-sm">
<div className="flex items-center gap-space-xs">
<span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary">
<span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>palette</span>
</span>
<span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Visual Language</span>
</div>
<button className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors px-space-sm py-1 rounded-full bg-surface-container/60 hover:bg-surface-container active:scale-95 transition-all" id="reset-btn" type="button">
      Reset Default
    </button>
</div>
{/*  Live Mini Mockup Preview Box  */}
<div className="relative w-full overflow-hidden rounded-3xl p-5 mb-5 space-y-4 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="flex h-2.5 w-2.5 rounded-full bg-tertiary"></span>
<span className="font-label-md text-label-md text-on-surface">Interactive Canvas Preview</span>
</div>
{/*  Instant Toggle Preview Button  */}
<button className="flex items-center gap-1 px-space-sm py-1 rounded-full bg-surface-container-lowest/80 text-primary font-label-sm text-label-sm shadow-sm hover:bg-surface-container-lowest active:scale-95 transition-all" id="toggle-preview-mode" type="button">
<span className="material-symbols-outlined text-[14px]">swap_horiz</span>
<span id="preview-toggle-text">Preview Dark</span>
</button>
</div>
{/*  The Micro Phone Shell  */}
<div className="relative w-full rounded-DEFAULT p-space-md transition-all duration-500 bg-surface-container-lowest/80 backdrop-blur-xl shadow-xl overflow-hidden" id="preview-canvas">
{/*  Ambient Gradient Aura inside preview  */}
<div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/15 blur-2xl pointer-events-none transition-colors duration-500" id="aura-pill"></div>
{/*  Mini Header in Preview  */}
<div className="flex items-center justify-between mb-space-md relative z-10">
<div className="flex items-center gap-space-xs">
<div className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-tertiary flex items-center justify-center text-on-primary">
<span className="material-symbols-outlined text-[13px]">spa</span>
</div>
<div>
<div className="font-headline-sm text-headline-sm text-on-surface leading-none" id="preview-app-title">Momentum</div>
<div className="font-label-sm text-label-sm text-on-surface-variant" id="preview-app-sub">Morning Sanctuary</div>
</div>
</div>
<span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">Active</span>
</div>
{/*  Mini Frosted Widget Card inside preview  */}
<div className="relative rounded-DEFAULT p-space-sm mb-space-md bg-surface-container-low/70 backdrop-blur-lg shadow-sm transition-all duration-500" id="preview-inner-card">
<div className="flex items-center justify-between mb-2">
<span className="font-label-md text-label-md text-on-surface" id="preview-card-headline">Daily Centering</span>
<span className="font-label-sm text-label-sm text-tertiary font-medium">85% Clear</span>
</div>
{/*  Progress Bar Mockup  */}
<div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
<div className="bg-gradient-to-r from-primary to-tertiary h-1.5 rounded-full w-[85%] transition-all duration-300" id="preview-progress-fill"></div>
</div>
<div className="flex items-center gap-2 mt-2">
<span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary text-on-primary text-[10px]">
<span className="material-symbols-outlined text-[10px]">check</span>
</span>
<span className="font-body-sm text-body-sm text-on-surface-variant" id="preview-task-name">Pranayama Breathwork (12m)</span>
</div>
</div>
{/*  Mini Bottom Navigation Dock in preview  */}
<div className="w-full rounded-full py-1 px- space-md flex items-center justify-between bg-surface-container-lowest/90 backdrop-blur-3xl shadow-sm transition-all duration-500" id="preview-dock">
<span className="material-symbols-outlined text-[18px] text-primary" style={{fontVariationSettings: '"FILL" 1'}}>cottage</span>
<span className="material-symbols-outlined text-[18px] text-on-surface-variant">checklist</span>
<div className="w-8 h-8 -my-2 rounded-full bg-gradient-to-r from-primary via-secondary-container to-tertiary text-on-primary flex items-center justify-center shadow-md">
<span className="material-symbols-outlined text-[16px]">add</span>
</div>
<span className="material-symbols-outlined text-[18px] text-on-surface-variant">insights</span>
<span className="material-symbols-outlined text-[18px] text-on-surface-variant">person</span>
</div>
</div>
</div>
{/*  Primary Theme Mode Selection (3 Cards)  */}
<div className="rounded-3xl p-5 mb-5 space-y-4 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<div className="flex items-center justify-between">
<h2 className="font-headline-md text-headline-md text-on-surface">Display Theme</h2>
<span className="font-label-sm text-label-sm text-on-surface-variant">Atmosphere</span>
</div>
<div aria-label="Theme Mode Selection" className="flex flex-col gap-space-sm" role="radiogroup">
{/*  Option 1: Light Mode (Active)  */}
<div className="group relative rounded-2xl p-4 cursor-pointer transition-all duration-200 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg" id="theme-card-light" >
<div className="flex items-start gap-space-md">
<div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-fixed to-primary-container/20 flex items-center justify-center text-primary shrink-0 shadow-sm">
<span className="material-symbols-outlined text-[24px]" style={{fontVariationSettings: '"FILL" 1'}}>light_mode</span>
</div>
<div className="flex-1 min-w-0 pr-6">
<div className="flex items-center gap-space-xs">
<span className="font-headline-sm text-headline-sm text-on-surface">Light Mode</span>
<span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-primary/10 text-primary">Selected</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Clean, luminous aesthetic with frosted glass and atmospheric radiance. Optimized for daylight clarity and focus.
            </p>
</div>
<div className="absolute top-space-md right-space-md w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-sm">
<span className="material-symbols-outlined text-[16px]">check</span>
</div>
</div>
</div>
{/*  Option 2: Dark Mode  */}
<div className="group relative rounded-2xl p-4 cursor-pointer transition-all duration-200 active:scale-[0.99] bg-white/70 backdrop-blur-md border border-white/80 shadow-lg" id="theme-card-dark" >
<div className="flex items-start gap-space-md">
<div className="w-10 h-10 rounded-full bg-inverse-surface/10 flex items-center justify-center text-on-surface shrink-0">
<span className="material-symbols-outlined text-[24px]">dark_mode</span>
</div>
<div className="flex-1 min-w-0 pr-6">
<span className="font-headline-sm text-headline-sm text-on-surface">Dark Sanctuary</span>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Deep nocturnal sanctuary with restful obsidian depths and low-light visual comfort for evening reflection.
            </p>
</div>
<div className="hidden absolute top-space-md right-space-md w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center" id="check-dark">
<span className="material-symbols-outlined text-[16px]">check</span>
</div>
</div>
</div>
{/*  Option 3: System Match  */}
<div className="group relative rounded-2xl p-4 cursor-pointer transition-all duration-200 active:scale-[0.99] bg-white/70 backdrop-blur-md border border-white/80 shadow-lg" id="theme-card-system" >
<div className="flex items-start gap-space-md">
<div className="w-10 h-10 rounded-full bg-secondary-fixed/50 flex items-center justify-center text-secondary shrink-0">
<span className="material-symbols-outlined text-[24px]">routine</span>
</div>
<div className="flex-1 min-w-0 pr-6">
<span className="font-headline-sm text-headline-sm text-on-surface">System Rhythm</span>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Follows celestial daylight cycles. Seamlessly shifts between dawn brilliance and nocturnal twilight.
            </p>
</div>
<div className="hidden absolute top-space-md right-space-md w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center" id="check-system">
<span className="material-symbols-outlined text-[16px]">check</span>
</div>
</div>
</div>
</div>
</div>
{/*  Accent Luminescence / Tint Presets  */}
<div className="rounded-3xl p-5 mb-5 space-y-4 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<div className="flex items-center justify-between mb-space-xs">
<h3 className="font-headline-sm text-headline-sm text-on-surface">Chromatic Aura</h3>
<span className="font-label-md text-label-md text-primary" id="current-accent-label">Luminous Indigo</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
      Subtle ambient glow reflected across frosted navigation docks, buttons, and metrics.
    </p>
{/*  Color Swatches Grid  */}
<div aria-label="Accent Palette Selection" className="grid grid-cols-5 gap-space-sm" role="radiogroup">
{/*  Preset 1: Indigo (Active)  */}
<button aria-label="Luminous Indigo" className="accent-swatch group flex flex-col items-center gap-1.5 focus:outline-none"  type="button">
<div className="w-11 h-11 rounded-full shadow-sm bg-primary flex items-center justify-center text-on-primary shadow-md ring-offset-2 ring-primary" id="swatch-indigo">
<span className="material-symbols-outlined text-[18px]">check</span>
</div>
<span className="font-label-sm text-label-sm text-on-surface text-center font-medium">Indigo</span>
</button>
{/*  Preset 2: Emerald  */}
<button aria-label="Emerald Oasis" className="accent-swatch group flex flex-col items-center gap-1.5 focus:outline-none"  type="button">
<div className="w-11 h-11 rounded-full shadow-sm bg-tertiary flex items-center justify-center text-on-tertiary shadow-sm hover:scale-105 transition-transform" id="swatch-emerald">
<span className="material-symbols-outlined text-[18px] opacity-0 group-hover:opacity-100 transition-opacity">check</span>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant text-center">Oasis</span>
</button>
{/*  Preset 3: Amber  */}
<button aria-label="Amber Dawn" className="accent-swatch group flex flex-col items-center gap-1.5 focus:outline-none"  type="button">
<div className="w-11 h-11 rounded-full shadow-sm bg-amber-500 flex items-center justify-center text-white shadow-sm hover:scale-105 transition-transform" id="swatch-amber">
<span className="material-symbols-outlined text-[18px] opacity-0 group-hover:opacity-100 transition-opacity">check</span>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant text-center">Dawn</span>
</button>
{/*  Preset 4: Rose  */}
<button aria-label="Rose Radiance" className="accent-swatch group flex flex-col items-center gap-1.5 focus:outline-none"  type="button">
<div className="w-11 h-11 rounded-full shadow-sm bg-rose-500 flex items-center justify-center text-white shadow-sm hover:scale-105 transition-transform" id="swatch-rose">
<span className="material-symbols-outlined text-[18px] opacity-0 group-hover:opacity-100 transition-opacity">check</span>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant text-center">Rose</span>
</button>
{/*  Preset 5: Cyan  */}
<button aria-label="Sky Cyan" className="accent-swatch group flex flex-col items-center gap-1.5 focus:outline-none"  type="button">
<div className="w-11 h-11 rounded-full shadow-sm bg-sky-500 flex items-center justify-center text-white shadow-sm hover:scale-105 transition-transform" id="swatch-cyan">
<span className="material-symbols-outlined text-[18px] opacity-0 group-hover:opacity-100 transition-opacity">check</span>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant text-center">Cyan</span>
</button>
</div>
</div>
{/*  Translucency & Motion Preferences  */}
<div className="rounded-3xl p-5 mb-5 space-y-4 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-sm">Glassmorphic Physics</h3>
<div className="flex flex-col gap-space-md">
{/*  Toggle 1: Frosted Translucency  */}
<div className="flex items-center justify-between">
<div className="pr-space-md">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary text-[18px]">blur_on</span>
<span className="font-body-lg text-body-lg text-on-surface font-semibold">Frosted Glass Effects</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            Render multi-layer blur filters and edge reflections over wallpaper.
          </p>
</div>
<button aria-checked="true" className="relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full bg-primary p-0.5 transition-colors duration-200 ease-in-out focus:outline-none shadow-sm" id="toggle-glass"  role="switch" type="button">
<span className="pointer-events-none inline-block h-6 w-6 transform rounded-full bg-surface shadow-md ring-0 transition duration-200 ease-in-out translate-x-5" id="knob-glass"></span>
</button>
</div>
{/*  Toggle 2: Gentle Motion  */}
<div className="flex items-center justify-between pt-space-sm">
<div className="pr-space-md">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary text-[18px]">air</span>
<span className="font-body-lg text-body-lg text-on-surface font-semibold">Gentle Transitions</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            Calm, physics-based page morphing and organic card elevations.
          </p>
</div>
<button aria-checked="true" className="relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full bg-primary p-0.5 transition-colors duration-200 ease-in-out focus:outline-none shadow-sm" id="toggle-motion"  role="switch" type="button">
<span className="pointer-events-none inline-block h-6 w-6 transform rounded-full bg-surface shadow-md ring-0 transition duration-200 ease-in-out translate-x-5" id="knob-motion"></span>
</button>
</div>
</div>
</div>
{/*  Background Library & Wallpaper Shortcut  */}
<div className="rounded-3xl p-5 mb-5 space-y-4 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<div className="flex items-center justify-between mb-space-xs">
<h3 className="font-headline-sm text-headline-sm text-on-surface">Atmospheric Canvas</h3>
<span className="font-label-sm text-label-sm text-on-surface-variant">Default Ambient</span>
</div>
<div className="relative rounded-DEFAULT overflow-hidden bg-surface-container-low p-space-md shadow-sm group cursor-pointer hover:shadow-md transition-shadow">
<div className="flex items-center gap-space-md">
{/*  Thumbnail Placeholder with data-alt  */}
<div className="relative w-16 h-16 rounded-DEFAULT overflow-hidden shrink-0 shadow-sm">
<img className="w-full h-full object-cover" data-alt="A tranquil morning seascape with pastel watercolor gradients, soft powder blue, delicate lilac mist, and warm golden sunrise reflection on gentle ripples, shot in ethereal minimalist style with luminous airy lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDssiR26j8sTUNO43pGWN3KRoiha4FHhqKVhpQeOLpkTXcgXeeGOH3ie0QZfAReV8GDn2RYUMOXjdS-L0kcA_ltLvDbZIR0RzUqYmMy43fzZklx7JqVsfEVwFEKvm4o8MOodHYI4BrOwH_GM8bZHhNPAsHOnRPklY6JbAseRtsTwr6ipWPB1lcKqd7KGMtwGem9UBz8DhNMSlU6_ifnSTbgb7lTJhLCkexS5wx6pIgUNlpHmbbjpUE"/>
<div className="absolute inset-0 bg-primary/10"></div>
</div>
<div className="flex-1 min-w-0">
<div className="flex items-center gap-1.5">
<span className="font-headline-sm text-headline-sm text-on-surface truncate">Serene Horizon</span>
<span className="material-symbols-outlined text-[14px] text-tertiary">verified</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 truncate">
            Pastel sky and mist with 32px diffuse glass refraction.
          </p>
<div className="flex items-center gap-1 mt-1 text-primary font-label-md text-label-md">
<span>Customize Wallpaper</span>
<span className="material-symbols-outlined text-[14px]">arrow_forward</span>
</div>
</div>
</div>
</div>
</div>
{/*  Primary Apply Action Button  */}
<div className="w-full mt-auto mb-space-md">
<button className="w-full py-4 rounded-2xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]" id="apply-btn" type="button">
<span>Apply Appearance Preferences</span>
<span className="material-symbols-outlined text-[20px]">check_circle</span>
</button>
<div className="opacity-0 transition-opacity duration-300 text-center font-label-md text-label-md text-tertiary mt-2" id="toast-message">
      Preferences saved and applied to your ecosystem
    </div>
</div>
</div>
</main>
    </>
  );
}
