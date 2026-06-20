import { useState } from 'react';
import { Badge } from '@/components/ui';
import type { ComponentDetail } from '@/types';
import styles from './QuestionList.module.scss';

type InterviewQuestion = ComponentDetail['interviewQuestions'][number];

const CATEGORY_VARIANT: Record<string, 'default' | 'primary' | 'success' | 'warning' | 'danger'> = {
  conceptual: 'primary',
  tradeoff: 'warning',
  failure: 'danger',
  scaling: 'success',
};

interface QuestionListProps {
  questions: InterviewQuestion[];
}

export function QuestionList({ questions }: QuestionListProps) {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  if (questions.length === 0) {
    return <p className={styles.empty}>No interview questions for this component yet.</p>;
  }

  return (
    <ul className={styles.list}>
      {questions.map((q, index) => {
        const isOpen = expanded.has(index);
        const hasHint = Boolean(q.hint);

        return (
          <li key={index} className={styles.item}>
            <button
              type="button"
              className={styles.questionRow}
              onClick={() => hasHint && toggle(index)}
              aria-expanded={hasHint ? isOpen : undefined}
              disabled={!hasHint}
            >
              <span className={styles.question}>{q.question}</span>
              <div className={styles.meta}>
                <Badge variant={CATEGORY_VARIANT[q.category] ?? 'default'}>{q.category}</Badge>
                {hasHint && <span className={styles.toggle}>{isOpen ? 'Hide hint' : 'Show hint'}</span>}
              </div>
            </button>
            {hasHint && isOpen && (
              <p className={styles.hint}>{q.hint}</p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
