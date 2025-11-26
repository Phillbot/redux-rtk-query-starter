import { useEffect } from 'react';

import { Button } from '@/shared/ui';
import { cn, isSome } from '@/shared/lib';
import { useHealthCheck } from '@/state';

import styles from './health-card.module.scss';

export const HealthCard = () => {
  const { dataOption, isError, isLoading, isFetching, isUninitialized, refetch } = useHealthCheck();

  useEffect(() => {
    void refetch();
  }, [refetch]);

  const isChecking = isLoading || isFetching || isUninitialized;
  const statusLabel = isChecking ? 'Checking…' : isError ? 'Unavailable' : 'All systems green';
  const statusClass = cn(styles.healthCardStatus, {
    [styles.healthCardStatusLoading]: isChecking,
    [styles.healthCardStatusError]: isError,
    [styles.healthCardStatusOk]: isSome(dataOption) && !isChecking && !isError,
  });

  return (
    <div className={styles.healthCard}>
      <div className={styles.healthCardTitle}>
        <span>Health check (RTK Query)</span>
        <span className={statusClass}>{statusLabel}</span>
      </div>

      <div className={styles.healthCardMeta}>
        <div>
          <div className={styles.healthCardMetaLabel}>Latency</div>
          <strong>{isSome(dataOption) ? `${dataOption.value.latency}ms` : '—'}</strong>
        </div>
        <div>
          <div className={styles.healthCardMetaLabel}>Last check</div>
          <strong>
            {isSome(dataOption) ? new Date(dataOption.value.checkedAt).toLocaleTimeString() : 'Not yet'}
          </strong>
        </div>
      </div>

      <Button
        variant="outline"
        onClick={() => {
          if (isChecking) return;
          void refetch();
        }}
        disabled={isChecking}
      >
        {isChecking ? 'Pinging...' : 'Re-run check'}
      </Button>
    </div>
  );
};
