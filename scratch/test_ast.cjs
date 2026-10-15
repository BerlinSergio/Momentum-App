const fs = require('fs');
const { createRequire } = require('module');
const appRequire = createRequire('c:/momentum/package.json');
const parser = appRequire('@babel/parser');
const generate = appRequire('@babel/generator').default;

const code = fs.readFileSync('c:/momentum/src/TasbeehMainLightMode.jsx', 'utf-8');
const ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });
const output = generate(ast, { retainLines: false }, code).code;
fs.writeFileSync('c:/momentum/scratch/test_out.jsx', output);
console.log('Original length:', code.length, 'Generated length:', output.length);

