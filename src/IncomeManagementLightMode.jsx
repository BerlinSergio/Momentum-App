import React, { useState } from 'react';

import { 
  ArrowLeft, SlidersHorizontal, User, Calendar, ChevronDown, Info, TrendingUp, CalendarClock, PlusCircle, Download, FileText, Search, Building2, Palette, Store, Award, Repeat, Edit2, Trash2, Building, Sparkles, PartyPopper, Leaf, Home, Wallet, Plus, CheckSquare, Grid, SearchX 
} from 'lucide-react';

export default function IncomeManagementLightMode({ setActiveTab }) {
  const [searchQuery, setSearchQuery] = useState('');
  const hasMatch = searchQuery.trim() === '' || 'techcorp solutions mobile app ui design e-commerce royalty performance incentive freelance bonus salary'.includes(searchQuery.toLowerCase().trim());

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-36">
      {/* Top Header */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-indigo-950 tracking-tight" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>
            Income Management
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

      {/* Month Selector & Breadcrumb Header Context */}
      <div className="flex items-center justify-between px-5 py-2 mb-2">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-indigo-600" />
          <span className="text-sm font-medium text-slate-800" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>Period:</span>
          <button className="flex items-center gap-1 bg-white border border-slate-200 px-3 py-1 rounded-full text-slate-700 transition-all active:scale-95 shadow-sm">
            <span className="text-sm font-semibold">October 2026</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
        </div>
        <div className="flex items-center gap-1.5 text-indigo-600 text-xs font-semibold bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
          <span style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>Live Sync</span>
        </div>
      </div>

      <div className="px-5 space-y-6">
        {/* Financial Summary Banner Card */}
        <section className="relative w-full rounded-3xl p-5 overflow-hidden bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          {/* Ambient luminous gradients */}
          <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-indigo-50 blur-2xl pointer-events-none"></div>
          <div className="absolute -left-12 -bottom-12 w-44 h-44 rounded-full bg-emerald-50 blur-2xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-sm font-medium text-slate-500 flex items-center gap-1.5">
                  Total Monthly Inflow
                  <Info className="w-4 h-4 text-slate-400" />
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-bold text-slate-900 tracking-tight">$6,200.00</span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 border border-emerald-100 px-2.5 py-1 rounded-full">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-bold">+8.4%</span>
              </div>
            </div>

            {/* Breakdown Sub-metrics */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="rounded-2xl p-3 flex flex-col bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                  <span className="text-xs font-medium text-slate-500">Active Income</span>
                </div>
                <span className="text-base font-bold text-slate-900">$5,000.00</span>
                <span className="text-xs font-medium text-slate-500 mt-0.5">80.6% of total</span>
              </div>
              
              <div className="rounded-2xl p-3 flex flex-col bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="text-xs font-medium text-slate-500">Passive & Other</span>
                </div>
                <span className="text-base font-bold text-slate-900">$1,200.00</span>
                <span className="text-xs font-medium text-slate-500 mt-0.5">19.4% of total</span>
              </div>
            </div>

            {/* Next Expected Deposit Widget */}
            <div className="flex items-center justify-between rounded-2xl px-3.5 py-3 mt-1 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                  <CalendarClock className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-slate-900 truncate">TechCorp Salary (+$5,000)</span>
                  <span className="text-xs font-medium text-slate-500">Oct 31 • Expected in 7 days</span>
                </div>
              </div>
              <span className="text-xs font-bold text-indigo-600 bg-white border border-indigo-100 px-2 py-1 rounded-full shrink-0 shadow-sm">Scheduled</span>
            </div>
          </div>
        </section>

        {/* Quick Actions Bar */}
        <section className="flex flex-row items-center justify-between w-full gap-3">
          <button 
            onClick={() => setActiveTab && setActiveTab('add_edit_income_light_mode')}
            className="btn-primary flex-1 h-12 rounded-2xl flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Add Income</span>
          </button>
          <div className="flex flex-row items-center gap-2">
            <button aria-label="Export statement" className="h-12 w-12 rounded-2xl bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-sm active:scale-95 transition-transform hover:bg-slate-50">
              <Download className="w-5 h-5" />
            </button>
            <button aria-label="Statement reports" className="h-12 w-12 rounded-2xl bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-sm active:scale-95 transition-transform hover:bg-slate-50">
              <FileText className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* Search & Filter Controls */}
        <div className="flex items-center gap-2">
          <div className="flex-1 relative flex items-center">
            <Search className="absolute left-3 w-5 h-5 text-slate-400" />
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm transition-all" 
              placeholder="Search income sources or notes..." 
              type="text"
            />
          </div>
          <button className="h-11 px-3 bg-white border border-slate-200 rounded-2xl text-slate-700 flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform hover:bg-slate-50">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-semibold">Date</span>
          </button>
        </div>

        {/* Source Filter Tabs (Horizontal Scrollable) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-5 px-5 no-scrollbar">
          <button className="shrink-0 px-4 py-2 rounded-full bg-slate-900 text-white text-sm font-semibold shadow-sm whitespace-nowrap active:scale-95 transition-all cursor-pointer select-none">
            All Sources (5)
          </button>
          <button className="shrink-0 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-medium shadow-sm hover:bg-slate-50 active:scale-95 transition-all cursor-pointer select-none whitespace-nowrap">
            Salary (1)
          </button>
          <button className="shrink-0 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-medium shadow-sm hover:bg-slate-50 active:scale-95 transition-all cursor-pointer select-none whitespace-nowrap">
            Freelance (2)
          </button>
          <button className="shrink-0 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-medium shadow-sm hover:bg-slate-50 active:scale-95 transition-all cursor-pointer select-none whitespace-nowrap">
            Business (1)
          </button>
          <button className="shrink-0 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-medium shadow-sm hover:bg-slate-50 active:scale-95 transition-all cursor-pointer select-none whitespace-nowrap">
            Bonus (1)
          </button>
          <button className="shrink-0 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-400 text-sm font-medium shadow-sm active:scale-95 transition-all cursor-pointer select-none whitespace-nowrap opacity-60">
            Other (0)
          </button>
        </div>

        {/* Detailed Income Feed */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-indigo-950 tracking-wider uppercase" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>This Month • October 2026</span>
            <span className="text-xs font-semibold text-indigo-950 font-semibold" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>4 Transactions</span>
          </div>

          {!hasMatch ? (
            <div className="w-full my-4 p-8 rounded-3xl border backdrop-blur-xl flex flex-col items-center justify-center text-center bg-white/60 border-white/60 shadow-sm">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-indigo-50/80 text-indigo-600">
                <SearchX className="w-8 h-8"/>
              </div>
              <h3 className="text-base font-semibold mb-1 text-slate-900">
                No Income Streams Found
              </h3>
              <p className="text-xs max-w-[240px] leading-relaxed mb-5 text-slate-600">
                No income records match your current search query. Try clearing the filter.
              </p>
              <button 
                onClick={() => setSearchQuery('')}
                className="px-5 py-2.5 rounded-xl font-medium text-xs flex items-center gap-2 bg-indigo-600 text-white shadow-md active:scale-95 transition-all cursor-pointer select-none"
              >
                Clear Search Filter
              </button>
            </div>
          ) : (
            <>
              {/* Item 1: TechCorp Salary */}
              <div className="w-full rounded-3xl p-4 flex flex-col gap-3 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer select-none">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-base font-bold text-slate-900 truncate">TechCorp Solutions</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full shrink-0">Salary</span>
                        <span className="text-xs font-medium text-slate-500 truncate">Oct 01, 2026</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-lg font-bold text-emerald-600">+$5,000.00</span>
                    <span className="text-xs font-medium text-slate-500">Cleared</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full">
                    <Repeat className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="text-xs font-medium text-slate-600">Monthly recurring (Day 1)</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button aria-label="Edit income" className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-slate-100 active:scale-90 transition-transform cursor-pointer select-none">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button aria-label="Delete income" className="w-8 h-8 rounded-full bg-red-50 border border-red-100 text-red-500 flex items-center justify-center hover:bg-red-100 active:scale-90 transition-transform cursor-pointer select-none">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Item 2: Mobile App UI Design */}
              <div className="w-full rounded-3xl p-4 flex flex-col gap-3 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer select-none">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-11 h-11 rounded-2xl bg-fuchsia-50 border border-fuchsia-100 flex items-center justify-center shrink-0">
                      <Palette className="w-5 h-5 text-fuchsia-600" />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-base font-bold text-slate-900 truncate">Mobile App UI Design</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-bold bg-fuchsia-100 text-fuchsia-700 px-2 py-0.5 rounded-full shrink-0">Freelance</span>
                        <span className="text-xs font-medium text-slate-500 truncate">Oct 14, 2026</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-lg font-bold text-emerald-600">+$650.00</span>
                    <span className="text-xs font-medium text-slate-500">Invoice #1042</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full">
                    <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="text-xs font-medium text-slate-600">Client: Aura Labs</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button aria-label="Edit income" className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-slate-100 active:scale-90 transition-transform cursor-pointer select-none">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button aria-label="Delete income" className="w-8 h-8 rounded-full bg-red-50 border border-red-100 text-red-500 flex items-center justify-center hover:bg-red-100 active:scale-90 transition-transform cursor-pointer select-none">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Item 3: E-commerce Store Royalty */}
              <div className="w-full rounded-3xl p-4 flex flex-col gap-3 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer select-none">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                      <Store className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-base font-bold text-slate-900 truncate">E-commerce Royalty</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full shrink-0">Business</span>
                        <span className="text-xs font-medium text-slate-500 truncate">Oct 18, 2026</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-lg font-bold text-emerald-600">+$350.00</span>
                    <span className="text-xs font-medium text-slate-500">Stripe Payout</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="text-xs font-medium text-slate-600">Digital Design Assets</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button aria-label="Edit income" className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-slate-100 active:scale-90 transition-transform cursor-pointer select-none">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button aria-label="Delete income" className="w-8 h-8 rounded-full bg-red-50 border border-red-100 text-red-500 flex items-center justify-center hover:bg-red-100 active:scale-90 transition-transform cursor-pointer select-none">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Item 4: Q3 Performance Incentive */}
              <div className="w-full rounded-3xl p-4 flex flex-col gap-3 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer select-none">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0">
                      <Award className="w-5 h-5 text-sky-600" />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-base font-bold text-slate-900 truncate">Q3 Performance Incentive</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-bold bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full shrink-0">Bonus</span>
                        <span className="text-xs font-medium text-slate-500 truncate">Oct 20, 2026</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-lg font-bold text-emerald-600">+$200.00</span>
                    <span className="text-xs font-medium text-slate-500">One-time payout</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full">
                    <PartyPopper className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                    <span className="text-xs font-medium text-slate-600">Team KPI Completion</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button aria-label="Edit income" className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-slate-100 active:scale-90 transition-transform cursor-pointer select-none">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button aria-label="Delete income" className="w-8 h-8 rounded-full bg-red-50 border border-red-100 text-red-500 flex items-center justify-center hover:bg-red-100 active:scale-90 transition-transform cursor-pointer select-none">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>

        {/* Ambient Inspiration Quote Pill */}
        <div className="w-full rounded-3xl p-5 flex items-center gap-4 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0">
            <Leaf className="w-5 h-5 text-teal-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900">Mindful Prosperity</span>
            <span className="text-xs font-medium text-slate-500 mt-0.5 leading-relaxed">"Steady discipline creates lasting tranquility and sustainable abundance."</span>
          </div>
        </div>
      </div>

      {/* Floating Bottom Navigation Dock */}
      <div className="fixed bottom-6 inset-x-4 z-40">
        <div className="relative w-full h-16 rounded-full bg-white/90 backdrop-blur-xl border border-slate-200/50 shadow-lg flex items-center justify-around px-2">
          {/* Nav Item 1: Home */}
          <button 
            className="flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-slate-600 active:scale-95 transition-all w-14" 
            onClick={() => setActiveTab && setActiveTab('home')}
          >
            <Home className="w-6 h-6" strokeWidth={2} />
            <span className="text-[10px] font-semibold leading-none">Home</span>
          </button>
          
          {/* Nav Item 2: Finance (Active) */}
          <button 
            className="flex flex-col items-center justify-center gap-1 text-indigo-600 active:scale-95 transition-all w-14 relative"
            onClick={() => setActiveTab && setActiveTab('finance')}
          >
            <div className="absolute -top-3 w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
            <Wallet className="w-6 h-6 fill-indigo-50" strokeWidth={2} />
            <span className="text-[10px] font-bold leading-none">Finance</span>
          </button>
          
          {/* Center Action Button (+) */}
          <div className="relative -top-5 flex items-center justify-center">
            <button className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 active:scale-95 transition-transform ring-4 ring-slate-50">
              <Plus className="w-7 h-7" strokeWidth={2.5} />
            </button>
          </div>
          
          {/* Nav Item 4: Tasks */}
          <button className="flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-slate-600 active:scale-95 transition-all w-14">
            <CheckSquare className="w-6 h-6" strokeWidth={2} />
            <span className="text-[10px] font-semibold leading-none">Tasks</span>
          </button>
          
          {/* Nav Item 5: More */}
          <button className="flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-slate-600 active:scale-95 transition-all w-14">
            <Grid className="w-6 h-6" strokeWidth={2} />
            <span className="text-[10px] font-semibold leading-none">More</span>
          </button>
        </div>
      </div>
    </div>
  );
}
