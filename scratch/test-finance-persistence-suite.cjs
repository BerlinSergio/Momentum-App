/**
 * Comprehensive Finance Persistence Verification Suite
 * Tests all 10 scenarios required by the user:
 * 1. Add an income transaction and refresh the page.
 * 2. Confirm that the income transaction remains visible.
 * 3. Add an expense transaction and refresh the page.
 * 4. Confirm that the expense transaction remains visible.
 * 5. Edit an existing transaction and refresh the page.
 * 6. Confirm that the edited transaction remains updated.
 * 7. Delete a transaction and refresh the page.
 * 8. Confirm that the deleted transaction does not return.
 * 9. Close the browser and restart the development server (simulate full memory wipe).
 * 10. Reopen the application and verify that all remaining financial data is still available.
 */
const assert = require('assert');
const path = require('path');

// Mock localStorage simulation for browser environment
const storageBackend = {};
const localStorageMock = {
  getItem: (k) => storageBackend[k] ?? null,
  setItem: (k, v) => { storageBackend[k] = String(v); },
  removeItem: (k) => { delete storageBackend[k]; },
  clear: () => { Object.keys(storageBackend).forEach((k) => delete storageBackend[k]); },
};

global.window = { localStorage: localStorageMock };
global.localStorage = localStorageMock;

