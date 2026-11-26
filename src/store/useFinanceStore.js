import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { getLocalDateKey } from '../utils/timeService.js';
import { createIndexedDbStorage } from '../storage/index.js';

export const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  AFN: 'افـ',
};

export const getCurrencySymbol = (currency = 'USD') => {
  return CURRENCY_SYMBOLS[currency] || currency;
};

export const formatSingleCurrency = (amount, currency = 'USD', options = {}) => {
  const num = Number(amount) || 0;
  const decimals = options.decimals !== undefined ? options.decimals : 2;
  const formattedNum = Math.abs(num).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  const sign = options.showSign
    ? (num > 0 ? '+' : num < 0 ? '-' : '')
    : (num < 0 ? '-' : '');

  if (currency === 'AFN') {
    return `${sign}${formattedNum} افـ`;
  }
  if (currency === 'EUR') {
    return `${sign}€${formattedNum}`;
  }
  return `${sign}$${formattedNum}`;
};

export const formatMultiCurrency = (grouped = {}, options = {}) => {
  const decimals = options.decimals !== undefined ? options.decimals : 2;
  const showSign = !!options.showSign;
  const delimiter = options.delimiter !== undefined ? options.delimiter : '   |   ';

  if (!grouped || typeof grouped !== 'object') {
    return formatSingleCurrency(0, 'USD', { decimals, showSign });
  }

  const entries = Object.entries(grouped).filter(
    ([, val]) => val !== undefined && val !== null && (options.includeZero || Number(val) !== 0)
  );

  if (entries.length === 0) {
    const firstKey = Object.keys(grouped)[0] || 'AFN';
    return formatSingleCurrency(0, firstKey, { decimals, showSign });
  }

  const order = ['AFN', 'USD', 'EUR'];
  entries.sort((a, b) => {
    const idxA = order.indexOf(a[0]);
    const idxB = order.indexOf(b[0]);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a[0].localeCompare(b[0]);
  });

  if (options.stacked) {
    const [first, ...rest] = entries;
    const firstStr = formatSingleCurrency(first[1], first[0], { decimals, showSign });
    const restStr = rest.map(([cur, amt]) => `(${formatSingleCurrency(amt, cur, { decimals, showSign })})`).join(' ');
    return restStr ? `${firstStr} ${restStr}` : firstStr;
  }

  return entries
    .map(([cur, amt]) => formatSingleCurrency(amt, cur, { decimals, showSign }))
    .join(delimiter);
};

export const calculateGroupedTotals = (items = [], filterFn = null) => {
  const filtered = filterFn ? items.filter(filterFn) : items;
  const result = {};
  filtered.forEach((item) => {
    const cur = item.currency || 'USD';
    result[cur] = (result[cur] || 0) + (Number(item.amount) || 0);
  });
  return result;
};

/**
 * Authoritative pure selector for computing monthly finance summaries.
 * Deduplicates transactions and incomes, filters by periodKey (YYYY-MM),
 * and computes grouped income, expenses, and net saved.
 */
export const getMonthlyFinanceSummary = (transactions = [], incomes = [], periodKey = '') => {
  const list = [...(transactions || [])];
  (incomes || []).forEach((inc) => {
    if (!list.some((tx) => String(tx.id) === String(inc.id))) {
      list.push({ ...inc, type: 'income' });
    }
  });

  const monthItems = list.filter((tx) => {
    if (!periodKey || periodKey === 'all') return true;
    if (!tx.date) return true;
    return String(tx.date).startsWith(periodKey);
  });

  const incomeGrouped = calculateGroupedTotals(monthItems.filter((tx) => tx.type === 'income'));
  const expensesGrouped = calculateGroupedTotals(monthItems.filter((tx) => tx.type === 'expense'));

  const currencySet = new Set([...Object.keys(incomeGrouped), ...Object.keys(expensesGrouped)]);
  const currencies = Array.from(currencySet);

  const netSavedGrouped = {};
  (currencies.length > 0 ? currencies : ['AFN']).forEach((cur) => {
    const inc = incomeGrouped[cur] || 0;
    const exp = expensesGrouped[cur] || 0;
    netSavedGrouped[cur] = inc - exp;
  });

  return {
    monthItems,
    incomeGrouped,
    expensesGrouped,
    netSavedGrouped,
    currencies: currencies.length > 0 ? currencies : ['AFN'],
  };
};

