import { z } from 'zod';

import type { UuidResponse } from './types';

const uuidSchema = z.object({
  uuid: z.string().uuid(),
});

export const mapUuidResponse = (raw: unknown): UuidResponse => {
  const parsed = uuidSchema.safeParse(raw);
  if (!parsed.success) {
    return { uuid: 'unknown' };
  }
  return parsed.data;
};
