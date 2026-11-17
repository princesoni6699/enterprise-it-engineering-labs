import {test} from 'node:test';
import assert from 'node:assert/strict';
import {refreshExampleIdentities} from '../shared/example-identities.js';
test('existing sessions receive updated example identities without losing progress or visitor notes',()=>{
 const previous={version:1,records:[{id:'u1',name:'Maya Chen',status:'Enabled',account:'maya.chen'}],resources:[{name:'Maya · Require MFA',state:'Maya Chen'}],audit:[{target:'Maya Chen',action:'Unlock'}],notes:'Maya called the service desk.',output:'{"account":"maya.chen"}'};
 const next=refreshExampleIdentities(previous);
 assert.equal(next.records[0].name,'Charlotte Bennett');assert.equal(next.records[0].account,'charlotte.bennett');assert.equal(next.records[0].status,'Enabled');assert.equal(next.audit[0].target,'Charlotte Bennett');assert.equal(next.notes,previous.notes);assert.equal(previous.records[0].name,'Maya Chen');
});
