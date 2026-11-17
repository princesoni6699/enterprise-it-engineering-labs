import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import {labs} from './shared/engine.js';
process.env.LABS_PORT='4174'; await import('./server.mjs');
const require=createRequire(process.env.LABS_NODE_MODULES?process.env.LABS_NODE_MODULES+'/package.json':import.meta.url);
const {chromium}=require('playwright');
const channel=process.env.LABS_BROWSER||'msedge';
const browser=await chromium.launch({channel,headless:true});
await mkdir('assets/screenshots',{recursive:true});
const page=await browser.newPage(),errors=[],results=[],accessibility=[],timings=[];
page.on('pageerror',e=>errors.push(e.message));
page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});
for(const width of [320,360,375,390,414,768,1024,1280,1440,1920,2560]){
 await page.setViewportSize({width,height:1000});
 for(const route of ['',...labs.map(l=>l.id+'/')]){
  await page.goto('http://127.0.0.1:4174/'+route);await page.locator('h1').waitFor();await page.evaluate(()=>document.fonts.ready);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
  if(overflow)throw Error('Horizontal overflow: '+width+' '+route);
  if(width===1440){const audit=await page.evaluate(()=>({unlabelledInputs:[...document.querySelectorAll('input,select,textarea')].filter(el=>!el.labels?.length&&!el.getAttribute('aria-label')).length,emptyButtons:[...document.querySelectorAll('button')].filter(el=>!el.textContent.trim()&&!el.getAttribute('aria-label')).length,h1:document.querySelectorAll('h1').length,lang:document.documentElement.lang,loadMs:performance.getEntriesByType('navigation')[0].duration}));if(audit.unlabelledInputs||audit.emptyButtons||audit.h1!==1||!audit.lang)throw Error('Semantic accessibility check failed');accessibility.push({route,...audit});timings.push(audit.loadMs);}
  results.push({width,route,overflow:false});
  if(width===1440){await page.emulateMedia({reducedMotion:'reduce'});await page.evaluate(()=>new Promise(requestAnimationFrame));await page.screenshot({path:'assets/screenshots/'+(route.split('/')[0]||'hub')+'.png',fullPage:true,animations:'disabled'});await page.emulateMedia({reducedMotion:'no-preference'});}
 }
}
await page.goto('http://127.0.0.1:4174/01-active-directory-lab/');
await page.getByRole('button',{name:'Inspect Charlotte Bennett',exact:true}).click();await page.getByRole('button',{name:'Unlock',exact:true}).click();
await page.waitForFunction(()=>JSON.parse(localStorage.getItem('01-active-directory-lab')).records[0].status==='Enabled');
await page.reload();if(await page.locator('tbody tr').first().innerText().then(t=>!t.includes('Enabled')))throw Error('Persistence failed');
await page.getByRole('button',{name:'Audit history',exact:true}).click();await page.getByText('Simulation completed',{exact:true}).waitFor();
const dl=page.waitForEvent('download');await page.getByRole('button',{name:'Export audit CSV'}).click();if(!(await dl).suggestedFilename().endsWith('.csv'))throw Error('Download failed');
page.once('dialog',d=>d.accept());await page.getByRole('button',{name:'Reset lab'}).click();await page.getByRole('button',{name:'Workspace',exact:true}).click();if(!(await page.locator('tbody tr').first().innerText()).includes('Locked'))throw Error('Reset failed');
await page.goto('http://127.0.0.1:4174/03-intune-endpoint-lab/');await page.getByRole('button',{name:'Inspect BRI-LT-014',exact:true}).click();await page.getByRole('button',{name:'Remediate',exact:true}).click();if(!(await page.locator('tbody tr').first().innerText()).includes('Compliant'))throw Error('Remediation failed');
await page.goto('http://127.0.0.1:4174/05-entra-identity-lab/');await page.getByRole('button',{name:'Inspect Charlotte Bennett',exact:true}).click();await page.getByRole('button',{name:'Register MFA',exact:true}).click();await page.getByRole('button',{name:'Retry sign-in',exact:true}).click();if(!(await page.locator('tbody tr').first().innerText()).includes('Allowed'))throw Error('MFA workflow failed');
await page.goto('http://127.0.0.1:4174/04-splunk-security-lab/');await page.locator('#query').fill('index=windows EventCode=4740');await page.getByRole('button',{name:'Search events'}).click();if(await page.locator('tbody tr').count()!==1)throw Error('Query filtering failed');
await page.goto('http://127.0.0.1:4174/02-powershell-automation/');await page.getByRole('button',{name:'Inspect Disk space',exact:true}).click();await page.getByRole('button',{name:'Run report',exact:true}).click();await page.getByText('"freePercent": 8',{exact:false}).waitFor();
await page.locator('[name="csv"]').fill('name,department\nJack Walker,Finance');await page.getByRole('button',{name:'Validate and simulate bulk creation'}).click();await page.getByText('"Jack Walker"',{exact:false}).waitFor();
await page.goto('http://127.0.0.1:4174/05-entra-identity-lab/');await page.getByRole('button',{name:'Policies & resources'}).click();await page.getByRole('button',{name:'Deny privileged access'}).click();await page.getByRole('button',{name:'Workspace',exact:true}).click();if(!(await page.locator('tbody tr').nth(1).innerText()).includes('None'))throw Error('Access review failed');
await page.goto('http://127.0.0.1:4174/04-splunk-security-lab/');await page.locator('[name="notes"]').fill('Repeated 4625 from 192.0.2.41 followed by 4740. Investigate scheduled task credentials.');await page.getByRole('button',{name:'Save notes'}).click();await page.getByRole('button',{name:'Inspect Authentication failure'}).first().click();await page.getByRole('button',{name:'Resolve',exact:true}).click();if(!(await page.locator('tbody tr').first().innerText()).includes('Resolved'))throw Error('Incident resolution failed');
await page.goto('http://127.0.0.1:4174/01-active-directory-lab/');await page.locator('#objects [name="name"]').fill('BRI-WS-999');await page.getByRole('button',{name:'Create directory object'}).click();await page.getByRole('button',{name:'Policies & resources'}).click();await page.getByRole('heading',{name:'BRI-WS-999',exact:true}).waitFor();await page.getByRole('button',{name:'Workspace',exact:true}).click();await page.locator('#membership [name="name"]').selectOption('Service-Desk');await page.locator('#membership [name="member"]').selectOption('u1');await page.getByRole('button',{name:'Update membership'}).click();if(!(await page.locator('tbody tr').first().innerText()).includes('Service-Desk'))throw Error('Membership workflow failed');
await page.goto('http://127.0.0.1:4174/02-powershell-automation/');await page.locator('#parameters [name="id"]').selectOption('inactive');await page.locator('#parameters [name="threshold"]').fill('120');await page.getByRole('button',{name:'Run with parameters'}).click();await page.getByText('"results": []',{exact:false}).waitFor();const out=page.waitForEvent('download');await page.getByRole('button',{name:'Download output JSON'}).click();if((await out).suggestedFilename()!=='automation-output.json')throw Error('Output export failed');
await page.goto('http://127.0.0.1:4174/05-entra-identity-lab/');await page.getByRole('button',{name:'Create identity',exact:true}).locator('..').locator('[name="name"]').fill('Jack Walker');await page.getByRole('button',{name:'Create identity',exact:true}).click();await page.getByRole('button',{name:'Inspect Jack Walker',exact:true}).waitFor();await page.locator('#roles [name="role"]').selectOption('Security Reader');await page.locator('#roles [name="reason"]').fill('Review synthetic security evidence');await page.getByRole('button',{name:'Assign simulated role'}).click();if(!(await page.locator('tbody tr').first().innerText()).includes('Security Reader'))throw Error('Role assignment failed');
await page.getByRole('button',{name:'Apply access policy'}).locator('..').locator('[name="preset"]').selectOption('MFA and compliant device');await page.getByRole('button',{name:'Apply access policy'}).click();await page.getByRole('button',{name:'Inspect Charlotte Bennett',exact:true}).click();await page.getByRole('button',{name:'Retry sign-in',exact:true}).click();await page.getByText('Compliant device required',{exact:true}).waitFor();
await page.locator('#cloud-group [name="name"]').fill('Audit cloud readers');await page.getByRole('button',{name:'Create cloud group',exact:true}).click();await page.locator('#cloud-members [name="name"]').selectOption('Audit cloud readers');await page.locator('#cloud-members [name="member"]').selectOption('i2');await page.getByRole('button',{name:'Update cloud membership'}).click();await page.getByRole('button',{name:'Policies & resources'}).click();await page.getByRole('heading',{name:'Audit cloud readers',exact:true}).waitFor();
await page.getByRole('button',{name:'Switch theme'}).click();
for(const width of [320,360,375,390,414,768,1024,1280,1440,1920,2560]){await page.setViewportSize({width,height:1000});for(const route of ['',...labs.map(l=>l.id+'/')]){await page.goto('http://127.0.0.1:4174/'+route);if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Light overflow '+width+' '+route);results.push({width,route,theme:'light',overflow:false});if(width===390&&!route)await page.screenshot({path:'assets/screenshots/mobile-light.png',fullPage:true});}}
await page.setViewportSize({width:390,height:1000});await page.goto('http://127.0.0.1:4174/');await page.getByRole('combobox',{name:'Navigate labs'}).selectOption('03-intune-endpoint-lab/');await page.getByRole('heading',{name:'Intune Endpoint',exact:true}).waitFor();await page.goto('http://127.0.0.1:4174/');await page.keyboard.press('Tab');if(await page.evaluate(()=>document.activeElement===document.body))throw Error('Keyboard navigation failed');
const links=new Set();for(const route of ['',...labs.map(l=>l.id+'/')]){await page.goto('http://127.0.0.1:4174/'+route);for(const href of await page.locator('a').evaluateAll(as=>as.map(a=>a.href)))links.add(href);}
for(const href of links){const response=await page.request.get(href);if(!response.ok())throw Error('Broken link '+href);}
await page.goto('http://127.0.0.1:4174/');await page.evaluate(()=>document.fonts.ready);
if(!await page.evaluate(()=>document.fonts.check('16px Manrope')&&document.fonts.check('24px "Space Grotesk"')))throw Error('Local fonts not loaded');
if(!await page.evaluate(()=>getComputedStyle(document.body).fontFamily.includes('Manrope')&&getComputedStyle(document.querySelector('.card')).borderRadius==='16px'))throw Error('Design stylesheet not applied');
const themeButton=page.getByRole('button',{name:'Switch theme'});await themeButton.hover();await page.evaluate(()=>new Promise(requestAnimationFrame));
if(!await themeButton.evaluate(el=>el.style.getPropertyValue('--pointer-x')))throw Error('Liquid pointer tracking failed');
await themeButton.click();if(!await page.locator('.liquid-ripple').count())throw Error('Liquid click effect failed');
await page.emulateMedia({reducedMotion:'reduce'});await themeButton.click();
if(await page.evaluate(()=>getComputedStyle(document.body,'::before').animationName!=='none'))throw Error('Reduced-motion background still animates');
await page.waitForTimeout(850);if(await page.locator('.liquid-ripple').count())throw Error('Ripple cleanup failed');
await page.emulateMedia({reducedMotion:'no-preference'});
await browser.close();if(errors.length)throw Error(errors.join('\n'));await writeFile('documentation/browser-results-'+channel+'.json',JSON.stringify({browser:channel,viewports:results,semanticAccessibility:accessibility,localNavigationLoadMs:timings,verifiedLocalLinks:links.size,workflows:['directory unlock, persistence, audit, export and reset','endpoint remediation','MFA registration and retry','SPL filtering','PowerShell report simulation','bulk CSV processing','access review','incident notes and resolution','computer creation and membership','report parameters and JSON download','identity creation and justified role assignment','light mode and keyboard focus'],consoleErrors:errors},null,2));console.log('PASS: '+results.length+' route/theme/viewport checks, extended functional workflows, no page errors or failed requests.');process.exit(0);



