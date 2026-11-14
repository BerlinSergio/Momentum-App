const path = require('path');

const storageBackend = {};
const localStorageMock = {
  getItem: (key) => storageBackend[key] ?? null,
  setItem: (key, val) => { storageBackend[key] = String(val); },
  removeItem: (key) => { delete storageBackend[key]; },
  clear: () => { Object.keys(storageBackend).forEach((k) => delete storageBackend[k]); },
};

global.window = { localStorage: localStorageMock };
global.localStorage = localStorageMock;

async function test() {
  const finPath = path.resolve('src/store/useFinanceStore.js').replace(/\\/g, '/');
  const { useFinanceStore } = await import('file:///' + finPath);

  console.log('Initial transactions length:', useFinanceStore.getState().transactions.length);

  // User sets transactions to 0 / empty
  useFinanceStore.setState({ transactions: [], incomes: [] });
  console.log('Cleared transactions length:', useFinanceStore.getState().transactions.length);
  console.log('Stored in localStorage:', localStorage.getItem('momentum-finance-storage'));

  // What happens when rehydrated or re-imported?
}

test();

