import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import styles from './UserNode.module.scss';

function UserNodeComponent({ data, selected }: NodeProps) {
  const label = (data as { label: string }).label ?? 'User';

  return (
    <div className={`${styles.node} ${selected ? styles.selected : ''}`}>
      <div className={styles.avatar}>👤</div>
      <span className={styles.label}>{label}</span>
      <Handle type="source" position={Position.Right} className={styles.handle} />
    </div>
  );
}

export const UserNode = memo(UserNodeComponent);
