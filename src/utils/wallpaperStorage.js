/**
 * Permanent Device Storage & Image Processing Pipeline for Custom Wallpapers
 * Supports IndexedDB persistence to bypass localStorage 5MB quota limits.
 * Converts File/Blob inputs into persistent compressed Data URLs.
 */

const DB_NAME = 'momentum_wallpaper_db';
const DB_VERSION = 1;
const STORE_NAME = 'wallpapers';

// Coordinate ordinary wallpaper UI writes with journaled cross-database
// restoration across same-origin tabs. The recovery writer uses a separate,
// non-reentrant internal batch API while already holding this lock.
async function withWallpaperWriteLock(operation) {
  const manager = globalThis.navigator?.locks || globalThis.window?.navigator?.locks;
  if (manager?.request) {
    return manager.request('momentum-cross-db-restore-v1', { mode: 'exclusive' }, operation);
  }
  // Cross-DB restores require Web Locks and refuse to run without them;
  // existing standalone wallpaper saves may still work without this API.
  return operation();
}

function openWallpaperDB() {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.indexedDB) return resolve(null);

    let settled = false;
    let timeoutId;
    const finish = (db) => {
      if (settled) return false;
      settled = true;
      clearTimeout(timeoutId);
      resolve(db);
      return true;
    };
    try {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };
      request.onsuccess = () => {
        if (!finish(request.result)) request.result?.close?.();
      };
      request.onerror = () => {
        console.warn('Wallpaper IndexedDB open error:', request.error);
        finish(null);
      };
      request.onblocked = () => {
        console.warn('Wallpaper IndexedDB open blocked');
        finish(null);
      };
      timeoutId = setTimeout(() => {
        console.warn('Wallpaper IndexedDB open timed out');
        finish(null);
      }, 8000);
    } catch (e) {
      console.warn('Wallpaper IndexedDB initialization failed:', e);
      finish(null);
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
  return withWallpaperWriteLock(async () => {
    let db;
    try {
      db = await openWallpaperDB();
      if (!db) return false;
      return await new Promise((resolve) => {
        let tx;
        try {
          tx = db.transaction(STORE_NAME, 'readwrite');
          // A successful put request may still be rolled back by a later
          // transaction abort. Never signal durable success before oncomplete.
          tx.oncomplete = () => resolve(true);
          tx.onabort = () => resolve(false);
          tx.onerror = () => resolve(false);
          tx.objectStore(STORE_NAME).put({ id, dataUrl, meta, updatedAt: Date.now() });
        } catch (err) {
          console.warn('[Momentum Wallpaper] Save failed:', err);
          try { tx?.abort(); } catch { /* inactive */ }
          resolve(false);
        }
      });
    } catch (err) {
      console.warn('[Momentum Wallpaper] Save unavailable:', err);
      return false;
    } finally {
      db?.close?.();
    }
  });
}

/**
 * Retrieve wallpaper from IndexedDB by id
 */
export async function getWallpaperFromIndexedDB(id) {
  return withWallpaperWriteLock(async () => {
    let db;
    try {
      db = await openWallpaperDB();
      if (!db) return null;
      return await new Promise((resolve) => {
        let tx;
        let record = null;
        try {
          tx = db.transaction(STORE_NAME, 'readonly');
          const request = tx.objectStore(STORE_NAME).get(id);
          request.onsuccess = () => { record = request.result || null; };
          request.onerror = () => resolve(null);
          tx.onabort = () => resolve(null);
          tx.oncomplete = () => resolve(record);
        } catch (error) {
          console.warn('[Momentum Wallpaper] Read failed:', error);
          resolve(null);
        }
      });
    } finally {
      db?.close?.();
    }
  });
}

/**
 * Retrieve all custom wallpapers from IndexedDB
 */
export async function getAllCustomWallpapersFromIndexedDB() {
  return withWallpaperWriteLock(async () => {
    let db;
    try {
      db = await openWallpaperDB();
      if (!db) return [];
      return await new Promise((resolve) => {
        let tx;
        let records = [];
        try {
          tx = db.transaction(STORE_NAME, 'readonly');
          const request = tx.objectStore(STORE_NAME).getAll();
          request.onsuccess = () => { records = request.result || []; };
          request.onerror = () => resolve([]);
          tx.onabort = () => resolve([]);
          tx.oncomplete = () => resolve(records);
        } catch (error) {
          console.warn('[Momentum Wallpaper] Bulk read failed:', error);
          resolve([]);
        }
      });
    } finally {
      db?.close?.();
    }
  });
}

/**
 * Strict full-wallpaper snapshot for encrypted backups.
 * UI best-effort reads may return [] on unavailable storage, but backups MUST
 * distinguish a genuinely empty wallpaper table from a failed/blocked read.
 * The connection is closed after the read and late opens are also cleaned up.
 */
