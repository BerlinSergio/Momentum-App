import React, { useState, useRef, useEffect } from 'react';
import UserAvatar from './components/UserAvatar';
import { ArrowLeft, Pencil, Trash2, UserCheck, User, Mail, Globe, Sun, ArrowRight, RefreshCw, Check, Wallet, Clock, Compass, ChevronRight, MapPin } from 'lucide-react';
import { useProfileStore } from './store/useProfileStore';
import CustomDropdown from './components/ui/CustomDropdown';

const CURRENCY_OPTIONS = [
  { value: 'AFN / ؋ (Afghan Afghani)', label: 'AFN / ؋ (Afghan Afghani)', subtext: 'Default national Afghan currency' },
  { value: 'USD / $ (US Dollar)', label: 'USD / $ (US Dollar)', subtext: 'United States Dollar' },
  { value: 'EUR / € (Euro)', label: 'EUR / € (Euro)', subtext: 'European Union Euro' },
  { value: 'GBP / £ (British Pound)', label: 'GBP / £ (British Pound)', subtext: 'British Pound Sterling' },
  { value: 'PKR / ₨ (Pakistani Rupee)', label: 'PKR / ₨ (Pakistani Rupee)', subtext: 'Pakistani Rupee' },
  { value: 'IRR / ﷼ (Iranian Rial)', label: 'IRR / ﷼ (Iranian Rial)', subtext: 'Iranian Rial' },
];

const TIMEZONE_OPTIONS = [
  { value: 'Asia/Kabul (UTC+4:30)', label: 'Asia/Kabul (UTC+4:30)', subtext: 'Kabul, Afghanistan standard time' },
  { value: 'Asia/Dubai (UTC+4:00)', label: 'Asia/Dubai (UTC+4:00)', subtext: 'Gulf Standard Time' },
  { value: 'Asia/Tehran (UTC+3:30)', label: 'Asia/Tehran (UTC+3:30)', subtext: 'Iran Standard Time' },
  { value: 'Asia/Karachi (UTC+5:00)', label: 'Asia/Karachi (UTC+5:00)', subtext: 'Pakistan Standard Time' },
  { value: 'Europe/London (UTC+0:00)', label: 'Europe/London (UTC+0:00)', subtext: 'Greenwich Mean Time' },
  { value: 'America/New_York (UTC-5:00)', label: 'America/New_York (UTC-5:00)', subtext: 'Eastern Standard Time' },
];

const CONVENTION_OPTIONS = [
  { value: 'Univ. of Islamic Sciences, Karachi', label: 'Univ. of Islamic Sciences, Karachi', subtext: 'Fajr: 18.0°, Isha: 18.0° (Hanafi Asr)' },
  { value: 'Muslim World League', label: 'Muslim World League', subtext: 'Fajr: 18.0°, Isha: 17.0°' },
  { value: 'Umm Al-Qura, Makkah', label: 'Umm Al-Qura, Makkah', subtext: 'Fajr: 18.5°, Isha: +90m' },
  { value: 'Islamic Society of North America', label: 'Islamic Society of North America', subtext: 'Fajr: 15.0°, Isha: 15.0°' },
  { value: 'Egyptian General Authority', label: 'Egyptian General Authority', subtext: 'Fajr: 19.5°, Isha: 17.5°' },
];

