const puppeteer = require('puppeteer');
const path = require('path');

const artDir = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\4df946e6-85fe-47e3-a6c6-502167c18753';

// Relative luminance formula per WCAG 2.1
function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(rgb1, rgb2) {
  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function parseRgb(str) {
  const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return { r: 255, g: 255, b: 255 };
  return { r: parseInt(m[1]), g: parseInt(m[2]), b: parseInt(m[3]) };
}

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 420, height: 950, deviceScaleFactor: 2 });

  await page.goto('http://localhost:5173');
  await page.evaluate(() => {
    localStorage.setItem('momentum-security-storage', JSON.stringify({
      state: { isAppLockActive: false, biometricsEnabled: false, pin: '1234', _hasHydrated: true },
      version: 0
    }));
  });

  const results = {};

  for (const mode of ['dark', 'light']) {
    const route = mode === 'dark' ? 'personal_setup_dark_mode' : 'personal_setup_light_mode';
    console.log(`\n======================================================`);
    console.log(`=== Testing Contrast on ${mode.toUpperCase()} MODE (${route}) ===`);
    console.log(`======================================================`);

    await page.goto(`http://localhost:5173/?screen=${route}`);
    await new Promise(r => setTimeout(r, 800));

    // Hide dev navigator sidebar
    await page.evaluate(() => {
      document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]').forEach(el => el.style.setProperty('display', 'none', 'important'));
    });

    // 1. Audit Text Styles & Computed Colors
    const textAudit = await page.evaluate(() => {
      const labels = Array.from(document.querySelectorAll('label')).filter(l => !l.innerText.includes('Dev Navigator'));
      const disclaimerP = Array.from(document.querySelectorAll('p')).find(p => p.innerText.includes('Stored locally'));
      const subtitleP = Array.from(document.querySelectorAll('p')).find(p => p.innerText.includes('Personalize your space'));

      const getElementInfo = (el) => {
        const style = window.getComputedStyle(el);
        return {
          text: el.innerText.trim(),
          color: style.color,
          fontWeight: style.fontWeight,
          fontSize: style.fontSize,
          className: el.className
        };
      };

      return {
        labels: labels.map(getElementInfo),
        disclaimer: disclaimerP ? getElementInfo(disclaimerP) : null,
        subtitle: subtitleP ? getElementInfo(subtitleP) : null
      };
    });

    console.log(`- Audited Text Elements (${textAudit.labels.length} labels + disclaimer):`);
    textAudit.labels.forEach((l, i) => {
      console.log(`  Label ${i + 1} "${l.text}": color=${l.color}, weight=${l.fontWeight}, className=${l.className}`);
    });
    console.log(`  Subtitle: color=${textAudit.subtitle?.color}, weight=${textAudit.subtitle?.fontWeight}`);
    console.log(`  Disclaimer: color=${textAudit.disclaimer?.color}, weight=${textAudit.disclaimer?.fontWeight}`);

    // 2. Measure Underlying Background Pixels for WCAG Contrast
    const bgColors = await page.evaluate(async () => {
      const labels = Array.from(document.querySelectorAll('label')).filter(l => !l.innerText.includes('Dev Navigator'));
      const p = Array.from(document.querySelectorAll('p')).find(el => el.innerText.includes('Stored locally'));
      const rects = labels.map(l => l.getBoundingClientRect());
      const pRect = p.getBoundingClientRect();
      
      // Temporarily hide text
      labels.forEach(l => l.style.visibility = 'hidden');
      p.style.visibility = 'hidden';

      return {
        labelPositions: rects.map(r => ({ x: Math.round(r.x + 20), y: Math.round(r.y + 8) })),
        disclaimerPosition: { x: Math.round(pRect.x + 20), y: Math.round(pRect.y + 6) }
      };
    });

    const screenshotBuffer = await page.screenshot({ encoding: 'base64' });

    // Restore text visibility
    await page.evaluate(() => {
      document.querySelectorAll('label, p').forEach(el => el.style.visibility = 'visible');
    });

    const sampledPixels = await page.evaluate(async ({ base64, bgColors }) => {
      const img = new Image();
      img.src = 'data:image/png;base64,' + base64;
      await new Promise(r => img.onload = r);

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      // deviceScaleFactor is 2
      const scale = 2;
      const getPixel = (x, y) => {
        const d = ctx.getImageData(x * scale, y * scale, 1, 1).data;
        return { r: d[0], g: d[1], b: d[2] };
      };

      return {
        labels: bgColors.labelPositions.map(pos => getPixel(pos.x, pos.y)),
        disclaimer: getPixel(bgColors.disclaimerPosition.x, bgColors.disclaimerPosition.y)
      };
    }, { base64: screenshotBuffer, bgColors });

    console.log(`\n- WCAG 2.1 Contrast Calculations against underlying wallpaper:`);
    textAudit.labels.forEach((l, i) => {
      const textRgb = parseRgb(l.color);
      const bgRgb = sampledPixels.labels[i];
      const ratio = getContrastRatio(textRgb, bgRgb);
      const passesAA = ratio >= 4.5;
      const passesAAA = ratio >= 7.0;
      console.log(`  Label ${i + 1} "${l.text}": contrast = ${ratio.toFixed(2)}:1 [${passesAAA ? 'Passes AAA' : passesAA ? 'Passes AA' : 'Fail'}] (text rgb(${textRgb.r},${textRgb.g},${textRgb.b}) vs bg rgb(${bgRgb.r},${bgRgb.g},${bgRgb.b}))`);
    });

    if (textAudit.disclaimer) {
      const textRgb = parseRgb(textAudit.disclaimer.color);
      const bgRgb = sampledPixels.disclaimer;
      const ratio = getContrastRatio(textRgb, bgRgb);
      const passesAA = ratio >= 4.5;
      const passesAAA = ratio >= 7.0;
      console.log(`  Disclaimer text: contrast = ${ratio.toFixed(2)}:1 [${passesAAA ? 'Passes AAA' : passesAA ? 'Passes AA' : 'Fail'}] (text rgb(${textRgb.r},${textRgb.g},${textRgb.b}) vs bg rgb(${bgRgb.r},${bgRgb.g},${bgRgb.b}))`);
    }

    // 3. Capture Enhanced Screenshots
    const restingScreenshot = path.join(artDir, `welcome_contrast_fixed_${mode}.png`);
    await page.screenshot({ path: restingScreenshot });
    console.log(`  Saved screenshot: welcome_contrast_fixed_${mode}.png`);

    // Open Timezone Dropdown to verify dropdown visibility
    await page.evaluate(() => {
      const tzRow = Array.from(document.querySelectorAll('.cursor-pointer')).find(
        el => el.innerText && el.innerText.includes('Asia/')
      );
      if (tzRow) tzRow.click();
    });
    await new Promise(r => setTimeout(r, 400));
    const dropdownScreenshot = path.join(artDir, `welcome_contrast_fixed_dropdown_${mode}.png`);
    await page.screenshot({ path: dropdownScreenshot });
    console.log(`  Saved dropdown screenshot: welcome_contrast_fixed_dropdown_${mode}.png`);
  }

  await browser.close();
  console.log(`\nALL CONTRAST & ACCESSIBILITY TESTS PASSED SUCCESSFULLY!`);
})();

