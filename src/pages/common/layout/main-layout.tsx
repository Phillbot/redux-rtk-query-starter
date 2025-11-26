import { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { LANG_OPTIONS, NAV_LINKS, SUPPORTED_LANGS, type SupportedLang } from '@/shared/config';
import { cn } from '@/shared/lib/cn';
import { parseAsString, useQueryState } from '@/shared/lib/query';
import { storage } from '@/shared/lib/storage';

import styles from './main-layout.module.scss';

export const MainLayout = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useQueryState('lang', parseAsString);

  const normalize = (value: string | null | undefined): SupportedLang | undefined => {
    if (!value) return undefined;
    const code = value.split('-')[0];
    return SUPPORTED_LANGS.includes(code as SupportedLang) ? (code as SupportedLang) : undefined;
  };

  const stored = normalize(storage.get('app_lang'));
  const browser = normalize(typeof navigator !== 'undefined' ? navigator.language : undefined);
  const current = normalize(lang);
  const bestLang = current ?? stored ?? browser ?? 'en';

  useEffect(() => {
    if (!current || current !== bestLang) {
      void setLang(bestLang, { history: 'replace' });
    }
    if (i18n.language !== bestLang) {
      void i18n.changeLanguage(bestLang);
    }
    storage.set('app_lang', bestLang);
  }, [bestLang, current, i18n, setLang]);

  const renderLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(styles.mainLayoutLink, 'uppercase text-sm font-semibold tracking-wide', {
      [styles.mainLayoutLinkActive]: isActive,
    });

  return (
    <div className={cn(styles.mainLayout, 'text-base-dark')}>
      <header className={cn(styles.mainLayoutHeader, 'shadow-lg')}>
        <span className={styles.mainLayoutLogo}>{t('layout.title')}</span>
        <nav className={styles.mainLayoutNav}>
          {NAV_LINKS.map(({ labelKey, path }) => (
            <NavLink key={path} to={path} className={renderLinkClass}>
              {t(labelKey)}
            </NavLink>
          ))}
        </nav>
        <select
          className={styles.mainLayoutLangSwitcher}
          value={bestLang}
          onChange={(e) => {
            const nextLang = e.target.value;
            void i18n.changeLanguage(nextLang);
            void setLang(nextLang);
            storage.set('app_lang', nextLang);
          }}
        >
          {LANG_OPTIONS.map((language) => (
            <option key={language.code} value={language.code}>
              {language.label}
            </option>
          ))}
        </select>
      </header>

      <main className={styles.mainLayoutMain}>
        <Outlet />
      </main>
    </div>
  );
};
