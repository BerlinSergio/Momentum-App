import GlassInput from "./components/ui/GlassInput";
import GlassCard from "./components/ui/GlassCard";
import AppShell from "./components/ui/AppShell";
import React, { useState, useEffect } from 'react';
import LiquidButton from './components/ui/LiquidButton';
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
const NotesMain = () => {
  const [fabOpen, setFabOpen] = useState(false);
  return /*#__PURE__*/_jsxDEV("div", {
    className: "bg-surface-container font-body-md text-on-surface antialiased flex flex-col min-h-screen relative selection:bg-primary/40 selection:text-indigo-200",
    children: [/*#__PURE__*/_jsxDEV("header", {
      className: "fixed top-0 w-full z-50 pt-safe bg-surface-container backdrop-blur-xl border-b border-outline-variant/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.4)]",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "h-16 px-margin flex items-center justify-between gap-space-sm",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-sm min-w-0 flex-1",
          children: /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col min-w-0",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-primary tracking-wider uppercase font-semibold",
              children: "Momentum Notes"
            }, void 0, false), /*#__PURE__*/_jsxDEV("h1", {
              className: "font-headline-md text-headline-md text-on-surface truncate font-bold",
              children: "Notes Dashboard"
            }, void 0, false)]
          }, void 0, true)
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-xs",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            "aria-label": "Search",
            className: "w-11 h-11 flex items-center justify-center rounded-full text-on-surface-variant dark:text-on-surface-variant hover:text-primary hover:bg-surface-container/60 transition-colors",
            variant: "icon",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[22px]",
              children: "search"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
            "aria-label": "Notifications",
            className: "w-11 h-11 flex items-center justify-center rounded-full text-on-surface-variant dark:text-on-surface-variant hover:text-primary hover:bg-surface-container/60 transition-colors",
            variant: "icon",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[22px]",
              children: "notifications"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "pl-space-xs flex items-center",
            children: /*#__PURE__*/_jsxDEV("img", {
              alt: "Profile",
              className: "w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/40 shadow-[0_2px_10px_rgba(99,102,241,0.3)]",
              src: "https://lh3.googleusercontent.com/aida/AEtjO1Xqivgb8WnRmLof77BnZPzyZBpzbvUP1AVCrs3mvDfnB_f1RZXcFmBFA_a6HG6vfOogCi-CZxVreOdw6r686Kaf2HymZuMc7nO4lOXpxAOngehZRKb6t3YLAb7DlypVWHqhxt-xTwWeYAmsI6XFcvhYPOLlUX2ysjARmRemkhivrzCI4_28-zoF78qcnwkZuMSSN64w1b-y6TJvnm0moiPO0NRZ0PsoCWGadzO9EQbk1caL1rDfzQ7UFe5rUxR7vqgqDpSqy2PQ"
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false), /*#__PURE__*/_jsxDEV("main", {
      className: "flex-1 flex flex-col relative w-full pt-16 pb-32 bg-surface-container",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "flex flex-col w-full relative",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "absolute -top-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-primary/15 rounded-full blur-[100px] pointer-events-none -z-10"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "absolute top-96 -right-16 w-72 h-72 bg-cyan-600/12 rounded-full blur-[90px] pointer-events-none -z-10"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "absolute top-[48rem] -left-14 w-80 h-80 bg-secondary/15 rounded-full blur-[100px] pointer-events-none -z-10"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "px-margin flex flex-col gap-space-lg w-full",
          children: [/*#__PURE__*/_jsxDEV("section", {
            className: "flex flex-col gap-space-md pt-space-xs",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-space-xs",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "w-2 h-2 rounded-full bg-primary animate-pulse"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-primary uppercase tracking-wider font-semibold",
                    children: "Mindful Sanctuary"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("h2", {
                  className: "font-headline-lg text-headline-lg text-on-surface tracking-tight",
                  children: "Notes & Reflections"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "px-2.5 py-1 bg-gradient-to-r from-secondary/20 to-cyan-500/20 border border-purple-400/30 backdrop-blur-md rounded-full shadow-sm flex items-center gap-1.5 text-cyan-300",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[18px] text-cyan-300",
                  style: {
                    fontVariationSettings: `'FILL' 1`
                  },
                  children: "auto_awesome"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm font-semibold tracking-wide",
                  children: "Zen Active"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
              className: "font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant -mt-1",
              children: "Capture mindful thoughts, fleeting flashes, and deep introspective journals."
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-xs w-full",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex-1 relative flex items-center",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined absolute left-3.5 text-[20px] text-on-surface-variant dark:text-on-surface-variant pointer-events-none",
                  children: "search"
                }, void 0, false), /*#__PURE__*/_jsxDEV(GlassInput, {
                  className: "w-full h-11 pl-10 pr-4 rounded-full bg-surface-container backdrop-blur-xl border border-outline-variant/[0.08] text-on-surface placeholder:text-on-surface-variant dark:text-on-surface-variant text-body-md font-body-md shadow-[0_4px_16px_rgba(0,0,0,0.3)] focus:outline-none focus:border-primary/50 focus:bg-surface-container transition-all",
                  placeholder: "Search notes, tags, or voice memos...",
                  type: "text"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                "aria-label": "Filter notes",
                className: "w-11 h-11 rounded-full bg-surface-container backdrop-blur-xl border border-outline-variant/[0.08] text-on-surface-variant dark:text-on-surface-variant flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.3)] active:scale-95 transition-transform hover:text-primary",
                variant: "icon",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[20px]",
                  children: "tune"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-xs overflow-x-auto no-scrollbar py-0.5 -mx-margin px-margin",
              children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "px-space-md py-1.5 rounded-full bg-gradient-to-r from-primary to-cyan-500 text-on-surface font-label-md text-label-md shadow-[0_2px_12px_rgba(99,102,241,0.35)] whitespace-nowrap flex items-center gap-1 active:scale-95 transition-transform",
                variant: "subtle",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  children: "All Notes"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold",
                  children: "14"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "px-space-md py-1.5 rounded-full bg-surface-container backdrop-blur-md border border-outline-variant/[0.08] text-on-surface-variant font-label-md text-label-md shadow-sm whitespace-nowrap flex items-center gap-1.5 hover:text-on-surface hover:border-outline-variant active:scale-95 transition-all",
                variant: "subtle",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[15px] text-cyan-400",
                  style: {
                    fontVariationSettings: `'FILL' 1`
                  },
                  children: "push_pin"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  children: "Pinned (3)"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "px-space-md py-1.5 rounded-full bg-surface-container backdrop-blur-md border border-outline-variant/[0.08] text-on-surface-variant font-label-md text-label-md shadow-sm whitespace-nowrap flex items-center gap-1.5 hover:text-on-surface hover:border-outline-variant active:scale-95 transition-all",
                variant: "subtle",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[15px] text-tertiary",
                  children: "bolt"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  children: "Quick Notes (8)"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "px-space-md py-1.5 rounded-full bg-surface-container backdrop-blur-md border border-outline-variant/[0.08] text-on-surface-variant font-label-md text-label-md shadow-sm whitespace-nowrap flex items-center gap-1.5 hover:text-on-surface hover:border-outline-variant active:scale-95 transition-all",
                variant: "subtle",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[15px] text-primary",
                  children: "menu_book"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  children: "Long Notes (6)"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
            className: "flex flex-col gap-space-sm",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-xs",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-6 h-6 rounded-full bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-sm",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[15px]",
                    children: "electric_bolt"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("h3", {
                  className: "font-headline-sm text-headline-sm text-on-surface",
                  children: "Quick Notes"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-outline dark:text-outline",
                  children: "• Fleeting"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "font-label-sm text-label-sm text-cyan-400 font-semibold hover:underline flex items-center gap-0.5",
                variant: "subtle",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  children: "See all"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[16px]",
                  children: "chevron_right"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "grid grid-cols-2 gap-space-xs",
              children: [/*#__PURE__*/_jsxDEV("article", {
                className: "col-span-2 relative bg-surface-container backdrop-blur-xl border border-outline-variant/[0.08] rounded-2xl p-space-md shadow-[0_8px_24px_rgba(0,0,0,0.3)] flex flex-col justify-between gap-space-sm overflow-hidden",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "absolute -right-6 -bottom-6 w-24 h-24 bg-primary/10 rounded-full blur-xl pointer-events-none"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-start justify-between gap-space-xs relative z-10",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center gap-1.5 flex-wrap",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "px-2 py-0.5 rounded-full bg-primary-container/80 border border-primary/30 text-primary font-label-sm text-label-sm font-semibold",
                      children: "#Spiritual"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "flex items-center gap-0.5 text-cyan-400 text-[11px] font-medium font-label-sm",
                      children: [/*#__PURE__*/_jsxDEV("span", {
                        className: "material-symbols-outlined text-[13px]",
                        style: {
                          fontVariationSettings: `'FILL' 1`
                        },
                        children: "push_pin"
                      }, void 0, false), "Pinned"]
                    }, void 0, true)]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center gap-1 text-on-surface-variant dark:text-on-surface-variant",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "font-label-sm text-label-sm",
                      children: "10:30 AM"
                    }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                      "aria-label": "Quick options",
                      className: "w-6 h-6 flex items-center justify-center rounded-full hover:bg-surface-container-high/50 text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface transition-colors",
                      variant: "subtle",
                      children: /*#__PURE__*/_jsxDEV("span", {
                        className: "material-symbols-outlined text-[16px]",
                        children: "more_vert"
                      }, void 0, false)
                    }, void 0, false)]
                  }, void 0, true)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "relative z-10 flex flex-col gap-1",
                  children: [/*#__PURE__*/_jsxDEV("h4", {
                    className: "font-body-lg text-body-lg text-on-surface font-semibold",
                    children: "Ayah to ponder tonight"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                    className: "font-body-md text-body-md text-on-surface-variant italic",
                    children: "“And your Lord will give you, and you will be satisfied.” (Surah Ad-Duha: 5)"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "relative z-10 flex items-center justify-between pt-1 text-on-surface-variant dark:text-on-surface-variant font-label-sm text-label-sm",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "flex items-center gap-1 text-tertiary font-medium",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[14px]",
                      children: "spa"
                    }, void 0, false), "Evening Dhikr"]
                  }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                    "aria-label": "Edit note",
                    className: "w-6 h-6 rounded-full bg-surface-container/80 border border-outline-variant/[0.06] flex items-center justify-center text-on-surface-variant dark:text-on-surface-variant hover:text-primary active:scale-95 transition-all",
                    variant: "subtle",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[14px]",
                      children: "edit"
                    }, void 0, false)
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("article", {
                className: "relative bg-surface-container backdrop-blur-xl border border-outline-variant/[0.08] rounded-2xl p-space-md shadow-[0_8px_24px_rgba(0,0,0,0.3)] flex flex-col justify-between gap-space-sm",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center justify-between",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "px-2 py-0.5 rounded-full bg-teal-950/80 border border-teal-400/30 text-tertiary font-label-sm text-label-sm font-semibold",
                    children: "#Daily"
                  }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                    "aria-label": "Options",
                    className: "text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface",
                    variant: "subtle",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[16px]",
                      children: "more_horiz"
                    }, void 0, false)
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-col gap-1.5",
                  children: [/*#__PURE__*/_jsxDEV("h4", {
                    className: "font-headline-sm text-headline-sm text-on-surface text-[14px] leading-tight",
                    children: "Friday Gathering"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("ul", {
                    className: "flex flex-col gap-1 font-body-sm text-body-sm text-on-surface-variant",
                    children: [/*#__PURE__*/_jsxDEV("li", {
                      className: "flex items-center gap-1.5 line-through opacity-50",
                      children: [/*#__PURE__*/_jsxDEV("span", {
                        className: "material-symbols-outlined text-[14px] text-tertiary",
                        style: {
                          fontVariationSettings: `'FILL' 1`
                        },
                        children: "check_circle"
                      }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                        className: "truncate",
                        children: "Fresh Medjool dates"
                      }, void 0, false)]
                    }, void 0, true), /*#__PURE__*/_jsxDEV("li", {
                      className: "flex items-center gap-1.5 line-through opacity-50",
                      children: [/*#__PURE__*/_jsxDEV("span", {
                        className: "material-symbols-outlined text-[14px] text-tertiary",
                        style: {
                          fontVariationSettings: `'FILL' 1`
                        },
                        children: "check_circle"
                      }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                        className: "truncate",
                        children: "Cardamom & cinnamon tea"
                      }, void 0, false)]
                    }, void 0, true), /*#__PURE__*/_jsxDEV("li", {
                      className: "flex items-center gap-1.5 font-medium text-on-surface",
                      children: [/*#__PURE__*/_jsxDEV("span", {
                        className: "material-symbols-outlined text-[14px] text-outline dark:text-outline",
                        children: "radio_button_unchecked"
                      }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                        className: "truncate",
                        children: "Almond milk"
                      }, void 0, false)]
                    }, void 0, true)]
                  }, void 0, true)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center justify-between pt-1",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant",
                    children: "9:15 AM"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-secondary font-semibold bg-secondary-container/70 border border-secondary/30 px-1.5 py-0.5 rounded-md",
                    children: "3/4 Done"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("article", {
                className: "relative bg-surface-container backdrop-blur-xl border border-outline-variant/[0.08] rounded-2xl p-space-md shadow-[0_8px_24px_rgba(0,0,0,0.3)] flex flex-col justify-between gap-space-sm",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center justify-between",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "px-2 py-0.5 rounded-full bg-secondary-container/80 border border-purple-400/30 text-secondary font-label-sm text-label-sm font-semibold",
                    children: "#Work"
                  }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                    "aria-label": "Options",
                    className: "text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface",
                    variant: "subtle",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[16px]",
                      children: "more_horiz"
                    }, void 0, false)
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-col gap-1",
                  children: [/*#__PURE__*/_jsxDEV("h4", {
                    className: "font-headline-sm text-headline-sm text-on-surface text-[14px] leading-tight",
                    children: "Audio Sync"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                    className: "font-body-sm text-body-sm text-on-surface-variant line-clamp-3",
                    children: "Add offline prayer audio sync for travel mode. Check background sync worker constraints on iOS."
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center justify-between pt-1",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant",
                    children: "Yesterday"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[16px] text-cyan-400",
                    children: "mic_none"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
            className: "flex flex-col gap-space-sm",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-xs",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-6 h-6 rounded-full bg-primary-container/80 border border-primary/30 flex items-center justify-center text-primary shadow-sm",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[15px]",
                    children: "menu_book"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("h3", {
                  className: "font-headline-sm text-headline-sm text-on-surface",
                  children: "Long Notes"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-outline dark:text-outline",
                  children: "• Journal & Studies"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant font-mono",
                children: "6 Total"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("article", {
              className: "relative bg-surface-container backdrop-blur-xl border border-outline-variant/[0.08] rounded-3xl p-space-lg shadow-[0_12px_32px_rgba(0,0,0,0.35)] flex flex-col gap-space-md overflow-hidden transition-all hover:border-outline-variant",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-start justify-between gap-space-xs relative z-10",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-2",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "px-2.5 py-0.5 rounded-full bg-primary-container/80 border border-primary/30 text-primary font-label-sm text-label-sm font-semibold",
                    children: "Personal Growth"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-400/30 text-cyan-300 font-label-sm text-label-sm font-semibold",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[13px]",
                      style: {
                        fontVariationSettings: `'FILL' 1`
                      },
                      children: "push_pin"
                    }, void 0, false), "Pinned"]
                  }, void 0, true)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-1",
                  children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                    "aria-label": "Bookmark note",
                    className: "w-7 h-7 flex items-center justify-center rounded-full bg-surface-container/80 border border-outline-variant/[0.06] text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors",
                    variant: "subtle",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[16px]",
                      children: "bookmark_add"
                    }, void 0, false)
                  }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                    "aria-label": "Note settings",
                    className: "w-7 h-7 flex items-center justify-center rounded-full bg-surface-container/80 border border-outline-variant/[0.06] text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors",
                    variant: "subtle",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[16px]",
                      children: "more_vert"
                    }, void 0, false)
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col gap-1.5 relative z-10",
                children: [/*#__PURE__*/_jsxDEV("h4", {
                  className: "font-headline-md text-headline-md text-on-surface tracking-tight",
                  children: "Q4 Strategic Reflection & Habit Synthesis"
                }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                  className: "font-body-md text-body-md text-on-surface-variant line-clamp-2",
                  children: "Looking back at the past quarter's personal momentum, spiritual consistency, and health targets. Key takeaways from daily Fajr tracking and energy management routines."
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "relative z-10 grid grid-cols-3 gap-space-xs",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "col-span-1 h-20 rounded-xl overflow-hidden bg-surface-container border border-outline-variant/[0.06]",
                  children: /*#__PURE__*/_jsxDEV("img", {
                    className: "w-full h-full object-cover",
                    "data-alt": "A serene minimalist desk with warm morning sunlight casting shadows over an open journal, ceramic tea cup, brass pen, and subtle soft blue aesthetic colors in light mode.",
                    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_7Z-Kyuv4Nt_j2fvv66IUV7HPiCYkC2Hw2iAoQcrmmztWwHtS0Ax0PB0xJxZ_RlVXIXTUMQod_e1aqJ2fTIYAJUGafk7xLy_tcq4QpOlKEfBr-phwK1wLuqCiZH5hl1dCOFtY4azKQRwTVxZLYWcyFDr-Zn4F9hlPEVUCj6Q5STvVfKkSLWdqoX8CGiwXx-P2Vy3LgAys7zwnz2YG1yDM8EOITAQYUWQu0iUQCcZns62ZRKyawwI"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "col-span-2 h-20 rounded-xl bg-surface-container border border-outline-variant/[0.06] p-space-sm flex flex-col justify-between",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center justify-between",
                    children: [/*#__PURE__*/_jsxDEV("div", {
                      className: "flex items-center gap-1.5 text-secondary",
                      children: [/*#__PURE__*/_jsxDEV("span", {
                        className: "material-symbols-outlined text-[18px]",
                        children: "graphic_eq"
                      }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                        className: "font-label-sm text-label-sm font-semibold",
                        children: "Voice Memo Attached"
                      }, void 0, false)]
                    }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                      className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant",
                      children: "03:42"
                    }, void 0, false)]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("svg", {
                    className: "w-full h-5 text-primary",
                    fill: "currentColor",
                    viewBox: "0 0 160 20",
                    children: [/*#__PURE__*/_jsxDEV("rect", {
                      height: "4",
                      opacity: "0.3",
                      rx: "1.5",
                      width: "3",
                      x: "2",
                      y: "8"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("rect", {
                      height: "10",
                      opacity: "0.6",
                      rx: "1.5",
                      width: "3",
                      x: "10",
                      y: "5"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("rect", {
                      height: "16",
                      rx: "1.5",
                      width: "3",
                      x: "18",
                      y: "2"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("rect", {
                      height: "8",
                      rx: "1.5",
                      width: "3",
                      x: "26",
                      y: "6"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("rect", {
                      height: "14",
                      rx: "1.5",
                      width: "3",
                      x: "34",
                      y: "3"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("rect", {
                      height: "6",
                      rx: "1.5",
                      width: "3",
                      x: "42",
                      y: "7"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("rect", {
                      height: "18",
                      rx: "1.5",
                      width: "3",
                      x: "50",
                      y: "1"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("rect", {
                      height: "12",
                      rx: "1.5",
                      width: "3",
                      x: "58",
                      y: "4"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("rect", {
                      height: "4",
                      rx: "1.5",
                      width: "3",
                      x: "66",
                      y: "8"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("rect", {
                      height: "10",
                      rx: "1.5",
                      width: "3",
                      x: "74",
                      y: "5"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("rect", {
                      height: "16",
                      rx: "1.5",
                      width: "3",
                      x: "82",
                      y: "2"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("rect", {
                      height: "8",
                      rx: "1.5",
                      width: "3",
                      x: "90",
                      y: "6"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("rect", {
                      height: "12",
                      rx: "1.5",
                      width: "3",
                      x: "98",
                      y: "4"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("rect", {
                      height: "6",
                      rx: "1.5",
                      width: "3",
                      x: "106",
                      y: "7"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("rect", {
                      height: "16",
                      rx: "1.5",
                      width: "3",
                      x: "114",
                      y: "2"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("rect", {
                      height: "10",
                      rx: "1.5",
                      width: "3",
                      x: "122",
                      y: "5"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("rect", {
                      height: "4",
                      rx: "1.5",
                      width: "3",
                      x: "130",
                      y: "8"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("rect", {
                      height: "8",
                      opacity: "0.5",
                      rx: "1.5",
                      width: "3",
                      x: "138",
                      y: "6"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("rect", {
                      height: "6",
                      opacity: "0.3",
                      rx: "1.5",
                      width: "3",
                      x: "146",
                      y: "7"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("rect", {
                      height: "2",
                      opacity: "0.2",
                      rx: "1",
                      width: "3",
                      x: "154",
                      y: "9"
                    }, void 0, false)]
                  }, void 0, true)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "relative z-10 flex items-center justify-between pt-1 text-on-surface-variant dark:text-on-surface-variant font-label-sm text-label-sm",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-space-xs flex-wrap",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "flex items-center gap-1",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[14px] text-outline dark:text-outline",
                      children: "calendar_today"
                    }, void 0, false), "Oct 24, 2026"]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                    className: "text-on-surface-variant",
                    children: "•"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "flex items-center gap-1",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[14px] text-outline dark:text-outline",
                      children: "schedule"
                    }, void 0, false), "6 min read"]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                    className: "text-on-surface-variant",
                    children: "•"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "flex items-center gap-1 text-primary",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[14px]",
                      children: "attachment"
                    }, void 0, false), "3 items"]
                  }, void 0, true)]
                }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "px-space-sm py-1 rounded-full bg-primary-container/80 border border-primary/40 text-primary font-semibold hover:bg-primary hover:text-on-surface transition-colors flex items-center gap-1 active:scale-95",
                  variant: "subtle",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    children: "Read"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[14px]",
                    children: "arrow_forward"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("article", {
              className: "relative bg-surface-container backdrop-blur-xl border border-outline-variant/[0.08] rounded-3xl p-space-lg shadow-[0_12px_32px_rgba(0,0,0,0.35)] flex flex-col gap-space-md overflow-hidden transition-all hover:border-outline-variant",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-start justify-between gap-space-xs",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-2",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "px-2.5 py-0.5 rounded-full bg-teal-950/80 border border-teal-400/30 text-tertiary font-label-sm text-label-sm font-semibold",
                    children: "Spiritual Study"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  "aria-label": "Note options",
                  className: "w-7 h-7 flex items-center justify-center rounded-full bg-surface-container/80 border border-outline-variant/[0.06] text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors",
                  variant: "subtle",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[16px]",
                    children: "more_vert"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col gap-1.5",
                children: [/*#__PURE__*/_jsxDEV("h4", {
                  className: "font-headline-md text-headline-md text-on-surface tracking-tight",
                  children: "Tafseer Notes: Surah Al-Mulk Deep Dive"
                }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                  className: "font-body-md text-body-md text-on-surface-variant line-clamp-2",
                  children: "Contemplating the sovereignty of creation and mindfulness before sleep. Verses 1-5 linguistic breakdown and classical commentary references from Ibn Kathir."
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "grid grid-cols-2 gap-space-xs",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "h-24 rounded-xl overflow-hidden bg-surface-container border border-outline-variant/[0.06]",
                  children: /*#__PURE__*/_jsxDEV("img", {
                    className: "w-full h-full object-cover",
                    "data-alt": "Close up photograph of classical Arabic calligraphy text illuminated under soft natural side-light on heavy parchment paper with ink textures and gold leaf detailing in calming tones.",
                    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCULNDRu7t9IXKzuxKHDLNBMPJHM0rL-Y7gDmXGnRePEWcprEZfG_gfrlOaqIRUNmX_I9RPKbCZzx88bS-VzMpJvLA2PONHxoL6vpbBVsJHtxhVJQ7V7MYt7fStH9JJ0bOOSB712OQpgtFVdo5PwGv4ckFTdTe8DQIrSW482G35yM4ZpW0WF72A8l0RQNo--uuyMwR7XlasJzNMFYBgbiw2cjK2IHV5TQ09VHNT-8a2Tdi4elbMJMY"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "h-24 rounded-xl overflow-hidden bg-surface-container border border-outline-variant/[0.06]",
                  children: /*#__PURE__*/_jsxDEV("img", {
                    className: "w-full h-full object-cover",
                    "data-alt": "Atmospheric sunset sky through arched minimalist architectural window with serene twilight shades of periwinkle blue, soft violet, and gentle evening light reflecting tranquility.",
                    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCaASW89XWOpIUQVlkmXFdffvs3CDiChbqMQa1AwTlxpUNrDv64jv0un9Iw0zQMTniemNhSrQhJSqpdWFsHiOyJO6-IbjUNIMhBu_49YdPN9s4W95ZI4Es_s3gDal7uiLi-eMRSuTvmFl_YxfYbhiaUIx3A_rEXA-6MtffJkGhYg5_QM04GjOVJdpvn43Dv4mjr6z7VzmGlWUpXgy8TYlfUviuQf068y7S51Rat28g-njDtLUuSfUA"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between pt-1 text-on-surface-variant dark:text-on-surface-variant font-label-sm text-label-sm",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-space-xs flex-wrap",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "flex items-center gap-1",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[14px] text-outline dark:text-outline",
                      children: "calendar_today"
                    }, void 0, false), "Oct 21, 2026"]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                    className: "text-on-surface-variant",
                    children: "•"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "flex items-center gap-1",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[14px] text-outline dark:text-outline",
                      children: "schedule"
                    }, void 0, false), "12 min read"]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                    className: "text-on-surface-variant",
                    children: "•"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "flex items-center gap-1 text-tertiary",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[14px]",
                      children: "photo_library"
                    }, void 0, false), "2 photos"]
                  }, void 0, true)]
                }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "px-space-sm py-1 rounded-full bg-surface-container/90 border border-outline-variant/[0.08] text-on-surface hover:text-on-surface hover:border-outline-variant transition-colors flex items-center gap-1 active:scale-95",
                  variant: "subtle",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    children: "Read"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[14px]",
                    children: "arrow_forward"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("article", {
              className: "relative bg-surface-container backdrop-blur-xl border border-outline-variant/[0.08] rounded-3xl p-space-lg shadow-[0_12px_32px_rgba(0,0,0,0.35)] flex flex-col gap-space-md",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-start justify-between gap-space-xs",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-2",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "px-2.5 py-0.5 rounded-full bg-secondary-container/80 border border-purple-400/30 text-secondary font-label-sm text-label-sm font-semibold",
                    children: "Finance"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  "aria-label": "Note options",
                  className: "w-7 h-7 flex items-center justify-center rounded-full bg-surface-container/80 border border-outline-variant/[0.06] text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors",
                  variant: "subtle",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[16px]",
                    children: "more_vert"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col gap-1.5",
                children: [/*#__PURE__*/_jsxDEV("h4", {
                  className: "font-headline-md text-headline-md text-on-surface tracking-tight",
                  children: "Quarterly Investment & Family Budget Review"
                }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                  className: "font-body-md text-body-md text-on-surface-variant line-clamp-2",
                  children: "Reviewing emergency fund allocations, savings rate improvements, and zakat distribution schedule for upcoming month with halāl equity indices comparison."
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-xs flex-wrap",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "px-space-sm py-1 rounded-xl bg-surface-container border border-outline-variant/[0.06] flex items-center gap-1.5",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[15px] text-tertiary",
                    children: "trending_up"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-on-surface font-semibold",
                    children: "Target Savings: 32%"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "px-space-sm py-1 rounded-xl bg-surface-container border border-outline-variant/[0.06] flex items-center gap-1.5",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[15px] text-primary",
                    children: "volunteer_activism"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-on-surface font-semibold",
                    children: "Zakat Prepared"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between pt-1 text-on-surface-variant dark:text-on-surface-variant font-label-sm text-label-sm",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-space-xs flex-wrap",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "flex items-center gap-1",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[14px] text-outline dark:text-outline",
                      children: "calendar_today"
                    }, void 0, false), "Oct 18, 2026"]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                    className: "text-on-surface-variant",
                    children: "•"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "flex items-center gap-1",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[14px] text-outline dark:text-outline",
                      children: "schedule"
                    }, void 0, false), "4 min read"]
                  }, void 0, true)]
                }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "px-space-sm py-1 rounded-full bg-surface-container/90 border border-outline-variant/[0.08] text-on-surface hover:text-on-surface hover:border-outline-variant transition-colors flex items-center gap-1 active:scale-95",
                  variant: "subtle",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    children: "Read"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[14px]",
                    children: "arrow_forward"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
            className: "mb-4",
            children: /*#__PURE__*/_jsxDEV("div", {
              className: "relative bg-surface-container backdrop-blur-xl border border-outline-variant/[0.08] rounded-3xl p-space-lg text-center flex flex-col items-center justify-center gap-space-sm shadow-[0_6px_20px_rgba(0,0,0,0.3)] overflow-hidden",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "w-16 h-16 rounded-full bg-surface-container border border-primary/20 flex items-center justify-center text-primary shadow-inner relative",
                children: [/*#__PURE__*/_jsxDEV("svg", {
                  className: "w-8 h-8 text-primary",
                  fill: "none",
                  viewBox: "0 0 48 48",
                  children: [/*#__PURE__*/_jsxDEV("path", {
                    d: "M38 10C35 7 29 8 25 12L12 25C10 27 9 30 9 33L8 40L15 39C18 39 21 38 23 36L36 23C40 19 41 13 38 10Z",
                    stroke: "currentColor",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2.5"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("path", {
                    d: "M21 16L32 27",
                    stroke: "currentColor",
                    strokeLinecap: "round",
                    strokeWidth: "2.5"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("path", {
                    d: "M12 36L16 32",
                    stroke: "currentColor",
                    strokeLinecap: "round",
                    strokeWidth: "2"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("circle", {
                    cx: "37",
                    cy: "11",
                    fill: "currentColor",
                    r: "2"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "absolute -top-1 -right-1",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[16px] text-cyan-400",
                    style: {
                      fontVariationSettings: `'FILL' 1`
                    },
                    children: "arrow_back_ios_new"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col gap-1 max-w-xs",
                children: [/*#__PURE__*/_jsxDEV("h4", {
                  className: "font-headline-sm text-headline-sm text-on-surface",
                  children: "No archived notes yet"
                }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                  className: "font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant",
                  children: "Keep writing! Your mindful library expands and grows with every gentle thought, ayah reflection, and daily goal."
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "px-space-md py-1.5 rounded-full bg-surface-container/80 border border-outline-variant/[0.08] text-primary font-label-md text-label-md font-semibold hover:bg-surface-container-high/80 hover:text-on-surface active:scale-95 transition-all flex items-center gap-1.5",
                variant: "subtle",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[16px]",
                  children: "folder_open"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  children: "View Archive Drawer"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("aside", {
          className: "sticky bottom-24 self-end mr-margin z-40 pointer-events-auto",
          children: /*#__PURE__*/_jsxDEV("div", {
            className: "relative flex flex-col items-end gap-2",
            id: "notesQuickMenu",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "hidden flex-col items-end gap-2 transition-all duration-300",
              id: "actionSubMenu",
              children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "subtle",
                className: "flex items-center gap-2 px-3.5 py-2 rounded-full bg-surface-container backdrop-blur-xl border border-outline-variant/[0.12] text-on-surface shadow-[0_8px_24px_rgba(0,0,0,0.5)] active:scale-95 transition-transform",
                onClick: () => {},
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-md text-label-md font-semibold",
                  children: "Quick Thought"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "w-7 h-7 rounded-full bg-cyan-950 border border-cyan-400/40 text-cyan-300 flex items-center justify-center",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[16px]",
                    children: "bolt"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "subtle",
                className: "flex items-center gap-2 px-3.5 py-2 rounded-full bg-surface-container backdrop-blur-xl border border-outline-variant/[0.12] text-on-surface shadow-[0_8px_24px_rgba(0,0,0,0.5)] active:scale-95 transition-transform",
                onClick: () => {},
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-md text-label-md font-semibold",
                  children: "Deep Reflection"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "w-7 h-7 rounded-full bg-primary-container border border-primary/40 text-primary flex items-center justify-center",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[16px]",
                    children: "menu_book"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              variant: "subtle",
              "aria-label": "Create note options",
              className: "flex items-center gap-2 pl-4 pr-3.5 h-12 rounded-full bg-gradient-to-tr from-[#4f46e5] to-[#06b6d4] shadow-[0_10px_24px_rgba(79,70,229,0.45)] text-on-surface font-label-md text-label-md font-bold tracking-wide active:scale-95 hover:shadow-[0_12px_28px_rgba(79,70,229,0.55)] transition-all",
              id: "toggleFabBtn",
              onClick: () => setFabOpen(!fabOpen),
              children: [/*#__PURE__*/_jsxDEV("span", {
                children: "+ Write"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "w-6 h-6 rounded-full bg-white/20 flex items-center justify-center",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[16px] transition-transform duration-200",
                  id: "fabIcon",
                  children: fabOpen ? "close" : "add"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true)
        }, void 0, false)]
      }, void 0, true)
    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
      className: "fixed bottom-0 w-full z-50 pointer-events-none pb-safe",
      children: /*#__PURE__*/_jsxDEV("nav", {
        className: "pointer-events-auto mx-auto mb-4 w-[calc(100%-2rem)] max-w-md bg-surface-container backdrop-blur-3xl border border-outline-variant/[0.08] rounded-full shadow-[0_16px_40px_rgba(0,0,0,0.6)] px-space-xs py-space-xs",
        "data-active-classes": "text-primary font-bold",
        children: /*#__PURE__*/_jsxDEV("div", {
          className: "relative flex items-center justify-around h-14",
          children: [/*#__PURE__*/_jsxDEV("a", {
            "aria-current": "page",
            className: "flex flex-col items-center justify-center min-w-[52px] h-12 rounded-full transition-colors text-primary font-bold",
            "data-path": "notes-dashboard",
            href: "#",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[22px]",
              children: "space_dashboard"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm mt-0.5",
              children: "Home"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("a", {
            className: "flex flex-col items-center justify-center min-w-[52px] h-12 rounded-full text-on-surface-variant dark:text-on-surface-variant transition-colors hover:text-primary",
            "data-path": "finance-notes",
            href: "#",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[22px]",
              children: "account_balance_wallet"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm mt-0.5",
              children: "Finance"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "relative -top-4 flex items-center justify-center",
            children: /*#__PURE__*/_jsxDEV("a", {
              "aria-label": "Create Note",
              className: "w-14 h-14 rounded-full bg-gradient-to-tr from-primary via-indigo-600 to-cyan-400 shadow-[0_10px_24px_rgba(99,102,241,0.5)] flex items-center justify-center text-on-surface transition-transform active:scale-95 hover:scale-105 ring-4 ring-[#161c28]/95",
              "data-path": "create-new-note",
              href: "#",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[28px] font-bold leading-none flex items-center justify-center",
                children: "add"
              }, void 0, false)
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("a", {
            className: "flex flex-col items-center justify-center min-w-[52px] h-12 rounded-full text-on-surface-variant dark:text-on-surface-variant transition-colors hover:text-primary",
            "data-path": "routine-tasks",
            href: "#",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[22px]",
              children: "check_circle"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm mt-0.5",
              children: "Tasks"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("a", {
            className: "flex flex-col items-center justify-center min-w-[52px] h-12 rounded-full text-on-surface-variant dark:text-on-surface-variant transition-colors hover:text-primary",
            "data-path": "more-options",
            href: "#",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[22px]",
              children: "more_horiz"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm mt-0.5",
              children: "More"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true)
      }, void 0, false)
    }, void 0, false)]
  }, void 0, true);
};
export default NotesMain;