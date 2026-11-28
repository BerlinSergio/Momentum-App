'use strict';
// All alarm lifetime decisions are owned by the desktop process, not the renderer.
class AlarmQueue {
  constructor({now=Date.now,emit=()=>{},timeout=120000,snooze=300000}={}){
    this.now=now;this.emit=emit;this.timeout=timeout;this.snooze=snooze;this.entries=new Map();this.current=null;
  }
  add(key){if(typeof key!=='string'||!key||key.length>250||this.entries.has(key)||this.entries.size>=1000)return false;
    this.entries.set(key,{key,at:this.now(),state:'pending'});this.tick();return true;}
  tick(){
    const now=this.now();
    if(this.current&&now>=this.current.at+this.timeout)this.action('stop',false);
    if(!this.current){
      const next=[...this.entries.values()].filter(e=>e.state==='pending'&&e.at<=now).sort((a,b)=>a.at-b.at)[0];
      if(next){next.state='ringing';next.at=now;this.current=next;this.emit(true);}
    }
  }
  action(action,tick=true){
    if(!this.current||!['stop','snooze'].includes(action))return false;
    const e=this.current;this.current=null;this.emit(false);
    if(action==='snooze'){e.state='pending';e.at=this.now()+this.snooze;}else this.entries.delete(e.key);
    if(tick)this.tick();return true;
  }
  reconcile(keys){const wanted=new Set(keys);for(const [key] of this.entries)if(!wanted.has(key)){if(this.current?.key===key){this.current=null;this.emit(false);}this.entries.delete(key);}this.tick();}
  clear(){this.entries.clear();if(this.current){this.current=null;this.emit(false);}}
}
module.exports={AlarmQueue};
