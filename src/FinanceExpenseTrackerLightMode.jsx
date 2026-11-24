import { useTranslation } from 'react-i18next';
import MomentumGlassHeader from './components/MomentumGlassHeader';
import { useState, useMemo } from 'react';
import { useFinanceStore, formatSingleCurrency, calculateGroupedTotals } from './store/useFinanceStore';
import { useNavigationStore } from './store/useNavigationStore';
import { useNotificationStore } from './store/useNotificationStore';
import { useAppTime } from './hooks/useAppTime';
import StackedCurrencyDisplay from './components/StackedCurrencyDisplay';
import UserAvatar from './components/UserAvatar';
import { toast } from './components/ui/toast/index.js';
import { confirm } from './components/ui/confirmation/index.js';

import { 
  Coins, Bell, ChevronDown, Wallet, Leaf, ArrowDownLeft, ArrowUpRight, Search, Plus, Upload, Download, FileText, Pencil, Trash2, Edit2, Repeat, Check, X, SearchX, LayoutDashboard, CreditCard, TrendingUp, TrendingDown, CalendarClock, Info, Utensils, Coffee, Heart, Wifi, ShoppingBag, Home as HomeIcon, Building2, Palette, Store, Award 
} from 'lucide-react';

const getCurrentMonthOptions = (date = new Date(), timeZone) => {
  const options = [];
  const map = {};
  for (let i = 0; i < 3; i++) {
    const d = new Date(date);
    d.setDate(1);
    d.setMonth(d.getMonth() - i);
    const label = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone });
    let year = d.getFullYear();
    let month = String(d.getMonth() + 1).padStart(2, '0');
    if (timeZone) {
      try {
        const parts = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', timeZone }).formatToParts(d);
        for (const p of parts) {
          if (p.type === 'year') year = p.value;
          if (p.type === 'month') month = p.value;
        }
      } catch {
        // Fallback
      }
    }
    options.push(label);
    map[label] = `${year}-${month}`;
  }
  options.push('All Months');
  map['All Months'] = 'all';
  return { options, map };
};

const CATEGORY_OPTIONS = [
  'All Categories',
  'Food & Dining',
  'Housing',
  'Utilities',
  'Shopping',
  'Halal & Charity',
  'Wellness',
  'Salary',
  'Freelance',
  'Business',
  'Investments',
  'Gifts',
];

const SORT_OPTIONS = [
  'Date',
  'Date (Oldest)',
  'Amount: High to Low',
  'Amount: Low to High',
];

const SPENDING_CATEGORIES = [
  { id: 'housing', filterKey: 'Housing', label: 'Housing', icon: HomeIcon, lightIconColor: 'text-slate-600', darkIconColor: 'text-slate-300' },
  { id: 'food', filterKey: 'Food & Dining', label: 'Food & Dining', icon: Utensils, lightIconColor: 'text-slate-600', darkIconColor: 'text-slate-300' },
  { id: 'shopping', filterKey: 'Shopping', label: 'Shopping', icon: ShoppingBag, lightIconColor: 'text-slate-600', darkIconColor: 'text-slate-300' },
  { id: 'wellness', filterKey: 'Wellness', label: 'Wellness', icon: Heart, lightIconColor: 'text-rose-500', darkIconColor: 'text-rose-400' },
  { id: 'charity', filterKey: 'Halal & Charity', label: 'Sadaqah', icon: Leaf, lightIconColor: 'text-emerald-600', darkIconColor: 'text-emerald-400' },
  { id: 'utilities', filterKey: 'Utilities', label: 'Utilities', icon: Wifi, lightIconColor: 'text-teal-600', darkIconColor: 'text-teal-400' },
];

const INCOME_CATEGORIES = ['All Sources', 'Salary', 'Freelance', 'Business', 'Bonus', 'Other'];

const getPreviousMonthKey = (periodKey) => {
  if (!periodKey || periodKey === 'all') {
    const d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() - 1);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    return `${y}-${m}`;
  }
  const [y, m] = periodKey.split('-').map(Number);
  const d = new Date(y, m - 1 - 1, 1);
  const prevY = d.getFullYear();
  const prevM = String(d.getMonth() + 1).padStart(2, '0');
  return `${prevY}-${prevM}`;
};

const calculateTrend = (current, previous) => {
  if (previous === 0) {
    if (current > 0) return { diff: 100, label: '+100%', direction: 'up' };
    return { diff: 0, label: '0.0%', direction: 'neutral' };
  }
  const pct = ((current - previous) / previous) * 100;
  if (Math.abs(pct) < 0.05) return { diff: 0, label: '0.0%', direction: 'neutral' };
  if (pct > 0) return { diff: pct, label: `+${pct.toFixed(1)}%`, direction: 'up' };
  return { diff: pct, label: `${pct.toFixed(1)}%`, direction: 'down' };
};

const formatIncomeDate = (dateStr) => {
  if (!dateStr) return 'Recent';
  const d = new Date(dateStr + (dateStr.length === 10 ? 'T00:00:00' : ''));
  return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
};

const getDaysRemainingText = (targetDateStr, todayStr) => {
  if (!targetDateStr) return 'Scheduled';
  const target = new Date(targetDateStr + (targetDateStr.length === 10 ? 'T00:00:00' : ''));
  const today = new Date(todayStr + 'T00:00:00');
  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return 'Past due';
  if (diffDays === 0) return 'Expected today';
  if (diffDays === 1) return 'Expected tomorrow (1 day)';
  return `Expected in ${diffDays} days`;
};

const getExpenseCategoryIcon = (category) => {
  const cat = (category || '').toLowerCase();
  if (cat.includes('food') || cat.includes('grocer') || cat.includes('dining') || cat.includes('meal')) return <Utensils className="w-5 h-5"/>;
  if (cat.includes('coffee') || cat.includes('pastry') || cat.includes('cafe')) return <Coffee className="w-5 h-5"/>;
  if (cat.includes('util') || cat.includes('internet') || cat.includes('electric') || cat.includes('water')) return <Wifi className="w-5 h-5"/>;
  if (cat.includes('hous') || cat.includes('rent') || cat.includes('home')) return <HomeIcon className="w-5 h-5"/>;
  if (cat.includes('shop') || cat.includes('cloth') || cat.includes('store')) return <ShoppingBag className="w-5 h-5"/>;
  if (cat.includes('health') || cat.includes('well') || cat.includes('gym') || cat.includes('fit')) return <Heart className="w-5 h-5"/>;
  if (cat.includes('charity') || cat.includes('sadaqah') || cat.includes('donat') || cat.includes('halal')) return <Leaf className="w-5 h-5"/>;
  if (cat.includes('salary') || cat.includes('freelance') || cat.includes('business') || cat.includes('invest') || cat.includes('gift') || cat.includes('income')) return <Coins className="w-5 h-5"/>;
  return <CreditCard className="w-5 h-5"/>;
};

const getIncomeCategoryIcon = (category) => {
  switch (category) {
    case 'Salary': return <Building2 className="w-5 h-5 text-primary" />;
    case 'Freelance': return <Palette className="w-5 h-5 text-fuchsia-600" />;
    case 'Business': return <Store className="w-5 h-5 text-amber-600" />;
    case 'Bonus': return <Award className="w-5 h-5 text-sky-600" />;
    default: return <Wallet className="w-5 h-5 text-emerald-600" />;
  }
};

