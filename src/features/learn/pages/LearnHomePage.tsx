import { Link } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout';
import { Card, Badge } from '@/components/ui';
import { LEARN_PATH_INTRO } from '../data/learnPath';
import { getLessons } from '../utils/learnHelpers';
import { ROUTES } from '@/routes/paths';
import styles from './LearnHomePage.module.scss';

export function LearnHomePage() {
  const lessons = getLessons();

  return (
    <AppLayout>
      <div className={styles.page}>
        <header className={styles.header}>
          <Badge variant="primary">Beginner friendly</Badge>
          <h1>{LEARN_PATH_INTRO.title}</h1>
          <p>{LEARN_PATH_INTRO.description}</p>
          <div className={styles.meta}>
            <span>{LEARN_PATH_INTRO.totalLessons} lessons</span>
            <span>~{LEARN_PATH_INTRO.estimatedHours} hours total</span>
          </div>
        </header>

        <div className={styles.path}>
          {lessons.map((lesson) => (
            <Link key={lesson.slug} to={ROUTES.learnLesson(lesson.slug)}>
              <Card hover padding="lg" className={styles.lessonCard}>
                <span className={styles.order}>{lesson.order}</span>
                <div className={styles.content}>
                  <div className={styles.titleRow}>
                    <h2>{lesson.title}</h2>
                    <Badge>{lesson.durationMinutes} min</Badge>
                  </div>
                  <p className={styles.subtitle}>{lesson.subtitle}</p>
                </div>
                <span className={styles.arrow}>→</span>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
