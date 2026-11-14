import React from 'react';
import UserAvatar from './components/UserAvatar';
import { useSecurityStore } from './store/useSecurityStore';

import { Fingerprint, ArrowLeft } from 'lucide-react';

export default function BiometricSettingsLightMode({ setActiveTab, goBack }) {
  const { isAppLockActive, lockReflections, biometricsEnabled, pin, setAppLockActive, setLockReflections, setBiometricsEnabled, updatePreferences } = useSecurityStore();
  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden"><div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[120vw] h-[55vh] rounded-full bg-gradient-to-b from-surface-variant/40 via-surface-container/20 to-transparent blur-3xl"></div><div className="absolute top-[40%] right-[-10%] w-[80vw] h-[40vh] rounded-full bg-gradient-to-tr from-secondary-fixed/20 via-tertiary-fixed/10 to-transparent blur-3xl"></div></div>{/* Top Header Bar */}
      <div className="sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30">
            <Fingerprint className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-slate-900 tracking-tight" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>
            Biometric Settings
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => (goBack ? goBack('settings_profile_light_mode') : (setActiveTab ? setActiveTab('settings_profile_light_mode') : window.history.back()))} className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"><ArrowLeft className="w-5 h-5"/></button>
          <UserAvatar 
            setActiveTab={setActiveTab} 
          />
        </div>
      </div><main className="flex flex-col relative w-full pb-safe px-margin z-10 flex-1"><div className="flex flex-col w-full pb-28 space-y-4">
{/*  Hero Hardware Badge  */}
<div className="relative overflow-hidden rounded-3xl p-5 mb-5 space-y-4 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
<div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-gradient-to-br from-primary-fixed via-tertiary-fixed/30 to-transparent blur-2xl pointer-events-none"></div>
<div className="relative z-10 flex flex-col items-center text-center">
{/*  Dual Biometric Iconic Glyph with Ambient Glow  */}
<div className="w-16 h-16 rounded-full bg-white/90 border border-primary/20 flex items-center justify-center gap-2 shadow-lg shadow-primary/25 ring-4 ring-primary/10 mx-auto mb-3">
<span className="material-symbols-outlined text-[20px] text-primary">face</span>
<span className="material-symbols-outlined text-[20px] text-teal-600">fingerprint</span>
</div>
{/*  Status Pill  */}
<div className={`inline-flex items-center px-space-md py-1 mb-space-sm rounded-full ${biometricsEnabled ? 'bg-tertiary-fixed/40 text-on-tertiary-fixed-variant' : 'bg-slate-200 text-slate-600'}`}>
<span className="material-symbols-outlined text-[14px] mr-1 text-tertiary" style={{fontVariationSettings: '"FILL" 1'}}>{biometricsEnabled ? 'verified_user' : 'pause_circle'}</span>
<span className="font-label-sm text-label-sm font-semibold tracking-wide uppercase">{biometricsEnabled ? 'Hardware Enclave Bound' : 'Hardware Enclave Paused'}</span>
</div>
{/*  Title & Body  */}
<h2 className="font-headline-md text-headline-md text-on-surface mb-1">{biometricsEnabled ? 'Biometric Sanctuary Active' : 'Biometric Sanctuary Paused'}</h2>
<p className="text-on-surface-variant text-xs leading-relaxed max-w-xs mx-auto">
        {biometricsEnabled ? 'Unlock Momentum instantly using Face ID or Touch ID sensor on this device.' : 'Biometric unlock is currently disabled. Momentum will require your PIN.'}
      </p>