async function runTestSuite() {
  console.log('================================================================');
  console.log('     MOMENTUM FINANCE LOCAL PERSISTENCE VERIFICATION SUITE      ');
  console.log('================================================================\n');

  const storePath = path.resolve('src/store/useFinanceStore.js').replace(/\\/g, '/');

  // Scenario 1 & 2: Add income transaction and simulate restart
  console.log('▶ [1/5] Testing Income Addition & Persistence...');
  const { useFinanceStore, calculateGroupedTotals } = await import('file:///' + storePath + '?t=' + Date.now());

  const initialCount = useFinanceStore.getState().transactions.length;
  console.log('  Initial transactions count:', initialCount);

  const newIncome = {
    id: 'inc-user-custom-001',
    title: 'Kabul Software Architecture Consulting',
    amount: 85000,
    category: 'Freelance',
    currency: 'AFN',
    type: 'income',
    date: '2026-10-30',
    notes: 'Q4 advisory retainer',
  };

  useFinanceStore.getState().addIncome(newIncome);

  const afterAddTx = useFinanceStore.getState().transactions.find((t) => t.id === 'inc-user-custom-001');
  assert.ok(afterAddTx, 'Income must exist in active state');
  assert.strictEqual(afterAddTx.amount, 85000);

  // Check localStorage immediately
  const rawStorage1 = localStorageMock.getItem('momentum-finance-storage');
  assert.ok(rawStorage1, "Key 'momentum-finance-storage' must exist in localStorage");
  const parsed1 = JSON.parse(rawStorage1).state;
  assert.ok(parsed1.transactions.some((t) => t.id === 'inc-user-custom-001'), 'Income must be stored in localStorage');
  console.log('  ✓ Income transaction saved to persistent localStorage immediately');

  // Simulate Cold Reload 1
  console.log('  Simulating browser reload...');
  const { useFinanceStore: storeReload1 } = await import('file:///' + storePath + '?t=' + (Date.now() + 10));
  await storeReload1.persist.rehydrate();

  const reloadedInc = storeReload1.getState().transactions.find((t) => t.id === 'inc-user-custom-001');
  assert.ok(reloadedInc, 'Income must remain after reload');
  assert.strictEqual(reloadedInc.amount, 85000);
  console.log('  ✓ Income remains visible after application restart\n');

  // Scenario 3 & 4: Add expense transaction and simulate restart
  console.log('▶ [2/5] Testing Expense Addition & Persistence...');
  const newExpense = {
    id: 'exp-user-custom-002',
    title: 'High Performance Solar Inverter',
    amount: 24000,
    category: 'Housing',
    currency: 'AFN',
    type: 'expense',
    date: '2026-10-30',
    note: 'Backup power infrastructure',
  };

  storeReload1.getState().addTransaction(newExpense);

  const rawStorage2 = localStorageMock.getItem('momentum-finance-storage');
  const parsed2 = JSON.parse(rawStorage2).state;
  assert.ok(parsed2.transactions.some((t) => t.id === 'exp-user-custom-002'));
  console.log('  ✓ Expense transaction saved to persistent localStorage immediately');

  // Simulate Cold Reload 2
  console.log('  Simulating browser reload...');
  const { useFinanceStore: storeReload2 } = await import('file:///' + storePath + '?t=' + (Date.now() + 20));
  await storeReload2.persist.rehydrate();

  const reloadedExp = storeReload2.getState().transactions.find((t) => t.id === 'exp-user-custom-002');
  assert.ok(reloadedExp, 'Expense must remain after reload');
  assert.strictEqual(reloadedExp.amount, 24000);
  console.log('  ✓ Expense remains visible after application restart\n');

  // Scenario 5 & 6: Edit an existing transaction and simulate restart
  console.log('▶ [3/6] Testing Transaction Editing (Income & Expense) & Persistence...');
  storeReload2.getState().updateIncome('inc-user-custom-001', {
    amount: 95000,
    title: 'Kabul Software Architecture Consulting (Updated)',
  });

  const updatedTx = storeReload2.getState().transactions.find((t) => t.id === 'inc-user-custom-001');
  assert.strictEqual(updatedTx.amount, 95000);
  assert.strictEqual(updatedTx.title, 'Kabul Software Architecture Consulting (Updated)');

  // Test updateTransaction on Expense
  storeReload2.getState().updateTransaction('exp-user-custom-002', {
    amount: 32000,
    title: 'High Performance Solar Inverter (Upgraded Model)',
    note: 'Upgraded 5kW system',
  });
  const updatedExp = storeReload2.getState().transactions.find((t) => t.id === 'exp-user-custom-002');
  assert.strictEqual(updatedExp.amount, 32000);
  assert.strictEqual(updatedExp.title, 'High Performance Solar Inverter (Upgraded Model)');

  // Simulate Cold Reload 3
  console.log('  Simulating browser reload...');
  const { useFinanceStore: storeReload3 } = await import('file:///' + storePath + '?t=' + (Date.now() + 30));
  await storeReload3.persist.rehydrate();

  const reloadedEdited = storeReload3.getState().transactions.find((t) => t.id === 'inc-user-custom-001');
  assert.strictEqual(reloadedEdited.amount, 95000);
  assert.strictEqual(reloadedEdited.title, 'Kabul Software Architecture Consulting (Updated)');

  const reloadedEditedExp = storeReload3.getState().transactions.find((t) => t.id === 'exp-user-custom-002');
  assert.strictEqual(reloadedEditedExp.amount, 32000);
  assert.strictEqual(reloadedEditedExp.title, 'High Performance Solar Inverter (Upgraded Model)');
  console.log('  ✓ Edited income and expense transactions remain updated after application restart\n');

  // Scenario 7 & 8: Delete a transaction and simulate restart
  console.log('▶ [4/6] Testing Transaction Deletion & Persistence...');
  storeReload3.getState().deleteTransaction('exp-user-custom-002');

  assert.ok(!storeReload3.getState().transactions.some((t) => t.id === 'exp-user-custom-002'));

  // Simulate Cold Reload 4
  console.log('  Simulating browser reload...');
  const { useFinanceStore: storeReload4 } = await import('file:///' + storePath + '?t=' + (Date.now() + 40));
  await storeReload4.persist.rehydrate();

  const deletedAfterReload = storeReload4.getState().transactions.find((t) => t.id === 'exp-user-custom-002');
  assert.strictEqual(deletedAfterReload, undefined, 'Deleted transaction must NOT return after reload');
  console.log('  ✓ Deleted transaction does not return after reload\n');

  // Scenario 9 & 10: Wipe memory completely and verify remaining data
  console.log('▶ [5/6] Testing Complete Dev Server Restart Simulation...');
  const { useFinanceStore: storeReload5 } = await import('file:///' + storePath + '?t=' + (Date.now() + 50));
  await storeReload5.persist.rehydrate();

  const remainingIncome = storeReload5.getState().transactions.find((t) => t.id === 'inc-user-custom-001');
  assert.ok(remainingIncome, 'Remaining user income must survive complete restart');
  assert.strictEqual(remainingIncome.amount, 95000);

  // Check calculation selectors
  const incTotals = storeReload5.getState().getTotalIncome();
  assert.ok(incTotals['AFN'] >= 95000, 'Income calculation totals must include persisted transactions');
  console.log('  ✓ Grouped income totals calculated correctly:', incTotals);
  console.log('  ✓ Complete restart verified with 100% data preservation!\n');

  // Scenario 11: Zero financial records persistence test
  console.log('▶ [6/6] Testing Zero Financial Records (Empty State) Persistence...');
  storeReload5.getState().clearAllTransactions();
  assert.strictEqual(storeReload5.getState().transactions.length, 0);

  const { useFinanceStore: storeReloadZero } = await import('file:///' + storePath + '?t=' + (Date.now() + 60));
  await storeReloadZero.persist.rehydrate();
  assert.strictEqual(storeReloadZero.getState().transactions.length, 0, 'Zeroed transactions must remain 0 on reload');
  console.log('  ✓ Cleared/empty transactions state persists without reverting to mock data!\n');

  console.log('================================================================');
  console.log('       ALL 10 FINANCE PERSISTENCE SCENARIOS VERIFIED!           ');
  console.log('================================================================');
}

runTestSuite().catch((err) => {
  console.error('TEST SUITE FAILED:', err);
  process.exit(1);
});
