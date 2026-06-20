import { Link } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout';
import { Card, Badge } from '@/components/ui';
import { useTemplates } from '@/hooks/useTemplates';
import { ROUTES } from '@/routes/paths';
import styles from './ExplorerListPage.module.scss';

export function ExplorerListPage() {
  const { data: templates, isLoading, error } = useTemplates();

  return (
    <AppLayout>
      <div className={styles.page}>
        <header className={styles.header}>
          <h1>Architecture Explorer</h1>
          <p>Browse reference architectures from top tech companies</p>
        </header>

        {isLoading && <p className={styles.status}>Loading templates...</p>}
        {error && <p className={styles.error}>Failed to load templates. Is the API running?</p>}

        <div className={styles.grid}>
          {templates?.map((template) => (
            <Link key={template.id} to={ROUTES.explorerDetail(template.slug)}>
              <Card hover padding="lg" className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3>{template.name}</h3>
                  <Badge variant="primary">{template.difficulty}</Badge>
                </div>
                <p className={styles.tagline}>{template.tagline}</p>
                <p className={styles.desc}>{template.description}</p>
                <div className={styles.tags}>
                  {template.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                <span className={styles.stages}>{template.stageCount} scaling stages</span>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
