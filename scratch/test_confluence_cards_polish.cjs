const fs = require('fs');
const assert = require('assert');
const path = require('path');

console.log('=== VERIFYING ACTIVE CONFLUENCE CARDS POLISH ===');

const lightCode = fs.readFileSync(path.resolve('src/CalendarsMainLightMode.jsx'), 'utf8');
const darkCode = fs.readFileSync(path.resolve('src/CalendarsMainDarkMode.jsx'), 'utf8');

for (const [mode, code] of [['Light', lightCode], ['Dark', darkCode]]) {
  // 1. Uniform Flex Layout & Padding
  assert(code.includes('flex items-center justify-between px-5 py-4 rounded-2xl'), `${mode} mode must apply uniform flex layout and px-5 py-4 padding`);
  assert(code.includes('space-y-3 mt-2'), `${mode} mode must apply space-y-3 mt-2 to cards container`);

  // 2. Typography Polish
  assert(code.includes('text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400'), `${mode} mode must use polished uppercase sub-labels`);
  assert(code.includes('text-base font-bold'), `${mode} mode must use text-base font-bold for main date titles`);

  // 3. Standardized Badges
  assert(code.includes('shrink-0 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase'), `${mode} mode must use standardized badge styling`);
  assert(code.includes('>Primary</span>'), `${mode} mode must render Primary badge`);
  assert(code.includes('>Qamari</span>'), `${mode} mode must render Qamari badge`);
  assert(code.includes('>Solar</span>'), `${mode} mode must render Solar badge`);

  // 4. Sub-labels exact wording
  assert(code.includes('Civil • Gregorian'), `${mode} mode must label Gregorian subtext`);
  assert(code.includes('Spiritual • Hijri Qamari'), `${mode} mode must label Hijri Qamari subtext`);
  assert(code.includes('Solar • Hijri Shamsi'), `${mode} mode must label Hijri Shamsi subtext`);
}

console.log('✓ All 4 Active Confluence layout, typography, and badge checks passed!');
console.log('=== POLISH VERIFICATION COMPLETE ===');

