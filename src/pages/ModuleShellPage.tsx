import { AppLayout } from '@/layouts/AppLayout';
import styles from './ModuleShellPage.module.scss';

interface ModuleShellPageProps {
  title: string;
  description: string;
  icon: string;
  phase: number;
}

export function ModuleShellPage({ title, description, icon, phase }: ModuleShellPageProps) {
  return (
    <AppLayout>
      <div className={styles.page}>
        <div className={styles.content}>
          <span className={styles.icon}>{icon}</span>
          <h1>{title}</h1>
          <p>{description}</p>
          <span className={styles.badge}>Coming in Phase {phase}</span>
        </div>
      </div>
    </AppLayout>
  );
}
