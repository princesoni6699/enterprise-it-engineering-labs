import {createRequire} from 'node:module';
import {writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {labs} from './shared/engine.js';
const require=createRequire(process.env.LABS_NODE_MODULES?process.env.LABS_NODE_MODULES+'/package.json':import.meta.url);
const {chromium}=require('playwright');
const channel=process.env.LABS_BROWSER||'chrome',browser=await chromium.launch({channel,headless:true});
const results=[],errors=[];
try{
 const page=await browser.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 const base=process.env.LABS_PREVIEW_URL||'http://127.0.0.1:4173/';
 const settle=()=>page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
 await page.setViewportSize({width:1440,height:1000});await page.goto(base);await page.evaluate(()=>document.fonts.ready);await settle();assert.equal(await page.locator('.tech-node').count(),5);assert.equal(await page.locator('.hero-art').count(),0);await page.screenshot({path:'assets/screenshots/toolkit-hero.png',animations:'disabled'});
 for(const width of [320,360,375,390,414,768,1024,1280,1440,1920,2560]){
  await page.setViewportSize({width,height:1000});await page.goto(base);await page.evaluate(()=>document.fonts.ready);await settle();
  const initial=await page.locator('.project-journey').getAttribute('data-thread-progress');assert.ok(initial!==null);
  const max=await page.evaluate(()=>document.documentElement.scrollHeight-innerHeight),samples=[];
  for(const fraction of [0,.25,.5,.75,1,.5,0]){
   await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),max*fraction);await settle();
   const sample=await page.evaluate(()=>{const journey=document.querySelector('.project-journey');return {progress:Number(journey.dataset.threadProgress),offset:Number(document.querySelector('.thread-core').style.strokeDashoffset),revealed:document.querySelectorAll('.project-scene.is-revealed').length,overflow:document.documentElement.scrollWidth>innerWidth,anchorError:Math.abs(journey.getBoundingClientRect().top+Number(journey.dataset.threadScrollY)-Number(journey.dataset.threadAnchor))};});
   assert.equal(sample.overflow,false);if(sample.progress>0&&sample.progress<1)assert.ok(sample.anchorError<.5,'Section scroll mapping must stay aligned to its viewport anchor');samples.push(sample);
   if(fraction===.5){const opacity=await page.locator('.project-scene').nth(2).evaluate(el=>getComputedStyle(el).opacity);await page.waitForTimeout(200);assert.equal(await page.locator('.project-scene').nth(2).evaluate(el=>getComputedStyle(el).opacity),opacity);}
  }
  assert.equal(samples[4].progress,1);assert.equal(samples[4].revealed,5);assert.equal(samples[4].offset,0);assert.ok(samples[2].progress>samples[1].progress);assert.ok(samples[5].progress<samples[4].progress);assert.equal(samples[0].progress,samples[6].progress);
  results.push({width,samples});
 }
 await page.setViewportSize({width:1440,height:1000});await page.goto(base);await page.evaluate(()=>document.fonts.ready);
 const y=await page.locator('.project-journey').evaluate(el=>el.getBoundingClientRect().top+scrollY+el.offsetHeight*.3);await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);await settle();await page.waitForTimeout(900);
 await page.screenshot({path:'assets/screenshots/scroll-thread-desktop.png',animations:'disabled'});
 await page.emulateMedia({reducedMotion:'reduce'});await settle();assert.equal(await page.locator('.project-scene.is-revealed').count(),5);
 await page.screenshot({path:'assets/screenshots/hub.png',fullPage:true,animations:'disabled'});
 await page.emulateMedia({reducedMotion:'no-preference'});await page.setViewportSize({width:390,height:844});await page.goto(base);await page.evaluate(()=>document.fonts.ready);await settle();
 const mobileY=await page.locator('.project-journey').evaluate(el=>el.getBoundingClientRect().top+scrollY+el.offsetHeight*.25);await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),mobileY);await settle();await page.waitForTimeout(900);await page.screenshot({path:'assets/screenshots/scroll-thread-mobile.png',animations:'disabled'});
 for(const lab of labs){
  await page.goto(base+lab.id+'/');await settle();assert.ok(await page.locator('.scroll-reveal').count()>0);
  await page.evaluate(()=>scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));await settle();
  const panel=page.locator('.scroll-reveal').last();assert.equal(await panel.evaluate(el=>getComputedStyle(el).opacity),'1');
  const middle=await panel.evaluate(el=>el.getBoundingClientRect().top+scrollY-innerHeight*.94+Math.min(innerHeight*.35,Math.max(100,el.offsetHeight*.45))*.5);
  await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),middle);await settle();
  const opacity=await panel.evaluate(el=>Number(getComputedStyle(el).opacity));assert.ok(opacity>.2&&opacity<.8);
  await page.waitForTimeout(200);assert.equal(await panel.evaluate(el=>Number(getComputedStyle(el).opacity)),opacity);
  await page.evaluate(()=>scrollBy({top:-40,behavior:'instant'}));await settle();assert.ok(await panel.evaluate(el=>Number(getComputedStyle(el).opacity))<opacity);
 }
 assert.deepEqual(errors,[]);await writeFile('documentation/scroll-results-'+channel+'.json',JSON.stringify({browser:channel,responsiveScrollChecks:results,labRevealRoutes:5,reducedMotion:true,consoleErrors:errors},null,2));console.log('PASS: 77 forward/reverse scroll samples at 11 widths, five lab reveal routes and reduced motion.');
}finally{await browser.close();}
