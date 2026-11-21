/**
 * Momentum Routine Audio & Notification Synthesizer
 * Uses standard Web Audio API to provide gentle, calming auditory cues
 * without external audio asset dependencies or network overhead.
 */

let activeOscillators = [];
let activeGainNodes = [];

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  if (!window._momentumRoutineAudioCtx) {
    window._momentumRoutineAudioCtx = new AudioCtx();
  }
  if (window._momentumRoutineAudioCtx.state === 'suspended') {
    window._momentumRoutineAudioCtx.resume().catch((err) => {
      void err;
    });
  }
  return window._momentumRoutineAudioCtx;
}

export function stopRoutineSound() {
  try {
    for (const osc of activeOscillators) {
      try {
        osc.stop();
        osc.disconnect();
      } catch (err) {
        void err;
      }
    }
    for (const gain of activeGainNodes) {
      try {
        gain.disconnect();
      } catch (err) {
        void err;
      }
    }
  } catch (err) {
    void err;
  }
  activeOscillators = [];
  activeGainNodes = [];
}

/**
 * Play a synthesized gentle auditory cue.
 * @param {string} soundName - 'Serenity Bell' | 'Calm Chime' | 'Zen Bowl' | 'Default Tone' | 'Silent'
 */
export function playRoutineSound(soundName = 'Serenity Bell') {
  stopRoutineSound();

  if (soundName === 'Silent' || !soundName) {
    return;
  }

  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  try {
    if (soundName === 'Serenity Bell') {
      // 528 Hz Solfeggio frequency with rich gentle bell decay and soft harmonics
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.exponentialRampToValueAtTime(0.25, now + 0.04);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);
      masterGain.connect(ctx.destination);
      activeGainNodes.push(masterGain);

      // Fundamental (528 Hz)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(528, now);
      osc1.connect(masterGain);
      osc1.start(now);
      osc1.stop(now + 1.65);
      activeOscillators.push(osc1);

      // Soft harmonic overtone (1056 Hz)
      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1056, now);
      const gain2 = ctx.createGain();
      gain2.gain.setValueAtTime(0.08, now);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);
      osc2.connect(gain2);
      gain2.connect(masterGain);
      osc2.start(now);
      osc2.stop(now + 1.15);
      activeOscillators.push(osc2);
      activeGainNodes.push(gain2);

    } else if (soundName === 'Calm Chime') {
      // Dual harmonic chime: 587.33 Hz (D5) followed by 880 Hz (A5)
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.2, now);
      masterGain.connect(ctx.destination);
      activeGainNodes.push(masterGain);

      // Note 1 (D5)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, now);
      gain1.gain.setValueAtTime(0.001, now);
      gain1.gain.exponentialRampToValueAtTime(0.2, now + 0.03);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);
      osc1.connect(gain1);
      gain1.connect(masterGain);
      osc1.start(now);
      osc1.stop(now + 0.75);
      activeOscillators.push(osc1);
      activeGainNodes.push(gain1);

      // Note 2 (A5) delayed by 180ms
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880, now + 0.18);
      gain2.gain.setValueAtTime(0.001, now + 0.18);
      gain2.gain.exponentialRampToValueAtTime(0.22, now + 0.22);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);
      osc2.connect(gain2);
      gain2.connect(masterGain);
      osc2.start(now + 0.18);
      osc2.stop(now + 1.45);
      activeOscillators.push(osc2);
      activeGainNodes.push(gain2);

    } else if (soundName === 'Zen Bowl') {
      // Low resonant singing bowl (216 Hz) with smooth vibrato
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.exponentialRampToValueAtTime(0.3, now + 0.08);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);
      masterGain.connect(ctx.destination);
      activeGainNodes.push(masterGain);

      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(216, now);
      osc.connect(masterGain);
      osc.start(now);
      osc.stop(now + 2.05);
      activeOscillators.push(osc);

    } else {
      // Default Tone: 880 Hz crisp notification chime
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.exponentialRampToValueAtTime(0.18, now + 0.02);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
      masterGain.connect(ctx.destination);
      activeGainNodes.push(masterGain);

      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.connect(masterGain);
      osc.start(now);
      osc.stop(now + 0.55);
      activeOscillators.push(osc);
    }
  } catch (err) {
    console.warn('[RoutineAudio] Audio synthesis warning:', err);
  }
}

export const SOUND_OPTIONS = [
  { id: 'Serenity Bell', name: 'Serenity Bell', description: '528 Hz gentle chime', icon: 'notifications_active' },
  { id: 'Calm Chime', name: 'Calm Chime', description: 'Two-tone harmonic alert', icon: 'music_note' },
  { id: 'Zen Bowl', name: 'Zen Bowl', description: 'Deep acoustic bowl resonance', icon: 'self_improvement' },
  { id: 'Default Tone', name: 'Default Tone', description: 'Crisp system notification', icon: 'volume_up' },
  { id: 'Silent', name: 'Silent', description: 'No sound (vibration only)', icon: 'volume_off' },
];
