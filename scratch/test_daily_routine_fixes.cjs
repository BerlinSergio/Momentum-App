const fs = require('fs');
const assert = require('assert');

console.log('--- TESTING DAILY ROUTINE FIXES ---');

const darkSrc = fs.readFileSync('src/DailyRoutineDarkMode.jsx', 'utf8');
const lightSrc = fs.readFileSync('src/DailyRoutineLightMode.jsx', 'utf8');
const bottomNavSrc = fs.readFileSync('src/components/BottomNavBar.jsx', 'utf8');
const dailyRoutineSrc = fs.readFileSync('src/DailyRoutine.jsx', 'utf8');

// 1. Redundant Profile Icon Check
assert(!darkSrc.includes('>U<'), 'Dark mode must not contain secondary "U" avatar');
assert(!lightSrc.includes('>U<'), 'Light mode must not contain secondary "U" avatar');
console.log('✓ Fix 1 Passed: Redundant "U" avatar button completely removed.');

// 2. Checkmark Icon Glitch Check
assert(!darkSrc.includes('CheckCircle2 className="w-5 h-5 pointer-events-none"'), 'Dark mode routine completion button must not render concentric CheckCircle2 inside circular border');
assert(!lightSrc.includes('CheckCircle2 className="w-5 h-5 pointer-events-none"'), 'Light mode routine completion button must not render concentric CheckCircle2 inside circular border');
assert(darkSrc.includes('<Check className='), 'Dark mode must render clean Check icon inside toggle button');
assert(lightSrc.includes('<Check className='), 'Light mode must render clean Check icon inside toggle button');
assert(darkSrc.includes('bg-primary text-white shadow-primary/25'), 'Dark mode must use solid clean filled circle on completed');
assert(lightSrc.includes('bg-primary text-white shadow-primary/25'), 'Light mode must use solid clean filled circle on completed');
console.log('✓ Fix 2 Passed: Single circular icon with crisp centered Check icon, concentric glitch eliminated.');

// 3. Bottom Navigation Styling Check (Flush Edge-to-Edge & zero padding)
assert(bottomNavSrc.includes('fixed bottom-0 left-0 right-0 w-full h-16 z-50 px-6 mb-0 pb-0 rounded-none rounded-b-none border-t backdrop-blur-xl shadow-lg'), 'BottomNavBar must sit flush at bottom-0 edge-to-edge full width with rounded-b-none');
assert(bottomNavSrc.includes('export { BottomNavBar, BottomNavBar as BottomNav }'), 'BottomNavBar must export BottomNav alias');
assert(darkSrc.includes('<div className="relative w-full pb-0 mb-0 bg-transparent font-sans">'), 'Dark mode root wrapper must have pb-0 mb-0');
assert(lightSrc.includes('<div className="relative w-full pb-0 mb-0 bg-transparent font-sans">'), 'Light mode root wrapper must have pb-0 mb-0');
assert(!darkSrc.includes('pb-safe'), 'Dark mode must not have pb-safe pushing bottom nav up');
assert(!lightSrc.includes('pb-safe'), 'Light mode must not have pb-safe pushing bottom nav up');
assert(!darkSrc.includes('pb-36'), 'Dark mode must not have pb-36 pushing bottom nav up');
assert(!lightSrc.includes('pb-36'), 'Light mode must not have pb-36 pushing bottom nav up');
assert(dailyRoutineSrc.includes('BottomNav'), 'DailyRoutine.jsx must reference BottomNav');
console.log('✓ Fix 3 Passed: Bottom navigation bar sits flush edge-to-edge at bottom-0 with zero wrapper padding/margin.');

// 4. Line Parity Check
const darkLines = darkSrc.split('\n').length;
const lightLines = lightSrc.split('\n').length;
assert.strictEqual(darkLines, lightLines, `Line count mismatch: ${darkLines} vs ${lightLines}`);
console.log(`✓ Fix 4 Passed: 100% 1:1 line parity verified (${darkLines} lines each).`);

console.log('ALL TESTS PASSED!');
