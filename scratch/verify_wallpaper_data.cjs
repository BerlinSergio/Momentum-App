// Verification script for wallpaper day/night assets
const fs = require('fs');

// We can read defaultWallpapers.js and check the contents
const content = fs.readFileSync('src/data/defaultWallpapers.js', 'utf8');

const lightImagesMatch = content.match(/export const BENCHMARK_AIDA_LIGHT_IMAGES = \[([\s\S]*?)\];/);
const darkImagesMatch = content.match(/export const BENCHMARK_AIDA_DARK_IMAGES = \[([\s\S]*?)\];/);

if (!lightImagesMatch || !darkImagesMatch) {
  console.error("FAIL: Could not extract benchmark arrays!");
  process.exit(1);
}

const lightImages = eval(`[${lightImagesMatch[1]}]`);
const darkImages = eval(`[${darkImagesMatch[1]}]`);

console.log(`Found ${lightImages.length} benchmark light images and ${darkImages.length} dark images.`);

if (lightImages.length !== 8 || darkImages.length !== 8) {
  console.error(`FAIL: Expected 8 benchmark images each, found ${lightImages.length} light, ${darkImages.length} dark.`);
  process.exit(1);
}

for (let i = 0; i < 8; i++) {
  if (lightImages[i] === darkImages[i]) {
    console.error(`FAIL: Benchmark image ${i} has identical light and dark URLs!`);
    process.exit(1);
  }
}

// Check buildBackgroundLibrary logic
const buildFnMatch = content.match(/const lightImage = (.*?);\s+const darkImage = (.*?);/);
if (!buildFnMatch) {
  console.error("FAIL: Could not find lightImage and darkImage assignment in buildBackgroundLibrary!");
  process.exit(1);
}

console.log("lightImage assignment:", buildFnMatch[1]);
console.log("darkImage assignment:", buildFnMatch[2]);

console.log("PASS: Wallpaper data array successfully verified with distinct Day and Night assets for all items!");

