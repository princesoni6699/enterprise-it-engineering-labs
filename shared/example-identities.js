const replacements=[['Maya Chen','Charlotte Bennett'],['Liam Patel','Oliver Hughes'],['Ava Reed','Emily Wilson'],['maya.chen','charlotte.bennett'],['liam.patel','oliver.hughes'],['ava.reed','emily.wilson']];
// Preserve visitor notes and workflow progress when upgrading existing lab sessions.
export function refreshExampleIdentities(saved){
 const state=structuredClone(saved);
 function rename(value){if(typeof value!=='string')return value;for(const [before,after] of replacements)value=value.replaceAll(before,after);return value.replace(/\bMaya\b/g,'Charlotte').replace(/\bLiam\b/g,'Oliver').replace(/\bAva\b/g,'Emily');}
 for(const collection of [state.records,state.resources,state.audit]){
  if(Array.isArray(collection))for(const item of collection)for(const key of ['name','owner','account','state','detail','action','target'])if(key in item)item[key]=rename(item[key]);
 }
 if(state.output)state.output=rename(state.output);
 return state;
}
