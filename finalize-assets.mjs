import {readFile,writeFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {labs} from './shared/engine.js';
const require=createRequire(process.env.LABS_NODE_MODULES?process.env.LABS_NODE_MODULES+'/package.json':import.meta.url),sharp=require('sharp');
const labels=[['USERS','GROUPS','DEVICES','POLICY'],['INPUT','SCRIPT','HISTORY','REPORT'],['DEVICE','POLICY','COMPLIANCE','UPDATE'],['EVENTS','SEARCH','TIMELINE','INCIDENT'],['IDENTITY','MFA','ACCESS','REVIEW']];
for(const [i,l] of labs.entries()){
 let svg=await readFile('assets/'+l.id+'.svg','utf8');
 if(!svg.includes('data-node-labels'))svg=svg.replace('</svg>',`<g data-node-labels="true" fill="#d9e5f1" font-family="Segoe UI,sans-serif" font-size="18" text-anchor="middle"><text x="330" y="243">${labels[i][0]}</text><text x="600" y="138">${labels[i][1]}</text><text x="600" y="413">${labels[i][2]}</text><text x="870" y="413">${labels[i][3]}</text></g></svg>`);
 await writeFile('assets/'+l.id+'.svg',svg);await sharp(Buffer.from(svg)).png().toFile('assets/'+l.id+'.png');
 let html=await readFile(l.id+'/index.html','utf8');html=html.replace(/<title>.*?<\/title>/,`<title>${l.name.replaceAll('&','&amp;')} | Enterprise IT Engineering Labs</title>`).replace(/<meta name="description" content="[^"]*">/,`<meta name="description" content="${l.description}">`);
 if(!html.includes('og:title'))html=html.replace('</head>',`<meta property="og:title" content="${l.name.replaceAll('&','&amp;')} | Enterprise IT Engineering Labs"><meta property="og:description" content="${l.description}"><meta property="og:type" content="website"><meta property="og:image" content="../assets/${l.id}.png"><meta name="twitter:card" content="summary_large_image"></head>`);
 await writeFile(l.id+'/index.html',html);
 let doc=await readFile(l.id+'/README.md','utf8');doc=doc.replace('Actual browser captures will be placed in ../assets/screenshots/ following browser verification.',`![Actual working ${l.name} application](../assets/screenshots/${l.id}.png)`);await writeFile(l.id+'/README.md',doc);
}
for(const file of ['shared/app.js','shared/enhancements.js']){let text=await readFile(file,'utf8');text=text.replaceAll('<meter min="0"','<meter aria-label="Record count" min="0"');text=text.replaceAll('<div class="table-wrap">','<div class="table-wrap" tabindex="0" role="region" aria-label="Scrollable inventory">');await writeFile(file,text);}
console.log('Prepared five 1200×627 PNG thumbnails, route metadata and screenshot references.');

