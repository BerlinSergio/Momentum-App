import React from 'react';
import PrayerTimesLightMode from './PrayerTimesLightMode';
import PrayerTimesDarkMode from './PrayerTimesDarkMode';
import { useThemeStore } from './store/useThemeStore';
import { useNavigationStore } from './store/useNavigationStore';

export default function PrayerTimes({ setActiveTab, isDarkMode, goBack }) {
  const theme = useThemeStore((s) => s.theme);
  const dark = typeof isDarkMode === 'boolean' ? isDarkMode : theme === 'dark';
  const navTab = setActiveTab || useNavigationStore.getState().setActiveTab;

  return dark ? (
    <PrayerTimesDarkMode setActiveTab={navTab} goBack={goBack} />
  ) : (
    <PrayerTimesLightMode setActiveTab={navTab} goBack={goBack} />
  );
}
