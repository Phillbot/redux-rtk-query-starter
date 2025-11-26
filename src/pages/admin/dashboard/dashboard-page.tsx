import styles from './dashboard-page.module.scss';

export const DashboardPage = () => {
  return (
    <section className={styles.dashboard}>
      <h1 className={styles.dashboardTitle}>Admin dashboard</h1>
      <p className={styles.dashboardText}>This is a placeholder admin page.</p>
    </section>
  );
};