export async function getAllCustomWallpapersForBackup(timeoutMs = 20000) {
  let timeoutId;
  const read = (async () => {
    const db = await openWallpaperDB();
    if (!db) throw new Error('Backup aborted: wallpaper IndexedDB is unavailable');
    try {
      return await new Promise((resolve, reject) => {
        try {
          const tx = db.transaction(STORE_NAME, 'readonly');
          const req = tx.objectStore(STORE_NAME).getAll();
          let records = [];
          req.onsuccess = () => { records = req.result || []; };
          req.onerror = () => reject(req.error || new Error('Backup aborted: wallpaper record read failed'));
          tx.onabort = () => reject(tx.error || new Error('Backup aborted: wallpaper read transaction aborted'));
          tx.oncomplete = () => resolve(records);
        } catch (err) {
          reject(err);
        }
      });
    } finally {
      db.close();
    }
  })();

  try {
    return await Promise.race([
      read,
      new Promise((_, reject) => {
        timeoutId = setTimeout(
          () => reject(new Error('Backup aborted: wallpaper database read timed out')),
          timeoutMs
        );
      }),
    ]);
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Restore one or more custom-wallpaper records inside ONE wallpaper-database
 * transaction. All inputs must be staged before opening the transaction.
 */
export async function commitWallpaperRestoreBatch(wallpapers) {
  if (!Array.isArray(wallpapers) ||
      wallpapers.some(wp => !wp || typeof wp.id !== 'string' || !wp.id ||
        typeof wp.dataUrl !== 'string' || !wp.dataUrl) ||
      new Set(wallpapers.map(wp => wp.id)).size !== wallpapers.length) {
    throw new TypeError('Invalid custom wallpaper restore batch');
  }
  if (wallpapers.length === 0) return true;
  const db = await openWallpaperDB();
  if (!db) return false;
  try {
    return await new Promise((resolve) => {
      let tx;
      let done = false;
      const finish = ok => { if (!done) { done = true; resolve(ok); } };
      try {
        tx = db.transaction(STORE_NAME, 'readwrite');
        tx.oncomplete = () => finish(true);
        tx.onerror = () => finish(false);
        tx.onabort = () => finish(false);
        const dest = tx.objectStore(STORE_NAME);
        for (const wp of wallpapers) {
          dest.put({
            id: wp.id, dataUrl: wp.dataUrl, meta: wp.meta || {},
            updatedAt: Date.now(),
          });
        }
      } catch (err) {
        console.warn('[Momentum Wallpaper] Restore batch failed:', err);
        try { tx?.abort(); } catch { /* inactive */ }
        finish(false);
      }
    });
  } finally {
    db.close();
  }
}

/**
 * Reapply the preimage from the durable cross-DB journal.
 * 'previous:null' means the wallpaper did not exist before restore, so delete
 * it. Both update and delete are idempotent and in one wallpaper transaction.
 */
export async function restoreWallpaperPreimage(before) {
  if (!Array.isArray(before) ||
      before.some(item => !item || typeof item.id !== 'string' || !item.id ||
        (item.previous !== null && (!item.previous || item.previous.id !== item.id))) ||
      new Set(before.map(item => item.id)).size !== before.length) {
    throw new TypeError('Invalid wallpaper recovery preimage');
  }
  if (!before.length) return true;
  const db = await openWallpaperDB();
  if (!db) return false;
  try {
    return await new Promise((resolve) => {
      let tx;
      let done = false;
      const finish = ok => { if (!done) { done = true; resolve(ok); } };
      try {
        tx = db.transaction(STORE_NAME, 'readwrite');
        tx.oncomplete = () => finish(true);
        tx.onerror = () => finish(false);
        tx.onabort = () => finish(false);
        const store = tx.objectStore(STORE_NAME);
        for (const { id, previous } of before) {
          if (previous === null) store.delete(id);
          else store.put(previous);
        }
      } catch (err) {
        console.warn('[Momentum Wallpaper] Preimage recovery failed:', err);
        try { tx?.abort(); } catch { /* inactive */ }
        finish(false);
      }
    });
  } finally {
    db.close();
  }
}

/**
 * Delete a custom wallpaper from IndexedDB
 */
export async function deleteWallpaperFromIndexedDB(id) {
  return withWallpaperWriteLock(async () => {
    let db;
    try {
      db = await openWallpaperDB();
      if (!db) return false;
      return await new Promise((resolve) => {
        let tx;
        try {
          tx = db.transaction(STORE_NAME, 'readwrite');
          tx.oncomplete = () => resolve(true);
          tx.onabort = () => resolve(false);
          tx.onerror = () => resolve(false);
          tx.objectStore(STORE_NAME).delete(id);
        } catch (err) {
          console.warn('[Momentum Wallpaper] Delete failed:', err);
          try { tx?.abort(); } catch { /* inactive */ }
          resolve(false);
        }
      });
    } catch (err) {
      console.warn('[Momentum Wallpaper] Delete unavailable:', err);
      return false;
    } finally {
      db?.close?.();
    }
  });
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
