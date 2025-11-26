import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

import { createBaseQuery } from '@/shared/api';
import { HTTPBIN_ENDPOINTS } from '@/shared/config';

import { mapHttpBinResponse } from './mappers';
import type { HealthCheck, HttpBinResponse, PingHealthArgs } from './types';

const httpbinBaseQuery = createBaseQuery();

const timedBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const startedAt = performance.now();
  const result = await httpbinBaseQuery(args, api, extraOptions);

  if (result.error) {
    return { error: result.error };
  }

  const echo: HttpBinResponse = mapHttpBinResponse(result.data);

  return {
    data: {
      status: 'ok',
      latency: Math.round(performance.now() - startedAt),
      checkedAt: new Date().toISOString(),
      echo,
    },
  };
};

export const healthApi = createApi({
  reducerPath: 'healthApi',
  baseQuery: timedBaseQuery,
  endpoints: (builder) => ({
    pingHealth: builder.query<HealthCheck, PingHealthArgs | void>({
      query: (args) => ({ url: HTTPBIN_ENDPOINTS.health, params: args?.params }),
    }),
  }),
  refetchOnFocus: false,
  refetchOnReconnect: false,
  keepUnusedDataFor: 60,
});

export const { usePingHealthQuery, useLazyPingHealthQuery } = healthApi;
export type { HealthCheck, PingHealthArgs, HttpBinResponse };
