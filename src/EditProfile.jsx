import GlassInput from "./components/ui/GlassInput";
import GlassCard from "./components/ui/GlassCard";
import AppShell from "./components/ui/AppShell";
import React, { useState, useEffect } from 'react';
import LiquidButton from './components/ui/LiquidButton';
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "react/jsx-dev-runtime";
const EditProfile = ({
  setActiveTab
}) => {
  const [fullName, setFullName] = useState("Aisha Rahmani");
  const [cityCountry, setCityCountry] = useState("Kabul, Afghanistan");
  const [currency, setCurrency] = useState("AFN / ؋ (Afghan Afghani)");
  const [timezone, setTimezone] = useState("Asia/Kabul (UTC+4:30)");
  const [calendarSync, setCalendarSync] = useState(true);
  const [syncStatus, setSyncStatus] = useState("Sync Now");
  const [saveStatus, setSaveStatus] = useState("idle");
  const handleSync = () => {
    if (syncStatus !== "Sync Now") return;
    setSyncStatus("Syncing...");
    setTimeout(() => {
      setSyncStatus("Synced!");
      setTimeout(() => {
        setSyncStatus("Sync Now");
      }, 1800);
    }, 900);
  };
  const handleSave = () => {
    if (saveStatus !== "idle") return;
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => {
        setSaveStatus("idle");
        setActiveTab('settings'); // Go back to settings profile
      }, 1200);
    }, 1000);
  };
  return /*#__PURE__*/_jsxDEV("div", {
    className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none text-on-surface font-body-md text-body-md flex flex-col min-h-screen",
    children: [/*#__PURE__*/_jsxDEV("header", {
      className: "fixed top-0 w-full z-50 pt-safe bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.4)]",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "h-16 px-gutter-mobile flex items-center justify-between",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-sm",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            variant: "icon",
            "aria-label": "Go back",
            className: "w-11 h-11 -ml-2 rounded-full flex items-center justify-center text-on-surface hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none transition-colors",
            onClick: () => setActiveTab('settings'),
            type: "button",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[22px]",
              children: "arrow_back_ios_new"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("h1", {
            className: "font-headline-sm text-headline-sm text-on-surface tracking-tight truncate max-w-[220px]",
            children: "Edit Profile — Dark Mode"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-xs",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            "aria-label": "Actions",
            className: "w-11 h-11 rounded-full flex items-center justify-center text-on-surface dark:text-on-surface-variant hover:text-on-surface transition-colors",
            variant: "icon",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[22px]",
              children: "more_vert"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "w-8 h-8 rounded-full bg-primary flex items-center justify-center",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-on-primary text-[18px]",
              children: "person"
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false), /*#__PURE__*/_jsxDEV("main", {
      className: "flex-1 flex flex-col relative w-full pt-16 bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none mt-4",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "flex flex-col w-full px-gutter-mobile pb-12 space-y-space-lg",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "relative w-full",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "relative flex flex-col items-center pt-space-md text-center",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "relative group cursor-pointer",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "w-28 h-28 rounded-full overflow-hidden shadow-2xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 p-1",
                children: /*#__PURE__*/_jsxDEV("img", {
                  alt: "Close-up portrait of Aisha Rahmani",
                  className: "w-full h-full rounded-full object-cover",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGv0lffCqBW09AUzViM7JqUS2AoatHcpLEBbLUq3__LMFtkf_jQDVuF5I72TbCTWwRcuw3OpuZf9RIzkrkJwB963HD2UL0xxR1snKbg0bEFMpeYPOF6nBF4X7nea5bBe5cIuDR6eAUFfGx18M8qpkLa3FUdh9E8SmekwyAIQZQSVsbfB2x_xB8AOkTewo8H4_bj8pf1vzZq3aW_YczzkvjEJJNYDpoovW1pshwSUeFEjJTkDaOCAw"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                "aria-label": "Upload new profile picture",
                className: "absolute bottom-0 right-0 w-9 h-9 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-lg active:scale-95 transition-transform",
                type: "button",
                variant: "icon",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[19px]",
                  children: "photo_camera"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-sm mt-space-md",
              children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "h-9 px-space-md rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none text-on-surface font-label-lg text-label-lg flex items-center gap-space-xs transition-colors shadow-sm",
                type: "button",
                variant: "subtle",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[17px] text-primary",
                  children: "edit"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  children: "Change Photo"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "h-9 px-space-md rounded-full bg-error-container/30 hover:bg-error-container/50 text-error font-label-lg text-label-lg flex items-center gap-space-xs transition-colors",
                type: "button",
                variant: "subtle",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[17px]",
                  children: "delete"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  children: "Remove"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
              className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant mt-space-xs tracking-wider",
              children: "PNG, JPG or WEBP • Max 5MB"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
          className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 rounded-xl p-space-md shadow-md space-y-space-md",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-xs",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-primary text-[20px]",
                children: "badge"
              }, void 0, false), /*#__PURE__*/_jsxDEV("h2", {
                className: "font-headline-sm text-headline-sm text-on-surface ",
                children: "Identity & Account"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
              className: "px-space-sm py-0.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider",
              children: "Standard"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "space-y-space-sm",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "space-y-1",
              children: [/*#__PURE__*/_jsxDEV("label", {
                className: "block font-label-lg text-label-lg text-on-surface dark:text-on-surface-variant",
                htmlFor: "full-name",
                children: "Full Name"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "relative flex items-center rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 shadow-inner",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined absolute left-3 text-on-surface dark:text-on-surface-variant text-[20px]",
                  children: "person"
                }, void 0, false), /*#__PURE__*/_jsxDEV(GlassInput, {
                  className: "w-full h-11 pl-10 pr-3 bg-transparent text-on-surface font-body-md text-body-md focus:outline-none",
                  id: "full-name",
                  type: "text",
                  value: fullName,
                  onChange: e => setFullName(e.target.value)
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "space-y-1",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between",
                children: [/*#__PURE__*/_jsxDEV("label", {
                  className: "block font-label-lg text-label-lg text-on-surface dark:text-on-surface-variant",
                  htmlFor: "email",
                  children: "Email Address"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary bg-secondary/10 px-2 py-0.5 rounded-full",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[13px]",
                    style: {
                      fontVariationSettings: "'FILL' 1"
                    },
                    children: "verified"
                  }, void 0, false), "Verified"]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "relative flex items-center rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 shadow-inner",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined absolute left-3 text-on-surface dark:text-on-surface-variant text-[20px]",
                  children: "mail"
                }, void 0, false), /*#__PURE__*/_jsxDEV(GlassInput, {
                  className: "w-full h-11 pl-10 pr-20 bg-transparent text-on-surface font-body-md text-body-md focus:outline-none truncate",
                  id: "email",
                  readOnly: true,
                  type: "email",
                  value: "aisha.rahmani@example.com"
                }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "absolute right-2 px-space-sm py-1 rounded font-label-sm text-label-sm text-primary hover:text-primary-container font-semibold transition-colors",
                  type: "button",
                  variant: "primary",
                  children: "Change"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
          className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 rounded-xl p-space-md shadow-md space-y-space-md",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-xs",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-secondary text-[20px]",
                children: "public"
              }, void 0, false), /*#__PURE__*/_jsxDEV("h2", {
                className: "font-headline-sm text-headline-sm text-on-surface ",
                children: "Regional Settings"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
              className: "px-space-sm py-0.5 rounded-full bg-secondary/15 text-secondary font-label-sm text-label-sm tracking-wide",
              children: "Locale & Sync"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "space-y-space-md",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "space-y-1",
              children: [/*#__PURE__*/_jsxDEV("label", {
                className: "block font-label-lg text-label-lg text-on-surface dark:text-on-surface-variant",
                htmlFor: "currency-select",
                children: "Primary Currency"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "relative flex items-center rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 shadow-inner",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined absolute left-3 text-on-surface dark:text-on-surface-variant text-[20px]",
                  children: "payments"
                }, void 0, false), /*#__PURE__*/_jsxDEV("select", {
                  className: "w-full h-11 pl-10 pr-10 bg-transparent text-on-surface font-body-md text-body-md appearance-none focus:outline-none cursor-pointer",
                  id: "currency-select",
                  value: currency,
                  onChange: e => setCurrency(e.target.value),
                  children: [/*#__PURE__*/_jsxDEV("option", {
                    className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface ",
                    value: "AFN / ؋ (Afghan Afghani)",
                    children: "AFN / ؋ (Afghan Afghani)"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
                    className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface ",
                    value: "USD / $ (US Dollar)",
                    children: "USD / $ (US Dollar)"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
                    className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface ",
                    value: "EUR / € (Euro)",
                    children: "EUR / € (Euro)"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
                    className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface ",
                    value: "AED / د.إ (UAE Dirham)",
                    children: "AED / د.إ (UAE Dirham)"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined absolute right-3 text-on-surface dark:text-on-surface-variant pointer-events-none text-[18px]",
                  children: "unfold_more"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
                className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant/80 pl-1 pt-0.5",
                children: "All financial trackers and zakat quotas default to this currency."
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "space-y-1",
              children: [/*#__PURE__*/_jsxDEV("label", {
                className: "block font-label-lg text-label-lg text-on-surface dark:text-on-surface-variant",
                htmlFor: "timezone-select",
                children: "Timezone"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "relative flex items-center rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 shadow-inner",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined absolute left-3 text-on-surface dark:text-on-surface-variant text-[20px]",
                  children: "schedule"
                }, void 0, false), /*#__PURE__*/_jsxDEV("select", {
                  className: "w-full h-11 pl-10 pr-10 bg-transparent text-on-surface font-body-md text-body-md appearance-none focus:outline-none cursor-pointer",
                  id: "timezone-select",
                  value: timezone,
                  onChange: e => setTimezone(e.target.value),
                  children: [/*#__PURE__*/_jsxDEV("option", {
                    className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface ",
                    value: "Asia/Kabul (UTC+4:30)",
                    children: "Asia/Kabul (UTC+4:30)"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
                    className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface ",
                    value: "Asia/Dubai (UTC+4:00)",
                    children: "Asia/Dubai (UTC+4:00)"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
                    className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface ",
                    value: "Asia/Karachi (UTC+5:00)",
                    children: "Asia/Karachi (UTC+5:00)"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
                    className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface ",
                    value: "Europe/London (UTC+0:00)",
                    children: "Europe/London (UTC+0:00)"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined absolute right-3 text-on-surface dark:text-on-surface-variant pointer-events-none text-[18px]",
                  children: "unfold_more"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-1.5 pl-1 pt-1 text-on-surface dark:text-on-surface-variant",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[15px] text-secondary",
                  children: "wb_sunny"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm",
                  children: "Local Solar Noon Offset: +12m 40s"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "space-y-1",
              children: [/*#__PURE__*/_jsxDEV("label", {
                className: "block font-label-lg text-label-lg text-on-surface dark:text-on-surface-variant",
                htmlFor: "city-country",
                children: "City & Country"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "relative flex items-center rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 shadow-inner",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined absolute left-3 text-on-surface dark:text-on-surface-variant text-[20px]",
                  children: "location_on"
                }, void 0, false), /*#__PURE__*/_jsxDEV(GlassInput, {
                  className: "w-full h-11 pl-10 pr-11 bg-transparent text-on-surface font-body-md text-body-md focus:outline-none",
                  id: "city-country",
                  type: "text",
                  value: cityCountry,
                  onChange: e => setCityCountry(e.target.value)
                }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  "aria-label": "Detect GPS coordinates",
                  className: "absolute right-2 w-7 h-7 rounded flex items-center justify-center text-secondary hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
                  type: "button",
                  variant: "subtle",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[19px]",
                    children: "my_location"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "rounded-lg bg-secondary-container/15 p-space-sm flex items-start gap-space-xs",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5",
                children: "explore"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "min-w-0",
                children: [/*#__PURE__*/_jsxDEV("p", {
                  className: "font-label-lg text-label-lg text-secondary font-medium",
                  children: "Geocoded for Prayer Calculations"
                }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                  className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant mt-0.5 font-mono",
                  children: "Lat 34.5553° N, Long 69.2075° E (Elevation 1,791m)"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
          className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 rounded-xl p-space-md shadow-md space-y-space-md",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-xs",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-tertiary text-[20px]",
                children: "auto_awesome"
              }, void 0, false), /*#__PURE__*/_jsxDEV("h2", {
                className: "font-headline-sm text-headline-sm text-on-surface ",
                children: "Spiritual Routine Context"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
              className: "px-space-sm py-0.5 rounded-full bg-primary/15 text-primary font-label-sm text-label-sm",
              children: "Momentum"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "space-y-space-sm",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "space-y-1",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "block font-label-lg text-label-lg text-on-surface dark:text-on-surface-variant",
                children: "Calculation Convention"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between p-space-sm rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 cursor-pointer hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors shadow-inner",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "min-w-0 pr-space-sm",
                  children: [/*#__PURE__*/_jsxDEV("p", {
                    className: "font-label-lg text-label-lg text-on-surface truncate",
                    children: "Univ. of Islamic Sciences, Karachi"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                    className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant mt-0.5",
                    children: "Fajr: 18.0°, Isha: 18.0° (Hanafi Asr ratio: 2x shadow)"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-primary text-[20px] shrink-0",
                  children: "tune"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "space-y-1",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "block font-label-lg text-label-lg text-on-surface dark:text-on-surface-variant",
                children: "Calendar Synchronization"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between p-space-sm rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 shadow-inner",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-start gap-space-xs min-w-0 pr-space-xs",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5",
                    children: "calendar_month"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "min-w-0",
                    children: [/*#__PURE__*/_jsxDEV("p", {
                      className: "font-label-lg text-label-lg text-on-surface ",
                      children: "Hijri Shamsi (Solar Calendar)"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                      className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant mt-0.5 truncate",
                      children: "Afghan national astronomical solar reckoning"
                    }, void 0, false)]
                  }, void 0, true)]
                }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  variant: "primary",
                  "aria-label": "Toggle Calendar Synchronization",
                  className: `relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors focus:outline-none ${calendarSync ? 'bg-primary' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none'}`,
                  onClick: () => setCalendarSync(!calendarSync),
                  type: "button",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: `inline-block h-5 w-5 transform rounded-full shadow-sm transition-transform duration-200 mt-0.5 ml-0.5 ${calendarSync ? 'bg-on-primary-container translate-x-5' : 'bg-on-surface-variant translate-x-0'}`
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center justify-between p-space-sm rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 shadow-sm",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-space-xs min-w-0",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-primary text-[20px] shrink-0",
              children: "cloud_done"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "min-w-0",
              children: [/*#__PURE__*/_jsxDEV("p", {
                className: "font-label-lg text-label-lg text-on-surface truncate",
                children: "Cloud Sync Encrypted"
              }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant",
                children: "Last backed up 3 minutes ago"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
            className: `text-primary hover:text-primary-container font-label-sm text-label-sm font-semibold shrink-0 pl-space-sm transition-colors ${syncStatus === 'Syncing...' ? 'opacity-70' : ''}`,
            onClick: handleSync,
            type: "button",
            variant: "primary",
            children: syncStatus
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex flex-col items-center gap-space-xs pt-space-xs",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            className: "w-full h-12 rounded-xl bg-gradient-to-r from-primary-container via-primary to-secondary text-surface-container-lowest font-headline-sm text-headline-sm font-semibold flex items-center justify-center gap-space-xs shadow-lg active:scale-[0.99] transition-transform",
            onClick: handleSave,
            type: "button",
            variant: "primary",
            children: [saveStatus === "idle" && /*#__PURE__*/_jsxDEV(_Fragment, {
              children: [/*#__PURE__*/_jsxDEV("span", {
                children: "Save Changes"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[20px]",
                children: "arrow_forward"
              }, void 0, false)]
            }, void 0, true), saveStatus === "saving" && /*#__PURE__*/_jsxDEV(_Fragment, {
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined animate-spin text-[20px]",
                children: "progress_activity"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                children: "Updating Nocturne Profile..."
              }, void 0, false)]
            }, void 0, true), saveStatus === "saved" && /*#__PURE__*/_jsxDEV(_Fragment, {
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[20px]",
                children: "check_circle"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                children: "Changes Saved"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
            variant: "none",
            className: "w-full h-10 rounded-lg text-on-surface dark:text-on-surface-variant hover:text-on-surface font-label-lg text-label-lg transition-colors flex items-center justify-center",
            onClick: () => setActiveTab('settings'),
            type: "button",
            children: "Discard Changes"
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false)]
  }, void 0, true);
};
export default EditProfile;