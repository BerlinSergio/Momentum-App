const adhan = require('adhan');

const KABUL_LAT = 34.5553;
const KABUL_LNG = 69.2075;
const AFGHANISTAN_TZ = 'Asia/Kabul';

function formatPrayerTime(d) {
  if (!d || isNaN(d.getTime())) return '12:00 PM';
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: AFGHANISTAN_TZ,
  });
}

function calculateDayPrayers(baseDate = new Date(), lat = KABUL_LAT, lng = KABUL_LNG) {
  const latitude = Number(lat) || KABUL_LAT;
  const longitude = Number(lng) || KABUL_LNG;
  const coordinates = new adhan.Coordinates(latitude, longitude);
  const params = adhan.CalculationMethod.Karachi();
  params.madhab = adhan.Madhab.Hanafi;

  const kabulDateStr = baseDate.toLocaleDateString('en-CA', { timeZone: AFGHANISTAN_TZ });
  const [year, month, day] = kabulDateStr.split('-').map(Number);
  const targetDate = new Date(year, month - 1, day);

  const pt = new adhan.PrayerTimes(coordinates, targetDate, params);
  const sunnah = new adhan.SunnahTimes(pt);

  return {
    prayers: [
      { id: 'fajr', name: 'Fajr', time: formatPrayerTime(pt.fajr), prayerDate: pt.fajr, subtitle: "Dawn prayer • 2 Rak'ahs" },
      { id: 'dhuhr', name: 'Dhuhr', time: formatPrayerTime(pt.dhuhr), prayerDate: pt.dhuhr, subtitle: "Midday prayer • 4 Rak'ahs" },
      { id: 'asr', name: 'Asr', time: formatPrayerTime(pt.asr), prayerDate: pt.asr, subtitle: "Late afternoon prayer • 4 Rak'ahs" },
      { id: 'maghrib', name: 'Maghrib', time: formatPrayerTime(pt.maghrib), prayerDate: pt.maghrib, subtitle: "Sunset prayer • 3 Rak'ahs" },
      { id: 'isha', name: 'Isha', time: formatPrayerTime(pt.isha), prayerDate: pt.isha, subtitle: "Night prayer • 4 Rak'ahs" },
    ],
    sunTwilight: {
      sunrise: formatPrayerTime(pt.sunrise),
      midnight: formatPrayerTime(sunnah.middleOfTheNight),
      tahajjud: formatPrayerTime(sunnah.lastThirdOfTheNight),
    },
  };
}

function getNextPrayerInfo(baseDate = new Date(), lat = KABUL_LAT, lng = KABUL_LNG) {
  const nowMs = baseDate.getTime();
  const todayData = calculateDayPrayers(baseDate, lat, lng);

  for (let i = 0; i < todayData.prayers.length; i++) {
    const p = todayData.prayers[i];
    const diffMs = p.prayerDate.getTime() - nowMs;
    if (diffMs > 0) {
      return {
        nextPrayer: p,
        nextIndex: i,
        diffMs,
        isTomorrow: false,
        prayerDate: p.prayerDate,
        prayers: todayData.prayers,
        sunTwilight: todayData.sunTwilight,
      };
    }
  }

  // If all prayers today have passed, get tomorrow's schedule
  const tomorrow = new Date(baseDate.getTime() + 86400000);
  const tomorrowData = calculateDayPrayers(tomorrow, lat, lng);
  const tomorrowFajr = tomorrowData.prayers[0];
  const diffMs = tomorrowFajr.prayerDate.getTime() - nowMs;

  return {
    nextPrayer: tomorrowFajr,
    nextIndex: 0,
    diffMs: Math.max(0, diffMs),
    isTomorrow: true,
    prayerDate: tomorrowFajr.prayerDate,
    prayers: tomorrowData.prayers,
    sunTwilight: tomorrowData.sunTwilight,
  };
}

// Test at different times today:
console.log('--- Test at current time (approx 16:00 / 4:00 PM) ---');
const infoNow = getNextPrayerInfo(new Date());
console.log('Next prayer:', infoNow.nextPrayer.name, 'at', infoNow.nextPrayer.time);
console.log('Is tomorrow:', infoNow.isTomorrow);
console.log('Diff minutes:', Math.round(infoNow.diffMs / 60000));

// Test at 10:00 AM (before Dhuhr)
const tenAm = new Date();
tenAm.setHours(10, 0, 0, 0);
const info10 = getNextPrayerInfo(tenAm);
console.log('\n--- Test at 10:00 AM ---');
console.log('Next prayer:', info10.nextPrayer.name, 'at', info10.nextPrayer.time);

// Test at 2:00 PM (after Dhuhr, before Asr)
const twoPm = new Date();
twoPm.setHours(14, 0, 0, 0);
const info14 = getNextPrayerInfo(twoPm);
console.log('\n--- Test at 2:00 PM ---');
console.log('Next prayer:', info14.nextPrayer.name, 'at', info14.nextPrayer.time);

// Test at 11:00 PM (after Isha)
const elevenPm = new Date();
elevenPm.setHours(23, 0, 0, 0);
const info23 = getNextPrayerInfo(elevenPm);
console.log('\n--- Test at 11:00 PM ---');
console.log('Next prayer:', info23.nextPrayer.name, 'at', info23.nextPrayer.time);
console.log('Is tomorrow:', info23.isTomorrow);
