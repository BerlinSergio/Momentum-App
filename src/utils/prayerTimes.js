import {
  Coordinates,
  CalculationMethod,
  PrayerTimes,
  SunnahTimes,
  Madhab,
  HighLatitudeRule,
  PolarCircleResolution,
  Qibla,
} from 'adhan';
import * as timeService from './timeService.js';

export const DEFAULT_KABUL_COORDINATES = {
  latitude: 34.5553,
  longitude: 69.2075,
  name: 'Kabul',
  country: 'Afghanistan',
  timezone: 'Asia/Kabul',
  timezoneOffsetHours: 4.5,
  timezoneOffsetMinutes: 270,
};

// Preserved for legacy reference
export const AFGHANISTAN_TIMEZONE = 'Asia/Kabul';
export const AFGHANISTAN_OFFSET_MINUTES = 270;

export const CALCULATION_METHODS = [
  {
    id: 'Karachi',
    name: 'University of Islamic Sciences, Karachi',
    shortName: 'Karachi',
    description: 'Fajr 18.0°, Isha 18.0° (Standard in South & Central Asia)',
    factory: CalculationMethod.Karachi,
  },
  {
    id: 'MuslimWorldLeague',
    name: 'Muslim World League',
    shortName: 'MWL',
    description: 'Fajr 18.0°, Isha 17.0° (Standard in Europe, Far East, parts of US)',
    factory: CalculationMethod.MuslimWorldLeague,
  },
  {
    id: 'UmmAlQura',
    name: 'Umm Al-Qura University, Makkah',
    shortName: 'Umm Al-Qura',
    description: 'Fajr 18.5°, Isha +90m (+120m in Ramadan) (Saudi Arabia & Gulf)',
    factory: CalculationMethod.UmmAlQura,
  },
  {
    id: 'Egyptian',
    name: 'Egyptian General Authority of Survey',
    shortName: 'Egyptian',
    description: 'Fajr 19.5°, Isha 17.5° (Africa, Syria, Lebanon, Malaysia)',
    factory: CalculationMethod.Egyptian,
  },
  {
    id: 'NorthAmerica',
    name: 'Islamic Society of North America (ISNA)',
    shortName: 'ISNA',
    description: 'Fajr 15.0°, Isha 15.0° (North America)',
    factory: CalculationMethod.NorthAmerica,
  },
  {
    id: 'Dubai',
    name: 'Dubai (UAE)',
    shortName: 'Dubai',
    description: 'Fajr 18.2°, Isha 18.2° (UAE official timetable)',
    factory: CalculationMethod.Dubai,
  },
  {
    id: 'MoonsightingCommittee',
    name: 'Moonsighting Committee Worldwide',
    shortName: 'Moonsighting',
    description: 'Fajr 18.0°, Isha 18.0° with seasonal high-latitude twilight adjustments',
    factory: CalculationMethod.MoonsightingCommittee,
  },
  {
    id: 'Kuwait',
    name: 'Kuwait',
    shortName: 'Kuwait',
    description: 'Fajr 18.0°, Isha 17.5°',
    factory: CalculationMethod.Kuwait,
  },
  {
    id: 'Qatar',
    name: 'Qatar',
    shortName: 'Qatar',
    description: 'Fajr 18.0°, Isha +90m modified',
    factory: CalculationMethod.Qatar,
  },
  {
    id: 'Singapore',
    name: 'Singapore (MUIS)',
    shortName: 'Singapore',
    description: 'Fajr 20.0°, Isha 18.0°',
    factory: CalculationMethod.Singapore,
  },
  {
    id: 'Turkey',
    name: 'Diyanet İşleri Başkanlığı (Turkey)',
    shortName: 'Diyanet',
    description: 'Fajr 18.0°, Isha 17.0° (Turkey & Turkish communities)',
    factory: CalculationMethod.Turkey,
  },
  {
    id: 'Tehran',
    name: 'Institute of Geophysics, University of Tehran',
    shortName: 'Tehran',
    description: 'Fajr 17.7°, Isha 14.0°, Maghrib 4.5°',
    factory: CalculationMethod.Tehran,
  },
];

export const MADHABS = [
  { id: 'Hanafi', name: 'Hanafi', description: 'Later Asr (shadow length factor = 2)' },
  { id: 'Shafi', name: 'Standard / Shafi', description: 'Earlier Asr (shadow length factor = 1)' },
];

