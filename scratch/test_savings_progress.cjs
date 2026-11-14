const { useFinanceStore, calculateGroupedTotals } = require('../src/store/useFinanceStore.js');
const { useProfileStore } = require('../src/store/useProfileStore.js');

const finance = useFinanceStore.getState();
const profile = useProfileStore.getState();

console.log('Profile Currency:', profile.currency);
console.log('Finance Monthly Budget Cap:', finance.monthlyBudgetCap);

const currentMonthPrefix = new Date().toISOString().slice(0, 7);
console.log('Current Month Prefix:', currentMonthPrefix);

const monthExpenses = finance.transactions.filter(t => t.type === 'expense' && t.date && t.date.startsWith(currentMonthPrefix));
const monthIncomes = (finance.incomes || []).filter(i => i.date && i.date.startsWith(currentMonthPrefix));

console.log('Month Expenses:', calculateGroupedTotals(monthExpenses));
console.log('Month Incomes:', calculateGroupedTotals(monthIncomes));

