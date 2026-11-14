import React from 'react';
import QuickNoteEditorDarkMode from './QuickNoteEditorDarkMode';
import QuickNoteEditorLightMode from './QuickNoteEditorLightMode';
import { useThemeStore } from './store/useThemeStore';
import { useNavigationStore } from './store/useNavigationStore';
import { useNotesStore } from './store/useNotesStore';

export {
  useNotesStore,
  QuickNoteEditorDarkMode,
  QuickNoteEditorLightMode,
  QuickNoteEditor,
};

export default function QuickNoteEditor({ setActiveTab, isDarkMode, goBack, noteId = null, isNew, route = { params: {} } }) {
  const theme = useThemeStore((s) => s.theme);
  const dark = typeof isDarkMode === 'boolean' ? isDarkMode : theme === 'dark';
  const navTab = setActiveTab || useNavigationStore.getState().setActiveTab;
  const safeRoute = route && route.params ? route : { params: { noteId } };

  return dark ? (
    <QuickNoteEditorDarkMode setActiveTab={navTab} goBack={goBack} noteId={noteId} isNew={isNew} route={safeRoute} />
  ) : (
    <QuickNoteEditorLightMode setActiveTab={navTab} goBack={goBack} noteId={noteId} isNew={isNew} route={safeRoute} />
  );
}
