const glyphs=[
 '<path d="M12 5v6m-6 0h12M6 11v5m12-5v5"/><rect x="8" y="1" width="8" height="5" rx="1"/><rect x="2" y="16" width="8" height="6" rx="1"/><rect x="14" y="16" width="8" height="6" rx="1"/>',
 '<rect x="2" y="3" width="20" height="18" rx="3"/><path d="m7 8 4 4-4 4m7 0h4"/>',
 '<rect x="2" y="3" width="15" height="12" rx="2"/><path d="M1 19h12m-5-4v4m10-10 5 2v5c0 3-5 5-5 5s-5-2-5-5v-5z"/>',
 '<circle cx="10" cy="10" r="7"/><path d="m15 15 7 7M6 11l3-4 3 6 3-4"/>',
 '<path d="m12 1 10 6v10l-10 6-10-6V7z"/><circle cx="12" cy="10" r="3"/><path d="M12 13v5m0-2h3"/>'
];
export function mountHeroToolkit(labs,base){
 const hero=document.querySelector('.hero');if(!hero||hero.querySelector('.tech-cloud'))return;
 hero.querySelector('.hero-art')?.remove();
 const copy=document.createElement('div');copy.className='hero-copy';while(hero.firstChild)copy.append(hero.firstChild);hero.append(copy);hero.classList.add('hero-with-toolkit');
 const details=['Users · Groups · Group Policy','Scripts · CSV · Reporting','Devices · Compliance · Updates','Authentication · Logs · SIEM','MFA · Roles · Access reviews'];
 const names=['Active Directory','PowerShell','Microsoft Intune','Splunk workflows','Microsoft Entra ID'];
 const figure=document.createElement('section');figure.className='tech-cloud';figure.setAttribute('aria-label','Technologies and skills demonstrated');
 figure.innerHTML=`<div class="toolkit-heading"><span class="eyebrow">INSIDE THE FIVE LABS</span><span class="toolkit-status"><i></i> HANDS-ON SKILLS</span></div><div class="toolkit-nodes">${labs.map((lab,i)=>`<a class="tech-node tool-${i}" href="${new URL(lab.id+'/',base).href}" aria-label="Explore ${names[i]} lab"><span class="tool-icon"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">${glyphs[i]}</svg></span><span class="tool-copy"><strong>${names[i]}</strong><small>${details[i]}</small></span><span class="tool-number">0${i+1}</span></a>`).join('')}</div><div class="toolkit-foundation"><span>Windows</span><span>PowerShell</span><span>SPL</span><span>Microsoft Graph</span></div><p class="toolkit-caption">Explore the tools. Investigate the evidence.<br>Practise the workflow.</p>`;
 hero.append(figure);
 const nodes=figure.querySelector('.toolkit-nodes');nodes.classList.add('shield-constellation');
 const shield=document.createElement('div');shield.className='hero-shield';shield.setAttribute('aria-hidden','true');shield.innerHTML='<svg viewBox="0 0 120 140" fill="none"><defs><linearGradient id="shield-surface" x1="15" y1="15" x2="105" y2="125" gradientUnits="userSpaceOnUse"><stop stop-color="var(--accent)" stop-opacity=".28"/><stop offset="1" stop-color="var(--accent)" stop-opacity=".04"/></linearGradient></defs><path d="M60 7 108 26v39c0 34-48 65-48 65S12 99 12 65V26z" fill="url(#shield-surface)" stroke="var(--accent)" stroke-width="1.5"/><path d="m60 19 36 15v31c0 23-36 51-36 51S24 88 24 65V34z" stroke="var(--accent)" stroke-opacity=".3"/><path d="m43 67 12 12 25-29" stroke="var(--accent)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg><span>ENGINEERING<br>WITH SECURITY</span>';
 nodes.append(shield);
 for(const node of figure.querySelectorAll('.tech-node')){const surface=document.createElement('span');surface.className='tool-surface';while(node.firstChild)surface.append(node.firstChild);node.append(surface);}
}
