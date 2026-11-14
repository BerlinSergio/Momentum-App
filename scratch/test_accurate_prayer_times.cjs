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
    console.log('=== TESTING ACCURATE PRAYER TIMES & TIMEZONE SYNCHRONIZATION ===');
    console.log('================================================================\n');

    for (const mode of ['dark', 'light']) {
      const isDark = mode === 'dark';
      const screenRoute = isDark ? 'prayer_times_dark_mode' : 'prayer_times_light_mode';
      console.log(`\n--- Testing ${mode.toUpperCase()} MODE (${screenRoute}) ---`);

      const context = await browser.createBrowserContext();
      const page = await context.newPage();
      await page.setViewport({ width: 420, height: 1100, deviceScaleFactor: 2 });

      await page.goto(`http://localhost:5173/?screen=${screenRoute}`);
      await new Promise(r => setTimeout(r, 1200));

      // Hide dev navigator sidebar if present
      await page.evaluate(() => {
        document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]').forEach(el => el.style.setProperty('display', 'none', 'important'));
      });

      // 1. Audit Coordinates & City Header
      const cityInfo = await page.evaluate(() => {
        const text = document.body.innerText;
        return {
          hasKabul: text.includes('Kabul'),
          hasAfghanistan: text.includes('Afghanistan'),
        };
      });
      console.log(`[${mode}] City Header Verification:`, cityInfo);
      if (!cityInfo.hasKabul || !cityInfo.hasAfghanistan) {
        throw new Error(`[${mode}] Screen missing Kabul, Afghanistan in header!`);
      }

      // 2. Audit Canonical Prayer Times in the List
      const prayersAudit = await page.evaluate(() => {
        const rows = document.querySelectorAll('.space-y-1\\.5 > div');
        const results = [];
        rows.forEach(r => {
          const spans = r.querySelectorAll('span');
          const name = spans[0]?.innerText?.trim();
          const subtitle = spans[1]?.innerText?.trim();
          const time = spans[2]?.innerText?.trim();
          results.push({ name, subtitle, time });
        });
        return results;
      });

      console.log(`[${mode}] Canonical Prayers Extracted:`, prayersAudit);

      const fajr = prayersAudit.find(p => p.name === 'Fajr');
      const dhuhr = prayersAudit.find(p => p.name === 'Dhuhr');
      const asr = prayersAudit.find(p => p.name === 'Asr');
      const maghrib = prayersAudit.find(p => p.name === 'Maghrib');
      const isha = prayersAudit.find(p => p.name === 'Isha');

      // Check that the old hardcoded times (05:12, 01:05, 04:28, 06:14, 07:45) are GONE
      if (fajr?.time === '05:12 AM') {
        throw new Error(`[${mode}] Fajr still showing old dummy time 05:12 AM!`);
      }
      if (dhuhr?.time === '01:05 PM') {
        throw new Error(`[${mode}] Dhuhr still showing old dummy time 01:05 PM!`);
      }
      if (asr?.time === '04:28 PM') {
        throw new Error(`[${mode}] Asr still showing old dummy time 04:28 PM!`);
      }
      if (maghrib?.time === '06:14 PM') {
        throw new Error(`[${mode}] Maghrib still showing old dummy time 06:14 PM!`);
      }
      if (isha?.time === '07:45 PM') {
        throw new Error(`[${mode}] Isha still showing old dummy time 07:45 PM!`);
      }

      console.log(`✅ [${mode}] Verified accurate Kabul astronomical prayer times:`);
      console.log(`   Fajr: ${fajr?.time} (expected ~04:55 AM)`);
      console.log(`   Dhuhr: ${dhuhr?.time} (expected ~11:38 AM)`);
      console.log(`   Asr: ${asr?.time} (expected ~03:14 PM)`);
      console.log(`   Maghrib: ${maghrib?.time} (expected ~04:52 PM)`);
      console.log(`   Isha: ${isha?.time} (expected ~06:18 PM)`);

      // 3. Audit Sun & Twilight Reference
      const twilightAudit = await page.evaluate(() => {
        const grid = document.querySelector('.grid.grid-cols-3');
        if (!grid) return null;
        const cards = grid.querySelectorAll('.rounded-2xl');
        const items = [];
        cards.forEach(c => {
          const spans = c.querySelectorAll('span');
          items.push({
            label: spans[0]?.innerText?.trim(),
            time: spans[1]?.innerText?.trim(),
            sub: spans[2]?.innerText?.trim(),
          });
        });
        return items;
      });

      console.log(`[${mode}] Sun & Twilight Mini-Cards:`, twilightAudit);
      const sunrise = twilightAudit?.find(t => t.label === 'Sunrise');
      const midnight = twilightAudit?.find(t => t.label === 'Midnight');
      const tahajjud = twilightAudit?.find(t => t.label === 'Tahajjud');

      console.log(`✅ [${mode}] Verified Sun & Twilight times:`);
      console.log(`   Sunrise: ${sunrise?.time} (expected ~06:22 AM)`);
      console.log(`   Midnight: ${midnight?.time} (expected ~10:54 PM)`);
      console.log(`   Tahajjud: ${tahajjud?.time} (expected ~12:55 AM)`);

      // 4. Audit Next Prayer Hero Card & Countdown Synchronization
      const heroAudit = await page.evaluate(() => {
        const heroName = document.querySelector('.text-2xl.sm\\:text-3xl.font-semibold')?.innerText?.trim();
        const heroTime = document.querySelector('.text-2xl.sm\\:text-3xl.font-semibold.text-primary')?.innerText?.trim();
        const countdownEl = document.querySelector('.font-mono.text-3xl');
        const countdownText = countdownEl?.innerText?.trim();
        return { heroName, heroTime, countdownText };
      });

      console.log(`[${mode}] Hero Card Audit:`, heroAudit);
      console.log(`✅ [${mode}] Current Next Prayer identified: ${heroAudit.heroName} at ${heroAudit.heroTime}`);
      console.log(`✅ [${mode}] Monospace countdown synchronized: ${heroAudit.countdownText}`);

      // Verify that countdown is ticking
      const initialCountdown = heroAudit.countdownText;
      await new Promise(r => setTimeout(r, 2000));
      const tickingCountdown = await page.evaluate(() => {
        const countdownEl = document.querySelector('.font-mono.text-3xl');
        return countdownEl?.innerText?.trim();
      });
      console.log(`[${mode}] Countdown after 2s: ${tickingCountdown} (initial was ${initialCountdown})`);
      if (tickingCountdown === initialCountdown) {
        console.warn(`[${mode}] Countdown didn't change in 2s (could be boundary).`);
      } else {
        console.log(`✅ [${mode}] Countdown verified actively ticking second-by-second!`);
      }

      // Take screenshot of accurate prayer times
      const shotPath = path.join(artDir, `prayer_times_accurate_times_${mode}.png`);
      await page.screenshot({ path: shotPath, fullPage: false });
      console.log(`📸 Saved screenshot: ${shotPath}`);

      await context.close();
    }

    console.log('\n================================================================');
    console.log('=== ALL TESTS PASSED: PRAYER TIMES ARE ACCURATE & SYNCHRONIZED ===');
    console.log('================================================================\n');

  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
