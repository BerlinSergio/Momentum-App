import React from 'react';

import { MapPin, ArrowLeft } from 'lucide-react';

export default function CitySelectionLightMode({ setActiveTab }) {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden"><div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[120vw] h-[55vh] rounded-full bg-gradient-to-b from-surface-variant/40 via-surface-container/20 to-transparent blur-3xl"></div><div className="absolute top-[40%] right-[-10%] w-[80vw] h-[40vh] rounded-full bg-gradient-to-tr from-secondary-fixed/20 via-tertiary-fixed/10 to-transparent blur-3xl"></div></div>{/* Top Header Bar */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-indigo-950 tracking-tight" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>
            Select City & Location
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setActiveTab && setActiveTab('home_dashboard_light_mode')} className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"><ArrowLeft className="w-5 h-5"/></button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            A
          </div>
        </div>
      </div><main className="flex flex-col relative w-full pb-safe px-margin z-10 flex-1"><div className="flex flex-col w-full pb-52 space-y-4">
{/*  Active Selection Hero Display  */}
<section className="relative w-full rounded-3xl p-5 mb-5 overflow-hidden transition-all duration-300 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-gradient-to-br from-primary-fixed/60 via-secondary-fixed/40 to-transparent blur-2xl pointer-events-none"></div>
<div className="relative z-10 flex flex-col space-y-3">
<div className="flex items-center justify-between">
<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed">
<span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
<span className="font-label-sm text-label-sm tracking-wide uppercase">Active Geolocation</span>
</div>
<div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-primary font-label-md text-label-md">
<span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>check_circle</span>
<span>Selected</span>
</div>
</div>
<div className="flex items-start gap-3.5 pt-1">
<div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-on-primary shadow-[0_8px_20px_-4px_rgba(42,73,223,0.38)] flex-shrink-0">
<span className="material-symbols-outlined text-[26px]">location_on</span>
</div>
<div className="min-w-0 flex-1">
<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight truncate">Kabul</h2>
<p className="font-body-md text-body-md text-on-surface-variant -mt-0.5">Afghanistan</p>
</div>
</div>
<div className="flex flex-wrap items-center gap-2 pt-1">
<div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-high/60 backdrop-blur-md text-on-surface">
<span className="material-symbols-outlined text-primary text-[16px]">explore</span>
<span className="font-body-sm text-body-sm font-medium">34.5553° N, 69.2075° E</span>
</div>
<div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-high/60 backdrop-blur-md text-on-surface">
<span className="material-symbols-outlined text-tertiary text-[16px]">landscape</span>
<span className="font-body-sm text-body-sm font-medium">1,791m MSL</span>
</div>
</div>
<div className="flex flex-row items-center gap-3 p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<span className="material-symbols-outlined text-primary text-[20px] flex-shrink-0">verified</span>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          Accurate elevation and coordinate geocoding ensures exact astronomical solar angle calculations for prayer and fasting schedules.
        </p>
</div>
</div>
</section>
{/*  Search & Instant GPS Locate  */}
<section className="flex flex-col">
<div className="relative flex items-center w-full mb-3">
<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">search</span>
<input className="w-full h-12 pl-12 pr-12 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900 placeholder:text-slate-400" id="citySearchInput" placeholder="Search city or country name..." type="search"/>
<button aria-label="Clear query" className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors" id="clearSearchBtn">
<span className="material-symbols-outlined text-[16px]">close</span>
</button>
</div>
{/*  GPS Button  */}
<button className="w-full flex items-center justify-between p-4 mb-4 rounded-2xl text-left transition-all bg-white/70 backdrop-blur-md border border-white/80 shadow-lg" id="gpsLocateBtn">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
<span className="material-symbols-outlined text-[22px]">my_location</span>
</div>
<div>
<p className="font-headline-sm text-headline-sm text-on-surface">Use Current GPS Location</p>
<p className="font-body-sm text-body-sm text-on-surface-variant">Instant high-precision geocoding via device sensors</p>
</div>
</div>
<span className="material-symbols-outlined text-outline text-[20px]">chevron_right</span>
</button>
</section>
{/*  Region Quick Filter Tabs  */}
<div className="flex items-center gap-2 overflow-x-auto py-2 mb-3 scrollbar-none -mx-margin px-margin">
<button className="region-filter active-tab px-3.5 py-1.5 rounded-full font-label-md text-label-md flex-shrink-0 bg-primary text-on-primary shadow-[0_4px_12px_rgba(42,73,223,0.25)] transition-colors" data-region="afghanistan">Afghanistan</button>
<button className="region-filter px-3.5 py-1.5 rounded-full font-label-md text-label-md flex-shrink-0 bg-surface-container-lowest/80 text-on-surface hover:bg-surface-container shadow-sm transition-colors" data-region="regional">Regional Capitals</button>
<button className="region-filter px-3.5 py-1.5 rounded-full font-label-md text-label-md flex-shrink-0 bg-surface-container-lowest/80 text-on-surface hover:bg-surface-container shadow-sm transition-colors" data-region="islamic">Global Islamic Centers</button>
<button className="region-filter px-3.5 py-1.5 rounded-full font-label-md text-label-md flex-shrink-0 bg-surface-container-lowest/80 text-on-surface hover:bg-surface-container shadow-sm transition-colors" data-region="global">Europe &amp; Americas</button>
</div>
{/*  Dynamic Scannable City List  */}
<section className="rounded-3xl p-4 mb-5 space-y-2.5 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg" id="cityList">
{/*  Kabul (Selected Item)  */}
<div className="city-item w-full rounded-2xl p-3.5 flex items-center justify-between cursor-pointer transition-transform bg-white/70 backdrop-blur-md border border-white/80 shadow-lg" data-coords="34.5553° N, 69.2075° E" data-country="Afghanistan" data-elevation="1,791m" data-name="Kabul" data-region="afghanistan">
<div className="flex items-center gap-3 min-w-0">
<div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary flex-shrink-0 shadow-[0_0_16px_rgba(42,73,223,0.28)]">
<span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: '"FILL" 1'}}>check</span>
</div>
<div className="min-w-0">
<div className="flex items-center gap-2">
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">Kabul</h3>
<span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm">Current</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Afghanistan • 34.5553° N, 69.2075° E • 1,791m</p>
</div>
</div>
<div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-on-primary flex-shrink-0">
<span className="material-symbols-outlined text-[16px]">check</span>
</div>
</div>
{/*  Herat  */}
<div className="city-item w-full rounded-2xl p-3.5 transition-all flex items-center justify-between cursor-pointer bg-white/70 backdrop-blur-md border border-white/80 shadow-lg" data-coords="34.3529° N, 62.2040° E" data-country="Afghanistan" data-elevation="920m" data-name="Herat" data-region="afghanistan">
<div className="flex items-center gap-3 min-w-0">
<div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant flex-shrink-0">
<span className="material-symbols-outlined text-[20px]">near_me</span>
</div>
<div className="min-w-0">
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">Herat</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Afghanistan • 34.3529° N, 62.2040° E • 920m</p>
</div>
</div>
<span className="material-symbols-outlined text-outline text-[20px]">radio_button_unchecked</span>
</div>
{/*  Mazar-i-Sharif  */}
<div className="city-item w-full rounded-2xl p-3.5 transition-all flex items-center justify-between cursor-pointer bg-white/70 backdrop-blur-md border border-white/80 shadow-lg" data-coords="36.7061° N, 67.1108° E" data-country="Afghanistan" data-elevation="380m" data-name="Mazar-i-Sharif" data-region="afghanistan">
<div className="flex items-center gap-3 min-w-0">
<div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant flex-shrink-0">
<span className="material-symbols-outlined text-[20px]">near_me</span>
</div>
<div className="min-w-0">
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">Mazar-i-Sharif</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Afghanistan • 36.7061° N, 67.1108° E • 380m</p>
</div>
</div>
<span className="material-symbols-outlined text-outline text-[20px]">radio_button_unchecked</span>
</div>
{/*  Kandahar  */}
<div className="city-item w-full rounded-2xl p-3.5 transition-all flex items-center justify-between cursor-pointer bg-white/70 backdrop-blur-md border border-white/80 shadow-lg" data-coords="31.6289° N, 65.7372° E" data-country="Afghanistan" data-elevation="1,010m" data-name="Kandahar" data-region="afghanistan">
<div className="flex items-center gap-3 min-w-0">
<div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant flex-shrink-0">
<span className="material-symbols-outlined text-[20px]">near_me</span>
</div>
<div className="min-w-0">
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">Kandahar</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Afghanistan • 31.6289° N, 65.7372° E • 1,010m</p>
</div>
</div>
<span className="material-symbols-outlined text-outline text-[20px]">radio_button_unchecked</span>
</div>
{/*  Jalalabad  */}
<div className="city-item w-full rounded-2xl p-3.5 transition-all flex items-center justify-between cursor-pointer bg-white/70 backdrop-blur-md border border-white/80 shadow-lg" data-coords="34.4265° N, 70.4515° E" data-country="Afghanistan" data-elevation="575m" data-name="Jalalabad" data-region="afghanistan">
<div className="flex items-center gap-3 min-w-0">
<div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant flex-shrink-0">
<span className="material-symbols-outlined text-[20px]">near_me</span>
</div>
<div className="min-w-0">
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">Jalalabad</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Afghanistan • 34.4265° N, 70.4515° E • 575m</p>
</div>
</div>
<span className="material-symbols-outlined text-outline text-[20px]">radio_button_unchecked</span>
</div>
{/*  Makkah  */}
<div className="city-item w-full rounded-2xl p-3.5 transition-all flex items-center justify-between cursor-pointer bg-white/70 backdrop-blur-md border border-white/80 shadow-lg" data-coords="21.3891° N, 39.8579° E" data-country="Saudi Arabia" data-elevation="277m" data-name="Makkah" data-region="islamic">
<div className="flex items-center gap-3 min-w-0">
<div className="w-10 h-10 rounded-xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed flex-shrink-0">
<span className="material-symbols-outlined text-[20px]">mosque</span>
</div>
<div className="min-w-0">
<div className="flex items-center gap-2">
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">Makkah</h3>
<span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm">Holy Sanctuary</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Saudi Arabia • 21.3891° N, 39.8579° E</p>
</div>
</div>
<span className="material-symbols-outlined text-outline text-[20px]">radio_button_unchecked</span>
</div>
{/*  Madinah  */}
<div className="city-item w-full rounded-2xl p-3.5 transition-all flex items-center justify-between cursor-pointer bg-white/70 backdrop-blur-md border border-white/80 shadow-lg" data-coords="24.5247° N, 39.5692° E" data-country="Saudi Arabia" data-elevation="608m" data-name="Madinah" data-region="islamic">
<div className="flex items-center gap-3 min-w-0">
<div className="w-10 h-10 rounded-xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed flex-shrink-0">
<span className="material-symbols-outlined text-[20px]">mosque</span>
</div>
<div className="min-w-0">
<div className="flex items-center gap-2">
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">Madinah</h3>
<span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm">The Prophet's City</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Saudi Arabia • 24.5247° N, 39.5692° E</p>
</div>
</div>
<span className="material-symbols-outlined text-outline text-[20px]">radio_button_unchecked</span>
</div>
{/*  Istanbul  */}
<div className="city-item w-full rounded-2xl p-3.5 transition-all flex items-center justify-between cursor-pointer bg-white/70 backdrop-blur-md border border-white/80 shadow-lg" data-coords="41.0082° N, 28.9784° E" data-country="Turkey" data-elevation="40m" data-name="Istanbul" data-region="regional">
<div className="flex items-center gap-3 min-w-0">
<div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant flex-shrink-0">
<span className="material-symbols-outlined text-[20px]">apartment</span>
</div>
<div className="min-w-0">
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">Istanbul</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Turkey • 41.0082° N, 28.9784° E • 40m</p>
</div>
</div>
<span className="material-symbols-outlined text-outline text-[20px]">radio_button_unchecked</span>
</div>
{/*  Dubai  */}
<div className="city-item w-full rounded-2xl p-3.5 transition-all flex items-center justify-between cursor-pointer bg-white/70 backdrop-blur-md border border-white/80 shadow-lg" data-coords="25.2048° N, 55.2708° E" data-country="United Arab Emirates" data-elevation="11m" data-name="Dubai" data-region="regional">
<div className="flex items-center gap-3 min-w-0">
<div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant flex-shrink-0">
<span className="material-symbols-outlined text-[20px]">apartment</span>
</div>
<div className="min-w-0">
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">Dubai</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">United Arab Emirates • 25.2048° N, 55.2708° E</p>
</div>
</div>
<span className="material-symbols-outlined text-outline text-[20px]">radio_button_unchecked</span>
</div>
{/*  London  */}
<div className="city-item w-full rounded-2xl p-3.5 transition-all flex items-center justify-between cursor-pointer bg-white/70 backdrop-blur-md border border-white/80 shadow-lg" data-coords="51.5072° N, 0.1276° W" data-country="United Kingdom" data-elevation="25m" data-name="London" data-region="global">
<div className="flex items-center gap-3 min-w-0">
<div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant flex-shrink-0">
<span className="material-symbols-outlined text-[20px]">public</span>
</div>
<div className="min-w-0">
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">London</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">United Kingdom • 51.5072° N, 0.1276° W</p>
</div>
</div>
<span className="material-symbols-outlined text-outline text-[20px]">radio_button_unchecked</span>
</div>
{/*  Toronto  */}
<div className="city-item w-full rounded-2xl p-3.5 transition-all flex items-center justify-between cursor-pointer bg-white/70 backdrop-blur-md border border-white/80 shadow-lg" data-coords="43.6532° N, 79.3832° W" data-country="Canada" data-elevation="76m" data-name="Toronto" data-region="global">
<div className="flex items-center gap-3 min-w-0">
<div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant flex-shrink-0">
<span className="material-symbols-outlined text-[20px]">public</span>
</div>
<div className="min-w-0">
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">Toronto</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Canada • 43.6532° N, 79.3832° W</p>
</div>
</div>
<span className="material-symbols-outlined text-outline text-[20px]">radio_button_unchecked</span>
</div>
</section>
{/*  Manual Coordinates Entry Accordion  */}
<section className="rounded-3xl mb-5 overflow-hidden bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<button className="flex items-center justify-between w-full p-4 text-left group" id="toggleManualFormBtn">
<div className="flex items-center gap-3 text-primary font-headline-sm text-headline-sm">
<span className="material-symbols-outlined text-[20px]">tune</span>
<span>Enter custom latitude, longitude &amp; elevation</span>
</div>
<span className="material-symbols-outlined text-outline transition-transform duration-200" id="accordionArrow">expand_more</span>
</button>
<div className="hidden px-4 pb-4 pt-1 flex-col space-y-3" id="manualForm">
<div className="grid grid-cols-2 gap-2">
<div className="flex flex-col space-y-1">
<label className="font-label-sm text-label-sm text-on-surface-variant">Latitude (°N/S)</label>
<input className="h-10 px-3 rounded-xl bg-surface-container-low font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container" placeholder="e.g. 34.5553" type="text"/>
</div>
<div className="flex flex-col space-y-1">
<label className="font-label-sm text-label-sm text-on-surface-variant">Longitude (°E/W)</label>
<input className="h-10 px-3 rounded-xl bg-surface-container-low font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container" placeholder="e.g. 69.2075" type="text"/>
</div>
</div>
<div className="flex flex-col space-y-1">
<label className="font-label-sm text-label-sm text-on-surface-variant">Elevation (Meters Above Sea Level)</label>
<input className="h-10 px-3 rounded-xl bg-surface-container-low font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container" placeholder="e.g. 1791" type="number"/>
</div>
<button className="w-full py-2.5 rounded-xl bg-surface-container-highest text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors">
        Apply Custom Coordinates
      </button>
</div>
</section>
{/*  Sticky Confirmation Bar  */}
<div className="fixed bottom-0 inset-x-0 z-40 px-margin pt-3 pb-6 bg-gradient-to-t from-white via-white/80 to-transparent">
<button className="btn-primary w-full" id="confirmCityBtn">
<span>Confirm City &amp; Update Solar Rhythms</span>
<span className="material-symbols-outlined text-[20px]">arrow_forward</span>
</button>
</div>
</div>
</main>
    </>
  );
}
