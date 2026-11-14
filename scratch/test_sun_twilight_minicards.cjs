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
    console.log('=== TESTING SUN & TWILIGHT GLASSMORPHIC RECTANGULAR MINI-CARDS ===');
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

      // Audit Sun & Twilight Reference section
      const audit = await page.evaluate((isDark) => {
        const headings = Array.from(document.querySelectorAll('h3'));
        const sunHeading = headings.find(h => h.innerText.toUpperCase().includes('SUN & TWILIGHT REFERENCE'));
        const parentSection = sunHeading ? sunHeading.closest('.rounded-2xl') : null;

        const gridEl = parentSection ? parentSection.querySelector('.grid.grid-cols-3.gap-3') : null;
        const items = gridEl ? Array.from(gridEl.children) : [];

        const itemsDetails = items.map(item => {
          const icon = item.querySelector('svg');
          const spans = Array.from(item.querySelectorAll('span'));
          const labelSpan = spans[0];
          const timeSpan = spans[1];

          const itemComputed = window.getComputedStyle(item);
          const labelComputed = labelSpan ? window.getComputedStyle(labelSpan) : null;
          const timeComputed = timeSpan ? window.getComputedStyle(timeSpan) : null;

          return {
            classes: item.className,
            hasRoundedFull: item.classList.contains('rounded-full') || item.className.includes('rounded-full'),
            hasRounded2xl: item.classList.contains('rounded-2xl'),
            hasP3: item.classList.contains('p-3'),
            hasFlexCol: item.classList.contains('flex-col'),
            hasItemsCenter: item.classList.contains('items-center'),
            hasJustifyCenter: item.classList.contains('justify-center'),
            hasGap15: item.classList.contains('gap-1.5'),
            hasBackdropBlur: item.className.includes('backdrop-blur-md'),
            hasShadowSm: item.classList.contains('shadow-sm'),
            iconClass: icon?.getAttribute('class'),
            label: labelSpan?.innerText?.trim(),
            labelClass: labelSpan?.className,
            labelFontWeight: labelComputed?.fontWeight,
            time: timeSpan?.innerText?.trim(),
            timeClass: timeSpan?.className,
            timeFontWeight: timeComputed?.fontWeight,
            borderRadius: itemComputed.borderRadius,
          };
        });

        return {
          hasParentSection: !!parentSection,
          hasGridCols3Gap3: !!gridEl,
          itemCount: items.length,
          items: itemsDetails,
        };
      }, isDark);

      console.log(`[${mode}] Sun & Twilight Mini-Cards Audit:`, audit);

      if (!audit.hasParentSection) {
        throw new Error(`[${mode}] Sun & Twilight section not found!`);
      }
      if (!audit.hasGridCols3Gap3) {
        throw new Error(`[${mode}] Missing grid grid-cols-3 gap-3 wrapper!`);
      }
      if (audit.itemCount !== 3) {
        throw new Error(`[${mode}] Expected exactly 3 mini-cards, found ${audit.itemCount}`);
      }

      for (const item of audit.items) {
        if (item.hasRoundedFull) {
          throw new Error(`[${mode}] Mini-card still has rounded-full circular styling!`);
        }
        if (!item.hasRounded2xl || !item.hasP3 || !item.hasFlexCol || !item.hasItemsCenter || !item.hasJustifyCenter || !item.hasGap15 || !item.hasBackdropBlur || !item.hasShadowSm) {
          throw new Error(`[${mode}] Mini-card missing required glassmorphic/flex classes: ${item.classes}`);
        }
        if (!item.label || !item.time) {
          throw new Error(`[${mode}] Mini-card missing label or time!`);
        }
      }
      console.log(`✅ [${mode}] Sun & Twilight verified: strict 3-col grid (gap-3), rounded-2xl glassmorphic mini-cards (no circles), flex-col gap-1.5, bold times (${audit.items.map(i => i.label + ': ' + i.time).join(', ')}).`);

      // Capture screenshot
      const screenshotPath = path.join(artDir, `prayer_times_sun_twilight_minicards_${mode}.png`);
      await page.screenshot({ path: screenshotPath });
      console.log(`📸 Saved screenshot: ${screenshotPath}`);

      await context.close();
    }

    console.log('\n===============================================================');
    console.log('🎉 ALL SUN & TWILIGHT MINI-CARD TESTS PASSED! 🎉');
    console.log('===============================================================\n');
  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();

