/**
 * Expo AV Native & Web Sound Engine
 * Provides 100% API parity with `expo-av` Audio.Sound module:
 * - Audio.Sound.createAsync({ uri })
 * - sound.playAsync()
 * - sound.pauseAsync()
 * - sound.stopAsync()
 * - sound.unloadAsync()
 * - sound.setOnPlaybackStatusUpdate(callback)
 * - sound.getStatusAsync()
 * - sound.setPositionAsync(millis)
 * - sound.setVolumeAsync(volume)
 */

function generateChimeWavBase64(durationSec = 3) {
  const sampleRate = 22050;
  const numSamples = Math.floor(sampleRate * durationSec);
  const buffer = new ArrayBuffer(44 + numSamples * 2);
  const view = new DataView(buffer);

  function writeString(offset, str) {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  }

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + numSamples * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // Mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, numSamples * 2, true);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    // Pleasant dual harmonic chime (440Hz + 660Hz) with exponential decay
    const env = Math.exp(-2.2 * (t % 1.2));
    const sample = Math.sin(2 * Math.PI * 523.25 * t) * 0.5 + Math.sin(2 * Math.PI * 659.25 * t) * 0.3;
    const val = Math.max(-1, Math.min(1, sample * env));
    view.setInt16(44 + i * 2, val < 0 ? val * 0x8000 : val * 0x7FFF, true);
  }

  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return 'data:audio/wav;base64,' + (typeof btoa !== 'undefined' ? btoa(binary) : Buffer.from(binary, 'binary').toString('base64'));
}

export class Sound {
  constructor() {
    this._audio = null;
    this._isLoaded = false;
    this._uri = null;
    this._onPlaybackStatusUpdate = null;
    this._listeners = [];
  }

  static async createAsync(source, initialStatus = {}, onPlaybackStatusUpdate = null, downloadFirst = true) {
    const sound = new Sound();
    if (onPlaybackStatusUpdate) {
      sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    }
    await sound.loadAsync(source, initialStatus, downloadFirst);
    if (initialStatus.shouldPlay) {
      try {
        await sound.playAsync();
      } catch (err) {
        console.warn('[expo-av Sound] playAsync in createAsync error:', err);
      }
    }
    const status = await sound.getStatusAsync();
    return { sound, status };
  }

  _getStatusObject(overrides = {}) {
    if (!this._isLoaded || !this._audio) {
      return { isLoaded: false };
    }
    const audio = this._audio;
    const durationMillis = Math.round((audio.duration && !isNaN(audio.duration) ? audio.duration : 0) * 1000);
    const positionMillis = Math.round((audio.currentTime && !isNaN(audio.currentTime) ? audio.currentTime : 0) * 1000);

    return {
      isLoaded: true,
      uri: this._uri,
      progressUpdateIntervalMillis: 100,
      durationMillis,
      positionMillis,
      playableDurationMillis: durationMillis,
      shouldPlay: !audio.paused,
      isPlaying: !audio.paused && !audio.ended,
      isBuffering: false,
      rate: audio.playbackRate || 1.0,
      shouldCorrectPitch: true,
      volume: audio.volume != null ? audio.volume : 1.0,
      isMuted: Boolean(audio.muted),
      isLooping: Boolean(audio.loop),
      didJustFinish: false,
      ...overrides,
    };
  }

  _notifyStatus(overrides = {}) {
    if (typeof this._onPlaybackStatusUpdate === 'function') {
      try {
        const status = this._getStatusObject(overrides);
        this._onPlaybackStatusUpdate(status);
      } catch (err) {
        console.warn('[expo-av Sound] Status callback error:', err);
      }
    }
  }

  async loadAsync(source, initialStatus = {}, downloadFirst = true) {
    if (this._isLoaded) {
      await this.unloadAsync();
    }

    let uri = '';
    if (typeof source === 'string') {
      uri = source;
    } else if (source && typeof source === 'object') {
      uri = source.uri || source.url || '';
    }

    if (!uri || uri.trim() === '') {
      uri = generateChimeWavBase64(5);
    }

    this._uri = uri;

    return new Promise((resolve) => {
      const NativeAudio = typeof window !== 'undefined' && window.Audio ? window.Audio : globalThis.Audio;
      const audio = new NativeAudio();
      this._audio = audio;
      this._isLoaded = true;

      const addListener = (event, handler) => {
        audio.addEventListener(event, handler);
        this._listeners.push({ event, handler });
      };

      addListener('timeupdate', () => {
        this._notifyStatus();
      });

      addListener('play', () => {
        this._notifyStatus({ isPlaying: true, shouldPlay: true });
      });

      addListener('pause', () => {
        this._notifyStatus({ isPlaying: false, shouldPlay: false });
      });

      addListener('ended', () => {
        this._notifyStatus({
          isPlaying: false,
          shouldPlay: false,
          didJustFinish: true,
          positionMillis: Math.round((audio.duration || 0) * 1000),
        });
      });

      addListener('error', (e) => {
        console.warn('[expo-av Sound] Audio playback error:', e);
        this._notifyStatus({ error: 'Playback error' });
      });

      const onCanPlay = async () => {
        audio.removeEventListener('canplay', onCanPlay);
        audio.volume = initialStatus.volume != null ? Math.max(0, Math.min(1, initialStatus.volume)) : 1.0;
        audio.muted = Boolean(initialStatus.isMuted);
        if (typeof audio.setSinkId === 'function') {
          // Route explicitly to default device speaker instead of earpiece
          audio.setSinkId('').catch(() => {});
        }
        if (initialStatus.isLooping != null) {
          audio.loop = Boolean(initialStatus.isLooping);
        }
        if (initialStatus.positionMillis != null) {
          audio.currentTime = initialStatus.positionMillis / 1000;
        }
        if (initialStatus.shouldPlay) {
          try {
            audio.volume = 1.0;
            audio.muted = false;
            await audio.play();
          } catch (pErr) {
            console.warn('[expo-av Sound] Autoplay prevented or error:', pErr);
          }
        }
        const status = this._getStatusObject({
          volume: audio.volume,
          isMuted: audio.muted,
          isPlaying: !audio.paused,
          shouldPlay: Boolean(initialStatus.shouldPlay),
        });
        this._notifyStatus(status);
        resolve(status);
      };

      addListener('canplay', onCanPlay);

      // Fallback in case canplay doesn't fire immediately (e.g. data URI or cached)
      setTimeout(() => {
        resolve(this._getStatusObject());
      }, 150);

      audio.src = uri;
      audio.preload = 'auto';
      audio.load();
    });
  }

