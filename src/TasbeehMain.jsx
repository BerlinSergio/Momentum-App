import GlassInput from "./components/ui/GlassInput";
import GlassCard from "./components/ui/GlassCard";
import AppShell from "./components/ui/AppShell";
import React, { useState, useEffect } from 'react';
import LiquidButton from './components/ui/LiquidButton';
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
const TasbeehMain = () => {
  const [count, setCount] = useState(27);
  const [target, setTarget] = useState(33);
  const [daily, setDaily] = useState(428);
  const [chimeActive, setChimeActive] = useState(true);
  const circumference = 578;
  const progress = Math.min(count / target, 1);
  const offset = circumference - progress * circumference;
  return /*#__PURE__*/_jsxDEV("div", {
    className: "bg-surface-container font-body-md text-on-surface antialiased flex flex-col min-h-screen relative",
    children: [/*#__PURE__*/_jsxDEV("header", {
      className: "fixed top-0 w-full z-50 pt-safe bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "h-16 px-gutter-mobile flex items-center justify-between",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-sm",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "w-9 h-9 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-secondary text-[22px]",
              children: "radio_button_checked"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "font-headline-sm text-headline-sm font-bold text-on-surface tracking-tight",
              children: "Momentum"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant uppercase tracking-widest",
              children: "Tasbeeh"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-xs",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            "aria-label": "Session History",
            className: "w-11 h-11 flex items-center justify-center rounded-full text-on-surface dark:text-on-surface-variant hover:text-on-surface hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
            variant: "icon",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[20px]",
              children: "history"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
            "aria-label": "Settings",
            className: "w-11 h-11 flex items-center justify-center rounded-full text-on-surface dark:text-on-surface-variant hover:text-on-surface hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
            variant: "icon",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[20px]",
              children: "tune"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "w-8 h-8 rounded-full bg-primary flex items-center justify-center ml-space-xs",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-on-primary text-[18px]",
              children: "person"
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false), /*#__PURE__*/_jsxDEV("main", {
      className: "flex flex-col relative w-full pt-16 pb-32 bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none flex-1",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "flex flex-col w-full px-gutter-mobile gap-space-md select-none",
        children: [/*#__PURE__*/_jsxDEV(GlassCard, {
          className: "w-full rounded-2xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl p-space-md shadow-[0_8px_30px_rgba(0,0,0,0.35)] relative overflow-hidden",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "absolute -right-10 -top-10 w-36 h-36 rounded-full bg-primary/10 blur-3xl pointer-events-none"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-secondary/10 blur-2xl pointer-events-none"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between gap-space-xs relative z-10",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-xs flex-wrap",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container/20 text-secondary font-label-sm text-label-sm",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[14px]",
                  children: "auto_awesome"
                }, void 0, false), "CURRENT DHIKR"]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "inline-flex items-center px-2 py-0.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant font-label-sm text-label-sm",
                children: "Spiritual Focus"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-1 text-on-surface dark:text-on-surface-variant",
              children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "icon",
                "aria-label": "Toggle Audio Chime",
                className: "w-8 h-8 rounded-full flex items-center justify-center hover:text-secondary hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
                id: "chimeBtn",
                onClick: () => setChimeActive(!chimeActive),
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[18px]",
                  children: "volume_up"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                "aria-label": "Dhikr Options",
                className: "w-8 h-8 rounded-full flex items-center justify-center hover:text-on-surface hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
                variant: "icon",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[18px]",
                  children: "more_vert"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "my-space-md text-center relative z-10",
            children: [/*#__PURE__*/_jsxDEV("p", {
              className: "font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-wide drop-shadow-[0_2px_12px_rgba(192,193,255,0.25)] leading-relaxed py-1",
              dir: "rtl",
              lang: "ar",
              children: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ"
            }, void 0, false), /*#__PURE__*/_jsxDEV("h2", {
              className: "font-headline-sm text-headline-sm font-semibold text-on-surface mt-space-xs",
              children: "SubhanAllah wa bi-Hamdih"
            }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
              className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant italic mt-0.5",
              children: "“Glory be to Allah and Praise Him”"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between pt-space-xs relative z-10",
            children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-primary font-label-md text-label-md transition-colors shadow-sm",
              variant: "primary",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[16px]",
                children: "swap_horiz"
              }, void 0, false), "Change Phrase"]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-secondary-fixed-dim font-label-sm text-label-sm tracking-wider",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "w-2 h-2 rounded-full bg-secondary animate-pulse"
              }, void 0, false), "Round 1 of 3"]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "w-full rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md p-space-sm px-space-md flex items-center justify-between shadow-sm",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-space-sm",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "w-8 h-8 rounded-lg bg-primary-container/20 flex items-center justify-center text-primary",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[20px]",
                style: {
                  fontVariationSettings: `'FILL' 1`
                },
                children: "stars"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant uppercase tracking-wider",
                children: "Daily Dedication"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-lg text-label-lg font-semibold text-on-surface ",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  id: "dailyCount",
                  children: daily
                }, void 0, false), " counts"]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col items-end",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-secondary flex items-center gap-1",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[13px]",
                children: "flag"
              }, void 0, false), "Goal 1,000"]
            }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant font-medium",
              children: "43% completed"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
          className: "w-full rounded-2xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl p-space-md flex flex-col items-center justify-center relative shadow-[0_12px_40px_rgba(0,0,0,0.45)]",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "relative w-64 h-64 flex items-center justify-center my-space-xs",
            children: [/*#__PURE__*/_jsxDEV("svg", {
              className: "w-full h-full transform -rotate-90",
              viewBox: "0 0 220 220",
              children: [/*#__PURE__*/_jsxDEV("circle", {
                className: "text-surface-container-highest/40",
                cx: "110",
                cy: "110",
                fill: "none",
                r: "92",
                stroke: "currentColor",
                strokeWidth: "12"
              }, void 0, false), /*#__PURE__*/_jsxDEV("circle", {
                className: "transition-all duration-300 ease-out",
                cx: "110",
                cy: "110",
                fill: "none",
                id: "counterRing",
                r: "92",
                stroke: "url(#electricGlow)",
                strokeDasharray: "578",
                strokeDashoffset: "105",
                strokeLinecap: "round",
                strokeWidth: "12"
              }, void 0, false), /*#__PURE__*/_jsxDEV("defs", {
                children: /*#__PURE__*/_jsxDEV("lineargradient", {
                  id: "electricGlow",
                  x1: "0%",
                  x2: "100%",
                  y1: "0%",
                  y2: "100%",
                  children: [/*#__PURE__*/_jsxDEV("stop", {
                    offset: "0%",
                    "stop-color": "#8083ff"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("stop", {
                    offset: "50%",
                    "stop-color": "#c0c1ff"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("stop", {
                    offset: "100%",
                    "stop-color": "#4cd7f6"
                  }, void 0, false)]
                }, void 0, true)
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant tracking-[0.2em] uppercase",
                children: "COUNTER"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-display-hero text-[64px] leading-none font-bold text-on-surface tracking-tight my-1 drop-shadow-[0_0_24px_rgba(192,193,255,0.35)]",
                id: "currentVal",
                children: "27"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-secondary",
                children: ["of ", /*#__PURE__*/_jsxDEV("span", {
                  id: "targetDisplay",
                  children: target
                }, void 0, false), " Target"]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "w-full flex items-center justify-between px-space-sm pt-space-xs text-on-surface dark:text-on-surface-variant",
            children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
              variant: "pill",
              className: "flex items-center gap-1 text-on-surface dark:text-on-surface-variant hover:text-error hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 px-3 py-1.5 rounded-lg transition-colors font-label-md text-label-md",
              id: "resetCounterBtn",
              onClick: () => setCount(0),
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[17px]",
                children: "restart_alt"
              }, void 0, false), "Reset"]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-secondary-fixed-dim font-label-sm text-label-sm",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "w-1.5 h-1.5 rounded-full bg-secondary"
              }, void 0, false), "Haptics: Soft"]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              variant: "pill",
              className: "flex items-center gap-1 text-on-surface dark:text-on-surface-variant hover:text-on-surface hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 px-3 py-1.5 rounded-lg transition-colors font-label-md text-label-md",
              id: "undoCounterBtn",
              onClick: () => {
                if (count > 0) {
                  setCount(c => c - 1);
                  setDaily(d => Math.max(0, d - 1));
                }
              },
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[17px]",
                children: "undo"
              }, void 0, false), "Undo"]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
          "aria-label": "Tap to Count Dhikr",
          className: "group relative w-full !rounded-2xl !p-space-md !flex !items-center !justify-center !gap-space-md !bg-gradient-to-r from-primary-container via-inverse-primary to-secondary-container !text-on-surface shadow-[0_0_32px_rgba(128,131,255,0.4)]",
          id: "countTriggerBtn",
          onClick: () => {
            setCount(c => c + 1);
            setDaily(d => d + 1);
          },
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 shadow-inner",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[28px] text-on-surface group-active:scale-110 transition-transform",
              children: "touch_app"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col text-left",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "font-headline-sm text-headline-sm font-bold tracking-wide leading-tight",
              children: "TAP TO COUNT"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-on-surface/80",
              children: "Thumb-friendly tactile touch"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "w-full rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md p-space-md shadow-sm",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between mb-space-sm",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant uppercase tracking-wider",
              children: "SELECT TARGET"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-primary",
              children: "Standard Tasbeeh"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "grid grid-cols-5 gap-space-xs",
            children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
              className: `target-chip${target === parseInt('33') ? ' !py-2 !rounded-lg !bg-primary !text-on-primary font-label-md text-label-md font-bold shadow-[0_0_16px_rgba(192,193,255,0.4)] text-center transition-all' : ' !py-2 !rounded-lg !bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 !text-on-surface font-label-md text-label-md text-center hover:!bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors'}`,
              onClick: () => setTarget(33),
              "data-target": "33",
              children: "33"
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: `target-chip${target === parseInt('99') ? ' !py-2 !rounded-lg !bg-primary !text-on-primary font-label-md text-label-md font-bold shadow-[0_0_16px_rgba(192,193,255,0.4)] text-center transition-all' : ' !py-2 !rounded-lg !bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 !text-on-surface font-label-md text-label-md text-center hover:!bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors'}`,
              onClick: () => setTarget(99),
              "data-target": "99",
              children: "99"
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: `target-chip${target === parseInt('100') ? ' !py-2 !rounded-lg !bg-primary !text-on-primary font-label-md text-label-md font-bold shadow-[0_0_16px_rgba(192,193,255,0.4)] text-center transition-all' : ' !py-2 !rounded-lg !bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 !text-on-surface font-label-md text-label-md text-center hover:!bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors'}`,
              onClick: () => setTarget(100),
              "data-target": "100",
              children: "100"
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: `target-chip${target === parseInt('1000') ? ' !py-2 !rounded-lg !bg-primary !text-on-primary font-label-md text-label-md font-bold shadow-[0_0_16px_rgba(192,193,255,0.4)] text-center transition-all' : ' !py-2 !rounded-lg !bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 !text-on-surface font-label-md text-label-md text-center hover:!bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors'}`,
              onClick: () => setTarget(1000),
              "data-target": "1000",
              children: "1000"
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              "aria-label": "Custom Target",
              className: "!py-2 !rounded-lg !bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 !text-on-surface dark:text-on-surface-variant hover:!text-on-surface hover:!bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center transition-colors",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px]",
                children: "edit"
              }, void 0, false)
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "grid grid-cols-3 gap-space-sm w-full",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            variant: "subtle",
            className: "flex flex-col items-center justify-center gap-1.5 p-space-sm rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors shadow-sm text-on-surface ",
            id: "quickResetBtn",
            onClick: () => setCount(0),
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "w-9 h-9 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center text-secondary",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[20px]",
                children: "refresh"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-on-surface ",
              children: "Reset Count"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
            className: "flex flex-col items-center justify-center gap-1.5 p-space-sm rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors shadow-sm text-on-surface ",
            variant: "subtle",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "w-9 h-9 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center text-primary",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[20px]",
                children: "library_books"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-on-surface ",
              children: "New Phrase"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
            className: "flex flex-col items-center justify-center gap-1.5 p-space-sm rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors shadow-sm text-on-surface ",
            variant: "subtle",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "w-9 h-9 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center text-tertiary",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[20px]",
                children: "insights"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-on-surface ",
              children: "View Log"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "w-full rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md p-space-md flex items-start gap-space-sm shadow-sm mb-space-sm",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "w-8 h-8 rounded-lg bg-tertiary/15 flex items-center justify-center text-tertiary shrink-0 mt-0.5",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[18px]",
              children: "lightbulb"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-tertiary font-semibold uppercase tracking-wider",
              children: "DAILY WISDOM"
            }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
              className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant italic mt-0.5 leading-relaxed",
              children: "“The deeds most loved by Allah are those done regularly, even if small.”"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false), /*#__PURE__*/_jsxDEV("nav", {
      className: "fixed bottom-0 w-full z-50 pb-safe bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.3)]",
      "data-active-classes": "text-secondary font-semibold",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "relative flex justify-around items-center h-16 px-gutter-mobile",
        children: [/*#__PURE__*/_jsxDEV("a", {
          "aria-current": "page",
          className: "flex flex-col items-center justify-center gap-space-xs min-w-[56px] min-h-[44px] transition-colors text-secondary font-semibold",
          "data-path": "tasbeeh-counter",
          href: "#",
          children: [/*#__PURE__*/_jsxDEV("span", {
            className: "material-symbols-outlined text-[22px]",
            children: "radio_button_checked"
          }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
            className: "font-label-sm text-label-sm",
            children: "Tasbeeh"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("a", {
          className: "flex flex-col items-center justify-center gap-space-xs min-w-[56px] min-h-[44px] text-on-surface dark:text-on-surface-variant hover:text-on-surface transition-colors",
          "data-path": "finance-tracker",
          href: "#",
          children: [/*#__PURE__*/_jsxDEV("span", {
            className: "material-symbols-outlined text-[22px]",
            children: "account_balance_wallet"
          }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
            className: "font-label-sm text-label-sm",
            children: "Finance"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "relative flex items-center justify-center -top-4",
          children: /*#__PURE__*/_jsxDEV("a", {
            "aria-label": "Quick Count Action",
            className: "w-14 h-14 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-[0_0_24px_rgba(76,215,246,0.45)] hover:shadow-[0_0_32px_rgba(76,215,246,0.65)] hover:scale-105 active:scale-95 transition-all",
            "data-path": "quick-counter-modal",
            href: "#",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[28px]",
              children: "add"
            }, void 0, false)
          }, void 0, false)
        }, void 0, false), /*#__PURE__*/_jsxDEV("a", {
          className: "flex flex-col items-center justify-center gap-space-xs min-w-[56px] min-h-[44px] text-on-surface dark:text-on-surface-variant hover:text-on-surface transition-colors",
          "data-path": "daily-tasks",
          href: "#",
          children: [/*#__PURE__*/_jsxDEV("span", {
            className: "material-symbols-outlined text-[22px]",
            children: "checklist"
          }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
            className: "font-label-sm text-label-sm",
            children: "Tasks"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("a", {
          className: "flex flex-col items-center justify-center gap-space-xs min-w-[56px] min-h-[44px] text-on-surface dark:text-on-surface-variant hover:text-on-surface transition-colors",
          "data-path": "more-hub",
          href: "#",
          children: [/*#__PURE__*/_jsxDEV("span", {
            className: "material-symbols-outlined text-[22px]",
            children: "more_horiz"
          }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
            className: "font-label-sm text-label-sm",
            children: "More"
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false)]
  }, void 0, true);
};
export default TasbeehMain;