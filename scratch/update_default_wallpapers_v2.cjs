const fs = require('fs');

const path = 'src/data/defaultWallpapers.js';
let content = fs.readFileSync(path, 'utf8');

const downloadedThemesBlock = `
export const DOWNLOADED_CLOUD_THEMES = [
  { title: "Balkh Turquoise", category: "Minarets & Heritage", seed: "balkh-turquoise", mood: "Sacred Splendor", desc: "Intricate azure tiled archways illuminated by radiant morning sun." },
  { title: "Lapis Lazuli Vault", category: "Abstract Glass", seed: "lapis-vault", mood: "Deep Wonder", desc: "Polished celestial lapis stone with shimmering gold veins under soft daylight." },
  { title: "Bamiyan Valley Dawn", category: "Calm Nature", seed: "bamiyan-dawn", mood: "Serenity", desc: "Golden rays breaking over the dramatic sandstone cliffs of the historic valley." },
  { title: "Hindu Kush Zenith", category: "Calm Nature", seed: "hindu-kush", mood: "High Perspective", desc: "Glacial snowpeaks touching clear blue morning stratosphere." },
  { title: "Band-e Amir Azure", category: "Atmospheric Skies", seed: "bande-amir", mood: "Pristine Calm", desc: "Mineral-rich crystalline blue lakes reflecting boundless clear sky." },
  { title: "Herat Citadel Sunbeam", category: "Minarets & Heritage", seed: "herat-citadel", mood: "Timeless Majesty", desc: "Centuries-old sun-baked fortress walls bathed in bright daylight." },
  { title: "Panjshir Riverbed", category: "Calm Nature", seed: "panjshir-river", mood: "Fresh Flow", desc: "Verdant mountain valley with rushing emerald-tinted glacial currents." },
  { title: "Ghazni Starfield", category: "Atmospheric Skies", seed: "ghazni-stars", mood: "Nocturnal Wonder", desc: "Ancient victory towers reaching toward an expansive desert horizon." },
  { title: "Pamir High Steppe", category: "Calm Nature", seed: "pamir-steppe", mood: "Infinite Silence", desc: "Vast windswept plateau at the roof of the world under crisp morning air." },
  { title: "Kandahar Orchard", category: "Calm Nature", seed: "kandahar-orchard", mood: "Gentle Abundance", desc: "Pomegranate blossoms glowing softly under golden morning sunshine." },
  { title: "Nuristan Cedar Canopy", category: "Calm Nature", seed: "nuristan-canopy", mood: "Deep Sanctuary", desc: "Dense emerald alpine cedar trees filtered through crisp daylight rays." },
  { title: "Kabul River Reflection", category: "Atmospheric Skies", seed: "kabul-reflection", mood: "Quiet Flow", desc: "Glassy water surface capturing pastel morning clouds." },
  { title: "Salang Pass Frost", category: "Calm Nature", seed: "salang-frost", mood: "Crisp Focus", desc: "High alpine pass crowned in pristine frost and clear sky." },
  { title: "Samangan Caves", category: "Minarets & Heritage", seed: "samangan-caves", mood: "Ancient Peace", desc: "Monolithic stone chambers carved into earth illuminated by soft skylight." },
  { title: "Wakhan Corridor Vista", category: "Calm Nature", seed: "wakhan-corridor", mood: "Untamed Horizon", desc: "Dramatic mountain gateway between civilizations under clear blue sky." },
  { title: "Amber Dune Mirage", category: "Atmospheric Skies", seed: "amber-dunes", mood: "Warm Stillness", desc: "Silky desert sand ripples reflecting warm early morning sun." },
  { title: "Silk Road Arches", category: "Minarets & Heritage", seed: "silk-road-arches", mood: "Heritage", desc: "Caravanserai courtyards framed by vaulted stone masonry." },
  { title: "Jalalabad Citrus Breeze", category: "Calm Nature", seed: "jalalabad-breeze", mood: "Freshness", desc: "Sunlit subtropical gardens swaying in gentle warm breeze." },
  { title: "Zarafshan Ripples", category: "Abstract Glass", seed: "zarafshan-ripples", mood: "Fluid Motion", desc: "Prismatic crystalline textures refracting sunlight." },
  { title: "Koh-e Baba Sunrise", category: "Calm Nature", seed: "kohe-baba", mood: "Summit Awakening", desc: "Rugged ridgeline glowing purple and gold at first light." },
  { title: "Shahr-e Gholghola Ruins", category: "Minarets & Heritage", seed: "gholghola-ruins", mood: "Contemplation", desc: "Historic earthen citadel rising above the valley floor." },
  { title: "Chaqmaqtin Lake", category: "Calm Nature", seed: "chaqmaqtin-lake", mood: "Glacial Peace", desc: "High altitude alpine lake nestled among rolling tundra." },
  { title: "Hari River Sunset", category: "Atmospheric Skies", seed: "hari-river", mood: "Gentle Evening", desc: "Soft peach and turquoise hues reflecting on river bends." },
  { title: "Mazar Blue Dome", category: "Minarets & Heritage", seed: "mazar-blue-dome", mood: "Spiritual Light", desc: "Brilliant cobalt and turquoise ceramic tiles glittering in daylight." },
  { title: "Faryab Wheat Fields", category: "Calm Nature", seed: "faryab-wheat", mood: "Golden Warmth", desc: "Endless golden wheat fields swaying under warm summer sky." },
  { title: "Kunar Alpine Cascade", category: "Calm Nature", seed: "kunar-cascade", mood: "Revitalizing", desc: "Crystal clear waterfall tumbling down verdant granite cliffs." },
  { title: "Murghab Oasis Twilight", category: "Atmospheric Skies", seed: "murghab-twilight", mood: "Peaceful Dusk", desc: "Emerald oasis surrounded by peaceful dusk horizon." },
  { title: "Badakhshan Ruby Glow", category: "Abstract Glass", seed: "badakhshan-ruby", mood: "Radiant Depth", desc: "Deep crimson and amber crystalline facet reflections." },
  { title: "Spin Ghar Pine Ridge", category: "Calm Nature", seed: "spin-ghar", mood: "Mountain Strength", desc: "Pine-covered mountain slope greeting morning mist." },
  { title: "Celestial Minaret", category: "Minarets & Heritage", seed: "celestial-minaret", mood: "Transcendent", desc: "Slender minaret piercing the bright azure sky." },
];

export function buildDownloadedWallpaperBatch(batchPrefix = 'cloud-pack-v1') {
  return DOWNLOADED_CLOUD_THEMES.map((theme, index) => {
    const num = String(index + 1).padStart(2, '0');
    const slug = theme.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const id = \`dl-\${num}-\${slug}\`;
    const seed = \`\${batchPrefix}-\${theme.seed}-\${index + 1}\`;
    
    // Explicit bright daytime image paired with exact matching dark nighttime counterpart
    const lightImage = \`https://picsum.photos/seed/momentum-cloud-day-\${theme.seed}-\${index + 1}/720/1280\`;
    const darkImage = \`https://picsum.photos/seed/momentum-cloud-night-\${theme.seed}-\${index + 1}/720/1280\`;
    const fallback = \`https://picsum.photos/id/\${((index + 40) * 7 + 10) % 100}/720/1280\`;

    return {
      id,
      day: index + 1,
      num,
      name: theme.title,
      title: \`\${num} • \${theme.title}\`,
      rawTitle: theme.title,
      category: theme.category,
      mood: theme.mood,
      badge: 'Cloud Sync',
      description: theme.desc,
      seed,
      isDownloaded: true,
      // Strict Light & Dark pairing structure
      thumbnail: lightImage,
      thumbnailUrl: lightImage,
      thumb: lightImage,
      lightImage,
      darkImage,
      lightThumb: lightImage,
      darkThumb: darkImage,
      lightUrl: lightImage,
      darkUrl: darkImage,
      url: lightImage,
      fallback,
    };
  });
}

export const DOWNLOADED_WALLPAPERS_BATCH = buildDownloadedWallpaperBatch();
export const ALL_WALLPAPERS = [...BACKGROUND_LIBRARY, ...DOWNLOADED_WALLPAPERS_BATCH];
`;

