import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  BACKGROUND_LIBRARY,
  DOWNLOADED_WALLPAPERS_BATCH,
  generateWallpaperBatch,
  getBackgroundById,
  getWallpaperPair,
  NONE_WALLPAPER,
} from '../data/defaultWallpapers.js';
import {
  saveWallpaperToIndexedDB,
  sanitizeAndHydrateWallpaperStorage,
} from '../utils/wallpaperStorage.js';

export const AURA_PRESETS = {
  indigo: {
    id: 'indigo',
    name: 'Luminous Indigo',
    label: 'Indigo',
    hex: '#4f46e5',
    hoverHex: '#4338ca',
    glow: 'rgba(79, 70, 229, 0.35)',
    light: {
      primary: '#4f46e5',
      primaryContainer: '#6366f1',
      tint: '#4f46e5',
      glow: 'rgba(79, 70, 229, 0.25)',
    },
    dark: {
      primary: '#6366f1',
      primaryContainer: '#4f46e5',
      tint: '#818cf8',
      glow: 'rgba(99, 102, 241, 0.35)',
    },
  },
  oasis: {
    id: 'oasis',
    name: 'Emerald Oasis',
    label: 'Oasis',
    hex: '#059669',
    hoverHex: '#047857',
    glow: 'rgba(5, 150, 105, 0.35)',
    light: {
      primary: '#059669',
      primaryContainer: '#10b981',
      tint: '#059669',
      glow: 'rgba(5, 150, 105, 0.25)',
    },
    dark: {
      primary: '#10b981',
      primaryContainer: '#059669',
      tint: '#34d399',
      glow: 'rgba(16, 185, 129, 0.35)',
    },
  },
  dawn: {
    id: 'dawn',
    name: 'Amber Dawn',
    label: 'Dawn',
    hex: '#d97706',
    hoverHex: '#b45309',
    glow: 'rgba(217, 119, 6, 0.35)',
    light: {
      primary: '#d97706',
      primaryContainer: '#f59e0b',
      tint: '#d97706',
      glow: 'rgba(217, 119, 6, 0.25)',
    },
    dark: {
      primary: '#f59e0b',
      primaryContainer: '#d97706',
      tint: '#fbbf24',
      glow: 'rgba(245, 158, 11, 0.35)',
    },
  },
  rose: {
    id: 'rose',
    name: 'Twilight Rose',
    label: 'Rose',
    hex: '#e11d48',
    hoverHex: '#be123c',
    glow: 'rgba(225, 29, 72, 0.35)',
    light: {
      primary: '#e11d48',
      primaryContainer: '#f43f5e',
      tint: '#e11d48',
      glow: 'rgba(225, 29, 72, 0.25)',
    },
    dark: {
      primary: '#f43f5e',
      primaryContainer: '#e11d48',
      tint: '#fb7185',
      glow: 'rgba(244, 63, 94, 0.35)',
    },
  },
  cyan: {
    id: 'cyan',
    name: 'Celestial Cyan',
    label: 'Cyan',
    hex: '#0891b2',
    hoverHex: '#0e7490',
    glow: 'rgba(8, 145, 178, 0.35)',
    light: {
      primary: '#0891b2',
      primaryContainer: '#06b6d4',
      tint: '#0891b2',
      glow: 'rgba(8, 145, 178, 0.25)',
    },
    dark: {
      primary: '#06b6d4',
      primaryContainer: '#0891b2',
      tint: '#22d3ee',
      glow: 'rgba(6, 182, 212, 0.35)',
    },
  },
};

