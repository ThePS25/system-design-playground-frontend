import { Link, useParams } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout';
import { Badge } from '@/components/ui';
import { LessonContent } from '../components/LessonContent';
import { getAdjacentLessons, getLesson } from '../utils/learnHelpers';
import { ROUTES } from '@/routes/paths';
import styles from './LearnLessonPage.module.scss';

export function LearnLessonPage() {
  const { slug = '' } = useParams();
  const lesson = getLesson(slug);
  const { prev, next } = getAdjacentLessons(slug);

  return (
    <AppLayout>
      <div className={styles.page}>
        <Link to={ROUTES.learn} className={styles.back}>
          ← Back to Start Here
        </Link>

        {!lesson ? (
          <p className={styles.error}>Lesson not found.</p>
        ) : (
          <>
            <header className={styles.header}>
              <div>
                <span className={styles.order}>Lesson {lesson.order}</span>
                <h1>{lesson.title}</h1>
                <p>{lesson.subtitle}</p>
              </div>
              <Badge variant="primary">{lesson.durationMinutes} min</Badge>
            </header>

            <LessonContent lesson={lesson} />

            <nav className={styles.nav}>
              {prev ? (
                <Link to={ROUTES.learnLesson(prev.slug)} className={styles.navLink}>
                  <span className={styles.navDir}>Previous</span>
                  <span className={styles.navTitle}>{prev.title}</span>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link to={ROUTES.learnLesson(next.slug)} className={`${styles.navLink} ${styles.next}`}>
                  <span className={styles.navDir}>Next</span>
                  <span className={styles.navTitle}>{next.title}</span>
                </Link>
              ) : (
                <Link to={ROUTES.explorer} className={`${styles.navLink} ${styles.next}`}>
                  <span className={styles.navDir}>You are ready</span>
                  <span className={styles.navTitle}>Explore Architectures →</span>
                </Link>
              )}
            </nav>
          </>
        )}
      </div>
    </AppLayout>
  );
}
