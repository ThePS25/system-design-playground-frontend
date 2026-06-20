import { Badge } from '@/components/ui';
import type { ComponentDetail } from '@/types';
import { QuestionList } from '../QuestionList';
import styles from './ComponentDetail.module.scss';

interface ComponentDetailProps {
  component: ComponentDetail;
}

export function ComponentDetailView({ component }: ComponentDetailProps) {
  return (
    <div className={styles.detail}>
      <section className={styles.section}>
        <h2>Purpose</h2>
        <p>{component.purpose}</p>
      </section>

      <SectionList title="Responsibilities" items={component.responsibilities} />
      <div className={styles.twoCol}>
        <SectionList title="Advantages" items={component.advantages} variant="success" />
        <SectionList title="Disadvantages" items={component.disadvantages} variant="danger" />
      </div>

      {component.alternatives.length > 0 && (
        <section className={styles.section}>
          <h2>Alternatives</h2>
          <div className={styles.alternatives}>
            {component.alternatives.map((alt, i) => (
              <div key={i} className={styles.altCard}>
                <h3>{alt.name}</h3>
                <p>{alt.description}</p>
                <span className={styles.whenToUse}>When to use: {alt.whenToUse}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <SectionList title="Tradeoffs" items={component.tradeoffs} />
      <SectionList title="Scaling Considerations" items={component.scalingConsiderations} />
      <SectionList title="Real-World Examples" items={component.realWorldExamples} />

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Interview Questions</h2>
          <Badge variant="primary">{component.interviewQuestions.length} questions</Badge>
        </div>
        <QuestionList questions={component.interviewQuestions} />
      </section>
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
  variant?: 'success' | 'danger';
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
