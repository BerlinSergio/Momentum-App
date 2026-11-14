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
    console.log('=== TESTING STRICT GLOBAL FONT CONSISTENCY & TYPOGRAPHY ===');
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

      // 1. Audit Root Wrapper Font Inheritance
      const rootAudit = await page.evaluate(() => {
        const rootDiv = document.querySelector('.min-h-screen.flex.flex-col');
        const computed = rootDiv ? window.getComputedStyle(rootDiv) : null;
        return {
          hasRoot: !!rootDiv,
          hasFontSans: rootDiv?.classList.contains('font-sans'),
          hasAntialiased: rootDiv?.classList.contains('antialiased'),
          fontFamily: computed?.fontFamily,
        };
      });

      console.log(`[${mode}] Root Font Audit:`, rootAudit);
      if (!rootAudit.hasFontSans || !rootAudit.hasAntialiased) {
        throw new Error(`[${mode}] Root wrapper missing font-sans or antialiased!`);
      }
      if (!rootAudit.fontFamily.includes('Inter')) {
        throw new Error(`[${mode}] Root wrapper font family does not compute to Inter! Got: ${rootAudit.fontFamily}`);
      }
      console.log(`✅ [${mode}] Root wrapper strictly applies font-sans antialiased (${rootAudit.fontFamily}).`);

      // 2. Audit Rogue Overrides (Scan all elements for inline fontFamily styles)
      const rogueAudit = await page.evaluate(() => {
        const rootDiv = document.querySelector('.min-h-screen.flex.flex-col');
        const allElements = rootDiv ? Array.from(rootDiv.querySelectorAll('*')) : [];
        const rogueInline = allElements.filter(el => el.style && el.style.fontFamily);
        return {
          totalElements: allElements.length,
          rogueCount: rogueInline.length,
          rogueTags: rogueInline.map(el => `${el.tagName}: ${el.style.fontFamily}`),
        };
      });

      console.log(`[${mode}] Rogue Override Audit:`, rogueAudit);
      if (rogueAudit.rogueCount > 0) {
        throw new Error(`[${mode}] Found ${rogueAudit.rogueCount} elements with rogue inline fontFamily styles: ${rogueAudit.rogueTags.join(', ')}`);
      }
      console.log(`✅ [${mode}] Zero rogue inline fontFamily overrides found.`);

      // 3. Audit Headings & Typography Hierarchy
      const typographyAudit = await page.evaluate((isDark) => {
        const h1 = document.querySelector('h1');
        const h2 = document.querySelector('h2');
        const h3List = Array.from(document.querySelectorAll('h3'));
        const sub = document.querySelector('p');

        const h1Computed = h1 ? window.getComputedStyle(h1) : null;
        const h2Computed = h2 ? window.getComputedStyle(h2) : null;
        const subComputed = sub ? window.getComputedStyle(sub) : null;

        return {
          h1: {
            text: h1?.innerText?.trim(),
            fontFamily: h1Computed?.fontFamily,
            fontWeight: h1Computed?.fontWeight,
            color: h1Computed?.color,
            hasFontSans: h1?.classList.contains('font-sans'),
            hasFontSemibold: h1?.classList.contains('font-semibold'),
          },
          h2: {
            text: h2?.innerText?.trim(),
            fontFamily: h2Computed?.fontFamily,
            fontWeight: h2Computed?.fontWeight,
            color: h2Computed?.color,
            hasFontSans: h2?.classList.contains('font-sans'),
            hasFontSemibold: h2?.classList.contains('font-semibold'),
          },
          h3s: h3List.map(h3 => {
            const c = window.getComputedStyle(h3);
            return {
              text: h3.innerText.trim(),
              fontFamily: c.fontFamily,
              fontWeight: c.fontWeight,
              hasFontSans: h3.classList.contains('font-sans'),
              hasFontSemibold: h3.classList.contains('font-semibold'),
            };
          }),
          sub: {
            text: sub?.innerText?.trim(),
            fontFamily: subComputed?.fontFamily,
            fontWeight: subComputed?.fontWeight,
            color: subComputed?.color,
            hasFontSans: sub?.classList.contains('font-sans'),
            hasFontMedium: sub?.classList.contains('font-medium'),
          },
        };
      }, isDark);

      console.log(`[${mode}] Typography Audit:`, typographyAudit);

      if (!typographyAudit.h1.fontFamily.includes('Inter') || !typographyAudit.h2.fontFamily.includes('Inter')) {
        throw new Error(`[${mode}] Headings h1/h2 not computing to Inter font family!`);
      }
      if (!typographyAudit.h1.hasFontSemibold || !typographyAudit.h2.hasFontSemibold) {
        throw new Error(`[${mode}] Headings h1/h2 missing font-semibold class!`);
      }
      if (!typographyAudit.sub.hasFontMedium) {
        throw new Error(`[${mode}] Secondary text missing font-medium class!`);
      }
      for (const h3 of typographyAudit.h3s) {
        if (!h3.fontFamily.includes('Inter') || !h3.hasFontSemibold) {
          throw new Error(`[${mode}] Section heading h3 "${h3.text}" not computing to Inter font-semibold!`);
        }
      }
      console.log(`✅ [${mode}] Typography hierarchy verified: Headings use font-semibold Inter, secondary text uses font-medium Inter.`);

      // 4. Capture Screenshot
      const screenshotPath = path.join(artDir, `prayer_times_typography_consistent_${mode}.png`);
      await page.screenshot({ path: screenshotPath });
      console.log(`📸 Saved screenshot: ${screenshotPath}`);

      await context.close();
    }

    console.log('\n===============================================================');
    console.log('🎉 ALL TYPOGRAPHY & FONT CONSISTENCY TESTS PASSED! 🎉');
    console.log('===============================================================\n');
  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();

