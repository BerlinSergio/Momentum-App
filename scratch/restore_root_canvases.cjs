const fs = require('fs');

// 1. Restore PhoneWallpaperCanvas in App.jsx
const appPath = 'src/App.jsx';
let appContent = fs.readFileSync(appPath, 'utf8').replace(/\r\n/g, '\n');

const currentAppCanvasRegex = /function PhoneWallpaperCanvas[\s\S]*?^}/m;

const stableAppCanvas = `function PhoneWallpaperCanvas({ isDarkMode, activeTab }) {
  const { currentWallpaper } = useWallpaper();
  const activeBackgroundId = useThemeStore((s) => s.activeBackgroundId);
  const customWallpaper = useThemeStore((s) => s.customWallpaper);
  const downloadedWallpapers = useThemeStore((s) => s.downloadedWallpapers);
  const blurIntensity = useThemeStore((s) => s.blurIntensity) ?? 18;
  const dimWallpaper = useThemeStore((s) => s.dimWallpaper) ?? true;

  const bg = getBackgroundById(activeBackgroundId, customWallpaper, downloadedWallpapers) || currentWallpaper;
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

appContent = appContent.replace(currentAppCanvasRegex, stableAppCanvas);
fs.writeFileSync(appPath, appContent, 'utf8');
console.log("Successfully restored PhoneWallpaperCanvas in App.jsx!");

// 2. Restore GlobalBackground.jsx
const bgPath = 'src/components/GlobalBackground.jsx';
const stableBg = `import React from 'react';
import { useWallpaper } from '../context/WallpaperContext';
import { useThemeStore } from '../store/useThemeStore';
import { getBackgroundById } from '../data/defaultWallpapers.js';

export default function GlobalBackground({ isDarkMode }) {
  const { wallpapers, currentIndex } = useWallpaper();
  const activeBackgroundId = useThemeStore((s) => s.activeBackgroundId);
  const customWallpaper = useThemeStore((s) => s.customWallpaper);
  const downloadedWallpapers = useThemeStore((s) => s.downloadedWallpapers);
  const blurIntensity = useThemeStore((s) => s.blurIntensity) ?? 18;

  const activeBg = getBackgroundById(activeBackgroundId, customWallpaper, downloadedWallpapers);
  const fallbackBg = wallpapers[currentIndex] || wallpapers[0];
  const bg = activeBg || fallbackBg;

  if (!bg) return null;

  const bgUrl = isDarkMode ? (bg.darkImage || bg.darkUrl || bg.url) : (bg.lightImage || bg.lightUrl || bg.url);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      <img
        src={bgUrl}
        alt={bg.name || bg.title || "Background"}
        className="w-full h-full object-cover scale-105 transition-transform duration-700 ease-out"
        style={{
          filter: \`blur(\${blurIntensity}px)\`,
        }}
      />
    </div>
  );
}
`;

fs.writeFileSync(bgPath, stableBg, 'utf8');
console.log("Successfully restored GlobalBackground.jsx!");

