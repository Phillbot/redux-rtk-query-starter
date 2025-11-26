import { z } from 'zod';

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().trim().optional(),
  VITE_HTTPBIN_BASE_URL: z.string().trim().optional(),
});

const parsedEnv = envSchema.safeParse(import.meta.env);

const DEFAULT_HTTPBIN_BASE_URL = 'https://httpbin.org';

const envBase =
  parsedEnv.success &&
  (parsedEnv.data.VITE_HTTPBIN_BASE_URL || parsedEnv.data.VITE_API_BASE_URL || undefined);

export const HTTPBIN_BASE_URL = envBase || DEFAULT_HTTPBIN_BASE_URL;
// Back-compat alias; prefer HTTPBIN_BASE_URL
export const API_BASE_URL = HTTPBIN_BASE_URL;
