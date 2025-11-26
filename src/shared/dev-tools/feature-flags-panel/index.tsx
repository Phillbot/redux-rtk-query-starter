import { useMemo, useState } from 'react';

import type { FeatureFlag } from '@/shared/config/feature-flags';
import { useFeatureFlagsContext } from '@/shared/lib';

import styles from './feature-flags-panel.module.scss';

type FlagEntry = Readonly<{
  key: FeatureFlag;
  value: boolean;
}>;

export const FeatureFlagsPanel = () => {
  const { flags, setFlag } = useFeatureFlagsContext();
  const entries = useMemo<FlagEntry[]>(
    () => Object.entries(flags).map(([key, value]) => ({ key: key as FeatureFlag, value })),
    [flags],
  );
  const [open, setOpen] = useState(false);

  if (!import.meta.env.DEV) return null;

  return (
    <div className={styles.featureFlagsPanel}>
      <button
        type="button"
        className={styles.featureFlagsPanelTrigger}
        onClick={() => setOpen((prev) => !prev)}
      >
        Feature flags <span className={styles.featureFlagsPanelChevron}>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className={styles.featureFlagsPanelList}>
          {entries.map(({ key, value }) => (
            <label key={key} className={styles.featureFlagsPanelItem}>
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setFlag(key, e.target.checked)}
              />
              <span>{key}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
