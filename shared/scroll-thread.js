import {onSmoothScroll} from './smooth-scroll.js';
const clamp=value=>Math.min(1,Math.max(0,value));
export function threadProgress(scroll,start,end){return clamp((scroll-start)/Math.max(1,end-start));}
export function contentProgress(top,scroll,viewport,height){const p=clamp((scroll+viewport*.94-top)/Math.min(viewport*.35,Math.max(100,height*.45)));return p*p*(3-2*p);}
export function lengthAtY(samples,y){
 if(y<=samples[0].y)return 0;if(y>=samples.at(-1).y)return samples.at(-1).length;
 let lo=0,hi=samples.length-1;while(hi-lo>1){const mid=(lo+hi)>>1;if(samples[mid].y<y)lo=mid;else hi=mid;}
 const a=samples[lo],b=samples[hi];return a.length+(b.length-a.length)*(y-a.y)/Math.max(.0001,b.y-a.y);
}

// Four connected cubic curves form each loop; every join has a vertical tangent.
export function createThreadPath(x,amplitude,boundaries){
 let path=`M ${x} 0`;
 for(let i=1;i<boundaries.length;i++){
  const top=boundaries[i-1],span=boundaries[i]-top,y=f=>top+span*f;
  path+=` C ${x} ${y(.25)}, ${x-amplitude} ${y(.25)}, ${x-amplitude} ${y(.5)}`;
  path+=` C ${x-amplitude} ${y(.75)}, ${x+amplitude} ${y(.75)}, ${x+amplitude} ${y(.5)}`;
  path+=` C ${x+amplitude} ${y(.25)}, ${x} ${y(.25)}, ${x} ${y(.75)}`;
  path+=` C ${x} ${y(.9)}, ${x} ${y(.9)}, ${x} ${y(1)}`;
 }
 return path;
}

