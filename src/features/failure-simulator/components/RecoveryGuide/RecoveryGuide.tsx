import { useFailureStore } from '@/store';
import styles from './RecoveryGuide.module.scss';

export function RecoveryGuide() {
  const analysis = useFailureStore((s) => s.analysis);
  const failedComponents = useFailureStore((s) => s.failedComponents);

  if (failedComponents.length === 0 || !analysis) return null;

  return (
    <div className={styles.guide}>
      <h3 className={styles.title}>Recovery & Mitigation</h3>

      {analysis.recoveryMechanisms.length > 0 && (
        <section className={styles.section}>
          <h4>Recovery Mechanisms</h4>
          <ul>
            {analysis.recoveryMechanisms.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {analysis.industryMitigations.length > 0 && (
        <section className={styles.section}>
          <h4>Industry Mitigations</h4>
          <ul>
            {analysis.industryMitigations.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
