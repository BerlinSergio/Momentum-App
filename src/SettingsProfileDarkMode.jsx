import React from 'react';
import { 
  SlidersHorizontal, Bell, Camera, CheckCircle2, Wallet, Clock, UserCheck, ChevronRight, Sun, Moon, ShieldCheck, Fingerprint, Lock, Cloud, Database, Save, RotateCcw, ArrowLeft 
} from 'lucide-react';


export default function SettingsProfileDarkMode({ setActiveTab }) {
  return (
    <div className="min-h-screen bg-slate-950 pb-28">
      {/* TOP HEADER BAR */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
            <SlidersHorizontal className="w-5 h-5 text-white"/>
          </div>
          <h1 className="text-base font-bold text-white tracking-tight">Settings & Profile</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full text-slate-300 hover:bg-slate-800 transition-colors">
            <Bell className="w-5 h-5"/>
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            A
          </div>
        </div>
      </div>

      {/* PROFILE HERO CARD */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl text-center space-y-3 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
        <div className="relative w-20 h-20 mx-auto">
          <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-slate-800 shadow-sm bg-slate-800 flex items-center justify-center text-slate-500 font-bold text-xl">
            <img src="/avatar.jpg" alt="Aisha" className="w-full h-full object-cover" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }} />
            <span className="hidden">A</span>
          </div>
          <button className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xs ring-2 ring-slate-900 hover:bg-indigo-700 transition-colors">
            <Camera className="w-3 h-3"/>
          </button>
        </div>

        <div>
          <div className="flex items-center justify-center gap-1.5">
            <h2 className="text-lg font-bold text-white">Aisha Rahmani</h2>
            <CheckCircle2 className="w-4 h-4 text-indigo-400 fill-indigo-900"/>
          </div>
          <p className="text-xs font-normal text-slate-400 mt-0.5">
            Living intentionally • Kabul, Afghanistan
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 pt-1">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-800 border border-slate-700 text-slate-200">
            <Wallet className="w-3 h-3 text-indigo-400"/>
            AFN (؋)
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-800 border border-slate-700 text-slate-200">
            <Clock className="w-3 h-3 text-slate-400"/>
            Asia/Kabul (UTC+4:30)
          </span>
        </div>

        <button className="w-full py-2.5 px-4 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700 text-indigo-300 text-xs font-semibold flex items-center justify-between transition-colors shadow-2xs mt-2">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-indigo-400"/>
            <span>Account & Personal Credentials</span>
          </div>
          <span className="flex items-center gap-1 text-[11px] font-medium text-indigo-400">
            Details <ChevronRight className="w-3.5 h-3.5"/>
          </span>
        </button>
      </div>

      {/* REGIONAL PREFERENCES CARD */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-3 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Regional Preferences</h3>
          <span className="text-xs font-semibold text-teal-400">Sync Active</span>
        </div>
        
        <div className="flex flex-col gap-1">
          <button className="w-full p-3 rounded-2xl hover:bg-slate-800/60 border border-transparent hover:border-slate-700 flex items-center justify-between transition-colors group">
            <div className="text-left">
              <p className="text-xs font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">Legal Name</p>
              <p className="text-[11px] font-normal text-slate-400">Aisha Rahmani</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors"/>
          </button>

          <button className="w-full p-3 rounded-2xl hover:bg-slate-800/60 border border-transparent hover:border-slate-700 flex items-center justify-between transition-colors group">
            <div className="text-left">
              <p className="text-xs font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">Base Currency</p>
              <p className="text-[11px] font-normal text-slate-400">Afghan Afghani (AFN)</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors"/>
          </button>

          <button className="w-full p-3 rounded-2xl hover:bg-slate-800/60 border border-transparent hover:border-slate-700 flex items-center justify-between transition-colors group">
            <div className="text-left">
              <p className="text-xs font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">Timezone Calculation</p>
              <p className="text-[11px] font-normal text-slate-400">Asia/Kabul (UTC+4:30)</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors"/>
          </button>

          <button className="w-full p-3 rounded-2xl hover:bg-slate-800/60 border border-transparent hover:border-slate-700 flex items-center justify-between transition-colors group">
            <div className="text-left">
              <p className="text-xs font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">Location & City</p>
              <p className="text-[11px] font-normal text-slate-400">Kabul, Afghanistan</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors"/>
          </button>
        </div>
      </div>

      {/* ATMOSPHERE & VISUALS CARD */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-3.5 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Atmosphere & Visuals</h3>
          <span className="text-xs font-semibold text-violet-400">Serenity v2</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-slate-200">Theme Mode</h4>
            <p className="text-[11px] text-slate-400">Luminous Serenity</p>
          </div>
          <div className="p-1 rounded-2xl bg-slate-800 border border-slate-700/80 flex items-center gap-1">
            <button className="py-1 px-3 rounded-xl bg-transparent text-slate-400 hover:text-slate-300 text-xs font-semibold flex items-center gap-1 transition-colors">
              <Sun className="w-3.5 h-3.5"/>Light
            </button>
            <button className="py-1 px-3 rounded-xl bg-slate-700 text-xs font-semibold text-indigo-400 shadow-xs flex items-center gap-1 transition-colors">
              <Moon className="w-3.5 h-3.5 text-indigo-400"/>Dark
            </button>
          </div>
        </div>

        <div className="p-3 rounded-2xl border border-slate-700/70 bg-gradient-to-tr from-slate-800 to-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-900/40 to-indigo-800/40 border border-indigo-500/20 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500/40"></div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-200">Serene Horizon</p>
              <p className="text-[10px] font-normal text-slate-400">Pair 04</p>
            </div>
          </div>
          <button className="text-[11px] font-semibold text-indigo-300 px-3 py-1.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 transition-colors">
            Customize
          </button>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div>
            <h4 className="text-xs font-bold text-slate-200">Text & Spatial Scale</h4>
            <p className="text-[11px] text-slate-400">Balanced Density</p>
          </div>
          <button className="px-3 py-1.5 rounded-xl border border-slate-700 text-[11px] font-semibold text-slate-300 hover:bg-slate-800 transition-colors flex items-center gap-1">
            Standard <ChevronRight className="w-3 h-3"/>
          </button>
        </div>
      </div>

      {/* SECURITY & SANCTUARY CARD */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-3 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Security & Sanctuary</h3>
          <span className="text-xs font-semibold text-teal-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>Protected
          </span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-teal-900/40 text-teal-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4"/>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-200">App Lock Safeguard</p>
              <p className="text-[11px] font-normal text-slate-400">Require unlock on open</p>
            </div>
          </div>
          <div className="w-11 h-6 rounded-full bg-teal-500 p-0.5 flex items-center justify-end transition-colors cursor-pointer shadow-inner">
            <div className="w-5 h-5 rounded-full bg-white shadow-sm"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="p-3 rounded-2xl bg-slate-800/70 border border-slate-700 hover:bg-slate-800 transition-colors flex flex-col items-center text-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Lock className="w-4 h-4"/>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-200">4-Digit PIN</p>
              <p className="text-[10px] font-normal text-slate-400 mt-0.5">Change Code</p>
            </div>
          </button>
          
          <button className="p-3 rounded-2xl bg-slate-800/70 border border-slate-700 hover:bg-slate-800 transition-colors flex flex-col items-center text-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Fingerprint className="w-4 h-4"/>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-200">Biometrics</p>
              <p className="text-[10px] font-normal text-slate-400 mt-0.5">Face/Touch ID</p>
            </div>
          </button>
        </div>
      </div>

      {/* MINDFUL NOTIFICATIONS CARD */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-3.5 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mindful Notifications</h3>
          <span className="text-xs font-semibold text-indigo-400">All Active</span>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-200">Prayer Timings (Salah)</p>
              <p className="text-[11px] font-normal text-slate-400">5 Daily Adhan alerts</p>
            </div>
            <div className="w-11 h-6 rounded-full bg-indigo-500 p-0.5 flex items-center justify-end transition-colors cursor-pointer shadow-inner">
              <div className="w-5 h-5 rounded-full bg-white shadow-sm"></div>
            </div>
          </div>
          <div className="h-px bg-white/10 w-full"></div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-200">Daily Agenda Briefing</p>
              <p className="text-[11px] font-normal text-slate-400">Morning summary at 07:30</p>
            </div>
            <div className="w-11 h-6 rounded-full bg-indigo-500 p-0.5 flex items-center justify-end transition-colors cursor-pointer shadow-inner">
              <div className="w-5 h-5 rounded-full bg-white shadow-sm"></div>
            </div>
          </div>
          <div className="h-px bg-white/10 w-full"></div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-200">Spiritual Reflections</p>
              <p className="text-[11px] font-normal text-slate-400">Fajr & Evening Murāqabah</p>
            </div>
            <div className="w-11 h-6 rounded-full bg-indigo-500 p-0.5 flex items-center justify-end transition-colors cursor-pointer shadow-inner">
              <div className="w-5 h-5 rounded-full bg-white shadow-sm"></div>
            </div>
          </div>
          <div className="h-px bg-white/10 w-full"></div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-200">Daily Radiance & Wisdom</p>
              <p className="text-[11px] font-normal text-slate-400">08:00 AM uplifting quote</p>
            </div>
            <div className="w-11 h-6 rounded-full bg-indigo-500 p-0.5 flex items-center justify-end transition-colors cursor-pointer shadow-inner">
              <div className="w-5 h-5 rounded-full bg-white shadow-sm"></div>
            </div>
          </div>
        </div>
      </div>

      {/* DATA & RESILIENCE CARD */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-3 bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Data & Resilience</h3>
          <span className="text-xs font-medium text-slate-400">Cloud Active</span>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between p-3 rounded-2xl transition-colors bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Cloud className="w-4 h-4"/>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-200">Zero-Knowledge Cloud Sync</p>
                <p className="text-[11px] font-normal text-slate-400">Last synchronized 2m ago</p>
              </div>
            </div>
            <button className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors text-[11px] font-semibold text-indigo-400 flex items-center gap-1">
              <RotateCcw className="w-3 h-3"/>
              Sync
            </button>
          </div>

          <button className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-slate-800/60 transition-colors text-left group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center group-hover:bg-slate-600 transition-colors">
                <Save className="w-4 h-4"/>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-200">Encrypted Local Archive</p>
                <p className="text-[11px] font-normal text-slate-400">Snapshot export to storage</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-400 transition-colors"/>
          </button>

          <div className="h-px bg-white/10 w-full my-1"></div>

          <div className="flex flex-row items-center justify-between w-full p-3 rounded-2xl transition-colors bg-rose-500/90 hover:bg-rose-600 text-white shadow-md shadow-rose-500/20 border border-rose-400/30 backdrop-blur-sm group">
            <div className="flex flex-row items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0">
                <Database className="w-4 h-4"/>
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-white">Clear Local Database</p>
                <p className="text-[11px] font-normal text-rose-100">Erase cached logs and temporary files</p>
              </div>
            </div>
            <button className="px-3 py-1.5 rounded-xl bg-white hover:bg-rose-50 text-rose-600 text-[11px] font-semibold transition-colors shadow-sm shrink-0">
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* ABOUT MOMENTUM & UPDATED VERSION CARD */}
      <div className="block mx-5 mb-28 p-6 rounded-3xl text-center space-y-3 relative overflow-hidden bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
        <img 
          src="/logo.png" 
          alt="Momentum Logo" 
          className="w-14 h-14 object-cover rounded-2xl aspect-square flex-shrink-0 mx-auto shadow-md shadow-indigo-600/20" 
        />
        <div>
          <h4 className="text-base font-bold text-slate-200">Momentum</h4>
          <p className="text-xs font-semibold text-indigo-400 mt-0.5">
            Version 1.0 • Build 2026.10
          </p>
        </div>
        <p className="text-xs font-normal text-slate-400 max-w-xs mx-auto leading-relaxed">
          Harmonizing civil commitments, spiritual equilibrium, and natural seasonal rhythms into a single intentional flow.
        </p>
        
        <div className="flex items-center justify-center gap-3 text-xs font-semibold text-indigo-400 pt-1">
          <button className="hover:underline">Privacy Sanctuary</button>
          <span>•</span>
          <button className="hover:underline">Terms of Grace</button>
          <span>•</span>
          <button className="hover:underline">Credits</button>
        </div>
        
        <p className="text-[10px] font-normal text-slate-500">
          Crafted with peace for intentional minds everywhere.
        </p>
      </div>

    </div>
  );
}
