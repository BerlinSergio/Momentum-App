package com.momentum.app;

import android.app.AlarmManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ServiceInfo;
import android.media.AudioAttributes;
import android.media.MediaPlayer;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.os.Handler;
import android.os.IBinder;
import android.os.Looper;
import android.os.PowerManager;
import android.util.AtomicFile;
import androidx.core.app.NotificationCompat;
import androidx.core.content.ContextCompat;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Iterator;
import org.json.JSONArray;
import org.json.JSONObject;

/** Derived, private Android alarm queue. Source records remain owned by the web stores. */
public final class MomentumAlarmEngine {
    private static final String FIRE="com.momentum.app.alarm.FIRE", STOP="com.momentum.app.alarm.STOP", SNOOZE="com.momentum.app.alarm.SNOOZE";
    private static final String CHANNEL="momentum_ringing_v1";
    private static final int NOTIFICATION_ID=17124001;
    private static final long MAX_RING=120000L, SNOOZE_MS=300000L, MAX_AGE=86400000L;
    private MomentumAlarmEngine() {}
    private static AtomicFile file(Context c) { return new AtomicFile(new File(c.getNoBackupFilesDir(),"momentum-alarm-queue.json")); }
    private static JSONObject read(Context c) throws Exception {
        AtomicFile f=file(c);
        if(!f.getBaseFile().exists())return new JSONObject();
        return new JSONObject(new String(f.readFully(),StandardCharsets.UTF_8));
    }
    private static void write(Context c,JSONObject entries) throws Exception {
        AtomicFile f=file(c); FileOutputStream out=null;
        try { out=f.startWrite();out.write(entries.toString().getBytes(StandardCharsets.UTF_8));f.finishWrite(out); }
        catch(Exception e){if(out!=null)f.failWrite(out);throw e;}
    }
    private static AlarmManager manager(Context c){return (AlarmManager)c.getSystemService(Context.ALARM_SERVICE);}
    public static boolean canSchedule(Context c){return Build.VERSION.SDK_INT<31||manager(c).canScheduleExactAlarms();}
    private static boolean canRing(Context c){
        if(!canSchedule(c))return false;
        NotificationManager nm=(NotificationManager)c.getSystemService(Context.NOTIFICATION_SERVICE);
        if(!nm.areNotificationsEnabled())return false;
        channel(c);
        return Build.VERSION.SDK_INT<26||nm.getNotificationChannel(CHANNEL).getImportance()!=NotificationManager.IMPORTANCE_NONE;
    }
    private static PendingIntent operation(Context c,String action,String key,long at) {
        Intent i=new Intent(c,Receiver.class).setAction(action).setData(new Uri.Builder().scheme("momentum-alarm").authority("entry").appendPath(key).build()).putExtra("key",key).putExtra("at",at);
        return PendingIntent.getBroadcast(c,0,i,PendingIntent.FLAG_UPDATE_CURRENT|PendingIntent.FLAG_IMMUTABLE);
    }
    private static PendingIntent launch(Context c){
        Intent i=new Intent(c,MainActivity.class).addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP|Intent.FLAG_ACTIVITY_SINGLE_TOP);
        return PendingIntent.getActivity(c,17124,i,PendingIntent.FLAG_UPDATE_CURRENT|PendingIntent.FLAG_IMMUTABLE);
    }
    private static void cancel(Context c,String key){manager(c).cancel(operation(c,FIRE,key,0));}
    private static void arm(Context c,String key,long at){manager(c).setAlarmClock(new AlarmManager.AlarmClockInfo(at,launch(c)),operation(c,FIRE,key,at));}
    private static ArrayList<String> keys(JSONObject o){ArrayList<String> result=new ArrayList<>();Iterator<String> i=o.keys();while(i.hasNext())result.add(i.next());return result;}
    private static boolean pending(JSONObject e){return "scheduled".equals(e.optString("status"))||"snoozed".equals(e.optString("status"));}
    /** Called on main thread. Returns only accepted occurrence keys; failed arms fall back to local notifications. */
    public static synchronized JSONArray sync(Context c,JSONArray plan) throws Exception {
        long now=System.currentTimeMillis();JSONObject old=read(c),next=new JSONObject();JSONArray covered=new JSONArray();
        boolean allowed=canRing(c);
        if(plan.length()>1000)throw new IllegalArgumentException("Alarm plan too large");
        if(allowed)for(int i=0;i<plan.length();i++){
            JSONObject requested=plan.getJSONObject(i);String key=requested.getString("key");long original=requested.getLong("at");
            if(key.isEmpty()||key.length()>500||original<now-MAX_AGE||original>now+366L*MAX_AGE||next.has(key))continue;
            JSONObject previous=old.optJSONObject(key), entry;
            if(previous!=null&&previous.optLong("original")==original)entry=previous;
            else{
                if(original<=now)continue;
                entry=new JSONObject().put("original",original).put("fireAt",original).put("status","scheduled");
            }
            String title=requested.optString("title","Momentum");
            entry.put("title",title.substring(0,Math.min(160,title.length())));
            entry.put("language",requested.optString("language","en"));
            if("ringing".equals(entry.optString("status"))&&now-entry.optLong("started")>=MAX_RING)entry.put("status","done");
            if(pending(entry)&&entry.optLong("fireAt")<=now-60000)entry.put("status","done");
            next.put(key,entry);
        }
        // Commit desired state before accepting any new broadcasts. Removed keys cannot ring.
        write(c,next);
        for(String key:keys(old))if(!next.has(key))cancel(c,key);
        for(String key:keys(next)){
            JSONObject e=next.getJSONObject(key);
            if(pending(e)){
                try{if(e.getLong("fireAt")>now)arm(c,key,e.getLong("fireAt"));covered.put(key);}
                catch(RuntimeException error){cancel(c,key);next.remove(key);}
            }else covered.put(key);
        }
        write(c,next);
        RingingService.changed();
        return covered;
    }
    private static synchronized void restore(Context c)throws Exception{
        JSONObject entries=read(c);long now=System.currentTimeMillis();
        for(String key:keys(entries)){
            JSONObject e=entries.getJSONObject(key);
            if(pending(e)&&e.optLong("fireAt")>now&&canRing(c))arm(c,key,e.getLong("fireAt"));
            else if(pending(e)||"ringing".equals(e.optString("status")))e.put("status","done");
        }
        write(c,entries);
    }
    private static synchronized boolean fire(Context c,String key,long at)throws Exception{
        JSONObject entries=read(c),e=entries.optJSONObject(key);
        if(e==null||!pending(e)||e.optLong("fireAt")!=at||System.currentTimeMillis()<at-1000)return false;
        if(!canRing(c)||System.currentTimeMillis()>at+MAX_RING){e.put("status","done");write(c,entries);return false;}
        e.put("status","ringing").put("started",System.currentTimeMillis());write(c,entries);return true;
    }
    private static synchronized void resolve(Context c,String key,boolean snooze)throws Exception{
        JSONObject entries=read(c),e=entries.optJSONObject(key);
        if(e==null||!"ringing".equals(e.optString("status")))return;
        long at=System.currentTimeMillis()+SNOOZE_MS;
        boolean defer=snooze&&canRing(c)&&at-e.optLong("original")<MAX_AGE;
        e.put("status",defer?"snoozed":"done");
        if(defer)e.put("fireAt",at);
        write(c,entries);
        if(defer){try{arm(c,key,at);}catch(RuntimeException error){e.put("status","done");write(c,entries);}}
        RingingService.changed();
    }
    public static final class Receiver extends BroadcastReceiver {
        @Override public void onReceive(Context c,Intent i){
            String action=i.getAction(),key=i.getStringExtra("key");
            try{
                if(FIRE.equals(action)&&key!=null){
                    if(fire(c,key,i.getLongExtra("at",0))){
                        try{ContextCompat.startForegroundService(c,new Intent(c,RingingService.class));}
                        catch(RuntimeException error){resolve(c,key,false);fallback(c);}
                    }
                }else if((STOP.equals(action)||SNOOZE.equals(action))&&key!=null)resolve(c,key,SNOOZE.equals(action));
                else if(Intent.ACTION_BOOT_COMPLETED.equals(action)||Intent.ACTION_MY_PACKAGE_REPLACED.equals(action)||"android.app.action.SCHEDULE_EXACT_ALARM_PERMISSION_STATE_CHANGED".equals(action))restore(c);
            }catch(Exception ignored){/* Do not log reminder content. */}
        }
    }
    private static void channel(Context c){
        if(Build.VERSION.SDK_INT>=26){
            NotificationChannel n=new NotificationChannel(CHANNEL,"Momentum ringing alarms",NotificationManager.IMPORTANCE_HIGH);
            n.setSound(null,null);n.enableVibration(false);n.setLockscreenVisibility(Notification.VISIBILITY_PRIVATE);
            ((NotificationManager)c.getSystemService(Context.NOTIFICATION_SERVICE)).createNotificationChannel(n);
        }
    }
    private static NotificationCompat.Builder builder(Context c){
        channel(c);
        return new NotificationCompat.Builder(c,CHANNEL).setSmallIcon(R.drawable.ic_stat_momentum).setCategory(NotificationCompat.CATEGORY_ALARM).setVisibility(NotificationCompat.VISIBILITY_PRIVATE).setContentIntent(launch(c)).setOnlyAlertOnce(true);
    }
    private static void fallback(Context c){
        try{((NotificationManager)c.getSystemService(Context.NOTIFICATION_SERVICE)).notify(NOTIFICATION_ID+1,builder(c).setContentTitle("Momentum").setContentText("An alarm could not ring. Open Momentum to check reminders.").setAutoCancel(true).build());}catch(RuntimeException ignored){}
    }
    public static final class RingingService extends Service {
        static RingingService instance;
        private final Handler handler=new Handler(Looper.getMainLooper());
        private MediaPlayer player;
        private boolean foreground;
                private final Runnable refresh=this::render;
        static void changed(){if(instance!=null)instance.handler.post(instance.refresh);}
        @Override public void onCreate(){super.onCreate();instance=this;}
        @Override public IBinder onBind(Intent i){return null;}
        @Override public int onStartCommand(Intent i,int flags,int startId){render();return START_NOT_STICKY;}
        private void start(Notification n){
            if(Build.VERSION.SDK_INT>=29)startForeground(NOTIFICATION_ID,n,ServiceInfo.FOREGROUND_SERVICE_TYPE_MEDIA_PLAYBACK);
            else startForeground(NOTIFICATION_ID,n);
            foreground=true;
        }
        private void sound(){
            if(player!=null)return;
            try{
                Uri uri=RingtoneManager.getActualDefaultRingtoneUri(this,RingtoneManager.TYPE_ALARM);
                if(uri==null)uri=RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
                MediaPlayer p=new MediaPlayer();player=p;
                p.setAudioAttributes(new AudioAttributes.Builder().setUsage(AudioAttributes.USAGE_ALARM).setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION).build());
                p.setWakeMode(this,PowerManager.PARTIAL_WAKE_LOCK);p.setDataSource(this,uri);p.setLooping(true);
                p.setOnPreparedListener(ready->{if(player==ready)ready.start();});
                p.setOnErrorListener((mp,what,extra)->{if(player==mp)releaseSound();return true;});
                p.prepareAsync();
            }catch(Exception ignored){releaseSound();}
        }
        private void releaseSound(){MediaPlayer p=player;player=null;if(p!=null){try{p.release();}catch(RuntimeException ignored){}}}
        private void render(){
            handler.removeCallbacks(refresh);
            try{
                JSONObject entries=read(this);String chosen=null;JSONObject e=null;int count=0;long now=System.currentTimeMillis();boolean dirty=false;
                for(String key:keys(entries)){
                    JSONObject row=entries.getJSONObject(key);
                    if(!"ringing".equals(row.optString("status")))continue;
                    if(now-row.optLong("started")>=MAX_RING){row.put("status","done");dirty=true;continue;}
                    count++;if(e==null||row.optLong("started")<e.optLong("started")){chosen=key;e=row;}
                }
                if(dirty)write(this,entries);
                if(e==null){
                    if(!foreground)start(builder(this).setContentTitle("Momentum").setContentText("Alarm").build());
                    stopForeground(STOP_FOREGROUND_REMOVE);stopSelf();return;
                }
                String language=e.optString("language","en");
                String stop=language.startsWith("ps")?"بندول":language.startsWith("fa")?"توقف":"Stop";
                String snooze=language.startsWith("ps")?"۵ دقیقې ځنډ":language.startsWith("fa")?"۵ دقیقه بعد":"Snooze 5 min";
                Notification notification=builder(this).setContentTitle("Momentum").setContentText(e.optString("title","Alarm")+(count>1?" ("+count+")":""))
                    .setOngoing(true).addAction(0,stop,operation(this,STOP,chosen,0)).addAction(0,snooze,operation(this,SNOOZE,chosen,0)).build();
                if(!foreground)start(notification);else ((NotificationManager)getSystemService(NOTIFICATION_SERVICE)).notify(NOTIFICATION_ID,notification);
                sound();handler.postDelayed(refresh,1000);
            }catch(Exception ignored){if(!foreground){try{start(builder(this).setContentTitle("Momentum").setContentText("Alarm unavailable").build());}catch(Exception ignoredAgain){}}stopSelf();}
        }
        @Override public void onDestroy(){handler.removeCallbacksAndMessages(null);releaseSound();if(instance==this)instance=null;super.onDestroy();}
    }
}
