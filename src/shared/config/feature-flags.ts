import { isString } from 'handy-ts-tools';

export const FEATURE_FLAG_KEYS = ['healthCard', 'uuidCard'] as const;
export const FEATURE_FLAGS_STORAGE_KEY = 'feature_flags_overrides';
export type FeatureFlag = (typeof FEATURE_FLAG_KEYS)[number];
export type FeatureFlags = Record<FeatureFlag, boolean>;

export const isFeatureFlagKey = (value: unknown): value is FeatureFlag =>
  typeof value === 'string' && (FEATURE_FLAG_KEYS as readonly string[]).includes(value);

const DEFAULT_FLAGS: FeatureFlags = {
  healthCard: true,
  uuidCard: true,
};

const parseBooleanFlag = (value: string): boolean | undefined => {
  const normalized = value.trim().toLowerCase();
  if (normalized === 'true') return true;
  if (normalized === 'false') return false;
  return undefined;
};

const parseEnvFlags = (raw: unknown): Partial<FeatureFlags> => {
  if (!isString(raw) || !raw.trim()) return {};
  return raw.split(',').reduce<Partial<FeatureFlags>>((acc, entry) => {
    const [key, value] = entry.split(':').map((chunk) => chunk.trim());
    if (!isFeatureFlagKey(key)) return acc;
    const parsedValue = parseBooleanFlag(value);
    if (parsedValue === undefined) return acc;
    acc[key] = parsedValue;
    return acc;
  }, {});
};

const envOverrides = parseEnvFlags(import.meta.env.VITE_FEATURE_FLAGS);

export const resolvedFeatureFlags: FeatureFlags = { ...DEFAULT_FLAGS, ...envOverrides };

export const isFeatureEnabled = (flag: FeatureFlag): boolean => resolvedFeatureFlags[flag] ?? false;
