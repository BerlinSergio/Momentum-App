import { useTranslation } from 'react-i18next';
import { useState, useRef } from 'react';
import { useFinanceStore } from './store/useFinanceStore';
import { getLocalDateKey, getLocalDateParts } from './utils/timeService';
import { Coins, ArrowLeft, Check, Calendar } from 'lucide-react';
import { MomentumDateTimePicker } from './components/ui/picker/index.js';
import { toast } from './components/ui/toast/index.js';
import { confirm } from './components/ui/confirmation/index.js';

const EXPENSE_CATEGORIES = [
  { id: 'food', name: 'Food & Dining', label: 'Food', icon: 'restaurant' },
  { id: 'transport', name: 'Transportation', label: 'Transport', icon: 'directions_car' },
  { id: 'shopping', name: 'Shopping', label: 'Shopping', icon: 'shopping_bag' },
  { id: 'bills', name: 'Bills & Utilities', label: 'Bills', icon: 'receipt_long' },
  { id: 'rent', name: 'Rent & Housing', label: 'Rent', icon: 'home' },
  { id: 'health', name: 'Health & Fitness', label: 'Health', icon: 'ecg_heart' },
  { id: 'education', name: 'Education', label: 'Education', icon: 'school' },
  { id: 'entertainment', name: 'Entertainment', label: 'Entertain', icon: 'movie' },
  { id: 'family', name: 'Family & Care', label: 'Family', icon: 'group' },
  { id: 'work', name: 'Work & Professional', label: 'Work', icon: 'business_center' },
  { id: 'other', name: 'Other', label: 'Other', icon: 'more_horiz', colSpan: 'col-span-2' },
];

const INCOME_CATEGORIES = [
  { id: 'salary', name: 'Salary', label: 'Salary', icon: 'payments' },
  { id: 'freelance', name: 'Freelance', label: 'Freelance', icon: 'laptop_mac' },
  { id: 'business', name: 'Business', label: 'Business', icon: 'storefront' },
  { id: 'investments', name: 'Investments', label: 'Invest', icon: 'trending_up' },
  { id: 'gifts', name: 'Gifts & Grants', label: 'Gifts', icon: 'card_giftcard' },
  { id: 'other_income', name: 'Other Income', label: 'Other', icon: 'more_horiz' },
];

