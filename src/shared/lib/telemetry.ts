import { telemetryConfig } from '@/shared/config/telemetry';

type TelemetryPayload = Readonly<{
  type: 'error' | 'metric';
  name: string;
  data?: Record<string, unknown>;
}>;

const shouldConsoleFallback = import.meta.env.DEV;

const send = async (payload: TelemetryPayload) => {
  const consoleMessage = `[telemetry:${payload.type}] ${payload.name}`;

  if (!telemetryConfig.enabled || !telemetryConfig.url) {
    if (shouldConsoleFallback) {
      // keep console output minimal but useful
      console.info(consoleMessage, payload.data);
    }
    return;
  }
  const body = JSON.stringify({
    ...payload,
    timestamp: new Date().toISOString(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
  });

  try {
    if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
      navigator.sendBeacon(telemetryConfig.url, body);
      return;
    }
    await fetch(telemetryConfig.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    });
  } catch {
    if (shouldConsoleFallback) {
      console.info(`${consoleMessage} (telemetry send failed)`, payload.data);
    }
    // swallow telemetry failures to avoid impacting UX
  }
};

export const sendErrorTelemetry = (message: string, data?: Record<string, unknown>) =>
  send({ type: 'error', name: message, data });

export const sendMetricTelemetry = (name: string, data?: Record<string, unknown>) =>
  send({ type: 'metric', name, data });

export const telemetry = {
  sendErrorTelemetry,
  sendMetricTelemetry,
};
