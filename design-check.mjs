import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
const require=createRequire(process.env.LABS_NODE_MODULES?process.env.LABS_NODE_MODULES+'/package.json':import.meta.url);
const {chromium}=require('playwright');
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage();
 for(const width of [1024,1280,1440,1920]){await page.setViewportSize({width,height:1000});await page.goto('http://127.0.0.1:4173/');const copy=await page.locator('.hero-copy').boundingBox(),tools=await page.locator('.tech-cloud').boundingBox();assert.ok(tools.x>=copy.x+copy.width-1,'Desktop skills must remain beside the heading');assert.equal(await page.locator('.hero-shield').count(),1);}
 for(let index=0;index<5;index++){await page.goto('http://127.0.0.1:4173/');await page.locator('.tech-node').nth(index).click();await page.waitForURL(url=>url.pathname.includes(['01-active-directory-lab','02-powershell-automation','03-intune-endpoint-lab','04-splunk-security-lab','05-entra-identity-lab'][index]));}
 for(const width of [320,390,1440]){
  await page.setViewportSize({width,height:1000});
  for(const route of ['','05-entra-identity-lab/']){
   await page.goto((process.env.LABS_PREVIEW_URL||'http://127.0.0.1:4173/')+route);
   await page.evaluate(()=>document.fonts.ready);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
   assert.equal(await page.evaluate(()=>getComputedStyle(document.body).fontFamily.includes('Manrope')),true);
   if(width<800)assert.equal(await page.locator('.sidebar-foot').evaluate(el=>getComputedStyle(el).fontSize),'0px');
  }
 }
 await page.setViewportSize({width:390,height:1000});await page.goto('http://127.0.0.1:4173/');
 await page.getByRole('button',{name:'Switch theme'}).click();await page.evaluate(()=>document.fonts.ready);
 await page.screenshot({path:'assets/screenshots/mobile-light.png',fullPage:true,animations:'disabled'});
 console.log('PASS: production preview typography and six targeted responsive checks.');
}finally{await browser.close();}
