import React from 'react';
import CitySelectionLightMode from './CitySelectionLightMode';
import CitySelectionDarkMode from './CitySelectionDarkMode';
import { useThemeStore } from './store/useThemeStore';

export default function CitySelection({ setActiveTab, isDarkMode, goBack }) {
  const theme = useThemeStore((s) => s.theme);
  const dark = typeof isDarkMode === 'boolean' ? isDarkMode : theme === 'dark';

  return dark ? (
    <CitySelectionDarkMode setActiveTab={setActiveTab} goBack={goBack} />
  ) : (
    <CitySelectionLightMode setActiveTab={setActiveTab} goBack={goBack} />
  );
}
