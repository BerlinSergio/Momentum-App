import React from 'react';

import { 
  ArrowLeft, SlidersHorizontal, User, Calendar, ChevronDown, Info, TrendingUp, CalendarClock, PlusCircle, Download, FileText, Search, Building2, Palette, Store, Award, Repeat, Edit2, Trash2, Building, Sparkles, PartyPopper, Leaf, Home, Wallet, Plus, CheckSquare, Grid 
} from 'lucide-react';

export default function IncomeManagementDarkMode({ setActiveTab }) {
  return (
    <div className="min-h-screen bg-slate-950 font-sans pb-24">
      {/* Top Header */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-white tracking-tight">
            Income Management
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveTab && setActiveTab('home_dashboard_dark_mode')}
            className="p-2 rounded-full text-slate-300 hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            A
          </div>
        </div>
      </div>

      {/* Month Selector & Breadcrumb Header Context */}
      <div className="flex items-center justify-between px-5 py-2 mb-2">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-indigo-400" />
          <span className="text-sm font-medium text-slate-400">Period:</span>
          <button className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full text-slate-200 transition-all active:scale-95 shadow-sm">
            <span className="text-sm font-semibold">October 2026</span>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </button>
        </div>
        <div className="flex items-center gap-1.5 text-indigo-400 text-xs font-semibold bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
          <span>Live Sync</span>
        </div>
      </div>

      <div className="px-5 space-y-6">
        {/* Financial Summary Banner Card */}
        <section className="relative w-full rounded-3xl p-5 overflow-hidden bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
          {/* Ambient luminous gradients */}
          <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none"></div>
          <div className="absolute -left-12 -bottom-12 w-44 h-44 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-sm font-medium text-slate-400 flex items-center gap-1.5">
                  Total Monthly Inflow
                  <Info className="w-4 h-4 text-slate-500" />
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-bold text-white tracking-tight">$6,200.00</span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-bold">+8.4%</span>
              </div>
            </div>

            {/* Breakdown Sub-metrics */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="rounded-2xl p-3 flex flex-col bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                  <span className="text-xs font-medium text-slate-400">Active Income</span>
                </div>
                <span className="text-base font-bold text-white">$5,000.00</span>
                <span className="text-xs font-medium text-slate-500 mt-0.5">80.6% of total</span>
              </div>
              
              <div className="rounded-2xl p-3 flex flex-col bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="text-xs font-medium text-slate-400">Passive & Other</span>
                </div>
                <span className="text-base font-bold text-white">$1,200.00</span>
                <span className="text-xs font-medium text-slate-500 mt-0.5">19.4% of total</span>
              </div>
            </div>

            {/* Next Expected Deposit Widget */}
            <div className="flex items-center justify-between rounded-2xl px-3.5 py-3 mt-1 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
                  <CalendarClock className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-white truncate">TechCorp Salary (+$5,000)</span>
                  <span className="text-xs font-medium text-slate-400">Oct 31 • Expected in 7 days</span>
                </div>
              </div>
              <span className="text-xs font-bold text-indigo-400 bg-slate-900 border border-indigo-500/20 px-2 py-1 rounded-full shrink-0 shadow-sm">Scheduled</span>
            </div>
          </div>
        </section>

        {/* Quick Actions Bar */}
        <section className="flex items-center gap-3">
          <button className="btn-primary">
            <PlusCircle className="w-5 h-5" />
            <span>Add Income</span>
          </button>
          <button className="h-12 w-12 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-center shadow-sm active:scale-95 transition-transform hover:bg-slate-800">
            <Download className="w-5 h-5" />
          </button>
          <button className="h-12 w-12 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-center shadow-sm active:scale-95 transition-transform hover:bg-slate-800">
            <FileText className="w-5 h-5" />
          </button>
        </section>

        {/* Search & Filter Controls */}
        <div className="flex items-center gap-2">
          <div className="flex-1 relative flex items-center">
            <Search className="absolute left-3 w-5 h-5 text-slate-500" />
            <input 
              className="w-full h-11 pl-10 pr-4 bg-slate-900 border border-slate-800 rounded-2xl text-white placeholder:text-slate-500 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40 shadow-sm transition-all" 
              placeholder="Search income sources or notes..." 
              type="text"
            />
          </div>
          <button className="h-11 px-3 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform hover:bg-slate-800">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-semibold">Date</span>
          </button>
        </div>

        {/* Source Filter Tabs (Horizontal Scrollable) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-5 px-5 no-scrollbar">
          <button className="shrink-0 px-4 py-2 rounded-full bg-white text-slate-900 text-sm font-semibold shadow-sm whitespace-nowrap">
            All Sources (5)
          </button>
          <button className="shrink-0 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-sm font-medium shadow-sm hover:bg-slate-800 active:bg-slate-700 whitespace-nowrap">
            Salary (1)
          </button>
          <button className="shrink-0 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-sm font-medium shadow-sm hover:bg-slate-800 active:bg-slate-700 whitespace-nowrap">
            Freelance (2)
          </button>
          <button className="shrink-0 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-sm font-medium shadow-sm hover:bg-slate-800 active:bg-slate-700 whitespace-nowrap">
            Business (1)
          </button>
          <button className="shrink-0 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-sm font-medium shadow-sm hover:bg-slate-800 active:bg-slate-700 whitespace-nowrap">
            Bonus (1)
          </button>
          <button className="shrink-0 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-500 text-sm font-medium shadow-sm active:bg-slate-700 whitespace-nowrap opacity-60">
            Other (0)
          </button>
        </div>

        {/* Detailed Income Feed */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-500 tracking-wider uppercase">This Month • October 2026</span>
            <span className="text-xs font-semibold text-slate-400">4 Transactions</span>
          </div>

          {/* Item 1: TechCorp Salary */}
          <div className="w-full rounded-3xl p-4 flex flex-col gap-3 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold text-white">TechCorp Solutions</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-bold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full">Salary</span>
                    <span className="text-xs font-medium text-slate-400">Oct 01, 2026</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-lg font-bold text-emerald-400">+$5,000.00</span>
                <span className="text-xs font-medium text-slate-400">Cleared</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-800/50">
              <div className="flex items-center gap-1.5 bg-slate-800/50 border border-slate-700/50 px-2.5 py-1 rounded-full">
                <Repeat className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs font-medium text-slate-300">Monthly recurring (Day 1)</span>
              </div>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-400 flex items-center justify-center hover:bg-slate-700 active:scale-95 transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/20 active:scale-95 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Item 2: Mobile App UI Design */}
          <div className="w-full rounded-3xl p-4 flex flex-col gap-3 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center shrink-0">
                  <Palette className="w-5 h-5 text-fuchsia-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold text-white">Mobile App UI Design</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-bold bg-fuchsia-500/20 text-fuchsia-300 px-2 py-0.5 rounded-full">Freelance</span>
                    <span className="text-xs font-medium text-slate-400">Oct 14, 2026</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-lg font-bold text-emerald-400">+$650.00</span>
                <span className="text-xs font-medium text-slate-400">Invoice #1042</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-800/50">
              <div className="flex items-center gap-1.5 bg-slate-800/50 border border-slate-700/50 px-2.5 py-1 rounded-full">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs font-medium text-slate-300">Client: Aura Labs</span>
              </div>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-400 flex items-center justify-center hover:bg-slate-700 active:scale-95 transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/20 active:scale-95 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Item 3: E-commerce Store Royalty */}
          <div className="w-full rounded-3xl p-4 flex flex-col gap-3 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                  <Store className="w-5 h-5 text-amber-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold text-white">E-commerce Royalty</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full">Business</span>
                    <span className="text-xs font-medium text-slate-400">Oct 18, 2026</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-lg font-bold text-emerald-400">+$350.00</span>
                <span className="text-xs font-medium text-slate-400">Stripe Payout</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-800/50">
              <div className="flex items-center gap-1.5 bg-slate-800/50 border border-slate-700/50 px-2.5 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs font-medium text-slate-300">Digital Design Assets</span>
              </div>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-400 flex items-center justify-center hover:bg-slate-700 active:scale-95 transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/20 active:scale-95 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Item 4: Q3 Performance Incentive */}
          <div className="w-full rounded-3xl p-4 flex flex-col gap-3 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-sky-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold text-white">Q3 Performance Incentive</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-bold bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full">Bonus</span>
                    <span className="text-xs font-medium text-slate-400">Oct 20, 2026</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-lg font-bold text-emerald-400">+$200.00</span>
                <span className="text-xs font-medium text-slate-400">One-time payout</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-800/50">
              <div className="flex items-center gap-1.5 bg-slate-800/50 border border-slate-700/50 px-2.5 py-1 rounded-full">
                <PartyPopper className="w-3.5 h-3.5 text-sky-400" />
                <span className="text-xs font-medium text-slate-300">Team KPI Completion</span>
              </div>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-400 flex items-center justify-center hover:bg-slate-700 active:scale-95 transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/20 active:scale-95 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Ambient Inspiration Quote Pill */}
        <div className="w-full rounded-3xl p-5 flex items-center gap-4 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
          <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0">
            <Leaf className="w-5 h-5 text-teal-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white">Mindful Prosperity</span>
            <span className="text-xs font-medium text-slate-400 mt-0.5 leading-relaxed">"Steady discipline creates lasting tranquility and sustainable abundance."</span>
          </div>
        </div>
      </div>

      {/* Floating Bottom Navigation Dock */}
      <div className="fixed bottom-6 inset-x-4 z-40">
        <div className="relative w-full h-16 rounded-full bg-slate-900/90 backdrop-blur-xl border border-slate-800/50 shadow-lg flex items-center justify-around px-2">
          {/* Nav Item 1: Home */}
          <button 
            className="flex flex-col items-center justify-center gap-1 text-slate-500 hover:text-slate-300 active:scale-95 transition-all w-14" 
            onClick={() => setActiveTab && setActiveTab('home')}
          >
            <Home className="w-6 h-6" strokeWidth={2} />
            <span className="text-[10px] font-semibold leading-none">Home</span>
          </button>
          
          {/* Nav Item 2: Finance (Active) */}
          <button 
            className="flex flex-col items-center justify-center gap-1 text-indigo-400 active:scale-95 transition-all w-14 relative"
            onClick={() => setActiveTab && setActiveTab('finance')}
          >
            <div className="absolute -top-3 w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
            <Wallet className="w-6 h-6 fill-indigo-500/20" strokeWidth={2} />
            <span className="text-[10px] font-bold leading-none">Finance</span>
          </button>
          
          {/* Center Action Button (+) */}
          <div className="relative -top-5 flex items-center justify-center">
            <button className="w-14 h-14 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20 active:scale-95 transition-transform ring-4 ring-slate-950">
              <Plus className="w-7 h-7" strokeWidth={2.5} />
            </button>
          </div>
          
          {/* Nav Item 4: Tasks */}
          <button className="flex flex-col items-center justify-center gap-1 text-slate-500 hover:text-slate-300 active:scale-95 transition-all w-14">
            <CheckSquare className="w-6 h-6" strokeWidth={2} />
            <span className="text-[10px] font-semibold leading-none">Tasks</span>
          </button>
          
          {/* Nav Item 5: More */}
          <button className="flex flex-col items-center justify-center gap-1 text-slate-500 hover:text-slate-300 active:scale-95 transition-all w-14">
            <Grid className="w-6 h-6" strokeWidth={2} />
            <span className="text-[10px] font-semibold leading-none">More</span>
          </button>
        </div>
      </div>
    </div>
  );
}
