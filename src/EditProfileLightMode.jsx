import { useTranslation } from 'react-i18next';
import MomentumGlassHeader from './components/MomentumGlassHeader';
import { useState, useRef, useEffect } from 'react';
import UserAvatar from './components/UserAvatar';
import { ArrowLeft, Pencil, Trash2, UserCheck, User, Mail, Globe, Sun, ArrowRight, RefreshCw, Check, Wallet, Clock, Compass, ChevronRight, MapPin } from 'lucide-react';
import { useProfileStore } from './store/useProfileStore';
import { usePrayerStore } from './store/usePrayerStore';
import CustomDropdown from './components/ui/CustomDropdown';
import { toast } from './components/ui/toast/index.js';
import { confirm } from './components/ui/confirmation/index.js';

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

export default function EditProfileLightMode({ setActiveTab, goBack }) {
  const { t } = useTranslation();
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
      /* eslint-disable react-hooks/set-state-in-effect */
      if (profile.fullName !== undefined) setFullName(profile.fullName || '');
      if (profile.email !== undefined) setEmail(profile.email || '');
      if (profile.avatar !== undefined) setAvatar(profile.avatar);
      if (profile.currency) setCurrency(profile.currency);
      if (profile.timezone) setTimezone(profile.timezone);
      if (profile.city) setCity(profile.city);
      if (profile.calculationConvention) setCalculationConvention(profile.calculationConvention);
      if (profile.hijriShamsi !== undefined) setHijriShamsi(profile.hijriShamsi);
      /* eslint-enable react-hooks/set-state-in-effect */
    }
  }, [profile]);

  const handlePhotoClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast.error(t('toasts.imageSizeLimit', 'Image size exceeds 10MB limit.'));
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

  const saveInFlight = useRef(false);
  const handleSave = async () => {
    if (saveInFlight.current || saveStatus !== 'idle') return;
    saveInFlight.current = true;
    setSaveStatus('saving');
    const payload = { fullName: fullName.trim(), email: email.trim(), avatar, currency, timezone, city, calculationConvention, hijriShamsi, lastSynced: new Date().toISOString() };
    try {
      await updateProfile(payload);
      // The profile is committed first. Prayer calculation synchronization
      // reports its own error; never write an unverified localStorage mirror.
      if (usePrayerStore.getState().calculationMethod !== calculationConvention) {
        await usePrayerStore.getState().setCalculationMethod?.(calculationConvention);
      }
      setSaveStatus('saved');
      toast.success(t('toasts.profileUpdated', 'Profile updated successfully'));
      if (goBack) goBack('settings_profile_light_mode');
      else if (setActiveTab) setActiveTab('settings_profile_light_mode');
      else window.history.back();
    } catch (error) {
      console.error('[Profile] Save failed:', error);
      setSaveStatus('idle');
      toast.error(t('storage.profileConflictTitle', 'Profile changes could not be saved safely'));
    } finally {
      saveInFlight.current = false;
    }
  };

  const isDirty = fullName !== (profile.fullName || '') ||
    email !== (profile.email || '') ||
    currency !== (profile.currency || 'AFN / ؋ (Afghan Afghani)') ||
    timezone !== (profile.timezone || 'Asia/Kabul (UTC+4:30)') ||
    city !== (profile.city || 'Kabul, Afghanistan') ||
    avatar !== (profile.avatar || null) || calculationConvention !== profile.calculationConvention || hijriShamsi !== profile.hijriShamsi;

  const handleDiscard = async () => {
    if (isDirty) {
      const confirmed = await confirm({
        variant: 'warning',
        titleKey: 'confirm.discardProfileTitle',
        messageKey: 'confirm.discardProfileDescription',
        confirmLabelKey: 'confirm.discard',
        cancelLabelKey: 'confirm.keepEditing',
      });
      if (!confirmed) return;
    }
    if (goBack) goBack('settings_profile_light_mode');
    else if (setActiveTab) setActiveTab('settings_profile_light_mode');
    else window.history.back();
  };

  return (
    <>
      <input type="file" ref={fileInputRef} onChange={handlePhotoChange} accept="image/png,image/jpeg,image/webp" className="hidden" />
      <MomentumGlassHeader isDarkMode={false}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
            <User className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-slate-900 tracking-tight" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>
            {t('settings.editProfile', 'Edit Profile')}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleDiscard} className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"><ArrowLeft className="w-5 h-5"/></button>
          <UserAvatar 
            setActiveTab={setActiveTab} 
          />
        </div>
      </MomentumGlassHeader>

      <main className="flex-1 flex flex-col w-full max-w-md lg:max-w-5xl mx-auto pb-28 px-5 lg:px-8 bg-transparent relative z-10">
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[120vw] h-[55vh] rounded-full bg-primary/10 blur-3xl"></div>
        </div>
        
        {/* Responsive Layout: 2-Column Grid on Desktop (>= 1024px), Single Column on Mobile */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-6 items-start gap-5">
          {/* ── LEFT COLUMN (Cols 1-5 on Desktop): Avatar, Identity, Actions ── */}
          <div className="w-full lg:col-span-5 flex flex-col gap-5">
            <div className="rounded-3xl p-5 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg flex flex-col items-center">
              {/* AVATAR SECTION */}
        <section className="mb-6 relative z-10 flex flex-col items-center">
          <div className="relative w-24 h-24 mx-auto rounded-full ring-4 ring-primary/20 shadow-md overflow-hidden bg-slate-100">
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
            <button onClick={handlePhotoClick} className="h-10 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary/15 text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm active:scale-95 cursor-pointer" type="button">
              <Pencil className="w-4 h-4"/>
              {t('profile.changePhoto', 'Change Photo')}
            </button>
            <button onClick={handleRemovePhoto} className="h-10 px-4 py-2 rounded-xl bg-rose-500/90 hover:bg-rose-600 text-white border border-rose-400/30 text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm shadow-rose-500/20 active:scale-95 cursor-pointer" type="button">
              <Trash2 className="w-4 h-4"/>
              {t('common.remove', 'Remove')}
            </button>
          </div>
          <p className="text-center text-xs text-slate-600 mt-3 block" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>{t('profile.photoFormatHint', 'PNG, JPG or WEBP · Max 5MB')}</p>
        </section>
            </div>
            {/* IDENTITY & ACCOUNT CARD */}
        <div className="rounded-3xl p-5 mb-5 space-y-4 relative z-10 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
          <div className="flex items-center gap-2 pb-1">
            <UserCheck className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-bold text-slate-900">{t('profile.identityAccount', 'Identity & Account')}</h2>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500">{t('profile.fullName', 'Full Name')}</label>
            <div className="flex items-center gap-3 p-3.5 rounded-2xl text-slate-900 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
              <User className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder={t('profile.enterFullName', 'Enter your full name')} className="bg-transparent text-sm font-medium text-slate-900 w-full focus:outline-none placeholder-slate-400" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500">{t('profile.emailAddress', 'Email Address')}</label>
            <div className="flex items-center gap-3 p-3.5 rounded-2xl text-slate-900 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
              <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('profile.enterEmail', 'Enter your email address')} className="bg-transparent text-sm font-medium text-slate-900 w-full focus:outline-none placeholder-slate-400" />
            </div>
          </div>
        </div>
            
          </div>

          {/* ── RIGHT COLUMN (Cols 6-12 on Desktop): Regional & Spiritual ── */}
          <div className="w-full lg:col-span-7 flex flex-col gap-5">
            {/* REGIONAL SETTINGS CARD */}
        <div className="rounded-3xl p-5 mb-5 space-y-4 relative z-30 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-bold text-slate-900">{t('profile.regionalSettings', 'Regional Settings')}</h2>
            </div>
            <span className="text-xs font-medium text-slate-400">{t('profile.localeSync', 'Locale & Sync')}</span>
          </div>

          <div className="space-y-1 relative z-[100]">
            <label className="text-xs font-semibold text-slate-500">{t('profile.primaryCurrency', 'Primary Currency')}</label>
            <CustomDropdown value={currency} onChange={setCurrency} options={CURRENCY_OPTIONS} isDarkMode={false} icon={Wallet} />
            <p className="text-[11px] text-slate-500 mt-1 pl-1">{t('profile.currencyDesc', 'All financial logs, expense budgets, and cash flows default to this currency.')}</p>
          </div>

          <div className="space-y-1 relative z-[90]">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-500">{t('profile.timezone', 'Timezone')}</label>
              <button
                type="button"
                onClick={() => setActiveTab && setActiveTab('timezone_selection_light_mode')}
                className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                <span>{t('profile.timezoneSelection', 'Timezone Selection')}</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <CustomDropdown value={timezone} onChange={setTimezone} options={TIMEZONE_OPTIONS} isDarkMode={false} icon={Clock} />
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1 pl-1">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              Local Solar Noon Offset: +12m 40s
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-500">{t('profile.cityCountry', 'City & Country')}</label>
              <button
                type="button"
                onClick={() => setActiveTab && setActiveTab('city_selection_light_mode')}
                className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                <span>{t('profile.selectCityDatabase', 'Select from City Database')}</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="rounded-3xl p-5 space-y-4 relative z-0 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
              <div className="flex items-center justify-between">
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder={t('profile.cityCountryPlaceholder', 'City, Country')} className="bg-transparent text-sm font-medium text-slate-900 w-full focus:outline-none placeholder-slate-400" />
                <button
                  type="button"
                  onClick={() => setActiveTab && setActiveTab('city_selection_light_mode')}
                  className="px-2.5 py-1 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                >
                  <MapPin className="w-3 h-3" />
                  <span>{t('profile.browse', 'Browse')}</span>
                </button>
              </div>
              <div className="flex items-start gap-2 pt-2 border-t border-slate-200/80">
                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold text-primary">{t('profile.geocodedForPrayer', 'Geocoded for Prayer Calculations')}</span>
                  <span className="text-[10px] text-slate-400">Lat 34.5553° N, Long 69.2075° E (Elevation 1,791m)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
            {/* SPIRITUAL ROUTINE CONTEXT CARD */}
        <div className="rounded-3xl p-5 mb-5 space-y-4 relative z-20 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-bold text-slate-900">{t('profile.spiritualRoutineContext', 'Spiritual Routine Context')}</h2>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/20 border border-primary/40 text-primary">Momentum</span>
          </div>

          <div className="space-y-1 relative z-[100]">
            <label className="text-xs font-semibold text-slate-500">{t('profile.calculationConvention', 'Calculation Convention')}</label>
            <CustomDropdown value={calculationConvention} onChange={setCalculationConvention} options={CONVENTION_OPTIONS} isDarkMode={false} icon={Compass} />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500">{t('profile.calendarSync', 'Calendar Synchronization')}</label>
            <div className="rounded-3xl p-5   relative z-0 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-900">{t('profile.hijriShamsiSolar', 'Hijri Shamsi (Solar Calendar)')}</span>
                <span className="text-[11px] text-slate-400">{t('profile.solarCalendarDesc', 'Afghan national astronomical solar reckoning')}</span>
              </div>
              <button type="button" role="switch" aria-checked={hijriShamsi} onClick={() => setHijriShamsi(!hijriShamsi)} className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${hijriShamsi ? 'bg-primary' : 'bg-slate-300'}`}>
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm mt-0.5 ml-0.5 transition-transform ${hijriShamsi ? 'translate-x-5' : 'translate-x-0'}`}></span>
              </button>
            </div>
          </div>
        </div>
          </div>
          <div className="rounded-3xl p-5 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg flex flex-col items-center w-full mt-4 lg:col-span-12">
              {/* BOTTOM ACTION BUTTONS */}
        <div className="w-full flex flex-col sm:flex-row gap-3 items-stretch">
          <button type="button" onClick={handleSave} disabled={saveStatus !== 'idle'} className="btn-primary w-full flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.99] transition-transform">
            {saveStatus === 'saving' ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>{t('profile.savingChanges', 'Saving Changes...')}</span>
              </>
            ) : saveStatus === 'saved' ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>{t('settings.changesSaved', 'Changes Saved!')}</span>
              </>
            ) : (
              <>
                <span>{t('settings.saveChanges', 'Save Changes')}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
          <button type="button" onClick={handleDiscard} className="w-full py-3 text-center text-sm font-medium text-slate-700 hover:text-slate-900 bg-slate-100/80 hover:bg-slate-200/80 active:bg-slate-200 border border-slate-200/90 rounded-2xl transition-all duration-150 cursor-pointer shadow-sm active:scale-[0.99] flex items-center justify-center">
            {t('settings.discardChanges', 'Discard Changes')}
          </button>
        </div>
            </div>
        </div>
      </main>
    </>
  );
}
