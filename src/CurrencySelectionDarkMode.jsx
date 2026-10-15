import React from 'react';

import { Coins, ArrowLeft } from 'lucide-react';

export default function CurrencySelectionDarkMode({ setActiveTab }) {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden"><div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[120vw] h-[55vh] rounded-full bg-gradient-to-b from-surface-variant/40 via-surface-container/20 to-transparent blur-3xl"></div><div className="absolute top-[40%] right-[-10%] w-[80vw] h-[40vh] rounded-full bg-gradient-to-tr from-secondary-fixed/20 via-tertiary-fixed/10 to-transparent blur-3xl"></div></div>{/* Top Header Bar */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <Coins className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-white tracking-tight">
            Select Currency
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setActiveTab && setActiveTab('home_dashboard_dark_mode')} className="p-2 rounded-full text-slate-300 hover:bg-slate-800 transition-colors"><ArrowLeft className="w-5 h-5"/></button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            A
          </div>
        </div>
      </div><main className="flex flex-col relative w-full pb-safe px-margin z-10 flex-1"><div className="flex flex-col w-full pb-28">
{/*  Active Currency Highlight Card  */}
<section className="w-full rounded-3xl p-5 mb-5 space-y-4 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
  <div className="flex items-start justify-between">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl shadow-md">
        ؋
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="text-lg font-bold text-white">AFN</span>
          <span className="text-slate-400 font-bold">·</span>
          <span className="text-sm font-semibold text-slate-200">Afghan Afghani</span>
        </div>
        <span className="text-xs font-bahij text-slate-400">افغانۍ (Afghanistan)</span>
      </div>
    </div>
    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm flex items-center gap-1.5 whitespace-nowrap">
      <span className="material-symbols-outlined text-[14px] text-indigo-600 font-bold">check</span>
      Active Default
    </span>
  </div>
  <div className="flex items-start gap-3 p-3.5 rounded-2xl text-slate-300 text-xs leading-relaxed bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
    <span className="material-symbols-outlined text-[16px] text-indigo-600 flex-shrink-0 mt-0.5">account_balance_wallet</span>
    <span>All financial logs, expense budgets, and Zakat quotas calculate in this currency.</span>
  </div>
</section>
{/*  Search & Quick Filters  */}
<section className="mt-space-lg flex flex-col gap-space-sm">
<div className="relative w-full">
<div className="absolute inset-y-0 left-0 pl-space-md flex items-center pointer-events-none text-slate-500">
<span className="material-symbols-outlined text-[20px]">search</span>
</div>
<input className="w-full py-3.5 px-4 pl-11 rounded-2xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 mb-4 rounded-2xl shadow-sm" id="currency-search" placeholder="Search currency name, code, or country..." type="text"/>
</div>
{/*  Category Chips (Horizontal Scrollable)  */}
<div className="flex items-center gap-space-xs overflow-x-auto no-scrollbar py-1 -mx-margin px-margin">
<button className="filter-chip px-space-md py-1.5 rounded-full bg-indigo-600 text-white font-label-md text-label-md whitespace-nowrap shadow-sm transition-transform active:scale-95">
        All
      </button>
<button className="filter-chip px-space-md py-1.5 rounded-full bg-slate-800/80 backdrop-blur-sm text-slate-300 border border-slate-700/50 font-label-md text-label-md whitespace-nowrap shadow-sm transition-transform active:scale-95">
        Middle East &amp; Central Asia
      </button>
<button className="filter-chip px-space-md py-1.5 rounded-full bg-slate-800/80 backdrop-blur-sm text-slate-300 border border-slate-700/50 font-label-md text-label-md whitespace-nowrap shadow-sm transition-transform active:scale-95">
        Major Global
      </button>
<button className="filter-chip px-space-md py-1.5 rounded-full bg-slate-800/80 backdrop-blur-sm text-slate-300 border border-slate-700/50 font-label-md text-label-md whitespace-nowrap shadow-sm transition-transform active:scale-95">
        Precious Metals
      </button>
</div>
</section>
{/*  Currency List  */}
<section className="rounded-3xl p-4 mb-5 space-y-2 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
<div className="flex items-center justify-between px-space-xs py-1">
<span className="font-label-md text-label-md text-slate-500 uppercase tracking-wider">Available Currencies</span>
<span className="font-label-sm text-label-sm text-slate-500">11 Currencies</span>
</div>
{/*  Item: AFN (Active)  */}
<div className="currency-row relative rounded-2xl p-3.5 text-white transition-all flex items-center justify-between cursor-pointer bg-black/30 backdrop-blur-md border border-white/10 shadow-xl" data-code="AFN">
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-sm">؋</div>
    <div className="flex flex-col">
      <div className="flex items-center gap-1.5">
        <span className="text-sm font-bold text-white">AFN</span>
        <span className="text-sm text-slate-300 truncate">Afghan Afghani</span>
      </div>
      <span className="text-xs font-bahij text-slate-400">افغانۍ</span>
    </div>
  </div>
  <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center shrink-0 shadow-sm">
    <span className="material-symbols-outlined text-[12px] text-white font-bold">check</span>
  </div>
</div>
{/*  Item: USD  */}
<div className="currency-row relative rounded-2xl p-3.5 text-slate-200 transition-all flex items-center justify-between cursor-pointer bg-black/30 backdrop-blur-md border border-white/10 shadow-xl" data-code="USD">
<div className="flex items-center gap-space-md min-w-0">
<div className="w-10 h-10 rounded-full bg-slate-800 text-slate-300 text-sm font-semibold flex items-center justify-center shrink-0">
          $
        </div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-space-xs">
<span className="text-sm font-bold text-white">USD</span>
<span className="text-sm text-slate-300 truncate">United States Dollar</span>
</div>
<span className="text-xs text-slate-400">US Dollar ($)</span>
</div>
</div>
<div className="radio-slot w-5 h-5 rounded-full border-2 border-slate-700 shrink-0"></div>
</div>
{/*  Item: EUR  */}
<div className="currency-row relative rounded-2xl p-3.5 text-slate-200 transition-all flex items-center justify-between cursor-pointer bg-black/30 backdrop-blur-md border border-white/10 shadow-xl" data-code="EUR">
<div className="flex items-center gap-space-md min-w-0">
<div className="w-10 h-10 rounded-full bg-slate-800 text-slate-300 text-sm font-semibold flex items-center justify-center shrink-0">
          €
        </div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-space-xs">
<span className="text-sm font-bold text-white">EUR</span>
<span className="text-sm text-slate-300 truncate">Euro</span>
</div>
<span className="text-xs text-slate-400">European Union</span>
</div>
</div>
<div className="radio-slot w-5 h-5 rounded-full border-2 border-slate-700 shrink-0"></div>
</div>
{/*  Item: GBP  */}
<div className="currency-row relative rounded-2xl p-3.5 text-slate-200 transition-all flex items-center justify-between cursor-pointer bg-black/30 backdrop-blur-md border border-white/10 shadow-xl" data-code="GBP">
<div className="flex items-center gap-space-md min-w-0">
<div className="w-10 h-10 rounded-full bg-slate-800 text-slate-300 text-sm font-semibold flex items-center justify-center shrink-0">
          £
        </div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-space-xs">
<span className="text-sm font-bold text-white">GBP</span>
<span className="text-sm text-slate-300 truncate">British Pound Sterling</span>
</div>
<span className="text-xs text-slate-400">Pound (£)</span>
</div>
</div>
<div className="radio-slot w-5 h-5 rounded-full border-2 border-slate-700 shrink-0"></div>
</div>
{/*  Item: AED  */}
<div className="currency-row relative rounded-2xl p-3.5 text-slate-200 transition-all flex items-center justify-between cursor-pointer bg-black/30 backdrop-blur-md border border-white/10 shadow-xl" data-code="AED">
<div className="flex items-center gap-space-md min-w-0">
<div className="w-10 h-10 rounded-full bg-slate-800 text-slate-300 text-sm font-semibold flex items-center justify-center shrink-0">
          د.إ
        </div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-space-xs">
<span className="text-sm font-bold text-white">AED</span>
<span className="text-sm text-slate-300 truncate">UAE Dirham</span>
</div>
<span className="text-xs text-slate-400">درهم إماراتي</span>
</div>
</div>
<div className="radio-slot w-5 h-5 rounded-full border-2 border-slate-700 shrink-0"></div>
</div>
{/*  Item: SAR  */}
<div className="currency-row relative rounded-2xl p-3.5 text-slate-200 transition-all flex items-center justify-between cursor-pointer bg-black/30 backdrop-blur-md border border-white/10 shadow-xl" data-code="SAR">
<div className="flex items-center gap-space-md min-w-0">
<div className="w-10 h-10 rounded-full bg-slate-800 text-slate-300 text-sm font-semibold flex items-center justify-center shrink-0">
          ﷼
        </div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-space-xs">
<span className="text-sm font-bold text-white">SAR</span>
<span className="text-sm text-slate-300 truncate">Saudi Riyal</span>
</div>
<span className="text-xs text-slate-400">ريال سعودي</span>
</div>
</div>
<div className="radio-slot w-5 h-5 rounded-full border-2 border-slate-700 shrink-0"></div>
</div>
{/*  Item: QAR  */}
<div className="currency-row relative rounded-2xl p-3.5 text-slate-200 transition-all flex items-center justify-between cursor-pointer bg-black/30 backdrop-blur-md border border-white/10 shadow-xl" data-code="QAR">
<div className="flex items-center gap-space-md min-w-0">
<div className="w-10 h-10 rounded-full bg-slate-800 text-slate-300 text-sm font-semibold flex items-center justify-center shrink-0">
          ر.ق
        </div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-space-xs">
<span className="text-sm font-bold text-white">QAR</span>
<span className="text-sm text-slate-300 truncate">Qatari Riyal</span>
</div>
<span className="text-xs text-slate-400">ريال قطري</span>
</div>
</div>
<div className="radio-slot w-5 h-5 rounded-full border-2 border-slate-700 shrink-0"></div>
</div>
{/*  Item: TRY  */}
<div className="currency-row relative rounded-2xl p-3.5 text-slate-200 transition-all flex items-center justify-between cursor-pointer bg-black/30 backdrop-blur-md border border-white/10 shadow-xl" data-code="TRY">
<div className="flex items-center gap-space-md min-w-0">
<div className="w-10 h-10 rounded-full bg-slate-800 text-slate-300 text-sm font-semibold flex items-center justify-center shrink-0">
          ₺
        </div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-space-xs">
<span className="text-sm font-bold text-white">TRY</span>
<span className="text-sm text-slate-300 truncate">Turkish Lira</span>
</div>
<span className="text-xs text-slate-400">Türk Lirası</span>
</div>
</div>
<div className="radio-slot w-5 h-5 rounded-full border-2 border-slate-700 shrink-0"></div>
</div>
{/*  Item: PKR  */}
<div className="currency-row relative rounded-2xl p-3.5 text-slate-200 transition-all flex items-center justify-between cursor-pointer bg-black/30 backdrop-blur-md border border-white/10 shadow-xl" data-code="PKR">
<div className="flex items-center gap-space-md min-w-0">
<div className="w-10 h-10 rounded-full bg-slate-800 text-slate-300 text-sm font-semibold flex items-center justify-center shrink-0">
          ₨
        </div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-space-xs">
<span className="text-sm font-bold text-white">PKR</span>
<span className="text-sm text-slate-300 truncate">Pakistani Rupee</span>
</div>
<span className="text-xs text-slate-400">پاکستانی روپیہ</span>
</div>
</div>
<div className="radio-slot w-5 h-5 rounded-full border-2 border-slate-700 shrink-0"></div>
</div>
{/*  Item: CAD  */}
<div className="currency-row relative rounded-2xl p-3.5 text-slate-200 transition-all flex items-center justify-between cursor-pointer bg-black/30 backdrop-blur-md border border-white/10 shadow-xl" data-code="CAD">
<div className="flex items-center gap-space-md min-w-0">
<div className="w-10 h-10 rounded-full bg-slate-800 text-slate-300 text-sm font-semibold flex items-center justify-center shrink-0">
          $
        </div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-space-xs">
<span className="text-sm font-bold text-white">CAD</span>
<span className="text-sm text-slate-300 truncate">Canadian Dollar</span>
</div>
<span className="text-xs text-slate-400">Dollar canadien</span>
</div>
</div>
<div className="radio-slot w-5 h-5 rounded-full border-2 border-slate-700 shrink-0"></div>
</div>
{/*  Item: JPY  */}
<div className="currency-row relative rounded-2xl p-3.5 text-slate-200 transition-all flex items-center justify-between cursor-pointer bg-black/30 backdrop-blur-md border border-white/10 shadow-xl" data-code="JPY">
<div className="flex items-center gap-space-md min-w-0">
<div className="w-10 h-10 rounded-full bg-slate-800 text-slate-300 text-sm font-semibold flex items-center justify-center shrink-0">
          ¥
        </div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-space-xs">
<span className="text-sm font-bold text-white">JPY</span>
<span className="text-sm text-slate-300 truncate">Japanese Yen</span>
</div>
<span className="text-xs text-slate-400">日本円 (Yen)</span>
</div>
</div>
<div className="radio-slot w-5 h-5 rounded-full border-2 border-slate-700 shrink-0"></div>
</div>
</section>
{/*  Preferences Card  */}
<section className="rounded-3xl p-5 mb-5 space-y-4 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
  <div className="flex items-center gap-2 mb-2">
    <span className="material-symbols-outlined text-[16px] text-indigo-600">tune</span>
    <h3 className="text-sm font-bold text-white">Display Preferences</h3>
  </div>
  <div className="space-y-1.5">
    <label className="text-xs font-semibold text-slate-300">Symbol Position</label>
    <div className="grid grid-cols-2 gap-2 bg-slate-800/80 p-1 rounded-2xl border border-slate-700/60">
      <button className="py-2 text-xs font-semibold rounded-xl text-slate-300 hover:text-white transition-colors">Left ($100)</button>
      <button className="py-2 text-xs font-bold rounded-xl bg-indigo-600 text-white shadow-md border border-slate-700/60 transition-colors">Right (100 ؋)</button>
    </div>
  </div>
  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
    <div>
      <h4 className="text-xs font-bold text-slate-200">Decimal Precision</h4>
      <p className="text-[11px] text-slate-400">Standard bookkeeping format</p>
    </div>
    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">2 decimals (.00)</span>
  </div>
</section>
{/*  Sticky Confirmation Action Bar  */}
<div className="fixed bottom-0 inset-x-0 z-40 px-margin pt-3 pb-6 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
<div className="max-w-md mx-auto">
<button className="btn-primary w-full" id="confirm-button" type="button">
<span>Confirm Currency Selection</span>
<span className="material-symbols-outlined text-[20px]">arrow_forward</span>
</button>
</div>
</div>
</div>
</main>
    </>
  );
}
