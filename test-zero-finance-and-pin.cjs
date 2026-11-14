/**
 * Zero-Data Financial State & Custom PIN Cold-Restart Verification Suite
 */
const assert = require('assert');
const path = require('path');

// In-memory mock for localStorage
const storageBackend = {};
const localStorageMock = {
  getItem: (key) => storageBackend[key] ?? null,
  setItem: (key, val) => { storageBackend[key] = String(val); },
  removeItem: (key) => { delete storageBackend[key]; },
  clear: () => { Object.keys(storageBackend).forEach((k) => delete storageBackend[k]); },
};

global.window = {
  localStorage: localStorageMock,
  matchMedia: () => ({ matches: false }),
  location: { search: '', href: 'http://localhost/' },
  history: { pushState: () => {}, replaceState: () => {} },
};
global.localStorage = localStorageMock;

async function runZeroFinanceAndPinTest() {
  console.log('===============================================================');
  console.log('   MOMENTUM ZERO FINANCE & PIN COLD-RESTART VERIFICATION       ');
  console.log('===============================================================\n');

  // Test 1: Security Store PIN updates and cold-restart persistence
  console.log('▶ [1/5] Testing Security Store PIN Update via setPin("7412")...');
  const secPath = path.resolve('src/store/useSecurityStore.js').replace(/\\/g, '/');
  const { useSecurityStore } = await import('file:///' + secPath + '?t=' + Date.now());

  // Default before mutation
  assert.strictEqual(useSecurityStore.getState().pin, '1234', 'Initial PIN should be 1234 on fresh install');

  // Update PIN using setPin
  useSecurityStore.getState().setPin('7412');
  assert.strictEqual(useSecurityStore.getState().pin, '7412', 'State PIN must be 7412');

  // Check localStorage immediately
  const rawSec = localStorageMock.getItem('momentum-security-storage');
  assert.ok(rawSec, "Storage key 'momentum-security-storage' must exist");
  const parsedSec = JSON.parse(rawSec).state;
  assert.strictEqual(parsedSec.pin, '7412', 'Persisted PIN in localStorage must be 7412');
  console.log('  ✓ PIN successfully saved as "7412" in localStorage');

  // Test changePin & updatePin aliases
  useSecurityStore.getState().changePin('9510');
  const rawSec2 = localStorageMock.getItem('momentum-security-storage');
  assert.strictEqual(JSON.parse(rawSec2).state.pin, '9510', 'changePin must update storage to 9510');

  useSecurityStore.getState().updatePin('7412');
  const rawSec3 = localStorageMock.getItem('momentum-security-storage');
  assert.strictEqual(JSON.parse(rawSec3).state.pin, '7412', 'updatePin must update storage to 7412');
  console.log('  ✓ changePin and updatePin aliases work with identical behavior');

  // Simulate Cold Restart: reload security store with fresh import
  console.log('▶ [2/5] Simulating Security Cold App Restart...');
  const { useSecurityStore: freshSecurityStore } = await import('file:///' + secPath + '?t=' + (Date.now() + 1));
  await freshSecurityStore.persist.rehydrate();
  assert.strictEqual(freshSecurityStore.getState().pin, '7412', 'Cold restart must load custom PIN 7412, NOT 1234');
  console.log('  ✓ Cold Restart Confirmed: PIN is "7412" without reverting to default "1234"\n');

  // Test 2: Finance Store Zero State & Cold Restart Persistence
  console.log('▶ [3/5] Testing Finance Store Reset to Zero (0.00)...');
  const finPath = path.resolve('src/store/useFinanceStore.js').replace(/\\/g, '/');
  const { useFinanceStore, calculateGroupedTotals } = await import('file:///' + finPath + '?t=' + Date.now());

  // Verify initial mock state before user modification
  const initialTxs = useFinanceStore.getState().transactions;
  assert.ok(initialTxs.length > 0, 'Initial state should have default mock transactions');

  // User clears all transactions to 0
  useFinanceStore.getState().clearAllTransactions();
  assert.strictEqual(useFinanceStore.getState().transactions.length, 0, 'Transactions must be 0 in state');
  assert.strictEqual(useFinanceStore.getState().incomes.length, 0, 'Incomes must be 0 in state');

  // Verify calculation with empty transactions
  const incTotals = calculateGroupedTotals(useFinanceStore.getState().transactions.filter(t => t.type === 'income'));
  const expTotals = calculateGroupedTotals(useFinanceStore.getState().transactions.filter(t => t.type === 'expense'));
  assert.strictEqual(Object.keys(incTotals).length, 0, 'Income grouped totals must be empty when transactions are cleared');
  assert.strictEqual(Object.keys(expTotals).length, 0, 'Expense grouped totals must be empty when transactions are cleared');

  // Verify storage has empty transactions
  const rawFin = localStorageMock.getItem('momentum-finance-storage');
  assert.ok(rawFin, "Storage key 'momentum-finance-storage' must exist");
  const parsedFin = JSON.parse(rawFin).state;
  assert.ok(Array.isArray(parsedFin.transactions), 'transactions must be an array');
  assert.strictEqual(parsedFin.transactions.length, 0, 'Persisted transactions must be length 0');
  console.log('  ✓ Stored transactions is successfully empty [] in localStorage');

  // Test updateFinances
  console.log('▶ [4/5] Testing updateFinances mutator...');
  useFinanceStore.getState().updateFinances({ monthlyBudgetCap: { AFN: 75000, USD: 1500 } });
  const rawFin2 = localStorageMock.getItem('momentum-finance-storage');
  assert.strictEqual(JSON.parse(rawFin2).state.monthlyBudgetCap.AFN, 75000);
  console.log('  ✓ updateFinances immediately committed to localStorage');

  // Simulate Cold Restart: reload finance store with fresh import
  console.log('▶ [5/5] Simulating Finance Cold App Restart with Zeroed Transactions...');
  const { useFinanceStore: freshFinanceStore } = await import('file:///' + finPath + '?t=' + (Date.now() + 2));
  await freshFinanceStore.persist.rehydrate();
  const reloadedTxs = freshFinanceStore.getState().transactions;
  assert.strictEqual(reloadedTxs.length, 0, 'Cold restart MUST have length 0, NOT reset to 95,000.00 defaults');

  const reloadedIncTotals = calculateGroupedTotals(reloadedTxs.filter(t => t.type === 'income'));
  assert.strictEqual(reloadedIncTotals['AFN'] || 0, 0, 'AFN Income MUST be 0, NOT 95,000.00');
  assert.strictEqual(reloadedIncTotals['USD'] || 0, 0, 'USD Income MUST be 0');
  console.log('  ✓ Cold Restart Confirmed: Transactions remain [] and Income is 0.00, NOT 95,000.00\n');

  console.log('===============================================================');
  console.log('       ALL ZERO-FINANCE AND PIN PERSISTENCE TESTS PASSED!      ');
  console.log('===============================================================');
}

runZeroFinanceAndPinTest().catch((err) => {
  console.error('TEST SUITE FAILED:', err);
  process.exit(1);
});
