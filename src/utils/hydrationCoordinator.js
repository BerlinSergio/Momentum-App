/**
 * Wait for authoritative store hydration. Never report readiness on a deadline.
 * The caller must keep protected application screens blocked after any failure.
 */
export async function coordinateHydration({ stores, prepare, timeoutMs = 12000 }) {
  if (!Array.isArray(stores) || stores.length === 0) {
    throw new Error('[Momentum Startup] No stores configured for hydration');
  }

  let timeoutId;
  let stopped = false;
  const ensureRunning = () => {
    if (stopped) throw new Error('[Momentum Startup] Hydration attempt is no longer active');
  };
  const work = (async () => {
    if (typeof prepare === 'function') await prepare();
    ensureRunning();
    await Promise.all(stores.map(async ({ name, store }) => {
      if (!store?.persist || typeof store.persist.rehydrate !== 'function') {
        throw new Error('[Momentum Startup] Missing persistence API for ' + name);
      }
      await store.persist.rehydrate();
      ensureRunning();
      // Zustand may resolve rehydrate() even when the storage adapter failed.
      if (typeof store.persist.hasHydrated === 'function' && !store.persist.hasHydrated()) {
        throw new Error('[Momentum Startup] Storage hydration failed for ' + name);
      }
      // Mark only this store after its own successful hydration.
      await store.getState?.().setHasHydrated?.(true);
      ensureRunning();
    }));
    return { success: true };
  })();

  try {
    return await Promise.race([
      work,
      new Promise((_, reject) => {
        timeoutId = setTimeout(() => {
          reject(new Error('[Momentum Startup] Store hydration timed out; data was not confirmed loaded'));
        }, timeoutMs);
      }),
    ]);
  } finally {
    stopped = true;
    clearTimeout(timeoutId);
  }
}
