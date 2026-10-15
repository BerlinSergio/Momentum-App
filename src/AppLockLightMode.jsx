import React from 'react';

import { Lock, ArrowLeft } from 'lucide-react';

export default function AppLockLightMode({ setActiveTab }) {
  return (
    <>
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-indigo-950 tracking-tight" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>
            App Lock & Security
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setActiveTab && setActiveTab('home_dashboard_light_mode')} className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"><ArrowLeft className="w-5 h-5"/></button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            A
          </div>
        </div>
      </div><main className="flex-1 flex flex-col relative w-full px-margin pb-safe bg-surface"><div className="flex flex-col w-full pb-28 space-y-space-lg">
{/*  Subtle Ambient Glow Orbs  */}
<div className="relative w-full">
<div className="absolute -top-10 -left-6 w-56 h-56 bg-primary-fixed/40 rounded-full blur-3xl pointer-events-none -z-10"></div>
<div className="absolute top-24 -right-10 w-64 h-64 bg-tertiary-fixed/30 rounded-full blur-3xl pointer-events-none -z-10"></div>
<div className="absolute top-96 left-8 w-60 h-60 bg-secondary-fixed/30 rounded-full blur-3xl pointer-events-none -z-10"></div>
{/*  Security Status Hero Card  */}
<section className="relative overflow-hidden flex flex-col space-y-space-md rounded-3xl p-5 mb-4 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
{/*  Decorative Shield Background SVG Motif  */}
<div className="absolute -right-6 -bottom-6 w-36 h-36 opacity-10 pointer-events-none text-primary">
<svg className="w-full h-full" fill="currentColor" viewbox="0 0 24 24">
<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.67-3.13 8.97-7 10.15-3.87-1.18-7-5.48-7-10.15V6.3l7-3.12zM12 7c-1.66 0-3 1.34-3 3v2H8v6h8v-6h-1v-2c0-1.66-1.34-3-3-3zm0 2c.55 0 1 .45 1 1v2h-2v-2c0-.55.45-1 1-1z"></path>
</svg>
</div>
<div className="flex items-center justify-between">
<div className="flex items-center space-x-space-sm">
<div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-secondary-container flex items-center justify-center shadow-md">
<span className="material-symbols-outlined text-on-primary text-[24px]" style={{fontVariationSettings: '"FILL" 1'}}>shield_lock</span>
</div>
<div className="flex flex-col">
<span className="inline-flex items-center px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-tertiary-container text-on-tertiary-container w-fit">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed mr-1.5 animate-pulse"></span>
              Vault Active
            </span>
<span className="text-label-sm font-label-sm text-outline mt-0.5">Momentum Shield v1.0</span>
</div>
</div>
{/*  Master Switch  */}
<button aria-checked="true" className="w-13 h-7 w-12 h-7 bg-primary rounded-full relative p-0.5 flex items-center transition-colors duration-200" id="master-toggle" role="switch" type="button">
<span className="w-6 h-6 bg-surface rounded-full shadow-sm transform translate-x-5 transition-transform duration-200 flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[14px]">lock</span>
</span>
</button>
</div>
<div className="pt-1">
<h2 className="text-headline-md font-headline-md text-on-surface">App Lock is Active</h2>
<p className="text-body-md font-body-md text-on-surface-variant mt-1 leading-relaxed">
          Your spiritual journals, reflective notes, personal finances, and intentional schedules are encrypted with biometric security.
        </p>
</div>
{/*  Quick stats micro-strip  */}
<div className="grid grid-cols-2 gap-space-xs pt-1">
<div className="bg-surface-container-low/70 rounded-md p-2.5 flex items-center space-x-2">
<span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
<div className="flex flex-col">
<span className="text-label-sm font-label-sm text-outline">Encrypted State</span>
<span className="text-body-sm font-body-sm text-on-surface">AES-256 GCM</span>
</div>
</div>
<div className="bg-surface-container-low/70 rounded-md p-2.5 flex items-center space-x-2">
<span className="material-symbols-outlined text-tertiary text-[18px]">key</span>
<div className="flex flex-col">
<span className="text-label-sm font-label-sm text-outline">Secure Enclave</span>
<span className="text-body-sm font-body-sm text-on-surface">Hardware Bound</span>
</div>
</div>
</div>
</section>
{/*  Authentication Methods Section  */}
<div className="pt-space-md space-y-space-md">
<div className="flex items-center justify-between px-1">
<h3 className="text-headline-sm font-headline-sm text-indigo-950" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>Authentication Methods</h3>
<span className="text-label-sm font-label-sm text-indigo-950" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>2 Methods Configured</span>
</div>
{/*  Biometric Card  */}
<div className="space-y-space-sm rounded-3xl p-5 mb-4 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<div className="flex items-center justify-between">
<div className="flex items-center space-x-space-md">
<div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[22px]">fingerprint</span>
</div>
<div>
<h4 className="text-body-lg font-body-lg text-on-surface">Biometrics (Face / Fingerprint)</h4>
<p className="text-body-sm font-body-sm text-on-surface-variant">Instant entry upon opening Momentum</p>
</div>
</div>
<button aria-checked="true" className="w-11 h-6 bg-primary rounded-full relative p-0.5 flex items-center transition-colors duration-200" id="toggle-bio" role="switch" type="button">
<span className="w-5 h-5 bg-surface rounded-full shadow-sm transform translate-x-5 transition-transform duration-200"></span>
</button>
</div>
<div className="rounded bg-surface-container-low/60 p-2.5 flex items-start space-x-2">
<span className="material-symbols-outlined text-outline text-[16px] mt-0.5">info</span>
<p className="text-body-sm font-body-sm text-outline leading-snug">
            Requires your backup PIN whenever biometrics fail, after device reboot, or after 72 hours of inactivity.
          </p>
</div>
</div>
{/*  PIN Protection Card  */}
<div className="space-y-space-md rounded-3xl p-5 mb-4 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<div className="flex items-center justify-between">
<div className="flex items-center space-x-space-md">
<div className="w-10 h-10 rounded-full bg-secondary-fixed/50 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[20px]">password</span>
</div>
<div>
<h4 className="text-body-lg font-body-lg text-on-surface">PIN Protection</h4>
<p className="text-body-sm font-body-sm text-secondary flex items-center gap-1 font-medium">
<span className="inline-block w-2 h-2 rounded-full bg-secondary"></span>
                Active (••••)
              </p>
</div>
</div>
<span className="text-label-sm font-label-sm text-outline">Primary Backup</span>
</div>
<div className="grid grid-cols-1 gap-2 pt-1">
<button className="w-full flex items-center justify-between p-3 rounded bg-surface-container-low hover:bg-surface-container transition-colors text-left" type="button">
<div className="flex items-center space-x-2.5">
<span className="material-symbols-outlined text-on-surface-variant text-[18px]">edit_note</span>
<span className="text-body-md font-body-md text-on-surface">Change 4-Digit PIN</span>
</div>
<span className="material-symbols-outlined text-outline text-[18px]">chevron_right</span>
</button>
<button className="w-full flex items-center justify-between p-3 rounded bg-surface-container-low hover:bg-surface-container transition-colors text-left" type="button">
<div className="flex items-center space-x-2.5">
<span className="material-symbols-outlined text-on-surface-variant text-[18px]">lock_reset</span>
<span className="text-body-md font-body-md text-on-surface">Switch to Alphanumeric Passcode</span>
</div>
<span className="material-symbols-outlined text-outline text-[18px]">chevron_right</span>
</button>
</div>
</div>
</div>
{/*  Lock Timing & Trigger Behavior  */}
<div className="pt-space-md space-y-space-md">
<div className="px-1">
<h3 className="text-headline-sm font-headline-sm text-indigo-950" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>Lock Timing &amp; Trigger</h3>
<p className="text-body-sm font-body-sm text-slate-800" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>Specify how swiftly Momentum re-secures your data</p>
</div>
<div className="space-y-space-md rounded-3xl p-5 mb-4 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
{/*  Radio-style trigger selection  */}
<div className="space-y-2" id="timing-options">
{/*  Option 1: Immediately (Selected)  */}
<div className="timing-item flex items-center justify-between p-3 rounded cursor-pointer bg-primary-fixed/30 text-on-primary-fixed transition-colors" data-value="immediate">
<div className="flex items-center space-x-3">
<span className="material-symbols-outlined text-primary text-[20px]">bolt</span>
<div>
<p className="text-body-md font-body-md font-semibold text-on-surface">Immediately upon exiting</p>
<p className="text-label-sm font-label-sm text-outline">Maximum protection recommended</p>
</div>
</div>
<div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
<span className="material-symbols-outlined text-on-primary text-[14px]">check</span>
</div>
</div>
{/*  Option 2: 1 min  */}
<div className="timing-item flex items-center justify-between p-3 rounded cursor-pointer bg-surface-container-low hover:bg-surface-container transition-colors" data-value="1min">
<div className="flex items-center space-x-3">
<span className="material-symbols-outlined text-outline text-[20px]">timer</span>
<div>
<p className="text-body-md font-body-md text-on-surface">After 1 minute in background</p>
<p className="text-label-sm font-label-sm text-outline">Balanced for multi-tasking</p>
</div>
</div>
<div className="w-5 h-5 rounded-full bg-surface-dim flex items-center justify-center timing-check hidden">
<span className="material-symbols-outlined text-on-surface text-[14px]">check</span>
</div>
</div>
{/*  Option 3: 5 min  */}
<div className="timing-item flex items-center justify-between p-3 rounded cursor-pointer bg-surface-container-low hover:bg-surface-container transition-colors" data-value="5min">
<div className="flex items-center space-x-3">
<span className="material-symbols-outlined text-outline text-[20px]">schedule</span>
<div>
<p className="text-body-md font-body-md text-on-surface">After 5 minutes in background</p>
<p className="text-label-sm font-label-sm text-outline">Convenient during continuous sessions</p>
</div>
</div>
<div className="w-5 h-5 rounded-full bg-surface-dim flex items-center justify-center timing-check hidden">
<span className="material-symbols-outlined text-on-surface text-[14px]">check</span>
</div>
</div>
{/*  Option 4: On Lock  */}
<div className="timing-item flex items-center justify-between p-3 rounded cursor-pointer bg-surface-container-low hover:bg-surface-container transition-colors" data-value="lock">
<div className="flex items-center space-x-3">
<span className="material-symbols-outlined text-outline text-[20px]">phonelink_lock</span>
<div>
<p className="text-body-md font-body-md text-on-surface">When device locks</p>
<p className="text-label-sm font-label-sm text-outline">Matches OS display power-off</p>
</div>
</div>
<div className="w-5 h-5 rounded-full bg-surface-dim flex items-center justify-center timing-check hidden">
<span className="material-symbols-outlined text-on-surface text-[14px]">check</span>
</div>
</div>
</div>
{/*  Privacy Shield in Multitasking  */}
<div className="pt-2 border-t border-transparent">
<div className="p-3 rounded bg-surface-container-low flex items-center justify-between">
<div className="flex items-start space-x-3 pr-2">
<span className="material-symbols-outlined text-primary text-[20px] mt-0.5">blur_on</span>
<div>
<p className="text-body-md font-body-md text-on-surface font-medium">Hide App Screen in Multitasking</p>
<p className="text-body-sm font-body-sm text-on-surface-variant">Blurs app preview snapshot in recent apps carousel</p>
</div>
</div>
<button aria-checked="true" className="w-11 h-6 bg-primary rounded-full relative p-0.5 flex items-center transition-colors duration-200 shrink-0" id="toggle-multitasking" role="switch" type="button">
<span className="w-5 h-5 bg-surface rounded-full shadow-sm transform translate-x-5 transition-transform duration-200"></span>
</button>
</div>
</div>
</div>
</div>
{/*  Sensitive Feature Guardrails  */}
<div className="pt-space-md space-y-space-md">
<div className="px-1 flex items-center justify-between">
<div>
<h3 className="text-headline-sm font-headline-sm text-indigo-950" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>Selective Guardrails</h3>
<p className="text-body-sm font-body-sm text-slate-800" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>Granular security per sacred &amp; personal domain</p>
</div>
<span className="material-symbols-outlined text-outline">tune</span>
</div>
<div className="space-y-3 rounded-3xl p-5 mb-4 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
{/*  Finance & Expenses  */}
<div className="flex items-center justify-between py-2">
<div className="flex items-center space-x-3">
<div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
</div>
<div>
<p className="text-body-md font-body-md text-on-surface font-medium">Finance &amp; Halal Expenses</p>
<p className="text-label-sm font-label-sm text-outline">Requires re-verification</p>
</div>
</div>
<span className="px-2.5 py-1 text-xs font-medium rounded-full bg-indigo-50 border border-indigo-150 text-indigo-700 whitespace-nowrap">Always Locked</span>
</div>
{/*  Notes & Journals  */}
<div className="flex items-center justify-between py-2">
<div className="flex items-center space-x-3">
<div className="w-8 h-8 rounded-full bg-secondary-fixed/40 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[18px]">menu_book</span>
</div>
<div>
<p className="text-body-md font-body-md text-on-surface font-medium">Reflections &amp; Intimate Notes</p>
<p className="text-label-sm font-label-sm text-outline">Requires re-verification</p>
</div>
</div>
<span className="px-2.5 py-1 text-xs font-medium rounded-full bg-indigo-50 border border-indigo-150 text-indigo-700 whitespace-nowrap">Always Locked</span>
</div>
{/*  Quick Tasbeeh Exception  */}
<div className="flex items-center justify-between py-2">
<div className="flex items-center space-x-3">
<div className="w-8 h-8 rounded-full bg-tertiary-fixed/50 flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined text-[18px]">flare</span>
</div>
<div>
<p className="text-body-md font-body-md text-on-surface font-medium">Allow Quick Dhikr Counter</p>
<p className="text-label-sm font-label-sm text-outline">Permit Tasbeeh widget without unlocking</p>
</div>
</div>
<button aria-checked="true" className="w-11 h-6 bg-primary rounded-full relative p-0.5 flex items-center transition-colors duration-200 shrink-0" id="toggle-tasbeeh" role="switch" type="button">
<span className="w-5 h-5 bg-surface rounded-full shadow-sm transform translate-x-5 transition-transform duration-200"></span>
</button>
</div>
</div>
</div>
{/*  Zero-Knowledge Encryption Trust Note  */}
<div className="pt-space-md">
<div className="flex items-start space-x-3 rounded-3xl p-5 mb-4 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-0.5 shrink-0">
<span className="material-symbols-outlined text-[16px]">lock_clock</span>
</div>
<div className="space-y-0.5">
<h5 className="text-label-md font-label-md text-on-surface">Zero-Knowledge Architecture</h5>
<p className="text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
            Your PIN, passcodes, and biometrics never leave this hardware unit. Authentication keys are held exclusively within your device Secure Element.
          </p>
</div>
</div>
</div>
{/*  Action Button  */}
<div className="pt-space-lg">
<button className="btn-primary w-full" id="save-btn" type="button">
<span>Save Security Preferences</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
<div className="text-center mt-2.5">
<span className="text-label-sm font-label-sm text-slate-800" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>Last modified: Today at 07:42 AM</span>
</div>
</div>
</div>
</div>
</main>
    </>
  );
}
