import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ReactFlowProvider } from '@xyflow/react';
import { CanvasLayout } from '@/layouts/CanvasLayout';
import { ArchitectureCanvas } from '@/components/flow/ArchitectureCanvas';
import { ComponentSidePanel } from '../components/ComponentSidePanel/ComponentSidePanel';
import { Badge } from '@/components/ui';
import { useTemplate } from '@/hooks/useTemplates';
import { useFlowCanvas } from '@/hooks/useFlowCanvas';
import { useUiStore } from '@/store';
import styles from './ExplorerDetailPage.module.scss';

function ExplorerCanvas({ slug }: { slug: string }) {
  const { data: template } = useTemplate(slug);
  const { loadGraph, reset } = useFlowCanvas();
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const sidePanelOpen = useUiStore((s) => s.sidePanelOpen);
  const setSidePanelOpen = useUiStore((s) => s.setSidePanelOpen);

  useEffect(() => {
    if (template) {
      loadGraph(template.nodes, template.edges);
    }
  }, [template, loadGraph]);

  useEffect(() => () => reset(), [reset]);

  const handleNodeClick = (_nodeId: string, componentId: string) => {
    setSelectedComponent(componentId);
    setSidePanelOpen(true);
  };

  if (!template) return null;

  return (
    <CanvasLayout
      header={
        <div className={styles.header}>
          <div>
            <h1>{template.name}</h1>
            <p>{template.tagline}</p>
          </div>
          <div className={styles.meta}>
            <Badge variant="primary">{template.difficulty}</Badge>
            <span>{template.trafficProfile.defaultRps.toLocaleString()} RPS default</span>
          </div>
        </div>
      }
      sidebar={sidePanelOpen ? <ComponentSidePanel componentId={selectedComponent} /> : undefined}
    >
      <ArchitectureCanvas interactive={false} onNodeClick={handleNodeClick} />
    </CanvasLayout>
  );
}

export function ExplorerDetailPage() {
  const { slug = '' } = useParams();
  const { isLoading, error } = useTemplate(slug);

  if (isLoading) {
    return <div className={styles.loading}>Loading architecture...</div>;
  }

  if (error) {
    return <div className={styles.loading}>Failed to load template</div>;
  }

  return (
    <ReactFlowProvider>
      <ExplorerCanvas slug={slug} />
    </ReactFlowProvider>
  );
}
