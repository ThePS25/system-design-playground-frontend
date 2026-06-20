import type { ReactNode } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import styles from './AppLayout.module.scss';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
