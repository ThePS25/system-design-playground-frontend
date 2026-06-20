import { useCallback, useEffect, useState } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { CanvasLayout } from '@/layouts/CanvasLayout';
import { ArchitectureCanvas } from '@/components/flow/ArchitectureCanvas';
import { TrafficControls } from '../components/TrafficControls';
import { TemplateSelector } from '../components/TemplateSelector';
import { MetricsDashboard } from '../components/MetricsDashboard';
import { BottleneckAlerts } from '../components/BottleneckAlerts';
import { useTemplate } from '@/hooks/useTemplates';
import { useFlowCanvas } from '@/hooks/useFlowCanvas';
import { useRunSimulation } from '@/hooks/useSimulation';
import { useFlowStore, useSimulationStore } from '@/store';
import styles from './TrafficSimulatorPage.module.scss';

const DEFAULT_TEMPLATE = 'twitter';

function TrafficSimulatorContent() {
  const [templateSlug, setTemplateSlug] = useState(DEFAULT_TEMPLATE);
  const { data: template } = useTemplate(templateSlug);
  const { loadGraph, getGraphPayload, reset } = useFlowCanvas();
  const applyNodeMetrics = useFlowStore((s) => s.applyNodeMetrics);
  const rps = useSimulationStore((s) => s.rps);
  const setResult = useSimulationStore((s) => s.setResult);
  const setIsRunning = useSimulationStore((s) => s.setIsRunning);
  const resetSimulation = useSimulationStore((s) => s.reset);

  const { mutate, isPending } = useRunSimulation();

  useEffect(() => {
    if (template) {
      loadGraph(template.nodes, template.edges);
      setResult(null);
    }
  }, [template, loadGraph, setResult]);

  useEffect(() => {
    return () => {
      reset();
      resetSimulation();
    };
  }, [reset, resetSimulation]);

  const handleRun = useCallback(() => {
    const { nodes, edges } = getGraphPayload();
    if (nodes.length === 0) return;

    setIsRunning(true);
    mutate(
      { rps, nodes, edges, templateId: templateSlug },
      {
        onSuccess: (result) => {
          setResult(result);
          applyNodeMetrics(result.nodeMetrics);
          setIsRunning(false);
        },
        onError: () => {
          setIsRunning(false);
        },
      },
    );
  }, [getGraphPayload, rps, templateSlug, mutate, setResult, applyNodeMetrics, setIsRunning]);

  return (
    <CanvasLayout
      header={
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h1>Traffic Simulator</h1>
            <p>Deterministic load simulation with bottleneck detection</p>
          </div>
          <div className={styles.headerControls}>
            <TemplateSelector value={templateSlug} onChange={setTemplateSlug} />
            <TrafficControls onRun={handleRun} isRunning={isPending} />
          </div>
        </div>
      }
      sidebar={
        <div className={styles.sidebar}>
          <MetricsDashboard />
          <BottleneckAlerts />
        </div>
      }
    >
      <ArchitectureCanvas interactive={false} />
    </CanvasLayout>
  );
}

export function TrafficSimulatorPage() {
  return (
    <ReactFlowProvider>
      <TrafficSimulatorContent />
    </ReactFlowProvider>
  );
}
