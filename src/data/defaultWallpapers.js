export const CURATED_THEMES = [
  { title: "Serene Dawn", category: "Skies", seed: "serene-dawn" },
  { title: "Misty Pine", category: "Nature", seed: "misty-pine" },
  { title: "Celestial Night", category: "Space", seed: "celestial-night" },
  { title: "Golden Dunes", category: "Desert", seed: "golden-dunes" },
  { title: "Minimal Arch", category: "Architecture", seed: "minimal-arch" },
  { title: "Emerald Valley", category: "Nature", seed: "emerald-valley" },
  { title: "Azure Coast", category: "Ocean", seed: "azure-coast" },
  { title: "Soft Lavender", category: "Pastel", seed: "soft-lavender" },
  { title: "Mountain Horizon", category: "Landscape", seed: "mountain-horizon" },
  { title: "Quiet Solitude", category: "Atmosphere", seed: "quiet-solitude" },
  { title: "Cosmic Nebula", category: "Space", seed: "cosmic-nebula" },
  { title: "Dusk Reflection", category: "Sunset", seed: "dusk-reflection" },
  { title: "Ancient Pillars", category: "Heritage", seed: "ancient-pillars" },
  { title: "Nordic Mist", category: "Nature", seed: "nordic-mist" },
  { title: "Silent Waters", category: "Ocean", seed: "silent-waters" },
  { title: "Desert Twilight", category: "Desert", seed: "desert-twilight" },
  { title: "Geometric Glass", category: "Minimal", seed: "geometric-glass" },
  { title: "Alpine Glow", category: "Mountain", seed: "alpine-glow" },
  { title: "Starlight Mirage", category: "Night", seed: "starlight-mirage" },
  { title: "Terracotta Sunset", category: "Warmth", seed: "terracotta-sunset" },
  { title: "Lush Highlands", category: "Landscape", seed: "lush-highlands" },
  { title: "Ethereal Cloudscape", category: "Skies", seed: "ethereal-cloudscape" },
  { title: "Zen Garden", category: "Minimal", seed: "zen-garden" },
  { title: "Opal Sands", category: "Ocean", seed: "opal-sands" },
  { title: "Gilded Dome", category: "Heritage", seed: "gilded-dome" },
  { title: "Canyon Sunbeam", category: "Nature", seed: "canyon-sunbeam" },
  { title: "Pastel Meadow", category: "Flora", seed: "pastel-meadow" },
  { title: "Midnight Horizon", category: "Night", seed: "midnight-horizon" },
  { title: "Sacred Geometric", category: "Abstract", seed: "sacred-geometric" },
  { title: "Harmonic Peace", category: "Zenith", seed: "harmonic-peace" },
];

export function generateWallpaperBatch(batchPrefix = 'curated-pack-v1') {
  return CURATED_THEMES.map((theme, index) => {
    const seed = `${batchPrefix}-${theme.seed}-${index + 1}`;
    return {
      id: `wp-${seed}`,
      day: index + 1,
      title: theme.title,
      category: theme.category,
      seed,
      // 9:16 aspect ratio high-res wallpapers (720x1280) and thumbnails (270x480)
      url: `https://picsum.photos/seed/${seed}/720/1280`,
      thumb: `https://picsum.photos/seed/${seed}/270/480`,
      fallback: `https://picsum.photos/id/${(index * 7 + 10) % 100}/720/1280`,
    };
  });
}

export const curatedWallpapers = generateWallpaperBatch('curated-pack-v1');
export const defaultWallpapers = curatedWallpapers;
