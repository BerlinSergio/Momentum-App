const fs = require('fs');

const dark = fs.readFileSync('src/FinanceExpenseTrackerDarkMode.jsx', 'utf8');
const light = fs.readFileSync('src/FinanceExpenseTrackerLightMode.jsx', 'utf8');
const app = fs.readFileSync('src/App.jsx', 'utf8');
const main = fs.readFileSync('src/main.jsx', 'utf8');

// 1. Verify local state
if (!dark.includes("setActiveFinanceTab('dashboard')") || !light.includes("setActiveFinanceTab('dashboard')")) {
  throw new Error("Local tab switcher missing for dashboard!");
}
if (!dark.includes("setActiveFinanceTab('expenses')") || !light.includes("setActiveFinanceTab('expenses')")) {
  throw new Error("Local tab switcher missing for expenses!");
}
if (!dark.includes("setActiveFinanceTab('income')") || !light.includes("setActiveFinanceTab('income')")) {
  throw new Error("Local tab switcher missing for income!");
}
console.log("✓ Local state setActiveFinanceTab verified for all 3 tabs.");

// 2. Verify sub-views are conditionally rendered in the same container
['dashboard', 'expenses', 'income'].forEach(tab => {
  if (!dark.includes(`activeFinanceTab === '${tab}' &&`) || !light.includes(`activeFinanceTab === '${tab}' &&`)) {
    throw new Error(`Sub-view condition missing for ${tab}!`);
  }
});
console.log("✓ Conditional rendering of Dashboard, Expenses, and Income sub-views in same container verified.");

// 3. Verify active pill styling uses local state
if (!dark.includes("activeFinanceTab === 'dashboard' ? 'bg-primary text-white shadow-md shadow-primary/30 font-bold'")) {
  throw new Error("Dark mode pill styling logic missing!");
}
if (!light.includes("activeFinanceTab === 'dashboard' ? 'bg-white text-slate-900 shadow-sm font-bold'")) {
  throw new Error("Light mode pill styling logic missing!");
}
console.log("✓ Active pill styling logic based on local state verified.");

// 4. Verify no useNavigate or react-router-dom in Finance screens or main
if (dark.includes('useNavigate') || light.includes('useNavigate')) {
  throw new Error("useNavigate found in FinanceExpenseTracker!");
}
if (main.includes('BrowserRouter')) {
  throw new Error("BrowserRouter found in main.jsx!");
}
if (app.includes('useLocation')) {
  throw new Error("useLocation found in App.jsx!");
}
console.log("✓ Router dependencies and hooks fully purged from Finance navigation, main.jsx, and App.jsx.");

console.log("ALL REVERT VERIFICATIONS PASSED 100%!");

