import GlassInput from "./components/ui/GlassInput";
import GlassCard from "./components/ui/GlassCard";
import AppShell from "./components/ui/AppShell";
import React, { useState, useEffect } from 'react';
import LiquidButton from './components/ui/LiquidButton';
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
const NewEditTasbeeh = () => {
  return /*#__PURE__*/_jsxDEV("div", {
    className: "bg-surface-container font-body-md text-on-surface antialiased flex flex-col min-h-screen relative",
    children: [/*#__PURE__*/_jsxDEV("header", {
      className: "fixed top-0 w-full z-50 pt-safe bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "h-16 px-gutter-mobile flex items-center justify-between",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-sm",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            "aria-label": "Go back",
            className: "w-11 h-11 flex items-center justify-center rounded-full text-on-surface hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
            onClick: "history.back()",
            variant: "icon",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[22px]",
              children: "arrow_back"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("h1", {
            className: "font-headline-sm text-headline-sm font-semibold tracking-tight text-on-surface truncate max-w-[200px]",
            children: "Quick Counter Modal"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-xs",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            "aria-label": "Contextual drafts",
            className: "h-11 px-space-md flex items-center justify-center gap-space-xs rounded-full text-secondary hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
            variant: "subtle",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[18px]",
              children: "drafts"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-md text-label-md hidden sm:inline",
              children: "Drafts"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "w-8 h-8 rounded-full bg-primary flex items-center justify-center ml-space-xs",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-on-primary text-[18px]",
              children: "person"
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false), /*#__PURE__*/_jsxDEV("main", {
      className: "flex flex-col relative w-full pt-16 pb-safe bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none flex-1",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "flex flex-col w-full",
        children: /*#__PURE__*/_jsxDEV("div", {
          className: "w-full max-w-xl mx-auto px-gutter-mobile py-space-md space-y-space-md",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between px-space-xs",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-xs",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container/20 text-secondary font-label-sm text-label-sm tracking-wider",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"
                }, void 0, false), "NEW DHIKR"]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant font-medium",
                children: "Custom Counter"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              "aria-label": "Reset fields",
              className: "w-8 h-8 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant flex items-center justify-center transition-colors shadow-sm",
              title: "Reset counter form",
              type: "button",
              variant: "icon",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px]",
                children: "restart_alt"
              }, void 0, false)
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
            className: "rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl p-space-md shadow-md space-y-space-md",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("div", {
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-lg text-label-lg text-on-surface font-semibold",
                  children: ["Dhikr Title ", /*#__PURE__*/_jsxDEV("span", {
                    className: "text-secondary",
                    children: "*"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                  children: "Primary Name"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant",
                children: "Required"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "relative flex items-center",
              children: [/*#__PURE__*/_jsxDEV(GlassInput, {
                className: "w-full h-11 pl-space-md pr-11 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface font-body-md text-body-md shadow-inner focus:outline-none focus:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0",
                id: "dhikr-input",
                placeholder: "Enter Dhikr title",
                type: "text",
                value: "Astaghfirullah wa Atubu Ilayh"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined absolute right-3 text-secondary text-[20px] pointer-events-none",
                children: "menu_book"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "relative overflow-hidden rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 p-space-md shadow-inner",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none",
                "data-alt": "Moody celestial Islamic sanctuary courtyard with glowing architectural arches, soft geometric watermarks, serene midnight dark ambient lighting, subtle cyan and indigo accents.",
                style: {
                  backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCoSMPgQPcZ86kAXer27XkmLlOReRH-t75X9QqCgWKeeVT8Y7Kpu8rv5bzcJ8c8W6BdC7ZmYt5Czf6B7gZUDvIAEiDI8M-06lIEkOKpePpoS3eKOOqZjvJBcqVor9eVJ37YcqpKLp4LnunIj67d2ZzZ_Ivf_yJX8AKXKeuEy5eSV72SYZChuKZloE1hZgksjljHwSTn_9sQcocVpJ2fFeuothGqSYyXLXAh50RprSeof9SItotFjmE")`
                }
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "relative z-10 flex flex-col items-center justify-center text-center py-space-sm space-y-space-xs",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm tracking-widest uppercase text-secondary/80",
                  children: "Preview (Script)"
                }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                  className: "text-[26px] leading-[46px] font-semibold text-primary-fixed tracking-wide",
                  id: "arabic-preview",
                  style: {
                    fontFamily: `"Space Grotesk", serif`,
                    direction: 'rtl'
                  },
                  children: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "space-y-space-xs pt-space-xs",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-1.5 text-secondary",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[16px]",
                    children: "auto_awesome"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm font-semibold",
                    children: "Preset Suggestions"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant",
                  children: "Tap to fill"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-xs overflow-x-auto pb-1 no-scrollbar",
                children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "shrink-0 px-3 py-1.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface font-label-md text-label-md transition-colors shadow-sm",
                  onClick: "selectPreset('SubhanAllah', 'سُبْحَانَ اللَّهِ', 'Glory be to Allah', 33)",
                  type: "button",
                  variant: "pill",
                  children: "SubhanAllah"
                }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "shrink-0 px-3 py-1.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface font-label-md text-label-md transition-colors shadow-sm",
                  onClick: "selectPreset('Alhamdulillah', 'الْحَمْدُ لِلَّهِ', 'All praise is due to Allah', 33)",
                  type: "button",
                  variant: "pill",
                  children: "Alhamdulillah"
                }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "shrink-0 px-3 py-1.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface font-label-md text-label-md transition-colors shadow-sm",
                  onClick: "selectPreset('Allahu Akbar', 'اللَّهُ أَكْبَرُ', 'Allah is the Greatest', 34)",
                  type: "button",
                  variant: "pill",
                  children: "Allahu Akbar"
                }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "shrink-0 px-3 py-1.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface font-label-md text-label-md transition-colors shadow-sm",
                  onClick: "selectPreset('Astaghfirullah', 'أَسْتَغْفِرُ اللَّهَ', 'I seek forgiveness of Allah', 100)",
                  type: "button",
                  variant: "pill",
                  children: "Astaghfirullah"
                }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "shrink-0 px-3 py-1.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface font-label-md text-label-md transition-colors shadow-sm",
                  onClick: "selectPreset('La ilaha illallah', 'لَا إِلٰهَ إِلَّا اللَّهُ', 'None has the right to be worshipped but Allah', 100)",
                  type: "button",
                  variant: "pill",
                  children: "La ilaha illallah"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
            className: "rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl p-space-md shadow-md space-y-space-xs",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-lg text-label-lg text-on-surface font-semibold",
                children: "Transliteration & Meaning"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant",
                children: "Optional"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "relative",
              children: /*#__PURE__*/_jsxDEV("textarea", {
                className: "w-full p-space-md rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface font-body-sm text-body-sm shadow-inner focus:outline-none focus:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 resize-none",
                id: "meaning-input",
                placeholder: "Add custom English translation or personal reflection note...",
                rows: "2",
                children: "I seek forgiveness of Allah and repent to Him."
              }, void 0, false)
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
            className: "rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl p-space-md shadow-md space-y-space-md",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("div", {
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-lg text-label-lg text-on-surface font-semibold",
                  children: "Target Count"
                }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                  children: "Total loop target per session"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-1 text-secondary font-label-md text-label-md",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[16px]",
                  children: "sync"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  id: "cycle-label",
                  children: "100 cycles"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "grid grid-cols-3 gap-space-xs",
              id: "preset-grid",
              children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "preset-btn py-2.5 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface font-label-md text-label-md font-semibold transition-colors text-center shadow-sm",
                onClick: "setCount(33, this)",
                type: "button",
                variant: "subtle",
                children: "33"
              }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "preset-btn py-2.5 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface font-label-md text-label-md font-semibold transition-colors text-center shadow-sm",
                onClick: "setCount(99, this)",
                type: "button",
                variant: "subtle",
                children: "99"
              }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "preset-btn py-2.5 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md font-bold transition-colors text-center shadow-md",
                onClick: "setCount(100, this)",
                type: "button",
                variant: "primary",
                children: "100"
              }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "preset-btn py-2.5 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface font-label-md text-label-md font-semibold transition-colors text-center shadow-sm",
                onClick: "setCount(500, this)",
                type: "button",
                variant: "subtle",
                children: "500"
              }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "preset-btn py-2.5 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface font-label-md text-label-md font-semibold transition-colors text-center shadow-sm",
                onClick: "setCount(1000, this)",
                type: "button",
                variant: "subtle",
                children: "1,000"
              }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "preset-btn py-2.5 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface font-label-md text-label-md font-semibold transition-colors text-center shadow-sm flex items-center justify-center gap-1",
                onClick: "promptCustomCount(this)",
                type: "button",
                variant: "subtle",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[14px]",
                  children: "tune"
                }, void 0, false), "Custom"]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between px-space-md py-space-sm rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 shadow-inner",
              children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                "aria-label": "Decrease target count",
                className: "w-10 h-10 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface active:scale-95 flex items-center justify-center transition-all shadow-sm",
                onClick: "stepCount(-1)",
                type: "button",
                variant: "icon",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[20px]",
                  children: "remove"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col items-center",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-headline-md text-headline-md font-bold text-on-surface tracking-tight",
                  id: "stepper-val",
                  children: "100"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant uppercase tracking-wider",
                  children: "Beads Count"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                "aria-label": "Increase target count",
                className: "w-10 h-10 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface active:scale-95 flex items-center justify-center transition-all shadow-sm",
                onClick: "stepCount(1)",
                type: "button",
                variant: "icon",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[20px]",
                  children: "add"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
            className: "rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl p-space-md shadow-md space-y-space-md",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-start gap-space-sm",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-9 h-9 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center text-secondary shrink-0 shadow-sm",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[20px]",
                    children: "flag"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-lg text-label-lg text-on-surface font-semibold",
                    children: "Daily Goal"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                    children: "Track towards daily momentum ring"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                "aria-label": "Toggle daily goal tracking",
                className: "relative w-12 h-7 rounded-full bg-secondary transition-colors p-1 shadow-inner focus:outline-none",
                id: "toggle-goal",
                onClick: "toggleSwitch('toggle-goal', 'toggle-goal-knob')",
                type: "button",
                variant: "subtle",
                children: /*#__PURE__*/_jsxDEV("div", {
                  className: "w-5 h-5 rounded-full bg-on-secondary shadow-md transform translate-x-5 transition-transform duration-200 ease-out",
                  id: "toggle-goal-knob"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "grid grid-cols-2 gap-space-xs p-1 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0",
              children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "cadence-btn py-2 rounded-md bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface font-label-md text-label-md font-semibold text-center transition-all shadow-sm",
                onClick: "setCadenceSegment(this)",
                type: "button",
                variant: "subtle",
                children: "Daily Practice"
              }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "cadence-btn py-2 rounded-md text-on-surface dark:text-on-surface-variant hover:text-on-surface font-label-md text-label-md font-medium text-center transition-all",
                onClick: "setCadenceSegment(this)",
                type: "button",
                variant: "subtle",
                children: "Specific Occasions"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
            className: "rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl p-space-md shadow-md space-y-space-md",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-start gap-space-sm",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-9 h-9 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center text-secondary shrink-0 shadow-sm",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[20px]",
                    children: "notifications_active"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-lg text-label-lg text-on-surface font-semibold",
                    children: "Reminder Notice"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                    children: "Gentle prompt before evening"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                "aria-label": "Toggle reminder notification",
                className: "relative w-12 h-7 rounded-full bg-secondary transition-colors p-1 shadow-inner focus:outline-none",
                id: "toggle-reminder",
                onClick: "toggleSwitch('toggle-reminder', 'toggle-reminder-knob')",
                type: "button",
                variant: "subtle",
                children: /*#__PURE__*/_jsxDEV("div", {
                  className: "w-5 h-5 rounded-full bg-on-secondary shadow-md transform translate-x-5 transition-transform duration-200 ease-out",
                  id: "toggle-reminder-knob"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between px-space-md py-space-sm rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-xs text-on-surface dark:text-on-surface-variant",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[18px]",
                  children: "schedule"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm",
                  children: "Preferred Window"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 font-label-md text-label-md transition-colors shadow-sm",
                type: "button",
                variant: "pill",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  id: "window-label",
                  children: "After Asr (5:15 PM)"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[16px]",
                  children: "expand_more"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "rounded-xl overflow-hidden shadow-sm",
            children: /*#__PURE__*/_jsxDEV("div", {
              className: "w-full h-20 bg-cover bg-center flex items-center justify-between px-space-md",
              "data-alt": "Panoramic minimal Islamic geometric pattern woven with starry constellations, deep obsidian midnight blues, soft luminous indigo dust, modern spiritual aesthetic.",
              style: {
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCxFxGmryc51HCAdncWU2hehZjwa6mWdfpFbeAXZQwitHjuCFZiPinpO-p6b7cvAhErEg7tZh0BzCwEyMslARqbX86XONPCwHYqYSSjUa4YDvmrv5nWh4TdF93XXdCrm9aPRhpn3ESin4SHYktDi0Obj4KfAzcF5ybamd4tmaTxLVONLRrrQA2CXusk1TWMOjjYPYt0t0TSPNQ-OPhzMNPlhkj3PW9PDfexxWIiXaOG_YaP2ZfBiKA")`
              },
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-sm",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-8 h-8 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md flex items-center justify-center text-primary-fixed",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[18px]",
                    children: "workspace_premium"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  children: [/*#__PURE__*/_jsxDEV("p", {
                    className: "font-label-md text-label-md text-primary-fixed font-semibold",
                    children: "Momentum Streak Active"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                    className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant",
                    children: "14 continuous days logged"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-secondary backdrop-blur-sm",
                children: "+25 XP"
              }, void 0, false)]
            }, void 0, true)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "pt-space-xs pb-space-lg space-y-space-sm",
            children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "w-full h-12 rounded-xl bg-gradient-to-r from-primary-container to-secondary text-surface-container-lowest font-label-lg text-label-lg font-bold flex items-center justify-center gap-space-xs shadow-lg shadow-primary-container/20 active:scale-[0.99] transition-transform",
              type: "button",
              variant: "primary",
              children: [/*#__PURE__*/_jsxDEV("span", {
                children: "Save Tasbeeh"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px]",
                children: "arrow_forward"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "w-full h-11 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface font-label-lg text-label-lg font-medium flex items-center justify-center transition-colors shadow-sm",
              onClick: "history.back()",
              type: "button",
              variant: "none",
              children: "Cancel"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex justify-center pt-space-xs",
              children: /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "px-space-md py-1.5 rounded-full bg-error-container/30 hover:bg-error-container/50 text-error font-label-md text-label-md flex items-center gap-1.5 transition-colors shadow-sm",
                type: "button",
                variant: "subtle",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[16px]",
                  children: "delete"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  children: "Delete Tasbeeh"
                }, void 0, false)]
              }, void 0, true)
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true)
      }, void 0, false)
    }, void 0, false)]
  }, void 0, true);
};
export default NewEditTasbeeh;