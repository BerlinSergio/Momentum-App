import React, { useMemo } from 'react';
import { useFinanceStore, calculateGroupedTotals, formatSingleCurrency } from './store/useFinanceStore';
import StackedCurrencyDisplay from './components/StackedCurrencyDisplay';
import { useProfileStore } from './store/useProfileStore';
import { useTaskStore, getTodayIsoDate } from './store/useTaskStore';
import { useLocationStore, CITIES_DATA } from './store/useLocationStore';
import { useRoutineStore } from './store/useRoutineStore';
import UserAvatar from './components/UserAvatar';
import {
  Bell, Wallet, CreditCard, CheckSquare, Moon, Clock, Sun,
  CheckCircle2, ChevronRight, Plus, Check, Sparkles
} from 'lucide-react';

function calculatePrayerSchedule(lat = 34.5553, lng = 69.2075, tzOffsetHours = 4.5) {
  const d = new Date();
  const startOfYear = new Date(d.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((d.getTime() - startOfYear.getTime()) / 86400000) + 1;
  const b = (2 * Math.PI * (dayOfYear - 81)) / 365;
  const eot = 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);
  const declination = 23.45 * Math.sin((2 * Math.PI * (284 + dayOfYear)) / 365) * (Math.PI / 180);
  const latRad = lat * (Math.PI / 180);
  const solarNoonMinutes = 720 - 4 * lng - eot + tzOffsetHours * 60;
  const solarNoon = solarNoonMinutes / 60;
  function hourAngle(altitudeDeg) {
    const altRad = altitudeDeg * (Math.PI / 180);
    const cosHA = (Math.sin(altRad) - Math.sin(latRad) * Math.sin(declination)) / (Math.cos(latRad) * Math.cos(declination));
    if (cosHA > 1 || cosHA < -1) return null;
    return (Math.acos(cosHA) * (180 / Math.PI)) / 15;
  }
  const fajrHA = hourAngle(-18) || 1.7;
  const sunriseHA = hourAngle(-0.833) || 1.4;
  const asrAlt = (Math.atan(1 / (1 + Math.tan(Math.abs(latRad - declination))))) * (180 / Math.PI);
  const asrHA = hourAngle(asrAlt) || 1.0;
  const sunsetHA = sunriseHA;
  const ishaHA = hourAngle(-18) || 1.7;
  const fajrHours = solarNoon - fajrHA;
  const dhuhrHours = solarNoon;
  const asrHours = solarNoon + asrHA;
  const maghribHours = solarNoon + sunsetHA;
  const ishaHours = solarNoon + ishaHA;
  function formatTime(hours) {
    const totalMinutes = Math.round(hours * 60);
    let h = Math.floor(totalMinutes / 60) % 24;
    const m = totalMinutes % 60;
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 || 12;
    return `${displayH}:${String(m).padStart(2, '0')} ${ampm}`;
  }
  const prayers = [
    { id: 'fajr', name: 'Fajr', time: formatTime(fajrHours), decimalHours: fajrHours },
    { id: 'dhuhr', name: 'Dhuhr', time: formatTime(dhuhrHours), decimalHours: dhuhrHours },
    { id: 'asr', name: 'Asr', time: formatTime(asrHours), decimalHours: asrHours },
    { id: 'maghrib', name: 'Maghrib', time: formatTime(maghribHours), decimalHours: maghribHours },
    { id: 'isha', name: 'Isha', time: formatTime(ishaHours), decimalHours: ishaHours },
  ];
  const currentHours = d.getHours() + d.getMinutes() / 60;
  let nextIndex = 0;
  let hoursRemaining = 0;
  let foundNext = false;
  for (let i = 0; i < prayers.length; i++) {
    if (currentHours < prayers[i].decimalHours) {
      nextIndex = i;
      hoursRemaining = prayers[i].decimalHours - currentHours;
      foundNext = true;
      break;
    }
  }
  if (!foundNext) {
    nextIndex = 0;
    hoursRemaining = 24 - currentHours + prayers[0].decimalHours;
  }
  const remHours = Math.floor(hoursRemaining);
  const remMinutes = Math.round((hoursRemaining - remHours) * 60);
  const countdownText = remHours > 0 ? `${remHours}h ${remMinutes}m` : `${remMinutes}m`;
  const calculatedList = prayers.map((p, idx) => ({
    ...p,
    isNext: idx === nextIndex,
    isPassed: foundNext ? idx < nextIndex : true,
  }));
  return { prayers: calculatedList, nextPrayer: calculatedList[nextIndex], countdownText };
}

