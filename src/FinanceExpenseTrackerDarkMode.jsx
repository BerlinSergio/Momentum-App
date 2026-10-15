import React from 'react';

import { Coins, Bell, ChevronDown, Wallet, Leaf, ArrowDownLeft, ArrowUpRight, Search, Plus, Upload, Pencil, Trash2, Home, CreditCard, CheckSquare, Grid, Utensils, Coffee, Heart, Wifi, ShoppingBag, Home as HomeIcon } from 'lucide-react';

export default function FinanceExpenseTrackerDarkMode({ setActiveTab }) {
  return (
    <>
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <Coins className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-white tracking-tight">
            Finance & Expenses
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full text-slate-300 hover:bg-slate-800 transition-colors"><Bell className="w-5 h-5"/></button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            A
          </div>
        </div>
      </div>

      <main className="flex-1 flex flex-col w-full pb-[120px] bg-transparent relative z-10">
        
        {/* Visible Subtitle & Month Selector Row (No Overlap) */}
        <div className="px-5 pt-2 pb-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-white tracking-normal">Finance & Expenses</h1>
            <p className="text-xs font-normal text-slate-400 mt-0.5">Track spending & financial wellness</p>
          </div>
          <button className="px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs font-bold text-indigo-300 shadow-sm hover:bg-slate-800 flex items-center gap-1.5 transition-all">
            October 2026
            <ChevronDown className="w-3.5 h-3.5 text-indigo-400"/>
          </button>
        </div>

        {/* HERO REMAINING BALANCE CARD */}
        <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><Wallet className="w-3.5 h-3.5 text-indigo-400"/>Remaining Balance</span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-1"><Leaf className="w-3 h-3 text-emerald-400"/>Safe pace</span>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">$2,750.00</h2>
            <div className="flex items-center gap-1.5 text-xs font-normal text-slate-400 mt-1"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>Safe to spend: <span className="font-bold text-white">$89.00 / day</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800/80">
            <div><span className="text-xs font-normal text-slate-400 flex items-center gap-1"><ArrowDownLeft className="w-3.5 h-3.5 text-emerald-400"/>Income</span><p className="text-sm font-semibold text-slate-100 mt-0.5">$6,200.00</p></div>
            <div><span className="text-xs font-normal text-slate-400 flex items-center gap-1"><ArrowUpRight className="w-3.5 h-3.5 text-indigo-400"/>Expenses</span><p className="text-sm font-semibold text-slate-100 mt-0.5">$3,450.00</p></div>
          </div>

          <div className="pt-2">
            <div className="flex items-center justify-between mb-1.5 text-[11px] font-medium">
              <span className="text-slate-400">Monthly Budget Cap</span>
              <span className="text-indigo-400 font-semibold">69% used</span>
            </div>
            <div className="rounded-full h-2.5 bg-slate-800 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full" style={{ width: '69%' }}></div>
            </div>
            <div className="flex items-center justify-between mt-1.5 text-xs font-normal text-slate-400">
              <span>$3,450.00 spent</span>
              <span>$5,000.00 limit</span>
            </div>
          </div>
        </div>

        {/* SPENDING CATEGORIES CAROUSEL */}
        <div className="flex items-center justify-between px-5 mb-2.5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Spending Categories</span>
          <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300">Details</button>
        </div>
        <div className="flex items-center gap-3 px-5 mb-5 overflow-x-auto scrollbar-none py-1">
          {/* Housing */}
          <div className="min-w-[130px] p-3.5 rounded-2xl transition-all flex items-center gap-3 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 flex-shrink-0"><HomeIcon className="w-4 h-4"/></div>
            <div>
              <p className="text-xs font-normal text-slate-400">Housing</p>
              <p className="text-sm font-bold text-white">$1,450</p>
            </div>
          </div>
          {/* Food */}
          <div className="min-w-[130px] p-3.5 rounded-2xl transition-all flex items-center gap-3 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 flex-shrink-0"><Utensils className="w-4 h-4"/></div>
            <div>
              <p className="text-xs font-normal text-slate-400">Food & Dining</p>
              <p className="text-sm font-bold text-white">$820</p>
            </div>
          </div>
          {/* Shopping */}
          <div className="min-w-[130px] p-3.5 rounded-2xl transition-all flex items-center gap-3 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 flex-shrink-0"><ShoppingBag className="w-4 h-4"/></div>
            <div>
              <p className="text-xs font-normal text-slate-400">Shopping</p>
              <p className="text-sm font-bold text-white">$460</p>
            </div>
          </div>
        </div>

        {/* SEARCH, FILTER & ACTION CONTROLS */}
        <div className="mx-5 mb-3 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Search transactions..." className="w-full py-3 pl-10 pr-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-400 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40" />
          </div>
          <button className="btn-primary">
            <Plus className="w-4 h-4"/> Add
          </button>
        </div>

        <div className="flex items-center justify-between px-5 mb-4">
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-300 shadow-sm flex items-center gap-1 hover:bg-slate-700">All Categories <ChevronDown className="w-3 h-3 text-slate-400"/></button>
            <button className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-300 shadow-sm flex items-center gap-1 hover:bg-slate-700">Date <ChevronDown className="w-3 h-3 text-slate-400"/></button>
          </div>
          <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"><Upload className="w-3.5 h-3.5"/>Export</button>
        </div>

        {/* TRANSACTION FEED */}
        <div className="flex items-center justify-between px-5 py-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Today</span>
          <span className="text-xs font-semibold text-slate-300">-$73.25</span>
        </div>

        <div className="block mx-5 mb-2.5 p-3.5 rounded-2xl transition-all flex items-center justify-between gap-3 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Utensils className="w-5 h-5"/>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-slate-100 truncate">Organic Groceries</span>
              <span className="text-xs font-normal text-slate-400 truncate">Supermarket • 10:15 AM</span>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-sm font-bold text-white">-$64.50</span>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"><Pencil className="w-4 h-4"/></button>
              <button className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800"><Trash2 className="w-4 h-4"/></button>
            </div>
          </div>
        </div>

        <div className="block mx-5 mb-2.5 p-3.5 rounded-2xl transition-all flex items-center justify-between gap-3 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-orange-500/15 text-orange-400 flex items-center justify-center flex-shrink-0">
              <Coffee className="w-5 h-5"/>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-slate-100 truncate">Espresso & Pastry</span>
              <span className="text-xs font-normal text-slate-400 truncate">Coffee Shop • 8:40 AM</span>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-sm font-bold text-white">-$8.75</span>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"><Pencil className="w-4 h-4"/></button>
              <button className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800"><Trash2 className="w-4 h-4"/></button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-5 py-2 mt-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Yesterday</span>
          <span className="text-xs font-semibold text-slate-300">-$215.00</span>
        </div>

        <div className="block mx-5 mb-2.5 p-3.5 rounded-2xl transition-all flex items-center justify-between gap-3 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center flex-shrink-0">
              <Heart className="w-5 h-5"/>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-slate-100 truncate">Equinox Membership</span>
              <span className="text-xs font-normal text-slate-400 truncate">Wellness • Oct 23</span>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-sm font-bold text-white">-$140.00</span>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"><Pencil className="w-4 h-4"/></button>
              <button className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800"><Trash2 className="w-4 h-4"/></button>
            </div>
          </div>
        </div>

        <div className="block mx-5 mb-2.5 p-3.5 rounded-2xl transition-all flex items-center justify-between gap-3 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center flex-shrink-0">
              <Wifi className="w-5 h-5"/>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-slate-100 truncate">High-speed Internet</span>
              <span className="text-xs font-normal text-slate-400 truncate">Utilities • Oct 23</span>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-sm font-bold text-white">-$75.00</span>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"><Pencil className="w-4 h-4"/></button>
              <button className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800"><Trash2 className="w-4 h-4"/></button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between px-5 py-2 mt-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Oct 21</span>
          <span className="text-xs font-semibold text-slate-300">-$112.30</span>
        </div>

        <div className="block mx-5 mb-2.5 p-3.5 rounded-2xl transition-all flex items-center justify-between gap-3 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Utensils className="w-5 h-5"/>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-slate-100 truncate">Weekly Meal Prep</span>
              <span className="text-xs font-normal text-slate-400 truncate">Food • Oct 21</span>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-sm font-bold text-white">-$112.30</span>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"><Pencil className="w-4 h-4"/></button>
              <button className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800"><Trash2 className="w-4 h-4"/></button>
            </div>
          </div>
        </div>

      </main>
      
      {/* BOTTOM NAVIGATION DOCK */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-slate-900/90 backdrop-blur-xl border-t border-slate-800 text-slate-400 px-4 py-3 rounded-t-3xl shadow-lg flex items-center justify-between z-40">
        <button className="flex flex-col items-center gap-1 text-slate-500 hover:text-indigo-400"><Home className="w-5 h-5" /><span className="text-[10px] font-medium">Home</span></button>
        <button className="flex flex-col items-center gap-1 text-indigo-400 font-semibold"><CreditCard className="w-5 h-5" /><span className="text-[10px]">Finance</span></button>
        <div className="relative -top-5">
          <button className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/40 border-4 border-slate-900">
            <Plus className="w-6 h-6" />
          </button>
        </div>
        <button className="flex flex-col items-center gap-1 text-slate-500 hover:text-indigo-400"><CheckSquare className="w-5 h-5" /><span className="text-[10px] font-medium">Tasks</span></button>
        <button className="flex flex-col items-center gap-1 text-slate-500 hover:text-indigo-400"><Grid className="w-5 h-5" /><span className="text-[10px] font-medium">More</span></button>
      </div>

    </>
  );
}
