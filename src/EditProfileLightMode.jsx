import React from 'react';

import { ArrowLeft, Pencil, Trash2, UserCheck, User, Mail, CheckCircle2, Globe, Sun, Cloud, ArrowRight } from 'lucide-react';

export default function EditProfileLightMode({ setActiveTab }) {
  return (
    <>
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
            <User className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-slate-900 tracking-tight">
            Edit Profile
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setActiveTab && setActiveTab('home_dashboard_light_mode')} className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"><ArrowLeft className="w-5 h-5"/></button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            A
          </div>
        </div>
      </div>

      <main className="flex-1 flex flex-col w-full pb-[120px] px-5 bg-transparent relative z-10">
        {/* Glow Effects */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[120vw] h-[55vh] rounded-full bg-indigo-100/40 blur-3xl"></div>
        </div>
        
        {/* AVATAR SECTION */}
        <section className="mb-6 relative z-10">
          <div className="relative w-24 h-24 mx-auto rounded-full ring-4 ring-indigo-100 shadow-md overflow-hidden">
            <img src="/path-to-avatar.jpg" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="flex items-center justify-center gap-3 mt-3">
            <button className="px-4 py-2 rounded-xl bg-indigo-50 border border-indigo-200/80 text-indigo-700 font-semibold text-xs hover:bg-indigo-100 transition-all flex items-center gap-1.5 shadow-sm">
              <Pencil className="w-3.5 h-3.5 text-indigo-600"/>
              Change Photo
            </button>
            <button className="btn-danger">
              <Trash2 className="w-3.5 h-3.5 text-rose-500"/>
              Remove
            </button>
          </div>
          <p className="text-[11px] text-slate-500 text-center mt-2 font-medium">PNG, JPG or WEBP · Max 5MB</p>
        </section>

        {/* IDENTITY & ACCOUNT CARD */}
        <div className="rounded-3xl p-5 mb-5 space-y-4 relative z-10 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-indigo-600" />
              <h2 className="text-sm font-bold text-slate-900">Identity & Account</h2>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 border border-indigo-200/80 text-indigo-700">Standard</span>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500">Full Name</label>
            <div className="flex items-center gap-3 p-3.5 rounded-2xl text-slate-900 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
              <User className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <input type="text" defaultValue="Aisha Rahmani" className="bg-transparent text-sm font-medium text-slate-900 w-full focus:outline-none" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-500">Email Address</label>
              <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />Verified</span>
            </div>
            <div className="flex items-center justify-between gap-2 p-3.5 rounded-2xl text-slate-900 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span className="text-sm font-medium text-slate-900 truncate">aisha.rahmani@example.com</span>
              </div>
              <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex-shrink-0">Change</button>
            </div>
          </div>
        </div>

        {/* REGIONAL SETTINGS CARD */}
        <div className="rounded-3xl p-5 mb-5 space-y-4 relative z-10 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-600" />
              <h2 className="text-sm font-bold text-slate-900">Regional Settings</h2>
            </div>
            <span className="text-xs font-medium text-slate-500">Locale & Sync</span>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500">Primary Currency</label>
            <div className="rounded-2xl p-3.5 flex items-center justify-between text-slate-900 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
              <select className="bg-transparent text-sm font-medium text-slate-900 w-full focus:outline-none appearance-none">
                <option className="bg-white text-slate-900">AFN / ؋ (Afghan Afghani)</option>
              </select>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 pl-1">All financial logs, expense budgets, and cash flows default to this currency.</p>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500">Timezone</label>
            <div className="rounded-2xl p-3.5 flex items-center justify-between text-slate-900 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
              <select className="bg-transparent text-sm font-medium text-slate-900 w-full focus:outline-none appearance-none">
                <option className="bg-white text-slate-900">Asia/Kabul (UTC+4:30)</option>
              </select>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1 pl-1">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              Local Solar Noon Offset: +12m 40s
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500">City & Country</label>
            <div className="rounded-2xl p-3.5 space-y-2 text-slate-900 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
              <input type="text" defaultValue="Kabul, Afghanistan" className="bg-transparent text-sm font-medium text-slate-900 w-full focus:outline-none" />
              <div className="flex items-start gap-2 pt-2 border-t border-slate-200/80">
                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold text-indigo-600">Geocoded for Prayer Calculations</span>
                  <span className="text-[10px] text-slate-500">Lat 34.5553° N, Long 69.2075° E (Elevation 1,791m)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SPIRITUAL ROUTINE CONTEXT CARD */}
        <div className="rounded-3xl p-5 mb-5 space-y-4 relative z-10 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-indigo-600" />
              <h2 className="text-sm font-bold text-slate-900">Spiritual Routine Context</h2>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 border border-indigo-200/80 text-indigo-700">Momentum</span>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500">Calculation Convention</label>
            <div className="rounded-2xl p-3.5 flex items-center justify-between cursor-pointer text-slate-900 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-900">Univ. of Islamic Sciences, Karachi</span>
                <span className="text-[11px] text-slate-500">Fajr: 18.0°, Isha: 18.0° (Hanafi Asr ratio: 2x shadow)</span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500">Calendar Synchronization</label>
            <div className="rounded-2xl p-3.5 flex items-center justify-between text-slate-900 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-900">Hijri Shamsi (Solar Calendar)</span>
                <span className="text-[11px] text-slate-500">Afghan national astronomical solar reckoning</span>
              </div>
              <button aria-checked="true" className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full bg-indigo-600 transition-colors" role="switch">
                <span className="translate-x-6 inline-block h-5 w-5 transform rounded-full bg-white shadow-sm mt-0.5 ml-0.5"></span>
              </button>
            </div>
          </div>
        </div>

        {/* ENCRYPTED CLOUD SYNC STRIP */}
        <div className="rounded-2xl p-4 mb-6 flex items-center justify-between relative z-10 text-slate-700 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
          <div className="flex items-center gap-3">
            <Cloud className="w-5 h-5 text-indigo-600"/>
            <span className="text-xs font-bold text-slate-900">Cloud Sync Encrypted</span>
          </div>
          <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Sync Now</button>
        </div>

        {/* BOTTOM ACTION BUTTONS */}
        <div className="space-y-2 relative z-10">
          <button className="btn-primary w-full">
            Save Changes <ArrowRight className="w-4 h-4" />
          </button>
          <button className="w-full py-2.5 text-center text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors mt-2">
            Discard Changes
          </button>
        </div>

      </main>
    </>
  );
}
