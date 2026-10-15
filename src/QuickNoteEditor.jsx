import GlassInput from "./components/ui/GlassInput";
import GlassCard from "./components/ui/GlassCard";
import AppShell from "./components/ui/AppShell";
import React, { useState, useEffect } from 'react';
import LiquidButton from './components/ui/LiquidButton';
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
const QuickNoteEditor = () => {
  const [isPinned, setIsPinned] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  return /*#__PURE__*/_jsxDEV("div", {
    className: "bg-surface-container font-body-md text-on-surface antialiased flex flex-col min-h-screen relative selection:bg-primary/40 selection:text-indigo-200",
    children: [/*#__PURE__*/_jsxDEV("header", {
      className: "fixed top-0 w-full z-50 pt-safe bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none backdrop-blur-xl shadow-[0_1px_12px_rgba(42,73,223,0.05)]",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "h-16 px-space-sm flex items-center justify-between gap-space-sm border-b border-outline-variant/20 bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl",
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
              children: "Create New Note"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-secondary flex items-center gap-1",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "w-1.5 h-1.5 rounded-full bg-secondary inline-block animate-pulse"
              }, void 0, false), "Saved to Cloud"]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-xs",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            "aria-label": "Share Note",
            className: "w-11 h-11 flex items-center justify-center rounded-full text-on-surface dark:text-on-surface-variant hover:text-primary hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
            variant: "primary",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[20px]",
              children: "share"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
            "aria-label": "More Options",
            className: "w-11 h-11 flex items-center justify-center rounded-full text-on-surface dark:text-on-surface-variant hover:text-primary hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
            variant: "primary",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[22px]",
              children: "more_vert"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "pl-space-xs flex items-center",
            children: /*#__PURE__*/_jsxDEV("img", {
              alt: "Profile",
              className: "w-8 h-8 rounded-full object-cover ring-2 ring-outline-variant/30 shadow-md",
              src: "https://lh3.googleusercontent.com/aida/AEtjO1Xqivgb8WnRmLof77BnZPzyZBpzbvUP1AVCrs3mvDfnB_f1RZXcFmBFA_a6HG6vfOogCi-CZxVreOdw6r686Kaf2HymZuMc7nO4lOXpxAOngehZRKb6t3YLAb7DlypVWHqhxt-xTwWeYAmsI6XFcvhYPOLlUX2ysjARmRemkhivrzCI4_28-zoF78qcnwkZuMSSN64w1b-y6TJvnm0moiPO0NRZ0PsoCWGadzO9EQbk1caL1rDfzQ7UFe5rUxR7vqgqDpSqy2PQ"
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false), /*#__PURE__*/_jsxDEV("main", {
      className: "flex-1 flex flex-col relative w-full pt-16 pb-safe bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "flex flex-col w-full relative pb-12 overflow-hidden",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "absolute -top-12 -left-12 w-64 h-64 rounded-full bg-gradient-to-tr from-secondary-fixed/50 to-primary-fixed/40 blur-3xl pointer-events-none -z-10"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "absolute top-72 -right-16 w-72 h-72 rounded-full bg-gradient-to-bl from-tertiary-fixed/30 via-primary-fixed/20 to-transparent blur-3xl pointer-events-none -z-10"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "absolute bottom-20 left-4 w-80 h-80 rounded-full bg-gradient-to-r from-secondary-fixed-dim/20 to-surface-container-high/40 blur-3xl pointer-events-none -z-10"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "px-margin flex flex-col gap-space-md w-full max-w-xl mx-auto",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between py-space-xs",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-sm",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md shadow-sm text-secondary font-label-md text-label-md border border-outline-variant/20",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[14px] text-secondary animate-pulse",
                  style: {
                    fontVariationSettings: `'FILL' 1`
                  },
                  children: "bolt"
                }, void 0, false), "Autosaved • 10:45 AM"]
              }, void 0, true)
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-1 bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md px-1.5 py-1 rounded-full shadow-sm border border-outline-variant/20",
              children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "primary",
                "aria-label": "Pin Note",
                className: "w-8 h-8 rounded-full flex items-center justify-center text-on-surface dark:text-on-surface-variant hover:text-primary transition-all active:scale-90",
                onClick: () => setIsPinned(!isPinned),
                id: "pinToggleBtn",
                className: `text-on-surface hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors w-11 h-11 flex items-center justify-center rounded-full ${isPinned ? "text-primary" : ""}`,
                title: "Pin Note",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[19px]",
                  id: "pinIcon",
                  style: {
                    fontVariationSettings: isPinned ? "'FILL' 1" : "'FILL' 0"
                  },
                  children: "push_pin"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                "aria-label": "Appearance Options",
                className: "w-8 h-8 rounded-full flex items-center justify-center text-on-surface dark:text-on-surface-variant hover:text-primary transition-all active:scale-90",
                title: "Color Theme",
                variant: "primary",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[19px]",
                  children: "palette"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                "aria-label": "Delete Quick Note",
                className: "w-8 h-8 rounded-full flex items-center justify-center text-error hover:bg-error-container/40 transition-all active:scale-90",
                title: "Discard Note",
                variant: "icon",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[19px]",
                  children: "delete_outline"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-2 overflow-x-auto py-1 no-scrollbar select-none -mx-margin px-margin",
            children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "category-pill group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface border border-outline-variant/30 shadow-sm active:scale-95 transition-all text-label-md font-label-md shrink-0",
              variant: "pill",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "text-sm",
                children: "💡"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                children: "Idea"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "category-pill group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-container text-on-primary-container shadow-md shadow-primary/25 active:scale-95 transition-all text-label-md font-label-md shrink-0 border border-primary/40",
              variant: "primary",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "text-sm",
                children: "✅"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                children: "Checklist"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "category-pill group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface border border-outline-variant/30 shadow-sm active:scale-95 transition-all text-label-md font-label-md shrink-0",
              variant: "pill",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "text-sm",
                children: "✨"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                children: "Spiritual"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "category-pill group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface border border-outline-variant/30 shadow-sm active:scale-95 transition-all text-label-md font-label-md shrink-0",
              variant: "pill",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "text-sm",
                children: "💼"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                children: "Work"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "category-pill group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface border border-outline-variant/30 shadow-sm active:scale-95 transition-all text-label-md font-label-md shrink-0",
              variant: "pill",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "text-sm",
                children: "🌿"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                children: "Personal"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-primary hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 active:scale-95 transition-all text-label-md font-label-md shrink-0 border border-outline-variant/20",
              variant: "primary",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[16px]",
                children: "add"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                children: "Tag"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "relative rounded-3xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-3xl shadow-xl shadow-primary/5 p-space-lg flex flex-col gap-space-md border border-outline-variant/25 transition-colors duration-300",
            id: "notePaperCard",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-2",
              children: [/*#__PURE__*/_jsxDEV(GlassInput, {
                className: "w-full bg-transparent font-headline-md text-headline-md text-on-surface placeholder:text-outline focus:outline-none tracking-tight",
                id: "noteTitleInput",
                placeholder: "Note Title (Optional)",
                type: "text",
                value: "Friday Family Dinner Prep"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "flex h-2.5 w-2.5 rounded-full bg-secondary shrink-0 shadow-sm shadow-secondary/50",
                title: "Synchronized live"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-2 py-1",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "text-on-surface dark:text-on-surface-variant font-label-sm text-label-sm mr-1",
                children: "Tint:"
              }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "primary",
                className: "w-6 h-6 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 border border-outline-variant/40 shadow-sm ring-2 ring-primary/40 active:scale-90 transition-transform",
                onClick: () => {},
                title: "Default Midnight"
              }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "subtle",
                className: "w-6 h-6 rounded-full bg-surface-container border border-secondary/40 shadow-sm active:scale-90 transition-transform",
                onClick: () => {},
                title: "Deep Mint"
              }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "subtle",
                className: "w-6 h-6 rounded-full bg-surface-container border border-tertiary/40 shadow-sm active:scale-90 transition-transform",
                onClick: () => {},
                title: "Deep Lavender"
              }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "subtle",
                className: "w-6 h-6 rounded-full bg-surface-container border border-secondary-container/40 shadow-sm active:scale-90 transition-transform",
                onClick: () => {},
                title: "Night Dew"
              }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "subtle",
                className: "w-6 h-6 rounded-full bg-surface-container border border-tertiary-container/40 shadow-sm active:scale-90 transition-transform",
                onClick: () => {},
                title: "Warm Amber"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "relative w-full min-h-[160px] flex flex-col",
              children: /*#__PURE__*/_jsxDEV("textarea", {
                className: "w-full bg-transparent font-body-lg text-body-lg text-on-surface dark:text-on-surface-variant placeholder:text-outline focus:outline-none resize-none leading-relaxed tracking-normal",
                id: "noteContentArea",
                placeholder: "What's flowing in your mind right now...",
                rows: "6",
                value: noteContent,
                onChange: e => setNoteContent(e.target.value),
                children: "Pick up fresh figs, organic honey, and cardamom pods from the local market before Asr prayer. Remind Uncle Tariq about arriving at 6:30 PM. Prepare the outdoor seating with warm lanterns."
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV(GlassCard, {
              className: "flex items-center justify-between bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 border border-outline-variant/20 backdrop-blur-md rounded-2xl p-2.5 shadow-sm",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-2.5 min-w-0",
                children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                  "aria-label": "Play voice note",
                  className: "w-9 h-9 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-md shadow-secondary-container/20 active:scale-90 transition-transform shrink-0",
                  id: "voicePlayBtn",
                  variant: "icon",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[20px]",
                    style: {
                      fontVariationSettings: `'FILL' 1`
                    },
                    children: "play_arrow"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-col min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center gap-1.5",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "font-label-md text-label-md text-on-surface truncate",
                      children: "Audio Memo 01"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "font-label-sm text-label-sm text-secondary font-semibold",
                      children: "🎙️ 0:42"
                    }, void 0, false)]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center gap-1 h-3 mt-1",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "w-1 bg-secondary rounded-full h-2 animate-pulse"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "w-1 bg-secondary rounded-full h-3 animate-pulse"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "w-1 bg-secondary rounded-full h-1.5"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "w-1 bg-secondary rounded-full h-2.5 animate-pulse"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "w-1 bg-secondary/60 rounded-full h-2"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "w-1 bg-secondary/40 rounded-full h-1"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "w-1 bg-secondary/50 rounded-full h-2.5"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "w-1 bg-secondary rounded-full h-3 animate-pulse"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "w-1 bg-secondary/70 rounded-full h-1.5"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "w-1 bg-secondary/40 rounded-full h-2"
                    }, void 0, false)]
                  }, void 0, true)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                "aria-label": "Remove audio recording",
                className: "w-7 h-7 flex items-center justify-center text-outline hover:text-error transition-colors",
                variant: "subtle",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[18px]",
                  children: "close"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "relative w-full rounded-2xl overflow-hidden shadow-sm group border border-outline-variant/20",
              children: [/*#__PURE__*/_jsxDEV("img", {
                className: "w-full h-36 object-cover object-center",
                "data-alt": "A tranquil sunlit wooden dining table set outdoors with earthenware plates, small glass lantern candles, fresh figs on a ceramic dish, and green olive branches under warm golden afternoon light in a minimalist, serene garden sanctuary.",
                src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmDYdDHJGMLw90lWK8KxrUltdEN1Ir76VyY92raPuSWqJX-V5SwxtFjxaA9UJQRkr-QmmPkHbjT3GVuveKBB92BMAwYUxWReGmX9zfPpnz3hQbOB2qGTU2dvZflYc6O_92JKS5MqrVl_s04z2qwylZA0sC-3xdHdnT6DKoFDQukSXZ8pG_NbZbOmcGKAy8kA_PHHqLeHbGm1NwU0U7p52jkKMz9a9Tk3ClBwpVvY979KDlLOC2s6A"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-surface-container-lowest/20 to-transparent flex items-end justify-between p-3",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "text-on-surface font-label-md text-label-md flex items-center gap-1",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[15px]",
                    children: "photo_camera"
                  }, void 0, false), "Inspiration_Table_Setup.jpg"]
                }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  "aria-label": "Remove image",
                  className: "w-6 h-6 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md text-on-surface flex items-center justify-center hover:bg-error hover:text-on-error transition-colors border border-outline-variant/30",
                  variant: "subtle",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[14px]",
                    children: "close"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between pt-space-xs",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-1",
                children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                  "aria-label": "Insert Checkbox",
                  className: "w-9 h-9 rounded-xl flex items-center justify-center text-on-surface dark:text-on-surface-variant hover:text-on-surface hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 active:scale-90 transition-all",
                  title: "Toggle Checkbox",
                  variant: "icon",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[20px]",
                    children: "check_box"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  "aria-label": "Bullet List",
                  className: "w-9 h-9 rounded-xl flex items-center justify-center text-on-surface dark:text-on-surface-variant hover:text-on-surface hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 active:scale-90 transition-all",
                  title: "Bullet List",
                  variant: "icon",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[20px]",
                    children: "format_list_bulleted"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  "aria-label": "Record Audio",
                  className: "w-9 h-9 rounded-xl flex items-center justify-center text-on-surface dark:text-on-surface-variant hover:text-on-surface hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 active:scale-90 transition-all",
                  title: "Record Audio",
                  variant: "icon",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[20px]",
                    children: "mic"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  "aria-label": "Attach Photo",
                  className: "w-9 h-9 rounded-xl flex items-center justify-center text-on-surface dark:text-on-surface-variant hover:text-on-surface hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 active:scale-90 transition-all",
                  title: "Attach Photo",
                  variant: "icon",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[20px]",
                    children: "add_a_photo"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  "aria-label": "Add Label",
                  className: "w-9 h-9 rounded-xl flex items-center justify-center text-on-surface dark:text-on-surface-variant hover:text-on-surface hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 active:scale-90 transition-all",
                  title: "Set Tag",
                  variant: "primary",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[20px]",
                    children: "label"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "px-2.5 py-1 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-primary font-label-md text-label-md flex items-center gap-1 active:scale-95 transition-all border border-primary/30",
                variant: "primary",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[16px]",
                  children: "draw"
                }, void 0, false), "Scribble"]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col gap-2",
            children: [/*#__PURE__*/_jsxDEV(GlassCard, {
              className: "flex items-center justify-between bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 border border-outline-variant/20 backdrop-blur-xl px-space-md py-2.5 rounded-2xl shadow-sm",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-2.5 min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-8 h-8 rounded-xl bg-secondary-container/30 border border-secondary/30 flex items-center justify-center text-secondary shrink-0",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[18px]",
                    style: {
                      fontVariationSettings: `'FILL' 1`
                    },
                    children: "notifications_active"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-col min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-md text-label-md text-on-surface truncate",
                    children: "Reminder: Today at 5:00 PM"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                    children: "Triggers 1 hour before Asr prayer"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "text-secondary hover:text-primary font-label-md text-label-md px-2 py-1 rounded-lg hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
                variant: "primary",
                children: "Edit"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between px-2 text-outline font-label-sm text-label-sm",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "flex items-center gap-1",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[13px]",
                  children: "schedule"
                }, void 0, false), "Created Today • 10:45 AM"]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                id: "charCountDisplay",
                children: [noteContent ? noteContent.trim().split(/\s+/).length : 0, " words • ", noteContent.length, " chars"]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col gap-2.5 pt-space-xs",
            children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "w-full relative group overflow-hidden rounded-2xl py-3.5 px-6 bg-gradient-to-r from-primary via-secondary to-tertiary text-on-primary font-headline-sm text-headline-sm shadow-lg shadow-primary/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-center",
              id: "saveNoteBtn",
              variant: "primary",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "relative z-10 flex items-center gap-2",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  children: "Save Quick Note"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1",
                  children: "arrow_forward"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "grid grid-cols-2 gap-2",
              children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "none",
                className: "w-full py-3 px-4 rounded-2xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 border border-outline-variant/20 backdrop-blur-md text-on-surface font-label-md text-label-md shadow-sm hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5",
                onClick: () => {},
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[17px]",
                  children: "close"
                }, void 0, false), "Cancel Changes"]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "w-full py-3 px-4 rounded-2xl bg-error-container/40 border border-error/20 text-error font-label-md text-label-md hover:bg-error-container active:scale-[0.98] transition-all flex items-center justify-center gap-1.5",
                id: "deleteNoteBtn",
                variant: "none",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[17px]",
                  children: "delete"
                }, void 0, false), "Delete Note"]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "fixed bottom-24 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 pointer-events-none opacity-0 transition-opacity duration-300 z-50",
          id: "saveToast",
          children: [/*#__PURE__*/_jsxDEV("span", {
            className: "material-symbols-outlined text-tertiary-fixed text-[18px]",
            children: "check_circle"
          }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
            className: "font-label-md text-label-md",
            children: "Momentum note preserved to cloud"
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false)]
  }, void 0, true);
};
export default QuickNoteEditor;