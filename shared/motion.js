// Delegated listeners also cover controls created by a lab rerender.
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
let frame=0,pending;
document.addEventListener('pointermove',event=>{
 if(reducedMotion.matches||event.pointerType==='touch')return;
 const control=event.target.closest('button:not(:disabled), .launch, nav a');
 if(!control)return;
 pending={control,x:event.clientX,y:event.clientY};
 if(frame)return;
 frame=requestAnimationFrame(()=>{frame=0;const {control,x,y}=pending;if(!control.isConnected)return;const box=control.getBoundingClientRect();control.style.setProperty('--pointer-x',`${x-box.left}px`);control.style.setProperty('--pointer-y',`${y-box.top}px`);});
},{passive:true});
document.addEventListener('click',event=>{
 if(reducedMotion.matches)return;
 const control=event.target.closest('button:not(:disabled), .launch');
 if(!control)return;
 const box=control.getBoundingClientRect(),ripple=document.createElement('span');
 ripple.className='liquid-ripple';ripple.setAttribute('aria-hidden','true');
 ripple.style.left=`${event.detail?event.clientX-box.left:box.width/2}px`;
 ripple.style.top=`${event.detail?event.clientY-box.top:box.height/2}px`;
 control.append(ripple);ripple.addEventListener('animationend',()=>ripple.remove(),{once:true});
 setTimeout(()=>ripple.remove(),800);
},{capture:true});
