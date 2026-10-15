import GlassInput from "./components/ui/GlassInput";
import GlassCard from "./components/ui/GlassCard";
import AppShell from "./components/ui/AppShell";
import React, { useState, useEffect } from 'react';
import LiquidButton from './components/ui/LiquidButton';
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
const CalendarsMain = () => {
  const [selectedDay, setSelectedDay] = useState(25);
  const days = [{
    day: 'Mon',
    date: 21,
    inactive: true
  }, {
    day: 'Tue',
    date: 22,
    inactive: true
  }, {
    day: 'Wed',
    date: 23,
    inactive: true
  }, {
    day: 'Thu',
    date: 24,
    hasEvent: true,
    inactive: true
  }, {
    day: 'Fri',
    date: 25
  }, {
    day: 'Sat',
    date: 26,
    hasEvent: true
  }, {
    day: 'Sun',
    date: 27
  }];
  return /*#__PURE__*/_jsxDEV("div", {
    className: "flex flex-col min-h-screen bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none text-on-surface font-sans overflow-x-hidden selection:bg-secondary/30 selection:text-secondary selection:backdrop-blur-sm",
    children: [/*#__PURE__*/_jsxDEV("header", {
      className: "sticky top-0 z-40 w-full pt-safe bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none backdrop-blur-3xl shadow-[0_4px_24px_rgba(0,0,0,0.40)]",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "flex items-center justify-between h-14 px-gutter-mobile",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-3",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            className: "w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 active:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
            "aria-label": "Back",
            variant: "icon",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[24px]",
              children: "arrow_back_ios_new"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("h1", {
            className: "font-title-lg text-title-lg text-on-surface font-medium truncate tracking-tight",
            children: "Calendars Matrix"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-1",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            className: "w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 active:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
            "aria-label": "Search events",
            variant: "icon",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[24px]",
              children: "search"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
            className: "w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 active:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
            "aria-label": "Filter Calendars",
            variant: "icon",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[24px]",
              children: "filter_list"
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false), /*#__PURE__*/_jsxDEV("main", {
      className: "flex-1 w-full px-gutter-mobile pt-5 pb-32 space-y-6",
      children: [/*#__PURE__*/_jsxDEV("div", {
        className: "p-5 rounded-2xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 relative overflow-hidden group shadow-lg",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "relative z-10 flex flex-col gap-4",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex justify-between items-start",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-title-md text-title-md text-on-surface font-medium",
                children: "25 October 2026"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-body-md text-body-md text-primary font-medium tracking-wide",
                children: "13 Rabi' al-Thani 1448"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-body-sm text-body-sm text-secondary font-medium tracking-wide uppercase mt-0.5",
                children: ["2 Aqrab 1405 ", /*#__PURE__*/_jsxDEV("span", {
                  className: "opacity-60 font-normal",
                  children: "| Shamsi"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "w-10 h-10 rounded-full flex items-center justify-center bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
              variant: "icon",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-primary text-[22px]",
                children: "calendar_month"
              }, void 0, false)
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "grid grid-cols-7 gap-1.5 mt-2",
            children: days.map(item => /*#__PURE__*/_jsxDEV("div", {
              onClick: () => setSelectedDay(item.date),
              className: `flex flex-col items-center justify-center py-2.5 rounded-full cursor-pointer transition-all duration-300 ${selectedDay === item.date ? 'bg-primary text-on-primary shadow-[0_0_12px_rgba(42,165,190,0.50)]' : 'hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0'}`,
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: `font-label-sm text-label-sm ${selectedDay === item.date ? 'text-on-primary/90' : item.inactive ? 'text-on-surface dark:text-on-surface-variant/60' : 'text-on-surface dark:text-on-surface-variant'} uppercase tracking-wider`,
                children: item.day
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: `font-title-md text-title-md font-bold mt-1 ${selectedDay === item.date ? 'text-on-primary' : item.inactive ? 'text-on-surface /50' : 'text-on-surface '}`,
                children: item.date
              }, void 0, false), item.hasEvent && selectedDay !== item.date && /*#__PURE__*/_jsxDEV("div", {
                className: "w-1.5 h-1.5 rounded-full bg-secondary mt-1"
              }, void 0, false), !item.hasEvent && selectedDay !== item.date && /*#__PURE__*/_jsxDEV("div", {
                className: "w-1.5 h-1.5 rounded-full bg-transparent mt-1"
              }, void 0, false), selectedDay === item.date && /*#__PURE__*/_jsxDEV("div", {
                className: "w-1.5 h-1.5 rounded-full bg-on-primary mt-1 shadow-[0_0_4px_rgba(255,255,255,0.8)]"
              }, void 0, false)]
            }, item.date, true))
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
        className: "flex flex-col gap-4",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center justify-between",
          children: [/*#__PURE__*/_jsxDEV("h2", {
            className: "font-title-sm text-title-sm text-on-surface font-semibold tracking-wide",
            children: "Tri-Calendar Agenda"
          }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
            className: "text-secondary font-label-md text-label-md font-medium hover:text-secondary-container transition-colors",
            variant: "subtle",
            children: "Filter Views"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex flex-col gap-3",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-start gap-3 p-3.5 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-all relative overflow-hidden",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "absolute left-0 top-0 bottom-0 w-1 bg-tertiary rounded-r"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "w-9 h-9 rounded-full bg-tertiary/15 flex items-center justify-center text-tertiary flex-shrink-0 mt-0.5",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px]",
                children: "dark_mode"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col flex-1 min-w-0",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-lg text-label-lg text-on-surface font-bold truncate",
                  children: "Fajr & Morning Reflection"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-tertiary font-mono",
                  children: "05:12 AM"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
                className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant mt-0.5",
                children: "Congregational prayer followed by 15-min mindfulness"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "mt-2",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "inline-block px-2 py-0.5 rounded-full bg-tertiary/15 text-tertiary font-label-sm text-label-sm font-medium",
                  children: "Islamic Spiritual • 13 Rabi' II"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-start gap-3 p-3.5 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-all relative overflow-hidden",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center text-primary flex-shrink-0 mt-0.5",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px]",
                children: "business_center"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col flex-1 min-w-0",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-lg text-label-lg text-on-surface font-bold truncate",
                  children: "Q4 Financial & Budget Review"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-primary font-mono",
                  children: "10:00 AM"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
                className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant mt-0.5",
                children: "Strategic alignment session with regional operations lead"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "mt-2",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "inline-block px-2 py-0.5 rounded-full bg-primary/15 text-primary font-label-sm text-label-sm font-medium",
                  children: "Civil Calendar • Q4 Milestone"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-start gap-3 p-3.5 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-all relative overflow-hidden",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "absolute left-0 top-0 bottom-0 w-1 bg-tertiary-container rounded-r"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "w-9 h-9 rounded-full bg-tertiary-container/20 flex items-center justify-center text-tertiary flex-shrink-0 mt-0.5",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px]",
                children: "wb_sunny"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col flex-1 min-w-0",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-lg text-label-lg text-on-surface font-bold truncate",
                  children: "Dhuhr Prayer & Pause"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-tertiary font-mono",
                  children: "01:05 PM"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
                className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant mt-0.5",
                children: "Midday spiritual stillness & hydration check"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "mt-2",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "inline-block px-2 py-0.5 rounded-full bg-tertiary/15 text-tertiary font-label-sm text-label-sm font-medium",
                  children: "Islamic Spiritual • Solar Zenith"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-start gap-3 p-3.5 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-all relative overflow-hidden",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "absolute left-0 top-0 bottom-0 w-1 bg-secondary rounded-r"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "w-9 h-9 rounded-full bg-secondary/15 flex items-center justify-center text-secondary flex-shrink-0 mt-0.5",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px]",
                children: "local_cafe"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col flex-1 min-w-0",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-lg text-label-lg text-on-surface font-bold truncate",
                  children: "Autumn Tea & Family Walk"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-secondary font-mono",
                  children: "03:30 PM"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
                className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant mt-0.5",
                children: "Outdoor gathering celebrating the onset of month of Aqrab"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "mt-2",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "inline-block px-2 py-0.5 rounded-full bg-secondary/15 text-secondary font-label-sm text-label-sm font-medium",
                  children: "Solar Shamsi • 2 Aqrab Season"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-start gap-3 p-3.5 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-all relative overflow-hidden",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "absolute left-0 top-0 bottom-0 w-1 bg-tertiary rounded-r"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "w-9 h-9 rounded-full bg-tertiary/15 flex items-center justify-center text-tertiary flex-shrink-0 mt-0.5",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px]",
                children: "auto_stories"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col flex-1 min-w-0",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-lg text-label-lg text-on-surface font-bold truncate",
                  children: "Isha Prayer & Night Reading"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-tertiary font-mono",
                  children: "07:15 PM"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
                className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant mt-0.5",
                children: "Closing cycle of the day; 20 minutes philosophical prose"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "mt-2",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "inline-block px-2 py-0.5 rounded-full bg-tertiary/15 text-tertiary font-label-sm text-label-sm font-medium",
                  children: "Islamic Spiritual • Nightfall"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true)]
      }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
        className: "p-4 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center gap-3.5 shadow-md",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-surface-container-lowest flex-shrink-0 shadow-[0_0_16px_rgba(76,215,246,0.35)]",
          children: /*#__PURE__*/_jsxDEV("span", {
            className: "material-symbols-outlined text-[20px] font-bold",
            children: "auto_awesome"
          }, void 0, false)
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "flex flex-col",
          children: [/*#__PURE__*/_jsxDEV("span", {
            className: "font-label-md text-label-md text-on-surface font-bold",
            children: "Tri-Equilibrium Synchronized"
          }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
            className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant italic mt-0.5",
            children: "“He who orders his hours in rhythm finds stillness in all seasons.”"
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)]
    }, void 0, true), /*#__PURE__*/_jsxDEV("nav", {
      className: "fixed bottom-0 w-full z-50 pb-safe bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-3xl shadow-[0_-4px_24px_rgba(0,0,0,0.40)]",
      "data-active-classes": "text-secondary font-medium",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "flex items-center justify-around h-16 px-gutter-mobile relative",
        children: [/*#__PURE__*/_jsxDEV("a", {
          className: "flex flex-col items-center justify-center min-w-[48px] h-12 text-on-surface dark:text-on-surface-variant hover:text-on-surface transition-colors",
          href: "#",
          children: [/*#__PURE__*/_jsxDEV("span", {
            className: "material-symbols-outlined",
            children: "dashboard"
          }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
            className: "font-label-sm text-label-sm mt-0.5",
            children: "Home"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("a", {
          className: "flex flex-col items-center justify-center min-w-[48px] h-12 text-on-surface dark:text-on-surface-variant hover:text-on-surface transition-colors",
          href: "#",
          children: [/*#__PURE__*/_jsxDEV("span", {
            className: "material-symbols-outlined",
            children: "account_balance_wallet"
          }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
            className: "font-label-sm text-label-sm mt-0.5",
            children: "Finance"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "relative flex items-center justify-center -top-4",
          children: /*#__PURE__*/_jsxDEV("a", {
            "aria-label": "Create Event",
            className: "w-14 h-14 rounded-full bg-gradient-to-tr from-secondary-container to-secondary flex items-center justify-center text-on-secondary-container shadow-[0_0_24px_rgba(76,215,246,0.45)] hover:scale-105 active:scale-95 transition-all",
            href: "#",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-2xl font-bold",
              children: "add"
            }, void 0, false)
          }, void 0, false)
        }, void 0, false), /*#__PURE__*/_jsxDEV("a", {
          className: "flex flex-col items-center justify-center min-w-[48px] h-12 text-on-surface dark:text-on-surface-variant hover:text-on-surface transition-colors",
          href: "#",
          children: [/*#__PURE__*/_jsxDEV("span", {
            className: "material-symbols-outlined",
            children: "check_circle"
          }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
            className: "font-label-sm text-label-sm mt-0.5",
            children: "Tasks"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("a", {
          "aria-current": "page",
          className: "flex flex-col items-center justify-center min-w-[48px] h-12 transition-colors text-secondary font-medium",
          href: "#",
          children: [/*#__PURE__*/_jsxDEV("span", {
            className: "material-symbols-outlined",
            children: "widgets"
          }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
            className: "font-label-sm text-label-sm mt-0.5",
            children: "More"
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false)]
  }, void 0, true);
};
export default CalendarsMain;