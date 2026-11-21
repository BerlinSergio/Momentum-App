const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/USER/.gemini/antigravity/brain/4df946e6-85fe-47e3-a6c6-502167c18753';
const OUT_DIR = path.join(__dirname, 'screenshots', 'light_variants');
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
      window.useNavigationStore.getState().setActiveTab('home_dashboard_light_mode');
      window.useNavigationStore.getState().setSidebarPosition('left');
      window.useNavigationStore.getState().setSidebarCollapsed(false);
    }
    if (window.useThemeStore) window.useThemeStore.getState().setTheme('light');
  });

  await page.waitForSelector('aside', { timeout: 10000 });
  await new Promise((r) => setTimeout(r, 600));

  // 1. Left Expanded Light
  const p1 = path.join(OUT_DIR, 'left_expanded_light.png');
  await page.screenshot({ path: p1 });
  copyToArtifacts(p1, 'left_expanded_light.png');

  // 2. Left Collapsed Light
  await page.click('[data-testid="sidebar-toggle-btn"]');
  await new Promise((r) => setTimeout(r, 600));
  const p2 = path.join(OUT_DIR, 'left_collapsed_light.png');
  await page.screenshot({ path: p2 });
  copyToArtifacts(p2, 'left_collapsed_light.png');

  // 3. Right Collapsed Light
  await page.click('[data-testid="sidebar-position-btn"]');
  await page.waitForSelector('[data-testid="sidebar-position-menu"]', { visible: true });
  await page.click('[data-testid="sidebar-position-option-right"]');
  await new Promise((r) => setTimeout(r, 800));
  const p3 = path.join(OUT_DIR, 'right_collapsed_light.png');
  await page.screenshot({ path: p3 });
  copyToArtifacts(p3, 'right_collapsed_light.png');

  // 4. Right Expanded Light
  await page.click('[data-testid="sidebar-toggle-btn"]');
  await new Promise((r) => setTimeout(r, 600));
  const p4 = path.join(OUT_DIR, 'right_expanded_light.png');
  await page.screenshot({ path: p4 });
  copyToArtifacts(p4, 'right_expanded_light.png');

  // 5. Top Expanded Light
  await page.click('[data-testid="sidebar-position-btn"]');
  await page.waitForSelector('[data-testid="sidebar-position-menu"]', { visible: true });
  await page.click('[data-testid="sidebar-position-option-top"]');
  await new Promise((r) => setTimeout(r, 800));
  const p5 = path.join(OUT_DIR, 'top_expanded_light.png');
  await page.screenshot({ path: p5 });
  copyToArtifacts(p5, 'top_expanded_light.png');

  // 6. Top Collapsed Light
  await page.click('[data-testid="sidebar-toggle-btn"]');
  await new Promise((r) => setTimeout(r, 600));
  const p6 = path.join(OUT_DIR, 'top_collapsed_light.png');
  await page.screenshot({ path: p6 });
  copyToArtifacts(p6, 'top_collapsed_light.png');

  // 7. Bottom Collapsed Light
  await page.click('[data-testid="sidebar-position-btn"]');
  await page.waitForSelector('[data-testid="sidebar-position-menu"]', { visible: true });
  await page.click('[data-testid="sidebar-position-option-bottom"]');
  await new Promise((r) => setTimeout(r, 800));
  const p7 = path.join(OUT_DIR, 'bottom_collapsed_light.png');
  await page.screenshot({ path: p7 });
  copyToArtifacts(p7, 'bottom_collapsed_light.png');

  // 8. Bottom Expanded Light
  await page.click('[data-testid="sidebar-toggle-btn"]');
  await new Promise((r) => setTimeout(r, 600));
  const p8 = path.join(OUT_DIR, 'bottom_expanded_light.png');
  await page.screenshot({ path: p8 });
  copyToArtifacts(p8, 'bottom_expanded_light.png');

  // RTL Pashto on Right
  await page.click('[data-testid="sidebar-position-btn"]');
  await page.waitForSelector('[data-testid="sidebar-position-menu"]', { visible: true });
  await page.click('[data-testid="sidebar-position-option-right"]');
  await new Promise((r) => setTimeout(r, 600));

  await page.evaluate(() => window.useLocaleStore.getState().setLocale('ps-AF'));
  await new Promise((r) => setTimeout(r, 600));
  const pPs = path.join(OUT_DIR, 'right_expanded_pashto.png');
  await page.screenshot({ path: pPs });
  copyToArtifacts(pPs, 'right_expanded_pashto.png');

  // RTL Dari on Top
  await page.click('[data-testid="sidebar-position-btn"]');
  await page.waitForSelector('[data-testid="sidebar-position-menu"]', { visible: true });
  await page.click('[data-testid="sidebar-position-option-top"]');
  await new Promise((r) => setTimeout(r, 600));

  await page.evaluate(() => window.useLocaleStore.getState().setLocale('fa-AF'));
  await new Promise((r) => setTimeout(r, 600));
  const pFa = path.join(OUT_DIR, 'top_expanded_dari.png');
  await page.screenshot({ path: pFa });
  copyToArtifacts(pFa, 'top_expanded_dari.png');

  // Reset to Left & English
  await page.evaluate(() => {
    window.useLocaleStore.getState().setLocale('en');
    window.useNavigationStore.getState().setSidebarPosition('left');
  });
  await new Promise((r) => setTimeout(r, 400));

  await browser.close();
  console.log('All Light variants and RTL configurations captured successfully.');
})();
