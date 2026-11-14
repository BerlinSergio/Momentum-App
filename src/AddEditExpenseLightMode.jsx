import { useState, useRef } from 'react';
import { useFinanceStore } from './store/useFinanceStore';
import { Coins, ArrowLeft, Check, Calendar } from 'lucide-react';

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

export default function AddEditExpenseLightMode({ setActiveTab, goBack }) {
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
  const [amount, setAmount] = useState(() => (editingTransaction ? String(editingTransaction.amount) : '2500.00'));
  const [selectedCurrency, setSelectedCurrency] = useState(() => editingTransaction?.currency || 'AFN');
  const [selectedCategory, setSelectedCategory] = useState(() => editingTransaction?.category || (pendingTransactionType === 'income' ? 'Salary' : 'Food & Dining'));
  const [note, setNote] = useState(() => editingTransaction?.note || editingTransaction?.notes || editingTransaction?.title || (pendingTransactionType === 'income' ? 'Client consultation fee' : 'Weekly fresh produce & essentials'));
  
  const [dateTime, setDateTime] = useState(() => {
    if (editingTransaction?.date) {
      return editingTransaction.date.includes('T') ? editingTransaction.date : `${editingTransaction.date}T12:00`;
    }
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
  });

  const dateTimeInputRef = useRef(null);
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
    if (dateTimeInputRef.current) {
      if (typeof dateTimeInputRef.current.showPicker === 'function') {
        dateTimeInputRef.current.showPicker();
      } else {
        dateTimeInputRef.current.focus();
        dateTimeInputRef.current.click();
      }
    }
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
    const title = note.trim() || `${selectedCategory} ${transactionType === 'expense' ? 'Expense' : 'Income'}`;
    const selectedDate = dateTime.split('T')[0] || new Date().toISOString().split('T')[0];

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
    }

    handleNavigate('finance_expense_tracker_light_mode');
  };

  return (
    <div className="relative w-full min-h-screen bg-transparent font-sans">
      <header className="sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex items-center justify-between px-5 pt-6 pb-2 pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30">
            <Coins className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-slate-900 tracking-tight" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>
            {transactionType === 'expense' ? 'Log Expense' : 'Log Income'}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            type="button" 
            onClick={() => handleNavigate('finance_expense_tracker_light_mode')} 
            className="p-2 rounded-full text-slate-600 hover:bg-white/10 transition-colors pointer-events-auto cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 w-full bg-transparent pb-safe px-5 pt-2">
        <div className="flex flex-col w-full pb-28 space-y-4">
          <div className="flex flex-row items-center justify-between w-full px-1">
            <div className="h-9 pl-3.5 pr-1.5 rounded-full flex items-center justify-center gap-2 bg-slate-100 border border-slate-200/80 shadow-sm whitespace-nowrap shrink-0">
              <span className={`w-2 h-2 rounded-full animate-pulse ${transactionType === 'expense' ? 'bg-primary' : 'bg-emerald-600'}`}></span>
              <span className="font-label-sm text-label-sm text-slate-900 font-medium tracking-wide">NEW RECORD</span>
              <button
                type="button"
                onClick={handleTypeToggle}
                className={`h-6 px-2.5 rounded-full font-label-sm text-label-sm font-bold flex items-center gap-1 transition-all cursor-pointer pointer-events-auto active:scale-95 ${
                  transactionType === 'expense' 
                    ? 'bg-primary text-white shadow-xs hover:bg-primary' 
                    : 'bg-emerald-600 text-white shadow-xs hover:bg-emerald-700'
                }`}
              >
                <span>{transactionType === 'expense' ? 'EXPENSE' : 'INCOME'}</span>
              </button>
            </div>
            <button 
              onClick={() => handleNavigate('finance_expense_tracker_light_mode')}
              className="h-9 px-3.5 rounded-full flex items-center justify-center gap-1.5 bg-rose-500/90 hover:bg-rose-600 text-white font-label-sm text-label-sm font-semibold shadow-sm transition-all active:scale-95 whitespace-nowrap shrink-0 cursor-pointer pointer-events-auto" 
              type="button"
            >
              <span>Discard</span>
            </button>
          </div>

          <div className="w-full rounded-2xl p-5 relative overflow-hidden flex flex-col items-center bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
            <div className="flex items-center justify-between w-full mb-3 relative z-10">
              <span className="font-label-sm text-label-sm tracking-wider uppercase text-slate-500">
                {transactionType === 'expense' ? 'Expense Amount' : 'Income Amount'}
              </span>
              <div className="flex items-center bg-slate-100 border border-slate-200/80 rounded-full p-0.5 shadow-inner">
                <button 
                  onClick={() => setSelectedCurrency('AFN')}
                  className={`currency-btn px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-semibold transition-all cursor-pointer pointer-events-auto ${selectedCurrency === 'AFN' ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`} 
                  type="button"
                >
                  AFN (افـ)
                </button>
                <button 
                  onClick={() => setSelectedCurrency('USD')}
                  className={`currency-btn px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-semibold transition-all cursor-pointer pointer-events-auto ${selectedCurrency === 'USD' ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`} 
                  type="button"
                >
                  USD ($)
                </button>
                <button 
                  onClick={() => setSelectedCurrency('EUR')}
                  className={`currency-btn px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-semibold transition-all cursor-pointer pointer-events-auto ${selectedCurrency === 'EUR' ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`} 
                  type="button"
                >
                  EUR (€)
                </button>
              </div>
            </div>

            <div className="flex items-baseline justify-center gap-1 my-2 relative z-10">
              {selectedCurrency !== 'AFN' && (
                <span className={`text-3xl select-none font-bold font-display ${transactionType === 'expense' ? 'text-primary' : 'text-emerald-600'}`}>
                  {currencySymbol}
                </span>
              )}
              <input 
                className="text-4xl text-slate-900 bg-transparent text-center focus:outline-none max-w-[220px] font-bold tracking-tight caret-primary font-display" 
                inputMode="decimal" 
                type="text" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              {selectedCurrency === 'AFN' && (
                <span className={`text-2xl select-none font-bold font-display ml-1 ${transactionType === 'expense' ? 'text-primary' : 'text-emerald-600'}`}>
                  افـ
                </span>
              )}
            </div>

            <div className="flex items-center justify-center flex-wrap gap-2 w-full pt-1 relative z-10">
              <button 
                onClick={() => handleQuickAdd(selectedCurrency === 'AFN' ? 500 : 10)}
                className="rounded-full py-1.5 px-4 bg-slate-100 border border-slate-200/80 text-slate-900 font-medium text-xs transition-all active:scale-95 shadow-sm cursor-pointer pointer-events-auto" 
                type="button"
              >
                {formatQuickChip(selectedCurrency === 'AFN' ? 500 : 10)}
              </button>
              <button 
                onClick={() => handleQuickAdd(selectedCurrency === 'AFN' ? 1000 : 25)}
                className="rounded-full py-1.5 px-4 bg-slate-100 border border-slate-200/80 text-slate-900 font-medium text-xs transition-all active:scale-95 shadow-sm cursor-pointer pointer-events-auto" 
                type="button"
              >
                {formatQuickChip(selectedCurrency === 'AFN' ? 1000 : 25)}
              </button>
              <button 
                onClick={() => handleQuickAdd(selectedCurrency === 'AFN' ? 2500 : 50)}
                className="rounded-full py-1.5 px-4 bg-slate-100 border border-slate-200/80 text-slate-900 font-medium text-xs transition-all active:scale-95 shadow-sm cursor-pointer pointer-events-auto" 
                type="button"
              >
                {formatQuickChip(selectedCurrency === 'AFN' ? 2500 : 50)}
              </button>
              <button 
                onClick={handleRoundUp}
                className="rounded-full py-1.5 px-4 bg-slate-100 border border-slate-200/80 text-primary font-medium text-xs transition-all active:scale-95 shadow-sm cursor-pointer pointer-events-auto" 
                type="button"
              >
                Round Up
              </button>
            </div>
          </div>

          <div className="w-full rounded-2xl p-5 space-y-3 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
            <div className="flex items-baseline justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900 tracking-tight">Category</h2>
                <p className="text-xs text-slate-500">Classify this entry</p>
              </div>
              <span className="text-xs text-primary font-semibold">{selectedCategory}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-1">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.name;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`flex items-center gap-2 p-2.5 rounded-2xl text-xs font-semibold transition-all text-left cursor-pointer pointer-events-auto ${cat.colSpan || ''} ${
                      isSelected ? 'bg-primary text-white shadow-md shadow-primary/30 border border-primary/30' : 'bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-700'
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

          <div className="w-full rounded-2xl p-5 space-y-4 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">Transaction Details</h2>
            <div className="flex flex-col space-y-1">
              <label className="text-xs text-slate-500 uppercase tracking-wider">Date &amp; Time</label>
              <div 
                onClick={handleDateTimeClick}
                className="flex items-center justify-between p-3 rounded-2xl transition-colors cursor-pointer bg-slate-100 border border-slate-200/80 pointer-events-auto"
              >
                <input 
                  ref={dateTimeInputRef}
                  type="datetime-local" 
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  className="sr-only"
                />
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900">{dateStr}</p>
                    <p className="text-[11px] text-slate-500">{timeStr}</p>
                  </div>
                </div>
                <span className="text-xs text-primary font-medium">Change</span>
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs text-slate-500 uppercase tracking-wider">Notes &amp; Receipt</label>
                <span className="text-xs text-slate-500">{note.length} / 140</span>
              </div>
              <div className="p-3 rounded-2xl flex flex-col gap-2 bg-slate-100 border border-slate-200/80">
                <textarea 
                  className="w-full text-xs text-slate-900 placeholder:text-slate-500 bg-transparent focus:outline-none resize-none" 
                  maxLength={140} 
                  placeholder={transactionType === 'expense' ? "Add expense note..." : "Add income note..."} 
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <div className="flex items-center gap-2 pt-1 border-t border-white/10">
                  <input ref={fileInputRef} type="file" onChange={handleFileChange} className="sr-only" />
                  <button 
                    onClick={handleAttachClick}
                    type="button" 
                    className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200/80 text-[11px] font-medium text-slate-900 cursor-pointer pointer-events-auto"
                  >
                    {receiptFile ? receiptFile.name : 'Attach Receipt'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <button 
              onClick={handleSave}
              className={`btn-primary w-full cursor-pointer pointer-events-auto ${
                transactionType === 'income' ? '!bg-emerald-600 hover:!bg-emerald-700' : ''
              }`}
              type="button"
            >
              <span>{transactionType === 'expense' ? 'Save Expense' : 'Save Income'}</span>
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button 
                type="button"
                onClick={() => handleNavigate('finance_expense_tracker_light_mode')}
                className="btn-secondary w-full cursor-pointer pointer-events-auto"  
              >
                Cancel
              </button>
              <button 
                type="button"
                onClick={() => handleNavigate('finance_expense_tracker_light_mode')}
                className="btn-danger w-full cursor-pointer pointer-events-auto" 
              >
                Discard
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
