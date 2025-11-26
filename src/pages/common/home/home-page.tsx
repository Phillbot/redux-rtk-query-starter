import { useTranslation } from 'react-i18next';

import { CounterPanel, HealthCard, UuidCard } from '@/features';
import { cn } from '@/shared/lib/cn';

import styles from './home-page.module.scss';

export const HomePage = () => {
  const { t } = useTranslation();

  return (
    <section className={cn(styles.home, 'mx-auto max-w-5xl')}>
      <div className={cn(styles.homeHeading, 'md:text-xl')}>
        <p>{t('home.heading')}</p>
        <p className="text-sm opacity-90 md:text-base">{t('home.subheading')}</p>
      </div>

      <div className={styles.homeSections}>
        <CounterPanel />
        <HealthCard />
        <UuidCard />
      </div>

      <p className={styles.homeNote}>{t('home.note')}</p>
    </section>
  );
};
