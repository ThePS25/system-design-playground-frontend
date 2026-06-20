import type { ReactNode } from 'react';
import styles from './Badge.module.scss';

type Variant = 'default' | 'primary' | 'success' | 'warning' | 'danger';

interface BadgeProps {
  children: ReactNode;
  variant?: Variant;
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return <span className={`${styles.badge} ${styles[variant]}`}>{children}</span>;
}
