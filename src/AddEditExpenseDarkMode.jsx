import React from 'react';

import { Coins, ArrowLeft } from 'lucide-react';

export default function AddEditExpenseDarkMode({ setActiveTab }) {
  return (
    <>
      {/*  Subtle ambient background gradients matching Dark Mode Finance screen  */}
<div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
<div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-indigo-600/15 blur-3xl"></div>
<div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-cyan-600/15 blur-3xl"></div>
<div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[32rem] h-72 rounded-full bg-teal-500/10 blur-3xl"></div>
</div>
{/* Top Header Bar */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <Coins className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-white tracking-tight">
            Edit Expense
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setActiveTab && setActiveTab('home_dashboard_dark_mode')} className="p-2 rounded-full text-slate-300 hover:bg-slate-800 transition-colors"><ArrowLeft className="w-5 h-5"/></button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            A
          </div>
        </div>
      </div><main className="flex-1 w-full bg-transparent pb-safe px-margin"><div className="flex flex-col w-full pb-28 space-y-4">
{/*  Mode Pill & Quick Context Indicator  */}
<div className="flex items-center justify-between px-1">
<div className="flex items-center gap-space-xs bg-[#131b2c]/80 border border-white/10 px-3 py-1.5 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
<span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
<span className="font-label-sm text-label-sm text-slate-400 font-medium tracking-wide">EDITING TRANSACTION</span>
<span className="font-label-sm text-label-sm text-indigo-300 font-bold ml-0.5">#TX-8924</span>
</div>
<button className="btn-danger" id="delete-header-btn" type="button">
<span className="material-symbols-outlined text-[15px]">delete</span>
<span className="font-label-sm text-label-sm font-semibold">Delete</span>
</button>
</div>
{/*  Hero Amount Card (Glassmorphic)  */}
<div className="w-full rounded-2xl p-5 relative overflow-hidden flex flex-col items-center bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
<div className="absolute -right-8 -top-8 w-28 h-28 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none"></div>
<div className="absolute -left-8 -bottom-8 w-28 h-28 bg-sky-500/15 rounded-full blur-2xl pointer-events-none"></div>
<div className="flex items-center justify-between w-full mb-3 relative z-10">
<span className="font-label-sm text-label-sm tracking-wider uppercase text-slate-400">Expense Amount</span>
<div className="flex items-center bg-[#0b0f19]/80 border border-white/10 rounded-full p-0.5 shadow-inner">
<button className="currency-btn active-curr px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-indigo-600 text-white font-semibold shadow-sm transition-all" type="button">USD ($)</button>
<button className="currency-btn px-2.5 py-0.5 rounded-full font-label-sm text-label-sm text-slate-400 hover:text-white transition-all" type="button">EUR (€)</button>
<button className="currency-btn px-2.5 py-0.5 rounded-full font-label-sm text-label-sm text-slate-400 hover:text-white transition-all" type="button">AFN (؋)</button>
</div>
</div>
{/*  Editable Amount Display  */}
<div className="flex items-baseline justify-center gap-1 my-2 relative z-10">
<span className="font-display-lg text-display-lg text-indigo-400 select-none font-bold">$</span>
<input className="font-display-lg text-display-lg text-white bg-transparent text-center focus:outline-none max-w-[190px] font-bold tracking-tight caret-indigo-400" id="amount-input" inputmode="decimal" type="text" value="64.50"/>
</div>
<p className="font-body-sm text-body-sm text-slate-400 mb-4 relative z-10">Tap number to adjust custom balance</p>
{/*  Quick Increment Chips  */}
<div className="flex items-center justify-center flex-wrap gap-2 w-full pt-1 relative z-10">
<button className="rounded-full py-1.5 px-4 bg-slate-800/80 hover:bg-slate-700 border border-white/10 text-white font-label-md text-label-md transition-all active:scale-95 shadow-sm"  type="button">
        + $10
      </button>
<button className="rounded-full py-1.5 px-4 bg-slate-800/80 hover:bg-slate-700 border border-white/10 text-white font-label-md text-label-md transition-all active:scale-95 shadow-sm"  type="button">
        + $25
      </button>
<button className="rounded-full py-1.5 px-4 bg-slate-800/80 hover:bg-slate-700 border border-white/10 text-white font-label-md text-label-md transition-all active:scale-95 shadow-sm"  type="button">
        + $50
      </button>
<button className="rounded-full py-1.5 px-4 bg-slate-800/80 hover:bg-slate-700 border border-indigo-400/30 text-white font-label-md text-label-md transition-all active:scale-95 flex items-center gap-1 shadow-sm"  type="button">
<span className="material-symbols-outlined text-[14px]">arrow_upward</span>
        Round Up
      </button>
</div>
</div>
{/*  Category Selector Bento Container  */}
<div className="w-full rounded-2xl p-5 space-y-3 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
<div className="flex items-baseline justify-between">
<div>
<h2 className="font-headline-sm text-headline-sm text-white tracking-tight">Category</h2>
<p className="font-body-sm text-body-sm text-slate-400">Classify this transaction</p>
</div>
<span className="font-label-sm text-label-sm text-indigo-300 font-medium" id="selected-category-label">Food &amp; Dining</span>
</div>
{/*  Category Chips Flow  */}
<div className="grid grid-cols-3 gap-2 pt-1" id="category-grid">
{/*  Food (Active Default)  */}
<button className="cat-pill flex items-center gap-2 p-2.5 rounded-2xl bg-indigo-600 text-white font-label-md text-label-md shadow-[0_4px_14px_rgba(79,70,229,0.35)] border border-indigo-400/30 transition-all text-left" data-cat="Food &amp; Dining" type="button">
<span className="material-symbols-outlined text-[18px]">restaurant</span>
<span className="truncate">Food</span>
<span className="material-symbols-outlined text-[15px] ml-auto category-check">check</span>
</button>
{/*  Transportation  */}
<button className="cat-pill flex items-center gap-2 p-2.5 rounded-2xl bg-[#111827]/70 hover:bg-[#1a2234] border border-white/5 text-slate-200 font-label-md text-label-md transition-all text-left" data-cat="Transportation" type="button">
<span className="material-symbols-outlined text-[18px] text-indigo-400">directions_car</span>
<span className="truncate">Transport</span>
</button>
{/*  Shopping  */}
<button className="cat-pill flex items-center gap-2 p-2.5 rounded-2xl bg-[#111827]/70 hover:bg-[#1a2234] border border-white/5 text-slate-200 font-label-md text-label-md transition-all text-left" data-cat="Shopping" type="button">
<span className="material-symbols-outlined text-[18px] text-sky-400">shopping_bag</span>
<span className="truncate">Shopping</span>
</button>
{/*  Bills  */}
<button className="cat-pill flex items-center gap-2 p-2.5 rounded-2xl bg-[#111827]/70 hover:bg-[#1a2234] border border-white/5 text-slate-200 font-label-md text-label-md transition-all text-left" data-cat="Bills &amp; Utilities" type="button">
<span className="material-symbols-outlined text-[18px] text-teal-400">receipt_long</span>
<span className="truncate">Bills</span>
</button>
{/*  Rent  */}
<button className="cat-pill flex items-center gap-2 p-2.5 rounded-2xl bg-[#111827]/70 hover:bg-[#1a2234] border border-white/5 text-slate-200 font-label-md text-label-md transition-all text-left" data-cat="Rent &amp; Housing" type="button">
<span className="material-symbols-outlined text-[18px] text-indigo-400">home</span>
<span className="truncate">Rent</span>
</button>
{/*  Health  */}
<button className="cat-pill flex items-center gap-2 p-2.5 rounded-2xl bg-[#111827]/70 hover:bg-[#1a2234] border border-white/5 text-slate-200 font-label-md text-label-md transition-all text-left" data-cat="Health &amp; Fitness" type="button">
<span className="material-symbols-outlined text-[18px] text-rose-400">ecg_heart</span>
<span className="truncate">Health</span>
</button>
{/*  Education  */}
<button className="cat-pill flex items-center gap-2 p-2.5 rounded-2xl bg-[#111827]/70 hover:bg-[#1a2234] border border-white/5 text-slate-200 font-label-md text-label-md transition-all text-left" data-cat="Education" type="button">
<span className="material-symbols-outlined text-[18px] text-purple-400">school</span>
<span className="truncate">Education</span>
</button>
{/*  Entertainment  */}
<button className="cat-pill flex items-center gap-2 p-2.5 rounded-2xl bg-[#111827]/70 hover:bg-[#1a2234] border border-white/5 text-slate-200 font-label-md text-label-md transition-all text-left" data-cat="Entertainment" type="button">
<span className="material-symbols-outlined text-[18px] text-cyan-400">movie</span>
<span className="truncate">Entertain</span>
</button>
{/*  Family  */}
<button className="cat-pill flex items-center gap-2 p-2.5 rounded-2xl bg-[#111827]/70 hover:bg-[#1a2234] border border-white/5 text-slate-200 font-label-md text-label-md transition-all text-left" data-cat="Family &amp; Care" type="button">
<span className="material-symbols-outlined text-[18px] text-indigo-400">group</span>
<span className="truncate">Family</span>
</button>
{/*  Work  */}
<button className="cat-pill flex items-center gap-2 p-2.5 rounded-2xl bg-[#111827]/70 hover:bg-[#1a2234] border border-white/5 text-slate-200 font-label-md text-label-md transition-all text-left" data-cat="Work &amp; Professional" type="button">
<span className="material-symbols-outlined text-[18px] text-slate-400">business_center</span>
<span className="truncate">Work</span>
</button>
{/*  Other  */}
<button className="cat-pill col-span-2 flex items-center gap-2 p-2.5 rounded-2xl bg-[#111827]/70 hover:bg-[#1a2234] border border-white/5 text-slate-200 font-label-md text-label-md transition-all text-left" data-cat="Other" type="button">
<span className="material-symbols-outlined text-[18px] text-slate-400">more_horiz</span>
<span className="truncate">Other / Uncategorized</span>
</button>
</div>
</div>
{/*  Transaction Details Card  */}
<div className="w-full rounded-2xl p-5 space-y-4 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
<h2 className="font-headline-sm text-headline-sm text-white tracking-tight">Transaction Details</h2>
{/*  Date & Time Row  */}
<div className="flex flex-col space-y-1">
<label className="font-label-sm text-label-sm text-slate-400 uppercase tracking-wider">Date &amp; Time</label>
<div className="flex items-center justify-between p-3 rounded-2xl transition-colors cursor-pointer bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
<div className="flex items-center gap-2.5">
<div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-400/20 flex items-center justify-center text-indigo-300">
<span className="material-symbols-outlined text-[18px]">calendar_today</span>
</div>
<div>
<p className="font-body-md text-body-md font-semibold text-white">Today, Oct 24, 2026</p>
<p className="font-body-sm text-body-sm text-slate-400">10:15 AM</p>
</div>
</div>
<span className="material-symbols-outlined text-slate-400 text-[18px]">edit_calendar</span>
</div>
</div>


{/*  Note & Receipt Preview  */}
<div className="flex flex-col space-y-1">
<div className="flex items-center justify-between">
<label className="font-label-sm text-label-sm text-slate-400 uppercase tracking-wider">Notes &amp; Receipt</label>
<span className="font-label-sm text-label-sm text-slate-500" id="char-counter">44 / 140</span>
</div>
<div className="p-3 rounded-2xl focus-within:border-indigo-400/40 focus-within:bg-[#0b0f19] transition-colors flex flex-col gap-2 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
<textarea className="w-full font-body-md text-body-md text-slate-200 placeholder:text-slate-500 bg-transparent focus:outline-none resize-none" id="note-input" maxlength="140" placeholder="Add an optional note..." rows="2">Weekly fresh produce, oats, and almond milk</textarea>
<div className="flex items-center gap-2 pt-1 border-t border-white/5">
<button className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1e293b]/70 border border-white/10 hover:bg-[#1e293b] text-slate-300 font-label-sm text-label-sm transition-colors" type="button">
<span className="material-symbols-outlined text-[14px] text-teal-300">receipt</span>
<span>Receipt Attached</span>
</button>
<button className="btn-primary" type="button">
<span className="material-symbols-outlined text-[14px]">add_a_photo</span>
<span>Replace</span>
</button>
</div>
</div>
</div>
</div>
{/*  Primary & Secondary Action Block  */}
<div className="space-y-3 pt-2">
<button className="btn-primary w-full" id="save-btn" type="button">
<span className="material-symbols-outlined text-[20px]">check_circle</span>
<span>Save Changes</span>
</button>
<div className="grid grid-cols-2 gap-3">
<button className="btn-secondary w-full"  type="button">
        Cancel
      </button>
<button className="btn-danger w-full" id="delete-bottom-btn" type="button">
<span className="material-symbols-outlined text-[18px]">delete</span>
<span>Delete</span>
</button>
</div>
</div>
</div>
</main>
    </>
  );
}
