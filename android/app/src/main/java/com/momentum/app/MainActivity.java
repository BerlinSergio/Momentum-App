package com.momentum.app;

import android.os.Bundle;
import android.view.KeyEvent;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.PluginHandle;

public class MainActivity extends BridgeActivity {
    private int consumedVolumeKey = -1;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(MomentumDevicePlugin.class);
        registerPlugin(MomentumBiometricPlugin.class);
        super.onCreate(savedInstanceState);
    }

    @Override
    public boolean dispatchKeyEvent(KeyEvent event) {
        int code = event.getKeyCode();
        if (code == KeyEvent.KEYCODE_VOLUME_UP || code == KeyEvent.KEYCODE_VOLUME_DOWN) {
            if (event.getAction() == KeyEvent.ACTION_UP && consumedVolumeKey == code) {
                consumedVolumeKey = -1;
                return true;
            }
            if (event.getAction() == KeyEvent.ACTION_DOWN) {
                if (event.getRepeatCount() > 0 && consumedVolumeKey == code) return true;
                if (event.getRepeatCount() == 0 && getBridge() != null) {
                    PluginHandle handle = getBridge().getPlugin("MomentumDevice");
                    if (handle != null && handle.getInstance() instanceof MomentumDevicePlugin &&
                        ((MomentumDevicePlugin) handle.getInstance()).dispatchVolumePress()) {
                        consumedVolumeKey = code;
                        return true;
                    }
                }
            }
        }
        return super.dispatchKeyEvent(event);
    }
}
