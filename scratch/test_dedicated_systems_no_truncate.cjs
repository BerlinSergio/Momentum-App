const fs = require('fs');
const assert = require('assert');

['src/CalendarsMainLightMode.jsx', 'src/CalendarsMainDarkMode.jsx'].forEach((file) => {
  const content = fs.readFileSync(file, 'utf8');

  // Extract the Dedicated Systems block
  const startIdx = content.indexOf('{/* Dedicated Systems Gateways Section with Single-Line Horizontal Organization */}');
  const endIdx = content.indexOf('{/* Calendar Strip Header with Functional View Selector */}');
  assert(startIdx !== -1 && endIdx !== -1, `Could not isolate Dedicated Systems block in ${file}`);

  const block = content.substring(startIdx, endIdx);

  // Assert NO truncation or line-clamp classes
  assert(!block.includes('truncate'), `Found truncate class in ${file} Dedicated Systems cards!`);
  assert(!block.includes('line-clamp'), `Found line-clamp in ${file} Dedicated Systems cards!`);

  // Assert whitespace-nowrap on subtext
  const nowrapMatches = block.match(/whitespace-nowrap/g);
  // Each card has at least 3 whitespace-nowrap (title, badge, subtext) = 9 total
  assert(nowrapMatches && nowrapMatches.length >= 9, `Expected at least 9 whitespace-nowrap in ${file}, found ${nowrapMatches ? nowrapMatches.length : 0}`);

  // Assert presence of text-[10.5px] font-medium on subtext
  const subtextMatches = block.match(/text-\[10\.5px\] font-medium/g);
  assert(subtextMatches && subtextMatches.length === 3, `Expected 3 text-[10.5px] subtexts, found ${subtextMatches ? subtextMatches.length : 0} in ${file}`);

  // Assert middle text container flex-1 min-w-0 pr-2
  const textContainerMatches = block.match(/flex-1 min-w-0 pr-2 flex flex-col justify-center/g);
  assert(textContainerMatches && textContainerMatches.length === 3, `Expected 3 flex-1 min-w-0 pr-2 text containers, found ${textContainerMatches ? textContainerMatches.length : 0} in ${file}`);

  // Assert left icons and chevrons have flex-shrink-0
  const shrinkMatches = block.match(/flex-shrink-0/g);
  // 3 left icons + 3 right chevrons = 6 flex-shrink-0
  assert(shrinkMatches && shrinkMatches.length >= 6, `Expected at least 6 flex-shrink-0 in ${file}, found ${shrinkMatches ? shrinkMatches.length : 0}`);

  // Assert items-center justify-between on cards
  const cardMatches = block.match(/flex items-center justify-between p-3\.5 rounded-2xl/g);
  assert(cardMatches && cardMatches.length === 3, `Expected 3 flex items-center justify-between cards, found ${cardMatches ? cardMatches.length : 0} in ${file}`);

  console.log(`PASS: ${file} verified strictly single-line horizontal with 0 truncation!`);
});

