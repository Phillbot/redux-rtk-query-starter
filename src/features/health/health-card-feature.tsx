import { useFeatureFlag } from '@/shared/lib';

import { HealthCard } from './health-card';

export const HealthCardFeature = () => {
  const enabled = useFeatureFlag('healthCard');
  return enabled ? <HealthCard /> : null;
};
