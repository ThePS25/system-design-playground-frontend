import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout';
import { Card, Badge } from '@/components/ui';
import {
  getCategoryMeta,
  isGlossaryCategory,
  searchTerms,
} from '../utils/glossaryHelpers';
import { ROUTES } from '@/routes/paths';
import styles from './GlossaryCategoryPage.module.scss';

export function GlossaryCategoryPage() {
  const { category = '' } = useParams();
  const [query, setQuery] = useState('');
  const validCategory = isGlossaryCategory(category) ? category : null;

  const meta = validCategory ? getCategoryMeta(validCategory) : null;
  const terms = useMemo(
    () => (validCategory ? searchTerms(validCategory, query) : []),
    [validCategory, query],
  );

  if (!validCategory || !meta) {
    return (
      <AppLayout>
        <div className={styles.page}>
          <p className={styles.error}>Glossary section not found.</p>
          <Link to={ROUTES.glossary} className={styles.back}>
            ← Back to Glossary
          </Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className={styles.page}>
        <Link to={ROUTES.glossary} className={styles.back}>
          ← Back to Glossary
        </Link>

        <header className={styles.header}>
          <div className={styles.titleRow}>
            <span className={styles.icon}>{meta.icon}</span>
            <div>
              <h1>{meta.title}</h1>
              <p>{meta.description}</p>
            </div>
          </div>
          <Badge variant="primary">{meta.subtitle}</Badge>
        </header>

        <div className={styles.searchWrap}>
          <input
            type="search"
            className={styles.search}
            placeholder={`Search ${meta.subtitle} terms...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className={styles.resultCount}>
            {terms.length} {terms.length === 1 ? 'term' : 'terms'}
          </span>
        </div>

        {terms.length === 0 ? (
          <p className={styles.empty}>No terms match your search.</p>
        ) : (
          <div className={styles.grid}>
            {terms.map((term) => (
              <Link key={term.slug} to={ROUTES.glossaryTerm(validCategory, term.slug)}>
                <Card hover padding="md" className={styles.card}>
                  <h3>{term.name}</h3>
                  <p>{term.shortDefinition}</p>
                  <span className={styles.points}>{term.keyPoints.length} key points</span>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
