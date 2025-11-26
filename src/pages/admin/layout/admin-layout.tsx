import { Outlet } from 'react-router-dom';

import styles from './admin-layout.module.scss';

export const AdminLayout = () => (
  <div className={styles.adminLayout}>
    <header className={styles.adminLayoutHeader}>
      <span className={styles.adminLayoutLogo}>Admin area</span>
    </header>
    <main className={styles.adminLayoutMain}>
      <Outlet />
    </main>
  </div>
);

