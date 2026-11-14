const adhan = require('adhan');

// Default Kabul coordinates
const KABUL_LAT = 34.5553;
const KABUL_LNG = 69.2075;
const AFGHANISTAN_TZ = 'Asia/Kabul';
const AFGHANISTAN_OFFSET_HOURS = 4.5;
const AFGHANISTAN_OFFSET_MINUTES = 270;

function formatPrayerTime(date) {
  if (!date || isNaN(date.getTime())) return '12:00 PM';
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: AFGHANISTAN_TZ,
  });
}

function calculateCanonicalPrayers(baseDate = new Date(), lat = KABUL_LAT, lng = KABUL_LNG) {
  const coordinates = new adhan.Coordinates(lat, lng);
  const params = adhan.CalculationMethod.Karachi();
  params.madhab = adhan.Madhab.Hanafi;

  // Ensure target date corresponds to the calendar date in Kabul
  const kabulDateStr = baseDate.toLocaleDateString('en-CA', { timeZone: AFGHANISTAN_TZ });
  const [year, month, day] = kabulDateStr.split('-').map(Number);
  const targetDate = new Date(year, month - 1, day);

  const pt = new adhan.PrayerTimes(coordinates, targetDate, params);
  const sunnah = new adhan.SunnahTimes(pt);

  // If the device timezone is different from Afghanistan Time (e.g. UTC, or EDT),
  // how does pt.fajr align with the device's clock?
  // Let's inspect pt.fajr:
  return {
    pt,
    sunnah,
    prayers: [
      { id: 'fajr', name: 'Fajr', time: formatPrayerTime(pt.fajr), date: pt.fajr, subtitle: "Dawn prayer • 2 Rak'ahs" },
      { id: 'dhuhr', name: 'Dhuhr', time: formatPrayerTime(pt.dhuhr), date: pt.dhuhr, subtitle: "Midday prayer • 4 Rak'ahs" },
      { id: 'asr', name: 'Asr', time: formatPrayerTime(pt.asr), date: pt.asr, subtitle: "Late afternoon prayer • 4 Rak'ahs" },
      { id: 'maghrib', name: 'Maghrib', time: formatPrayerTime(pt.maghrib), date: pt.maghrib, subtitle: "Sunset prayer • 3 Rak'ahs" },
      { id: 'isha', name: 'Isha', time: formatPrayerTime(pt.isha), date: pt.isha, subtitle: "Night prayer • 4 Rak'ahs" },
    ],
    sunTwilight: {
      sunrise: formatPrayerTime(pt.sunrise),
      midnight: formatPrayerTime(sunnah.middleOfTheNight),
      tahajjud: formatPrayerTime(sunnah.lastThirdOfTheNight),
    }
  };
}

const result = calculateCanonicalPrayers(new Date());
console.log('Prayers calculated for today:');
result.prayers.forEach(p => console.log(`  ${p.name}: ${p.time} (Date: ${p.date.toISOString()}, local: ${p.date.toString()})`));
console.log('Sun & Twilight:', result.sunTwilight);
