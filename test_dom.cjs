const { JSDOM } = require('jsdom');
const fs = require('fs');

let html = fs.readFileSync('dist/index.html', 'utf8');
html = html.replace(/href="\/assets\//g, 'href="http://localhost:4175/assets/');
html = html.replace(/src="\/assets\//g, 'src="http://localhost:4175/assets/');

const dom = new JSDOM(html, {
  url: 'http://localhost:4175/',
  runScripts: 'dangerously',
  resources: 'usable'
});

const vcon = dom.window.console;
dom.window.console = {
  ...vcon,
  error: (...args) => console.log('CONSOLE ERROR:', ...args),
  warn: (...args) => console.log('CONSOLE WARN:', ...args),
  log: (...args) => console.log('CONSOLE LOG:', ...args)
};

dom.window.onerror = function(msg, source, lineno, colno, error) {
  console.log('JSDOM ONERROR:', msg, error);
};

dom.window.addEventListener('unhandledrejection', event => {
  console.log('JSDOM REJECTION:', event.reason);
});

setTimeout(() => {
  console.log('JSDOM Output root content:');
  console.log(dom.window.document.getElementById('root').innerHTML.substring(0, 500));
  process.exit(0);
}, 3000);
