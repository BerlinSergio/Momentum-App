import React from 'react';

import { Fingerprint, ArrowLeft } from 'lucide-react';

export default function BiometricSettingsDarkMode({ setActiveTab }) {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden"><div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[120vw] h-[55vh] rounded-full bg-gradient-to-b from-surface-variant/40 via-surface-container/20 to-transparent blur-3xl"></div><div className="absolute top-[40%] right-[-10%] w-[80vw] h-[40vh] rounded-full bg-gradient-to-tr from-secondary-fixed/20 via-tertiary-fixed/10 to-transparent blur-3xl"></div></div>{/* Top Header Bar */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <Fingerprint className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-white tracking-tight">
            Biometric Settings
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setActiveTab && setActiveTab('home_dashboard_dark_mode')} className="p-2 rounded-full text-slate-300 hover:bg-slate-800 transition-colors"><ArrowLeft className="w-5 h-5"/></button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            A
          </div>
        </div>
      </div><main className="flex flex-col relative w-full pb-safe px-margin z-10 flex-1"><div className="flex flex-col w-full pb-28 space-y-4">
{/*  Hero Hardware Badge  */}
<div className="relative overflow-hidden rounded-3xl p-5 mb-5 space-y-4 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
<div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-gradient-to-br from-primary-fixed via-tertiary-fixed/30 to-transparent blur-2xl pointer-events-none"></div>
<div className="relative z-10 flex flex-col items-center text-center">
{/*  Dual Biometric Iconic Glyph with Ambient Glow  */}
<div className="w-16 h-16 rounded-full bg-slate-800/95 border border-indigo-500/30 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30 ring-4 ring-indigo-950/50 mx-auto mb-3">
<span className="material-symbols-outlined text-[20px] text-indigo-400">face</span>
<span className="material-symbols-outlined text-[20px] text-teal-400">fingerprint</span>
</div>
{/*  Status Pill  */}
<div className="inline-flex items-center px-space-md py-1 mb-space-sm rounded-full bg-indigo-500/20 text-indigo-300">
<span className="material-symbols-outlined text-[14px] mr-1 text-indigo-300" style={{fontVariationSettings: '"FILL" 1'}}>verified_user</span>
<span className="font-label-sm text-label-sm font-semibold tracking-wide uppercase text-indigo-300">Hardware Enclave Bound</span>
</div>
{/*  Title & Body  */}
<h2 className="font-headline-md text-headline-md text-white mb-1">Biometric Sanctuary Active</h2>
<p className="text-slate-300 text-xs leading-relaxed max-w-xs mx-auto">
  Unlock Momentum instantly using Face ID or Touch ID sensor on this device.
</p>
</div>
</div>
{/*  Master Switch Card  */}
<div className="rounded-3xl p-5 mb-5 space-y-4 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
<div className="flex items-center justify-between gap-space-md">
<div className="flex flex-col min-w-0 pr-2">
<span className="font-headline-sm text-headline-sm text-white font-semibold truncate">Enable Biometric Authentication</span>
<span className="font-label-sm text-label-sm text-indigo-300 font-medium mt-0.5">Apple Face ID / Android Biometric API v3.2 Enrolled</span>
</div>
{/*  Interactive Toggle  */}
<button aria-checked="true" className="relative inline-flex h-8 w-14 flex-shrink-0 cursor-pointer rounded-full bg-gradient-to-r from-primary to-secondary transition-colors duration-200 ease-in-out focus:outline-none" id="master-toggle" role="switch">
<span className="pointer-events-none inline-block h-7 w-7 transform translate-x-6 rounded-full bg-on-primary shadow-md transition duration-200 ease-in-out mt-0.5 ml-0.5" id="master-thumb"></span>
</button>
</div>
<div className="mt-space-md pt-space-sm flex items-center gap-2 text-slate-300">
<span className="material-symbols-outlined text-[16px] text-teal-400">check_circle</span>
<span className="font-body-sm text-body-sm text-slate-300">Secure hardware keypair authenticated and active</span>
</div>
</div>
{/*  Educational & Security Philosophy Card  */}
<div className="rounded-3xl p-5 mb-5 space-y-4 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
<div className="flex items-center space-x-2">
<span className="material-symbols-outlined text-[20px] text-teal-400">shield_with_heart</span>
<h3 className="font-headline-sm text-headline-sm text-white">Zero-Knowledge Architecture</h3>
</div>
<div className="grid grid-cols-1 gap-space-sm">
<div className="flex items-start gap-3.5 py-2">
<div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center flex-shrink-0 text-indigo-400 shadow-sm mt-0.5">
<span className="material-symbols-outlined text-[16px]">lock_reset</span>
</div>
<div className="flex-1">
<h4 className="text-sm font-bold text-white">Zero-Knowledge Biometrics</h4>
<p className="text-xs text-slate-300 leading-relaxed mt-0.5">Momentum never reads, stores, or transmits your biometric data. Verification is handled strictly inside your hardware Secure Element.</p>
</div>
</div>
<div className="flex items-start gap-3.5 py-2">
<div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center flex-shrink-0 text-indigo-400 shadow-sm mt-0.5">
<span className="material-symbols-outlined text-[16px]">spa</span>
</div>
<div className="flex-1">
<h4 className="text-sm font-bold text-white">Seamless Harmony</h4>
<p className="text-xs text-slate-300 leading-relaxed mt-0.5">Bypass manual entry while keeping your spiritual reflections and private finances impenetrable.</p>
</div>
</div>
</div>
</div>
{/*  Fallback to PIN Configuration  */}
<div className="rounded-3xl p-5 mb-5 space-y-4 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
<div className="flex items-center justify-between">
<div className="flex items-center space-x-2">
<span className="material-symbols-outlined text-[20px] text-indigo-400">pin</span>
<h3 className="font-headline-sm text-headline-sm text-white">Fallback Mechanism</h3>
</div>
<span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 tracking-wide shadow-sm">
  Configured (••••)
</span>
</div>
<p className="text-slate-300 text-xs leading-relaxed mt-2">
  Whenever lighting conditions are dim, sensors fail, or the device restarts, your configured PIN will automatically serve as the fallback unlock method.
</p>
<button className="btn-secondary w-full" type="button">
<span className="flex items-center">
<span className="material-symbols-outlined text-[18px] mr-2">edit_note</span>
        Verify or Change Backup PIN
      </span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
</div>
{/*  Selective Biometric Gates  */}
<div className="rounded-3xl p-5 mb-5 space-y-4 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
<div className="flex items-center justify-between">
<h3 className="font-headline-sm text-headline-sm text-white">Selective Biometric Gates</h3>
<span className="font-label-sm text-label-sm text-slate-300">4 Checkpoints</span>
</div>
<div className="space-y-space-sm">
{/*  Item 1  */}
<div className="flex items-center justify-between py-2">
<div className="flex items-center space-x-3 min-w-0 pr-2">
<div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-indigo-400 flex-shrink-0">
<span className="material-symbols-outlined text-[18px]">power_settings_new</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-body-lg text-body-lg text-white font-medium">Unlock App on Launch</span>
<span className="font-body-sm text-body-sm text-slate-300">Requires Face/Touch ID every session</span>
</div>
</div>
<button aria-checked="true" className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full bg-primary transition-colors duration-200"  role="switch">
<span className="pointer-events-none inline-block h-5 w-5 transform translate-x-5 rounded-full bg-on-primary shadow transition duration-200 mt-0.5 ml-0.5"></span>
</button>
</div>
{/*  Item 2  */}
<div className="flex items-center justify-between py-2">
<div className="flex items-center space-x-3 min-w-0 pr-2">
<div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-teal-400 flex-shrink-0">
<span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-body-lg text-body-lg text-white font-medium">Confirm Financial &amp; Zakat Transfers</span>
<span className="font-body-sm text-body-sm text-slate-300">Authorize outgoing funds and pledges</span>
</div>
</div>
<button aria-checked="true" className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full bg-primary transition-colors duration-200"  role="switch">
<span className="pointer-events-none inline-block h-5 w-5 transform translate-x-5 rounded-full bg-on-primary shadow transition duration-200 mt-0.5 ml-0.5"></span>
</button>
</div>
{/*  Item 3  */}
<div className="flex items-center justify-between py-2">
<div className="flex items-center space-x-3 min-w-0 pr-2">
<div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-violet-400 flex-shrink-0">
<span className="material-symbols-outlined text-[18px]">auto_stories</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-body-lg text-body-lg text-white font-medium">Access Sacred Journal &amp; Deep Notes</span>
<span className="font-body-sm text-body-sm text-slate-300">Shield personal inner reflections</span>
</div>
</div>
<button aria-checked="true" className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full bg-primary transition-colors duration-200"  role="switch">
<span className="pointer-events-none inline-block h-5 w-5 transform translate-x-5 rounded-full bg-on-primary shadow transition duration-200 mt-0.5 ml-0.5"></span>
</button>
</div>
{/*  Item 4 (OFF state)  */}
<div className="flex items-center justify-between py-2">
<div className="flex items-center space-x-3 min-w-0 pr-2">
<div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-slate-400 flex-shrink-0">
<span className="material-symbols-outlined text-[18px]">motion_photos_on</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-body-lg text-body-lg text-white font-medium">Quick Dhikr Counter without Biometrics</span>
<span className="font-body-sm text-body-sm text-slate-300">Allow instant rosary tapping from widget</span>
</div>
</div>
<button aria-checked="false" className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full bg-surface-container-highest transition-colors duration-200"  role="switch">
<span className="pointer-events-none inline-block h-5 w-5 transform translate-x-0.5 rounded-full bg-on-primary shadow transition duration-200 mt-0.5"></span>
</button>
</div>
</div>
</div>
{/*  Bottom Action Button  */}
<div className="pt-space-sm">
<button className="btn-primary w-full" id="save-button">
<span>Save Biometric Preferences</span>
<span className="material-symbols-outlined text-[20px]">arrow_forward</span>
</button>
</div>
{/*  Visual Toast Feedback  */}
<div className="fixed bottom-8 inset-x-8 z-50 transform translate-y-24 opacity-0 transition-all duration-300 pointer-events-none flex justify-center" id="toast">
<div className="px-space-lg py-space-sm rounded-full bg-inverse-surface text-inverse-on-surface shadow-xl flex items-center space-x-2">
<span className="material-symbols-outlined text-tertiary-fixed text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>check_circle</span>
<span className="font-body-sm text-body-sm font-medium">Biometric Sanctuary updated</span>
</div>
</div>
</div>
</main>
    </>
  );
}
