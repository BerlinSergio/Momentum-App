const fs = require('fs');
const path = require('path');
const { createRequire } = require('module');
const appRequire = createRequire('c:/momentum/package.json');
const parser = appRequire('@babel/parser');
const traverse = appRequire('@babel/traverse').default;

const SRC_DIR = 'c:/momentum/src';

const LIGHT_OPTICS_CODE = `import { Glass } from '@samasante/liquid-glass';

const glassOptics = {
  frost: 12,
  brightness: 0.05,
  specular: 0.8,
  strength: 0.1,
};
`;

const DARK_OPTICS_CODE = `import { Glass } from '@samasante/liquid-glass';

const glassOptics = {
  frost: 12,
  brightness: -0.15,
  specular: 0.5,
  strength: 0.1,
};
`;

function isPrimaryCard(className) {
  if (!className) return false;
  const classes = className.split(/\s+/);
  
  // Exclude small icon containers
  const isSmallIcon = classes.some(c => /^w-(4|5|6|7|8|9|10|11|12|14|16|20)\b/.test(c) && !classes.includes('w-full'));
  if (isSmallIcon && !classes.some(c => c.startsWith('mx-'))) return false;
  
  // Must have rounded container
  const hasRounded = classes.some(c => c === 'rounded-3xl' || c === 'rounded-2xl');
  if (!hasRounded) return false;
  
  // Must have card margin (mx-5, mx-4, my-5, etc.) or full width card
  const hasCardMargin = classes.some(c => c.startsWith('mx-') || c === 'my-3' || c === 'my-5');
  if (!hasCardMargin) return false;

  // Must have shadow or border indicating a card
  const hasShadowOrBorder = classes.some(c => c.startsWith('shadow') || c.startsWith('border'));
  if (!hasShadowOrBorder) return false;

  // Exclude small pills/tags
  const isPill = classes.some(c => c.startsWith('text-[10px]') || c.startsWith('text-[11px]') || c === 'h-8' || c === 'h-9');
  if (isPill) return false;

  return true;
}

function transformClass(className, isDark) {
  const classes = className.split(/\s+/).filter(Boolean);
  
  // Replace background color with translucent glassmorphic bg
  const newClasses = [];
  let hasBg = false;
  for (const c of classes) {
    if (c.startsWith('bg-white') || c === 'bg-slate-50' || c.startsWith('bg-slate-900') || c.startsWith('bg-slate-800')) {
      if (!hasBg) {
        newClasses.push(isDark ? 'bg-slate-900/80' : 'bg-white/80');
        hasBg = true;
      }
    } else {
      newClasses.push(c);
    }
  }
  if (!hasBg) {
    newClasses.push(isDark ? 'bg-slate-900/80' : 'bg-white/80');
  }

  if (!newClasses.includes('block')) {
    newClasses.unshift('block');
  }
  if (!newClasses.some(c => c.startsWith('backdrop-blur'))) {
    newClasses.push('backdrop-blur-xl');
  }

  return newClasses.join(' ');
}

