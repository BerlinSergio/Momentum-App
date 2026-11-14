import React from 'react';
import IslamicHijriCalendarDarkMode from './IslamicHijriCalendarDarkMode';
import IslamicHijriCalendarLightMode from './IslamicHijriCalendarLightMode';
import { useThemeStore } from './store/useThemeStore';
import { useNavigationStore } from './store/useNavigationStore';

export {
  IslamicHijriCalendarDarkMode,
  IslamicHijriCalendarLightMode,
};

export default function IslamicHijriCalendar({ setActiveTab, isDarkMode, goBack }) {
  const theme = useThemeStore((s) => s.theme);
  const dark = typeof isDarkMode === 'boolean' ? isDarkMode : theme === 'dark';
  const navTab = setActiveTab || useNavigationStore.getState().setActiveTab;

  return dark ? (
    <IslamicHijriCalendarDarkMode setActiveTab={navTab} goBack={goBack} />
  ) : (
    <IslamicHijriCalendarLightMode setActiveTab={navTab} goBack={goBack} />
  );
}

