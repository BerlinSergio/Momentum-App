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
    console.log('=== TESTING TOMORROW HERO CARD & REFACTORED SUN & TWILIGHT ===');
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

      // 1. Audit Tomorrow's Hero Card (Header Alignment & Notification Button Centering)
      const heroAudit = await page.evaluate(() => {
        const countdownEl = document.querySelector('.font-mono.tracking-widest');
        const heroCard = countdownEl ? countdownEl.closest('.rounded-2xl') : null;
        const heroRect = heroCard ? heroCard.getBoundingClientRect() : null;

        // Top header row
        const topRow = heroCard ? heroCard.firstElementChild : null;
        const badgeEl = topRow ? topRow.querySelector('.rounded-full.bg-primary\\/20') : null;
        const adhanEl = topRow ? topRow.querySelector('.lucide-bell-ring')?.parentElement : null;

        // Notification button
        const notifBtn = heroCard ? heroCard.querySelector('button.bg-gradient-to-r') : null;
        const notifRect = notifBtn ? notifBtn.getBoundingClientRect() : null;
        const notifComputed = notifBtn ? window.getComputedStyle(notifBtn) : null;

        // Button centering check
        let isBtnHorizontallyCentered = false;
        if (heroRect && notifRect) {
          const heroCenter = heroRect.left + heroRect.width / 2;
          const notifCenter = notifRect.left + notifRect.width / 2;
          isBtnHorizontallyCentered = Math.abs(heroCenter - notifCenter) < 2; // within 2px
        }

        return {
          hasHeroCard: !!heroCard,
          topRowClass: topRow?.className,
          hasJustifyBetween: topRow?.classList.contains('justify-between') || topRow?.className.includes('justify-between'),
          hasItemsCenter: topRow?.classList.contains('items-center') || topRow?.className.includes('items-center'),
          badgeText: badgeEl?.innerText?.trim(),
          adhanText: adhanEl?.innerText?.trim(),
          hasNotifBtn: !!notifBtn,
          notifBtnClass: notifBtn?.className,
          hasMaxWSm: notifBtn?.classList.contains('max-w-sm'),
          hasMxAuto: notifBtn?.classList.contains('mx-auto'),
          hasJustifyCenter: notifBtn?.classList.contains('justify-center'),
          hasItemsCenterBtn: notifBtn?.classList.contains('items-center'),
          isBtnHorizontallyCentered,
          notifText: notifBtn?.innerText?.trim(),
        };
      });

      console.log(`[${mode}] Hero Card Audit:`, heroAudit);

      if (!heroAudit.hasHeroCard) {
        throw new Error(`[${mode}] Hero card not found!`);
      }
      if (!heroAudit.hasJustifyBetween || !heroAudit.hasItemsCenter) {
        throw new Error(`[${mode}] Hero card header top row missing flex justify-between items-center! Got: ${heroAudit.topRowClass}`);
      }
      if (!heroAudit.hasNotifBtn || !heroAudit.hasMaxWSm || !heroAudit.hasMxAuto || !heroAudit.hasJustifyCenter) {
        throw new Error(`[${mode}] Notification button missing max-w-sm mx-auto justify-center! Got: ${heroAudit.notifBtnClass}`);
      }
      if (!heroAudit.isBtnHorizontallyCentered) {
        throw new Error(`[${mode}] Notification button is not horizontally centered in the hero card!`);
      }
      console.log(`✅ [${mode}] Hero Card verified: Top header strictly aligned with flex justify-between items-center ("${heroAudit.badgeText}" | "${heroAudit.adhanText}"), notification button perfectly centered (max-w-sm mx-auto justify-center).`);

      // 2. Audit Refactored Sun & Twilight Widget (3-column grid, gap-3, glassmorphic mini-cards)
      const sunTwilightAudit = await page.evaluate(() => {
        const gridEl = document.querySelector('.grid.grid-cols-3.gap-3');
        const items = gridEl ? Array.from(gridEl.children) : [];

        const itemsAudit = items.map(item => {
          const icon = item.querySelector('svg');
          const spans = Array.from(item.querySelectorAll('span'));
          return {
            hasIcon: !!icon,
            title: spans[0]?.innerText?.trim(),
            time: spans[1]?.innerText?.trim(),
            classes: item.className,
            hasRoundedXl: item.classList.contains('rounded-xl'),
            hasP3: item.classList.contains('p-3'),
            hasFlexCol: item.classList.contains('flex-col'),
            hasItemsCenter: item.classList.contains('items-center'),
            hasJustifyCenter: item.classList.contains('justify-center'),
          };
        });

        return {
          hasGridGap3: !!gridEl,
          itemCount: items.length,
          items: itemsAudit,
        };
      });

      console.log(`[${mode}] Sun & Twilight Audit:`, sunTwilightAudit);

      if (!sunTwilightAudit.hasGridGap3) {
        throw new Error(`[${mode}] Sun & Twilight grid with gap-3 not found!`);
      }
      if (sunTwilightAudit.itemCount !== 3) {
        throw new Error(`[${mode}] Sun & Twilight does not have exactly 3 items!`);
      }
      for (const item of sunTwilightAudit.items) {
        if (!item.hasRoundedXl || !item.hasP3 || !item.hasFlexCol || !item.hasItemsCenter || !item.hasJustifyCenter) {
          throw new Error(`[${mode}] Sun & Twilight mini-card missing required glassmorphic/stacking classes: ${item.classes}`);
        }
      }
      console.log(`✅ [${mode}] Sun & Twilight verified: 3-column grid (gap-3) with rounded-xl glassmorphic mini-cards neatly centered and vertically stacked.`);

      // 3. Capture Screenshots
      const screenshotPath = path.join(artDir, `prayer_times_tomorrow_polished_${mode}.png`);
      await page.screenshot({ path: screenshotPath });
      console.log(`📸 Saved screenshot: ${screenshotPath}`);

      await context.close();
    }

    console.log('\n===============================================================');
    console.log('🎉 ALL TOMORROW HERO CARD & SUN/TWILIGHT TESTS PASSED! 🎉');
    console.log('===============================================================\n');
  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();

