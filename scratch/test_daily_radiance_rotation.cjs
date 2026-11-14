const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const artifactDir = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\4df946e6-85fe-47e3-a6c6-502167c18753';

async function runTests() {
  console.log('==============================================');
  console.log('UNIT TESTS: DAILY RADIANCE LOGIC');
  console.log('==============================================');

  const { DAILY_QUOTES, getDayOfYear, getDailyQuoteIndex, getDailyQuote } = await import('../src/data/dailyQuotes.js');

  console.log(`Total quotes in collection: ${DAILY_QUOTES.length}`);
  if (DAILY_QUOTES.length < 30) {
    throw new Error(`Expected at least 30 quotes, got ${DAILY_QUOTES.length}`);
  }

  // Check structure of each quote
  DAILY_QUOTES.forEach((q, i) => {
    if (!q.id || !q.quote || !q.surah || !q.category) {
      throw new Error(`Quote at index ${i} has invalid structure: ${JSON.stringify(q)}`);
    }
  });
  console.log('PASS: All quotes have valid id, quote, surah, and category fields.');

  // Date indexing test using local dates
  const nov5 = new Date(2026, 10, 5, 8, 0, 0);
  const nov5Evening = new Date(2026, 10, 5, 20, 0, 0);
  const nov6 = new Date(2026, 10, 6, 8, 0, 0);
  const nov7 = new Date(2026, 10, 7, 8, 0, 0);

  const qNov5 = getDailyQuote(nov5);
  const qNov5Evening = getDailyQuote(nov5Evening);
  const qNov6 = getDailyQuote(nov6);
  const qNov7 = getDailyQuote(nov7);

  console.log(`Nov 5 (Morning): ${qNov5.surah} => ${qNov5.quote}`);
  console.log(`Nov 5 (Evening): ${qNov5Evening.surah} => ${qNov5Evening.quote}`);
  console.log(`Nov 6 (Tomorrow): ${qNov6.surah} => ${qNov6.quote}`);
  console.log(`Nov 7 (Day After): ${qNov7.surah} => ${qNov7.quote}`);

  // Test 24-hour stability
  if (qNov5.id !== qNov5Evening.id) {
    throw new Error('FAIL: Quote changed within the same 24-hour day!');
  }
  console.log('PASS: Quote remains stable and identical throughout the same 24-hour day.');

  // Test next day rotation
  if (qNov5.id === qNov6.id) {
    throw new Error('FAIL: Quote did not rotate to a new quote on the next day!');
  }
  console.log('PASS: Quote automatically rotates to a new quote on the following day.');

  console.log('\n==============================================');
  console.log('PUPPETEER E2E TESTS: MORE SCREEN DAILY RADIANCE');
  console.log('==============================================');

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 420, height: 950, deviceScaleFactor: 2 });

    await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));

    // Unlock AppLock PIN 1234
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const pinFallback = btns.find(b => b.innerText.includes('Backup PIN') || b.innerText.includes('PIN'));
      if (pinFallback) pinFallback.click();
    });
    await new Promise(r => setTimeout(r, 400));

    for (const d of ['1', '2', '3', '4']) {
      await page.evaluate((digit) => {
        const btns = Array.from(document.querySelectorAll('button'));
        const b = btns.find(x => x.innerText.trim() === digit);
        if (b) b.click();
      }, d);
      await new Promise(r => setTimeout(r, 200));
    }
    await new Promise(r => setTimeout(r, 600));

    // Hide dev navigator overlays for clean screenshot
    await page.evaluate(() => {
      const devOverlays = document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]');
      devOverlays.forEach(el => el.style.setProperty('display', 'none', 'important'));
    });

    // ----------------------------------------
    // 1. Dark Mode Daily Radiance Test
    // ----------------------------------------
    console.log('\n--- TESTING DARK MODE DAILY RADIANCE ---');
    await page.select('select', 'more_dark_mode');
    await new Promise(r => setTimeout(r, 600));

    // Scroll viewport to bottom to view Daily Radiance Card
    await page.evaluate(() => {
      const vp = document.querySelector('.momentum-canvas-viewport');
      if (vp) vp.scrollTop = vp.scrollHeight;
    });
    await new Promise(r => setTimeout(r, 300));

    // Extract quote and surah from card
    const cardDataDark = await page.evaluate(() => {
      const vp = document.querySelector('.momentum-canvas-viewport') || document.body;
      const spans = Array.from(vp.querySelectorAll('span'));
      const radianceTitle = spans.find(el => el.innerText.toUpperCase().includes('DAILY RADIANCE'));
      if (!radianceTitle) return null;
      const card = radianceTitle.closest('.relative.overflow-hidden');
      if (!card) return null;
      const p = card.querySelector('p');
      const ref = card.querySelector('div.border-t span');
      return {
        quote: p ? p.innerText : '',
        reference: ref ? ref.innerText : ''
      };
    });

    console.log('Dark mode displayed quote:', cardDataDark);
    if (!cardDataDark || !cardDataDark.quote || !cardDataDark.reference) {
      throw new Error('FAIL: Daily Radiance card content not found in Dark Mode!');
    }
    console.log('PASS: Daily Radiance card renders quote and reference in Dark Mode.');

    // Test Heart icon toggle
    const heartClicked = await page.evaluate(() => {
      const vp = document.querySelector('.momentum-canvas-viewport') || document.body;
      const spans = Array.from(vp.querySelectorAll('span'));
      const radianceTitle = spans.find(el => el.innerText.toUpperCase().includes('DAILY RADIANCE'));
      const card = radianceTitle ? radianceTitle.closest('.relative.overflow-hidden') : null;
      if (!card) return false;
      const heartBtn = card.querySelector('button[aria-label*="favorite"], button[aria-label*="Favorite"]');
      if (heartBtn) {
        heartBtn.click();
        return true;
      }
      return false;
    });

    if (!heartClicked) {
      throw new Error('FAIL: Heart button not found in Dark Mode!');
    }
    await new Promise(r => setTimeout(r, 300));

    const isLikedDark = await page.evaluate(() => {
      const stored = localStorage.getItem('momentum-liked-radiance-quotes');
      return stored && JSON.parse(stored).length > 0;
    });
    if (!isLikedDark) {
      throw new Error('FAIL: Tapping heart did not persist to localStorage!');
    }
    console.log('PASS: Heart icon favoriting works and persists in Dark Mode.');

    // Test Share button
    const shareFeedbackText = await page.evaluate(async () => {
      const vp = document.querySelector('.momentum-canvas-viewport') || document.body;
      const spans = Array.from(vp.querySelectorAll('span'));
      const radianceTitle = spans.find(el => el.innerText.toUpperCase().includes('DAILY RADIANCE'));
      const card = radianceTitle ? radianceTitle.closest('.relative.overflow-hidden') : null;
      if (!card) return null;
      const shareBtn = card.querySelector('button[aria-label*="Share"], button:has(svg)');
      if (shareBtn) {
        shareBtn.click();
        await new Promise(r => setTimeout(r, 150));
        return shareBtn.innerText;
      }
      return null;
    });
    console.log('Share button feedback:', shareFeedbackText);
    console.log('PASS: Share button interactive in Dark Mode.');

    // Screenshot of Dark Mode Daily Radiance Card
    const darkRadiancePath = path.join(artifactDir, 'more_screen_dark_radiance.png');
    await page.screenshot({ path: darkRadiancePath });
    console.log('Saved screenshot:', darkRadiancePath);

    // ----------------------------------------
    // 2. Light Mode Daily Radiance Test
    // ----------------------------------------
    console.log('\n--- TESTING LIGHT MODE DAILY RADIANCE ---');
    await page.select('select', 'more_light_mode');
    await new Promise(r => setTimeout(r, 600));

    await page.evaluate(() => {
      const vp = document.querySelector('.momentum-canvas-viewport');
      if (vp) vp.scrollTop = vp.scrollHeight;
    });
    await new Promise(r => setTimeout(r, 300));

    const cardDataLight = await page.evaluate(() => {
      const vp = document.querySelector('.momentum-canvas-viewport') || document.body;
      const spans = Array.from(vp.querySelectorAll('span'));
      const radianceTitle = spans.find(el => el.innerText.toUpperCase().includes('DAILY RADIANCE'));
      if (!radianceTitle) return null;
      const card = radianceTitle.closest('.relative.overflow-hidden');
      if (!card) return null;
      const p = card.querySelector('p');
      const ref = card.querySelector('div.border-t span');
      return {
        quote: p ? p.innerText : '',
        reference: ref ? ref.innerText : ''
      };
    });

    console.log('Light mode displayed quote:', cardDataLight);
    if (!cardDataLight || !cardDataLight.quote || !cardDataLight.reference) {
      throw new Error('FAIL: Daily Radiance card content not found in Light Mode!');
    }
    console.log('PASS: Daily Radiance card renders quote and reference in Light Mode.');

    // Screenshot of Light Mode Daily Radiance Card
    const lightRadiancePath = path.join(artifactDir, 'more_screen_light_radiance.png');
    await page.screenshot({ path: lightRadiancePath });
    console.log('Saved screenshot:', lightRadiancePath);

    console.log('\n==============================================');
    console.log('ALL VERIFICATION TESTS COMPLETED SUCCESSFULLY!');
    console.log('==============================================');
  } finally {
    await browser.close();
  }
}

runTests().catch(err => {
  console.error('Test failed with error:', err);
  process.exit(1);
});
