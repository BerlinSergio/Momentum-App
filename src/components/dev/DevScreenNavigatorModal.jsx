import { useTranslation } from 'react-i18next';
import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  Layers,
  Compass,
  Monitor,
  Smartphone,
  Palette,
  Check,
  ChevronRight,
  Filter,
} from 'lucide-react';
import {
  ALL_SCREENS,
  SCREEN_MODULES,
  searchScreens,
} from '../../data/screenRegistry';

/**
 * Momentum Developer Screen Navigator Modal
 * Non-intrusive, on-demand screen switcher strictly isolated to development environments.
 * Provides instant search, module grouping, theme filtering, active screen indicator,
 * and layout preview toggles (Responsive Desktop vs Mobile Device Mockup).
 */
export default function DevScreenNavigatorModal({

  isOpen,
  onClose,
  activeTab,
  onSelectScreen,
  devLayoutMode = 'responsive',
  onToggleDevLayoutMode,
  onOpenWallpaperSelector,
}) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState('all');
  const [selectedTheme, setSelectedTheme] = useState('all');
  const [focusedIndex, setFocusedIndex] = useState(0);
  const searchInputRef = useRef(null);
  const listContainerRef = useRef(null);

  const handleClose = useCallback(() => {
    setSearchQuery('');
    setSelectedModule('all');
    setSelectedTheme('all');
    setFocusedIndex(0);
    onClose();
  }, [onClose]);

  const handleSelect = useCallback((screenId) => {
    if (onSelectScreen) {
      onSelectScreen(screenId);
    }
    handleClose();
  }, [onSelectScreen, handleClose]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setFocusedIndex(0);
  };

  const handleModuleSelect = (mod) => {
    setSelectedModule(mod);
    setFocusedIndex(0);
  };

  const handleThemeSelect = (th) => {
    setSelectedTheme(th);
    setFocusedIndex(0);
  };

  // Focus search input when modal opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Filtered screens
  const filteredScreens = useMemo(() => {
    return searchScreens({
      query: searchQuery,
      module: selectedModule,
      theme: selectedTheme,
    });
  }, [searchQuery, selectedModule, selectedTheme]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIndex((prev) => (prev + 1 < filteredScreens.length ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : filteredScreens.length - 1));
      } else if (e.key === 'Enter') {
        if (filteredScreens[focusedIndex]) {
          e.preventDefault();
          handleSelect(filteredScreens[focusedIndex].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredScreens, focusedIndex, handleClose, handleSelect]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Developer Screen Navigator"
        className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 select-none font-sans"
      >
        {/* Backdrop */}
        <motion.div
          key="dev-navigator-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          key="dev-navigator-window"
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative z-10 w-full max-w-3xl max-h-[90vh] bg-slate-900/95 text-slate-100 rounded-3xl border border-white/15 shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl"
        >
          {/* Header */}
          <div className="px-5 pt-5 pb-3 border-b border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/40 text-primary flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-white tracking-tight">{t('nav.devScreenNavigator', 'Screen Navigator')}</h2>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
                    {t('settings.devOnlyBadge', 'DEV ONLY')}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  {t('dev.switchScreens', 'Switch screens instantly')} • {filteredScreens.length} of {ALL_SCREENS.length} {t('dev.available', 'available')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Wallpaper Engine Quick Launch */}
              {onOpenWallpaperSelector && (
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    onOpenWallpaperSelector();
                  }}
                  title={t('dev.openWallpapers', 'Open Wallpaper Selector')} className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Palette className="w-3.5 h-3.5 text-primary" />
                  <span className="hidden sm:inline">{t('wallpapers.title', 'Wallpapers')}</span>
                </button>
              )}

              {/* Dev Layout Preview Switcher */}
              {onToggleDevLayoutMode && (
                <button
                  type="button"
                  onClick={onToggleDevLayoutMode}
                  title={`Switch to ${devLayoutMode === 'responsive' ? 'Mobile Phone Mockup' : 'Responsive Desktop'}`}
                  className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {devLayoutMode === 'responsive' ? (
                    <>
                      <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="hidden sm:inline">{t('dev.phoneFrame', 'Phone Frame')}</span>
                    </>
                  ) : (
                    <>
                      <Monitor className="w-3.5 h-3.5 text-blue-400" />
                      <span className="hidden sm:inline">{t('dev.responsive', 'Responsive')}</span>
                    </>
                  )}
                </button>
              )}

              {/* Close Button */}
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close Screen Navigator"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="p-4 border-b border-white/10 space-y-3 bg-black/20">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder={t('dev.searchScreens', 'Search screen by name, route ID, or keyword...')} className="w-full bg-slate-800/80 text-white placeholder-slate-400 text-sm rounded-xl pl-10 pr-9 py-2.5 border border-white/10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setFocusedIndex(0);
                  }}
                  aria-label="Clear search query"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Module Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1 pr-1 shrink-0">
                <Filter className="w-3 h-3" />
                Module:
              </span>
              {SCREEN_MODULES.map((m) => {
                const isSelected = selectedModule === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleModuleSelect(m.id)}
                    className={`px-3 py-1 rounded-lg font-semibold shrink-0 transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-primary text-white shadow-sm shadow-primary/30'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300'
                    }`}
                  >
                    {m.label}
                  </button>
                );
              })}
            </div>

            {/* Theme Filter Pills */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 pr-1 shrink-0">
                {t('dev.theme', 'Theme:')}
              </span>
              {[
                { id: 'all', label: 'All Themes' },
                { id: 'dark', label: 'Dark Mode' },
                { id: 'light', label: 'Light Mode' },
              ].map((t) => {
                const isSelected = selectedTheme === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleThemeSelect(t.id)}
                    className={`px-2.5 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-slate-700 text-white font-semibold'
                        : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Screen List Container */}
          <div
            ref={listContainerRef}
            className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-1.5 max-h-[50vh] sm:max-h-[55vh]"
          >
            {filteredScreens.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <Layers className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                <p className="text-sm font-semibold">{t('dev.noScreensMatch', 'No screens match your search')}</p>
<p className="text-xs text-slate-500 mt-1">{t('dev.tryAnotherKeyword', 'Try another keyword or reset filters')}</p>
              </div>
            ) : (
              filteredScreens.map((screen, idx) => {
                const isActive = activeTab === screen.id;
                const isFocused = focusedIndex === idx;

                return (
                  <div
                    key={screen.id}
                    onClick={() => handleSelect(screen.id)}
                    onMouseEnter={() => setFocusedIndex(idx)}
                    className={`group px-3.5 py-2.5 rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition-all border ${
                      isActive
                        ? 'bg-primary/20 border-primary/50 text-white'
                        : isFocused
                        ? 'bg-white/10 border-white/20 text-white'
                        : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/5 text-slate-200'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold tracking-tight text-white group-hover:text-primary transition-colors">
                          {screen.name}
                        </span>
                        {isActive && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                            <Check className="w-2.5 h-2.5" />
                            Current
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <code className="text-[11px] font-mono text-slate-300 bg-black/40 px-1.5 py-0.5 rounded">
                          {screen.id}
                        </code>
                        {screen.description && (
                          <span className="truncate hidden sm:inline text-slate-400 text-xs">
                            • {screen.description}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          screen.theme === 'dark'
                            ? 'bg-slate-800 text-slate-300 border border-slate-700'
                            : 'bg-amber-100 text-amber-900 border border-amber-300'
                        }`}
                      >
                        {screen.theme}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Shortcuts Help */}
          <div className="px-5 py-3 border-t border-white/10 bg-black/30 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">↑</kbd>{' '}
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">↓</kbd>{' '}
                {t('dev.navigate', 'Navigate')}
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">Enter</kbd>{' '}
                {t('common.select', 'Select')}
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">Esc</kbd>{' '}
                {t('common.close', 'Close')}
              </span>
            </div>
            <div className="hidden sm:block">
              <span>{t('dev.shortcut', 'Shortcut:')} </span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-primary font-mono text-[10px] font-bold">
                Ctrl + Shift + Alt + D
              </kbd>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
