import { useCallback } from 'react';

import { optionFromNullable } from '@/shared/lib';

import { useLazyGetUuidQuery } from './uuid-api';
import type { UuidResponse } from './types';

export const useUuid = () => {
  const [trigger, queryState] = useLazyGetUuidQuery();

  const fetchUuid = useCallback(() => trigger(undefined, false), [trigger]);

  const dataOption = optionFromNullable<UuidResponse | undefined>(queryState.data);

  return { ...queryState, fetchUuid, dataOption };
};

export type UseUuidResult = ReturnType<typeof useUuid>;
