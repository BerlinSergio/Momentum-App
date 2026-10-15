import React from 'react';
import { useWallpaper } from '../context/WallpaperContext';

export default function GlobalBackground({ isDarkMode }) {
  const { wallpapers, currentIndex, blurLevel } = useWallpaper();

  const currentWallpaper = wallpapers[currentIndex] || wallpapers[0];

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      {/* Background Image */}
      {currentWallpaper && (
        <img
          src={currentWallpaper.url}
          alt="Background"
          className="w-full h-full object-cover scale-105 transition-transform duration-700 ease-out"
          style={{
            filter: `blur(${blurLevel}px)`,
          }}
        />
      )}
    </div>
  );
}

