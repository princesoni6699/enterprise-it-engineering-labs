export const resources={
'01-active-directory-lab':[
{id:'computer1',type:'Computer',name:'BRI-WS-014',state:'Enabled',detail:'Windows 11 · Finance OU · assigned to Charlotte Bennett',action:'Disable computer',next:'Disabled'},
{id:'computer2',type:'Computer',name:'BRI-WS-021',state:'Enabled',detail:'Windows 11 · Operations OU · assigned to Oliver Hughes',action:'Disable computer',next:'Disabled'},
{id:'group1',type:'Security group',name:'Finance-Readers',state:'Charlotte Bennett',detail:'Read access to synthetic finance share. Membership changes affect this local group record.',action:'Remove Charlotte membership',next:'No members'},
{id:'group2',type:'Security group',name:'Service-Desk',state:'Emily Wilson',detail:'Delegated support access; review during offboarding.',action:'Remove Emily membership',next:'No members'},
{id:'ou1',type:'Organisational unit',name:'Finance',state:'Protected',detail:'Contains Charlotte and BRI-WS-014. Baseline policy linked. Accidental deletion protection illustrated.'},
{id:'ou2',type:'Organisational unit',name:'Operations',state:'Protected',detail:'Contains Oliver and BRI-WS-021. Baseline policy linked.'},
{id:'gpo1',type:'Group Policy',name:'Workstation baseline',state:'Linked',detail:'Password history: 24 · lockout threshold: 5 · firewall: enabled. Overview only; no real GPO processing.'}
],
'03-intune-endpoint-lab':[
{id:'compliance',type:'Compliance policy',name:'Windows baseline',state:'Assigned',detail:'Requires encryption enabled and current updates. Remediate updates both findings on the selected device.'},
{id:'profile',type:'Configuration profile',name:'Endpoint firewall',state:'Draft',detail:'Windows Defender Firewall enabled for domain, private and public profiles. Assignment is simulated.',action:'Assign profile',next:'Assigned'},
{id:'app',type:'Application',name:'Service Desk Companion',state:'Available',detail:'Fictional Win32 application. Select a device and use Deploy application to update its installation evidence.'},
{id:'ring',type:'Update ring',name:'Pilot Windows ring',state:'Paused',detail:'Quality update deferral 2 days · feature deferral 30 days · deadline 7 days.',action:'Resume update ring',next:'Active'},
{id:'health',type:'Health finding',name:'BRI-LT-014 · Spooler',state:'Stopped',detail:'Synthetic Windows service finding. Restarting the service demonstrates targeted remediation.',action:'Start service',next:'Running'}
],
'05-entra-identity-lab':[
{id:'ca1',type:'Conditional Access',name:'Require MFA',state:'Enabled',detail:'All sample users must register MFA. Retry sign-in evaluates the selected identity’s simulated requirement.'},
{id:'ca2',type:'Conditional Access',name:'Require compliant device',state:'Enabled',detail:'Emily is blocked because her device claim is noncompliant. Confirm remediation before accepting this device.',action:'Validate remediated device',next:'Device verified'},
{id:'review',type:'Access review',name:'Oliver · User Administrator',state:'Pending review',detail:'Temporary support task has ended. Deny continued privileged access, then confirm the identity role is removed.',action:'Deny privileged access',next:'Denied'},
{id:'risk',type:'Risky sign-in',name:'Charlotte · 203.0.113.19',state:'High risk',detail:'Synthetic unfamiliar-location sign-in at 2026-11-16T02:14:00Z. Investigate MFA and sign-in evidence before marking reviewed.',action:'Mark investigated',next:'Reviewed'},
{id:'iamgroup',type:'Security group',name:'Finance cloud readers',state:'Charlotte Bennett',detail:'Grants read-only access to a fictional finance application. Remove membership during offboarding.',action:'Remove cloud membership',next:'No members'},
{id:'signin1',type:'Sign-in log',name:'Charlotte · Require MFA',state:'Blocked',detail:'2026-11-16T01:04:00Z · 192.0.2.41 · MFA not registered'},
{id:'signin2',type:'Sign-in log',name:'Emily · Device policy',state:'Blocked',detail:'2026-11-16T01:08:00Z · 198.51.100.8 · compliant device claim missing'}
],
'02-powershell-automation':[
{id:'bulk',type:'CSV workflow',name:'Bulk user creation',state:'Safe simulation',detail:'Use the name,department CSV form below. Up to 100 validated rows are returned as a simulated creation report. No AD writes occur.'},
{id:'scheduling',type:'Reporting workflow',name:'Automated report preparation',state:'Browser only',detail:'Choose a report to generate deterministic structured output and an execution-history record. Real scheduled execution requires Task Scheduler on an authorised Windows machine.'}
],
'04-splunk-security-lab':[
{id:'lockout',type:'Investigation',name:'Repeated account lockout',state:'Open',detail:'Charlotte: ten 4625 failures then a 4740 from 192.0.2.41. Check stale credentials in services, mapped drives and scheduled tasks; collect evidence before unlocking.'},
{id:'brute',type:'Investigation',name:'Possible password guessing',state:'Open',detail:'Oliver: interleaved success and failure events from 198.51.100.8. This pattern warrants investigation; logs alone do not prove compromise.'},
{id:'spl',type:'SPL example',name:'Count failures by source',state:'Reference only',detail:'index=windows EventCode=4625 | stats count by source — real Splunk example; stats is outside the supported browser query subset.'}
]};
export function resourceAction(state,labId,id){const next=structuredClone(state);next.resources??=structuredClone(resources[labId]);const r=next.resources.find(r=>r.id===id);if(!r?.action)throw Error('No action available');if(r.state===r.next)throw Error('This action has already been applied');r.state=r.next;next.audit.unshift({time:new Date().toISOString(),target:r.name,action:r.action,result:'Simulation completed'});
if(id==='review'){next.records.find(r=>r.id==='i2').role='None';}
if(id==='ca2'){const user=next.records.find(r=>r.id==='i3');user.deviceCompliant=true;}
if(id==='group1')next.records.find(r=>r.id==='u1').groups='None';
if(id==='group2')next.records.find(r=>r.id==='u3').groups='None';
return next;}
