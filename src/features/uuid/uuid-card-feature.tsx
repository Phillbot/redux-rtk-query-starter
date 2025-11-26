import { useFeatureFlag } from '@/shared/lib';

import { UuidCard } from './uuid-card';

export const UuidCardFeature = () => {
  const enabled = useFeatureFlag('uuidCard');
  return enabled ? <UuidCard /> : null;
};
