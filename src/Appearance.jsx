import GlassInput from "./components/ui/GlassInput";
import GlassCard from "./components/ui/GlassCard";
import AppShell from "./components/ui/AppShell";
import React, { useState, useEffect } from 'react';
import LiquidButton from './components/ui/LiquidButton';
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
export default function Appearance({
  setActiveTab
}) {
  const [displayTheme, setDisplayTheme] = useState('dark');
  const [aura, setAura] = useState('indigo');
  const [frostedGlass, setFrostedGlass] = useState(true);
  const [gentleTransitions, setGentleTransitions] = useState(true);
  const auras = [{
    id: 'indigo',
    name: 'Indigo',
    from: 'from-[#6366f1]',
    to: 'to-[#8b5cf6]'
  }, {
    id: 'oasis',
    name: 'Oasis',
    from: 'from-[#06b6d4]',
    to: 'to-[#10b981]'
  }, {
    id: 'dawn',
    name: 'Dawn',
    from: 'from-[#f59e0b]',
    to: 'to-[#fbbf24]'
  }, {
    id: 'rose',
    name: 'Rose',
    from: 'from-[#f43f5e]',
    to: 'to-[#fb7185]'
  }, {
    id: 'cyan',
    name: 'Cyan',
    from: 'from-[#38bdf8]',
    to: 'to-[#0284c7]'
  }];
  return /*#__PURE__*/_jsxDEV("div", {
    className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none text-on-surface font-body-md text-body-md flex flex-col min-h-screen",
    children: [/*#__PURE__*/_jsxDEV("header", {
      className: "fixed top-0 w-full z-50 pt-safe bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.4)]",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "h-16 px-gutter-mobile flex items-center justify-between",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-sm",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            variant: "icon",
            "aria-label": "Go back",
            className: "w-11 h-11 -ml-2 rounded-full flex items-center justify-center text-on-surface hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none transition-colors",
            onClick: () => setActiveTab('settings'),
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[22px]",
              children: "arrow_back_ios_new"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("h1", {
            className: "font-headline-sm text-headline-sm text-on-surface tracking-tight truncate max-w-[220px]",
            children: "Appearance — Dark Mode"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-xs",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            "aria-label": "Actions",
            className: "w-11 h-11 rounded-full flex items-center justify-center text-on-surface dark:text-on-surface-variant hover:text-on-surface transition-colors",
            variant: "icon",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[22px]",
              children: "more_vert"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "w-8 h-8 rounded-full bg-primary flex items-center justify-center",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-on-primary text-[18px]",
              children: "person"
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false), /*#__PURE__*/_jsxDEV("main", {
      className: "flex-1 flex flex-col relative w-full pt-16 bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "flex flex-col w-full pb-safe",
        children: /*#__PURE__*/_jsxDEV("div", {
          className: "relative w-full overflow-hidden px-gutter-mobile space-y-space-lg pt-space-md",
          children: [/*#__PURE__*/_jsxDEV("section", {
            className: "space-y-space-sm",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-xs",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "w-1.5 h-1.5 rounded-full bg-primary animate-pulse"
                }, void 0, false), /*#__PURE__*/_jsxDEV("h2", {
                  className: "font-label-md text-label-md tracking-wider text-on-surface dark:text-on-surface-variant uppercase",
                  children: "Visual Language"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "font-label-sm text-label-sm text-primary hover:text-on-surface transition-colors flex items-center gap-1 active:scale-95",
                type: "button",
                variant: "primary",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[14px]",
                  children: "refresh"
                }, void 0, false), "Reset Default"]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "relative rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 shadow-xl overflow-hidden backdrop-blur-xl",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "px-space-md py-space-sm bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-between",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-2",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[16px] text-primary",
                    children: "visibility"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-md text-label-md text-on-surface font-medium",
                    children: "Interactive Canvas Preview"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "px-space-sm py-0.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none text-secondary font-label-sm text-label-sm flex items-center gap-1 transition-colors",
                  type: "button",
                  variant: "subtle",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[13px]",
                    children: "light_mode"
                  }, void 0, false), "Preview Light"]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "p-space-md flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-surface-container-lowest via-surface-container-low to-surface-container-lowest",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "w-full max-w-[280px] rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 shadow-2xl p-space-sm space-y-3 relative z-10 backdrop-blur-md",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center justify-between",
                    children: [/*#__PURE__*/_jsxDEV("div", {
                      className: "flex items-center gap-1.5",
                      children: [/*#__PURE__*/_jsxDEV("div", {
                        className: "w-5 h-5 rounded-lg bg-primary/20 flex items-center justify-center",
                        children: /*#__PURE__*/_jsxDEV("span", {
                          className: "material-symbols-outlined text-primary text-[13px]",
                          children: "all_inclusive"
                        }, void 0, false)
                      }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                        className: "font-headline-sm text-[13px] tracking-tight font-bold text-on-surface ",
                        children: "Momentum"
                      }, void 0, false)]
                    }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                      className: "font-label-sm text-[10px] px-2 py-0.5 rounded-full bg-secondary-container/20 text-secondary font-semibold",
                      children: "Active"
                    }, void 0, false)]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                    className: "p-2.5 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 space-y-1.5 shadow-sm",
                    children: [/*#__PURE__*/_jsxDEV("div", {
                      className: "flex items-center justify-between",
                      children: [/*#__PURE__*/_jsxDEV("span", {
                        className: "font-body-sm text-[11px] text-on-surface dark:text-on-surface-variant",
                        children: "Daily Centering"
                      }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                        className: "font-label-sm text-[11px] font-semibold text-secondary",
                        children: "85% Clear"
                      }, void 0, false)]
                    }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                      className: "w-full h-1.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none overflow-hidden",
                      children: /*#__PURE__*/_jsxDEV("div", {
                        className: "h-full rounded-full bg-gradient-to-r from-primary to-secondary w-[85%]"
                      }, void 0, false)
                    }, void 0, false)]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center justify-between p-2 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface ",
                    children: [/*#__PURE__*/_jsxDEV("div", {
                      className: "flex items-center gap-2 min-w-0",
                      children: [/*#__PURE__*/_jsxDEV("span", {
                        className: "material-symbols-outlined text-secondary text-[15px]",
                        style: {
                          fontVariationSettings: "'FILL' 1"
                        },
                        children: "check_circle"
                      }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                        className: "font-body-sm text-[11px] truncate",
                        children: "Pranayama Breathwork"
                      }, void 0, false)]
                    }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                      className: "font-label-sm text-[10px] text-on-surface dark:text-on-surface-variant flex-shrink-0",
                      children: "12m"
                    }, void 0, false)]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                    className: "h-8 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-around px-2 backdrop-blur-sm",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[15px] text-primary",
                      style: {
                        fontVariationSettings: "'FILL' 1"
                      },
                      children: "spa"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[15px] text-on-surface dark:text-on-surface-variant",
                      children: "timeline"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[15px] text-on-surface dark:text-on-surface-variant",
                      children: "bedtime"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[15px] text-on-surface dark:text-on-surface-variant",
                      children: "person"
                    }, void 0, false)]
                  }, void 0, true)]
                }, void 0, true)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
            className: "space-y-space-sm",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("h2", {
                className: "font-headline-sm text-headline-sm text-on-surface ",
                children: "Display Theme"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-primary font-medium",
                children: "Atmosphere"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "space-y-space-xs",
              children: [/*#__PURE__*/_jsxDEV("label", {
                className: `group relative flex items-start gap-space-sm p-space-md rounded-xl transition-all cursor-pointer shadow-sm ${displayTheme === 'light' ? 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 shadow-lg shadow-black/40 overflow-hidden' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0'}`,
                onClick: () => setDisplayTheme('light'),
                children: [displayTheme === 'light' && /*#__PURE__*/_jsxDEV("div", {
                  className: "absolute -right-6 -bottom-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: `w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${displayTheme === 'light' ? 'bg-primary/20 text-primary' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 group-hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none text-on-surface dark:text-on-surface-variant'}`,
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[22px]",
                    style: displayTheme === 'light' ? {
                      fontVariationSettings: "'FILL' 1"
                    } : {},
                    children: "light_mode"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex-1 min-w-0 pr-6",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center gap-2",
                    children: [/*#__PURE__*/_jsxDEV("h3", {
                      className: "font-headline-sm text-[16px] text-on-surface font-semibold",
                      children: "Light Mode"
                    }, void 0, false), displayTheme === 'light' && /*#__PURE__*/_jsxDEV("span", {
                      className: "font-label-sm text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary font-bold uppercase tracking-wider",
                      children: "Selected"
                    }, void 0, false)]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant mt-0.5 leading-snug",
                    children: "Clean, luminous aesthetic with frosted glass and atmospheric radiance. Optimized for daylight clarity and focus."
                  }, void 0, false)]
                }, void 0, true), displayTheme === 'light' ? /*#__PURE__*/_jsxDEV("div", {
                  className: "w-6 h-6 rounded-full bg-primary flex items-center justify-center absolute top-4 right-4 shadow-md shadow-primary/30",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[16px] text-on-primary font-bold",
                    children: "check"
                  }, void 0, false)
                }, void 0, false) : /*#__PURE__*/_jsxDEV("div", {
                  className: "w-5 h-5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center absolute top-4 right-4 group-hover:scale-105 transition-transform",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "w-2 h-2 rounded-full bg-transparent"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("label", {
                className: `group relative flex items-start gap-space-sm p-space-md rounded-xl transition-all cursor-pointer shadow-sm ${displayTheme === 'dark' ? 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 shadow-lg shadow-black/40 overflow-hidden' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0'}`,
                onClick: () => setDisplayTheme('dark'),
                children: [displayTheme === 'dark' && /*#__PURE__*/_jsxDEV("div", {
                  className: "absolute -right-6 -bottom-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: `w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${displayTheme === 'dark' ? 'bg-primary/20 text-primary' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 group-hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none text-on-surface dark:text-on-surface-variant'}`,
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[22px]",
                    style: displayTheme === 'dark' ? {
                      fontVariationSettings: "'FILL' 1"
                    } : {},
                    children: "dark_mode"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex-1 min-w-0 pr-6",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center gap-2",
                    children: [/*#__PURE__*/_jsxDEV("h3", {
                      className: "font-headline-sm text-[16px] text-on-surface font-semibold",
                      children: "Dark Sanctuary"
                    }, void 0, false), displayTheme === 'dark' && /*#__PURE__*/_jsxDEV("span", {
                      className: "font-label-sm text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary font-bold uppercase tracking-wider",
                      children: "Selected"
                    }, void 0, false)]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant mt-0.5 leading-snug",
                    children: "Deep nocturnal sanctuary with restful obsidian depths and low-light visual comfort for evening reflection."
                  }, void 0, false)]
                }, void 0, true), displayTheme === 'dark' ? /*#__PURE__*/_jsxDEV("div", {
                  className: "w-6 h-6 rounded-full bg-primary flex items-center justify-center absolute top-4 right-4 shadow-md shadow-primary/30",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[16px] text-on-primary font-bold",
                    children: "check"
                  }, void 0, false)
                }, void 0, false) : /*#__PURE__*/_jsxDEV("div", {
                  className: "w-5 h-5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center absolute top-4 right-4 group-hover:scale-105 transition-transform",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "w-2 h-2 rounded-full bg-transparent"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("label", {
                className: `group relative flex items-start gap-space-sm p-space-md rounded-xl transition-all cursor-pointer shadow-sm ${displayTheme === 'system' ? 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 shadow-lg shadow-black/40 overflow-hidden' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0'}`,
                onClick: () => setDisplayTheme('system'),
                children: [displayTheme === 'system' && /*#__PURE__*/_jsxDEV("div", {
                  className: "absolute -right-6 -bottom-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: `w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${displayTheme === 'system' ? 'bg-primary/20 text-primary' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 group-hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none text-on-surface dark:text-on-surface-variant'}`,
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[22px]",
                    style: displayTheme === 'system' ? {
                      fontVariationSettings: "'FILL' 1"
                    } : {},
                    children: "routine"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex-1 min-w-0 pr-6",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center gap-2",
                    children: [/*#__PURE__*/_jsxDEV("h3", {
                      className: "font-headline-sm text-[16px] text-on-surface font-semibold",
                      children: "System Rhythm"
                    }, void 0, false), displayTheme === 'system' && /*#__PURE__*/_jsxDEV("span", {
                      className: "font-label-sm text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary font-bold uppercase tracking-wider",
                      children: "Selected"
                    }, void 0, false)]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant mt-0.5 leading-snug",
                    children: "Follows celestial daylight cycles. Seamlessly shifts between dawn brilliance and nocturnal twilight."
                  }, void 0, false)]
                }, void 0, true), displayTheme === 'system' ? /*#__PURE__*/_jsxDEV("div", {
                  className: "w-6 h-6 rounded-full bg-primary flex items-center justify-center absolute top-4 right-4 shadow-md shadow-primary/30",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[16px] text-on-primary font-bold",
                    children: "check"
                  }, void 0, false)
                }, void 0, false) : /*#__PURE__*/_jsxDEV("div", {
                  className: "w-5 h-5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center absolute top-4 right-4 group-hover:scale-105 transition-transform",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "w-2 h-2 rounded-full bg-transparent"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
            className: "p-space-md rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 space-y-space-sm shadow-md",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("h2", {
                className: "font-headline-sm text-headline-sm text-on-surface ",
                children: "Chromatic Aura"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-primary font-semibold",
                children: ["Luminous ", auras.find(a => a.id === aura)?.name]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
              className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
              children: "Subtle ambient glow reflected across frosted navigation docks, buttons, and metrics."
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between pt-1",
              children: auras.map(a => {
                const isSelected = aura === a.id;
                return /*#__PURE__*/_jsxDEV(LiquidButton, {
                  variant: "subtle",
                  "aria-label": `Select ${a.name} aura`,
                  className: `group flex flex-col items-center gap-1.5 focus:outline-none transition-opacity ${isSelected ? '' : 'opacity-80 hover:opacity-100'}`,
                  onClick: () => setAura(a.id),
                  type: "button",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: `w-12 h-12 rounded-full bg-gradient-to-tr ${a.from} ${a.to} flex items-center justify-center ${isSelected ? 'p-0.5 shadow-lg shadow-primary/30 scale-105' : 'shadow-md'}`,
                    children: isSelected && /*#__PURE__*/_jsxDEV("div", {
                      className: "w-full h-full rounded-full flex items-center justify-center bg-transparent",
                      children: /*#__PURE__*/_jsxDEV("span", {
                        className: "material-symbols-outlined text-on-surface text-[20px] font-bold",
                        children: "check"
                      }, void 0, false)
                    }, void 0, false)
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: `font-label-sm text-[11px] ${isSelected ? 'text-primary font-semibold' : 'text-on-surface dark:text-on-surface-variant group-hover:text-on-surface '}`,
                    children: a.name
                  }, void 0, false)]
                }, a.id, true);
              })
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
            className: "p-space-md rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 space-y-space-md shadow-md",
            children: [/*#__PURE__*/_jsxDEV("h2", {
              className: "font-headline-sm text-headline-sm text-on-surface ",
              children: "Glassmorphic Physics"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between gap-space-md",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "space-y-0.5 flex-1 min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-1.5",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[18px] text-primary",
                    children: "blur_on"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-lg text-label-lg text-on-surface font-semibold",
                    children: "Frosted Glass Effects"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant leading-snug",
                  children: "Render multi-layer blur filters and edge reflections over wallpaper."
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "primary",
                "aria-checked": frostedGlass ? 'true' : 'false',
                className: `w-12 h-7 rounded-full flex items-center p-1 cursor-pointer transition-colors shadow-inner flex-shrink-0 ${frostedGlass ? 'bg-primary' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0'}`,
                onClick: () => setFrostedGlass(!frostedGlass),
                role: "switch",
                type: "button",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: `w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ease-out ${frostedGlass ? 'translate-x-5 bg-on-primary-fixed' : 'translate-x-0 bg-on-surface-variant'}`
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "w-full h-px bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between gap-space-md",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "space-y-0.5 flex-1 min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-1.5",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[18px] text-secondary",
                    children: "motion_photos_on"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-lg text-label-lg text-on-surface font-semibold",
                    children: "Gentle Transitions"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant leading-snug",
                  children: "Calm, physics-based page morphing and organic card elevations."
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "primary",
                "aria-checked": gentleTransitions ? 'true' : 'false',
                className: `w-12 h-7 rounded-full flex items-center p-1 cursor-pointer transition-colors shadow-inner flex-shrink-0 ${gentleTransitions ? 'bg-primary' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0'}`,
                onClick: () => setGentleTransitions(!gentleTransitions),
                role: "switch",
                type: "button",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: `w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ease-out ${gentleTransitions ? 'translate-x-5 bg-on-primary-fixed' : 'translate-x-0 bg-on-surface-variant'}`
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
            className: "space-y-space-sm",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("h2", {
                className: "font-headline-sm text-headline-sm text-on-surface ",
                children: "Atmospheric Canvas"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant font-medium",
                children: "Default Ambient"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "p-space-md rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center gap-space-md shadow-md",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 relative shadow-inner",
                children: /*#__PURE__*/_jsxDEV("img", {
                  alt: "Serene nocturnal dusk horizon",
                  className: "w-full h-full object-cover",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYYeyKgOtzlQzTInTC8N3gvuv1eIB0c5lpbHljfcQAt0kDMdxisdm3PHwnW3sUqwgk7-kc4AtXjpe2OSGcSc35NMyLvoiWYTJOpvuTGu0BPx2sLdYVykZw6GLdHYhsT3Qcmc7x6Q0B6k-VtIiOi8rcI7GYBI1lakZINaTM_knVCeSJwSxb0bdnKrD2myxZRBPlUh22uTUsrlh-aY6U-YW75FpBYceMg0f7siCCf_i-0VeTmGdA1OY"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex-1 min-w-0 space-y-1",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-1.5",
                  children: [/*#__PURE__*/_jsxDEV("h3", {
                    className: "font-headline-sm text-[16px] text-on-surface font-semibold truncate",
                    children: "Serene Horizon"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-secondary text-[16px]",
                    style: {
                      fontVariationSettings: "'FILL' 1"
                    },
                    children: "verified"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                  children: "Pastel sky and mist with 32px diffuse glass r..."
                }, void 0, false), /*#__PURE__*/_jsxDEV("a", {
                  className: "inline-flex items-center gap-1 font-label-sm text-label-sm text-primary hover:text-on-surface transition-colors pt-0.5",
                  href: "#",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    children: "Customize Wallpaper"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[14px]",
                    children: "arrow_forward"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "pt-space-xs pb-space-lg",
            children: /*#__PURE__*/_jsxDEV(LiquidButton, {
              variant: "none",
              className: "w-full py-4 px-space-lg rounded-xl bg-gradient-to-r from-[#6366f1] via-[#756af7] to-[#8b5cf6] text-on-surface font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(99,102,241,0.4)] active:scale-[0.98] transition-all hover:brightness-110",
              onClick: () => setActiveTab('settings'),
              type: "button",
              children: [/*#__PURE__*/_jsxDEV("span", {
                children: "Apply Appearance Preferences"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px]",
                children: "check"
              }, void 0, false)]
            }, void 0, true)
          }, void 0, false)]
        }, void 0, true)
      }, void 0, false)
    }, void 0, false)]
  }, void 0, true);
}