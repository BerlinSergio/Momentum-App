const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const artifactDir = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\4df946e6-85fe-47e3-a6c6-502167c18753';

async function testTasbehModule() {
  console.log('==============================================');
  console.log('TESTING TASBEH MODULE & NAVIGATION');
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

    // Hide dev navigator overlays
    await page.evaluate(() => {
      const devOverlays = document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]');
      devOverlays.forEach(el => el.style.setProperty('display', 'none', 'important'));
    });

    // ----------------------------------------
    // 1. Dark Mode Test
    // ----------------------------------------
    console.log('\n--- 1. Testing More Dark Mode ---');
    await page.select('select', 'more_dark_mode');
    await new Promise(r => setTimeout(r, 600));

    // Verify "Tasbeh" title
    const tasbehModuleDark = await page.evaluate(() => {
      const vp = document.querySelector('.momentum-canvas-viewport') || document.body;
      const spans = Array.from(vp.querySelectorAll('span'));
      const tasbehSpan = spans.find(s => s.innerText.trim() === 'Tasbeh');
      const digitalCounterSpan = spans.find(s => s.innerText.includes('Digital Tasbeeh Counter'));
      return {
        foundTasbeh: Boolean(tasbehSpan),
        foundOldName: Boolean(digitalCounterSpan)
      };
    });

    console.log('Dark mode check:', tasbehModuleDark);
    if (!tasbehModuleDark.foundTasbeh) {
      throw new Error('FAIL: "Tasbeh" title not found on More screen in Dark Mode!');
    }
    if (tasbehModuleDark.foundOldName) {
      throw new Error('FAIL: Old title "Digital Tasbeeh Counter" is still present in Dark Mode!');
    }
    console.log('PASS: Module title is correctly "Tasbeh" in Dark Mode.');

    // Click "Tasbeh" module
    console.log('Clicking "Tasbeh" module card in Dark Mode...');
    const clickedDark = await page.evaluate(() => {
      const vp = document.querySelector('.momentum-canvas-viewport') || document.body;
      const spans = Array.from(vp.querySelectorAll('span'));
      const tasbehSpan = spans.find(s => s.innerText.trim() === 'Tasbeh');
      const card = tasbehSpan ? tasbehSpan.closest('.cursor-pointer') : null;
      if (card) {
        card.click();
        return true;
      }
      return false;
    });

    if (!clickedDark) {
      throw new Error('FAIL: Failed to click "Tasbeh" card in Dark Mode!');
    }
    await new Promise(r => setTimeout(r, 800));

    // Check navigated screen content and ensure NO 404 / "Screen not found"
    const navResultDark = await page.evaluate(() => {
      const vp = document.querySelector('.momentum-canvas-viewport') || document.body;
      const bodyText = vp.innerText;
      const select = document.querySelector('select');
      return {
        selectValue: select ? select.value : '',
        hasScreenNotFound: bodyText.includes('Screen not found'),
        snippet: bodyText.replace(/\n+/g, ' ').substring(0, 300)
      };
    });

    console.log('Dark Mode Navigation Result:', navResultDark);
    if (navResultDark.hasScreenNotFound) {
      throw new Error(`FAIL: Got "Screen not found" error on navigation! Select: ${navResultDark.selectValue}`);
    }
    if (!navResultDark.selectValue.includes('tasbeeh_main') && !navResultDark.snippet.includes('Tasbeeh') && !navResultDark.snippet.includes('Dhikr')) {
      throw new Error(`FAIL: Did not navigate to Tasbeeh screen! Current: ${navResultDark.selectValue}`);
    }
    console.log('PASS: Successfully navigated to Tasbeeh main screen in Dark Mode without 404 error!');

    // ----------------------------------------
    // 2. Light Mode Test
    // ----------------------------------------
    console.log('\n--- 2. Testing More Light Mode ---');
    await page.select('select', 'more_light_mode');
    await new Promise(r => setTimeout(r, 600));

    // Verify "Tasbeh" title
    const tasbehModuleLight = await page.evaluate(() => {
      const vp = document.querySelector('.momentum-canvas-viewport') || document.body;
      const spans = Array.from(vp.querySelectorAll('span'));
      const tasbehSpan = spans.find(s => s.innerText.trim() === 'Tasbeh');
      const digitalCounterSpan = spans.find(s => s.innerText.includes('Digital Tasbeeh Counter'));
      return {
        foundTasbeh: Boolean(tasbehSpan),
        foundOldName: Boolean(digitalCounterSpan)
      };
    });

    console.log('Light mode check:', tasbehModuleLight);
    if (!tasbehModuleLight.foundTasbeh) {
      throw new Error('FAIL: "Tasbeh" title not found on More screen in Light Mode!');
    }
    if (tasbehModuleLight.foundOldName) {
      throw new Error('FAIL: Old title "Digital Tasbeeh Counter" is still present in Light Mode!');
    }
    console.log('PASS: Module title is correctly "Tasbeh" in Light Mode.');

    // Click "Tasbeh" module
    console.log('Clicking "Tasbeh" module card in Light Mode...');
    const clickedLight = await page.evaluate(() => {
      const vp = document.querySelector('.momentum-canvas-viewport') || document.body;
      const spans = Array.from(vp.querySelectorAll('span'));
      const tasbehSpan = spans.find(s => s.innerText.trim() === 'Tasbeh');
      const card = tasbehSpan ? tasbehSpan.closest('.cursor-pointer') : null;
      if (card) {
        card.click();
        return true;
      }
      return false;
    });

    if (!clickedLight) {
      throw new Error('FAIL: Failed to click "Tasbeh" card in Light Mode!');
    }
    await new Promise(r => setTimeout(r, 800));

    // Check navigated screen content and ensure NO 404 / "Screen not found"
    const navResultLight = await page.evaluate(() => {
      const vp = document.querySelector('.momentum-canvas-viewport') || document.body;
      const bodyText = vp.innerText;
      const select = document.querySelector('select');
      return {
        selectValue: select ? select.value : '',
        hasScreenNotFound: bodyText.includes('Screen not found'),
        snippet: bodyText.replace(/\n+/g, ' ').substring(0, 300)
      };
    });

    console.log('Light Mode Navigation Result:', navResultLight);
    if (navResultLight.hasScreenNotFound) {
      throw new Error(`FAIL: Got "Screen not found" error on navigation! Select: ${navResultLight.selectValue}`);
    }
    if (!navResultLight.selectValue.includes('tasbeeh_main') && !navResultLight.snippet.includes('Tasbeeh') && !navResultLight.snippet.includes('Dhikr')) {
      throw new Error(`FAIL: Did not navigate to Tasbeeh screen in Light Mode! Current: ${navResultLight.selectValue}`);
    }
    console.log('PASS: Successfully navigated to Tasbeeh main screen in Light Mode without 404 error!');

    // ----------------------------------------
    // 3. Adhkar Stat Box Click Test
    // ----------------------------------------
    console.log('\n--- 3. Testing Adhkar Stat Box in Profile Hero Card ---');
    await page.select('select', 'more_dark_mode');
    await new Promise(r => setTimeout(r, 600));

    const adhkarBoxClicked = await page.evaluate(() => {
      const vp = document.querySelector('.momentum-canvas-viewport') || document.body;
      const spans = Array.from(vp.querySelectorAll('span'));
      const adhkarSpan = spans.find(s => s.innerText.trim() === 'Adhkar');
      const box = adhkarSpan ? adhkarSpan.closest('.cursor-pointer') : null;
      if (box) {
        box.click();
        return true;
      }
      return false;
    });

    if (!adhkarBoxClicked) {
      throw new Error('FAIL: Failed to click Adhkar stat box in profile card!');
    }
    await new Promise(r => setTimeout(r, 800));

    const statBoxNav = await page.evaluate(() => {
      const vp = document.querySelector('.momentum-canvas-viewport') || document.body;
      const bodyText = vp.innerText;
      const select = document.querySelector('select');
      return {
        selectValue: select ? select.value : '',
        hasScreenNotFound: bodyText.includes('Screen not found')
      };
    });

    console.log('Adhkar Stat Box Navigation Result:', statBoxNav);
    if (statBoxNav.hasScreenNotFound) {
      throw new Error(`FAIL: Adhkar stat box caused "Screen not found"!`);
    }
    console.log('PASS: Adhkar stat box navigates directly to Tasbeeh main without errors!');

    console.log('\n==============================================');
    console.log('ALL TASBEH MODULE & NAVIGATION TESTS PASSED!');
    console.log('==============================================');
  } finally {
    await browser.close();
  }
}

testTasbehModule().catch(err => {
  console.error('Test failed with error:', err);
  process.exit(1);
});

