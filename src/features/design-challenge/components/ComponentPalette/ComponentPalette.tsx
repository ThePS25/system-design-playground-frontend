import { useComponents } from '@/hooks/useComponents';
import { useFlowStore } from '@/store';
import styles from './ComponentPalette.module.scss';

const PALETTE_SLUGS = [
  'load-balancer',
  'api-gateway',
  'application-server',
  'redis',
  'database',
  'read-replica',
  'cdn',
  'queue',
  'kafka',
  'object-storage',
  'search-service',
  'notification-service',
  'dns',
];

export function ComponentPalette() {
  const { data: components } = useComponents();
  const addComponentNode = useFlowStore((s) => s.addComponentNode);
  const selectedNodeId = useFlowStore((s) => s.selectedNodeId);
  const removeNode = useFlowStore((s) => s.removeNode);

  const paletteComponents =
    components?.filter((c) => PALETTE_SLUGS.includes(c.slug)) ?? [];

  return (
    <div className={styles.palette}>
      <h3 className={styles.title}>Components</h3>
      <p className={styles.hint}>Click to add · Select node + Delete to remove</p>
      <div className={styles.grid}>
        {paletteComponents.map((component) => (
          <button
            key={component.slug}
            type="button"
            className={styles.chip}
            onClick={() => addComponentNode(component.slug, component.name)}
          >
            {component.name}
          </button>
        ))}
      </div>
      {selectedNodeId && (
        <button
          type="button"
          className={styles.deleteBtn}
          onClick={() => removeNode(selectedNodeId)}
        >
          Remove selected node
        </button>
      )}
    </div>
  );
}
