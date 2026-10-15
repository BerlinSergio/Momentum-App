import React from 'react';

import { Wallet, ArrowLeft } from 'lucide-react';

export default function AddEditIncomeDarkMode({ setActiveTab }) {
  return (
    <>
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-white tracking-tight">
            Add Income
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setActiveTab && setActiveTab('home_dashboard_dark_mode')} className="p-2 rounded-full text-slate-300 hover:bg-slate-800 transition-colors"><ArrowLeft className="w-5 h-5"/></button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            A
          </div>
        </div>
      </div><main className="flex-1 w-full bg-surface pb-safe px-margin"><div className="w-full max-w-md mx-auto px-4 py-4 space-y-5 pb-20 flex flex-col select-none">
{/*  Status Badge & Mode Switch Bar  */}
<div className="flex flex-row items-center justify-center gap-2 w-full flex-wrap">
<span className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
<span id="mode-text">&bull; NEW ENTRY #1</span>
</span>
<span className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
<span className="material-symbols-outlined text-[16px]">check</span>
<span>&bull; AUTO-CATEGORIZED</span>
</span>
<button className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-slate-300 hover:text-white transition-all text-xs font-semibold bg-slate-800/80 border border-slate-700/80 hover:bg-slate-700/80 active:scale-95" id="clear-btn" type="button">
<span className="material-symbols-outlined text-[16px]">restart_alt</span>
<span>Reset</span>
</button>
</div>
{/*  Hero Amount Card (Glassmorphic)  */}
<div className="relative overflow-hidden rounded-3xl p-5 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
{/*  Subtle Ambient Glow Orbs  */}
<div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-primary-fixed/40 blur-2xl pointer-events-none"></div>
<div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-tertiary-fixed/30 blur-xl pointer-events-none"></div>
<div className="relative z-10 flex flex-col space-y-space-md">
{/*  Currency selector & Micro-label  */}
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md tracking-wider text-on-surface-variant uppercase">Income Amount</span>
<div className="flex items-center gap-1 bg-surface-container-low px-2.5 py-1 rounded-full shadow-sm">
<span className="font-label-sm text-label-sm text-on-surface-variant">Currency:</span>
<button className="flex items-center gap-0.5 font-label-md text-label-md text-primary font-semibold" id="curr-toggle" type="button">
<span id="curr-label">USD ($)</span>
<span className="material-symbols-outlined text-[14px]">expand_more</span>
</button>
</div>
</div>
{/*  Main Input Display  */}
<div className="flex items-baseline justify-center py-2">
<span className="font-display-lg text-display-lg text-tertiary font-bold tracking-tight mr-1">+</span>
<span className="font-display-lg text-display-lg text-tertiary font-bold tracking-tight" id="currency-symbol">$</span>
<input aria-label="Income Amount Value" className="w-56 bg-transparent font-display-lg text-display-lg text-on-surface font-bold tracking-tight focus:outline-none text-left pl-1" id="amount-input" inputmode="decimal" type="text" value="5,000.00"/>
</div>
{/*  Quick Add Preset Chips  */}
<div className="flex items-center justify-between gap-1.5 pt-1">
<button className="preset-pill flex-1 rounded-full px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs text-center shadow-sm border border-slate-700/70 transition-all duration-150 active:scale-95" data-val="500" type="button">+$500</button>
<button className="preset-pill flex-1 rounded-full px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs text-center shadow-sm border border-slate-700/70 transition-all duration-150 active:scale-95" data-val="1000" type="button">+$1,000</button>
<button className="preset-pill flex-1 rounded-full px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs text-center shadow-sm border border-slate-700/70 transition-all duration-150 active:scale-95" data-val="2500" type="button">+$2,500</button>
<button className="preset-pill flex-1 rounded-full px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs text-center shadow-sm border border-slate-700/70 transition-all duration-150 active:scale-95" data-val="5000" type="button">+$5,000</button>
</div>
</div>
</div>
{/*  Income Source Selector  */}
<div className="flex flex-col space-y-space-sm">
<div className="flex items-center justify-between px-space-xs">
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Income Source</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Choose source type for cashflow analytics</p>
</div>
<span className="font-label-sm text-label-sm text-primary font-semibold">Step 1 of 2</span>
</div>
{/*  Category Pill Horizontal Ribbon  */}
<div className="grid grid-cols-2 gap-3.5 pt-1" id="sources-container">
<button className="source-card p-3 pl-4 flex items-center justify-between rounded-2xl text-indigo-300 transition-all text-sm font-medium active:scale-95 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl" data-source="Salary" type="button">
  <div className="flex items-center gap-3">
    <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: '"FILL" 1'}}>work</span>
    <span>Salary</span>
  </div>
  <span className="material-symbols-outlined text-[16px]">check_circle</span>
