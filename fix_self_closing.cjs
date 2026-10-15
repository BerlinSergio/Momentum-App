const fs=require('fs'); 
const path=require('path'); 
const d=path.join(__dirname,'src'); 
fs.readdirSync(d).filter(f=>f.endsWith('.jsx')).forEach(f=>{ 
  let p=path.join(d,f); 
  let c=fs.readFileSync(p,'utf-8'); 
  let m=c.replace(/\/ variant="([^"]+)">/g, 'variant="$1" />'); 
  if(m!==c) {
    fs.writeFileSync(p,m); 
    console.log("Fixed", f);
  }
});

