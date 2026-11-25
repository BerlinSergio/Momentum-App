package com.momentum.app;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import androidx.activity.result.ActivityResult;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;

@CapacitorPlugin(name = "MomentumDevice")
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
