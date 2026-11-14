const fs = require('fs');

function search(d) {
  fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
    const p = d + '/' + e.name;
    if (e.isDirectory() && e.name !== 'node_modules' && e.name !== 'dist') {
      search(p);
    } else if (p.endsWith('.jsx') || p.endsWith('.js')) {
      const c = fs.readFileSync(p, 'utf8');
      const m = c.match(/https:\/\/[^'"`\s]+/g);
      if (m) {
        m.forEach(u => {
          if (u.includes('picsum') || u.includes('googleusercontent') || u.includes('unsplash')) {
            console.log(`${p}: ${u.slice(0, 80)}...`);
          }
        });
      }
    }
  });
}
search('src');

