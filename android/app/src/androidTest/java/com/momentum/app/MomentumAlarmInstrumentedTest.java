package com.momentum.app;

import android.app.AlarmManager;
import android.app.Notification;
import android.app.NotificationManager;
import android.content.Context;
import android.service.notification.StatusBarNotification;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.platform.app.InstrumentationRegistry;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import java.io.File;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.concurrent.atomic.AtomicReference;
import static org.junit.Assert.*;

@RunWith(AndroidJUnit4.class)
public class MomentumAlarmInstrumentedTest {
    private Context context;
    private static final int ALARM_ID=17124001;
    @Before public void setup() throws Exception {
        context=InstrumentationRegistry.getInstrumentation().getTargetContext();
        assertTrue("Exact alarms must be granted for this test",MomentumAlarmEngine.canSchedule(context));
        assertTrue(((NotificationManager)context.getSystemService(Context.NOTIFICATION_SERVICE)).areNotificationsEnabled());
        sync(new JSONArray());
        awaitNotification(false,5000);
    }
    @After public void cleanup() throws Exception {sync(new JSONArray());awaitNotification(false,5000);}
    private JSONArray sync(JSONArray plan)throws Exception{
        AtomicReference<JSONArray> result=new AtomicReference<>();
        AtomicReference<Exception> failure=new AtomicReference<>();
        InstrumentationRegistry.getInstrumentation().runOnMainSync(()->{try{result.set(MomentumAlarmEngine.sync(context,plan));}catch(Exception e){failure.set(e);}});
        if(failure.get()!=null)throw failure.get();
        return result.get();
    }
    private JSONArray plan(String key,long at)throws Exception{
        return new JSONArray().put(new JSONObject().put("key",key).put("at",at).put("title","Synthetic CI test reminder").put("language","en"));
    }
    private Notification awaitNotification(boolean wanted,long timeout)throws Exception{
        long end=System.currentTimeMillis()+timeout;
        NotificationManager nm=(NotificationManager)context.getSystemService(Context.NOTIFICATION_SERVICE);
        do{
            Notification found=null;
            for(StatusBarNotification n:nm.getActiveNotifications())if(n.getId()==ALARM_ID)found=n.getNotification();
            if(wanted&&found!=null&&found.actions!=null&&found.actions.length>=2)return found;
            if(!wanted&&found==null)return null;
            Thread.sleep(200);
        }while(System.currentTimeMillis()<end);
        fail("Alarm notification did not reach expected state: "+wanted);return null;
    }
    private JSONObject state(String key)throws Exception{
        File f=new File(context.getNoBackupFilesDir(),"momentum-alarm-queue.json");
        return new JSONObject(new String(Files.readAllBytes(f.toPath()),StandardCharsets.UTF_8)).optJSONObject(key);
    }
    @Test public void exactAlarmRingsAndStopDoesNotRearm()throws Exception{
        long at=System.currentTimeMillis()+4000;JSONArray p=plan("ci-stop",at);
        assertEquals("ci-stop",sync(p).getString(0));
        Notification n=awaitNotification(true,30000);
        n.actions[0].actionIntent.send();
        awaitNotification(false,10000);
        assertEquals("done",state("ci-stop").getString("status"));
        sync(p);assertEquals("done",state("ci-stop").getString("status"));
    }
    @Test public void snoozePersistsThroughReconciliation()throws Exception{
        long at=System.currentTimeMillis()+4000;JSONArray p=plan("ci-snooze",at);
        assertEquals("ci-snooze",sync(p).getString(0));
        Notification n=awaitNotification(true,30000);n.actions[1].actionIntent.send();
        awaitNotification(false,10000);
        JSONObject row=state("ci-snooze");
        assertEquals("snoozed",row.getString("status"));
        long fireAt=row.getLong("fireAt");
        assertTrue(fireAt>System.currentTimeMillis()+270000);
        sync(p);assertEquals(fireAt,state("ci-snooze").getLong("fireAt"));
    }
    @Test public void removedOccurrenceCannotRing()throws Exception{
        long at=System.currentTimeMillis()+4000;
        assertEquals("ci-cancel",sync(plan("ci-cancel",at)).getString(0));
        sync(new JSONArray());
        Thread.sleep(6500);
        assertNull(state("ci-cancel"));
        awaitNotification(false,1000);
    }
}
