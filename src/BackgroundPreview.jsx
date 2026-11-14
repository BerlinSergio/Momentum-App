import GlassInput from "./components/ui/GlassInput";
import GlassCard from "./components/ui/GlassCard";
import AppShell from "./components/ui/AppShell";
import React, { useState, useEffect } from 'react';
import LiquidButton from './components/ui/LiquidButton';
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
export default function BackgroundPreview({
  setActiveTab
}) {
  const [blurLevel, setBlurLevel] = useState(18);
  const [syncDark, setSyncDark] = useState(true);
  const [dimWallpaper, setDimWallpaper] = useState(true);
  const presets = [{
    label: 'Crisp',
    val: 0
  }, {
    label: 'Subtle',
    val: 8
  }, {
    label: 'Soft',
    val: 18
  }, {
    label: 'Deep',
    val: 28
  }, {
    label: 'Dreamy',
    val: 40
  }];
  const handleReset = () => {
    setBlurLevel(18);
    setDimWallpaper(true);
  };
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
            onClick: () => setActiveTab('appearance'),
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[22px]",
              children: "arrow_back_ios_new"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("h1", {
            className: "font-headline-sm text-headline-sm text-on-surface tracking-tight truncate max-w-[220px]",
            children: "Background Preview & Blur Control — Dark Mode"
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
        className: "flex flex-col w-full px-gutter-mobile pb-10 space-y-6",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "relative w-full rounded-2xl overflow-hidden shadow-2xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 mt-6",
          children: /*#__PURE__*/_jsxDEV("div", {
            className: "relative w-full h-[470px] overflow-hidden",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "absolute inset-0 bg-cover bg-center transition-all duration-300 transform scale-105",
              style: {
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAaig7-T9Ut89nyFyu1Du-dMNzPzF5Qxf0RazDinqOKHbEAR-CeA1voyGA9ByB6PXq9IK0uBvN2y5vBWRtmh-Y_f6vwIoAbmoj7IId1lvcjZB033ZQfZT5zighC0UfsPY1fHc2_5dHjPaSLfYEWD_H77Fh-qxaHEa9uUdUaAN8flle0yLQV7E9lcZ0B-ScGtxqsKP7Y4qyefQU_moefVtLuQK-zoAcv-JRXtsQoTc0uQcol18mr58k')`,
                filter: `blur(${blurLevel}px)`,
                WebkitFilter: `blur(${blurLevel}px)`
              }
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: `absolute inset-0 bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-opacity duration-200 ${dimWallpaper ? 'opacity-100' : 'opacity-0'}`
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "absolute inset-0 bg-gradient-to-b from-surface-container-lowest/60 via-transparent to-surface-container-lowest/80 pointer-events-none"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "relative z-10 p-3.5 flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md shadow-sm",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "w-2 h-2 rounded-full bg-secondary animate-pulse"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-on-surface uppercase tracking-wider",
                  children: "Live Canvas Simulator"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "px-2.5 py-1 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md shadow-sm",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-secondary-fixed-dim",
                  children: "Serene Horizon"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "relative z-10 px-4 pt-1 pb-4 flex flex-col space-y-3",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "self-start px-3 py-1.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl shadow-md flex items-center gap-2",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[16px] text-primary",
                  style: {
                    fontVariationSettings: "'FILL' 1"
                  },
                  children: "bedtime"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm font-medium text-on-surface ",
                  children: "Good morning, Aisha • Fajr in 12m"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "w-full p-3.5 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl shadow-lg flex flex-col space-y-2",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center justify-between",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm uppercase px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-semibold",
                    children: "Priority"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "w-5 h-5 rounded-full bg-secondary-container/20 flex items-center justify-center",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[14px] text-secondary",
                      children: "check"
                    }, void 0, false)
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
                  className: "font-headline-sm text-[16px] leading-snug text-on-surface font-semibold truncate",
                  children: "Review financial milestone projections"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-3 text-on-surface dark:text-on-surface-variant font-body-sm text-[12px]",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "flex items-center gap-1",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[14px] text-primary",
                      children: "timer"
                    }, void 0, false), "Focus routine"]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                    children: "•"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    children: "15 mins"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "w-full p-3.5 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl shadow-lg flex flex-col space-y-2.5",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-start justify-between",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "font-label-sm text-label-sm text-secondary uppercase font-semibold",
                      children: "Next: Fajr Prayer"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("h4", {
                      className: "font-headline-md text-headline-sm text-on-surface ",
                      children: "05:14 AM"
                    }, void 0, false)]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                    className: "w-9 h-9 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center text-primary",
                    children: /*#__PURE__*/_jsxDEV("svg", {
                      className: "w-6 h-6 fill-current",
                      viewBox: "0 0 24 24",
                      children: /*#__PURE__*/_jsxDEV("path", {
                        d: "M12 2C11.5 3.5 9 5 9 7v2H7V8H5v1H4v11h16V10h-1V9h-2v1h-2V7c0-2-2.5-3.5-3-5zm0 9a2 2 0 110 4 2 2 0 010-4zm-5 4h2v3H7v-3zm8 0h2v3h-2v-3z"
                      }, void 0, false)
                    }, void 0, false)
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "flex justify-between font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant mb-1",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      children: "Calm focus window"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "text-secondary font-medium",
                      children: "82% completed"
                    }, void 0, false)]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                    className: "w-full h-1.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 overflow-hidden",
                    children: /*#__PURE__*/_jsxDEV("div", {
                      className: "h-full bg-gradient-to-r from-primary via-secondary to-primary w-[82%] rounded-full"
                    }, void 0, false)
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "self-center px-4 py-1.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-3xl shadow-xl flex items-center gap-6 mt-1",
                children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                  "aria-label": "Home",
                  className: "flex flex-col items-center text-on-surface dark:text-on-surface-variant hover:text-on-surface ",
                  type: "button",
                  variant: "subtle",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[18px]",
                    children: "home"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center text-on-primary shadow-md",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[18px]",
                    children: "add"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  "aria-label": "Planner",
                  className: "flex flex-col items-center text-on-surface dark:text-on-surface-variant hover:text-on-surface ",
                  type: "button",
                  variant: "subtle",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[18px]",
                    children: "calendar_today"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10",
              children: /*#__PURE__*/_jsxDEV("div", {
                className: "px-3 py-1 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md shadow-sm",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-primary tracking-wide",
                  children: ["Live Rendering: ", blurLevel, "px blur"]
                }, void 0, true)
              }, void 0, false)
            }, void 0, false)]
          }, void 0, true)
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "flex flex-col space-y-4",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between",
            children: [/*#__PURE__*/_jsxDEV("div", {
              children: [/*#__PURE__*/_jsxDEV("h2", {
                className: "font-headline-sm text-headline-sm text-on-surface ",
                children: "Background Blur Intensity"
              }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                children: "Adjust ambient refraction behind floating elements"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "px-3 py-1.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center shadow-inner",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md font-semibold text-primary",
                children: [blurLevel, " px"]
              }, void 0, true)
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "w-full p-3.5 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 shadow-md flex items-center justify-between",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-2.5",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "w-8 h-8 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[18px]",
                  children: "auto_awesome"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-md text-body-md font-semibold text-on-surface block leading-tight",
                  children: "Soft Focus (Recommended)"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant text-[12px]",
                  children: "Preserves visual atmosphere while reading"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm uppercase font-semibold px-2 py-0.5 rounded bg-secondary-container/20 text-secondary",
              children: "Optimal Contrast"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "p-4 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 space-y-3",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "relative flex items-center w-full",
              children: /*#__PURE__*/_jsxDEV(GlassInput, {
                "aria-label": "Blur Intensity",
                className: "w-full h-2 bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none",
                max: "40",
                min: "0",
                step: "1",
                type: "range",
                value: blurLevel,
                onChange: e => setBlurLevel(Number(e.target.value))
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex justify-between font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant px-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                children: "0px (Crisp)"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                children: "20px"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                children: "40px (Dreamy)"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "grid grid-cols-5 gap-1.5",
            children: presets.map(p => {
              const isActive = blurLevel === p.val;
              return /*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "primary",
                className: `py-2 px-1 rounded-lg text-center flex flex-col items-center justify-center transition-all ${isActive ? 'bg-primary-container shadow-lg' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0'}`,
                onClick: () => setBlurLevel(p.val),
                type: "button",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: `font-body-sm text-[12px] font-semibold ${isActive ? 'text-on-primary-container' : 'text-on-surface '}`,
                  children: p.label
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: `font-label-sm text-[10px] ${isActive ? 'text-on-primary-container/80' : 'text-on-surface dark:text-on-surface-variant'}`,
                  children: [p.val, "px"]
                }, void 0, true)]
              }, p.val, true);
            })
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex flex-col space-y-2.5",
          children: [/*#__PURE__*/_jsxDEV("label", {
            className: "p-3.5 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-between cursor-pointer select-none",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-3",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "w-8 h-8 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center text-primary",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[18px]",
                  children: "sync"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-md text-body-md font-medium text-on-surface block leading-tight",
                  children: "Sync Blur with Dark Mode"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant text-[12px]",
                  children: "Auto-scales depth when dark theme triggers"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(GlassInput, {
              checked: syncDark,
              className: "w-4 h-4 rounded accent-primary bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 cursor-pointer",
              type: "checkbox",
              onChange: e => setSyncDark(e.target.checked)
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("label", {
            className: "p-3.5 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-between cursor-pointer select-none",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-3",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "w-8 h-8 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center text-secondary",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[18px]",
                  children: "contrast"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-md text-body-md font-medium text-on-surface block leading-tight",
                  children: "Dim wallpaper slightly"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant text-[12px]",
                  children: "+10% subtle scrim to enhance readability"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(GlassInput, {
              checked: dimWallpaper,
              className: "w-4 h-4 rounded accent-primary bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 cursor-pointer",
              type: "checkbox",
              onChange: e => setDimWallpaper(e.target.checked)
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "pt-2 flex items-center gap-3",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            className: "flex-1 py-3 px-4 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface font-label-lg text-label-lg flex items-center justify-center gap-2 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 active:scale-[0.98] transition-all",
            onClick: handleReset,
            type: "button",
            variant: "subtle",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[18px]",
              children: "restart_alt"
            }, void 0, false), "Reset Blur"]
          }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
            variant: "primary",
            className: "flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-primary to-primary-container text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-lg shadow-primary-container/20 active:scale-[0.98] transition-all",
            onClick: () => setActiveTab('appearance'),
            type: "button",
            children: [/*#__PURE__*/_jsxDEV("span", {
              children: "Apply to All"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[18px]",
              children: "arrow_forward"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false)]
  }, void 0, true);
}