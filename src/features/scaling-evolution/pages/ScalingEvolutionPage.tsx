import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ReactFlowProvider } from '@xyflow/react';
import { CanvasLayout } from '@/layouts/CanvasLayout';
import { ArchitectureCanvas } from '@/components/flow/ArchitectureCanvas';
import { EvolutionTimeline } from '../components/EvolutionTimeline';
import { StageDetailPanel } from '../components/StageDetailPanel';
import { Badge } from '@/components/ui';
import { useTemplate } from '@/hooks/useTemplates';
import { useFlowCanvas } from '@/hooks/useFlowCanvas';
import styles from './ScalingEvolutionPage.module.scss';

function ScalingContent({ slug }: { slug: string }) {
  const { data: template } = useTemplate(slug);
  const [activeStage, setActiveStage] = useState(1);
  const { loadGraph, reset } = useFlowCanvas();

  const stage = template?.scalingStages.find((s) => s.stage === activeStage) ?? null;

  useEffect(() => {
    if (stage) {
      loadGraph(stage.nodes, stage.edges);
    }
  }, [stage, loadGraph]);

  useEffect(() => () => reset(), [reset]);

  if (!template) return null;

  return (
    <CanvasLayout
      header={
        <div className={styles.header}>
          <div>
            <h1>{template.name} — Scaling Evolution</h1>
            <p>{template.tagline}</p>
          </div>
          <Badge variant="primary">{template.scalingStages.length} stages</Badge>
        </div>
      }
      sidebar={
        <div className={styles.sidebar}>
          <EvolutionTimeline
            stages={template.scalingStages}
            activeStage={activeStage}
            onSelectStage={setActiveStage}
          />
          <StageDetailPanel stage={stage} />
        </div>
      }
    >
      <ArchitectureCanvas interactive={false} />
    </CanvasLayout>
  );
}

export function ScalingEvolutionPage() {
  const { slug = 'twitter' } = useParams();
  const { isLoading, error } = useTemplate(slug);

  if (isLoading) return <div className={styles.loading}>Loading evolution timeline...</div>;
  if (error) return <div className={styles.loading}>Failed to load template.</div>;

  return (
    <ReactFlowProvider>
      <ScalingContent slug={slug} />
    </ReactFlowProvider>
  );
}
