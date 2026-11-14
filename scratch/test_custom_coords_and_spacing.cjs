const fs = require('fs');
const assert = require('assert');
const { useLocationStore } = require('../src/store/useLocationStore.js');

// 1. Verify custom coords in store
useLocationStore.getState().setCustomCoordinates({
  latitude: '34.5000',
  longitude: '69.1000',
  elevation: '1800',
  name: 'Pagham Valley Custom',
  country: 'Afghanistan',
});

const cur = useLocationStore.getState().selectedCity;
assert(cur.isCustom, 'Location must be marked as custom');
assert.strictEqual(cur.latitude, 34.5);
assert.strictEqual(cur.longitude, 69.1);
assert.strictEqual(cur.elevationMeters, 1800);

// 2. Verify UI & Spacing in CitySelection pair
['src/CitySelectionDarkMode.jsx', 'src/CitySelectionLightMode.jsx'].forEach((file) => {
  const content = fs.readFileSync(file, 'utf8');

  // Verify flex flex-col gap-3 in city list
  assert(
    content.includes('<div className="flex flex-col gap-3">'),
    `${file} must have strict flex flex-col gap-3 layout for uniform spacing`
  );

  // Verify mb-6 on city list section
  assert(
    content.includes('rounded-3xl p-4 mb-6'),
    `${file} must have mb-6 on city list section`
  );

  // Verify mb-6 on accordion section
  assert(
    content.includes('rounded-3xl mb-6 overflow-hidden'),
    `${file} must have mb-6 on accordion section`
  );

  // Verify applyCustomCoordsBtn
  assert(
    content.includes('id="applyCustomCoordsBtn"'),
    `${file} must have applyCustomCoordsBtn`
  );

  // Verify direct setSelectedCity call in handleApplyCustomCoords
  assert(
    content.includes('setSelectedCity(customLoc);'),
    `${file} must directly commit customLoc to global store`
  );

  // Verify border parity (no border-2 shifts)
  assert(
    !content.includes('border-2 border-primary'),
    `${file} should not have border-2 shifts; uses border with ring-1 for identical box sizing`
  );

  console.log(`PASS: Custom coordinates and spacing verified in ${file}`);
});

console.log('ALL TESTS PASSED SUCCESSFULLY!');

