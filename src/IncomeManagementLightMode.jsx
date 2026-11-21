import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import UserAvatar from './components/UserAvatar';
import { useFinanceStore, formatSingleCurrency, calculateGroupedTotals } from './store/useFinanceStore';
import { useNotificationStore } from './store/useNotificationStore';
import StackedCurrencyDisplay from './components/StackedCurrencyDisplay';
import { toast } from './components/ui/toast/index.js';
import { confirm } from './components/ui/confirmation/index.js';

import { 
  Coins, Bell, Calendar, ChevronDown, Info, TrendingUp, TrendingDown, CalendarClock, PlusCircle, Download, FileText, Search, Building2, Palette, Store, Award, Repeat, Edit2, Trash2, Leaf, Wallet, Plus, SearchX, X 
} from 'lucide-react';

const getTodayIsoDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getMonthPeriodOptions = () => {
  const options = [];
  for (let i = 0; i < 12; i++) {
    const d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() - i);
    const label = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    options.push({ label, key: `${year}-${month}` });
  }
  options.push({ label: 'All Periods', key: 'all' });
  return options;
};

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

const getCategoryBadgeClass = (category) => {
  switch (category) {
    case 'Salary': return 'bg-primary/15 text-primary';
    case 'Freelance': return 'bg-fuchsia-100 text-fuchsia-700';
    case 'Business': return 'bg-amber-100 text-amber-700';
    case 'Bonus': return 'bg-sky-100 text-sky-700';
    default: return 'bg-slate-100 text-slate-700';
  }
};

const getCategoryIcon = (category) => {
  switch (category) {
    case 'Salary': return <Building2 className="w-5 h-5 text-primary" />;
    case 'Freelance': return <Palette className="w-5 h-5 text-fuchsia-600" />;
    case 'Business': return <Store className="w-5 h-5 text-amber-600" />;
    case 'Bonus': return <Award className="w-5 h-5 text-sky-600" />;
    default: return <Wallet className="w-5 h-5 text-emerald-600" />;
  }
};

const CATEGORIES = ['All Sources', 'Salary', 'Freelance', 'Business', 'Bonus', 'Other'];

