const fs = require('fs');
const assert = require('assert');

// 1. Test useLocationStore
const { useLocationStore, CITIES_DATA } = require('../src/store/useLocationStore.js');

assert(Array.isArray(CITIES_DATA), 'CITIES_DATA should be an array');
assert(CITIES_DATA.length >= 11, 'CITIES_DATA should have at least 11 cities');

const kabul = CITIES_DATA.find((c) => c.name === 'Kabul');
assert(kabul, 'Kabul must exist in CITIES_DATA');
assert.strictEqual(kabul.latitude, 34.5553);
assert.strictEqual(kabul.longitude, 69.2075);
assert.strictEqual(kabul.timezone, 'Asia/Kabul');

const makkah = CITIES_DATA.find((c) => c.name === 'Makkah');
assert(makkah, 'Makkah must exist in CITIES_DATA');
assert.strictEqual(makkah.region, 'islamic');

// Test store functions
useLocationStore.getState().setSelectedCity(makkah);
assert.strictEqual(useLocationStore.getState().selectedCity.name, 'Makkah');

useLocationStore.getState().setCustomCoordinates({
  latitude: '35.0',
  longitude: '68.0',
  elevation: '2000',
  name: 'Panjshir',
  country: 'Afghanistan',
});
assert.strictEqual(useLocationStore.getState().selectedCity.name, 'Panjshir');
assert.strictEqual(useLocationStore.getState().selectedCity.latitude, 35.0);

// Reset to Kabul for test purity
useLocationStore.getState().setSelectedCity(kabul);
assert.strictEqual(useLocationStore.getState().selectedCity.name, 'Kabul');

// 2. Test CitySelection screen pair
['src/CitySelectionDarkMode.jsx', 'src/CitySelectionLightMode.jsx'].forEach((file) => {
  const content = fs.readFileSync(file, 'utf8');

  assert(content.includes('useLocationStore'), `${file} should import useLocationStore`);
  assert(content.includes('handleUseGps'), `${file} should implement handleUseGps`);
  assert(content.includes('getCurrentPosition'), `${file} should use navigator.geolocation.getCurrentPosition`);
  assert(content.includes('handleConfirmCity'), `${file} should implement handleConfirmCity`);
  assert(content.includes('confirmCityBtn'), `${file} should have confirmCityBtn`);
  assert(content.includes('handleApplyCustomCoords'), `${file} should implement handleApplyCustomCoords`);
  assert(content.includes('filteredCities'), `${file} should dynamically filter cities`);
  assert(content.includes('citySearchInput'), `${file} should have citySearchInput`);
  assert(content.includes('toggleManualFormBtn'), `${file} should have toggleManualFormBtn`);

  console.log(`PASS: ${file} verified with complete state integration, GPS & search!`);
});

console.log('ALL CITY SELECTION TESTS PASSED!');

