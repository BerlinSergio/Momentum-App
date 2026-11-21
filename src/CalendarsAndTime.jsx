import React from 'react';
import CalendarsMainLightMode from './CalendarsMainLightMode';
import CalendarsMainDarkMode from './CalendarsMainDarkMode';
import { useThemeStore } from './store/useThemeStore';

export default function CalendarsAndTime({ setActiveTab, isDarkMode, goBack }) {
  const theme = useThemeStore((s) => s.theme);
  const dark = typeof isDarkMode === 'boolean' ? isDarkMode : theme === 'dark';

  return dark ? (
    <CalendarsMainDarkMode setActiveTab={setActiveTab} goBack={goBack} />
  ) : (
    <CalendarsMainLightMode setActiveTab={setActiveTab} goBack={goBack} />
  );
}
