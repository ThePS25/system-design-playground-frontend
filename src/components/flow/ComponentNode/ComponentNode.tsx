import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import styles from './ComponentNode.module.scss';

const STATUS_COLORS = {
  healthy: '#22C55E',
  degraded: '#F59E0B',
  down: '#EF4444',
};

const CATEGORY_ICONS: Record<string, string> = {
  client: '👤',
  network: '🌐',
  compute: '⚡',
  cache: '💾',
  database: '🗄️',
  messaging: '📨',
  storage: '📦',
  search: '🔍',
  notification: '🔔',
  gateway: '🚪',
};

export interface ComponentNodeData {
  componentId: string;
  label: string;
  status?: 'healthy' | 'degraded' | 'down';
  utilization?: number;
  [key: string]: unknown;
}

function ComponentNodeComponent({ data, selected }: NodeProps) {
  const nodeData = data as ComponentNodeData;
  const status = nodeData.status ?? 'healthy';
  const icon = CATEGORY_ICONS[nodeData.componentId.split('-')[0] ?? ''] ?? '🔧';

  return (
    <div className={`${styles.node} ${styles[status]} ${selected ? styles.selected : ''}`}>
      <Handle type="target" position={Position.Left} className={styles.handle} />
      <div className={styles.icon}>{icon}</div>
      <div className={styles.content}>
        <span className={styles.label}>{nodeData.label}</span>
        {nodeData.utilization !== undefined && (
          <span className={styles.metric}>{nodeData.utilization}%</span>
        )}
      </div>
      <div className={styles.statusDot} style={{ background: STATUS_COLORS[status] }} />
      <Handle type="source" position={Position.Right} className={styles.handle} />
    </div>
  );
}

export const ComponentNode = memo(ComponentNodeComponent);
