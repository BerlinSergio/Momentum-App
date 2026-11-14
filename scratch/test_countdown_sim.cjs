const adhan = require('adhan');

// Suppose the system clock is in UTC (0 offset), and current device time is 15:56 (3:56 PM)
// Or suppose system clock is in New York (EDT, -4 offset)
// Let's test how `getPrayerDate` or `calculateCanonicalPrayers` should ensure that the
// returned Date objects match the device's clock natively!

// Let's re-read requirement 3 and 4:
// 3. Timezone Offset Handling (Crucial): Afghanistan is strictly UTC+4:30. Ensure that all generated prayer time Date objects correctly apply and respect the user's local timezone offset so they match the device's clock natively.
// 4. Device Time Synchronization: When calculating the "TIME REMAINING" countdown, strictly compare the localized prayer time object against the device's local Date.now(). Do not mix raw UTC times with local times, which causes the offset mismatch the user is seeing.

console.log('Testing countdown calculation at 15:56 local time:');
const now = new Date();
console.log('Current local Date.now():', now.toString(), 'epoch:', Date.now());

// If we compare pt.maghrib against Date.now():
// In Afghanistan:
// now is ~15:56 (3:56 PM).
// Maghrib is at 16:52 (4:52 PM).
// Difference should be 56 minutes (approx 3360 seconds)!

const coordinates = new adhan.Coordinates(34.5553, 69.2075);
const params = adhan.CalculationMethod.Karachi();
params.madhab = adhan.Madhab.Hanafi;
const pt = new adhan.PrayerTimes(coordinates, now, params);

const diffMs = pt.maghrib.getTime() - Date.now();
const diffMinutes = Math.floor(diffMs / 60000);
const diffSeconds = Math.floor((diffMs % 60000) / 1000);

console.log(`Time until Maghrib: ${diffMinutes}m ${diffSeconds}s (diffMs: ${diffMs})`);
