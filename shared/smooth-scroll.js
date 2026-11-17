import './vendor/lenis.min.js';
const desktop=globalThis.matchMedia?.('(min-width:1001px) and (pointer:fine)'),reduced=globalThis.matchMedia?.('(prefers-reduced-motion: reduce)');
let instance=null,frame=0;
const subscribers=new Set();
function tick(time){if(!instance)return;instance.raf(time);frame=requestAnimationFrame(tick);}
function configure(){
 const enabled=desktop?.matches&&!reduced?.matches;
 if(enabled&&!instance){
  instance=new globalThis.Lenis({lerp:.085,smoothWheel:true,syncTouch:false,autoRaf:false,anchors:true,prevent:node=>Boolean(node.closest?.('textarea,input,select,dialog,.table-wrap,[data-lenis-prevent]'))});
  instance.on('scroll',()=>{for(const update of subscribers)update();});frame=requestAnimationFrame(tick);
 }else if(!enabled&&instance){cancelAnimationFrame(frame);instance.destroy();instance=null;}
}
desktop?.addEventListener('change',configure);reduced?.addEventListener('change',configure);configure();
export function onSmoothScroll(update){subscribers.add(update);return ()=>subscribers.delete(update);}
