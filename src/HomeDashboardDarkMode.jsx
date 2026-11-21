import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useFinanceStore, calculateGroupedTotals, getMonthlyFinanceSummary, getSavingsTargetStats } from './store/useFinanceStore';
import StackedCurrencyDisplay from './components/StackedCurrencyDisplay';
import { useProfileStore } from './store/useProfileStore';
import { useTaskStore } from './store/useTaskStore';
import { useLocationStore } from './store/useLocationStore';
import { useRoutineStore } from './store/useRoutineStore';
import { useNavigationStore } from './store/useNavigationStore';
import { usePrayerStore } from './store/usePrayerStore';
import { useAppTime } from './hooks/useAppTime';
import { getNextPrayerInfo } from './utils/prayerTimes';
import UserAvatar from './components/UserAvatar';
import WelcomeHero from './components/home/WelcomeHero';
import { useTranslation } from 'react-i18next';
import { useLocaleStore } from './store/useLocaleStore';
import { useNotificationStore } from './store/useNotificationStore';
import {
  Bell, Wallet, CreditCard, CheckSquare, Moon, Clock, Sun,
  ChevronRight, Plus, Check, Sparkles, Pencil, Target, X
} from 'lucide-react';

export default function HomeDashboardDarkMode({ setActiveTab }) {
  const { t } = useTranslation();
  const currentLocale = useLocaleStore((s) => s.currentLocale);
  const profile = useProfileStore();
  const notifications = useNotificationStore((s) => s.notifications) || [];
  const unreadNotificationCount = notifications.filter((n) => !n.read).length;
  const { transactions, incomes, savingsTarget, updateSavingsTarget, _hasHydrated: financeHydrated } = useFinanceStore();
  const { tasks, toggleTaskStatus } = useTaskStore();
  const selectedCity = useLocationStore((s) => s.selectedCity);
  const {
    now,
    currentDateKey,
    currentMonthKey,
    dayEpoch,
    greeting,
    formattedDate,
    effectiveTimezone,
    isToday: checkIsToday,
  } = useAppTime();

  const routineStreak = useRoutineStore((s) => {
    return s.getCurrentStreak ? s.getCurrentStreak(currentDateKey) : (s.streakCount ?? 0);
  });

  const [isTargetModalOpen, setIsTargetModalOpen] = useState(false);
  const [savingsModalMode, setSavingsModalMode] = useState('create');
  const [targetFormAFN, setTargetFormAFN] = useState('');
  const [targetFormUSD, setTargetFormUSD] = useState('');
  const [contributedFormAFN, setContributedFormAFN] = useState('');
  const [contributedFormUSD, setContributedFormUSD] = useState('');
  const [targetValidationError, setTargetValidationError] = useState('');

  const {
    incomeGrouped: homeIncomeGrouped,
    expensesGrouped: homeExpensesGrouped,
    netSavedGrouped: homeSavedGrouped,
    currencies: homeCurrencies,
  } = useMemo(() => {
    return getMonthlyFinanceSummary(transactions, incomes, currentMonthKey);
  }, [transactions, incomes, currentMonthKey]);

  const savingsStats = useMemo(() => {
    return getSavingsTargetStats(savingsTarget, homeSavedGrouped, profile?.currency);
  }, [savingsTarget, homeSavedGrouped, profile?.currency]);

  const handleOpenCreateSavingsModal = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setSavingsModalMode('create');
    setTargetFormAFN('');
    setTargetFormUSD('');
    setContributedFormAFN('');
    setContributedFormUSD('');
    setTargetValidationError('');
    setIsTargetModalOpen(true);
  };

  const handleOpenEditSavingsModal = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setSavingsModalMode('edit');
    setTargetValidationError('');

    const afnEntry = (savingsTarget && typeof savingsTarget === 'object') ? savingsTarget.AFN : null;
    const afnTarget = typeof afnEntry === 'number' ? afnEntry : (typeof afnEntry === 'object' && afnEntry !== null ? (afnEntry.target ?? '') : '');
    const afnContrib = typeof afnEntry === 'object' && afnEntry !== null ? (afnEntry.current ?? afnEntry.contributed ?? '') : '';

    const usdEntry = (savingsTarget && typeof savingsTarget === 'object') ? savingsTarget.USD : (typeof savingsTarget === 'number' ? savingsTarget : null);
    const usdTarget = typeof usdEntry === 'number' ? usdEntry : (typeof usdEntry === 'object' && usdEntry !== null ? (usdEntry.target ?? '') : '');
    const usdContrib = typeof usdEntry === 'object' && usdEntry !== null ? (usdEntry.current ?? usdEntry.contributed ?? '') : '';

    setTargetFormAFN(afnTarget !== '' && afnTarget !== null && Number(afnTarget) > 0 ? String(afnTarget) : '');
    setTargetFormUSD(usdTarget !== '' && usdTarget !== null && Number(usdTarget) > 0 ? String(usdTarget) : '');
    setContributedFormAFN(afnContrib !== '' && afnContrib !== null ? String(afnContrib) : '');
    setContributedFormUSD(usdContrib !== '' && usdContrib !== null ? String(usdContrib) : '');
    setIsTargetModalOpen(true);
  };

  const handleCancelTarget = () => {
    setIsTargetModalOpen(false);
    setTargetValidationError('');
  };

  const handleSaveTarget = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setTargetValidationError('');

    const afnTargetTrim = targetFormAFN.trim();
    const usdTargetTrim = targetFormUSD.trim();

    const afnTargetNum = afnTargetTrim !== '' ? parseFloat(afnTargetTrim) : undefined;
    const usdTargetNum = usdTargetTrim !== '' ? parseFloat(usdTargetTrim) : undefined;

    if (afnTargetNum !== undefined && (isNaN(afnTargetNum) || afnTargetNum < 0)) {
      setTargetValidationError(t('home.invalidTargetAmount', 'AFN target amount must be a non-negative number.'));
      return;
    }
    if (usdTargetNum !== undefined && (isNaN(usdTargetNum) || usdTargetNum < 0)) {
      setTargetValidationError(t('home.invalidTargetAmount', 'USD target amount must be a non-negative number.'));
      return;
    }

    if ((afnTargetNum === undefined || afnTargetNum <= 0) && (usdTargetNum === undefined || usdTargetNum <= 0)) {
      setTargetValidationError(t('home.targetMustBePositive', 'Please specify a target amount greater than zero.'));
      return;
    }

    const afnContribNum = contributedFormAFN.trim() !== '' ? Math.max(0, parseFloat(contributedFormAFN) || 0) : undefined;
    const usdContribNum = contributedFormUSD.trim() !== '' ? Math.max(0, parseFloat(contributedFormUSD) || 0) : undefined;

    const newTargets = {};
    if (afnTargetNum !== undefined) {
      if (afnContribNum !== undefined) {
        newTargets.AFN = { target: afnTargetNum, current: afnContribNum };
      } else {
        newTargets.AFN = afnTargetNum;
      }
    }
    if (usdTargetNum !== undefined) {
      if (usdContribNum !== undefined) {
        newTargets.USD = { target: usdTargetNum, current: usdContribNum };
      } else {
        newTargets.USD = usdTargetNum;
      }
    }

    updateSavingsTarget(newTargets);
    setIsTargetModalOpen(false);
  };

  const displayTasks = useMemo(() => {
    void currentDateKey;
    void dayEpoch;
    return (tasks || []).filter((t) => {
      if (!t.dueDate) return true;
      return checkIsToday(t.dueDate);
    });
  }, [tasks, currentDateKey, dayEpoch, checkIsToday]);

  const calculationMethod = usePrayerStore((s) => s.calculationMethod) || 'Karachi';
  const madhab = usePrayerStore((s) => s.madhab) || 'Hanafi';
  const highLatitudeRule = usePrayerStore((s) => s.highLatitudeRule) || 'recommended';
  const polarCircleResolution = usePrayerStore((s) => s.polarCircleResolution) || 'AqrabBalad';
  const prayerAdjustments = usePrayerStore((s) => s.prayerAdjustments);

  const prayerSchedule = useMemo(() => {
    const lat = selectedCity?.latitude != null ? Number(selectedCity.latitude) : 34.5553;
    const lng = selectedCity?.longitude != null ? Number(selectedCity.longitude) : 69.2075;
    const timezone = selectedCity?.timezone || 'Asia/Kabul';
    const nowInstance = (now instanceof Date && !isNaN(now.getTime())) ? now : new Date();

    const info = getNextPrayerInfo({
      baseDate: nowInstance,
      latitude: lat,
      longitude: lng,
      timezone,
      calculationMethod,
      madhab,
      highLatitudeRule,
      polarCircleResolution,
      adjustments: prayerAdjustments,
    });

    const diffMs = info.diffMs || 0;
    const totalMinutes = Math.floor(diffMs / 60000);
    const remHours = Math.floor(totalMinutes / 60);
    const remMinutes = totalMinutes % 60;
    const countdownText = remHours > 0 ? `${remHours}h ${remMinutes}m` : `${remMinutes}m`;
    const nowEpoch = nowInstance.getTime();

    const prayers = (info.prayers || []).map((p, idx) => ({
      ...p,
      isNext: idx === info.nextIndex && !info.isTomorrow,
      isPassed: p.prayerDate ? p.prayerDate.getTime() <= nowEpoch : false,
    }));

    return {
      prayers,
      nextPrayer: info.nextPrayer || { name: 'Fajr', time: '05:00 AM' },
      countdownText,
      isTomorrow: info.isTomorrow,
    };
  }, [now, selectedCity, calculationMethod, madhab, highLatitudeRule, polarCircleResolution, prayerAdjustments]);

  const userFirstName = useMemo(() => {
    return profile?.fullName?.trim() ? profile.fullName.trim().split(' ')[0] : '';
  }, [profile]);

  if (!financeHydrated) {
    return (
      <div className="w-full min-h-[500px] flex items-center justify-center bg-transparent">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative w-full pb-32 lg:pb-6 bg-transparent font-sans">
      {/* Top Header Bar (Hidden on desktop since DesktopSidebar provides branding & navigation) */}
      <header className="sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex lg:hidden items-center justify-between px-5 pt-6 pb-2 pointer-events-auto">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Momentum Logo" className="w-10 h-10 object-cover rounded-xl aspect-square flex-shrink-0 shadow-lg shadow-primary/30" />
          <h1 className="text-base font-bold text-white tracking-tight">Momentum</h1>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setActiveTab && setActiveTab('notifications_settings_dark_mode')} aria-label="Notifications" className="relative p-2 rounded-full text-slate-300 hover:bg-slate-800 transition-colors pointer-events-auto cursor-pointer">
            <Bell className="w-5 h-5"/>
            {unreadNotificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-slate-900" />
            )}
          </button>
          <UserAvatar setActiveTab={setActiveTab} />
        </div>
      </header>

      <main className="w-full bg-transparent relative z-10 pointer-events-auto">
        {/* Premium Glass Welcome Hero */}
        <WelcomeHero isDark={true} setActiveTab={setActiveTab} className="mb-4 lg:mb-5" />

        {/* Responsive Dashboard Layout: 12-Column Grid on Desktop (>= 1024px), Clean Single Column Stack on Mobile (< 1024px) */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-5 items-stretch">
          {/* ── ROW 1: FINANCIAL HEALTH (cols 1-7) & QUICK ACTIONS (cols 8-12) ── */}

          {/* FINANCIAL HEALTH HERO CARD (Mobile: Order 1, Desktop: Left Row 1) */}
          <div className="w-full order-1 lg:order-none lg:col-span-7 lg:col-start-1 lg:row-start-1 flex flex-col">
            <motion.div
              onClick={() => setActiveTab && setActiveTab('finance_expense_tracker_dark_mode')}
              whileHover={{ scale: 1.008 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.16 }}
              className="h-full mx-5 lg:mx-0 p-5 rounded-3xl flex flex-col justify-between bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl cursor-pointer hover:bg-black/50 transition-colors pointer-events-auto select-none"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-primary" />
                  <h2 className="text-sm font-bold text-white">{t('home.financialHealth', 'Financial Health')}</h2>
                </div>
                <span className="text-xs font-semibold text-primary">
                  {new Intl.DateTimeFormat(currentLocale === 'ps-AF' ? 'ps-AF' : currentLocale === 'fa-AF' ? 'fa-AF' : 'en-US', { month: 'long', timeZone: effectiveTimezone }).format(now)}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 my-3">
                <div className="p-3 rounded-2xl text-center bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col justify-between items-center min-h-[92px]">
                  <span className="text-[11px] font-medium text-slate-400 block">{t('home.income', 'Income')}</span>
                  <StackedCurrencyDisplay grouped={homeIncomeGrouped} amount={homeIncomeGrouped} preferredCurrency={savingsStats.currencyCode} align="center" isDark={true} primaryClass="text-xs sm:text-sm font-bold text-white mt-0.5" secondaryClass="text-[10px] sm:text-xs text-slate-400 font-medium" />
                  <span className="text-[10px] font-semibold text-emerald-500 inline-flex items-center justify-center gap-0.5 mt-0.5">{t('home.inflow', 'Inflow')}</span>
                </div>
                <div className="p-3 rounded-2xl text-center bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col justify-between items-center min-h-[92px]">
                  <span className="text-[11px] font-medium text-slate-400 block">{t('home.expenses', 'Expenses')}</span>
                  <StackedCurrencyDisplay grouped={homeExpensesGrouped} amount={homeExpensesGrouped} preferredCurrency={savingsStats.currencyCode} align="center" isDark={true} primaryClass="text-xs sm:text-sm font-bold text-white mt-0.5" secondaryClass="text-[10px] sm:text-xs text-slate-400 font-medium" />
                  <span className="text-[10px] font-medium text-slate-400 inline-flex items-center justify-center gap-0.5 mt-0.5">{t('home.outflow', 'Outflow')}</span>
                </div>
                <div className="p-3 rounded-2xl text-center bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col justify-between items-center min-h-[92px]">
                  <span className="text-[11px] font-medium text-primary block">{t('home.saved', 'Saved')}</span>
                  <StackedCurrencyDisplay grouped={homeSavedGrouped} amount={homeSavedGrouped} preferredCurrency={savingsStats.currencyCode} align="center" showSign={true} isDark={true} primaryClass="text-xs sm:text-sm font-bold text-primary mt-0.5" secondaryClass="text-[10px] sm:text-xs text-primary/80 font-medium" />
                  <span className="text-[10px] font-semibold text-primary inline-flex items-center justify-center gap-0.5 mt-0.5">{t('home.net', 'Net')}</span>
                </div>
              </div>

              <div className="pt-1">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  {savingsStats.hasTarget ? (
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="font-medium text-slate-400 truncate">
                        {t('home.savingsTarget', 'Savings Target')} ({savingsStats.formattedTarget})
                      </span>
                      <button
                        type="button"
                        onClick={handleOpenEditSavingsModal}
                        title={t('home.editTarget', 'Edit Target')}
                        className="p-1 rounded-md text-slate-400 hover:text-primary hover:bg-slate-800 transition-colors cursor-pointer select-none"
                      >
                        <Pencil className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="font-medium text-slate-500 italic truncate">
                        {t('home.noSavingsTarget', 'No savings target set')}
                      </span>
                      <button
                        type="button"
                        onClick={handleOpenCreateSavingsModal}
                        className="text-xs font-semibold text-primary hover:underline cursor-pointer select-none"
                      >
                        {t('home.setTarget', 'Set Target')}
                      </button>
                    </div>
                  )}
                  <span className="font-bold text-primary shrink-0 ml-2">
                    {savingsStats.hasTarget ? savingsStats.displayRate : '0%'}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-cyan-400 transition-all duration-500"
                    style={{ width: `${savingsStats.barWidth}%` }}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── QUICK ACTIONS (Mobile: Order 2, Desktop: Right Row 1) ── */}
          <div className="w-full order-2 lg:order-none lg:col-span-5 lg:col-start-8 lg:row-start-1 flex flex-col">
            {/* Desktop: Enclosed Glass Card with Balanced Proportions matching Financial Health */}
            <div className="hidden lg:flex h-full p-5 rounded-3xl flex-col justify-between bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <h2 className="text-sm font-bold text-white">{t('home.quickActions', 'Quick Actions')}</h2>
                </div>
                <span className="text-xs font-semibold text-primary">{t('sidebar.quickAccess', 'Quick Access')}</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5 flex-1 pt-3">
                <motion.button
                  type="button"
                  onClick={() => setActiveTab && setActiveTab('add_edit_expense_dark_mode')}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-3 rounded-2xl flex flex-col items-center justify-center text-center gap-1.5 h-full min-h-[72px] sm:min-h-[76px] bg-black/30 hover:bg-black/50 border border-white/10 hover:border-primary/40 shadow-sm transition-all cursor-pointer pointer-events-auto select-none"
                >
                  <CreditCard className="w-5 h-5 text-primary" />
                  <span className="text-xs font-semibold text-slate-200">{t('home.logCost', 'Log Cost')}</span>
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => { useTaskStore.getState().setEditingTaskId(null); setActiveTab && setActiveTab('add_edit_task_dark_mode'); }}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-3 rounded-2xl flex flex-col items-center justify-center text-center gap-1.5 h-full min-h-[72px] sm:min-h-[76px] bg-black/30 hover:bg-black/50 border border-white/10 hover:border-primary/40 shadow-sm transition-all cursor-pointer pointer-events-auto select-none"
                >
                  <CheckSquare className="w-5 h-5 text-violet-400" />
                  <span className="text-xs font-semibold text-slate-200">{t('home.addTask', 'Add Task')}</span>
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setActiveTab && setActiveTab('prayer_times_dark_mode')}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-3 rounded-2xl flex flex-col items-center justify-center text-center gap-1.5 h-full min-h-[72px] sm:min-h-[76px] bg-black/30 hover:bg-black/50 border border-white/10 hover:border-primary/40 shadow-sm transition-all cursor-pointer pointer-events-auto select-none"
                >
                  <Moon className="w-5 h-5 text-teal-400" />
                  <span className="text-xs font-semibold text-slate-200">{t('home.prayers', 'Prayers')}</span>
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setActiveTab && setActiveTab('tasbeeh_main_dark_mode')}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-3 rounded-2xl flex flex-col items-center justify-center text-center gap-1.5 h-full min-h-[72px] sm:min-h-[76px] bg-black/30 hover:bg-black/50 border border-white/10 hover:border-primary/40 shadow-sm transition-all cursor-pointer pointer-events-auto select-none"
                >
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span className="text-xs font-semibold text-slate-200">{t('home.reflect', 'Reflect')}</span>
                </motion.button>
              </div>
            </div>

            {/* Mobile: 4-Item Horizontal Action Row (< 1024px) */}
            <div className="lg:hidden grid grid-cols-4 gap-3 mx-5">
              <motion.button
                type="button"
                onClick={() => setActiveTab && setActiveTab('add_edit_expense_dark_mode')}
                whileTap={{ scale: 0.93 }}
                whileHover={{ scale: 1.03 }}
                className="p-3.5 rounded-2xl transition-colors flex flex-col items-center justify-center text-center gap-2 group bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl cursor-pointer pointer-events-auto select-none"
              >
                <CreditCard className="w-5 h-5 text-primary" />
                <span className="text-xs font-semibold text-slate-300">{t('home.logCost', 'Log Cost')}</span>
              </motion.button>
              <motion.button
                type="button"
                onClick={() => { useTaskStore.getState().setEditingTaskId(null); setActiveTab && setActiveTab('add_edit_task_dark_mode'); }}
                whileTap={{ scale: 0.93 }}
                whileHover={{ scale: 1.03 }}
                className="p-3.5 rounded-2xl transition-colors flex flex-col items-center justify-center text-center gap-2 group bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl cursor-pointer pointer-events-auto select-none"
              >
                <CheckSquare className="w-5 h-5 text-violet-500" />
                <span className="text-xs font-semibold text-slate-300">{t('home.addTask', 'Add Task')}</span>
              </motion.button>
              <motion.button
                type="button"
                onClick={() => setActiveTab && setActiveTab('prayer_times_dark_mode')}
                whileTap={{ scale: 0.93 }}
                whileHover={{ scale: 1.03 }}
                className="p-3.5 rounded-2xl transition-colors flex flex-col items-center justify-center text-center gap-2 group bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl cursor-pointer pointer-events-auto select-none"
              >
                <Moon className="w-5 h-5 text-teal-500" />
                <span className="text-xs font-semibold text-slate-300">{t('home.prayers', 'Prayers')}</span>
              </motion.button>
              <motion.button
                type="button"
                onClick={() => setActiveTab && setActiveTab('tasbeeh_main_dark_mode')}
                whileTap={{ scale: 0.93 }}
                whileHover={{ scale: 1.03 }}
                className="p-3.5 rounded-2xl transition-colors flex flex-col items-center justify-center text-center gap-2 group bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl cursor-pointer pointer-events-auto select-none"
              >
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span className="text-xs font-semibold text-slate-300">{t('home.reflect', 'Reflect')}</span>
              </motion.button>
            </div>
          </div>

          {/* ── ROW 2 & 3: TODAY'S TASKS (cols 1-7) & ROUTINE/STREAK STACK (cols 8-12) ── */}

          {/* TODAY'S TASKS (Mobile: Order 4, Desktop: Left Row 2 & 3) */}
          <div className="w-full order-4 lg:order-none lg:col-span-7 lg:col-start-1 lg:row-start-2 lg:row-span-2 flex flex-col">
            <div className="h-full mx-5 lg:mx-0 p-5 rounded-3xl relative overflow-hidden flex flex-col justify-between bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
              <div className="flex items-center justify-between pb-3">
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-violet-500" />
                  <h2 className="text-sm font-bold text-white">{t('home.todaysTasks', "Today's Tasks")}</h2>
                </div>
                <button type="button" onClick={() => { useTaskStore.getState().setEditingTaskId(null); setActiveTab && setActiveTab('add_edit_task_dark_mode'); }} className="text-xs font-semibold text-primary hover:text-primary flex items-center gap-1 cursor-pointer pointer-events-auto">
                  <Plus className="w-3.5 h-3.5" /> {t('home.addTask', 'Add Task')}
                </button>
              </div>

              <div className="flex-1 flex flex-col justify-center min-h-0">
                {displayTasks.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center py-6 text-center">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-2.5 bg-violet-500/10 text-violet-400 border border-violet-500/20 shadow-inner">
                      <CheckSquare className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-semibold text-slate-200">{t('home.noTasksToday', 'No tasks scheduled for today')}</p>
                    <p className="text-xs text-slate-400 mt-1 max-w-xs">{t('home.allCaughtUp', 'You are all caught up! Enjoy your free time or add a new task to stay organized.')}</p>
                  </div>
                ) : (
                  <div className="flex-1 overflow-y-auto no-scrollbar space-y-2 pr-1 max-h-[220px] xl:max-h-[240px]">
                    {displayTasks.map((task) => (
                      <motion.div
                        key={task.id}
                        onClick={() => {
                          setActiveTab && setActiveTab('task_details_dark_mode', { taskId: task.id });
                        }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.985 }}
                        transition={{ duration: 0.14 }}
                        className="p-3.5 rounded-2xl flex items-center justify-between bg-black/40 backdrop-blur-xl border border-white/10 shadow-sm transition-colors hover:bg-black/50 cursor-pointer pointer-events-auto select-none"
                      >
                        <div className="flex items-center gap-3 min-w-0 pr-2">
                          <motion.button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); toggleTaskStatus(task.id); }}
                            aria-label="Toggle task status"
                            whileTap={{ scale: 0.82 }}
                            transition={{ duration: 0.1 }}
                            className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-all cursor-pointer pointer-events-auto shrink-0 ${
                              task.status === 'done' || task.status === 'completed'
                                ? 'bg-primary border-primary text-white shadow-sm'
                                : 'border-slate-600 hover:border-primary text-transparent'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                          </motion.button>
                          <span className={`text-xs font-medium truncate ${task.status === 'done' || task.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-300'}`}>
                            {task.title}
                          </span>
                        </div>
                        {task.priority && (
                          <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full flex-shrink-0 ${
                            String(task.priority).toLowerCase() === 'urgent' || String(task.priority).toLowerCase() === 'high'
                              ? 'bg-rose-500/20 text-rose-500 border border-rose-500/30'
                              : String(task.priority).toLowerCase() === 'medium'
                              ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30'
                              : 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'
                          }`}>{task.priority}</span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ROUTINE & PRAYER SECTION (Mobile: Order 3, Desktop: Right Row 2) */}
          <div className="w-full order-3 lg:order-none lg:col-span-5 lg:col-start-8 lg:row-start-2 flex flex-col">
            <div className="mx-5 lg:mx-0 p-5 rounded-3xl relative overflow-hidden space-y-3.5 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <h2 className="text-sm font-bold text-white">{t('home.routineAndPrayer', 'Routine & Prayer')}</h2>
                </div>
                <button type="button" onClick={() => setActiveTab && setActiveTab('prayer_times_dark_mode')} className="text-xs font-semibold text-primary hover:text-primary cursor-pointer pointer-events-auto">
                  {t('common.edit', 'Edit')}
                </button>
              </div>
              <div className="p-3.5 rounded-2xl flex items-center justify-between relative z-10 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-2xl bg-primary/20 text-primary flex items-center justify-center shadow-sm border border-primary/30 shrink-0">
                    <Sun className="w-4 h-4"/>
                  </div>
                  <div className="flex flex-col justify-center min-w-0">
                    <span className="text-[11px] font-medium text-slate-400 leading-tight block whitespace-nowrap">{t('home.nextPrayerIn', { name: prayerSchedule.nextPrayer.name, time: prayerSchedule.countdownText })}</span>
                    <span className="text-base font-bold text-white font-display leading-tight mt-0.5">{prayerSchedule.nextPrayer.time}</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white shadow-sm shrink-0 flex items-center justify-center self-center">{t('home.upcoming', 'Upcoming')}</span>
              </div>
              <div className="grid grid-cols-5 gap-2 w-full relative z-10">
                {prayerSchedule.prayers.map((prayer) => (
                  <div
                    key={prayer.id}
                    className={`py-2 px-1 rounded-2xl text-center border transition-all flex flex-col items-center justify-center min-h-[50px] ${
                      prayer.isNext
                        ? 'bg-primary/20 border-primary shadow-sm shadow-primary/20'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <span className={`text-[10px] block font-medium leading-tight ${prayer.isNext ? 'text-primary font-bold' : 'text-slate-400'}`}>
                      {prayer.name}
                    </span>
                    <span className={`text-[11px] block mt-1 font-bold font-display leading-tight ${prayer.isNext ? 'text-white' : prayer.isPassed ? 'text-slate-400 line-through' : 'text-slate-300'}`}>
                      {prayer.time.split(' ')[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* HABIT STREAK HERO BANNER (Mobile: Order 5, Desktop: Right Row 3) */}
          <div className="w-full order-5 lg:order-none lg:col-span-5 lg:col-start-8 lg:row-start-3 flex flex-col">
            <div onClick={() => { if (typeof setActiveTab === 'function') { setActiveTab('daily_routine_dark_mode'); } else { useNavigationStore.getState().setActiveTab('daily_routine_dark_mode'); } }} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (typeof setActiveTab === 'function') { setActiveTab('daily_routine_dark_mode'); } else { useNavigationStore.getState().setActiveTab('daily_routine_dark_mode'); } } }} aria-label="View Daily Routine" className="h-full mx-5 lg:mx-0 p-4 rounded-3xl bg-black/60 backdrop-blur-xl border border-white/15 shadow-xl flex items-center justify-between cursor-pointer hover:bg-black/70 hover:border-primary/40 active:scale-[0.99] transition-all pointer-events-auto">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-primary/20 text-primary flex items-center justify-center font-bold text-lg shadow-inner border border-primary/30 shrink-0">
                  🔥
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-white truncate">{routineStreak > 0 ? t('home.routineStreak', { count: routineStreak }) : t('home.startHabitStreak', 'Start Your Habit Streak')}</h3>
                  <p className="text-xs text-slate-300 mt-0.5 truncate">{t('home.consistencyMastery', 'Consistency creates mastery')}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-primary shrink-0" />
            </div>
          </div>
        </div>
      </main>

      {/* Savings Target Modal */}
      {isTargetModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200 pointer-events-auto"
          onClick={handleCancelTarget}
        >
          <div
            className="w-full max-w-sm rounded-3xl p-6 shadow-2xl space-y-4 border bg-slate-900/80 backdrop-blur-2xl border-white/10 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {savingsModalMode === 'create'
                      ? t('home.setSavingsTarget', 'Set Savings Target')
                      : t('home.editSavingsTarget', 'Edit Savings Target')}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {savingsModalMode === 'create'
                      ? t('home.createTargetSubtitle', 'Define a new savings goal')
                      : t('home.editTargetSubtitle', 'Update your savings goal and progress')}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCancelTarget}
                className="p-1 rounded-xl text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {targetValidationError && (
              <div className="p-2.5 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs font-medium">
                {targetValidationError}
              </div>
            )}

            <form onSubmit={handleSaveTarget} className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">
                  AFN Target (افـ)
                </label>
                <input
                  type="number"
                  min="0"
                  step="100"
                  value={targetFormAFN}
                  onChange={(e) => { setTargetFormAFN(e.target.value); setTargetValidationError(''); }}
                  placeholder="0"
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm border font-semibold outline-none focus:border-primary bg-slate-800/80 border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">
                  AFN Contributed Savings (افـ)
                </label>
                <input
                  type="number"
                  min="0"
                  step="100"
                  value={contributedFormAFN}
                  onChange={(e) => setContributedFormAFN(e.target.value)}
                  placeholder="0"
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm border font-semibold outline-none focus:border-primary bg-slate-800/80 border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">
                  USD Target ($)
                </label>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={targetFormUSD}
                  onChange={(e) => { setTargetFormUSD(e.target.value); setTargetValidationError(''); }}
                  placeholder="0"
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm border font-semibold outline-none focus:border-primary bg-slate-800/80 border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">
                  USD Contributed Savings ($)
                </label>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={contributedFormUSD}
                  onChange={(e) => setContributedFormUSD(e.target.value)}
                  placeholder="0"
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm border font-semibold outline-none focus:border-primary bg-slate-800/80 border-slate-700 text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCancelTarget}
                  className="px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer text-slate-400 hover:bg-slate-800"
                >
                  {t('common.cancel', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-white shadow-md shadow-primary/25 hover:bg-primary/90 cursor-pointer"
                >
                  {t('common.save', 'Save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
