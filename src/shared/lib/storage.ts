type StorageBackend = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

const backend: StorageBackend | null = typeof window !== 'undefined' ? window.localStorage : null;

export const storage = {
  get: (key: string): string | null => {
    try {
      return backend?.getItem(key) ?? null;
    } catch {
      return null;
    }
  },
  set: (key: string, value: string) => {
    try {
      backend?.setItem(key, value);
    } catch {
      /* ignore */
    }
  },
  remove: (key: string) => {
    try {
      backend?.removeItem(key);
    } catch {
      /* ignore */
    }
  },
};
