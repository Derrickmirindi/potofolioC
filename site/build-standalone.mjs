import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

// Run with Node.js 18+: node build-standalone.mjs
const root = path.dirname(fileURLToPath(import.meta.url));
const types = {'.webp':'image/webp','.svg':'image/svg+xml','.woff2':'font/woff2'};
const dataURL = rel => {
  const file = path.join(root, rel);
  return `data:${types[path.extname(file)]};base64,${fs.readFileSync(file).toString('base64')}`;
};
let html = fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const file of ['fonts.css','base.css','style.css']) {
  const css = fs.readFileSync(path.join(root,file),'utf8').replace(/url\('(\.\/assets\/[^']+)'\)/g,(_,url)=>`url('${dataURL(url)}')`);
  html = html.replace(`<link rel="stylesheet" href="./${file}">`,`<style>\n${css}</style>`);
}
html = html.replace('<script src="./app.js" defer></script>', `<script>\ndocument.addEventListener('DOMContentLoaded', () => {\n${fs.readFileSync(path.join(root,'app.js'),'utf8')}\n});\n</script>`);
html = html.replace(/(src|data-image|href)="(\.\/assets\/[^"]+)"/g,(_,attr,url)=>`${attr}="${dataURL(url)}"`);
const output = path.join(root,'..','Dr-Ziah-Colon-Complete.html');
fs.writeFileSync(output,html);
console.log(`Created ${output}`);
