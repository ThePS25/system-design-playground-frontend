import { motion, AnimatePresence } from 'framer-motion';
import { useFailureStore } from '@/store';
import styles from './ImpactPanel.module.scss';

export function ImpactPanel() {
  const analysis = useFailureStore((s) => s.analysis);
  const failedComponents = useFailureStore((s) => s.failedComponents);

  if (failedComponents.length === 0) {
    return (
      <div className={styles.panel}>
        <h3 className={styles.title}>Impact Analysis</h3>
        <p className={styles.empty}>Toggle a component failure to see user and system impact.</p>
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      <h3 className={styles.title}>Impact Analysis</h3>

      <div className={styles.summary}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{analysis?.downCount ?? 0}</span>
          <span className={styles.statLabel}>Down</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{analysis?.degradedCount ?? 0}</span>
          <span className={styles.statLabel}>Degraded</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{failedComponents.length}</span>
          <span className={styles.statLabel}>Failures</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={failedComponents.join(',')}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          <ImpactSection title="User-Facing Impact" items={analysis?.userFacingImpacts ?? []} variant="user" />
          <ImpactSection title="Internal Impact" items={analysis?.internalImpacts ?? []} variant="internal" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ImpactSection({
  title,
  items,
  variant,
}: {
  title: string;
  items: string[];
  variant: 'user' | 'internal';
}) {
  if (items.length === 0) return null;

  return (
    <section className={styles.section}>
      <h4 className={styles.sectionTitle}>{title}</h4>
      <ul className={styles.list}>
        {items.map((item, i) => (
          <li key={i} className={variant === 'user' ? styles.userItem : styles.internalItem}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
