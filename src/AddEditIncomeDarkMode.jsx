import { useTranslation } from 'react-i18next';
import { useState, useRef } from 'react';
import UserAvatar from './components/UserAvatar';
import { useFinanceStore } from './store/useFinanceStore';
import { getLocalDateKey } from './utils/timeService';
import { Wallet, ArrowLeft } from 'lucide-react';
import { MomentumDatePicker } from './components/ui/picker/index.js';
import { toast } from './components/ui/toast/index.js';
import { confirm, promptInput } from './components/ui/confirmation/index.js';

const SOURCES = [
  { id: 'salary', name: 'Salary', icon: 'work', colSpan: '' },
  { id: 'freelance', name: 'Freelance', icon: 'laptop_mac', colSpan: '' },
  { id: 'business', name: 'Business', icon: 'storefront', colSpan: '' },
  { id: 'bonus', name: 'Bonus', icon: 'featured_seasonal_and_gifts', colSpan: '' },
  { id: 'other', name: 'Other', icon: 'more_horiz', colSpan: 'col-span-2' },
];

const getTodayIsoDate = () => getLocalDateKey();

const formatDisplayDate = (dateVal) => {
  if (!dateVal) return getTodayIsoDate();
  try {
    const [y, m, d] = dateVal.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return dateVal;
  }
};

