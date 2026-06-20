import type { ChallengeDetail } from '@/types';
import { Badge } from '@/components/ui';
import styles from './RequirementsPanel.module.scss';

interface RequirementsPanelProps {
  challenge: ChallengeDetail;
}

export function RequirementsPanel({ challenge }: RequirementsPanelProps) {
  return (
    <div className={styles.panel}>
      <h3 className={styles.title}>Requirements</h3>
      <ul className={styles.list}>
        {challenge.requirements.map((req) => (
          <li key={req.id} className={styles.item}>
            <Badge
              variant={
                req.priority === 'must'
                  ? 'danger'
                  : req.priority === 'should'
                    ? 'warning'
                    : 'default'
              }
            >
              {req.priority}
            </Badge>
            <span>{req.text}</span>
          </li>
        ))}
      </ul>

      <div className={styles.block}>
        <h4>Traffic</h4>
        <p>DAU: {challenge.traffic.dailyActiveUsers as string}</p>
        <p>RPS: {challenge.traffic.requestsPerSecond as string}</p>
      </div>

      <div className={styles.block}>
        <h4>Scale</h4>
        <p>{challenge.scale.storageEstimate as string}</p>
        <p>{challenge.scale.geographicScope as string}</p>
      </div>

      {challenge.constraints.length > 0 && (
        <div className={styles.block}>
          <h4>Constraints</h4>
          <ul>
            {challenge.constraints.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
