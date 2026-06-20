import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ReactFlowProvider } from '@xyflow/react';
import { AppLayout } from '@/layouts/AppLayout';
import { ArchitectureCanvas } from '@/components/flow/ArchitectureCanvas';
import { RequirementsPanel } from '../components/RequirementsPanel';
import { ComponentPalette } from '../components/ComponentPalette';
import { ValidationResultPanel } from '../components/ValidationResult';
import { Button, Badge } from '@/components/ui';
import { useChallenge } from '@/hooks/useChallenges';
import { useValidateChallenge } from '@/hooks/useValidateChallenge';
import { useFlowCanvas } from '@/hooks/useFlowCanvas';
import { useChallengeStore } from '@/store';
import styles from './ChallengeWorkspacePage.module.scss';

function ChallengeWorkspace({ slug }: { slug: string }) {
  const { data: challenge } = useChallenge(slug);
  const { loadGraph, getGraphPayload, reset } = useFlowCanvas();
  const setValidationResult = useChallengeStore((s) => s.setValidationResult);
  const setActiveChallengeId = useChallengeStore((s) => s.setActiveChallengeId);
  const { mutate, isPending } = useValidateChallenge();

  useEffect(() => {
    if (challenge) {
      loadGraph(challenge.starterNodes, challenge.starterEdges);
      setActiveChallengeId(challenge.slug);
      setValidationResult(null);
    }
  }, [challenge, loadGraph, setActiveChallengeId, setValidationResult]);

  useEffect(() => {
    return () => {
      reset();
      setValidationResult(null);
      setActiveChallengeId(null);
    };
  }, [reset, setValidationResult, setActiveChallengeId]);

  const handleValidate = useCallback(() => {
    if (!challenge) return;
    const { nodes, edges } = getGraphPayload();
    mutate(
      { challengeId: challenge.slug, nodes, edges },
      { onSuccess: (result) => setValidationResult(result) },
    );
  }, [challenge, getGraphPayload, mutate, setValidationResult]);

  if (!challenge) return null;

  return (
    <div className={styles.workspace}>
      <aside className={styles.leftPanel}>
        <RequirementsPanel challenge={challenge} />
        <ComponentPalette />
      </aside>

      <div className={styles.center}>
        <header className={styles.header}>
          <div>
            <h1>{challenge.title}</h1>
            <Badge variant="primary">{challenge.difficulty}</Badge>
          </div>
          <Button onClick={handleValidate} loading={isPending}>
            Validate Architecture
          </Button>
        </header>
        <div className={styles.canvas}>
          <ArchitectureCanvas interactive />
        </div>
      </div>

      <aside className={styles.rightPanel}>
        <ValidationResultPanel />
      </aside>
    </div>
  );
}

export function ChallengeWorkspacePage() {
  const { slug = '' } = useParams();
  const { isLoading, error } = useChallenge(slug);

  if (isLoading) return <AppLayout><div className={styles.loading}>Loading challenge...</div></AppLayout>;
  if (error) return <AppLayout><div className={styles.loading}>Failed to load challenge.</div></AppLayout>;

  return (
    <AppLayout>
      <ReactFlowProvider>
        <ChallengeWorkspace slug={slug} />
      </ReactFlowProvider>
    </AppLayout>
  );
}
