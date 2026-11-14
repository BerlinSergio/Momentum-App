import React, { useState, useRef } from 'react';
import UserAvatar from './components/UserAvatar';
import { Image, ArrowLeft, X } from 'lucide-react';
import { useThemeStore } from './store/useThemeStore';
import { useWallpaper } from './context/WallpaperContext';
import {
  BACKGROUND_LIBRARY,
  DOWNLOADED_WALLPAPERS_BATCH,
  getBackgroundById,
  generateWallpaperBatch,
  formatWallpaperNameFromSource,
  NONE_WALLPAPER,
} from './data/defaultWallpapers';
import { processImageForStorage, saveWallpaperToIndexedDB } from './utils/wallpaperStorage';

function WallpaperGridCard({ bg, item: itemProp, index, title: titleProp, isSelected, isFav, onSelect, onToggleFavorite }) {
  const item = itemProp || bg;
  const [previewMode, setPreviewMode] = useState('light');
  const currentImageSrc = previewMode === 'dark' ? (item.darkImage || item.thumbnail || item.url) : (item.lightImage || item.thumbnail || item.url);
  const wallpaperTitle = titleProp || item.title || (typeof index === 'number' ? `Wallpaper ${String(index + 1).padStart(2, '0')}` : 'Wallpaper 01');
  const displayName = wallpaperTitle;
  const cardGradient = previewMode === 'dark'
    ? (item.darkGradient || item.gradient || 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)')
    : (item.lightGradient || item.gradient || 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)');

  return (
    <div
      onClick={onSelect}
      className={`rounded-3xl overflow-hidden transition-all flex flex-col justify-between group relative cursor-pointer ${
        isSelected ? 'scale-[1.02] ring-2 ring-primary border-2 border-primary bg-white/95 shadow-xl' : 'bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg hover:border-primary/50 hover:shadow-xl'
      }`}
    >
      <div 
        className="relative w-full aspect-[4/3] rounded-t-[inherit] overflow-hidden"
        style={{ background: cardGradient }}
      >
        {currentImageSrc && (
          <img 
            className="w-full h-full object-cover rounded-t-[inherit] transition-all duration-300 group-hover:scale-105" 
            alt={displayName} 
            src={currentImageSrc}
            loading="lazy"
            onError={(e) => {
              // Hide broken/failed img so the rich multi-stop gradient artwork renders gracefully
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
        <div className={`absolute inset-0 bg-black/35 pointer-events-none transition-opacity duration-300 ${previewMode === 'dark' ? 'opacity-100' : 'opacity-0'}`} />
        {/* Day/Night Interactive Preview Badge & Active Badge */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setPreviewMode((prev) => (prev === 'light' ? 'dark' : 'light'));
            }}
            title={`Preview in ${previewMode === 'light' ? 'Dark' : 'Light'} Mode`}
            className="px-2 py-1 rounded-xl bg-black/60 hover:bg-black/75 active:scale-95 backdrop-blur-xl border border-white/30 text-white text-[11px] flex items-center gap-1 shadow-md cursor-pointer transition-all duration-200"
          >
            <span
              className={`material-symbols-outlined text-[13px] transition-all duration-200 ${
                previewMode === 'light' ? 'text-amber-300 opacity-100 scale-105' : 'text-slate-400 opacity-40 scale-90'
              }`}
              style={previewMode === 'light' ? { fontVariationSettings: '"FILL" 1' } : {}}
            >
              wb_sunny
            </span>
            <span
              className={`material-symbols-outlined text-[13px] transition-all duration-200 ${
                previewMode === 'dark' ? 'text-primary opacity-100 scale-105' : 'text-slate-400 opacity-40 scale-90'
              }`}
              style={previewMode === 'dark' ? { fontVariationSettings: '"FILL" 1' } : {}}
            >
              bedtime
            </span>
          </button>
          {isSelected && (
            <div className="px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-xl flex items-center gap-1 text-slate-900 shadow-xs">
              <span className="material-symbols-outlined text-[11px] text-primary" style={{fontVariationSettings: '"FILL" 1'}}>check_circle</span>
              <span className="text-[11px] font-bold text-primary">Active</span>
            </div>
          )}
        </div>
        {/* Favorite Toggle */}
        <button onClick={onToggleFavorite} className="absolute top-2.5 right-2.5 w-7 h-7 rounded-xl bg-black/40 backdrop-blur-xl border border-white/50 text-white hover:text-rose-400 flex items-center justify-center transition-colors shadow-sm z-10">
          <span className={`material-symbols-outlined text-[14px] ${isFav ? 'text-rose-400' : ''}`} style={isFav ? { fontVariationSettings: '"FILL" 1' } : {}}>favorite</span>
        </button>
        {/* Selection Ring Overlay */}
        {isSelected && (
          <div className="absolute inset-0 bg-primary/20 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
            <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: '"FILL" 1'}}>check</span>
            </div>
          </div>
        )}
      </div>
      {/* Text Section */}
      <div className="p-3.5 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] tracking-wider font-medium text-slate-500 uppercase truncate">{item.category}</span>
          {isSelected && <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0"></span>}
        </div>
        <h4 className="text-sm font-semibold text-slate-900 truncate line-clamp-1 line-clamp-2 leading-snug min-h-[1.5rem] flex items-center">{wallpaperTitle}</h4>
        <span className="text-xs font-medium text-primary mt-0.5 truncate">{item.mood}</span>
      </div>
    </div>
  );
}

export default function BackgroundWallpaperLibraryLightMode({ setActiveTab, goBack }) {
  const activeBackgroundId = useThemeStore((s) => s.activeBackgroundId);
  const setActiveBackgroundId = useThemeStore((s) => s.setActiveBackgroundId);
  const customWallpaper = useThemeStore((s) => s.customWallpaper);
  const setCustomWallpaper = useThemeStore((s) => s.setCustomWallpaper);
  const wallpapers = useThemeStore((s) => s.wallpapers) || BACKGROUND_LIBRARY;
  const setWallpapers = useThemeStore((s) => s.setWallpapers);
  const downloadedWallpapers = useThemeStore((s) => s.downloadedWallpapers) || [];
  const { setCurrentIndex, autoDaily, setAutoDaily } = useWallpaper();

  const fileInputRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [favorites, setFavorites] = useState(['bg-04-serene-horizon', 'bg-03-minaret-sunrise']);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const isNoneActive = activeBackgroundId === 'none';
  const isCustomActive = activeBackgroundId === 'custom' && !!customWallpaper;
  const activeBg = isNoneActive ? NONE_WALLPAPER : getBackgroundById(activeBackgroundId, customWallpaper, wallpapers);

  const categories = [
    { id: 'All', label: 'All (30)' },
    { id: 'Atmospheric Skies', label: 'Atmospheric Skies' },
    { id: 'Minarets & Heritage', label: 'Minarets & Heritage' },
    { id: 'Calm Nature', label: 'Calm Nature' },
    { id: 'Abstract Glass', label: 'Abstract Glass' },
    { id: 'Cloud Sanctuary', label: 'Cloud Sanctuary (30)' },
  ];

  const handleSelectBackground = (bg) => {
    setActiveBackgroundId(bg.id);
    if (bg.id === 'none') {
      return;
    }
    if (typeof setCurrentIndex === 'function') {
      const idx = wallpapers.findIndex((item) => item.id === bg.id);
      if (idx !== -1) setCurrentIndex(idx);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      // Process through HTML5 canvas into persistent WebP/JPEG Data URL (max 1920px)
      const { dataUrl, thumbnailUrl } = await processImageForStorage(file, 1920, 0.82);
      // Save permanently to IndexedDB
      await saveWallpaperToIndexedDB('custom_active', dataUrl, {
        thumbnailUrl,
        name: file.name ? file.name.replace(/\.[^/.]+$/, '') : 'Custom Upload',
        updatedAt: Date.now(),
      });
      // Sync to Zustand store
      setCustomWallpaper(dataUrl);
      setActiveBackgroundId('custom');
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      console.error('Failed to process custom wallpaper upload:', err);
    }
  };

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDownloadCloudBatch = () => {
    if (isDownloading) return;
    setIsDownloading(true);
    setTimeout(() => {
      const newCloudBatch = generateWallpaperBatch(`cloud-batch-${Date.now()}`);
      if (typeof setWallpapers === 'function') setWallpapers(newCloudBatch);
      setIsDownloading(false);
      setDownloadSuccess(true);
      setShowAll(true);
      setActiveCategory('Cloud Sanctuary');
      setTimeout(() => setDownloadSuccess(false), 3500);
    }, 1500);
  };

  const activeCloudList = downloadedWallpapers.length > 0 ? downloadedWallpapers : (wallpapers.length > 0 ? wallpapers : DOWNLOADED_WALLPAPERS_BATCH);
  const filteredList = activeCategory === 'All'
    ? wallpapers
    : activeCategory === 'Cloud Sanctuary'
      ? activeCloudList
      : wallpapers.filter((bg) => bg.category === activeCategory);

  const displayedList = (!showAll && activeCategory === 'All')
    ? filteredList.slice(0, 8)
    : filteredList;

  return (
    <>
      {/* Hidden File Input for Custom Wallpaper Upload */}
      <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileUpload} className="hidden" aria-hidden="true" />
      
      {/* Top Header Bar */}
      <div className="sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => (goBack ? goBack('settings_profile_light_mode') : (setActiveTab ? setActiveTab('settings_profile_light_mode') : window.history.back()))}
            aria-label="Go back"
            className="p-2 -ml-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer pointer-events-auto"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-bold text-slate-900 tracking-tight">
            Background Library
          </h1>
        </div>
      </div>

      <main className="flex-1 flex flex-col relative w-full px-margin pb-safe bg-surface">
        <div className="flex flex-col w-full pb-52 space-y-space-lg">
          
          {/* Top Context Header Area */}
          <div className="flex items-center justify-between px-space-xs pt-space-xs">
            <div className="flex flex-col">
              <span className="text-label-sm font-label-sm uppercase tracking-wider text-slate-900 font-semibold" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>Atmosphere Engine</span>
              <h2 className="text-headline-sm font-headline-sm text-slate-900 font-bold" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>Curated Wallpapers</h2>
            </div>
            <div className="flex items-center gap-space-xs">
              <button onClick={() => setActiveTab && setActiveTab('background_preview_blur_control_light_mode')} aria-label="Toggle preview accent" className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center justify-center shadow-sm active:scale-95 transition-transform" id="themeToggleMini">
                <span className="material-symbols-outlined text-[19px]">tune</span>
              </button>
              <button onClick={() => setShowInfoModal(true)} aria-label="Library details" className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center justify-center shadow-sm active:scale-95 transition-transform">
                <span className="material-symbols-outlined text-[19px]">info</span>
              </button>
            </div>
          </div>

          {/* Hero Card: Current Active Background */}
          <div className="relative w-full rounded-3xl p-5 mb-5 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
            {isNoneActive ? (
              /* Pure Minimal Hero Preview */
              <div 
                className="relative w-full h-44 rounded-[1.25rem] overflow-hidden shadow-inner flex flex-col justify-between p-4 border border-slate-200/90"
                style={{ background: '#FFFFFF' }}
              >
                <div className="flex items-center justify-between z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-label-md text-label-md shadow-xs border border-slate-200">
                    <span className="material-symbols-outlined text-[15px] text-emerald-600" style={{fontVariationSettings: '"FILL" 1'}}>check_circle</span>
                    Current Active Background
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-label-sm text-label-sm border border-slate-200">
                    <span className="material-symbols-outlined text-[13px]">format_paint</span>
                    Pure Minimal
                  </span>
                </div>
                <div className="flex items-center justify-center py-2">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 shadow-xs">
                    <span className="material-symbols-outlined text-[26px]">palette</span>
                  </div>
                </div>
                <div className="flex flex-col gap-0.5 z-10">
                  <span className="text-label-sm font-label-sm text-slate-500 tracking-wide">Solid White Edition</span>
                  <h3 className="text-headline-md font-headline-md text-slate-900 drop-shadow-xs truncate">Pure Minimal (Solid Background)</h3>
                </div>
              </div>
            ) : (
              /* Wallpaper / Custom Hero Preview with Multi-Stop CSS Gradient Fallback */
              <div 
                className="relative w-full h-44 rounded-[1.25rem] overflow-hidden shadow-inner"
                style={{
                  background: activeBg.lightGradient || activeBg.gradient || 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                }}
              >
                {(activeBg.lightImage || activeBg.thumbnail || activeBg.url) && (
                  <img 
                    className="w-full h-full object-cover transition-all duration-500" 
                    alt={isCustomActive ? 'Custom Upload' : `Wallpaper ${String(Math.max(1, wallpapers.findIndex((w) => w.id === activeBg?.id) + 1)).padStart(2, '0')}`} 
                    src={activeBg.lightImage || activeBg.thumbnail || activeBg.url}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                {/* Top Active Pill Badge */}
                <div className="absolute top-space-sm left-space-sm">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xl text-primary font-label-md text-label-md shadow-sm">
                    <span className="material-symbols-outlined text-[15px]" style={{fontVariationSettings: '"FILL" 1'}}>check_circle</span>
                    Current Active Background
                  </span>
                </div>
                {/* Quick stats chip on active card */}
                <div className="absolute top-space-sm right-space-sm">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 text-white font-label-sm text-label-sm backdrop-blur-xl border border-white/10">
                    <span className="material-symbols-outlined text-[13px]">{isCustomActive ? 'photo_camera' : 'wb_twilight'}</span>
                    {isCustomActive ? 'Custom Upload' : (activeBg.mood || 'Adaptive')}
                  </span>
                </div>
                {/* Bottom Card Details */}
                <div className="absolute bottom-space-md left-space-md right-space-md flex flex-col gap-0.5">
                  <span className="text-label-sm font-label-sm text-slate-300 tracking-wide">{isCustomActive ? 'Personalized Photo Edition' : 'Paired Light & Dark Edition'}</span>
                  <h3 className="text-headline-md font-headline-md text-white drop-shadow-sm truncate">{isCustomActive ? 'Custom Uploaded Wallpaper' : `Wallpaper ${String(Math.max(1, wallpapers.findIndex((w) => w.id === activeBg?.id) + 1)).padStart(2, '0')}`}</h3>
                </div>
              </div>
            )}

            {/* Hero Card Actions Row */}
            <div className="mt-space-md flex items-center justify-between gap-space-sm px-space-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[15px]">{isNoneActive ? 'palette' : 'contrast'}</span>
                </div>
                <span className="text-body-sm font-body-sm text-slate-600">
                  {isNoneActive ? 'Solid distraction-free background active' : isCustomActive ? 'Custom user wallpaper active' : 'Calibrated for glass contrast'}
                </span>
              </div>
              {/* Disable/Hide Adjust Blur when Pure Minimal is active */}
              {isNoneActive ? (
                <button
                  disabled
                  title="Blur adjustment is not applicable to Pure Minimal solid background"
                  className="inline-flex items-center gap-1 px-space-md py-2 rounded-full bg-slate-100 text-slate-400 font-label-md text-label-md shadow-none cursor-not-allowed opacity-60"
                >
                  <span>No Blur Layer</span>
                </button>
              ) : (
                <button 
                  onClick={() => setActiveTab && setActiveTab('background_preview_blur_control_light_mode')} 
                  className="inline-flex items-center gap-1 px-space-md py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 font-label-md text-label-md shadow-sm active:scale-95 transition-all"
                >
                  <span>Adjust Blur</span>
                  <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                </button>
              )}
            </div>
          </div>

          {/* First-Class Pure Minimal Option Card */}
          <div
            id="pure-minimal-card"
            onClick={() => handleSelectBackground(NONE_WALLPAPER)}
            className={`w-full p-4 rounded-3xl transition-all cursor-pointer flex items-center justify-between select-none ${
              isNoneActive
                ? 'scale-[1.01] ring-2 ring-primary border-2 border-primary bg-white shadow-xl'
                : 'bg-white/85 backdrop-blur-xl border border-slate-200/80 shadow-md hover:border-primary/50 hover:shadow-lg'
            }`}
          >
            <div className="flex items-center gap-3.5 min-w-0 flex-1 pr-4">
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border shrink-0 transition-all ${
                isNoneActive ? 'bg-primary text-white border-primary shadow-md' : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}>
                <span className="material-symbols-outlined text-[22px]">format_paint</span>
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <h4 className="text-[15px] font-semibold text-slate-900 tracking-tight leading-tight whitespace-nowrap">Pure Minimal</h4>
                <p className="text-[12px] text-slate-500 leading-tight mt-0.5">
                  Pure white in Light mode, deep black in Dark mode.
                </p>
              </div>
            </div>
            <div className="shrink-0 flex items-center">
              {isNoneActive ? (
                <div className="px-3.5 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center gap-1.5 shadow-xs">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
                  <span>Selected</span>
                </div>
              ) : (
                <div className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1 transition-colors">
                  <span>Apply</span>
                  <span className="material-symbols-outlined text-[15px]">chevron_right</span>
                </div>
              )}
            </div>
          </div>

          {/* Filter Pills Carousel */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-margin px-margin py-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full font-label-md text-label-md shadow-sm whitespace-nowrap active:scale-95 transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-md shadow-primary/25 font-semibold'
                      : 'bg-white/90 text-slate-700 hover:text-slate-900 hover:bg-white border border-slate-200/60'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Curated Grid Section Header */}
          <div className="flex items-center justify-between pt-space-xs">
            <div className="flex items-baseline gap-2">
              <h3 className="text-headline-sm font-headline-sm text-slate-900" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>Master Collection</h3>
              <span className="text-label-sm font-label-sm text-slate-800" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>Showing {displayedList.length} of {wallpapers.length}</span>
            </div>
            <button onClick={() => setAutoDaily && setAutoDaily(!autoDaily)} className="text-label-md font-label-md text-primary flex items-center gap-1 active:opacity-75">
              <span>{autoDaily ? 'Auto-Rotate ON' : 'Auto-Rotate'}</span>
              <span className="material-symbols-outlined text-[16px]">sync</span>
            </button>
          </div>

          {/* 2-Column Curated Wallpapers Grid */}
          <div className="grid grid-cols-2 gap-space-md">
            {displayedList.map((item, index) => {
              const bg = item;
              const isSelected = activeBackgroundId === item.id;
              const isFav = favorites.includes(item.id);
              const sequentialLabel = `Wallpaper ${String(index + 1).padStart(2, '0')}`;
              return (
                <WallpaperGridCard
                  key={item.id}
                  bg={item}
                  item={item}
                  index={index}
                  title={sequentialLabel}
                  isSelected={isSelected}
                  isFav={isFav}
                  onSelect={() => handleSelectBackground(item)}
                  onToggleFavorite={(e) => toggleFavorite(e, item.id)}
                />
              );
            })}
          </div>

          {/* Load More / Full Library Indicator */}
          {activeCategory === 'All' && (
            <div className="flex flex-col items-center justify-center my-6 space-y-2">
              <span className="text-xs text-slate-800 font-medium flex items-center gap-1.5" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                {showAll ? 'All 30 wallpapers loaded with Light/Dark pairs' : '22 additional themes available in Sanctuary Cloud'}
              </span>
              <button onClick={() => setShowAll(!showAll)} className="btn-secondary w-full">
                <span className="material-symbols-outlined text-[16px] text-slate-500">layers</span>
                <span>{showAll ? 'Show Curated Highlights (8)' : 'Load All 30 Backgrounds'}</span>
              </button>
            </div>
          )}

          {/* Action Container */}
          <div className="mt-4 space-y-3 pb-8">
            {downloadSuccess && (
              <div className="flex justify-center mb-2 px-4 pointer-events-none">
                <div className="px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-semibold shadow-lg flex items-center gap-1.5 animate-in fade-in">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>30 Online Wallpapers Downloaded Successfully!</span>
                </div>
              </div>
            )}
            <div className="p-4 rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/80 flex flex-col gap-3 shadow-md">
              {/* Download 30 Online Wallpapers Button */}
              <button
                type="button"
                onClick={handleDownloadCloudBatch}
                disabled={isDownloading}
                className="btn-secondary w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-200/80 text-slate-800 font-semibold text-sm transition-all shadow-sm active:scale-[0.99] disabled:opacity-75 cursor-pointer"
              >
                {isDownloading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 shrink-0 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Downloading 30 Wallpapers...</span>
                  </>
                ) : downloadSuccess ? (
                  <>
                    <svg className="w-4 h-4 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>30 Online Wallpapers Downloaded</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                      <path d="M12 12v9" />
                      <path d="m8 17 4 4 4-4" />
                    </svg>
                    <span>Download 30 Online Wallpapers</span>
                  </>
                )}
              </button>
              {/* Secondary Action Button - Custom Upload */}
              <button onClick={() => fileInputRef.current?.click()} className="btn-primary w-full">
                <span className="material-symbols-outlined text-[18px] text-white">add_photo_alternate</span>
                <span>Upload Custom Wallpaper</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Sleek Glassmorphic Atmosphere Engine & Pairing Info Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowInfoModal(false)} />
          <div className="relative w-full max-w-sm rounded-3xl p-6 bg-white/95 backdrop-blur-2xl border border-white/50 shadow-2xl flex flex-col space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">info</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight">Atmosphere Engine</h3>
                  <span className="text-[11px] text-primary font-semibold">Visual Calibration Guide</span>
                </div>
              </div>
              <button onClick={() => setShowInfoModal(false)} className="p-1.5 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs leading-relaxed text-slate-600">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                  <span className="material-symbols-outlined text-[15px] text-primary">routine</span>
                  <span>Momentum Dynamic Pairing</span>
                </div>
                <p>
                  Each curated wallpaper includes calibrated Light and Dark variants specifically tuned to preserve card legibility and glass translucency seamlessly.
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                  <span className="material-symbols-outlined text-[15px] text-primary">contrast</span>
                  <span>Glass Contrast Engine</span>
                </div>
                <p>
                  Background highlights and tones are balanced with real-time backdrop filtering so typography and icons remain razor-sharp across all views.
                </p>
              </div>
            </div>
            <button onClick={() => setShowInfoModal(false)} className="btn-primary w-full py-2.5 text-xs font-semibold rounded-2xl shadow-md">
              <span>Got It</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
