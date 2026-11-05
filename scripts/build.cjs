const fs=require('node:fs');
fs.mkdirSync('dist',{recursive:true});
for(const file of ['index.html','styles.css','app.js'])fs.copyFileSync(file,`dist/${file}`);
fs.writeFileSync('dist/.nojekyll','');
console.log('Static build ready: dist/');
