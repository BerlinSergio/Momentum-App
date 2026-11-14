const fs = require('fs');
const path = 'src/components/GlobalBackground.jsx';

const newCode = `import React from 'react';
import { useWallpaper } from '../context/WallpaperContext';
import { useThemeStore } from '../store/useThemeStore';
import { getBackgroundById } from '../data/defaultWallpapers';

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

  const lightImage = bg.lightImage || bg.lightUrl || bg.thumbnail || bg.url;
  const darkImage = bg.darkImage || bg.darkUrl || bg.thumbnail || bg.url;

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none select-none">
      {/* Light Mode Layer: strictly active in Light Mode */}
      <img
        src={lightImage}
        alt={\`\${bg.name || bg.title || "Background"} Light Mode\`}
        className={\`absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-500 ease-in-out \${
          isDarkMode ? 'opacity-0' : 'opacity-100'
        }\`}
        style={{
          filter: \`blur(\${blurIntensity}px)\`,
        }}
      />
      {/* Dark Mode Layer: smoothly cross-fades into matching dark variant when Dark Mode is active */}
      <img
        src={darkImage}
        alt={\`\${bg.name || bg.title || "Background"} Dark Mode\`}
        className={\`absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-500 ease-in-out \${
          isDarkMode ? 'opacity-100' : 'opacity-0'
        }\`}
        style={{
          filter: \`blur(\${blurIntensity}px)\`,
        }}
      />
    </div>
  );
}
`;

fs.writeFileSync(path, newCode, 'utf8');
console.log("Successfully updated GlobalBackground.jsx!");

