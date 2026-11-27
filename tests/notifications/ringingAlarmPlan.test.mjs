import test from 'node:test';
import assert from 'node:assert/strict';
import {selectRingingOccurrences} from '../../src/utils/reminderRules.js';
const now=new Date('2026-11-27T12:00:00Z');
const item=(type,key,delta,ringEligible=true)=>({title:key,body:key,extra:{key,type,ringEligible},schedule:{at:new Date(now.getTime()+delta)}});
test('only explicit ringing categories are selected',()=>{
 const a=item('task','t',60000),b=item('routine','r',120000);
 assert.equal(selectRingingOccurrences([a,b],[a,b],{},'en',now).length,0);
 assert.deepEqual(selectRingingOccurrences([a,b],[a,b],{task:true},'ps-AF',now),[{key:'t@'+a.schedule.at.getTime(),at:a.schedule.at.getTime(),title:'t',language:'ps-AF'}]);
});
test('silent routines, vibration prayers, and items outside native queue never ring',()=>{
 const a=item('routine','r',60000,false),b=item('prayer','p',60000,false),c=item('task','t',120000);
 assert.equal(selectRingingOccurrences([a,b],[a,b,c],{routine:true,prayer:true,task:true},'en',now).length,0);
});
test('recent eligible occurrences are included for native snooze retention without duplicates',()=>{
 const a=item('task','old',-60000),b=item('task','future',60000);
 assert.equal(selectRingingOccurrences([b],[a,b,b],{task:true},'en',now).length,2);
});
