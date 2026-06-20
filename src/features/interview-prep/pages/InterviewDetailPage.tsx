import { Link, useParams } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout';
import { Badge } from '@/components/ui';
import { ComponentDetailView } from '../components/ComponentDetail';
import { useComponent } from '@/hooks/useComponents';
import { ROUTES } from '@/routes/paths';
import styles from './InterviewDetailPage.module.scss';

export function InterviewDetailPage() {
  const { slug = '' } = useParams();
  const { data: component, isLoading, error } = useComponent(slug);

  return (
    <AppLayout>
      <div className={styles.page}>
        <Link to={ROUTES.interview} className={styles.back}>
          ← Back to Interview Prep
        </Link>

        {isLoading && <p className={styles.status}>Loading component...</p>}
        {error && <p className={styles.error}>Failed to load component. Is the API running?</p>}
        {!isLoading && !error && !component && (
          <p className={styles.error}>Component not found.</p>
        )}

        {component && (
          <>
            <header className={styles.header}>
              <div>
                <h1>{component.name}</h1>
                <p>{component.purpose}</p>
              </div>
              <Badge variant="primary">{component.category}</Badge>
            </header>

            <ComponentDetailView component={component} />
          </>
        )}
      </div>
    </AppLayout>
  );
}
