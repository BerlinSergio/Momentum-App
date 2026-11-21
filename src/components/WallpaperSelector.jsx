import React from 'react';
import { useTranslation } from 'react-i18next';
import { useWallpaper } from '../context/WallpaperContext';
import { useThemeStore } from '../store/useThemeStore';
import LiquidButton from './ui/LiquidButton';

export default function WallpaperSelector({ isDarkMode, onClose }) {
  const { t } = useTranslation();
  const {
    wallpapers,
    currentIndex,
    setCurrentIndex,
    autoDaily,
    setAutoDaily,
    blurLevel,
    setBlurLevel,
    batchFetchedAt,
    isOnlineUpdating,
    fetchNewOnlinePack
  } = useWallpaper();

  const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
  const elapsed = Date.now() - (batchFetchedAt || Date.now());
  const daysRemaining = Math.max(1, Math.ceil((THIRTY_DAYS_MS - elapsed) / (24 * 60 * 60 * 1000)));

  const blurPresets = [
    { label: t('appearance.crisp', 'Crisp'), val: 0 },
    { label: t('appearance.subtle', 'Subtle'), val: 8 },
    { label: t('appearance.soft', 'Soft'), val: 14 },
    { label: t('appearance.deep', 'Deep'), val: 24 },
    { label: t('appearance.dreamy', 'Dreamy'), val: 36 },
  ];

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className={`relative w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col rounded-3xl shadow-2xl border ${
        isDarkMode 
          ? 'bg-slate-900/95 border-slate-800 text-white' 
          : 'bg-white/95 border-slate-200 text-slate-900'
      } backdrop-blur-xl`}>
        
        {/* Header */}
        <div className="p-6 pb-4 border-b border-current/10 flex justify-between items-center shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight">{t('wallpapers.backgroundEngine', 'Background Engine')}</h2>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                isDarkMode ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-50 text-indigo-700'
              }`}>
                {t('wallpapers.rotation30Day', '30-Day Rotation')}
              </span>
            </div>
            <p className="text-xs opacity-60 mt-1">
              {t('wallpapers.cachedRotationDesc', 'Curated high-resolution mobile wallpapers with daily auto-cycle & local cache.')}
            </p>
          </div>
          <button 
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-current/5 hover:bg-current/10 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Controls: Daily Auto-Rotation & Blur Slider */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Auto-Rotation Toggle Card */}
            <div className={`p-4 rounded-2xl border flex flex-col justify-between ${
              isDarkMode ? 'bg-slate-800/50 border-slate-700/60' : 'bg-slate-50 border-slate-200/80'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-sm">{t('appearance.dailyAutoRotation', 'Daily Auto-Rotation')}</h3>
                  <p className="text-xs opacity-60 mt-0.5">{t('appearance.cycleDaily', 'Cycle wallpaper daily (30-day pack)')}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={autoDaily}
                    onChange={(e) => setAutoDaily(e.target.checked)}
                  />
                  <div className={`w-11 h-6 rounded-full peer peer-focus:outline-none transition-colors ${
                    autoDaily ? 'bg-indigo-600' : isDarkMode ? 'bg-slate-700' : 'bg-slate-300'
                  } peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                </label>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-current/10 text-xs">
                <span className="opacity-70">{t('wallpapers.currentMode', 'Current Mode:')}</span>
                <span className="font-semibold text-indigo-500">
                  {autoDaily ? t('wallpapers.dayActive', 'Day {{day}} of 30 active', { day: currentIndex + 1 }) : t('wallpapers.manualOverrideActive', 'Manual override active')}
                </span>
              </div>
            </div>

            {/* Blur Intensity Slider Card */}
            <div className={`p-4 rounded-2xl border space-y-3 ${
              isDarkMode ? 'bg-slate-800/50 border-slate-700/60' : 'bg-slate-50 border-slate-200/80'
            }`}>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-sm">{t('wallpapers.blurIntensity', 'Blur Intensity')}</h3>
                  <p className="text-xs opacity-60">{t('wallpapers.adjustGlassBackdrop', 'Adjust glass backdrop depth')}</p>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                  {blurLevel}px
                </span>
              </div>

              <input 
                type="range" 
                min="0" 
                max="40" 
                step="1"
                value={blurLevel}
                onChange={(e) => setBlurLevel(parseInt(e.target.value, 10) || 0)}
                className="w-full h-2 bg-current/10 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />

              {/* Quick Presets */}
              <div className="grid grid-cols-5 gap-1.5 pt-1">
                {blurPresets.map((preset) => {
                  const isActive = blurLevel === preset.val;
                  return (
                    <button
                      key={preset.val}
                      type="button"
                      onClick={() => setBlurLevel(preset.val)}
                      className={`py-1 px-1 rounded-lg text-xs font-medium transition-all text-center ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : isDarkMode
                            ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      <div>{preset.label}</div>
                      <div className="text-[10px] opacity-70">{preset.val}px</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Wallpaper Collection Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-base">{t('appearance.wallpaperCollection', 'Wallpaper Collection')}</h3>
                <p className="text-xs opacity-60">{t('wallpapers.cachedCount', '30 curated wallpapers cached locally for daily rotation')}</p>
              </div>
              <span className="text-xs opacity-60 font-mono">
                {t('wallpapers.wallpapersCount', '{{count}} Wallpapers', { count: wallpapers.length })}
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-3">
              {wallpapers.map((wp, index) => {
                const isSelected = currentIndex === index;
                return (
                  <button
                    key={wp.id || index}
                    type="button"
                    onClick={() => {
                      setCurrentIndex(index);
                      if (wp.id) {
                        useThemeStore.getState().setActiveBackgroundId(wp.id);
                      }
                      setAutoDaily(false);
                    }}
                    className={`group relative aspect-[9/16] rounded-2xl overflow-hidden shadow-sm transition-all duration-200 hover:scale-[1.03] hover:shadow-md focus:outline-none ${
                      isSelected
                        ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-current scale-[1.02]'
                        : 'opacity-90 hover:opacity-100'
                    }`}
                    style={{ background: wp.gradient || wp.lightGradient || 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)' }}
                  >
                    {/* Thumbnail Image with fallback */}
                    <img 
                      src={wp.thumb} 
                      alt={wp.title || `Wallpaper Day ${index + 1}`} 
                      loading="lazy"
                      onError={(e) => {
                        if (wp.fallback && e.target.src !== wp.fallback) {
                          e.target.src = wp.fallback;
                        }
                      }}
                      className="w-full h-full object-cover"
                    />

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

                    {/* Day Badge */}
                    <div className="absolute top-1.5 left-1.5">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-sm">
                        {t('wallpapers.dayNumber', 'Day {{day}}', { day: wp.day || index + 1 })}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="absolute bottom-1.5 inset-x-1.5 text-left pointer-events-none">
                      <p className="text-[11px] font-medium text-white truncate drop-shadow-sm">
                        {wp.title || `${t('appearance.theme', 'Theme')} ${index + 1}`}
                      </p>
                      <p className="text-[9px] text-white/70 truncate">
                        {wp.category || t('wallpapers.curated', 'Curated')}
                      </p>
                    </div>

                    {/* Active Checkmark Indicator */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-indigo-600/25 flex items-center justify-center">
                        <div className="bg-indigo-600 text-white rounded-full p-1.5 shadow-lg">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6L9 17l-5-5"/>
                          </svg>
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-current/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 bg-current/[0.02]">
          <div className="text-xs opacity-70 text-center sm:text-left">
            <span>{t('wallpapers.batchLoaded', 'Batch loaded: {{date}}', { date: new Date(batchFetchedAt).toLocaleDateString() })}</span>
            <span className="mx-1.5">•</span>
            <span>{t('wallpapers.nextAutoRefresh', 'Next auto-refresh in {{days}} days', { days: daysRemaining })}</span>
          </div>

          <div className="w-full sm:w-auto">
            <LiquidButton 
              variant="primary" 
              onClick={fetchNewOnlinePack}
              disabled={isOnlineUpdating}
              className="w-full sm:w-auto h-11 px-6 rounded-xl flex justify-center items-center gap-2 text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/30 transition-all font-semibold text-sm"
            >
              {isOnlineUpdating ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{t('wallpapers.downloading30', 'Downloading 30 Wallpapers...')}</span>
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>{t('wallpapers.download30', 'Download 30 New Online Wallpapers')}</span>
                </>
              )}
            </LiquidButton>
          </div>
        </div>

      </div>
    </div>
  );
}
