const path = require('path');

const storageBackend = {
  'momentum-finance-storage': JSON.stringify({
    state: {
      accounts: [],
      transactions: [],
      incomes: [],
      editingIncome: null,
      budgets: [],
      monthlyBudgetCap: { AFN: 50000, USD: 1000 },
      pendingTransactionType: 'expense',
      _hasHydrated: true,
    },
    version: 0,
  }),
};

const localStorageMock = {
  getItem: (key) => storageBackend[key] ?? null,
  setItem: (key, val) => { storageBackend[key] = String(val); },
  removeItem: (key) => { delete storageBackend[key]; },
};

global.window = { localStorage: localStorageMock };
global.localStorage = localStorageMock;

async function testReload() {
  const finPath = path.resolve('src/store/useFinanceStore.js').replace(/\\/g, '/');
  const { useFinanceStore } = await import('file:///' + finPath + '?t=' + Date.now());

  console.log('After reload, transactions length:', useFinanceStore.getState().transactions.length);
  console.log('After reload, incomes length:', useFinanceStore.getState().incomes.length);
}

testReload();

