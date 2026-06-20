import { Link } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout';
import { Card, Badge } from '@/components/ui';
import { useChallenges } from '@/hooks/useChallenges';
import { ROUTES } from '@/routes/paths';
import styles from './ChallengeListPage.module.scss';

export function ChallengeListPage() {
  const { data: challenges, isLoading, error } = useChallenges();

  return (
    <AppLayout>
      <div className={styles.page}>
        <header className={styles.header}>
          <h1>Design Challenges</h1>
          <p>Interview-style system design challenges with rule-based scoring</p>
        </header>

        {isLoading && <p className={styles.status}>Loading challenges...</p>}
        {error && <p className={styles.error}>Failed to load challenges.</p>}

        <div className={styles.grid}>
          {challenges?.map((challenge) => (
            <Link key={challenge.id} to={ROUTES.challengeDetail(challenge.slug)}>
              <Card hover padding="lg" className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3>{challenge.title}</h3>
                  <Badge variant="primary">{challenge.difficulty}</Badge>
                </div>
                <p className={styles.desc}>{challenge.description}</p>
                <div className={styles.meta}>
                  <span>{challenge.requirementCount} requirements</span>
                  <span>Max score: {challenge.maxScore}</span>
                  {challenge.timeLimitMinutes && (
                    <span>{challenge.timeLimitMinutes} min</span>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
