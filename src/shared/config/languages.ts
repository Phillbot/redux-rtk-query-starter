import { SUPPORTED_LANGS, type SupportedLang } from './i18n';

export const LANG_OPTIONS = SUPPORTED_LANGS.map((code) => ({
  code,
  label: code.toUpperCase(),
})) satisfies ReadonlyArray<{ code: SupportedLang; label: string }>;
