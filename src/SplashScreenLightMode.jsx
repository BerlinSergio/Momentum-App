import React from 'react';

export default function SplashScreenLightMode() {
  return (
    <div className="h-full w-full overflow-hidden select-none overscroll-none flex flex-col justify-between items-center px-6 py-8 relative bg-gradient-to-b from-slate-50 via-white to-indigo-50/30">

      {/* CENTER BRAND HERO & PILL TAGS */}
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
        {/* Momentum Glowing Squircle Icon */}
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/20 to-sky-400/20 rounded-full blur-2xl pointer-events-none"></div>
          <img 
            src="/logo.png" 
            alt="Momentum Logo" 
            className="relative w-24 h-24 object-cover rounded-3xl aspect-square flex-shrink-0 shadow-xl shadow-indigo-600/30 ring-4 ring-white"
          />
        </div>

        {/* Brand Title & Subtitle */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-[0.28em] text-indigo-950 uppercase" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>
            Momentum
          </h1>
          <p className="text-xs font-normal text-slate-800 max-w-xs mx-auto leading-relaxed" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>
            Spiritual tools, mindful finance & daily routines
          </p>
        </div>

        {/* Minimal Aesthetic Goal Pills */}
        <div className="flex items-center justify-center gap-2 pt-1">
          <span className="px-3.5 py-1 rounded-full text-[11px] font-semibold bg-white border border-slate-200/80 text-slate-800 shadow-2xs" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>
            Focus
          </span>
          <span className="text-slate-800 text-xs" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>•</span>
          <span className="px-3.5 py-1 rounded-full text-[11px] font-semibold bg-white border border-slate-200/80 text-slate-800 shadow-2xs" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>
            Clarity
          </span>
          <span className="text-slate-800 text-xs" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>•</span>
          <span className="px-3.5 py-1 rounded-full text-[11px] font-semibold bg-white border border-slate-200/80 text-slate-800 shadow-2xs" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>
            Growth
          </span>
        </div>
      </div>

      {/* STANDARDIZED PROGRESS CARD & UPDATED VERSION FOOTER */}
      <div className="w-full max-w-xs space-y-4 pb-2">
        {/* Progress Card (Rounded-3xl with Soft Shadow) */}
        <div className="p-4 rounded-3xl space-y-2.5 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
              </span>
              <span className="text-xs font-semibold text-slate-800">Aligning your day</span>
            </div>
            <span className="text-xs font-bold text-indigo-600">98%</span>
          </div>

          {/* Gradient Progress Bar */}
          <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-400 w-[98%] transition-all duration-500"></div>
          </div>
        </div>

        {/* Updated Version & Tagline Footer */}
        <div className="text-center">
          <p className="text-[11px] font-medium text-slate-800" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>
            <span className="font-semibold text-slate-800" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>v1.0</span> • App By Milad Wardak
          </p>
        </div>
      </div>
    </div>
  );
}
