import { Coordinates, CalculationMethod, PrayerTimes, SunnahTimes, Madhab } from 'adhan';

export const DEFAULT_KABUL_COORDINATES = {
  latitude: 34.5553,
  longitude: 69.2075,
  name: 'Kabul',
  country: 'Afghanistan',
  timezone: 'Asia/Kabul',
  timezoneOffsetHours: 4.5,
  timezoneOffsetMinutes: 270,
};

export const AFGHANISTAN_TIMEZONE = 'Asia/Kabul';
export const AFGHANISTAN_OFFSET_MINUTES = 270;

export function formatPrayerTime(d, timezone = AFGHANISTAN_TIMEZONE) {
  if (!d || isNaN(d.getTime())) return '12:00 PM';
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: timezone,
  });
}

/**
 * Calculates scientifically accurate prayer times for a given date and coordinates.
 * Defaults to Kabul, Afghanistan (34.5553, 69.2075) with Karachi calculation method
 * and Hanafi madhab (the established regional standard).
 */
export function calculatePrayerTimes(baseDate = new Date(), lat = DEFAULT_KABUL_COORDINATES.latitude, lng = DEFAULT_KABUL_COORDINATES.longitude) {
  const latitude = Number(lat) || DEFAULT_KABUL_COORDINATES.latitude;
  const longitude = Number(lng) || DEFAULT_KABUL_COORDINATES.longitude;
  const coordinates = new Coordinates(latitude, longitude);

  // Regionally appropriate standard for Afghanistan: Karachi method
  const params = CalculationMethod.Karachi();
  params.madhab = Madhab.Hanafi;

  // Calendar date in Afghanistan timezone (Asia/Kabul, UTC+4:30)
  const kabulDateStr = baseDate.toLocaleDateString('en-CA', { timeZone: AFGHANISTAN_TIMEZONE });
  const [year, month, day] = kabulDateStr.split('-').map(Number);
  const targetDate = new Date(year, month - 1, day);

  const pt = new PrayerTimes(coordinates, targetDate, params);
  const sunnah = new SunnahTimes(pt);

  return {
    pt,
    sunnah,
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

/**
 * Calculates Sun & Twilight reference times (Sunrise, Midnight, Tahajjud)
 * using high-precision astronomical algorithms from adhan-js.
 */
export function calculateSunAndTwilight(lat = DEFAULT_KABUL_COORDINATES.latitude, lng = DEFAULT_KABUL_COORDINATES.longitude, tzOffsetHours = 4.5, baseDate = new Date()) {
  const { sunTwilight } = calculatePrayerTimes(baseDate, lat, lng);
  return sunTwilight;
}

/**
 * Constructs a localized Date object that strictly respects the Afghanistan timezone (UTC+4:30)
 * and matches the device's real-time clock epoch.
 */
export function getPrayerDate(timeStrOrDate, isTomorrow = false, baseDate = new Date(), tzOffsetMinutes = AFGHANISTAN_OFFSET_MINUTES) {
  if (timeStrOrDate instanceof Date && !isNaN(timeStrOrDate.getTime())) {
    const d = new Date(timeStrOrDate);
    if (isTomorrow) d.setDate(d.getDate() + 1);
    return d;
  }

  const [tPart, modPart] = String(timeStrOrDate || '12:00 PM').trim().split(/\s+/);
  let [h, m] = (tPart || '12:00').split(':').map(Number);
  if (modPart === 'PM' && h < 12) h += 12;
  if (modPart === 'AM' && h === 12) h = 0;

  const kabulDateStr = baseDate.toLocaleDateString('en-CA', { timeZone: AFGHANISTAN_TIMEZONE });
  const [y, mon, d] = kabulDateStr.split('-').map(Number);

  // Afghanistan is UTC+4:30. In UTC, the time is: Date.UTC(...) - 270 minutes
  const utcMs = Date.UTC(y, mon - 1, d, h, m, 0, 0) - (tzOffsetMinutes * 60 * 1000);
  const pDate = new Date(utcMs);

  if (isTomorrow) {
    pDate.setDate(pDate.getDate() + 1);
  }
  return pDate;
}

/**
 * Determines the next chronological prayer and remaining milliseconds by comparing
 * localized prayer Date objects against the device's real-time Date.now().
 */
export function getNextPrayerInfo(baseDate = new Date(), lat = DEFAULT_KABUL_COORDINATES.latitude, lng = DEFAULT_KABUL_COORDINATES.longitude, storedPrayers = null) {
  const nowMs = baseDate.getTime();
  const todayData = calculatePrayerTimes(baseDate, lat, lng);

  // Merge stored status (e.g. user toggled completed/missed) if available
  const mergedPrayers = todayData.prayers.map((p) => {
    const match = (storedPrayers || []).find((sp) => sp.id === p.id);
    return match ? { ...p, status: match.status, isOnTime: match.isOnTime } : p;
  });

  // Check today's upcoming prayers
  for (let i = 0; i < mergedPrayers.length; i++) {
    const p = mergedPrayers[i];
    const diffMs = p.prayerDate.getTime() - nowMs;
    if (diffMs > 0) {
      return {
        nextPrayer: p,
        nextIndex: i,
        diffMs,
        isTomorrow: false,
        prayerDate: p.prayerDate,
        prayers: mergedPrayers,
        sunTwilight: todayData.sunTwilight,
      };
    }
  }

  // If all prayers today have passed, advance to tomorrow
  const tomorrow = new Date(baseDate.getTime() + 86400000);
  const tomorrowData = calculatePrayerTimes(tomorrow, lat, lng);
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
