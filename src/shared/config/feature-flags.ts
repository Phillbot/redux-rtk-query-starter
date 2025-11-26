import { isString } from 'handy-ts-tools';

export type FeatureFlag =
  | 'healthCard'
  | 'uuidCard';

export type FeatureFlags = Record<FeatureFlag, boolean>;

export const FEATURE_FLAGS_STORAGE_KEY = 'feature_flags_overrides';

const DEFAULT_FLAGS: FeatureFlags = {
  healthCard: true,
  uuidCard: true,
};

const parseEnvFlags = (raw: unknown): Partial<FeatureFlags> => {
  if (!isString(raw) || !raw.trim()) return {};
  return raw.split(',').reduce<Partial<FeatureFlags>>((acc, entry) => {
    const [key, value] = entry.split(':').map((chunk) => chunk.trim());
    if (key === 'healthCard') {
      acc.healthCard = value === 'false' ? false : true;
    }
    return acc;
  }, {});
};

const envOverrides = parseEnvFlags(import.meta.env.VITE_FEATURE_FLAGS);

export const resolvedFeatureFlags: FeatureFlags = { ...DEFAULT_FLAGS, ...envOverrides };

export const isFeatureEnabled = (flag: FeatureFlag): boolean => resolvedFeatureFlags[flag] ?? false;