const oldEnd = `export function getBackgroundById(id, customWallpaper) {
  if (id === 'custom' || (typeof id === 'string' && (id.startsWith('blob:') || id.startsWith('data:')))) {
    const customUrl = customWallpaper || id;
    return {
      id: 'custom',
      day: 0,
      num: 'Custom',
      name: 'Custom Uploaded Wallpaper',
      title: 'Custom Uploaded Wallpaper',
      rawTitle: 'Custom Uploaded Wallpaper',
      category: 'Custom / Upload',
      mood: 'Personal Atmosphere',
      badge: 'Personal',
      description: 'Your own personalized custom uploaded wallpaper.',
      seed: 'custom',
      thumbnail: customUrl,
      thumbnailUrl: customUrl,
      thumb: customUrl,
      lightImage: customUrl,
      darkImage: customUrl,
      lightThumb: customUrl,
      darkThumb: customUrl,
      lightUrl: customUrl,
      darkUrl: customUrl,
      url: customUrl,
      fallback: customUrl,
    };
  }
  if (!id) return BACKGROUND_LIBRARY[3];
  return BACKGROUND_LIBRARY.find((bg) => bg.id === id) || BACKGROUND_LIBRARY[0];
}

export function generateWallpaperBatch(batchPrefix = 'curated-pack-v1') {
  return BACKGROUND_LIBRARY.map((bg, index) => ({
    ...bg,
    seed: \`\${batchPrefix}-\${bg.seed}-\${index + 1}\`,
  }));
}

export const curatedWallpapers = BACKGROUND_LIBRARY;
export const defaultWallpapers = BACKGROUND_LIBRARY;`;

