import { type ReactNode, useMemo, useState } from 'react';

import { FeatureFlagsContext } from '@/shared/lib';
import { storage } from '@/shared/lib/storage';
import {
  FEATURE_FLAGS_STORAGE_KEY,
  type FeatureFlag,
  type FeatureFlags,
  isFeatureFlagKey,
  resolvedFeatureFlags,
} from '@/shared/config/feature-flags';

type FeatureFlagsProviderProps = Readonly<{
  children: ReactNode;
  initialFlags?: Partial<FeatureFlags>;
}>;

const parseOverrides = (raw: string): Partial<FeatureFlags> => {
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return {};
    return Object.entries(parsed).reduce<Partial<FeatureFlags>>((acc, [key, value]) => {
      if (typeof value !== 'boolean') return acc;
      if (isFeatureFlagKey(key)) {
        acc[key] = value;
      }
      return acc;
    }, {});
  } catch {
    return {};
  }
};

export const FeatureFlagsProvider = ({ children, initialFlags }: FeatureFlagsProviderProps) => {
  const [overrides, setOverrides] = useState<Partial<FeatureFlags>>(() => {
    if (!import.meta.env.DEV) return {};
    const raw = storage.get(FEATURE_FLAGS_STORAGE_KEY);
    if (!raw) return {};
    return parseOverrides(raw);
  });

  const flags = useMemo(
    () => ({ ...resolvedFeatureFlags, ...overrides, ...(initialFlags ?? {}) }),
    [overrides, initialFlags],
  );

  const setFlag = (flag: FeatureFlag, value: boolean) => {
    setOverrides((prev) => {
      const next = { ...prev, [flag]: value };
      if (import.meta.env.DEV) {
        const serialized = JSON.stringify(next);
        storage.set(FEATURE_FLAGS_STORAGE_KEY, serialized);
      }
      return next;
    });
  };

  const value = useMemo(
    () => ({
      flags,
      isEnabled: (flag: FeatureFlag) => flags[flag] ?? false,
      setFlag,
    }),
    [flags],
  );

  return <FeatureFlagsContext.Provider value={value}>{children}</FeatureFlagsContext.Provider>;
};
