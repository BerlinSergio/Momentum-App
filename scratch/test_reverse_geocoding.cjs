const fs = require('fs');
const assert = require('assert');

['src/CitySelectionDarkMode.jsx', 'src/CitySelectionLightMode.jsx'].forEach((file) => {
  const content = fs.readFileSync(file, 'utf8');

  // Verify reverse geocoding API URL is called
  assert(
    content.includes('api.bigdatacloud.net/data/reverse-geocode-client'),
    `${file} must call BigDataCloud reverse geocode client`
  );

  // Verify extracting city, locality, principalSubdivision, countryName
  assert(
    content.includes('data.city || data.locality || data.principalSubdivision'),
    `${file} must extract city/locality/subdivision from API`
  );
  assert(
    content.includes('data.countryName'),
    `${file} must extract countryName from API`
  );

  // Verify loading state
  assert(
    content.includes('Locating city...'),
    `${file} must show 'Locating city...' while locating`
  );
  assert(
    content.includes('Resolving GPS coordinates...'),
    `${file} must show 'Resolving GPS coordinates...' while locating`
  );

  // Verify dynamic rendering in hero card
  assert(
    content.includes('localSelectedCity?.name || \'Kabul\''),
    `${file} must dynamically display localSelectedCity.name`
  );
  assert(
    content.includes('localSelectedCity?.country || \'Afghanistan\''),
    `${file} must dynamically display localSelectedCity.country`
  );

  console.log(`PASS: Reverse geocoding fully verified in ${file}`);
});

console.log('ALL REVERSE GEOCODING VERIFICATIONS PASSED!');

