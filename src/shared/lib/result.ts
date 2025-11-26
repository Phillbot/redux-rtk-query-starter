export type Option<T> =
  | { kind: 'some'; value: T }
  | { kind: 'none' };

export type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E };

export const some = <T>(value: T): Option<T> => ({ kind: 'some', value });
export const none = <T = never>(): Option<T> => ({ kind: 'none' });
export const isSome = <T>(option: Option<T>): option is { kind: 'some'; value: T } =>
  option.kind === 'some';
export const optionFromNullable = <T>(value: T | null | undefined): Option<NonNullable<T>> =>
  value == null ? none() : some(value);

export const ok = <T>(value: T): Result<T, never> => ({ ok: true, value });
export const err = <E>(error: E): Result<never, E> => ({ ok: false, error });
export const isOk = <T, E>(result: Result<T, E>): result is { ok: true; value: T } => result.ok;
