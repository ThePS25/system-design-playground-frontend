import { useSimulationStore } from '@/store';
import { Button } from '@/components/ui';
import styles from './TrafficControls.module.scss';

const RPS_LEVELS = [
  { value: 100, label: '100' },
  { value: 1000, label: '1K' },
  { value: 10000, label: '10K' },
  { value: 100000, label: '100K' },
  { value: 1000000, label: '1M' },
] as const;

interface TrafficControlsProps {
  onRun: () => void;
  isRunning: boolean;
}

export function TrafficControls({ onRun, isRunning }: TrafficControlsProps) {
  const rps = useSimulationStore((s) => s.rps);
  const setRps = useSimulationStore((s) => s.setRps);

  return (
    <div className={styles.controls}>
      <div className={styles.group}>
        <span className={styles.label}>Traffic Level (RPS)</span>
        <div className={styles.levels}>
          {RPS_LEVELS.map((level) => (
            <button
              key={level.value}
              type="button"
              className={`${styles.level} ${rps === level.value ? styles.active : ''}`}
              onClick={() => setRps(level.value)}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>
      <Button onClick={onRun} loading={isRunning} size="md">
        Run Simulation
      </Button>
    </div>
  );
}