export function applyAppearanceToDOM(state) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const theme = state.theme || 'light';
  const aura = state.aura || 'indigo';
  const glassEffects = state.glassEffects !== false;
  const gentleTransitions = state.gentleTransitions !== false;
  const blurIntensity = state.blurIntensity !== undefined ? state.blurIntensity : 18;
  const syncWithDarkMode = state.syncWithDarkMode !== false;
  const dimWallpaper = state.dimWallpaper !== false;

  // 1. Resolve dark/light mode
  let isDark = theme === 'dark';
  if (theme === 'system' && typeof window !== 'undefined') {
    isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  try {
    localStorage.setItem('momentum_theme', isDark ? 'dark' : 'light');
  } catch {
    // ignore
  }

  // 2. Set Aura CSS variables and root attributes
  const preset = AURA_PRESETS[aura] || AURA_PRESETS.indigo;
  const colors = isDark ? preset.dark : preset.light;

  root.style.setProperty('--color-primary', colors.primary);
  // Derive RGB channels so Tailwind opacity modifiers (bg-primary/10) work in v3
  const hexToRgbChannels = (hex) => {
    const h = hex.replace('#', '');
    return parseInt(h.slice(0, 2), 16) + ' ' + parseInt(h.slice(2, 4), 16) + ' ' + parseInt(h.slice(4, 6), 16);
  };
  root.style.setProperty('--color-primary-rgb', hexToRgbChannels(colors.primary));
  root.style.setProperty('--color-primary-container', colors.primaryContainer);
  root.style.setProperty('--color-surface-tint', colors.tint);
  root.style.setProperty('--aura-hex', preset.hex);
  root.style.setProperty('--aura-hover', preset.hoverHex);
  root.style.setProperty('--aura-glow', preset.glow);

  ['theme-indigo', 'theme-oasis', 'theme-dawn', 'theme-rose', 'theme-cyan'].forEach((cls) =>
    root.classList.remove(cls)
  );
  root.classList.add(`theme-${aura}`);
  root.setAttribute('data-aura', aura);

  // 3. Glass effects toggle
  root.setAttribute('data-glass', glassEffects ? 'true' : 'false');
  if (!glassEffects) {
    root.classList.add('disable-glass');
    root.classList.remove('enable-glass');
  } else {
    root.classList.remove('disable-glass');
    root.classList.add('enable-glass');
  }

  // 4. Transitions toggle
  root.setAttribute('data-transitions', gentleTransitions ? 'true' : 'false');
  if (!gentleTransitions) {
    root.classList.add('disable-transitions');
    root.classList.remove('enable-transitions');
  } else {
    root.classList.remove('disable-transitions');
    root.classList.add('enable-transitions');
  }

  // 5. Blur intensity & Dark mode sync
  let effectiveBlur = blurIntensity;
  if (syncWithDarkMode && isDark) {
    effectiveBlur = Math.min(48, Math.round(blurIntensity * 1.25));
  }

  root.style.setProperty('--blur-intensity', `${effectiveBlur}px`);
  root.style.setProperty('--backdrop-blur-raw', `${effectiveBlur}px`);
  root.setAttribute('data-blur-intensity', String(effectiveBlur));
  root.setAttribute('data-dim-wallpaper', dimWallpaper ? 'true' : 'false');
  root.setAttribute('data-active-background', state.activeBackgroundId || 'bg-04-serene-horizon');
  if (state.activeBackgroundId === 'none') {
    root.style.setProperty('--app-solid-background', isDark ? '#090D16' : '#FFFFFF');
  } else {
    root.style.removeProperty('--app-solid-background');
  }
}