</div>
</div>
{/*  Master Switch Card  */}
<div className="rounded-3xl p-5 mb-5 space-y-4 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
<div className="flex items-center justify-between gap-space-md">
<div className="flex flex-col min-w-0 pr-2">
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">Enable Biometric Authentication</span>
<span className="font-label-sm text-label-sm text-primary font-medium mt-0.5">Apple Face ID / Android Biometric API v3.2 Enrolled</span>
</div>
{/*  Interactive Toggle  */}
<button onClick={() => setBiometricsEnabled(!biometricsEnabled)} aria-checked={biometricsEnabled} className={`relative inline-flex h-8 w-14 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${biometricsEnabled ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-slate-300'}`} id="master-toggle" role="switch">
<span className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out mt-0.5 ml-0.5 ${biometricsEnabled ? 'translate-x-6' : 'translate-x-0'}`} id="master-thumb"></span>
</button>
</div>
<div className="mt-space-md pt-space-sm flex items-center gap-2 text-on-surface-variant">
<span className="material-symbols-outlined text-[16px] text-tertiary">{biometricsEnabled ? 'check_circle' : 'pause_circle'}</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">{biometricsEnabled ? 'Secure hardware keypair authenticated and active' : 'Biometric authentication currently switched off'}</span>
</div>
</div>
{/*  Fallback to PIN Configuration  */}
<div className="rounded-3xl p-5 mb-5 space-y-4 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
<div className="flex items-center justify-between">
<div className="flex items-center space-x-2">
<span className="material-symbols-outlined text-[20px] text-primary">pin</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Fallback Mechanism</h3>
</div>
<span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 border border-primary/20 text-primary tracking-wide shadow-sm">
        {pin ? 'Configured (••••)' : 'Not Set'}
      </span>
</div>
<p className="text-on-surface-variant text-xs leading-relaxed mt-2">
      Whenever lighting conditions are dim, sensors fail, or the device restarts, your configured PIN will automatically serve as the fallback unlock method.
    </p>
<button onClick={() => (setActiveTab ? setActiveTab('pin_setup_change_light_mode') : undefined)} className="btn-secondary w-full" type="button">
<span className="flex items-center">
<span className="material-symbols-outlined text-[18px] mr-2">edit_note</span>
        Verify or Change Backup PIN
      </span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
</div>
{/*  Selective Biometric Gates  */}
<div className="rounded-3xl p-5 mb-5 space-y-4 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
<div className="flex items-center justify-between">
<h3 className="font-headline-sm text-headline-sm text-on-surface">Selective Biometric Gates</h3>
<span className="font-label-sm text-label-sm text-on-surface-variant">2 Checkpoints</span>
</div>
<div className="space-y-space-sm">
{/*  Item 1  */}
<div className="flex items-center justify-between py-2">
<div className="flex items-center space-x-3 min-w-0 pr-2">
<div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary flex-shrink-0">
<span className="material-symbols-outlined text-[18px]">power_settings_new</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-body-lg text-body-lg text-on-surface font-medium">Unlock App on Launch</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Requires Face/Touch ID every session</span>
</div>
</div>
<button onClick={() => setAppLockActive(!isAppLockActive)} aria-checked={isAppLockActive} className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ${isAppLockActive ? 'bg-primary' : 'bg-slate-300'}`} role="switch">
<span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 mt-0.5 ml-0.5 ${isAppLockActive ? 'translate-x-5' : 'translate-x-0.5'}`}></span>
</button>
</div>
{/*  Item 3  */}
<div className="flex items-center justify-between py-2">
<div className="flex items-center space-x-3 min-w-0 pr-2">
<div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-secondary flex-shrink-0">
<span className="material-symbols-outlined text-[18px]">auto_stories</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-body-lg text-body-lg text-on-surface font-medium">Access Sacred Journal &amp; Deep Notes</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Shield personal inner reflections</span>
</div>
</div>
<button onClick={() => setLockReflections(!lockReflections)} aria-checked={lockReflections} className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ${lockReflections ? 'bg-primary' : 'bg-slate-300'}`} role="switch">
<span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 mt-0.5 ml-0.5 ${lockReflections ? 'translate-x-5' : 'translate-x-0.5'}`}></span>
</button>
</div>
</div>
</div>
{/*  Bottom Action Button  */}
<div className="pt-space-sm">
<button onClick={() => { updatePreferences({ biometricsEnabled, isAppLockActive, lockReflections }); const toast = document.getElementById('toast'); if (toast) { toast.classList.remove('opacity-0', 'translate-y-24'); setTimeout(() => toast.classList.add('opacity-0', 'translate-y-24'), 2500); } }} className="btn-primary w-full" id="save-button">
<span>Save Biometric Preferences</span>
<span className="material-symbols-outlined text-[20px]">arrow_forward</span>
</button>
</div>
{/*  Visual Toast Feedback  */}
<div className="fixed bottom-8 inset-x-8 z-50 transform translate-y-24 opacity-0 transition-all duration-300 pointer-events-none flex justify-center" id="toast">
<div className="px-space-lg py-space-sm rounded-full bg-inverse-surface text-inverse-on-surface shadow-xl flex items-center space-x-2">
<span className="material-symbols-outlined text-tertiary-fixed text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>check_circle</span>
<span className="font-body-sm text-body-sm font-medium text-slate-800" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>Biometric Sanctuary updated</span>
</div>
</div>
</div>
</main>
    </>
  );
}
