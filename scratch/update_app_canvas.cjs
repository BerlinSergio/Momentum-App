const fs = require('fs');
const path = 'src/App.jsx';
let content = fs.readFileSync(path, 'utf8');

const normalized = content.replace(/\r\n/g, '\n');

const oldCanvas = `function PhoneWallpaperCanvas({ isDarkMode, activeTab }) {
  const { currentWallpaper } = useWallpaper();
  const activeBackgroundId = useThemeStore((s) => s.activeBackgroundId);
  const customWallpaper = useThemeStore((s) => s.customWallpaper);
  const blurIntensity = useThemeStore((s) => s.blurIntensity) ?? 18;
  const dimWallpaper = useThemeStore((s) => s.dimWallpaper) ?? true;

  const bg = getBackgroundById(activeBackgroundId, customWallpaper) || currentWallpaper;
  if (activeTab.includes('splash_screen') || !bg) return null;

  const bgUrl = isDarkMode ? (bg.darkImage || bg.darkUrl || bg.url) : (bg.lightImage || bg.lightUrl || bg.url);
  const fallbackUrl = bg.fallback || bg.lightImage || bg.lightUrl || bg.url;


  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
      <img
        src={bgUrl}
        alt={bg.name || bg.title || "Active Wallpaper"}
        onError={(e) => {
          if (fallbackUrl && e.target.src !== fallbackUrl) {
            e.target.src = fallbackUrl;
          }
        }}
        className="w-full h-full object-cover transition-all duration-300 scale-105"
        style={{ filter: \`blur(\${blurIntensity}px)\` }}
      />
      {/* Dark Mode Wallpaper Dimming Overlay: strictly for Dark Mode screens, directly on top of wallpaper, behind UI */}
      <div 
        className={\`absolute inset-0 bg-black/50 transition-opacity duration-300 pointer-events-none \${
          isDarkMode && dimWallpaper ? 'opacity-100' : 'opacity-0'
        }\`}
      />
    </div>
  );
}`;

const newCanvas = `function PhoneWallpaperCanvas({ isDarkMode, activeTab }) {
  const { currentWallpaper } = useWallpaper();
  const activeBackgroundId = useThemeStore((s) => s.activeBackgroundId);
  const customWallpaper = useThemeStore((s) => s.customWallpaper);
  const downloadedWallpapers = useThemeStore((s) => s.downloadedWallpapers);
  const blurIntensity = useThemeStore((s) => s.blurIntensity) ?? 18;
  const dimWallpaper = useThemeStore((s) => s.dimWallpaper) ?? true;

  const bg = getBackgroundById(activeBackgroundId, customWallpaper, downloadedWallpapers) || currentWallpaper;
  if (activeTab.includes('splash_screen') || !bg) return null;

  // Global Theme Sync Engine: Strict Light/Dark paired image resolution
  const lightImage = bg.lightImage || bg.lightUrl || bg.thumbnail || bg.url;
  const darkImage = bg.darkImage || bg.darkUrl || bg.thumbnail || bg.url;
  const fallbackUrl = bg.fallback || lightImage;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* Light Mode Layer: strictly visible when Light Mode is active */}
      <img
        src={lightImage}
        alt={\`\${bg.name || bg.title || "Active Wallpaper"} Light Mode\`}
        onError={(e) => {
          if (fallbackUrl && e.target.src !== fallbackUrl) {
            e.target.src = fallbackUrl;
          }
        }}
        className={\`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out scale-105 \${
          isDarkMode ? 'opacity-0' : 'opacity-100'
        }\`}
        style={{ filter: \`blur(\${blurIntensity}px)\` }}
      />
      {/* Dark Mode Layer: smoothly cross-fades into the exact matching dark variant when Dark Mode is active */}
      <img
        src={darkImage}
        alt={\`\${bg.name || bg.title || "Active Wallpaper"} Dark Mode\`}
        onError={(e) => {
          if (fallbackUrl && e.target.src !== fallbackUrl) {
            e.target.src = fallbackUrl;
          }
        }}
        className={\`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out scale-105 \${
          isDarkMode ? 'opacity-100' : 'opacity-0'
        }\`}
        style={{ filter: \`blur(\${blurIntensity}px)\` }}
      />
      {/* Dark Mode Wallpaper Dimming Overlay: strictly for Dark Mode screens, directly on top of wallpaper, behind UI */}
      <div 
        className={\`absolute inset-0 bg-black/50 transition-opacity duration-300 pointer-events-none \${
          isDarkMode && dimWallpaper ? 'opacity-100' : 'opacity-0'
        }\`}
      />
    </div>
  );
}`;

if (!normalized.includes(oldCanvas)) {
  console.error("Could not find oldCanvas in App.jsx!");
  process.exit(1);
}

const updated = normalized.replace(oldCanvas, newCanvas);
fs.writeFileSync(path, updated, 'utf8');
console.log("Successfully updated PhoneWallpaperCanvas in App.jsx!");

