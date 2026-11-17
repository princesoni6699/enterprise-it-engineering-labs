import {test} from 'node:test';
import assert from 'node:assert/strict';
import {initial,act} from '../shared/engine.js';
import {resourceAction} from '../shared/resources.js';
test('access review removes privileged role and records evidence',()=>{const a=resourceAction(initial('05-entra-identity-lab'),'05-entra-identity-lab','review');assert.equal(a.records[1].role,'None');assert.equal(a.resources.find(r=>r.id==='review').state,'Denied');assert.throws(()=>resourceAction(a,'05-entra-identity-lab','review'));});
test('verified device permits compliant-device sign-in policy',()=>{const a=resourceAction(initial('05-entra-identity-lab'),'05-entra-identity-lab','ca2');assert.equal(act(a,'i3','Retry sign-in').records[2].status,'Allowed');});
test('group removal updates directory membership evidence',()=>{const a=resourceAction(initial('01-active-directory-lab'),'01-active-directory-lab','group1');assert.equal(a.records[0].groups,'None');assert.equal(a.audit.length,1);});