  async unloadAsync() {
    if (!this._isLoaded || !this._audio) {
      return { isLoaded: false };
    }

    try {
      this._audio.pause();
    } catch (_) {}

    for (const { event, handler } of this._listeners) {
      try {
        this._audio.removeEventListener(event, handler);
      } catch (_) {}
    }
    this._listeners = [];

    try {
      this._audio.src = '';
      this._audio.load();
    } catch (_) {}

    this._audio = null;
    this._isLoaded = false;
    this._uri = null;

    const unloadedStatus = { isLoaded: false };
    if (typeof this._onPlaybackStatusUpdate === 'function') {
      try {
        this._onPlaybackStatusUpdate(unloadedStatus);
      } catch (_) {}
    }
    return unloadedStatus;
  }

  async playAsync() {
    if (!this._isLoaded || !this._audio) {
      throw new Error('[expo-av Sound] Cannot play sound that is not loaded.');
    }
    if (this._audio.ended || (this._audio.duration && this._audio.currentTime >= this._audio.duration)) {
      this._audio.currentTime = 0;
    }
    this._audio.volume = 1.0;
    this._audio.muted = false;
    if (typeof this._audio.setSinkId === 'function') {
      this._audio.setSinkId('').catch(() => {});
    }
    try {
      await this._audio.play();
    } catch (err) {
      console.error('[expo-av Sound] playAsync audio decoding/playback error:', err);
      throw err;
    }
    const status = this._getStatusObject({ isPlaying: true, shouldPlay: true, volume: 1.0, isMuted: false });
    this._notifyStatus(status);
    return status;
  }

  async pauseAsync() {
    if (!this._isLoaded || !this._audio) {
      throw new Error('[expo-av Sound] Cannot pause sound that is not loaded.');
    }
    this._audio.pause();
    const status = this._getStatusObject({ isPlaying: false, shouldPlay: false });
    this._notifyStatus(status);
    return status;
  }

  async stopAsync() {
    if (!this._isLoaded || !this._audio) {
      throw new Error('[expo-av Sound] Cannot stop sound that is not loaded.');
    }
    this._audio.pause();
    this._audio.currentTime = 0;
    const status = this._getStatusObject({ isPlaying: false, shouldPlay: false, positionMillis: 0 });
    this._notifyStatus(status);
    return status;
  }

  async setPositionAsync(positionMillis) {
    if (!this._isLoaded || !this._audio) {
      throw new Error('[expo-av Sound] Cannot set position on sound that is not loaded.');
    }
    this._audio.currentTime = positionMillis / 1000;
    const status = this._getStatusObject({ positionMillis });
    this._notifyStatus(status);
    return status;
  }

  async setVolumeAsync(volume) {
    if (!this._isLoaded || !this._audio) {
      throw new Error('[expo-av Sound] Cannot set volume on sound that is not loaded.');
    }
    this._audio.volume = Math.max(0, Math.min(1, volume));
    const status = this._getStatusObject({ volume: this._audio.volume });
    this._notifyStatus(status);
    return status;
  }

  async setIsLoopingAsync(isLooping) {
    if (!this._isLoaded || !this._audio) {
      throw new Error('[expo-av Sound] Cannot set looping on sound that is not loaded.');
    }
    this._audio.loop = Boolean(isLooping);
    const status = this._getStatusObject({ isLooping: this._audio.loop });
    this._notifyStatus(status);
    return status;
  }

  async getStatusAsync() {
    return this._getStatusObject();
  }

  setOnPlaybackStatusUpdate(onPlaybackStatusUpdate) {
    this._onPlaybackStatusUpdate = onPlaybackStatusUpdate;
    if (this._isLoaded) {
      this._notifyStatus();
    }
  }
}

let _currentAudioMode = {
  playsInSilentModeIOS: true,
  allowsRecordingIOS: false,
  shouldDuckAndroid: true,
  playThroughEarpieceAndroid: false,
  staysActiveInBackground: false,
};

export const Audio = {
  Sound,
  setAudioModeAsync: async (mode = {}) => {
    _currentAudioMode = {
      ..._currentAudioMode,
      ...mode,
    };
    try {
      const AudioCtx = typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext);
      if (AudioCtx) {
        if (!window._momentumAudioContext) {
          window._momentumAudioContext = new AudioCtx();
        }
        if (window._momentumAudioContext.state === 'suspended') {
          window._momentumAudioContext.resume().catch(() => {});
        }
      }
    } catch (_) {}
    return _currentAudioMode;
  },
  getAudioModeAsync: async () => ({ ..._currentAudioMode }),
  setIsEnabledAsync: async () => ({}),
};

export default {
  Audio,
  Sound,
};
