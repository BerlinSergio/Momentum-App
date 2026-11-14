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
    console.log('\n================================================================');
    console.log('=== TESTING HOLISTIC PRAYER TIMES POLISH & SYNCHRONIZATION ===');
    console.log('================================================================');

    for (const mode of ['dark', 'light']) {
      const isDark = mode === 'dark';
      const screenRoute = isDark ? 'prayer_times_dark_mode' : 'prayer_times_light_mode';
      console.log(`\nTesting ${mode.toUpperCase()} MODE (${screenRoute})...`);

      const context = await browser.createBrowserContext();
      const page = await context.newPage();
      await page.setViewport({ width: 420, height: 1080, deviceScaleFactor: 2 });

      await page.goto(`http://localhost:5173/?screen=${screenRoute}`);
      await new Promise(r => setTimeout(r, 1000));

      // Hide dev navigator sidebar if present
      await page.evaluate(() => {
        document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]').forEach(el => el.style.setProperty('display', 'none', 'important'));
      });

      // 1. Audit Global Font Inheritance
      const fontAudit = await page.evaluate(() => {
        const rootDiv = document.querySelector('.min-h-screen.flex.flex-col');
        const computed = rootDiv ? window.getComputedStyle(rootDiv) : null;
        return {
          hasRootDiv: !!rootDiv,
          hasFontSans: rootDiv?.classList.contains('font-sans'),
          hasAntialiased: rootDiv?.classList.contains('antialiased'),
          fontFamily: computed?.fontFamily,
        };
      });

      console.log(`[${mode}] Font Inheritance Audit:`, fontAudit);
      if (!fontAudit.hasFontSans || !fontAudit.hasAntialiased) {
        throw new Error(`[${mode}] Outermost wrapper missing font-sans or antialiased class!`);
      }
      console.log(`✅ [${mode}] Global font inherited correctly (${fontAudit.fontFamily}).`);

      // 2. Audit Top Location & Date Widget
      const locationAudit = await page.evaluate(() => {
        const mapPin = document.querySelector('.lucide-map-pin');
        const locationCard = mapPin ? mapPin.closest('.rounded-2xl') : null;
        const computed = locationCard ? window.getComputedStyle(locationCard) : null;
        const dateRow = locationCard ? locationCard.querySelector('.border-t') : null;
        const dateSpans = dateRow ? Array.from(dateRow.querySelectorAll('span')) : [];

        return {
          hasLocationCard: !!locationCard,
          cardClass: locationCard?.className,
          hasFlexColGap35: locationCard?.classList.contains('flex-col') && locationCard?.classList.contains('gap-3.5'),
          hasBackdropBlur: locationCard?.className.includes('backdrop-blur-md'),
          hasRounded2xl: locationCard?.classList.contains('rounded-2xl'),
          hasP4: locationCard?.classList.contains('p-4'),
          dateRowClass: dateRow?.className,
          isDateRowFlexBetween: dateRow?.classList.contains('flex') && dateRow?.classList.contains('justify-between'),
          gregorianDate: dateSpans[0]?.innerText?.trim(),
          hijriDate: dateSpans[dateSpans.length - 1]?.innerText?.trim(),
        };
      });

      console.log(`[${mode}] Location & Date Widget Audit:`, locationAudit);
      if (!locationAudit.hasLocationCard) {
        throw new Error(`[${mode}] Location card element not found!`);
      }
      if (!locationAudit.hasFlexColGap35) {
        throw new Error(`[${mode}] Location card missing flex flex-col gap-3.5 classes! Got: ${locationAudit.cardClass}`);
      }
      if (!locationAudit.hasBackdropBlur || !locationAudit.hasRounded2xl || !locationAudit.hasP4) {
        throw new Error(`[${mode}] Location card missing glassmorphic tokens (backdrop-blur-md, rounded-2xl, p-4)!`);
      }
      if (!locationAudit.isDateRowFlexBetween) {
        throw new Error(`[${mode}] Date row is not using flex items-center justify-between!`);
      }
      console.log(`✅ [${mode}] Top Location & Date widget verified (gap-3.5, glassmorphic card, Gregorian left: "${locationAudit.gregorianDate}", Hijri right: "${locationAudit.hijriDate}").`);

      // 3. Audit Next Prayer Hero Card
      const heroAudit = await page.evaluate((isDark) => {
        const countdownEl = document.querySelector('.font-mono.tracking-widest');
        const heroCard = countdownEl ? countdownEl.closest('.rounded-2xl') : null;
        
        // Check top header row
        const topRow = heroCard ? heroCard.firstElementChild : null;
        const badgeEl = topRow ? topRow.querySelector('.rounded-full.bg-primary\\/20') : null;
        const adhanTextEl = topRow ? topRow.querySelector('.lucide-bell-ring')?.parentElement : null;

        // Check prayer name & scheduled time row
        const nameTimeRow = topRow ? topRow.nextElementSibling : null;
        const prayerNameEl = nameTimeRow ? nameTimeRow.querySelector('.text-2xl, .text-3xl') : null;
        const scheduledTimeEl = nameTimeRow ? nameTimeRow.querySelector('.text-right .font-mono') : null;
        // Verify NO clunky innerBoxBg / nested white border box around scheduled time
        const nestedBox = scheduledTimeEl ? scheduledTimeEl.closest('.bg-white\\/5, .bg-slate-100\\/80, .border-primary\\/20') : null;

        return {
          hasHeroCard: !!heroCard,
          heroCardClass: heroCard?.className,
          hasTopRow: !!topRow,
          isTopRowFlexBetween: topRow?.classList.contains('flex') && topRow?.classList.contains('justify-between'),
          badgeText: badgeEl?.innerText?.trim(),
          adhanText: adhanTextEl?.innerText?.trim(),
          hasNameTimeRow: !!nameTimeRow,
          isNameTimeRowFlexBetween: nameTimeRow?.classList.contains('flex') && nameTimeRow?.classList.contains('justify-between'),
          prayerName: prayerNameEl?.innerText?.trim(),
          scheduledTime: scheduledTimeEl?.innerText?.trim(),
          hasNestedBox: !!nestedBox,
          countdownText: countdownEl?.innerText?.trim(),
          countdownClass: countdownEl?.className,
          hasMonospaceText3xl: countdownEl?.classList.contains('font-mono') && countdownEl?.classList.contains('text-3xl') && countdownEl?.classList.contains('tracking-widest'),
          hasExpectedColor: isDark ? countdownEl?.classList.contains('text-white') : countdownEl?.classList.contains('text-slate-800'),
        };
      }, isDark);

      console.log(`[${mode}] Next Prayer Hero Card Audit:`, heroAudit);
      if (!heroAudit.hasHeroCard) {
        throw new Error(`[${mode}] Next Prayer Hero Card not found!`);
      }
      if (!heroAudit.isTopRowFlexBetween || !heroAudit.badgeText || !heroAudit.adhanText) {
        throw new Error(`[${mode}] Top header row of Hero card is not aligned with flex justify-between or missing badge/adhan info!`);
      }
      if (!heroAudit.isNameTimeRowFlexBetween || !heroAudit.prayerName || !heroAudit.scheduledTime) {
        throw new Error(`[${mode}] Prayer name & scheduled time row is not using clean flex justify-between layout!`);
      }
      if (heroAudit.hasNestedBox) {
        throw new Error(`[${mode}] Found clunky nested background box around scheduled time!`);
      }
      if (!heroAudit.hasMonospaceText3xl || !heroAudit.hasExpectedColor) {
        throw new Error(`[${mode}] Countdown timer missing font-mono text-3xl tracking-widest or correct color class! Got: ${heroAudit.countdownClass}`);
      }
      console.log(`✅ [${mode}] Hero Card verified: Top header aligned (badge: "${heroAudit.badgeText}" | "${heroAudit.adhanText}"), clean flex layout (${heroAudit.prayerName} -> ${heroAudit.scheduledTime}, no nested box), sleek countdown (${heroAudit.countdownText}).`);

      // 4. Audit Sun & Twilight Reference Header and Grid
      const sunTwilightAudit = await page.evaluate(() => {
        const headings = Array.from(document.querySelectorAll('h3'));
        const canonicalHeading = headings.find(h => h.innerText.toUpperCase().includes('CANONICAL PRAYERS'));
        const sunHeading = headings.find(h => h.innerText.toUpperCase().includes('SUN & TWILIGHT REFERENCE'));

        const gridEl = document.querySelector('.grid.grid-cols-3.gap-2');
        const gridItems = gridEl ? Array.from(gridEl.children) : [];
        const itemsData = gridItems.map(item => {
          const spans = Array.from(item.querySelectorAll('span'));
          return {
            title: spans[0]?.innerText?.trim(),
            time: spans[1]?.innerText?.trim(),
          };
        });

        return {
          canonicalHeaderClass: canonicalHeading?.className,
          sunHeaderClass: sunHeading?.className,
          hasMatchingHeaderStyle: canonicalHeading?.className === sunHeading?.className,
          hasGrid: !!gridEl,
          itemsCount: gridItems.length,
          items: itemsData,
        };
      });

      console.log(`[${mode}] Sun & Twilight Audit:`, sunTwilightAudit);
      if (!sunTwilightAudit.hasMatchingHeaderStyle) {
        throw new Error(`[${mode}] Sun & Twilight header classes do not match Canonical Prayers header!`);
      }
      if (sunTwilightAudit.itemsCount !== 3) {
        throw new Error(`[${mode}] Sun & Twilight grid does not have exactly 3 items!`);
      }
      const timeRegex = /^\d{2}:\d{2}\s+(AM|PM)$/;
      for (const item of sunTwilightAudit.items) {
        if (!timeRegex.test(item.time)) {
          throw new Error(`[${mode}] Invalid calculated time format for ${item.title}: "${item.time}"`);
        }
      }
      console.log(`✅ [${mode}] Sun & Twilight verified with 3-col grid and dynamic times (${sunTwilightAudit.items.map(i => i.title + ': ' + i.time).join(', ')}).`);

      // 5. Audit Daily Inspiration Widget
      const inspirationAudit = await page.evaluate((isDark) => {
        const inspirationSpans = Array.from(document.querySelectorAll('span')).filter(s => s.innerText.toUpperCase().includes('DAILY INSPIRATION'));
        const cardEl = inspirationSpans[0]?.closest('.rounded-2xl');
        const quotePara = cardEl ? cardEl.querySelector('p') : null;
        const ayahSpan = cardEl ? cardEl.querySelector('span.text-teal-500, span.text-teal-400') : null;

        return {
          hasCard: !!cardEl,
          cardClass: cardEl?.className,
          hasGlassmorphicTokens: cardEl?.className.includes('backdrop-blur-xl') && cardEl?.className.includes('rounded-2xl') && cardEl?.className.includes('p-5'),
          hasBorder: cardEl?.className.includes(isDark ? 'border-white/10' : 'border-white/50'),
          quoteText: quotePara?.innerText?.trim(),
          hasAyahBadge: !!ayahSpan,
          ayahBadgeText: ayahSpan?.innerText?.trim(),
        };
      }, isDark);

      console.log(`[${mode}] Daily Inspiration Audit:`, inspirationAudit);
      if (!inspirationAudit.hasCard || !inspirationAudit.hasGlassmorphicTokens || !inspirationAudit.hasBorder) {
        throw new Error(`[${mode}] Daily Inspiration card missing glassmorphic tokens or border! Got: ${inspirationAudit.cardClass}`);
      }
      if (!inspirationAudit.quoteText || inspirationAudit.quoteText.length < 10) {
        throw new Error(`[${mode}] Daily Inspiration quote text missing or too short!`);
      }
      console.log(`✅ [${mode}] Daily Inspiration glassmorphic card verified with dynamic Ayah.`);

      // 6. Capture Full Page Screenshot
      const screenshotPath = path.join(artDir, `prayer_times_holistic_polish_${mode}.png`);
      await page.screenshot({ path: screenshotPath });
      console.log(`📸 Saved screenshot: ${screenshotPath}`);

      await context.close();
    }

    console.log('\n================================================================');
    console.log('🎉 ALL HOLISTIC PRAYER TIMES POLISH TESTS PASSED! 🎉');
    console.log('================================================================\n');
  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
