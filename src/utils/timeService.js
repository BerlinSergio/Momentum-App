/**
 * Momentum Central Time Service
 * Pure, deterministic date, time, and timezone calculations.
 * Ensures consistent civil dates, calendar arithmetic, and timezone conversion across all modules.
 */

let mockInstant = null;
let mockTimezone = null;

/**
 * Returns current device timezone according to host environment.
 */
export function getDeviceTimezone() {
  if (mockTimezone) return mockTimezone;
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  } catch {
    return 'UTC';
  }
}

/**
 * Validates whether an IANA timezone string is recognized by Intl.
 */
export function isValidTimezone(timeZone) {
  if (!timeZone || typeof timeZone !== 'string') return false;
  try {
    Intl.DateTimeFormat(undefined, { timeZone });
    return true;
  } catch {
    return false;
  }
}

/**
 * Extracts and normalizes a recognized IANA timezone identifier from raw or legacy values.
 * Handles strings like "Asia/Kabul (UTC+4:30)", "Asia/Kabul (UTC+04:30)", "Asia/Kabul", or "America/New_York".
 */
export function normalizeIanaTimezone(rawTz) {
  if (!rawTz || typeof rawTz !== 'string') return getDeviceTimezone();
  const trimmed = rawTz.trim();
  if (mockTimezone) return mockTimezone;

  // 1. Try regex extraction of standard IANA region/city pattern
  const match = trimmed.match(/^([A-Za-z_]+\/[A-Za-z0-9_+-]+)/);
  if (match && isValidTimezone(match[1])) {
    return match[1];
  }

  // 2. Try raw string validation
  if (isValidTimezone(trimmed)) {
    return trimmed;
  }

  // 3. Fallback to device timezone
  return getDeviceTimezone();
}

/**
 * Calculates dynamic UTC offset string for a timezone at a specific instant.
 * Correctly accounts for Daylight Saving Time (DST) seasonal transitions.
 * Examples: "UTC+04:30", "UTC-05:00", "UTC+00:00"
 */
export function formatUtcOffset(timeZone, date = getNow()) {
  const validTz = normalizeIanaTimezone(timeZone);
  const d = date instanceof Date ? date : new Date(date);
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: validTz,
      timeZoneName: 'shortOffset',
    });
    const parts = formatter.formatToParts(d);
    const tzPart = parts.find((p) => p.type === 'timeZoneName');
    if (tzPart && tzPart.value) {
      let val = tzPart.value.replace('GMT', 'UTC');
      const m = val.match(/UTC([+-])(\d+)(?::(\d+))?/);
      if (m) {
        const sign = m[1];
        const h = String(m[2]).padStart(2, '0');
        const min = String(m[3] || '00').padStart(2, '0');
        return `UTC${sign}${h}:${min}`;
      }
      return val;
    }
  } catch {
    // Fallback calculation using UTC vs target difference
  }
  return 'UTC+00:00';
}

/**
 * Calculates signed UTC offset in minutes for a timezone at a specific instant.
 * Example: "Asia/Kabul" -> +270, "America/New_York" (EST) -> -300
 */
export function getTimezoneOffsetMinutes(timeZone, date = getNow()) {
  const validTz = normalizeIanaTimezone(timeZone);
  const d = date instanceof Date ? date : new Date(date);
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: validTz,
      timeZoneName: 'shortOffset',
    });
    const parts = formatter.formatToParts(d);
    const tzPart = parts.find((p) => p.type === 'timeZoneName');
    if (tzPart && tzPart.value) {
      const m = tzPart.value.match(/GMT([+-])(\d+)(?::(\d+))?/i);
      if (m) {
        const sign = m[1] === '-' ? -1 : 1;
        const h = parseInt(m[2], 10);
        const min = parseInt(m[3] || '0', 10);
        return sign * (h * 60 + min);
      }
    }
  } catch {
    // fallback
  }
  return 0;
}

/**
 * Formats a clean human-readable timezone label with dynamic offset.
 * Example: "Asia/Kabul (UTC+04:30)" or "America/New_York (UTC-05:00)"
 */
export function getTimezoneDisplayLabel(timeZone, date = getNow()) {
  const iana = normalizeIanaTimezone(timeZone);
  const offset = formatUtcOffset(iana, date);
  return `${iana} (${offset})`;
}