</button>
<button className="source-card p-3 pl-4 flex items-center justify-between rounded-2xl text-slate-300 transition-all text-sm font-medium active:scale-95 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl" data-source="Freelance" type="button">
  <div className="flex items-center gap-3">
    <span className="material-symbols-outlined text-[20px]">laptop_mac</span>
    <span>Freelance</span>
  </div>
</button>
<button className="source-card p-3 pl-4 flex items-center justify-between rounded-2xl text-slate-300 transition-all text-sm font-medium active:scale-95 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl" data-source="Business" type="button">
  <div className="flex items-center gap-3">
    <span className="material-symbols-outlined text-[20px]">storefront</span>
    <span>Business</span>
  </div>
</button>
<button className="source-card p-3 pl-4 flex items-center justify-between rounded-2xl text-slate-300 transition-all text-sm font-medium active:scale-95 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl" data-source="Bonus" type="button">
  <div className="flex items-center gap-3">
    <span className="material-symbols-outlined text-[20px]">featured_seasonal_and_gifts</span>
    <span>Bonus</span>
  </div>
</button>
<button className="source-card col-span-2 p-3 px-4 flex items-center justify-center rounded-2xl text-slate-300 transition-all text-sm font-medium active:scale-95 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl" data-source="Other" type="button">
  <div className="flex items-center gap-3">
    <span className="material-symbols-outlined text-[20px]">more_horiz</span>
    <span>Other</span>
  </div>
</button>
</div>
</div>
{/*  Income Details Form Card  */}
<div className="rounded-3xl p-5 space-y-space-md bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
{/*  Payer / Company Field  */}
<div className="space-y-1">
<label className="font-label-md text-label-md text-on-surface-variant block" htmlFor="payer-input">Source Title / Payer Name</label>
<div className="flex items-center gap-3.5 px-space-md py-2.5 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
<span className="material-symbols-outlined text-primary text-[20px]">domain</span>
<input aria-label="Source Title or Payer Name" className="w-full bg-transparent font-body-lg text-body-lg text-on-surface focus:outline-none" id="payer-input" type="text" value="TechCorp Global Ltd."/>
<span className="material-symbols-outlined text-on-surface-variant/40 text-[18px]">edit</span>
</div>
</div>
{/*  Date & Deposit Frequency Field  */}
<div className="space-y-1">
<label className="font-label-md text-label-md text-on-surface-variant block" htmlFor="schedule-trigger">Deposit Schedule &amp; Recurrence</label>
<div className="flex items-center justify-between px-space-md py-2.5 rounded-2xl cursor-pointer transition-colors bg-black/30 backdrop-blur-md border border-white/10 shadow-xl" id="schedule-trigger">
<div className="flex items-center gap-space-sm min-w-0">
<span className="material-symbols-outlined text-secondary text-[20px]">event_repeat</span>
<div className="flex flex-col min-w-0">
<span className="font-body-lg text-body-lg text-on-surface truncate">Oct 01, 2026</span>
<span className="font-body-sm text-body-sm text-secondary font-medium">Monthly Recurring (1st of month)</span>
</div>
</div>
<span className="material-symbols-outlined text-on-surface-variant text-[20px]">tune</span>
</div>
</div>
{/*  Notes & Memo Field  */}
<div className="space-y-1">
  <div className="flex items-center justify-between">
    <label className="font-label-md text-label-md text-on-surface-variant block" htmlFor="memo-input">Notes &amp; Memo</label>
    <span className="font-label-sm text-label-sm text-on-surface-variant/70">72 / 140</span>
  </div>
  <div className="px-space-md py-3 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
    <textarea aria-label="Notes and Memo" className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder-on-surface-variant/50 focus:outline-none resize-none" id="memo-input" rows="2">Monthly senior design lead compensation &amp; quarterly milestone recognition</textarea>
  </div>
</div>
</div>
{/*  Realtime Projection Micro-Card  */}
<div className="p-space-md rounded-2xl flex items-center justify-between bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[18px]">trending_up</span>
</div>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface">Monthly Impact</span>
<span className="font-body-sm text-body-sm text-secondary font-semibold">+18.4% to liquidity goals</span>
</div>
</div>
<span className="font-headline-sm text-headline-sm text-tertiary font-bold">+$4,875.00 <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">net</span></span>
</div>
{/*  Primary & Secondary Action Buttons  */}
<div className="flex flex-col gap-3 pt-2">
{/*  Radiant Primary Button  */}
<button className="btn-primary w-full" id="save-income-btn" type="button">
<span>Save Income Entry</span>
<span className="material-symbols-outlined text-[20px]">arrow_forward</span>
</button>
{/*  Secondary Actions: Cancel & Delete Side-by-Side  */}
<div className="grid grid-cols-2 gap-3">
<button className="btn-secondary w-full" type="button">
  Cancel
</button>
<button className="btn-danger w-full" id="delete-income-btn" type="button">
<span className="material-symbols-outlined text-[18px]">delete</span>
<span>Delete Income Record</span>
</button>
</div>
</div>
</div>
</main>
    </>
  );
}
