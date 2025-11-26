import { useCounter } from '@/state';
import { Button } from '@/shared/ui';

import styles from './counter-panel.module.scss';

export const CounterPanel = () => {
  const { value, increment, decrement, reset } = useCounter();

  return (
    <div className={styles.counterPanel}>
      <span className={styles.counterPanelLabel}>Redux counter</span>
      <strong className={styles.counterPanelValue}>{value}</strong>
      <div className={styles.counterPanelControls}>
        <Button variant="outline" onClick={decrement}>
          -1
        </Button>
        <Button variant="ghost" disabled={!value} onClick={reset}>
          Reset
        </Button>
        <Button onClick={increment}>+1</Button>
      </div>
    </div>
  );
};
