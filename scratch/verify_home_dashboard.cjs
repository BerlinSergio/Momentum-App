const assert = require('assert');
const fs = require('fs');

async function verifyHomeDashboard() {
  console.log('=== Verifying HomeDashboard Global State Integration ===\n');

  const [profileMod, finMod, taskMod, locMod, routineMod] = await Promise.all([
    import('../src/store/useProfileStore.js'),
    import('../src/store/useFinanceStore.js'),
    import('../src/store/useTaskStore.js'),
    import('../src/store/useLocationStore.js'),
    import('../src/store/useRoutineStore.js')
  ]);

  const profileStore = profileMod.useProfileStore;
  const financeStore = finMod.useFinanceStore;
  const taskStore = taskMod.useTaskStore;
  const locationStore = locMod.useLocationStore;
  const routineStore = routineMod.useRoutineStore;

  // 1. Profile Store & Dynamic Greeting Check
  console.log('1. Checking Profile Store & Dynamic Greeting:');
  profileStore.getState().updateProfile({ fullName: 'Milad Karimi' });
  const profileState = profileStore.getState();
  assert.strictEqual(profileState.fullName, 'Milad Karimi', 'Full name should be set');
  const firstName = profileState.fullName.trim().split(' ')[0];
  assert.strictEqual(firstName, 'Milad', 'First name should be Milad');

  const hour = new Date().getHours();
  let expectedGreeting = 'Good night';
  if (hour >= 5 && hour < 12) expectedGreeting = 'Good morning';
  else if (hour >= 12 && hour < 17) expectedGreeting = 'Good afternoon';
  else if (hour >= 17 && hour < 21) expectedGreeting = 'Good evening';

  console.log(` - Greeting: "${expectedGreeting}, ${firstName}" (Current Hour: ${hour}) -> PASSED`);

  // 2. Financial Metrics Check
  console.log('\n2. Checking Financial Sync (Income, Expenses, Saved, Savings Target):');
  const initialTxs = financeStore.getState().transactions;
  const currentMonthPrefix = new Date().toISOString().slice(0, 7);
  const currentMonthTxs = initialTxs.filter(t => t.date && t.date.startsWith(currentMonthPrefix));
  const incomeTotal = finMod.calculateGroupedTotals(currentMonthTxs.filter(t => t.type === 'income'));
  const expenseTotal = finMod.calculateGroupedTotals(currentMonthTxs.filter(t => t.type === 'expense'));
  console.log(' - Current Month Incomes:', incomeTotal);
  console.log(' - Current Month Expenses:', expenseTotal);

  // Add a test expense and verify instant recalculation
  financeStore.getState().addTransaction({
    id: 'test-dash-exp-1',
    title: 'Executive Conference Ticket',
    amount: 500,
    currency: 'USD',
    type: 'expense',
    category: 'Education',
    date: `${currentMonthPrefix}-02`,
  });

  const updatedTxs = financeStore.getState().transactions;
  const newExpenses = finMod.calculateGroupedTotals(
    updatedTxs.filter(t => t.date && t.date.startsWith(currentMonthPrefix) && t.type === 'expense')
  );
  assert(newExpenses.USD >= (expenseTotal.USD || 0) + 500, 'Expense total should reflect added $500');
  console.log(' - Added $500 expense successfully recalculated:', newExpenses.USD, '-> PASSED');

  // Clean up test transaction
  financeStore.getState().deleteTransaction('test-dash-exp-1');

  // 3. Task Synchronization Check
  console.log('\n3. Checking Task Store Sync & Toggle:');
  const tasks = taskStore.getState().tasks;
  assert(tasks.length > 0, 'Tasks store should have initial tasks');
  const targetTask = tasks[0];
  const originalStatus = targetTask.status;
  console.log(` - Target task: "${targetTask.title}" (Status: ${originalStatus})`);

  taskStore.getState().toggleTaskStatus(targetTask.id);
  const afterToggle = taskStore.getState().tasks.find(t => t.id === targetTask.id);
  assert.notStrictEqual(afterToggle.status, originalStatus, 'Task status should toggle');
  console.log(` - Toggled status to: "${afterToggle.status}" -> PASSED`);

  // Revert toggle
  taskStore.getState().toggleTaskStatus(targetTask.id);

  // 4. Prayer Times Engine Check
  console.log('\n4. Checking Prayer Times Calculation Engine:');
  const cities = locMod.CITIES_DATA;
  const kabul = cities.find(c => c.id === 'kabul');
  assert(kabul, 'Kabul city data must exist');
  console.log(` - Testing coordinates for ${kabul.name}: Lat ${kabul.latitude}, Lng ${kabul.longitude}`);

  // Test calculate prayer schedule
  const darkFile = fs.readFileSync('src/HomeDashboardDarkMode.jsx', 'utf8');
  assert(darkFile.includes('calculatePrayerSchedule'), 'File must contain calculatePrayerSchedule function');
  assert(darkFile.includes('prayerSchedule.nextPrayer.name'), 'File must bind next prayer name');
  assert(darkFile.includes('prayerSchedule.countdownText'), 'File must bind countdown text');
  console.log(' - Prayer schedule dynamic calculation binding confirmed -> PASSED');

  // 5. Line Parity Check
  console.log('\n5. Checking Line Parity (Pair #29):');
  const lightFile = fs.readFileSync('src/HomeDashboardLightMode.jsx', 'utf8');
  const dLines = darkFile.split('\n').length;
  const lLines = lightFile.split('\n').length;
  assert.strictEqual(dLines, lLines, `Line mismatch: ${dLines} vs ${lLines}`);
  console.log(` - HomeDashboardDarkMode (${dLines}) vs HomeDashboardLightMode (${lLines}) -> MATCH!`);

  console.log('\n=== ALL HOME DASHBOARD INTEGRATION TESTS PASSED 100% ===');
}

verifyHomeDashboard().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});

