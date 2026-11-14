import React from 'react';
import CalendarsMainLightMode from './CalendarsMainLightMode';
import CalendarsMainDarkMode from './CalendarsMainDarkMode';

export default function CalendarsMain({ setActiveTab, isDarkMode }) {
  return isDarkMode ? (
    <CalendarsMainDarkMode setActiveTab={setActiveTab} />
  ) : (
    <CalendarsMainLightMode setActiveTab={setActiveTab} />
  );
}
