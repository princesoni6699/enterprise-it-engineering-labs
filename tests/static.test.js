import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {labs} from '../shared/engine.js';
test('all direct routes contain deployable relative module entries',async()=>{for(const lab of labs){const html=await readFile(lab.id+'/index.html','utf8');assert.match(html,/src="\.\.\/shared\/app.js"/);assert.match(html,/name="viewport"/);assert.ok(html.includes(lab.name.replaceAll('&','&amp;')));}});
test('public source has no remote runtime scripts or executable input evaluation',async()=>{for(const item of await readdir('shared',{withFileTypes:true})){if(!item.isFile())continue;const src=await readFile('shared/'+item.name,'utf8');assert.doesNotMatch(src,/eval\s*\(|new Function\s*\(|<script[^>]*src=["']https?:/);assert.doesNotMatch(src,/-----BEGIN (?:RSA |OPENSSH )?PRIVATE KEY-----|ghp_[a-zA-Z0-9]{30,}|AKIA[A-Z0-9]{16}/);}});
test('build script excludes private learning guide and git metadata',async()=>{const build=await readFile('build.mjs','utf8');assert.doesNotMatch(build,/'private'|'\.git'/);const ignore=await readFile('.gitignore','utf8');assert.match(ignore,/private\//);});