/**
 * Authoritative pure selector for computing Savings Target progress.
 * Validates target amount, safe division, non-negative rate display,
 * visual fill cap [0, 100], and handles missing/zero targets gracefully.
 */
export const getSavingsTargetStats = (savingsTarget, netSavedGrouped = {}, preferredCurrency = 'AFN') => {
  let currencyCode = 'AFN';
  const raw = String(preferredCurrency || 'AFN');
  if (raw.includes('USD') || raw.includes('$')) currencyCode = 'USD';
  else if (raw.includes('EUR') || raw.includes('€')) currencyCode = 'EUR';
  else if (raw.includes('GBP') || raw.includes('£')) currencyCode = 'GBP';
  else if (raw.includes('PKR') || raw.includes('₨')) currencyCode = 'PKR';
  else if (raw.includes('IRR') || raw.includes('﷼')) currencyCode = 'IRR';
  else if (raw.includes('AFN') || raw.includes('؋')) currencyCode = 'AFN';

  // Discover candidate target currencies with positive targets
  let targetCurrencies = [];
  if (savingsTarget && typeof savingsTarget === 'object') {
    targetCurrencies = Object.keys(savingsTarget).filter((k) => {
      const v = savingsTarget[k];
      if (typeof v === 'number') return v > 0;
      if (typeof v === 'object' && v !== null) {
        return (Number(v.target) || 0) > 0 || (Number(v.amount) || 0) > 0;
      }
      return false;
    });
  }

  const presentCurrencies = Object.keys(netSavedGrouped || {}).filter((c) => netSavedGrouped[c] !== 0);

  let activeCurrency = currencyCode;
  if (targetCurrencies.includes(currencyCode)) {
    activeCurrency = currencyCode;
  } else if (targetCurrencies.length > 0) {
    activeCurrency = targetCurrencies[0];
  } else if (presentCurrencies.includes(currencyCode)) {
    activeCurrency = currencyCode;
  } else if (presentCurrencies.length > 0) {
    activeCurrency = presentCurrencies[0];
  }

  let storeTarget = null;
  let explicitContributed = null;

  if (typeof savingsTarget === 'number' && savingsTarget > 0) {
    storeTarget = savingsTarget;
  } else if (savingsTarget && typeof savingsTarget === 'object') {
    const entry = savingsTarget[activeCurrency] ?? savingsTarget[currencyCode] ?? null;
    if (typeof entry === 'number') {
      storeTarget = entry;
    } else if (typeof entry === 'object' && entry !== null) {
      storeTarget = entry.target !== undefined ? entry.target : (entry.amount !== undefined ? entry.amount : null);
      if (entry.current !== undefined) explicitContributed = Number(entry.current) || 0;
      else if (entry.contributed !== undefined) explicitContributed = Number(entry.contributed) || 0;
    }
  }

  const hasTarget = storeTarget !== null && Number(storeTarget) > 0;
  const targetAmount = hasTarget ? Number(storeTarget) : 0;

  // Actual saved: if explicit contribution is set on the goal, use that!
  // Otherwise fall back to netSavedGrouped (monthly net cash flow)
  let actualSaved = 0;
  if (explicitContributed !== null) {
    actualSaved = explicitContributed;
  } else if (netSavedGrouped && netSavedGrouped[activeCurrency] !== undefined) {
    actualSaved = Number(netSavedGrouped[activeCurrency]) || 0;
  } else if (typeof netSavedGrouped === 'number') {
    actualSaved = netSavedGrouped;
  }

  let rawRate = 0;
  if (hasTarget && targetAmount > 0) {
    rawRate = (actualSaved / targetAmount) * 100;
  }

  const numericRate = !isFinite(rawRate) || isNaN(rawRate) ? 0 : Math.max(0, rawRate);
  const roundedRate = Math.round(numericRate * 10) / 10;
  const displayRate = roundedRate === 0
    ? '0%'
    : (roundedRate % 1 === 0 ? `${roundedRate.toFixed(0)}%` : `${roundedRate.toFixed(1)}%`);

  // Cap visual fill width strictly to [0, 100] without falsifying numerical percentage
  const barWidth = Math.min(100, Math.max(0, roundedRate));
  const formattedTarget = formatSingleCurrency(targetAmount, activeCurrency, { decimals: 0 });
  const formattedSaved = formatSingleCurrency(actualSaved, activeCurrency, { decimals: 0 });

  return {
    hasTarget,
    currencyCode: activeCurrency,
    currencySymbol: getCurrencySymbol(activeCurrency),
    targetAmount,
    actualSaved,
    explicitContributed,
    numericRate,
    displayRate,
    barWidth,
    formattedTarget,
    formattedSaved,
  };
};

