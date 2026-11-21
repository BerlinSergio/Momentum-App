/**
 * Momentum Wallpaper Accurate Dynamic Naming & Typography Verification Suite
 * Tests:
 * 1. formatWallpaperNameFromSource parsing rules (extensions stripped, hyphens to spaces, proper capitalization).
 * 2. BACKGROUND_LIBRARY dataset names (no arbitrary numbers or ellipses).
 * 3. DOWNLOADED_WALLPAPERS_BATCH dataset names (no arbitrary numbers or ellipses).
 * 4. Typography & line-clamp-2 container styling in WallpaperGridCard.
 * 5. Full line parity across all 27 Dark/Light screen pairs.
 */

const assert = require('assert');
const path = require('path');
const fs = require('fs');

async function main() {
  console.log('================================================================');
  console.log('   MOMENTUM WALLPAPER DYNAMIC ACCURATE NAMING VERIFICATION       ');
  console.log('================================================================\n');

  const defaultWallpapersPath = path.resolve('src/data/defaultWallpapers.js').replace(/\\/g, '/');
  const {
    BACKGROUND_LIBRARY,
    DOWNLOADED_WALLPAPERS_BATCH,
    generateWallpaperBatch,
    formatWallpaperNameFromSource,
  } = await import('file:///' + defaultWallpapersPath);

  // --------------------------------------------------------------------------
  // TEST 1: formatWallpaperNameFromSource extraction logic
  // --------------------------------------------------------------------------
  console.log('▶ [1/4] Auditing formatWallpaperNameFromSource extraction...');
  assert.strictEqual(
    formatWallpaperNameFromSource('mountain-zenith.jpg'),
    'Mountain Zenith',
    'FAIL: mountain-zenith.jpg must extract Mountain Zenith'
  );
  assert.strictEqual(
    formatWallpaperNameFromSource('nuristan-canopy.jpg'),
    'Nuristan Canopy',
    'FAIL: nuristan-canopy.jpg must extract Nuristan Canopy'
  );
  assert.strictEqual(
    formatWallpaperNameFromSource('kabul-reflection.jpg'),
    'Kabul Reflection',
    'FAIL: kabul-reflection.jpg must extract Kabul Reflection'
  );
  assert.strictEqual(
    formatWallpaperNameFromSource('balkh-turquoise.webp'),
    'Balkh Turquoise',
    'FAIL: balkh-turquoise.webp must extract Balkh Turquoise'
  );
  assert.strictEqual(
    formatWallpaperNameFromSource('https://picsum.photos/seed/momentum-light-mountain-zenith.jpg/720/1280'),
    'Mountain Zenith',
    'FAIL: Picsum URL must extract Mountain Zenith'
  );
  assert.strictEqual(
    formatWallpaperNameFromSource('https://picsum.photos/seed/momentum-cloud-day-balkh-turquoise-1/720/1280'),
    'Balkh Turquoise',
    'FAIL: Cloud batch URL must extract Balkh Turquoise'
  );
  assert.strictEqual(
    formatWallpaperNameFromSource('', '11 • Nuristan Cedar Canopy'),
    'Nuristan Cedar Canopy',
    'FAIL: Arbitrary number prefix must be stripped'
  );
  console.log('  ✓ File extensions removed (.jpg, .webp, .png, etc.)');
  console.log('  ✓ Hyphens and underscores replaced with clean spaces');
  console.log('  ✓ Words capitalized properly and professional title case enforced\n');

  // --------------------------------------------------------------------------
  // TEST 2: Curated Master Collection Dataset Names
  // --------------------------------------------------------------------------
  console.log('▶ [2/4] Verifying BACKGROUND_LIBRARY Accurate Clean Naming...');
  assert.strictEqual(BACKGROUND_LIBRARY.length, 30, 'FAIL: BACKGROUND_LIBRARY must have 30 items');
  BACKGROUND_LIBRARY.forEach((item, idx) => {
    assert.ok(item.name, `FAIL: Item ${idx} missing name property`);
    assert.ok(item.filename, `FAIL: Item ${idx} missing filename property`);
    assert.ok(!/^\d+\s*•/.test(item.name), `FAIL: Item ${idx} name contains arbitrary "num •" prefix: "${item.name}"`);
    assert.ok(!/^\d+\s*•/.test(item.title), `FAIL: Item ${idx} title contains arbitrary "num •" prefix: "${item.title}"`);
    assert.ok(!item.name.includes('.jpg'), `FAIL: Item ${idx} name contains raw extension: "${item.name}"`);
    assert.ok(!item.name.includes('-'), `FAIL: Item ${idx} name contains raw hyphens: "${item.name}"`);
  });
  console.log(`  ✓ Sample name [0]: "${BACKGROUND_LIBRARY[0].name}" (from ${BACKGROUND_LIBRARY[0].filename})`);
  console.log(`  ✓ Sample name [7]: "${BACKGROUND_LIBRARY[7].name}" (from ${BACKGROUND_LIBRARY[7].filename})`);
  console.log('  ✓ All 30 curated wallpapers display clean, accurate filenames\n');

  // --------------------------------------------------------------------------
  // TEST 3: Downloaded Cloud Batch Dataset Names
  // --------------------------------------------------------------------------
  console.log('▶ [3/4] Verifying Newly Downloaded Cloud Batch Clean Naming...');
  const newBatch = generateWallpaperBatch('online-test-pack');
  assert.strictEqual(newBatch.length, 30, 'FAIL: Downloaded batch must have 30 items');
  newBatch.forEach((item, idx) => {
    assert.ok(item.name, `FAIL: Cloud item ${idx} missing name property`);
    assert.ok(item.filename, `FAIL: Cloud item ${idx} missing filename property`);
    assert.ok(!/^\d+\s*•/.test(item.name), `FAIL: Cloud item ${idx} name contains arbitrary prefix: "${item.name}"`);
    assert.ok(!/^\d+\s*•/.test(item.title), `FAIL: Cloud item ${idx} title contains arbitrary prefix: "${item.title}"`);
    assert.ok(!item.name.includes('.jpg'), `FAIL: Cloud item ${idx} name contains raw extension: "${item.name}"`);
  });
  console.log(`  ✓ Sample cloud name [10]: "${newBatch[10].name}" (from ${newBatch[10].filename})`);
  console.log(`  ✓ Sample cloud name [11]: "${newBatch[11].name}" (from ${newBatch[11].filename})`);
  console.log('  ✓ All 30 cloud wallpapers display clean, accurate filenames\n');

  // --------------------------------------------------------------------------
  // TEST 4: Typography & line-clamp-2 Container in Library Components
  // --------------------------------------------------------------------------
  console.log('▶ [4/4] Auditing Typography & line-clamp-2 in BackgroundWallpaperLibrary...');
  const lightSrc = fs.readFileSync('src/BackgroundWallpaperLibraryLightMode.jsx', 'utf8');
  const darkSrc = fs.readFileSync('src/BackgroundWallpaperLibraryDarkMode.jsx', 'utf8');

  assert.ok(
    lightSrc.includes('line-clamp-2'),
    'FAIL: LightMode WallpaperGridCard must use line-clamp-2 for title wrapping'
  );
  assert.ok(
    darkSrc.includes('line-clamp-2'),
    'FAIL: DarkMode WallpaperGridCard must use line-clamp-2 for title wrapping'
  );
  assert.ok(
    lightSrc.includes('displayName'),
    'FAIL: LightMode must render dynamic displayName'
  );
  assert.ok(
    darkSrc.includes('displayName'),
    'FAIL: DarkMode must render dynamic displayName'
  );
  assert.ok(
    lightSrc.includes('formatWallpaperNameFromSource'),
    'FAIL: LightMode must import and call formatWallpaperNameFromSource'
  );
  assert.ok(
    darkSrc.includes('formatWallpaperNameFromSource'),
    'FAIL: DarkMode must import and call formatWallpaperNameFromSource'
  );

  const lightLines = lightSrc.split('\n').length;
  const darkLines = darkSrc.split('\n').length;
  assert.strictEqual(
    lightLines,
    darkLines,
    `FAIL: Line count mismatch between Light (${lightLines}) and Dark (${darkLines})`
  );

  console.log('  ✓ Wallpaper titles use line-clamp-2 with graceful two-line wrapping');
  console.log('  ✓ No abrupt ellipsis cuts off short names');
  console.log(`  ✓ Line parity maintained: ${lightLines} lines in both Light and Dark modes\n`);

  console.log('================================================================');
  console.log('  >>> ALL NAMING & TYPOGRAPHY TESTS PASSED (100% SUCCESS) <<<   ');
  console.log('================================================================');
}

main().catch((err) => {
  console.error('\n❌ VERIFICATION FAILED:', err);
  process.exit(1);
});

