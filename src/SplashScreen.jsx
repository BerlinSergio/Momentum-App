import GlassInput from "./components/ui/GlassInput";
import GlassCard from "./components/ui/GlassCard";
import AppShell from "./components/ui/AppShell";
import React, { useState, useEffect } from 'react';
import LiquidButton from './components/ui/LiquidButton';
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
const SplashScreen = () => {
  return /*#__PURE__*/_jsxDEV("div", {
    className: "bg-surface-container font-body-md text-on-surface antialiased flex flex-col min-h-screen relative",
    children: [/*#__PURE__*/_jsxDEV("div", {
      className: "fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(99,102,241,0.12),transparent_70%),radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(6,182,212,0.06),transparent_80%)]"
    }, void 0, false), /*#__PURE__*/_jsxDEV("main", {
      className: "flex-1 flex flex-col relative z-10 w-full min-h-screen pt-safe pb-safe bg-transparent",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "flex flex-col w-full relative min-h-[92vh] justify-between items-center px-6 py-8 overflow-hidden select-none",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-container/20 rounded-full blur-[120px] pointer-events-none"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "absolute top-1/3 -left-20 w-72 h-72 bg-secondary/15 rounded-full blur-[100px] pointer-events-none"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "absolute bottom-24 -right-16 w-80 h-80 bg-tertiary-container/15 rounded-full blur-[110px] pointer-events-none"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "w-full flex items-center justify-between text-on-surface dark:text-on-surface-variant/40 pt-2 z-10",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-1.5",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "inline-block w-1.5 h-1.5 rounded-full bg-secondary/80 animate-ping"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm tracking-wider uppercase text-secondary/90",
              children: "Syncing Node"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-2",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[16px] text-on-surface dark:text-on-surface-variant/60",
              children: "nights_stay"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant/60 tracking-wider",
              children: "SECURE"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex flex-col items-center justify-center my-auto w-full max-w-sm z-10 text-center",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "relative mb-8 flex items-center justify-center group cursor-pointer",
            id: "brand-emblem",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary via-secondary to-tertiary blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-700"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/30 to-secondary/30 blur-md opacity-50"
            }, void 0, false), /*#__PURE__*/_jsxDEV("img", {
              src: "/logo.png",
              alt: "Momentum Logo",
              className: "relative w-28 h-28 rounded-3xl object-cover aspect-square flex-shrink-0 shadow-2xl transition-transform duration-500 hover:scale-105 active:scale-95"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("h1", {
            className: "font-headline-md text-headline-md font-bold tracking-[0.25em] text-on-surface uppercase drop-shadow-[0_2px_12px_rgba(255,255,255,0.15)]",
            children: "MOMENTUM"
          }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
            className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant font-medium mt-2.5 max-w-[260px] leading-relaxed",
            children: "Spiritual tools, mindful finance & daily routines"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-center gap-2 mt-6",
            children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
              variant: "pill",
              className: "!bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 !text-on-surface ",
              children: "Focus"
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              variant: "pill",
              className: "!bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 !text-secondary",
              children: "Balance"
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              variant: "pill",
              className: "!bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 !text-on-surface ",
              children: "Growth"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "w-full max-w-sm flex flex-col items-center gap-4 z-10 pb-2",
          children: [/*#__PURE__*/_jsxDEV(GlassCard, {
            className: "w-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl rounded-2xl p-4 shadow-xl shadow-surface-container-lowest/80 transition-all",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-2.5",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "relative flex h-2 w-2",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "relative inline-flex rounded-full h-2 w-2 bg-secondary"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                  className: "text-on-surface font-body-sm text-body-sm font-medium",
                  children: "Preparing daily radiance"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-primary font-semibold tracking-wide",
                id: "progress-indicator",
                children: "98%"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 rounded-full h-1.5 mt-3 overflow-hidden p-0.5",
              children: /*#__PURE__*/_jsxDEV("div", {
                className: "bg-gradient-to-r from-primary-container via-primary to-secondary h-full rounded-full shadow-[0_0_12px_rgba(76,215,246,0.6)] transition-all duration-1000 ease-out",
                id: "splash-progress-bar",
                style: {
                  width: '98%'
                }
              }, void 0, false)
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-1.5 text-on-surface dark:text-on-surface-variant/70 font-label-sm text-label-sm",
            children: [/*#__PURE__*/_jsxDEV("span", {
              children: "v1.0"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "inline-block w-1 h-1 rounded-full bg-on-surface-variant/40"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "tracking-wide",
              children: "App By Milad Wardak"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false)]
  }, void 0, true);
};
export default SplashScreen;