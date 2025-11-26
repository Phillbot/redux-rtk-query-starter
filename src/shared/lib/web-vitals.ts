import { type Metric, onCLS, onINP, onLCP, onTTFB } from 'web-vitals';

import { telemetryConfig } from '@/shared/config/telemetry';

import { sendMetricTelemetry } from './telemetry';

type WebVitalMetric = Readonly<{
  name: string;
  value: number;
  id?: string;
}>;

const shouldCapture =
  telemetryConfig.enabled &&
  telemetryConfig.webVitalsEnabled &&
  Boolean(telemetryConfig.url) &&
  !import.meta.env.DEV;

const sendMetric = (metric: WebVitalMetric) => {
  void sendMetricTelemetry(`web-vitals.${metric.name}`, {
    value: metric.value,
    id: metric.id,
  });
};

export const initWebVitals = () => {
  if (!shouldCapture) return;
  const handler = (metric: Metric) => {
    sendMetric({ name: metric.name, value: metric.value, id: metric.id });
  };

  onCLS(handler);
  onLCP(handler);
  onINP(handler);
  onTTFB(handler);
};
