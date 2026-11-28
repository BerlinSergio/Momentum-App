import test from 'node:test';
import assert from 'node:assert/strict';
import {resolveReminderType,defaultReminderType,reminderPreferenceKey,selectRingingOccurrences} from '../../src/utils/reminderRules.js';
const now=new Date('2026-11-28T12:00:00Z');
const occurrence=(type,key,delivery,delta=60000)=>({title:key,body:key,extra:{type,key,reminderType:delivery,ringEligible:true},schedule:{at:new Date(now.getTime()+delta)}});
test('individual selections override category without changing other items',()=>{
 const s={ringingAlarmSources:{task:true}};
 assert.equal(resolveReminderType(s,'task','notification',{taskId:'one'}),'notification');
 assert.equal(resolveReminderType(s,'task',undefined,{taskId:'two'}),'alarm');
 assert.equal(resolveReminderType({},'task','alarm',{taskId:'one'}),'alarm');
 assert.equal(resolveReminderType({},'task',undefined,{taskId:'two'}),'notification');
});
test('prayer and daily nudge choices are independent and stable across dates',()=>{
 const s={reminderTypes:{'prayer:fajr':'alarm','prayer:isha':'notification','nudge:middayPause':'alarm'}};
 assert.equal(resolveReminderType(s,'prayer',null,{prayer:'fajr',dateKey:'2026-11-28'}),'alarm');
 assert.equal(resolveReminderType(s,'prayer',null,{prayer:'fajr',dateKey:'2026-11-29'}),'alarm');
 assert.equal(resolveReminderType(s,'prayer',null,{prayer:'isha'}),'notification');
 assert.equal(resolveReminderType(s,'nudge',null,{nudgeId:'middayPause'}),'alarm');
 assert.equal(resolveReminderType(s,'nudge',null,{nudgeId:'morningIntention'}),'notification');
 assert.notEqual(reminderPreferenceKey('routine',{routineId:'x'}),reminderPreferenceKey('task',{taskId:'x'}));
});
test('old silent and vibration preferences survive; explicit alarm is intentional',()=>{
 const s={ringingAlarmSources:{routine:true,prayer:true}};
 assert.equal(resolveReminderType(s,'routine',null,{routineId:'r'},false),'notification');
 assert.equal(resolveReminderType(s,'prayer',null,{prayer:'fajr'},false),'notification');
 assert.equal(resolveReminderType(s,'routine','alarm',{routineId:'r'},false),'alarm');
});
test('defaults apply to newly created items and do not turn on legacy alarms',()=>{
 const s={defaultReminderType:'alarm',reminderSourceDefaults:{task:'notification'}};
 assert.equal(defaultReminderType(s,'task'),'notification');
 assert.equal(defaultReminderType(s,'calendar'),'alarm');
 assert.equal(resolveReminderType(s,'calendar',null,{eventId:'old'}),'notification');
});
test('native alarm queue follows item type and does not also ring ordinary notification',()=>{
 const a=occurrence('task','a','alarm'),b=occurrence('task','b','notification'),c=occurrence('routine','c','alarm',120000);
 const keys=selectRingingOccurrences([a,b],[a,b,c],{task:true},'en',now).map(x=>x.title);
 assert.deepEqual(keys,['a']);
 assert.equal(selectRingingOccurrences([b],[b],{task:true},'en',now).length,0);
});
test('changing an alarm to notification removes its recent native occurrence',()=>{
 const a=occurrence('task','a','notification',-60000);
 assert.equal(selectRingingOccurrences([], [a],{task:true},'en',now).length,0);
});
