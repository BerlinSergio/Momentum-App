const assert = require('assert');
const fs = require('fs');

function testSequentialNaming() {
  console.log('================================================================');
  console.log('   TESTING SEQUENTIAL WALLPAPER NUMBERING & CLEAN LOGIC          ');
  console.log('================================================================\n');

  const lightContent = fs.readFileSync('src/BackgroundWallpaperLibraryLightMode.jsx', 'utf8');
  const darkContent = fs.readFileSync('src/BackgroundWallpaperLibraryDarkMode.jsx', 'utf8');

  console.log('▶ [1/4] Verifying removal of old filename extraction logic...');
  assert.ok(!lightContent.includes('getFilenameFromUrl'), 'LightMode must not contain getFilenameFromUrl');
  assert.ok(!darkContent.includes('getFilenameFromUrl'), 'DarkMode must not contain getFilenameFromUrl');
  assert.ok(!lightContent.includes('{item.name}'), 'LightMode must not use item.name');
  assert.ok(!darkContent.includes('{item.name}'), 'DarkMode must not use item.name');
  assert.ok(!lightContent.includes('{bg.name}'), 'LightMode must not use bg.name');
  assert.ok(!darkContent.includes('{bg.name}'), 'DarkMode must not use bg.name');
  console.log('  ✓ getFilenameFromUrl function completely removed');
  console.log('  ✓ item.name and bg.name completely removed from titles\n');

  console.log('▶ [2/4] Verifying sequential numbering format in card loop...');
  assert.ok(lightContent.includes('displayedList.map((item, index)'), 'LightMode map must receive index');
  assert.ok(darkContent.includes('displayedList.map((item, index)'), 'DarkMode map must receive index');
  assert.ok(lightContent.includes('`Wallpaper ${String(index + 1).padStart(2, \'0\')}`'), 'LightMode must generate Wallpaper 01 format');
  assert.ok(darkContent.includes('`Wallpaper ${String(index + 1).padStart(2, \'0\')}`'), 'DarkMode must generate Wallpaper 01 format');
  console.log('  ✓ Sequential label generated: Wallpaper 01, Wallpaper 02, etc.\n');

  console.log('▶ [3/4] Verifying title rendering in JSX container...');
  assert.ok(lightContent.includes('{wallpaperTitle}'), 'LightMode must render {wallpaperTitle}');
  assert.ok(darkContent.includes('{wallpaperTitle}'), 'DarkMode must render {wallpaperTitle}');
  assert.ok(lightContent.includes('truncate line-clamp-1'), 'LightMode title must have truncate and line-clamp-1');
  assert.ok(darkContent.includes('truncate line-clamp-1'), 'DarkMode title must have truncate and line-clamp-1');
  console.log('  ✓ {wallpaperTitle} rendered with truncate & line-clamp-1 styling\n');

  console.log('▶ [4/4] Verifying line parity between Light and Dark components...');
  const lightLines = lightContent.split('\n').length;
  const darkLines = darkContent.split('\n').length;
  assert.strictEqual(lightLines, darkLines, `Line mismatch: Light (${lightLines}) vs Dark (${darkLines})`);
  console.log(`  ✓ 1:1 line count parity verified: ${lightLines} lines\n`);

  console.log('================================================================');
  console.log('   ALL SEQUENTIAL NUMBERING TESTS PASSED (100% SUCCESS)         ');
  console.log('================================================================');
}

testSequentialNaming();

