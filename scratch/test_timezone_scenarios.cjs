const adhan = require('adhan');

function getKabulPrayerTimes(baseDate = new Date(), lat = 34.5553, lng = 69.2075) {
  const coordinates = new adhan.Coordinates(lat, lng);
  const params = adhan.CalculationMethod.Karachi();
  params.madhab = adhan.Madhab.Hanafi;

  // We want the prayer times for the calendar date in Kabul (Asia/Kabul, UTC+4:30)
  // Let's determine the year, month, day in Asia/Kabul
  const kabulDateStr = baseDate.toLocaleDateString('en-CA', { timeZone: 'Asia/Kabul' }); // YYYY-MM-DD
  const [year, month, day] = kabulDateStr.split('-').map(Number);

  // When instantiating PrayerTimes, adhan takes a Date object.
  // In adhan, it calls date.getFullYear(), date.getMonth(), date.getDate().
  // If the local device is NOT in Asia/Kabul, baseDate.getDate() might be different from Kabul's date!
  // Therefore, creating a date matching the Kabul day:
  const localDateForKabulDay = new Date(year, month - 1, day);
  const prayerTimes = new adhan.PrayerTimes(coordinates, localDateForKabulDay, params);
  const sunnah = new adhan.SunnahTimes(prayerTimes);

  return { prayerTimes, sunnah, kabulDateStr };
}

const res = getKabulPrayerTimes(new Date());
console.log('Kabul Date:', res.kabulDateStr);
console.log('Fajr UTC:', res.prayerTimes.fajr.toISOString());
console.log('Fajr Local:', res.prayerTimes.fajr.toString());
console.log('Fajr in Kabul:', res.prayerTimes.fajr.toLocaleTimeString('en-US', { timeZone: 'Asia/Kabul', hour: '2-digit', minute: '2-digit', hour12: true }));
console.log('Dhuhr in Kabul:', res.prayerTimes.dhuhr.toLocaleTimeString('en-US', { timeZone: 'Asia/Kabul', hour: '2-digit', minute: '2-digit', hour12: true }));
console.log('Asr in Kabul:', res.prayerTimes.asr.toLocaleTimeString('en-US', { timeZone: 'Asia/Kabul', hour: '2-digit', minute: '2-digit', hour12: true }));
console.log('Maghrib in Kabul:', res.prayerTimes.maghrib.toLocaleTimeString('en-US', { timeZone: 'Asia/Kabul', hour: '2-digit', minute: '2-digit', hour12: true }));
console.log('Isha in Kabul:', res.prayerTimes.isha.toLocaleTimeString('en-US', { timeZone: 'Asia/Kabul', hour: '2-digit', minute: '2-digit', hour12: true }));
console.log('Sunrise in Kabul:', res.prayerTimes.sunrise.toLocaleTimeString('en-US', { timeZone: 'Asia/Kabul', hour: '2-digit', minute: '2-digit', hour12: true }));
console.log('Midnight in Kabul:', res.sunnah.middleOfTheNight.toLocaleTimeString('en-US', { timeZone: 'Asia/Kabul', hour: '2-digit', minute: '2-digit', hour12: true }));
console.log('Tahajjud in Kabul:', res.sunnah.lastThirdOfTheNight.toLocaleTimeString('en-US', { timeZone: 'Asia/Kabul', hour: '2-digit', minute: '2-digit', hour12: true }));
