import { isString } from 'handy-ts-tools';

const parseBooleanEnv = (value: unknown): boolean => {
  if (!isString(value)) return false;
  const normalized = value.trim().toLowerCase();
  return normalized === 'true';
};

const telemetryUrl = isString(import.meta.env.VITE_TELEMETRY_URL)
  ? import.meta.env.VITE_TELEMETRY_URL.trim()
  : undefined;

const telemetryEnabled = parseBooleanEnv(import.meta.env.VITE_TELEMETRY_ENABLED) && Boolean(telemetryUrl);
const webVitalsEnabled = parseBooleanEnv(import.meta.env.VITE_WEB_VITALS_ENABLED);

export const telemetryConfig = {
  enabled: telemetryEnabled,
  url: telemetryUrl,
  webVitalsEnabled,
};
