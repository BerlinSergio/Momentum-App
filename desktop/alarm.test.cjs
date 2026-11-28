const {test}=require('node:test');
const assert=require('node:assert/strict');
const {AlarmQueue}=require('./alarm.cjs');
test('rings once; stop removes; snooze rings after exactly five minutes',()=>{
 let now=1000;const events=[];const q=new AlarmQueue({now:()=>now,emit:x=>events.push(x)});
 assert.equal(q.add('a'),true);assert.equal(q.add('a'),false);assert.equal(q.current.key,'a');
 q.action('snooze');assert.equal(q.current,null);now+=299999;q.tick();assert.equal(q.current,null);now++;q.tick();assert.equal(q.current.key,'a');
 q.action('stop');assert.equal(q.entries.size,0);assert.deepEqual(events,[true,false,true,false]);
});
test('two-minute cutoff and overlapping alarms',()=>{
 let now=0;const q=new AlarmQueue({now:()=>now});
 q.add('a');q.add('b');assert.equal(q.current.key,'a');now=120000;q.tick();assert.equal(q.current.key,'b');now=240000;q.tick();assert.equal(q.current,null);
});
test('editing or deleting removes a snoozed alarm and cancels a ringing item',()=>{
 let now=0;const q=new AlarmQueue({now:()=>now});
 q.add('a');q.action('snooze');q.add('b');q.reconcile([]);assert.equal(q.current,null);now=300000;q.tick();assert.equal(q.current,null);assert.equal(q.entries.size,0);
});
