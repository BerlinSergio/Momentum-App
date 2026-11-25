package com.momentum.app;

import android.os.Build;
import android.security.keystore.KeyGenParameterSpec;
import android.security.keystore.KeyProperties;
import android.util.Base64;
import androidx.biometric.BiometricManager;
import androidx.biometric.BiometricPrompt;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.FragmentActivity;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.security.KeyPairGenerator;
import java.security.KeyStore;
import java.security.PrivateKey;
import java.security.Signature;
import java.security.spec.ECGenParameterSpec;

@CapacitorPlugin(name="MomentumBiometric")
public class MomentumBiometricPlugin extends Plugin {
    private static final String STORE = "AndroidKeyStore";
    private static final int STRONG = BiometricManager.Authenticators.BIOMETRIC_STRONG;
    private BiometricPrompt activePrompt;
    private String activeAlias;

    private boolean validAlias(String alias) {
        return alias != null && alias.matches("momentum-bio-[a-f0-9-]{36}");
    }
    private KeyStore keyStore() throws Exception {
        KeyStore store = KeyStore.getInstance(STORE);
        store.load(null);
        return store;
    }
    private void delete(String alias) {
        try { if (validAlias(alias)) keyStore().deleteEntry(alias); } catch (Exception ignored) {}
    }

    @PluginMethod
    public void capability(PluginCall call) {
        int status = BiometricManager.from(getContext()).canAuthenticate(STRONG);
        JSObject result = new JSObject();
        result.put("available", status == BiometricManager.BIOMETRIC_SUCCESS);
        result.put("status", status);
        call.resolve(result);
    }

    @PluginMethod
    public void createAndSign(PluginCall call) { prompt(call, true); }

    @PluginMethod
    public void sign(PluginCall call) { prompt(call, false); }

    private void prompt(PluginCall call, boolean create) {
        String alias = call.getString("alias");
        String encoded = call.getString("challenge");
        final byte[] challenge;
        try {
            if (!validAlias(alias) || encoded == null || encoded.length() != 44) throw new IllegalArgumentException();
            challenge = Base64.decode(encoded, Base64.NO_WRAP);
            if (challenge.length != 32) throw new IllegalArgumentException();
        } catch (Exception invalid) {
            call.reject("Invalid biometric challenge");
            return;
        }
        getActivity().runOnUiThread(() -> {
            if (activePrompt != null) { call.reject("Another biometric prompt is active"); return; }
            if (BiometricManager.from(getContext()).canAuthenticate(STRONG) != BiometricManager.BIOMETRIC_SUCCESS) {
                call.reject("Strong device biometrics unavailable or not enrolled");
                return;
            }
            boolean created = false;
            try {
                KeyStore store = keyStore();
                if (create) {
                    if (store.containsAlias(alias)) throw new IllegalStateException("Key already exists");
                    KeyPairGenerator generator = KeyPairGenerator.getInstance(KeyProperties.KEY_ALGORITHM_EC, STORE);
                    KeyGenParameterSpec.Builder builder = new KeyGenParameterSpec.Builder(alias, KeyProperties.PURPOSE_SIGN)
                        .setAlgorithmParameterSpec(new ECGenParameterSpec("secp256r1"))
                        .setDigests(KeyProperties.DIGEST_SHA256)
                        .setUserAuthenticationRequired(true)
                        .setInvalidatedByBiometricEnrollment(true);
                    if (Build.VERSION.SDK_INT >= 30) {
                        builder.setUserAuthenticationParameters(0, KeyProperties.AUTH_BIOMETRIC_STRONG);
                    } else {
                        builder.setUserAuthenticationValidityDurationSeconds(-1);
                    }
                    generator.initialize(builder.build());
                    generator.generateKeyPair();
                    created = true;
                    store = keyStore();
                }
                PrivateKey key = (PrivateKey) store.getKey(alias, null);
                if (key == null || store.getCertificate(alias) == null) throw new IllegalStateException("Biometric key unavailable");
                final byte[] publicKey = store.getCertificate(alias).getPublicKey().getEncoded();
                Signature signature = Signature.getInstance("SHA256withECDSA");
                signature.initSign(key);
                final boolean newKey = created;
                activeAlias = alias;
                activePrompt = new BiometricPrompt((FragmentActivity) getActivity(), ContextCompat.getMainExecutor(getContext()), new BiometricPrompt.AuthenticationCallback() {
                    @Override
                    public void onAuthenticationError(int code, CharSequence message) {
                        if (!alias.equals(activeAlias)) return;
                        activePrompt = null;
                        activeAlias = null;
                        if (newKey) delete(alias);
                        call.reject("Biometric verification cancelled or unavailable", "BIO_" + code);
                    }
                    @Override
                    public void onAuthenticationSucceeded(BiometricPrompt.AuthenticationResult result) {
                        if (!alias.equals(activeAlias)) return;
                        activePrompt = null;
                        activeAlias = null;
                        try {
                            Signature authorized = result.getCryptoObject() == null ? null : result.getCryptoObject().getSignature();
                            if (authorized == null) throw new IllegalStateException("Missing authenticated crypto object");
                            authorized.update(challenge);
                            JSObject response = new JSObject();
                            response.put("publicKey", Base64.encodeToString(publicKey, Base64.NO_WRAP));
                            response.put("signature", Base64.encodeToString(authorized.sign(), Base64.NO_WRAP));
                            call.resolve(response);
                        } catch (Exception error) {
                            if (newKey) delete(alias);
                            call.reject("Biometric key signature failed", error);
                        }
                    }
                });
                BiometricPrompt.PromptInfo promptInfo = new BiometricPrompt.PromptInfo.Builder()
                    .setTitle(create ? "Enable Momentum biometric unlock" : "Unlock Momentum")
                    .setSubtitle("Verify with your enrolled device biometric")
                    .setAllowedAuthenticators(STRONG)
                    .setNegativeButtonText("Use app PIN")
                    .build();
                activePrompt.authenticate(promptInfo, new BiometricPrompt.CryptoObject(signature));
            } catch (Exception error) {
                activePrompt = null;
                activeAlias = null;
                if (created) delete(alias);
                call.reject("Biometric key unavailable. Use app PIN and re-enroll.", error);
            }
        });
    }

    @PluginMethod
    public void cancel(PluginCall call) {
        String alias = call.getString("alias");
        getActivity().runOnUiThread(() -> {
            if (activePrompt != null && alias != null && alias.equals(activeAlias)) activePrompt.cancelAuthentication();
            call.resolve();
        });
    }

    @PluginMethod
    public void deleteKey(PluginCall call) {
        String alias = call.getString("alias");
        if (!validAlias(alias)) {call.reject("Invalid key alias");return;}
        getActivity().runOnUiThread(() -> {
            if (alias.equals(activeAlias)) {call.reject("Key authentication in progress");return;}
            try {keyStore().deleteEntry(alias);call.resolve();}
            catch (Exception error) {call.reject("Unable to delete biometric key",error);}
        });
    }
}
