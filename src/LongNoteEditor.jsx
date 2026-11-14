import React from 'react';
import LongNoteEditorDarkMode from './LongNoteEditorDarkMode';
import LongNoteEditorLightMode from './LongNoteEditorLightMode';
import { useThemeStore } from './store/useThemeStore';
import { useNavigationStore } from './store/useNavigationStore';
import { useNotesStore } from './store/useNotesStore';

export {
  useNotesStore,
  LongNoteEditorDarkMode,
  LongNoteEditorLightMode,
};

export default function LongNoteEditor({ setActiveTab, isDarkMode, goBack, noteId = null, isNew, route }) {
  const theme = useThemeStore((s) => s.theme);
  const dark = typeof isDarkMode === 'boolean' ? isDarkMode : theme === 'dark';
  const navTab = setActiveTab || useNavigationStore.getState().setActiveTab;

  return dark ? (
    <LongNoteEditorDarkMode setActiveTab={navTab} goBack={goBack} noteId={noteId} isNew={isNew} route={route} />
  ) : (
    <LongNoteEditorLightMode setActiveTab={navTab} goBack={goBack} noteId={noteId} isNew={isNew} route={route} />
  );
}