const getIncomeBadgeClass = (category) => {
  switch (category) {
    case 'Salary': return 'bg-primary/15 text-primary';
    case 'Freelance': return 'bg-fuchsia-100 text-fuchsia-700';
    case 'Business': return 'bg-amber-100 text-amber-700';
    case 'Bonus': return 'bg-sky-100 text-sky-700';
    default: return 'bg-slate-100 text-slate-700';
  }
};

export default function FinanceExpenseTrackerLightMode({ setActiveTab, initialTab = 'dashboard' }) {
  const { t } = useTranslation();
  const { now, currentDateKey, currentYear, currentMonth, currentDay, effectiveTimezone } = useAppTime();
  const { options: MONTH_OPTIONS, map: MONTH_MAP } = useMemo(() => {
    return getCurrentMonthOptions(now, effectiveTimezone);
  }, [now, effectiveTimezone]);
  const CURRENT_MONTH_LABEL = MONTH_OPTIONS[0];

  const storeFinanceSubTab = useNavigationStore((s) => s.financeSubTab);
  const setFinanceSubTab = useNavigationStore((s) => s.setFinanceSubTab);
  const unreadNotifCount = useNotificationStore((s) => s.notifications?.filter((n) => !n.read).length || 0);

  const activeFinanceTab = storeFinanceSubTab || initialTab || 'dashboard';

  const handleFinanceTabChange = (tab) => {
    setFinanceSubTab(tab);
    setSearchQuery('');
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(CURRENT_MONTH_LABEL);
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [sortOrder, setSortOrder] = useState('Date');
  const [selectedIncomeCategory, setSelectedIncomeCategory] = useState('All Sources');

  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [budgetFormAFN, setBudgetFormAFN] = useState('');
  const [budgetFormUSD, setBudgetFormUSD] = useState('');

  const { accounts, transactions, incomes, monthlyBudgetCap, updateBudgetCap, deleteTransaction, deleteIncome, setEditingIncome, setEditingTransaction, _hasHydrated } = useFinanceStore();

  const todayStr = currentDateKey;
  const currentPeriodKey = MONTH_MAP[selectedMonth] || MONTH_MAP[CURRENT_MONTH_LABEL];
  const monthTransactions = (_hasHydrated ? (transactions || []) : []).filter((tx) => {
    if (selectedMonth !== 'All Months') {
      if (tx.date && !tx.date.startsWith(currentPeriodKey)) return false;
    }
    return true;
  });

  const incomeGrouped = calculateGroupedTotals(monthTransactions.filter((tx) => tx.type === 'income'));
  const expensesGrouped = calculateGroupedTotals(monthTransactions.filter((tx) => tx.type === 'expense'));
  const accountsGrouped = calculateGroupedTotals(accounts || []);

  const allActiveCurrencies = Array.from(new Set([
    ...Object.keys(incomeGrouped),
    ...Object.keys(expensesGrouped),
    ...Object.keys(accountsGrouped),
  ]));
  if (allActiveCurrencies.length === 0) allActiveCurrencies.push('USD');

  const remainingBalanceGrouped = {};
  allActiveCurrencies.forEach((cur) => {
    const accBal = accountsGrouped[cur] || 0;
    const inc = incomeGrouped[cur] || 0;
    const exp = expensesGrouped[cur] || 0;
    remainingBalanceGrouped[cur] = accBal > 0 ? (accBal + inc - exp) : (inc - exp);
  });

  const getDaysInfoForMonth = (monthLabel) => {
    const ym = MONTH_MAP[monthLabel];
    if (!ym || ym === 'all') {
      const daysInCurrentMonth = new Date(currentYear, currentMonth, 0).getDate();
      return { totalDays: daysInCurrentMonth, currentDay, remainingDays: Math.max(1, daysInCurrentMonth - currentDay + 1) };
    }
    const [yearStr, monthStr] = ym.split('-');
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);
    const totalDays = new Date(year, month, 0).getDate();
    const isCurrentMonth = currentYear === year && currentMonth === month;
    const isPastMonth = (currentYear > year) || (currentYear === year && currentMonth > month);
    const currentDayVal = isCurrentMonth ? currentDay : (isPastMonth ? totalDays : 1);
    const remainingDays = isCurrentMonth ? Math.max(1, totalDays - currentDay + 1) : (isPastMonth ? 1 : totalDays);
    return { totalDays, currentDay: currentDayVal, remainingDays };
  };

  const { remainingDays } = getDaysInfoForMonth(selectedMonth);
  const safeToSpendDailyGrouped = {};
  allActiveCurrencies.forEach((cur) => {
    const rem = remainingBalanceGrouped[cur] || 0;
    safeToSpendDailyGrouped[cur] = rem > 0 && remainingDays > 0 ? rem / remainingDays : 0;
  });
  const safeToSpendGrouped = safeToSpendDailyGrouped;
  const isAnyOverBudget = allActiveCurrencies.some((cur) => remainingBalanceGrouped[cur] <= 0 && (expensesGrouped[cur] || 0) > 0);
  const isOverPace = isAnyOverBudget;
  const paceBadgeText = isOverPace ? 'Over budget' : 'Safe pace';

  const activeBudgetCap = monthlyBudgetCap || {};
  const activeBudgetCurrencies = useMemo(() => {
    const list = [];
    ['AFN', 'USD', 'EUR', 'GBP'].forEach((cur) => {
      const capVal = Number(activeBudgetCap[cur]) || 0;
      const expVal = Number(expensesGrouped[cur]) || 0;
      if (capVal > 0 || expVal > 0) {
        list.push(cur);
      }
    });
    if (list.length === 0) {
      list.push(allActiveCurrencies[0] || 'AFN');
    }
    return list;
  }, [activeBudgetCap, expensesGrouped, allActiveCurrencies]);

  const budgetSpentDisplayGrouped = useMemo(() => {
    const res = {};
    activeBudgetCurrencies.forEach((cur) => {
      res[cur] = expensesGrouped[cur] || 0;
    });
    return res;
  }, [activeBudgetCurrencies, expensesGrouped]);

  const budgetCapDisplayGrouped = useMemo(() => {
    const res = {};
    activeBudgetCurrencies.forEach((cur) => {
      res[cur] = activeBudgetCap[cur] || 0;
    });
    return res;
  }, [activeBudgetCurrencies, activeBudgetCap]);

  const primaryBudgetCurrency = activeBudgetCurrencies[0] || 'AFN';
  const spentInPrimary = Number(expensesGrouped[primaryBudgetCurrency]) || 0;
  const capInPrimary = Number(activeBudgetCap[primaryBudgetCurrency]) || 0;
  const rawBudgetUsedPercent = capInPrimary > 0 ? (spentInPrimary / capInPrimary) * 100 : 0;
  const budgetUsedPercent = Math.round(rawBudgetUsedPercent);
  const budgetBarWidth = Math.min(Math.max(0, rawBudgetUsedPercent), 100);

  const getCategorySpent = (filterKey) => {
    const k = filterKey.toLowerCase();
    const matching = monthTransactions.filter((tx) => {
      if (tx.type !== 'expense') return false;
      const txCat = (tx.category || '').toLowerCase();
      return txCat === k || txCat.includes(k) || k.includes(txCat);
    });
    return calculateGroupedTotals(matching);
  };

  const filteredExpenseTransactions = monthTransactions.filter((tx) => {
    if (tx.type !== 'expense') return false;
    if (categoryFilter !== 'All Categories') {
      const cat = (tx.category || '').toLowerCase();
      const filterCat = categoryFilter.toLowerCase();
      if (!cat.includes(filterCat) && !filterCat.includes(cat)) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = tx.title && tx.title.toLowerCase().includes(q);
      const matchCategory = tx.category && tx.category.toLowerCase().includes(q);
      const matchNote = tx.note && tx.note.toLowerCase().includes(q);
      if (!matchTitle && !matchCategory && !matchNote) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortOrder === 'Date') return new Date(b.date || 0) - new Date(a.date || 0);
    if (sortOrder === 'Date (Oldest)') return new Date(a.date || 0) - new Date(b.date || 0);
    if (sortOrder === 'Amount: High to Low') return (Number(b.amount) || 0) - (Number(a.amount) || 0);
    if (sortOrder === 'Amount: Low to High') return (Number(a.amount) || 0) - (Number(b.amount) || 0);
    return 0;
  });

  const periodIncomes = (incomes || []).filter((item) => {
    if (currentPeriodKey === 'all') return true;
    return item.date && item.date.startsWith(currentPeriodKey);
  });

  const prevPeriodKey = getPreviousMonthKey(currentPeriodKey);
  const prevIncomes = (incomes || []).filter((item) => item.date && item.date.startsWith(prevPeriodKey));
  const prevTotal = prevIncomes.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const incomeTotalInflowGrouped = calculateGroupedTotals(periodIncomes);
  const incomeTotalInflowNumeric = periodIncomes.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const incomeTrend = calculateTrend(incomeTotalInflowNumeric, prevTotal);

  const activeIncomes = periodIncomes.filter((item) => ['Salary', 'Freelance'].includes(item.category) || item.incomeType === 'active');
  const activeTotalGrouped = calculateGroupedTotals(activeIncomes);
  const activeIncomeGrouped = activeTotalGrouped;
  const activeTotalNumeric = activeIncomes.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const passiveIncomes = periodIncomes.filter((item) => !['Salary', 'Freelance'].includes(item.category) && item.incomeType !== 'active');
  const passiveTotalGrouped = calculateGroupedTotals(passiveIncomes);
  const passiveIncomeGrouped = passiveTotalGrouped;
  const activePct = incomeTotalInflowNumeric > 0 ? ((activeTotalNumeric / incomeTotalInflowNumeric) * 100).toFixed(1) : '0.0';
  const passivePct = incomeTotalInflowNumeric > 0 ? (((incomeTotalInflowNumeric - activeTotalNumeric) / incomeTotalInflowNumeric) * 100).toFixed(1) : '0.0';

  const periodExpenses = monthTransactions.filter((tx) => tx.type === 'expense');
  const prevExpenses = (transactions || []).filter((tx) => tx.type === 'expense' && tx.date && tx.date.startsWith(prevPeriodKey));
  const prevExpenseTotal = prevExpenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const expenseTotalOutflowGrouped = calculateGroupedTotals(periodExpenses);
  const expenseTotalOutflowNumeric = periodExpenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const expenseTrend = calculateTrend(expenseTotalOutflowNumeric, prevExpenseTotal);

  const FIXED_CATS = ['housing', 'utilities', 'bills', 'rent'];
  const fixedExpenses = periodExpenses.filter((tx) => FIXED_CATS.some((fc) => (tx.category || '').toLowerCase().includes(fc)));
  const fixedTotalGrouped = calculateGroupedTotals(fixedExpenses);
  const fixedExpensesGrouped = fixedTotalGrouped;
  const fixedTotalNumeric = fixedExpenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const variableExpenses = periodExpenses.filter((tx) => !FIXED_CATS.some((fc) => (tx.category || '').toLowerCase().includes(fc)));
  const variableTotalGrouped = calculateGroupedTotals(variableExpenses);
  const variableExpensesGrouped = variableTotalGrouped;
  const fixedPct = expenseTotalOutflowNumeric > 0 ? ((fixedTotalNumeric / expenseTotalOutflowNumeric) * 100).toFixed(1) : '0.0';
  const variablePct = expenseTotalOutflowNumeric > 0 ? (((expenseTotalOutflowNumeric - fixedTotalNumeric) / expenseTotalOutflowNumeric) * 100).toFixed(1) : '0.0';

  const upcomingDeposits = (incomes || []).filter((item) => {
    if (!item.date) return false;
    const isFuture = item.date > todayStr;
    const isScheduledTag = item.status && item.status.toLowerCase().includes('scheduled');
    return isFuture || isScheduledTag;
  }).sort((a, b) => (a.date || '').localeCompare(b.date || ''));
  const nextExpectedDeposit = upcomingDeposits[0] || null;

  const filteredIncomes = periodIncomes.filter((item) => {
    const matchesCategory = selectedIncomeCategory === 'All Sources' || 
      (selectedIncomeCategory === 'Other' ? !['Salary', 'Freelance', 'Business', 'Bonus'].includes(item.category) : item.category === selectedIncomeCategory);
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || (item.title && item.title.toLowerCase().includes(q)) || (item.payerName && item.payerName.toLowerCase().includes(q)) || (item.category && item.category.toLowerCase().includes(q)) || (item.notes && item.notes.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const getIncomeCategoryCount = (cat) => {
    if (cat === 'All Sources') return periodIncomes.length;
    if (cat === 'Other') return periodIncomes.filter((i) => !['Salary', 'Freelance', 'Business', 'Bonus'].includes(i.category)).length;
    return periodIncomes.filter((i) => i.category === cat).length;
  };

  const handleEditIncome = (item) => {
    if (setEditingIncome) setEditingIncome(item);
    if (setActiveTab) setActiveTab('add_income_light_mode');
  };

  const handleDeleteIncome = async (item) => {
    const itemName = item.title || item.payerName || 'this income stream';
    const confirmed = await confirm({
      variant: 'destructive',
      titleKey: 'confirm.deleteIncomeTitle',
      message: `Delete income stream "${itemName}"? This action cannot be undone.`,
      confirmLabelKey: 'confirm.delete',
      cancelLabelKey: 'confirm.cancel',
    });
    if (confirmed) {
      deleteIncome(item.id);
      toast.success(t('toasts.incomeDeleted', 'Income stream deleted'));
    }
  };

  const handleExportIncomeCSV = () => {
    const itemsToExport = filteredIncomes.length > 0 ? filteredIncomes : periodIncomes;
    if (itemsToExport.length === 0) {
      toast.warning(t('toasts.noIncomeExport', 'No income records available to export'));
      return;
    }
    const headers = ['ID', 'Title', 'Category', 'Amount', 'Currency', 'Date', 'Status', 'Recurrence', 'Notes'];
    const rows = itemsToExport.map((item) => [
      `"${item.id || ''}"`,
      `"${(item.title || item.payerName || '').replace(/"/g, '""')}"`,
      `"${(item.category || '').replace(/"/g, '""')}"`,
      item.amount || 0,
      `"${item.currency || 'USD'}"`,
      `"${item.date || ''}"`,
      `"${(item.status || t('finance.cleared', 'Cleared')).replace(/"/g, '""')}"`,
      `"${(item.recurrence || '').replace(/"/g, '""')}"`,
      `"${(item.notes || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `incomes_export_${currentPeriodKey}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    const itemsToExport = filteredExpenseTransactions.length > 0
      ? filteredExpenseTransactions
      : (transactions || []).filter((tx) => tx.type === 'expense');
    if (itemsToExport.length === 0) {
      toast.info(t('toasts.noExpenseExport', 'No expense records available to export.'));
      return;
    }
    const headers = ['Date', 'Category', 'Title', 'Amount', 'Currency', 'Notes'];
    const rows = itemsToExport.map((item) => [
      `"${item.date || ''}"`,
      `"${(item.category || '').replace(/"/g, '""')}"`,
      `"${(item.title || item.notes || '').replace(/"/g, '""')}"`,
      Number(item.amount || 0).toFixed(2),
      `"${item.currency || 'AFN'}"`,
      `"${(item.note || item.notes || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    const safeMonth = (selectedMonth || 'all').toLowerCase().replace(/\s+/g, '_');
    link.setAttribute('download', `expenses_export_${safeMonth}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleOpenBudgetModal = () => {
    const cap = monthlyBudgetCap || {};
    setBudgetFormAFN(cap.AFN !== undefined && cap.AFN !== null && Number(cap.AFN) > 0 ? String(cap.AFN) : '');
    setBudgetFormUSD(cap.USD !== undefined && cap.USD !== null && Number(cap.USD) > 0 ? String(cap.USD) : '');
    setIsBudgetModalOpen(true);
  };

  const handleSaveBudgetCap = (e) => {
    if (e) e.preventDefault();
    const afnVal = budgetFormAFN.trim() !== '' ? Math.max(0, parseFloat(budgetFormAFN) || 0) : 0;
    const usdVal = budgetFormUSD.trim() !== '' ? Math.max(0, parseFloat(budgetFormUSD) || 0) : 0;
    updateBudgetCap({ AFN: afnVal, USD: usdVal });
    setIsBudgetModalOpen(false);
  };

  return (
    <div className="relative w-full pb-36 bg-slate-50 text-slate-900 font-sans min-h-screen">
      {/* Top Header Bar (Hidden on desktop since DesktopSidebar provides branding & navigation) */}
      <MomentumGlassHeader isDarkMode={false} className="lg:hidden">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
            <Coins className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-slate-900 tracking-tight">{t('finance.title', 'Finance & Wealth')}</h1>
</div>
<div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab && setActiveTab('notifications_settings_light_mode')}
            aria-label="Notifications"
            className="relative p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors pointer-events-auto cursor-pointer"
          >
            <Bell className="w-5 h-5"/>
            {unreadNotifCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white" />
            )}
          </button>
          <UserAvatar 
            setActiveTab={setActiveTab} 
          />
        </div>
      </MomentumGlassHeader>

      {/* Sleek Glassmorphic Local Navigation Tabs */}
      <div className="px-5 lg:px-0 pt-1 pb-2 relative z-50">
        <div className="p-1 rounded-2xl bg-slate-200/60 backdrop-blur-xl border border-white/50 shadow-sm flex items-center justify-between gap-1">
          <button
            type="button"
            onClick={() => handleFinanceTabChange('dashboard')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer select-none ${activeFinanceTab === 'dashboard' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-white/40 font-medium'}`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>{t('finance.dashboard', 'Dashboard')}</span>
</button>
<button type="button"
            onClick={() => handleFinanceTabChange('expenses')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer select-none ${activeFinanceTab === 'expenses' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-white/40 font-medium'}`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>{t('finance.expenses', 'Expenses')}</span>
          </button>
          <button type="button"
            onClick={() => handleFinanceTabChange('income')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer select-none ${activeFinanceTab === 'income' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-white/40 font-medium'}`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{t('finance.income', 'Income')}</span>
          </button>
        </div>
      </div>

      <main className="flex-1 w-full bg-transparent relative z-10 pointer-events-auto">
        {(isMonthOpen || isCategoryOpen || isSortOpen) && (
          <div 
            className="fixed inset-0 z-40 bg-transparent pointer-events-auto"
            onMouseDown={() => {
              setIsMonthOpen(false);
              setIsCategoryOpen(false);
              setIsSortOpen(false);
            }}
            onClick={() => {
              setIsMonthOpen(false);
              setIsCategoryOpen(false);
              setIsSortOpen(false);
            }}
          />
        )}

        {/* Subtitle & Month Selector Row */}
        <div className="px-5 pt-2 pb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-normal">
              {activeFinanceTab === 'dashboard' && t('finance.financialOverview', 'Financial Overview')}
              {activeFinanceTab === 'expenses' && t('finance.expenseTracker', 'Expense Tracker')}
              {activeFinanceTab === 'income' && t('finance.incomeStreams', 'Income Streams')}
            </h2>
            <p className="text-xs font-normal text-slate-500 mt-0.5">
              {activeFinanceTab === 'dashboard' && t('finance.overviewSubtitle', 'Holistic wealth, spending pace & metrics')}
              {activeFinanceTab === 'expenses' && t('finance.expenseSubtitle', 'Manage & categorize all outflows')}
              {activeFinanceTab === 'income' && t('finance.incomeSubtitle', 'Recurring inflows, bonuses & deposits')}
            </p>
          </div>
          
          {/* Month Selector Dropdown */}
          <div className="relative z-50 pointer-events-auto">
            <button 
              type="button" 
              onClick={() => {
                setIsMonthOpen(!isMonthOpen);
                setIsCategoryOpen(false);
                setIsSortOpen(false);
              }}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50 shadow-sm text-xs font-bold text-primary flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer select-none pointer-events-auto"
            >
              <span>{selectedMonth}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-primary transition-transform ${isMonthOpen ? 'rotate-180' : ''}`}/>
            </button>
            {isMonthOpen && (
              <div className="absolute end-0 top-full mt-1.5 w-44 max-w-[calc(100vw-2rem)] rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200 shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100 pointer-events-auto">
                {MONTH_OPTIONS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setSelectedMonth(m);
                      setIsMonthOpen(false);
                    }}
                    onClick={() => {
                      setSelectedMonth(m);
                      setIsMonthOpen(false);
                    }}
                    className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between transition-colors cursor-pointer select-none pointer-events-auto ${selectedMonth === m ? 'text-primary font-bold bg-primary/10' : 'text-slate-700 hover:bg-slate-50 font-medium'}`}
                  >
                    <span>{m}</span>
                    {selectedMonth === m && <Check className="w-3.5 h-3.5 text-primary" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ==================== SUB-VIEW 1: OVERVIEW DASHBOARD ==================== */}
        {activeFinanceTab === 'dashboard' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* HERO REMAINING BALANCE CARD */}
            <div className="block mx-5 p-5 rounded-3xl space-y-4 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Wallet className="w-3.5 h-3.5 text-primary"/>Remaining Balance
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1 ${isOverPace ? 'bg-rose-50 border border-rose-200/80 text-rose-700' : 'bg-emerald-50 border border-emerald-200/80 text-emerald-700'}`}>
                  {isOverPace ? <ArrowUpRight className="w-3 h-3 text-rose-500"/> : <Leaf className="w-3 h-3 text-emerald-500"/>}
                  {paceBadgeText}
                </span>
              </div>

              <div className="flex flex-col items-start">
                <StackedCurrencyDisplay grouped={remainingBalanceGrouped} align="start" isDark={false} primaryClass="text-3xl font-bold text-slate-900 tracking-tight" secondaryClass="text-sm font-semibold text-slate-500 mt-0.5" />
              </div>

              <div className="flex items-center justify-between w-full pt-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full inline-block shrink-0 ${isOverPace ? 'bg-rose-500' : 'bg-emerald-500'}`}></span>
                  <span className="text-xs font-medium text-slate-500">{t('finance.safeToSpend', 'Safe to spend:')}</span>
                </div>
                <StackedCurrencyDisplay grouped={safeToSpendGrouped} align="end" suffix=" / day" isDark={false} primaryClass="text-xs sm:text-sm font-semibold text-slate-900" secondaryClass="text-xs text-gray-400 opacity-70 font-medium" />
              </div>

              <div className="w-full h-px bg-slate-200/80 my-3"></div>

              <div className="flex items-center justify-between w-full">
                <div className="flex-1 flex flex-col items-start min-w-0">
                  <span className="text-xs font-normal text-slate-500 flex items-center gap-1">
                    <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-600"/>Inflow
                  </span>
                  <StackedCurrencyDisplay grouped={incomeGrouped} align="start" isDark={false} primaryClass="text-sm font-bold text-slate-900 mt-0.5" secondaryClass="text-xs text-slate-500 font-medium" />
                </div>
                <div className="w-px h-10 bg-slate-200/80 mx-4 self-center shrink-0"></div>
                <div className="flex-1 flex flex-col items-start min-w-0">
                  <span className="text-xs font-normal text-slate-500 flex items-center gap-1">
                    <ArrowUpRight className="w-3.5 h-3.5 text-primary"/>Outflow
                  </span>
                  <StackedCurrencyDisplay grouped={expensesGrouped} align="start" isDark={false} primaryClass="text-sm font-bold text-slate-900 mt-0.5" secondaryClass="text-xs text-slate-500 font-medium" />
                </div>
              </div>

              <div className="w-full h-px bg-slate-200/80 my-3"></div>

              <div className="pt-0.5">
                <div className="flex items-center justify-between mb-1.5 text-[11px] font-medium">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500">{t('finance.monthlyBudgetCap', 'Monthly Budget Cap')}</span>
                    <button
                      type="button"
                      onClick={handleOpenBudgetModal}
                      title={t('finance.setMonthlyBudget', 'Set Monthly Budget')} className="p-1 rounded-md text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors cursor-pointer select-none"
                    >
                      <Pencil className="w-3 h-3" />
                    </button>
                  </div>
                  <span className={`font-semibold ${budgetUsedPercent >= 100 ? 'text-rose-600' : budgetUsedPercent >= 80 ? 'text-amber-600' : 'text-primary'}`}>{t('finance.budgetUsedPercent', { percent: budgetUsedPercent })}</span>
                </div>
                <div className="rounded-full h-2.5 bg-slate-100 overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ${budgetUsedPercent >= 100 ? 'bg-gradient-to-r from-rose-500 to-red-600' : budgetUsedPercent >= 80 ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-gradient-to-r from-primary to-cyan-500'}`} style={{ width: `${budgetBarWidth}%` }}></div>
                </div>
                <div className="flex items-start justify-between mt-2 text-xs font-normal">
                  <StackedCurrencyDisplay grouped={budgetSpentDisplayGrouped} includeZero={false} align="start" suffix=" spent" isDark={false} primaryClass="text-xs font-bold text-slate-800" secondaryClass="text-[10px] text-slate-400 font-medium" />
                  <StackedCurrencyDisplay grouped={budgetCapDisplayGrouped} includeZero={false} align="end" suffix=" limit" isDark={false} primaryClass="text-xs font-bold text-slate-800" secondaryClass="text-[10px] text-slate-400 font-medium" />
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS ROW */}
            <div className="px-5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => { if (setEditingTransaction) setEditingTransaction(null); if (setActiveTab) setActiveTab('add_edit_expense_light_mode'); }}
                className="p-3.5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg flex items-center gap-3 active:scale-95 transition-all text-left cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">{t('finance.logExpense', 'Log Expense')}</span>
                  <span className="text-[10px] text-slate-500">{t('finance.trackSpending', 'Track spending')}</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab && setActiveTab('add_income_light_mode')}
                className="p-3.5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg flex items-center gap-3 active:scale-95 transition-all text-left cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <ArrowDownLeft className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">{t('finance.addIncome', 'Add Income')}</span>
                  <span className="text-[10px] text-slate-500">{t('finance.recordInflow', 'Record inflow')}</span>
                </div>
              </button>
            </div>

            {/* SPENDING CATEGORIES SECTION */}
            <div className="flex items-center justify-between px-5 mb-2.5">
              <span className="text-xs font-semibold text-slate-900 uppercase tracking-wider">{t('finance.spendingCategories', 'Spending Categories')}</span>
              <button 
                type="button" 
                onClick={() => handleFinanceTabChange('expenses')}
                className="text-xs font-bold text-primary hover:text-primary active:scale-95 transition-all cursor-pointer select-none"
              >
                {t('finance.viewDetails', 'View Details →')}
              </button>
            </div>
              <div className="flex items-center gap-3.5 px-5 overflow-x-auto scrollbar-none pb-2 pt-1">
                {SPENDING_CATEGORIES.map((cat) => {
                  const IconComp = cat.icon;
                  const spent = getCategorySpent(cat.filterKey);
                  return (
                    <div 
                      key={cat.id}
                      onClick={() => {
                        setCategoryFilter(cat.filterKey);
                        handleFinanceTabChange('expenses');
                      }}
                      className="w-32 min-h-[120px] rounded-2xl transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer select-none flex flex-col items-center justify-center gap-2 flex-shrink-0 p-3 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg"
                    >
                      <div className={`w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center ${cat.lightIconColor} flex-shrink-0`}>
                        <IconComp className="w-4 h-4"/>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <p className="text-xs font-normal text-slate-500 text-center truncate max-w-[100px]">{cat.label}</p>
                        <StackedCurrencyDisplay grouped={spent} align="center" decimals={0} isDark={false} primaryClass="text-sm font-bold text-slate-900 text-center" secondaryClass="text-[11px] font-medium text-slate-500 text-center" />
                      </div>
                    </div>
                  );
                })}
              </div>

            {/* RECENT MIXED ACTIVITY */}
            <div className="px-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-900 uppercase tracking-wider">{t('finance.recentActivity', 'Recent Activity')}</span>
                <span className="text-xs font-semibold text-slate-500">
                  {monthTransactions.length} {t('finance.records', 'records')}
                </span>
              </div>

              {monthTransactions.length === 0 ? (
                <div className="p-6 rounded-2xl border text-center bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
                  <p className="text-xs text-slate-500">{t('finance.noTransactionsPeriod', 'No transactions recorded for this period.')}</p>
                </div>
              ) : (
                monthTransactions.slice(0, 5).map((tx) => (
                  <div key={tx.id} className="p-3.5 rounded-2xl flex items-center justify-between gap-3 min-h-[64px] bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${tx.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-primary/10 text-primary'}`}>
                        {getExpenseCategoryIcon(tx.category)}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold text-slate-900 truncate">{tx.title}</span>
                        <span className="text-xs font-normal text-slate-500 truncate">{tx.category} • {tx.date}</span>
                      </div>
                    </div>
                    <span className={`text-sm font-bold ${tx.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}`}>
                      {formatSingleCurrency(tx.amount, tx.currency, { showSign: true })}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ==================== SUB-VIEW 2: EXPENSE TRACKER ==================== */}
        {activeFinanceTab === 'expenses' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Total Monthly Outflow Summary Card */}
            <div className="mx-5 p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg relative overflow-hidden space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-slate-500 flex items-center gap-1.5">
                    Total Monthly Outflow
                    <Info className="w-4 h-4 text-slate-500" />
                  </span>
                  <div className="flex flex-col items-start mt-1">
                    <StackedCurrencyDisplay grouped={expenseTotalOutflowGrouped} align="start" isDark={false} primaryClass="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight" secondaryClass="text-sm sm:text-base font-semibold text-slate-500 mt-0.5" />
                  </div>
                </div>
                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full border ${expenseTrend.direction === 'down' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : expenseTrend.direction === 'up' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                  {expenseTrend.direction === 'down' ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                  <span className="text-xs font-bold">{expenseTrend.label}</span>
                </div>
              </div>

              {/* Breakdown Sub-metrics */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="rounded-2xl p-3 flex flex-col items-start justify-between min-h-[92px] bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <span className="text-xs font-medium text-slate-500">{t('finance.fixedExpenses', 'Fixed Expenses')}</span>
                  </div>
                  <StackedCurrencyDisplay grouped={fixedExpensesGrouped} align="start" isDark={false} primaryClass="text-sm sm:text-base font-bold text-slate-900" secondaryClass="text-xs text-slate-500 font-medium" />
                  <span className="text-xs font-medium text-slate-500 mt-1">{fixedPct}% {t('finance.ofTotal', 'of total')}</span>
                </div>
                <div className="rounded-2xl p-3 flex flex-col items-start justify-between min-h-[92px] bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="text-xs font-medium text-slate-500">{t('finance.variableExpenses', 'Variable Expenses')}</span>
                  </div>
                  <StackedCurrencyDisplay grouped={variableExpensesGrouped} align="start" isDark={false} primaryClass="text-sm sm:text-base font-bold text-slate-900" secondaryClass="text-xs text-slate-500 font-medium" />
                  <span className="text-xs font-medium text-slate-500 mt-1">{variablePct}% {t('finance.ofTotal', 'of total')}</span>
                </div>
              </div>
            </div>

            <div className="mx-5 flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder={t('finance.searchExpensesPlaceholder', 'Search expenses...')} className="w-full py-3 pl-10 pr-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-sm text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 pointer-events-auto" 
                />
              </div>
              <button 
                type="button"
                onClick={() => { if (setEditingTransaction) setEditingTransaction(null); if (setActiveTab) setActiveTab('add_edit_expense_light_mode'); }}
                className="btn-primary pointer-events-auto cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4"/> <span>Add</span>
              </button>
            </div>

            {/* FILTER BAR WITH DROPDOWNS & EXPORT */}
            <div className="flex items-center justify-between px-5 relative z-50 pointer-events-auto">
              <div className="flex items-center gap-2">
                {/* Category Dropdown */}
                <div className="relative z-50 pointer-events-auto">
                  <button 
                    type="button" 
                    onClick={() => {
                      setIsCategoryOpen(!isCategoryOpen);
                      setIsMonthOpen(false);
                      setIsSortOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-semibold shadow-sm flex items-center gap-1 active:scale-95 transition-all cursor-pointer select-none pointer-events-auto ${categoryFilter !== 'All Categories' ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50 shadow-sm'}`}
                  >
                    <span className="truncate max-w-[110px]">{categoryFilter}</span>
                    <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`}/>
                  </button>
                  {isCategoryOpen && (
                    <div className="absolute start-0 top-full mt-1.5 w-48 max-w-[calc(100vw-2rem)] rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200 shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100 max-h-60 overflow-y-auto pointer-events-auto">
                      {CATEGORY_OPTIONS.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setCategoryFilter(cat);
                            setIsCategoryOpen(false);
                          }}
                          onClick={() => {
                            setCategoryFilter(cat);
                            setIsCategoryOpen(false);
                          }}
                          className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between transition-colors cursor-pointer select-none pointer-events-auto ${categoryFilter === cat ? 'text-primary font-bold bg-primary/10' : 'text-slate-700 hover:bg-slate-50 font-medium'}`}
                        >
                          <span className="truncate">{cat}</span>
                          {categoryFilter === cat && <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Sort Order Dropdown */}
                <div className="relative z-50 pointer-events-auto">
                  <button 
                    type="button" 
                    onClick={() => {
                      setIsSortOpen(!isSortOpen);
                      setIsMonthOpen(false);
                      setIsCategoryOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-semibold shadow-sm flex items-center gap-1 active:scale-95 transition-all cursor-pointer select-none pointer-events-auto ${sortOrder !== 'Date' ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50 shadow-sm'}`}
                  >
                    <span className="truncate max-w-[95px]">{sortOrder}</span>
                    <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform ${isSortOpen ? 'rotate-180' : ''}`}/>
                  </button>
                  {isSortOpen && (
                    <div className="absolute start-0 top-full mt-1.5 w-48 max-w-[calc(100vw-2rem)] rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200 shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100 pointer-events-auto">
                      {SORT_OPTIONS.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setSortOrder(s);
                            setIsSortOpen(false);
                          }}
                          onClick={() => {
                            setSortOrder(s);
                            setIsSortOpen(false);
                          }}
                          className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between transition-colors cursor-pointer select-none pointer-events-auto ${sortOrder === s ? 'text-primary font-bold bg-primary/10' : 'text-slate-700 hover:bg-slate-50 font-medium'}`}
                        >
                          <span className="truncate">{s}</span>
                          {sortOrder === s && <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <button 
                type="button" 
                onClick={handleExportCSV}
                className="text-xs font-bold text-primary hover:text-primary flex items-center gap-1 active:scale-95 transition-all cursor-pointer select-none pointer-events-auto"
              >
                <Upload className="w-3.5 h-3.5"/>Export
              </button>
            </div>

            {/* EXPENSE TRANSACTION FEED */}
            {filteredExpenseTransactions.length === 0 ? (
              <div className="mx-5 my-4 p-8 rounded-2xl border flex flex-col items-center justify-center text-center bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-primary/10 text-primary">
                  <SearchX className="w-8 h-8"/>
                </div>
                <h3 className="text-base font-semibold mb-1 text-slate-900">{t('finance.noExpensesFound', 'No Expenses Found')}</h3>
                <p className="text-xs max-w-[240px] leading-relaxed mb-5 text-slate-500">
                  {searchQuery || categoryFilter !== 'All Categories' ? t('finance.noExpenseMatchFilter', 'No expense records match your active filters.') : t('finance.noExpensesRecordedYet', 'No expenses recorded yet for this period.')}
                </p>
                <button 
                  type="button"
                  onClick={() => { if (setEditingTransaction) setEditingTransaction(null); if (setActiveTab) setActiveTab('add_edit_expense_light_mode'); }}
                  className="px-5 py-2.5 rounded-xl font-medium text-xs flex items-center gap-2 bg-primary text-white shadow-md active:scale-95 transition-all cursor-pointer select-none"
                >
                  <Plus className="w-4 h-4"/> Log First Cost
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between px-5 py-1">
                  <span className="text-xs font-semibold text-slate-900 uppercase tracking-wider">{t('finance.expenseRecords', 'Expense Records')}</span>
<span className="text-xs font-semibold text-slate-500">
                    {filteredExpenseTransactions.length} {filteredExpenseTransactions.length === 1 ? t('finance.entry', 'entry') : t('finance.entries', 'entries')}
                  </span>
                </div>

                {filteredExpenseTransactions.map((tx) => (
                  <div key={tx.id} className="block mx-5 mb-2.5 p-3.5 rounded-2xl transition-all duration-200 ease-out active:scale-[0.98] select-none flex items-center justify-between gap-3 min-h-[68px] bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                        {getExpenseCategoryIcon(tx.category)}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold text-slate-900 truncate">{tx.title}</span>
                        <span className="text-xs font-normal text-slate-500 truncate">{tx.category} • {tx.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-sm font-bold text-slate-900">-{formatSingleCurrency(tx.amount, tx.currency)}</span>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button 
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (setEditingTransaction) setEditingTransaction(tx);
                            if (setActiveTab) setActiveTab('add_edit_expense_light_mode');
                          }}
                          aria-label="Edit transaction" 
                          className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/10 active:scale-90 transition-transform cursor-pointer select-none pointer-events-auto"
                        >
                          <Pencil className="w-4 h-4"/>
                        </button>
                        <button 
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (deleteTransaction) {
                              deleteTransaction(tx.id);
                              toast.success(t('toasts.transactionDeleted', 'Transaction deleted'));
                            }
                          }}
                          aria-label="Delete transaction" 
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 active:scale-90 transition-transform cursor-pointer select-none pointer-events-auto"
                        >
                          <Trash2 className="w-4 h-4"/>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {/* ==================== SUB-VIEW 3: INCOME MANAGEMENT ==================== */}
        {activeFinanceTab === 'income' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Financial Summary Banner Card */}
            <div className="mx-5 p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg relative overflow-hidden space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-slate-500 flex items-center gap-1.5">
                    Total Monthly Inflow
                    <Info className="w-4 h-4 text-slate-500" />
                  </span>
                  <div className="flex flex-col items-start mt-1">
                    <StackedCurrencyDisplay grouped={incomeTotalInflowGrouped} align="start" isDark={false} primaryClass="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight" secondaryClass="text-sm sm:text-base font-semibold text-slate-500 mt-0.5" />
                  </div>
                </div>
                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full border ${incomeTrend.direction === 'up' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : incomeTrend.direction === 'down' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                  {incomeTrend.direction === 'down' ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                  <span className="text-xs font-bold">{incomeTrend.label}</span>
                </div>
              </div>

              {/* Breakdown Sub-metrics */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="rounded-2xl p-3 flex flex-col items-start justify-between min-h-[92px] bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    <span className="text-xs font-medium text-slate-500">{t('finance.activeIncome', 'Active Income')}</span>
                  </div>
                  <StackedCurrencyDisplay grouped={activeIncomeGrouped} align="start" isDark={false} primaryClass="text-sm sm:text-base font-bold text-slate-900" secondaryClass="text-xs text-slate-500 font-medium" />
                  <span className="text-xs font-medium text-slate-500 mt-1">{activePct}% {t('finance.ofTotal', 'of total')}</span>
                </div>
                <div className="rounded-2xl p-3 flex flex-col items-start justify-between min-h-[92px] bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-xs font-medium text-slate-500">{t('finance.passiveAndOther', 'Passive & Other')}</span>
                  </div>
                  <StackedCurrencyDisplay grouped={passiveIncomeGrouped} align="start" isDark={false} primaryClass="text-sm sm:text-base font-bold text-slate-900" secondaryClass="text-xs text-slate-500 font-medium" />
                  <span className="text-xs font-medium text-slate-500 mt-1">{passivePct}% {t('finance.ofTotal', 'of total')}</span>
                </div>
              </div>

              {/* Next Scheduled Deposit Pill */}
              <div className="flex items-center justify-between rounded-2xl px-3.5 py-3 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0">
                    <CalendarClock className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-bold text-slate-900 truncate">
                      {nextExpectedDeposit ? `${nextExpectedDeposit.title || nextExpectedDeposit.payerName} (+${formatSingleCurrency(nextExpectedDeposit.amount, nextExpectedDeposit.currency)})` : t('finance.noScheduledDeposits', 'No Scheduled Deposits')}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      {nextExpectedDeposit ? `${formatIncomeDate(nextExpectedDeposit.date)} • ${getDaysRemainingText(nextExpectedDeposit.date, todayStr)}` : t('finance.allStreamsUpToDate', 'All incoming streams up to date')}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-primary bg-white border border-primary/20 px-2 py-1 rounded-full shrink-0 shadow-sm">
                  {nextExpectedDeposit ? t('finance.scheduled', 'Scheduled') : t('finance.upToDate', 'Up to date')}
                </span>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="px-5 flex items-center justify-between gap-3">
              <button 
                onClick={() => {
                  if (setEditingIncome) setEditingIncome(null);
                  if (setActiveTab) setActiveTab('add_income_light_mode');
                }}
                className="btn-primary flex-1 h-12 rounded-2xl flex items-center justify-center gap-2 cursor-pointer select-none"
              >
                <Plus className="w-5 h-5" />
                <span>{t('finance.addIncome', 'Add Income')}</span>
              </button>
              <div className="flex items-center gap-2">
                <button 
                  type="button"
                  aria-label={t('common.exportCsv', 'Export CSV')} 
                  className="h-12 w-12 rounded-2xl bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50 shadow-sm flex items-center justify-center cursor-pointer select-none"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button 
                  type="button"
                  aria-label="Statement report" 
                  onClick={() => setIsReportModalOpen(true)}
                  className="h-12 w-12 rounded-2xl bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50 shadow-sm flex items-center justify-center cursor-pointer select-none"
                >
                  <FileText className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Search & Filter Controls */}
            <div className="px-5 flex items-center gap-2">
              <div className="flex-1 relative flex items-center">
                <Search className="absolute left-3 w-5 h-5 text-slate-500" />
                <input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-3 pl-10 pr-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-sm text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 pointer-events-auto" 
                  placeholder={t('finance.searchIncomePlaceholder', 'Search income sources or notes...')} type="text"
                />
              </div>
              <button 
                onClick={() => setSearchQuery('')}
                className="h-11 px-3 bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50 shadow-sm rounded-2xl flex items-center justify-center gap-1.5 cursor-pointer select-none"
              >
                <span className="text-sm font-semibold">{t('common.reset', 'Reset')}</span>
              </button>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 px-5 no-scrollbar">
              {INCOME_CATEGORIES.map((cat) => {
                const isSelected = selectedIncomeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedIncomeCategory(cat)}
                    className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold shadow-sm whitespace-nowrap active:scale-95 transition-all cursor-pointer select-none ${isSelected ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                  >
                    {cat} ({getIncomeCategoryCount(cat)})
                  </button>
                );
              })}
            </div>

            {/* Detailed Income Feed */}
            <div className="px-5 space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-slate-900 tracking-wider uppercase">{selectedMonth}</span>
                <span className="text-xs font-semibold text-slate-500">{filteredIncomes.length} {t('finance.streams', 'Streams')}</span>
              </div>

              {filteredIncomes.length === 0 ? (
                <div className="w-full my-2 p-8 rounded-3xl border flex flex-col items-center justify-center text-center bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-primary/10 text-primary">
                    <SearchX className="w-8 h-8"/>
                  </div>
                  <h3 className="text-base font-semibold mb-1 text-slate-900">
                    {searchQuery || selectedIncomeCategory !== 'All Sources' ? t('finance.noIncomeFound', 'No Income Streams Found') : t('finance.noIncomeRecordsYet', 'No Income Records Yet')}
                  </h3>
                  <p className="text-xs max-w-[240px] leading-relaxed mb-5 text-slate-500">
                    {searchQuery || selectedIncomeCategory !== 'All Sources' ? t('finance.noExpenseMatchFilter', 'No records match your active filters.') : t('finance.noIncomeStreamsPeriod', 'No income streams recorded for this period.')}
                  </p>
                  {searchQuery || selectedIncomeCategory !== 'All Sources' ? (
                    <button 
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedIncomeCategory('All Sources');
                      }}
                      className="px-5 py-2.5 rounded-xl font-medium text-xs flex items-center gap-2 bg-primary text-white shadow-md active:scale-95 transition-all cursor-pointer select-none"
                    >
                      Clear Search Filter
                    </button>
                  ) : (
                    <button 
                      onClick={() => {
                        if (setEditingIncome) setEditingIncome(null);
                        if (setActiveTab) setActiveTab('add_income_light_mode');
                      }}
                      className="px-5 py-2.5 rounded-xl font-medium text-xs flex items-center gap-2 bg-primary text-white shadow-md active:scale-95 transition-all cursor-pointer select-none"
                    >
                      <Plus className="w-4 h-4"/> Add First Income
                    </button>
                  )}
                </div>
              ) : (
                filteredIncomes.map((item) => (
                  <div key={item.id} className="w-full rounded-3xl p-4 flex flex-col gap-3 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg cursor-pointer select-none">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                          {getIncomeCategoryIcon(item.category)}
                        </div>
                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="text-base font-bold text-slate-900 truncate">{item.title || item.payerName || t('finance.income', 'Income')}</span>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${getIncomeBadgeClass(item.category)}`}>
                              {item.category || t('finance.income', 'Income')}
                            </span>
                            <span className="text-xs font-medium text-slate-500 truncate">{formatIncomeDate(item.date)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end shrink-0">
                        <span className="text-lg font-bold text-emerald-600">
                          +{formatSingleCurrency(item.amount, item.currency)}
                        </span>
                        <span className="text-xs font-medium text-slate-500">{item.status || t('finance.cleared', 'Cleared')}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full">
                        <Repeat className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="text-xs font-medium text-slate-600">{item.recurrence || item.notes || t('finance.incomeDeposit', { defaultValue: 'Income deposit' })}</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button 
                          aria-label="Edit income" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditIncome(item);
                          }}
                          className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 text-slate-400 hover:bg-slate-100 flex items-center justify-center active:scale-90 transition-transform cursor-pointer select-none"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          aria-label="Delete income" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteIncome(item);
                          }}
                          className="w-8 h-8 rounded-full bg-red-50 border border-red-100 text-red-500 hover:bg-red-100 flex items-center justify-center active:scale-90 transition-transform cursor-pointer select-none"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Mindful Prosperity Note */}
            <div className="mx-5 rounded-3xl p-5 flex items-center gap-4 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-100 text-teal-600 flex items-center justify-center shrink-0">
                <Leaf className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900">{t('finance.mindfulProsperity', 'Mindful Prosperity')}</span>
                <span className="text-xs font-medium text-slate-500 mt-0.5 leading-relaxed">{t('finance.disciplineQuote', 'Steady discipline creates lasting tranquility and sustainable abundance.')}</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* REPORT MODAL */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl p-5 bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{t('finance.incomeStatement', 'Income Statement')}</h3>
                  <p className="text-[10px] text-slate-500">{selectedMonth}</p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setIsReportModalOpen(false)} 
                className="p-1 rounded-full text-slate-500 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-slate-600 flex items-center justify-between">
                <span className="text-xs font-medium">{t('finance.totalInflow', 'Total Inflow')}</span>
                <StackedCurrencyDisplay grouped={incomeGrouped} align="end" isDark={false} primaryClass="text-sm font-bold text-slate-900" secondaryClass="text-xs text-slate-500 font-medium" />
              </div>
              <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-between">
                <span className="text-xs font-medium">{t('finance.activeIncome', 'Active Income')}</span>
                <StackedCurrencyDisplay grouped={activeIncomeGrouped} align="end" isDark={false} primaryClass="text-sm font-bold text-primary" secondaryClass="text-xs text-slate-500 font-medium" />
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100/50 text-emerald-900 flex items-center justify-between">
                <span className="text-xs font-medium">{t('finance.passiveAndOther', 'Passive & Other')}</span>
                <StackedCurrencyDisplay grouped={passiveIncomeGrouped} align="end" isDark={false} primaryClass="text-sm font-bold text-emerald-600" secondaryClass="text-xs text-slate-500 font-medium" />
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-slate-600 flex items-center justify-between text-xs">
                <span>{t('finance.totalRecordedStreams', 'Total Recorded Streams')}</span>
                <span className="font-semibold text-slate-900">{periodIncomes.length} {t('finance.entries', 'entries')}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={handleExportIncomeCSV}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer select-none"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t('common.exportCsv', 'Export CSV')}</span>
              </button>
              <button 
                type="button"
                onClick={() => setIsReportModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-primary text-white font-semibold text-xs transition-colors cursor-pointer select-none"
              >
                {t('common.done', 'Done')}
              </button>
            </div>
          </div>
        </div>
      )}

      {isBudgetModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl p-6 bg-white/80 backdrop-blur-2xl border border-white/60 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Pencil className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{t('finance.setMonthlyBudget', 'Set Monthly Budget')}</h3>
                  <p className="text-[10px] text-slate-500">{t('finance.configureSpendingLimits', 'Configure your independent spending limits')}</p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setIsBudgetModalOpen(false)} 
                className="p-1 rounded-full text-slate-500 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveBudgetCap} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('finance.primaryAfnLimit', 'Primary AFN Limit (افـ)')}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={budgetFormAFN}
                    onChange={(e) => setBudgetFormAFN(e.target.value)}
                    placeholder="0"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 border border-slate-200/80 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    AFN
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('finance.secondaryUsdLimit', 'Secondary USD Limit ($)')}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={budgetFormUSD}
                    onChange={(e) => setBudgetFormUSD(e.target.value)}
                    placeholder="0"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 border border-slate-200/80 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    USD
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsBudgetModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer select-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-primary text-white font-semibold text-xs shadow-md shadow-primary/20 transition-all cursor-pointer select-none"
                >
                  {t('finance.saveBudget', 'Save Budget')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
