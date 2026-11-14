function formatWallpaperNameFromSource(source, fallbackName = '') {
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
        if (seg && !/^\d+$/.test(seg) && seg !== 'seed') { filename = seg; break; }
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
      const words = filename.split(/\s+/).map((w) => w ? (w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()) : '');
      const result = words.join(' ');
      if (result && result !== 'Photos' && result !== 'Picsum' && !/^\d+$/.test(result)) return result;
    }
  } catch {}
  if (fallbackName && typeof fallbackName === 'string') return fallbackName.replace(/^\d+\s*[•\-_]\s*/, '').trim();
  return 'Serene Atmosphere';
}

console.log('mountain-zenith.jpg ->', formatWallpaperNameFromSource('mountain-zenith.jpg'));
console.log('nuristan-canopy.jpg ->', formatWallpaperNameFromSource('nuristan-canopy.jpg'));
console.log('kabul-reflection.jpg ->', formatWallpaperNameFromSource('kabul-reflection.jpg'));
console.log('https://picsum.photos/seed/momentum-light-mountain-zenith.jpg/720/1280 ->', formatWallpaperNameFromSource('https://picsum.photos/seed/momentum-light-mountain-zenith.jpg/720/1280'));
console.log('https://picsum.photos/seed/momentum-cloud-day-balkh-turquoise-1/720/1280 ->', formatWallpaperNameFromSource('https://picsum.photos/seed/momentum-cloud-day-balkh-turquoise-1/720/1280'));
console.log('11 • Nuristan Cedar Canopy (fallback) ->', formatWallpaperNameFromSource('', '11 • Nuristan Cedar Canopy'));
