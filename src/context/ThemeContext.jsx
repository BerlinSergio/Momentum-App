import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useThemeStore, applyAppearanceToDOM } from '../store/useThemeStore';
import { resolveThemeMode } from '../utils/themeNavigation.js';

const ThemeContext = createContext(null);

/**
 * Compatibility facade over the one persisted appearance store.
 * Navigating to a screen must never choose or persist the user's theme.
 */
export function ThemeProvider({ children }) {
  const selectedTheme = useThemeStore((state) => state.theme);
  const setSelectedTheme = useThemeStore((state) => state.setTheme);
  const [systemDark, setSystemDark] = useState(() =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false
  );

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => setSystemDark(media.matches);
    onChange();
    media.addEventListener?.('change', onChange);
    return () => media.removeEventListener?.('change', onChange);
  }, []);

  useEffect(() => {
    // Keep the root class, wallpaper tokens and system mode in sync.
    // This also runs after the persisted appearance store finishes rehydrating.
    applyAppearanceToDOM(useThemeStore.getState());
  }, [selectedTheme, systemDark]);

  const theme = selectedTheme === 'system'
    ? (systemDark ? 'dark' : 'light')
    : resolveThemeMode(selectedTheme);

  const value = useMemo(() => ({
    theme,
    selectedTheme,
    setTheme: setSelectedTheme,
    toggleTheme: () => setSelectedTheme(theme === 'dark' ? 'light' : 'dark'),
    // Retained for old callers only; a route is not a theme preference.
    syncThemeToScreen: () => {},
  }), [theme, selectedTheme, setSelectedTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
