import LiquidButton from './components/ui/LiquidButton';
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
export default function AboutMomentum({
  setActiveTab
}) {
  return /*#__PURE__*/_jsxDEV("div", {
    className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none font-body-md text-on-surface antialiased flex flex-col min-h-screen selection:bg-primary-container selection:text-on-primary-container",
    children: [/*#__PURE__*/_jsxDEV("header", {
      className: "fixed top-0 inset-x-0 z-50 bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "h-16 px-gutter-mobile flex items-center justify-between relative",
        children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
          variant: "icon",
          "aria-label": "Go back",
          className: "-ml-space-xs !bg-transparent",
          onClick: () => setActiveTab('settings'),
          children: /*#__PURE__*/_jsxDEV("span", {
            className: "material-symbols-outlined text-[22px]",
            children: "arrow_back_ios_new"
          }, void 0, false)
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "absolute inset-x-16 flex items-center justify-center pointer-events-none",
          children: /*#__PURE__*/_jsxDEV("h1", {
            className: "font-headline-sm text-headline-sm text-on-surface tracking-tight truncate select-none",
            children: "Account Settings"
          }, void 0, false)
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-xs",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            variant: "icon",
            "aria-label": "More options",
            className: "!bg-transparent",
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
        className: "flex flex-col w-full pb-12 select-none overflow-hidden relative",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-primary-container/10 blur-[100px] pointer-events-none -z-10"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "absolute top-[480px] right-0 w-64 h-64 rounded-full bg-secondary-container/10 blur-[90px] pointer-events-none -z-10"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "absolute bottom-20 left-0 w-72 h-72 rounded-full bg-tertiary-container/10 blur-[110px] pointer-events-none -z-10"
        }, void 0, false), /*#__PURE__*/_jsxDEV("section", {
          className: "flex flex-col items-center text-center px-gutter-mobile pt-6 pb-8 relative",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "relative group cursor-pointer my-2",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "absolute -inset-1.5 rounded-full bg-gradient-to-tr from-primary via-tertiary to-secondary opacity-40 blur-lg group-hover:opacity-75 transition-opacity duration-700"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "relative w-24 h-24 rounded-full bg-gradient-to-br from-primary-container via-tertiary-container to-inverse-primary p-0.5 flex items-center justify-center shadow-2xl shadow-primary-container/20 active:scale-95 transition-transform duration-300",
              children: /*#__PURE__*/_jsxDEV("div", {
                className: "w-full h-full rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md flex items-center justify-center",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "font-headline-lg text-primary text-4xl leading-none select-none tracking-tighter",
                  children: "∞"
                }, void 0, false)
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center shadow-md",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[14px] text-secondary",
                style: {
                  fontVariationSettings: "'FILL' 1"
                },
                children: "arrow_back_ios_new"
              }, void 0, false)
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("h2", {
            className: "font-display-hero-mobile text-display-hero-mobile text-on-surface tracking-tight mt-3",
            children: "Momentum"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "w-fit mx-auto mt-2 px-4 py-1.5 rounded-full bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-sm",
            children: /*#__PURE__*/_jsxDEV("p", {
              className: "text-center text-sm leading-relaxed text-slate-900 dark:text-slate-100 font-medium",
              children: "Where sacred time meets mindful living."
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "inline-flex items-center gap-2 mt-4 px-3.5 py-1.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 shadow-sm",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant uppercase tracking-wider",
              children: "Version 1.0"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
          className: "px-gutter-mobile mb-6",
          children: /*#__PURE__*/_jsxDEV("div", {
            className: "relative overflow-hidden rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 p-5 shadow-lg backdrop-blur-xl",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full pointer-events-none"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-start gap-3.5 relative z-10",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "w-10 h-10 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center shrink-0 shadow-sm",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-tertiary text-[22px]",
                  style: {
                    fontVariationSettings: "'FILL' 1"
                  },
                  children: "explore"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col min-w-0",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-tertiary tracking-widest uppercase",
                  children: "Vision & Craft"
                }, void 0, false), /*#__PURE__*/_jsxDEV("h3", {
                  className: "font-headline-sm text-headline-sm text-on-surface mt-0.5",
                  children: "Created by Milad Wardak"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
              className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant mt-3 leading-relaxed relative z-10",
              children: "Crafted with care to merge Islamic values with modern, mindful design."
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "mt-4 pt-3 flex items-center gap-2",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface font-label-sm text-label-sm",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[13px] text-primary",
                  children: "verified"
                }, void 0, false), "2026"]
              }, void 0, true)
            }, void 0, false)]
          }, void 0, true)
        }, void 0, false), /*#__PURE__*/_jsxDEV("section", {
          className: "px-gutter-mobile mb-6",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "w-fit text-left flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-sm",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "w-1.5 h-1.5 rounded-full bg-primary"
            }, void 0, false), /*#__PURE__*/_jsxDEV("h3", {
              className: "font-label-md text-label-md text-slate-900 dark:text-slate-100 uppercase tracking-widest font-semibold",
              children: "Core Philosophy"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col gap-3",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "p-4 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 shadow-sm hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors duration-200",
              children: /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-start gap-3.5",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-9 h-9 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center shrink-0",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-secondary text-[20px]",
                    children: "calendar_month"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-col min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("h4", {
                    className: "font-headline-sm text-headline-sm text-on-surface ",
                    children: "Tri-Calendar Harmony"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant mt-1 leading-relaxed",
                    children: "Effortlessly aligning Gregorian, Hijri, and Solar calendars in one place."
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true)
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "p-4 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 shadow-sm hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors duration-200",
              children: /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-start gap-3.5",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-9 h-9 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center shrink-0",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-primary text-[20px]",
                    children: "enhanced_encryption"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-col min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("h4", {
                    className: "font-headline-sm text-headline-sm text-on-surface ",
                    children: "Private Local Sanctuary"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant mt-1 leading-relaxed",
                    children: "Your sacred journals, financial records, and personal habit data are stored locally and privately on your device. No trackers, no data monetization."
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true)
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "p-4 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 shadow-sm hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors duration-200",
              children: /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-start gap-3.5",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-9 h-9 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center shrink-0",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-tertiary text-[20px]",
                    children: "wb_twilight"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-col min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("h4", {
                    className: "font-headline-sm text-headline-sm text-on-surface ",
                    children: "Atmospheric Presence"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant mt-1 leading-relaxed",
                    children: "Dynamic light and dark canvases calibrated to soothe your senses and respect your circadian flow."
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true)
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
          className: "px-gutter-mobile mb-6",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-2 px-1 mb-3",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "w-1.5 h-1.5 rounded-full bg-secondary"
            }, void 0, false), /*#__PURE__*/_jsxDEV("h3", {
              className: "font-label-md text-label-md text-on-surface dark:text-on-surface-variant uppercase tracking-widest",
              children: "Open Source & Craft"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 overflow-hidden shadow-sm",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between p-3.5 px-4 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-3",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-8 h-8 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-on-surface dark:text-on-surface-variant text-[18px]",
                    children: "font_download"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-md text-body-md text-on-surface ",
                  children: "Typography"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-primary px-2.5 py-1 rounded bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0",
                children: "Inter & Space Grotesk"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-[1px] bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 mx-4"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between p-3.5 px-4 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-3",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-8 h-8 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-on-surface dark:text-on-surface-variant text-[18px]",
                    children: "public"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-md text-body-md text-on-surface ",
                  children: "Astronomical Engine"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-secondary px-2.5 py-1 rounded bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0",
                children: "PrayTimes & Umm al-Qura"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-[1px] bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 mx-4"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between p-3.5 px-4 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-3",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-8 h-8 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-on-surface dark:text-on-surface-variant text-[18px]",
                    children: "palette"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-md text-body-md text-on-surface ",
                  children: "Design System"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-tertiary px-2.5 py-1 rounded bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0",
                children: "Luminous Serenity Nocturne"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
          className: "px-gutter-mobile mb-8",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-2 px-1 mb-3",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "w-1.5 h-1.5 rounded-full bg-tertiary"
            }, void 0, false), /*#__PURE__*/_jsxDEV("h3", {
              className: "font-label-md text-label-md text-on-surface dark:text-on-surface-variant uppercase tracking-widest",
              children: "Sanctuary & Trust"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 overflow-hidden shadow-sm flex flex-col",
            children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "w-full flex items-center justify-between p-3.5 px-4 text-left hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 active:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors group",
              type: "button",
              variant: "none",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-3 min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-8 h-8 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center text-primary group-hover:scale-105 transition-transform",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[18px]",
                    children: "shield"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-md text-body-md text-on-surface truncate",
                  children: "Privacy Sanctuary (Zero Data Tracking)"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-on-surface dark:text-on-surface-variant text-[18px] group-hover:translate-x-0.5 transition-transform shrink-0 ml-2",
                children: "chevron_right"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-[1px] bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 mx-4"
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "w-full flex items-center justify-between p-3.5 px-4 text-left hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 active:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors group",
              type: "button",
              variant: "none",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-3 min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-8 h-8 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center text-secondary group-hover:scale-105 transition-transform",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[18px]",
                    children: "description"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-md text-body-md text-on-surface truncate",
                  children: "Terms of Grace"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-on-surface dark:text-on-surface-variant text-[18px] group-hover:translate-x-0.5 transition-transform shrink-0 ml-2",
                children: "chevron_right"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-[1px] bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 mx-4"
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "w-full flex items-center justify-between p-3.5 px-4 text-left hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 active:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors group",
              type: "button",
              variant: "none",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-3 min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-8 h-8 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center text-tertiary group-hover:scale-105 transition-transform",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[18px]",
                    children: "code_blocks"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-md text-body-md text-on-surface truncate",
                  children: "Open Source Attributions"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-on-surface dark:text-on-surface-variant text-[18px] group-hover:translate-x-0.5 transition-transform shrink-0 ml-2",
                children: "chevron_right"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-[1px] bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 mx-4"
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "w-full flex items-center justify-between p-3.5 px-4 text-left hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 active:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors group",
              type: "button",
              variant: "none",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-3 min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-8 h-8 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center text-on-surface dark:text-on-surface-variant group-hover:text-primary group-hover:scale-105 transition-all",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[18px]",
                    children: "share"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-md text-body-md text-on-surface truncate",
                  children: "Share Momentum with Friends"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-on-surface dark:text-on-surface-variant text-[18px] group-hover:translate-x-0.5 transition-transform shrink-0 ml-2",
                children: "chevron_right"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-[1px] bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 mx-4"
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "w-full flex items-center justify-between p-3.5 px-4 text-left hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 active:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors group",
              type: "button",
              variant: "none",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-3 min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-8 h-8 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center text-error group-hover:scale-105 transition-transform",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[18px]",
                    style: {
                      fontVariationSettings: "'FILL' 1"
                    },
                    children: "favorite"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-md text-body-md text-on-surface truncate",
                  children: "Send Mindful Feedback"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-on-surface dark:text-on-surface-variant text-[18px] group-hover:translate-x-0.5 transition-transform shrink-0 ml-2",
                children: "chevron_right"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("footer", {
          className: "flex flex-col items-center text-center px-gutter-mobile mt-auto pt-4",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-center gap-2 mb-2 text-primary/70",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[18px]",
              children: "spa"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm tracking-widest text-on-surface dark:text-on-surface-variant uppercase font-semibold",
              children: "Mindful Focus"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[18px]",
              children: "spa"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
            className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant italic max-w-xs",
            children: "“Crafted with peace for intentional minds everywhere.”"
          }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
            className: "font-label-sm text-label-sm text-outline mt-3",
            children: "© 2026 Momentum App • All Rights Reserved."
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false)]
  }, void 0, true);
}