export const HIGH_LATITUDE_RULES = [
  { id: 'recommended', name: 'Recommended', description: 'Automatically select best rule based on latitude' },
  { id: 'MiddleOfTheNight', name: 'Middle of the Night', description: 'Fajr/Isha capped at middle of sunset-sunrise night' },
  { id: 'SeventhOfTheNight', name: 'One-Seventh of the Night', description: 'Fajr/Isha capped at 1/7th of night length' },
  { id: 'TwilightAngle', name: 'Twilight Angle', description: 'Fajr/Isha angle portion proportional to 60 degrees' },
];

export const POLAR_RESOLUTIONS = [
  { id: 'AqrabBalad', name: 'Nearest Latitude', description: 'Use prayer schedule from closest latitude outside polar circle' },
  { id: 'AqrabYaum', name: 'Nearest Day', description: 'Use prayer schedule from last day with valid sunrise/sunset' },
  { id: 'Unresolved', name: 'Unresolved', description: 'Report unavailable when sunrise/sunset does not occur' },
];

/**
 * Validates latitude and longitude coordinates.
 * NOTE: Latitude 0 (Equator) and Longitude 0 (Prime Meridian) are strictly valid!
 */
export function isValidCoordinate(lat, lng) {
  return (
    typeof lat === 'number' &&
    typeof lng === 'number' &&
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
}

/**
 * Normalizes user-selected or legacy calculation method strings into canonical adhan IDs.
 */
export function normalizeCalculationMethod(rawMethod) {
  if (!rawMethod) return 'Karachi';
  const str = String(rawMethod).trim().toLowerCase();

  if (str.includes('karachi')) return 'Karachi';
  if (str.includes('muslim world') || str.includes('mwl')) return 'MuslimWorldLeague';
  if (str.includes('umm al-qura') || str.includes('makkah') || str.includes('mecca')) return 'UmmAlQura';
  if (str.includes('egypt')) return 'Egyptian';
  if (str.includes('north america') || str.includes('isna')) return 'NorthAmerica';
  if (str.includes('dubai') || str.includes('uae')) return 'Dubai';
  if (str.includes('moonsighting')) return 'MoonsightingCommittee';
  if (str.includes('kuwait')) return 'Kuwait';
  if (str.includes('qatar')) return 'Qatar';
  if (str.includes('singapore') || str.includes('muis')) return 'Singapore';
  if (str.includes('turkey') || str.includes('diyanet')) return 'Turkey';
  if (str.includes('tehran')) return 'Tehran';

  const exact = CALCULATION_METHODS.find((m) => m.id.toLowerCase() === str);
  return exact ? exact.id : 'Karachi';
}

/**
 * Converts a compass bearing degree (0-360) into standard 16-wind cardinal direction.
 */
export function getQiblaDirection(degrees) {
  if (!Number.isFinite(degrees)) return 'N';
  const normalized = ((degrees % 360) + 360) % 360;
  const sectors = [
    'N', 'NNE', 'NE', 'ENE',
    'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW',
    'W', 'WNW', 'NW', 'NNW',
  ];
  const index = Math.round(normalized / 22.5) % 16;
  return sectors[index];
}

/**
 * Calculates high-precision Qibla bearing from given coordinates to the Kaaba in Makkah.
 */
export function calculateQibla(lat, lng) {
  if (!isValidCoordinate(Number(lat), Number(lng))) {
    return { degrees: 251, direction: 'WSW', text: '251° WSW' };
  }
  const coords = new Coordinates(Number(lat), Number(lng));
  const rawDeg = Qibla(coords);
  const degrees = Math.round(((rawDeg % 360) + 360) % 360);
  const direction = getQiblaDirection(degrees);
  return { degrees, direction, text: `${degrees}° ${direction}` };
}

/**
 * Formats a prayer instant into a user-facing time string using the target timezone.
 */
export function formatPrayerTime(d, timezone = AFGHANISTAN_TIMEZONE, hour12 = true) {
  if (!d || !(d instanceof Date) || isNaN(d.getTime())) return '--:--';
  const tz = timeService.normalizeIanaTimezone(timezone);
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12,
    timeZone: tz,
  });
}

/**
 * Calculates scientifically accurate prayer times for any location globally.
 * Accepts either an options object or legacy positional arguments.
 *
 * @param {Object|Date} arg1 - Options object or baseDate
 * @param {number} [arg2] - Latitude (positional mode)
 * @param {number} [arg3] - Longitude (positional mode)
 * @param {Object} [arg4] - Additional options (positional mode)
 */
