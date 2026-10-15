import GlassInput from "./components/ui/GlassInput";
import GlassCard from "./components/ui/GlassCard";
import AppShell from "./components/ui/AppShell";
import React, { useState, useEffect } from 'react';
import LiquidButton from './components/ui/LiquidButton';
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
const LongNoteEditor = () => {
  const [isPinned, setIsPinned] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  return /*#__PURE__*/_jsxDEV("div", {
    className: "bg-surface-container font-body-md text-on-surface antialiased flex flex-col min-h-screen relative selection:bg-primary/40 selection:text-indigo-200",
    children: [/*#__PURE__*/_jsxDEV("header", {
      className: "fixed top-0 w-full z-50 pt-safe bg-surface-container backdrop-blur-xl border-b border-outline-variant shadow-[0_1px_16px_rgba(0,0,0,0.4)]",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "h-16 px-space-sm flex items-center justify-between gap-space-sm",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-xs min-w-0 flex-1",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            variant: "primary",
            "aria-label": "Back or Close",
            className: "w-11 h-11 flex items-center justify-center rounded-full text-on-surface hover:text-primary hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
            onClick: () => {},
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[24px]",
              children: "arrow_back"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col min-w-0",
            children: [/*#__PURE__*/_jsxDEV("h1", {
              className: "font-headline-sm text-headline-sm text-on-surface truncate",
              children: "Note Editor Details"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-emerald-400 flex items-center gap-1.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"
              }, void 0, false), "Saved to Cloud"]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-xs",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            "aria-label": "Share Note",
            className: "w-11 h-11 flex items-center justify-center rounded-full text-on-surface dark:text-on-surface-variant hover:text-on-surface hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
            variant: "icon",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[20px]",
              children: "share"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
            "aria-label": "More Options",
            className: "w-11 h-11 flex items-center justify-center rounded-full text-on-surface dark:text-on-surface-variant hover:text-on-surface hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
            variant: "icon",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[22px]",
              children: "more_vert"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "pl-space-xs flex items-center",
            children: /*#__PURE__*/_jsxDEV("img", {
              alt: "Profile",
              className: "w-8 h-8 rounded-full object-cover ring-1 ring-white/15 shadow-[0_2px_8px_rgba(0,0,0,0.5)]",
              src: "https://lh3.googleusercontent.com/aida/AEtjO1Xqivgb8WnRmLof77BnZPzyZBpzbvUP1AVCrs3mvDfnB_f1RZXcFmBFA_a6HG6vfOogCi-CZxVreOdw6r686Kaf2HymZuMc7nO4lOXpxAOngehZRKb6t3YLAb7DlypVWHqhxt-xTwWeYAmsI6XFcvhYPOLlUX2ysjARmRemkhivrzCI4_28-zoF78qcnwkZuMSSN64w1b-y6TJvnm0moiPO0NRZ0PsoCWGadzO9EQbk1caL1rDfzQ7UFe5rUxR7vqgqDpSqy2PQ"
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false), /*#__PURE__*/_jsxDEV("main", {
      className: "flex-1 flex flex-col relative w-full pt-16 pb-safe bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "flex flex-col w-full relative",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "absolute -top-12 left-1/4 w-80 h-80 rounded-full bg-primary-container/15 blur-[100px] pointer-events-none -z-10"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "absolute top-96 -right-16 w-80 h-80 rounded-full bg-secondary-container/10 blur-[100px] pointer-events-none -z-10"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "absolute top-[800px] -left-20 w-80 h-80 rounded-full bg-tertiary-container/10 blur-[100px] pointer-events-none -z-10"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "px-margin pt-space-sm pb-space-xs flex items-center justify-between",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-space-xs",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant flex items-center gap-1.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[15px] text-emerald-400",
                children: "cloud_done"
              }, void 0, false), "Saved • Oct 24, 2026, 11:20 AM"]
            }, void 0, true)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-space-xs",
            children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
              "aria-label": "Toggle Preview Mode",
              className: "w-8 h-8 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors",
              variant: "icon",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px]",
                children: "visibility"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary-container/20 border border-primary/30 text-primary font-label-sm text-label-sm",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[12px] text-secondary",
                children: "push_pin"
              }, void 0, false), "Pinned"]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "px-margin flex flex-col gap-space-md mt-space-xs",
          children: [/*#__PURE__*/_jsxDEV(GlassCard, {
            className: "p-space-lg rounded-2xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl border border-outline-variant/[0.08] shadow-[0_12px_32px_-4px_rgba(0,0,0,0.5)] flex flex-col gap-space-md",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "relative",
              children: /*#__PURE__*/_jsxDEV("h1", {
                className: "font-headline-lg text-headline-lg text-[#f8fafc] font-bold tracking-tight outline-none focus:text-primary transition-colors cursor-text",
                contenteditable: "true",
                spellcheck: "false",
                children: "Q4 Strategic Reflection & Habit Synthesis"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-wrap items-center gap-space-xs",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 border border-outline-variant text-on-surface-variant font-label-sm text-label-sm",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[14px] text-on-surface-variant dark:text-on-surface-variant",
                  children: "calendar_today"
                }, void 0, false), "Sat, Oct 24 • 11:20 AM"]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 border border-outline-variant text-on-surface-variant font-label-sm text-label-sm",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[14px] text-secondary",
                  children: "schedule"
                }, void 0, false), "6 min read • 840 words"]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "inline-flex items-center gap-1 px- space-sm px-2.5 py-1 rounded-full bg-primary-container/25 border border-primary/40 text-primary-fixed font-label-sm text-label-sm font-semibold shadow-[0_0_12px_rgba(128,131,255,0.15)]",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[13px] text-primary",
                  children: "spa"
                }, void 0, false), "Spiritual Growth"]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container/20 border border-secondary/40 text-secondary font-label-sm text-label-sm font-semibold shadow-[0_0_12px_rgba(76,215,246,0.15)]",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[13px] text-secondary",
                  children: "insights"
                }, void 0, false), "Quarterly Review"]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
            className: "p-space-lg rounded-2xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl border border-outline-variant/[0.07] shadow-[0_12px_32px_-4px_rgba(0,0,0,0.5)] flex flex-col gap-space-lg text-on-surface ",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col gap-space-sm",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-xs",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(76,215,246,0.8)] inline-block"
                }, void 0, false), /*#__PURE__*/_jsxDEV("h2", {
                  className: "font-headline-md text-headline-md text-on-surface font-semibold tracking-tight",
                  children: "1. Morning Momentum & Spiritual Alignment"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
                className: "font-body-lg text-body-lg text-on-surface-variant leading-relaxed",
                children: "Over the last 90 days, locking in Fajr followed by 20 minutes of Quranic reflection created an unprecedented sense of barakah in my daily workflow. The cognitive clarity achieved before 7:00 AM consistently outweighed late-night work bursts."
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "relative overflow-hidden p-space-lg rounded-xl bg-[rgba(26,33,48,0.7)] border border-primary/20 backdrop-blur-md shadow-inner flex items-start gap-space-md",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 text-primary shadow-[0_0_12px_rgba(192,193,255,0.25)]",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[22px]",
                  children: "format_quote"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col gap-space-xs min-w-0",
                children: [/*#__PURE__*/_jsxDEV("p", {
                  className: "font-body-lg text-body-lg text-on-surface italic font-medium leading-relaxed",
                  children: "“The deeds most loved by Allah are those done regularly, even if small.”"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-secondary font-semibold",
                  children: "— Daily anchor principle that sustained the 14-day streak"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col gap-space-sm",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-xs",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(192,193,255,0.8)] inline-block"
                }, void 0, false), /*#__PURE__*/_jsxDEV("h2", {
                  className: "font-headline-md text-headline-md text-on-surface font-semibold tracking-tight",
                  children: "2. Focus Windows & Routine Guardrails"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
                className: "font-body-lg text-body-lg text-on-surface-variant leading-relaxed",
                children: "Consistently capping deep work sessions at 90 minutes protected energy reserves. Pairing routine tasks with hydration alerts reduced afternoon fatigue significantly."
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col gap-space-xs pt-space-xs",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-on-surface-variant dark:text-on-surface-variant uppercase tracking-wider mb-1",
                children: "Quarterly Milestones"
              }, void 0, false), /*#__PURE__*/_jsxDEV("label", {
                className: "flex items-center gap-space-md p-space-sm rounded-xl hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors cursor-pointer group",
                children: [/*#__PURE__*/_jsxDEV(GlassInput, {
                  checked: "",
                  className: "hidden peer",
                  type: "checkbox"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "w-6 h-6 rounded-full bg-primary-container text-on-surface flex items-center justify-center shadow-[0_0_10px_rgba(128,131,255,0.4)] transition-transform group-active:scale-95",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[16px]",
                    children: "check"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant line-through flex-1",
                  children: "Review monthly prayer habit streak metrics"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-primary font-medium px-2.5 py-0.5 rounded-full bg-primary-container/25 border border-primary/30",
                  children: "Done"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("label", {
                className: "flex items-center gap-space-md p-space-sm rounded-xl hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors cursor-pointer group",
                children: [/*#__PURE__*/_jsxDEV(GlassInput, {
                  checked: "",
                  className: "hidden peer",
                  type: "checkbox"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "w-6 h-6 rounded-full bg-tertiary-container text-on-surface flex items-center justify-center shadow-[0_0_10px_rgba(160,120,255,0.4)] transition-transform group-active:scale-95",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[16px]",
                    children: "check"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant line-through flex-1",
                  children: "Consolidate investment and emergency buffer"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-tertiary font-medium px-2.5 py-0.5 rounded-full bg-tertiary-container/25 border border-tertiary/30",
                  children: "Done"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("label", {
                className: "flex items-center gap-space-md p-space-sm rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors cursor-pointer group border border-outline-variant",
                children: [/*#__PURE__*/_jsxDEV(GlassInput, {
                  className: "hidden peer",
                  type: "checkbox"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "w-6 h-6 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 border flex items-center justify-center text-transparent transition-transform group-active:scale-95",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[16px]",
                    children: "check"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-md text-body-md text-on-surface font-medium flex-1",
                  children: "Draft Q1 goals outline for family retreat"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-secondary font-semibold px-2.5 py-0.5 rounded-full bg-secondary-container/20 border border-secondary/30",
                  children: "Pending"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
            className: "p-space-lg rounded-2xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl border border-outline-variant/[0.08] shadow-[0_12px_32px_-4px_rgba(0,0,0,0.5)] flex flex-col gap-space-md",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-xs",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[20px] text-primary",
                  children: "attach_file"
                }, void 0, false), /*#__PURE__*/_jsxDEV("h3", {
                  className: "font-headline-sm text-headline-sm text-on-surface",
                  children: "Attachments & Media"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "px-2 py-0.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface-variant font-label-sm text-label-sm border border-outline-variant",
                  children: "3"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "font-label-md text-label-md text-primary hover:text-on-surface flex items-center gap-1 transition-colors",
                variant: "primary",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[16px]",
                  children: "add_circle"
                }, void 0, false), "Add Item"]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex gap-space-md overflow-x-auto pb-space-xs pt-1 snap-x scroll-smooth",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "snap-start shrink-0 w-52 flex flex-col rounded-xl overflow-hidden bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 border shadow-lg",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "relative h-28 w-full overflow-hidden bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0",
                  children: [/*#__PURE__*/_jsxDEV("img", {
                    className: "w-full h-full object-cover brightness-95 contrast-105",
                    "data-alt": "Serene spiritual dawn sky with pale indigo and lavender morning gradient, golden horizon glow illuminating an elegant mosque minaret in soft atmospheric focus, cinematic tranquil lighting, high resolution",
                    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeoilMROxN5rslAxq5_gp_GsUHOhySI_czZCoT5pSTWonQcVm_-CXwO1y6MGMtSqaAXW7q2_EBl3BY1OPXZWiphvRjtrfw4uhTQZneGTMKN_19ltajDp8_IZNEqDXuRYBJgVnBX8GUdKwEt2p8FpO3epeqPLEzOzMmLYlWIqrDlyqgXOWmaJ8LRLxLqCJrhP1TmSBeZCjT7Rww6AdnUdSsGsdxw--lB6RTPhLCZMRdQouCia2YbsQ"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-on-surface border font-label-sm text-label-sm",
                    children: "1.8 MB"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "p-space-sm flex items-center justify-between",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "flex flex-col min-w-0",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "font-label-md text-label-md text-on-surface truncate",
                      children: "Dawn_Focus.jpg"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant",
                      children: "Sunrise reflection"
                    }, void 0, false)]
                  }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                    className: "w-7 h-7 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none transition-colors",
                    variant: "subtle",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[16px]",
                      children: "open_in_new"
                    }, void 0, false)
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "snap-start shrink-0 w-52 flex flex-col rounded-xl overflow-hidden bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 border shadow-lg",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "relative h-28 w-full overflow-hidden bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0",
                  children: [/*#__PURE__*/_jsxDEV("img", {
                    className: "w-full h-full object-cover brightness-95 contrast-105",
                    "data-alt": "Overhead aesthetic flat-lay view of a mindful leather journal open on a bright oak desk, filled with neat hand-drawn mind maps, habit diagrams, and fountain pen calligraphy, warm morning sunlight, serene atmosphere",
                    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyIv9-i3XKKs1okzhg6U6RLVRrWcJaxlaZ9HiwjElhA_5ehlDJ4M7KROpK8D0D_1lJP2vxvISs3lwrU8e_LXJ89kxodLxqsskAIQ2BGZg-bp5c4euhv34WAP1qOKh68OeauGa0M_BcpwHxZvv22eWCLTPpYTY3NPSsst5EaNTwOnHHVgsIC7ZeI8NIOKQ3NpsbvlTl_CikPVqRjPpWhWYtcSgmt6Sf-HKREON-1nTg6urtpPUceJw"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-on-surface border font-label-sm text-label-sm",
                    children: "2.4 MB"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "p-space-sm flex items-center justify-between",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "flex flex-col min-w-0",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "font-label-md text-label-md text-on-surface truncate",
                      children: "MindMap_Q4.png"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant",
                      children: "Habit structure"
                    }, void 0, false)]
                  }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                    className: "w-7 h-7 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none transition-colors",
                    variant: "subtle",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[16px]",
                      children: "open_in_new"
                    }, void 0, false)
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "snap-start shrink-0 w-60 p-space-md rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 border shadow-lg flex flex-col justify-between",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-space-xs",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "w-8 h-8 rounded-full bg-secondary-container/30 border border-secondary/30 text-secondary flex items-center justify-center",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[18px]",
                      children: "mic"
                    }, void 0, false)
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex flex-col min-w-0",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "font-label-md text-label-md text-on-surface truncate",
                      children: "Reflection_Voice.m4a"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant",
                      children: "3m 15s"
                    }, void 0, false)]
                  }, void 0, true)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "my-space-sm flex items-center justify-between gap-1 h-8 px-2.5 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 border border-outline-variant",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "w-1 h-3 rounded-full bg-secondary animate-pulse shadow-[0_0_6px_rgba(76,215,246,0.6)]"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "w-1 h-6 rounded-full bg-secondary shadow-[0_0_6px_rgba(76,215,246,0.6)]"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "w-1 h-4 rounded-full bg-secondary/80"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "w-1 h-7 rounded-full bg-secondary shadow-[0_0_6px_rgba(76,215,246,0.6)]"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "w-1 h-5 rounded-full bg-secondary/90"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "w-1 h-3 rounded-full bg-secondary/60"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "w-1 h-7 rounded-full bg-secondary shadow-[0_0_6px_rgba(76,215,246,0.6)]"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "w-1 h-4 rounded-full bg-secondary/70"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "w-1 h-6 rounded-full bg-secondary shadow-[0_0_6px_rgba(76,215,246,0.6)]"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "w-1 h-2 rounded-full bg-secondary/50"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "w-full py-1.5 px-3 rounded-full bg-secondary/20 hover:bg-secondary/30 border border-secondary/40 text-secondary font-label-sm text-label-sm flex items-center justify-center gap-1 transition-colors",
                  variant: "none",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[16px]",
                    children: "play_arrow"
                  }, void 0, false), "Tap to Play Waveform"]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "snap-start shrink-0 w-36 h-auto min-h-[148px] rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 border border-dashed border-outline-variant hover:border-primary/50 transition-all flex flex-col items-center justify-center gap-space-xs text-on-surface-variant p-space-sm",
                variant: "primary",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-10 h-10 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 border flex items-center justify-center text-primary shadow-xs",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[20px]",
                    children: "add"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-center font-medium",
                  children: "Add Media / File"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col gap-space-sm pt-space-xs pb-32",
            children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "w-full py-4 px-space-lg rounded-2xl bg-gradient-to-r from-[#0284c7] to-[#4f46e5] text-on-surface font-headline-sm text-headline-sm flex items-center justify-center gap-space-sm shadow-[0_12px_28px_-2px_rgba(79,70,229,0.5)] hover:brightness-110 active:scale-[0.99] transition-all border border-outline-variant",
              variant: "none",
              children: [/*#__PURE__*/_jsxDEV("span", {
                children: "Save Journal Note"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[20px]",
                children: "arrow_forward"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "grid grid-cols-2 gap-space-sm",
              children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "py-3 px-space-md rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 border text-on-surface font-label-md text-label-md flex items-center justify-center gap-1.5 transition-colors",
                variant: "subtle",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[18px] text-on-surface-variant dark:text-on-surface-variant",
                  children: "close"
                }, void 0, false), "Cancel Draft"]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "py-3 px-space-md rounded-xl bg-error-container/20 hover:bg-error-container/30 border border-error/20 text-error font-label-md text-label-md flex items-center justify-center gap-1.5 transition-colors",
                variant: "subtle",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[18px]",
                  children: "delete_outline"
                }, void 0, false), "Delete Note"]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("aside", {
          "aria-label": "Formatting Controls",
          className: "fixed bottom-6 left-margin right-margin z-40",
          children: /*#__PURE__*/_jsxDEV("div", {
            className: "w-full p-2 rounded-full bg-surface-container backdrop-blur-3xl border shadow-[0_16px_40px_rgba(0,0,0,0.65)] flex items-center justify-between gap-1 overflow-x-auto",
            children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "w-9 h-9 rounded-full hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface-variant hover:text-on-surface flex items-center justify-center shrink-0 font-bold transition-colors",
              title: "Bold",
              variant: "icon",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[20px]",
                children: "format_bold"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "w-9 h-9 rounded-full hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface-variant hover:text-on-surface flex items-center justify-center shrink-0 italic transition-colors",
              title: "Italic",
              variant: "icon",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[20px]",
                children: "format_italic"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "w-9 h-9 rounded-full hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface-variant hover:text-on-surface flex items-center justify-center shrink-0 transition-colors",
              title: "Heading Level",
              variant: "icon",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[20px]",
                children: "title"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "w-[1px] h-5 bg-white/10 shrink-0 my-auto"
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "w-9 h-9 rounded-full hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface-variant hover:text-on-surface flex items-center justify-center shrink-0 transition-colors",
              title: "Bulleted List",
              variant: "icon",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[20px]",
                children: "format_list_bulleted"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "w-9 h-9 rounded-full hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface-variant hover:text-on-surface flex items-center justify-center shrink-0 transition-colors",
              title: "Numbered List",
              variant: "icon",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[20px]",
                children: "format_list_numbered"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "w-9 h-9 rounded-full hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface-variant hover:text-on-surface flex items-center justify-center shrink-0 transition-colors",
              title: "Blockquote",
              variant: "icon",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[20px]",
                children: "format_quote"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "w-[1px] h-5 bg-white/10 shrink-0 my-auto"
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "w-9 h-9 rounded-full hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-primary flex items-center justify-center shrink-0 transition-colors",
              title: "Insert Image",
              variant: "primary",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[20px]",
                children: "image"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "w-9 h-9 rounded-full bg-gradient-to-tr from-secondary-container to-secondary text-slate-950 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(76,215,246,0.4)] hover:brightness-110 transition-all",
              title: "Record Voice Memo",
              variant: "icon",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px]",
                children: "mic"
              }, void 0, false)
            }, void 0, false)]
          }, void 0, true)
        }, void 0, false)]
      }, void 0, true)
    }, void 0, false)]
  }, void 0, true);
};
export default LongNoteEditor;