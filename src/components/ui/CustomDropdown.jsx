import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

/**
 * Momentum CustomDropdown component
 * A modern, glassmorphic, accessible dropdown replacing native <select> elements.
 *
 * @param {Object} props
 * @param {string} props.value - Currently selected value
 * @param {Array<{value: string, label: string, subtext?: string}> | Array<string>} props.options - Dropdown options
 * @param {function} props.onChange - Selection change handler
 * @param {boolean} [props.isDarkMode=true] - Theme mode styling
 * @param {string} [props.placeholder='Select an option'] - Placeholder text
 * @param {React.ComponentType} [props.icon] - Left icon component
 * @param {string} [props.className=''] - Container class overrides
 */
export default function CustomDropdown({

  value,
  options = [],
  onChange,
  isDarkMode = true,
  placeholder,
  icon: Icon,
  className = '',
}) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Find active option
  const selectedOption = options.find((opt) =>
    typeof opt === 'object' ? opt.value === value : opt === value
  );

  const effectivePlaceholder = placeholder || t('common.selectOption', 'Select an option');
  const displayLabel = typeof selectedOption === 'object'
    ? (selectedOption.label || selectedOption.value)
    : (selectedOption || value || effectivePlaceholder);

  const displaySubtext = typeof selectedOption === 'object' ? selectedOption.subtext : null;

  return (
    <div className={`relative w-full ${isOpen ? 'z-[100]' : 'z-auto'} ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        whileTap={{ scale: 0.99 }}
        transition={{ duration: 0.12 }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full p-3.5 rounded-2xl flex items-center justify-between text-left transition-all duration-200 cursor-pointer ${
          isDarkMode
            ? 'bg-black/40 backdrop-blur-xl border border-white/10 text-white shadow-xl hover:border-white/20'
            : 'bg-white/80 backdrop-blur-xl border border-white/50 text-slate-900 shadow-lg hover:border-white/70'
        } ${isOpen ? 'ring-2 ring-primary/40' : ''}`}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
          {Icon && (
            <Icon className={`w-4 h-4 flex-shrink-0 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
          )}
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium truncate">{displayLabel}</span>
            {displaySubtext && (
              <span className={`text-[10px] truncate ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {displaySubtext}
              </span>
            )}
          </div>
        </div>
        <ChevronDown
          className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          } ${isOpen ? 'rotate-180 text-primary' : ''}`}
        />
      </motion.button>

      {/* Popover Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="listbox"
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className={`absolute left-0 right-0 mt-2 rounded-2xl overflow-hidden z-[100] py-1.5 shadow-2xl backdrop-blur-2xl border max-h-60 overflow-y-auto ${
              isDarkMode
                ? 'bg-slate-900/95 border-white/15 divide-y divide-white/5 text-white'
                : 'bg-white/95 border-slate-200/90 divide-y divide-slate-100 text-slate-900'
            }`}
          >
            {options.map((opt, idx) => {
              const optVal = typeof opt === 'object' ? opt.value : opt;
              const optLabel = typeof opt === 'object' ? (opt.label || opt.value) : opt;
              const optSub = typeof opt === 'object' ? opt.subtext : null;
              const isSelected = optVal === value;

              return (
                <button
                  key={idx}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onChange(optVal);
                    setIsOpen(false);
                  }}
                  onClick={() => {
                    onChange(optVal);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 flex items-center justify-between text-left transition-colors cursor-pointer ${
                    isSelected
                      ? (isDarkMode ? 'bg-primary/20 text-primary font-semibold' : 'bg-primary/10 text-primary font-semibold')
                      : (isDarkMode ? 'text-slate-200 hover:bg-white/5 hover:text-white' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900')
                  }`}
                >
                  <div className="flex flex-col pr-2">
                    <span className="text-xs">{optLabel}</span>
                    {optSub && (
                      <span className={`text-[10px] ${isSelected ? 'text-primary/80' : (isDarkMode ? 'text-slate-400' : 'text-slate-500')}`}>
                        {optSub}
                      </span>
                    )}
                  </div>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-primary flex-shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

