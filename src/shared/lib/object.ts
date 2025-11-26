import { isPlainObject, isString } from 'handy-ts-tools';

export const pickStringRecord = (value: unknown): Record<string, string> | undefined => {
  if (!isPlainObject(value)) return undefined;
  const entries = Object.entries(value).filter(([, v]) => isString(v));
  return entries.length ? Object.fromEntries(entries as [string, string][]) : undefined;
};
