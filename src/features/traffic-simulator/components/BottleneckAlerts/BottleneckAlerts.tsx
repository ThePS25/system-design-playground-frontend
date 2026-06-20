import { useSimulationStore } from '@/store';
import { Badge } from '@/components/ui';
import styles from './BottleneckAlerts.module.scss';

const SEVERITY_VARIANT: Record<string, 'danger' | 'warning' | 'default'> = {
  critical: 'danger',
  high: 'danger',
  medium: 'warning',
  low: 'default',
};

export function BottleneckAlerts() {
  const result = useSimulationStore((s) => s.result);

  if (!result) return null;

  if (result.bottlenecks.length === 0) {
    return (
      <div className={styles.section}>
        <h3 className={styles.title}>Bottlenecks</h3>
        <p className={styles.clear}>No bottlenecks detected at this traffic level.</p>
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <h3 className={styles.title}>Bottlenecks ({result.bottlenecks.length})</h3>
      <ul className={styles.list}>
        {result.bottlenecks.map((bottleneck, index) => (
          <li key={`${bottleneck.type}-${index}`} className={styles.item}>
            <div className={styles.itemHeader}>
              <span className={styles.itemLabel}>{bottleneck.label}</span>
              <Badge variant={SEVERITY_VARIANT[bottleneck.severity] ?? 'default'}>
                {bottleneck.severity}
              </Badge>
            </div>
            <p className={styles.desc}>{bottleneck.description}</p>
            <p className={styles.rec}>{bottleneck.recommendation}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
