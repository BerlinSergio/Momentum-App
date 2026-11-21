/**
 * Permanent Device Storage & Image Processing Pipeline for Custom Wallpapers
 * Supports IndexedDB persistence to bypass localStorage 5MB quota limits.
 * Converts File/Blob inputs into persistent compressed Data URLs.
 */

const DB_NAME = 'momentum_wallpaper_db';
const DB_VERSION = 1;
const STORE_NAME = 'wallpapers';

function openWallpaperDB() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return resolve(null);
    }
    try {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => {
        console.warn('IndexedDB open error:', request.error);
        resolve(null);
      };
    } catch (e) {
      console.warn('IndexedDB initialization failed:', e);
      resolve(null);
    }
  });
}

/**
 * Process an uploaded image File, Blob, or URL through an HTML5 canvas:
 * Resizes to max dimension (default 1920px) and compresses to WebP/JPEG (default quality 0.82)
 * Returns { dataUrl, thumbnailUrl, width, height }
 */
export async function processImageForStorage(fileOrUrl, maxDimension = 1920, quality = 0.82) {
  if (typeof window === 'undefined') {
    return { dataUrl: fileOrUrl, thumbnailUrl: fileOrUrl, width: 720, height: 1280 };
  }

  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        let width = img.naturalWidth || img.width || 1280;
        let height = img.naturalHeight || img.height || 720;

        // 1. Calculate scaled dimensions for high-res wallpaper
        let targetWidth = width;
        let targetHeight = height;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            targetHeight = Math.round((height * maxDimension) / width);
            targetWidth = maxDimension;
          } else {
            targetWidth = Math.round((width * maxDimension) / height);
            targetHeight = maxDimension;
          }
        }

        // Draw full-res canvas
        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        }

        let fullDataUrl;
        try {
          fullDataUrl = canvas.toDataURL('image/webp', quality);
          if (!fullDataUrl.startsWith('data:image/webp')) {
            fullDataUrl = canvas.toDataURL('image/jpeg', quality);
          }
        } catch {
          fullDataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        // 2. Generate fast lightweight thumbnail (max 480px)
        const thumbCanvas = document.createElement('canvas');
        const thumbRatio = Math.min(1, 480 / Math.max(targetWidth, targetHeight));
        thumbCanvas.width = Math.round(targetWidth * thumbRatio);
        thumbCanvas.height = Math.round(targetHeight * thumbRatio);
        const thumbCtx = thumbCanvas.getContext('2d');
        if (thumbCtx) {
          thumbCtx.imageSmoothingEnabled = true;
          thumbCtx.drawImage(canvas, 0, 0, thumbCanvas.width, thumbCanvas.height);
        }

        let thumbnailUrl;
        try {
          thumbnailUrl = thumbCanvas.toDataURL('image/jpeg', 0.72);
        } catch {
          thumbnailUrl = fullDataUrl;
        }

        resolve({
          dataUrl: fullDataUrl,
          thumbnailUrl,
          width: targetWidth,
          height: targetHeight,
        });
      } catch (err) {
        console.error('Canvas processing error:', err);
        // Fallback to reading file directly as DataURL if canvas fails
        if (typeof fileOrUrl !== 'string') {
          const reader = new FileReader();
          reader.onload = (e) => resolve({
            dataUrl: e.target?.result || '',
            thumbnailUrl: e.target?.result || '',
            width: 1280,
            height: 720,
          });
          reader.onerror = reject;
          reader.readAsDataURL(fileOrUrl);
        } else {
          resolve({ dataUrl: fileOrUrl, thumbnailUrl: fileOrUrl, width: 1280, height: 720 });
        }
      }
    };

    img.onerror = (err) => {
      console.warn('Image load error during canvas processing:', err);
      if (typeof fileOrUrl !== 'string') {
        const reader = new FileReader();
        reader.onload = (e) => resolve({
          dataUrl: e.target?.result || '',
          thumbnailUrl: e.target?.result || '',
          width: 1280,
          height: 720,
        });
        reader.onerror = reject;
        reader.readAsDataURL(fileOrUrl);
      } else {
        resolve({ dataUrl: fileOrUrl, thumbnailUrl: fileOrUrl, width: 1280, height: 720 });
      }
    };

    if (typeof fileOrUrl === 'string') {
      img.src = fileOrUrl;
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(fileOrUrl);
    }
  });
}

