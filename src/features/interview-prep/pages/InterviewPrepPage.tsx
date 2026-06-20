import { Link } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout';
import { useComponents } from '@/hooks/useComponents';
import { Card, Badge } from '@/components/ui';
import { ROUTES } from '@/routes/paths';
import styles from './InterviewPrepPage.module.scss';

export function InterviewPrepPage() {
  const { data: components, isLoading, error } = useComponents();

  return (
    <AppLayout>
      <div className={styles.page}>
        <header className={styles.header}>
          <h1>Interview Preparation</h1>
          <p>Study component deep-dives and common interview questions</p>
        </header>

        {isLoading && <p className={styles.status}>Loading components...</p>}
        {error && <p className={styles.error}>Failed to load components. Is the API running?</p>}

        <div className={styles.grid}>
          {components?.map((component) => (
            <Link key={component.id} to={ROUTES.interviewDetail(component.slug)}>
              <Card hover padding="lg" className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3>{component.name}</h3>
                  <Badge variant="primary">{component.category}</Badge>
                </div>
                <p className={styles.purpose}>{component.purpose}</p>
                <span className={styles.count}>
                  {component.interviewQuestionCount} interview questions
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
