import { isPlainObject, isString } from 'handy-ts-tools';

import { pickStringRecord } from '@/shared/lib';

import type { HttpBinResponse } from './types';

export const mapHttpBinResponse = (raw: unknown): HttpBinResponse => {
  if (!isPlainObject(raw) || !isString(raw.url)) return { url: 'unknown' };

  return {
    url: raw.url,
    args: pickStringRecord(raw.args),
    headers: pickStringRecord(raw.headers),
    origin: isString(raw.origin) ? raw.origin : undefined,
  };
};
