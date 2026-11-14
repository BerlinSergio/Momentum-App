const fs = require('fs');

console.log('=== TEST SUITE: FINANCE ROUTES & DISTINCT SCREENS ===\n');

// 1. Verify FinanceNavHeader exists and uses React Router hooks
const navHeaderContent = fs.readFileSync('src/components/FinanceNavHeader.jsx', 'utf8');
console.log('1. Testing FinanceNavHeader.jsx:');
const usesUseNavigate = navHeaderContent.includes('useNavigate');
const usesUseLocation = navHeaderContent.includes('useLocation');
const hasRouteDashboard = navHeaderContent.includes('/finance/dashboard');
const hasRouteExpenses = navHeaderContent.includes('/finance/expenses');
const hasRouteIncome = navHeaderContent.includes('/finance/income');

console.log(' - Imports useNavigate:', usesUseNavigate);
console.log(' - Imports useLocation:', usesUseLocation);
console.log(' - Contains /finance/dashboard route:', hasRouteDashboard);
console.log(' - Contains /finance/expenses route:', hasRouteExpenses);
console.log(' - Contains /finance/income route:', hasRouteIncome);

if (!usesUseNavigate || !usesUseLocation || !hasRouteDashboard || !hasRouteExpenses || !hasRouteIncome) {
  console.error('FAIL: FinanceNavHeader is missing router hooks or route mappings');
  process.exit(1);
}

// 2. Verify all three screens import and use FinanceNavHeader
console.log('\n2. Testing Header Reusability across all three screen pairs:');
const screens = [
  'FinanceDashboardDarkMode.jsx',
  'FinanceDashboardLightMode.jsx',
  'FinanceExpenseTrackerDarkMode.jsx',
  'FinanceExpenseTrackerLightMode.jsx',
  'IncomeManagementDarkMode.jsx',
  'IncomeManagementLightMode.jsx'
];

screens.forEach(screen => {
  const content = fs.readFileSync(`src/${screen}`, 'utf8');
  const importsHeader = content.includes('FinanceNavHeader');
  const rendersHeader = content.includes('<FinanceNavHeader');
  console.log(` - ${screen}: importsHeader=${importsHeader}, rendersHeader=${rendersHeader}`);
  if (!importsHeader || !rendersHeader) {
    console.error(`FAIL: ${screen} does not use FinanceNavHeader`);
    process.exit(1);
  }
});

// 3. Verify App.jsx routes each to distinct components
console.log('\n3. Testing Distinct Parent Screen Mounting in App.jsx:');
const appContent = fs.readFileSync('src/App.jsx', 'utf8');
const mountsDashboard = appContent.includes('<FinanceDashboardDarkMode') && appContent.includes('<FinanceDashboardLightMode');
const mountsExpenses = appContent.includes('<FinanceExpenseTrackerDarkMode') && appContent.includes('<FinanceExpenseTrackerLightMode');
const mountsIncome = appContent.includes('<IncomeManagementDarkMode') && appContent.includes('<IncomeManagementLightMode');

console.log(' - App.jsx mounts FinanceDashboard:', mountsDashboard);
console.log(' - App.jsx mounts FinanceExpenseTracker:', mountsExpenses);
console.log(' - App.jsx mounts IncomeManagement:', mountsIncome);

if (!mountsDashboard || !mountsExpenses || !mountsIncome) {
  console.error('FAIL: App.jsx is not mounting distinct components for dashboard, expenses, and income');
  process.exit(1);
}

// 4. Verify main.jsx has BrowserRouter
console.log('\n4. Testing BrowserRouter in main.jsx:');
const mainContent = fs.readFileSync('src/main.jsx', 'utf8');
const hasBrowserRouter = mainContent.includes('BrowserRouter');
console.log(' - main.jsx wraps App in BrowserRouter:', hasBrowserRouter);

if (!hasBrowserRouter) {
  console.error('FAIL: main.jsx is missing BrowserRouter');
  process.exit(1);
}

// 5. Line parity check across all pairs
console.log('\n5. Testing Line Parity on all screen pairs:');
const pairs = [
  ['FinanceDashboardDarkMode', 'FinanceDashboardLightMode'],
  ['FinanceExpenseTrackerDarkMode', 'FinanceExpenseTrackerLightMode'],
  ['IncomeManagementDarkMode', 'IncomeManagementLightMode']
];

pairs.forEach(([dark, light]) => {
  const d = fs.readFileSync(`src/${dark}.jsx`, 'utf8').split('\n').length;
  const l = fs.readFileSync(`src/${light}.jsx`, 'utf8').split('\n').length;
  console.log(` - ${dark} (${d}) == ${light} (${l}): ${d === l ? 'PASS' : 'FAIL'}`);
  if (d !== l) {
    process.exit(1);
  }
});

console.log('\nALL FINANCE ROUTING & SCREEN DECOUPLING CHECKS PASSED PERFECTLY!');

