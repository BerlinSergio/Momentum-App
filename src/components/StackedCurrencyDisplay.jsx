import {useLocaleStore} from '../store/useLocaleStore.js';
import {displayDigits} from '../i18n/displayDate.js';
import { formatSingleCurrency } from '../store/useFinanceStore';

export default function StackedCurrencyDisplay({
  grouped,
  amount,
  primaryClass = '',
  secondaryClass = '',
  align = 'start',
  showSign = false,
  decimals = 2,
  suffix = '',
  isDark = false,
  includeZero = false,
  preferredCurrency,
}) {
  const system=useLocaleStore(s=>s.numberSystem);
  const format=(value,code,options)=>displayDigits(formatSingleCurrency(value,code,options),system);
  const alignClass = 
    align === 'center' ? 'items-center text-center' :
    align === 'end' ? 'items-end text-right' :
    'items-start text-left';

  // Support both grouped and amount props seamlessly
  const effectiveData = (grouped && typeof grouped === 'object')
    ? grouped
    : ((amount && typeof amount === 'object') ? amount : (typeof amount === 'number' ? { AFN: amount } : {}));

  const entries = Object.entries(effectiveData || {}).filter(
    ([, val]) => val !== undefined && val !== null && (includeZero || Number(val) !== 0)
  );

  const order = ['AFN', 'USD', 'EUR', 'GBP', 'PKR', 'IRR'];
  entries.sort((a, b) => {
    const idxA = order.indexOf(a[0]);
    const idxB = order.indexOf(b[0]);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a[0].localeCompare(b[0]);
  });

  if (entries.length === 0) {
    const defaultCur = preferredCurrency || Object.keys(effectiveData || {})[0] || 'AFN';
    return (
      <div className={`flex flex-col ${alignClass} font-display`}>
        <span className={`${primaryClass} font-display`}>
          {format(0, defaultCur, { decimals, showSign })}{suffix}
        </span>
      </div>
    );
  }

  const [primaryEntry, ...secondaryEntries] = entries;
  const [primaryCur, primaryVal] = primaryEntry;
  const defaultSecondaryClass = isDark ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className={`flex flex-col ${alignClass} font-display`}>
      <span className={`${primaryClass} font-display`}>
        {format(primaryVal, primaryCur, { decimals, showSign })}{suffix}
      </span>
      {secondaryEntries.map(([cur, val]) => (
        <span 
          key={cur} 
          className={`text-xs font-medium mt-0.5 ${defaultSecondaryClass} ${secondaryClass} font-display`}
        >
          ({format(val, cur, { decimals, showSign })}{suffix})
        </span>
      ))}
    </div>
  );
}

export { StackedCurrencyDisplay };
