import type { ReactNode } from 'react';
import { AppLayout } from './AppLayout';
import styles from './CanvasLayout.module.scss';

interface CanvasLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  header?: ReactNode;
}

export function CanvasLayout({ children, sidebar, header }: CanvasLayoutProps) {
  return (
    <AppLayout>
      <div className={styles.wrapper}>
        {header && <div className={styles.header}>{header}</div>}
        <div className={styles.body}>
          <div className={styles.canvasArea}>{children}</div>
          {sidebar && <aside className={styles.sidebar}>{sidebar}</aside>}
        </div>
      </div>
    </AppLayout>
  );
}
