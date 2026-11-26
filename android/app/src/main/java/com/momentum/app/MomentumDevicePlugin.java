package com.momentum.app;

import android.app.Activity;
import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Handler;
import android.os.Looper;
import android.provider.AlarmClock;
import androidx.core.content.ContextCompat;
import java.util.concurrent.atomic.AtomicBoolean;
import android.content.Intent;
import android.net.Uri;
import androidx.activity.result.ActivityResult;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;
import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;

@CapacitorPlugin(name = "MomentumDevice", permissions = {
    @Permission(alias = "deviceLocation", strings = {Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION})
})
public class MomentumDevicePlugin extends Plugin {
    private volatile boolean captureVolume = false;

    @PluginMethod
    public void setVolumeCapture(PluginCall call) {
        captureVolume = Boolean.TRUE.equals(call.getBoolean("enabled", false));
        call.resolve();
    }

    @Override
    protected void handleOnPause() {
        captureVolume = false;
        super.handleOnPause();
    }

    public boolean dispatchVolumePress() {
        if (!captureVolume || getActivity() == null || !getActivity().hasWindowFocus()) return false;
        notifyListeners("volumePress", new JSObject());
        return true;
    }

    private boolean locationGranted() {
        return ContextCompat.checkSelfPermission(getContext(), Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED ||
            ContextCompat.checkSelfPermission(getContext(), Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED;
    }

    @PluginMethod
    public void checkDeviceLocationPermission(PluginCall call) {
        JSObject result = new JSObject();
        result.put("granted", locationGranted());
        call.resolve(result);
    }

    @PluginMethod
    public void requestDeviceLocationPermission(PluginCall call) {
        if (locationGranted()) { checkDeviceLocationPermission(call); return; }
        requestPermissionForAlias("deviceLocation", call, "deviceLocationPermissionResult");
    }

    @PermissionCallback
    private void deviceLocationPermissionResult(PluginCall call) {
        if (call != null) checkDeviceLocationPermission(call);
    }

    // Use Android's own location providers, including devices without Google
    // Play Services. Only invoked after a user-initiated permission request.
    @PluginMethod
    public void getDeviceLocation(PluginCall call) {
        getActivity().runOnUiThread(() -> {
            boolean fine = ContextCompat.checkSelfPermission(getContext(), Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED;
            boolean coarse = ContextCompat.checkSelfPermission(getContext(), Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED;
            if (!fine && !coarse) { call.reject("Location permission denied", "PERMISSION_DENIED"); return; }
            LocationManager manager = (LocationManager)getContext().getSystemService(Context.LOCATION_SERVICE);
            if (manager == null) { call.reject("Location service unavailable", "POSITION_UNAVAILABLE"); return; }
            Handler handler = new Handler(Looper.getMainLooper());
            AtomicBoolean finished = new AtomicBoolean(false);
            LocationListener listener = new LocationListener() {
                @Override public void onLocationChanged(Location location) {
                    if (location == null || !finished.compareAndSet(false, true)) return;
                    handler.removeCallbacksAndMessages(null);
                    manager.removeUpdates(this);
                    JSObject coords = new JSObject();
                    coords.put("latitude", location.getLatitude());
                    coords.put("longitude", location.getLongitude());
                    if (location.hasAltitude()) coords.put("altitude", location.getAltitude());
                    if (location.hasAccuracy()) coords.put("accuracy", location.getAccuracy());
                    JSObject response = new JSObject();
                    response.put("coords", coords);
                    call.resolve(response);
                }
                @Override public void onProviderEnabled(String provider) {}
                @Override public void onProviderDisabled(String provider) {}
                @Override public void onStatusChanged(String provider, int status, android.os.Bundle extras) {}
            };
            boolean requested = false;
            for (String provider : new String[]{LocationManager.GPS_PROVIDER, LocationManager.NETWORK_PROVIDER}) {
                if (provider.equals(LocationManager.GPS_PROVIDER) && !fine) continue;
                try {
                    if (!manager.isProviderEnabled(provider)) continue;
                    manager.requestLocationUpdates(provider, 0L, 0f, listener, Looper.getMainLooper());
                    requested = true;
                } catch (Exception ignored) {}
            }
            if (!requested) { finished.set(true); call.reject("Turn on device location services", "POSITION_UNAVAILABLE"); return; }
            handler.postDelayed(() -> {
                if (!finished.compareAndSet(false, true)) return;
                manager.removeUpdates(listener);
                call.reject("Device location acquisition timed out", "TIMEOUT");
            }, 20000L);
        });
    }

    // Launch the system Clock's alarm editor; the user confirms there.
    // An accepted intent is not proof that the user saved an alarm.
    @PluginMethod
    public void openAlarmEditor(PluginCall call) {
        Integer hour=call.getInt("hour"), minute=call.getInt("minute");
        if (hour==null || minute==null || hour<0 || hour>23 || minute<0 || minute>59) {
            call.reject("Invalid alarm time"); return;
        }
        String label=call.getString("label","Momentum");
        Intent intent=new Intent(AlarmClock.ACTION_SET_ALARM);
        intent.putExtra(AlarmClock.EXTRA_HOUR,hour);
        intent.putExtra(AlarmClock.EXTRA_MINUTES,minute);
        intent.putExtra(AlarmClock.EXTRA_MESSAGE,label.substring(0,Math.min(80,label.length())));
        intent.putExtra(AlarmClock.EXTRA_SKIP_UI,false);
        try {
            getActivity().startActivity(intent);
            JSObject result=new JSObject(); result.put("opened",true); call.resolve(result);
        } catch (Exception error) { call.reject("No compatible Android Clock app",error); }
    }

    @PluginMethod
    public void saveExport(PluginCall call) {
        String staged = call.getString("staged");
        String filename = call.getString("filename");
        String mime = call.getString("mime", "application/octet-stream");
        if (staged == null || !staged.matches("momentum-export-[a-zA-Z0-9-]+") ||
            filename == null || filename.isEmpty() || filename.contains("/") || filename.contains("\\") ||
            filename.length() > 180 || !new File(getContext().getCacheDir(), staged).isFile()) {
            call.reject("Invalid export file");
            return;
        }
        Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType(mime);
        intent.putExtra(Intent.EXTRA_TITLE, filename);
        try {
            startActivityForResult(call, intent, "exportResult");
        } catch (Exception error) {
            call.reject("Unable to open Android file picker", error);
        }
    }

    @ActivityCallback
    private void exportResult(PluginCall call, ActivityResult result) {
        if (call == null) return;
        Uri uri = result.getData() == null ? null : result.getData().getData();
        if (result.getResultCode() != Activity.RESULT_OK || uri == null) {
            JSObject response = new JSObject();
            response.put("saved", false);
            call.resolve(response);
            return;
        }
        File source = new File(getContext().getCacheDir(), call.getString("staged"));
        new Thread(() -> {
            try (FileInputStream in = new FileInputStream(source);
                 OutputStream out = getContext().getContentResolver().openOutputStream(uri, "w")) {
                if (out == null) throw new IllegalStateException("File destination unavailable");
                byte[] buffer = new byte[65536];
                long written = 0;
                int count;
                while ((count = in.read(buffer)) != -1) {
                    out.write(buffer, 0, count);
                    written += count;
                }
                out.flush();
                if (written != source.length() || written <= 0) throw new IllegalStateException("Incomplete export");
            } catch (Exception error) {
                call.reject("Unable to finish saving the file", error);
                return;
            }
            JSObject response = new JSObject();
            response.put("saved", true);
            response.put("uri", uri.toString());
            call.resolve(response);
        }, "momentum-file-export").start();
    }
}
