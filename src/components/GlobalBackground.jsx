import React from 'react';
import { useWallpaper } from '../context/WallpaperContext';
import { useThemeStore } from '../store/useThemeStore';
import { BACKGROUND_LIBRARY, getWallpaperPair } from '../data/defaultWallpapers.js';

export default function GlobalBackground({ isDarkMode }) {
  const activeBackgroundId = useThemeStore((s) => s.activeBackgroundId);
  const customWallpaper = useThemeStore((s) => s.customWallpaper);
  const storeWallpapers = useThemeStore((s) => s.wallpapers);
  const downloadedWallpapers = useThemeStore((s) => s.downloadedWallpapers);
  const blurIntensity = useThemeStore((s) => s.blurIntensity) ?? 18;

  if (activeBackgroundId === 'none') {
    return (
      <div 
        className={`fixed inset-0 -z-50 pointer-events-none transition-colors duration-500 ${
          isDarkMode ? 'bg-[#090D16]' : 'bg-[#F8FAFC]'
        }`}
      />
    );
  }

  const wallpapers = storeWallpapers || downloadedWallpapers || BACKGROUND_LIBRARY;
  const bgPair = getWallpaperPair(activeBackgroundId, customWallpaper, isDarkMode, wallpapers);
  const currentBgImage = bgPair.activeImage;
  const activeGradient = isDarkMode 
    ? (bgPair.bg?.darkGradient || 'linear-gradient(135deg, #090D16 0%, #1e293b 100%)') 
    : (bgPair.bg?.lightGradient || 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)');

  return (
    <div 
      className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-cover bg-center transition-all duration-700 ease-out scale-105"
      style={{
        backgroundImage: currentBgImage ? `url("${currentBgImage}"), ${activeGradient}` : activeGradient,
        backgroundColor: isDarkMode ? '#090D16' : '#F8FAFC',
        filter: `blur(${blurIntensity}px)`,
      }}
    />
  );
}
