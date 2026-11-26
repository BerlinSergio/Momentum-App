export function formatWallpaperNameFromSource(source, fallbackName = '') {
  const cleanFallback = typeof fallbackName === 'string' ? fallbackName.replace(/^\d+\s*[•\-_]\s*/, '').trim() : '';

  if (!source || typeof source !== 'string') {
    return cleanFallback || 'Atmosphere Wallpaper';
  }

  if (source.startsWith('data:') || source.startsWith('blob:')) {
    return cleanFallback || 'Custom Upload';
  }

  try {
    let str = source.split('?')[0].split('#')[0];
    const segments = str.split('/').filter(Boolean);
    let filename = segments[segments.length - 1] || str;

    if (/^\d+(x\d+)?$/.test(filename) || filename === '1280' || filename === '720') {
      for (let i = segments.length - 2; i >= 0; i--) {
        const seg = segments[i];
        if (seg && !/^\d+$/.test(seg) && seg !== 'seed') {
          filename = seg;
          break;
        }
      }
    }

    filename = filename.replace(/^momentum-(light|dark|cloud-day|cloud-night)-/, '');
    filename = filename.replace(/^(cloud-pack-[a-z0-9]+|cloud-batch-\d+|online-batch|test-cloud-pack-[a-z0-9]+)-/, '');
    filename = filename.replace(/^bg-\d+-/, '');
    filename = filename.replace(/^dl-\d+-/, '');
    filename = filename.replace(/^\d+\s*[•\-_]\s*/, '');
    filename = filename.replace(/-\d+$/, '');
    filename = filename.replace(/\.(jpe?g|png|webp|svg|avif)$/i, '');
    filename = filename.replace(/[-_]+/g, ' ').trim();

    if (filename.length > 0) {
      const words = filename.split(/\s+/).map((w) => {
        if (!w) return '';
        return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
      });
      const result = words.join(' ');
      if (result && result !== 'Photos' && result !== 'Picsum' && !/^\d+$/.test(result)) {
        return result;
      }
    }
  } catch {
    // fallback
  }

  return cleanFallback || 'Serene Atmosphere';
}

/**
 * First-Class "Pure Minimal / Solid Background" (White in Light, Deep Obsidian Black in Dark)
 */
export const NONE_WALLPAPER = {
  id: 'none',
  name: 'Pure Minimal',
  title: 'Pure Minimal',
  rawTitle: 'Pure Minimal (Solid Background)',
  category: 'Pure Minimal',
  mood: 'Solid Color',
  badge: 'Minimal',
  description: 'Pure solid background without images or blur effects. Crisp white in Light Mode, deep obsidian in Dark Mode.',
  isNone: true,
  lightBg: '#FFFFFF',
  darkBg: '#090D16',
  lightGradient: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
  darkGradient: 'linear-gradient(135deg, #090d16 0%, #000000 100%)',
  gradient: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
  thumbnail: null,
  thumbnailUrl: null,
  thumb: null,
  lightImage: null,
  darkImage: null,
  lightThumb: null,
  darkThumb: null,
  lightUrl: null,
  darkUrl: null,
  url: null,
  fallback: null,
};

/**
 * 30 Master Curated Themes with Guaranteed Fast-Loading CDN Photography AND Rich Multi-Stop CSS Gradients
 */
