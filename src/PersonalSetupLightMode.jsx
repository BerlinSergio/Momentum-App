import React, { useState, useEffect } from 'react';
import { useProfileStore } from './store/useProfileStore';
import { useSettingsStore } from './store/useSettingsStore';
import { useNavigate } from './utils/navigation';
import { 
  User, 
  CheckCircle2, 
  ChevronDown, 
  Compass, 
  MapPin, 
  Lock, 
  ArrowRight,
  Check,
  Loader2
} from 'lucide-react';

const CURRENCIES = {
  AFN: { symbol: '؋', name: 'Afghan Afghani', label: 'Default Base Currency (؋ AFN)', fullCode: 'AFN / ؋ (Afghan Afghani)' },
  USD: { symbol: '$', name: 'US Dollar', label: 'Default Base Currency ($ USD)', fullCode: 'USD / $ (US Dollar)' },
  EUR: { symbol: '€', name: 'Euro', label: 'Default Base Currency (€ EUR)', fullCode: 'EUR / € (Euro)' },
  GBP: { symbol: '£', name: 'British Pound', label: 'Default Base Currency (£ GBP)', fullCode: 'GBP / £ (British Pound)' },
};

const TIMEZONE_OPTIONS = [
  { id: 'Asia/Kabul', label: 'Asia/Kabul', desc: 'Afghanistan Time (UTC +04:30)' },
  { id: 'Asia/Dubai', label: 'Asia/Dubai', desc: 'Gulf Standard Time (UTC +04:00)' },
  { id: 'Asia/Tehran', label: 'Asia/Tehran', desc: 'Iran Standard Time (UTC +03:30)' },
  { id: 'Asia/Karachi', label: 'Asia/Karachi', desc: 'Pakistan Standard Time (UTC +05:00)' },
  { id: 'Asia/Riyadh', label: 'Asia/Riyadh', desc: 'Arabia Standard Time (UTC +03:00)' },
  { id: 'Asia/Istanbul', label: 'Asia/Istanbul', desc: 'Turkey Time (UTC +03:00)' },
  { id: 'Europe/London', label: 'Europe/London', desc: 'Greenwich Mean Time (UTC +00:00)' },
  { id: 'America/New_York', label: 'America/New_York', desc: 'Eastern Time (UTC -05:00)' },
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
  const navigate = useNavigate();
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
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  useEffect(() => {
    if (storedUserName !== undefined && storedUserName !== '') {
      setName(storedUserName);
    } else if (profile.fullName) {
      setName(profile.fullName);
    }
  }, [storedUserName, profile.fullName]);

  useEffect(() => {
    if (baseCurrency) setCurrCode(baseCurrency);
  }, [baseCurrency]);

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
    setIsLocating(true);
    setIsCityOpen(false);

    const applyFallback = () => {
      setTimeout(() => {
        setIsLocating(false);
        if (setCity) setCity('Kabul, Afghanistan');
        updateProfile({ city: 'Kabul, Afghanistan' });
        showToast('Location detected: Kabul, Afghanistan ✓');
      }, 500);
    };

    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const res = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            if (res.ok) {
              const data = await res.json();
              const cName = data.city || data.locality || data.principalSubdivision || 'Kabul';
              const country = data.countryName || 'Afghanistan';
              const resolved = `${cName}, ${country}`;
              if (setCity) setCity(resolved);
              updateProfile({ city: resolved });
              setIsLocating(false);
              showToast(`Location detected: ${resolved} ✓`);
            } else {
              applyFallback();
            }
          } catch {
            applyFallback();
          }
        },
        () => {
          applyFallback();
        },
        { timeout: 4000 }
      );
    } else {
      applyFallback();
    }
  };

  const handleSelectTimezone = (tz) => {
    const formatted = `${tz.label} (${tz.desc.split('(')[1] ? tz.desc.split('(')[1].replace(')', '') : 'UTC'}`;
    if (setTimezone) setTimezone(formatted);
    updateProfile({ timezone: formatted });
    setIsTzOpen(false);
  };

  const handleSelectCity = (cityItem) => {
    if (setCity) setCity(cityItem.full);
    updateProfile({ city: cityItem.full });
    setIsCityOpen(false);
    showToast(`City selected: ${cityItem.full} ✓`);
  };

  const getCityDesc = (cityStr) => {
    const match = CITY_OPTIONS.find((c) => c.full.toLowerCase() === (cityStr || '').toLowerCase() || c.name.toLowerCase() === (cityStr || '').toLowerCase());
    return match ? match.desc : 'Afghanistan • 34.55° N, 69.21° E';
  };

  const handleContinue = () => {
    const finalName = name.trim() || profile.fullName || 'User';
    updateProfile({
      fullName: finalName,
      currency: activeCurr.fullCode,
      timezone: globalTimezone,
      city: globalCity,
      setupCompleted: true,
    });
    if (setUserName) setUserName(finalName);
    if (setBaseCurrency) setBaseCurrency(currCode);
    if (setTimezone) setTimezone(globalTimezone);
    if (setCity) setCity(globalCity);

    // Call useNavigate to route to dashboard
    navigate('/dashboard');
    if (setActiveTab) {
      setActiveTab('home_dashboard_light_mode');
    }
  };

  return (
    <div className="w-full min-h-full px-4 pt-6 pb-8 flex flex-col items-center justify-between select-none">
      {/* TOAST */}
      {toast ? (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[110] px-4 py-2 rounded-full bg-slate-900 text-white border border-slate-700 shadow-xl flex items-center gap-2 backdrop-blur-md">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-xs font-medium tracking-wide">{toast}</span>
        </div>
      ) : null}

      <div className="w-full max-w-sm flex flex-col items-center space-y-4">
        {/* TOP BRANDING & WELCOME HEADER */}
        <div className="text-center flex flex-col items-center">
          <img 
            src="/logo.png" 
            alt="Momentum Logo" 
            className="w-12 h-12 object-cover rounded-xl aspect-square flex-shrink-0 shadow-md shadow-primary/20 mb-2 ring-2 ring-indigo-100"
          />
          <h1 className="text-xl font-bold text-slate-900 tracking-tight" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>
            Welcome to Momentum
          </h1>
          <p className="text-[11px] font-medium text-slate-700 max-w-xs mx-auto mt-0.5 leading-tight drop-shadow-sm">
            Personalize your space for mindful routines, accurate prayer schedules, and daily finances.
          </p>
        </div>

        {/* MASTER WRAPPER CONTAINER (GLASSMORPHIC NESTED CARD) */}
        <div className={`w-full p-5 rounded-[32px] bg-white/30 backdrop-blur-xl border border-white/40 shadow-sm space-y-5 relative ${isTzOpen || isCityOpen ? 'z-50' : 'z-10'}`}>
          
          {/* FIELD GROUP 1: YOUR NAME */}
          <div>
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 ml-1 block drop-shadow-sm">
              YOUR NAME
            </label>
            <div className="p-3 rounded-2xl flex items-center justify-between bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-2.5 flex-1 mr-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4"/>
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Enter your name"
                  className="text-xs font-semibold text-slate-900 bg-transparent border-none outline-none w-full p-0 focus:ring-0"
                />
              </div>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 border border-emerald-200 text-emerald-700 shadow-2xs transition-all duration-300 ease-in-out ${isValidName ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600"/>
                Verified
              </span>
            </div>
          </div>

          {/* FIELD GROUP 2: PREFERRED CURRENCY */}
          <div>
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 ml-1 block drop-shadow-sm">
              PREFERRED CURRENCY
            </label>
            <div className="p-2.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-xs">
              <div className="grid grid-cols-4 gap-1.5">
                {['AFN', 'USD', 'EUR', 'GBP'].map((code) => {
                  const isSelected = currCode === code;
                  const c = CURRENCIES[code];
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => handleCurrencySelect(code)}
                      className={`py-2 px-2 rounded-xl font-semibold text-xs text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600 text-white font-bold shadow-sm'
                          : 'bg-slate-100 border border-slate-200/70 text-slate-700 hover:bg-slate-200/70'
                      }`}
                    >
                      {c.symbol} {code}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* FIELD GROUP 3: PRAYER & CALENDAR TIMEZONE */}
          <div>
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 ml-1 block drop-shadow-sm">
              PRAYER &amp; CALENDAR TIMEZONE
            </label>
            <div className={`relative ${isTzOpen ? 'z-[100]' : 'z-20'}`}>
              <div
                onClick={() => { setIsTzOpen(!isTzOpen); setIsCityOpen(false); }}
                className="p-3 rounded-2xl flex items-center justify-between bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-xs cursor-pointer active:scale-[0.99] transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                    <Compass className="w-4 h-4"/>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900">{globalTimezone ? globalTimezone.split(' ')[0] : 'Asia/Kabul'}</p>
                    <span className="text-[10px] font-normal text-slate-500">{globalTimezone.includes('UTC') ? globalTimezone : `${globalTimezone} (UTC +04:30)`}</span>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${isTzOpen ? 'rotate-180 text-indigo-600' : ''}`}/>
              </div>

              {/* Inline Overlaid Dropdown Menu */}
              {isTzOpen && (
                <div className="absolute top-[calc(100%+6px)] left-0 right-0 z-[100] p-1.5 rounded-2xl max-h-48 overflow-y-auto bg-white border border-slate-100 shadow-xl space-y-1">
                  {TIMEZONE_OPTIONS.map((tz) => {
                    const isSelected = globalTimezone?.includes(tz.id);
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
                        <div>
                          <p className="text-xs font-semibold text-slate-900">{tz.label}</p>
                          <span className="text-[10px] text-slate-500">{tz.desc}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* FIELD GROUP 4: CURRENT CITY & DETECTION */}
          <div>
            <div className="flex items-center justify-between mb-2 ml-1 mr-1">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block drop-shadow-sm">
                CURRENT CITY
              </label>
              <button
                type="button"
                onClick={handleAutoDetect}
                disabled={isLocating}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-teal-50 border border-teal-300 text-teal-800 shadow-2xs hover:bg-teal-100 active:scale-95 transition-all cursor-pointer disabled:opacity-60"
              >
                {isLocating ? (
                  <>
                    <Loader2 className="w-2.5 h-2.5 animate-spin text-teal-800" />
                    <span>Detecting...</span>
                  </>
                ) : (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse" />
                    <span>Auto-detect</span>
                  </>
                )}
              </button>
            </div>
            <div className={`relative ${isCityOpen ? 'z-[100]' : 'z-10'}`}>
              <div
                onClick={() => { setIsCityOpen(!isCityOpen); setIsTzOpen(false); }}
                className="p-3 rounded-2xl flex items-center justify-between bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-xs cursor-pointer active:scale-[0.99] transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4"/>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900">{globalCity}</p>
                    <span className="text-[10px] font-normal text-slate-500">{getCityDesc(globalCity)}</span>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${isCityOpen ? 'rotate-180 text-indigo-600' : ''}`}/>
              </div>

              {/* Inline Overlaid City Dropdown Menu */}
              {isCityOpen && (
                <div className="absolute top-[calc(100%+6px)] left-0 right-0 z-[100] p-1.5 rounded-2xl max-h-48 overflow-y-auto bg-white border border-slate-100 shadow-xl space-y-1">
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
                        <div>
                          <p className="text-xs font-semibold text-slate-900">{city.full}</p>
                          <span className="text-[10px] text-slate-500">{city.desc}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* ENCRYPTION & LOCAL STORAGE NOTICE */}
        <div className={`flex items-center gap-1.5 px-2 text-slate-800/90 drop-shadow-sm transition-opacity duration-200 ${isTzOpen || isCityOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <Lock className="w-3 h-3 flex-shrink-0 text-slate-800"/>
          <p className="text-[10px] font-medium leading-tight text-slate-800/90">
            Stored locally &amp; encrypted securely. You can modify settings anytime.
          </p>
        </div>
      </div>

      {/* ACTION BUTTON (Elegantly positioned at bottom) */}
      <div className="w-full max-w-sm pt-4">
        <button
          type="button"
          onClick={handleContinue}
          className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30 active:scale-[0.98] transition-all cursor-pointer"
        >
          <span>Continue to Dashboard</span>
          <ArrowRight className="w-5 h-5 stroke-[2.2]"/>
        </button>
      </div>
    </div>
  );
}