export default function IncomeManagementLightMode({ setActiveTab }) {
  const { t } = useTranslation();
  const { incomes, deleteIncome, setEditingIncome, _hasHydrated } = useFinanceStore();
  const unreadNotifCount = useNotificationStore((s) => s.notifications?.filter((n) => !n.read).length || 0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Sources');
  const [isPeriodMenuOpen, setIsPeriodMenuOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const todayStr = getTodayIsoDate();
  const periodOptions = getMonthPeriodOptions();
  const [selectedPeriodKey, setSelectedPeriodKey] = useState(periodOptions[0].key);
  const currentPeriodLabel = periodOptions.find((p) => p.key === selectedPeriodKey)?.label || periodOptions[0].label;

  const periodIncomes = (_hasHydrated ? (incomes || []) : []).filter((item) => {
    if (selectedPeriodKey === 'all') return true;
    return item.date && item.date.startsWith(selectedPeriodKey);
  });

  const prevPeriodKey = getPreviousMonthKey(selectedPeriodKey);
  const prevIncomes = (_hasHydrated ? (incomes || []) : []).filter((item) => item.date && item.date.startsWith(prevPeriodKey));
  const prevTotal = prevIncomes.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  const incomeTotalInflowGrouped = calculateGroupedTotals(periodIncomes);
  const totalInflow = periodIncomes.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const trend = calculateTrend(totalInflow, prevTotal);

  const activeIncomes = periodIncomes.filter((item) => ['Salary', 'Freelance'].includes(item.category) || item.incomeType === 'active');
  const activeTotalGrouped = calculateGroupedTotals(activeIncomes);
  const activeIncomeGrouped = activeTotalGrouped;
  const activeTotal = activeIncomes.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const passiveIncomes = periodIncomes.filter((item) => !['Salary', 'Freelance'].includes(item.category) && item.incomeType !== 'active');
  const passiveTotalGrouped = calculateGroupedTotals(passiveIncomes);
  const passiveIncomeGrouped = passiveTotalGrouped;
  const passiveTotal = Math.max(0, totalInflow - activeTotal);
  const activePct = totalInflow > 0 ? ((activeTotal / totalInflow) * 100).toFixed(1) : '0.0';
  const passivePct = totalInflow > 0 ? ((passiveTotal / totalInflow) * 100).toFixed(1) : '0.0';

  const upcomingDeposits = (_hasHydrated ? (incomes || []) : []).filter((item) => {
    if (!item.date) return false;
    const isFuture = item.date > todayStr;
    const isScheduledTag = item.status && item.status.toLowerCase().includes('scheduled');
    return isFuture || isScheduledTag;
  }).sort((a, b) => (a.date || '').localeCompare(b.date || ''));

  const nextExpectedDeposit = upcomingDeposits[0] || null;

  const getCategoryCount = (cat) => {
    if (cat === 'All Sources') return periodIncomes.length;
    if (cat === 'Other') return periodIncomes.filter((i) => !['Salary', 'Freelance', 'Business', 'Bonus'].includes(i.category)).length;
    return periodIncomes.filter((i) => i.category === cat).length;
  };

  const filteredIncomes = periodIncomes.filter((item) => {
    const matchesCategory = selectedCategory === 'All Sources' || 
      (selectedCategory === 'Other' 
        ? !['Salary', 'Freelance', 'Business', 'Bonus'].includes(item.category)
        : item.category === selectedCategory);

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.payerName && item.payerName.toLowerCase().includes(q)) ||
      (item.category && item.category.toLowerCase().includes(q)) ||
      (item.notes && item.notes.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const handleEdit = (item) => {
    if (setEditingIncome) setEditingIncome(item);
    if (setActiveTab) setActiveTab('add_income_light_mode');
  };

  const handleDelete = async (item) => {
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

  const handleExportCSV = () => {
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
    link.setAttribute('download', `incomes_export_${selectedPeriodKey}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-36">
      {/* Top Header */}
      <div className="sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
            <Coins className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">{t('finance.incomeManagement', 'Income Management')}</h1>
            <p className="text-[11px] font-medium text-slate-500">{t('finance.trackPlanIncome', 'Track and plan income cashflows')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab && setActiveTab('notifications_settings_light_mode')}
            aria-label="Notifications"
            className="relative p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors pointer-events-auto cursor-pointer"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white" />
            )}
          </button>
          <UserAvatar 
            setActiveTab={setActiveTab} 
          />
        </div>
      </div>

      {/* Month Selector & Breadcrumb Header Context */}
      <div className="flex items-center justify-between px-5 py-2 mb-2 relative z-50">
        <div className="flex items-center gap-2 relative">
          <Calendar className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-slate-800" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>{t('common.period', 'Period:')}</span>
          <button 
            type="button"
            onClick={() => setIsPeriodMenuOpen(!isPeriodMenuOpen)}
            className="flex items-center gap-1 bg-white border border-slate-200 px-3 py-1 rounded-full text-slate-700 transition-all active:scale-95 shadow-sm cursor-pointer select-none"
          >
            <span className="text-sm font-semibold">{currentPeriodLabel}</span>
            <ChevronDown className={`w-4 h-4 text-slate-400 transform transition-transform duration-200 ${isPeriodMenuOpen ? 'rotate-180' : 'rotate-0'}`} />
          </button>

          {isPeriodMenuOpen && (
            <div className="absolute left-16 top-10 w-52 py-2 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
              {periodOptions.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => {
                    setSelectedPeriodKey(opt.key);
                    setIsPeriodMenuOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-xs font-semibold flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer select-none ${selectedPeriodKey === opt.key ? 'text-primary font-bold bg-primary/10' : 'text-slate-700'}`}
                >
                  <span>{opt.label}</span>
                  {selectedPeriodKey === opt.key && <span className="text-primary font-bold">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-primary text-xs font-semibold bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          <span style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>{t('finance.liveSync', 'Live Sync')}</span>
        </div>
      </div>

      <div className="px-5 space-y-6">
        {/* Financial Summary Banner Card */}
        <section className="relative w-full rounded-3xl p-5 overflow-hidden bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
          {/* Ambient luminous gradients */}
          <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-primary/10 blur-2xl pointer-events-none"></div>
          <div className="absolute -left-12 -bottom-12 w-44 h-44 rounded-full bg-emerald-50 blur-2xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-sm font-medium text-slate-500 flex items-center gap-1.5">
                  Total Monthly Inflow
                  <Info className="w-4 h-4 text-slate-400" />
                </span>
                <div className="flex flex-col items-start mt-1">
                  <StackedCurrencyDisplay grouped={incomeTotalInflowGrouped} align="start" isDark={false} primaryClass="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight" secondaryClass="text-sm font-semibold text-slate-500 mt-0.5" />
                </div>
              </div>
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full border ${
                trend.direction === 'up'
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                  : trend.direction === 'down'
                  ? 'bg-rose-50 text-rose-600 border-rose-100'
                  : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}>
                {trend.direction === 'down' ? (
                  <TrendingDown className="w-4 h-4" />
                ) : (
                  <TrendingUp className="w-4 h-4" />
                )}
                <span className="text-xs font-bold">{trend.label}</span>
              </div>
            </div>

            {/* Breakdown Sub-metrics */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="rounded-2xl p-3 flex flex-col items-start justify-between bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg min-h-[92px]">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="text-xs font-medium text-slate-500">{t('finance.activeIncome', 'Active Income')}</span>
                </div>
                <StackedCurrencyDisplay grouped={activeIncomeGrouped} align="start" isDark={false} primaryClass="text-sm sm:text-base font-bold text-slate-900" secondaryClass="text-xs text-slate-500 font-medium" />
                <span className="text-xs font-medium text-slate-500 mt-1">{activePct}% {t('finance.ofTotal', 'of total')}</span>
              </div>

              <div className="rounded-2xl p-3 flex flex-col items-start justify-between bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg min-h-[92px]">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="text-xs font-medium text-slate-500">{t('finance.passiveAndOther', 'Passive & Other')}</span>
                </div>
                <StackedCurrencyDisplay grouped={passiveIncomeGrouped} align="start" isDark={false} primaryClass="text-sm sm:text-base font-bold text-slate-900" secondaryClass="text-xs text-slate-500 font-medium" />
                <span className="text-xs font-medium text-slate-500 mt-1">{passivePct}% {t('finance.ofTotal', 'of total')}</span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-2xl px-3.5 py-3 mt-1 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                  <CalendarClock className="w-5 h-5 text-primary" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-slate-900 truncate">
                    {nextExpectedDeposit ? `${nextExpectedDeposit.title || nextExpectedDeposit.payerName} (+${formatSingleCurrency(nextExpectedDeposit.amount, nextExpectedDeposit.currency)})` : t('finance.noScheduledDeposits', 'No Scheduled Deposits')}
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    {nextExpectedDeposit ? `${formatIncomeDate(nextExpectedDeposit.date)} • ${getDaysRemainingText(nextExpectedDeposit.date, todayStr)}` : 'All incoming streams up to date'}
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-primary bg-white border border-primary/20 px-2 py-1 rounded-full shrink-0 shadow-sm">
                {nextExpectedDeposit ? t('finance.scheduled', 'Scheduled') : t('finance.upToDate', 'Up to date')}
              </span>
            </div>
          </div>
        </section>

        {/* Quick Actions Bar */}
        <section className="flex flex-row items-center justify-between w-full gap-3">
          <button 
            onClick={() => {
              if (setEditingIncome) setEditingIncome(null);
              if (setActiveTab) setActiveTab('add_income_light_mode');
            }}
            className="btn-primary flex-1 h-12 rounded-2xl flex items-center justify-center gap-2 cursor-pointer select-none"
          >
            <PlusCircle className="w-5 h-5" />
            <span>{t('finance.addIncome', 'Add Income')}</span>
          </button>
          <div className="flex flex-row items-center gap-2">
            <button 
              type="button"
              aria-label={t('common.exportCsv', 'Export CSV')} className="h-12 w-12 rounded-2xl bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-sm active:scale-95 transition-transform hover:bg-slate-50 cursor-pointer select-none"
            >
              <Download className="w-5 h-5" />
            </button>
            <button 
              type="button"
              aria-label="Statement report" 
              onClick={() => setIsReportModalOpen(true)}
              className="h-12 w-12 rounded-2xl bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-sm active:scale-95 transition-transform hover:bg-slate-50 cursor-pointer select-none"
            >
              <FileText className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* Search & Filter Controls */}
        <div className="flex items-center gap-2">
          <div className="flex-1 relative flex items-center">
            <Search className="absolute left-3 w-5 h-5 text-slate-400" />
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm transition-all" 
              placeholder={t('finance.searchIncomePlaceholder', 'Search income sources or notes...')} type="text"
            />
          </div>
          <button 
            onClick={() => setSearchQuery('')}
            className="h-11 px-3 bg-white border border-slate-200 rounded-2xl text-slate-700 flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform hover:bg-slate-50 cursor-pointer select-none"
          >
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-semibold">{t('common.reset', 'Reset')}</span>
          </button>
        </div>

        {/* Filter Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-5 px-5 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold shadow-sm whitespace-nowrap active:scale-95 transition-all cursor-pointer select-none ${isSelected ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              >
                {cat} ({getCategoryCount(cat)})
              </button>
            );
          })}
        </div>

        {/* Detailed Income Feed */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-900 tracking-wider uppercase" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>
              {currentPeriodLabel}
            </span>
            <span className="text-xs font-semibold text-slate-900" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>
              {filteredIncomes.length} {filteredIncomes.length === 1 ? t('finance.transaction', 'Transaction') : t('finance.transactions', 'Transactions')}
            </span>
          </div>

          {filteredIncomes.length === 0 ? (
            <div className="w-full my-4 p-8 rounded-3xl border backdrop-blur-xl flex flex-col items-center justify-center text-center bg-white/60 border-white/60 shadow-sm">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-primary/10 text-primary">
                <SearchX className="w-8 h-8"/>
              </div>
              <h3 className="text-base font-semibold mb-1 text-slate-900">
                {searchQuery || selectedCategory !== 'All Sources' ? t('finance.noIncomeStreamsFound', 'No Income Streams Found') : t('finance.noIncomeRecordsYet', 'No Income Records Yet')}
              </h3>
              <p className="text-xs max-w-[240px] leading-relaxed mb-5 text-slate-600">
                {searchQuery || selectedCategory !== 'All Sources' ? t('finance.noIncomeMatchFilter', 'No income records match your current filters. Try resetting your search.') : t('finance.noIncomeStreamsPeriod', 'No income streams recorded for this period. Click below to add one.')}
              </p>
              {searchQuery || selectedCategory !== 'All Sources' ? (
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All Sources');
                  }}
                  className="px-5 py-2.5 rounded-xl font-medium text-xs flex items-center gap-2 bg-primary text-white shadow-md active:scale-95 transition-all cursor-pointer select-none"
                >
                  Clear Search Filter
                </button>
              ) : (
                <button 
                  onClick={() => {
                    if (setEditingIncome) setEditingIncome(null);
                    if (setActiveTab) setActiveTab('add_edit_income_light_mode');
                  }}
                  className="px-5 py-2.5 rounded-xl font-medium text-xs flex items-center gap-2 bg-primary text-white shadow-md active:scale-95 transition-all cursor-pointer select-none"
                >
                  <Plus className="w-4 h-4"/> Record First Income
                </button>
              )}
            </div>
          ) : (
            filteredIncomes.map((item) => (
              <div 
                key={item.id}
                className="w-full rounded-3xl p-4 flex flex-col gap-3 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer select-none"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-base font-bold text-slate-900 truncate">
                        {item.title || item.payerName || t('finance.income', 'Income')}
                      </span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${getCategoryBadgeClass(item.category)}`}>
                          {item.category || t('finance.income', 'Income')}
                        </span>
                        <span className="text-xs font-medium text-slate-500 truncate">
                          {formatIncomeDate(item.date)}
                        </span>
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
                    <Repeat className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="text-xs font-medium text-slate-600">
                      {item.recurrence || item.notes || t('finance.incomeDeposit', { defaultValue: 'Income deposit' })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button 
                      aria-label="Edit income" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(item);
                      }}
                      className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-slate-100 active:scale-90 transition-transform cursor-pointer select-none"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      aria-label="Delete income" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item);
                      }}
                      className="w-8 h-8 rounded-full bg-red-50 border border-red-100 text-red-500 flex items-center justify-center hover:bg-red-100 active:scale-90 transition-transform cursor-pointer select-none"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>

        {/* Ambient Inspiration Quote Pill */}
        <div className="w-full rounded-3xl p-5 flex items-center gap-4 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
          <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0">
            <Leaf className="w-5 h-5 text-teal-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900">{t('finance.mindfulProsperity', 'Mindful Prosperity')}</span>
            <span className="text-xs font-medium text-slate-500 mt-0.5 leading-relaxed">"{t('finance.disciplineQuote', 'Steady discipline creates lasting tranquility and sustainable abundance.')}"</span>
          </div>
        </div>
      </div>

      {/* Floating Bottom Navigation Dock / Report Modal */}
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
                  <p className="text-[10px] text-slate-500">{currentPeriodLabel}</p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setIsReportModalOpen(false)} 
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-600">{t('finance.totalInflow', 'Total Inflow')}</span>
                <StackedCurrencyDisplay grouped={incomeTotalInflowGrouped} align="end" isDark={false} primaryClass="text-sm font-bold text-slate-900" secondaryClass="text-xs text-slate-500 font-medium" />
              </div>
              <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-between">
                <span className="text-xs font-medium text-primary">{t('finance.activeIncome', 'Active Income')}</span>
                <StackedCurrencyDisplay grouped={activeIncomeGrouped} align="end" isDark={false} primaryClass="text-sm font-bold text-primary" secondaryClass="text-xs text-slate-500 font-medium" />
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100/50 flex items-center justify-between">
                <span className="text-xs font-medium text-emerald-900">{t('finance.passiveAndOther', 'Passive & Other')}</span>
                <StackedCurrencyDisplay grouped={passiveIncomeGrouped} align="end" isDark={false} primaryClass="text-sm font-bold text-emerald-600" secondaryClass="text-xs text-slate-500 font-medium" />
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span>{t('finance.totalRecordedStreams', 'Total Recorded Streams')}</span>
                <span className="font-semibold text-slate-900">{periodIncomes.length} {t('finance.entries', 'entries')}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={handleExportCSV}
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
    </div>
  );
}
