import { useEffect, useMemo, useState } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { CanvasLayout } from '@/layouts/CanvasLayout';
import { ArchitectureCanvas } from '@/components/flow/ArchitectureCanvas';
import { TemplateSelector } from '@/features/traffic-simulator/components/TemplateSelector';
import { FailureControls } from '../components/FailureControls';
import { ImpactPanel } from '../components/ImpactPanel';
import { RecoveryGuide } from '../components/RecoveryGuide';
import { useTemplate } from '@/hooks/useTemplates';
import { useFlowCanvas } from '@/hooks/useFlowCanvas';
import { useComponentFailureMeta } from '@/hooks/useComponentFailureMeta';
import { analyzeFailure } from '@/services/failure/failureEngine';
import { useFailureStore, useFlowStore } from '@/store';
import styles from './FailureSimulatorPage.module.scss';

const DEFAULT_TEMPLATE = 'twitter';

function FailureSimulatorContent() {
  const [templateSlug, setTemplateSlug] = useState(DEFAULT_TEMPLATE);
  const { data: template } = useTemplate(templateSlug);
  const { loadGraph, reset } = useFlowCanvas();
  const applyFailureStates = useFlowStore((s) => s.applyFailureStates);
  const failedComponents = useFailureStore((s) => s.failedComponents);
  const clearFailures = useFailureStore((s) => s.clearFailures);
  const setAnalysis = useFailureStore((s) => s.setAnalysis);

  const componentSlugs = useMemo(() => {
    if (!template) return [];
    const slugs = new Set(
      template.nodes
        .map((n) => n.data.componentId)
        .filter((id) => id !== 'user'),
    );
    return Array.from(slugs);
  }, [template]);

  const { metaMap, isLoading: metaLoading } = useComponentFailureMeta(componentSlugs);

  useEffect(() => {
    if (template) {
      loadGraph(template.nodes, template.edges);
      clearFailures();
    }
  }, [template, loadGraph, clearFailures]);

  useEffect(() => {
    return () => {
      reset();
      clearFailures();
    };
  }, [reset, clearFailures]);

  useEffect(() => {
    if (!template || metaLoading) return;

    const failedSet = new Set(failedComponents);

    if (failedSet.size === 0) {
      const healthyStatuses: Record<string, 'healthy' | 'degraded' | 'down'> = {};
      for (const node of template.nodes) healthyStatuses[node.id] = 'healthy';
      applyFailureStates(healthyStatuses);
      setAnalysis(null);
      return;
    }

    const analysis = analyzeFailure(template.nodes, template.edges, failedSet, metaMap);
    applyFailureStates(analysis.nodeStatuses);
    setAnalysis(analysis);
  }, [failedComponents, template, metaMap, metaLoading, applyFailureStates, setAnalysis]);

  const handleClear = () => {
    clearFailures();
  };

  return (
    <CanvasLayout
      header={
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h1>Failure Simulator</h1>
            <p>Toggle component failures and visualize cascade impact</p>
          </div>
          <div className={styles.headerControls}>
            <TemplateSelector value={templateSlug} onChange={setTemplateSlug} />
            <FailureControls availableSlugs={componentSlugs} onClear={handleClear} />
          </div>
        </div>
      }
      sidebar={
        <div className={styles.sidebar}>
          <ImpactPanel />
          <RecoveryGuide />
        </div>
      }
    >
      <ArchitectureCanvas interactive={false} />
    </CanvasLayout>
  );
}

export function FailureSimulatorPage() {
  return (
    <ReactFlowProvider>
      <FailureSimulatorContent />
    </ReactFlowProvider>
  );
}
