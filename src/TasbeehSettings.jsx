import GlassInput from "./components/ui/GlassInput";
import GlassCard from "./components/ui/GlassCard";
import AppShell from "./components/ui/AppShell";
import React, { useState, useEffect } from 'react';
import LiquidButton from './components/ui/LiquidButton';
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
const TasbeehSettings = () => {
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
            children: "Tasbeeh Settings"
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
        className: "flex flex-col w-full px-gutter-mobile pb-space-xl",
        children: /*#__PURE__*/_jsxDEV("div", {
          className: "relative w-full overflow-hidden",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "absolute -top-16 -left-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "absolute top-48 -right-12 w-72 h-72 bg-secondary/10 rounded-full blur-3xl pointer-events-none"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between pt-space-md pb-space-xs",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(76,215,246,0.6)]"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm uppercase tracking-wider text-secondary",
                children: "Preferences • Sensory & Counter"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant hover:text-on-surface transition-all text-label-md font-label-md",
              id: "reset-btn",
              type: "button",
              variant: "pill",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[15px]",
                children: "refresh"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                children: "Reset"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
            className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant mt-1.5 mb-space-md",
            children: "Customize tactile haptic feedback, chime sounds, and target completion rituals."
          }, void 0, false), /*#__PURE__*/_jsxDEV("section", {
            className: "rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl shadow-lg p-space-md mb-space-md",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between pb-space-sm mb-space-sm",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-sm",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-9 h-9 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center text-primary shadow-sm",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[20px]",
                    children: "graphic_eq"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  children: [/*#__PURE__*/_jsxDEV("h2", {
                    className: "font-headline-sm text-headline-sm text-on-surface leading-tight",
                    children: "Sensory Feedback"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                    children: "Feel and hear each mindful affirmation"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary-container/20 text-secondary",
                children: "Active"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "py-space-sm",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between gap-space-sm",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex-1 min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-lg text-label-lg text-on-surface block",
                    children: "Haptic Feedback / Vibration"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant block mt-0.5",
                    children: "Subtle tactile pulse on each bead count"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  "aria-checked": "true",
                  className: "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full bg-primary-container p-0.5 transition-colors duration-200 ease-in-out focus:outline-none",
                  "data-toggle": "haptic",
                  role: "switch",
                  type: "button",
                  variant: "primary",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "translate-x-5 pointer-events-none inline-block h-5 w-5 rounded-full bg-on-primary shadow-sm transition duration-200 ease-in-out"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "mt-space-sm pt-space-xs pl-space-xs",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center justify-between mb-1.5",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-md text-label-md text-on-surface dark:text-on-surface-variant",
                    children: "Vibration Intensity"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-primary",
                    children: "Gentle (Active)"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "grid grid-cols-3 gap-1.5 p-1 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0",
                  children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                    className: "intensity-btn py-1.5 px-2 rounded font-label-md text-label-md bg-primary-container text-on-primary shadow-sm text-center transition-all",
                    "data-segment": "gentle",
                    type: "button",
                    variant: "primary",
                    children: "Gentle"
                  }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                    className: "intensity-btn py-1.5 px-2 rounded font-label-md text-label-md text-on-surface dark:text-on-surface-variant hover:text-on-surface text-center transition-all",
                    "data-segment": "medium",
                    type: "button",
                    variant: "subtle",
                    children: "Medium"
                  }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                    className: "intensity-btn py-1.5 px-2 rounded font-label-md text-label-md text-on-surface dark:text-on-surface-variant hover:text-on-surface text-center transition-all",
                    "data-segment": "firm",
                    type: "button",
                    variant: "subtle",
                    children: "Firm"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-px bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 my-space-xs"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "py-space-sm",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between gap-space-sm",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex-1 min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-lg text-label-lg text-on-surface block",
                    children: "Auditory Sound / Click"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant block mt-0.5",
                    children: "Soft wooden bead click sound on each count"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  "aria-checked": "true",
                  className: "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full bg-primary-container p-0.5 transition-colors duration-200 ease-in-out focus:outline-none",
                  "data-toggle": "sound",
                  role: "switch",
                  type: "button",
                  variant: "primary",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "translate-x-5 pointer-events-none inline-block h-5 w-5 rounded-full bg-on-primary shadow-sm transition duration-200 ease-in-out"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "mt-space-sm pt-space-xs pl-space-xs",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center justify-between mb-1.5",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-md text-label-md text-on-surface dark:text-on-surface-variant",
                    children: "Sound Volume"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-secondary",
                    children: "Soft (30%)"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "grid grid-cols-3 gap-1.5 p-1 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0",
                  children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                    className: "sound-btn py-1.5 px-2 rounded font-label-md text-label-md bg-secondary text-on-secondary shadow-sm text-center transition-all",
                    "data-segment": "soft",
                    type: "button",
                    variant: "subtle",
                    children: "Soft"
                  }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                    className: "sound-btn py-1.5 px-2 rounded font-label-md text-label-md text-on-surface dark:text-on-surface-variant hover:text-on-surface text-center transition-all",
                    "data-segment": "normal",
                    type: "button",
                    variant: "subtle",
                    children: "Normal"
                  }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                    className: "sound-btn py-1.5 px-2 rounded font-label-md text-label-md text-on-surface dark:text-on-surface-variant hover:text-on-surface text-center transition-all",
                    "data-segment": "mute",
                    type: "button",
                    variant: "subtle",
                    children: "Mute"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-px bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 my-space-xs"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "py-space-sm",
              children: /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between gap-space-sm",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex-1 min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-lg text-label-lg text-on-surface block",
                    children: "Target Vibration Alert"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant block mt-0.5",
                    children: "Longer double pulse when target count is reached"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  "aria-checked": "true",
                  className: "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full bg-primary-container p-0.5 transition-colors duration-200 ease-in-out focus:outline-none",
                  "data-toggle": "alert",
                  role: "switch",
                  type: "button",
                  variant: "primary",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "translate-x-5 pointer-events-none inline-block h-5 w-5 rounded-full bg-on-primary shadow-sm transition duration-200 ease-in-out"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true)
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
            className: "rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl shadow-lg p-space-md mb-space-md",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-sm pb-space-sm mb-space-sm",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "w-9 h-9 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center text-secondary shadow-sm",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[20px]",
                  children: "tune"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                children: [/*#__PURE__*/_jsxDEV("h2", {
                  className: "font-headline-sm text-headline-sm text-on-surface leading-tight",
                  children: "Counter Behavior"
                }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                  children: "Physical button mappings and screen states"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "py-space-sm",
              children: /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between gap-space-sm",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex-1 min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-lg text-label-lg text-on-surface block",
                    children: "Keep Screen Awake during Dhikr"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant block mt-0.5",
                    children: "Prevents auto-locking while counting beads"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  "aria-checked": "true",
                  className: "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full bg-primary-container p-0.5 transition-colors duration-200 ease-in-out focus:outline-none",
                  "data-toggle": "awake",
                  role: "switch",
                  type: "button",
                  variant: "primary",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "translate-x-5 pointer-events-none inline-block h-5 w-5 rounded-full bg-on-primary shadow-sm transition duration-200 ease-in-out"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true)
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "h-px bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 my-space-xs"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "py-space-sm",
              children: /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between gap-space-sm",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex-1 min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-lg text-label-lg text-on-surface block",
                    children: "Full Screen Tap Mode"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant block mt-0.5",
                    children: "Tap anywhere on screen to count instead of button"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  "aria-checked": "false",
                  className: "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 p-0.5 transition-colors duration-200 ease-in-out focus:outline-none",
                  "data-toggle": "fullscreen",
                  role: "switch",
                  type: "button",
                  variant: "subtle",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "translate-x-0 pointer-events-none inline-block h-5 w-5 rounded-full bg-outline shadow-sm transition duration-200 ease-in-out"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true)
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "h-px bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 my-space-xs"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "py-space-sm",
              children: /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between gap-space-sm",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex-1 min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-lg text-label-lg text-on-surface block",
                    children: "Volume Keys for Counting"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant block mt-0.5",
                    children: "Use hardware volume up button to increment"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  "aria-checked": "true",
                  className: "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full bg-primary-container p-0.5 transition-colors duration-200 ease-in-out focus:outline-none",
                  "data-toggle": "volume",
                  role: "switch",
                  type: "button",
                  variant: "primary",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "translate-x-5 pointer-events-none inline-block h-5 w-5 rounded-full bg-on-primary shadow-sm transition duration-200 ease-in-out"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true)
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "h-px bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 my-space-xs"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "py-space-sm",
              children: /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between gap-space-sm",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex-1 min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-lg text-label-lg text-on-surface block",
                    children: "Auto-Loop to Next Cycle"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant block mt-0.5",
                    children: "Automatically restart count after reaching target"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  "aria-checked": "false",
                  className: "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 p-0.5 transition-colors duration-200 ease-in-out focus:outline-none",
                  "data-toggle": "autoloop",
                  role: "switch",
                  type: "button",
                  variant: "subtle",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "translate-x-0 pointer-events-none inline-block h-5 w-5 rounded-full bg-outline shadow-sm transition duration-200 ease-in-out"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true)
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
            className: "mb-space-md",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between px-space-xs mb-space-xs",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm uppercase tracking-wider text-on-surface dark:text-on-surface-variant",
                children: "Completion Ritual Preview"
              }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "font-label-md text-label-md text-secondary hover:text-secondary-fixed flex items-center gap-1 transition-colors",
                type: "button",
                variant: "subtle",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[16px]",
                  children: "visibility"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  children: "Live Preview"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "relative overflow-hidden rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-3xl p-space-lg shadow-xl text-center",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/20 rounded-full blur-2xl pointer-events-none"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container/20 text-primary mb-space-md",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "text-sm",
                  children: "✨"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm uppercase tracking-wider font-semibold",
                  children: "Target Reached • 33 of 33"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "relative mx-auto w-16 h-16 rounded-full bg-primary-container flex items-center justify-center shadow-[0_0_28px_rgba(128,131,255,0.45)] mb-space-md",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-on-primary text-[32px]",
                  style: {
                    fontVariationSettings: `'FILL' 1`
                  },
                  children: "check"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("h3", {
                className: "font-headline-md text-headline-md text-on-surface mb-1.5",
                children: "Alhamdulillah! Cycle Complete"
              }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant max-w-xs mx-auto mb-space-lg leading-relaxed",
                children: "May Allah accept your dhikr and fill your day with barakah and tranquility."
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col gap-2.5 w-full",
                children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "w-full py-3 px-space-md rounded-xl bg-primary-container hover:bg-primary-container/90 text-on-primary font-label-lg text-label-lg shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-[0.99]",
                  type: "button",
                  variant: "primary",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[18px]",
                    children: "add_circle"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    children: "Continue Counting (+)"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "w-full py-3 px-space-md rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface font-label-lg text-label-lg transition-all flex items-center justify-center gap-1.5 active:scale-[0.99]",
                  type: "button",
                  variant: "none",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[18px]",
                    children: "refresh"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    children: "Start New Session"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "mt-space-md",
                children: /*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "font-label-md text-label-md text-secondary hover:text-secondary-fixed transition-colors inline-flex items-center gap-1",
                  type: "button",
                  variant: "subtle",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    children: "Log & View in History"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[14px]",
                    children: "arrow_forward"
                  }, void 0, false)]
                }, void 0, true)
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "pt-space-xs flex flex-col items-center",
            children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "w-full py-3.5 px-space-lg rounded-xl bg-gradient-to-r from-primary-container via-tertiary-container to-secondary-container text-on-primary font-label-lg text-label-lg shadow-[0_0_24px_rgba(128,131,255,0.35)] hover:shadow-[0_0_30px_rgba(128,131,255,0.5)] transition-all flex items-center justify-center gap-2 active:scale-[0.99]",
              id: "save-preferences-btn",
              type: "button",
              variant: "primary",
              children: [/*#__PURE__*/_jsxDEV("span", {
                children: "Save Tasbeeh Preferences"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px]",
                children: "arrow_forward"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-1.5 text-on-surface dark:text-on-surface-variant mt-space-sm text-center",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[15px]",
                children: "lock"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-body-sm text-body-sm",
                children: "Preferences sync automatically to your local device"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true)
      }, void 0, false)
    }, void 0, false)]
  }, void 0, true);
};
export default TasbeehSettings;