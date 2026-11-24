import { useState, useEffect, useRef, useMemo } from 'react';
import { useProfileStore } from './store/useProfileStore';
import { useSettingsStore } from './store/useSettingsStore';
import { useLocationStore, CITIES_DATA } from './store/useLocationStore';
import { useTranslation } from 'react-i18next';
import { useLocaleStore } from './store/useLocaleStore';
import { SUPPORTED_LOCALES } from './i18n/localeUtils';
import { toast } from './components/ui/toast/index.js';
import { 
  User, 
  CheckCircle2, 
  ChevronDown, 
  Compass, 
  MapPin, 
  Lock, 
  ArrowRight,
  Check,
  Loader2,
  AlertCircle
} from 'lucide-react';

const CURRENCIES = {
  AFN: { symbol: '؋', name: 'Afghan Afghani', label: 'Default Base Currency (؋ AFN)', fullCode: 'AFN / ؋ (Afghan Afghani)' },
  USD: { symbol: '$', name: 'US Dollar', label: 'Default Base Currency ($ USD)', fullCode: 'USD / $ (US Dollar)' },
  EUR: { symbol: '€', name: 'Euro', label: 'Default Base Currency (€ EUR)', fullCode: 'EUR / € (Euro)' },
  GBP: { symbol: '£', name: 'British Pound', label: 'Default Base Currency (£ GBP)', fullCode: 'GBP / £ (British Pound)' },
};

const BASE_TIMEZONES = [
  { id: 'Asia/Kabul', label: 'Asia/Kabul', name: 'Afghanistan Time' },
  { id: 'Asia/Dubai', label: 'Asia/Dubai', name: 'Gulf Standard Time' },
  { id: 'Asia/Tehran', label: 'Asia/Tehran', name: 'Iran Standard Time' },
  { id: 'Asia/Karachi', label: 'Asia/Karachi', name: 'Pakistan Standard Time' },
  { id: 'Asia/Riyadh', label: 'Asia/Riyadh', name: 'Arabia Standard Time' },
  { id: 'Asia/Istanbul', label: 'Asia/Istanbul', name: 'Turkey Time' },
  { id: 'Europe/London', label: 'Europe/London', name: 'Greenwich Mean Time' },
  { id: 'America/New_York', label: 'America/New_York', name: 'Eastern Time' },
];

const CITY_OPTIONS = [
  { id: 'kabul', name: 'Kabul', country: 'Afghanistan', full: 'Kabul, Afghanistan', desc: 'Afghanistan • 34.55° N, 69.21° E' },
  { id: 'herat', name: 'Herat', country: 'Afghanistan', full: 'Herat, Afghanistan', desc: 'Afghanistan • 34.35° N, 62.20° E' },
  { id: 'mazar', name: 'Mazar-i-Sharif', country: 'Afghanistan', full: 'Mazar-i-Sharif, Afghanistan', desc: 'Afghanistan • 36.71° N, 67.11° E' },
  { id: 'kandahar', name: 'Kandahar', country: 'Afghanistan', full: 'Kandahar, Afghanistan', desc: 'Afghanistan • 31.63° N, 65.74° E' },
  { id: 'jalalabad', name: 'Jalalabad', country: 'Afghanistan', full: 'Jalalabad, Afghanistan', desc: 'Afghanistan • 34.43° N, 70.45° E' },
  { id: 'makkah', name: 'Makkah', country: 'Saudi Arabia', full: 'Makkah, Saudi Arabia', desc: 'Saudi Arabia • 21.39° N, 39.86° E' },
  { id: 'madinah', name: 'Madinah', country: 'Saudi Arabia', full: 'Madinah, Saudi Arabia', desc: 'Saudi Arabia • 24.52° N, 39.57° E' },
  { id: 'dubai', name: 'Dubai', country: 'United Arab Emirates', full: 'Dubai, UAE', desc: 'UAE • 25.20° N, 55.27° E' },
  { id: 'istanbul', name: 'Istanbul', country: 'Turkey', full: 'Istanbul, Turkey', desc: 'Turkey • 41.01° N, 28.98° E' },
  { id: 'tehran', name: 'Tehran', country: 'Iran', full: 'Tehran, Iran', desc: 'Iran • 35.69° N, 51.39° E' },
];