export const CURATED_THEMES = [
  {
    filename: "dawn-tranquility.jpg",
    category: "Atmospheric Skies",
    seed: "dawn-tranquility",
    mood: "Calm / Balance",
    desc: "Gentle pastel dawn with soft pink clouds floating across tranquil turquoise-blue morning sky.",
    lightPhoto: "photo-1506744038136-46273834b3fb",
    darkPhoto: "photo-1519681393784-d120267933ba",
    lightGradient: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 50%, #84fab0 100%)",
    darkGradient: "linear-gradient(135deg, #1b1035 0%, #2f2a58 50%, #0f172a 100%)",
  },
  {
    filename: "kabul-solitude.jpg",
    category: "Calm Nature",
    seed: "kabul-solitude",
    mood: "Focus / Clarity",
    desc: "Majestic mountains during peaceful mist sunrise, soft blue fog blankets mountain valley.",
    lightPhoto: "photo-1464822759023-fed622ff2c3b",
    darkPhoto: "photo-1509114397022-ed747cca3f65",
    lightGradient: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 50%, #e0c3fc 100%)",
    darkGradient: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #020617 100%)",
  },
  {
    filename: "minaret-sunrise.jpg",
    category: "Minarets & Heritage",
    seed: "minaret-sunrise",
    mood: "Spiritual Warmth",
    desc: "Silhouette of an elegant historic minaret rising gently against glowing golden-apricot dawn sky.",
    lightPhoto: "photo-1495616811223-4d98c6e9c869",
    darkPhoto: "photo-1534447677768-be436bb09401",
    lightGradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fec564 100%)",
    darkGradient: "linear-gradient(135deg, #381228 0%, #581c87 50%, #1e1b4b 100%)",
  },
  {
    filename: "serene-horizon.jpg",
    category: "Atmospheric Skies",
    seed: "serene-horizon",
    mood: "Contemplation",
    desc: "Breathtaking ethereal morning horizon with pastel blush, lavender, and celestial golden light.",
    lightPhoto: "photo-1507525428034-b723cf961d3e",
    darkPhoto: "photo-1506703719100-a0f3a48c0f86",
    lightGradient: "linear-gradient(135deg, #fad0c4 0%, #ffd1ff 50%, #a1c4fd 100%)",
    darkGradient: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #172554 100%)",
  },
  {
    filename: "emerald-oasis.jpg",
    category: "Calm Nature",
    seed: "emerald-oasis",
    mood: "Revitalization",
    desc: "Emerald green tropical palm fronds with morning dewdrops, backlit by soft ethereal luminous sunbeams.",
    lightPhoto: "photo-1518495973542-4542c06a5843",
    darkPhoto: "photo-1518709268805-4e9042af9f23",
    lightGradient: "linear-gradient(135deg, #10b981 0%, #34d399 50%, #059669 100%)",
    darkGradient: "linear-gradient(135deg, #022c22 0%, #064e3b 50%, #047857 100%)",
  },
  {
    filename: "lavender-haze.jpg",
    category: "Abstract Glass",
    seed: "lavender-haze",
    mood: "Dream State",
    desc: "Abstract flowing translucent fluid ribbon in pastel lavender, iris violet, and light magenta tones.",
    lightPhoto: "photo-1511447333015-45b65e60f6d5",
    darkPhoto: "photo-1511447333015-45b65e60f6d5",
    lightGradient: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
    darkGradient: "linear-gradient(135deg, #2e1065 0%, #4c1d95 50%, #1e1b4b 100%)",
  },
  {
    filename: "sacred-geometry.jpg",
    category: "Minarets & Heritage",
    seed: "sacred-geometry",
    mood: "Intricate Calm",
    desc: "Subtle Arabesque geometric mandala embossed on iridescent ivory silk canvas with diffuse ambient illumination.",
    lightPhoto: "photo-1579783900882-c0d3dad7b119",
    darkPhoto: "photo-1550684848-fac1c5b4e853",
    lightGradient: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 50%, #e2d1c3 100%)",
    darkGradient: "linear-gradient(135deg, #111827 0%, #1f2937 50%, #030712 100%)",
  },
  {
    filename: "mountain-zenith.jpg",
    category: "Calm Nature",
    seed: "mountain-zenith",
    mood: "High Perspective",
    desc: "Snowcapped mountain peak touching high celestial blue atmosphere with soft crystal cloud wisps.",
    lightPhoto: "photo-1486870591958-9b9d0d1dda99",
    darkPhoto: "photo-1486870591958-9b9d0d1dda99",
    lightGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6b8dd6 100%)",
    darkGradient: "linear-gradient(135deg, #090d16 0%, #172554 50%, #030712 100%)",
  },
  {
    filename: "mountain-horizon.jpg",
    category: "Calm Nature",
    seed: "mountain-horizon",
    mood: "Peace / Stillness",
    desc: "Vast mountain ridge bathed in gentle golden hour warmth.",
    lightPhoto: "photo-1470071459604-3b5ec3a7fe05",
    darkPhoto: "photo-1470071459604-3b5ec3a7fe05",
    lightGradient: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
    darkGradient: "linear-gradient(135deg, #1f2937 0%, #374151 50%, #111827 100%)",
  },
  {
    filename: "quiet-solitude.jpg",
    category: "Atmospheric Skies",
    seed: "quiet-solitude",
    mood: "Deep Breath",
    desc: "Soft ambient twilight glowing gently over quiet landscape.",
    lightPhoto: "photo-1509114397022-ed747cca3f65",
    darkPhoto: "photo-1509114397022-ed747cca3f65",
    lightGradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    darkGradient: "linear-gradient(135deg, #0a0e17 0%, #1e1b4b 50%, #020617 100%)",
  },
  {
    filename: "cosmic-nebula.jpg",
    category: "Abstract Glass",
    seed: "cosmic-nebula",
    mood: "Transcendence",
    desc: "Deep space celestial dust with swirling luminous starlight.",
    lightPhoto: "photo-1506703719100-a0f3a48c0f86",
    darkPhoto: "photo-1506703719100-a0f3a48c0f86",
    lightGradient: "linear-gradient(135deg, #c471ed 0%, #f64f59 50%, #12c2e9 100%)",
    darkGradient: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
  },
  {
    filename: "dusk-reflection.jpg",
    category: "Atmospheric Skies",
    seed: "dusk-reflection",
    mood: "Reflection",
    desc: "Serene lake mirroring vibrant amber and violet twilight.",
    lightPhoto: "photo-1501785888041-af3ef285b470",
    darkPhoto: "photo-1501785888041-af3ef285b470",
    lightGradient: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)",
    darkGradient: "linear-gradient(135deg, #31102f 0%, #4a154b 50%, #090d16 100%)",
  },
  {
    filename: "ancient-pillars.jpg",
    category: "Minarets & Heritage",
    seed: "ancient-pillars",
    mood: "Timeless",
    desc: "Stone arches and ancient colonnades illuminated by morning sun.",
    lightPhoto: "photo-1544620347-c4fd4a3d5957",
    darkPhoto: "photo-1544620347-c4fd4a3d5957",
    lightGradient: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    darkGradient: "linear-gradient(135deg, #1c1917 0%, #292524 50%, #0c0a09 100%)",
  },
  {
    filename: "nordic-mist.jpg",
    category: "Calm Nature",
    seed: "nordic-mist",
    mood: "Crisp Air",
    desc: "Whispering pine forest enveloped in cool ethereal morning fog.",
    lightPhoto: "photo-1473448912268-2022ce9509d8",
    darkPhoto: "photo-1473448912268-2022ce9509d8",
    lightGradient: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
    darkGradient: "linear-gradient(135deg, #064e3b 0%, #042f2e 50%, #021f1e 100%)",
  },
  {
    filename: "silent-waters.jpg",
    category: "Calm Nature",
    seed: "silent-waters",
    mood: "Inner Peace",
    desc: "Glass-like ocean surface under tranquil pastel dawn.",
    lightPhoto: "photo-1505118380757-91f5f5632de0",
    darkPhoto: "photo-1505118380757-91f5f5632de0",
    lightGradient: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
    darkGradient: "linear-gradient(135deg, #082f49 0%, #0c4a6e 50%, #020617 100%)",
  },
  {
    filename: "desert-twilight.jpg",
    category: "Atmospheric Skies",
    seed: "desert-twilight",
    mood: "Solitary Warmth",
    desc: "Endless desert dunes transitioning into starry nightfall.",
    lightPhoto: "photo-1509316975850-ff9c5deb0cd9",
    darkPhoto: "photo-1509316975850-ff9c5deb0cd9",
    lightGradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    darkGradient: "linear-gradient(135deg, #271018 0%, #451a03 50%, #0c0a09 100%)",
  },
  {
    filename: "geometric-glass.jpg",
    category: "Abstract Glass",
    seed: "geometric-glass",
    mood: "Clarity",
    desc: "Faceted crystalline prisms refracting soft prismatic daylight.",
    lightPhoto: "photo-1550684848-fac1c5b4e853",
    darkPhoto: "photo-1550684848-fac1c5b4e853",
    lightGradient: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
    darkGradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #0f172a 100%)",
  },
  {
    filename: "alpine-glow.jpg",
    category: "Calm Nature",
    seed: "alpine-glow",
    mood: "Elevated Mind",
    desc: "Rose-tinted mountain summits greeting early morning sun.",
    lightPhoto: "photo-1491555103944-7c647fd857e6",
    darkPhoto: "photo-1491555103944-7c647fd857e6",
    lightGradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    darkGradient: "linear-gradient(135deg, #4c0519 0%, #831843 50%, #18030c 100%)",
  },
  {
    filename: "starlight-mirage.jpg",
    category: "Atmospheric Skies",
    seed: "starlight-mirage",
    mood: "Night Wonder",
    desc: "Gentle desert horizon under crystalline Milky Way arch.",
    lightPhoto: "photo-1519681393784-d120267933ba",
    darkPhoto: "photo-1519681393784-d120267933ba",
    lightGradient: "linear-gradient(135deg, #accbee 0%, #e7f0fd 100%)",
    darkGradient: "linear-gradient(135deg, #090d16 0%, #1e1b4b 50%, #020617 100%)",
  },
  {
    filename: "terracotta-sunset.jpg",
    category: "Atmospheric Skies",
    seed: "terracotta-sunset",
    mood: "Warm Sanctuary",
    desc: "Warm earthen hues melting into sunset amber glow.",
    lightPhoto: "photo-1508739773434-c26b3d09e071",
    darkPhoto: "photo-1508739773434-c26b3d09e071",
    lightGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    darkGradient: "linear-gradient(135deg, #3b0764 0%, #701a75 50%, #1c0529 100%)",
  },
  {
    filename: "lush-highlands.jpg",
    category: "Calm Nature",
    seed: "lush-highlands",
    mood: "Grounded",
    desc: "Verdant rolling hills touching soft overcast sky.",
    lightPhoto: "photo-1472214103451-9374bd1c798e",
    darkPhoto: "photo-1472214103451-9374bd1c798e",
    lightGradient: "linear-gradient(135deg, #96fbc4 0%, #f9f586 100%)",
    darkGradient: "linear-gradient(135deg, #052e16 0%, #14532d 50%, #021a0c 100%)",
  },
  {
    filename: "ethereal-cloudscape.jpg",
    category: "Atmospheric Skies",
    seed: "ethereal-cloudscape",
    mood: "Elevation",
    desc: "Billowing pearl-white clouds floating in endless cyan sky.",
    lightPhoto: "photo-1534088568595-a066f410bcda",
    darkPhoto: "photo-1534088568595-a066f410bcda",
    lightGradient: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
    darkGradient: "linear-gradient(135deg, #0c4a6e 0%, #075985 50%, #082f49 100%)",
  },
  {
    filename: "zen-garden.jpg",
    category: "Abstract Glass",
    seed: "zen-garden",
    mood: "Mindfulness",
    desc: "Minimalist combed sand patterns with balanced river stones.",
    lightPhoto: "photo-1507652313519-d4e9174996dd",
    darkPhoto: "photo-1507652313519-d4e9174996dd",
    lightGradient: "linear-gradient(135deg, #e6e9f0 0%, #eef1f5 100%)",
    darkGradient: "linear-gradient(135deg, #18181b 0%, #27272a 50%, #09090b 100%)",
  },
  {
    filename: "opal-sands.jpg",
    category: "Calm Nature",
    seed: "opal-sands",
    mood: "Gentle Tide",
    desc: "Pristine white coastline with turquoise gentle ripples.",
    lightPhoto: "photo-1500530855697-b586d89ba3ee",
    darkPhoto: "photo-1500530855697-b586d89ba3ee",
    lightGradient: "linear-gradient(135deg, #48c6ef 0%, #6f86d6 100%)",
    darkGradient: "linear-gradient(135deg, #0369a1 0%, #0284c7 50%, #082f49 100%)",
  },
  {
    filename: "gilded-dome.jpg",
    category: "Minarets & Heritage",
    seed: "gilded-dome",
    mood: "Majesty",
    desc: "Golden arabesque cupola reflecting brilliant daylight.",
    lightPhoto: "photo-1564507592333-c60657eea523",
    darkPhoto: "photo-1564507592333-c60657eea523",
    lightGradient: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
    darkGradient: "linear-gradient(135deg, #451a03 0%, #78350f 50%, #1c0a02 100%)",
  },
  {
    filename: "canyon-sunbeam.jpg",
    category: "Calm Nature",
    seed: "canyon-sunbeam",
    mood: "Radiance",
    desc: "Shaft of golden light illuminating ancient sandstone canyon.",
    lightPhoto: "photo-1469854523086-cc02fe5d8800",
    darkPhoto: "photo-1469854523086-cc02fe5d8800",
    lightGradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    darkGradient: "linear-gradient(135deg, #431407 0%, #7c2d12 50%, #1a0803 100%)",
  },
  {
    filename: "pastel-meadow.jpg",
    category: "Calm Nature",
    seed: "pastel-meadow",
    mood: "Softness",
    desc: "Wildflowers swaying gently in early morning spring breeze.",
    lightPhoto: "photo-1465146344425-f00d5f5c8f07",
    darkPhoto: "photo-1465146344425-f00d5f5c8f07",
    lightGradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
    darkGradient: "linear-gradient(135deg, #3b0764 0%, #581c87 50%, #1e1b4b 100%)",
  },
  {
    filename: "midnight-horizon.jpg",
    category: "Atmospheric Skies",
    seed: "midnight-horizon",
    mood: "Quiet Night",
    desc: "Deep indigo twilight sky meeting tranquil distant horizon.",
    lightPhoto: "photo-1451187580459-43490279c0fa",
    darkPhoto: "photo-1451187580459-43490279c0fa",
    lightGradient: "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
    darkGradient: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)",
  },
  {
    filename: "harmonic-peace.jpg",
    category: "Abstract Glass",
    seed: "harmonic-peace",
    mood: "Harmony",
    desc: "Fluid glass ripples oscillating in serene optical symmetry.",
    lightPhoto: "photo-1518709268805-4e9042af9f23",
    darkPhoto: "photo-1518709268805-4e9042af9f23",
    lightGradient: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)",
    darkGradient: "linear-gradient(135deg, #134e4a 0%, #042f2e 50%, #021f1e 100%)",
  },
  {
    filename: "celestial-zenith.jpg",
    category: "Atmospheric Skies",
    seed: "celestial-zenith",
    mood: "Infinity",
    desc: "High atmosphere transitioning into deep indigo cosmos.",
    lightPhoto: "photo-1446776811953-b23d57bd21aa",
    darkPhoto: "photo-1446776811953-b23d57bd21aa",
    lightGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    darkGradient: "linear-gradient(135deg, #030712 0%, #0f172a 50%, #1e1b4b 100%)",
  },
];

