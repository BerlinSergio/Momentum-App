import {useLocaleStore} from '../store/useLocaleStore.js';
import {displayDigits} from '../i18n/displayDate.js';
export function useDisplayDigits(){
 const system=useLocaleStore(s=>s.numberSystem);
 return value=>displayDigits(value,system);
}
