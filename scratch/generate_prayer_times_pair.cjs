const fs = require('fs');
const path = require('path');

function generatePrayerTimesPair() {
  const darkLines = [];
  const lightLines = [];

  function addPair(dark, light) {
    darkLines.push(dark);
    lightLines.push(light);
  }

  addPair("import React from 'react';", "import React from 'react';");
  addPair("import UserAvatar from './components/UserAvatar';", "import UserAvatar from './components/UserAvatar';");
  addPair("import { useLocationStore } from './store/useLocationStore';", "import { useLocationStore } from './store/useLocationStore';");
  addPair("import { usePrayerStore } from './store/usePrayerStore';", "import { usePrayerStore } from './store/usePrayerStore';");
  addPair("import {", "import {");
  addPair("  Sparkles, Bell, BellRing, MapPin, Compass, Calendar, CheckCircle2, Bookmark, ArrowLeft", "  Sparkles, Bell, BellRing, MapPin, Compass, Calendar, CheckCircle2, Bookmark, ArrowLeft");
  addPair("} from 'lucide-react';", "} from 'lucide-react';");
  addPair("", "");
  addPair("export default function PrayerTimesDarkMode({ setActiveTab, goBack }) {", "export default function PrayerTimesLightMode({ setActiveTab, goBack }) {");
  addPair("  const selectedCity = useLocationStore((s) => s.selectedCity);", "  const selectedCity = useLocationStore((s) => s.selectedCity);");
  addPair("  const prayers = usePrayerStore((s) => s.prayers);", "  const prayers = usePrayerStore((s) => s.prayers);");
  addPair("  const togglePrayer = usePrayerStore((s) => s.togglePrayer);", "  const togglePrayer = usePrayerStore((s) => s.togglePrayer);");
  addPair("  return (", "  return (");
  addPair("    <div className=\"min-h-screen bg-slate-950 flex flex-col pb-28 text-white font-sans\">", "    <div className=\"min-h-screen bg-slate-50 flex flex-col pb-28 text-slate-900 font-sans\">");
  addPair("      {/* Top Header */}", "      {/* Top Header */}");
  addPair("      <div className=\"sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex items-center justify-between px-5 pt-6 pb-2\">", "      <div className=\"sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex items-center justify-between px-5 pt-6 pb-2\">");
  addPair("        <div className=\"flex items-center gap-3\">", "        <div className=\"flex items-center gap-3\">");
  addPair("          <div className=\"w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30\">", "          <div className=\"w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30\">");
  addPair("            <Sparkles className=\"w-5 h-5 text-white\" />", "            <Sparkles className=\"w-5 h-5 text-white\" />");
  addPair("          </div>", "          </div>");
  addPair("          <h1 className=\"text-base font-bold text-white tracking-tight\">Prayer Times</h1>", "          <h1 className=\"text-base font-bold text-slate-900 tracking-tight\">Prayer Times</h1>");
  addPair("        </div>", "        </div>");
  addPair("        <div className=\"flex items-center gap-2\">", "        <div className=\"flex items-center gap-2\">");
  addPair("          <button className=\"p-2 rounded-full text-slate-400 hover:bg-slate-800 transition-colors cursor-pointer pointer-events-auto\">", "          <button className=\"p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer pointer-events-auto\">");
  addPair("            <Bell className=\"w-5 h-5\" />", "            <Bell className=\"w-5 h-5\" />");
  addPair("          </button>", "          </button>");
  addPair("          <UserAvatar setActiveTab={setActiveTab} />", "          <UserAvatar setActiveTab={setActiveTab} />");
  addPair("        </div>", "        </div>");
  addPair("      </div>", "      </div>");
  addPair("", "");
  addPair("      {/* Title & Alerts Row */}", "      {/* Title & Alerts Row */}");
  addPair("      <div className=\"flex items-center justify-between px-5 pt-2 pb-1\">", "      <div className=\"flex items-center justify-between px-5 pt-2 pb-1\">");
  addPair("        <div>", "        <div>");
  addPair("          <h2 className=\"text-xl font-bold text-white tracking-tight\">Prayer Times</h2>", "          <h2 className=\"text-xl font-bold text-slate-900 tracking-tight\">Prayer Times</h2>");
  addPair("          <p className=\"text-xs font-normal text-slate-400 mt-0.5\">Stay connected to your spiritual rhythm</p>", "          <p className=\"text-xs font-normal text-slate-500 mt-0.5\">Stay connected to your spiritual rhythm</p>");
  addPair("        </div>", "        </div>");
  addPair("        <span className=\"inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 border border-primary/30 text-primary shadow-2xs\">", "        <span className=\"inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 border border-primary/20 text-primary shadow-2xs\">");
  addPair("          <BellRing className=\"w-3.5 h-3.5 text-primary\" />", "          <BellRing className=\"w-3.5 h-3.5 text-primary\" />");
  addPair("          Alerts On", "          Alerts On");
  addPair("        </span>", "        </span>");
  addPair("      </div>", "      </div>");
  addPair("", "");
  addPair("      {/* Location & Dual Calendar Strip */}", "      {/* Location & Dual Calendar Strip */}");
  addPair("      <div className=\"block mx-5 my-3 p-4 rounded-3xl space-y-2.5 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl\">", "      <div className=\"block mx-5 my-3 p-4 rounded-3xl space-y-2.5 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg\">");
  addPair("        <div className=\"flex items-center justify-between\">", "        <div className=\"flex items-center justify-between\">");
  addPair("          <div className=\"flex items-center gap-2\">", "          <div className=\"flex items-center gap-2\">");
  addPair("            <MapPin className=\"w-4 h-4 text-primary\" />", "            <MapPin className=\"w-4 h-4 text-primary\" />");
  addPair("            <span className=\"text-xs font-bold text-white\">{`${selectedCity?.name || 'Kabul'}, ${selectedCity?.country || 'Afghanistan'}`}</span>", "            <span className=\"text-xs font-bold text-slate-900\">{`${selectedCity?.name || 'Kabul'}, ${selectedCity?.country || 'Afghanistan'}`}</span>");
  addPair("            <span className=\"px-2 py-0.5 rounded-full text-[9px] font-bold bg-primary/20 text-primary border border-primary/30\">AUTO</span>", "            <span className=\"px-2 py-0.5 rounded-full text-[9px] font-bold bg-primary/10 text-primary border border-primary/20\">AUTO</span>");
  addPair("          </div>", "          </div>");
  addPair("          <div className=\"flex items-center gap-1 text-xs font-semibold text-violet-300 bg-violet-500/20 px-2.5 py-0.5 rounded-full border border-violet-500/30\">", "          <div className=\"flex items-center gap-1 text-xs font-semibold text-violet-600 bg-violet-50 px-2.5 py-0.5 rounded-full border border-violet-200\">");
  addPair("            <Compass className=\"w-3.5 h-3.5 text-violet-400\" />", "            <Compass className=\"w-3.5 h-3.5 text-violet-500\" />");
  addPair("            <span>247° WSW</span>", "            <span>247° WSW</span>");
  addPair("          </div>", "          </div>");
  addPair("        </div>", "        </div>");
  addPair("        <div className=\"flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] font-medium text-slate-400\">", "        <div className=\"flex items-center justify-between pt-2 border-t border-slate-200 text-[11px] font-medium text-slate-500\">");
  addPair("          <div className=\"flex items-center gap-1.5\">", "          <div className=\"flex items-center gap-1.5\">");
  addPair("            <Calendar className=\"w-3.5 h-3.5 text-slate-500\" />", "            <Calendar className=\"w-3.5 h-3.5 text-slate-400\" />");
  addPair("            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}</span>", "            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}</span>");
  addPair("          </div>", "          </div>");
  addPair("          <span className=\"font-semibold text-slate-300\">13 Rabi' al-Thani 1448 AH</span>", "          <span className=\"font-semibold text-slate-700\">13 Rabi' al-Thani 1448 AH</span>");
  addPair("        </div>", "        </div>");
  addPair("      </div>", "      </div>");
  addPair("", "");
  addPair("      {/* Next Prayer Hero Card */}", "      {/* Next Prayer Hero Card */}");
  addPair("      <div className=\"block mx-5 mb-5 p-5 rounded-3xl space-y-4 relative overflow-hidden bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl\">", "      <div className=\"block mx-5 mb-5 p-5 rounded-3xl space-y-4 relative overflow-hidden bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg\">");
  addPair("        <div className=\"flex items-center justify-between\">", "        <div className=\"flex items-center justify-between\">");
  addPair("          <div className=\"inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20\">", "          <div className=\"inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10\">");
  addPair("            <span className=\"w-2 h-2 rounded-full bg-primary animate-pulse\"></span>", "            <span className=\"w-2 h-2 rounded-full bg-primary animate-pulse\"></span>");
  addPair("            <span className=\"font-bold text-[10px] tracking-wider text-primary uppercase\">Next Prayer</span>", "            <span className=\"font-bold text-[10px] tracking-wider text-primary uppercase\">Next Prayer</span>");
  addPair("          </div>", "          </div>");
  addPair("          <div className=\"flex items-center gap-1 text-slate-400 text-xs font-medium\">", "          <div className=\"flex items-center gap-1 text-slate-500 text-xs font-medium\">");
  addPair("            <BellRing className=\"w-3.5 h-3.5 text-primary\" />", "            <BellRing className=\"w-3.5 h-3.5 text-primary\" />");
  addPair("            <span>Adhan in Kabul</span>", "            <span>Adhan in Kabul</span>");
  addPair("          </div>", "          </div>");
  addPair("        </div>", "        </div>");
  addPair("        <div className=\"flex items-baseline justify-between\">", "        <div className=\"flex items-baseline justify-between\">");
  addPair("          <div>", "          <div>");
  addPair("            <span className=\"text-3xl font-bold text-white tracking-tight block\">Dhuhr</span>", "            <span className=\"text-3xl font-bold text-slate-900 tracking-tight block\">Dhuhr</span>");
  addPair("            <span className=\"text-xs font-medium text-slate-400 mt-0.5 block\">Midday Prayer • 4 Rak'ahs</span>", "            <span className=\"text-xs font-medium text-slate-500 mt-0.5 block\">Midday Prayer • 4 Rak'ahs</span>");
  addPair("          </div>", "          </div>");
  addPair("          <div className=\"text-right\">", "          <div className=\"text-right\">");
  addPair("            <span className=\"text-2xl font-bold text-primary tracking-tight block\">01:05 PM</span>", "            <span className=\"text-2xl font-bold text-primary tracking-tight block\">01:05 PM</span>");
  addPair("            <span className=\"text-[10px] font-semibold text-slate-500 block mt-0.5\">Solar Zenith Passed</span>", "            <span className=\"text-[10px] font-semibold text-slate-400 block mt-0.5\">Solar Zenith Passed</span>");
  addPair("          </div>", "          </div>");
  addPair("        </div>", "        </div>");
  addPair("        <div className=\"rounded-2xl p-3 flex items-center justify-around text-center bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl\">", "        <div className=\"rounded-2xl p-3 flex items-center justify-around text-center bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg\">");
  addPair("          <div className=\"flex flex-col items-center\">", "          <div className=\"flex flex-col items-center\">");
  addPair("            <div className=\"w-12 h-10 rounded-lg bg-slate-900 flex items-center justify-center shadow-sm\">", "            <div className=\"w-12 h-10 rounded-lg bg-slate-100 flex items-center justify-center shadow-sm\">");
  addPair("              <span className=\"text-xl font-bold text-white\">02</span>", "              <span className=\"text-xl font-bold text-slate-900\">02</span>");
  addPair("            </div>", "            </div>");
  addPair("            <span className=\"text-[10px] font-semibold text-slate-400 mt-1\">Hours</span>", "            <span className=\"text-[10px] font-semibold text-slate-500 mt-1\">Hours</span>");
  addPair("          </div>", "          </div>");
  addPair("          <span className=\"text-xl font-bold text-primary pb-3\">:</span>", "          <span className=\"text-xl font-bold text-primary pb-3\">:</span>");
  addPair("          <div className=\"flex flex-col items-center\">", "          <div className=\"flex flex-col items-center\">");
  addPair("            <div className=\"w-12 h-10 rounded-lg bg-slate-900 flex items-center justify-center shadow-sm\">", "            <div className=\"w-12 h-10 rounded-lg bg-slate-100 flex items-center justify-center shadow-sm\">");
  addPair("              <span className=\"text-xl font-bold text-white\">14</span>", "              <span className=\"text-xl font-bold text-slate-900\">14</span>");
  addPair("            </div>", "            </div>");
  addPair("            <span className=\"text-[10px] font-semibold text-slate-400 mt-1\">Mins</span>", "            <span className=\"text-[10px] font-semibold text-slate-500 mt-1\">Mins</span>");
  addPair("          </div>", "          </div>");
  addPair("          <span className=\"text-xl font-bold text-primary pb-3\">:</span>", "          <span className=\"text-xl font-bold text-primary pb-3\">:</span>");
  addPair("          <div className=\"flex flex-col items-center\">", "          <div className=\"flex flex-col items-center\">");
  addPair("            <div className=\"w-12 h-10 rounded-lg bg-slate-900 flex items-center justify-center shadow-sm\">", "            <div className=\"w-12 h-10 rounded-lg bg-slate-100 flex items-center justify-center shadow-sm\">");
  addPair("              <span className=\"text-xl font-bold text-primary\">32</span>", "              <span className=\"text-xl font-bold text-primary\">32</span>");
  addPair("            </div>", "            </div>");
  addPair("            <span className=\"text-[10px] font-semibold text-slate-400 mt-1\">Secs</span>", "            <span className=\"text-[10px] font-semibold text-slate-500 mt-1\">Secs</span>");
  addPair("          </div>", "          </div>");
  addPair("        </div>", "        </div>");
  addPair("        <button className=\"w-full py-3 rounded-2xl bg-gradient-to-r from-primary to-primary-container hover:brightness-105 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-md shadow-primary/30 cursor-pointer pointer-events-auto\">", "        <button className=\"w-full py-3 rounded-2xl bg-gradient-to-r from-primary to-primary-container hover:brightness-105 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-md shadow-primary/30 cursor-pointer pointer-events-auto\">");
  addPair("          <Bell className=\"w-4 h-4\" />", "          <Bell className=\"w-4 h-4\" />");
  addPair("          <span>Notification Active (15m before)</span>", "          <span>Notification Active (15m before)</span>");
  addPair("        </button>", "        </button>");
  addPair("      </div>", "      </div>");
  addPair("", "");
  addPair("      {/* Canonical Prayers List Container (Interactive Prayer Logging) */}", "      {/* Canonical Prayers List Container (Interactive Prayer Logging) */}");
  addPair("      <div className=\"block mx-5 mb-5 p-5 rounded-3xl space-y-2.5 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl\">", "      <div className=\"block mx-5 mb-5 p-5 rounded-3xl space-y-2.5 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg\">");
  addPair("        <div className=\"flex items-center justify-between mb-1\">", "        <div className=\"flex items-center justify-between mb-1\">");
  addPair("          <h3 className=\"text-xs font-bold text-white uppercase tracking-wider\">Canonical Prayers</h3>", "          <h3 className=\"text-xs font-bold text-slate-900 uppercase tracking-wider\">Canonical Prayers</h3>");
  addPair("          <span className=\"text-xs font-medium text-slate-500\">Tap to log completion</span>", "          <span className=\"text-xs font-medium text-slate-500\">Tap to log completion</span>");
  addPair("        </div>", "        </div>");
  addPair("", "");

  // Canonical prayers list
  const canonicalList = [
    { id: 'fajr', name: 'Fajr', time: '05:12 AM', subtitle: 'Dawn prayer' },
    { id: 'dhuhr', name: 'Dhuhr', time: '01:05 PM', subtitle: 'Midday prayer' },
    { id: 'asr', name: 'Asr', time: '04:28 PM', subtitle: 'Late afternoon prayer' },
    { id: 'maghrib', name: 'Maghrib', time: '06:14 PM', subtitle: 'Sunset prayer' },
    { id: 'isha', name: 'Isha', time: '07:45 PM', subtitle: 'Night prayer' },
  ];

  canonicalList.forEach((p) => {
    addPair(`        {/* ${p.name} */}`, `        {/* ${p.name} */}`);
    addPair(`        <div`, `        <div`);
    addPair(`          onClick={() => togglePrayer('${p.id}')}`, `          onClick={() => togglePrayer('${p.id}')}`);
    addPair(`          className="p-3 rounded-2xl flex items-center justify-between bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl cursor-pointer pointer-events-auto hover:border-teal-400/40 active:scale-[0.99] transition-all select-none"`, `          className="p-3 rounded-2xl flex items-center justify-between bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg cursor-pointer pointer-events-auto hover:border-teal-500/40 active:scale-[0.99] transition-all select-none"`);
    addPair(`        >`, `        >`);
    addPair(`          <div className="flex items-center gap-3">`, `          <div className="flex items-center gap-3">`);
    addPair(`            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">`, `            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">`);
    addPair(`              <Sparkles className="w-5 h-5" />`, `              <Sparkles className="w-5 h-5" />`);
    addPair(`            </div>`, `            </div>`);
    addPair(`            <div>`, `            <div>`);
    addPair(`              <div className="text-sm font-bold text-slate-200">${p.name}</div>`, `              <div className="text-sm font-bold text-slate-900">${p.name}</div>`);
    addPair(`              <div className="text-xs font-medium text-slate-500">${p.subtitle}</div>`, `              <div className="text-xs font-medium text-slate-500">${p.subtitle}</div>`);
    addPair(`            </div>`, `            </div>`);
    addPair(`          </div>`, `          </div>`);
    addPair(`          <div className="text-right">`, `          <div className="text-right">`);
    addPair(`            <div className="text-sm font-bold text-slate-200">${p.time}</div>`, `            <div className="text-sm font-bold text-slate-900">${p.time}</div>`);
    addPair(`            <div className={\`flex items-center justify-end gap-1 text-[10px] font-semibold \${prayers?.find((pr) => pr.id === '${p.id}')?.status === 'completed' ? 'text-teal-400' : 'text-slate-400'}\`}>`, `            <div className={\`flex items-center justify-end gap-1 text-[10px] font-semibold \${prayers?.find((pr) => pr.id === '${p.id}')?.status === 'completed' ? 'text-teal-600' : 'text-slate-500'}\`}>`);
    addPair(`              <CheckCircle2 className="w-3 h-3" />`, `              <CheckCircle2 className="w-3 h-3" />`);
    addPair(`              <span>{prayers?.find((pr) => pr.id === '${p.id}')?.status === 'completed' ? 'Completed' : 'Upcoming'}</span>`, `              <span>{prayers?.find((pr) => pr.id === '${p.id}')?.status === 'completed' ? 'Completed' : 'Upcoming'}</span>`);
    addPair(`            </div>`, `            </div>`);
    addPair(`          </div>`, `          </div>`);
    addPair(`        </div>`, `        </div>`);
  });

  addPair("      </div>", "      </div>");
  addPair("", "");
  addPair("      {/* Sun & Twilight Reference */}", "      {/* Sun & Twilight Reference */}");
  addPair("      <div className=\"block mx-5 mb-5 p-5 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl\">", "      <div className=\"block mx-5 mb-5 p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg\">");
  addPair("        <div className=\"grid grid-cols-3 gap-2.5 text-center\">", "        <div className=\"grid grid-cols-3 gap-2.5 text-center\">");
  addPair("          <div className=\"flex flex-col items-center p-2.5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl\">", "          <div className=\"flex flex-col items-center p-2.5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg\">");
  addPair("            <span className=\"text-[10px] font-semibold text-slate-400 leading-tight\">Sunrise / Shuruq</span>", "            <span className=\"text-[10px] font-semibold text-slate-500 leading-tight\">Sunrise / Shuruq</span>");
  addPair("            <span className=\"text-xs font-bold text-slate-200 mt-1\">06:31 AM</span>", "            <span className=\"text-xs font-bold text-slate-900 mt-1\">06:31 AM</span>");
  addPair("          </div>", "          </div>");
  addPair("          <div className=\"flex flex-col items-center p-2.5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl\">", "          <div className=\"flex flex-col items-center p-2.5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg\">");
  addPair("            <span className=\"text-[10px] font-semibold text-slate-400 leading-tight\">Midnight / Nisf</span>", "            <span className=\"text-[10px] font-semibold text-slate-500 leading-tight\">Midnight / Nisf</span>");
  addPair("            <span className=\"text-xs font-bold text-slate-200 mt-1\">12:14 AM</span>", "            <span className=\"text-xs font-bold text-slate-900 mt-1\">12:14 AM</span>");
  addPair("          </div>", "          </div>");
  addPair("          <div className=\"flex flex-col items-center p-2.5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl\">", "          <div className=\"flex flex-col items-center p-2.5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg\">");
  addPair("            <span className=\"text-[10px] font-semibold text-slate-400 leading-tight\">Tahajjud Third</span>", "            <span className=\"text-[10px] font-semibold text-slate-500 leading-tight\">Tahajjud Third</span>");
  addPair("            <span className=\"text-xs font-bold text-slate-200 mt-1\">03:45 AM</span>", "            <span className=\"text-xs font-bold text-slate-900 mt-1\">03:45 AM</span>");
  addPair("          </div>", "          </div>");
  addPair("        </div>", "        </div>");
  addPair("      </div>", "      </div>");
  addPair("", "");
  addPair("      {/* Daily Spiritual Contemplation Card */}", "      {/* Daily Spiritual Contemplation Card */}");
  addPair("      <div className=\"block mx-5 mb-28 p-5 rounded-3xl space-y-2.5 text-slate-200 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl\">", "      <div className=\"block mx-5 mb-28 p-5 rounded-3xl space-y-2.5 text-slate-700 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg\">");
  addPair("        <p className=\"text-sm font-medium text-slate-200 italic leading-relaxed\">", "        <p className=\"text-sm font-medium text-slate-800 italic leading-relaxed\">");
  addPair("          \"Guard strictly your habit of prayers, especially the middle prayer, and stand before Allah in profound devotion.\"", "          \"Guard strictly your habit of prayers, especially the middle prayer, and stand before Allah in profound devotion.\"");
  addPair("        </p>", "        </p>");
  addPair("        <div className=\"flex items-center justify-between text-xs font-semibold text-slate-400\">", "        <div className=\"flex items-center justify-between text-xs font-semibold text-slate-500\">");
  addPair("          <span>— Surah Al-Baqarah 2:238</span>", "          <span>— Surah Al-Baqarah 2:238</span>");
  addPair("          <Bookmark className=\"w-4 h-4 text-violet-400\" />", "          <Bookmark className=\"w-4 h-4 text-violet-500\" />");
  addPair("        </div>", "        </div>");
  addPair("      </div>", "      </div>");
  addPair("    </div>", "    </div>");
  addPair("  );", "  );");
  addPair("}", "}");

  fs.writeFileSync(path.join(__dirname, '../src/PrayerTimesDarkMode.jsx'), darkLines.join('\n'), 'utf8');
  fs.writeFileSync(path.join(__dirname, '../src/PrayerTimesLightMode.jsx'), lightLines.join('\n'), 'utf8');

  console.log(`Generated Prayer Times pair: Dark (${darkLines.length}) lines vs Light (${lightLines.length}) lines`);
}

generatePrayerTimesPair();

