import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui';
import type { GlossaryTerm } from '@/types';
import { getCategoryMeta, resolveRelatedTerms } from '../../utils/glossaryHelpers';
import { ROUTES } from '@/routes/paths';
import styles from './TermDetail.module.scss';

interface TermDetailProps {
  term: GlossaryTerm;
}

export function TermDetail({ term }: TermDetailProps) {
  const categoryMeta = getCategoryMeta(term.category);
  const related = resolveRelatedTerms(term);

  return (
    <div className={styles.detail}>
      <section className={styles.section}>
        <h2>Definition</h2>
        <p className={styles.definition}>{term.definition}</p>
      </section>

      <SectionList title="Key Points" items={term.keyPoints} />
      <SectionList title="Real-World Examples" items={term.examples} variant="examples" />
      <SectionList title="Interview Tips" items={term.interviewTips} variant="tips" />

      {related.length > 0 && (
        <section className={styles.section}>
          <h2>Related Terms</h2>
          <div className={styles.related}>
            {related.map((relatedTerm) => (
              <Link
                key={`${relatedTerm.category}-${relatedTerm.slug}`}
                to={ROUTES.glossaryTerm(relatedTerm.category, relatedTerm.slug)}
                className={styles.relatedLink}
              >
                <span>{relatedTerm.name}</span>
                <Badge>{getCategoryMeta(relatedTerm.category).subtitle}</Badge>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className={styles.categoryTag}>
        <Badge variant="primary">{categoryMeta.subtitle}</Badge>
      </div>
    </div>
  );
}

function SectionList({
  title,
  items,
  variant,
}: {
  title: string;
  items: string[];
  variant?: 'examples' | 'tips';
}) {
  if (items.length === 0) return null;

  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      <ul className={variant ? styles[variant] : undefined}>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
