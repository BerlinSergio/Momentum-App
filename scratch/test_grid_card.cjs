const assert = require('assert');
const fs = require('fs');

console.log('Testing WallpaperGridCard implementation in BackgroundWallpaperLibrary files...');

['BackgroundWallpaperLibraryDarkMode.jsx', 'BackgroundWallpaperLibraryLightMode.jsx'].forEach(file => {
  const content = fs.readFileSync('src/' + file, 'utf8');

  // 1. Check WallpaperGridCard existence
  assert.ok(content.includes('function WallpaperGridCard'), `FAIL: WallpaperGridCard missing in ${file}`);

  // 2. Check local previewMode state
  assert.ok(content.includes('const [previewMode, setPreviewMode] = useState'), `FAIL: previewMode useState missing in ${file}`);

  // 3. Check e.stopPropagation() in badge onClick
  assert.ok(content.includes('e.stopPropagation()'), `FAIL: e.stopPropagation() missing in badge onClick in ${file}`);

  // 4. Check dynamic thumbnail swap logic
  assert.ok(content.includes('thumbnailSrc = previewMode === \'light\''), `FAIL: thumbnailSrc swap logic missing in ${file}`);

  // 5. Check visual indicator for active preview state
  assert.ok(content.includes('wb_sunny'), `FAIL: Sun icon missing in ${file}`);
  assert.ok(content.includes('bedtime'), `FAIL: Moon icon missing in ${file}`);
  assert.ok(content.includes('opacity-100'), `FAIL: opacity-100 missing in ${file}`);
  assert.ok(content.includes('opacity-40'), `FAIL: opacity-40 missing in ${file}`);

  // 6. Check cursor-pointer and hover styling
  assert.ok(content.includes('cursor-pointer'), `FAIL: cursor-pointer missing in ${file}`);

  console.log(`✓ ${file} passed all verification checks!`);
});

console.log('\n>>> ALL WALLPAPER GRID CARD PREVIEW TOGGLE TESTS PASSED 100%! <<<');

