import { useCallback } from 'react';

import { optionFromNullable } from '@/shared/lib';

import { useLazyPingHealthQuery } from './health-api';

export const useHealthCheck = () => {
  const [trigger, queryState] = useLazyPingHealthQuery();

  const refetch = useCallback(() => trigger(undefined, false), [trigger]);
  const fetchWithParams = useCallback(
    (params: Record<string, string>) => trigger({ params }, false),
    [trigger],
  );

  const dataOption = optionFromNullable(queryState.data);

  return { ...queryState, refetch, fetchWithParams, trigger, dataOption };
};

export type UseHealthCheckResult = ReturnType<typeof useHealthCheck>;
