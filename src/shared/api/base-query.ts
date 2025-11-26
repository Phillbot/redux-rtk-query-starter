import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { HTTPBIN_BASE_URL } from '@/shared/config/env';

const getAccessToken = (): string | null => null;

type CreateBaseQueryOptions = Readonly<{
  baseUrl?: string;
}>;

export const createBaseQuery = ({ baseUrl = HTTPBIN_BASE_URL }: CreateBaseQueryOptions = {}) =>
  fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = getAccessToken();
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });
