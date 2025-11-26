import { isErrorLike } from 'handy-ts-tools';

import { sendErrorTelemetry } from '@/shared/lib/telemetry';

type ErrorReporter = (error: unknown, context?: Record<string, unknown>) => void;

const logToConsole: ErrorReporter = (error, context) => {
  // centralized error reporter
  console.error('App error:', error, context);
};

let reporter: ErrorReporter = logToConsole;

export const setErrorReporter = (custom: ErrorReporter) => {
  reporter = custom;
};

export const reportError = (error: unknown, context?: Record<string, unknown>) => {
  const payload = isErrorLike(error) ? error : new Error('Unknown error');
  void sendErrorTelemetry(payload.message, { ...context, stack: payload.stack });
  reporter(payload, context);
};
