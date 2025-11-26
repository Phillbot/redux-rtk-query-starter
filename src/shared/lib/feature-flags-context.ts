import { createContext, useContext } from 'react';

import type { FeatureFlag, FeatureFlags } from '@/shared/config/feature-flags';
import { resolvedFeatureFlags } from '@/shared/config/feature-flags';

export type FeatureFlagsContextValue = Readonly<{
  flags: FeatureFlags;
  isEnabled: (flag: FeatureFlag) => boolean;
  setFlag: (flag: FeatureFlag, value: boolean) => void;
}>;

const defaultValue: FeatureFlagsContextValue = {
  flags: resolvedFeatureFlags,
  isEnabled: (flag) => resolvedFeatureFlags[flag] ?? false,
  setFlag: () => undefined,
};

export const FeatureFlagsContext = createContext<FeatureFlagsContextValue>(defaultValue);

export const useFeatureFlagsContext = () => useContext(FeatureFlagsContext);
