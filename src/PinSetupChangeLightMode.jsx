import React from 'react';

import { 
  ArrowLeft, ShieldCheck, RotateCcw, KeyRound, Shield, CheckCircle2, Info, HelpCircle, ArrowRight 
} from 'lucide-react';

export default function PinSetupChangeLightMode({ setActiveTab }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* 1. TOP HEADER & STATUS BAR */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-indigo-950 tracking-tight" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>
            Security PIN & Vault
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

      {/* Hardware Encrypted Sub-bar */}
      <div className="flex items-center justify-between px-5 py-2.5">
        <div className="flex items-center gap-1.5 text-indigo-700">
          <ShieldCheck className="w-4 h-4 text-indigo-600"/>
          <span className="text-[10px] font-bold tracking-wider uppercase text-indigo-950" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>Momentum Shield • Vault Security</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-teal-600">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
          Hardware Encrypted
        </div>
      </div>

      {/* 2. MODE SWITCHER TABS */}
      <div className="block mx-5 mb-4 p-1.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        <div className="w-full flex items-center gap-2">
          <button className="flex-1 py-2.5 px-3 rounded-xl bg-white text-xs font-semibold text-indigo-700 shadow-xs flex items-center justify-center gap-1.5 transition-all whitespace-nowrap" type="button">
            <RotateCcw className="w-3.5 h-3.5 text-indigo-600"/>
            Change Existing PIN
          </button>
          <button className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-white/50 flex items-center justify-center gap-1.5 transition-all whitespace-nowrap" type="button">
            <KeyRound className="w-3.5 h-3.5 text-slate-500"/>
            Create New PIN
          </button>
        </div>
      </div>

      {/* 3. ZERO-KNOWLEDGE VAULT INFO CARD */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl flex items-start gap-3.5 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 shadow-2xs">
          <Shield className="w-5 h-5"/>
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 leading-snug">Zero-Knowledge Vault</h3>
          <p className="text-xs font-normal text-slate-500 mt-1 leading-relaxed">Your 4-digit PIN secures your personal reflections, financial transactions, and sacred journals via on-device Secure Enclave.</p>
        </div>
      </div>

      {/* 4. PIN SEQUENCE CONTAINER */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">PIN Sequence</h3>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 border border-teal-200/70 text-teal-700">
            <CheckCircle2 className="w-3 h-3 text-teal-600"/>
            Validation Active
          </span>
        </div>
        
        {/* Row 1 (Enter Current PIN) */}
        <div className="p-3.5 rounded-2xl flex items-center justify-between bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600"/>
              <h4 className="text-xs font-bold text-slate-900">1. Enter Current PIN</h4>
            </div>
            <span className="text-[11px] font-medium text-teal-600 block pl-6 mt-0.5">Identity authenticated</span>
          </div>
          <div className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100/80 border border-slate-200/60 shadow-xs">
            <input 
              aria-label="Enter Current PIN" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
              defaultValue="••••" 
              inputMode="numeric" 
              maxLength={4} 
              pattern="[0-9]*" 
              type="text"
            />
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
          </div>
        </div>

        {/* Row 2 (New 4-Digit PIN) */}
        <div className="p-3.5 rounded-2xl flex items-center justify-between bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600"/>
              <h4 className="text-xs font-bold text-slate-900">2. New 4-Digit PIN</h4>
            </div>
            <span className="text-[11px] font-medium text-teal-600 block pl-6 mt-0.5">High entropy matched</span>
          </div>
          <div className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100/80 border border-slate-200/60 shadow-xs">
            <input 
              aria-label="New 4-Digit PIN" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
              defaultValue="••••" 
              inputMode="numeric" 
              maxLength={4} 
              pattern="[0-9]*" 
              type="text"
            />
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
          </div>
        </div>

        {/* Row 3 (Confirm New PIN) */}
        <div className="p-3.5 rounded-2xl flex items-center justify-between bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">3</div>
              <h4 className="text-xs font-bold text-indigo-900">3. Confirm New PIN</h4>
            </div>
            <span className="text-[11px] font-medium text-indigo-600 block pl-6 mt-0.5">Awaiting last digit slot</span>
          </div>
          <div className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-50 border border-indigo-200/80 shadow-xs">
            <input 
              aria-label="Confirm New PIN" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
              defaultValue="123" 
              inputMode="numeric" 
              maxLength={4} 
              pattern="[0-9]*" 
              type="text"
            />
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-200"></span>
          </div>
        </div>

        {/* Validation Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5"/>PIN Matched
          </span>
          <span className="px-3 py-1 rounded-xl text-xs font-medium bg-slate-50 text-slate-600 border border-slate-200/80 flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-slate-400"/>Non-sequential rule OK
          </span>
        </div>

        {/* Hint */}
        <div className="flex items-center gap-2 text-slate-500 text-[11px] pt-1">
          <HelpCircle className="w-3.5 h-3.5 text-violet-500 flex-shrink-0"/>
          <p>Avoid obvious codes such as <strong className="text-slate-700">1234</strong>, <strong className="text-slate-700">0000</strong>, or your birth year.</p>
        </div>
      </div>

      {/* 5. SHIELD GUARDRAILS CARD */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-3 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Shield Guardrails</h3>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-900">Require PIN on App Switch</div>
            <div className="text-xs font-medium text-slate-500">Immediate background lock</div>
          </div>
          <button className="w-12 h-7 rounded-full bg-indigo-600 p-0.5 flex items-center justify-end transition-colors shadow-sm focus:outline-none">
            <span className="w-6 h-6 rounded-full bg-white shadow-md"></span>
          </button>
        </div>
        
        <div className="flex items-center justify-between pt-1">
          <div>
            <div className="text-sm font-semibold text-slate-900">Failed Attempts Protection</div>
            <div className="text-xs font-medium text-slate-500">15 min lockout after 5 fails</div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-teal-50 border border-teal-200/70 text-teal-700">
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