export function buildBackgroundLibrary() {
  return CURATED_THEMES.map((theme, index) => {
    const num = String(index + 1).padStart(2, '0');
    const filename = theme.filename || `${theme.seed || 'wallpaper-' + num}.jpg`;
    const cleanName = formatWallpaperNameFromSource(filename, theme.title);
    const slug = cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const id = `bg-${num}-${slug}`;

    const lightImage = `https://images.unsplash.com/${theme.lightPhoto}?auto=format&fit=crop&w=720&q=80`;
    const darkImage = `https://images.unsplash.com/${theme.darkPhoto}?auto=format&fit=crop&w=720&q=80`;
    const lightGradient = theme.lightGradient;
    const darkGradient = theme.darkGradient;

    return {
      id,
      day: index + 1,
      num,
      name: cleanName,
      title: cleanName,
      rawTitle: cleanName,
      filename,
      category: theme.category,
      mood: theme.mood,
      badge: 'Adaptive',
      description: theme.desc,
      seed: theme.seed || slug,
      // Robust dual-mode assets with CSS gradient fallbacks
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
      lightGradient,
      darkGradient,
      gradient: lightGradient,
      fallback: lightImage,
    };
  });
}

export const BACKGROUND_LIBRARY = buildBackgroundLibrary();
export const DEFAULT_BACKGROUND_ID = 'bg-04-serene-horizon';