/**
 * Persist wallpaper binary/DataURL to IndexedDB
 */
export async function saveWallpaperToIndexedDB(id, dataUrl, meta = {}) {
  try {
    const db = await openWallpaperDB();
    if (!db) return false;

    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const record = {
        id,
        dataUrl,
        meta,
        updatedAt: Date.now(),
      };
      const req = store.put(record);
      req.onsuccess = () => resolve(true);
      req.onerror = () => {
        console.warn('Failed to save to IndexedDB:', req.error);
        resolve(false);
      };
    });
  } catch (e) {
    console.warn('IndexedDB write exception:', e);
    return false;
  }
}

/**
 * Retrieve wallpaper from IndexedDB by id
 */
export async function getWallpaperFromIndexedDB(id) {
  try {
    const db = await openWallpaperDB();
    if (!db) return null;

    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(id);
      req.onsuccess = () => {
        resolve(req.result || null);
      };
      req.onerror = () => {
        console.warn('Failed to read from IndexedDB:', req.error);
        resolve(null);
      };
    });
  } catch (e) {
    console.warn('IndexedDB read exception:', e);
    return null;
  }
}

/**
 * Retrieve all custom wallpapers from IndexedDB
 */
export async function getAllCustomWallpapersFromIndexedDB() {
  try {
    const db = await openWallpaperDB();
    if (!db) return [];

    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });
  } catch {
    return [];
  }
}

/**
 * Delete a custom wallpaper from IndexedDB
 */
export async function deleteWallpaperFromIndexedDB(id) {
  try {
    const db = await openWallpaperDB();
    if (!db) return false;

    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(id);
      req.onsuccess = () => resolve(true);
      req.onerror = () => resolve(false);
    });
  } catch {
    return false;
  }
}

/**
 * Startup sanity check and migration:
 * - Detects and cleans up ephemeral `blob:` URLs in localStorage that expire on reload
 * - Restores persisted wallpaper Data URLs from IndexedDB
 */
export async function sanitizeAndHydrateWallpaperStorage(useThemeStoreInstance) {
  if (typeof window === 'undefined') return;

  try {
    const raw = localStorage.getItem('momentum_appearance_settings_v1');
    if (raw) {
      const parsed = JSON.parse(raw);
      let needsFix = false;

      // 1. Check if customWallpaper is a dead blob URL
      if (typeof parsed?.state?.customWallpaper === 'string' && parsed.state.customWallpaper.startsWith('blob:')) {
        console.warn('Found expired blob: customWallpaper in localStorage. Purging and recovering...');
        parsed.state.customWallpaper = null;
        if (parsed.state.activeBackgroundId === 'custom') {
          parsed.state.activeBackgroundId = 'bg-04-serene-horizon';
        }
        needsFix = true;
      }

      // 2. Check if activeBackgroundId is a blob URL
      if (typeof parsed?.state?.activeBackgroundId === 'string' && parsed.state.activeBackgroundId.startsWith('blob:')) {
        parsed.state.activeBackgroundId = 'bg-04-serene-horizon';
        needsFix = true;
      }

      if (needsFix) {
        localStorage.setItem('momentum_appearance_settings_v1', JSON.stringify(parsed));
      }
    }
  } catch (err) {
    console.warn('Storage sanitization warning:', err);
  }

  // 3. Try to hydrate custom wallpaper from IndexedDB if activeBackgroundId === 'custom'
  try {
    const savedCustom = await getWallpaperFromIndexedDB('custom_active');
    if (savedCustom && savedCustom.dataUrl) {
      if (useThemeStoreInstance && typeof useThemeStoreInstance.getState === 'function') {
        const state = useThemeStoreInstance.getState();
        if (!state.customWallpaper || state.customWallpaper.startsWith('blob:')) {
          useThemeStoreInstance.setState({
            customWallpaper: savedCustom.dataUrl,
            customWallpaperThumbnail: savedCustom.meta?.thumbnailUrl || savedCustom.dataUrl,
          });
        }
      }
    }
  } catch (err) {
    console.warn('IndexedDB hydration error:', err);
  }
}
