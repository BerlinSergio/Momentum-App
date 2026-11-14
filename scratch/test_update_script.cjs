const fs = require('fs');

const updateResults = [];

function updatePair(darkFile, lightFile, darkTransform, lightTransform) {
  let dContent = fs.readFileSync(`src/${darkFile}.jsx`, 'utf8');
  let lContent = fs.readFileSync(`src/${lightFile}.jsx`, 'utf8');

  const originalDLength = dContent.split(/\r?\n/).length;
  const originalLLength = lContent.split(/\r?\n/).length;

  dContent = darkTransform(dContent);
  lContent = lightTransform(lContent);

  fs.writeFileSync(`src/${darkFile}.jsx`, dContent, 'utf8');
  fs.writeFileSync(`src/${lightFile}.jsx`, lContent, 'utf8');

  const newDLength = dContent.split(/\r?\n/).length;
  const newLLength = lContent.split(/\r?\n/).length;

  updateResults.push({
    darkFile,
    lightFile,
    match: newDLength === newLLength,
    newDLength,
    newLLength
  });
}

// -------------------------------------------------------------
// Helper to replace export line to include goBack
// -------------------------------------------------------------
function addGoBackToExport(content, componentName) {
  const target = `export default function ${componentName}({ setActiveTab }) {`;
  const replacement = `export default function ${componentName}({ setActiveTab, goBack }) {`;
  if (!content.includes(target)) {
    throw new Error(`Could not find export signature in ${componentName}`);
  }
  return content.replace(target, replacement);
}

// -------------------------------------------------------------
// Standard pair handler
// -------------------------------------------------------------
function makeStandardTransform(componentName, isDark, fallbackPrefix) {
  return function(content) {
    // 1. Export signature
    content = addGoBackToExport(content, componentName);

    // 2. Replace onClick
    const oldScreen = isDark ? 'home_dashboard_dark_mode' : 'home_dashboard_light_mode';
    const fallbackScreen = isDark ? `${fallbackPrefix}_dark_mode` : `${fallbackPrefix}_light_mode`;

    // Standard patterns
    const pattern1 = `onClick={() => setActiveTab && setActiveTab('${oldScreen}')}`;
    const replacement1 = `onClick={() => (goBack ? goBack('${fallbackScreen}') : (setActiveTab ? setActiveTab('${fallbackScreen}') : window.history.back()))}`;

    if (content.includes(pattern1)) {
      content = content.replace(pattern1, replacement1);
      return content;
    }

    // Sometimes with space or type="button"
    const pattern2 = `onClick={() => setActiveTab && setActiveTab('${oldScreen}')}`;
    if (content.includes(pattern2)) {
      content = content.replace(pattern2, replacement1);
      return content;
    }

    throw new Error(`Could not find back button onClick in ${componentName}`);
  };
}

console.log("Script template ready.");