export const DOWNLOADED_CLOUD_THEMES = [
  { filename: "balkh-turquoise.jpg", category: "Minarets & Heritage", seed: "balkh-turquoise", mood: "Sacred Splendor", desc: "Intricate azure tiled archways illuminated by radiant morning sun.", photo: "photo-1544620347-c4fd4a3d5957", gradient: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)" },
  { filename: "lapis-vault.jpg", category: "Abstract Glass", seed: "lapis-vault", mood: "Deep Wonder", desc: "Polished celestial lapis stone with shimmering gold veins under soft daylight.", photo: "photo-1550684848-fac1c5b4e853", gradient: "linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 100%)" },
  { filename: "bamiyan-dawn.jpg", category: "Calm Nature", seed: "bamiyan-dawn", mood: "Serenity", desc: "Golden rays breaking over the dramatic sandstone cliffs of the historic valley.", photo: "photo-1464822759023-fed622ff2c3b", gradient: "linear-gradient(135deg, #d97706 0%, #b45309 100%)" },
  { filename: "hindu-kush.jpg", category: "Calm Nature", seed: "hindu-kush", mood: "High Perspective", desc: "Glacial snowpeaks touching clear blue morning stratosphere.", photo: "photo-1486870591958-9b9d0d1dda99", gradient: "linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)" },
  { filename: "bande-amir.jpg", category: "Atmospheric Skies", seed: "bande-amir", mood: "Pristine Calm", desc: "Mineral-rich crystalline blue lakes reflecting boundless clear sky.", photo: "photo-1507525428034-b723cf961d3e", gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)" },
  { filename: "herat-citadel.jpg", category: "Minarets & Heritage", seed: "herat-citadel", mood: "Timeless Majesty", desc: "Centuries-old sun-baked fortress walls bathed in bright daylight.", photo: "photo-1564507592333-c60657eea523", gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)" },
  { filename: "panjshir-river.jpg", category: "Calm Nature", seed: "panjshir-river", mood: "Fresh Flow", desc: "Verdant mountain valley with rushing emerald-tinted glacial currents.", photo: "photo-1472214103451-9374bd1c798e", gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)" },
  { filename: "ghazni-stars.jpg", category: "Atmospheric Skies", seed: "ghazni-stars", mood: "Nocturnal Wonder", desc: "Ancient victory towers reaching toward an expansive desert horizon.", photo: "photo-1519681393784-d120267933ba", gradient: "linear-gradient(135deg, #1e1b4b 0%, #090d16 100%)" },
  { filename: "pamir-steppe.jpg", category: "Calm Nature", seed: "pamir-steppe", mood: "Infinite Silence", desc: "Vast windswept plateau at the roof of the world under crisp morning air.", photo: "photo-1470071459604-3b5ec3a7fe05", gradient: "linear-gradient(135deg, #94a3b8 0%, #475569 100%)" },
  { filename: "kandahar-orchard.jpg", category: "Calm Nature", seed: "kandahar-orchard", mood: "Gentle Abundance", desc: "Pomegranate blossoms glowing softly under golden morning sunshine.", photo: "photo-1508739773434-c26b3d09e071", gradient: "linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)" },
  { filename: "nuristan-canopy.jpg", category: "Calm Nature", seed: "nuristan-canopy", mood: "Deep Sanctuary", desc: "Dense emerald alpine cedar trees filtered through crisp daylight rays.", photo: "photo-1473448912268-2022ce9509d8", gradient: "linear-gradient(135deg, #047857 0%, #064e3b 100%)" },
  { filename: "kabul-reflection.jpg", category: "Atmospheric Skies", seed: "kabul-reflection", mood: "Quiet Flow", desc: "Glassy water surface capturing pastel morning clouds.", photo: "photo-1501785888041-af3ef285b470", gradient: "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)" },
  { filename: "salang-frost.jpg", category: "Calm Nature", seed: "salang-frost", mood: "Crisp Focus", desc: "High alpine pass crowned in pristine frost and clear sky.", photo: "photo-1486870591958-9b9d0d1dda99", gradient: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)" },
  { filename: "samangan-caves.jpg", category: "Minarets & Heritage", seed: "samangan-caves", mood: "Ancient Peace", desc: "Monolithic stone chambers carved into earth illuminated by soft skylight.", photo: "photo-1544620347-c4fd4a3d5957", gradient: "linear-gradient(135deg, #78716c 0%, #44403c 100%)" },
  { filename: "wakhan-corridor.jpg", category: "Calm Nature", seed: "wakhan-corridor", mood: "Untamed Horizon", desc: "Dramatic mountain gateway between civilizations under clear blue sky.", photo: "photo-1464822759023-fed622ff2c3b", gradient: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)" },
  { filename: "amber-dunes.jpg", category: "Atmospheric Skies", seed: "amber-dunes", mood: "Warm Stillness", desc: "Silky desert sand ripples reflecting warm early morning sun.", photo: "photo-1509316975850-ff9c5deb0cd9", gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)" },
  { filename: "silk-road-arches.jpg", category: "Minarets & Heritage", seed: "silk-road-arches", mood: "Heritage", desc: "Caravanserai courtyards framed by vaulted stone masonry.", photo: "photo-1579783900882-c0d3dad7b119", gradient: "linear-gradient(135deg, #ea580c 0%, #c2410c 100%)" },
  { filename: "jalalabad-breeze.jpg", category: "Calm Nature", seed: "jalalabad-breeze", mood: "Freshness", desc: "Sunlit subtropical gardens swaying in gentle warm breeze.", photo: "photo-1518495973542-4542c06a5843", gradient: "linear-gradient(135deg, #84cc16 0%, #65a30d 100%)" },
  { filename: "zarafshan-ripples.jpg", category: "Abstract Glass", seed: "zarafshan-ripples", mood: "Fluid Motion", desc: "Prismatic crystalline textures refracting sunlight.", photo: "photo-1511447333015-45b65e60f6d5", gradient: "linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)" },
  { filename: "kohe-baba.jpg", category: "Calm Nature", seed: "kohe-baba", mood: "Summit Awakening", desc: "Rugged ridgeline glowing purple and gold at first light.", photo: "photo-1470071459604-3b5ec3a7fe05", gradient: "linear-gradient(135deg, #8b5cf6 0%, #f59e0b 100%)" },
  { filename: "gholghola-ruins.jpg", category: "Minarets & Heritage", seed: "gholghola-ruins", mood: "Contemplation", desc: "Historic earthen citadel rising above the valley floor.", photo: "photo-1469854523086-cc02fe5d8800", gradient: "linear-gradient(135deg, #b45309 0%, #78350f 100%)" },
  { filename: "chaqmaqtin-lake.jpg", category: "Calm Nature", seed: "chaqmaqtin-lake", mood: "Glacial Peace", desc: "High altitude alpine lake nestled among rolling tundra.", photo: "photo-1505118380757-91f5f5632de0", gradient: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)" },
  { filename: "hari-river.jpg", category: "Atmospheric Skies", seed: "hari-river", mood: "Gentle Evening", desc: "Soft peach and turquoise hues reflecting on river bends.", photo: "photo-1506744038136-46273834b3fb", gradient: "linear-gradient(135deg, #fdba74 0%, #2dd4bf 100%)" },
  { filename: "mazar-blue-dome.jpg", category: "Minarets & Heritage", seed: "mazar-blue-dome", mood: "Spiritual Light", desc: "Brilliant cobalt and turquoise ceramic tiles glittering in daylight.", photo: "photo-1495616811223-4d98c6e9c869", gradient: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)" },
  { filename: "faryab-wheat.jpg", category: "Calm Nature", seed: "faryab-wheat", mood: "Golden Warmth", desc: "Endless golden wheat fields swaying under warm summer sky.", photo: "photo-1465146344425-f00d5f5c8f07", gradient: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)" },
  { filename: "kunar-cascade.jpg", category: "Calm Nature", seed: "kunar-cascade", mood: "Revitalizing", desc: "Crystal clear waterfall tumbling down verdant granite cliffs.", photo: "photo-1500530855697-b586d89ba3ee", gradient: "linear-gradient(135deg, #06b6d4 0%, #059669 100%)" },
  { filename: "murghab-twilight.jpg", category: "Atmospheric Skies", seed: "murghab-twilight", mood: "Peaceful Dusk", desc: "Emerald oasis surrounded by peaceful dusk horizon.", photo: "photo-1509114397022-ed747cca3f65", gradient: "linear-gradient(135deg, #10b981 0%, #312e81 100%)" },
  { filename: "badakhshan-ruby.jpg", category: "Abstract Glass", seed: "badakhshan-ruby", mood: "Radiant Depth", desc: "Deep crimson and amber crystalline facet reflections.", photo: "photo-1518709268805-4e9042af9f23", gradient: "linear-gradient(135deg, #e11d48 0%, #b45309 100%)" },
  { filename: "spin-ghar.jpg", category: "Calm Nature", seed: "spin-ghar", mood: "Mountain Strength", desc: "Pine-covered mountain slope greeting morning mist.", photo: "photo-1534088568595-a066f410bcda", gradient: "linear-gradient(135deg, #15803d 0%, #0f766e 100%)" },
  { filename: "celestial-minaret.jpg", category: "Minarets & Heritage", seed: "celestial-minaret", mood: "Transcendent", desc: "Slender minaret piercing the bright azure sky.", photo: "photo-1446776811953-b23d57bd21aa", gradient: "linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)" },
];

