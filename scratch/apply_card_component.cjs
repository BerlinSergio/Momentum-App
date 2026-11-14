const fs = require('fs');

function updateLibraryFile(isDark) {
  const fileName = isDark ? 'src/BackgroundWallpaperLibraryDarkMode.jsx' : 'src/BackgroundWallpaperLibraryLightMode.jsx';
  let content = fs.readFileSync(fileName, 'utf8');

  const defaultMode = isDark ? 'dark' : 'light';
  const cardBg = isDark
    ? "isSelected ? 'scale-[1.02] ring-2 ring-primary border-2 border-primary bg-black/70 shadow-2xl' : 'bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl hover:border-primary/50 hover:shadow-2xl'"
    : "isSelected ? 'scale-[1.02] ring-2 ring-primary border-2 border-primary bg-white/95 shadow-xl' : 'bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg hover:border-primary/50 hover:shadow-xl'";

  const badgeBg = isDark
    ? "px-2 py-1 rounded-xl bg-slate-950/80 hover:bg-slate-900 active:scale-95 backdrop-blur-xl border border-white/15 text-slate-200 text-[11px] flex items-center gap-1 shadow-md cursor-pointer transition-all duration-200"
    : "px-2 py-1 rounded-xl bg-black/60 hover:bg-black/75 active:scale-95 backdrop-blur-xl border border-white/30 text-white text-[11px] flex items-center gap-1 shadow-md cursor-pointer transition-all duration-200";

  const activeBadge = isDark
    ? `<div className="px-2.5 py-0.5 rounded-full bg-black/90 backdrop-blur-xl flex items-center gap-1 text-white border border-white/10 shadow-sm">
              <span className="material-symbols-outlined text-[11px] text-primary" style={{fontVariationSettings: '"FILL" 1'}}>check_circle</span>
              <span className="text-[11px] font-bold text-primary">Active</span>
            </div>`
    : `<div className="px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-xl flex items-center gap-1 text-slate-900 shadow-xs">
              <span className="material-symbols-outlined text-[11px] text-primary" style={{fontVariationSettings: '"FILL" 1'}}>check_circle</span>
              <span className="text-[11px] font-bold text-primary">Active</span>
            </div>`;

  const favBtn = isDark
    ? `<button onClick={onToggleFavorite} className="absolute top-2.5 right-2.5 w-7 h-7 rounded-xl bg-slate-950/70 backdrop-blur-xl border border-white/10 text-slate-200 hover:text-rose-400 flex items-center justify-center transition-colors shadow-sm z-10">
          <span className={\`material-symbols-outlined text-[14px] \${isFav ? 'text-rose-400' : ''}\`} style={isFav ? { fontVariationSettings: '"FILL" 1' } : {}}>favorite</span>
        </button>`
    : `<button onClick={onToggleFavorite} className="absolute top-2.5 right-2.5 w-7 h-7 rounded-xl bg-black/40 backdrop-blur-xl border border-white/50 text-white hover:text-rose-400 flex items-center justify-center transition-colors shadow-sm z-10">
          <span className={\`material-symbols-outlined text-[14px] \${isFav ? 'text-rose-400' : ''}\`} style={isFav ? { fontVariationSettings: '"FILL" 1' } : {}}>favorite</span>
        </button>`;

  const categoryText = isDark
    ? `<span className="text-[10px] tracking-wider font-medium text-slate-400 uppercase truncate">{bg.category}</span>`
    : `<span className="text-[10px] tracking-wider font-medium text-slate-500 uppercase truncate">{bg.category}</span>`;

  const titleText = isDark
    ? `<h4 className="text-sm font-semibold text-white block truncate">{bg.title}</h4>`
    : `<h4 className="text-sm font-semibold text-slate-900 block truncate">{bg.title}</h4>`;

  const cardComponentStr = `function WallpaperGridCard({ bg, isSelected, isFav, onSelect, onToggleFavorite }) {
  const [previewMode, setPreviewMode] = useState('${defaultMode}');
  const thumbnailSrc = previewMode === 'light' ? (bg.lightImage || bg.thumbnail || bg.url) : (bg.darkImage || bg.thumbnail || bg.url);

  return (
    <div
      onClick={onSelect}
      className={\`rounded-3xl overflow-hidden transition-all flex flex-col justify-between group relative cursor-pointer \${
        ${cardBg}
      }\`}
    >
      <div className="relative w-full aspect-[4/3] rounded-t-[inherit] overflow-hidden">
        <img className="w-full h-full object-cover rounded-t-[inherit] transition-transform duration-300 group-hover:scale-105" alt={bg.title} src={thumbnailSrc} />
        {/* Day/Night Interactive Preview Badge & Active Badge */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setPreviewMode((prev) => (prev === 'light' ? 'dark' : 'light'));
            }}
            title={\`Preview in \${previewMode === 'light' ? 'Dark' : 'Light'} Mode\`}
            className="${badgeBg}"
          >
            <span
              className={\`material-symbols-outlined text-[13px] transition-all duration-200 \${
                previewMode === 'light' ? 'text-amber-300 opacity-100 scale-105' : 'text-slate-400 opacity-40 scale-90'
              }\`}
              style={previewMode === 'light' ? { fontVariationSettings: '"FILL" 1' } : {}}
            >
              wb_sunny
            </span>
            <span
              className={\`material-symbols-outlined text-[13px] transition-all duration-200 \${
                previewMode === 'dark' ? 'text-primary opacity-100 scale-105' : 'text-slate-400 opacity-40 scale-90'
              }\`}
              style={previewMode === 'dark' ? { fontVariationSettings: '"FILL" 1' } : {}}
            >
              bedtime
            </span>
          </button>
          {isSelected && (
            ${activeBadge}
          )}
        </div>
        {/* Favorite Toggle */}
        ${favBtn}
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
          ${categoryText}
          {isSelected && <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0"></span>}
        </div>
        ${titleText}
        <span className="text-xs font-medium text-primary mt-0.5 truncate">{bg.mood}</span>
      </div>
    </div>
  );
}\n\n`;

  // 1. Insert WallpaperGridCard before export default function
  const exportPrefix = isDark
    ? 'export default function BackgroundWallpaperLibraryDarkMode'
    : 'export default function BackgroundWallpaperLibraryLightMode';

  content = content.replace(exportPrefix, cardComponentStr + exportPrefix);

  // 2. Replace map inner markup with <WallpaperGridCard ... />
  const gridStartMarker = '{/* 2-Column Curated Wallpapers Grid */}';
  const gridEndMarker = '{/* Load More / Full Library Indicator */}';

  const startIdx = content.indexOf(gridStartMarker);
  const endIdx = content.indexOf(gridEndMarker);

  if (startIdx === -1 || endIdx === -1) {
    throw new Error(`Could not find grid markers in ${fileName}`);
  }

  const replacementGrid = `{/* 2-Column Curated Wallpapers Grid */}
          <div className="grid grid-cols-2 gap-space-md">
            {displayedList.map((bg) => {
              const isSelected = activeBackgroundId === bg.id;
              const isFav = favorites.includes(bg.id);
              return (
                <WallpaperGridCard
                  key={bg.id}
                  bg={bg}
                  isSelected={isSelected}
                  isFav={isFav}
                  onSelect={() => handleSelectBackground(bg)}
                  onToggleFavorite={(e) => toggleFavorite(e, bg.id)}
                />
              );
            })}
          </div>
          `;

  content = content.slice(0, startIdx) + replacementGrid + content.slice(endIdx);

  fs.writeFileSync(fileName, content, 'utf8');
}

updateLibraryFile(true);
updateLibraryFile(false);

const dLen = fs.readFileSync('src/BackgroundWallpaperLibraryDarkMode.jsx', 'utf8').split(/\r?\n/).length;
const lLen = fs.readFileSync('src/BackgroundWallpaperLibraryLightMode.jsx', 'utf8').split(/\r?\n/).length;
console.log(`Updated! Dark: ${dLen} lines, Light: ${lLen} lines -> ${dLen === lLen ? 'PARITY 100%' : 'MISMATCH'}`);

