const fs = require('fs');
const path = require('path');

const lightPath = path.join(__dirname, 'src', 'AppLockLightMode.jsx');
const darkPath = path.join(__dirname, 'src', 'AppLockDarkMode.jsx');

let content = fs.readFileSync(lightPath, 'utf8');

// Update Component Name
content = content.replace(/AppLockLightMode/g, 'AppLockDarkMode');

// 1. Container cards mapping
const lightContainer = 'rounded-3xl shadow-md shadow-slate-200/60 border border-slate-200/80 bg-white/95 p-5 mb-4';
const darkContainer = 'rounded-3xl shadow-lg shadow-black/30 border border-slate-800/80 bg-slate-900/85 p-5 mb-4';
content = content.replace(new RegExp(lightContainer.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), darkContainer);

// 2. Titles & Labels mapping -> `text-white font-semibold`
// Light Mode has things like:
// `text-headline-sm font-headline-sm text-on-surface`
// `text-body-lg font-body-lg text-on-surface`
// `text-body-md font-body-md text-on-surface font-medium` or `font-semibold`
content = content.replace(/text-headline-[a-z]+ font-headline-[a-z]+ text-on-surface/g, 'text-white font-semibold');
content = content.replace(/text-body-[a-z]+ font-body-[a-z]+ text-on-surface( font-medium| font-semibold)?/g, 'text-white font-semibold');
content = content.replace(/text-label-[a-z]+ font-label-[a-z]+ text-on-surface/g, 'text-white font-semibold');

// 3. Subtitles & Descriptions mapping -> `text-slate-400 text-xs`
// `text-body-sm font-body-sm text-on-surface-variant`
// `text-body-md font-body-md text-on-surface-variant`
// `text-label-sm font-label-sm text-outline`
content = content.replace(/text-body-[a-z]+ font-body-[a-z]+ text-on-surface-variant( leading-[a-z]+)?/g, 'text-slate-400 text-xs');
content = content.replace(/text-label-sm font-label-sm text-outline/g, 'text-slate-400 text-xs');

// We also have text-outline inside some info/warning notes
// `text-body-sm font-body-sm text-outline leading-snug`
content = content.replace(/text-body-sm font-body-sm text-outline leading-snug/g, 'text-slate-400 text-xs');

// General remaining `text-on-surface-variant` and `text-on-surface`
content = content.replace(/text-on-surface-variant/g, 'text-slate-400');
content = content.replace(/text-on-surface(?!\-)/g, 'text-white');

// Background fixes for the main wrapper (the prompt didn't say, but we should make sure it is dark)
content = content.replace(/bg-surface\/80/g, 'bg-slate-900/80');
content = content.replace(/bg-surface(?!\-)/g, 'bg-slate-900');

// Inner toggles / options: keep them unchanged EXCEPT for mapping their text colors.
// Badges:
const lightBadge = 'px-2.5 py-1 text-xs font-medium rounded-full bg-indigo-50 border border-indigo-150 text-indigo-700 whitespace-nowrap';
const darkBadge = 'px-2.5 py-1 text-xs font-medium rounded-full bg-slate-800 border border-slate-700 text-indigo-300';
content = content.replace(new RegExp(lightBadge.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), darkBadge);

fs.writeFileSync(darkPath, content, 'utf8');
console.log('Dark Mode Created');