const getDynamicDateInOffsetMonth = (offsetMonths = 0, day = 1) => {
  const now = new Date();
  now.setDate(1);
  now.setMonth(now.getMonth() + offsetMonths);
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${month}-${d}`;
};

export const DEMO_FINANCE_INCOMES = [
  {
    id: 'inc-sched',
    title: 'TechCorp Salary',
    amount: 5000,
    category: 'Salary',
    currency: 'USD',
    date: getDynamicDateInOffsetMonth(0, 31),
    recurrence: 'Monthly recurring (Day 31)',
    status: 'Scheduled',
    type: 'income',
    incomeType: 'active',
    payerName: 'TechCorp Solutions',
    notes: 'End of month salary deposit',
  },
  {
    id: 'inc-afn-sched',
    title: 'Kabul Tech Advisory',
    amount: 45000,
    category: 'Salary',
    currency: 'AFN',
    date: getDynamicDateInOffsetMonth(0, 30),
    recurrence: 'Monthly recurring (Day 30)',
    status: 'Scheduled',
    type: 'income',
    incomeType: 'active',
    payerName: 'Ariana Telecom',
    notes: 'Monthly advisory retainer',
  },
  {
    id: 'inc-1',
    title: 'TechCorp Solutions',
    amount: 5000,
    category: 'Salary',
    currency: 'USD',
    date: getDynamicDateInOffsetMonth(0, 1),
    recurrence: 'Monthly recurring (Day 1)',
    status: 'Cleared',
    type: 'income',
    incomeType: 'active',
    payerName: 'TechCorp Solutions',
    notes: 'Monthly engineering salary',
  },
  {
    id: 'inc-2',
    title: 'Kabul App Consulting',
    amount: 35000,
    category: 'Freelance',
    currency: 'AFN',
    date: getDynamicDateInOffsetMonth(0, 8),
    recurrence: 'Client: Pamir Mobile',
    status: 'Cleared',
    type: 'income',
    incomeType: 'active',
    payerName: 'Pamir Mobile',
    notes: 'Fintech UI consulting milestone',
  },
  {
    id: 'inc-3',
    title: 'Mobile App UI Design',
    amount: 650,
    category: 'Freelance',
    currency: 'USD',
    date: getDynamicDateInOffsetMonth(0, 14),
    recurrence: 'Client: Aura Labs',
    status: 'Invoice #1042',
    type: 'income',
    incomeType: 'active',
    payerName: 'Aura Labs',
    notes: 'Mobile app UI redesign milestone 1',
  },
  {
    id: 'inc-4',
    title: 'E-commerce Royalty',
    amount: 350,
    category: 'Business',
    currency: 'USD',
    date: getDynamicDateInOffsetMonth(0, 18),
    recurrence: 'Digital Design Assets',
    status: 'Stripe Payout',
    type: 'income',
    incomeType: 'passive',
    payerName: 'Gumroad / Stripe',
    notes: 'Digital UI kit sales',
  },
  {
    id: 'inc-5',
    title: 'Local Store Dividend',
    amount: 15000,
    category: 'Business',
    currency: 'AFN',
    date: getDynamicDateInOffsetMonth(0, 22),
    recurrence: 'Quarterly payout',
    status: 'Cleared',
    type: 'income',
    incomeType: 'passive',
    payerName: 'Kabul Mart',
    notes: 'Quarterly commercial partnership profit share',
  },
  {
    id: 'inc-prev-1',
    title: 'TechCorp Solutions',
    amount: 5000,
    category: 'Salary',
    currency: 'USD',
    date: getDynamicDateInOffsetMonth(-1, 1),
    recurrence: 'Monthly recurring (Day 1)',
    status: 'Cleared',
    type: 'income',
    incomeType: 'active',
    payerName: 'TechCorp Solutions',
    notes: 'Previous month engineering salary',
  },
  {
    id: 'inc-prev-2',
    title: 'Kabul App Consulting',
    amount: 35000,
    category: 'Freelance',
    currency: 'AFN',
    date: getDynamicDateInOffsetMonth(-1, 10),
    recurrence: 'Client: Pamir Mobile',
    status: 'Cleared',
    type: 'income',
    incomeType: 'active',
    payerName: 'Pamir Mobile',
    notes: 'Previous month contract payment',
  },
];

export const DEMO_FINANCE_EXPENSES = [
  {
    id: 'exp-1',
    title: 'Downtown Apartment Rent',
    amount: 1200,
    type: 'expense',
    category: 'Housing',
    currency: 'USD',
    date: getDynamicDateInOffsetMonth(0, 2),
    note: 'Monthly residence lease payment',
  },
  {
    id: 'exp-2',
    title: 'Kabul Central Office',
    amount: 12000,
    type: 'expense',
    category: 'Housing',
    currency: 'AFN',
    date: getDynamicDateInOffsetMonth(0, 3),
    note: 'Office rent & workspace fee',
  },
  {
    id: 'exp-3',
    title: 'Whole Foods Market',
    amount: 142.50,
    type: 'expense',
    category: 'Food & Dining',
    currency: 'USD',
    date: getDynamicDateInOffsetMonth(0, 5),
    note: 'Organic groceries & weekly essentials',
  },
  {
    id: 'exp-4',
    title: 'Kabul Fresh Produce',
    amount: 3200,
    type: 'expense',
    category: 'Food & Dining',
    currency: 'AFN',
    date: getDynamicDateInOffsetMonth(0, 9),
    note: 'Fresh market fruits and pantry restock',
  },
  {
    id: 'exp-5',
    title: 'High Speed Fiber Internet',
    amount: 2500,
    type: 'expense',
    category: 'Utilities',
    currency: 'AFN',
    date: getDynamicDateInOffsetMonth(0, 11),
    note: 'Monthly optical fiber subscription',
  },
  {
    id: 'exp-6',
    title: 'Blue Bottle Coffee',
    amount: 18.50,
    type: 'expense',
    category: 'Food & Dining',
    currency: 'USD',
    date: getDynamicDateInOffsetMonth(0, 16),
    note: 'Team coffee & brainstorm pastry',
  },
];

export const DEMO_FINANCE_ACCOUNTS = [
  { id: 'acc-usd', name: 'USD Checking Account', balance: 2500, currency: 'USD', type: 'bank' },
  { id: 'acc-afn', name: 'AFN Business Account', balance: 20000, currency: 'AFN', type: 'cash' },
];

export const initialIncomes = DEMO_FINANCE_INCOMES;
export const initialExpenses = DEMO_FINANCE_EXPENSES;
export const initialAccounts = DEMO_FINANCE_ACCOUNTS;

export const initialMonthlyBudgetCap = {
  AFN: 0,
  USD: 0,
};

export const initialSavingsTarget = {
  AFN: 0,
  USD: 0,
};

const financeStorage = createIndexedDbStorage({
  legacyLocalStorageKey: 'momentum-finance-storage',
  optimisticDomains: ['momentum-finance-storage'],
});

// IndexedDB is the only authoritative Finance source after verified legacy
// migration. No eager localStorage mirror reads or duplicate side-effect writes.
const getInitialFinanceState = () => ({
  accounts: [],
  transactions: [],
  incomes: [],
  editingIncome: null,
  editingTransaction: null,
  budgets: [],
  monthlyBudgetCap: { AFN: 0, USD: 0 },
  savingsTarget: null,
  pendingTransactionType: 'expense',
  _hasHydrated: false,
});

export const useFinanceStore = create(
  persist(
    (set, get) => ({
      // State initialized with synchronous persisted check
      ...getInitialFinanceState(),

      setHasHydrated: (val) => set({ _hasHydrated: !!val }),

      // Calculation Selectors
      getTotalIncome: (customTransactions) => {
        const list = customTransactions || get().transactions || [];
        const grouped = {};
        list.filter((tx) => tx.type === 'income').forEach((tx) => {
          const cur = tx.currency || 'USD';
          grouped[cur] = (grouped[cur] || 0) + (Number(tx.amount) || 0);
        });
        return grouped;
      },

      getTotalExpenses: (customTransactions) => {
        const list = customTransactions || get().transactions || [];
        const grouped = {};
        list.filter((tx) => tx.type === 'expense').forEach((tx) => {
          const cur = tx.currency || 'USD';
          grouped[cur] = (grouped[cur] || 0) + (Number(tx.amount) || 0);
        });
        return grouped;
      },

      getBalance: (customTransactions) => {
        const list = customTransactions || get().transactions || [];
        const accounts = get().accounts || [];
        const grouped = {};
        accounts.forEach((acc) => {
          const cur = acc.currency || 'USD';
          grouped[cur] = (grouped[cur] || 0) + (Number(acc.balance) || 0);
        });
        list.filter((tx) => tx.type === 'income').forEach((tx) => {
          const cur = tx.currency || 'USD';
          grouped[cur] = (grouped[cur] || 0) + (Number(tx.amount) || 0);
        });
        list.filter((tx) => tx.type === 'expense').forEach((tx) => {
          const cur = tx.currency || 'USD';
          grouped[cur] = (grouped[cur] || 0) - (Number(tx.amount) || 0);
        });
        return grouped;
      },

      // Generic updateFinances mutator for state-wide updates
      updateFinances: (financesOrFn) => {
        set((state) => {
          const updates = typeof financesOrFn === 'function' ? financesOrFn(state) : financesOrFn;
          const next = { ...state, ...updates };
          return next;
        });
      },

      setPendingTransactionType: (type) => set({ pendingTransactionType: type }),
      setEditingIncome: (income) => set({ editingIncome: income }),
      setEditingTransaction: (transaction) => set({ editingTransaction: transaction }),
      setMonthlyBudgetCap: (cap) =>
        set((state) => {
          const nextCap = { ...(state.monthlyBudgetCap || initialMonthlyBudgetCap), ...cap };
          return { monthlyBudgetCap: nextCap };
        }),
      updateBudgetCap: (newCaps) =>
        set((state) => {
          const nextCap = { ...(state.monthlyBudgetCap || initialMonthlyBudgetCap), ...newCaps };
          return { monthlyBudgetCap: nextCap };
        }),
      setSavingsTarget: (target) =>
        set((state) => {
          let nextTarget = null;
          if (target === null) {
            nextTarget = null;
          } else if (typeof target === 'number') {
            nextTarget = target;
          } else if (typeof target === 'object') {
            const currentObj = (state.savingsTarget && typeof state.savingsTarget === 'object')
              ? state.savingsTarget
              : {};
            nextTarget = { ...currentObj };
            Object.entries(target).forEach(([cur, val]) => {
              if (val === null || val === undefined) {
                delete nextTarget[cur];
              } else if (typeof val === 'number') {
                const prev = nextTarget[cur];
                if (typeof prev === 'object' && prev !== null) {
                  nextTarget[cur] = { ...prev, target: val };
                } else {
                  nextTarget[cur] = val;
                }
              } else if (typeof val === 'object') {
                const prev = (typeof nextTarget[cur] === 'object' && nextTarget[cur] !== null)
                  ? nextTarget[cur]
                  : { target: typeof nextTarget[cur] === 'number' ? nextTarget[cur] : 0, current: 0 };
                nextTarget[cur] = { ...prev, ...val };
              }
            });
          }
          return { savingsTarget: nextTarget };
        }),

      updateSavingsTarget: (newTargets) =>
        set((state) => {
          let nextTarget = null;
          if (newTargets === null) {
            nextTarget = null;
          } else if (typeof newTargets === 'number') {
            nextTarget = newTargets;
          } else if (typeof newTargets === 'object') {
            const currentObj = (state.savingsTarget && typeof state.savingsTarget === 'object')
              ? state.savingsTarget
              : {};
            nextTarget = { ...currentObj };
            Object.entries(newTargets).forEach(([cur, val]) => {
              if (val === null || val === undefined) {
                delete nextTarget[cur];
              } else if (typeof val === 'number') {
                const prev = nextTarget[cur];
                if (typeof prev === 'object' && prev !== null) {
                  nextTarget[cur] = { ...prev, target: val };
                } else {
                  nextTarget[cur] = val;
                }
              } else if (typeof val === 'object') {
                const prev = (typeof nextTarget[cur] === 'object' && nextTarget[cur] !== null)
                  ? nextTarget[cur]
                  : { target: typeof nextTarget[cur] === 'number' ? nextTarget[cur] : 0, current: 0 };
                nextTarget[cur] = { ...prev, ...val };
              }
            });
          }
          return { savingsTarget: nextTarget };
        }),

      contributeToSavingsTarget: (currency = 'AFN', amount = 0) =>
        set((state) => {
          const currentObj = (state.savingsTarget && typeof state.savingsTarget === 'object')
            ? { ...state.savingsTarget }
            : {};
          const curEntry = currentObj[currency];
          let curTarget = 0;
          let curSaved = 0;
          if (typeof curEntry === 'number') {
            curTarget = curEntry;
          } else if (typeof curEntry === 'object' && curEntry !== null) {
            curTarget = Number(curEntry.target ?? curEntry.amount ?? 0);
            curSaved = Number(curEntry.current ?? curEntry.contributed ?? 0);
          }
          const nextSaved = Math.max(0, curSaved + Number(amount));
          currentObj[currency] = {
            target: curTarget,
            current: nextSaved,
          };
          return { savingsTarget: currentObj };
        }),

      setSavingsContribution: (currency = 'AFN', amount = 0) =>
        set((state) => {
          const currentObj = (state.savingsTarget && typeof state.savingsTarget === 'object')
            ? { ...state.savingsTarget }
            : {};
          const curEntry = currentObj[currency];
          let curTarget = 0;
          if (typeof curEntry === 'number') {
            curTarget = curEntry;
          } else if (typeof curEntry === 'object' && curEntry !== null) {
            curTarget = Number(curEntry.target ?? curEntry.amount ?? 0);
          }
          const nextSaved = Math.max(0, Number(amount));
          currentObj[currency] = {
            target: curTarget,
            current: nextSaved,
          };
          return { savingsTarget: currentObj };
        }),

      // Direct setters to allow full control and clearing with guaranteed immediate disk write
      setTransactions: (transactions) => {
        const list = Array.isArray(transactions) ? transactions : [];
        set({ transactions: list });
      },

      setIncomes: (incomes) => {
        const list = Array.isArray(incomes) ? incomes : [];
        set({ incomes: list });
      },

      setAccounts: (accounts) => {
        const list = Array.isArray(accounts) ? accounts : [];
        set({ accounts: list });
      },

      clearAllTransactions: () => {
        set({ transactions: [], incomes: [] });
      },

      resetToZero: () => {
        set({ transactions: [], incomes: [], accounts: [] });
      },

      addIncome: (income) =>
        set((state) => {
          const newInc = {
            id: income.id || uuidv4(),
            title: income.title || income.payerName || `${income.category || 'Income'} Entry`,
            amount: Number(income.amount) || 0,
            type: 'income',
            category: income.category || 'General',
            currency: income.currency || 'AFN',
            date: income.date || getLocalDateKey(),
            recurrence: income.recurrence || 'One-time deposit',
            status: income.status || 'Cleared',
            incomeType: ['Salary', 'Freelance'].includes(income.category) ? 'active' : 'passive',
            payerName: income.payerName || '',
            notes: income.notes || income.note || '',
          };
          const nextInc = [newInc, ...state.incomes];
          const nextTx = [newInc, ...state.transactions];
          const nextState = { ...state, incomes: nextInc, transactions: nextTx, editingIncome: null };
          return nextState;
        }),

      updateIncome: (incomeOrId, updates = {}) =>
        set((state) => {
          const id = typeof incomeOrId === 'object' && incomeOrId !== null ? incomeOrId.id : incomeOrId;
          const changes = typeof incomeOrId === 'object' && incomeOrId !== null ? incomeOrId : updates;
          const nextInc = state.incomes.map((i) => (String(i.id) === String(id) ? { ...i, ...changes } : i));
          const nextTx = state.transactions.map((t) => (String(t.id) === String(id) ? { ...t, ...changes } : t));
          const nextState = { ...state, incomes: nextInc, transactions: nextTx, editingIncome: null };
          return nextState;
        }),

      deleteIncome: (incomeId) =>
        set((state) => {
          const nextInc = state.incomes.filter((i) => String(i.id) !== String(incomeId));
          const nextTx = state.transactions.filter((t) => String(t.id) !== String(incomeId));
          const nextEditing = state.editingIncome && String(state.editingIncome.id) === String(incomeId) ? null : state.editingIncome;
          const nextState = { ...state, incomes: nextInc, transactions: nextTx, editingIncome: nextEditing };
          return nextState;
        }),

      addTransaction: (transaction) =>
        set((state) => {
          const newTx = {
            id: transaction.id || uuidv4(),
            title: transaction.title || transaction.payerName || `${transaction.category || 'General'} Entry`,
            amount: Number(transaction.amount) || 0,
            type: transaction.type || 'expense',
            category: transaction.category || 'General',
            currency: transaction.currency || 'AFN',
            date: transaction.date || getLocalDateKey(),
            note: transaction.note || transaction.notes || '',
            notes: transaction.notes || transaction.note || '',
            payerName: transaction.payerName || '',
          };
          const nextTx = [newTx, ...state.transactions];
          let nextInc = state.incomes;
          if (newTx.type === 'income') {
            const incEntry = {
              ...newTx,
              recurrence: transaction.recurrence || 'One-time deposit',
              status: transaction.status || 'Cleared',
              incomeType: ['Salary', 'Freelance'].includes(newTx.category) ? 'active' : 'passive',
            };
            const exists = state.incomes.some((i) => String(i.id) === String(newTx.id));
            if (!exists) {
              nextInc = [incEntry, ...state.incomes];
            }
          }
          const nextState = { ...state, transactions: nextTx, incomes: nextInc };
          return nextState;
        }),

      updateTransaction: (transactionOrId, updates = {}) =>
        set((state) => {
          const id = typeof transactionOrId === 'object' && transactionOrId !== null ? transactionOrId.id : transactionOrId;
          const changes = typeof transactionOrId === 'object' && transactionOrId !== null ? transactionOrId : updates;
          const nextTx = state.transactions.map((t) => {
            if (String(t.id) === String(id)) {
              return {
                ...t,
                ...changes,
                amount: changes.amount !== undefined ? Number(changes.amount) : t.amount,
                note: changes.note !== undefined ? changes.note : (changes.notes !== undefined ? changes.notes : t.note),
                notes: changes.notes !== undefined ? changes.notes : (changes.note !== undefined ? changes.note : t.notes),
                title: changes.title !== undefined ? changes.title : (changes.note || t.title),
              };
            }
            return t;
          });
          const nextInc = state.incomes.map((i) => {
            if (String(i.id) === String(id)) {
              return {
                ...i,
                ...changes,
                amount: changes.amount !== undefined ? Number(changes.amount) : i.amount,
                payerName: changes.payerName || changes.title || i.payerName,
                notes: changes.notes || changes.note || i.notes,
              };
            }
            return i;
          });
          const nextState = { ...state, transactions: nextTx, incomes: nextInc, editingTransaction: null };
          return nextState;
        }),

      deleteTransaction: (transactionId) =>
        set((state) => {
          const nextTx = state.transactions.filter((tx) => String(tx.id) !== String(transactionId));
          const nextInc = state.incomes.filter((i) => String(i.id) !== String(transactionId));
          const nextEditing = state.editingTransaction && String(state.editingTransaction.id) === String(transactionId) ? null : state.editingTransaction;
          const nextState = { ...state, transactions: nextTx, incomes: nextInc, editingTransaction: nextEditing };
          return nextState;
        }),

      addAccount: (account) =>
        set((state) => {
          const newAccount = {
            id: account.id || uuidv4(),
            name: account.name || 'New Account',
            balance: Number(account.balance) || 0,
            currency: account.currency || 'AFN',
            type: account.type || 'cash',
          };
          const nextAccounts = [...state.accounts, newAccount];
          return { accounts: nextAccounts };
        }),
    }),
    {
      name: 'momentum-finance-storage',
      storage: createJSONStorage(() => financeStorage),
      skipHydration: true,
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...(persistedState || {}),
        transactions: Array.isArray(persistedState?.transactions)
          ? persistedState.transactions
          : currentState.transactions,
        incomes: Array.isArray(persistedState?.incomes)
          ? persistedState.incomes
          : currentState.incomes,
        accounts: Array.isArray(persistedState?.accounts)
          ? persistedState.accounts
          : currentState.accounts,
        editingTransaction: null,
        editingIncome: null,
        _hasHydrated: false,
      }),
      // StartupController owns readiness after all IndexedDB reads complete;
      // do not enqueue an extra Finance whole-state write here.
    }
  )
);

// Legacy mirrors remain available only to the verified one-time migration.
// The app does not load from them after initialization.

export default useFinanceStore;
