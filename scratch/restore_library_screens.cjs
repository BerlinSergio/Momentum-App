const fs = require('fs');

function restoreLibrary(filePath, isDark) {
  let content = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');

  const oldCard = isDark
    ? `function WallpaperGridCard({ bg, isSelected, isFav, onSelect, onToggleFavorite }) {
  const [previewMode, setPreviewMode] = useState('dark');

  return (
    <div
      onClick={onSelect}
      className={\`rounded-3xl overflow-hidden transition-all flex flex-col justify-between group relative cursor-pointer \${
        isSelected ? 'scale-[1.02] ring-2 ring-primary border-2 border-primary bg-black/70 shadow-2xl' : 'bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl hover:border-primary/50 hover:shadow-2xl'
      }\`}
    >
      <div className="relative w-full aspect-[4/3] rounded-t-[inherit] overflow-hidden">
        <img className={\`absolute inset-0 w-full h-full object-cover rounded-t-[inherit] transition-opacity duration-700 ease-in-out group-hover:scale-105 \${previewMode === 'light' ? 'opacity-100 z-[1]' : 'opacity-0 z-0'}\`} alt={\`\${bg.title} Day\`} src={bg.lightImage || bg.thumbnail || bg.url} />
        <img className={\`absolute inset-0 w-full h-full object-cover rounded-t-[inherit] transition-opacity duration-700 ease-in-out group-hover:scale-105 \${previewMode === 'dark' ? 'opacity-100 z-[1]' : 'opacity-0 z-0'}\`} alt={\`\${bg.title} Night\`} src={bg.darkImage || bg.thumbnail || bg.url} />
        <div className={\`absolute inset-0 bg-black/25 pointer-events-none transition-opacity duration-700 z-[2] \${previewMode === 'dark' ? 'opacity-100' : 'opacity-0'}\`} />`
    : `function WallpaperGridCard({ bg, isSelected, isFav, onSelect, onToggleFavorite }) {
  const [previewMode, setPreviewMode] = useState('light');

  return (
    <div
      onClick={onSelect}
      className={\`rounded-3xl overflow-hidden transition-all flex flex-col justify-between group relative cursor-pointer \${
        isSelected ? 'scale-[1.02] ring-2 ring-primary border-2 border-primary bg-white/95 shadow-xl' : 'bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg hover:border-primary/50 hover:shadow-xl'
      }\`}
    >
      <div className="relative w-full aspect-[4/3] rounded-t-[inherit] overflow-hidden">
        <img className={\`absolute inset-0 w-full h-full object-cover rounded-t-[inherit] transition-opacity duration-700 ease-in-out group-hover:scale-105 \${previewMode === 'light' ? 'opacity-100 z-[1]' : 'opacity-0 z-0'}\`} alt={\`\${bg.title} Day\`} src={bg.lightImage || bg.thumbnail || bg.url} />
        <img className={\`absolute inset-0 w-full h-full object-cover rounded-t-[inherit] transition-opacity duration-700 ease-in-out group-hover:scale-105 \${previewMode === 'dark' ? 'opacity-100 z-[1]' : 'opacity-0 z-0'}\`} alt={\`\${bg.title} Night\`} src={bg.darkImage || bg.thumbnail || bg.url} />
        <div className={\`absolute inset-0 bg-black/25 pointer-events-none transition-opacity duration-700 z-[2] \${previewMode === 'dark' ? 'opacity-100' : 'opacity-0'}\`} />`;

  const restoredCard = isDark
    ? `function WallpaperGridCard({ bg, isSelected, isFav, onSelect, onToggleFavorite }) {
  const [previewMode, setPreviewMode] = useState('dark');
  const currentImageSrc = previewMode === 'dark' ? (bg.darkImage || bg.thumbnail || bg.url) : (bg.lightImage || bg.thumbnail || bg.url);

  return (
    <div
      onClick={onSelect}
      className={\`rounded-3xl overflow-hidden transition-all flex flex-col justify-between group relative cursor-pointer \${
        isSelected ? 'scale-[1.02] ring-2 ring-primary border-2 border-primary bg-black/70 shadow-2xl' : 'bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl hover:border-primary/50 hover:shadow-2xl'
      }\`}
    >
      <div className="relative w-full aspect-[4/3] rounded-t-[inherit] overflow-hidden">
        <img className="w-full h-full object-cover rounded-t-[inherit] transition-all duration-300 group-hover:scale-105" alt={bg.title} src={currentImageSrc} />
        <div className={\`absolute inset-0 bg-black/35 pointer-events-none transition-opacity duration-300 \${previewMode === 'dark' ? 'opacity-100' : 'opacity-0'}\`} />`
    : `function WallpaperGridCard({ bg, isSelected, isFav, onSelect, onToggleFavorite }) {
  const [previewMode, setPreviewMode] = useState('light');
  const currentImageSrc = previewMode === 'dark' ? (bg.darkImage || bg.thumbnail || bg.url) : (bg.lightImage || bg.thumbnail || bg.url);

  return (
    <div
      onClick={onSelect}
      className={\`rounded-3xl overflow-hidden transition-all flex flex-col justify-between group relative cursor-pointer \${
        isSelected ? 'scale-[1.02] ring-2 ring-primary border-2 border-primary bg-white/95 shadow-xl' : 'bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg hover:border-primary/50 hover:shadow-xl'
      }\`}
    >
      <div className="relative w-full aspect-[4/3] rounded-t-[inherit] overflow-hidden">
        <img className="w-full h-full object-cover rounded-t-[inherit] transition-all duration-300 group-hover:scale-105" alt={bg.title} src={currentImageSrc} />
        <div className={\`absolute inset-0 bg-black/35 pointer-events-none transition-opacity duration-300 \${previewMode === 'dark' ? 'opacity-100' : 'opacity-0'}\`} />`;

  if (!content.includes(oldCard)) {
    console.error(`Could not find oldCard in ${filePath}`);
    process.exit(1);
  }

  content = content.replace(oldCard, restoredCard);

  // Restore Hero card image transition
  content = content.replace(
    'transition-opacity duration-700 ease-in-out',
    'transition-all duration-500'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully restored ${filePath}!`);
}

restoreLibrary('src/BackgroundWallpaperLibraryLightMode.jsx', false);
restoreLibrary('src/BackgroundWallpaperLibraryDarkMode.jsx', true);