export function buildDownloadedWallpaperBatch(batchPrefix = 'cloud-pack-v1') {
  return DOWNLOADED_CLOUD_THEMES.map((theme, index) => {
    const num = String(index + 1).padStart(2, '0');
    const filename = theme.filename || `${theme.seed || 'cloud-' + num}.jpg`;
    const cleanName = formatWallpaperNameFromSource(filename, theme.title);
    const slug = cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const id = `dl-${num}-${slug}`;
    const seed = `${batchPrefix}-${cleanName.toLowerCase().replace(/\s+/g, '-')}-${index + 1}`;

    const lightImage = `https://images.unsplash.com/${theme.photo}?auto=format&fit=crop&w=720&q=80`;
    const darkImage = `https://images.unsplash.com/${theme.photo}?auto=format&fit=crop&w=720&q=80`;
    const gradient = theme.gradient;

    return {
      id,
      day: index + 1,
      num,
      name: cleanName,
      title: cleanName,
      rawTitle: cleanName,
      filename,
      category: theme.category,
      mood: theme.mood,
      badge: 'Cloud Sync',
      description: theme.desc,
      seed,
      isDownloaded: false,
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
      lightGradient: gradient,
      darkGradient: gradient,
      gradient,
      fallback: lightImage,
    };
  });
}

