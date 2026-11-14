const { useFinanceStore, calculateGroupedTotals } = require('../src/store/useFinanceStore.js');
const { useProfileStore } = require('../src/store/useProfileStore.js');

function testSavingsTarget() {
  console.log('=== Testing Savings Target Dynamic Calculation & Currency Sync ===\n');

  // Helper simulating the exact useMemo calculation in HomeDashboard
  function computeSavingsStats(profile, finance) {
    const rawCurrency = profile?.currency || 'AFN';
    let currencyCode = 'AFN';
    let currencySymbol = '؋';
    if (rawCurrency.includes('USD') || rawCurrency.includes('$')) {
      currencyCode = 'USD';
      currencySymbol = '$';
    } else if (rawCurrency.includes('EUR') || rawCurrency.includes('€')) {
      currencyCode = 'EUR';
      currencySymbol = '€';
    } else if (rawCurrency.includes('GBP') || rawCurrency.includes('£')) {
      currencyCode = 'GBP';
      currencySymbol = '£';
    } else if (rawCurrency.includes('PKR') || rawCurrency.includes('₨')) {
      currencyCode = 'PKR';
      currencySymbol = '₨';
    } else if (rawCurrency.includes('IRR') || rawCurrency.includes('﷼')) {
      currencyCode = 'IRR';
      currencySymbol = '﷼';
    } else if (rawCurrency.includes('AFN') || rawCurrency.includes('؋')) {
      currencyCode = 'AFN';
      currencySymbol = '؋';
    }

    const currentMonthPrefix = new Date().toISOString().slice(0, 7);
    const allFinanceItems = [...(finance.transactions || [])];
    (finance.incomes || []).forEach((inc) => {
      if (!allFinanceItems.some((tx) => tx.id === inc.id)) {
        allFinanceItems.push({ ...inc, type: 'income' });
      }
    });

    const currentMonthTransactions = allFinanceItems.filter((tx) => !tx.date || tx.date.startsWith(currentMonthPrefix));
    const incomeGrouped = calculateGroupedTotals(currentMonthTransactions.filter((tx) => tx.type === 'income'));
    const expensesGrouped = calculateGroupedTotals(currentMonthTransactions.filter((tx) => tx.type === 'expense'));

    const allCurrencies = Array.from(new Set([...Object.keys(incomeGrouped), ...Object.keys(expensesGrouped)]));
    const savedGrouped = {};
    (allCurrencies.length > 0 ? allCurrencies : ['AFN']).forEach((cur) => {
      savedGrouped[cur] = (incomeGrouped[cur] || 0) - (expensesGrouped[cur] || 0);
    });

    const storeTarget = typeof finance.savingsTarget === 'number'
      ? finance.savingsTarget
      : (finance.savingsTarget?.[currencyCode] ?? (finance.monthlyBudgetCap?.[currencyCode] ? finance.monthlyBudgetCap[currencyCode] : null));
    const targetAmount = Number(storeTarget) > 0 ? Number(storeTarget) : (currencyCode === 'AFN' ? 60000 : 1000);
    const actualSaved = savedGrouped[currencyCode] !== undefined
      ? savedGrouped[currencyCode]
      : (allCurrencies[0] && savedGrouped[allCurrencies[0]] !== undefined ? savedGrouped[allCurrencies[0]] : 0);

    const rawRate = targetAmount > 0 ? (actualSaved / targetAmount) * 100 : 0;
    const clampedRate = Math.max(0, rawRate);
    const roundedRate = Math.round(clampedRate * 10) / 10;
    const displayRate = roundedRate === 0 ? '0%' : (roundedRate % 1 === 0 ? `${roundedRate.toFixed(0)}%` : `${roundedRate.toFixed(1)}%`);
    const barWidth = Math.min(100, Math.max(0, roundedRate));
    const formattedTarget = `${currencySymbol}${targetAmount.toLocaleString('en-US')}`;

    return { currencyCode, currencySymbol, targetAmount, actualSaved, displayRate, barWidth, formattedTarget };
  }

  // 1. Initial State (Default Profile: AFN)
  useProfileStore.getState().updateProfile({ currency: 'AFN / ؋ (Afghan Afghani)' });
  let stats = computeSavingsStats(useProfileStore.getState(), useFinanceStore.getState());
  console.log('1. Initial State (AFN):');
  console.log(` - Currency Code: ${stats.currencyCode}`);
  console.log(` - Currency Symbol: ${stats.currencySymbol}`);
  console.log(` - Formatted Target: ${stats.formattedTarget}`);
  console.log(` - Actual Saved: ${stats.actualSaved}`);
  console.log(` - Display Rate: ${stats.displayRate}`);
  console.log(` - Progress Bar Width: ${stats.barWidth}%`);

  if (stats.currencySymbol !== '؋') throw new Error(`Expected symbol '؋', got '${stats.currencySymbol}'`);
  if (!stats.formattedTarget.includes('؋60,000')) throw new Error(`Expected '؋60,000', got '${stats.formattedTarget}'`);
  console.log(' -> PASSED\n');

  // 2. Reactivity to Logging Expense
  console.log('2. Reactivity to adding an expense:');
  const initialSaved = stats.actualSaved;
  useFinanceStore.getState().addTransaction({
    id: 'test-exp-101',
    title: 'Test Office Equipment',
    amount: 30000,
    type: 'expense',
    category: 'Work',
    currency: 'AFN',
    date: new Date().toISOString().slice(0, 10),
  });

  stats = computeSavingsStats(useProfileStore.getState(), useFinanceStore.getState());
  console.log(` - Saved dropped from ${initialSaved} to ${stats.actualSaved}`);
  console.log(` - New Display Rate: ${stats.displayRate}`);
  console.log(` - New Progress Bar Width: ${stats.barWidth}%`);
  if (stats.actualSaved !== initialSaved - 30000) throw new Error('Saved amount did not decrease correctly');
  console.log(' -> PASSED\n');

  // 3. Reactivity to Logging Income
  console.log('3. Reactivity to adding income:');
  const savedBeforeIncome = stats.actualSaved;
  useFinanceStore.getState().addIncome({
    id: 'test-inc-101',
    title: 'Bonus Project Payout',
    amount: 50000,
    currency: 'AFN',
    date: new Date().toISOString().slice(0, 10),
  });

  stats = computeSavingsStats(useProfileStore.getState(), useFinanceStore.getState());
  console.log(` - Saved increased from ${savedBeforeIncome} to ${stats.actualSaved}`);
  console.log(` - New Display Rate: ${stats.displayRate}`);
  console.log(` - New Progress Bar Width: ${stats.barWidth}%`);
  if (stats.actualSaved !== savedBeforeIncome + 50000) throw new Error('Saved amount did not increase correctly');
  console.log(' -> PASSED\n');

  // 4. Zero / Over-budget condition
  console.log('4. Zero / Negative Saved Condition:');
  useFinanceStore.getState().addTransaction({
    id: 'test-huge-exp',
    title: 'Huge Outflow',
    amount: 200000,
    type: 'expense',
    currency: 'AFN',
    date: new Date().toISOString().slice(0, 10),
  });

  stats = computeSavingsStats(useProfileStore.getState(), useFinanceStore.getState());
  console.log(` - Actual Saved: ${stats.actualSaved} (Negative)`);
  console.log(` - Display Rate: ${stats.displayRate}`);
  console.log(` - Progress Bar Width: ${stats.barWidth}%`);
  if (stats.displayRate !== '0%') throw new Error(`Expected '0%', got '${stats.displayRate}'`);
  if (stats.barWidth !== 0) throw new Error(`Expected bar width 0%, got ${stats.barWidth}%`);
  console.log(' -> PASSED\n');

  // 5. Currency Sync with Profile (Switching to USD and EUR)
  console.log('5. Currency Sync with Profile:');
  useProfileStore.getState().updateProfile({ currency: 'USD / $ (US Dollar)' });
  stats = computeSavingsStats(useProfileStore.getState(), useFinanceStore.getState());
  console.log(` - Switched to USD: Symbol=${stats.currencySymbol}, Target=${stats.formattedTarget}, Rate=${stats.displayRate}`);
  if (stats.currencySymbol !== '$') throw new Error(`Expected symbol '$', got '${stats.currencySymbol}'`);
  if (!stats.formattedTarget.includes('$1,000')) throw new Error(`Expected '$1,000', got '${stats.formattedTarget}'`);

  useProfileStore.getState().updateProfile({ currency: 'EUR / € (Euro)' });
  stats = computeSavingsStats(useProfileStore.getState(), useFinanceStore.getState());
  console.log(` - Switched to EUR: Symbol=${stats.currencySymbol}, Target=${stats.formattedTarget}, Rate=${stats.displayRate}`);
  if (stats.currencySymbol !== '€') throw new Error(`Expected symbol '€', got '${stats.currencySymbol}'`);
  if (!stats.formattedTarget.includes('€1,000')) throw new Error(`Expected '€1,000', got '${stats.formattedTarget}'`);
  console.log(' -> PASSED\n');

  // 6. Custom Savings Target Update
  console.log('6. Custom Savings Target in useFinanceStore:');
  useFinanceStore.getState().setSavingsTarget({ EUR: 5000 });
  stats = computeSavingsStats(useProfileStore.getState(), useFinanceStore.getState());
  console.log(` - Updated EUR Savings Target to 5,000: Target=${stats.formattedTarget}`);
  if (!stats.formattedTarget.includes('€5,000')) throw new Error(`Expected '€5,000', got '${stats.formattedTarget}'`);
  console.log(' -> PASSED\n');

  console.log('=== ALL SAVINGS TARGET SYNCHRONIZATION TESTS PASSED 100% ===');
}

testSavingsTarget();

