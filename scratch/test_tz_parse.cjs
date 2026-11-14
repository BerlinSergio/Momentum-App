// Test localized getPrayerDate
function getPrayerDateWithTimezone(timeStr, isTomorrow = false, baseDate = new Date(), targetTzOffsetMinutes = 270) {
  // targetTzOffsetMinutes for Afghanistan (UTC+4:30) is +270 minutes
  const [tPart, modPart] = (timeStr || '12:00 PM').trim().split(/\s+/);
  let [h, m] = (tPart || '12:00').split(':').map(Number);
  if (modPart === 'PM' && h < 12) h += 12;
  if (modPart === 'AM' && h === 12) h = 0;

  // We want the Date object to represent h:m on the given day in target timezone (UTC+4:30).
  // In Kabul, what is today's year, month, date?
  const kabulDateStr = baseDate.toLocaleDateString('en-CA', { timeZone: 'Asia/Kabul' });
  const [y, mon, d] = kabulDateStr.split('-').map(Number);

  // In UTC, h:m in Kabul (UTC+4:30) is:
  // (h * 60 + m) - 270 minutes from the start of the day in Kabul!
  const targetUtcMs = Date.UTC(y, mon - 1, d, h, m, 0, 0) - (targetTzOffsetMinutes * 60 * 1000);
  const pDate = new Date(targetUtcMs);

  if (isTomorrow) {
    pDate.setDate(pDate.getDate() + 1);
  }
  return pDate;
}

const d = getPrayerDateWithTimezone('04:52 PM', false, new Date());
console.log('Parsed 04:52 PM Kabul time:');
console.log('UTC ISO:', d.toISOString());
console.log('Local string:', d.toString());
console.log('Kabul string:', d.toLocaleTimeString('en-US', { timeZone: 'Asia/Kabul', hour: '2-digit', minute: '2-digit', hour12: true }));
