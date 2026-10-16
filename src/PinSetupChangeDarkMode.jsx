import React from 'react';

import { 
  ArrowLeft, ShieldCheck, RotateCcw, KeyRound, Shield, CheckCircle2, Info, HelpCircle, ArrowRight 
} from 'lucide-react';

export default function PinSetupChangeDarkMode({ setActiveTab }) {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* 1. TOP HEADER & STATUS BAR */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-white tracking-tight">
            Security PIN & Vault
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

      {/* Hardware Encrypted Sub-bar */}
      <div className="flex items-center justify-between px-5 py-2.5">
        <div className="flex items-center gap-1.5 text-indigo-400">
          <ShieldCheck className="w-4 h-4 text-indigo-400"/>
          <span className="text-[10px] font-bold tracking-wider uppercase">Momentum Shield • Vault Security</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-teal-400">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
          Hardware Encrypted
        </div>
      </div>

      {/* 2. MODE SWITCHER TABS */}
      <div className="block mx-5 mb-4 p-1.5 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
        <div className="w-full flex items-center gap-2">
          <button className="flex-1 py-2.5 px-3 rounded-xl bg-slate-700 text-xs font-semibold text-white shadow-xs flex items-center justify-center gap-1.5 transition-all whitespace-nowrap" type="button">
            <RotateCcw className="w-3.5 h-3.5 text-indigo-400"/>
            Change Existing PIN
          </button>
          <button className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/50 flex items-center justify-center gap-1.5 transition-all whitespace-nowrap" type="button">
            <KeyRound className="w-3.5 h-3.5 text-slate-400"/>
            Create New PIN
          </button>
        </div>
      </div>

      {/* 3. ZERO-KNOWLEDGE VAULT INFO CARD */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl flex items-start gap-3.5 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
        <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center flex-shrink-0 shadow-2xs">
          <Shield className="w-5 h-5"/>
        </div>
        <div>
          <h3 className="text-sm font-bold text-white leading-snug">Zero-Knowledge Vault</h3>
          <p className="text-xs font-normal text-slate-400 mt-1 leading-relaxed">Your 4-digit PIN secures your personal reflections, financial transactions, and sacred journals via on-device Secure Enclave.</p>
        </div>
      </div>

      {/* 4. PIN SEQUENCE CONTAINER */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">PIN Sequence</h3>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 border border-teal-500/30 text-teal-300">
            <CheckCircle2 className="w-3 h-3 text-teal-400"/>
            Validation Active
          </span>
        </div>
        
        {/* Row 1 (Enter Current PIN) */}
        <div className="p-3.5 rounded-2xl flex items-center justify-between bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
          <div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-400"/>
              <h4 className="text-xs font-bold text-slate-200">1. Enter Current PIN</h4>
            </div>
            <span className="text-[11px] font-medium text-teal-400 block pl-6 mt-0.5">Identity authenticated</span>
          </div>
          <div className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700/60 shadow-xs">
            <input 
              aria-label="Enter Current PIN" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
              defaultValue="••••" 
              inputMode="numeric" 
              maxLength={4} 
              pattern="[0-9]*" 
              type="text"
            />
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
          </div>
        </div>

        {/* Row 2 (New 4-Digit PIN) */}
        <div className="p-3.5 rounded-2xl flex items-center justify-between bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
          <div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-400"/>
              <h4 className="text-xs font-bold text-slate-200">2. New 4-Digit PIN</h4>
            </div>
            <span className="text-[11px] font-medium text-teal-400 block pl-6 mt-0.5">High entropy matched</span>
          </div>
          <div className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700/60 shadow-xs">
            <input 
              aria-label="New 4-Digit PIN" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
              defaultValue="••••" 
              inputMode="numeric" 
              maxLength={4} 
              pattern="[0-9]*" 
              type="text"
            />
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
          </div>
        </div>

        {/* Row 3 (Confirm New PIN) */}
        <div className="p-3.5 rounded-2xl flex items-center justify-between bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center">3</div>
              <h4 className="text-xs font-bold text-indigo-300">3. Confirm New PIN</h4>
            </div>
            <span className="text-[11px] font-medium text-indigo-400 block pl-6 mt-0.5">Awaiting last digit slot</span>
          </div>
          <div className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-950/40 border border-indigo-500/30 shadow-xs">
            <input 
              aria-label="Confirm New PIN" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
              defaultValue="123" 
              inputMode="numeric" 
              maxLength={4} 
              pattern="[0-9]*" 
              type="text"
            />
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
          </div>
        </div>

        {/* Validation Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5"/>PIN Matched
          </span>
          <span className="px-3 py-1 rounded-xl text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700 flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-slate-400"/>Non-sequential rule OK
          </span>
        </div>

        {/* Hint */}
        <div className="flex items-center gap-2 text-slate-400 text-[11px] pt-1">
          <HelpCircle className="w-3.5 h-3.5 text-violet-400 flex-shrink-0"/>
          <p>Avoid obvious codes such as <strong className="text-slate-200">1234</strong>, <strong className="text-slate-200">0000</strong>, or your birth year.</p>
        </div>
      </div>

      {/* 5. SHIELD GUARDRAILS CARD */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-3 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider">Shield Guardrails</h3>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-white">Require PIN on App Switch</div>
            <div className="text-xs font-medium text-slate-400">Immediate background lock</div>
          </div>
          <button className="w-12 h-7 rounded-full bg-indigo-500 p-0.5 flex items-center justify-end transition-colors shadow-sm focus:outline-none">
            <span className="w-6 h-6 rounded-full bg-white shadow-md"></span>
          </button>
        </div>
        
        <div className="flex items-center justify-between pt-1">
          <div>
            <div className="text-sm font-semibold text-white">Failed Attempts Protection</div>
            <div className="text-xs font-medium text-slate-400">15 min lockout after 5 fails</div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-teal-500/20 border border-teal-500/30 text-teal-400">
            Active
          </span>
        </div>
      </div>

      {/* 6. BOTTOM ACTION BUTTONS */}
      <div className="px-5 pb-10 space-y-3">
        <button className="btn-primary w-full">
          <span>Save New PIN</span>
          <ArrowRight className="w-4 h-4"/>
        </button>
        <button className="btn-secondary w-full">
          Cancel & Return
        </button>
      </div>
    </div>
  );
}
