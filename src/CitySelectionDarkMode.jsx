import { useTranslation } from 'react-i18next';
import MomentumGlassHeader from './components/MomentumGlassHeader';
import { useState, useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import UserAvatar from './components/UserAvatar';
import { useLocationStore, CITIES_DATA } from './store/useLocationStore';
import { detectAndApplyNativeLocation } from './utils/nativeLocation';
import { toast } from './components/ui/toast/index.js';

export default function CitySelectionDarkMode({ setActiveTab, goBack }) {
  const { t } = useTranslation();
  const globalSelectedCity = useLocationStore((s) => s.selectedCity);
  const setSelectedCity = useLocationStore((s) => s.setSelectedCity);
  const setCustomCoordinates = useLocationStore((s) => s.setCustomCoordinates);

  const [localSelectedCity, setLocalSelectedCity] = useState(() => globalSelectedCity || CITIES_DATA[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [isManualOpen, setIsManualOpen] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [customApplied, setCustomApplied] = useState(() => Boolean(globalSelectedCity?.isCustom));
  const [manualLat, setManualLat] = useState(() => (globalSelectedCity?.isCustom && globalSelectedCity?.latitude != null ? String(globalSelectedCity.latitude) : '34.5553'));
  const [manualLng, setManualLng] = useState(() => (globalSelectedCity?.isCustom && globalSelectedCity?.longitude != null ? String(globalSelectedCity.longitude) : '69.2075'));
  const [manualElev, setManualElev] = useState(() => (globalSelectedCity?.isCustom && globalSelectedCity?.elevationMeters != null ? String(globalSelectedCity.elevationMeters) : '1791'));

  const filteredCities = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return CITIES_DATA.filter((city) => {
      const matchesRegion = !selectedRegion || city.region === selectedRegion;
      const matchesQuery = !q || city.name.toLowerCase().includes(q) || city.country.toLowerCase().includes(q);
      return matchesRegion && matchesQuery;
    });
  }, [searchQuery, selectedRegion]);

  const handleUseGps = async () => {
    setIsLocating(true);
    setCustomApplied(false);
    setLocalSelectedCity((prev) => ({
      ...(prev || {}),
      id: 'gps-pending',
      name: 'Locating via GPS...',
      country: 'Resolving coordinates...',
      badge: 'Locating...',
      icon: 'my_location',
    }));

    const result = await detectAndApplyNativeLocation({ highAccuracy: true, timeout: 10000 });
    setIsLocating(false);

    if (result.success) {
      const activeLoc = useLocationStore.getState().selectedCity;
      setLocalSelectedCity(activeLoc);
      toast.success(t('toasts.gpsLocationDetected', 'Current location detected via GPS'));
    } else {
      setLocalSelectedCity(globalSelectedCity || CITIES_DATA[0]);
      toast.error(result.error || 'Could not obtain current GPS position');
    }
  };

  const handleApplyCustomCoords = (e) => {
    if (e) e.preventDefault();
    const lat = parseFloat(manualLat);
    const lng = parseFloat(manualLng);
    const elev = parseInt(manualElev, 10);
    if (isNaN(lat) || lat < -90 || lat > 90) {
      toast.error(t('toasts.validLatitude', 'Please enter a valid latitude between -90 and 90'));
      return;
    }
    if (isNaN(lng) || lng < -180 || lng > 180) {
      toast.error(t('toasts.validLongitude', 'Please enter a valid longitude between -180 and 180'));
      return;
    }
    const latFormatted = `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? 'N' : 'S'}`;
    const lngFormatted = `${Math.abs(lng).toFixed(4)}° ${lng >= 0 ? 'E' : 'W'}`;
    const elevFormatted = !isNaN(elev) ? `${elev}m MSL` : 'Custom MSL';
    const customLoc = {
      id: `custom-${Date.now()}`,
      name: 'Custom Coordinates',
      country: 'User Defined Location',
      region: 'custom',
      coords: `${latFormatted}, ${lngFormatted}`,
      latitude: lat,
      longitude: lng,
      elevation: elevFormatted,
      elevationMeters: !isNaN(elev) ? elev : 0,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kabul',
      isCustom: true,
      mode: 'manual',
      status: 'configured',
      badge: 'Custom',
      icon: 'tune',
    };
    setLocalSelectedCity(customLoc);
    if (setCustomCoordinates) {
      setCustomCoordinates({
        latitude: lat,
        longitude: lng,
        elevation: elev,
        name: 'Custom Coordinates',
        country: 'User Defined Location',
      });
    } else {
      setSelectedCity(customLoc);
    }
    setCustomApplied(true);
    setIsManualOpen(false);
    toast.success(t('toasts.customCoordinatesApplied', 'Custom coordinates applied'));
  };

  const handleSelectCity = (city) => {
    setLocalSelectedCity(city);
    setCustomApplied(false);
    setSelectedCity(city);
    toast.success(`Location set to ${city.name}`);
  };

  const handleConfirmCity = () => {
    if (localSelectedCity) {
      setSelectedCity(localSelectedCity);
    }
    if (goBack) {
      goBack('settings_profile_dark_mode');
    } else if (setActiveTab) {
      setActiveTab('settings_profile_dark_mode');
    } else if (typeof window !== 'undefined' && window.history) {
      window.history.back();
    }
  };

  const handleBack = () => {
    if (goBack) {
      goBack('settings_profile_dark_mode');
    } else if (setActiveTab) {
      setActiveTab('settings_profile_dark_mode');
    } else if (typeof window !== 'undefined' && window.history) {
      window.history.back();
    }
  };

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[120vw] h-[55vh] rounded-full bg-gradient-to-b from-primary/10 via-secondary/5 to-transparent blur-3xl"></div>
        <div className="absolute top-[40%] right-[-10%] w-[80vw] h-[40vh] rounded-full bg-gradient-to-tr from-secondary/10 via-tertiary/5 to-transparent blur-3xl"></div>
      </div>

      {/* Top Header Bar (Standardized: Back arrow on far left, clean title, no redundant icon or avatar) */}
      <MomentumGlassHeader isDarkMode={true}>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleBack}
            aria-label="Go back"
            className="p-2 -ml-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer pointer-events-auto"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-bold text-white tracking-tight">
            {t('calendar.selectCityLocation', 'Select City & Location')}
          </h1>
        </div>
        <UserAvatar setActiveTab={setActiveTab} />
      </MomentumGlassHeader>

      <main className="flex flex-col relative w-full pb-36 px-margin z-10 flex-1">
        <div className="flex flex-col w-full space-y-4">
          {/* Active Selection Hero Display */}
          <section className="relative w-full rounded-3xl p-5 mb-1 overflow-hidden transition-all duration-300 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
            <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-gradient-to-br from-primary/30 via-secondary/20 to-transparent blur-2xl pointer-events-none"></div>
            <div className="relative z-10 flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  <span className="font-label-sm text-label-sm font-semibold tracking-wide uppercase">{t('calendar.activeGeolocation', 'Active Geolocation')}</span>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/15 text-primary font-semibold text-xs border border-primary/25">
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
                  <span>{t('calendar.selected', 'Selected')}</span>
                </div>
              </div>
              <div className="flex items-start gap-3.5 pt-1">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-lg shadow-primary/25 flex-shrink-0">
                  <span className="material-symbols-outlined text-[26px]">location_on</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-headline-lg text-headline-lg text-white font-bold tracking-tight truncate">
                    {isLocating && localSelectedCity?.name === 'Locating city...' ? (
                      <span className="flex items-center gap-2 text-primary animate-pulse">
                        <span className="material-symbols-outlined text-[22px] animate-spin">progress_activity</span>
                        Locating city...
                      </span>
                    ) : (
                      localSelectedCity?.name || t('cities.kabul', 'Kabul')
                    )}
                  </h2>
                  <p className="font-body-md text-body-md text-slate-400 -mt-0.5">
                    {isLocating && localSelectedCity?.country === 'Resolving GPS coordinates...' ? (
                      t('calendar.resolvingGps', 'Resolving GPS coordinates...')
                    ) : (
                      localSelectedCity?.country || t('countries.afghanistan', 'Afghanistan')
                    )}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-high/60 backdrop-blur-xl text-white">
                  <span className="material-symbols-outlined text-primary text-[16px]">explore</span>
                  <span className="font-body-sm text-body-sm font-medium">{localSelectedCity?.coords || '34.5553° N, 69.2075° E'}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-high/60 backdrop-blur-xl text-white">
                  <span className="material-symbols-outlined text-tertiary text-[16px]">landscape</span>
                  <span className="font-body-sm text-body-sm font-medium">{localSelectedCity?.elevation || '1,791m MSL'}</span>
                </div>
              </div>
              <div className="flex flex-row items-center gap-3 p-3.5 rounded-2xl bg-surface-container/70 backdrop-blur-xl border border-white/10 shadow-md">
                <span className="material-symbols-outlined text-primary text-[20px] flex-shrink-0">verified</span>
                <p className="font-body-sm text-body-sm text-slate-400 leading-relaxed">
                  {t('calendar.elevationGeocodingDesc', 'Accurate elevation and coordinate geocoding ensures exact astronomical solar angle calculations for prayer and fasting schedules.')}
                </p>
              </div>
            </div>
          </section>

          {/* Quick link to Timezone Selection */}
          <div
            onClick={() => setActiveTab && setActiveTab('timezone_selection_dark_mode')}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 cursor-pointer transition-all active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">schedule</span>
              </div>
              <div className="text-left">
                <span className="text-xs font-semibold text-white block">{t('calendar.needAdjustTimezone', 'Need to adjust timezone instead?')}</span>
                <span className="text-[11px] text-slate-400 block">{t('calendar.switchToAstronomicalTimezone', 'Switch to Astronomical Timezone Selection')}</span>
              </div>
            </div>
            <span className="text-xs font-semibold text-primary flex items-center gap-1">
              {t('calendar.timezone', 'Timezone')} <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </span>
          </div>

          {/* Search & Instant GPS Locate */}
          <section className="flex flex-col">
            <div className="relative flex items-center w-full mb-3">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px] pointer-events-none">search</span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-12 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-white placeholder:text-slate-500 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                id="citySearchInput"
                placeholder={t('calendar.searchCityPlaceholder', 'Search city or country name...')}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear query"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white active:scale-90 transition-transform cursor-pointer select-none"
                  id="clearSearchBtn"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
            </div>

            {/* GPS Button */}
            <button
              type="button"
              onClick={handleUseGps}
              disabled={isLocating}
              className="w-full flex items-center justify-between p-4 mb-3 rounded-2xl text-left transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer select-none bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl hover:border-primary/40 pointer-events-auto"
              id="gpsLocateBtn"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center text-primary flex-shrink-0">
                  <span className={`material-symbols-outlined text-[22px] ${isLocating ? 'animate-spin' : ''}`}>my_location</span>
                </div>
                <div>
                  <p className="font-headline-sm text-headline-sm text-white font-semibold">
                    {isLocating ? t('city.resolvingGpsCityCountry', 'Resolving GPS City & Country...') : t('calendar.useGps', 'Use Current GPS Location')}
                  </p>
                  <p className="font-body-sm text-body-sm text-slate-400">
                    {isLocating ? t('city.queryingSensors', 'Querying device sensors & reverse geocoding...') : t('calendar.gpsPrecisionDesc', 'Instant high-precision geocoding via device sensors')}
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-[20px] flex-shrink-0">
                {isLocating ? 'hourglass_empty' : 'chevron_right'}
              </span>
            </button>
          </section>

          {/* Region Quick Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 mb-2 scrollbar-none -mx-margin px-margin">
            <button
              type="button"
              onClick={() => setSelectedRegion(selectedRegion === 'afghanistan' ? null : 'afghanistan')}
              className={`region-filter px-3.5 py-1.5 rounded-full font-label-md text-label-md flex-shrink-0 transition-all active:scale-95 cursor-pointer select-none ${
                selectedRegion === 'afghanistan' ? 'bg-primary text-white shadow-[0_4px_12px_rgba(42,73,223,0.25)]' : 'bg-surface-container-lowest/80 text-slate-300 hover:bg-surface-container shadow-sm'
              }`}
              data-region="afghanistan"
            >
              Afghanistan
            </button>
            <button
              type="button"
              onClick={() => setSelectedRegion(selectedRegion === 'regional' ? null : 'regional')}
              className={`region-filter px-3.5 py-1.5 rounded-full font-label-md text-label-md flex-shrink-0 transition-all active:scale-95 cursor-pointer select-none ${
                selectedRegion === 'regional' ? 'bg-primary text-white shadow-[0_4px_12px_rgba(42,73,223,0.25)]' : 'bg-surface-container-lowest/80 text-slate-300 hover:bg-surface-container shadow-sm'
              }`}
              data-region="regional"
            >
              Regional Capitals
            </button>
            <button
              type="button"
              onClick={() => setSelectedRegion(selectedRegion === 'islamic' ? null : 'islamic')}
              className={`region-filter px-3.5 py-1.5 rounded-full font-label-md text-label-md flex-shrink-0 transition-all active:scale-95 cursor-pointer select-none ${
                selectedRegion === 'islamic' ? 'bg-primary text-white shadow-[0_4px_12px_rgba(42,73,223,0.25)]' : 'bg-surface-container-lowest/80 text-slate-300 hover:bg-surface-container shadow-sm'
              }`}
              data-region="islamic"
            >
              Global Islamic Centers
            </button>
            <button
              type="button"
              onClick={() => setSelectedRegion(selectedRegion === 'global' ? null : 'global')}
              className={`region-filter px-3.5 py-1.5 rounded-full font-label-md text-label-md flex-shrink-0 transition-all active:scale-95 cursor-pointer select-none ${
                selectedRegion === 'global' ? 'bg-primary text-white shadow-[0_4px_12px_rgba(42,73,223,0.25)]' : 'bg-surface-container-lowest/80 text-slate-300 hover:bg-surface-container shadow-sm'
              }`}
              data-region="global"
            >
              Europe &amp; Americas
            </button>
          </div>

          {/* Dynamic Scannable City List with Strict Uniform Flex Column Layout */}
          <section className="rounded-3xl p-4 mb-6 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl" id="cityList">
            {filteredCities.length === 0 ? (
              <div className="w-full my-4 p-8 rounded-2xl border backdrop-blur-xl flex flex-col items-center justify-center text-center bg-slate-900/60 border-white/10 shadow-sm">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-primary/10 text-primary">
                  <span className="material-symbols-outlined text-[32px]">location_off</span>
                </div>
                <h3 className="text-base font-semibold mb-1 text-white">
                  {t('calendar.noMatchingCities', 'No Matching Cities Found')}
</h3>
<p className="text-xs max-w-[240px] leading-relaxed mb-5 text-slate-400">
                  {t('calendar.noLocationsFound', "We couldn't find any locations matching your search. Check the spelling or enter custom coordinates below.")}
                </p>
                <button
                  type="button"
                  onClick={() => { setSearchQuery(''); setSelectedRegion(null); }}
                  className="px-5 py-2.5 rounded-xl font-medium text-xs flex items-center gap-2 bg-primary text-white shadow-md active:scale-95 transition-all cursor-pointer select-none"
                >
                  {t('common.clearFilter', 'Clear Search Filter')}
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filteredCities.map((city) => {
                  const isSelected = !localSelectedCity?.isCustom &&
                    ((localSelectedCity?.id && localSelectedCity.id === city.id) ||
                     (localSelectedCity?.name && localSelectedCity.name === city.name));
                  return (
                    <div
                      key={city.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => handleSelectCity(city)}
                      className={`city-item w-full rounded-2xl p-3.5 flex items-center justify-between cursor-pointer select-none transition-all duration-200 ease-out active:scale-[0.98] ${
                        isSelected ? 'bg-primary/20 border border-primary shadow-lg shadow-primary/20 ring-1 ring-primary/40' : 'bg-black/40 hover:bg-slate-800/70 border border-white/10 shadow-xl'
                      }`}
                      data-coords={city.coords}
                      data-country={city.country}
                      data-elevation={city.elevation}
                      data-name={city.name}
                      data-region={city.region}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1 pr-2">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                          isSelected ? 'bg-primary text-white shadow-md shadow-primary/30' : 'bg-surface-container/70 backdrop-blur-xl border border-white/10 shadow-md text-slate-400'
                        }`}>
                          <span className="material-symbols-outlined text-[20px]" style={isSelected ? { fontVariationSettings: '"FILL" 1' } : {}}>
                            {isSelected ? 'check' : (city.icon || 'near_me')}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className={`font-headline-sm text-headline-sm font-semibold truncate ${isSelected ? 'text-white font-bold' : 'text-white'}`}>
                              {city.name}
                            </h3>
                            {city.badge && (
                              <span className={`px-2 py-0.5 rounded-full font-label-sm text-[10px] tracking-wider uppercase font-semibold shrink-0 ${
                                isSelected ? 'bg-primary text-white' : 'bg-primary/15 text-primary'
                              }`}>
                                {city.badge}
                              </span>
                            )}
                          </div>
                          <p className="font-body-sm text-body-sm text-slate-400 truncate">
                            {`${city.country} • ${city.coords} • ${city.elevation}`}
                          </p>
                        </div>
                      </div>
                      {isSelected ? (
                        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                          <span className="material-symbols-outlined text-[16px]">check</span>
                        </div>
                      ) : (
                        <span className="material-symbols-outlined text-slate-400 text-[20px] flex-shrink-0">
                          radio_button_unchecked
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Functional Custom Coordinates Entry Accordion with Visual Highlight */}
          <section className={`rounded-3xl mb-6 overflow-hidden transition-all duration-300 ${localSelectedCity?.isCustom ? 'border border-primary/50 shadow-lg shadow-primary/10 ring-1 ring-primary/30 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl' : 'bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl'}`}>
            <button
              type="button"
              onClick={() => setIsManualOpen(!isManualOpen)}
              className="flex items-center justify-between w-full p-4 text-left group cursor-pointer select-none pointer-events-auto"
              id="toggleManualFormBtn"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] text-primary">tune</span>
                <span className="font-headline-sm text-headline-sm font-semibold text-white">
                  {t('calendar.customCoordsPrompt', 'Enter custom latitude, longitude & elevation')}
                </span>
                {localSelectedCity?.isCustom && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/20 text-primary uppercase tracking-wider">
                    {t('common.active', 'Active')}
                  </span>
                )}
              </div>
              <span className={`material-symbols-outlined ${'text-slate-400'} transition-transform duration-200 ${isManualOpen ? 'rotate-180' : ''}`} id="accordionArrow">
                expand_more
              </span>
            </button>
            <div className={`${isManualOpen ? 'flex' : 'hidden'} px-4 pb-4 pt-1 flex-col space-y-3`} id="manualForm">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col space-y-1">
                  <label className="font-label-sm text-label-sm text-slate-400">{t('calendar.latitudeLabel', 'Latitude (°N/S)')}</label>
                  <input
                    value={manualLat}
                    onChange={(e) => setManualLat(e.target.value)}
                    className="h-10 px-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-white placeholder:text-slate-500 font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary/40"
                    placeholder="e.g. 34.5553"
                    type="text"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="font-label-sm text-label-sm text-slate-400">{t('calendar.longitudeLabel', 'Longitude (°E/W)')}</label>
                  <input
                    value={manualLng}
                    onChange={(e) => setManualLng(e.target.value)}
                    className="h-10 px-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-white placeholder:text-slate-500 font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary/40"
                    placeholder="e.g. 69.2075"
                    type="text"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1">
                <label className="font-label-sm text-label-sm text-slate-400">{t('calendar.elevationLabel', 'Elevation (Meters Above Sea Level)')}</label>
                <input
                  value={manualElev}
                  onChange={(e) => setManualElev(e.target.value)}
                  className="h-10 px-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-white placeholder:text-slate-500 font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary/40"
                  placeholder="e.g. 1791"
                  type="number"
                />
              </div>
              <button
                type="button"
                onClick={handleApplyCustomCoords}
                className="w-full py-2.5 rounded-xl bg-primary text-white font-label-md text-label-md hover:bg-primary/90 active:scale-95 transition-all cursor-pointer select-none shadow-md shadow-primary/20 flex items-center justify-center gap-2"
                id="applyCustomCoordsBtn"
              >
                {customApplied && localSelectedCity?.isCustom ? (
                  <>
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    <span>{t('calendar.customCoordsApplied', 'Custom Coordinates Applied to Global System')}</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">check</span>
                    <span>{t('calendar.applyCustomCoordinates', 'Apply Custom Coordinates')}</span>
                  </>
                )}
              </button>
            </div>
          </section>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleConfirmCity}
              className="btn-primary w-full h-12 py-3 rounded-2xl text-sm font-semibold shadow-lg shadow-primary/30 flex items-center justify-center gap-2 cursor-pointer select-none"
              id="confirmCityBtn"
            >
              <span>{t('calendar.confirmCityUpdate', 'Confirm City & Update Solar Rhythms')}</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
