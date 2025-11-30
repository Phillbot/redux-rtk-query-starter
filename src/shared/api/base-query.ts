import { type BaseQueryFn, type FetchArgs, fetchBaseQuery, type FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import { HTTPBIN_BASE_URL } from '@/shared/config/env';

import { logHttpOutcome, normalizeOutcome } from './http-logger';

const getAccessToken = (): string | null => null;

type CreateBaseQueryOptions = Readonly<{
  baseUrl?: string;
}>;

export const createBaseQuery = ({ baseUrl = HTTPBIN_BASE_URL }: CreateBaseQueryOptions = {}) => {
  const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = getAccessToken();
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  const withLogging: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions,
  ) => {
    const startedAt = performance.now();
    const result = await baseQuery(args, api, extraOptions);
    const durationMs = Math.round(performance.now() - startedAt);

    const url = typeof args === 'string' ? args : args.url;
    const method = typeof args === 'string' ? 'GET' : args.method ?? 'GET';
    const status = typeof result.error?.status === 'number' ? result.error.status : undefined;

    const outcome = normalizeOutcome({ url, method, status: status ?? 200, durationMs }, result.error);
    logHttpOutcome(outcome);

    return result;
  };

  return withLogging;
};
