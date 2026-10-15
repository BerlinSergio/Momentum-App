import React from 'react';

import { Info, ArrowLeft } from 'lucide-react';

export default function AboutMomentumLightMode({ setActiveTab }) {
  return (
    <>
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
            <Info className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-slate-900 tracking-tight">
            About Momentum
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
      <main className="flex flex-col flex-1 relative w-full pb-safe bg-transparent"><div className="w-full max-w-md mx-auto px-4 py-4 space-y-6 pb-24 select-none relative">
{/*  Ambient Background Glow Accents  */}
<div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-primary-container/10 blur-[100px] pointer-events-none -z-10"></div>
<div className="absolute top-[480px] right-0 w-64 h-64 rounded-full bg-secondary-container/10 blur-[90px] pointer-events-none -z-10"></div>
<div className="absolute bottom-20 left-0 w-72 h-72 rounded-full bg-tertiary-container/10 blur-[110px] pointer-events-none -z-10"></div>
{/*  1. App Identity Hero Section  */}
<section className="flex flex-col items-center justify-center text-center pt-6 relative">
{/*  Radiant Brand Emblem  */}
<div className="relative group cursor-pointer mt-4 mb-3">
<div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-primary via-tertiary to-secondary opacity-40 blur-lg group-hover:opacity-75 transition-opacity duration-700"></div>
<img 
  src="/logo.png" 
  alt="Momentum Logo" 
  className="relative w-24 h-24 object-cover rounded-3xl aspect-square flex-shrink-0 shadow-2xl shadow-primary-container/20 active:scale-95 transition-transform duration-300 mx-auto"
/>
</div>
{/*  Wordmark & Philosophy  */}
<h2 className="text-3xl font-bold text-on-surface tracking-tight mt-3">Momentum</h2>
<div className="w-fit mx-auto mt-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/80 shadow-sm">
  <p className="text-center text-sm leading-relaxed text-slate-900 font-medium">
    Where sacred time meets mindful living.
  </p>
</div>
{/*  Version Release Pill  */}
<div className="mx-auto inline-flex items-center justify-center gap-2 mt-4 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/80 shadow-sm">
<span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></span>
<span className="font-label-sm text-label-sm text-slate-800 uppercase tracking-wider font-semibold">VERSION 1.0 (BUILD 2026)</span>
</div>
</section>
{/*  2. Authorship & Vision Card  */}
<section className="">
<div className="relative overflow-hidden rounded-2xl p-5 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full pointer-events-none"></div>
<div className="flex items-center gap-4 relative z-10">
<div className="w-11 h-11 rounded-full bg-white/80 border border-white/90 flex items-center justify-center shrink-0 shadow-sm">
<span className="material-symbols-outlined text-tertiary text-[22px]" style={{fontVariationSettings: '"FILL" 1'}}>explore</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-label-sm text-label-sm text-tertiary tracking-widest uppercase">Vision &amp; Craft</span>
<h3 className="font-headline-sm text-headline-sm text-slate-900 font-semibold mt-0.5">Created by Milad Wardak</h3>
</div>
</div>
<p className="font-body-sm text-body-sm text-slate-700 mt-3 leading-relaxed relative z-10">
        Bridging timeless Islamic tradition with modern, mindful design.
      </p>
<div className="mt-4 pt-3 flex items-center gap-2">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 border border-white/90 text-slate-800 font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[13px] text-primary">verified</span>
          DESIGNER &bull; MILAD WARDAK 2026
        </span>
</div>
</div>
</section>
{/*  3. Core Philosophy Section  */}
<section className="">
<div className="w-fit text-left flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-white/70 backdrop-blur-md border border-white/80 shadow-sm">
<span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
<h3 className="font-label-md text-label-md text-slate-900 uppercase tracking-widest font-semibold">Core Philosophy</h3>
</div>
<div className="flex flex-col space-y-3">
{/*  Card 1  */}
<div className="p-5 rounded-2xl transition-colors duration-200 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-white/80 border border-white/90 flex items-center justify-center shrink-0 shadow-sm">
<span className="material-symbols-outlined text-secondary text-[20px]">calendar_month</span>
</div>
<div className="flex flex-col min-w-0">
<h4 className="font-headline-sm text-headline-sm text-slate-900 font-semibold">Tri-Calendar Harmony</h4>
<p className="font-body-sm text-body-sm text-slate-700 mt-1 leading-relaxed">
              Unified flow of Gregorian, Hijri, and Afghan Solar calendars.
            </p>
</div>
</div>
</div>
{/*  Card 2  */}
<div className="p-5 rounded-2xl transition-colors duration-200 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-white/80 border border-white/90 flex items-center justify-center shrink-0 shadow-sm">
<span className="material-symbols-outlined text-primary text-[20px]">enhanced_encryption</span>
</div>
<div className="flex flex-col min-w-0">
<h4 className="font-headline-sm text-headline-sm text-slate-900 font-semibold">Zero-Knowledge Sanctuary</h4>
<p className="font-body-sm text-body-sm text-slate-700 mt-1 leading-relaxed">
              Your sacred journals, financial records, and personal habit data are encrypted locally. No trackers, no data monetization.
            </p>
</div>
</div>
</div>
{/*  Card 3  */}
<div className="p-5 rounded-2xl transition-colors duration-200 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-white/80 border border-white/90 flex items-center justify-center shrink-0 shadow-sm">
<span className="material-symbols-outlined text-tertiary text-[20px]">wb_twilight</span>
</div>
<div className="flex flex-col min-w-0">
<h4 className="font-headline-sm text-headline-sm text-slate-900 font-semibold">Atmospheric Presence</h4>
<p className="font-body-sm text-body-sm text-slate-700 mt-1 leading-relaxed">
              Adaptive themes crafted for visual calm and eye comfort.
            </p>
</div>
</div>
</div>
</div>
</section>
{/*  4. Open Source & Craft Section  */}
<section className="">
<div className="w-fit text-left flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-white/70 backdrop-blur-md border border-white/80 shadow-sm">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
<h3 className="font-label-md text-label-md text-slate-900 uppercase tracking-widest font-semibold">Open Source &amp; Craft</h3>
</div>
<div className="rounded-2xl overflow-hidden bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
{/*  Row 1  */}
<div className="flex items-center justify-between p-4 px-5 hover:bg-white/70 transition-colors">
<div className="flex items-center gap-4 min-w-0">
<div className="w-9 h-9 rounded-full bg-white/80 border border-white/90 flex items-center justify-center shrink-0 shadow-sm">
<span className="material-symbols-outlined text-on-surface-variant text-[18px]">font_download</span>
</div>
<span className="font-body-md text-body-md text-slate-900 font-semibold truncate">Typography</span>
</div>
<span className="font-label-sm text-label-sm text-primary px-2.5 py-1 rounded-full bg-white/80 border border-white/90 shrink-0 ml-2">Inter &amp; Space Grotesk</span>
</div>
<div className="h-[1px] bg-black/5 mx-5"></div>
{/*  Row 2  */}
<div className="flex items-center justify-between p-4 px-5 hover:bg-white/70 transition-colors">
<div className="flex items-center gap-4 min-w-0">
<div className="w-9 h-9 rounded-full bg-white/80 border border-white/90 flex items-center justify-center shrink-0 shadow-sm">
<span className="material-symbols-outlined text-on-surface-variant text-[18px]">public</span>
</div>
<span className="font-body-md text-body-md text-slate-900 font-semibold truncate">Astronomical Engine</span>
</div>
<span className="font-label-sm text-label-sm text-secondary px-2.5 py-1 rounded-full bg-white/80 border border-white/90 shrink-0 ml-2">PrayTimes &amp; Umm al-Qura</span>
</div>
<div className="h-[1px] bg-black/5 mx-5"></div>
{/*  Row 3  */}
<div className="flex items-center justify-between p-4 px-5 hover:bg-white/70 transition-colors">
<div className="flex items-center gap-4 min-w-0">
<div className="w-9 h-9 rounded-full bg-white/80 border border-white/90 flex items-center justify-center shrink-0 shadow-sm">
<span className="material-symbols-outlined text-on-surface-variant text-[18px]">palette</span>
</div>
<span className="font-body-md text-body-md text-slate-900 font-semibold truncate">Design System</span>
</div>
<span className="font-label-sm text-label-sm text-tertiary px-2.5 py-1 rounded-full bg-white/80 border border-white/90 shrink-0 ml-2">Luminous Serenity Nocturne</span>
</div>
</div>
</section>
{/*  5. Sanctuary & Trust Section  */}
<section className="">
<div className="w-fit text-left flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-white/70 backdrop-blur-md border border-white/80 shadow-sm">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
<h3 className="font-label-md text-label-md text-slate-900 uppercase tracking-widest font-semibold">Sanctuary &amp; Trust</h3>
</div>
<div className="rounded-2xl overflow-hidden flex flex-col bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
{/*  Item 1  */}
<button className="w-full flex items-center justify-between p-4 px-5 text-left hover:bg-white/70 active:bg-white/70 transition-colors group" type="button">
<div className="flex items-center gap-4 min-w-0">
<div className="w-9 h-9 rounded-full bg-white/80 border border-white/90 flex items-center justify-center text-primary shrink-0 shadow-sm group-hover:scale-105 transition-transform">
<span className="material-symbols-outlined text-[18px]">shield</span>
</div>
<span className="font-body-md text-body-md text-slate-900 font-semibold truncate">Privacy Sanctuary (Zero Data Tracking)</span>
</div>
<span className="material-symbols-outlined text-on-surface-variant text-[18px] group-hover:translate-x-0.5 transition-transform shrink-0 ml-2">chevron_right</span>
</button>
</div>
</section>
{/*  6. Footer Section  */}
<footer className="flex flex-col items-center justify-center text-center w-full mt-auto pt-6 pb-4">
{/*  Dual Lotus Accent  */}
<div className="flex items-center justify-center gap-2 mb-2 text-primary/70">
<span className="material-symbols-outlined text-[18px]">spa</span>
<span className="font-label-sm text-label-sm tracking-widest text-on-surface-variant uppercase font-semibold">Mindful Focus</span>
<span className="material-symbols-outlined text-[18px]">spa</span>
</div>
{/*  Closing Quote  */}
<p className="font-body-sm text-body-sm text-on-surface-variant italic max-w-xs mx-auto">
      “Crafted with peace for intentional minds everywhere.”
    </p>
{/*  Copyright  */}
<p className="font-label-sm text-label-sm text-outline mt-3">
      © 2026 Momentum App • All Rights Reserved.
    </p>
</footer>
</div></main>
    </>
  );
}
