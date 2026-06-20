import { motion } from 'framer-motion';
import type { ScalingStage } from '@/types';
import styles from './EvolutionTimeline.module.scss';

interface EvolutionTimelineProps {
  stages: ScalingStage[];
  activeStage: number;
  onSelectStage: (stage: number) => void;
}

export function EvolutionTimeline({ stages, activeStage, onSelectStage }: EvolutionTimelineProps) {
  return (
    <div className={styles.timeline}>
      {stages.map((stage, index) => (
        <motion.button
          key={stage.stage}
          type="button"
          className={`${styles.item} ${activeStage === stage.stage ? styles.active : ''}`}
          onClick={() => onSelectStage(stage.stage)}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <div className={styles.marker}>
            <span className={styles.stageNum}>{stage.stage}</span>
            {index < stages.length - 1 && <span className={styles.line} />}
          </div>
          <div className={styles.content}>
            <span className={styles.title}>{stage.title}</span>
            <span className={styles.users}>{stage.userCount}</span>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