export default function AddEditIncomeDarkMode({ setActiveTab, goBack }) {
  const { t } = useTranslation();
  const { incomes, addTransaction, editingIncome, updateIncome, setEditingIncome } = useFinanceStore();

  const [amount, setAmount] = useState(() => editingIncome ? String(editingIncome.amount) : '');
  const [selectedCurrency, setSelectedCurrency] = useState(() => editingIncome?.currency || 'AFN');
  const [incomeSource, setIncomeSource] = useState(() => editingIncome?.category || 'Salary');
  const [payerName, setPayerName] = useState(() => editingIncome?.payerName || editingIncome?.title || '');
  const [depositSchedule, setDepositSchedule] = useState(() => editingIncome?.recurrence || 'One-time deposit');
  const [depositDate, setDepositDate] = useState(() => editingIncome?.date || getTodayIsoDate());
  const [memo, setMemo] = useState(() => editingIncome?.notes || editingIncome?.note || '');

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const currencySymbol = selectedCurrency === 'AFN' ? 'افـ' : selectedCurrency === 'EUR' ? '€' : '$';
  const currencyLabel = selectedCurrency === 'AFN' ? 'AFN (افـ)' : selectedCurrency === 'EUR' ? 'EUR (€)' : 'USD ($)';

  const handleToggleCurrency = () => {
    if (selectedCurrency === 'AFN') setSelectedCurrency('USD');
    else if (selectedCurrency === 'USD') setSelectedCurrency('EUR');
    else setSelectedCurrency('AFN');
  };

  const handleQuickAdd = (val) => {
    const cur = parseFloat(String(amount).replace(/,/g, '')) || 0;
    setAmount((cur + val).toFixed(2));
  };

  const handleReset = () => {
    setAmount('');
    setSelectedCurrency('AFN');
    setIncomeSource('Salary');
    setPayerName('');
    setDepositSchedule('One-time deposit');
    setDepositDate(getTodayIsoDate());
    setMemo('');
  };

  const handleDateClick = (e) => {
    e.stopPropagation();
    setIsDatePickerOpen(true);
  };

  const handleScheduleClick = async (e) => {
    e.stopPropagation();
    const next = await promptInput({
      titleKey: 'confirm.promptDepositScheduleTitle',
      messageKey: 'confirm.promptDepositScheduleDescription',
      defaultValue: depositSchedule,
      placeholder: 'e.g. Monthly, Bi-weekly',
    });
    if (next !== null && next.trim()) {
      setDepositSchedule(next.trim());
    }
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();
    const numericAmount = parseFloat(String(amount).replace(/,/g, '')) || 0;
    if (numericAmount <= 0) {
      toast.error(t('toasts.validIncomeAmount', 'Please enter a valid income amount'));
      return;
    }
    const title = payerName.trim() || `${incomeSource} Income`;
    if (editingIncome && updateIncome) {
      updateIncome({
        ...editingIncome,
        amount: numericAmount,
        category: incomeSource,
        type: 'income',
        payerName: payerName.trim(),
        title,
        currency: selectedCurrency,
        date: depositDate || getTodayIsoDate(),
        recurrence: depositSchedule,
        notes: memo.trim(),
        note: memo.trim(),
      });
      if (setEditingIncome) setEditingIncome(null);
      toast.success(t('toasts.incomeUpdated', 'Income updated successfully'));
    } else {
      addTransaction({
        id: Date.now(),
        amount: numericAmount,
        category: incomeSource,
        type: 'income',
        payerName: payerName.trim(),
        title,
        currency: selectedCurrency,
        date: depositDate || getTodayIsoDate(),
        recurrence: depositSchedule,
        notes: memo.trim(),
        note: memo.trim(),
      });
      toast.success(t('toasts.incomeSaved', 'Income stream saved'));
    }
    if (typeof goBack === 'function') {
      goBack('income_management_dark_mode');
    } else if (setActiveTab) {
      setActiveTab('income_management_dark_mode');
    }
  };

  const isDirty = editingIncome
    ? (parseFloat(String(amount).replace(/,/g, '')) !== Number(editingIncome.amount) || payerName !== (editingIncome.payerName || '') || memo !== (editingIncome.notes || editingIncome.note || ''))
    : (parseFloat(String(amount).replace(/,/g, '')) > 0 || payerName.trim() !== '' || memo.trim() !== '');

  const handleCancel = async () => {
    if (isDirty) {
      const confirmed = await confirm({
        variant: 'warning',
        titleKey: 'confirm.discardIncomeTitle',
        messageKey: 'confirm.discardIncomeDescription',
        confirmLabelKey: 'confirm.discard',
        cancelLabelKey: 'confirm.keepEditing',
      });
      if (!confirmed) return;
    }
    if (setEditingIncome) setEditingIncome(null);
    if (typeof goBack === 'function') {
      goBack('income_management_dark_mode');
    } else if (setActiveTab) {
      setActiveTab('income_management_dark_mode');
    }
  };

  const handleDelete = async () => {
    if (editingIncome) {
      const confirmed = await confirm({
        variant: 'destructive',
        titleKey: 'confirm.deleteIncomeTitle',
        messageKey: 'confirm.deleteIncomeDescription',
        confirmLabelKey: 'confirm.delete',
        cancelLabelKey: 'confirm.cancel',
      });
      if (!confirmed) return;
      const deleteIncomeFn = useFinanceStore.getState().deleteIncome;
      if (deleteIncomeFn) deleteIncomeFn(editingIncome.id);
      if (setEditingIncome) setEditingIncome(null);
      toast.success(t('toasts.incomeDeleted', 'Income stream deleted'));
    } else {
      const confirmed = await confirm({
        variant: 'warning',
        titleKey: 'confirm.discardIncomeTitle',
        messageKey: 'confirm.discardIncomeDescription',
        confirmLabelKey: 'confirm.discard',
        cancelLabelKey: 'confirm.keepEditing',
      });
      if (!confirmed) return;
      if (setEditingIncome) setEditingIncome(null);
      toast.info(t('toasts.incomeDiscarded', 'Income entry discarded'));
    }
    if (typeof goBack === 'function') {
      goBack('income_management_dark_mode');
    } else if (setActiveTab) {
      setActiveTab('income_management_dark_mode');
    }
  };

  const monthPrefix = (depositDate && depositDate.slice(0, 7)) || getTodayIsoDate().slice(0, 7);
  const baselineMonthlyIncome = (incomes || []).filter((i) => i.date && i.date.startsWith(monthPrefix) && (i.currency || 'USD') === selectedCurrency && (!editingIncome || String(i.id) !== String(editingIncome.id))).reduce((sum, i) => sum + (Number(i.amount) || 0), 0);
  const numericVal = parseFloat(String(amount).replace(/,/g, '')) || 0;
  const formattedAmount = numericVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const impactPct = baselineMonthlyIncome > 0 ? ((numericVal / baselineMonthlyIncome) * 100).toFixed(1) : (numericVal > 0 ? '100.0' : '0.0');
  const impactPercentageText = numericVal > 0 ? `+${impactPct}%` : '+0.0%';

  return (
    <>
      {/* Top Header Bar */}
      <div className="sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-white tracking-tight">
            {editingIncome ? t('finance.editIncome', 'Edit Income') : t('finance.addIncome', 'Add Income')}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={handleCancel} 
            className="p-2 rounded-full text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer select-none"
          >
            <ArrowLeft className="w-5 h-5"/>
          </button>
          <UserAvatar 
            setActiveTab={setActiveTab} 
          />
        </div>
      </div>

      <main className="flex-1 w-full bg-surface pb-safe px-4 lg:px-8 pt-2">
        <div className="w-full max-w-md lg:max-w-5xl mx-auto pb-28 flex flex-col select-none text-white">
          
          {/* Status Badge & Mode Switch Bar */}
          <div className="flex flex-row items-center justify-between w-full px-1 mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="h-9 inline-flex items-center justify-center gap-1.5 px-3.5 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-semibold shadow-sm">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span id="mode-text">• {t('finance.newEntry', 'NEW ENTRY')} #1</span>
              </span>
              <span className="h-9 inline-flex items-center justify-center gap-1.5 px-3.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold shadow-sm">
                <span className="material-symbols-outlined text-[16px]">check</span>
                <span>• {t('finance.autoCategorized', 'AUTO-CATEGORIZED')}</span>
              </span>
            </div>
            <button 
              onClick={handleReset}
              className="h-9 inline-flex items-center justify-center gap-1.5 px-3.5 rounded-full text-slate-300 hover:text-white transition-all text-xs font-semibold bg-slate-800/80 border border-slate-700/80 hover:bg-slate-700/80 active:scale-95 shadow-sm cursor-pointer select-none" 
              id="clear-btn" 
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">restart_alt</span>
              <span>{t('common.reset', 'Reset')}</span>
            </button>
          </div>

          {/* Responsive Layout: 2-Column Grid on Desktop (>= 1024px), Single Column on Mobile */}
          <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-6 items-start gap-4">
            
            {/* ── LEFT COLUMN (Cols 1-7 on Desktop): Amount, Presets, Sources, Monthly Impact ── */}
            <div className="w-full lg:col-span-7 flex flex-col gap-4">
              {/* Income Amount & Currency Bento Card */}
              <div className="relative overflow-hidden rounded-3xl p-5 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl w-full">
                {/* Subtle Ambient Glow Orbs */}
                <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-primary-fixed/40 blur-2xl pointer-events-none"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-tertiary-fixed/30 blur-xl pointer-events-none"></div>
                <div className="relative z-10 flex flex-col space-y-3">
                  {/* Currency selector & Micro-label */}
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md tracking-wider text-slate-400 uppercase">{t('finance.incomeAmount', 'Income Amount')}</span>
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-0.5 shadow-inner">
                      <button 
                        onClick={() => setSelectedCurrency('AFN')}
                        className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-semibold transition-all cursor-pointer select-none ${selectedCurrency === 'AFN' ? 'bg-primary text-white shadow-sm' : 'text-slate-400 hover:text-white'}`} 
                        type="button"
                      >
                        AFN (افـ)
                      </button>
                      <button 
                        onClick={() => setSelectedCurrency('USD')}
                        className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-semibold transition-all cursor-pointer select-none ${selectedCurrency === 'USD' ? 'bg-primary text-white shadow-sm' : 'text-slate-400 hover:text-white'}`} 
                        type="button"
                      >
                        USD ($)
                      </button>
                      <button 
                        onClick={() => setSelectedCurrency('EUR')}
                        className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-semibold transition-all cursor-pointer select-none ${selectedCurrency === 'EUR' ? 'bg-primary text-white shadow-sm' : 'text-slate-400 hover:text-white'}`} 
                        type="button"
                      >
                        EUR (€)
                      </button>
                    </div>
                  </div>

                  {/* Main Input Display */}
                  <div className="flex items-baseline justify-center py-2">
                    <span className="text-3xl lg:text-4xl text-emerald-400 font-bold tracking-tight mr-1">+</span>
                    {selectedCurrency !== 'AFN' && (
                      <span className="text-3xl lg:text-4xl text-emerald-400 font-bold tracking-tight" id="currency-symbol">{currencySymbol}</span>
                    )}
                    <input 
                      aria-label={t('finance.incomeAmount', 'Income Amount')} 
                      className="w-56 bg-transparent text-4xl lg:text-5xl text-white font-bold tracking-tight focus:outline-none text-center" 
                      id="amount-input" 
                      inputMode="decimal" 
                      type="text" 
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    {selectedCurrency === 'AFN' && (
                      <span className="text-2xl lg:text-3xl text-emerald-400 font-bold tracking-tight ml-1">افـ</span>
                    )}
                  </div>

                  {/* Quick Add Preset Chips */}
                  <div className="flex items-center justify-between gap-1.5 pt-1 flex-wrap">
                    <button 
                      onClick={() => handleQuickAdd(selectedCurrency === 'AFN' ? 500 : 10)}
                      className="preset-pill flex-1 min-w-[70px] rounded-full px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs text-center shadow-sm border border-slate-700/70 transition-all duration-150 active:scale-95 cursor-pointer select-none" 
                      type="button"
                    >
                      {selectedCurrency === 'AFN' ? '+500 افـ' : `+${currencySymbol}10`}
                    </button>
                    <button 
                      onClick={() => handleQuickAdd(selectedCurrency === 'AFN' ? 1000 : 25)}
                      className="preset-pill flex-1 min-w-[70px] rounded-full px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs text-center shadow-sm border border-slate-700/70 transition-all duration-150 active:scale-95 cursor-pointer select-none" 
                      type="button"
                    >
                      {selectedCurrency === 'AFN' ? '+1,000 افـ' : `+${currencySymbol}25`}
                    </button>
                    <button 
                      onClick={() => handleQuickAdd(selectedCurrency === 'AFN' ? 2500 : 50)}
                      className="preset-pill flex-1 min-w-[70px] rounded-full px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs text-center shadow-sm border border-slate-700/70 transition-all duration-150 active:scale-95 cursor-pointer select-none" 
                      type="button"
                    >
                      {selectedCurrency === 'AFN' ? '+2,500 افـ' : `+${currencySymbol}50`}
                    </button>
                    <button 
                      onClick={() => handleQuickAdd(selectedCurrency === 'AFN' ? 5000 : 100)}
                      className="preset-pill flex-1 min-w-[70px] rounded-full px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs text-center shadow-sm border border-slate-700/70 transition-all duration-150 active:scale-95 cursor-pointer select-none" 
                      type="button"
                    >
                      {selectedCurrency === 'AFN' ? '+5,000 افـ' : `+${currencySymbol}100`}
                    </button>
                  </div>
                </div>
              </div>

              {/* Income Source Selector */}
              <div className="rounded-3xl p-5 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl space-y-3 w-full">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-white tracking-tight">{t('finance.incomeSource', 'Income Source')}</h2>
                    <p className="text-xs text-slate-400">{t('finance.chooseSourceType', 'Choose source type for cashflow analytics')}</p>
                  </div>
                  <span className="text-xs text-primary font-semibold">{incomeSource}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1" id="sources-container">
                  {SOURCES.map((s) => {
                    const isSelected = incomeSource === s.name;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setIncomeSource(s.name)}
                        className={`source-card p-3 pl-4 flex items-center justify-between rounded-2xl transition-all text-xs font-semibold active:scale-95 cursor-pointer select-none ${s.colSpan || ''} ${
                          isSelected
                            ? 'text-primary bg-primary/20 border-2 border-primary/80 shadow-lg ring-1 ring-primary/30'
                            : 'text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10'
                        }`}
                        data-source={s.name}
                        type="button"
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <span className="material-symbols-outlined text-[18px]" style={isSelected ? { fontVariationSettings: '"FILL" 1' } : {}}>
                            {s.icon}
                          </span>
                          <span className="truncate">{s.name}</span>
                        </div>
                        {isSelected && (
                          <span className="material-symbols-outlined text-[16px] text-primary shrink-0">check_circle</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Monthly Impact Bento Tile */}
              <div className="p-4 rounded-2xl flex items-center justify-between bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl w-full">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <span className="material-symbols-outlined text-[18px]">trending_up</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-white font-medium">{t('finance.monthlyImpact', 'Monthly Impact')}</span>
                    <span className="font-body-sm text-body-sm text-emerald-400 font-semibold">{impactPercentageText} {t('finance.toLiquidityGoals', 'to liquidity goals')}</span>
                  </div>
                </div>
                <span className="text-base font-bold text-emerald-400">
                  {numericVal > 0 ? (selectedCurrency === 'AFN' ? `+${formattedAmount} افـ${t('common.perMonth', '/mo')}` : `+${currencySymbol}${formattedAmount}${t('common.perMonth', '/mo')}`) : (selectedCurrency === 'AFN' ? '0.00 افـ' : `${currencySymbol}0.00`)}
                </span>
              </div>
            </div>

            {/* ── RIGHT COLUMN (Cols 8-12 on Desktop): Details & Actions ── */}
            <div className="w-full lg:col-span-5 flex flex-col gap-4">
              {/* Income Details Form Card */}
              <div className="rounded-3xl p-5 space-y-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl w-full">
                <h2 className="text-sm font-bold text-white tracking-tight">{t('finance.depositDetails', 'Deposit Details')}</h2>

                {/* Payer / Company Field */}
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 uppercase tracking-wider block" htmlFor="payer-input">{t('finance.sourceTitlePayer', 'Source Title / Payer Name')}</label>
                  <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="material-symbols-outlined text-primary text-[20px]">domain</span>
                    <input 
                      aria-label={t('finance.sourceTitlePayer', 'Source Title or Payer Name')} 
                      className="w-full bg-transparent text-sm text-white focus:outline-none placeholder:text-slate-500" 
                      id="payer-input" 
                      type="text" 
                      value={payerName}
                      onChange={(e) => setPayerName(e.target.value)}
                      placeholder={t('finance.clientEmployerPlaceholder', 'e.g. Client or Employer Name')}
                    />
                    <span className="material-symbols-outlined text-slate-500 text-[18px]">edit</span>
                  </div>
                </div>

                {/* Date & Deposit Frequency Field */}
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 uppercase tracking-wider block" htmlFor="schedule-trigger">{t('finance.depositScheduleRecurrence', 'Deposit Schedule & Recurrence')}</label>
                  <div id="income-date-tile"
                    onClick={handleDateClick}
                    className="relative flex items-center justify-between px-3.5 py-2.5 rounded-2xl cursor-pointer transition-colors bg-white/5 border border-white/10 hover:bg-white/10" 
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="material-symbols-outlined text-emerald-400 text-[20px]">event_repeat</span>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium text-white truncate">{formatDisplayDate(depositDate)}</span>
                        <span className="text-xs text-primary font-medium">{depositSchedule}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleScheduleClick}
                      className="p-1 rounded-lg hover:bg-slate-700/50 transition-colors"
                      title={t('finance.configureRecurrence', 'Configure Recurrence')}
                    >
                      <span className="material-symbols-outlined text-slate-400 text-[20px]">tune</span>
                    </button>
                  </div>
                  <MomentumDatePicker
                    isOpen={isDatePickerOpen}
                    onClose={() => setIsDatePickerOpen(false)}
                    value={depositDate}
                    onSelect={(newDate) => setDepositDate(newDate)}
                    title={t('finance.selectDepositDate', 'Select Deposit Date')}
                  />
                </div>

                {/* Notes & Memo Field */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-slate-400 uppercase tracking-wider block" htmlFor="memo-input">{t('finance.notesMemo', 'Notes & Memo')}</label>
                    <span className="text-xs text-slate-400">{memo.length} / 140</span>
                  </div>
                  <div className="px-3.5 py-3 rounded-2xl bg-white/5 border border-white/10">
                    <textarea 
                      aria-label={t('finance.notesMemo', 'Notes and Memo')} 
                      className="w-full bg-transparent text-xs text-white placeholder:text-slate-500 focus:outline-none resize-none" 
                      id="memo-input" 
                      rows="3"
                      maxLength={140}
                      value={memo}
                      onChange={(e) => setMemo(e.target.value)}
                      placeholder={t('finance.addNotesMemo', 'Add notes and memo...')}
                    />
                  </div>
                </div>
              </div>

              {/* Primary & Secondary Action Buttons Card */}
              <div className="rounded-3xl p-5 space-y-3 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl w-full">
                {/* Radiant Primary Button */}
                <button 
                  onClick={handleSave}
                  className="btn-primary w-full h-12 text-sm font-bold shadow-lg cursor-pointer select-none !bg-emerald-600 hover:!bg-emerald-700 flex items-center justify-center gap-2" 
                  id="save-income-btn" 
                  type="button"
                >
                  <span>{t('finance.saveIncomeEntry', 'Save Income Entry')}</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>

                {/* Secondary Actions: Cancel & Delete Side-by-Side */}
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={handleCancel}
                    className="btn-secondary w-full h-11 text-xs font-semibold cursor-pointer select-none flex items-center justify-center" 
                    type="button"
                  >
                    {t('common.cancel', 'Cancel')}
                  </button>
                  <button 
                    onClick={handleDelete}
                    className="btn-danger w-full h-11 text-xs font-semibold cursor-pointer select-none flex items-center justify-center gap-1.5" 
                    id="delete-income-btn" 
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                    <span>{t('finance.deleteIncomeRecord', 'Delete')}</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>
    </>
  );
}
