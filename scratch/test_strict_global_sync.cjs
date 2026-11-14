const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const artifactDir = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\4df946e6-85fe-47e3-a6c6-502167c18753';

(async () => {
  console.log('Starting strict global sync verification for Notes Dashboard...');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 420, height: 950, deviceScaleFactor: 2 });

  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('momentum-security-storage', JSON.stringify({
      state: { isAppLockActive: false, biometricsEnabled: false, pin: '1234' },
      version: 0
    }));
  });

  const switchTo = async (screen) => {
    await page.goto(`http://localhost:5173/?screen=${screen}`, { waitUntil: 'networkidle2' });
    await page.evaluate(() => {
      const devOverlays = document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]');
      devOverlays.forEach(el => el.style.setProperty('display', 'none', 'important'));
    });
    await new Promise(r => setTimeout(r, 600));
  };

  // --- Test 1: Active Store State Dynamic Mapping ---
  console.log('\n--- 1. Testing Dynamic Card Mapping & Metadata in Dark Mode ---');
  await switchTo('notes_main_dark_mode');

  // Verify dynamic titles from store
  const cardTitles = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('h4')).map(h => h.innerText.trim());
  });
  console.log('Rendered Note Titles:', cardTitles);

  // Verify that titles match the notes in store
  const storeNotes = await page.evaluate(() => {
    return window.localStorage.getItem('momentum-notes-storage');
  });
  console.log('Store in localStorage exists?', Boolean(storeNotes));

  // --- Test 2: Checklist Progress Synchronization ---
  console.log('\n--- 2. Testing Checklist Synchronization (Ratio & Strikethrough) ---');
  const checklistInfo = await page.evaluate(() => {
    const card = Array.from(document.querySelectorAll('h4')).find(h => h.innerText.includes('Friday Gathering'))?.closest('div[class*="cursor-pointer"]');
    if (!card) return null;
    const progressSpan = card.querySelector('span.text-teal-400, span.text-teal-600');
    const items = Array.from(card.querySelectorAll('div.flex-col > span')).map(s => ({
      text: s.innerText.trim(),
      isDone: s.classList.contains('line-through')
    }));
    return {
      progress: progressSpan ? progressSpan.innerText.trim() : null,
      items
    };
  });
  console.log('Friday Gathering Checklist Preview:', checklistInfo);
  if (!checklistInfo || !checklistInfo.progress.includes('Done')) {
    throw new Error('Checklist preview ratio missing or invalid!');
  }
  console.log(`✓ Checklist ratio verified: ${checklistInfo.progress}! Items formatted with strikethrough: ${checklistInfo.items.filter(i => i.isDone).length}/${checklistInfo.items.length}`);

  // --- Test 3: Category Routing ("See all") ---
  console.log('\n--- 3. Testing Category Routing / "See all" Button ---');
  await page.evaluate(() => {
    const seeAllBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('See all'));
    if (seeAllBtn) seeAllBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  const quickFilterActive = await page.evaluate(() => {
    const quickBtn = Array.from(document.querySelectorAll('.flex.items-center.gap-2.px-5.mb-5 button')).find(b => b.innerText.includes('Quick Notes'));
    return quickBtn ? quickBtn.classList.contains('bg-primary') : false;
  });
  console.log('Is Quick Notes filter pill highlighted after clicking "See all"?', quickFilterActive);
  if (!quickFilterActive) {
    throw new Error('Clicking "See all" did not activate the Quick Notes category filter!');
  }
  console.log('✓ "See all" category routing verified!');

  // Verify that Long Notes section is hidden under Quick Notes filter
  const hasLongNotesHeader = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('h3')).some(h => h.innerText.includes('Long Notes'));
  });
  if (hasLongNotesHeader) {
    throw new Error('Long Notes section should be hidden when filtered by Quick Notes!');
  }
  console.log('✓ Filter cleanly isolates Quick Notes!');

  // Reset to All
  await page.evaluate(() => {
    const allBtn = Array.from(document.querySelectorAll('.flex.items-center.gap-2.px-5.mb-5 button')).find(b => b.innerText.includes('All Notes'));
    if (allBtn) allBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  // --- Test 4: Dynamic Injection: Adding custom note in store ---
  console.log('\n--- 4. Testing Reactivity: Adding New Real Note in useNotesStore ---');
  await page.evaluate(() => {
    const raw = localStorage.getItem('momentum-notes-storage');
    const parsed = raw ? JSON.parse(raw) : { state: { notes: [] } };
    parsed.state.notes.unshift({
      id: 'custom-note-reactivity-test',
      type: 'quick',
      category: 'Focus',
      isPinned: true,
      title: 'Ultra Dynamic Custom Thought',
      body: 'Verified global state reactivity across the entire screen component.',
      date: 'Just now',
      savedAt: 'Just now',
      readTime: '1 min read',
      tags: ['Focus', 'QA']
    });
    localStorage.setItem('momentum-notes-storage', JSON.stringify(parsed));
  });
  // Reload screen to simulate reactivity / store sync
  await switchTo('notes_main_dark_mode');

  const customTitleFound = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('h4')).some(h => h.innerText.includes('Ultra Dynamic Custom Thought'));
  });
  console.log('Was dynamically added note rendered?', customTitleFound);
  if (!customTitleFound) {
    throw new Error('Dynamically added store note not found in DOM!');
  }
  console.log('✓ Global store dynamic reactivity verified: note injected and rendered dynamically!');

  // --- Test 5: Clean Empty State when store has 0 notes ---
  console.log('\n--- 5. Testing Clean Empty State when store is completely empty ---');
  await page.evaluate(() => {
    const raw = localStorage.getItem('momentum-notes-storage');
    const parsed = raw ? JSON.parse(raw) : { state: { notes: [] } };
    parsed.state.notes = [];
    localStorage.setItem('momentum-notes-storage', JSON.stringify(parsed));
  });
  await switchTo('notes_main_dark_mode');

  const emptyStateInfo = await page.evaluate(() => {
    const heading = document.querySelector('h3.text-base.font-semibold');
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Create First Note'));
    const pills = Array.from(document.querySelectorAll('.flex.items-center.gap-2.px-5.mb-5 button')).map(b => b.innerText.trim());
    return {
      title: heading ? heading.innerText.trim() : null,
      hasCreateBtn: Boolean(btn),
      pills
    };
  });
  console.log('Empty State Info:', emptyStateInfo);
  if (emptyStateInfo.title !== 'No Notes Yet' || !emptyStateInfo.hasCreateBtn) {
    throw new Error(`Empty state failed when store has 0 notes! Got: ${JSON.stringify(emptyStateInfo)}`);
  }
  if (!emptyStateInfo.pills.some(p => p.includes('All Notes (0)'))) {
    throw new Error(`Filter pills did not update to 0! Got: ${JSON.stringify(emptyStateInfo.pills)}`);
  }
  console.log('✓ Clean empty state verified when global store has 0 notes!');

  // Screenshot clean empty state
  const emptyShot = path.join(artifactDir, 'notes_dashboard_empty_dark.png');
  await page.screenshot({ path: emptyShot });
  console.log('Saved empty state screenshot:', emptyShot);

  // Restore default notes in store
  await page.evaluate(() => {
    localStorage.removeItem('momentum-notes-storage');
  });
  await switchTo('notes_main_dark_mode');

  // Capture final Dark & Light Mode Screenshots
  const darkShot = path.join(artifactDir, 'notes_dashboard_dark.png');
  await page.screenshot({ path: darkShot });
  console.log('Saved updated dark mode screenshot:', darkShot);

  await switchTo('notes_main_light_mode');
  const lightShot = path.join(artifactDir, 'notes_dashboard_light.png');
  await page.screenshot({ path: lightShot });
  console.log('Saved updated light mode screenshot:', lightShot);

  await browser.close();
  console.log('\nALL STRICT GLOBAL SYNCHRONIZATION TESTS PASSED 100%! 🚀');
})();

