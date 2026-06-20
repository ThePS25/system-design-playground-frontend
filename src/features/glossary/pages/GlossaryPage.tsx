import { Link } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout';
import { Card, Badge } from '@/components/ui';
import { GLOSSARY_CATEGORIES } from '../data/glossaryTerms';
import { getTermCount } from '../utils/glossaryHelpers';
import { ROUTES } from '@/routes/paths';
import styles from './GlossaryPage.module.scss';

export function GlossaryPage() {
  const categories = Object.values(GLOSSARY_CATEGORIES);

  return (
    <AppLayout>
      <div className={styles.page}>
        <header className={styles.header}>
          <h1>System Design Glossary</h1>
          <p>
            Essential terminology for high-level architecture and low-level implementation —
            definitions, examples, and interview tips.
          </p>
        </header>

        <div className={styles.grid}>
          {categories.map((category) => (
            <Link key={category.slug} to={ROUTES.glossaryCategory(category.slug)}>
              <Card hover padding="lg" className={styles.card}>
                <div className={styles.icon}>{category.icon}</div>
                <div className={styles.cardHeader}>
                  <h2>{category.title}</h2>
                  <Badge variant="primary">{category.subtitle}</Badge>
                </div>
                <p className={styles.desc}>{category.description}</p>
                <span className={styles.count}>
                  {getTermCount(category.slug)} terms
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
