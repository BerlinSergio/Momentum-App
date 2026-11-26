import {useEffect,useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Capacitor} from '@capacitor/core';
import {App} from '@capacitor/app';
import {ArrowLeft,Info,Calendar,ShieldCheck,Sparkles,Compass,Type,Palette,Globe} from 'lucide-react';
import UserAvatar from './UserAvatar';
import MomentumGlassHeader from './MomentumGlassHeader';
import packageInfo from '../../package.json';

export default function AboutMomentumContent({isDark,setActiveTab,goBack}){
  const {t}=useTranslation();
  const [info,setInfo]=useState(null);
  const native=Capacitor.isNativePlatform();
  useEffect(()=>{
    if(!native)return;
    let live=true;
    App.getInfo().then(result=>{if(live)setInfo(result);}).catch(()=>{});
    return()=>{live=false;};
  },[native]);
  const target='settings_profile_'+(isDark?'dark':'light')+'_mode';
  const back=()=>goBack?goBack(target):setActiveTab?setActiveTab(target):window.history.back();
  const surface=isDark?'bg-slate-950/90 border-white/10 text-white':'bg-white/90 border-slate-200 text-slate-900';
  const muted=isDark?'text-slate-300':'text-slate-600';
  const iconBox=isDark?'bg-white/5 border-white/10':'bg-indigo-50 border-indigo-100';
  const features=[
    [Calendar,t('about.triCalendarHarmony','Tri-Calendar Harmony'),t('about.triCalendarDesc','Gregorian, lunar Hijri and Afghan Solar calendars.')],
    [ShieldCheck,t('about.privateSanctuary','Private Local Sanctuary'),t('about.localStorageDetails','Your notes, financial records and habits are stored on this device. Export an encrypted backup before changing devices.')],
    [Sparkles,t('about.atmosphericPresence','Atmospheric Presence'),t('about.atmosphericPresenceDesc','Adaptive themes crafted for visual calm and eye comfort.')],
  ];
  return <>
    <MomentumGlassHeader isDarkMode={isDark}>
      <div className="flex items-center gap-2 min-w-0">
        <button type="button" aria-label={t('common.back','Go back')} onClick={back} className="p-2 rounded-full shrink-0"><ArrowLeft className="w-5 h-5 rtl:rotate-180"/></button>
        <span className="w-9 h-9 rounded-2xl bg-primary text-white grid place-items-center shrink-0"><Info className="w-5 h-5"/></span>
        <h1 className="text-base font-bold truncate">{t('about.aboutMomentum','About Momentum')}</h1>
      </div>
      <UserAvatar setActiveTab={setActiveTab}/>
    </MomentumGlassHeader>
    <main data-testid="about-momentum" className="w-full max-w-3xl mx-auto px-4 sm:px-6 pt-4 pb-3 space-y-4">
      <section className={`rounded-3xl border p-5 sm:p-7 ${surface}`}>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-start">
          <img src="/logo.png" alt={t('common.logoAlt','Momentum logo')} className="w-20 h-20 sm:w-24 sm:h-24 rounded-[1.5rem] object-cover shrink-0 shadow-lg"/>
          <div className="min-w-0">
            <h2 className="text-3xl font-bold tracking-tight">Momentum</h2>
            <p className={`text-sm leading-relaxed mt-1 ${muted}`}>{t('about.sacredTimePhilosophy','Where sacred time meets mindful living.')}</p>
            <p className="mt-3 text-xs font-semibold text-primary" dir="auto">
              {native?(info?t('about.actualVersion','Version {{version}} · Build {{build}}',{version:info.version,build:info.build}):t('about.versionUnavailable','Version information unavailable')):t('about.webVersion','Web build {{version}}',{version:packageInfo.version})}
            </p>
          </div>
        </div>
        <div className={`mt-5 pt-4 border-t ${isDark?'border-white/10':'border-slate-200'} flex items-start gap-3`}>
          <Compass className="w-5 h-5 text-primary shrink-0 mt-0.5"/>
          <div><h3 className="text-sm font-bold">{t('about.createdBy','Created by Milad Wardak')}</h3><p className={`text-xs leading-relaxed mt-1 ${muted}`}>{t('about.traditionDesign','Bridging timeless Islamic tradition with modern, mindful design.')}</p></div>
        </div>
      </section>
      <section className="space-y-3">
        <h3 className={`text-sm font-semibold px-1 ${muted}`}>{t('about.corePhilosophy','Core Philosophy')}</h3>
        <div className="grid sm:grid-cols-3 gap-3">{features.map(([Icon,title,description])=><article key={title} className={`rounded-2xl border p-4 ${surface}`}>
          <div className={`w-10 h-10 rounded-xl border grid place-items-center mb-3 ${iconBox}`}><Icon className="w-5 h-5 text-primary"/></div>
          <h4 className="text-sm font-bold leading-snug">{title}</h4><p className={`mt-1 text-xs leading-relaxed ${muted}`}>{description}</p>
        </article>)}</div>
      </section>
      <section className={`rounded-2xl border p-4 ${surface}`}>
        <h3 className="text-sm font-bold mb-2">{t('about.openSourceCraft','Open Source & Craft')}</h3>
        {[[Type,t('about.typography','Typography'),'Inter · Space Grotesk · Vazirmatn · Noto Sans Arabic'],[Globe,t('about.astronomicalEngine','Astronomical Engine'),'Adhan · Intl / Umm al-Qura'],[Palette,t('about.designSystem','Design System'),t('about.designSystemDesc','Luminous Serenity Nocturne')]].map(([Icon,label,value])=>
          <div key={label} className={`flex items-start gap-3 py-3 border-t ${isDark?'border-white/10':'border-slate-200'}`}>
            <Icon className="w-4 h-4 text-primary shrink-0 mt-0.5"/>
            <div className="min-w-0 flex-1"><p className="text-xs font-semibold">{label}</p><p className={`text-xs break-words mt-1 ${muted}`} dir="auto">{value}</p></div>
          </div>)}
      </section>
      <footer className={`py-3 text-center space-y-2 ${muted}`}>
        <p className="text-sm italic">{t('about.craftedWithPeace','Crafted with peace for intentional minds everywhere.')}</p>
        <p className="text-xs">{t('about.allRightsReserved','© 2026 Momentum App · All Rights Reserved.')}</p>
      </footer>
    </main>
  </>;
}
