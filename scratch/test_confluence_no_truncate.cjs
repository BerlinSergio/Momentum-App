const fs = require('fs');
const assert = require('assert');

['src/CalendarsMainLightMode.jsx', 'src/CalendarsMainDarkMode.jsx'].forEach((file) => {
  const content = fs.readFileSync(file, 'utf8');

  // Verify the Active Confluence section exists
  assert(content.includes('Active Confluence'), `Missing Active Confluence in ${file}`);

  // Check the 3 cards
  assert(content.includes('Civil • Gregorian'), `Missing Gregorian card in ${file}`);
  assert(content.includes('Spiritual • Hijri Qamari'), `Missing Hijri card in ${file}`);
  assert(content.includes('Solar • Hijri Shamsi'), `Missing Shamsi card in ${file}`);

  // Extract the Active Confluence Date Cards block
  const startIdx = content.indexOf('{/* Consistent Spacing & Padding for Date Cards Stack */}');
  const endIdx = content.indexOf('{/* Dedicated Systems Gateways Section */}');
  assert(startIdx !== -1 && endIdx !== -1, `Could not isolate Date Cards block in ${file}`);

  const block = content.substring(startIdx, endIdx);

  // Assert NO truncation classes in this block
  assert(!block.includes('truncate'), `Found truncate class in ${file} date cards!`);
  assert(!block.includes('whitespace-nowrap'), `Found whitespace-nowrap in ${file} date cards!`);
  assert(!block.includes('line-clamp'), `Found line-clamp in ${file} date cards!`);

  // Assert presence of flex-shrink-0 on badges
  const badgeMatches = block.match(/flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase/g);
  assert(badgeMatches && badgeMatches.length === 3, `Expected 3 flex-shrink-0 badges, found ${badgeMatches ? badgeMatches.length : 0} in ${file}`);

  // Assert presence of flex-1 min-w-0 pr-3 on text containers
  const containerMatches = block.match(/flex-1 min-w-0 pr-3 flex flex-col/g);
  assert(containerMatches && containerMatches.length === 3, `Expected 3 flex-1 min-w-0 pr-3 text containers, found ${containerMatches ? containerMatches.length : 0} in ${file}`);

  // Assert flex items-center justify-between on card containers
  const cardMatches = block.match(/flex items-center justify-between px-5 py-4 rounded-2xl/g);
  assert(cardMatches && cardMatches.length === 3, `Expected 3 flex items-center justify-between cards, found ${cardMatches ? cardMatches.length : 0} in ${file}`);

  // Assert text-sm font-bold on date text
  const textMatches = block.match(/text-sm font-bold/g);
  assert(textMatches && textMatches.length === 3, `Expected 3 text-sm font-bold dates, found ${textMatches ? textMatches.length : 0} in ${file}`);

  console.log(`PASS: ${file} verified successfully with 0 truncation and perfect flexbox setup!`);
});

