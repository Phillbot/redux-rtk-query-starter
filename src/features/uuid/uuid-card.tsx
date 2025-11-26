import { useEffect } from 'react';

import { Button } from '@/shared/ui';
import { cn, isSome } from '@/shared/lib';
import { useUuid } from '@/state';

import styles from './uuid-card.module.scss';

export const UuidCard = () => {
  const { dataOption, isError, isLoading, isFetching, isUninitialized, fetchUuid } = useUuid();

  useEffect(() => {
    void fetchUuid();
  }, [fetchUuid]);

  const isChecking = isLoading || isFetching || isUninitialized;
  const statusLabel = isChecking ? 'Fetching…' : isError ? 'Error' : 'Ready';

  return (
    <div className={styles.uuidCard}>
      <div className={styles.uuidCardTitle}>
        <span>UUID fetch (RTK Query)</span>
        <span className={cn(styles.uuidCardStatus, isError && styles.uuidCardStatusError)}>
          {statusLabel}
        </span>
      </div>
      <div className={styles.uuidCardValue}>
        {isSome(dataOption) ? dataOption.value.uuid : '—'}
      </div>
      <Button
        variant="outline"
        onClick={() => {
          if (isChecking) return;
          void fetchUuid();
        }}
        disabled={isChecking}
      >
        {isChecking ? 'Fetching...' : 'Refresh UUID'}
      </Button>
    </div>
  );
};
