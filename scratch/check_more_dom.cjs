const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 420, height: 950, deviceScaleFactor: 2 });
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('momentum-security-storage', JSON.stringify({ state: { isAppLockActive: false, biometricsEnabled: false, pin: '1234' }, version: 0 }));
    localStorage.setItem('momentum-profile-storage', JSON.stringify({
      state: {
        fullName: 'Milad Wardak',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        bio: 'Mindful productivity seeker'
      },
      version: 0
    }));
  });
  await page.goto('http://localhost:5173');
  await new Promise(r => setTimeout(r, 600));
  await page.select('select', 'more_dark_mode');
  await new Promise(r => setTimeout(r, 500));
  
  const measurements = await page.evaluate(() => {
    const avatarBtn = document.querySelector('button[aria-label="Edit Profile"]');
    const avatarImg = avatarBtn ? avatarBtn.querySelector('img') : null;
    const h2 = document.querySelector('h2');
    return {
      avatarBtnRect: avatarBtn ? {
        width: avatarBtn.getBoundingClientRect().width,
        height: avatarBtn.getBoundingClientRect().height
      } : null,
      avatarImgRect: avatarImg ? {
        width: avatarImg.getBoundingClientRect().width,
        height: avatarImg.getBoundingClientRect().height,
        className: avatarImg.className
      } : null,
      h2Text: h2 ? h2.innerText : null
    };
  });
  console.log('Image avatar measurements:', JSON.stringify(measurements, null, 2));
  await browser.close();
})();
