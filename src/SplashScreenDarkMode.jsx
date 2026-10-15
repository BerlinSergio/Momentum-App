import React from 'react';

export default function SplashScreenDarkMode() {
  return (
    <div className="h-full w-full overflow-hidden select-none overscroll-none flex flex-col justify-between items-center px-6 py-8 relative bg-gradient-to-b from-slate-950 via-slate-950 to-indigo-950/30 text-white">

      {/* CENTER BRAND HERO & PILL TAGS */}
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
        {/* Momentum Glowing Squircle Icon */}
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/25 to-sky-500/15 rounded-full blur-2xl pointer-events-none"></div>
          <img 
            src="/logo.png" 
            alt="Momentum Logo" 
            className="relative w-24 h-24 object-cover rounded-3xl aspect-square flex-shrink-0 shadow-xl shadow-black/60 ring-4 ring-slate-900"
          />
        </div>

        {/* Brand Title & Subtitle */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-[0.28em] text-white uppercase">
            Momentum
          </h1>
          <p className="text-xs font-normal text-slate-400 max-w-xs mx-auto leading-relaxed">
            Spiritual tools, mindful finance & daily routines
          </p>
        </div>

        {/* Minimal Aesthetic Goal Pills */}
        <div className="flex items-center justify-center gap-2 pt-1">
          <span className="px-3.5 py-1 rounded-full text-[11px] font-semibold shadow-2xs bg-slate-900 border border-slate-800 text-slate-300">
            Focus
          </span>
          <span className="text-slate-700 text-xs">•</span>
          <span className="px-3.5 py-1 rounded-full text-[11px] font-semibold shadow-2xs bg-slate-900 border border-slate-800 text-slate-300">
            Clarity
          </span>
          <span className="text-slate-700 text-xs">•</span>
          <span className="px-3.5 py-1 rounded-full text-[11px] font-semibold shadow-2xs bg-slate-900 border border-slate-800 text-slate-300">
            Growth
          </span>
        </div>
      </div>

      {/* STANDARDIZED PROGRESS CARD & UPDATED VERSION FOOTER */}
      <div className="w-full max-w-xs space-y-4 pb-2">
        {/* Progress Card (Rounded-3xl with Soft Shadow) */}
        <div className="p-4 rounded-3xl space-y-2.5 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span className="text-xs font-semibold text-slate-200">Aligning your day</span>
            </div>
            <span className="text-xs font-bold text-indigo-400">98%</span>
          </div>

          {/* Gradient Progress Bar */}
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-sky-400 w-[98%] transition-all duration-500"></div>
          </div>
        </div>

        {/* Updated Version & Tagline Footer */}
        <div className="text-center">
          <p className="text-[11px] font-medium text-slate-500">
            <span className="font-semibold text-slate-300">v1.0</span> • App By Milad Wardak
          </p>
        </div>
      </div>
    </div>
  );
}
