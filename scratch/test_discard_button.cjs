const fs = require('fs');

const dark = fs.readFileSync('src/EditProfileDarkMode.jsx', 'utf8');
const light = fs.readFileSync('src/EditProfileLightMode.jsx', 'utf8');

const darkLines = dark.split('\n').length;
const lightLines = light.split('\n').length;
console.log('Dark lines:', darkLines, 'Light lines:', lightLines);
if (darkLines !== lightLines) throw new Error('Line count mismatch!');

// Check Dark Mode styling
if (!dark.includes('text-slate-200 hover:text-white')) {
  throw new Error('Dark mode high visibility text color missing!');
}
if (!dark.includes('w-full py-3 mt-3 text-center text-sm font-medium') || !dark.includes('hover:bg-white/10 active:bg-white/20')) {
  throw new Error('Dark mode ghost button styling missing!');
}
console.log('✓ Dark mode Discard Changes button styling verified.');

// Check Light Mode styling
if (!light.includes('text-slate-700 hover:text-slate-900')) {
  throw new Error('Light mode high contrast text color missing!');
}
if (!light.includes('w-full py-3 mt-3 text-center text-sm font-medium') || !light.includes('bg-slate-100/80 hover:bg-slate-200/80')) {
  throw new Error('Light mode ghost button styling missing!');
}
console.log('✓ Light mode Discard Changes button styling verified.');

console.log('ALL VERIFICATIONS PASSED 100%!');