export function calculatePrayerTimes(arg1 = new Date(), arg2, arg3, arg4) {
  let opts;
  if (
    arg1 &&
    typeof arg1 === 'object' &&
    !(arg1 instanceof Date) &&
    (arg1.latitude !== undefined || arg1.longitude !== undefined || arg1.baseDate !== undefined || arg1.timezone !== undefined)
  ) {
    opts = arg1;
  } else {
    opts = {
      baseDate: arg1,
      latitude: arg2,
      longitude: arg3,
      ...(typeof arg4 === 'object' ? arg4 : {}),
    };
  }

  const baseDate = opts.baseDate instanceof Date && !isNaN(opts.baseDate.getTime()) ? opts.baseDate : new Date();

  // Validate coordinates (zero is explicitly valid!)
  const rawLat = opts.latitude !== undefined && opts.latitude !== null ? Number(opts.latitude) : DEFAULT_KABUL_COORDINATES.latitude;
  const rawLng = opts.longitude !== undefined && opts.longitude !== null ? Number(opts.longitude) : DEFAULT_KABUL_COORDINATES.longitude;

  const latitude = isValidCoordinate(rawLat, 0) ? rawLat : DEFAULT_KABUL_COORDINATES.latitude;
  const longitude = isValidCoordinate(0, rawLng) ? rawLng : DEFAULT_KABUL_COORDINATES.longitude;
  const coordinates = new Coordinates(latitude, longitude);

  // Authoritative prayer location timezone
  const timezone = timeService.normalizeIanaTimezone(
    opts.timezone ||
    (latitude === DEFAULT_KABUL_COORDINATES.latitude && longitude === DEFAULT_KABUL_COORDINATES.longitude
      ? DEFAULT_KABUL_COORDINATES.timezone
      : timeService.getDeviceTimezone())
  );

  // Extract the local civil date in the TARGET PRAYER LOCATION'S timezone
  let year, month, day;
  try {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(baseDate).split('-');
    year = Number(parts[0]);
    month = Number(parts[1]);
    day = Number(parts[2]);
  } catch {
    year = baseDate.getFullYear();
    month = baseDate.getMonth() + 1;
    day = baseDate.getDate();
  }

  const civilDateKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  // Construct a noon date so adhan's getFullYear()/getMonth()/getDate() matches the target location's civil day
  const targetDate = new Date(year, month - 1, day, 12, 0, 0);

  // Calculation Method
  const methodKey = normalizeCalculationMethod(opts.calculationMethod);
  const methodObj = CALCULATION_METHODS.find((m) => m.id === methodKey);
  const factory = methodObj?.factory || CalculationMethod.Karachi;
  const params = typeof factory === 'function' ? factory() : CalculationMethod.Karachi();

  // Madhab (Asr Jurisprudence)
  const madhabKey = opts.madhab === 'Shafi' || opts.madhab === 'Standard' ? 'Shafi' : 'Hanafi';
  params.madhab = Madhab[madhabKey] || Madhab.Hanafi;

  // High Latitude Rule
  const highLatKey = opts.highLatitudeRule || 'recommended';
  if (highLatKey === 'recommended' && typeof HighLatitudeRule.recommended === 'function') {
    params.highLatitudeRule = HighLatitudeRule.recommended(coordinates);
  } else if (HighLatitudeRule[highLatKey]) {
    params.highLatitudeRule = HighLatitudeRule[highLatKey];
  }

  // Polar Circle Resolution
  const polarKey = opts.polarCircleResolution || 'AqrabBalad';
  if (PolarCircleResolution[polarKey]) {
    params.polarCircleResolution = PolarCircleResolution[polarKey];
  }

  // Per-prayer minute adjustments if provided
  if (opts.adjustments && typeof opts.adjustments === 'object') {
    if (Number.isFinite(opts.adjustments.fajr)) params.adjustments.fajr = opts.adjustments.fajr;
    if (Number.isFinite(opts.adjustments.sunrise)) params.adjustments.sunrise = opts.adjustments.sunrise;
    if (Number.isFinite(opts.adjustments.dhuhr)) params.adjustments.dhuhr = opts.adjustments.dhuhr;
    if (Number.isFinite(opts.adjustments.asr)) params.adjustments.asr = opts.adjustments.asr;
    if (Number.isFinite(opts.adjustments.maghrib)) params.adjustments.maghrib = opts.adjustments.maghrib;
    if (Number.isFinite(opts.adjustments.isha)) params.adjustments.isha = opts.adjustments.isha;
  }

  let pt = null;
  let sunnah = null;
  let isUnavailable = false;
  let isEstimated = false;

  try {
    pt = new PrayerTimes(coordinates, targetDate, params);
    sunnah = new SunnahTimes(pt);
  } catch (err) {
    console.warn('[PrayerTimes] Calculation error:', err);
    isUnavailable = true;
  }

  const isValidInstant = (d) => d instanceof Date && !isNaN(d.getTime());
  if (
    !pt ||
    !isValidInstant(pt.fajr) ||
    !isValidInstant(pt.dhuhr) ||
    !isValidInstant(pt.asr) ||
    !isValidInstant(pt.maghrib) ||
    !isValidInstant(pt.isha)
  ) {
    isUnavailable = true;
  }

  if (Math.abs(latitude) >= 55) {
    isEstimated = true;
  }

  const qibla = calculateQibla(latitude, longitude);

  const prayers = [
    {
      id: 'fajr',
      name: 'Fajr',
      time: formatPrayerTime(pt?.fajr, timezone),
      prayerDate: pt?.fajr || null,
      subtitle: "Dawn prayer • 2 Rak'ahs",
    },
    {
      id: 'dhuhr',
      name: 'Dhuhr',
      time: formatPrayerTime(pt?.dhuhr, timezone),
      prayerDate: pt?.dhuhr || null,
      subtitle: "Midday prayer • 4 Rak'ahs",
    },
    {
      id: 'asr',
      name: 'Asr',
      time: formatPrayerTime(pt?.asr, timezone),
      prayerDate: pt?.asr || null,
      subtitle: "Late afternoon prayer • 4 Rak'ahs",
    },
    {
      id: 'maghrib',
      name: 'Maghrib',
      time: formatPrayerTime(pt?.maghrib, timezone),
      prayerDate: pt?.maghrib || null,
      subtitle: "Sunset prayer • 3 Rak'ahs",
    },
    {
      id: 'isha',
      name: 'Isha',
      time: formatPrayerTime(pt?.isha, timezone),
      prayerDate: pt?.isha || null,
      subtitle: "Night prayer • 4 Rak'ahs",
    },
  ];

  const sunTwilight = {
    sunrise: formatPrayerTime(pt?.sunrise, timezone),
    sunriseDate: pt?.sunrise || null,
    midnight: formatPrayerTime(sunnah?.middleOfTheNight, timezone),
    midnightDate: sunnah?.middleOfTheNight || null,
    tahajjud: formatPrayerTime(sunnah?.lastThirdOfTheNight, timezone),
    tahajjudDate: sunnah?.lastThirdOfTheNight || null,
  };

  return {
    pt,
    sunnah,
    prayers,
    sunTwilight,
    qibla,
    latitude,
    longitude,
    timezone,
    civilDateKey,
    targetDate,
    calculationMethod: methodKey,
    madhab: madhabKey,
    highLatitudeRule: highLatKey,
    status: isUnavailable ? 'unavailable' : isEstimated ? 'estimated' : 'valid',
  };
}

/**
 * Calculates Sun & Twilight astronomical times.
 */
export function calculateSunAndTwilight(lat = DEFAULT_KABUL_COORDINATES.latitude, lng = DEFAULT_KABUL_COORDINATES.longitude, _ = null, baseDate = new Date(), options = {}) {
  void _;
  const result = calculatePrayerTimes({
    baseDate,
    latitude: lat,
    longitude: lng,
    ...options,
  });
  return result.sunTwilight;
}

/**
 * Constructs a localized Date object that strictly respects the target location's timezone.
 */
export function getPrayerDate(timeStrOrDate, isTomorrow = false, baseDate = new Date(), timezone = AFGHANISTAN_TIMEZONE) {
  if (timeStrOrDate instanceof Date && !isNaN(timeStrOrDate.getTime())) {
    const d = new Date(timeStrOrDate);
    if (isTomorrow) d.setDate(d.getDate() + 1);
    return d;
  }

  const tz = timeService.normalizeIanaTimezone(timezone);
  const [tPart, modPart] = String(timeStrOrDate || '12:00 PM').trim().split(/\s+/);
  let [h, m] = (tPart || '12:00').split(':').map(Number);
  if (modPart === 'PM' && h < 12) h += 12;
  if (modPart === 'AM' && h === 12) h = 0;

  // Extract civil date in the target timezone
  let y, mon, d;
  try {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: tz,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(baseDate).split('-');
    y = Number(parts[0]);
    mon = Number(parts[1]);
    d = Number(parts[2]);
  } catch {
    y = baseDate.getFullYear();
    mon = baseDate.getMonth() + 1;
    d = baseDate.getDate();
  }

  // Create date and adjust if tomorrow
  let targetDay = d;
  if (isTomorrow) {
    const nextKey = timeService.addCalendarDays(`${y}-${String(mon).padStart(2, '0')}-${String(d).padStart(2, '0')}`, 1);
    const [ny, nm, nd] = nextKey.split('-').map(Number);
    y = ny;
    mon = nm;
    targetDay = nd;
  }

  // Construct ISO string for the moment in target timezone
  // For instant creation, calculate offset of the target timezone at that date
  const testUtc = new Date(Date.UTC(y, mon - 1, targetDay, h, m, 0, 0));
  const offsetMinutes = timeService.getTimezoneOffsetMinutes(tz, testUtc);
  const utcMs = Date.UTC(y, mon - 1, targetDay, h, m, 0, 0) - (offsetMinutes * 60 * 1000);
  return new Date(utcMs);
}