export const DOWNLOADED_WALLPAPERS_BATCH = buildDownloadedWallpaperBatch();
export const ALL_WALLPAPERS = [...BACKGROUND_LIBRARY, ...DOWNLOADED_WALLPAPERS_BATCH];

export function getBackgroundById(id, customWallpaper, extraWallpapers = []) {
  if (id === 'none') {
    return NONE_WALLPAPER;
  }

  if (id === 'custom' || (typeof id === 'string' && (id.startsWith('blob:') || id.startsWith('data:')))) {
    const customUrl = customWallpaper || (typeof id === 'string' && id.startsWith('data:') ? id : null);
    const customName = formatWallpaperNameFromSource(customUrl, 'Custom Uploaded Wallpaper');
    return {
      id: 'custom',
      day: 0,
      num: 'Custom',
      name: customName,
      title: customName,
      rawTitle: customName,
      filename: customUrl || '',
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
      lightGradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      darkGradient: 'linear-gradient(135deg, #090d16 0%, #020617 100%)',
      gradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      fallback: customUrl,
      isCustom: true,
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
  return BACKGROUND_LIBRARY.find((bg) => bg.id === id) || BACKGROUND_LIBRARY[3] || BACKGROUND_LIBRARY[0];
}

export function getWallpaperPair(id, customWallpaper, isDarkMode = false, extraWallpapers = []) {
  if (id === 'none') {
    return {
      id: 'none',
      name: 'Pure Minimal',
      bg: NONE_WALLPAPER,
      lightImage: null,
      darkImage: null,
      activeImage: null,
      isDarkMode: !!isDarkMode,
      isNone: true,
    };
  }

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
    isNone: false,
  };
}

export function generateWallpaperBatch(batchPrefix = 'online-batch') {
  return buildDownloadedWallpaperBatch(batchPrefix);
}

export const curatedWallpapers = BACKGROUND_LIBRARY;
export const defaultWallpapers = BACKGROUND_LIBRARY;
