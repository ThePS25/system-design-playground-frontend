import { motion } from 'framer-motion';
import { useFailureStore } from '@/store';
import { Button } from '@/components/ui';
import { PRESET_FAILURES } from '@/services/failure/failureEngine';
import styles from './FailureControls.module.scss';

interface FailureControlsProps {
  availableSlugs: string[];
  onClear: () => void;
}

export function FailureControls({ availableSlugs, onClear }: FailureControlsProps) {
  const failedComponents = useFailureStore((s) => s.failedComponents);
  const toggleFailure = useFailureStore((s) => s.toggleFailure);

  const presets = PRESET_FAILURES.filter((p) => availableSlugs.includes(p.slug));

  return (
    <div className={styles.controls}>
      <div className={styles.group}>
        <span className={styles.label}>Simulate Failures</span>
        <div className={styles.buttons}>
          {presets.map((preset) => {
            const active = failedComponents.includes(preset.slug);
            return (
              <motion.button
                key={preset.slug}
                type="button"
                className={`${styles.chip} ${active ? styles.active : ''}`}
                onClick={() => toggleFailure(preset.slug)}
                whileTap={{ scale: 0.96 }}
                animate={active ? { boxShadow: '0 0 12px rgba(248, 113, 113, 0.35)' } : {}}
              >
                {active ? '✕ ' : ''}{preset.label}
              </motion.button>
            );
          })}
        </div>
      </div>
      {failedComponents.length > 0 && (
        <Button variant="ghost" size="sm" onClick={onClear}>
          Clear all
        </Button>
      )}
    </div>
  );
}
