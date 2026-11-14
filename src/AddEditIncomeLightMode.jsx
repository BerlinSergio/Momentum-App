import { useState, useRef } from 'react';
import UserAvatar from './components/UserAvatar';
import { useFinanceStore } from './store/useFinanceStore';
import { Wallet, ArrowLeft } from 'lucide-react';

const SOURCES = [
  { id: 'salary', name: 'Salary', icon: 'work', colSpan: '' },
  { id: 'freelance', name: 'Freelance', icon: 'laptop_mac', colSpan: '' },
  { id: 'business', name: 'Business', icon: 'storefront', colSpan: '' },
  { id: 'bonus', name: 'Bonus', icon: 'featured_seasonal_and_gifts', colSpan: '' },
  { id: 'other', name: 'Other', icon: 'more_horiz', colSpan: 'col-span-2' },
];

const getTodayIsoDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

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

export default function AddEditIncomeLightMode({ setActiveTab, goBack }) {
  const { incomes, addTransaction, editingIncome, updateIncome, setEditingIncome } = useFinanceStore();

  const [amount, setAmount] = useState(() => editingIncome ? String(editingIncome.amount) : '45000.00');
  const [selectedCurrency, setSelectedCurrency] = useState(() => editingIncome?.currency || 'AFN');
  const [incomeSource, setIncomeSource] = useState(() => editingIncome?.category || 'Salary');
  const [payerName, setPayerName] = useState(() => editingIncome?.payerName || editingIncome?.title || 'TechCorp Global Ltd.');
  const [depositSchedule, setDepositSchedule] = useState(() => editingIncome?.recurrence || 'Monthly Recurring (1st of month)');
  const [depositDate, setDepositDate] = useState(() => editingIncome?.date || getTodayIsoDate());
  const [memo, setMemo] = useState(() => editingIncome?.notes || editingIncome?.note || 'Monthly senior design lead compensation & quarterly milestone recognition');

  const dateInputRef = useRef(null);

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
    setAmount('45000.00');
    setSelectedCurrency('AFN');
    setIncomeSource('Salary');
    setPayerName('TechCorp Global Ltd.');
    setDepositSchedule('Monthly Recurring (1st of month)');
    setDepositDate(getTodayIsoDate());
    setMemo('Monthly senior design lead compensation & quarterly milestone recognition');
  };

  const handleDateClick = (e) => {
    e.stopPropagation();
    if (dateInputRef.current) {
      if (typeof dateInputRef.current.showPicker === 'function') {
        dateInputRef.current.showPicker();
      } else {
        dateInputRef.current.focus();
        dateInputRef.current.click();
      }
    }
  };

  const handleScheduleClick = (e) => {
    e.stopPropagation();
    const next = window.prompt('Enter Deposit Schedule & Recurrence:', depositSchedule);
    if (next !== null && next.trim()) {
      setDepositSchedule(next.trim());
    }
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();
    const numericAmount = parseFloat(String(amount).replace(/,/g, '')) || 0;
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
    }
    if (goBack) goBack('finance_expense_tracker_light_mode'); else if (setActiveTab) setActiveTab('income_management_light_mode');
  };

  const handleDelete = () => {
    if (window.confirm('Discard this income entry?')) {
      if (setEditingIncome) setEditingIncome(null);
      if (setActiveTab) setActiveTab('income_management_light_mode');
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
          <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-slate-900 tracking-tight" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.85), 0 2px 4px rgba(0,0,0,0.15)' }}>
            {editingIncome ? 'Edit Income' : 'Add Income'}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={() => {
              if (setEditingIncome) setEditingIncome(null);
              if (setActiveTab) setActiveTab('income_management_light_mode');
            }} 
            className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer select-none"
          >
            <ArrowLeft className="w-5 h-5"/>
          </button>
          <UserAvatar 
            setActiveTab={setActiveTab} 
          />
        </div>
      </div>

      <main className="flex-1 w-full bg-surface pb-safe px-margin">
        <div className="w-full max-w-md mx-auto px-4 py-4 space-y-5 pb-20 flex flex-col select-none">
          
          {/* Status Badge & Mode Switch Bar */}
          <div className="flex flex-row items-center justify-center gap-2 w-full flex-wrap">
            <span className="h-9 inline-flex items-center justify-center gap-1.5 px-3.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span id="mode-text" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>&bull; NEW ENTRY #1</span>
            </span>
            <span className="h-9 inline-flex items-center justify-center gap-1.5 px-3.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 shadow-sm">
              <span className="material-symbols-outlined text-[16px]">check</span>
              <span style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>&bull; AUTO-CATEGORIZED</span>
            </span>
            <button 
              onClick={handleReset}
              className="h-9 inline-flex items-center justify-center gap-1.5 px-3.5 rounded-full text-slate-700 hover:text-slate-900 transition-all text-xs font-semibold bg-slate-100 border border-slate-200 hover:bg-slate-200 active:scale-95 shadow-sm cursor-pointer select-none" 
              id="clear-btn" 
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">restart_alt</span>
              <span>Reset</span>
            </button>
          </div>

          {/* Hero Amount Card (Glassmorphic) */}
          <div className="relative overflow-hidden rounded-3xl p-5 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
            {/* Subtle Ambient Glow Orbs */}
            <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-primary-fixed/40 blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-tertiary-fixed/30 blur-xl pointer-events-none"></div>
            <div className="relative z-10 flex flex-col space-y-space-md">
              {/* Currency selector & Micro-label */}
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md tracking-wider text-on-surface-variant uppercase">Income Amount</span>
                <div className="flex items-center gap-1 bg-surface-container-low px-2.5 py-1 rounded-full shadow-sm">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Currency:</span>
                  <button 
                    onClick={handleToggleCurrency}
                    className="flex items-center gap-0.5 font-label-md text-label-md text-primary font-semibold cursor-pointer select-none" 
                    id="curr-toggle" 
                    type="button"
                  >
                    <span id="curr-label">{currencyLabel}</span>
                    <span className="material-symbols-outlined text-[14px]">expand_more</span>
                  </button>
                </div>
              </div>

              {/* Main Input Display */}
              <div className="flex items-baseline justify-center py-2">
                <span className="font-display-lg text-display-lg text-emerald-600 font-bold tracking-tight mr-1">+</span>
                <span className="font-display-lg text-display-lg text-emerald-600 font-bold tracking-tight" id="currency-symbol">{currencySymbol}</span>
                <input 
                  aria-label="Income Amount Value" 
                  className="w-56 bg-transparent font-display-lg text-display-lg text-on-surface font-bold tracking-tight focus:outline-none text-left pl-1" 
                  id="amount-input" 
                  inputMode="decimal" 
                  type="text" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              {/* Quick Add Preset Chips */}
              <div className="flex items-center justify-between gap-1.5 pt-1">
                <button 
                  onClick={() => handleQuickAdd(500)}
                  className="preset-pill flex-1 rounded-full px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs text-center shadow-sm border border-slate-200/70 transition-all duration-150 active:scale-95 cursor-pointer select-none" 
                  data-val="500" 
                  type="button"
                >
                  {selectedCurrency === 'AFN' ? '+500 افـ' : `+${currencySymbol}500`}
                </button>
                <button 
                  onClick={() => handleQuickAdd(1000)}
                  className="preset-pill flex-1 rounded-full px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs text-center shadow-sm border border-slate-200/70 transition-all duration-150 active:scale-95 cursor-pointer select-none" 
                  data-val="1000" 
                  type="button"
                >
                  {selectedCurrency === 'AFN' ? '+1,000 افـ' : `+${currencySymbol}1,000`}
                </button>
                <button 
                  onClick={() => handleQuickAdd(2500)}
                  className="preset-pill flex-1 rounded-full px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs text-center shadow-sm border border-slate-200/70 transition-all duration-150 active:scale-95 cursor-pointer select-none" 
                  data-val="2500" 
                  type="button"
                >
                  {selectedCurrency === 'AFN' ? '+2,500 افـ' : `+${currencySymbol}2,500`}
                </button>
                <button 
                  onClick={() => handleQuickAdd(5000)}
                  className="preset-pill flex-1 rounded-full px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs text-center shadow-sm border border-slate-200/70 transition-all duration-150 active:scale-95 cursor-pointer select-none" 
                  data-val="5000" 
                  type="button"
                >
                  +{currencySymbol}5,000
                </button>
              </div>
            </div>
          </div>

          {/* Income Source Selector */}
          <div className="flex flex-col space-y-space-sm">
            <div className="flex items-center justify-between px-space-xs">
              <div>
                <h2 className="font-headline-sm text-headline-sm text-slate-900" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>Income Source</h2>
                <p className="font-body-sm text-body-sm text-slate-800" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>Choose source type for cashflow analytics</p>
              </div>
              <span className="font-label-sm text-label-sm text-slate-900 font-semibold" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>Step 1 of 2</span>
            </div>

            {/* Category Pill Horizontal Ribbon */}
            <div className="grid grid-cols-2 gap-3.5 pt-1" id="sources-container">
              {SOURCES.map((s) => {
                const isSelected = incomeSource === s.name;
                return (
                  <button
                    key={s.id}
                    onClick={() => setIncomeSource(s.name)}
                    className={`source-card p-3 pl-4 flex items-center justify-between rounded-2xl transition-all text-sm font-medium active:scale-95 cursor-pointer select-none ${s.colSpan || ''} ${
                      isSelected
                        ? 'text-primary bg-white/90 border-2 border-primary shadow-md font-semibold'
                        : 'text-slate-700 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg hover:bg-white/85'
                    }`}
                    data-source={s.name}
                    type="button"
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[20px]" style={isSelected ? { fontVariationSettings: '"FILL" 1' } : {}}>
                        {s.icon}
                      </span>
                      <span>{s.name}</span>
                    </div>
                    {isSelected && (
                      <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Income Details Form Card */}
          <div className="rounded-3xl p-5 space-y-space-md bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
            {/* Payer / Company Field */}
            <div className="space-y-1">
              <label className="font-label-md text-label-md text-on-surface-variant block" htmlFor="payer-input">Source Title / Payer Name</label>
              <div className="flex items-center gap-3.5 px-space-md py-2.5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
                <span className="material-symbols-outlined text-primary text-[20px]">domain</span>
                <input 
                  aria-label="Source Title or Payer Name" 
                  className="w-full bg-transparent font-body-lg text-body-lg text-on-surface focus:outline-none" 
                  id="payer-input" 
                  type="text" 
                  value={payerName}
                  onChange={(e) => setPayerName(e.target.value)}
                  placeholder="e.g. TechCorp Global Ltd."
                />
                <span className="material-symbols-outlined text-on-surface-variant/40 text-[18px]">edit</span>
              </div>
            </div>

            {/* Date & Deposit Frequency Field */}
            <div className="space-y-1">
              <label className="font-label-md text-label-md text-on-surface-variant block" htmlFor="schedule-trigger">Deposit Schedule &amp; Recurrence</label>
              <div 
                onClick={handleDateClick}
                className="relative flex items-center justify-between px-space-md py-2.5 rounded-2xl cursor-pointer transition-colors bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg hover:bg-white/85" 
                id="schedule-trigger"
              >
                <input 
                  ref={dateInputRef}
                  type="date"
                  value={depositDate}
                  onChange={(e) => setDepositDate(e.target.value)}
                  className="absolute inset-0 opacity-0 pointer-events-none w-full h-full"
                  tabIndex={-1}
                />
                <div className="flex items-center gap-space-sm min-w-0">
                  <span className="material-symbols-outlined text-secondary text-[20px]">event_repeat</span>
                  <div className="flex flex-col min-w-0">
                    <span className="font-body-lg text-body-lg text-on-surface truncate">{formatDisplayDate(depositDate)}</span>
                    <span className="font-body-sm text-body-sm text-secondary font-medium">{depositSchedule}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleScheduleClick}
                  className="p-1 rounded-lg hover:bg-slate-200/50 transition-colors"
                  title="Configure Recurrence"
                >
                  <span className="material-symbols-outlined text-on-surface-variant text-[20px]">tune</span>
                </button>
              </div>
            </div>

            {/* Notes & Memo Field */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="font-label-md text-label-md text-on-surface-variant block" htmlFor="memo-input">Notes &amp; Memo</label>
                <span className="font-label-sm text-label-sm text-on-surface-variant/70">{memo.length} / 140</span>
              </div>
              <div className="px-space-md py-3 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
                <textarea 
                  aria-label="Notes and Memo" 
                  className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder-on-surface-variant/50 focus:outline-none resize-none" 
                  id="memo-input" 
                  rows="2"
                  maxLength={140}
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  placeholder="Add notes and memo..."
                />
              </div>
            </div>
          </div>

          {/* Realtime Projection Micro-Card */}
          <div className="p-space-md rounded-2xl flex items-center justify-between bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
            <div className="flex items-center gap-space-sm">
              <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[18px]">trending_up</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md text-on-surface">Monthly Impact</span>
                <span className="font-body-sm text-body-sm text-secondary font-semibold">{impactPercentageText} to liquidity goals</span>
              </div>
            </div>
            <span className="font-headline-sm text-headline-sm text-tertiary font-bold">
              {numericVal > 0 ? (selectedCurrency === 'AFN' ? `+${formattedAmount} افـ/mo` : `+${currencySymbol}${formattedAmount}/mo`) : (selectedCurrency === 'AFN' ? '0.00 افـ' : `${currencySymbol}0.00`)}
            </span>
          </div>

          {/* Primary & Secondary Action Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            {/* Radiant Primary Button */}
            <button 
              onClick={handleSave}
              className="btn-primary w-full cursor-pointer select-none" 
              id="save-income-btn" 
              type="button"
            >
              <span>Save Income Entry</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>

            {/* Secondary Actions: Cancel & Delete Side-by-Side */}
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setActiveTab && setActiveTab('finance_expense_tracker_light_mode')}
                className="btn-secondary w-full cursor-pointer select-none" 
                type="button"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="btn-danger w-full cursor-pointer select-none" 
                id="delete-income-btn" 
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">delete</span>
                <span>Delete Income Record</span>
              </button>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
