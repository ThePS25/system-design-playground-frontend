import { useCallback } from 'react';
import { useFlowStore } from '@/store';
import type { FlowEdge, FlowNode } from '@/types';
import type { Node, Edge } from '@xyflow/react';

export function toFlowNodes(nodes: FlowNode[]): Node[] {
  return nodes.map((n) => ({
    id: n.id,
    type: n.type,
    position: n.position,
    data: { ...n.data },
  }));
}

export function toFlowEdges(edges: FlowEdge[]): Edge[] {
  return edges.map((e) => ({
    id: e.id,
    source: e.source,
    target: e.target,
    type: e.type,
    label: e.label,
    animated: e.animated,
    data: e.data,
  }));
}

export function useFlowCanvas() {
  const {
    nodes,
    edges,
    selectedNodeId,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setSelectedNodeId,
    reset,
  } = useFlowStore();

  const loadGraph = useCallback(
    (flowNodes: FlowNode[], flowEdges: FlowEdge[]) => {
      setNodes(toFlowNodes(flowNodes));
      setEdges(toFlowEdges(flowEdges));
    },
    [setNodes, setEdges],
  );

  const getGraphPayload = useCallback(() => {
    return {
      nodes: nodes.map((n) => ({
        id: n.id,
        type: n.type as FlowNode['type'],
        position: n.position,
        data: n.data as FlowNode['data'],
      })),
      edges: edges.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        type: (e.type ?? 'dataFlow') as FlowEdge['type'],
        label: e.label as string | undefined,
        animated: e.animated,
      })),
    };
  }, [nodes, edges]);

  return {
    nodes,
    edges,
    selectedNodeId,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setSelectedNodeId,
    loadGraph,
    getGraphPayload,
    reset,
  };
}
