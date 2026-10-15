import React from 'react';

import { Image, ArrowLeft } from 'lucide-react';

export default function BackgroundWallpaperLibraryLightMode({ setActiveTab }) {
  return (
    <>
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
            <Image className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-slate-900 tracking-tight">
            Background Library
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setActiveTab && setActiveTab('home_dashboard_light_mode')} className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"><ArrowLeft className="w-5 h-5"/></button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            A
          </div>
        </div>
      </div><main className="flex-1 flex flex-col relative w-full px-margin pb-safe bg-surface"><div className="flex flex-col w-full pb-28 space-y-space-lg">
{/*  Top Context Header Area (Filter & Subtitle Info)  */}
<div className="flex items-center justify-between px-space-xs pt-space-xs">
<div className="flex flex-col">
<span className="text-label-sm font-label-sm text-tertiary uppercase tracking-wider">Atmosphere Engine</span>
<h2 className="text-headline-sm font-headline-sm text-on-surface">Curated Wallpapers</h2>
</div>
<div className="flex items-center gap-space-xs">
<button aria-label="Toggle preview accent" className="w-9 h-9 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center shadow-sm active:scale-95 transition-transform" id="themeToggleMini">
<span className="material-symbols-outlined text-[19px]">tune</span>
</button>
<button aria-label="Library details" className="w-9 h-9 rounded-full bg-surface-container text-on-surface flex items-center justify-center shadow-sm active:scale-95 transition-transform">
<span className="material-symbols-outlined text-[19px]">info</span>
</button>
</div>
</div>
{/*  Hero Card: Current Active Background  */}
<div className="relative w-full rounded-3xl p-5 mb-5 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<div className="relative w-full h-44 rounded-[1.25rem] overflow-hidden shadow-inner">
<img className="w-full h-full object-cover" data-alt="Breathtaking ethereal morning horizon with pastel blush, lavender, and celestial golden light reflecting across calm stillness, minimalist aesthetic, subtle soft gradients, 8k resolution, serene digital art." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7HG8IgbMiz06B3avmxyKaP61rI0qTZkJK5Yg-6pHMhNs92nuiimuhbX6S_Cj7R99Pr9zn--xjCe20Q6wSB62x1AuK1eof0JZS3E7D4HUMlnsQqSJEadazcxFYm0pcBCZMcqPj74Te_33eLmVXCpnWPMDCAAWGq8jQwplt4lrX9o5jnLGYo6HQZ1wPWS6vYASjLBMiSNItlZgVGvmWQ_-MxHIEeNT_BGd5AwAOn98XoQXh3E0osxk"/>
<div className="absolute inset-0 bg-gradient-to-t from-on-background/70 via-on-background/20 to-transparent"></div>
{/*  Top Active Pill Badge  */}
<div className="absolute top-space-sm left-space-sm">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-primary font-label-md text-label-md shadow-sm">
<span className="material-symbols-outlined text-[15px]" style={{fontVariationSettings: '"FILL" 1'}}>check_circle</span>
          Current Active Background
        </span>
</div>
{/*  Quick stats chip on active card  */}
<div className="absolute top-space-sm right-space-sm">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-inverse-surface/80 text-inverse-on-surface font-label-sm text-label-sm backdrop-blur-md">
<span className="material-symbols-outlined text-[13px]">wb_twilight</span>
          Adaptive
        </span>
</div>
{/*  Bottom Card Details  */}
<div className="absolute bottom-space-md left-space-md right-space-md flex flex-col gap-0.5">
<span className="text-label-sm font-label-sm text-tertiary-fixed tracking-wide">Paired Light &amp; Dark Edition</span>
<h3 className="text-headline-md font-headline-md text-on-primary drop-shadow-sm truncate">04 • Serene Horizon (Dawn)</h3>
</div>
</div>
{/*  Hero Card Actions Row  */}
<div className="mt-space-md flex items-center justify-between gap-space-sm px-space-xs">
<div className="flex items-center gap-2">
<div className="w-6 h-6 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center">
<span className="material-symbols-outlined text-[15px]">contrast</span>
</div>
<span className="text-body-sm font-body-sm text-on-surface-variant">Calibrated for glass contrast</span>
</div>
<button className="inline-flex items-center gap-1 px-space-md py-2 rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md shadow-sm active:scale-95 transition-all">
<span>Adjust Blur</span>
<span className="material-symbols-outlined text-[15px]">arrow_forward</span>
</button>
</div>
</div>
{/*  Source Mode Switcher  */}
<div className="p-1 rounded-full bg-surface-container-high flex items-center gap-1 shadow-sm">
<button className="flex-1 py-2 px-3 rounded-full bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-sm text-center transition-all" id="srcBtnMomentum">
      Coordinated Set (30)
    </button>
<button className="flex-1 py-2 px-3 rounded-full text-on-surface-variant font-label-md text-label-md text-center hover:text-on-surface transition-all" id="srcBtnCurated">
      Curated Sanctuary
    </button>
</div>
{/*  Filter Pills Carousel  */}
<div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-margin px-margin py-1">
<button className="px-4 py-1.5 rounded-full bg-primary text-on-primary font-label-md text-label-md shadow-sm whitespace-nowrap active:scale-95 transition-transform">
      All (30)
    </button>
<button className="px-4 py-1.5 rounded-full bg-surface-container-lowest text-on-surface-variant font-label-md text-label-md shadow-sm whitespace-nowrap active:scale-95 transition-transform hover:text-on-surface">
      Atmospheric Skies
    </button>
<button className="px-4 py-1.5 rounded-full bg-surface-container-lowest text-on-surface-variant font-label-md text-label-md shadow-sm whitespace-nowrap active:scale-95 transition-transform hover:text-on-surface">
      Minarets &amp; Heritage
    </button>
<button className="px-4 py-1.5 rounded-full bg-surface-container-lowest text-on-surface-variant font-label-md text-label-md shadow-sm whitespace-nowrap active:scale-95 transition-transform hover:text-on-surface">
      Calm Nature
    </button>
<button className="px-4 py-1.5 rounded-full bg-surface-container-lowest text-on-surface-variant font-label-md text-label-md shadow-sm whitespace-nowrap active:scale-95 transition-transform hover:text-on-surface">
      Abstract Glass
    </button>
<button className="px-4 py-1.5 rounded-full bg-surface-container-lowest text-on-surface-variant font-label-md text-label-md shadow-sm whitespace-nowrap active:scale-95 transition-transform hover:text-on-surface">
      Custom / Upload
    </button>
</div>
{/*  Dynamic Pairing Concept Note  */}
<div className="relative overflow-hidden rounded-3xl p-5 mb-5 flex items-start gap-space-md bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<div className="w-10 h-10 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[20px]">routine</span>
</div>
<div className="flex flex-col gap-0.5 min-w-0">
<span className="text-label-md font-label-md text-secondary">Momentum Dynamic Pairing</span>
<p className="text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
        Each wallpaper includes calibrated Light and Dark variants designed to preserve card legibility and glass translucency seamlessly.
      </p>
</div>
</div>
{/*  30-Background Curated Grid Section Header  */}
<div className="flex items-center justify-between pt-space-xs">
<div className="flex items-baseline gap-2">
<h3 className="text-headline-sm font-headline-sm text-on-surface">Master Collection</h3>
<span className="text-label-sm font-label-sm text-outline">Showing 8 of 30</span>
</div>
<button className="text-label-md font-label-md text-primary flex items-center gap-1 active:opacity-75">
<span>Auto-Rotate</span>
<span className="material-symbols-outlined text-[16px]">sync</span>
</button>
</div>
{/*  2-Column Curated Wallpapers Grid  */}
<div className="grid grid-cols-2 gap-space-md">
{/*  Card 01  */}
<div className="rounded-3xl p-3 transition-all flex flex-col justify-between group relative bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3">
<img className="w-full h-full object-cover" data-alt="Gentle pastel dawn with soft pink clouds floating across tranquil turquoise-blue morning sky, minimalist meditation atmosphere, serene aesthetic lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5uWpBFhLtJE_CzLc_rXDSzmK-rCsEuKskS2uxZxnHCMDNP_uDUq472xsEWbbU4H0fiSoXwXWAIOrvuqWUBFaHP0fHVckaQ-zA7E3NIrjexIXqpj5Tp91DfMysvz6cEMGAtN27M7enEq8FUs9DUDcF8cJt8EzbYoDACXYxWQF9hQmWRz4XnNyplhjecryCuFGaif4b-909zydTdjzH6eJxH2tmHglJb0h7daR2wgcfXPu3pXqg8Zw"/>
{/*  Dual light/dark badge  */}
<div className="absolute top-2.5 left-2.5 px-2 py-1 rounded-xl bg-black/40 backdrop-blur-md border border-white/80 text-white text-[11px] flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-[13px] text-amber-300">wb_sunny</span>
<span className="material-symbols-outlined text-[13px] text-indigo-300">bedtime</span>
</div>
{/*  Favorite Toggle  */}
<button className="absolute top-2.5 right-2.5 w-7 h-7 rounded-xl bg-black/40 backdrop-blur-md border border-white/80 text-white hover:text-rose-400 flex items-center justify-center transition-colors shadow-sm">
<span className="material-symbols-outlined text-[14px]">favorite</span>
</button>
</div>
<div className="px-1 pb-1 flex flex-col">
<span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-0.5 truncate">Atmospheric Sky</span>
<h4 className="text-sm font-bold text-slate-900 block truncate">01 • Dawn Tranquility</h4>
<span className="text-xs font-medium text-indigo-600 mt-1 truncate">Calm / Balance</span>
</div>
</div>
{/*  Card 02  */}
<div className="rounded-3xl p-3 transition-all flex flex-col justify-between group relative bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3">
<img className="w-full h-full object-cover" data-alt="Majestic mountains during peaceful mist sunrise, soft blue fog blankets mountain valley, peaceful solitary vista with gentle pastel warmth." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBR36Q5ekCwBTAgQLo1hD3sFG_nWzh8M6DfnIrM9nLlKTkMdVNuOlIHIdj3ezECvlylkESROmXPRheO_kBUoM-7Zy9Y4ZGYHqFeK3X7_Jxx9aCQaVCQ6fcKOmIDo0Jy-aG5HN2l1R4wdkzbDdHVlEYXN_jS40mfGFYh8LKG37uWH3dT-bQyiqR1OMuWfh1vcffWSMQkS7da372FIn3ABnlBsIqnXlUG2IngK4UtdFrYnsAS4gxGv4k"/>
<div className="absolute top-2.5 left-2.5 px-2 py-1 rounded-xl bg-black/40 backdrop-blur-md border border-white/80 text-white text-[11px] flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-[13px] text-amber-300">wb_sunny</span>
<span className="material-symbols-outlined text-[13px] text-indigo-300">bedtime</span>
</div>
<button className="absolute top-2.5 right-2.5 w-7 h-7 rounded-xl bg-black/40 backdrop-blur-md border border-white/80 text-white hover:text-rose-400 flex items-center justify-center transition-colors shadow-sm">
<span className="material-symbols-outlined text-[14px]">favorite</span>
</button>
</div>
<div className="px-1 pb-1 flex flex-col">
<span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-0.5 truncate">Calm Nature</span>
<h4 className="text-sm font-bold text-slate-900 block truncate">02 • Kabul Solitude</h4>
<span className="text-xs font-medium text-indigo-600 mt-1 truncate">Focus / Clarity</span>
</div>
</div>
{/*  Card 03  */}
<div className="rounded-3xl p-3 transition-all flex flex-col justify-between group relative bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3">
<img className="w-full h-full object-cover" data-alt="Silhouette of an elegant historic minaret rising gently against glowing golden-apricot dawn sky, peaceful Islamic architectural serenity with clean lines and soft haze." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3SEuILWtH31ONeTC67HJeg-_bcuA_E4rdgIVbSgqbt5Hi32lNLr_M4i9RPE_oE36VreO-5sTGFy9HpAf8eN3k9iCPVoaQtquE0cPJBQtKBCVeuKVkaheE8Wa-kT8f1tsxDYLFqHCh2aZuFx82odqtm_ZIfqebg3dS3GGNDbXgOC7QuRpjhwWfhgrj9kNRE57KsImmnCCCYxsaOGtpTrhXaQ-A3Q78rimGwyYoC1NQ0s5RYOpMxns"/>
<div className="absolute top-2.5 left-2.5 px-2 py-1 rounded-xl bg-black/40 backdrop-blur-md border border-white/80 text-white text-[11px] flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-[13px] text-amber-300">wb_sunny</span>
<span className="material-symbols-outlined text-[13px] text-indigo-300">bedtime</span>
</div>
<button className="absolute top-2 right-2 w-7 h-7 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-error active:scale-90 transition-transform">
<span className="material-symbols-outlined text-[15px]" style={{fontVariationSettings: '"FILL" 1'}}>favorite</span>
</button>
</div>
<div className="px-1 pb-1 flex flex-col">
<span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-0.5 truncate">Minarets &amp; Heritage</span>
<h4 className="text-sm font-bold text-slate-900 block truncate">03 • Minaret Sunrise</h4>
<span className="text-xs font-medium text-indigo-600 mt-1 truncate">Spiritual Warmth</span>
</div>
</div>
{/*  Card 04 (SELECTED)  */}
<div className="group relative flex flex-col rounded-2xl p-2 transition-all duration-200 scale-[1.02] bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3">
<img className="w-full h-full object-cover" data-alt="Serene horizon view at break of dawn, soft gradient violet and light cerulean colors melting into light amber glow, pure tranquility for contemplation." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSIeDNP5E9rhEHW88x8487AsrAZFYz3_ZpBAGZg4eny-WrozvXPerDq3BCO_HqGAhm3lOB2z6yjLMb2sMRwvjG68M2S8D-Nz5C9cYcbUSyxj4KFolDg3ZxBRLbb9D324iE4sLC7v3v3fHbZ10KmtPXdlxqk_ZWBqNB74QXghvqUVixmgVDjQp_gTy0i4ZmL1yxxX04u5WxuYELraI74RH0D57tAbDPJ42qLCeN98Le3CCMMpxNZK8"/>
{/*  Selection Ring Overlay  */}
<div className="absolute inset-0 bg-primary/20 backdrop-blur-[1px] flex items-center justify-center">
<div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg">
<span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: '"FILL" 1'}}>check</span>
</div>
</div>
<div className="absolute top-2 left-2 px-1.5 py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center gap-1 text-on-surface shadow-xs">
<span className="material-symbols-outlined text-[11px] text-primary" style={{fontVariationSettings: '"FILL" 1'}}>check_circle</span>
<span className="text-label-sm font-label-sm font-bold text-primary">Active</span>
</div>
<button className="absolute top-2 right-2 w-7 h-7 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-error active:scale-90 transition-transform">
<span className="material-symbols-outlined text-[15px]" style={{fontVariationSettings: '"FILL" 1'}}>favorite</span>
</button>
</div>
<div className="mt-2.5 px-1 pb-1 flex flex-col">
<div className="flex items-center justify-between">
<span className="text-label-sm font-label-sm text-primary font-semibold truncate">Selected Theme</span>
<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
</div>
<h4 className="text-body-lg font-body-lg font-bold text-on-surface truncate">04 • Serene Horizon</h4>
<span className="text-label-sm font-label-sm text-outline mt-0.5">Original Benchmark</span>
</div>
</div>
{/*  Card 05  */}
<div className="rounded-3xl p-3 transition-all flex flex-col justify-between group relative bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3">
<img className="w-full h-full object-cover" data-alt="Emerald green tropical palm fronds with morning dewdrops, backlit by soft ethereal luminous sunbeams, calming natural refuge aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8aqO9jh6ZJDbnN9PUNWUQFEBMCBAVbklsueoQcBfMYO_Ef38AUXVyZRNnh8685mlJKyasRyKCSgMUx8NyZTo63w7y0dK02-CZ3tig5ah5QZie_XisecQ9C0HWFvCdaneU8e6al8xYFbMjt9hUtN7o7qwM59CsytUdQvlv9GjlnW-MkP7RUo8uPaCWz8uTk4ZqbOVZazwKYvHbJBZJWmzN5BPTFP0l5JdBUNvtZkpoXFYkFiE5QUU"/>
<div className="absolute top-2.5 left-2.5 px-2 py-1 rounded-xl bg-black/40 backdrop-blur-md border border-white/80 text-white text-[11px] flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-[13px] text-amber-300">wb_sunny</span>
<span className="material-symbols-outlined text-[13px] text-indigo-300">bedtime</span>
</div>
<button className="absolute top-2.5 right-2.5 w-7 h-7 rounded-xl bg-black/40 backdrop-blur-md border border-white/80 text-white hover:text-rose-400 flex items-center justify-center transition-colors shadow-sm">
<span className="material-symbols-outlined text-[14px]">favorite</span>
</button>
</div>
<div className="px-1 pb-1 flex flex-col">
<span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-0.5 truncate">Calm Nature</span>
<h4 className="text-sm font-bold text-slate-900 block truncate">05 • Emerald Oasis</h4>
<span className="text-xs font-medium text-indigo-600 mt-1 truncate">Revitalization</span>
</div>
</div>
{/*  Card 06  */}
<div className="rounded-3xl p-3 transition-all flex flex-col justify-between group relative bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3">
<img className="w-full h-full object-cover" data-alt="Abstract flowing translucent fluid ribbon in pastel lavender, iris violet, and light magenta tones against clean daylight background, soft curved reflections." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjCj_-xHxA20QDSYA7zT_ltMiTfPvj8ymbX8fiib9vCdMw2bys8AAwF9GE5H29dRfAXnrPX_Vs68T5b7slJAFJ4OYo_NTbvpizsGUNVNEftjRTbKUQhzQJ6nzZaQY5Ta1Do-fxulYzDfm0pe9pvjMPjJqiT_fVCA4OOApPpt-SW93hT7PREct5d_cbsRmJL-JCU1fDKlTZrI3dk7xOPen0hS3ega6UwQ_tajUwAGpDjPkLNq1DyXQ"/>
<div className="absolute top-2.5 left-2.5 px-2 py-1 rounded-xl bg-black/40 backdrop-blur-md border border-white/80 text-white text-[11px] flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-[13px] text-amber-300">wb_sunny</span>
<span className="material-symbols-outlined text-[13px] text-indigo-300">bedtime</span>
</div>
<button className="absolute top-2.5 right-2.5 w-7 h-7 rounded-xl bg-black/40 backdrop-blur-md border border-white/80 text-white hover:text-rose-400 flex items-center justify-center transition-colors shadow-sm">
<span className="material-symbols-outlined text-[14px]">favorite</span>
</button>
</div>
<div className="px-1 pb-1 flex flex-col">
<span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-0.5 truncate">Abstract Glass</span>
<h4 className="text-sm font-bold text-slate-900 block truncate">06 • Lavender Haze</h4>
<span className="text-xs font-medium text-indigo-600 mt-1 truncate">Dream State</span>
</div>
</div>
{/*  Card 07  */}
<div className="rounded-3xl p-3 transition-all flex flex-col justify-between group relative bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3">
<img className="w-full h-full object-cover" data-alt="Subtle Arabesque geometric mandala embossed on iridescent ivory silk canvas, soft diffuse ambient illumination, elegant serene Islamic heritage motif." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZbEL5rwDoqcr4TX7uTEF2VR9y5p6gs6Yjqied-IMhkW4Z0-cpzIFVTvhyZQbFXEqcQB6IfNNSbW8itN8nTTru7xZP_ob2v6vpVcm8VA4cZnmViXw-tyMXPT2jkbeiLgl4ut2sPVEjmgIy2Tcmv6j8FpZgVBtCQS7ZQiOKJNJs51PRPhjXOdqanj2hv451NmJ3IRV3Q0kQ9WY_u7G8JnD3wj2DS7FvBvpHhn6fp1JA7AicK79bhpo"/>
<div className="absolute top-2.5 left-2.5 px-2 py-1 rounded-xl bg-black/40 backdrop-blur-md border border-white/80 text-white text-[11px] flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-[13px] text-amber-300">wb_sunny</span>
<span className="material-symbols-outlined text-[13px] text-indigo-300">bedtime</span>
</div>
<button className="absolute top-2.5 right-2.5 w-7 h-7 rounded-xl bg-black/40 backdrop-blur-md border border-white/80 text-white hover:text-rose-400 flex items-center justify-center transition-colors shadow-sm">
<span className="material-symbols-outlined text-[14px]">favorite</span>
</button>
</div>
<div className="px-1 pb-1 flex flex-col">
<span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-0.5 truncate">Minarets &amp; Heritage</span>
<h4 className="text-sm font-bold text-slate-900 block truncate">07 • Sacred Geometry</h4>
<span className="text-xs font-medium text-indigo-600 mt-1 truncate">Intricate Calm</span>
</div>
</div>
{/*  Card 08  */}
<div className="rounded-3xl p-3 transition-all flex flex-col justify-between group relative bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
<div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3">
<img className="w-full h-full object-cover" data-alt="Snowcapped mountain peak touching high celestial blue atmosphere with soft crystal cloud wisps, pristine clarity, zen morning illumination." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG7tatWBHPK8mrtUFS5MYZx9TF2QQM5AzjB8TSwk_qWRQ6BGvlUbravdzjbhoQtlkOtrnSBOP7KiGZpeDRtygmAHAQ6TKK9gdmtoNvMJQu21HNInoiDMIh4yDQ5kDDoOjsxMJsO3vZz9p_WNItktetaOKMvqU7r9iuQNgwBq2SNcZtVuZdGAqx4xfEYko3Mu3An13dNY7r8c_YF5M7FkYAOPRVVVrSnyuDbm8gINiNqj98TkJlS0E"/>
<div className="absolute top-2.5 left-2.5 px-2 py-1 rounded-xl bg-black/40 backdrop-blur-md border border-white/80 text-white text-[11px] flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-[13px] text-amber-300">wb_sunny</span>
<span className="material-symbols-outlined text-[13px] text-indigo-300">bedtime</span>
</div>
<button className="absolute top-2.5 right-2.5 w-7 h-7 rounded-xl bg-black/40 backdrop-blur-md border border-white/80 text-white hover:text-rose-400 flex items-center justify-center transition-colors shadow-sm">
<span className="material-symbols-outlined text-[14px]">favorite</span>
</button>
</div>
<div className="px-1 pb-1 flex flex-col">
<span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-0.5 truncate">Calm Nature</span>
<h4 className="text-sm font-bold text-slate-900 block truncate">08 • Mountain Zenith</h4>
<span className="text-xs font-medium text-indigo-600 mt-1 truncate">High Perspective</span>
</div>
</div>
</div>
{/*  Load More / Full Library Indicator  */}

<div className="flex flex-col items-center justify-center my-6 space-y-2">
  <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
    22 additional themes available in Sanctuary Cloud
  </span>
  <button className="btn-secondary w-full">
    <span className="material-symbols-outlined text-[16px] text-slate-500">layers</span>
    <span>Load All 30 Backgrounds</span>
  </button>
</div>
{/*  Floating Sticky Action Container Above Shell Safe Margin  */}

<div className="fixed bottom-0 left-0 right-0 z-40">
<div className="backdrop-blur-xl bg-white/80 border-t border-slate-200/60 p-4 rounded-t-3xl flex flex-col gap-3 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
{/*  Primary Action Button  */}
<button className="btn-secondary w-full">
<span>Customize Selected Background</span>
<span className="material-symbols-outlined text-[18px]">tune</span>
</button>
{/*  Secondary Action Button  */}
<button className="btn-primary w-full">
<span className="material-symbols-outlined text-[18px] text-slate-500">add_photo_alternate</span>
<span>Upload Custom Wallpaper</span>
</button>
</div>
</div>
</div>
</main>
    </>
  );
}
