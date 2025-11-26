import styles from './about-page.module.scss';

export const AboutPage = () => {
  return (
    <section className={styles.about}>
      <div className={styles.aboutHeader}>
        <p className={styles.aboutTag}>Starter kit</p>
        <h1 className={styles.aboutTitle}>Minimal stack, modular layout</h1>
        <p className={styles.aboutDescription}>
          Redux Toolkit + RTK Query + React Router + Vite — with facades, feature flags, and clear separation between
          pages, features, state, and shared layers.
        </p>
      </div>

      <div className={styles.aboutGrid}>
        <div className={styles.aboutCard}>
          <h2 className={styles.aboutCardTitle}>Architecture</h2>
          <ul className={styles.aboutList}>
            <li className={styles.aboutListItem}>app — shell, providers, router, global styles</li>
            <li className={styles.aboutListItem}>pages — route screens (common/admin)</li>
            <li className={styles.aboutListItem}>features — reusable domain blocks (counter, health, uuid)</li>
            <li className={styles.aboutListItem}>state — adapter hooks over Redux/RTK Query</li>
            <li className={styles.aboutListItem}>shared — UI kit, helpers, configs, dev-tools</li>
          </ul>
        </div>

        <div className={styles.aboutCard}>
          <h2 className={styles.aboutCardTitle}>Highlights</h2>
          <ul className={styles.aboutList}>
            <li className={styles.aboutListItem}>Facades for state/features/shared + lint guards</li>
            <li className={styles.aboutListItem}>Feature flags with dev panel and local overrides</li>
            <li className={styles.aboutListItem}>Zod for env, nuqs for query params</li>
            <li className={styles.aboutListItem}>DTO → domain mappers, Option/Result contracts</li>
          </ul>
        </div>

        <div className={styles.aboutCard}>
          <h2 className={styles.aboutCardTitle}>Replaceable state</h2>
          <p className={styles.aboutBlurb}>
            Public hooks in <code>@/state</code> act as adapters. Swap Redux/RTK Query for Zustand/React Query by
            keeping the same hook contracts.
          </p>
          <p className={styles.aboutBlurb}>
            See <code>docs/state-migration.md</code> for a checklist. DTO mappers/types stay reusable.
          </p>
        </div>
      </div>
    </section>
  );
};