export default function AddEditExpenseDarkMode({ setActiveTab, goBack }) {
  const { t } = useTranslation();
  const { addTransaction, updateTransaction, editingTransaction, setEditingTransaction, pendingTransactionType } = useFinanceStore();

  const handleNavigate = (targetScreen) => {
    if (setEditingTransaction) setEditingTransaction(null);
    if (typeof goBack === 'function' && targetScreen.includes('tracker')) {
      goBack(targetScreen);
    } else if (typeof setActiveTab === 'function') {
      setActiveTab(targetScreen);
    }
  };

  const [transactionType, setTransactionType] = useState(() => editingTransaction?.type || pendingTransactionType || 'expense');
  const [amount, setAmount] = useState(() => (editingTransaction ? String(editingTransaction.amount) : ''));
  const [selectedCurrency, setSelectedCurrency] = useState(() => editingTransaction?.currency || 'AFN');
  const [selectedCategory, setSelectedCategory] = useState(() => editingTransaction?.category || (pendingTransactionType === 'income' ? 'Salary' : 'Food & Dining'));
  const [note, setNote] = useState(() => editingTransaction?.note || editingTransaction?.notes || editingTransaction?.title || '');
  
  const [dateTime, setDateTime] = useState(() => {
    if (editingTransaction?.date) {
      return editingTransaction.date.includes('T') ? editingTransaction.date : `${editingTransaction.date}T12:00`;
    }
    const parts = getLocalDateParts();
    const pad = (n) => String(n).padStart(2, '0');
    return `${parts.dateKey}T${pad(parts.hours)}:${pad(parts.minutes)}`;
  });

  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [receiptFile, setReceiptFile] = useState(null);

  const categories = transactionType === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  const handleTypeChange = (newType) => {
    setTransactionType(newType);
    if (newType === 'income') {
      const isIncomeCategory = INCOME_CATEGORIES.some(c => c.name === selectedCategory);
      if (!isIncomeCategory) setSelectedCategory('Salary');
      if (note === 'Weekly fresh produce & essentials') setNote('Client consultation fee');
    } else {
      const isExpenseCategory = EXPENSE_CATEGORIES.some(c => c.name === selectedCategory);
      if (!isExpenseCategory) setSelectedCategory('Food & Dining');
      if (note === 'Client consultation fee') setNote('Weekly fresh produce & essentials');
    }
  };

  // Synchronized via initial state
  // pendingTransactionType consumed at initialization

  const handleTypeToggle = () => {
    const nextType = transactionType === 'expense' ? 'income' : 'expense';
    handleTypeChange(nextType);
  };

  const currencySymbol = selectedCurrency === 'AFN' ? 'افـ' : selectedCurrency === 'EUR' ? '€' : '$';

  const formatQuickChip = (val) => {
    if (selectedCurrency === 'AFN') return `+ ${val} افـ`;
    return `+ ${currencySymbol}${val}`;
  };

  const formatDisplayDateTime = (isoString) => {
    if (!isoString) return { dateStr: 'Select Date', timeStr: '' };
    try {
      const d = new Date(isoString);
      if (isNaN(d.getTime())) return { dateStr: isoString, timeStr: '' };
      const now = new Date();
      const isToday = d.toDateString() === now.toDateString();
      const dateFormatted = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      const timeFormatted = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      return { dateStr: isToday ? `Today, ${dateFormatted}` : dateFormatted, timeStr: timeFormatted };
    } catch {
      return { dateStr: isoString, timeStr: '' };
    }
  };

  const { dateStr, timeStr } = formatDisplayDateTime(dateTime);

  const handleDateTimeClick = () => {
    setIsPickerOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) setReceiptFile(file);
  };

  const handleAttachClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleQuickAdd = (increment) => {
    const current = parseFloat(amount) || 0;
    setAmount((current + increment).toFixed(2));
  };

  const handleRoundUp = () => {
    const current = parseFloat(amount) || 0;
    const rounded = Math.ceil(current);
    const finalVal = rounded === current ? current + 1 : rounded;
    setAmount(finalVal.toFixed(2));
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();
    const numericAmount = parseFloat(amount) || 0;
    if (numericAmount <= 0) {
      toast.error(t('toasts.validAmount', 'Please enter a valid amount'));
      return;
    }
    const title = note.trim() || `${selectedCategory} ${transactionType === 'expense' ? 'Expense' : 'Income'}`;
    const selectedDate = dateTime.split('T')[0] || getLocalDateKey();

    if (editingTransaction && updateTransaction) {
      updateTransaction({
        ...editingTransaction,
        title,
        amount: numericAmount,
        type: transactionType,
        category: selectedCategory,
        currency: selectedCurrency,
        date: selectedDate,
        note: note.trim(),
        notes: note.trim(),
      });
      if (setEditingTransaction) setEditingTransaction(null);
      toast.success(transactionType === 'expense' ? t('toasts.expenseUpdated', 'Expense updated') : t('toasts.incomeUpdated', 'Income updated'));
    } else {
      addTransaction({
        title,
        amount: numericAmount,
        type: transactionType,
        category: selectedCategory,
        currency: selectedCurrency,
        date: selectedDate,
        note: note.trim(),
        notes: note.trim(),
      });
      toast.success(transactionType === 'expense' ? t('toasts.expenseSaved', 'Expense recorded successfully') : t('toasts.incomeSaved', 'Income recorded successfully'));
    }

    handleNavigate('finance_expense_tracker_dark_mode');
  };

  const isDirty = editingTransaction
    ? (parseFloat(amount) !== Number(editingTransaction.amount) || note !== (editingTransaction.note || editingTransaction.notes || ''))
    : (Boolean(parseFloat(amount) > 0) || (note && note.trim() !== ''));

  const handleCancelOrDiscard = async () => {
    if (isDirty) {
      const confirmed = await confirm({
        variant: 'warning',
        titleKey: 'confirm.discardExpenseTitle',
        messageKey: 'confirm.discardExpenseDescription',
        confirmLabelKey: 'confirm.discard',
        cancelLabelKey: 'confirm.keepEditing',
      });
      if (!confirmed) return;
    }
    handleNavigate('finance_expense_tracker_dark_mode');
  };

  return (
    <div className="relative w-full min-h-screen bg-transparent font-sans">
      <header className="sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex items-center justify-between px-5 pt-6 pb-2 pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30">
            <Coins className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-white tracking-tight" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.8)' }}>
            {transactionType === 'expense' ? t('finance.logExpense', 'Log Expense') : t('finance.logIncome', 'Log Income')}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            type="button" 
            onClick={handleCancelOrDiscard} 
            className="p-2 rounded-full text-slate-300 hover:bg-white/10 transition-colors pointer-events-auto cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </header>

            <main className="flex-1 w-full bg-transparent pb-safe px-5 lg:px-8 pt-2">
        <div className="w-full max-w-md lg:max-w-5xl mx-auto pb-28">
          {/* Top Status & Discard Bar */}
          <div className="flex flex-row items-center justify-between w-full px-1 mb-4">
            <div className="h-9 pl-3.5 pr-1.5 rounded-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 shadow-sm whitespace-nowrap shrink-0">
              <span className={`w-2 h-2 rounded-full animate-pulse ${transactionType === 'expense' ? 'bg-primary' : 'bg-emerald-600'}`}></span>
              <span className="font-label-sm text-label-sm text-white font-medium tracking-wide">{t('finance.newRecord', 'NEW RECORD')}</span>
              <button type="button"
                onClick={handleTypeToggle}
                className={`h-6 px-2.5 rounded-full font-label-sm text-label-sm font-bold flex items-center gap-1 transition-all cursor-pointer pointer-events-auto active:scale-95 ${
                  transactionType === 'expense' 
                    ? 'bg-primary text-white shadow-xs hover:bg-primary' 
                    : 'bg-emerald-600 text-white shadow-xs hover:bg-emerald-700'
                }`}
              >
                <span>{transactionType === 'expense' ? t('finance.expenseUpper', 'EXPENSE') : t('finance.incomeUpper', 'INCOME')}</span>
              </button>
            </div>
            <button 
              onClick={handleCancelOrDiscard}
              className="h-9 px-3.5 rounded-full flex items-center justify-center gap-1.5 bg-rose-500/90 hover:bg-rose-600 text-white font-label-sm text-label-sm font-semibold shadow-sm transition-all active:scale-95 whitespace-nowrap shrink-0 cursor-pointer pointer-events-auto" 
              type="button"
            >
              <span>{t('finance.discard', 'Discard')}</span>
            </button>
          </div>

          {/* Responsive Layout: 2-Column Grid on Desktop (>= 1024px), Single Column on Mobile */}
          <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-6 items-start gap-4">
            {/* ── LEFT COLUMN (Cols 1-7 on Desktop): Amount & Category ── */}
            <div className="w-full lg:col-span-7 flex flex-col gap-4">
              {/* Amount & Currency Bento Card */}
              <div className="w-full rounded-3xl p-5 relative overflow-hidden flex flex-col items-center bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
                <div className="flex items-center justify-between w-full mb-3 relative z-10">
                  <span className="font-label-sm text-label-sm tracking-wider uppercase text-slate-400">
                    {transactionType === 'expense' ? t('finance.expenseAmount', 'Expense Amount') : t('finance.incomeAmount', 'Income Amount')}
                  </span>
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-0.5 shadow-inner">
                    <button 
                      onClick={() => setSelectedCurrency('AFN')}
                      className={`currency-btn px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-semibold transition-all cursor-pointer pointer-events-auto ${selectedCurrency === 'AFN' ? 'bg-primary text-white shadow-sm' : 'text-slate-400 hover:text-white'}`} 
                      type="button"
                    >
                      AFN (افـ)
                    </button>
                    <button 
                      onClick={() => setSelectedCurrency('USD')}
                      className={`currency-btn px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-semibold transition-all cursor-pointer pointer-events-auto ${selectedCurrency === 'USD' ? 'bg-primary text-white shadow-sm' : 'text-slate-400 hover:text-white'}`} 
                      type="button"
                    >
                      USD ($)
                    </button>
                    <button 
                      onClick={() => setSelectedCurrency('EUR')}
                      className={`currency-btn px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-semibold transition-all cursor-pointer pointer-events-auto ${selectedCurrency === 'EUR' ? 'bg-primary text-white shadow-sm' : 'text-slate-400 hover:text-white'}`} 
                      type="button"
                    >
                      EUR (€)
                    </button>
                  </div>
                </div>

                <div className="flex items-baseline justify-center gap-1 my-3 relative z-10">
                  {selectedCurrency !== 'AFN' && (
                    <span className={`text-3xl lg:text-4xl select-none font-bold font-display ${transactionType === 'expense' ? 'text-primary' : 'text-emerald-600'}`}>
                      {currencySymbol}
                    </span>
                  )}
                  <input 
                    className="text-4xl lg:text-5xl text-white bg-transparent text-center focus:outline-none max-w-[260px] font-bold tracking-tight caret-primary font-display" 
                    inputMode="decimal" 
                    type="text" 
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  {selectedCurrency === 'AFN' && (
                    <span className={`text-2xl lg:text-3xl select-none font-bold font-display ml-1 ${transactionType === 'expense' ? 'text-primary' : 'text-emerald-600'}`}>
                      افـ
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-center flex-wrap gap-2 w-full pt-2 relative z-10">
                  <button 
                    onClick={() => handleQuickAdd(selectedCurrency === 'AFN' ? 500 : 10)}
                    className="rounded-full py-1.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-xs transition-all active:scale-95 shadow-sm cursor-pointer pointer-events-auto" 
                    type="button"
                  >
                    {formatQuickChip(selectedCurrency === 'AFN' ? 500 : 10)}
                  </button>
                  <button 
                    onClick={() => handleQuickAdd(selectedCurrency === 'AFN' ? 1000 : 25)}
                    className="rounded-full py-1.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-xs transition-all active:scale-95 shadow-sm cursor-pointer pointer-events-auto" 
                    type="button"
                  >
                    {formatQuickChip(selectedCurrency === 'AFN' ? 1000 : 25)}
                  </button>
                  <button 
                    onClick={() => handleQuickAdd(selectedCurrency === 'AFN' ? 2500 : 50)}
                    className="rounded-full py-1.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-xs transition-all active:scale-95 shadow-sm cursor-pointer pointer-events-auto" 
                    type="button"
                  >
                    {formatQuickChip(selectedCurrency === 'AFN' ? 2500 : 50)}
                  </button>
                  <button 
                    onClick={handleRoundUp}
                    className="rounded-full py-1.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-primary font-medium text-xs transition-all active:scale-95 shadow-sm cursor-pointer pointer-events-auto" 
                    type="button"
                  >
                    {t('finance.roundUp', 'Round Up')}
                  </button>
                </div>
              </div>

              {/* Category Selector Bento Card */}
              <div className="w-full rounded-3xl p-5 space-y-3 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
                <div className="flex items-baseline justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-white tracking-tight">{t('finance.category', 'Category')}</h2>
                    <p className="text-xs text-slate-400">{t('finance.classifyEntry', 'Classify this entry')}</p>
                  </div>
                  <span className="text-xs text-primary font-semibold">{selectedCategory}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                  {categories.map((cat) => {
                    const isSelected = selectedCategory === cat.name;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.name)}
                        className={`flex items-center gap-2 p-3 rounded-2xl text-xs font-semibold transition-all text-left cursor-pointer pointer-events-auto ${cat.colSpan || ''} ${
                          isSelected ? 'bg-primary text-white shadow-md shadow-primary/30 border border-primary/30' : 'bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300'
                        }`}
                        type="button"
                      >
                        <span className="truncate">{cat.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 ml-auto shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN (Cols 8-12 on Desktop): Details & Save Actions ── */}
            <div className="w-full lg:col-span-5 flex flex-col gap-4">
              {/* Transaction Details Card */}
              <div className="w-full rounded-3xl p-5 space-y-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
                <h2 className="text-sm font-bold text-white tracking-tight">{t('finance.transactionDetails', 'Transaction Details')}</h2>

                <div className="flex flex-col space-y-1">
                  <label className="text-xs text-slate-400 uppercase tracking-wider">{t('finance.dateTime', 'Date & Time')}</label>
                  <div 
                    id="expense-datetime-tile"
                    onClick={handleDateTimeClick}
                    className="flex items-center justify-between p-3.5 rounded-2xl transition-colors cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 pointer-events-auto"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">{dateStr}</p>
                        <p className="text-[11px] text-slate-400">{timeStr}</p>
                      </div>
                    </div>
                    <span className="text-xs text-primary font-medium">{t('finance.change', 'Change')}</span>
                  </div>
                  <MomentumDateTimePicker
                    isOpen={isPickerOpen}
                    onClose={() => setIsPickerOpen(false)}
                    value={dateTime}
                    onSelect={(newVal) => setDateTime(newVal)}
                    title={t('finance.selectDateTime', 'Select Date & Time')}
                    isDark={true}
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-slate-400 uppercase tracking-wider">{t('finance.notesReceipt', 'Notes & Receipt')}</label>
                    <span className="text-xs text-slate-400">{note.length} / 140</span>
                  </div>
                  <div className="p-3.5 rounded-2xl flex flex-col gap-2 bg-white/5 border border-white/10">
                    <textarea 
                      className="w-full text-xs text-white placeholder:text-slate-400 bg-transparent focus:outline-none resize-none" 
                      maxLength={140} 
                      placeholder={transactionType === 'expense' ? "Add expense note..." : "Add income note..."} 
                      rows={3}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                    <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                      <input ref={fileInputRef} type="file" onChange={handleFileChange} className="sr-only" />
                      <button 
                        onClick={handleAttachClick}
                        type="button" 
                        className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-medium text-white cursor-pointer pointer-events-auto transition-colors"
                      >
                        {receiptFile ? receiptFile.name : t('finance.attachReceipt', 'Attach Receipt')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Action Buttons Card */}
              <div className="w-full rounded-3xl p-5 space-y-3 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
                <button 
                  onClick={handleSave}
                  className={`btn-primary w-full h-12 text-sm font-bold shadow-lg cursor-pointer pointer-events-auto ${
                    transactionType === 'income' ? '!bg-emerald-600 hover:!bg-emerald-700' : ''
                  }`}
                  type="button"
                >
                  <span>{transactionType === 'expense' ? t('finance.saveExpense', 'Save Expense') : t('finance.saveIncome', 'Save Income')}</span>
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    type="button"
                    onClick={handleCancelOrDiscard}
                    className="btn-secondary w-full h-10 text-xs font-semibold cursor-pointer pointer-events-auto"  
                  >
                    {t('common.cancel', 'Cancel')}
                  </button>
                  <button 
                    type="button"
                    onClick={handleCancelOrDiscard}
                    className="btn-danger w-full h-10 text-xs font-semibold cursor-pointer pointer-events-auto" 
                  >
                    {t('finance.discard', 'Discard')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
