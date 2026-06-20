import { useComponent } from '@/hooks/useComponents';
import { useUiStore } from '@/store';
import { Badge } from '@/components/ui';
import styles from './ComponentSidePanel.module.scss';

interface ComponentSidePanelProps {
  componentId: string | null;
}

export function ComponentSidePanel({ componentId }: ComponentSidePanelProps) {
  const setSidePanelOpen = useUiStore((s) => s.setSidePanelOpen);
  const { data: component, isLoading } = useComponent(componentId);

  if (!componentId) return null;

  if (isLoading) {
    return <div className={styles.panel}><p className={styles.loading}>Loading...</p></div>;
  }

  if (!component) {
    return <div className={styles.panel}><p className={styles.loading}>Component not found</p></div>;
  }

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>{component.name}</h2>
          <Badge variant="primary">{component.category}</Badge>
        </div>
        <button className={styles.close} onClick={() => setSidePanelOpen(false)}>✕</button>
      </div>

      <section className={styles.section}>
        <h3>Purpose</h3>
        <p>{component.purpose}</p>
      </section>

      <SectionList title="Responsibilities" items={component.responsibilities} />
      <SectionList title="Advantages" items={component.advantages} variant="success" />
      <SectionList title="Disadvantages" items={component.disadvantages} variant="danger" />

      {component.interviewQuestions.length > 0 && (
        <section className={styles.section}>
          <h3>Interview Questions</h3>
          <ul className={styles.questions}>
            {component.interviewQuestions.map((q, i) => (
              <li key={i}>{q.question}</li>
            ))}
          </ul>
        </section>
      )}
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
      <h3>{title}</h3>
      <ul className={variant ? styles[variant] : undefined}>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
