import { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  type NodeMouseHandler,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ComponentNode } from '../ComponentNode';
import { UserNode } from '../UserNode';
import { DataFlowEdge } from '../DataFlowEdge';
import { useFlowCanvas } from '@/hooks/useFlowCanvas';
import styles from './ArchitectureCanvas.module.scss';

const nodeTypes = {
  componentNode: ComponentNode,
  userNode: UserNode,
};

const edgeTypes = {
  dataFlow: DataFlowEdge,
  asyncFlow: DataFlowEdge,
  replication: DataFlowEdge,
};

interface ArchitectureCanvasProps {
  interactive?: boolean;
  onNodeClick?: (nodeId: string, componentId: string) => void;
}

export function ArchitectureCanvas({ interactive = true, onNodeClick }: ArchitectureCanvasProps) {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setSelectedNodeId,
  } = useFlowCanvas();

  const handleNodeClick: NodeMouseHandler = useCallback(
    (_event, node) => {
      setSelectedNodeId(node.id);
      const componentId = (node.data as { componentId?: string }).componentId;
      if (componentId && onNodeClick) {
        onNodeClick(node.id, componentId);
      }
    },
    [setSelectedNodeId, onNodeClick],
  );

  return (
    <div className={styles.canvas}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={interactive ? onNodesChange : undefined}
        onEdgesChange={interactive ? onEdgesChange : undefined}
        onConnect={interactive ? onConnect : undefined}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.3}
        maxZoom={1.5}
        nodesDraggable={interactive}
        nodesConnectable={interactive}
        elementsSelectable={interactive}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="var(--color-flow-dot)" />
        <Controls showInteractive={false} />
        <MiniMap
          nodeColor={() => 'var(--color-bg-secondary)'}
          maskColor="rgba(27, 60, 83, 0.85)"
        />
      </ReactFlow>
    </div>
  );
}
