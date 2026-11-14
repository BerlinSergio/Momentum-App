const assert = require('assert');

// Mock localStorage
const storage = new Map();
global.localStorage = {
  getItem: (key) => (storage.has(key) ? storage.get(key) : null),
  setItem: (key, value) => storage.set(key, String(value)),
  removeItem: (key) => storage.delete(key),
  clear: () => storage.clear(),
};
global.window = { localStorage: global.localStorage };

async function runTests() {
  console.log('=== TEST SUITE: COMPLETE RESTART & DATA PERSISTENCE ===\n');

  // ---------------------------------------------------------
  // TEST 1: Finance Store CRUD and Restart Hydration
  // ---------------------------------------------------------
  console.log('[Test 1] Testing Finance Store CRUD & Cold-Boot Persistence...');
  
  // Import store dynamically
  const financeModule = await import('../src/store/useFinanceStore.js?t=1');
  const useFinanceStore = financeModule.useFinanceStore;

  // Verify initial state hydration flag
  assert.strictEqual(useFinanceStore.getState()._hasHydrated, true, 'Finance store should be hydrated on boot');

  // Add a new income
  const testIncome = {
    id: 'test-inc-100',
    title: 'Consulting Retainer',
    amount: 1500,
    currency: 'USD',
    category: 'Freelance',
    date: '2026-10-31',
  };
  useFinanceStore.getState().addIncome(testIncome);

  // Add a new expense
  const testExpense = {
    id: 'test-exp-200',
    title: 'Hardware Upgrade',
    amount: 450,
    currency: 'USD',
    type: 'expense',
    category: 'Electronics',
    date: '2026-10-31',
  };
  useFinanceStore.getState().addTransaction(testExpense);

  // Update budget cap
  useFinanceStore.getState().setMonthlyBudgetCap({ USD: 2500, AFN: 60000 });

  // Verify memory state before restart
  const stateBefore = useFinanceStore.getState();
  assert(stateBefore.incomes.some(i => i.id === 'test-inc-100'), 'Income must exist in state');
  assert(stateBefore.transactions.some(t => t.id === 'test-exp-200'), 'Expense must exist in state');
  assert.strictEqual(stateBefore.monthlyBudgetCap.USD, 2500, 'Budget cap USD must be 2500');

  // Verify disk state (localStorage) before restart
  const diskRawFinance = global.localStorage.getItem('momentum-finance-storage');
  assert(diskRawFinance, 'momentum-finance-storage must be written to localStorage');
  const diskParsedFinance = JSON.parse(diskRawFinance);
  assert(diskParsedFinance.state.incomes.some(i => i.id === 'test-inc-100'), 'Income must be on disk');
  assert(diskParsedFinance.state.transactions.some(t => t.id === 'test-exp-200'), 'Expense must be on disk');

  console.log('  ✓ Finance CRUD mutations saved to disk localStorage synchronously');

  // SIMULATE DEV SERVER RESTART / COLD BOOT:
  // Re-import module fresh with memory cache bust while preserving localStorage
  const freshFinanceModule = await import('../src/store/useFinanceStore.js?t=' + Date.now());
  const freshFinanceStore = freshFinanceModule.useFinanceStore;

  const restoredState = freshFinanceStore.getState();
  assert.strictEqual(restoredState._hasHydrated, true, 'Restored finance store must have _hasHydrated = true');
  assert(restoredState.incomes.some(i => i.id === 'test-inc-100'), 'Income must survive server restart');
  assert(restoredState.transactions.some(t => t.id === 'test-exp-200'), 'Expense must survive server restart');
  assert.strictEqual(restoredState.monthlyBudgetCap.USD, 2500, 'Budget cap USD must survive server restart');

  // Test update & delete on restored store
  freshFinanceStore.getState().updateTransaction('test-exp-200', { amount: 500 });
  const updatedTx = freshFinanceStore.getState().transactions.find(t => t.id === 'test-exp-200');
  assert.strictEqual(updatedTx.amount, 500, 'Transaction amount updated to 500');

  freshFinanceStore.getState().deleteIncome('test-inc-100');
  assert(!freshFinanceStore.getState().incomes.some(i => i.id === 'test-inc-100'), 'Income deleted');

  // Verify second restart reflects updates & deletion
  const reboot2Finance = await import('../src/store/useFinanceStore.js?t=' + (Date.now() + 10));
  const reboot2State = reboot2Finance.useFinanceStore.getState();
  const reboot2Tx = reboot2State.transactions.find(t => t.id === 'test-exp-200');
  assert.strictEqual(reboot2Tx.amount, 500, 'Updated amount survives 2nd restart');
  assert(!reboot2State.incomes.some(i => i.id === 'test-inc-100'), 'Deleted income remains deleted after restart');

  console.log('  ✓ Finance store fully survives multiple cold reboots with 100% data integrity\n');

  // ---------------------------------------------------------
  // TEST 2: Personal Profile & Info Persistence
  // ---------------------------------------------------------
  console.log('[Test 2] Testing Profile Store & Personal Information Cold-Boot Persistence...');
  
  const profileModule = await import('../src/store/useProfileStore.js?t=1');
  const useProfileStore = profileModule.useProfileStore;

  useProfileStore.getState().updateProfile({
    fullName: 'Zabiullah Qasimi',
    email: 'zabiullah.qasimi@example.af',
    avatar: 'data:image/png;base64,mockavatarstring',
    currency: 'USD / $ (US Dollar)',
    timezone: 'Asia/Kabul (UTC+4:30)',
    city: 'Herat, Afghanistan',
    calculationConvention: 'Univ. of Islamic Sciences, Karachi',
  });

  const diskRawProfile = global.localStorage.getItem('momentum-profile-storage');
  assert(diskRawProfile, 'momentum-profile-storage must be written to disk');
  const diskParsedProfile = JSON.parse(diskRawProfile);
  assert.strictEqual(diskParsedProfile.state.fullName, 'Zabiullah Qasimi');
  assert.strictEqual(diskParsedProfile.state.email, 'zabiullah.qasimi@example.af');
  assert.strictEqual(diskParsedProfile.state.city, 'Herat, Afghanistan');

  // Cold boot profile store
  const freshProfileModule = await import('../src/store/useProfileStore.js?t=' + (Date.now() + 20));
  const restoredProfile = freshProfileModule.useProfileStore.getState();

  assert.strictEqual(restoredProfile.fullName, 'Zabiullah Qasimi', 'Full Name survives restart');
  assert.strictEqual(restoredProfile.email, 'zabiullah.qasimi@example.af', 'Email survives restart');
  assert.strictEqual(restoredProfile.avatar, 'data:image/png;base64,mockavatarstring', 'Avatar survives restart');
  assert.strictEqual(restoredProfile.currency, 'USD / $ (US Dollar)', 'Currency survives restart');
  assert.strictEqual(restoredProfile.city, 'Herat, Afghanistan', 'City survives restart');
  assert.strictEqual(restoredProfile._hasHydrated, true, '_hasHydrated is true on restart');

  console.log('  ✓ Personal Profile information survives cold reboot with 100% accuracy\n');

  // ---------------------------------------------------------
  // TEST 3: Personal Setup Configuration Persistence
  // ---------------------------------------------------------
  console.log('[Test 3] Testing Personal Setup & Configuration Persistence...');

  // Setup completion simulation
  restoredProfile.updateProfile({
    fullName: 'Farhad Ahmadzai',
    currency: 'EUR / € (Euro)',
    setupCompleted: true,
  });

  // Verify disk
  const diskSetup = JSON.parse(global.localStorage.getItem('momentum-profile-storage'));
  assert.strictEqual(diskSetup.state.setupCompleted, true, 'setupCompleted persisted to disk');
  assert.strictEqual(diskSetup.state.fullName, 'Farhad Ahmadzai');
  assert.strictEqual(diskSetup.state.currency, 'EUR / € (Euro)');

  // Cold boot after setup
  const rebootSetupModule = await import('../src/store/useProfileStore.js?t=' + (Date.now() + 30));
  const rebootSetup = rebootSetupModule.useProfileStore.getState();
  assert.strictEqual(rebootSetup.setupCompleted, true, 'setupCompleted persists across server restart');
  assert.strictEqual(rebootSetup.fullName, 'Farhad Ahmadzai', 'Setup fullName persists');
  assert.strictEqual(rebootSetup.currency, 'EUR / € (Euro)', 'Setup currency persists');

  console.log('  ✓ Personal Setup configuration survives cold reboot successfully\n');

  console.log('=== ALL PERSISTENCE RESTART TESTS PASSED SUCCESSFULLY! ===');
}

runTests().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});

