import GlassInput from "./components/ui/GlassInput";
import GlassCard from "./components/ui/GlassCard";
import AppShell from "./components/ui/AppShell";
import React, { useState, useEffect } from 'react';
import LiquidButton from './components/ui/LiquidButton';
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
const AddEditTask = ({
  setActiveTab
}) => {
  const [taskTitle, setTaskTitle] = useState("Review Q4 product roadmap & quarterly OKRs");
  const [category, setCategory] = useState("Work");
  const [priority, setPriority] = useState("High");
  const [persistentAlert, setPersistentAlert] = useState(true);
  const [description, setDescription] = useState("Finalize mobile release milestones with design engineering team and prepare presentation deck.");
  const [subtasks, setSubtasks] = useState([{
    id: 1,
    text: "Present slides 1–12",
    completed: true
  }, {
    id: 2,
    text: "Send recap email",
    completed: false
  }]);
  const toggleSubtask = id => {
    setSubtasks(subtasks.map(t => t.id === id ? {
      ...t,
      completed: !t.completed
    } : t));
  };
  const removeSubtask = id => {
    setSubtasks(subtasks.filter(t => t.id !== id));
  };
  const addSubtask = () => {
    const newId = subtasks.length > 0 ? Math.max(...subtasks.map(t => t.id)) + 1 : 1;
    setSubtasks([...subtasks, {
      id: newId,
      text: "New Step",
      completed: false
    }]);
  };
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
            onClick: () => setActiveTab('tasks'),
            type: "button",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[24px]",
              children: "arrow_back"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("h1", {
            className: "font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight",
            children: "Add / Edit Task"
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
        className: "flex flex-col w-full px-gutter-mobile py-space-md gap-space-md",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "fixed inset-0 pointer-events-none -z-10 overflow-hidden",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-primary-container/10 blur-[100px]"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "absolute top-2/3 -right-20 w-80 h-80 rounded-full bg-secondary-container/10 blur-[120px]"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center justify-between px-space-md py-space-sm rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl shadow-sm",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-space-xs",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "w-2 h-2 rounded-full bg-secondary animate-pulse"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-secondary tracking-wider uppercase font-semibold",
              children: "EDITING TASK #TK-104"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
            variant: "subtle",
            "aria-label": "Delete Task",
            className: "p-1.5 rounded-lg text-error hover:bg-error-container/20 transition-colors flex items-center justify-center",
            onClick: () => setActiveTab('tasks'),
            type: "button",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[18px]",
              children: "delete"
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("form", {
          className: "flex flex-col gap-space-md p-space-md rounded-2xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-3xl shadow-xl",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col gap-space-xs",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("label", {
                className: "font-label-lg text-label-lg text-on-surface ",
                htmlFor: "task-title",
                children: "Task Title"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant font-medium",
                children: "Required"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "relative flex items-center",
              children: [/*#__PURE__*/_jsxDEV(GlassInput, {
                className: "w-full h-11 pl-space-md pr-16 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface placeholder:text-on-surface dark:text-on-surface-variant/60 font-body-md text-body-md transition-all outline-none focus:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 focus:shadow-[0_0_0_2px_rgba(99,102,241,0.5)]",
                id: "task-title",
                type: "text",
                value: taskTitle,
                onChange: e => setTaskTitle(e.target.value)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "absolute right-2 flex items-center gap-0.5",
                children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                  variant: "subtle",
                  "aria-label": "Clear Title",
                  className: "p-1 rounded-lg text-on-surface dark:text-on-surface-variant hover:text-on-surface hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none transition-colors flex items-center justify-center",
                  onClick: () => setTaskTitle(''),
                  type: "button",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[18px]",
                    children: "close"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  "aria-label": "Voice Input",
                  className: "p-1 rounded-lg text-on-surface dark:text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center",
                  type: "button",
                  variant: "primary",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[18px]",
                    children: "mic"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col gap-space-xs",
            children: [/*#__PURE__*/_jsxDEV("label", {
              className: "font-label-lg text-label-lg text-on-surface ",
              children: "Category"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-xs overflow-x-auto pb-1 no-scrollbar",
              children: [{
                id: 'Work',
                icon: 'work',
                iconFill: 1
              }, {
                id: 'Personal',
                icon: 'person',
                iconFill: 0
              }, {
                id: 'Spiritual',
                icon: 'star',
                iconFill: 0
              }, {
                id: 'Health',
                icon: 'favorite',
                iconFill: 0
              }].map(cat => {
                const isActive = category === cat.id;
                return /*#__PURE__*/_jsxDEV(LiquidButton, {
                  variant: "primary",
                  className: `flex items-center gap-1.5 px-space-md py-2 rounded-xl font-label-md text-label-md whitespace-nowrap transition-colors ${isActive ? 'bg-gradient-to-r from-primary-container to-tertiary-container text-on-primary-container font-semibold shadow-md' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant hover:text-on-surface font-medium'}`,
                  onClick: () => setCategory(cat.id),
                  type: "button",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[16px]",
                    style: cat.iconFill ? {
                      fontVariationSettings: "'FILL' 1"
                    } : {},
                    children: cat.icon
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    children: cat.id
                  }, void 0, false)]
                }, cat.id, true);
              })
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col gap-space-xs",
            children: [/*#__PURE__*/_jsxDEV("label", {
              className: "font-label-lg text-label-lg text-on-surface ",
              children: "Priority Level"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "grid grid-cols-4 p-1 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 gap-1",
              children: ['Low', 'Medium', 'High', 'Urgent'].map(level => {
                const isActive = priority === level;
                return /*#__PURE__*/_jsxDEV(LiquidButton, {
                  variant: "primary",
                  className: `py-2 rounded-lg text-center font-label-md text-label-md transition-colors ${isActive ? 'font-semibold bg-gradient-to-r from-primary-container to-tertiary-container text-on-primary-container shadow-sm flex items-center justify-center gap-1' : 'text-on-surface dark:text-on-surface-variant hover:text-on-surface '}`,
                  onClick: () => setPriority(level),
                  type: "button",
                  children: [isActive && /*#__PURE__*/_jsxDEV("span", {
                    className: "w-1.5 h-1.5 rounded-full bg-on-primary-container"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    children: level
                  }, void 0, false)]
                }, level, true);
              })
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 overflow-hidden",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between p-space-md hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors cursor-pointer",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-sm",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-secondary text-[20px]",
                  children: "calendar_today"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-lg text-label-lg text-on-surface ",
                  children: "Due Date"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-1 text-on-surface dark:text-on-surface-variant",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-md text-label-md text-on-surface font-medium",
                  children: "Oct 24, 2026"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[16px]",
                  children: "chevron_right"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between p-space-md hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors cursor-pointer",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-sm",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-secondary text-[20px]",
                  children: "schedule"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-lg text-label-lg text-on-surface ",
                  children: "Start Time"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-1 text-on-surface dark:text-on-surface-variant",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-md text-label-md text-on-surface font-medium",
                  children: "11:00 AM"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[16px]",
                  children: "chevron_right"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between p-space-md hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors cursor-pointer",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-sm",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-secondary text-[20px]",
                  children: "timelapse"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-lg text-label-lg text-on-surface ",
                  children: "Estimate"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-1 text-on-surface dark:text-on-surface-variant",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-md text-label-md text-on-surface font-medium",
                  children: "45 mins"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[16px]",
                  children: "chevron_right"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col gap-space-sm p-space-md rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-sm",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-secondary text-[20px]",
                  children: "notifications_active"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-col",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-lg text-label-lg text-on-surface ",
                    children: "Reminder"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                    children: "15 minutes before"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "flex items-center gap-0.5 px-space-sm py-1 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none text-secondary font-label-sm text-label-sm font-medium transition-colors",
                type: "button",
                variant: "subtle",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  children: "Change"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[14px]",
                  children: "expand_more"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between pt-space-xs",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col pr-space-md",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-lg text-label-lg text-on-surface ",
                  children: "Persistent Alert"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                  children: "Keep alert visible until checked"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "subtle",
                className: `relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${persistentAlert ? 'bg-secondary' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0'}`,
                onClick: () => setPersistentAlert(!persistentAlert),
                type: "button",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: `inline-block h-5 w-5 transform rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 shadow-md ring-0 transition duration-200 ease-in-out mt-0.5 ml-0.5 ${persistentAlert ? 'translate-x-5' : 'translate-x-0'}`
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col gap-space-xs",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("label", {
                className: "font-label-lg text-label-lg text-on-surface ",
                htmlFor: "task-desc",
                children: "Description & Notes"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant font-medium",
                children: [description.length, " / 200"]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("textarea", {
              className: "w-full p-space-md rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface placeholder:text-on-surface dark:text-on-surface-variant/60 font-body-md text-body-md transition-all outline-none resize-none focus:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 focus:shadow-[0_0_0_2px_rgba(99,102,241,0.5)]",
              id: "task-desc",
              rows: "3",
              value: description,
              onChange: e => setDescription(e.target.value),
              maxLength: 200
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col gap-space-sm",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("h2", {
                className: "font-headline-sm text-headline-sm text-on-surface font-semibold",
                children: ["Sub-tasks (", subtasks.length, ")"]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "flex items-center gap-1 font-label-md text-label-md text-primary hover:text-primary-fixed-dim transition-colors",
                onClick: addSubtask,
                type: "button",
                variant: "primary",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[16px]",
                  children: "add"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  children: "Add Step"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col gap-space-xs",
              children: subtasks.map(task => /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between p-space-sm rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
                children: [/*#__PURE__*/_jsxDEV("label", {
                  className: "flex items-center gap-space-sm flex-1 cursor-pointer",
                  children: [task.completed ? /*#__PURE__*/_jsxDEV("span", {
                    className: "w-5 h-5 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 shadow-sm",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[14px] font-bold",
                      children: "check"
                    }, void 0, false)
                  }, void 0, false) : /*#__PURE__*/_jsxDEV("span", {
                    className: "w-5 h-5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 shrink-0 flex items-center justify-center border border-outline-variant"
                  }, void 0, false), /*#__PURE__*/_jsxDEV(GlassInput, {
                    type: "checkbox",
                    className: "hidden",
                    checked: task.completed,
                    onChange: () => toggleSubtask(task.id)
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: `font-body-md text-body-md select-none ${task.completed ? 'text-on-surface dark:text-on-surface-variant line-through' : 'text-on-surface '}`,
                    children: task.text
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  variant: "subtle",
                  "aria-label": "Delete step",
                  className: "p-1 rounded-lg text-on-surface dark:text-on-surface-variant/60 hover:text-error hover:bg-error-container/20 transition-colors flex items-center justify-center",
                  onClick: () => removeSubtask(task.id),
                  type: "button",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[16px]",
                    children: "close"
                  }, void 0, false)
                }, void 0, false)]
              }, task.id, true))
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col gap-space-sm pt-space-xs",
            children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
              variant: "primary",
              className: "w-full h-12 rounded-xl bg-gradient-to-r from-primary-container to-tertiary-container hover:from-primary-container/90 hover:to-tertiary-container/90 text-on-primary-container font-label-lg text-label-lg font-semibold flex items-center justify-center gap-space-xs shadow-lg shadow-primary-container/25 active:scale-[0.99] transition-all",
              onClick: () => setActiveTab('tasks'),
              type: "button",
              children: [/*#__PURE__*/_jsxDEV("span", {
                children: "Save Task Changes"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px]",
                children: "arrow_forward"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              variant: "none",
              className: "w-full h-11 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface font-label-lg text-label-lg font-medium flex items-center justify-center transition-colors active:scale-[0.99]",
              onClick: () => setActiveTab('tasks'),
              type: "button",
              children: "Cancel"
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              variant: "none",
              className: "w-full py-space-sm text-error hover:text-error/80 font-label-md text-label-md font-medium flex items-center justify-center gap-1.5 transition-colors",
              onClick: () => setActiveTab('tasks'),
              type: "button",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px]",
                children: "delete"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                children: "Delete Task"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false)]
  }, void 0, true);
};
export default AddEditTask;