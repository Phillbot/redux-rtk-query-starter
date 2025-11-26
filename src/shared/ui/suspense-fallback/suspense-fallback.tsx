import styles from './suspense-fallback.module.scss';

export const SuspenseFallback = () => {
  return (
    <div className={styles.suspenseFallback}>
      <div className={styles.suspenseFallbackSpinner} />
      <span>Loading…</span>
    </div>
  );
};