export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: 'light',
      aura: 'indigo',
      glassEffects: true,
      gentleTransitions: true,
      blurIntensity: 18,
      syncWithDarkMode: true,
      dimWallpaper: true,
      activeBackgroundId: 'bg-04-serene-horizon',
      customWallpaper: null,
      wallpapers: BACKGROUND_LIBRARY,
      downloadedWallpapers: DOWNLOADED_WALLPAPERS_BATCH,
      _hasHydrated: false,

      setHasHydrated: (hasHydrated) =>
        set((state) => ({
          ...state,
          _hasHydrated: hasHydrated,
        })),

      setTheme: (theme) =>
        set((state) => {
          const next = { ...state, theme };
          applyAppearanceToDOM(next);
          return next;
        }),

      setAura: (aura) =>
        set((state) => {
          const next = { ...state, aura };
          applyAppearanceToDOM(next);
          return next;
        }),

      setGlassEffects: (glassEffects) =>
        set((state) => {
          const next = { ...state, glassEffects };
          applyAppearanceToDOM(next);
          return next;
        }),

      setGentleTransitions: (gentleTransitions) =>
        set((state) => {
          const next = { ...state, gentleTransitions };
          applyAppearanceToDOM(next);
          return next;
        }),

      setBlurIntensity: (blurIntensity) =>
        set((state) => {
          const next = { ...state, blurIntensity };
          applyAppearanceToDOM(next);
          return next;
        }),

      setSyncWithDarkMode: (syncWithDarkMode) =>
        set((state) => {
          const next = { ...state, syncWithDarkMode };
          applyAppearanceToDOM(next);
          return next;
        }),

      setDimWallpaper: (dimWallpaper) =>
        set((state) => {
          const next = { ...state, dimWallpaper };
          applyAppearanceToDOM(next);
          return next;
        }),

      setActiveBackgroundId: (activeBackgroundId) =>
        set((state) => {
          const next = { ...state, activeBackgroundId };
          applyAppearanceToDOM(next);
          return next;
        }),

      setCustomWallpaper: (customWallpaper) => {
        if (typeof window !== 'undefined' && customWallpaper && typeof customWallpaper === 'string' && customWallpaper.startsWith('data:')) {
          try {
            saveWallpaperToIndexedDB('custom_active', customWallpaper, {
              updatedAt: Date.now(),
              name: 'Custom Upload',
            });
          } catch (err) {
            console.warn('IndexedDB write error:', err);
          }
        }
        set((state) => {
          const next = { ...state, activeBackgroundId: 'custom', customWallpaper };
          applyAppearanceToDOM(next);
          return next;
        });
      },

      setWallpapers: (wallpapers) =>
        set((state) => {
          const list = Array.isArray(wallpapers) ? wallpapers : state.wallpapers;
          return {
            ...state,
            wallpapers: list,
            downloadedWallpapers: list,
          };
        }),

      setDownloadedWallpapers: (downloadedWallpapers) =>
        set((state) => {
          const list = Array.isArray(downloadedWallpapers) ? downloadedWallpapers : state.downloadedWallpapers;
          return {
            ...state,
            wallpapers: list,
            downloadedWallpapers: list,
          };
        }),

      loadDownloadedBatch: (batchPrefix) =>
        set((state) => {
          const nextBatch = generateWallpaperBatch(batchPrefix || `cloud-batch-${Date.now()}`);
          return { ...state, wallpapers: nextBatch, downloadedWallpapers: nextBatch };
        }),

      getActiveWallpaperPair: (isDarkMode) => {
        const state = get();
        return getWallpaperPair(state.activeBackgroundId, state.customWallpaper, isDarkMode, state.wallpapers || state.downloadedWallpapers);
      },

      getActiveWallpaper: (isDarkMode) => {
        const state = get();
        if (state.activeBackgroundId === 'none') {
          return { activeWallpaper: NONE_WALLPAPER, currentBgImage: null };
        }
        const pair = getWallpaperPair(state.activeBackgroundId, state.customWallpaper, isDarkMode, state.wallpapers || state.downloadedWallpapers);
        return { activeWallpaper: pair.bg, currentBgImage: pair.activeImage };
      },

      applyPreferences: (prefs) =>
        set((state) => {
          const next = {
            ...state,
            theme: prefs.theme || state.theme,
            aura: prefs.aura || state.aura,
            glassEffects: prefs.glassEffects !== undefined ? prefs.glassEffects : state.glassEffects,
            gentleTransitions: prefs.gentleTransitions !== undefined ? prefs.gentleTransitions : state.gentleTransitions,
            blurIntensity: prefs.blurIntensity !== undefined ? prefs.blurIntensity : state.blurIntensity,
            syncWithDarkMode: prefs.syncWithDarkMode !== undefined ? prefs.syncWithDarkMode : state.syncWithDarkMode,
            dimWallpaper: prefs.dimWallpaper !== undefined ? prefs.dimWallpaper : state.dimWallpaper,
            activeBackgroundId: prefs.activeBackgroundId || state.activeBackgroundId,
            customWallpaper: prefs.customWallpaper !== undefined ? prefs.customWallpaper : state.customWallpaper,
            wallpapers: Array.isArray(prefs.wallpapers) && prefs.wallpapers.length > 0 ? prefs.wallpapers : state.wallpapers,
            downloadedWallpapers: Array.isArray(prefs.downloadedWallpapers) && prefs.downloadedWallpapers.length > 0 ? prefs.downloadedWallpapers : state.downloadedWallpapers,
          };
          applyAppearanceToDOM(next);
          return next;
        }),

      resetDefaults: () =>
        set(() => {
          const defaults = {
            theme: 'light',
            aura: 'indigo',
            glassEffects: true,
            gentleTransitions: true,
            blurIntensity: 18,
            syncWithDarkMode: true,
            dimWallpaper: true,
            activeBackgroundId: 'bg-04-serene-horizon',
            customWallpaper: null,
            wallpapers: BACKGROUND_LIBRARY,
            downloadedWallpapers: DOWNLOADED_WALLPAPERS_BATCH,
          };
          applyAppearanceToDOM(defaults);
          return defaults;
        }),
    }),
    {
      name: 'momentum_appearance_settings_v1',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      onRehydrateStorage: () => (state, error) => {
        if (!error && state) {
          state.setHasHydrated(true);
          applyAppearanceToDOM(state);
          sanitizeAndHydrateWallpaperStorage(useThemeStore);
        }
      },
    }
  )
);

// Eagerly initialize DOM and store on first module import in client
if (typeof window !== 'undefined') {
  try {
    const raw = localStorage.getItem('momentum_appearance_settings_v1');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.state) {
        useThemeStore.setState({
          ...parsed.state,
          wallpapers: Array.isArray(parsed.state.wallpapers) && parsed.state.wallpapers.length > 0
            ? parsed.state.wallpapers
            : (Array.isArray(parsed.state.downloadedWallpapers) && parsed.state.downloadedWallpapers.length > 0
                ? parsed.state.downloadedWallpapers
                : BACKGROUND_LIBRARY),
          _hasHydrated: false,
        });
        applyAppearanceToDOM(parsed.state);
      } else {
        useThemeStore.setState({ _hasHydrated: false });
        applyAppearanceToDOM(useThemeStore.getState());
      }
    } else {
      useThemeStore.setState({ _hasHydrated: false });
      applyAppearanceToDOM(useThemeStore.getState());
    }
    // Startup sanitization of dead blobs and restoration from IndexedDB
    sanitizeAndHydrateWallpaperStorage(useThemeStore);
  } catch {
    useThemeStore.setState({ _hasHydrated: false });
    applyAppearanceToDOM(useThemeStore.getState());
  }
}
