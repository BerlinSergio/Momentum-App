import React from 'react';

import { 
  User, 
  CheckCircle2, 
  ChevronDown, 
  Compass, 
  MapPin, 
  Lock, 
  ArrowRight 
} from 'lucide-react';

export default function PersonalSetupLightMode({ setActiveTab }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between pb-8 pt-3">
      <div className="w-full">
        {/* TOP BRANDING & WELCOME HEADER */}
        <div className="pt-8 pb-5 px-5 text-center flex flex-col items-center">
          {/* Momentum App Icon / Logo Badge */}
          <img 
            src="/logo.png" 
            alt="Momentum Logo" 
            className="w-16 h-16 object-cover rounded-2xl aspect-square flex-shrink-0 shadow-lg shadow-indigo-600/30 mb-4 ring-4 ring-indigo-50"
          />

          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Welcome to Momentum
          </h1>
          <p className="text-xs font-normal text-slate-500 max-w-xs mx-auto mt-1.5 leading-relaxed">
            Personalize your space for mindful routines, accurate prayer schedules, and daily finances.
          </p>
        </div>

        {/* STANDARDIZED SETUP CONFIGURATION CARD */}
        <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
          
          {/* SECTION A: YOUR NAME ROW */}
          <div className="p-3.5 rounded-2xl flex items-center justify-between bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-100/70 text-indigo-600 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4"/>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Your Name</span>
                <p className="text-sm font-semibold text-slate-900 mt-0.5">Aisha Mohammed</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 border border-emerald-200/80 text-emerald-700 shadow-2xs">
              <CheckCircle2 className="w-3 h-3 text-emerald-600"/>
              Verified
            </span>
          </div>

          {/* SECTION B: PREFERRED CURRENCY SELECTOR */}
          <div className="p-4 rounded-2xl space-y-3 bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-violet-100/70 text-violet-700 font-bold text-sm flex items-center justify-center flex-shrink-0">
                  ؋
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Preferred Currency</span>
                  <h3 className="text-sm font-semibold text-slate-900 mt-0.5">Afghan Afghani</h3>
                  <span className="text-[11px] font-normal text-slate-500">Default Base Currency (؋ AFN)</span>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0"/>
            </div>

            {/* Quick Currency Selector Grid */}
            <div className="grid grid-cols-4 gap-2 pt-1 border-t border-slate-200/60">
              <button className="py-2 px-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs shadow-xs text-center">
                ؋ AFN
              </button>
              <button className="py-2 px-2.5 rounded-xl bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-100 font-medium text-xs text-center transition-colors">
                $ USD
              </button>
              <button className="py-2 px-2.5 rounded-xl bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-100 font-medium text-xs text-center transition-colors">
                € EUR
              </button>
              <button className="py-2 px-2.5 rounded-xl bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-100 font-medium text-xs text-center transition-colors">
                £ GBP
              </button>
            </div>
          </div>

          {/* SECTION C: PRAYER & CALENDAR TIMEZONE */}
          <div className="p-3.5 rounded-2xl flex items-center justify-between bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100/70 text-amber-700 flex items-center justify-center flex-shrink-0">
                <Compass className="w-4 h-4"/>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Prayer & Calendar Timezone</span>
                <p className="text-sm font-semibold text-slate-900 mt-0.5">Asia/Kabul</p>
                <span className="text-[11px] font-normal text-slate-500">Afghanistan Time (UTC +04:30)</span>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0"/>
          </div>

          {/* SECTION D: CURRENT CITY & DETECTION */}
          <div className="p-3.5 rounded-2xl flex items-center justify-between bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-100/70 text-rose-600 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4"/>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current City</span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-teal-50 border border-teal-200/80 text-teal-700">
                    Auto-detected
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-900 mt-0.5">Kabul, Afghanistan</p>
              </div>
            </div>
            <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
              Change
            </button>
          </div>
        </div>

        {/* ENCRYPTION & LOCAL STORAGE NOTICE */}
        <div className="mx-5 mb-6 flex items-start gap-2.5 px-2 text-slate-400">
          <Lock className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-slate-400"/>
          <p className="text-[11px] font-normal leading-relaxed">
            Stored locally & encrypted securely. You can modify prayer calculation algorithms & currency anytime in Settings.
          </p>
        </div>
      </div>

      <div className="px-5 w-full">
        <button onClick={() => setActiveTab && setActiveTab('home')} className="w-full h-14 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold text-[15px] flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all">
          <span>Continue to Dashboard</span>
          <ArrowRight className="w-4 h-4 stroke-[2.2]"/>
        </button>
      </div>
    </div>
  );
}
