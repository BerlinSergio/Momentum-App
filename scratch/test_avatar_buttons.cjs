const fs = require('fs');

const dark = fs.readFileSync('src/EditProfileDarkMode.jsx', 'utf8');
const light = fs.readFileSync('src/EditProfileLightMode.jsx', 'utf8');

const darkLines = dark.split('\n').length;
const lightLines = light.split('\n').length;
console.log('Dark lines:', darkLines, 'Light lines:', lightLines);
if (darkLines !== lightLines) throw new Error('Line count mismatch!');

// 1. Button container
if (!dark.includes('flex flex-row justify-center items-center gap-3 mt-4') || !light.includes('flex flex-row justify-center items-center gap-3 mt-4')) {
  throw new Error('Button container flex flex-row justify-center items-center gap-3 mt-4 missing!');
}
console.log('✓ Button container alignment verified.');

// 2. Both buttons consistent styling
if (!dark.includes('px-4 py-2 rounded-xl') || !light.includes('px-4 py-2 rounded-xl')) {
  throw new Error('Button padding px-4 py-2 rounded-xl missing!');
}
if (!dark.includes('text-sm font-medium transition-colors') || !light.includes('text-sm font-medium transition-colors')) {
  throw new Error('Button typography text-sm font-medium transition-colors missing!');
}
console.log('✓ Consistent button styling verified.');

// 3. Helper text spacing
if (!dark.includes('text-center text-xs text-slate-400 mt-3 block')) {
  throw new Error('Dark mode helper text spacing missing!');
}
if (!light.includes('text-center text-xs text-slate-600 mt-3 block')) {
  throw new Error('Light mode helper text spacing missing!');
}
console.log('✓ Helper text spacing verified.');

console.log('ALL AVATAR BUTTON TESTS PASSED 100%!');

