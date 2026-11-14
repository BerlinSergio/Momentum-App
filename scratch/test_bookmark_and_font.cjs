const puppeteer = require('puppeteer');
const path = require('path');

const artDir = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\4df946e6-85fe-47e3-a6c6-502167c18753';

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox']
  });

  try {
    console.log('\n===============================================================');
    console.log('=== TESTING GLOBAL FONT SYNC & FUNCTIONAL BOOKMARK BUTTON ===');
    console.log('===============================================================');

    for (const mode of ['dark', 'light']) {
      const isDark = mode === 'dark';
      const screenRoute = isDark ? 'prayer_times_dark_mode' : 'prayer_times_light_mode';
      console.log(`\nTesting ${mode.toUpperCase()} MODE (${screenRoute})...`);

      const context = await browser.createBrowserContext();
      const page = await context.newPage();
      await page.setViewport({ width: 420, height: 1080, deviceScaleFactor: 2 });

      await page.goto(`http://localhost:5173/?screen=${screenRoute}`);
      await new Promise(r => setTimeout(r, 800));

      // Hide dev navigator sidebar if present
      await page.evaluate(() => {
        document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]').forEach(el => el.style.setProperty('display', 'none', 'important'));
      });

      // 1. Audit Root Font Inheritance & Rogue Overrides
      const fontAudit = await page.evaluate(() => {
        const rootDiv = document.querySelector('.min-h-screen.flex.flex-col');
        const computed = rootDiv ? window.getComputedStyle(rootDiv) : null;
        const allElements = rootDiv ? Array.from(rootDiv.querySelectorAll('*')) : [];
        const rogueInline = allElements.filter(el => el.style && el.style.fontFamily);

        return {
          hasRoot: !!rootDiv,
          hasFontSans: rootDiv?.classList.contains('font-sans'),
          hasFontInter: rootDiv?.classList.contains('font-inter'),
          hasAntialiased: rootDiv?.classList.contains('antialiased'),
          computedFontFamily: computed?.fontFamily,
          rogueCount: rogueInline.length,
          rogueDetails: rogueInline.map(el => `${el.tagName}: ${el.style.fontFamily}`),
        };
      });

      console.log(`[${mode}] Font Inheritance Audit:`, fontAudit);
      if (!fontAudit.hasFontSans || !fontAudit.hasAntialiased) {
        throw new Error(`[${mode}] Root wrapper missing font-sans or antialiased!`);
      }
      if (!fontAudit.computedFontFamily.includes('Inter')) {
        throw new Error(`[${mode}] Root font-family does not compute to Inter! Got: ${fontAudit.computedFontFamily}`);
      }
      if (fontAudit.rogueCount > 0) {
        throw new Error(`[${mode}] Found ${fontAudit.rogueCount} rogue inline fontFamily styles: ${fontAudit.rogueDetails.join(', ')}`);
      }
      console.log(`✅ [${mode}] Global font strictly inherits Inter with 0 rogue overrides.`);

      // 2. Audit Daily Inspiration Bookmark Button - Initial State
      const initialBookmarkAudit = await page.evaluate(() => {
        const bookmarkBtn = document.querySelector('button[title*="Bookmark"], button[aria-label*="Bookmark"]');
        const svg = bookmarkBtn ? bookmarkBtn.querySelector('svg') : null;
        const computedSvg = svg ? window.getComputedStyle(svg) : null;

        return {
          hasButton: !!bookmarkBtn,
          buttonClass: bookmarkBtn?.className,
          hasActiveScale: bookmarkBtn?.classList.contains('active:scale-95') || bookmarkBtn?.className.includes('active:scale-95'),
          hasTransitionTransform: bookmarkBtn?.className.includes('transition-transform'),
          hasSvg: !!svg,
          svgClass: svg?.getAttribute('class'),
          svgColor: computedSvg?.color,
          svgFill: computedSvg?.fill,
          isFilled: svg?.classList.contains('fill-indigo-600') || svg?.classList.contains('fill-indigo-400') || (computedSvg?.fill !== 'none' && computedSvg?.fill !== 'rgba(0, 0, 0, 0)'),
        };
      });

      console.log(`[${mode}] Initial Bookmark Audit (Unbookmarked):`, initialBookmarkAudit);
      if (!initialBookmarkAudit.hasButton) {
        throw new Error(`[${mode}] Daily Inspiration bookmark button not found!`);
      }
      if (!initialBookmarkAudit.hasActiveScale || !initialBookmarkAudit.hasTransitionTransform) {
        throw new Error(`[${mode}] Bookmark button missing active:scale-95 or transition-transform!`);
      }
      if (initialBookmarkAudit.isFilled) {
        throw new Error(`[${mode}] Bookmark icon should be unbookmarked/outlined initially!`);
      }
      console.log(`✅ [${mode}] Bookmark button initialized as outlined icon with active:scale-95 effect.`);

      // Capture unbookmarked screenshot
      const unbookmarkedPath = path.join(artDir, `prayer_times_bookmark_unbookmarked_${mode}.png`);
      await page.screenshot({ path: unbookmarkedPath });
      console.log(`📸 Saved screenshot (unbookmarked): ${unbookmarkedPath}`);

      // 3. Test Clicking to Toggle Bookmark ON
      await page.click('button[title*="Bookmark"], button[aria-label*="Bookmark"]');
      await new Promise(r => setTimeout(r, 200));

      const bookmarkedAudit = await page.evaluate((isDark) => {
        const bookmarkBtn = document.querySelector('button[title*="Bookmark"], button[aria-label*="Bookmark"]');
        const svg = bookmarkBtn ? bookmarkBtn.querySelector('svg') : null;
        const computedSvg = svg ? window.getComputedStyle(svg) : null;

        return {
          buttonTitle: bookmarkBtn?.getAttribute('title'),
          svgClass: svg?.getAttribute('class'),
          hasFillClass: isDark ? svg?.classList.contains('fill-indigo-400') : svg?.classList.contains('fill-indigo-600'),
          hasTextClass: isDark ? svg?.classList.contains('text-indigo-400') : svg?.classList.contains('text-indigo-600'),
          computedColor: computedSvg?.color,
          computedFill: computedSvg?.fill,
        };
      }, isDark);

      console.log(`[${mode}] Clicked Bookmark Audit (Bookmarked):`, bookmarkedAudit);
      if (!bookmarkedAudit.hasFillClass || !bookmarkedAudit.hasTextClass) {
        throw new Error(`[${mode}] Bookmark icon did not apply vibrant fill class on click! Got: ${bookmarkedAudit.svgClass}`);
      }
      console.log(`✅ [${mode}] Bookmark icon successfully turned vibrant solid filled on click.`);

      // Capture bookmarked screenshot
      const bookmarkedPath = path.join(artDir, `prayer_times_bookmark_bookmarked_${mode}.png`);
      await page.screenshot({ path: bookmarkedPath });
      console.log(`📸 Saved screenshot (bookmarked): ${bookmarkedPath}`);

      // 4. Test Clicking to Toggle Bookmark OFF
      await page.click('button[title*="Bookmark"], button[aria-label*="Bookmark"]');
      await new Promise(r => setTimeout(r, 200));

      const toggledOffAudit = await page.evaluate(() => {
        const bookmarkBtn = document.querySelector('button[title*="Bookmark"], button[aria-label*="Bookmark"]');
        const svg = bookmarkBtn ? bookmarkBtn.querySelector('svg') : null;
        return {
          hasOutlineClass: svg?.classList.contains('text-slate-400'),
          svgClass: svg?.getAttribute('class'),
        };
      });

      console.log(`[${mode}] Toggled Off Bookmark Audit:`, toggledOffAudit);
      if (!toggledOffAudit.hasOutlineClass) {
        throw new Error(`[${mode}] Bookmark icon did not revert to text-slate-400 outlined state!`);
      }
      console.log(`✅ [${mode}] Bookmark button successfully toggles between bookmarked and unbookmarked states.`);

      await context.close();
    }

    console.log('\n===============================================================');
    console.log('🎉 ALL GLOBAL FONT & BOOKMARK TESTS PASSED! 🎉');
    console.log('===============================================================\n');
  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
