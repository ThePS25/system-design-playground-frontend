import { Link } from 'react-router-dom';
import type { LearnLesson } from '@/types';
import styles from './LessonContent.module.scss';

interface LessonContentProps {
  lesson: LearnLesson;
}

export function LessonContent({ lesson }: LessonContentProps) {
  return (
    <div className={styles.content}>
      {lesson.sections.map((section, i) => (
        <section key={i} className={styles.section}>
          <h2>{section.heading}</h2>
          <p>{section.body}</p>
        </section>
      ))}

      <section className={styles.section}>
        <h2>Key Takeaways</h2>
        <ul className={styles.takeaways}>
          {lesson.keyTakeaways.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      {lesson.practiceLinks.length > 0 && (
        <section className={styles.section}>
          <h2>Try It Hands-On</h2>
          <div className={styles.links}>
            {lesson.practiceLinks.map((link) => (
              <Link key={link.route} to={link.route} className={styles.practiceLink}>
                <span className={styles.linkLabel}>{link.label}</span>
                {link.description && (
                  <span className={styles.linkDesc}>{link.description}</span>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
