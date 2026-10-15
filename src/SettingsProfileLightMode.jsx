import React from 'react';
import { 
  SlidersHorizontal, Bell, Camera, CheckCircle2, Wallet, Clock, UserCheck, ChevronRight, Sun, Moon, ShieldCheck, Fingerprint, Lock, Cloud, Database, Save, RotateCcw, ArrowLeft 
} from 'lucide-react';


export default function SettingsProfileLightMode({ setActiveTab }) {
  return (
    <div className="min-h-screen bg-slate-50 pb-28">
      {/* TOP HEADER BAR */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
            <SlidersHorizontal className="w-5 h-5 text-white"/>
          </div>
          <h1 className="text-base font-bold text-slate-900 tracking-tight">Settings & Profile</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors">
            <Bell className="w-5 h-5"/>
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            A
          </div>
        </div>
      </div>

      {/* PROFILE HERO CARD */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl text-center space-y-3 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        <div className="relative w-20 h-20 mx-auto">
          <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-indigo-50 shadow-sm bg-indigo-100 flex items-center justify-center text-indigo-500 font-bold text-xl">
            <img src="/avatar.jpg" alt="Aisha" className="w-full h-full object-cover" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }} />
            <span className="hidden">A</span>
          </div>
          <button className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xs ring-2 ring-white hover:bg-indigo-700 transition-colors">
            <Camera className="w-3 h-3"/>
          </button>
        </div>

        <div>
          <div className="flex items-center justify-center gap-1.5">
            <h2 className="text-lg font-bold text-slate-900">Aisha Rahmani</h2>
            <CheckCircle2 className="w-4 h-4 text-indigo-600 fill-indigo-100"/>
          </div>
          <p className="text-xs font-normal text-slate-500 mt-0.5">
            Living intentionally • Kabul, Afghanistan
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 pt-1">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-indigo-50 border border-indigo-200/70 text-indigo-700">
            <Wallet className="w-3 h-3 text-indigo-600"/>
            AFN (؋)
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-50 border border-slate-200/80 text-slate-600">
            <Clock className="w-3 h-3 text-slate-400"/>
            Asia/Kabul (UTC+4:30)
          </span>
        </div>

        <button className="w-full py-2.5 px-4 rounded-2xl bg-indigo-50/60 hover:bg-indigo-50 border border-indigo-150 text-indigo-700 text-xs font-semibold flex items-center justify-between transition-colors shadow-2xs mt-2">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-indigo-600"/>
            <span>Account & Personal Credentials</span>
          </div>
          <span className="flex items-center gap-1 text-[11px] font-medium text-indigo-600">
            Details <ChevronRight className="w-3.5 h-3.5"/>
          </span>
        </button>
      </div>

      {/* REGIONAL PREFERENCES CARD */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-3 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Regional Preferences</h3>
          <span className="text-xs font-semibold text-teal-600">Sync Active</span>
        </div>
        
        <div className="flex flex-col gap-1">
          <button className="w-full p-3 rounded-2xl hover:bg-slate-50/80 border border-transparent hover:border-slate-100 flex items-center justify-between transition-colors group">
            <div className="text-left">
              <p className="text-xs font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">Legal Name</p>
              <p className="text-[11px] font-normal text-slate-500">Aisha Rahmani</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors"/>
          </button>

          <button className="w-full p-3 rounded-2xl hover:bg-slate-50/80 border border-transparent hover:border-slate-100 flex items-center justify-between transition-colors group">
            <div className="text-left">
              <p className="text-xs font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">Base Currency</p>
              <p className="text-[11px] font-normal text-slate-500">Afghan Afghani (AFN)</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors"/>
          </button>

          <button className="w-full p-3 rounded-2xl hover:bg-slate-50/80 border border-transparent hover:border-slate-100 flex items-center justify-between transition-colors group">
            <div className="text-left">
              <p className="text-xs font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">Timezone Calculation</p>
              <p className="text-[11px] font-normal text-slate-500">Asia/Kabul (UTC+4:30)</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors"/>
          </button>

          <button className="w-full p-3 rounded-2xl hover:bg-slate-50/80 border border-transparent hover:border-slate-100 flex items-center justify-between transition-colors group">
            <div className="text-left">
              <p className="text-xs font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">Location & City</p>
              <p className="text-[11px] font-normal text-slate-500">Kabul, Afghanistan</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors"/>
          </button>
        </div>
      </div>

      {/* ATMOSPHERE & VISUALS CARD */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-3.5 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Atmosphere & Visuals</h3>
          <span className="text-xs font-semibold text-violet-600">Serenity v2</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-slate-900">Theme Mode</h4>
            <p className="text-[11px] text-slate-500">Luminous Serenity</p>
          </div>
          <div className="p-1 rounded-2xl bg-slate-100 border border-slate-200/80 flex items-center gap-1">
            <button className="py-1 px-3 rounded-xl bg-white text-xs font-semibold text-indigo-700 shadow-xs flex items-center gap-1 transition-colors">
              <Sun className="w-3.5 h-3.5 text-amber-500"/>Light
            </button>
            <button className="py-1 px-3 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors">
              <Moon className="w-3.5 h-3.5 text-slate-400"/>Dark
            </button>
          </div>
        </div>

        <div className="p-3 rounded-2xl border border-slate-200/70 bg-gradient-to-tr from-slate-50 to-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-50 border border-indigo-100 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500/40"></div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">Serene Horizon</p>
              <p className="text-[10px] font-normal text-slate-500">Pair 04</p>
            </div>
          </div>
          <button className="text-[11px] font-semibold text-indigo-600 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition-colors">
            Customize
          </button>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div>
            <h4 className="text-xs font-bold text-slate-900">Text & Spatial Scale</h4>
            <p className="text-[11px] text-slate-500">Balanced Density</p>
          </div>
          <button className="px-3 py-1.5 rounded-xl border border-slate-200/80 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1">
            Standard <ChevronRight className="w-3 h-3"/>
          </button>
        </div>
      </div>

      {/* SECURITY & SANCTUARY CARD */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-3 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Security & Sanctuary</h3>
          <span className="text-xs font-semibold text-teal-600 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>Protected
          </span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4"/>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">App Lock Safeguard</p>
              <p className="text-[11px] font-normal text-slate-500">Require unlock on open</p>
            </div>
          </div>
          <div className="w-11 h-6 rounded-full bg-teal-500 p-0.5 flex items-center justify-end transition-colors cursor-pointer shadow-inner">
            <div className="w-5 h-5 rounded-full bg-white shadow-sm"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100/80 transition-colors flex flex-col items-center text-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Lock className="w-4 h-4"/>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">4-Digit PIN</p>
              <p className="text-[10px] font-normal text-slate-500 mt-0.5">Change Code</p>
            </div>
          </button>
          
          <button className="p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100/80 transition-colors flex flex-col items-center text-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Fingerprint className="w-4 h-4"/>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">Biometrics</p>
              <p className="text-[10px] font-normal text-slate-500 mt-0.5">Face/Touch ID</p>
            </div>
          </button>
        </div>
      </div>

      {/* MINDFUL NOTIFICATIONS CARD */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-3.5 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mindful Notifications</h3>
          <span className="text-xs font-semibold text-indigo-600">All Active</span>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-900">Prayer Timings (Salah)</p>
              <p className="text-[11px] font-normal text-slate-500">5 Daily Adhan alerts</p>
            </div>
            <div className="w-11 h-6 rounded-full bg-indigo-500 p-0.5 flex items-center justify-end transition-colors cursor-pointer shadow-inner">
              <div className="w-5 h-5 rounded-full bg-white shadow-sm"></div>
            </div>
          </div>
          <div className="h-px bg-black/5 w-full"></div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-900">Daily Agenda Briefing</p>
              <p className="text-[11px] font-normal text-slate-500">Morning summary at 07:30</p>
            </div>
            <div className="w-11 h-6 rounded-full bg-indigo-500 p-0.5 flex items-center justify-end transition-colors cursor-pointer shadow-inner">
              <div className="w-5 h-5 rounded-full bg-white shadow-sm"></div>
            </div>
          </div>
          <div className="h-px bg-black/5 w-full"></div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-900">Spiritual Reflections</p>
              <p className="text-[11px] font-normal text-slate-500">Fajr & Evening Murāqabah</p>
            </div>
            <div className="w-11 h-6 rounded-full bg-indigo-500 p-0.5 flex items-center justify-end transition-colors cursor-pointer shadow-inner">
              <div className="w-5 h-5 rounded-full bg-white shadow-sm"></div>
            </div>
          </div>
          <div className="h-px bg-black/5 w-full"></div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-900">Daily Radiance & Wisdom</p>
              <p className="text-[11px] font-normal text-slate-500">08:00 AM uplifting quote</p>
            </div>
            <div className="w-11 h-6 rounded-full bg-indigo-500 p-0.5 flex items-center justify-end transition-colors cursor-pointer shadow-inner">
              <div className="w-5 h-5 rounded-full bg-white shadow-sm"></div>
            </div>
          </div>
        </div>
      </div>

      {/* DATA & RESILIENCE CARD */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-3 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Data & Resilience</h3>
          <span className="text-xs font-medium text-slate-400">Cloud Active</span>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between p-3 rounded-2xl transition-colors bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Cloud className="w-4 h-4"/>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900">Zero-Knowledge Cloud Sync</p>
                <p className="text-[11px] font-normal text-slate-500">Last synchronized 2m ago</p>
              </div>
            </div>
            <button className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors text-[11px] font-semibold text-indigo-700 flex items-center gap-1">
              <RotateCcw className="w-3 h-3"/>
              Sync
            </button>
          </div>

          <button className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50/80 transition-colors text-left group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                <Save className="w-4 h-4"/>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900">Encrypted Local Archive</p>
                <p className="text-[11px] font-normal text-slate-500">Snapshot export to storage</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors"/>
          </button>

          <div className="h-px bg-black/5 w-full my-1"></div>

          <button className="btn-danger w-full">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                <Database className="w-4 h-4"/>
              </div>
              <div>
                <p className="text-xs font-semibold text-red-600">Clear Local Database</p>
                <p className="text-[11px] font-normal text-red-500/80">Erase cached logs and temporary files</p>
              </div>
            </div>
            <span className="px-3 py-1.5 rounded-xl bg-red-100 text-red-600 text-[11px] font-semibold group-hover:bg-red-200 transition-colors">
              Reset
            </span>
          </button>
        </div>
      </div>

      {/* ABOUT MOMENTUM & UPDATED VERSION CARD */}
      <div className="block mx-5 mb-28 p-6 rounded-3xl text-center space-y-3 relative overflow-hidden bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        <img 
          src="/logo.png" 
          alt="Momentum Logo" 
          className="w-14 h-14 object-cover rounded-2xl aspect-square flex-shrink-0 mx-auto shadow-md shadow-indigo-600/30" 
        />
        <div>
          <h4 className="text-base font-bold text-slate-900">Momentum</h4>
          <p className="text-xs font-semibold text-indigo-600 mt-0.5">
            Version 1.0 • Build 2026.10
          </p>
        </div>
        <p className="text-xs font-normal text-slate-500 max-w-xs mx-auto leading-relaxed">
          Harmonizing civil commitments, spiritual equilibrium, and natural seasonal rhythms into a single intentional flow.
        </p>
        
        <div className="flex items-center justify-center gap-3 text-xs font-semibold text-indigo-600 pt-1">
          <button className="hover:underline">Privacy Sanctuary</button>
          <span>•</span>
          <button className="hover:underline">Terms of Grace</button>
          <span>•</span>
          <button className="hover:underline">Credits</button>
        </div>
        
        <p className="text-[10px] font-normal text-slate-400">
          Crafted with peace for intentional minds everywhere.
        </p>
      </div>

    </div>
  );
}
