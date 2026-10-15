import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { curatedWallpapers, generateWallpaperBatch } from '../data/defaultWallpapers';

const WallpaperContext = createContext();

const STORAGE_KEYS = {
  WALLPAPERS: 'momentum_wallpapers',
  INDEX: 'momentum_wallpaper_index',
  AUTO: 'momentum_wallpaper_auto',
  BLUR: 'momentum_wallpaper_blur',
  BATCH_FETCHED_AT: 'momentum_wallpaper_batch_fetched_at',
};

export function WallpaperProvider({ children }) {
  const [wallpapers, setWallpapers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WALLPAPERS);
      if (saved && saved !== 'undefined') {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 30) return parsed;
      }
    } catch (e) {
      console.error('Failed to parse saved wallpapers:', e);
    }
    return curatedWallpapers;
  });

  const [currentIndex, setCurrentIndex] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INDEX);
      if (saved !== null && saved !== 'undefined') {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed < 30) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return 0;
  });

  const [autoDaily, setAutoDaily] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUTO);
      if (saved !== null && saved !== 'undefined') return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return true;
  });

  const [blurLevel, setBlurLevel] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BLUR);
      if (saved !== null && saved !== 'undefined') {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed)) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return 14;
  });

  const [batchFetchedAt, setBatchFetchedAt] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BATCH_FETCHED_AT);
      if (saved !== null && saved !== 'undefined') {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return Date.now();
  });

  const [isOnlineUpdating, setIsOnlineUpdating] = useState(false);

  // Persistence
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WALLPAPERS, JSON.stringify(wallpapers));
    } catch (e) {
      console.error('Storage error:', e);
    }
  }, [wallpapers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INDEX, currentIndex.toString());
    } catch (e) {
      console.error('Storage error:', e);
    }
  }, [currentIndex]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.AUTO, JSON.stringify(autoDaily));
    } catch (e) {
      console.error('Storage error:', e);
    }
  }, [autoDaily]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BLUR, blurLevel.toString());
    } catch (e) {
      console.error('Storage error:', e);
    }
  }, [blurLevel]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BATCH_FETCHED_AT, batchFetchedAt.toString());
    } catch (e) {
      console.error('Storage error:', e);
    }
  }, [batchFetchedAt]);

  const fetchNewOnlinePack = useCallback(async () => {
    setIsOnlineUpdating(true);
    try {
      const newBatchId = 'online-' + Date.now();
      const newWallpapers = generateWallpaperBatch(newBatchId);
      
      // Simulate network response latency for realistic feedback
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const now = Date.now();
      setWallpapers(newWallpapers);
      setCurrentIndex(0);
      setBatchFetchedAt(now);
    } catch (error) {
      console.error('Failed to download new wallpapers', error);
    } finally {
      setIsOnlineUpdating(false);
    }
  }, []);

  // Daily auto-rotation and 30-day auto-refresh logic
  useEffect(() => {
    const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
    const ONE_DAY_MS = 24 * 60 * 60 * 1000;

    const evaluateRotation = () => {
      const now = Date.now();
      const elapsed = now - (batchFetchedAt || now);

      // Auto-refresh when 30 days have elapsed since batch download
      if (elapsed >= THIRTY_DAYS_MS) {
        fetchNewOnlinePack();
        return;
      }

      // Rotate daily through the 30-day collection if enabled
      if (autoDaily && wallpapers.length > 0) {
        const dayNumber = Math.floor(elapsed / ONE_DAY_MS);
        const dayIndex = ((dayNumber % wallpapers.length) + wallpapers.length) % wallpapers.length;
        if (currentIndex !== dayIndex) {
          setCurrentIndex(dayIndex);
        }
      }
    };

    evaluateRotation();
    const interval = setInterval(evaluateRotation, 60 * 60 * 1000); // Check every hour
    return () => clearInterval(interval);
  }, [autoDaily, batchFetchedAt, fetchNewOnlinePack, wallpapers.length]);

  const currentWallpaper = wallpapers[currentIndex] || wallpapers[0] || curatedWallpapers[0];

  return (
    <WallpaperContext.Provider value={{
      wallpapers,
      currentWallpaper,
      currentIndex,
      setCurrentIndex,
      autoDaily,
      setAutoDaily,
      blurLevel,
      setBlurLevel,
      batchFetchedAt,
      isOnlineUpdating,
      fetchNewOnlinePack,
    }}>
      {children}
    </WallpaperContext.Provider>
  );
}

export function useWallpaper() {
  return useContext(WallpaperContext);
}