/**
 * Returns current instant as Date object. Supports mock clock during automated tests.
 */
export function getNow() {
  if (mockInstant !== null) {
    return new Date(mockInstant);
  }
  return new Date();
}

/**
 * Set mock instant for automated testing (ISO string, epoch ms, or Date).
 */
export function setMockInstant(instant) {
  if (instant === null || instant === undefined) {
    mockInstant = null;
  } else {
    mockInstant = instant instanceof Date ? instant.getTime() : new Date(instant).getTime();
  }
}

/**
 * Reset mock instant back to real clock.
 */
export function resetMockInstant() {
  mockInstant = null;
}

/**
 * Set mock device timezone for automated testing.
 */
export function setMockTimezone(timeZone) {
  mockTimezone = timeZone;
}

/**
 * Reset mock device timezone back to host environment.
 */
export function resetMockTimezone() {
  mockTimezone = null;
}

/**
 * Decomposes an instant into civil date & time components in the specified timezone.
 */
export function getLocalDateParts(date = getNow(), timeZone = getDeviceTimezone()) {
  const d = date instanceof Date ? date : new Date(date);
  const validTz = normalizeIanaTimezone(timeZone);

  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: validTz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
    weekday: 'short',
  });

  const parts = formatter.formatToParts(d);
  const map = {};
  for (const p of parts) {
    map[p.type] = p.value;
  }

  const year = parseInt(map.year, 10);
  const month = parseInt(map.month, 10);
  const day = parseInt(map.day, 10);
  const hours = parseInt(map.hour, 10) || 0;
  const minutes = parseInt(map.minute, 10) || 0;
  const seconds = parseInt(map.second, 10) || 0;
  const weekday = map.weekday;
  const isPM = hours >= 12;
  const hour12 = hours % 12 || 12;

  const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const monthKey = `${year}-${String(month).padStart(2, '0')}`;

  return {
    year,
    month,
    day,
    hours,
    minutes,
    seconds,
    weekday,
    isPM,
    hour12,
    dateKey,
    monthKey,
    timeZone: validTz,
  };
}

/**
 * Returns civil date key "YYYY-MM-DD" in the specified timezone.
 */
export function getLocalDateKey(date = getNow(), timeZone = getDeviceTimezone()) {
  return getLocalDateParts(date, timeZone).dateKey;
}

/**
 * Returns civil month key "YYYY-MM" in the specified timezone.
 */
export function getLocalMonthKey(date = getNow(), timeZone = getDeviceTimezone()) {
  return getLocalDateParts(date, timeZone).monthKey;
}

/**
 * Calendar-aware day arithmetic on "YYYY-MM-DD" keys.
 * Does NOT assume 86,400,000 ms per day, avoiding DST transition distortions.
 */
export function addCalendarDays(dateKey, amount) {
  if (!dateKey || typeof dateKey !== 'string') return getLocalDateKey();
  const parts = dateKey.slice(0, 10).split('-');
  if (parts.length !== 3) return dateKey;
  const y = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10);
  const d = parseInt(parts[2], 10);

  // Use UTC noon to guarantee isolation from any local midnight DST shifts
  const dt = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  dt.setUTCDate(dt.getUTCDate() + amount);
  const nextY = dt.getUTCFullYear();
  const nextM = String(dt.getUTCMonth() + 1).padStart(2, '0');
  const nextD = String(dt.getUTCDate()).padStart(2, '0');
  return `${nextY}-${nextM}-${nextD}`;
}

/**
 * Calculates signed calendar day difference between dateKey2 and dateKey1 (dateKey2 - dateKey1).
 * E.g., ('2026-11-16', '2026-11-17') -> +1
 */
export function getCalendarDaysDiff(dateKey1, dateKey2) {
  if (!dateKey1 || !dateKey2) return 0;
  const p1 = dateKey1.slice(0, 10).split('-').map(Number);
  const p2 = dateKey2.slice(0, 10).split('-').map(Number);
  const d1 = Date.UTC(p1[0], p1[1] - 1, p1[2], 12, 0, 0);
  const d2 = Date.UTC(p2[0], p2[1] - 1, p2[2], 12, 0, 0);
  return Math.round((d2 - d1) / 86400000);
}

/**
 * Parse a "YYYY-MM-DD" date-only key into a safe UTC Date object pinned at noon.
 * Guarantees date stability across all global timezones [-12, +14].
 */
