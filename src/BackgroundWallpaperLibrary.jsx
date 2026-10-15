import GlassInput from "./components/ui/GlassInput";
import GlassCard from "./components/ui/GlassCard";
import AppShell from "./components/ui/AppShell";
import React, { useEffect } from 'react';
import LiquidButton from './components/ui/LiquidButton';
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
export default function BackgroundWallpaperLibrary({
  setActiveTab
}) {
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
            children: "Background / Wallpaper Library — Dark Mode"
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
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "fixed inset-0 pointer-events-none -z-10 overflow-hidden",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "absolute top-[480px] -left-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "px-gutter-mobile flex flex-col gap-space-lg pt-space-sm",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-xs",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "w-2 h-2 rounded-full bg-secondary animate-pulse"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-secondary tracking-widest uppercase",
                children: "Atmosphere Engine"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant/60",
                children: "/"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant font-medium",
                children: "Curated Wallpapers"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-1",
              children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                "aria-label": "Filter Wallpapers",
                className: "w-8 h-8 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center text-on-surface dark:text-on-surface-variant hover:text-on-surface transition-colors",
                variant: "icon",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[18px]",
                  children: "tune"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                "aria-label": "Collection Info",
                className: "w-8 h-8 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center text-on-surface dark:text-on-surface-variant hover:text-on-surface transition-colors",
                variant: "icon",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[18px]",
                  children: "info"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "relative w-full rounded-xl overflow-hidden bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 shadow-xl",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "relative h-64 w-full bg-cover bg-center flex flex-col justify-between p-space-md",
              style: {
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCSWxhrkAhL82XtvPBzcxWkFv46l37XrqxaG37JqlJUDIg2A-C43Fg2A4fms-LCmhsCrwgEmsreWV8kzfq4IncU3rumSBndzA3_QKLGN_aaO5iCWZr9zwO1JLZ2OCaMiMZrBRukhc3FL1MUVwAm4flvswh2OlYCmcNemkL3npZCG_AhK2NLAquXCQ0bxM83SnAqLWNNvcg9Hkb_L1wbqaS_wU1JNWwkqXA5yl7LCRwjX_Avh6dcinY')`
              },
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/40 to-transparent"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "absolute inset-0 bg-gradient-to-b from-surface-container-lowest/50 via-transparent to-transparent"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "relative z-10 flex items-center justify-between w-full",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-primary text-[14px]",
                    children: "check_circle"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-primary tracking-wide uppercase font-semibold",
                    children: "Current Active Background"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-secondary text-[13px]",
                    children: "dark_mode"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-secondary tracking-wider font-semibold",
                    children: "Adaptive"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "relative z-10 flex flex-col gap-0.5",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-secondary-fixed-dim uppercase tracking-wider font-medium",
                  children: "Paired Light & Dark Edition"
                }, void 0, false), /*#__PURE__*/_jsxDEV("h2", {
                  className: "font-headline-sm text-headline-sm text-on-surface tracking-tight font-semibold",
                  children: "04 • Serene Horizon (Dawn/Dusk)"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 px-space-md py-3 flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-2",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-outline text-[16px]",
                  children: "lens_blur"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                  children: "Calibrated for glass contrast"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "inline-flex items-center gap-1 font-label-md text-label-md text-primary font-semibold hover:text-primary-fixed transition-colors",
                variant: "primary",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  children: "Adjust Blur"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[15px]",
                  children: "arrow_forward"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "p-1 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center",
            children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "flex-1 py-2 px-3 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 shadow-sm text-center font-label-md text-label-md text-on-surface font-semibold transition-all",
              variant: "subtle",
              children: "Coordinated Set (30)"
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "flex-1 py-2 px-3 rounded-lg text-center font-label-md text-label-md text-on-surface dark:text-on-surface-variant hover:text-on-surface transition-colors font-medium",
              variant: "subtle",
              children: "Curated Sanctuary"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 -mx-gutter-mobile px-gutter-mobile",
            children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "shrink-0 px-3.5 py-1.5 rounded-full bg-primary text-on-primary font-label-md text-label-md font-semibold shadow-sm",
              variant: "primary",
              children: "All (30)"
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "shrink-0 px-3.5 py-1.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant hover:text-on-surface font-label-md text-label-md font-medium transition-colors",
              variant: "subtle",
              children: "Atmospheric Skies"
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "shrink-0 px-3.5 py-1.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant hover:text-on-surface font-label-md text-label-md font-medium transition-colors",
              variant: "subtle",
              children: "Minarets & Heritage"
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "shrink-0 px-3.5 py-1.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant hover:text-on-surface font-label-md text-label-md font-medium transition-colors",
              variant: "subtle",
              children: "Calm Nature"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "rounded-xl p-space-md bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md flex items-start gap-space-sm relative overflow-hidden",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "absolute -right-4 -top-4 w-24 h-24 bg-tertiary-container/10 rounded-full blur-2xl pointer-events-none"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "w-9 h-9 rounded-lg bg-tertiary-container/20 flex items-center justify-center shrink-0 text-tertiary",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[20px]",
                children: "brightness_medium"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col gap-1 min-w-0",
              children: [/*#__PURE__*/_jsxDEV("h3", {
                className: "font-label-lg text-label-lg text-on-surface font-semibold leading-snug",
                children: "Momentum Dynamic Pairing"
              }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant leading-relaxed",
                children: "Each wallpaper includes calibrated Light and Dark variants designed to preserve card legibility and glass translucency seamlessly."
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between pt-space-xs",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-baseline gap-2",
              children: [/*#__PURE__*/_jsxDEV("h3", {
                className: "font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight",
                children: "Master Collection"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-outline",
                children: "Showing 8 of 30"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors font-label-sm text-label-sm text-secondary",
              variant: "pill",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[14px]",
                children: "sync"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                children: "Auto-Rotate"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "grid grid-cols-2 gap-space-sm w-full",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "group relative rounded-xl overflow-hidden bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex flex-col shadow-md transition-all hover:translate-y-[-2px]",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "relative h-44 w-full bg-cover bg-center",
                style: {
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDOsImCLjplHAwNm_c0Hnr8aORujd66E_c7qu4RBeIwI94C2H1jiHbIXHjD7amCfMDR6kav5eSPZ2xs1XQPd5hlIoc0DFgeQ3nXGiJg8rZiIEApqqpGQ7mVnjJpPreouRYpsUZrujgQrm5a1BJ-4SyYtadbVTfIuBvRzIDcLagpvKPeSJS_CcNOUxjP4CNrEKZ_Hzc__Aex_uyT0vFLodFCyCH_3E0VuT6sj1QtvbvfoLtDEQLu2H4')`
                },
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-secondary text-[12px]",
                    children: "wb_sunny"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant",
                    children: "/"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-primary text-[12px]",
                    children: "bedtime"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  "aria-label": "Favorite wallpaper",
                  className: "absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md flex items-center justify-center text-on-surface dark:text-on-surface-variant hover:text-error transition-colors",
                  variant: "subtle",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[16px]",
                    children: "favorite"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "p-3 flex flex-col gap-1",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold",
                  children: "Atmospheric Sky"
                }, void 0, false), /*#__PURE__*/_jsxDEV("h4", {
                  className: "font-label-lg text-label-lg text-on-surface font-semibold truncate",
                  children: "01 • Dawn Tranquility"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-1.5 pt-1",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "px-2 py-0.5 rounded bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 font-label-sm text-label-sm text-outline",
                    children: "Calm"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "px-2 py-0.5 rounded bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 font-label-sm text-label-sm text-outline",
                    children: "Balance"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "group relative rounded-xl overflow-hidden bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex flex-col shadow-md transition-all hover:translate-y-[-2px]",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "relative h-44 w-full bg-cover bg-center",
                style: {
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDAlN4f2EGR1K4bMOTOmkA4yvyLuFWampxkfVeuid_8dppS1hmc_S_dFhz5vxIjW3D7V-VJEVtM32KPM1RzW_Mnrk8j3yz1Dl_8TzrKU7-1ayNFiQ2sXrOTV0Yzt02ssMmsuUnTZqoSRmiXb8ThzziSULN0OM214-gZXblRKhveughmvIMpuxUd_BxXKugEO9kLryjWxMEaFHuAvN7zAFwSzw9Sw9ExEpax2rnYBpEGk3rDKqN7hQg')`
                },
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-secondary text-[12px]",
                    children: "wb_sunny"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant",
                    children: "/"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-primary text-[12px]",
                    children: "bedtime"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  "aria-label": "Favorite wallpaper",
                  className: "absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md flex items-center justify-center text-on-surface dark:text-on-surface-variant hover:text-error transition-colors",
                  variant: "subtle",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[16px]",
                    children: "favorite"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "p-3 flex flex-col gap-1",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold",
                  children: "Calm Nature"
                }, void 0, false), /*#__PURE__*/_jsxDEV("h4", {
                  className: "font-label-lg text-label-lg text-on-surface font-semibold truncate",
                  children: "02 • Kabul Solitude"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-1.5 pt-1",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "px-2 py-0.5 rounded bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 font-label-sm text-label-sm text-outline",
                    children: "Focus"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "px-2 py-0.5 rounded bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 font-label-sm text-label-sm text-outline",
                    children: "Clarity"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "group relative rounded-xl overflow-hidden bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex flex-col shadow-md transition-all hover:translate-y-[-2px]",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "relative h-44 w-full bg-cover bg-center",
                style: {
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuASlQE5CWlO4y2dUD3ckRNCafmPfsl-95ycwtaHXfmF4UcpPySKBk9y3u2B6Nb79tZnIcHZe_AgUU2nlfD_Qh1FNTJeoboSRpdRhJI60jng_C31zIndk9XR8GdHeW9UR2OuEHvQkwNK0dIFfU4ZJ3-k6P0yE8mc6PLMDWlZpa19p4VhNnYGo18S851_9CKBwA8EP5JhBPmWO6Arswddq0qgdz21dKcQVYX_i0glCiCKoFaZ3g_w5EQ')`
                },
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-secondary text-[12px]",
                    children: "wb_sunny"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant",
                    children: "/"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-primary text-[12px]",
                    children: "bedtime"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  "aria-label": "Favorite wallpaper",
                  className: "absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md flex items-center justify-center text-on-surface dark:text-on-surface-variant hover:text-error transition-colors",
                  variant: "subtle",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[16px]",
                    children: "favorite"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "p-3 flex flex-col gap-1",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold",
                  children: "Minarets & Heritage"
                }, void 0, false), /*#__PURE__*/_jsxDEV("h4", {
                  className: "font-label-lg text-label-lg text-on-surface font-semibold truncate",
                  children: "03 • Minaret Sunrise"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-1.5 pt-1",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "px-2 py-0.5 rounded bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 font-label-sm text-label-sm text-outline",
                    children: "Spiritual Warmth"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "group relative rounded-xl overflow-hidden bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex flex-col shadow-lg shadow-primary/10 transition-all",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "relative h-44 w-full bg-cover bg-center",
                style: {
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD-FsBUs6dDPSfATyDnSK_DVdo0xSKTqVVgHL_X_0rrTE1mqpUtGWRnvhVz79cmkI2bPuA4dhHFmqzE71sbz-ZRJVg1IIy8ZvjwSUTxwUBJzFO3xbTKoh9nD3n1tP_fpG1PCiK9n1WWriWUhDzXiKc66rnYsFgb3OlZ7McJ1H6EnwwDdOtK_Ix9RALcja9MdxLDZcMulBiFT14UHab6cPkMZNEudK74QEs2GuMAaASu8H_6zUnGMvY')`
                },
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "absolute inset-0 bg-gradient-to-t from-surface-container-high via-transparent to-transparent"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "absolute top-2 left-2 px-2 py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-semibold flex items-center gap-1 shadow-sm",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[12px]",
                    children: "check"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    children: "Active"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "absolute top-2 right-2 w-7 h-7 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-sm",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[16px]",
                    children: "done"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "p-3 flex flex-col gap-1",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center justify-between",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold",
                    children: "Curated Hero"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-primary font-medium",
                    children: "Selected"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("h4", {
                  className: "font-label-lg text-label-lg text-on-surface font-semibold truncate",
                  children: "04 • Serene Horizon"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-1.5 pt-1",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "px-2 py-0.5 rounded bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none font-label-sm text-label-sm text-primary-fixed",
                    children: "Dawn / Dusk"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "group relative rounded-xl overflow-hidden bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex flex-col shadow-md transition-all hover:translate-y-[-2px]",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "relative h-44 w-full bg-cover bg-center",
                style: {
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAqWps_QvYBMtKthotOkjbnQyKX4IhWiTiuXmSDtXEbuhUAyzgs6xy--IrQ6ap1NjhwvIE7GN_KSmvQ_PZUyiteU8Xk1KdXShIjCE9CPfVRLjLtHNC1D1PcqTmm2neolj1bRMbVDkq6qvUULs4NNtPY4XwEaT478U69qUCXYU6shpZRSwAB9jSQCxwM4_JOeJOXM5slPhZ7RCJ1JCKpKRBApo5N-O-Cp8MD5hU5hmBg2myI8Crn5m8')`
                },
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-secondary text-[12px]",
                    children: "wb_sunny"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant",
                    children: "/"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-primary text-[12px]",
                    children: "bedtime"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  "aria-label": "Favorite wallpaper",
                  className: "absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md flex items-center justify-center text-on-surface dark:text-on-surface-variant hover:text-error transition-colors",
                  variant: "subtle",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[16px]",
                    children: "favorite"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "p-3 flex flex-col gap-1",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold",
                  children: "Calm Nature"
                }, void 0, false), /*#__PURE__*/_jsxDEV("h4", {
                  className: "font-label-lg text-label-lg text-on-surface font-semibold truncate",
                  children: "05 • Emerald Oasis"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-1.5 pt-1",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "px-2 py-0.5 rounded bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 font-label-sm text-label-sm text-outline",
                    children: "Revitalization"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "group relative rounded-xl overflow-hidden bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex flex-col shadow-md transition-all hover:translate-y-[-2px]",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "relative h-44 w-full bg-cover bg-center",
                style: {
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCpphgaA33Em1kJ60X2iKk_YpBhqpWL4wQs5HZPck9lne0SBCOQzJ0Ck1HIvZooiv1bK1HLAEB7TNvVP2AljwOjPDFZosKMfDuk6U8e47pPefF0Ix7-7eD0rNDvKi7XDHrAhS81h7rrBtkpPzU9twKk_1z0hqmoCJrRJAGz-4V8eZT4W9Ml1Lun-gM3ByZ-UXHOW3znFy8ZWhkyIhfxI3qsCcB-iidmPT7xEVRhQcMAVB4F1j5FL14')`
                },
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-secondary text-[12px]",
                    children: "wb_sunny"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant",
                    children: "/"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-primary text-[12px]",
                    children: "bedtime"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  "aria-label": "Favorite wallpaper",
                  className: "absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md flex items-center justify-center text-on-surface dark:text-on-surface-variant hover:text-error transition-colors",
                  variant: "subtle",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[16px]",
                    children: "favorite"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "p-3 flex flex-col gap-1",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold",
                  children: "Abstract Glass"
                }, void 0, false), /*#__PURE__*/_jsxDEV("h4", {
                  className: "font-label-lg text-label-lg text-on-surface font-semibold truncate",
                  children: "06 • Lavender Haze"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-1.5 pt-1",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "px-2 py-0.5 rounded bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 font-label-sm text-label-sm text-outline",
                    children: "Dream State"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "group relative rounded-xl overflow-hidden bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex flex-col shadow-md transition-all hover:translate-y-[-2px]",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "relative h-44 w-full bg-cover bg-center",
                style: {
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB8Jk_HLGg9vMKKMp3INCbNKXEC_OIqC1QlEIXBWZFqSalb3XNayNq1jVzZyeEtuR_Le5tInx3iH8iowlJPCz049LPZ1_GlIop74wm1P2rsKsMF0AV1DzV6x3Lup6hVcJqGUGf3RSt1KhnHnYY8g_RSV00EzwOC8DBb5Zr6Y9U7uHp3CTsCLkgNE57MzTCp1QqIYO52Tl8t-uGU0tUy0X1LI-ciGwDJiKverNcERBiGI83jMm35_YM')`
                },
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-secondary text-[12px]",
                    children: "wb_sunny"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant",
                    children: "/"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-primary text-[12px]",
                    children: "bedtime"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  "aria-label": "Favorite wallpaper",
                  className: "absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md flex items-center justify-center text-on-surface dark:text-on-surface-variant hover:text-error transition-colors",
                  variant: "subtle",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[16px]",
                    children: "favorite"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "p-3 flex flex-col gap-1",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold",
                  children: "Minarets & Heritage"
                }, void 0, false), /*#__PURE__*/_jsxDEV("h4", {
                  className: "font-label-lg text-label-lg text-on-surface font-semibold truncate",
                  children: "07 • Sacred Geometry"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-1.5 pt-1",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "px-2 py-0.5 rounded bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 font-label-sm text-label-sm text-outline",
                    children: "Intricate Calm"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "group relative rounded-xl overflow-hidden bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex flex-col shadow-md transition-all hover:translate-y-[-2px]",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "relative h-44 w-full bg-cover bg-center",
                style: {
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCe_RBkRfz9NcC_Cogxr4QikaMJmEm8PnDrbq1dQTqiFzUOr1xWkhzm4tEpwGd9OgkZNiQBgo8u-y9Thja_42WHIYa0Yf6HTmMXz9Bj_83nXfz0cQmNxGO-PytY-5dWf_CWGTtuUdqASo5CzunFOxsXbI6uBQZJBSUstVju55GFaCIp-Sqqr0yS389pVshIEPMQKZvGmkUMCuTEfD4fqOnx5-vECpOxGGNkCmW7Fzf4-RwzL4y72S0')`
                },
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-secondary text-[12px]",
                    children: "wb_sunny"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant",
                    children: "/"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-primary text-[12px]",
                    children: "bedtime"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  "aria-label": "Favorite wallpaper",
                  className: "absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md flex items-center justify-center text-on-surface dark:text-on-surface-variant hover:text-error transition-colors",
                  variant: "subtle",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[16px]",
                    children: "favorite"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "p-3 flex flex-col gap-1",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold",
                  children: "Calm Nature"
                }, void 0, false), /*#__PURE__*/_jsxDEV("h4", {
                  className: "font-label-lg text-label-lg text-on-surface font-semibold truncate",
                  children: "08 • Mountain Zenith"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-1.5 pt-1",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "px-2 py-0.5 rounded bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 font-label-sm text-label-sm text-outline",
                    children: "High Perspective"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col items-center gap-space-md pt-space-xs pb-space-lg text-center",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-2",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "w-1.5 h-1.5 rounded-full bg-secondary"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-outline",
                children: "22 additional themes available in Sanctuary Cloud"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "w-full py-2.5 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface font-label-lg text-label-lg transition-colors flex items-center justify-center gap-2",
              variant: "none",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px]",
                children: "cloud_download"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                children: "Load All 30 Backgrounds"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-primary-container via-inverse-primary to-secondary text-on-primary font-label-lg text-label-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-2 font-semibold active:scale-[0.99] transition-transform",
              variant: "primary",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[20px]",
                children: "tune"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                children: "Customize Selected Background"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "w-full py-3 px-4 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant hover:text-on-surface font-label-lg text-label-lg transition-colors flex items-center justify-center gap-2",
              variant: "none",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[20px]",
                children: "add_photo_alternate"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                children: "Upload Custom Wallpaper"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false)]
  }, void 0, true);
}