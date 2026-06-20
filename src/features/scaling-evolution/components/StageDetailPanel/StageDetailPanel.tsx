import { motion, AnimatePresence } from 'framer-motion';
import type { ScalingStage } from '@/types';
import { Badge } from '@/components/ui';
import styles from './StageDetailPanel.module.scss';

interface StageDetailPanelProps {
  stage: ScalingStage | null;
}

export function StageDetailPanel({ stage }: StageDetailPanelProps) {
  if (!stage) {
    return (
      <div className={styles.panel}>
        <p className={styles.empty}>Select a stage to view details.</p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stage.stage}
        className={styles.panel}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
      >
        <div className={styles.header}>
          <Badge variant="primary">Stage {stage.stage}</Badge>
          <h2>{stage.title}</h2>
          <p className={styles.users}>{stage.userCount}</p>
        </div>

        <Section title="Description" content={stage.description} />
        <Section title="Traffic" content={stage.newTraffic} />

        <div className={styles.section}>
          <h3>Bottlenecks</h3>
          <ul>
            {stage.bottlenecks.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>

        <Section title="Scaling Solution" content={stage.scalingSolution} highlight />
        <Section title="Why Previous Failed" content={stage.whyPreviousFailed} />
      </motion.div>
    </AnimatePresence>
  );
}

function Section({
  title,
  content,
  highlight,
}: {
  title: string;
  content: string;
  highlight?: boolean;
}) {
  return (
    <div className={`${styles.section} ${highlight ? styles.highlight : ''}`}>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}
