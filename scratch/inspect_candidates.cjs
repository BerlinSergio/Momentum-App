const fs = require('fs');
const path = require('path');
const { createRequire } = require('module');
const appRequire = createRequire('c:/momentum/package.json');
const parser = appRequire('@babel/parser');
const traverse = appRequire('@babel/traverse').default;

const batch1 = [
  'TasbeehMainLightMode.jsx',
  'TasbeehSettingsLightMode.jsx',
  'TasbeehHistoryLightMode.jsx',
  'NewEditTasbeehLightMode.jsx',
  'DhikrHistoryLightMode.jsx',
  'DailyRoutineLightMode.jsx'
];

function isCard(className) {
  if (!className) return false;
  const classes = className.split(/\s+/);
  
  // Exclude small icon containers
  const isSmallIcon = classes.some(c => /^w-(4|5|6|7|8|9|10|11|12|14|16|20)\b/.test(c) && !classes.includes('w-full'));
  if (isSmallIcon && !classes.includes('mx-5')) return false;
  
  // Must have rounded container
  const hasRounded = classes.some(c => c === 'rounded-3xl' || c === 'rounded-2xl');
  if (!hasRounded) return false;
  
  // Must have margin or full width or card layout
  const hasCardSpacing = classes.some(c => c.startsWith('mx-') || c.startsWith('p-') || c === 'w-full');
  if (!hasCardSpacing) return false;

  // Must have shadow or border indicating a card
  const hasShadowOrBorder = classes.some(c => c.startsWith('shadow') || c.startsWith('border'));
  if (!hasShadowOrBorder) return false;

  // Exclude small pills/tags
  const isPill = classes.some(c => c.startsWith('text-[10px]') || c.startsWith('text-[11px]') || c === 'h-8' || c === 'h-9');
  if (isPill) return false;

  return true;
}

batch1.forEach(file => {
  const code = fs.readFileSync(path.join('c:/momentum/src', file), 'utf-8');
  const ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });
  console.log(`\n=== ${file} ===`);
  traverse(ast, {
    JSXElement(p) {
      const opening = p.node.openingElement;
      if (opening.name.type === 'JSXIdentifier' && opening.name.name === 'div') {
        const classAttr = opening.attributes.find(a => a.type === 'JSXAttribute' && a.name.name === 'className');
        if (classAttr && classAttr.value && classAttr.value.type === 'StringLiteral') {
          const cls = classAttr.value.value;
          if (isCard(cls)) {
            console.log(`L${opening.loc.start.line}: ${cls.slice(0, 80)}...`);
          }
        }
      }
    }
  });
});

