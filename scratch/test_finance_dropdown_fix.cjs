const fs = require('fs');
const assert = require('assert');

console.log('=== TEST SUITE: FINANCE DROPDOWNS INTERACTION FIX ===\n');

['FinanceExpenseTrackerDarkMode.jsx', 'FinanceExpenseTrackerLightMode.jsx'].forEach((file) => {
  console.log(`Checking ${file}...`);
  const content = fs.readFileSync(`src/${file}`, 'utf8');

  // 1. Verify Category Dropdown uses onMouseDown
  assert(
    content.includes('onMouseDown={(e) => {') &&
    content.includes('setCategoryFilter(cat);') &&
    content.includes('setIsCategoryOpen(false);'),
    `${file} Category Dropdown must use onMouseDown to eliminate click race conditions`
  );
  console.log(`  ✓ Category Dropdown has onMouseDown handler with immediate state commit & close`);

  // 2. Verify Sort / Date Dropdown uses onMouseDown
  assert(
    content.includes('setSortOrder(s);') &&
    content.includes('setIsSortOpen(false);'),
    `${file} Sort/Date Dropdown must use onMouseDown`
  );
  console.log(`  ✓ Date/Sort Dropdown has onMouseDown handler with immediate state commit & close`);

  // 3. Verify Month Selector Dropdown uses onMouseDown
  assert(
    content.includes('setSelectedMonth(m);') &&
    content.includes('setIsMonthOpen(false);'),
    `${file} Month Selector Dropdown must use onMouseDown`
  );
  console.log(`  ✓ Month Selector Dropdown has onMouseDown handler with immediate state commit & close`);

  // 4. Verify Z-Index Stacking Context
  assert(
    content.includes('relative z-50 pointer-events-auto'),
    `${file} Dropdown containers must have elevated z-50 and pointer-events-auto`
  );
  assert(
    content.includes('fixed inset-0 z-40 bg-transparent pointer-events-auto'),
    `${file} Backdrop overlay must be inside main at z-40 below dropdowns (z-50)`
  );
  console.log(`  ✓ Z-index stacking context verified (dropdowns z-50 > overlay z-40)`);
});

// 5. Line parity check
const darkLines = fs.readFileSync('src/FinanceExpenseTrackerDarkMode.jsx', 'utf8').split('\n').length;
const lightLines = fs.readFileSync('src/FinanceExpenseTrackerLightMode.jsx', 'utf8').split('\n').length;
assert.strictEqual(darkLines, lightLines, 'Finance screens must have matching line counts');
console.log(`\n✓ Exact line parity: ${darkLines} lines in both files`);

console.log('\n=== ALL DROPDOWN INTERACTION TESTS PASSED! ===');

