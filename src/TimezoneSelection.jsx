import GlassInput from "./components/ui/GlassInput";
import GlassCard from "./components/ui/GlassCard";
import AppShell from "./components/ui/AppShell";
import React, { useState, useEffect } from 'react';
import LiquidButton from './components/ui/LiquidButton';
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
const TimezoneSelection = () => {
  return /*#__PURE__*/_jsxDEV("div", {
    className: "bg-surface-container font-body-md text-on-surface antialiased flex flex-col min-h-screen relative",
    children: [/*#__PURE__*/_jsxDEV("header", {
      className: "fixed top-0 inset-x-0 z-50 bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "h-16 px-gutter-mobile flex items-center justify-between relative",
        children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
          "aria-label": "Go back",
          className: "min-w-[44px] min-h-[44px] w-11 h-11 -ml-space-xs rounded-full flex items-center justify-center text-on-surface dark:text-on-surface-variant hover:text-on-surface hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none active:scale-95 transition-all",
          onClick: "history.back()",
          type: "button",
          variant: "icon",
          children: /*#__PURE__*/_jsxDEV("span", {
            className: "material-symbols-outlined text-[22px]",
            children: "arrow_back_ios_new"
          }, void 0, false)
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "absolute inset-x-16 flex items-center justify-center pointer-events-none",
          children: /*#__PURE__*/_jsxDEV("h1", {
            className: "font-headline-sm text-headline-sm text-on-surface tracking-tight truncate select-none",
            children: "Integration & Sync"
          }, void 0, false)
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-xs",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            "aria-label": "More options",
            className: "min-w-[44px] min-h-[44px] w-11 h-11 rounded-full flex items-center justify-center text-on-surface dark:text-on-surface-variant hover:text-on-surface hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none active:scale-95 transition-all",
            type: "button",
            variant: "icon",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[22px]",
              children: "more_vert"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-on-primary text-[18px]",
              children: "person"
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false), /*#__PURE__*/_jsxDEV("main", {
      className: "flex flex-col flex-1 relative w-full pt-16 pb-safe bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "flex flex-col w-full px-gutter-mobile pb-space-xl space-y-space-md",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "relative overflow-hidden rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 p-space-md shadow-xl",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "absolute -top-16 -right-12 w-48 h-48 rounded-full bg-primary-container/15 blur-3xl pointer-events-none"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "absolute -bottom-16 -left-12 w-44 h-44 rounded-full bg-secondary/10 blur-2xl pointer-events-none"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "relative z-10 flex flex-col space-y-space-md",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "inline-flex items-center gap-space-xs px-2.5 py-1 rounded-full bg-primary-container/20 text-primary font-label-sm text-label-sm font-semibold tracking-wider uppercase",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "w-1.5 h-1.5 rounded-full bg-primary animate-pulse"
                }, void 0, false), "Active Timezone"]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "inline-flex items-center gap-space-xs px-2.5 py-1 rounded-full bg-secondary/15 text-secondary font-label-sm text-label-sm",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "w-1.5 h-1.5 rounded-full bg-secondary"
                }, void 0, false), "Astronomical Sync"]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-baseline justify-between gap-space-sm pt-space-xs",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col min-w-0",
                children: [/*#__PURE__*/_jsxDEV("h2", {
                  className: "font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight truncate",
                  children: "Asia/Kabul"
                }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate mt-0.5",
                  children: "UTC +4:30 • Kabul, Afghanistan"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col items-end shrink-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "font-headline-lg-mobile text-headline-lg-mobile font-semibold text-secondary tracking-tight",
                  children: ["10:48 ", /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-md text-label-md text-secondary/80 font-normal",
                    children: "AM"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-outline uppercase tracking-wider",
                  children: "Local Solar"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
              className: "flex items-center justify-between p-3 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-sm min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-8 h-8 rounded-full bg-secondary/15 flex items-center justify-center shrink-0 text-secondary",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[18px]",
                    children: "wb_sunny"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-col min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-sm text-body-sm font-medium text-on-surface truncate",
                    children: "Solar Noon Offset: +12m 40s"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-outline truncate",
                    children: "Zenith Angle • 34.52° N"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "shrink-0 px-2 py-0.5 rounded-full bg-secondary-container/20 text-secondary font-label-sm text-label-sm font-semibold tracking-wider uppercase",
                children: "Calibrated"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
              className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant leading-relaxed",
              children: "Used to calculate astronomical Fajr, Sunrise, Dhuhr, Asr, Maghrib, and Isha solar coordinates with celestial precision."
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center justify-between p-space-md rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 shadow-md",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-space-md min-w-0",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "relative w-11 h-11 rounded-full bg-primary-container/20 flex items-center justify-center text-primary shrink-0",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[22px]",
                children: "satellite_alt"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "absolute inset-0 rounded-full animate-ping bg-primary-container/20 duration-1000"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col min-w-0",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-body-lg text-body-lg font-semibold text-on-surface truncate",
                children: "Auto-detect via GPS"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                children: "Calibrate horizons automatically"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
            "aria-checked": "true",
            className: "relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full bg-primary-container transition-colors duration-200 ease-in-out focus:outline-none",
            id: "gpsToggle",
            onClick: "this.setAttribute('aria-checked', this.getAttribute('aria-checked') === 'true' ? 'false' : 'true'); this.classList.toggle('bg-primary-container'); this.classList.toggle('bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none'); document.getElementById('toggleKnob').classList.toggle('translate-x-5');",
            role: "switch",
            type: "button",
            variant: "primary",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "translate-x-5 inline-block h-5 w-5 transform rounded-full bg-on-primary shadow-md transition duration-200 ease-in-out",
              id: "toggleKnob"
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex flex-col space-y-space-sm pt-space-xs",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "relative flex items-center",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none",
              children: "search"
            }, void 0, false), /*#__PURE__*/_jsxDEV(GlassInput, {
              className: "w-full h-11 pl-10 pr-10 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface font-body-md text-body-md placeholder-outline focus:outline-none focus:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 shadow-sm transition-all",
              id: "tzSearch",
              placeholder: "Search city, country, or UTC offset...",
              type: "text"
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "absolute right-3 text-outline hover:text-on-surface focus:outline-none",
              onClick: "document.getElementById('tzSearch').value=''; filterList();",
              type: "button",
              variant: "pill",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px]",
                children: "clear"
              }, void 0, false)
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-space-xs overflow-x-auto no-scrollbar py-1",
            children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "region-chip shrink-0 px-4 py-1.5 rounded-full bg-primary text-on-primary font-body-sm text-body-sm font-medium shadow-sm transition-transform active:scale-95",
              "data-region": "all",
              type: "button",
              variant: "primary",
              children: "All"
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "region-chip shrink-0 px-4 py-1.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant hover:text-on-surface font-body-sm text-body-sm font-medium transition-all active:scale-95",
              "data-region": "Asia",
              type: "button",
              variant: "pill",
              children: "Asia"
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "region-chip shrink-0 px-4 py-1.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant hover:text-on-surface font-body-sm text-body-sm font-medium transition-all active:scale-95",
              "data-region": "Europe",
              type: "button",
              variant: "pill",
              children: "Europe"
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "region-chip shrink-0 px-4 py-1.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant hover:text-on-surface font-body-sm text-body-sm font-medium transition-all active:scale-95",
              "data-region": "America",
              type: "button",
              variant: "pill",
              children: "Americas"
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "region-chip shrink-0 px-4 py-1.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant hover:text-on-surface font-body-sm text-body-sm font-medium transition-all active:scale-95",
              "data-region": "Africa",
              type: "button",
              variant: "pill",
              children: "Africa"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          "aria-label": "Select Timezone",
          className: "flex flex-col space-y-space-xs",
          id: "tzList",
          role: "radiogroup",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "tz-item group flex items-center justify-between p-space-md rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-all cursor-pointer shadow-sm",
            "data-id": "Asia/Kabul",
            "data-region": "Asia",
            "data-search": "asia/kabul afghanistan utc+4:30 10:48 am",
            onClick: "selectTimezone(this)",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-md min-w-0",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "radio-indicator w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[16px]",
                  children: "check"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col min-w-0",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-lg text-body-lg font-semibold text-on-surface truncate",
                  children: "Asia/Kabul"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                  children: "UTC +4:30 • Kabul, Afghanistan"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "font-headline-sm text-headline-sm font-semibold text-secondary shrink-0 pl-2",
              children: ["10:48 ", /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm font-normal text-secondary/80",
                children: "AM"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "tz-item group flex items-center justify-between p-space-md rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-all cursor-pointer",
            "data-id": "Asia/Dubai",
            "data-region": "Asia",
            "data-search": "asia/dubai uae united arab emirates utc+4:00 10:18 am",
            onClick: "selectTimezone(this)",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-md min-w-0",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "radio-indicator w-6 h-6 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none flex items-center justify-center shrink-0",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[16px] opacity-0 text-on-primary",
                  children: "check"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col min-w-0",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-lg text-body-lg font-semibold text-on-surface truncate",
                  children: "Asia/Dubai"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                  children: "UTC +4:00 • Dubai, UAE"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "font-headline-sm text-headline-sm font-semibold text-on-surface shrink-0 pl-2",
              children: ["10:18 ", /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm font-normal text-outline",
                children: "AM"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "tz-item group flex items-center justify-between p-space-md rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-all cursor-pointer",
            "data-id": "Asia/Riyadh",
            "data-region": "Asia",
            "data-search": "asia/riyadh saudi arabia ksa utc+3:00 09:18 am",
            onClick: "selectTimezone(this)",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-md min-w-0",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "radio-indicator w-6 h-6 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none flex items-center justify-center shrink-0",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[16px] opacity-0 text-on-primary",
                  children: "check"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col min-w-0",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-lg text-body-lg font-semibold text-on-surface truncate",
                  children: "Asia/Riyadh"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                  children: "UTC +3:00 • Riyadh, Saudi Arabia"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "font-headline-sm text-headline-sm font-semibold text-on-surface shrink-0 pl-2",
              children: ["09:18 ", /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm font-normal text-outline",
                children: "AM"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "tz-item group flex items-center justify-between p-space-md rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-all cursor-pointer",
            "data-id": "Asia/Karachi",
            "data-region": "Asia",
            "data-search": "asia/karachi pakistan utc+5:00 11:18 am",
            onClick: "selectTimezone(this)",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-md min-w-0",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "radio-indicator w-6 h-6 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none flex items-center justify-center shrink-0",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[16px] opacity-0 text-on-primary",
                  children: "check"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col min-w-0",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-lg text-body-lg font-semibold text-on-surface truncate",
                  children: "Asia/Karachi"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                  children: "UTC +5:00 • Karachi, Pakistan"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "font-headline-sm text-headline-sm font-semibold text-on-surface shrink-0 pl-2",
              children: ["11:18 ", /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm font-normal text-outline",
                children: "AM"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "tz-item group flex items-center justify-between p-space-md rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-all cursor-pointer",
            "data-id": "Europe/Istanbul",
            "data-region": "Europe",
            "data-search": "europe/istanbul turkey turkiye utc+3:00 09:18 am",
            onClick: "selectTimezone(this)",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-md min-w-0",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "radio-indicator w-6 h-6 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none flex items-center justify-center shrink-0",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[16px] opacity-0 text-on-primary",
                  children: "check"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col min-w-0",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-lg text-body-lg font-semibold text-on-surface truncate",
                  children: "Europe/Istanbul"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                  children: "UTC +3:00 • Istanbul, Turkey"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "font-headline-sm text-headline-sm font-semibold text-on-surface shrink-0 pl-2",
              children: ["09:18 ", /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm font-normal text-outline",
                children: "AM"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "tz-item group flex items-center justify-between p-space-md rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-all cursor-pointer",
            "data-id": "Europe/London",
            "data-region": "Europe",
            "data-search": "europe/london united kingdom uk bst+1 07:18 am",
            onClick: "selectTimezone(this)",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-md min-w-0",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "radio-indicator w-6 h-6 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none flex items-center justify-center shrink-0",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[16px] opacity-0 text-on-primary",
                  children: "check"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col min-w-0",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-lg text-body-lg font-semibold text-on-surface truncate",
                  children: "Europe/London"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                  children: "BST +1:00 • London, United Kingdom"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "font-headline-sm text-headline-sm font-semibold text-on-surface shrink-0 pl-2",
              children: ["07:18 ", /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm font-normal text-outline",
                children: "AM"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "tz-item group flex items-center justify-between p-space-md rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-all cursor-pointer",
            "data-id": "Europe/Paris",
            "data-region": "Europe",
            "data-search": "europe/paris france cest+2 08:18 am",
            onClick: "selectTimezone(this)",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-md min-w-0",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "radio-indicator w-6 h-6 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none flex items-center justify-center shrink-0",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[16px] opacity-0 text-on-primary",
                  children: "check"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col min-w-0",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-lg text-body-lg font-semibold text-on-surface truncate",
                  children: "Europe/Paris"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                  children: "CEST +2:00 • Paris, France"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "font-headline-sm text-headline-sm font-semibold text-on-surface shrink-0 pl-2",
              children: ["08:18 ", /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm font-normal text-outline",
                children: "AM"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "tz-item group flex items-center justify-between p-space-md rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-all cursor-pointer",
            "data-id": "America/New_York",
            "data-region": "America",
            "data-search": "america/new_york united states usa edt-4 02:18 am",
            onClick: "selectTimezone(this)",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-md min-w-0",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "radio-indicator w-6 h-6 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none flex items-center justify-center shrink-0",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[16px] opacity-0 text-on-primary",
                  children: "check"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col min-w-0",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-lg text-body-lg font-semibold text-on-surface truncate",
                  children: "America/New_York"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                  children: "EDT -4:00 • New York, USA"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "font-headline-sm text-headline-sm font-semibold text-on-surface shrink-0 pl-2",
              children: ["02:18 ", /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm font-normal text-outline",
                children: "AM"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "tz-item group flex items-center justify-between p-space-md rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-all cursor-pointer",
            "data-id": "Asia/Tashkent",
            "data-region": "Asia",
            "data-search": "asia/tashkent uzbekistan utc+5:00 11:18 am",
            onClick: "selectTimezone(this)",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-md min-w-0",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "radio-indicator w-6 h-6 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none flex items-center justify-center shrink-0",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[16px] opacity-0 text-on-primary",
                  children: "check"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col min-w-0",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-lg text-body-lg font-semibold text-on-surface truncate",
                  children: "Asia/Tashkent"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                  children: "UTC +5:00 • Tashkent, Uzbekistan"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "font-headline-sm text-headline-sm font-semibold text-on-surface shrink-0 pl-2",
              children: ["11:18 ", /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm font-normal text-outline",
                children: "AM"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "tz-item group flex items-center justify-between p-space-md rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-all cursor-pointer",
            "data-id": "Asia/Tehran",
            "data-region": "Asia",
            "data-search": "asia/tehran iran utc+3:30 09:48 am",
            onClick: "selectTimezone(this)",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-md min-w-0",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "radio-indicator w-6 h-6 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none flex items-center justify-center shrink-0",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[16px] opacity-0 text-on-primary",
                  children: "check"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col min-w-0",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-lg text-body-lg font-semibold text-on-surface truncate",
                  children: "Asia/Tehran"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                  children: "UTC +3:30 • Tehran, Iran"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "font-headline-sm text-headline-sm font-semibold text-on-surface shrink-0 pl-2",
              children: ["09:48 ", /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm font-normal text-outline",
                children: "AM"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "tz-item group flex items-center justify-between p-space-md rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-all cursor-pointer",
            "data-id": "Asia/Doha",
            "data-region": "Asia",
            "data-search": "asia/doha qatar utc+3:00 09:18 am",
            onClick: "selectTimezone(this)",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-md min-w-0",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "radio-indicator w-6 h-6 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none flex items-center justify-center shrink-0",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[16px] opacity-0 text-on-primary",
                  children: "check"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col min-w-0",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-lg text-body-lg font-semibold text-on-surface truncate",
                  children: "Asia/Doha"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                  children: "UTC +3:00 • Doha, Qatar"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "font-headline-sm text-headline-sm font-semibold text-on-surface shrink-0 pl-2",
              children: ["09:18 ", /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm font-normal text-outline",
                children: "AM"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "sticky bottom-4 pt-space-xs z-30",
          children: /*#__PURE__*/_jsxDEV(LiquidButton, {
            className: "w-full h-13 py-3.5 px-space-md rounded-xl bg-primary text-on-primary font-headline-sm text-headline-sm font-semibold flex items-center justify-center gap-space-xs shadow-[0_0_24px_rgba(192,193,255,0.3)] hover:brightness-110 active:scale-[0.98] transition-all",
            type: "button",
            variant: "primary",
            children: [/*#__PURE__*/_jsxDEV("span", {
              children: "Confirm Timezone Selection"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[20px]",
              children: "arrow_forward"
            }, void 0, false)]
          }, void 0, true)
        }, void 0, false)]
      }, void 0, true)
    }, void 0, false)]
  }, void 0, true);
};
export default TimezoneSelection;