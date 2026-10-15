import GlassInput from "./components/ui/GlassInput";
import GlassCard from "./components/ui/GlassCard";
import AppShell from "./components/ui/AppShell";
import React, { useState, useEffect } from 'react';
import LiquidButton from './components/ui/LiquidButton';
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
const NoteMediaViewer = () => {
  const [isPinned, setIsPinned] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  return /*#__PURE__*/_jsxDEV("div", {
    className: "bg-surface-container font-body-md text-on-surface antialiased flex flex-col min-h-screen relative selection:bg-primary/40 selection:text-indigo-200",
    children: [/*#__PURE__*/_jsxDEV("header", {
      className: "fixed top-0 w-full z-50 pt-safe bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl shadow-[0_1px_12px_rgba(42,73,223,0.05)]",
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
              children: "Create New Note"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-tertiary flex items-center gap-1",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim inline-block animate-pulse"
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
              className: "w-8 h-8 rounded-full object-cover shadow-[0_2px_8px_rgba(42,73,223,0.15)]",
              src: "https://lh3.googleusercontent.com/aida/AEtjO1Xqivgb8WnRmLof77BnZPzyZBpzbvUP1AVCrs3mvDfnB_f1RZXcFmBFA_a6HG6vfOogCi-CZxVreOdw6r686Kaf2HymZuMc7nO4lOXpxAOngehZRKb6t3YLAb7DlypVWHqhxt-xTwWeYAmsI6XFcvhYPOLlUX2ysjARmRemkhivrzCI4_28-zoF78qcnwkZuMSSN64w1b-y6TJvnm0moiPO0NRZ0PsoCWGadzO9EQbk1caL1rDfzQ7UFe5rUxR7vqgqDpSqy2PQ"
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false), /*#__PURE__*/_jsxDEV("main", {
      className: "flex-1 flex flex-col relative w-full pt-16 pb-safe bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "flex flex-col w-full pb-32 space-y-space-md px-margin relative",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "absolute -top-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-br from-primary-fixed/40 via-secondary-fixed/30 to-tertiary-fixed/20 rounded-full blur-3xl pointer-events-none -z-10"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "absolute top-96 -right-16 w-64 h-64 bg-tertiary-fixed/20 rounded-full blur-2xl pointer-events-none -z-10"
        }, void 0, false), /*#__PURE__*/_jsxDEV("section", {
          className: "w-full pt-space-xs",
          children: /*#__PURE__*/_jsxDEV(GlassCard, {
            className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-3xl rounded-2xl p-space-md shadow-sm flex flex-col gap-space-xs",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between gap-space-sm",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-xs min-w-0",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[18px] text-primary",
                  children: "collections"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-md text-label-md text-primary tracking-wide uppercase",
                  children: "Media Viewer"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "text-outline-variant",
                  children: "•"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                  children: "Attached to: Q4 Strategic Reflection"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-xs shrink-0",
                children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "w-8 h-8 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center text-on-surface dark:text-on-surface-variant hover:text-primary transition-colors",
                  title: "Download",
                  variant: "primary",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[18px]",
                    children: "download"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "w-8 h-8 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center text-on-surface dark:text-on-surface-variant hover:text-primary transition-colors",
                  title: "Share",
                  variant: "primary",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[18px]",
                    children: "ios_share"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "w-8 h-8 rounded-full bg-error-container/40 flex items-center justify-center text-error hover:bg-error-container/60 transition-colors",
                  title: "Delete",
                  variant: "icon",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[18px]",
                    children: "delete"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between pt-1",
              children: [/*#__PURE__*/_jsxDEV("p", {
                className: "font-headline-sm text-headline-sm text-on-surface truncate",
                children: "Dawn_Reflection_Sky.jpg"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-secondary bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 px-2.5 py-0.5 rounded-full font-medium",
                children: "Synced Cloud Asset"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true)
        }, void 0, false), /*#__PURE__*/_jsxDEV("section", {
          className: "w-full",
          children: /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-space-xs overflow-x-auto no-scrollbar py-1",
            children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-gradient-to-r from-primary via-primary-container to-secondary text-on-primary font-label-md text-label-md shadow-sm whitespace-nowrap",
              variant: "primary",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[16px]",
                style: {
                  fontVariationSettings: `'FILL' 1`
                },
                children: "image"
              }, void 0, false), "Photos (4)"]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md text-on-surface dark:text-on-surface-variant hover:text-on-surface font-label-md text-label-md whitespace-nowrap shadow-sm",
              variant: "subtle",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[16px]",
                children: "videocam"
              }, void 0, false), "Videos (2)"]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md text-on-surface dark:text-on-surface-variant hover:text-on-surface font-label-md text-label-md whitespace-nowrap shadow-sm",
              variant: "subtle",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[16px]",
                children: "mic"
              }, void 0, false), "Voice Memos (1)"]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md text-on-surface dark:text-on-surface-variant hover:text-on-surface font-label-md text-label-md whitespace-nowrap shadow-sm",
              variant: "subtle",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[16px]",
                children: "description"
              }, void 0, false), "Docs (3)"]
            }, void 0, true)]
          }, void 0, true)
        }, void 0, false), /*#__PURE__*/_jsxDEV("section", {
          className: "w-full relative",
          children: /*#__PURE__*/_jsxDEV("div", {
            className: "relative w-full h-80 rounded-xl overflow-hidden shadow-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 group",
            children: [/*#__PURE__*/_jsxDEV("img", {
              className: "w-full h-full object-cover select-none",
              "data-alt": "Peaceful serene dawn sky with pastel lavender and periwinkle clouds over misty distant mosque domes and minarets silhouette, soft golden morning rim lighting, tranquil atmospheric photography, ultra realistic 8k resolution, serene spiritual mindfulness aesthetic",
              src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNjiD-1LfA-Gp-FxeZ-V3BpIr5fhlnJ50ZHidge-KyQv19TMvWz7tJJcLGNMjChU8VQHJxQ3F5btGkJP54ALv8iqG8sF9nCgWyOZSp03T2n_vGaxlJ2IJJtV5lK8M2-JaoCL_RTgWpbuLxKCqKHA-SM12i6_FklJOR31Ra015M3rroDrtitoiHVnGdFzNVYkFeUbuP_FgXngaBZyJ-cu4t4fQ_WWK5j4KcUb-L61BELNCqCmWeduM"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-surface-container-lowest/30 to-transparent pointer-events-none"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-auto",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl shadow-sm text-on-surface ",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[14px] text-primary",
                  children: "photo_camera"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm font-semibold",
                  children: "1 / 4"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-1",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl rounded-full p-0.5 shadow-sm text-on-surface ",
                  children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                    className: "w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
                    title: "Zoom Out",
                    variant: "subtle",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[16px]",
                      children: "zoom_out"
                    }, void 0, false)
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm px-1 font-medium",
                    children: "100%"
                  }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                    className: "w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
                    title: "Zoom In",
                    variant: "subtle",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[16px]",
                      children: "zoom_in"
                    }, void 0, false)
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "w-8 h-8 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl flex items-center justify-center text-on-surface shadow-sm hover:text-primary transition-colors",
                  title: "Fullscreen",
                  variant: "primary",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[18px]",
                    children: "fullscreen"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "absolute inset-y-0 left-2 flex items-center",
              children: /*#__PURE__*/_jsxDEV(LiquidButton, {
                "aria-label": "Previous Media",
                className: "w-9 h-9 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl flex items-center justify-center text-on-surface shadow-md hover:scale-105 active:scale-95 transition-transform",
                variant: "icon",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[20px]",
                  children: "chevron_left"
                }, void 0, false)
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "absolute inset-y-0 right-2 flex items-center",
              children: /*#__PURE__*/_jsxDEV(LiquidButton, {
                "aria-label": "Next Media",
                className: "w-9 h-9 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl flex items-center justify-center text-on-surface shadow-md hover:scale-105 active:scale-95 transition-transform",
                variant: "icon",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[20px]",
                  children: "chevron_right"
                }, void 0, false)
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "absolute bottom-3 left-3 right-3 flex items-end justify-between pointer-events-auto",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col text-on-surface drop-shadow-md",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-1.5",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[14px] text-secondary",
                    children: "schedule"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-on-surface font-medium",
                    children: "Oct 24, 2026 • 06:14 AM"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant",
                  children: "Shot on iPhone 16 Pro • 24mm f/1.78"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "px-3 py-1 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl text-primary font-label-sm text-label-sm shadow-md flex items-center gap-1 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
                variant: "primary",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[14px]",
                  children: "auto_awesome"
                }, void 0, false), "Enhance"]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true)
        }, void 0, false), /*#__PURE__*/_jsxDEV("section", {
          className: "w-full",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between mb-space-xs",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "font-label-md text-label-md text-on-surface dark:text-on-surface-variant font-semibold",
              children: "ALL ATTACHMENTS (7)"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-primary flex items-center gap-0.5 cursor-pointer",
              children: ["Select Multiple", /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[14px]",
                children: "checklist"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-space-xs overflow-x-auto no-scrollbar py-1",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "relative shrink-0 w-20 h-20 rounded-2xl overflow-hidden shadow-md ring-2 ring-primary bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 cursor-pointer",
              children: [/*#__PURE__*/_jsxDEV("img", {
                className: "w-full h-full object-cover",
                "data-alt": "Dawn twilight blue and purple sky with distant soft clouds and calm serene mood, macro thumbnail aesthetic",
                src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_zfr050eJct1tiPjvUmoiBc0KBcI2cxtaiT4cheTfgnf9bLqUDMG1HAbGyceX3rDuhT-THATWZIvRZBh6j3wQGg_1P6B8tQl2OFR0PkAB9pGK6Za2qsVdQfImETKtwfSMyFiqCGvO6p66CnOqQQDkcOmTt0_zRoClfhH8hR8kjA6UWUsBPMD4vI6_zMxjSM30BH_6XcXdlIpytX3bY2wIo0NwR50afy6Gz8AEQX6H2dSNdUmvwX4"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "absolute top-1 right-1 w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-sm",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[13px]",
                  children: "check"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "relative shrink-0 w-20 h-20 rounded-2xl overflow-hidden shadow-sm bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:opacity-90 cursor-pointer",
              children: [/*#__PURE__*/_jsxDEV("img", {
                className: "w-full h-full object-cover",
                "data-alt": "Aesthetic cream paper journal page with neat handwritten fountain pen cursive reflections and botanical sketches, soft ambient window lighting",
                src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDekRN-0uCVVUCM2x7_NRnPjMADbeJKN6A6fulQrtXPFFFdpaa6Q6WRpFW_dyTTjfY8PCx8FLeA69uyOMMREPB7Zl0blB8gWv2DOptMwyFyOs7MzYyE6wAIwX3qyOnkvASj6WeJcRiQT9RS2IzWWeDtvGGpG1AvGM26sS700B-6NZgwCo-OcqQ5yf0iIPhFZdEjsImrC5Agr26ebfxnx1FD43ebLGz9O38FDB8DmKcZZJoGqGMBbwg"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "absolute bottom-1 left-1 px-1.5 py-0.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-[10px] text-on-surface font-medium leading-none",
                  children: "Photo"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "relative shrink-0 w-20 h-20 rounded-2xl overflow-hidden shadow-sm bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:opacity-90 cursor-pointer",
              children: [/*#__PURE__*/_jsxDEV("img", {
                className: "w-full h-full object-cover",
                "data-alt": "Lush green botanical courtyard garden with clear reflective water pond and serene stone fountain, bright soft morning light",
                src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBb8a1OqsooCO1dn5x7265hw5WO7Xftw0OnkceoZYcFY7vd5sCWenyr8SV445lCzLnV3HJP__HHNbuQff2RAP58dJuIFJH5Bxm2_zsehWiDQqbYOHL-JWSfKnh6p8LlmJ2boi3afiSzH1EmqRCSZEKBlbpDfOcGPu60sW_cDoomWGIiWXD3-Xd6wnbduyLBpTLyOqs9cn56LjuwOed-t2206RAerZGBjR1OSvZ566bkBq7EfeI5sMo"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "absolute inset-0 bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center",
                children: /*#__PURE__*/_jsxDEV("div", {
                  className: "w-6 h-6 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center text-primary shadow-sm",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[14px]",
                    style: {
                      fontVariationSettings: `'FILL' 1`
                    },
                    children: "play_arrow"
                  }, void 0, false)
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "absolute bottom-1 right-1 px-1 rounded bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface font-label-sm text-[9px] leading-none py-0.5",
                children: "01:24"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
              className: "relative shrink-0 w-20 h-20 rounded-2xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md shadow-sm p-2 flex flex-col justify-between hover:opacity-90 cursor-pointer",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[16px] text-secondary",
                  children: "mic"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-[10px] text-on-surface dark:text-on-surface-variant font-medium",
                  children: "Voice"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-end gap-0.5 h-6 px-1",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "w-1 bg-secondary rounded-full h-2"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "w-1 bg-secondary rounded-full h-5"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "w-1 bg-secondary rounded-full h-3"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "w-1 bg-secondary rounded-full h-6"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "w-1 bg-secondary rounded-full h-4"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "w-1 bg-secondary rounded-full h-2"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-[10px] text-on-surface dark:text-on-surface-variant truncate",
                children: "03:45"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "shrink-0 w-20 h-20 rounded-2xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors flex flex-col items-center justify-center gap-1 text-primary shadow-sm",
              variant: "primary",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "w-7 h-7 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center text-primary",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[18px]",
                  children: "add"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-[11px] font-semibold text-on-surface ",
                children: "Add File"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
          className: "w-full",
          children: /*#__PURE__*/_jsxDEV(GlassCard, {
            className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl rounded-2xl p-space-md shadow-sm flex flex-col gap-space-sm",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-2 min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-7 h-7 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center text-secondary shrink-0",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[16px]",
                    style: {
                      fontVariationSettings: `'FILL' 1`
                    },
                    children: "videocam"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-col min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("p", {
                    className: "font-headline-sm text-body-lg text-on-surface truncate",
                    children: "Garden_Mindfulness_Walk.mp4"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant",
                    children: "4K 60fps • HEVC • 42.1 MB"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-secondary bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 px-2 py-0.5 rounded-full font-medium shrink-0",
                children: "Video 01:24"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "relative w-full h-40 rounded-xl overflow-hidden shadow-inner bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0",
              children: [/*#__PURE__*/_jsxDEV("img", {
                className: "w-full h-full object-cover",
                "data-alt": "Sunlit courtyard garden pathway with delicate water fountain and morning mist, peaceful cinematic composition, realistic natural colors",
                src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDF4iVjImaQ-lWY7UKEhR1XdY4taUIBmT84bdq4CSJHy618TeN55KK_ljEAWAKT_KgSx7jjd5oKzqEvbXyF2G5Is3aW067HNHcUI524shmkbRpi4QdK7-Pue2O-vcpUK0eVTK35sfroP0-QrzppYL9xbeYHGtoHnBldOYPlN6ALVFRr3nAH_BBwPK3nez9R3IJ67eB9VTcbsd9o7TrENZppCUrT8YAOD0Yw5WB_OlSYrztBI5n965I"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "absolute inset-0 bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-[1px] flex flex-col justify-between p-3",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex justify-end",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "px-2 py-0.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md font-label-sm text-label-sm text-on-surface font-semibold flex items-center gap-1",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "w-2 h-2 rounded-full bg-error animate-pulse"
                    }, void 0, false), "Live Buffer"]
                  }, void 0, true)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "self-center",
                  children: /*#__PURE__*/_jsxDEV(LiquidButton, {
                    "aria-label": "Play video preview",
                    className: "w-13 h-13 p-3 rounded-full bg-gradient-to-tr from-primary via-primary-container to-secondary text-on-primary shadow-[0_8px_20px_rgba(79,107,255,0.45)] flex items-center justify-center transform active:scale-95 transition-transform",
                    variant: "primary",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[28px]",
                      style: {
                        fontVariationSettings: `'FILL' 1`
                      },
                      children: "play_arrow"
                    }, void 0, false)
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-col gap-1 w-full",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "w-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 h-1.5 rounded-full overflow-hidden flex items-center",
                    children: /*#__PURE__*/_jsxDEV("div", {
                      className: "bg-gradient-to-r from-secondary via-primary-container to-primary h-full w-[45%] rounded-full relative"
                    }, void 0, false)
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center justify-between text-on-surface font-label-sm text-label-sm drop-shadow",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      children: "00:38"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                      className: "flex items-center gap-2",
                      children: [/*#__PURE__*/_jsxDEV("span", {
                        className: "material-symbols-outlined text-[16px]",
                        children: "volume_up"
                      }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                        children: "01:24"
                      }, void 0, false)]
                    }, void 0, true)]
                  }, void 0, true)]
                }, void 0, true)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true)
        }, void 0, false), /*#__PURE__*/_jsxDEV("section", {
          className: "w-full",
          children: /*#__PURE__*/_jsxDEV(GlassCard, {
            className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("h2", {
                className: "font-headline-sm text-headline-sm text-on-surface ",
                children: "Asset Properties"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant flex items-center gap-1",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[14px]",
                  children: "lock_open"
                }, void 0, false), "Read & Write"]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "grid grid-cols-2 gap-space-sm",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 p-space-sm rounded-xl flex flex-col gap-0.5",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant",
                  children: "Resolution"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-md text-label-md text-on-surface font-semibold",
                  children: "3840 × 2160 (4K)"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 p-space-sm rounded-xl flex flex-col gap-0.5",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant",
                  children: "File Size"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-md text-label-md text-on-surface font-semibold",
                  children: "3.2 MB (JPEG)"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 p-space-sm rounded-xl flex flex-col gap-0.5",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant",
                  children: "Color Space"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-md text-label-md text-on-surface font-semibold",
                  children: "Display P3 Wide"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 p-space-sm rounded-xl flex flex-col gap-0.5",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant",
                  children: "Storage State"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-md text-label-md text-secondary font-semibold flex items-center gap-1",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[14px]",
                    children: "cloud_done"
                  }, void 0, false), "Encrypted & Cached"]
                }, void 0, true)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col gap-space-xs",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between",
                children: [/*#__PURE__*/_jsxDEV("label", {
                  className: "font-label-md text-label-md text-on-surface font-medium",
                  htmlFor: "media-caption",
                  children: "Attachment Caption"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-outline",
                  children: "98 / 250"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "relative",
                children: [/*#__PURE__*/_jsxDEV("textarea", {
                  className: "w-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface placeholder:text-outline font-body-md text-body-md p-space-md rounded-xl resize-none focus:outline-none focus:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
                  id: "media-caption",
                  rows: "3",
                  children: "Captured immediately after morning Fajr prayer while meditating on the courtyard terrace."
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "absolute bottom-2.5 right-2.5 flex items-center gap-1 text-on-surface dark:text-on-surface-variant",
                  children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                    className: "w-6 h-6 rounded-full hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center transition-colors",
                    title: "Speech to text",
                    variant: "subtle",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[15px]",
                      children: "mic"
                    }, void 0, false)
                  }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                    className: "w-6 h-6 rounded-full hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center transition-colors",
                    title: "Tag location",
                    variant: "subtle",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[15px]",
                      children: "location_on"
                    }, void 0, false)
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col gap-space-xs pt-space-xs",
              children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "w-full py-3 px-space-md rounded-xl bg-gradient-to-r from-primary via-primary-container to-secondary text-on-primary font-headline-sm text-headline-sm flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(42,73,223,0.3)] active:scale-[0.99] transition-transform",
                variant: "primary",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  children: "Save Media Changes"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[18px]",
                  children: "arrow_forward"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "w-full py-2.5 px-space-md rounded-xl bg-error-container/40 hover:bg-error-container/60 text-error font-label-md text-label-md flex items-center justify-center gap-1.5 transition-colors",
                variant: "none",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[18px]",
                  children: "delete_outline"
                }, void 0, false), "Remove Attachment from Note"]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true)
        }, void 0, false)]
      }, void 0, true)
    }, void 0, false)]
  }, void 0, true);
};
export default NoteMediaViewer;