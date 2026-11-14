const fs = require('fs');
const assert = require('assert');

['src/CalendarsMainLightMode.jsx', 'src/CalendarsMainDarkMode.jsx'].forEach((file) => {
  const content = fs.readFileSync(file, 'utf8');

  // Extract the Active Confluence Date Cards block
  const startIdx = content.indexOf('{/* Consistent Spacing & Padding for Single-Line Date Cards Stack */}');
  const endIdx = content.indexOf('{/* Dedicated Systems Gateways Section */}');
  assert(startIdx !== -1 && endIdx !== -1, `Could not isolate Date Cards block in ${file}`);

  const block = content.substring(startIdx, endIdx);

  // Assert NO truncation or wrapping classes in this block
  assert(!block.includes('truncate'), `Found truncate class in ${file} date cards!`);
  assert(!block.includes('line-clamp'), `Found line-clamp in ${file} date cards!`);
  assert(!block.includes('break-words'), `Found break-words in ${file} date cards!`);

  // Assert presence of whitespace-nowrap on all 3 main date text spans
  const nowrapMatches = block.match(/whitespace-nowrap/g);
  // Each card has whitespace-nowrap on sub-label and main date text, so at least 6
  assert(nowrapMatches && nowrapMatches.length >= 6, `Expected at least 6 whitespace-nowrap occurrences, found ${nowrapMatches ? nowrapMatches.length : 0} in ${file}`);

  // Assert presence of text-[13px] font-bold on main date text
  const fontSizeMatches = block.match(/text-\[13px\] font-bold/g);
  assert(fontSizeMatches && fontSizeMatches.length === 3, `Expected 3 text-[13px] font-bold main dates, found ${fontSizeMatches ? fontSizeMatches.length : 0} in ${file}`);

  // Assert card padding px-3.5 py-3
  const cardPaddingMatches = block.match(/px-3\.5 py-3 rounded-2xl/g);
  assert(cardPaddingMatches && cardPaddingMatches.length === 3, `Expected 3 px-3.5 py-3 cards, found ${cardPaddingMatches ? cardPaddingMatches.length : 0} in ${file}`);

  // Assert badge text-[10px] and flex-shrink-0
  const badgeMatches = block.match(/flex-shrink-0 px-2\.5 py-0\.5 rounded-full text-\[10px\] font-semibold tracking-wider uppercase/g);
  assert(badgeMatches && badgeMatches.length === 3, `Expected 3 compact flex-shrink-0 badges, found ${badgeMatches ? badgeMatches.length : 0} in ${file}`);

  // Assert icon mr-2.5 and flex-shrink-0
  const iconMatches = block.match(/flex-shrink-0 mr-2\.5/g);
  assert(iconMatches && iconMatches.length === 3, `Expected 3 compact icon margins, found ${iconMatches ? iconMatches.length : 0} in ${file}`);

  // Assert text container flex-1 min-w-0 pr-2
  const containerMatches = block.match(/flex-1 min-w-0 pr-2 flex flex-col justify-center/g);
  assert(containerMatches && containerMatches.length === 3, `Expected 3 flex-1 min-w-0 pr-2 text containers, found ${containerMatches ? containerMatches.length : 0} in ${file}`);

  console.log(`PASS: ${file} verified strictly single-line horizontal with 0 truncation!`);
});

