const fs = require('fs');

const code = `export const CURATED_THEMES = [
  { title: "Dawn Tranquility", category: "Atmospheric Skies", seed: "serene-dawn", mood: "Calm / Balance", desc: "Gentle pastel dawn with soft pink clouds floating across tranquil turquoise-blue morning sky." },
  { title: "Kabul Solitude", category: "Calm Nature", seed: "misty-pine", mood: "Focus / Clarity", desc: "Majestic mountains during peaceful mist sunrise, soft blue fog blankets mountain valley." },
  { title: "Minaret Sunrise", category: "Minarets & Heritage", seed: "celestial-night", mood: "Spiritual Warmth", desc: "Silhouette of an elegant historic minaret rising gently against glowing golden-apricot dawn sky." },
  { title: "Serene Horizon", category: "Atmospheric Skies", seed: "golden-dunes", mood: "Contemplation", desc: "Breathtaking ethereal morning horizon with pastel blush, lavender, and celestial golden light." },
  { title: "Emerald Oasis", category: "Calm Nature", seed: "minimal-arch", mood: "Revitalization", desc: "Emerald green tropical palm fronds with morning dewdrops, backlit by soft ethereal luminous sunbeams." },
  { title: "Lavender Haze", category: "Abstract Glass", seed: "emerald-valley", mood: "Dream State", desc: "Abstract flowing translucent fluid ribbon in pastel lavender, iris violet, and light magenta tones." },
  { title: "Sacred Geometry", category: "Minarets & Heritage", seed: "azure-coast", mood: "Intricate Calm", desc: "Subtle Arabesque geometric mandala embossed on iridescent ivory silk canvas with diffuse ambient illumination." },
  { title: "Mountain Zenith", category: "Calm Nature", seed: "soft-lavender", mood: "High Perspective", desc: "Snowcapped mountain peak touching high celestial blue atmosphere with soft crystal cloud wisps." },
  { title: "Mountain Horizon", category: "Calm Nature", seed: "mountain-horizon", mood: "Peace / Stillness", desc: "Vast mountain ridge bathed in gentle golden hour warmth." },
  { title: "Quiet Solitude", category: "Atmospheric Skies", seed: "quiet-solitude", mood: "Deep Breath", desc: "Soft ambient twilight glowing gently over quiet landscape." },
  { title: "Cosmic Nebula", category: "Abstract Glass", seed: "cosmic-nebula", mood: "Transcendence", desc: "Deep space celestial dust with swirling luminous starlight." },
  { title: "Dusk Reflection", category: "Atmospheric Skies", seed: "dusk-reflection", mood: "Reflection", desc: "Serene lake mirroring vibrant amber and violet twilight." },
  { title: "Ancient Pillars", category: "Minarets & Heritage", seed: "ancient-pillars", mood: "Timeless", desc: "Stone arches and ancient colonnades illuminated by morning sun." },
  { title: "Nordic Mist", category: "Calm Nature", seed: "nordic-mist", mood: "Crisp Air", desc: "Whispering pine forest enveloped in cool ethereal morning fog." },
  { title: "Silent Waters", category: "Calm Nature", seed: "silent-waters", mood: "Inner Peace", desc: "Glass-like ocean surface under tranquil pastel dawn." },
  { title: "Desert Twilight", category: "Atmospheric Skies", seed: "desert-twilight", mood: "Solitary Warmth", desc: "Endless desert dunes transitioning into starry nightfall." },
  { title: "Geometric Glass", category: "Abstract Glass", seed: "geometric-glass", mood: "Clarity", desc: "Faceted crystalline prisms refracting soft prismatic daylight." },
  { title: "Alpine Glow", category: "Calm Nature", seed: "alpine-glow", mood: "Elevated Mind", desc: "Rose-tinted mountain summits greeting early morning sun." },
  { title: "Starlight Mirage", category: "Atmospheric Skies", seed: "starlight-mirage", mood: "Night Wonder", desc: "Gentle desert horizon under crystalline Milky Way arch." },
  { title: "Terracotta Sunset", category: "Atmospheric Skies", seed: "terracotta-sunset", mood: "Warm Sanctuary", desc: "Warm earthen hues melting into sunset amber glow." },
  { title: "Lush Highlands", category: "Calm Nature", seed: "lush-highlands", mood: "Grounded", desc: "Verdant rolling hills touching soft overcast sky." },
  { title: "Ethereal Cloudscape", category: "Atmospheric Skies", seed: "ethereal-cloudscape", mood: "Elevation", desc: "Billowing pearl-white clouds floating in endless cyan sky." },
  { title: "Zen Garden", category: "Abstract Glass", seed: "zen-garden", mood: "Mindfulness", desc: "Minimalist combed sand patterns with balanced river stones." },
  { title: "Opal Sands", category: "Calm Nature", seed: "opal-sands", mood: "Gentle Tide", desc: "Pristine white coastline with turquoise gentle ripples." },
  { title: "Gilded Dome", category: "Minarets & Heritage", seed: "gilded-dome", mood: "Majesty", desc: "Golden arabesque cupola reflecting brilliant daylight." },
  { title: "Canyon Sunbeam", category: "Calm Nature", seed: "canyon-sunbeam", mood: "Radiance", desc: "Shaft of golden light illuminating ancient sandstone canyon." },
  { title: "Pastel Meadow", category: "Calm Nature", seed: "pastel-meadow", mood: "Softness", desc: "Wildflowers swaying gently in early morning spring breeze." },
  { title: "Midnight Horizon", category: "Atmospheric Skies", seed: "midnight-horizon", mood: "Quiet Night", desc: "Deep indigo twilight sky meeting tranquil distant horizon." },
  { title: "Harmonic Peace", category: "Abstract Glass", seed: "harmonic-peace", mood: "Harmony", desc: "Fluid glass ripples oscillating in serene optical symmetry." },
  { title: "Celestial Zenith", category: "Atmospheric Skies", seed: "celestial-zenith", mood: "Infinity", desc: "High atmosphere transitioning into deep indigo cosmos." },
];

export const BENCHMARK_AIDA_LIGHT_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB5uWpBFhLtJE_CzLc_rXDSzmK-rCsEuKskS2uxZxnHCMDNP_uDUq472xsEWbbU4H0fiSoXwXWAIOrvuqWUBFaHP0fHVckaQ-zA7E3NIrjexIXqpj5Tp91DfMysvz6cEMGAtN27M7enEq8FUs9DUDcF8cJt8EzbYoDACXYxWQF9hQmWRz4XnNyplhjecryCuFGaif4b-909zydTdjzH6eJxH2tmHglJb0h7daR2wgcfXPu3pXqg8Zw",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBR36Q5ekCwBTAgQLo1hD3sFG_nWzh8M6DfnIrM9nLlKTkMdVNuOlIHIdj3ezECvlylkESROmXPRheO_kBUoM-7Zy9Y4ZGYHqFeK3X7_Jxx9aCQaVCQ6fcKOmIDo0Jy-aG5HN2l1R4wdkzbDdHVlEYXN_jS40mfGFYh8LKG37uWH3dT-bQyiqR1OMuWfh1vcffWSMQkS7da372FIn3ABnlBsIqnXlUG2IngK4UtdFrYnsAS4gxGv4k",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB3SEuILWtH31ONeTC67HJeg-_bcuA_E4rdgIVbSgqbt5Hi32lNLr_M4i9RPE_oE36VreO-5sTGFy9HpAf8eN3k9iCPVoaQtquE0cPJBQtKBCVeuKVkaheE8Wa-kT8f1tsxDYLFqHCh2aZuFx82odqtm_ZIfqebg3dS3GGNDbXgOC7QuRpjhwWfhgrj9kNRE57KsImmnCCCYxsaOGtpTrhXaQ-A3Q78rimGwyYoC1NQ0s5RYOpMxns",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDSIeDNP5E9rhEHW88x8487AsrAZFYz3_ZpBAGZg4eny-WrozvXPerDq3BCO_HqGAhm3lOB2z6yjLMb2sMRwvjG68M2S8D-Nz5C9cYcbUSyxj4KFolDg3ZxBRLbb9D324iE4sLC7v3v3fHbZ10KmtPXdlxqk_ZWBqNB74QXghvqUVixmgVDjQp_gTy0i4ZmL1yxxX04u5WxuYELraI74RH0D57tAbDPJ42qLCeN98Le3CCMMpxNZK8",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC8aqO9jh6ZJDbnN9PUNWUQFEBMCBAVbklsueoQcBfMYO_Ef38AUXVyZRNnh8685mlJKyasRyKCSgMUx8NyZTo63w7y0dK02-CZ3tig5ah5QZie_XisecQ9C0HWFvCdaneU8e6al8xYFbMjt9hUtN7o7qwM59CsytUdQvlv9GjlnW-MkP7RUo8uPaCWz8uTk4ZqbOVZazwKYvHbJBZJWmzN5BPTFP0l5JdBUNvtZkpoXFYkFiE5QUU",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAjCj_-xHxA20QDSYA7zT_ltMiTfPvj8ymbX8fiib9vCdMw2bys8AAwF9GE5H29dRfAXnrPX_Vs68T5b7slJAFJ4OYo_NTbvpizsGUNVNEftjRTbKUQhzQJ6nzZaQY5Ta1Do-fxulYzDfm0pe9pvjMPjJqiT_fVCA4OOApPpt-SW93hT7PREct5d_cbsRmJL-JCU1fDKlTZrI3dk7xOPen0hS3ega6UwQ_tajUwAGpDjPkLNq1DyXQ",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAZbEL5rwDoqcr4TX7uTEF2VR9y5p6gs6Yjqied-IMhkW4Z0-cpzIFVTvhyZQbFXEqcQB6IfNNSbW8itN8nTTru7xZP_ob2v6vpVcm8VA4cZnmViXw-tyMXPT2jkbeiLgl4ut2sPVEjmgIy2Tcmv6j8FpZgVBtCQS7ZQiOKJNJs51PRPhjXOdqanj2hv451NmJ3IRV3Q0kQ9WY_u7G8JnD3wj2DS7FvBvpHhn6fp1JA7AicK79bhpo",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBG7tatWBHPK8mrtUFS5MYZx9TF2QQM5AzjB8TSwk_qWRQ6BGvlUbravdzjbhoQtlkOtrnSBOP7KiGZpeDRtygmAHAQ6TKK9gdmtoNvMJQu21HNInoiDMIh4yDQ5kDDoOjsxMJsO3vZz9p_WNItktetaOKMvqU7r9iuQNgwBq2SNcZtVuZdGAqx4xfEYko3Mu3An13dNY7r8c_YF5M7FkYAOPRVVVrSnyuDbm8gINiNqj98TkJlS0E",
];

export const BENCHMARK_AIDA_DARK_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDOsImCLjplHAwNm_c0Hnr8aORujd66E_c7qu4RBeIwI94C2H1jiHbIXHjD7amCfMDR6kav5eSPZ2xs1XQPd5hlIoc0DFgeQ3nXGiJg8rZiIEApqqpGQ7mVnjJpPreouRYpsUZrujgQrm5a1BJ-4SyYtadbVTfIuBvRzIDcLagpvKPeSJS_CcNOUxjP4CNrEKZ_Hzc__Aex_uyT0vFLodFCyCH_3E0VuT6sj1QtvbvfoLtDEQLu2H4",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDAlN4f2EGR1K4bMOTOmkA4yvyLuFWampxkfVeuid_8dppS1hmc_S_dFhz5vxIjW3D7V-VJEVtM32KPM1RzW_Mnrk8j3yz1Dl_8TzrKU7-1ayNFiQ2sXrOTV0Yzt02ssMmsuUnTZqoSRmiXb8ThzziSULN0OM214-gZXblRKhveughmvIMpuxUd_BxXKugEO9kLryjWxMEaFHuAvN7zAFwSzw9Sw9ExEpax2rnYBpEGk3rDKqN7hQg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuASlQE5CWlO4y2dUD3ckRNCafmPfsl-95ycwtaHXfmF4UcpPySKBk9y3u2B6Nb79tZnIcHZe_AgUU2nlfD_Qh1FNTJeoboSRpdRhJI60jng_C31zIndk9XR8GdHeW9UR2OuEHvQkwNK0dIFfU4ZJ3-k6P0yE8mc6PLMDWlZpa19p4VhNnYGo18S851_9CKBwA8EP5JhBPmWO6Arswddq0qgdz21dKcQVYX_i0glCiCKoFaZ3g_w5EQ",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD-FsBUs6dDPSfATyDnSK_DVdo0xSKTqVVgHL_X_0rrTE1mqpUtGWRnvhVz79cmkI2bPuA4dhHFmqzE71sbz-ZRJVg1IIy8ZvjwSUTxwUBJzFO3xbTKoh9nD3n1tP_fpG1PCiK9n1WWriWUhDzXiKc66rnYsFgb3OlZ7McJ1H6EnwwDdOtK_Ix9RALcja9MdxLDZcMulBiFT14UHab6cPkMZNEudK74QEs2GuMAaASu8H_6zUnGMvY",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAqWps_QvYBMtKthotOkjbnQyKX4IhWiTiuXmSDtXEbuhUAyzgs6xy--IrQ6ap1NjhwvIE7GN_KSmvQ_PZUyiteU8Xk1KdXShIjCE9CPfVRLjLtHNC1D1PcqTmm2neolj1bRMbVDkq6qvUULs4NNtPY4XwEaT478U69qUCXYU6shpZRSwAB9jSQCxwM4_JOeJOXM5slPhZ7RCJ1JCKpKRBApo5N-O-Cp8MD5hU5hmBg2myI8Crn5m8",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCpphgaA33Em1kJ60X2iKk_YpBhqpWL4wQs5HZPck9lne0SBCOQzJ0Ck1HIvZooiv1bK1HLAEB7TNvVP2AljwOjPDFZosKMfDuk6U8e47pPefF0Ix7-7eD0rNDvKi7XDHrAhS81h7rrBtkpPzU9twKk_1z0hqmoCJrRJAGz-4V8eZT4W9Ml1Lun-gM3ByZ-UXHOW3znFy8ZWhkyIhfxI3qsCcB-iidmPT7xEVRhQcMAVB4F1j5FL14",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB8Jk_HLGg9vMKKMp3INCbNKXEC_OIqC1QlEIXBWZFqSalb3XNayNq1jVzZyeEtuR_Le5tInx3iH8iowlJPCz049LPZ1_GlIop74wm1P2rsKsMF0AV1DzV6x3Lup6hVcJqGUGf3RSt1KhnHnYY8g_RSV00EzwOC8DBb5Zr6Y9U7uHp3CTsCLkgNE57MzTCp1QqIYO52Tl8t-uGU0tUy0X1LI-ciGwDJiKverNcERBiGI83jMm35_YM",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCe_RBkRfz9NcC_Cogxr4QikaMJmEm8PnDrbq1dQTqiFzUOr1xWkhzm4tEpwGd9OgkZNiQBgo8u-y9Thja_42WHIYa0Yf6HTmMXz9Bj_83nXfz0cQmNxGO-PytY-5dWf_CWGTtuUdqASo5CzunFOxsXbI6uBQZJBSUstVju55GFaCIp-Sqqr0yS389pVshIEPMQKZvGmkUMCuTEfD4fqOnx5-vECpOxGGNkCmW7Fzf4-RwzL4y72S0",
];

export function buildBackgroundLibrary() {
  return CURATED_THEMES.map((theme, index) => {
    const num = String(index + 1).padStart(2, '0');
    const slug = theme.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const id = \`bg-\${num}-\${slug}\`;
    
    // Distinct Light and Dark mode assets
    const lightImage = BENCHMARK_AIDA_LIGHT_IMAGES[index] || \`https://picsum.photos/seed/momentum-light-\${theme.seed}/720/1280\`;
    const darkImage = BENCHMARK_AIDA_DARK_IMAGES[index] || \`https://picsum.photos/seed/momentum-dark-\${theme.seed}/720/1280\`;
    const fallback = \`https://picsum.photos/id/\${(index * 7 + 10) % 100}/720/1280\`;

    return {
      id,
      day: index + 1,
      num,
      name: theme.title,
      title: \`\${num} • \${theme.title}\`,
      rawTitle: theme.title,
      category: theme.category,
      mood: theme.mood,
      badge: 'Adaptive',
      description: theme.desc,
      seed: theme.seed,
      // Unified image properties with distinct day/night assets
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

export const BACKGROUND_LIBRARY = buildBackgroundLibrary();
export const DEFAULT_BACKGROUND_ID = 'bg-04-serene-horizon';

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

export function getBackgroundById(id, customWallpaper, extraWallpapers = []) {
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
export const defaultWallpapers = BACKGROUND_LIBRARY;
`;

fs.writeFileSync('src/data/defaultWallpapers.js', code, 'utf8');
console.log("Successfully restored src/data/defaultWallpapers.js!");

