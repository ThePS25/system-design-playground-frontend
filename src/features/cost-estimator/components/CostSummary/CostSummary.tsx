import { useCostStore } from '@/store';
import styles from './CostSummary.module.scss';

export function CostSummary() {
  const estimate = useCostStore((s) => s.estimate);

  if (!estimate) {
    return (
      <div className={styles.summary}>
        <p className={styles.empty}>Configure infrastructure and calculate to see estimates.</p>
      </div>
    );
  }

  return (
    <div className={styles.summary}>
      <div className={styles.cards}>
        <div className={styles.card}>
          <span className={styles.label}>Monthly</span>
          <span className={styles.amount}>
            ${estimate.monthly.total.toLocaleString()}
            <small>/mo</small>
          </span>
        </div>
        <div className={styles.card}>
          <span className={styles.label}>Yearly</span>
          <span className={styles.amount}>
            ${estimate.yearly.total.toLocaleString()}
            <small>/yr</small>
          </span>
        </div>
      </div>

      <h4 className={styles.breakdownTitle}>Breakdown</h4>
      <ul className={styles.breakdown}>
        {estimate.breakdown.map((item) => (
          <li key={item.component}>
            <div className={styles.row}>
              <span>{item.component}</span>
              <span>${item.monthlyCost.toLocaleString()}/mo</span>
            </div>
            <div className={styles.barTrack}>
              <div
                className={styles.barFill}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
            <span className={styles.meta}>
              {item.units} {item.unitType} × ${item.unitPrice} ({item.percentage}%)
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
