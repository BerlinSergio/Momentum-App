const fs = require('fs');

function updateFile(filePath, isDark) {
  let content = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');

  // 1. Add isDownloading & downloadSuccess state & handler
  const oldState = `  const [showInfoModal, setShowInfoModal] = useState(false);
  const [favorites, setFavorites] = useState(['bg-04-serene-horizon', 'bg-03-minaret-sunrise']);`;

  const newState = `  const [showInfoModal, setShowInfoModal] = useState(false);
  const [favorites, setFavorites] = useState(['bg-04-serene-horizon', 'bg-03-minaret-sunrise']);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);`;

  if (!content.includes(oldState)) {
    console.error(`Could not find oldState in ${filePath}`);
    process.exit(1);
  }
  content = content.replace(oldState, newState);

  // 2. Add handleDownloadCloudBatch right after toggleFavorite
  const oldToggleFav = `  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };`;

  const newToggleFav = `  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDownloadCloudBatch = () => {
    if (isDownloading) return;
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadSuccess(true);
      setShowAll(true);
      setActiveCategory('Cloud Sanctuary');
      setTimeout(() => setDownloadSuccess(false), 3500);
    }, 2000);
  };`;

  if (!content.includes(oldToggleFav)) {
    console.error(`Could not find oldToggleFav in ${filePath}`);
    process.exit(1);
  }
  content = content.replace(oldToggleFav, newToggleFav);

  // 3. Replace bottom sticky action container
  const oldBottomContainer = isDark
    ? `          {/* Floating Sticky Action Container Above Shell Safe Margin */}
          <div className="fixed bottom-0 left-0 right-0 z-50">
            <div className="backdrop-blur-2xl bg-slate-900/90 border-t border-white/10 p-4 rounded-t-3xl flex flex-col gap-3 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.4)]">
              {/* Primary Action Button */}
              <button onClick={() => setActiveTab && setActiveTab('background_preview_blur_control_dark_mode')} className="btn-secondary w-full">
                <span>Customize Selected Background</span>
                <span className="material-symbols-outlined text-[18px]">tune</span>
              </button>
              {/* Secondary Action Button - Custom Upload */}
              <button onClick={() => fileInputRef.current?.click()} className="btn-primary w-full">
                <span className="material-symbols-outlined text-[18px] text-white">add_photo_alternate</span>
                <span>Upload Custom Wallpaper</span>
              </button>
            </div>
          </div>`
    : `          {/* Floating Sticky Action Container Above Shell Safe Margin */}
          <div className="fixed bottom-0 left-0 right-0 z-50">
            <div className="backdrop-blur-2xl bg-white/90 border-t border-slate-200/80 p-4 rounded-t-3xl flex flex-col gap-3 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.15)]">
              {/* Primary Action Button */}
              <button onClick={() => setActiveTab && setActiveTab('background_preview_blur_control_light_mode')} className="btn-secondary w-full">
                <span>Customize Selected Background</span>
                <span className="material-symbols-outlined text-[18px]">tune</span>
              </button>
              {/* Secondary Action Button - Custom Upload */}
              <button onClick={() => fileInputRef.current?.click()} className="btn-primary w-full">
                <span className="material-symbols-outlined text-[18px] text-white">add_photo_alternate</span>
                <span>Upload Custom Wallpaper</span>
              </button>
            </div>
          </div>`;

  const newBottomContainer = isDark
    ? `          {/* Floating Sticky Action Container Above Shell Safe Margin */}
          <div className="fixed bottom-0 left-0 right-0 z-50">
            {downloadSuccess && (
              <div className="flex justify-center mb-2 px-4 pointer-events-none">
                <div className="px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-semibold shadow-lg flex items-center gap-1.5 animate-in fade-in">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>30 Online Wallpapers Downloaded Successfully!</span>
                </div>
              </div>
            )}
            <div className="backdrop-blur-2xl bg-slate-900/90 border-t border-white/10 p-4 rounded-t-3xl flex flex-col gap-3 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.4)]">
              {/* Download 30 Online Wallpapers Button */}
              <button
                type="button"
                onClick={handleDownloadCloudBatch}
                disabled={isDownloading}
                className="btn-secondary w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-200 font-semibold text-sm transition-all shadow-sm active:scale-[0.99] disabled:opacity-75 cursor-pointer"
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
                    <svg className="w-4 h-4 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
          </div>`
    : `          {/* Floating Sticky Action Container Above Shell Safe Margin */}
          <div className="fixed bottom-0 left-0 right-0 z-50">
            {downloadSuccess && (
              <div className="flex justify-center mb-2 px-4 pointer-events-none">
                <div className="px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-semibold shadow-lg flex items-center gap-1.5 animate-in fade-in">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>30 Online Wallpapers Downloaded Successfully!</span>
                </div>
              </div>
            )}
            <div className="backdrop-blur-2xl bg-white/90 border-t border-slate-200/80 p-4 rounded-t-3xl flex flex-col gap-3 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.15)]">
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
          </div>`;

  if (!content.includes(oldBottomContainer)) {
    console.error(`Could not find oldBottomContainer in ${filePath}`);
    process.exit(1);
  }
  content = content.replace(oldBottomContainer, newBottomContainer);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully updated ${filePath}`);
}

updateFile('src/BackgroundWallpaperLibraryLightMode.jsx', false);
updateFile('src/BackgroundWallpaperLibraryDarkMode.jsx', true);