let dispose=()=>{};
export function mountScrollExperience(){
 dispose();
 const media=matchMedia('(prefers-reduced-motion: reduce)'),journey=document.querySelector('.cards');
 let frame=0,resizeFrame=0,resizeObserver,svg,paths=[],head,total=0,lastDistance=-1,journeyTop=0,samples=[],cards=[],panels=[],revealGeometry=[];
 const cleanups=[];
 function layoutTop(element){let top=0;for(let node=element;node;node=node.offsetParent)top+=node.offsetTop;return top;}
 function measureReveals(){
  panels=[...document.querySelectorAll('main > .panel, main > .guide, main > .metrics, main > .terminal')];
  panels.forEach(panel=>panel.classList.add('scroll-reveal'));
  revealGeometry=[...panels,...cards].map(element=>({element,top:layoutTop(element),height:element.offsetHeight}));
 }
 function update(){
  frame=0;
  for(const item of revealGeometry){
   const {element,top,height}=item;
   const p=media.matches?1:contentProgress(top,scrollY,innerHeight,height);
   if(p===item.last)continue;item.last=p;
   element.style.setProperty('--reveal',p.toFixed(5));element.style.setProperty('--reveal-y',((1-p)*16).toFixed(3)+'px');
   element.classList.toggle(element.classList.contains('project-scene')?'is-revealed':'is-visible',p>.001);
  }
  if(!svg||!total)return;
  const anchor=innerHeight*.60,targetY=scrollY+anchor-journeyTop;
  const distance=media.matches?total:lengthAtY(samples,targetY),progress=distance/total;
  if(distance===lastDistance)return;lastDistance=distance;
  for(const path of paths)path.style.strokeDashoffset=String(total-distance);
  const point=paths[0].getPointAtLength(distance);head.setAttribute('transform',`translate(${point.x} ${point.y})`);
  head.style.opacity=progress>0&&!media.matches?'1':'0';
  journey.dataset.threadProgress=progress.toFixed(4);
  journey.dataset.threadAnchor=anchor.toFixed(2);journey.dataset.threadHeadY=point.y.toFixed(2);
  journey.dataset.threadScrollY=Math.max(0,Math.min(samples.at(-1).y,targetY)).toFixed(2);
 }
 function onScroll(){if(!frame)frame=requestAnimationFrame(update);}
 function measure(){
  resizeFrame=0;measureReveals();if(!journey?.isConnected){update();return;}
  const height=journey.offsetHeight,padding=parseFloat(getComputedStyle(journey).paddingLeft),lane=padding<=56?32:padding-24,x=lane/2,amplitude=lane<=40?10:lane*.34;
  journeyTop=scrollY+journey.getBoundingClientRect().top;
  const maxScroll=Math.max(0,document.documentElement.scrollHeight-innerHeight);
  const endY=Math.min(height,Math.max(1,maxScroll+innerHeight*.60-journeyTop));
  const boundaries=[0,...cards.slice(0,-1).map(card=>card.offsetTop+card.offsetHeight+48).filter(y=>y<endY-60),endY];
  const d=createThreadPath(x,amplitude,boundaries);
  svg.setAttribute('viewBox',`0 0 ${lane} ${height}`);svg.style.width=lane+'px';svg.style.height=height+'px';
  svg.querySelectorAll('path').forEach(path=>path.setAttribute('d',d));
  total=paths[0].getTotalLength();lastDistance=-1;for(const path of paths){path.style.strokeDasharray=String(total);path.style.strokeDashoffset=String(total);}
  // Map each original loop to its own measured section, rather than stretching
  // a document-wide percentage across the whole strand. This preserves the
  // loop's natural backwards curl without introducing lookup jumps.
  const probe=svg.querySelector('.thread-probe');samples=[{y:0,length:0}];
  for(let i=1;i<boundaries.length;i++){probe.setAttribute('d',createThreadPath(x,amplitude,boundaries.slice(0,i+1)));samples.push({y:boundaries[i],length:probe.getTotalLength()});}
  journey.classList.add('thread-ready');update();
 }
 if(journey){
  journey.classList.add('project-journey');journey.id='lab-collection';journey.setAttribute('aria-label','Explore the five engineering labs');
  cards=[...journey.querySelectorAll('.card')];cards.forEach((card,i)=>{card.classList.add('project-scene');card.dataset.labNumber=String(i+1).padStart(2,'0');});
  svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.classList.add('scroll-thread');svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');
  svg.innerHTML=`<defs><filter id="thread-glow" x="-100%" y="-15%" width="300%" height="130%"><feGaussianBlur stdDeviation="5"/></filter><linearGradient id="thread-metal" x1="0" y1="0" x2="1" y2="0"><stop stop-color="var(--accent)"/><stop offset=".5" stop-color="#e1fff3"/><stop offset="1" stop-color="var(--accent)"/></linearGradient></defs><path class="thread-track"/><path class="thread-depth"/><path class="thread-light thread-bloom"/><path class="thread-light thread-halo"/><path class="thread-light thread-core"/><path class="thread-light thread-highlight"/><path class="thread-probe" visibility="hidden"/><g class="thread-head"><circle r="13" class="thread-head-aura" filter="url(#thread-glow)"/><circle r="4.5" class="thread-head-ring"/><circle r="2" class="thread-head-core"/></g>`;
  journey.prepend(svg);paths=[...svg.querySelectorAll('.thread-light')];head=svg.querySelector('.thread-head');
  const link=document.createElement('a');link.href='#lab-collection';link.className='explore-link';link.innerHTML='Explore the collection <span aria-hidden="true">↓</span>';document.querySelector('.hero-copy')?.append(link);
 }
 const onResize=()=>{if(!resizeFrame)resizeFrame=requestAnimationFrame(measure);};
 resizeObserver=new ResizeObserver(onResize);resizeObserver.observe(document.querySelector('main'));
 addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onResize,{passive:true});
 const unsubscribe=onSmoothScroll(()=>{cancelAnimationFrame(frame);update();});cleanups.push(unsubscribe);
 const main=document.querySelector('main');document.fonts.ready.then(()=>{if(main.isConnected)measure();});measure();
 cleanups.push(()=>{removeEventListener('scroll',onScroll);removeEventListener('resize',onResize);resizeObserver.disconnect();});
 const onPreference=()=>update();media.addEventListener('change',onPreference);
 dispose=()=>{cancelAnimationFrame(frame);cancelAnimationFrame(resizeFrame);for(const cleanup of cleanups)cleanup();media.removeEventListener('change',onPreference);};
}