function processPair(lightFileName) {
  const darkFileName = lightFileName.replace('LightMode', 'DarkMode');
  const lightPath = path.join(SRC_DIR, lightFileName);
  const darkPath = path.join(SRC_DIR, darkFileName);

  let lightCode = fs.readFileSync(lightPath, 'utf-8');
  let darkCode = fs.readFileSync(darkPath, 'utf-8');

  // Skip if already imported
  if (lightCode.includes('@samasante/liquid-glass') && darkCode.includes('@samasante/liquid-glass')) {
    console.log(`[SKIP] ${lightFileName} already integrated.`);
    return true;
  }

  const lightAst = parser.parse(lightCode, { sourceType: 'module', plugins: ['jsx'] });
  const darkAst = parser.parse(darkCode, { sourceType: 'module', plugins: ['jsx'] });

  const lightCards = [];
  traverse(lightAst, {
    JSXElement(p) {
      const opening = p.node.openingElement;
      if (opening.name.type === 'JSXIdentifier' && opening.name.name === 'div') {
        const classAttr = opening.attributes.find(a => a.type === 'JSXAttribute' && a.name.name === 'className');
        if (classAttr && classAttr.value && classAttr.value.type === 'StringLiteral') {
          if (isPrimaryCard(classAttr.value.value)) {
            lightCards.push({
              node: p.node,
              className: classAttr.value.value,
              openingStart: opening.start,
              openingEnd: opening.end,
              closingStart: p.node.closingElement ? p.node.closingElement.start : null,
              closingEnd: p.node.closingElement ? p.node.closingElement.end : null,
              classAttr
            });
          }
        }
      }
    }
  });

  const darkCards = [];
  traverse(darkAst, {
    JSXElement(p) {
      const opening = p.node.openingElement;
      if (opening.name.type === 'JSXIdentifier' && opening.name.name === 'div') {
        const classAttr = opening.attributes.find(a => a.type === 'JSXAttribute' && a.name.name === 'className');
        if (classAttr && classAttr.value && classAttr.value.type === 'StringLiteral') {
          if (isPrimaryCard(classAttr.value.value)) {
            darkCards.push({
              node: p.node,
              className: classAttr.value.value,
              openingStart: opening.start,
              openingEnd: opening.end,
              closingStart: p.node.closingElement ? p.node.closingElement.start : null,
              closingEnd: p.node.closingElement ? p.node.closingElement.end : null,
              classAttr
            });
          }
        }
      }
    }
  });

  console.log(`-> ${lightFileName}: found ${lightCards.length} cards, Dark has ${darkCards.length} cards.`);
  if (lightCards.length !== darkCards.length) {
    console.error(`ERROR: Card count mismatch between ${lightFileName} (${lightCards.length}) and ${darkFileName} (${darkCards.length})`);
    return false;
  }

  // Transform Light Mode
  // Sort cards descending by position to keep offsets valid
  const sortedLight = [...lightCards].sort((a, b) => b.openingStart - a.openingStart);
  for (const card of sortedLight) {
    const newClass = transformClass(card.className, false);
    // Replace closing tag if exists
    if (card.closingStart !== null) {
      lightCode = lightCode.slice(0, card.closingStart) + '</Glass>' + lightCode.slice(card.closingEnd);
    }
    // Replace opening tag
    const newOpening = `<Glass style={{ display: 'block' }} optics={glassOptics} className="${newClass}">`;
    lightCode = lightCode.slice(0, card.openingStart) + newOpening + lightCode.slice(card.openingEnd);
  }

  // Transform Dark Mode
  const sortedDark = [...darkCards].sort((a, b) => b.openingStart - a.openingStart);
  for (const card of sortedDark) {
    const newClass = transformClass(card.className, true);
    if (card.closingStart !== null) {
      darkCode = darkCode.slice(0, card.closingStart) + '</Glass>' + darkCode.slice(card.closingEnd);
    }
    const newOpening = `<Glass style={{ display: 'block' }} optics={glassOptics} className="${newClass}">`;
    darkCode = darkCode.slice(0, card.openingStart) + newOpening + darkCode.slice(card.openingEnd);
  }

  // Add import and glassOptics at top
  // In lightCode: after first import line or at start
  const firstImportLight = lightCode.indexOf("import React");
  if (firstImportLight !== -1) {
    const nextLine = lightCode.indexOf('\n', firstImportLight);
    lightCode = lightCode.slice(0, nextLine + 1) + LIGHT_OPTICS_CODE + lightCode.slice(nextLine + 1);
  } else {
    lightCode = LIGHT_OPTICS_CODE + lightCode;
  }

  const firstImportDark = darkCode.indexOf("import React");
  if (firstImportDark !== -1) {
    const nextLine = darkCode.indexOf('\n', firstImportDark);
    darkCode = darkCode.slice(0, nextLine + 1) + DARK_OPTICS_CODE + darkCode.slice(nextLine + 1);
  } else {
    darkCode = DARK_OPTICS_CODE + darkCode;
  }

  fs.writeFileSync(lightPath, lightCode, 'utf-8');
  fs.writeFileSync(darkPath, darkCode, 'utf-8');
  console.log(`[OK] Successfully transformed ${lightFileName} and ${darkFileName}`);
  return true;
}

const batchFiles = process.argv.slice(2);
if (batchFiles.length === 0) {
  console.log('Provide files to process.');
  process.exit(1);
}

let allOk = true;
for (const f of batchFiles) {
  const ok = processPair(f);
  if (!ok) allOk = false;
}

if (!allOk) {
  console.error('Batch had errors!');
  process.exit(1);
} else {
  console.log('Batch completed successfully!');
}