export default function HomeDashboardDarkMode({ setActiveTab }) {
  const profile = useProfileStore();
  const { transactions, incomes, savingsTarget, monthlyBudgetCap, _hasHydrated: financeHydrated } = useFinanceStore();
  const { tasks, toggleTaskStatus } = useTaskStore();
  const selectedCity = useLocationStore((s) => s.selectedCity);
  const routineStreak = useRoutineStore((s) => {
    const total = s.routines?.length || 0;
    const completed = s.routines?.filter((r) => r.completed).length || 0;
    const base = typeof s.baseStreak === 'number' ? s.baseStreak : 14;
    if (total > 0 && completed === total) {
      return typeof s.streakCount === 'number' && s.streakCount > base ? s.streakCount : base + 1;
    }
    return typeof s.streakCount === 'number' ? s.streakCount : base;
  });

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 17) return 'Good afternoon';
    if (hour >= 17 && hour < 21) return 'Good evening';
    return 'Good night';
  }, []);

  const currentMonthPrefix = new Date().toISOString().slice(0, 7);
  const allFinanceItems = useMemo(() => {
    const list = [...(transactions || [])];
    (incomes || []).forEach((inc) => {
      if (!list.some((tx) => tx.id === inc.id)) {
        list.push({ ...inc, type: 'income' });
      }
    });
    return list;
  }, [transactions, incomes]);

  const currentMonthTransactions = useMemo(() => {
    return allFinanceItems.filter((tx) => !tx.date || tx.date.startsWith(currentMonthPrefix));
  }, [allFinanceItems, currentMonthPrefix]);

  const homeIncomeGrouped = useMemo(() => {
    return calculateGroupedTotals(currentMonthTransactions.filter((tx) => tx.type === 'income'));
  }, [currentMonthTransactions]);

  const homeExpensesGrouped = useMemo(() => {
    return calculateGroupedTotals(currentMonthTransactions.filter((tx) => tx.type === 'expense'));
  }, [currentMonthTransactions]);

  const homeCurrencies = useMemo(() => {
    const set = new Set([...Object.keys(homeIncomeGrouped), ...Object.keys(homeExpensesGrouped)]);
    const arr = Array.from(set);
    return arr.length > 0 ? arr : ['AFN'];
  }, [homeIncomeGrouped, homeExpensesGrouped]);

  const homeSavedGrouped = useMemo(() => {
    const grouped = {};
    homeCurrencies.forEach((cur) => {
      const inc = homeIncomeGrouped[cur] || 0;
      const exp = homeExpensesGrouped[cur] || 0;
      grouped[cur] = inc - exp;
    });
    return grouped;
  }, [homeCurrencies, homeIncomeGrouped, homeExpensesGrouped]);

  const savingsStats = useMemo(() => {
    const rawCurrency = profile?.currency || 'AFN';
    let currencyCode = 'AFN';
    let currencySymbol = '؋';
    if (rawCurrency.includes('USD') || rawCurrency.includes('$')) {
      currencyCode = 'USD';
      currencySymbol = '$';
    } else if (rawCurrency.includes('EUR') || rawCurrency.includes('€')) {
      currencyCode = 'EUR';
      currencySymbol = '€';
    } else if (rawCurrency.includes('GBP') || rawCurrency.includes('£')) {
      currencyCode = 'GBP';
      currencySymbol = '£';
    } else if (rawCurrency.includes('PKR') || rawCurrency.includes('₨')) {
      currencyCode = 'PKR';
      currencySymbol = '₨';
    } else if (rawCurrency.includes('IRR') || rawCurrency.includes('﷼')) {
      currencyCode = 'IRR';
      currencySymbol = '﷼';
    } else if (rawCurrency.includes('AFN') || rawCurrency.includes('؋')) {
      currencyCode = 'AFN';
      currencySymbol = '؋';
    }
    const storeTarget = typeof savingsTarget === 'number'
      ? savingsTarget
      : (savingsTarget?.[currencyCode] ?? (monthlyBudgetCap?.[currencyCode] ? monthlyBudgetCap[currencyCode] : null));
    const targetAmount = Number(storeTarget) > 0 ? Number(storeTarget) : (currencyCode === 'AFN' ? 60000 : 1000);
    const actualSaved = homeSavedGrouped[currencyCode] !== undefined
      ? homeSavedGrouped[currencyCode]
      : (homeCurrencies[0] && homeSavedGrouped[homeCurrencies[0]] !== undefined ? homeSavedGrouped[homeCurrencies[0]] : 0);
    const rawRate = targetAmount > 0 ? (actualSaved / targetAmount) * 100 : 0;
    const clampedRate = Math.max(0, rawRate);
    const roundedRate = Math.round(clampedRate * 10) / 10;
    const displayRate = roundedRate === 0 ? '0%' : (roundedRate % 1 === 0 ? `${roundedRate.toFixed(0)}%` : `${roundedRate.toFixed(1)}%`);
    const barWidth = Math.min(100, Math.max(0, roundedRate));
    const formattedTarget = `${currencySymbol}${targetAmount.toLocaleString('en-US')}`;
    return { currencyCode, currencySymbol, targetAmount, actualSaved, displayRate, barWidth, formattedTarget };
  }, [profile?.currency, savingsTarget, monthlyBudgetCap, homeSavedGrouped, homeCurrencies]);

  const displayTasks = useMemo(() => {
    const todayLocal = getTodayIsoDate();
    const todayUtc = new Date().toISOString().slice(0, 10);
    return (tasks || []).filter((t) => {
      if (!t.dueDate) return true;
      const due = String(t.dueDate).slice(0, 10);
      return due === todayLocal || due === todayUtc;
    });
  }, [tasks]);

  const prayerSchedule = useMemo(() => {
    const cityName = (profile?.city || selectedCity?.name || 'Kabul').toLowerCase();
    const matched = CITIES_DATA.find((c) => cityName.includes(c.name.toLowerCase()));
    const lat = matched ? matched.latitude : (selectedCity?.latitude || 34.5553);
    const lng = matched ? matched.longitude : (selectedCity?.longitude || 69.2075);
    let tzOffset = 4.5;
    if (matched?.timezone === 'Asia/Riyadh') tzOffset = 3;
    else if (matched?.timezone === 'Europe/Istanbul') tzOffset = 3;
    else if (matched?.timezone === 'Europe/London') tzOffset = 0;
    else if (matched?.timezone === 'America/Toronto') tzOffset = -5;
    return calculatePrayerSchedule(lat, lng, tzOffset);
  }, [profile?.city, selectedCity]);

  const userFirstName = useMemo(() => {
    return profile?.fullName?.trim() ? profile.fullName.trim().split(' ')[0] : '';
  }, [profile?.fullName]);

  if (!financeHydrated) {
    return (
      <div className="w-full min-h-[500px] flex items-center justify-center bg-transparent">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative w-full pb-36 bg-transparent font-sans">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex items-center justify-between px-5 pt-6 pb-2 pointer-events-auto">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Momentum Logo" className="w-10 h-10 object-cover rounded-xl aspect-square flex-shrink-0 shadow-lg shadow-primary/30" />
          <h1 className="text-base font-bold text-white tracking-tight">Momentum</h1>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setActiveTab && setActiveTab('notifications_settings_dark_mode')} aria-label="Notifications" className="p-2 rounded-full text-slate-300 hover:bg-slate-800 transition-colors pointer-events-auto cursor-pointer">
            <Bell className="w-5 h-5"/>
          </button>
          <UserAvatar setActiveTab={setActiveTab} />
        </div>
      </header>

      <main className="w-full bg-transparent relative z-10 pointer-events-auto">
        {/* User Greeting Section - Dynamic Greeting & Profile Sync */}
        <div className="px-5 pt-3 pb-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-1.5">
              {greeting}{userFirstName ? `, ${userFirstName}` : ''} <span>👋</span>
            </h1>
            <p className="text-xs font-normal text-slate-400 mt-0.5">Stay consistent. Small steps every day.</p>
            <span className="text-[11px] font-semibold text-primary uppercase tracking-wider block mt-1">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' })}
            </span>
          </div>
          <UserAvatar size="w-12 h-12" textSize="text-lg" setActiveTab={setActiveTab} />
        </div>

        {/* FINANCIAL HEALTH HERO CARD */}
        <div onClick={() => setActiveTab && setActiveTab('finance_expense_tracker_dark_mode')} className="block mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl cursor-pointer hover:bg-black/40 active:scale-[0.99] transition-all pointer-events-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-bold text-white">Financial Health</h2>
            </div>
            <span className="text-xs font-semibold text-primary">{new Date().toLocaleDateString('en-US', { month: 'long' })}</span>
          </div>
          <div className="grid grid-cols-3 gap-2.5 pt-1">
            <div className="p-3 rounded-2xl text-center bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col justify-between items-center min-h-[96px]">
              <span className="text-[11px] font-medium text-slate-400 block">Income</span>
              <StackedCurrencyDisplay grouped={homeIncomeGrouped} align="center" isDark={true} primaryClass="text-xs sm:text-sm font-bold text-white mt-0.5" secondaryClass="text-[10px] sm:text-xs text-slate-400 font-medium" />
              <span className="text-[10px] font-semibold text-emerald-400 inline-flex items-center justify-center gap-0.5 mt-0.5">↗ Inflow</span>
            </div>
            <div className="p-3 rounded-2xl text-center bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col justify-between items-center min-h-[96px]">
              <span className="text-[11px] font-medium text-slate-400 block">Expenses</span>
              <StackedCurrencyDisplay grouped={homeExpensesGrouped} align="center" isDark={true} primaryClass="text-xs sm:text-sm font-bold text-white mt-0.5" secondaryClass="text-[10px] sm:text-xs text-slate-400 font-medium" />
              <span className="text-[10px] font-medium text-slate-400 inline-flex items-center justify-center gap-0.5 mt-0.5">✔ Outflow</span>
            </div>
            <div className="p-3 rounded-2xl text-center bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col justify-between items-center min-h-[96px]">
              <span className="text-[11px] font-medium text-primary block">Saved</span>
              <StackedCurrencyDisplay grouped={homeSavedGrouped} align="center" showSign={true} isDark={true} primaryClass="text-xs sm:text-sm font-bold text-primary mt-0.5" secondaryClass="text-[10px] sm:text-xs text-primary/80 font-medium" />
              <span className="text-[10px] font-semibold text-primary inline-flex items-center justify-center gap-0.5 mt-0.5">Net</span>
            </div>
          </div>
          <div className="pt-2">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-medium text-slate-400">Savings Target ({savingsStats.formattedTarget})</span>
              <span className="font-bold text-primary">{savingsStats.displayRate}</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-primary to-cyan-400 transition-all duration-500" style={{ width: `${savingsStats.barWidth}%` }}></div>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS GRID */}
        <div className="grid grid-cols-4 gap-3 mx-5 mb-5">
          <button type="button" onClick={() => setActiveTab && setActiveTab('add_edit_expense_dark_mode')} className="p-3.5 rounded-2xl transition-all flex flex-col items-center justify-center text-center gap-2 group bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl cursor-pointer pointer-events-auto active:scale-95">
            <CreditCard className="w-5 h-5 text-primary" />
            <span className="text-xs font-semibold text-slate-200">Log Cost</span>
          </button>
          <button type="button" onClick={() => { useTaskStore.getState().setEditingTaskId(null); setActiveTab && setActiveTab('add_edit_task_dark_mode'); }} className="p-3.5 rounded-2xl transition-all flex flex-col items-center justify-center text-center gap-2 group bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl cursor-pointer pointer-events-auto active:scale-95">
            <CheckSquare className="w-5 h-5 text-violet-400" />
            <span className="text-xs font-semibold text-slate-200">Add Task</span>
          </button>
          <button type="button" onClick={() => setActiveTab && setActiveTab('prayer_times_dark_mode')} className="p-3.5 rounded-2xl transition-all flex flex-col items-center justify-center text-center gap-2 group bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl cursor-pointer pointer-events-auto active:scale-95">
            <Moon className="w-5 h-5 text-teal-400" />
            <span className="text-xs font-semibold text-slate-200">Prayers</span>
          </button>
          <button type="button" onClick={() => setActiveTab && setActiveTab('tasbeeh_main_dark_mode')} className="p-3.5 rounded-2xl transition-all flex flex-col items-center justify-center text-center gap-2 group bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl cursor-pointer pointer-events-auto active:scale-95">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-semibold text-slate-200">Reflect</span>
          </button>
        </div>

        {/* ROUTINE & PRAYER CARD */}
        <div className="block mx-5 mb-5 p-5 rounded-3xl relative overflow-hidden space-y-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-bold text-white">Routine & Prayer</h2>
            </div>
            <button type="button" onClick={() => setActiveTab && setActiveTab('prayer_times_dark_mode')} className="text-xs font-semibold text-primary hover:text-primary cursor-pointer pointer-events-auto">
              Edit
            </button>
          </div>
          <div className="p-3.5 rounded-2xl flex items-center justify-between relative z-10 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-primary/20 text-primary flex items-center justify-center shadow-sm border border-primary/30 shrink-0">
                <Sun className="w-4 h-4"/>
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <span className="text-[11px] font-medium text-slate-400 leading-tight block whitespace-nowrap">Next: {prayerSchedule.nextPrayer.name} in {prayerSchedule.countdownText}</span>
                <h3 className="text-base font-bold text-white font-display leading-tight mt-0.5">{prayerSchedule.nextPrayer.time}</h3>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white shadow-sm shrink-0 flex items-center justify-center self-center">Upcoming</span>
          </div>
          <div className="grid grid-cols-5 gap-2 w-full relative z-10">
            {prayerSchedule.prayers.map((prayer) => (
              <div
                key={prayer.id}
                className={`py-2 px-1 rounded-2xl text-center border transition-all flex flex-col items-center justify-center min-h-[52px] ${
                  prayer.isNext
                    ? 'bg-primary/20 border-primary shadow-sm shadow-primary/20'
                    : 'bg-white/5 border-white/10'
                }`}
              >
                <span className={`text-[10px] block font-medium leading-tight ${prayer.isNext ? 'text-primary font-bold' : 'text-slate-400'}`}>
                  {prayer.name}
                </span>
                <span className={`text-[11px] block mt-1 font-bold font-display leading-tight ${prayer.isNext ? 'text-white' : prayer.isPassed ? 'text-slate-500 line-through' : 'text-slate-300'}`}>
                  {prayer.time.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* TODAY'S TASKS */}
        <div className="mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-violet-400" />
              <h2 className="text-sm font-bold text-white">Today's Tasks</h2>
            </div>
            <button type="button" onClick={() => { useTaskStore.getState().setEditingTaskId(null); setActiveTab && setActiveTab('add_edit_task_dark_mode'); }} className="text-xs font-semibold text-primary hover:text-primary flex items-center gap-1 cursor-pointer pointer-events-auto">
              <Plus className="w-3.5 h-3.5" /> Add Task
            </button>
          </div>
          <div className="space-y-2">
            {displayTasks.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-400">No tasks scheduled for today. Great job!</div>
            ) : (
              displayTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTaskStatus(task.id)}
                  className="p-3.5 rounded-2xl flex items-center justify-between bg-black/40 backdrop-blur-xl border border-white/10 shadow-sm transition-all hover:bg-black/40 cursor-pointer pointer-events-auto"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); toggleTaskStatus(task.id); }}
                      aria-label="Toggle task status"
                      className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-all cursor-pointer pointer-events-auto shrink-0 ${
                        task.status === 'done' || task.status === 'completed'
                          ? 'bg-primary border-primary text-white shadow-sm'
                          : 'border-slate-600 hover:border-primary text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <span className={`text-xs font-medium truncate ${task.status === 'done' || task.status === 'completed' ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                      {task.title}
                    </span>
                  </div>
                  {task.priority && (
                    <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full flex-shrink-0 ${
                      String(task.priority).toLowerCase() === 'urgent' || String(task.priority).toLowerCase() === 'high'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : String(task.priority).toLowerCase() === 'medium'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>{task.priority}</span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* HABIT STREAK HERO BANNER */}
        <div onClick={() => { if (typeof setActiveTab === 'function') { setActiveTab('daily_routine_dark_mode'); } else { useNavigationStore.getState().setActiveTab('daily_routine_dark_mode'); } }} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (typeof setActiveTab === 'function') { setActiveTab('daily_routine_dark_mode'); } else { useNavigationStore.getState().setActiveTab('daily_routine_dark_mode'); } } }} aria-label="View Daily Routine" className="mx-5 mb-5 p-4 rounded-3xl bg-black/60 backdrop-blur-xl border border-white/15 shadow-xl flex items-center justify-between cursor-pointer hover:bg-black/70 hover:border-primary/40 active:scale-[0.99] transition-all pointer-events-auto">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-primary/20 text-primary flex items-center justify-center font-bold text-lg shadow-inner border border-primary/30 shrink-0">
              🔥
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-white truncate">{routineStreak > 0 ? `${routineStreak} Day Routine Streak` : 'Start Your Habit Streak'}</h3>
              <p className="text-xs text-slate-300 mt-0.5 truncate">Consistency creates mastery</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-primary shrink-0" />
        </div>
      </main>
    </div>
  );
}
