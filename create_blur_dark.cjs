const fs = require('fs');
const path = require('path');

const lightPath = path.join(__dirname, 'src', 'BackgroundPreviewBlurControlLightMode.jsx');
const darkPath = path.join(__dirname, 'src', 'BackgroundPreviewBlurControlDarkMode.jsx');

let content = fs.readFileSync(lightPath, 'utf8');

// Update Component Name
content = content.replace(/BackgroundPreviewBlurControlLightMode/g, 'BackgroundPreviewBlurControlDarkMode');

// Main background
content = content.replace(/bg-surface\/80/g, 'bg-slate-900/80');
content = content.replace(/bg-surface(?!\-)/g, 'bg-slate-900');

// Containers
const lightContainer = 'bg-white/95 border border-slate-200/80 rounded-3xl p-5 mb-5 shadow-md shadow-slate-200/60 space-y-4';
const darkContainer = 'bg-slate-900/85 border border-slate-800/80 rounded-3xl p-5 mb-5 shadow-lg shadow-black/30 space-y-4';
content = content.replace(new RegExp(lightContainer.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), darkContainer);

// "18 px" Capsule
const lightCapsule = 'px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold tracking-tight shadow-sm';
const darkCapsule = 'px-3.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-indigo-400 text-xs font-bold tracking-tight shadow-sm';
content = content.replace(new RegExp(lightCapsule.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), darkCapsule);
content = content.replace(/text-slate-800/g, 'text-white');

// 5 Preset Tiles
const lightActiveTile = 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/30';
const darkActiveTile = 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-950/50';
content = content.replace(new RegExp(lightActiveTile.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), darkActiveTile);

const lightInactiveTile = 'bg-slate-50 border-slate-200/70 text-slate-700 hover:bg-slate-100';
const darkInactiveTile = 'bg-slate-800/60 border border-slate-700/60 text-slate-300 hover:bg-slate-800';
// Wait, the light one has "border" in "transition-all border font-medium", and "border-slate-200/70".
// I'll just replace `bg-slate-50 border-slate-200/70 text-slate-700 hover:bg-slate-100` with `bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800`
content = content.replace(new RegExp(lightInactiveTile.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), darkInactiveTile);

// Advanced Options
const lightAdvanced = 'p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 cursor-pointer';
const darkAdvanced = 'p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/50 cursor-pointer';
content = content.replace(new RegExp(lightAdvanced.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), darkAdvanced);

// Bottom Action Buttons
const lightReset = 'flex-1 py-3.5 px-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm';
const darkReset = 'flex-1 py-3.5 px-4 rounded-2xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm';
content = content.replace(new RegExp(lightReset.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), darkReset);

const lightApply = 'flex-[2] py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all';
const darkApply = 'flex-[2] py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-950/50 transition-all';
content = content.replace(new RegExp(lightApply.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), darkApply);

// Remaining `text-on-surface` to `text-white` and `text-on-surface-variant` to `text-slate-400`
content = content.replace(/text-headline-[a-z]+ font-headline-[a-z]+ text-on-surface/g, 'text-white font-semibold');
content = content.replace(/text-body-[a-z]+ font-body-[a-z]+ text-on-surface( font-medium)?/g, 'text-white font-semibold');
content = content.replace(/font-body-[a-z]+ text-body-[a-z]+ text-on-surface( font-medium)?/g, 'text-white font-semibold');
content = content.replace(/font-headline-[a-z]+ text-headline-[a-z]+ text-on-surface/g, 'text-white font-semibold');
content = content.replace(/font-label-[a-z]+ text-label-[a-z]+ text-on-surface/g, 'text-white font-semibold');
content = content.replace(/text-body-[a-z]+ font-body-[a-z]+ text-on-surface-variant( leading-[a-z]+)?/g, 'text-slate-400 text-xs');
content = content.replace(/font-body-[a-z]+ text-body-[a-z]+ text-on-surface-variant( leading-[a-z]+)?/g, 'text-slate-400 text-xs');
content = content.replace(/font-label-[a-z]+ text-label-[a-z]+ text-on-surface-variant( leading-[a-z]+)?/g, 'text-slate-400 text-xs');
content = content.replace(/text-on-surface-variant/g, 'text-slate-400');
content = content.replace(/text-on-surface(?!\-)/g, 'text-white');

fs.writeFileSync(darkPath, content, 'utf8');
console.log('Dark Mode Created');