export default function EditProfileDarkMode({ setActiveTab, goBack }) {
  const profile = useProfileStore();
  const updateProfile = useProfileStore((s) => s.updateProfile);
  const fileInputRef = useRef(null);
  const [fullName, setFullName] = useState(profile.fullName || '');
  const [email, setEmail] = useState(profile.email || '');
  const [avatar, setAvatar] = useState(profile.avatar || null);
  const [imageError, setImageError] = useState(false);
  const [currency, setCurrency] = useState(profile.currency || 'AFN / ؋ (Afghan Afghani)');
  const [timezone, setTimezone] = useState(profile.timezone || 'Asia/Kabul (UTC+4:30)');
  const [city, setCity] = useState(profile.city || 'Kabul, Afghanistan');
  const [calculationConvention, setCalculationConvention] = useState(profile.calculationConvention || 'Univ. of Islamic Sciences, Karachi');
  const [hijriShamsi, setHijriShamsi] = useState(profile.hijriShamsi ?? true);
  const [saveStatus, setSaveStatus] = useState('idle');

  useEffect(() => {
    if (profile) {
      if (profile.fullName !== undefined) setFullName(profile.fullName || '');
      if (profile.email !== undefined) setEmail(profile.email || '');
      if (profile.avatar !== undefined) setAvatar(profile.avatar);
      if (profile.currency) setCurrency(profile.currency);
      if (profile.timezone) setTimezone(profile.timezone);
      if (profile.city) setCity(profile.city);
      if (profile.calculationConvention) setCalculationConvention(profile.calculationConvention);
      if (profile.hijriShamsi !== undefined) setHijriShamsi(profile.hijriShamsi);
    }
  }, [profile._hasHydrated, profile.fullName, profile.email, profile.avatar]);

  const handlePhotoClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert('Image size exceeds 10MB limit.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_SIZE = 256;
        let w = img.width;
        let h = img.height;
        if (w > h) {
          if (w > MAX_SIZE) {
            h = Math.round((h * MAX_SIZE) / w);
            w = MAX_SIZE;
          }
        } else {
          if (h > MAX_SIZE) {
            w = Math.round((w * MAX_SIZE) / h);
            h = MAX_SIZE;
          }
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setAvatar(compressedDataUrl);
        setImageError(false);
      };
      img.onerror = () => {
        setAvatar(event.target.result);
        setImageError(false);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setAvatar(null);
    setImageError(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSave = () => {
    if (saveStatus !== 'idle') return;
    setSaveStatus('saving');
    const payload = { fullName: fullName.trim(), email: email.trim(), avatar, currency, timezone, city, calculationConvention, hijriShamsi, lastSynced: new Date().toISOString() };
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = window.localStorage.getItem('momentum-profile-storage');
        const parsed = raw ? JSON.parse(raw) : { state: {}, version: 0 };
        parsed.state = { ...(parsed.state || {}), ...payload, _hasHydrated: true };
        window.localStorage.setItem('momentum-profile-storage', JSON.stringify(parsed));
      }
    } catch (e) {
      console.warn('Direct storage sync warning:', e);
    }
    updateProfile(payload);
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => {
        if (goBack) goBack('settings_profile_dark_mode');
        else if (setActiveTab) setActiveTab('settings_profile_dark_mode');
        else window.history.back();
      }, 350);
    }, 450);
  };

  const handleDiscard = () => {
    if (goBack) goBack('settings_profile_dark_mode');
    else if (setActiveTab) setActiveTab('settings_profile_dark_mode');
    else window.history.back();
  };

  return (
    <>
      <input type="file" ref={fileInputRef} onChange={handlePhotoChange} accept="image/png,image/jpeg,image/webp" className="hidden" />
      <div className="sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
            <User className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-white tracking-tight">
            Edit Profile
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleDiscard} className="p-2 rounded-full text-slate-300 hover:bg-slate-800 transition-colors"><ArrowLeft className="w-5 h-5"/></button>
          <UserAvatar 
            setActiveTab={setActiveTab} 
          />
        </div>
      </div>

      <main className="flex-1 flex flex-col w-full pb-28 px-5 bg-transparent relative z-10">
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[120vw] h-[55vh] rounded-full bg-primary/15 blur-3xl"></div>
        </div>
        
        {/* AVATAR SECTION */}
        <section className="mb-6 relative z-10 flex flex-col items-center">
          <div className="relative w-24 h-24 mx-auto rounded-full ring-4 ring-primary/30 shadow-lg overflow-hidden bg-slate-800">
            {avatar && !imageError ? (
              <img src={avatar} alt="Profile" className="w-full h-full object-cover" onError={() => setImageError(true)} />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center text-white">
                {fullName && fullName.trim() ? (
                  <span className="text-3xl font-bold">{fullName.trim().charAt(0).toUpperCase()}</span>
                ) : (
                  <User className="w-12 h-12 text-white/90" />
                )}
              </div>
            )}
          </div>
          <div className="flex flex-row justify-center items-center gap-4 mt-4 w-full">
            <button onClick={handlePhotoClick} className="h-10 px-4 py-2 rounded-xl bg-primary/15 border border-primary/30 text-primary hover:bg-primary/25 text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm active:scale-95 cursor-pointer" type="button">
              <Pencil className="w-4 h-4"/>
              Change Photo
            </button>
            <button onClick={handleRemovePhoto} className="h-10 px-4 py-2 rounded-xl bg-rose-500/90 hover:bg-rose-600 text-white border border-rose-400/30 text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm shadow-rose-500/20 active:scale-95 cursor-pointer" type="button">
              <Trash2 className="w-4 h-4"/>
              Remove
            </button>
          </div>
          <p className="text-center text-xs text-slate-400 mt-3 block">PNG, JPG or WEBP · Max 5MB</p>
        </section>

        {/* IDENTITY & ACCOUNT CARD */}
        <div className="rounded-3xl p-5 mb-5 space-y-4 relative z-10 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
          <div className="flex items-center gap-2 pb-1">
            <UserCheck className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-bold text-white">Identity & Account</h2>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400">Full Name</label>
            <div className="flex items-center gap-3 p-3.5 rounded-2xl text-white bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
              <User className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your full name" className="bg-transparent text-sm font-medium text-white w-full focus:outline-none placeholder-slate-500" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400">Email Address</label>
            <div className="flex items-center gap-3 p-3.5 rounded-2xl text-white bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
              <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" className="bg-transparent text-sm font-medium text-white w-full focus:outline-none placeholder-slate-500" />
            </div>
          </div>
        </div>

        {/* REGIONAL SETTINGS CARD */}
        <div className="rounded-3xl p-5 mb-5 space-y-4 relative z-30 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-bold text-white">Regional Settings</h2>
            </div>
            <span className="text-xs font-medium text-slate-400">Locale & Sync</span>
          </div>

          <div className="space-y-1 relative z-[100]">
            <label className="text-xs font-semibold text-slate-400">Primary Currency</label>
            <CustomDropdown value={currency} onChange={setCurrency} options={CURRENCY_OPTIONS} isDarkMode={true} icon={Wallet} />
            <p className="text-[11px] text-slate-500 mt-1 pl-1">All financial logs, expense budgets, and cash flows default to this currency.</p>
          </div>

          <div className="space-y-1 relative z-[90]">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-400">Timezone</label>
              <button
                type="button"
                onClick={() => setActiveTab && setActiveTab('timezone_selection_dark_mode')}
                className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                <span>Timezone Selection</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <CustomDropdown value={timezone} onChange={setTimezone} options={TIMEZONE_OPTIONS} isDarkMode={true} icon={Clock} />
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1 pl-1">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              Local Solar Noon Offset: +12m 40s
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-400">City & Country</label>
              <button
                type="button"
                onClick={() => setActiveTab && setActiveTab('city_selection_dark_mode')}
                className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                <span>Select from City Database</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="rounded-3xl p-5 space-y-4 relative z-0 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
              <div className="flex items-center justify-between">
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City, Country" className="bg-transparent text-sm font-medium text-white w-full focus:outline-none placeholder-slate-500" />
                <button
                  type="button"
                  onClick={() => setActiveTab && setActiveTab('city_selection_dark_mode')}
                  className="px-2.5 py-1 rounded-xl bg-primary/20 hover:bg-primary/30 text-primary text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                >
                  <MapPin className="w-3 h-3" />
                  <span>Browse</span>
                </button>
              </div>
              <div className="flex items-start gap-2 pt-2 border-t border-slate-700/60">
                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold text-primary">Geocoded for Prayer Calculations</span>
                  <span className="text-[10px] text-slate-400">Lat 34.5553° N, Long 69.2075° E (Elevation 1,791m)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SPIRITUAL ROUTINE CONTEXT CARD */}
        <div className="rounded-3xl p-5 mb-5 space-y-4 relative z-20 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-bold text-white">Spiritual Routine Context</h2>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/20 border border-primary/40 text-primary">Momentum</span>
          </div>

          <div className="space-y-1 relative z-[100]">
            <label className="text-xs font-semibold text-slate-400">Calculation Convention</label>
            <CustomDropdown value={calculationConvention} onChange={setCalculationConvention} options={CONVENTION_OPTIONS} isDarkMode={true} icon={Compass} />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400">Calendar Synchronization</label>
            <div className="rounded-3xl p-5   relative z-0 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white">Hijri Shamsi (Solar Calendar)</span>
                <span className="text-[11px] text-slate-400">Afghan national astronomical solar reckoning</span>
              </div>
              <button type="button" role="switch" aria-checked={hijriShamsi} onClick={() => setHijriShamsi(!hijriShamsi)} className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${hijriShamsi ? 'bg-primary' : 'bg-slate-700'}`}>
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm mt-0.5 ml-0.5 transition-transform ${hijriShamsi ? 'translate-x-5' : 'translate-x-0'}`}></span>
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION BUTTONS */}
        <div className="pt-2 relative z-0 flex flex-col items-center">
          <button type="button" onClick={handleSave} disabled={saveStatus !== 'idle'} className="btn-primary w-full flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.99] transition-transform">
            {saveStatus === 'saving' ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Saving Changes...</span>
              </>
            ) : saveStatus === 'saved' ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Changes Saved!</span>
              </>
            ) : (
              <>
                <span>Save Changes</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
          <button type="button" onClick={handleDiscard} className="w-full py-3 mt-3 text-center text-sm font-medium text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 active:bg-white/20 border border-white/10 rounded-2xl transition-all duration-150 cursor-pointer shadow-sm active:scale-[0.99] flex items-center justify-center">
            Discard Changes
          </button>
        </div>
      </main>
    </>
  );
}
