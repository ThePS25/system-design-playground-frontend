import { Link, useParams } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout';
import { Badge } from '@/components/ui';
import { TermDetail } from '../components/TermDetail';
import {
  getCategoryMeta,
  getTerm,
  isGlossaryCategory,
} from '../utils/glossaryHelpers';
import { ROUTES } from '@/routes/paths';
import styles from './GlossaryTermPage.module.scss';

export function GlossaryTermPage() {
  const { category = '', slug = '' } = useParams();

  if (!isGlossaryCategory(category)) {
    return (
      <AppLayout>
        <div className={styles.page}>
          <p className={styles.error}>Glossary section not found.</p>
          <Link to={ROUTES.glossary} className={styles.back}>← Back to Glossary</Link>
        </div>
      </AppLayout>
    );
  }

  const term = getTerm(category, slug);
  const meta = getCategoryMeta(category);

  return (
    <AppLayout>
      <div className={styles.page}>
        <Link to={ROUTES.glossaryCategory(category)} className={styles.back}>
          ← Back to {meta.title}
        </Link>

        {!term ? (
          <p className={styles.error}>Term not found.</p>
        ) : (
          <>
            <header className={styles.header}>
              <div>
                <h1>{term.name}</h1>
                <p>{term.shortDefinition}</p>
              </div>
              <Badge variant="primary">{meta.subtitle}</Badge>
            </header>

            <TermDetail term={term} />
          </>
        )}
      </div>
    </AppLayout>
  );
}
