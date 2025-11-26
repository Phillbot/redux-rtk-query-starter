import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

import { createBaseQuery } from '@/shared/api';
import { HTTPBIN_ENDPOINTS } from '@/shared/config/api';

import { mapUuidResponse } from './mappers';
import type { UuidResponse } from './types';

const baseQuery = createBaseQuery();

const mappedBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error) return { error: result.error };
  return { data: mapUuidResponse(result.data) };
};

export const uuidApi = createApi({
  reducerPath: 'uuidApi',
  baseQuery: mappedBaseQuery,
  endpoints: (builder) => ({
    getUuid: builder.query<UuidResponse, void>({
      query: () => ({ url: HTTPBIN_ENDPOINTS.uuid }),
    }),
  }),
  refetchOnFocus: false,
  refetchOnReconnect: false,
  keepUnusedDataFor: 60,
});

export const { useLazyGetUuidQuery, useGetUuidQuery } = uuidApi;
