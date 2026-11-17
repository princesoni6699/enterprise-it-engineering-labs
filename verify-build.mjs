import {readFile,access} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {labs} from './shared/engine.js';
for(const lab of [null,...labs]){const html=await readFile('dist/'+(lab?lab.id+'/':'')+'index.html','utf8');assert.match(html,/<meta name="viewport"/);assert.match(html,/<script type="module"/);if(process.env.LABS_PUBLIC_URL){assert.match(html,/rel="canonical"/);assert.match(html,/property="og:image" content="https:\/\//);}}
for(const path of ['dist/private','dist/.git','dist/.github']){let exists=false;try{await access(path);exists=true;}catch{}assert.equal(exists,false,path+' must not be published');}
console.log('PASS: six production entries verified; private and Git metadata excluded.');
