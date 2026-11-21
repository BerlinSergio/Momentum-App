const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/USER/.gemini/antigravity/brain/4df946e6-85fe-47e3-a6c6-502167c18753';
const OUT_DIR = path.join(__dirname, 'screenshots', 'crops');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

function copyToArtifacts(sourcePath, destFilename) {
  try {
    const destPath = path.join(ARTIFACT_DIR, destFilename);
    fs.copyFileSync(sourcePath, destPath);
    console.log(`[ARTIFACT] Copied ${destFilename} to artifacts directory.`);
  } catch (err) {
    console.error(`[ARTIFACT ERROR] copying ${destFilename}:`, err.message);
  }
}

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

  // Init clean state
  await page.evaluate(() => {
    window.setIsAppLoading(false);
    if (window.useProfileStore) {
      window.useProfileStore.getState().completeSetup();
      window.useProfileStore.getState().updateProfile({
        setupCompleted: true,
        fullName: 'Milad Wardak',
        currency: 'AFN'
      });
    }
    if (window.useSecurityStore) window.useSecurityStore.getState().setLocked(false);
    if (window.useLocaleStore) window.useLocaleStore.getState().setLocale('en');
    if (window.useNavigationStore) {
      window.useNavigationStore.getState().setActiveTab('home_dashboard_dark_mode');
      window.useNavigationStore.getState().setSidebarCollapsed(false);
    }
    if (window.useThemeStore) window.useThemeStore.getState().setTheme('dark');
  });

  await page.waitForSelector('aside', { timeout: 10000 });
  await new Promise((r) => setTimeout(r, 800));

  // 1. Dark Expanded
  console.log('Capturing Dark Expanded...');
  const asideEl = await page.$('aside');
  const cropDarkExp = path.join(OUT_DIR, 'sidebar_dark_expanded_crop.png');
  await asideEl.screenshot({ path: cropDarkExp });
  copyToArtifacts(cropDarkExp, 'sidebar_dark_expanded_crop.png');

  const fullDarkExp = path.join(OUT_DIR, 'full_desktop_dark_expanded.png');
  await page.screenshot({ path: fullDarkExp });
  copyToArtifacts(fullDarkExp, 'full_desktop_dark_expanded.png');

  // 2. Dark Collapsed
  console.log('Capturing Dark Collapsed...');
  await page.click('[data-testid="sidebar-toggle-btn"]');
  await new Promise((r) => setTimeout(r, 600));

  const cropDarkCol = path.join(OUT_DIR, 'sidebar_dark_collapsed_crop.png');
  await asideEl.screenshot({ path: cropDarkCol });
  copyToArtifacts(cropDarkCol, 'sidebar_dark_collapsed_crop.png');

  const fullDarkCol = path.join(OUT_DIR, 'full_desktop_dark_collapsed.png');
  await page.screenshot({ path: fullDarkCol });
  copyToArtifacts(fullDarkCol, 'full_desktop_dark_collapsed.png');

  // 3. Light Collapsed
  console.log('Toggling to Light Mode...');
  await page.click('[data-testid="sidebar-theme-toggle"]');
  await new Promise((r) => setTimeout(r, 800));

  const cropLightCol = path.join(OUT_DIR, 'sidebar_light_collapsed_crop.png');
  await asideEl.screenshot({ path: cropLightCol });
  copyToArtifacts(cropLightCol, 'sidebar_light_collapsed_crop.png');

  const fullLightCol = path.join(OUT_DIR, 'full_desktop_light_collapsed.png');
  await page.screenshot({ path: fullLightCol });
  copyToArtifacts(fullLightCol, 'full_desktop_light_collapsed.png');

  // 4. Light Expanded
  console.log('Expanding to Light Expanded...');
  await page.click('[data-testid="sidebar-toggle-btn"]');
  await new Promise((r) => setTimeout(r, 600));

  const cropLightExp = path.join(OUT_DIR, 'sidebar_light_expanded_crop.png');
  await asideEl.screenshot({ path: cropLightExp });
  copyToArtifacts(cropLightExp, 'sidebar_light_expanded_crop.png');

  const fullLightExp = path.join(OUT_DIR, 'full_desktop_light_expanded.png');
  await page.screenshot({ path: fullLightExp });
  copyToArtifacts(fullLightExp, 'full_desktop_light_expanded.png');

  // 5. Quick Actions Desktop Light
  console.log('Capturing Quick Actions Light...');
  await page.click('[data-testid="quick-access-quick_actions"]');
  await new Promise((r) => setTimeout(r, 600));

  const qaLight = path.join(OUT_DIR, 'quick_actions_desktop_light.png');
  await page.screenshot({ path: qaLight });
  copyToArtifacts(qaLight, 'quick_actions_desktop_light.png');

  await page.click('[data-testid="quick-actions-close-btn"]');
  await page.waitForSelector('[data-testid="quick-actions-portal-root"]', { hidden: true });
  await new Promise((r) => setTimeout(r, 500));

  // 6. Quick Actions Desktop Dark
  console.log('Toggling to Dark Mode...');
  await page.click('[data-testid="sidebar-theme-toggle"]');
  await new Promise((r) => setTimeout(r, 800));

  await page.click('[data-testid="quick-access-quick_actions"]');
  await page.waitForSelector('[data-testid="quick-actions-portal-root"]', { visible: true });
  await new Promise((r) => setTimeout(r, 600));

  const qaDark = path.join(OUT_DIR, 'quick_actions_desktop_dark.png');
  await page.screenshot({ path: qaDark });
  copyToArtifacts(qaDark, 'quick_actions_desktop_dark.png');

  await page.keyboard.press('Escape');
  await new Promise((r) => setTimeout(r, 400));

  // 7. Mobile Bottom Sheet
  console.log('Capturing Mobile Bottom Sheet...');
  await page.setViewport({ width: 390, height: 844 });
  await new Promise((r) => setTimeout(r, 600));

  await page.click('[data-testid="central-action-btn"]');
  await new Promise((r) => setTimeout(r, 600));

  const qaMobile = path.join(OUT_DIR, 'quick_actions_mobile_bottomsheet.png');
  await page.screenshot({ path: qaMobile });
  copyToArtifacts(qaMobile, 'quick_actions_mobile_bottomsheet.png');

  await page.keyboard.press('Escape');
  await new Promise((r) => setTimeout(r, 400));

  // 8. RTL Pashto & Dari
  console.log('Capturing RTL Pashto and Dari...');
  await page.setViewport({ width: 1440, height: 900 });
  await new Promise((r) => setTimeout(r, 600));

  await page.evaluate(() => window.useLocaleStore.getState().setLocale('ps-AF'));
  await new Promise((r) => setTimeout(r, 600));
  const psPath = path.join(OUT_DIR, 'sidebar_rtl_pashto.png');
  await page.screenshot({ path: psPath });
  copyToArtifacts(psPath, 'sidebar_rtl_pashto.png');

  await page.evaluate(() => window.useLocaleStore.getState().setLocale('fa-AF'));
  await new Promise((r) => setTimeout(r, 600));
  const faPath = path.join(OUT_DIR, 'sidebar_rtl_dari.png');
  await page.screenshot({ path: faPath });
  copyToArtifacts(faPath, 'sidebar_rtl_dari.png');

  await browser.close();
  console.log('All crops and full screenshots successfully captured.');
})();
