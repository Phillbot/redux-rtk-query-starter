import { Link } from 'react-router-dom';

import { RoutePath } from '@/shared/config';

import styles from './not-found-page.module.scss';

export const NotFoundPage = () => {
  return (
    <section className={styles.notFound}>
      <h1 className={styles.notFoundTitle}>404</h1>
      <p className={styles.notFoundText}>Page not found</p>
      <Link className={styles.notFoundLink} to={RoutePath.home}>
        Back to home
      </Link>
    </section>
  );
};
