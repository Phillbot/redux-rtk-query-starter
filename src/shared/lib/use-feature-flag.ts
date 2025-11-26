import { type FeatureFlag } from '@/shared/config/feature-flags';

import { useFeatureFlagsContext } from './feature-flags-context';

export const useFeatureFlag = (flag: FeatureFlag): boolean => {
  const { isEnabled } = useFeatureFlagsContext();
  return isEnabled(flag);
};
