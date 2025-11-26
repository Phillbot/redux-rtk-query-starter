import { configureStore } from '@reduxjs/toolkit';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { HTTPBIN_BASE_URL, HTTPBIN_ENDPOINTS } from '@/shared/config';

import { healthApi } from './health-api';

describe('healthApi pingHealth', () => {
  const store = configureStore({
    reducer: {
      [healthApi.reducerPath]: healthApi.reducer,
    },
    middleware: (gdm) => gdm().concat(healthApi.middleware),
  });

  const queryArgs = { foo: 'bar' };
  const body = { url: `${HTTPBIN_BASE_URL}${HTTPBIN_ENDPOINTS.health}`, args: queryArgs, headers: {} };
  const mockResponse = () =>
    new Response(JSON.stringify(body), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns payload with latency and echo data', async () => {
    const result = await store.dispatch(healthApi.endpoints.pingHealth.initiate({ params: queryArgs }));

    expect(result.data?.status).toBe('ok');
    expect(typeof result.data?.latency).toBe('number');
    expect(result.data?.echo.url).toBe(body.url);
    expect(result.data?.echo.args).toStrictEqual(queryArgs);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