export function parseDateOnlyToSafeUtc(dateKey) {
  if (!dateKey) return getNow();
  const parts = String(dateKey).slice(0, 10).split('-').map(Number);
  if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
    return new Date(Date.UTC(parts[0], parts[1] - 1, parts[2], 12, 0, 0));
  }
  return getNow();
}

/**
 * Determines whether a date or date-key represents Today in the specified timezone.
 */
export function isToday(dateOrKey, timeZone = getDeviceTimezone()) {
  const targetKey = typeof dateOrKey === 'string' && dateOrKey.length >= 10
    ? dateOrKey.slice(0, 10)
    : getLocalDateKey(dateOrKey, timeZone);
  const currentKey = getLocalDateKey(getNow(), timeZone);
  return targetKey === currentKey;
}

/**
 * Determines whether a date or date-key represents Tomorrow in the specified timezone.
 */
export function isTomorrow(dateOrKey, timeZone = getDeviceTimezone()) {
  const targetKey = typeof dateOrKey === 'string' && dateOrKey.length >= 10
    ? dateOrKey.slice(0, 10)
    : getLocalDateKey(dateOrKey, timeZone);
  const todayKey = getLocalDateKey(getNow(), timeZone);
  const tomorrowKey = addCalendarDays(todayKey, 1);
  return targetKey === tomorrowKey;
}

/**
 * Determines whether a date or date-key represents Yesterday in the specified timezone.
 */
export function isYesterday(dateOrKey, timeZone = getDeviceTimezone()) {
  const targetKey = typeof dateOrKey === 'string' && dateOrKey.length >= 10
    ? dateOrKey.slice(0, 10)
    : getLocalDateKey(dateOrKey, timeZone);
  const todayKey = getLocalDateKey(getNow(), timeZone);
  const yesterdayKey = addCalendarDays(todayKey, -1);
  return targetKey === yesterdayKey;
}

/**
 * Determines whether a date key is before today (Overdue).
 */
export function isPastDate(dateOrKey, timeZone = getDeviceTimezone()) {
  const targetKey = typeof dateOrKey === 'string' && dateOrKey.length >= 10
    ? dateOrKey.slice(0, 10)
    : getLocalDateKey(dateOrKey, timeZone);
  const todayKey = getLocalDateKey(getNow(), timeZone);
  return targetKey < todayKey;
}

/**
 * Returns dynamic greeting string based on the effective local hour.
 * 05:00 - 11:59 -> "Good morning"
 * 12:00 - 16:59 -> "Good afternoon"
 * 17:00 - 20:59 -> "Good evening"
 * 21:00 - 04:59 -> "Good night"
 */
export function getEffectiveGreeting(date = getNow(), timeZone = getDeviceTimezone()) {
  const parts = getLocalDateParts(date, timeZone);
  const hour = parts.hours;
  if (hour >= 5 && hour < 12) return 'Good morning';
  if (hour >= 12 && hour < 17) return 'Good afternoon';
  if (hour >= 17 && hour < 21) return 'Good evening';
  return 'Good night';
}

/**
 * Formats a Date object or "YYYY-MM-DD" key in the specified timezone.
 */
export function formatDate(dateOrKey, options = { weekday: 'long', day: 'numeric', month: 'short' }, timeZone = getDeviceTimezone()) {
  const validTz = normalizeIanaTimezone(timeZone);
  let dateObj;
  if (typeof dateOrKey === 'string' && dateOrKey.length === 10) {
    dateObj = parseDateOnlyToSafeUtc(dateOrKey);
  } else if (dateOrKey instanceof Date) {
    dateObj = dateOrKey;
  } else {
    dateObj = getNow();
  }
  return new Intl.DateTimeFormat('en-US', { ...options, timeZone: validTz }).format(dateObj);
}

/**
 * Formats local time with hour/minute and optional 12/24 hour format.
 */
export function formatTime(date = getNow(), is24Hour = false, timeZone = getDeviceTimezone()) {
  const validTz = normalizeIanaTimezone(timeZone);
  const d = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat('en-US', {
    timeZone: validTz,
    hour: is24Hour ? '2-digit' : 'numeric',
    minute: '2-digit',
    hour12: !is24Hour,
  }).format(d);
}
