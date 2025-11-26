import { isErrorLike } from 'handy-ts-tools';

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
  reporter(payload, context);
};