/**
 * Determines the next chronological prayer and remaining milliseconds by comparing
 * actual prayer instants with the device's real-time clock instant (Date.now()).
 * When all prayers today have passed, it safely calculates tomorrow's Fajr using
 * calendar-safe civil day arithmetic.
 */
export function getNextPrayerInfo(arg1 = new Date(), arg2, arg3, arg4, arg5) {
  let opts;
  if (
    arg1 &&
    typeof arg1 === 'object' &&
    !(arg1 instanceof Date) &&
    (arg1.latitude !== undefined || arg1.longitude !== undefined || arg1.baseDate !== undefined || arg1.timezone !== undefined)
  ) {
    opts = arg1;
  } else {
    opts = {
      baseDate: arg1,
      latitude: arg2,
      longitude: arg3,
      storedPrayers: arg4,
      ...(typeof arg5 === 'object' ? arg5 : {}),
    };
  }

  const baseDate = opts.baseDate instanceof Date && !isNaN(opts.baseDate.getTime()) ? opts.baseDate : new Date();
  const nowMs = baseDate.getTime();

  // Calculate today's schedule
  const todayData = calculatePrayerTimes({ ...opts, baseDate });

  // Merge stored status (e.g. user-recorded worship completion)
  const stored = opts.storedPrayers || [];
  const mergedPrayers = todayData.prayers.map((p) => {
    const match = stored.find((sp) => sp.id === p.id);
    return match ? { ...p, status: match.status, isOnTime: match.isOnTime } : p;
  });

  // Check today's upcoming prayers in chronological order
  for (let i = 0; i < mergedPrayers.length; i++) {
    const p = mergedPrayers[i];
    if (p.prayerDate && p.prayerDate.getTime() > nowMs) {
      const diffMs = Math.max(0, p.prayerDate.getTime() - nowMs);
      return {
        nextPrayer: p,
        nextIndex: i,
        diffMs,
        isTomorrow: false,
        prayerDate: p.prayerDate,
        prayers: mergedPrayers,
        sunTwilight: todayData.sunTwilight,
        qibla: todayData.qibla,
        dateKey: todayData.civilDateKey,
        status: todayData.status,
      };
    }
  }

  // All prayers today have passed: Calculate tomorrow's Fajr using calendar-safe date math
  const tomorrowCivilKey = timeService.addCalendarDays(todayData.civilDateKey, 1);
  const tomorrowNoonDate = timeService.parseDateOnlyToSafeUtc(tomorrowCivilKey);

  const tomorrowData = calculatePrayerTimes({
    ...opts,
    baseDate: tomorrowNoonDate,
  });

  const tomorrowFajr = tomorrowData.prayers[0];
  const diffMs = tomorrowFajr.prayerDate ? Math.max(0, tomorrowFajr.prayerDate.getTime() - nowMs) : 0;

  return {
    nextPrayer: tomorrowFajr,
    nextIndex: 0,
    diffMs,
    isTomorrow: true,
    prayerDate: tomorrowFajr.prayerDate,
    prayers: mergedPrayers,
    tomorrowPrayers: tomorrowData.prayers,
    sunTwilight: todayData.sunTwilight,
    qibla: todayData.qibla,
    dateKey: tomorrowData.civilDateKey,
    todayDateKey: todayData.civilDateKey,
    status: tomorrowData.status,
  };
}
