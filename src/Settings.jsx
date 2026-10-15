import GlassInput from "./components/ui/GlassInput";
import GlassCard from "./components/ui/GlassCard";
import AppShell from "./components/ui/AppShell";
import React, { useState, useEffect } from 'react';
import LiquidButton from './components/ui/LiquidButton';
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
export default function Settings({
  setActiveTab
}) {
  const [themeMode, setThemeMode] = useState('dark');
  const [notifyPrayer, setNotifyPrayer] = useState(true);
  const [notifyAgenda, setNotifyAgenda] = useState(true);
  const [notifyReflections, setNotifyReflections] = useState(true);
  const [notifyRadiance, setNotifyRadiance] = useState(true);
  return /*#__PURE__*/_jsxDEV("div", {
    className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none text-on-surface font-body-md text-body-md flex flex-col min-h-screen",
    children: [/*#__PURE__*/_jsxDEV("header", {
      className: "fixed top-0 w-full z-50 pt-safe bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.4)]",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "h-16 px-gutter-mobile flex items-center justify-between",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-sm",
          children: /*#__PURE__*/_jsxDEV("h1", {
            className: "font-headline-sm text-headline-sm text-on-surface tracking-tight",
            children: "Settings & Profile — Dark Mode"
          }, void 0, false)
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-sm",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            "aria-label": "Notifications",
            className: "relative w-11 h-11 rounded-full flex items-center justify-center text-on-surface dark:text-on-surface-variant hover:text-on-surface transition-colors",
            variant: "icon",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[24px]",
              children: "notifications"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(76,215,246,0.8)]"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "w-8 h-8 rounded-full bg-primary flex items-center justify-center",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-on-primary text-[18px]",
              children: "person"
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false), /*#__PURE__*/_jsxDEV("main", {
      className: "flex-1 flex flex-col relative w-full pt-16 pb-32 bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "flex flex-col w-full px-gutter-mobile space-y-space-lg",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "relative w-full rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 shadow-[0_8px_32px_rgba(0,0,0,0.5)] p-space-lg flex flex-col items-center text-center overflow-hidden",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "absolute -top-16 -right-16 w-44 h-44 rounded-full bg-primary/10 blur-3xl pointer-events-none"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-secondary/10 blur-3xl pointer-events-none"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "relative mb-space-md",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "w-24 h-24 rounded-full overflow-hidden shadow-[0_0_24px_rgba(192,193,255,0.2)]",
              children: /*#__PURE__*/_jsxDEV("img", {
                className: "w-full h-full object-cover",
                "data-alt": "Photorealistic portrait of Aisha Rahmani, an Afghan woman wearing an elegant dark navy silk hijab, soft ambient warm rim lighting, serene contemplative expression, dark cinematic studio atmosphere with violet and cyan undertones.",
                src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAFGnfttLlCNXQBWFml99XqbvK-FzOWdco3PvTnTiU_RDDp5SINQ7CwdWzSNre-YjLTKgaT821bt8cNPUE9SCE7vsOHu1vgU9TcD69fLB8IElASwSmkyDC1iD_-YIbNzZ9O8Jz_4vVixTCa9a2EczCT6_kz0v3v-mdB0td-N2qK_hnBIBqDtDDBqdd_GwYm6GhufQFL_1tLH7swVU3kTjUUybnyGibPwGynIYSpnqs_L9VbOajCEk",
                alt: "Profile"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              "aria-label": "Edit Profile Photo",
              className: "absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-[0_2px_12px_rgba(128,131,255,0.6)] active:scale-95 transition-transform",
              variant: "primary",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[16px]",
                children: "photo_camera"
              }, void 0, false)
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-center gap-space-xs mb-1",
            children: [/*#__PURE__*/_jsxDEV("h2", {
              className: "font-headline-sm text-headline-sm text-on-surface ",
              children: "Aisha Rahmani"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-secondary text-[20px]",
              style: {
                fontVariationSettings: "'FILL' 1"
              },
              children: "verified"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
            className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant mb-space-md",
            children: "Living intentionally • Kabul, Afghanistan"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-space-sm mb-space-lg flex-wrap justify-center",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface ",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-primary uppercase",
                children: "Currency"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md font-semibold",
                children: "AFN (؋)"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface ",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[14px] text-secondary",
                children: "schedule"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md",
                children: "Asia/Kabul (UTC+4:30)"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("a", {
            className: "w-full rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 p-space-md flex items-center justify-between text-left hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 active:scale-[0.99] transition-all",
            href: "#",
            onClick: e => e.preventDefault(),
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-md",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[20px]",
                  children: "badge"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                children: [/*#__PURE__*/_jsxDEV("p", {
                  className: "font-label-lg text-label-lg text-on-surface ",
                  children: "Account & Personal Credentials"
                }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                  children: "Profile info, key recovery, personal IDs"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-0.5 text-primary font-label-md text-label-md font-medium",
              children: [/*#__PURE__*/_jsxDEV("span", {
                children: "Details"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px]",
                children: "chevron_right"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
          className: "space-y-space-sm",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between px-1",
            children: [/*#__PURE__*/_jsxDEV("h3", {
              className: "font-label-md text-label-md uppercase tracking-wider text-on-surface dark:text-on-surface-variant",
              children: "Regional Preferences"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "flex items-center gap-1 font-label-sm text-label-sm text-secondary bg-secondary/10 px-2 py-0.5 rounded-full",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "w-1.5 h-1.5 rounded-full bg-secondary"
              }, void 0, false), "Sync Active"]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 overflow-hidden shadow-sm",
            children: [/*#__PURE__*/_jsxDEV("a", {
              className: "flex items-center justify-between p-space-md hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
              href: "#",
              onClick: e => e.preventDefault(),
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-md min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-8 h-8 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none text-on-surface dark:text-on-surface-variant flex items-center justify-center shrink-0",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[18px]",
                    children: "id_card"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("p", {
                    className: "font-label-lg text-label-lg text-on-surface ",
                    children: "Legal Name"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                    children: "Official identity documents"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-1 shrink-0 text-on-surface dark:text-on-surface-variant ml-2",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm text-on-surface ",
                  children: "Aisha Rahmani"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[18px]",
                  children: "chevron_right"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-px bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none mx-4"
            }, void 0, false), /*#__PURE__*/_jsxDEV("a", {
              className: "flex items-center justify-between p-space-md hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
              href: "#",
              onClick: e => e.preventDefault(),
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-md min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-8 h-8 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none text-on-surface dark:text-on-surface-variant flex items-center justify-center shrink-0",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[18px]",
                    children: "payments"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("p", {
                    className: "font-label-lg text-label-lg text-on-surface ",
                    children: "Base Currency"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                    children: "Transactions & Balance"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-1 shrink-0 text-on-surface dark:text-on-surface-variant ml-2",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-md text-label-md text-primary font-medium",
                  children: "AFN (؋)"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[18px]",
                  children: "chevron_right"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-px bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none mx-4"
            }, void 0, false), /*#__PURE__*/_jsxDEV("a", {
              className: "flex items-center justify-between p-space-md hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
              href: "#",
              onClick: e => e.preventDefault(),
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-md min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-8 h-8 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none text-on-surface dark:text-on-surface-variant flex items-center justify-center shrink-0",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[18px]",
                    children: "public"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("p", {
                    className: "font-label-lg text-label-lg text-on-surface ",
                    children: "Timezone Calculation"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                    children: "Astronomical and solar times"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-1 shrink-0 text-on-surface dark:text-on-surface-variant ml-2",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm text-on-surface ",
                  children: "Asia/Kabul"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[18px]",
                  children: "chevron_right"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-px bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none mx-4"
            }, void 0, false), /*#__PURE__*/_jsxDEV("a", {
              className: "flex items-center justify-between p-space-md hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
              href: "#",
              onClick: e => e.preventDefault(),
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-md min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-8 h-8 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none text-on-surface dark:text-on-surface-variant flex items-center justify-center shrink-0",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[18px]",
                    children: "location_on"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("p", {
                    className: "font-label-lg text-label-lg text-on-surface ",
                    children: "Location & City"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                    children: "Automatic geo-positioning"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-1 shrink-0 text-on-surface dark:text-on-surface-variant ml-2",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm text-on-surface ",
                  children: "Kabul, AF"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[18px]",
                  children: "chevron_right"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
          className: "space-y-space-sm",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between px-1",
            children: [/*#__PURE__*/_jsxDEV("h3", {
              className: "font-label-md text-label-md uppercase tracking-wider text-on-surface dark:text-on-surface-variant",
              children: "Atmosphere & Visuals"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-tertiary-fixed-dim bg-tertiary/15 px-2 py-0.5 rounded-full",
              children: "Serenity v2"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 p-space-md space-y-space-md",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("div", {
                children: [/*#__PURE__*/_jsxDEV("p", {
                  className: "font-label-lg text-label-lg text-on-surface ",
                  children: "Theme Mode"
                }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                  children: "Luminous Serenity"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center p-1 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0",
                children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                  variant: "primary",
                  className: `flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors ${themeMode === 'light' ? 'bg-primary-container text-on-primary shadow-[0_0_12px_rgba(128,131,255,0.4)]' : 'text-on-surface dark:text-on-surface-variant hover:text-on-surface '}`,
                  type: "button",
                  onClick: () => setThemeMode('light'),
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[16px]",
                    children: "light_mode"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-md text-label-md",
                    children: "Light"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  variant: "primary",
                  className: `flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors ${themeMode === 'dark' ? 'bg-primary-container text-on-primary shadow-[0_0_12px_rgba(128,131,255,0.4)]' : 'text-on-surface dark:text-on-surface-variant hover:text-on-surface '}`,
                  type: "button",
                  onClick: () => setThemeMode('dark'),
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[16px]",
                    style: themeMode === 'dark' ? {
                      fontVariationSettings: "'FILL' 1"
                    } : {},
                    children: "dark_mode"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-md text-label-md",
                    children: "Dark"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-px bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between gap-space-sm",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-md min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-12 h-12 rounded-lg overflow-hidden shrink-0 shadow-sm relative",
                  children: /*#__PURE__*/_jsxDEV("img", {
                    className: "w-full h-full object-cover",
                    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvTkVG5tEmPOngRsL1XQuviLSRFpSR1JDObJF8Ms6bbllS-T_gPV9vAq1TDrp1x6UicYSjsWTyv6kDTYYyuELc15oa8B3fz8NmggMkAV7V_wdWdfnrcCkKPg4FvA4CjBJINIuelp4kUHNKP-wq7rIac5LgZlpSb1HjEAU0E3HtHpDXVB_dbOBLM5t3zcyCY__NZTY0NoVXuh6R6YgYe5bMSRKmsZAv5_2tXoEQnqcDM7XP1qRvugY",
                    alt: "Wallpaper"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("p", {
                    className: "font-label-lg text-label-lg text-on-surface truncate",
                    children: "Serene Horizon (Pair 04)"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                    children: "Medium Frosted • 16px"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "px-3 py-1.5 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none text-on-surface hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none font-label-md text-label-md shrink-0 transition-colors",
                variant: "pill",
                children: "Customize"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-px bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("div", {
                children: [/*#__PURE__*/_jsxDEV("p", {
                  className: "font-label-lg text-label-lg text-on-surface ",
                  children: "Text & Spatial Scale"
                }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                  children: "Default Inter (100%)"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface ",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-primary text-[18px]",
                  children: "tune"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-md text-label-md font-medium",
                  children: "Balanced"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
          className: "space-y-space-sm",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between px-1",
            children: [/*#__PURE__*/_jsxDEV("h3", {
              className: "font-label-md text-label-md uppercase tracking-wider text-on-surface dark:text-on-surface-variant",
              children: "Security & Sanctuary"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "flex items-center gap-1 font-label-sm text-label-sm text-secondary bg-secondary/10 px-2 py-0.5 rounded-full",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "w-1.5 h-1.5 rounded-full bg-secondary"
              }, void 0, false), "Protected"]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 p-space-md space-y-space-md",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between cursor-pointer",
              onClick: () => setActiveTab('applock'),
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-md",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-9 h-9 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none text-on-surface flex items-center justify-center",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[20px]",
                    children: "lock"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  children: [/*#__PURE__*/_jsxDEV("p", {
                    className: "font-label-lg text-label-lg text-on-surface hover:text-primary transition-colors",
                    children: "App Lock Safeguard"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                    children: "Instant on backgrounding"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-secondary px-2.5 py-1 rounded-full bg-secondary/15",
                children: "Enabled"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "grid grid-cols-2 gap-space-sm",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 p-space-md flex flex-col justify-between",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center justify-between mb-2",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[22px] text-primary",
                    children: "pin"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(192,193,255,0.8)]"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  children: [/*#__PURE__*/_jsxDEV("p", {
                    className: "font-label-md text-label-md text-on-surface ",
                    children: "4-Digit PIN"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                    children: "Configured"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 p-space-md flex flex-col justify-between cursor-pointer",
                onClick: () => setActiveTab('biometric_settings'),
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center justify-between mb-2",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[22px] text-secondary",
                    children: "fingerprint"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-secondary px-1.5 py-0.5 rounded bg-secondary/15 font-semibold hover:bg-secondary/25 transition-colors",
                    children: "Active"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  children: [/*#__PURE__*/_jsxDEV("p", {
                    className: "font-label-md text-label-md text-on-surface hover:text-secondary transition-colors",
                    children: "Biometrics"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                    children: "Touch / Face ID"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
          className: "space-y-space-sm",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between px-1",
            children: [/*#__PURE__*/_jsxDEV("h3", {
              className: "font-label-md text-label-md uppercase tracking-wider text-on-surface dark:text-on-surface-variant",
              children: "Mindful Notifications"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-primary bg-primary/10 px-2 py-0.5 rounded-full",
              children: "All Active"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 overflow-hidden",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between p-space-md",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-md min-w-0 pr-2",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-8 h-8 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none text-primary flex items-center justify-center shrink-0",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[18px]",
                    children: "mosque"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("p", {
                    className: "font-label-lg text-label-lg text-on-surface ",
                    children: "Prayer Timings (Salah)"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                    children: "5 Daily Alerts (Adhan & Silent)"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "primary",
                className: `w-12 h-6 rounded-full relative p-0.5 transition-colors shrink-0 ${notifyPrayer ? 'bg-primary-container' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none'}`,
                type: "button",
                onClick: () => setNotifyPrayer(!notifyPrayer),
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: `block w-5 h-5 rounded-full shadow-sm transition-transform ${notifyPrayer ? 'bg-white transform translate-x-6' : 'bg-outline transform translate-x-0'}`
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-px bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none mx-4"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between p-space-md",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-md min-w-0 pr-2",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-8 h-8 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none text-secondary flex items-center justify-center shrink-0",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[18px]",
                    children: "event_note"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("p", {
                    className: "font-label-lg text-label-lg text-on-surface ",
                    children: "Daily Agenda Briefing"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                    children: "Every morning at 09:00 AM"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "primary",
                className: `w-12 h-6 rounded-full relative p-0.5 transition-colors shrink-0 ${notifyAgenda ? 'bg-primary-container' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none'}`,
                type: "button",
                onClick: () => setNotifyAgenda(!notifyAgenda),
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: `block w-5 h-5 rounded-full shadow-sm transition-transform ${notifyAgenda ? 'bg-white transform translate-x-6' : 'bg-outline transform translate-x-0'}`
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-px bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none mx-4"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between p-space-md",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-md min-w-0 pr-2",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-8 h-8 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none text-tertiary flex items-center justify-center shrink-0",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[18px]",
                    children: "self_improvement"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("p", {
                    className: "font-label-lg text-label-lg text-on-surface ",
                    children: "Spiritual Reflections"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                    children: "Fajr & Evening Murāqabah"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "primary",
                className: `w-12 h-6 rounded-full relative p-0.5 transition-colors shrink-0 ${notifyReflections ? 'bg-primary-container' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none'}`,
                type: "button",
                onClick: () => setNotifyReflections(!notifyReflections),
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: `block w-5 h-5 rounded-full shadow-sm transition-transform ${notifyReflections ? 'bg-white transform translate-x-6' : 'bg-outline transform translate-x-0'}`
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-px bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none mx-4"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between p-space-md",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-md min-w-0 pr-2",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-8 h-8 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none text-primary-fixed-dim flex items-center justify-center shrink-0",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[18px]",
                    children: "lightbulb"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("p", {
                    className: "font-label-lg text-label-lg text-on-surface ",
                    children: "Daily Radiance & Wisdom"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                    children: "08:00 AM uplifting quote"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "primary",
                className: `w-12 h-6 rounded-full relative p-0.5 transition-colors shrink-0 ${notifyRadiance ? 'bg-primary-container' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none'}`,
                type: "button",
                onClick: () => setNotifyRadiance(!notifyRadiance),
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: `block w-5 h-5 rounded-full shadow-sm transition-transform ${notifyRadiance ? 'bg-white transform translate-x-6' : 'bg-outline transform translate-x-0'}`
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
          className: "space-y-space-sm",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between px-1",
            children: [/*#__PURE__*/_jsxDEV("h3", {
              className: "font-label-md text-label-md uppercase tracking-wider text-on-surface dark:text-on-surface-variant",
              children: "Data & Resilience"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "flex items-center gap-1 font-label-sm text-label-sm text-secondary bg-secondary/10 px-2 py-0.5 rounded-full",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "w-1.5 h-1.5 rounded-full bg-secondary"
              }, void 0, false), "Cloud Active"]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 overflow-hidden",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between p-space-md",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-md min-w-0 pr-2",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-8 h-8 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none text-secondary flex items-center justify-center shrink-0",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[18px]",
                    children: "sync"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("p", {
                    className: "font-label-lg text-label-lg text-on-surface ",
                    children: "Zero-Knowledge Cloud Sync"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                    children: "Last synchronized 2m ago"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "px-3 py-1.5 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none text-on-surface hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none font-label-md text-label-md shrink-0 flex items-center gap-1 transition-colors",
                variant: "pill",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[14px]",
                  children: "refresh"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  children: "Sync"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-px bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none mx-4"
            }, void 0, false), /*#__PURE__*/_jsxDEV("a", {
              className: "flex items-center justify-between p-space-md hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
              href: "#",
              onClick: e => e.preventDefault(),
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-md min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-8 h-8 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none text-on-surface dark:text-on-surface-variant flex items-center justify-center shrink-0",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[18px]",
                    children: "archive"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("p", {
                    className: "font-label-lg text-label-lg text-on-surface ",
                    children: "Encrypted Local Archive"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                    children: "Snapshot export to device storage"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-on-surface dark:text-on-surface-variant text-[18px]",
                children: "chevron_right"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-px bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none mx-4"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between p-space-md",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-md min-w-0 pr-2",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-8 h-8 rounded-lg bg-error-container/40 text-error flex items-center justify-center shrink-0",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[18px]",
                    children: "delete_sweep"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("p", {
                    className: "font-label-lg text-label-lg text-on-surface ",
                    children: "Clear Local Database"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                    children: "Erase cached logs and temporary files"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "px-3 py-1.5 rounded-lg bg-error-container/20 text-error hover:bg-error-container/40 font-label-md text-label-md shrink-0 transition-colors",
                variant: "pill",
                children: "Reset"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("footer", {
          className: "pt-space-md pb-space-lg flex flex-col items-center text-center space-y-space-md",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "w-12 h-12 rounded-2xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-primary flex items-center justify-center shadow-[0_0_20px_rgba(192,193,255,0.15)]",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[28px]",
              children: "all_inclusive"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            children: [/*#__PURE__*/_jsxDEV("h4", {
              className: "font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight",
              children: "Momentum"
            }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
              className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant mt-0.5",
              children: "Version 1.0 • Build 2026.10"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
            className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant max-w-xs leading-relaxed",
            children: "Harmonizing civil commitments, spiritual equilibrium, and natural seasonal rhythms into a single intentional flow."
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-center gap-space-md font-label-md text-label-md text-primary",
            children: [/*#__PURE__*/_jsxDEV("a", {
              className: "hover:underline",
              href: "#",
              onClick: e => e.preventDefault(),
              children: "Privacy Sanctuary"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "text-outline-variant",
              children: "•"
            }, void 0, false), /*#__PURE__*/_jsxDEV("a", {
              className: "hover:underline",
              href: "#",
              onClick: e => e.preventDefault(),
              children: "Terms of Grace"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "text-outline-variant",
              children: "•"
            }, void 0, false), /*#__PURE__*/_jsxDEV("a", {
              className: "hover:underline",
              href: "#",
              onClick: e => e.preventDefault(),
              children: "Credits"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
            className: "font-label-sm text-label-sm text-outline",
            children: "Crafted with peace for intentional minds everywhere."
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false), /*#__PURE__*/_jsxDEV("nav", {
      className: "fixed bottom-0 w-full z-50 pb-safe bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none backdrop-blur-3xl shadow-[0_-8px_32px_rgba(0,0,0,0.5)]",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "flex items-center justify-around h-16 px-space-xs",
        children: [/*#__PURE__*/_jsxDEV("a", {
          className: "flex flex-col items-center justify-center min-w-[56px] h-12 text-on-surface dark:text-on-surface-variant hover:text-on-surface transition-colors",
          href: "#",
          onClick: e => {
            e.preventDefault();
            setActiveTab('dashboard');
          },
          children: [/*#__PURE__*/_jsxDEV("span", {
            className: "material-symbols-outlined text-[24px]",
            children: "home"
          }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
            className: "font-label-sm text-label-sm mt-0.5",
            children: "Home"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("a", {
          className: "flex flex-col items-center justify-center min-w-[56px] h-12 text-on-surface dark:text-on-surface-variant hover:text-on-surface transition-colors",
          href: "#",
          onClick: e => {
            e.preventDefault();
            setActiveTab('finance');
          },
          children: [/*#__PURE__*/_jsxDEV("span", {
            className: "material-symbols-outlined text-[24px]",
            children: "account_balance_wallet"
          }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
            className: "font-label-sm text-label-sm mt-0.5",
            children: "Finance"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center justify-center min-w-[56px] h-12",
          children: /*#__PURE__*/_jsxDEV(LiquidButton, {
            "aria-label": "Create New",
            className: "w-12 h-12 -mt-4 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-[0_0_24px_rgba(128,131,255,0.6)] hover:brightness-110 active:scale-95 transition-all",
            variant: "primary",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[28px]",
              children: "add"
            }, void 0, false)
          }, void 0, false)
        }, void 0, false), /*#__PURE__*/_jsxDEV("a", {
          className: "flex flex-col items-center justify-center min-w-[56px] h-12 text-on-surface dark:text-on-surface-variant hover:text-on-surface transition-colors",
          href: "#",
          onClick: e => {
            e.preventDefault();
            setActiveTab('tasks');
          },
          children: [/*#__PURE__*/_jsxDEV("span", {
            className: "material-symbols-outlined text-[24px]",
            children: "check_circle"
          }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
            className: "font-label-sm text-label-sm mt-0.5",
            children: "Tasks"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("a", {
          "aria-current": "page",
          className: "flex flex-col items-center justify-center min-w-[56px] h-12 transition-colors text-primary shadow-[0_0_16px_rgba(192,193,255,0.35)]",
          href: "#",
          onClick: e => {
            e.preventDefault();
            setActiveTab('settings');
          },
          children: [/*#__PURE__*/_jsxDEV("span", {
            className: "material-symbols-outlined text-[24px]",
            children: "more_horiz"
          }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
            className: "font-label-sm text-label-sm mt-0.5",
            children: "More"
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false)]
  }, void 0, true);
}