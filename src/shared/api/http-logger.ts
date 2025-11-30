import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { sendMetricTelemetry } from '@/shared/lib';
import { err, isOk, ok, type Result } from '@/shared/lib';

type HttpMeta = Readonly<{
  url: string;
  method: string;
  status?: number;
  durationMs?: number;
}>;

export const normalizeOutcome = (
  input: HttpMeta,
  error?: FetchBaseQueryError,
): Result<HttpMeta, HttpMeta & { error?: FetchBaseQueryError }> => {
  if (error) return err({ ...input, error });
  return ok(input);
};

export const logHttpOutcome = (
  outcome: Result<HttpMeta, HttpMeta & { error?: FetchBaseQueryError }>,
) => {
  const base = isOk(outcome) ? outcome.value : outcome.error;

  // minimal shape to avoid leaking payloads; telemetry layer handles enablement
  void sendMetricTelemetry('http.request', {
    url: base.url,
    method: base.method,
    status: base.status,
    durationMs: base.durationMs,
    success: isOk(outcome),
  });
};
