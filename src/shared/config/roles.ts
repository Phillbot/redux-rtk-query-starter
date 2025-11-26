import { isOneOf } from 'handy-ts-tools';

export type AppRole = 'guest' | 'user' | 'admin';

const ALLOWED_ROLES = ['guest', 'user', 'admin'] as const satisfies readonly AppRole[];

// Stub for now: replace with real auth-derived role (e.g., from tokens/profile).
export const getCurrentRole = (): AppRole => {
  const persisted = localStorage.getItem('app_role');
  return isOneOf(persisted, ALLOWED_ROLES) ? persisted : 'guest';
};

export const EVERYONE: AppRole[] = [...ALLOWED_ROLES];
