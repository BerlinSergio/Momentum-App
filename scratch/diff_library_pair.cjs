const fs = require('fs');

const light = fs.readFileSync('src/BackgroundWallpaperLibraryLightMode.jsx', 'utf8').split('\n');
const dark = fs.readFileSync('src/BackgroundWallpaperLibraryDarkMode.jsx', 'utf8').split('\n');

console.log(`Light lines: ${light.length}, Dark lines: ${dark.length}`);

let diffCount = 0;
for (let i = 0; i < Math.max(light.length, dark.length); i++) {
  const l = (light[i] || '').trim();
  const d = (dark[i] || '').trim();
  if (l !== d) {
    diffCount++;
    if (diffCount <= 10) {
      console.log(`Line ${i + 1}:`);
      console.log(`  L: ${l}`);
      console.log(`  D: ${d}`);
    }
  }
}
console.log(`Total diff lines: ${diffCount}`);

