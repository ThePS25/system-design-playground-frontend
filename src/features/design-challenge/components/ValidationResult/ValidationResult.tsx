import { motion, AnimatePresence } from 'framer-motion';
import { useChallengeStore } from '@/store';
import { Badge } from '@/components/ui';
import styles from './ValidationResult.module.scss';

export function ValidationResultPanel() {
  const result = useChallengeStore((s) => s.validationResult);

  if (!result) {
    return (
      <div className={styles.panel}>
        <p className={styles.empty}>Build your architecture and click Validate to get scored.</p>
      </div>
    );
  }

  const gradeVariant =
    result.grade === 'A' || result.grade === 'B'
      ? 'success'
      : result.grade === 'C'
        ? 'warning'
        : 'danger';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={result.score}
        className={styles.panel}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        <div className={styles.scoreHeader}>
          <div>
            <span className={styles.scoreLabel}>Architecture Score</span>
            <span className={styles.score}>
              {result.score} <span>/ {result.maxScore}</span>
            </span>
          </div>
          <Badge variant={gradeVariant}>Grade {result.grade}</Badge>
        </div>

        {result.correct.length > 0 && (
          <ScoreSection title="Correct" items={result.correct} variant="success" />
        )}
        {result.missing.length > 0 && (
          <ScoreSection title="Missing" items={result.missing} variant="missing" />
        )}
        {result.optional.length > 0 && (
          <ScoreSection title="Bonus" items={result.optional} variant="bonus" />
        )}
        {result.antiPatternsFound.length > 0 && (
          <ScoreSection title="Anti-patterns" items={result.antiPatternsFound} variant="danger" />
        )}

        {result.feedback.length > 0 && (
          <div className={styles.feedback}>
            <h4>Feedback</h4>
            <ul>
              {result.feedback.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

function ScoreSection({
  title,
  items,
  variant,
}: {
  title: string;
  items: { label: string; reason: string; points: number }[];
  variant: 'success' | 'missing' | 'bonus' | 'danger';
}) {
  return (
    <div className={styles.section}>
      <h4>{title}</h4>
      <ul className={styles[variant]}>
        {items.map((item, i) => (
          <li key={i}>
            <span className={styles.itemLabel}>
              {variant === 'success' || variant === 'bonus' ? '✓' : '✗'} {item.label}
            </span>
            <span className={styles.itemReason}>{item.reason}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
