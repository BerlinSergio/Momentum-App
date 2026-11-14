const fs = require('fs');

function updateLibraryFile(path, isDark) {
  let content = fs.readFileSync(path, 'utf8').replace(/\r\n/g, '\n');

  // 1. Update import
  const oldImport = "import { BACKGROUND_LIBRARY, getBackgroundById } from './data/defaultWallpapers';";
  const newImport = "import { BACKGROUND_LIBRARY, DOWNLOADED_WALLPAPERS_BATCH, getBackgroundById } from './data/defaultWallpapers';";
  if (!content.includes(oldImport)) {
    console.error(`Could not find oldImport in ${path}`);
    process.exit(1);
  }
  content = content.replace(oldImport, newImport);

  // 2. Add downloadedWallpapers to store selectors & update activeBg
  const oldStoreHook = "  const setCustomWallpaper = useThemeStore((s) => s.setCustomWallpaper);\n  const { setCurrentIndex, autoDaily, setAutoDaily } = useWallpaper();";
  const newStoreHook = "  const setCustomWallpaper = useThemeStore((s) => s.setCustomWallpaper);\n  const downloadedWallpapers = useThemeStore((s) => s.downloadedWallpapers) || [];\n  const { setCurrentIndex, autoDaily, setAutoDaily } = useWallpaper();";
  if (!content.includes(oldStoreHook)) {
    console.error(`Could not find oldStoreHook in ${path}`);
    process.exit(1);
  }
  content = content.replace(oldStoreHook, newStoreHook);

  const oldActiveBg = "  const activeBg = getBackgroundById(activeBackgroundId, customWallpaper);";
  const newActiveBg = "  const activeBg = getBackgroundById(activeBackgroundId, customWallpaper, downloadedWallpapers);";
  if (!content.includes(oldActiveBg)) {
    console.error(`Could not find oldActiveBg in ${path}`);
    process.exit(1);
  }
  content = content.replace(oldActiveBg, newActiveBg);

  // 3. Add Cloud Sanctuary category
  const oldCategories = `  const categories = [
    { id: 'All', label: 'All (30)' },
    { id: 'Atmospheric Skies', label: 'Atmospheric Skies' },
    { id: 'Minarets & Heritage', label: 'Minarets & Heritage' },
    { id: 'Calm Nature', label: 'Calm Nature' },
    { id: 'Abstract Glass', label: 'Abstract Glass' },
  ];`;

  const newCategories = `  const categories = [
    { id: 'All', label: 'All (30)' },
    { id: 'Atmospheric Skies', label: 'Atmospheric Skies' },
    { id: 'Minarets & Heritage', label: 'Minarets & Heritage' },
    { id: 'Calm Nature', label: 'Calm Nature' },
    { id: 'Abstract Glass', label: 'Abstract Glass' },
    { id: 'Cloud Sanctuary', label: 'Cloud Sanctuary (30)' },
  ];`;
  if (!content.includes(oldCategories)) {
    console.error(`Could not find oldCategories in ${path}`);
    process.exit(1);
  }
  content = content.replace(oldCategories, newCategories);

  // 4. Update filtering to handle Cloud Sanctuary
  const oldFiltering = `  const filteredList = activeCategory === 'All'
    ? BACKGROUND_LIBRARY
    : BACKGROUND_LIBRARY.filter((bg) => bg.category === activeCategory);`;

  const newFiltering = `  const activeCloudList = downloadedWallpapers.length > 0 ? downloadedWallpapers : DOWNLOADED_WALLPAPERS_BATCH;
  const filteredList = activeCategory === 'All'
    ? BACKGROUND_LIBRARY
    : activeCategory === 'Cloud Sanctuary'
      ? activeCloudList
      : [...BACKGROUND_LIBRARY, ...activeCloudList].filter((bg) => bg.category === activeCategory);`;
  if (!content.includes(oldFiltering)) {
    console.error(`Could not find oldFiltering in ${path}`);
    process.exit(1);
  }
  content = content.replace(oldFiltering, newFiltering);

  // 5. Update indicator text
  content = content.replace(
    "All 30 wallpapers loaded from Sanctuary Cloud",
    "All 30 wallpapers loaded with Light/Dark pairs"
  );

  fs.writeFileSync(path, content, 'utf8');
  console.log(`Successfully updated ${path}`);
}

updateLibraryFile('src/BackgroundWallpaperLibraryLightMode.jsx', false);
updateLibraryFile('src/BackgroundWallpaperLibraryDarkMode.jsx', true);