export default function PersonalSetupLightMode({ setActiveTab }) {
  const { t } = useTranslation();
  const currentLocale = useLocaleStore((s) => s.currentLocale);
  const setLocale = useLocaleStore((s) => s.setLocale);

  const profile = useProfileStore();
  const updateProfile = useProfileStore((s) => s.updateProfile);

  const baseCurrency = useSettingsStore((s) => s.baseCurrency) || 'AFN';
  const setBaseCurrency = useSettingsStore((s) => s.setBaseCurrency);
  const globalTimezone = useSettingsStore((s) => s.timezone) || profile.timezone || 'Asia/Kabul';
  const setTimezone = useSettingsStore((s) => s.setTimezone);
  const globalCity = useSettingsStore((s) => s.city) || profile.city || 'Kabul, Afghanistan';
  const setCity = useSettingsStore((s) => s.setCity);
  const storedUserName = useSettingsStore((s) => s.userName);
  const setUserName = useSettingsStore((s) => s.setUserName);

  const [name, setName] = useState(storedUserName || profile.fullName || '');
  const [currCode, setCurrCode] = useState(baseCurrency);
  const [isLocating, setIsLocating] = useState(false);
  const [isTzOpen, setIsTzOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);

  const isMountedRef = useRef(true);
  const isSubmittingRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const showToast = (message, type = 'success') => {
    if (type === 'error') toast.error(message);
    else if (type === 'warning') toast.warning(message);
    else if (type === 'info') toast.info(message);
    else toast.success(message);
  };

  // Dynamic timezone resolution
  const getTimezoneDesc = (tzId) => {
    try {
      const parts = new Intl.DateTimeFormat('en-US', { timeZone: tzId, timeZoneName: 'shortOffset' }).formatToParts(new Date());
      const part = parts.find((p) => p.type === 'timeZoneName');
      if (part?.value) return part.value.replace('GMT', 'UTC');
    } catch (_err) {
      void _err;
    }
    return 'UTC';
  };

  const detectedDeviceTz = typeof Intl !== 'undefined' && Intl.DateTimeFormat
    ? Intl.DateTimeFormat().resolvedOptions().timeZone
    : 'Asia/Kabul';

  const timezoneOptions = useMemo(() => {
    const list = [...BASE_TIMEZONES];
    if (detectedDeviceTz && !list.some((item) => item.id === detectedDeviceTz)) {
      list.unshift({
        id: detectedDeviceTz,
        label: detectedDeviceTz,
        name: 'Device Local Timezone',
      });
    }
    return list.map((item) => {
      const offset = getTimezoneDesc(item.id);
      return {
        ...item,
        desc: `${item.name} (${offset})`,
      };
    });
  }, [detectedDeviceTz]);

  const activeCurr = CURRENCIES[currCode] || CURRENCIES.AFN;
  const isValidName = name.trim().length > 1;

  const handleNameChange = (e) => {
    const val = e.target.value;
    setName(val);
    if (setUserName) setUserName(val);
    updateProfile({ fullName: val });
  };

  const handleCurrencySelect = (code) => {
    setCurrCode(code);
    if (setBaseCurrency) setBaseCurrency(code);
    updateProfile({ currency: (CURRENCIES[code] || CURRENCIES.AFN).fullCode });
  };

  const handleAutoDetect = (e) => {
    if (e) e.stopPropagation();
    if (isLocating) return;
    setIsLocating(true);
    setIsCityOpen(false);

    const onLocationFailure = (errorMsg = t('onboarding.locationUnavailable', 'Location detection unavailable. Please select city manually.')) => {
      if (!isMountedRef.current) return;
      setIsLocating(false);
      showToast(errorMsg, 'error');
    };

    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          if (!isMountedRef.current) return;
          try {
            const { latitude, longitude } = position.coords;
            const res = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            if (!isMountedRef.current) return;
            if (res.ok) {
              const data = await res.json();
              const cName = data.city || data.locality || data.principalSubdivision;
              const country = data.countryName;
              if (cName && country) {
                const resolved = `${cName}, ${country}`;
                if (setCity) setCity(resolved);
                updateProfile({ city: resolved });
                try {
                  useLocationStore.getState().setGpsLocation({
                    latitude,
                    longitude,
                    city: cName,
                    country: country,
                  });
                } catch (e) {
                  void e;
                }
                setIsLocating(false);
                showToast(t('onboarding.locationDetected', 'Location detected: {{location}} ✓', { location: resolved }), 'success');
                return;
              }
            }
            onLocationFailure(t('onboarding.geocodingUnavailable', 'Reverse-geocoding service unavailable.'));
          } catch {
            onLocationFailure(t('onboarding.networkErrorLocation', 'Network error while resolving location.'));
          }
        },
        (geoError) => {
          let msg = t('onboarding.locationUnavailable', 'Location detection unavailable. Please select city manually.');
          if (geoError?.code === 1) {
            msg = t('onboarding.locationPermissionDenied', 'Location permission denied. Please select city manually.');
          } else if (geoError?.code === 3) {
            msg = t('onboarding.locationTimeout', 'Location request timed out. Please select city manually.');
          }
          onLocationFailure(msg);
        },
        { timeout: 5000, enableHighAccuracy: false }
      );
    } else {
      onLocationFailure(t('onboarding.geolocationNotSupported', 'Geolocation is not supported on this device.'));
    }
  };

  const handleSelectTimezone = (tz) => {
    const offset = getTimezoneDesc(tz.id);
    const formatted = `${tz.label} (${offset})`;
    if (setTimezone) setTimezone(formatted);
    updateProfile({ timezone: formatted });
    setIsTzOpen(false);
  };

  const handleSelectCity = (cityItem) => {
    if (setCity) setCity(cityItem.full);
    updateProfile({ city: cityItem.full });
    try {
      const matched = CITIES_DATA.find(
        (c) => c.name.toLowerCase() === cityItem.name.toLowerCase() || cityItem.full.toLowerCase().includes(c.name.toLowerCase())
      );
      if (matched) {
        useLocationStore.getState().setSelectedCity(matched);
      }
    } catch (e) {
      void e;
    }
    setIsCityOpen(false);
    showToast(t('onboarding.citySelected', 'City selected: {{city}} ✓', { city: cityItem.full }), 'success');
  };

  const getCityDesc = (cityStr) => {
    const match = CITY_OPTIONS.find((c) => c.full.toLowerCase() === (cityStr || '').toLowerCase() || c.name.toLowerCase() === (cityStr || '').toLowerCase());
    return match ? match.desc : 'Afghanistan • 34.55° N, 69.21° E';
  };

  const handleContinue = () => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setTimeout(() => { isSubmittingRef.current = false; }, 800);

    const finalName = name.trim();
    updateProfile({
      fullName: finalName,
      currency: activeCurr.fullCode,
      timezone: globalTimezone,
      city: globalCity,
      onboardingStep: 'security_setup',
    });
    if (setUserName) setUserName(finalName);
    if (setBaseCurrency) setBaseCurrency(currCode);
    if (setTimezone) setTimezone(globalTimezone);
    if (setCity) setCity(globalCity);

    if (setActiveTab) {
      setActiveTab('pin_setup_change_light_mode');
    }
  };

  return (
    <div className="w-full min-h-full px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 pb-10 flex flex-col items-center justify-between select-none">
      <div className="w-full max-w-xl lg:max-w-3xl flex flex-col items-center space-y-6">
        
        {/* PROGRESS STEPPER */}
        <div className="w-full flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              {t('onboarding.step1of2', 'Step 1 of 2')}
            </span>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            {t('onboarding.personalSetup', 'Personal Setup')}
          </span>
        </div>

        {/* WELCOME HEADER */}
        <div className="text-center space-y-1.5 max-w-lg">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {t('onboarding.welcomeTitle', 'Welcome to Momentum')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-normal">
            {t('onboarding.welcomeSubtitle', 'Personalize your experience with clean, local defaults.')}
          </p>
        </div>

        {/* FORM CONTENT */}
        <div className="w-full space-y-5 pt-2">
          
          {/* 0. LANGUAGE SELECTION */}
          <div className="space-y-2" data-testid="onboarding-language-picker">
            <label className="text-xs font-bold tracking-wider text-slate-700 uppercase px-1 flex items-center justify-between">
              <span>{t('onboarding.chooseLanguage')}</span>
              <span className="text-primary font-mono text-[11px] px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">{currentLocale.toUpperCase()}</span>
            </label>
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {SUPPORTED_LOCALES.map((loc) => {
                const isSelected = currentLocale === loc.code;
                return (
                  <button
                    key={loc.code}
                    type="button"
                    onClick={() => setLocale(loc.code)}
                    className={`py-3 px-2 sm:px-3 rounded-2xl border text-center transition-all cursor-pointer pointer-events-auto flex flex-col items-center justify-center min-h-[58px] ${
                      isSelected
                        ? 'bg-primary/10 border-primary text-primary shadow-sm shadow-primary/10 ring-1 ring-primary/30'
                        : 'bg-white/80 backdrop-blur-md border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    <span className="text-sm font-bold leading-tight">{loc.nativeName}</span>
                    <span className="text-[11px] text-slate-400 font-medium mt-0.5">{loc.code === 'en' ? 'English' : loc.code === 'ps-AF' ? 'Pashto' : 'Dari'}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* TWO-COLUMN ROW ON DESKTOP/TABLET: DISPLAY NAME & PREFERRED CURRENCY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">

            {/* 1. DISPLAY NAME CARD */}
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-wider text-slate-700 uppercase px-1 block">
                {t('onboarding.displayName', 'Your Display Name')}
              </label>
              <div className="relative flex items-center">
                <div className="absolute start-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4"/>
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  placeholder={t('onboarding.enterYourName', 'Enter your name')} 
                  className="w-full h-12 ps-10 pe-10 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/80 text-slate-900 placeholder-slate-400 text-sm font-medium outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all shadow-xs"
                />
                {isValidName && (
                  <div className="absolute end-3.5 flex items-center pointer-events-none text-emerald-600">
                    <CheckCircle2 className="w-4 h-4"/>
                  </div>
                )}
              </div>
            </div>

            {/* 2. BASE CURRENCY CARD */}
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-wider text-slate-700 uppercase px-1 block">
                {t('onboarding.preferredCurrency', 'Preferred Currency')}
              </label>
              {/* Quick Currency Selector Grid */}
              <div className="grid grid-cols-4 gap-2">
                {Object.keys(CURRENCIES).map((code) => {
                  const item = CURRENCIES[code];
                  const isSelected = currCode === code;
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => handleCurrencySelect(code)}
                      className={`h-12 rounded-2xl flex flex-col items-center justify-center border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-50 border-indigo-600 text-indigo-700 font-bold shadow-xs scale-[1.02] ring-1 ring-indigo-500/30'
                          : 'bg-white/80 backdrop-blur-md border-slate-200/80 text-slate-700 hover:bg-slate-50 font-medium'
                      }`}
                    >
                      <span className="text-xs font-bold leading-tight">{code}</span>
                      <span className="text-[11px] opacity-80 font-serif leading-none mt-0.5">{item.symbol}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* TWO-COLUMN ROW ON DESKTOP/TABLET: TIMEZONE & LOCATION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">

            {/* 3. TIMEZONE CARD */}
            <div className="space-y-2 relative">
              <div className="flex items-center justify-between px-1">
                <label className="text-xs font-bold tracking-wider text-slate-700 uppercase">
                  {t('onboarding.timezone', 'Timezone')}
                </label>
                <span className="text-[11px] font-semibold text-indigo-600 tracking-wide uppercase px-2 py-0.5 rounded-full bg-indigo-50">
                  {getTimezoneDesc(globalTimezone.split(' ')[0])}
                </span>
              </div>

              <div className="relative">
                <div 
                  data-testid="tz-trigger"
                  onClick={() => { setIsTzOpen(!isTzOpen); setIsCityOpen(false); }}
                  className="p-3 rounded-2xl flex items-center justify-between bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-xs cursor-pointer active:scale-[0.99] hover:border-slate-300 transition-all min-h-[56px]"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                      <Compass className="w-4 h-4"/>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-900 truncate">{globalTimezone}</p>
                      <span className="text-[11px] font-normal text-slate-500 block truncate">{getTimezoneDesc(globalTimezone.split(' ')[0])}</span>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 flex-shrink-0 ms-2 transition-transform duration-200 ${isTzOpen ? 'rotate-180 text-indigo-600' : ''}`}/>
                </div>

                {/* Inline Overlaid Timezone Dropdown Menu */}
                {isTzOpen && (
                  <div className="absolute top-[calc(100%+6px)] left-0 right-0 z-[100] p-1.5 rounded-2xl max-h-56 overflow-y-auto bg-white border border-slate-200 shadow-xl space-y-1">
                    {timezoneOptions.map((tz) => {
                      const isSelected = globalTimezone.includes(tz.id);
                      return (
                        <div
                          key={tz.id}
                          onClick={() => handleSelectTimezone(tz)}
                          className={`p-2.5 rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200'
                              : 'text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-slate-900 truncate">{tz.label}</p>
                            <span className="text-[11px] text-slate-500 truncate block">{tz.desc}</span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0 ms-2" />}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* 4. CITY SELECTION CARD */}
            <div className="space-y-2 relative">
              <div className="flex items-center justify-between px-1">
                <label className="text-xs font-bold tracking-wider text-slate-700 uppercase">
                  {t('onboarding.locationCoordinates', 'Location & Coordinates')}
                </label>
                <button
                  type="button"
                  onClick={handleAutoDetect}
                  disabled={isLocating}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer transition-colors px-2 py-0.5 rounded-full hover:bg-indigo-50"
                >
                  {isLocating ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin"/>
                      <span>{t('onboarding.detecting', 'Detecting...')}</span>
                    </>
                  ) : (
                    <>
                      <Compass className="w-3 h-3" />
                      <span>{t('onboarding.autoDetect', 'Auto-Detect')}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative">
                <div 
                  data-testid="city-trigger"
                  onClick={() => { setIsCityOpen(!isCityOpen); setIsTzOpen(false); }}
                  className="p-3 rounded-2xl flex items-center justify-between bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-xs cursor-pointer active:scale-[0.99] hover:border-slate-300 transition-all min-h-[56px]"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4"/>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-900 truncate">{globalCity}</p>
                      <span className="text-[11px] font-normal text-slate-500 block truncate">{getCityDesc(globalCity)}</span>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 flex-shrink-0 ms-2 transition-transform duration-200 ${isCityOpen ? 'rotate-180 text-indigo-600' : ''}`}/>
                </div>

                {/* Inline Overlaid City Dropdown Menu */}
                {isCityOpen && (
                  <div className="absolute top-[calc(100%+6px)] left-0 right-0 z-[100] p-1.5 rounded-2xl max-h-56 overflow-y-auto bg-white border border-slate-200 shadow-xl space-y-1">
                    {CITY_OPTIONS.map((city) => {
                      const isSelected = globalCity?.toLowerCase().includes(city.name.toLowerCase());
                      return (
                        <div
                          key={city.id}
                          onClick={() => handleSelectCity(city)}
                          className={`p-2.5 rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200'
                              : 'text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-slate-900 truncate">{city.full}</p>
                            <span className="text-[11px] text-slate-500 truncate block">{city.desc}</span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0 ms-2" />}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* ENCRYPTION & LOCAL STORAGE NOTICE */}
        <div className={`flex items-center justify-center gap-2 px-2 text-slate-700 drop-shadow-sm transition-opacity duration-200 pt-1 ${isTzOpen || isCityOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <Lock className="w-3.5 h-3.5 flex-shrink-0 text-slate-600"/>
          <p className="text-xs font-medium leading-tight text-center">
            {t('onboarding.storedLocally', 'Stored locally on your device. You can modify settings anytime.')}
          </p>
        </div>

        {/* CONTINUE BUTTON */}
        <div className="w-full max-w-md pt-2">
          <button
            type="button"
            onClick={handleContinue}
            className="w-full h-13 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>{t('onboarding.continue', 'Continue')}</span>
            <ArrowRight className="w-5 h-5 stroke-[2.2] rtl:rotate-180"/>
          </button>
        </div>

      </div>
    </div>
  );
}
