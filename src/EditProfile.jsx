import React from 'react';
import EditProfileDarkMode from './EditProfileDarkMode';
import EditProfileLightMode from './EditProfileLightMode';
import { useThemeStore } from './store/useThemeStore';
import { useNavigationStore } from './store/useNavigationStore';

export { useProfileStore } from './store/useProfileStore';

export default function EditProfile({ setActiveTab, isDarkMode, goBack }) {
  const theme = useThemeStore((s) => s.theme);
  const dark = typeof isDarkMode === 'boolean' ? isDarkMode : theme === 'dark';
  const navTab = setActiveTab || useNavigationStore.getState().setActiveTab;

  return dark ? (
    <EditProfileDarkMode setActiveTab={navTab} goBack={goBack} />
  ) : (
    <EditProfileLightMode setActiveTab={navTab} goBack={goBack} />
  );
}
