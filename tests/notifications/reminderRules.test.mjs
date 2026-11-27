import test from 'node:test';
import assert from 'node:assert/strict';
import {parseReminderClock,civilReminderDate,parseReminderOffset,calculateTaskTriggerDate,calculateRoutineTriggerDate,occurrenceKey,isCivilQuiet,matchesReminderSource} from '../../src/utils/reminderRules.js';
const task={dueDate:'2026-11-27',startTime:'10:00 AM'};
const hm=d=>[d.getHours(),d.getMinutes()];
test('task offsets include five minutes and exact event time',()=>{
 for(const [reminder,expected] of [['5 minutes before',[9,55]],['15 minutes before',[9,45]],['30 minutes before',[9,30]],['1 hour before',[9,0]],['At time of event',[10,0]],['10m before',[9,50]]])assert.deepEqual(hm(calculateTaskTriggerDate({...task,reminder})),expected);
});
test('task reminder disabled, invalid and legacy clock values',()=>{
 for(const reminder of ['None','Off','Disabled','invalid'])assert.equal(calculateTaskTriggerDate({...task,reminder}),null);
 assert.equal(calculateTaskTriggerDate({...task,reminderEnabled:false}),null);
 assert.deepEqual(hm(calculateTaskTriggerDate({...task,reminder:'6:50 AM'})),[6,50]);
 assert.equal(calculateTaskTriggerDate({...task,dueDate:'2026-02-30'}),null);
 assert.equal(calculateTaskTriggerDate({...task,startTime:'25:00'}),null);
});
test('midnight offset belongs to the previous civil date',()=>{
 const at=calculateTaskTriggerDate({...task,startTime:'12:05 AM',reminder:'15 minutes before'});
 assert.equal(at.getDate(),26);assert.deepEqual(hm(at),[23,50]);
 const routine=calculateRoutineTriggerDate({targetTime:'12:05 AM',reminderEnabled:true,reminderOffset:15},new Date(2026,10,27,12));
 assert.equal(routine.getDate(),26);assert.deepEqual(hm(routine),[23,50]);
});
test('time parsing rejects malformed values',()=>{
 assert.deepEqual(parseReminderClock('12:00 AM'),[0,0]);assert.deepEqual(parseReminderClock('12:00 PM'),[12,0]);
 for(const value of ['00:00 AM','13:00 PM','09:60','bad 09:00','10:5'])assert.equal(parseReminderClock(value),null);
 assert.equal(parseReminderOffset('1 day before'),1440);assert.equal(parseReminderOffset('bad'),null);
 assert.equal(parseReminderOffset('At start',-1),null);assert.equal(civilReminderDate('2026-02-29','09:00'),null);
});
test('occurrence identity changes with scheduled time',()=>{
 const first=new Date(2026,10,27,10),second=new Date(2026,10,27,11);
 assert.notEqual(occurrenceKey('task-1',first),occurrenceKey('task-1',second));
});
test('quiet hours are consistent at the overnight boundaries',()=>{
 for(const [hour,minute,expected] of [[22,29,false],[22,30,true],[4,29,true],[4,30,false],[12,0,false]])assert.equal(isCivilQuiet({zenFocusDND:true},new Date(2026,10,27,hour,minute)),expected);
 assert.equal(isCivilQuiet({zenFocusDND:false},new Date(2026,10,27,23)),false);
});
test('source matching distinguishes repeated routines and other sources',()=>{
 const item={extra:{type:'routine',params:{routineId:'r1',dateKey:'2026-11-27'}}};
 assert.equal(matchesReminderSource(item,'routine','r1'),true);
 assert.equal(matchesReminderSource(item,'routine','r2'),false);
 assert.equal(matchesReminderSource(item,'task','r1'),false);
});
