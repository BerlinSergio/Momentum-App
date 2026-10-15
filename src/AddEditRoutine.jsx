import GlassInput from "./components/ui/GlassInput";
import GlassCard from "./components/ui/GlassCard";
import AppShell from "./components/ui/AppShell";
import React, { useState, useEffect } from 'react';
import LiquidButton from './components/ui/LiquidButton';
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
const AddEditRoutine = ({
  setActiveTab
}) => {
  const [routineName, setRoutineName] = useState("Evening Reading & Quran Reflection");
  const [category, setCategory] = useState("Spiritual");
  const [duration, setDuration] = useState(25);
  const [cadence, setCadence] = useState("Custom Days");

  // 0: Sun, 1: Mon, 2: Tue, 3: Wed, 4: Thu, 5: Fri, 6: Sat
  const [activeDays, setActiveDays] = useState([0, 2, 4]);
  const [reminders, setReminders] = useState(true);
  const [note, setNote] = useState("Reflect upon Surah Al-Mulk and write 3 gratitude notes before sleep.");
  const toggleDay = dayIndex => {
    if (cadence !== 'Custom Days') setCadence('Custom Days');
    setActiveDays(prev => prev.includes(dayIndex) ? prev.filter(d => d !== dayIndex) : [...prev, dayIndex].sort());
  };
  const handleCadenceChange = type => {
    setCadence(type);
    if (type === 'Every Day') {
      setActiveDays([0, 1, 2, 3, 4, 5, 6]);
    } else if (type === 'Mon – Fri') {
      setActiveDays([1, 2, 3, 4, 5]);
    }
  };
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  return /*#__PURE__*/_jsxDEV("div", {
    className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface font-body-md text-body-md min-h-screen flex flex-col antialiased selection:bg-primary-container selection:text-on-primary-container",
    children: [/*#__PURE__*/_jsxDEV("header", {
      className: "fixed top-0 w-full z-50 pt-safe bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "h-16 px-gutter-mobile flex items-center justify-between",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-xs",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            variant: "icon",
            className: "w-11 h-11 flex items-center justify-center text-on-surface hover:text-secondary transition-colors",
            onClick: () => setActiveTab('routine'),
            type: "button",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[24px]",
              children: "arrow_back"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("h1", {
            className: "font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight",
            children: "Add / Edit Routine"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-sm",
          children: [/*#__PURE__*/_jsxDEV("span", {
            className: "font-label-sm text-label-sm text-secondary bg-secondary/10 px-space-sm py-1 rounded-full",
            children: "DRAFT"
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
      className: "flex-1 flex flex-col relative w-full pt-16 pb-safe bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 mt-4",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "flex flex-col w-full pb-8 px-gutter-mobile space-y-4",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md shadow-sm",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-space-sm min-w-0",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "w-2 h-2 rounded-full bg-secondary animate-pulse shrink-0"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-secondary tracking-wider font-semibold truncate",
              children: "ROUTINE #RT-402"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-primary/10 text-primary shrink-0",
              children: "Draft Changes"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
            "aria-label": "Delete draft routine",
            className: "w-8 h-8 rounded-lg flex items-center justify-center bg-error-container/20 text-error hover:bg-error-container/30 transition-colors shrink-0",
            type: "button",
            variant: "icon",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[18px]",
              children: "delete"
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
          className: "w-full rounded-2xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl p-5 shadow-xl flex flex-col space-y-6",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col space-y-2",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("label", {
                className: "font-label-lg text-label-lg text-on-surface font-medium",
                htmlFor: "routine-name",
                children: "Routine Name"
              }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "flex items-center gap-1 font-label-sm text-label-sm text-tertiary hover:text-tertiary-fixed transition-colors",
                type: "button",
                variant: "subtle",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[14px]",
                  children: "auto_awesome"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  children: "Smart Suggest"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "relative flex items-center",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined absolute left-3.5 text-on-surface dark:text-on-surface-variant text-[20px] pointer-events-none",
                children: "menu_book"
              }, void 0, false), /*#__PURE__*/_jsxDEV(GlassInput, {
                className: "w-full h-11 pl-11 pr-4 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 focus:shadow-[0_0_0_2px_rgba(99,102,241,0.4)] transition-all",
                id: "routine-name",
                type: "text",
                value: routineName,
                onChange: e => setRoutineName(e.target.value)
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col space-y-2.5",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "font-label-lg text-label-lg text-on-surface font-medium",
              children: "Sphere / Category"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar",
              children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "primary",
                className: `flex items-center gap-1.5 px-3.5 py-2 rounded-xl shrink-0 transition-colors ${category === 'Spiritual' ? 'bg-gradient-to-r from-primary-container to-tertiary-container text-on-primary-container shadow-md' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant hover:text-on-surface hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0'}`,
                onClick: () => setCategory('Spiritual'),
                type: "button",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[18px]",
                  children: "mosque"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-md text-label-md font-semibold",
                  children: "Spiritual"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "primary",
                className: `flex items-center gap-1.5 px-3.5 py-2 rounded-xl shrink-0 transition-colors ${category === 'Health & Fitness' ? 'bg-gradient-to-r from-primary-container to-tertiary-container text-on-primary-container shadow-md' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant hover:text-on-surface hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0'}`,
                onClick: () => setCategory('Health & Fitness'),
                type: "button",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[18px]",
                  children: "fitness_center"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-md text-label-md font-medium",
                  children: "Health & Fitness"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "primary",
                className: `flex items-center gap-1.5 px-3.5 py-2 rounded-xl shrink-0 transition-colors ${category === 'Work & Study' ? 'bg-gradient-to-r from-primary-container to-tertiary-container text-on-primary-container shadow-md' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant hover:text-on-surface hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0'}`,
                onClick: () => setCategory('Work & Study'),
                type: "button",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[18px]",
                  children: "menu_book"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-md text-label-md font-medium",
                  children: "Work & Study"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "p-4 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md flex flex-col space-y-1 shadow-sm",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-2 text-on-surface dark:text-on-surface-variant",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px] text-secondary",
                children: "schedule"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md uppercase tracking-wider font-semibold",
                children: "Target Time"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-baseline justify-between pt-1",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-display-hero-mobile text-display-hero-mobile text-on-surface font-bold tracking-tight",
                children: "08:30 PM"
              }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "w-8 h-8 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center text-on-surface dark:text-on-surface-variant hover:text-on-surface ",
                type: "button",
                variant: "icon",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[18px]",
                  children: "edit"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
              className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
              children: "Immediately after Isha prayer"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "p-4 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md flex flex-col space-y-3 shadow-sm",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-2 text-on-surface dark:text-on-surface-variant",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[18px] text-tertiary",
                  children: "timer"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-md text-label-md uppercase tracking-wider font-semibold",
                  children: "Estimated Duration"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "font-headline-sm text-headline-sm text-on-surface font-semibold",
                children: [duration, " minutes"]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "grid grid-cols-4 gap-2 pt-1",
              children: [15, 25, 45, 60].map(mins => /*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "primary",
                className: `py-2 rounded-xl text-center font-label-md text-label-md transition-colors ${duration === mins ? 'bg-gradient-to-r from-primary-container to-tertiary-container text-on-primary-container font-semibold shadow-md' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant hover:text-on-surface '}`,
                onClick: () => setDuration(mins),
                type: "button",
                children: [mins, "m"]
              }, mins, true))
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col space-y-3 pt-1",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-lg text-label-lg text-on-surface font-semibold",
                children: "Cadence & Repeat"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-tertiary font-semibold",
                children: [activeDays.length, " active days / week"]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0",
              children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "subtle",
                className: `py-2 rounded-lg font-label-sm text-label-sm text-center transition-colors ${cadence === 'Every Day' ? 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface font-semibold shadow-sm' : 'text-on-surface dark:text-on-surface-variant hover:text-on-surface '}`,
                onClick: () => handleCadenceChange('Every Day'),
                type: "button",
                children: "Every Day"
              }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "subtle",
                className: `py-2 rounded-lg font-label-sm text-label-sm text-center transition-colors ${cadence === 'Mon – Fri' ? 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface font-semibold shadow-sm' : 'text-on-surface dark:text-on-surface-variant hover:text-on-surface '}`,
                onClick: () => handleCadenceChange('Mon – Fri'),
                type: "button",
                children: "Mon – Fri"
              }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "subtle",
                className: `py-2 rounded-lg font-label-sm text-label-sm text-center transition-colors ${cadence === 'Custom Days' ? 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface font-semibold shadow-sm' : 'text-on-surface dark:text-on-surface-variant hover:text-on-surface '}`,
                onClick: () => handleCadenceChange('Custom Days'),
                type: "button",
                children: "Custom Days"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between pt-2 px-1",
              children: daysOfWeek.map((dayLabel, index) => {
                const isActive = activeDays.includes(index);
                return /*#__PURE__*/_jsxDEV(LiquidButton, {
                  variant: "primary",
                  className: `w-10 h-10 rounded-full flex flex-col items-center justify-center transition-colors ${isActive ? 'bg-gradient-to-br from-primary-container to-tertiary-container text-on-primary-container shadow-md' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0'}`,
                  onClick: () => toggleDay(index),
                  type: "button",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: `font-label-md text-label-md ${isActive ? 'font-bold leading-none' : ''}`,
                    children: dayLabel
                  }, void 0, false), isActive && /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[10px] leading-none mt-0.5",
                    children: "check"
                  }, void 0, false)]
                }, index, true);
              })
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col space-y-3 pt-2",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-lg text-label-lg text-on-surface font-semibold",
                children: "Alert & Awareness"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-secondary font-medium",
                children: "• Calming Tone"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "p-3.5 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md flex items-center justify-between shadow-sm",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-3",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-9 h-9 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[20px]",
                    children: "notifications_active"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-col",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-md text-body-md font-semibold text-on-surface leading-snug",
                    children: "Gentle Reminders"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                    children: "Notify before routine commences"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "subtle",
                "aria-label": "Toggle gentle reminders",
                className: `w-12 h-7 rounded-full p-0.5 flex items-center transition-colors shadow-inner ${reminders ? 'bg-surface-container justify-end' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 justify-start'}`,
                onClick: () => setReminders(!reminders),
                type: "button",
                children: /*#__PURE__*/_jsxDEV("div", {
                  className: "w-6 h-6 rounded-full bg-white shadow-md"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "grid grid-cols-2 gap-3 pt-1",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col space-y-1.5",
                children: [/*#__PURE__*/_jsxDEV("label", {
                  className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant",
                  children: "Notify Timing"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "relative",
                  children: [/*#__PURE__*/_jsxDEV("select", {
                    className: "w-full h-11 pl-3 pr-8 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface font-body-sm text-body-sm appearance-none focus:outline-none focus:shadow-[0_0_0_2px_rgba(99,102,241,0.4)]",
                    children: [/*#__PURE__*/_jsxDEV("option", {
                      children: "At start (08:30 PM)"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
                      children: "5 mins before"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
                      children: "10 mins before"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
                      children: "15 mins before"
                    }, void 0, false)]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined absolute right-2.5 top-3 text-on-surface dark:text-on-surface-variant text-[18px] pointer-events-none",
                    children: "expand_more"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col space-y-1.5",
                children: [/*#__PURE__*/_jsxDEV("label", {
                  className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant",
                  children: "Auditory Cue"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "relative",
                  children: [/*#__PURE__*/_jsxDEV("select", {
                    className: "w-full h-11 pl-3 pr-8 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface font-body-sm text-body-sm appearance-none focus:outline-none focus:shadow-[0_0_0_2px_rgba(99,102,241,0.4)]",
                    children: [/*#__PURE__*/_jsxDEV("option", {
                      children: "Serenity Bell"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
                      children: "Tibetan Bowl"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
                      children: "Zen Chime"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
                      children: "Gentle Rain"
                    }, void 0, false)]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined absolute right-2.5 top-3 text-on-surface dark:text-on-surface-variant text-[18px] pointer-events-none",
                    children: "expand_more"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col space-y-2 pt-1",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("label", {
                className: "font-label-lg text-label-lg text-on-surface font-medium",
                htmlFor: "mindful-intent",
                children: "Mindful Intent & Notes"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-outline",
                children: "Optional"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "relative",
              children: [/*#__PURE__*/_jsxDEV("textarea", {
                className: "w-full p-3.5 pb-7 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 focus:shadow-[0_0_0_2px_rgba(99,102,241,0.4)] resize-none transition-all",
                id: "mindful-intent",
                rows: "3",
                value: note,
                onChange: e => setNote(e.target.value),
                maxLength: 200
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "absolute bottom-2.5 right-3 font-label-sm text-label-sm text-outline",
                children: [note.length, "/200"]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col space-y-3 pt-2",
            children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
              variant: "primary",
              className: "w-full h-12 rounded-xl bg-gradient-to-r from-primary-container to-tertiary-container text-on-primary-container font-headline-sm text-headline-sm font-semibold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.35)] active:scale-[0.99] transition-transform",
              onClick: () => setActiveTab('routine'),
              type: "button",
              children: [/*#__PURE__*/_jsxDEV("span", {
                children: "Save Routine Changes"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[20px]",
                children: "arrow_forward"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              variant: "none",
              className: "w-full h-11 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface font-body-md text-body-md font-medium hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
              onClick: () => setActiveTab('routine'),
              type: "button",
              children: "Cancel"
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              variant: "none",
              className: "w-full h-11 rounded-xl bg-error-container/20 text-error hover:bg-error-container/30 font-body-md text-body-md font-medium flex items-center justify-center gap-2 transition-colors",
              onClick: () => setActiveTab('routine'),
              type: "button",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px]",
                children: "delete"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                children: "Delete Routine"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
          className: "w-full p-4 rounded-2xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl flex items-center justify-between shadow-lg",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-3.5 min-w-0",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "w-11 h-11 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary shrink-0 shadow-inner",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[24px]",
                children: "verified_user"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col min-w-0",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-headline-sm text-headline-sm text-on-surface font-semibold truncate",
                children: "Streak Protected"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                children: "Completed 14 of the last 16 target days"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "pl-3 shrink-0",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "font-display-hero-mobile text-display-hero-mobile text-secondary font-bold tracking-tight",
              children: "88%"
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false)]
  }, void 0, true);
};
export default AddEditRoutine;