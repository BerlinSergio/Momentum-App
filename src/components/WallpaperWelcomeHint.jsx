import {Image, X} from 'lucide-react';
import {useThemeStore} from '../store/useThemeStore.js';
import {useLocaleStore} from '../store/useLocaleStore.js';
import {useProfileStore} from '../store/useProfileStore.js';
import {toast} from './ui/toast/index.js';
const COPY={
 en:['Make Momentum yours','Your app starts with a plain background. Choose a wallpaper whenever you like in Appearance.','Choose wallpaper','Not now'],
 'fa-AF':['محیط خود را شخصی بسازید','برنامه با پس‌زمینه ساده آغاز می‌شود. هر زمان خواستید، از بخش ظاهر تصویر دلخواه خود را انتخاب کنید.','انتخاب تصویر پس‌زمینه','فعلاً نه'],
 'ps-AF':['Momentum خپل د خوښې مطابق جوړ کړئ','اپلېکېشن له ساده شالید سره پیلېږي. هر وخت د بڼې له برخې د خپلې خوښې والپیپر وټاکئ.','والپیپر وټاکئ','اوس نه']
};
export default function WallpaperWelcomeHint({setActiveTab}) {
 const theme=useThemeStore(s=>s.theme);
 const active=useThemeStore(s=>s.activeBackgroundId);
 const dismissed=useThemeStore(s=>s.wallpaperGuideDismissed);
 const setup=useProfileStore(s=>s.setupCompleted);
 const locale=useLocaleStore(s=>s.currentLocale);
 const c=COPY[locale]||COPY.en;
 if(!setup||dismissed||active!=='none')return null;
 const dismiss=async(open)=>{
   try{
     if(await useThemeStore.getState().dismissWallpaperGuide()!==true)throw Error('Preference write failed');
     if(open)setActiveTab?.('background_wallpaper_library_'+theme+'_mode');
   }catch{toast.error('Could not save preference');}
 };
 return <section data-testid="wallpaper-welcome-guide" className="mb-4 p-4 rounded-2xl border border-primary/20 bg-primary/5">
  <div className="flex gap-2 items-start"><Image className="w-5 h-5 text-primary shrink-0"/><div className="flex-1 min-w-0"><h3 className="text-sm font-semibold">{c[0]}</h3><p className="text-xs mt-1 opacity-80">{c[1]}</p></div><button type="button" aria-label={c[3]} onClick={()=>dismiss(false)}><X className="w-4 h-4"/></button></div>
  <div className="mt-3 flex gap-2 flex-wrap"><button type="button" onClick={()=>dismiss(true)} className="rounded-xl px-3 py-2 bg-indigo-600 text-white text-xs font-semibold">{c[2]}</button><button type="button" onClick={()=>dismiss(false)} className="px-3 py-2 text-xs opacity-80">{c[3]}</button></div>
 </section>;
}
