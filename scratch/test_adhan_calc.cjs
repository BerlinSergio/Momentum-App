const adhan = require('adhan');

// Coordinates for Kabul, Afghanistan
const lat = 34.5553;
const lng = 69.2075;
const coordinates = new adhan.Coordinates(lat, lng);

// Regionally appropriate standard: Karachi (University of Islamic Sciences, Karachi) or Muslim World League
// Afghanistan uses Karachi or MWL with Hanafi or standard Asr
const params = adhan.CalculationMethod.Karachi();
params.madhab = adhan.Madhab.Hanafi;

const now = new Date();
const prayerTimes = new adhan.PrayerTimes(coordinates, now, params);
const sunnah = new adhan.SunnahTimes(prayerTimes);

console.log('Coordinates:', coordinates);
console.log('Fajr:', prayerTimes.fajr);
console.log('Sunrise:', prayerTimes.sunrise);
console.log('Dhuhr:', prayerTimes.dhuhr);
console.log('Asr:', prayerTimes.asr);
console.log('Maghrib:', prayerTimes.maghrib);
console.log('Isha:', prayerTimes.isha);
console.log('Midnight:', sunnah.middleOfTheNight);
console.log('Last Third (Tahajjud):', sunnah.lastThirdOfTheNight);

// Formatted strings:
const formatTime = (d) => {
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kabul'
  });
};

console.log('\n--- Times formatted in Asia/Kabul ---');
console.log('Fajr:', formatTime(prayerTimes.fajr));
console.log('Sunrise:', formatTime(prayerTimes.sunrise));
console.log('Dhuhr:', formatTime(prayerTimes.dhuhr));
console.log('Asr:', formatTime(prayerTimes.asr));
console.log('Maghrib:', formatTime(prayerTimes.maghrib));
console.log('Isha:', formatTime(prayerTimes.isha));
console.log('Midnight:', formatTime(sunnah.middleOfTheNight));
console.log('Tahajjud:', formatTime(sunnah.lastThirdOfTheNight));