const newEnd = `export function getBackgroundById(id, customWallpaper, extraWallpapers = []) {
  if (id === 'custom' || (typeof id === 'string' && (id.startsWith('blob:') || id.startsWith('data:')))) {
    const customUrl = customWallpaper || id;
    return {
      id: 'custom',
      day: 0,
      num: 'Custom',
      name: 'Custom Uploaded Wallpaper',
      title: 'Custom Uploaded Wallpaper',
      rawTitle: 'Custom Uploaded Wallpaper',
      category: 'Custom / Upload',
      mood: 'Personal Atmosphere',
      badge: 'Personal',
      description: 'Your own personalized custom uploaded wallpaper.',
      seed: 'custom',
      thumbnail: customUrl,
      thumbnailUrl: customUrl,
      thumb: customUrl,
      lightImage: customUrl,
      darkImage: customUrl,
      lightThumb: customUrl,
      darkThumb: customUrl,
      lightUrl: customUrl,
      darkUrl: customUrl,
      url: customUrl,
      fallback: customUrl,
    };
  }

  // 1. Search in extra/custom wallpapers (e.g. state or context)
  if (Array.isArray(extraWallpapers) && extraWallpapers.length > 0) {
    const foundExtra = extraWallpapers.find((bg) => bg.id === id);
    if (foundExtra) return foundExtra;
  }

  // 2. Search in Downloaded Cloud Batch
  const foundDl = DOWNLOADED_WALLPAPERS_BATCH.find((bg) => bg.id === id);
  if (foundDl) return foundDl;

  // 3. Search in default BACKGROUND_LIBRARY
  if (!id) return BACKGROUND_LIBRARY[3];
  return BACKGROUND_LIBRARY.find((bg) => bg.id === id) || BACKGROUND_LIBRARY[0];
}

export function getWallpaperPair(id, customWallpaper, isDarkMode = false, extraWallpapers = []) {
  const bg = getBackgroundById(id, customWallpaper, extraWallpapers);
  const lightImage = bg.lightImage || bg.lightUrl || bg.thumbnail || bg.url;
  const darkImage = bg.darkImage || bg.darkUrl || bg.thumbnail || bg.url;
  const activeImage = isDarkMode ? darkImage : lightImage;
  return {
    id: bg.id,
    name: bg.name || bg.title,
    bg,
    lightImage,
    darkImage,
    activeImage,
    isDarkMode: !!isDarkMode,
  };
}

export function generateWallpaperBatch(batchPrefix = 'online-batch') {
  return buildDownloadedWallpaperBatch(batchPrefix);
}

export const curatedWallpapers = BACKGROUND_LIBRARY;
export const defaultWallpapers = BACKGROUND_LIBRARY;`;

const normalizedContent = content.replace(/\r\n/g, '\n');
const normalizedOldEnd = oldEnd.replace(/\r\n/g, '\n');

if (!normalizedContent.includes(normalizedOldEnd)) {
  console.error("Could not find oldEnd in defaultWallpapers.js");
  process.exit(1);
}

const updated = normalizedContent.replace(
  normalizedOldEnd,
  downloadedThemesBlock + '\n' + newEnd
);

fs.writeFileSync(path, updated, 'utf8');
console.log("Successfully updated defaultWallpapers.js with DOWNLOADED_CLOUD_THEMES and strict Light/Dark pairing!");

