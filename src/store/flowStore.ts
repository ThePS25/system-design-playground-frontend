import { create } from 'zustand';
import {
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type Connection,
  addEdge,
} from '@xyflow/react';

interface FlowState {
  nodes: Node[];
  edges: Edge[];
  selectedNodeId: string | null;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: (connection: Connection) => void;
  setSelectedNodeId: (id: string | null) => void;
  updateNodeStatus: (nodeId: string, status: 'healthy' | 'degraded' | 'down') => void;
  applyNodeMetrics: (
    metrics: Array<{
      nodeId: string;
      utilization: number;
      status: 'healthy' | 'degraded' | 'down' | 'saturated';
    }>,
  ) => void;
  applyFailureStates: (statuses: Record<string, 'healthy' | 'degraded' | 'down'>) => void;
  addComponentNode: (componentId: string, label: string, type?: 'componentNode' | 'userNode') => void;
  removeNode: (nodeId: string) => void;
  reset: () => void;
}

export const useFlowStore = create<FlowState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  onNodesChange: (changes) =>
    set({ nodes: applyNodeChanges(changes, get().nodes) }),

  onEdgesChange: (changes) =>
    set({ edges: applyEdgeChanges(changes, get().edges) }),

  onConnect: (connection) =>
    set({ edges: addEdge({ ...connection, type: 'dataFlow' }, get().edges) }),

  setSelectedNodeId: (id) => set({ selectedNodeId: id }),

  updateNodeStatus: (nodeId, status) =>
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, status } }
          : node,
      ),
    }),

  applyNodeMetrics: (metrics) => {
    const metricMap = new Map(metrics.map((m) => [m.nodeId, m]));
    set({
      nodes: get().nodes.map((node) => {
        const metric = metricMap.get(node.id);
        if (!metric) return node;
        const status =
          metric.status === 'saturated'
            ? 'degraded'
            : (metric.status as 'healthy' | 'degraded' | 'down');
        return {
          ...node,
          data: {
            ...node.data,
            utilization: metric.utilization,
            status,
          },
        };
      }),
    });
  },

  applyFailureStates: (statuses) => {
    set({
      nodes: get().nodes.map((node) => {
        const status = statuses[node.id] ?? 'healthy';
        const data = { ...node.data, status };
        if (status === 'healthy') {
          delete (data as { utilization?: number }).utilization;
        }
        return { ...node, data };
      }),
    });
  },

  addComponentNode: (componentId, label, type = 'componentNode') => {
    const existing = get().nodes;
    const offset = existing.length * 40;
    const newNode: Node = {
      id: `${componentId}-${Date.now()}`,
      type,
      position: { x: 100 + offset, y: 150 + (offset % 200) },
      data: { componentId, label, status: 'healthy' },
    };
    set({ nodes: [...existing, newNode] });
  },

  removeNode: (nodeId) => {
    set({
      nodes: get().nodes.filter((n) => n.id !== nodeId),
      edges: get().edges.filter((e) => e.source !== nodeId && e.target !== nodeId),
    });
  },

  reset: () => set({ nodes: [], edges: [], selectedNodeId: null }),
}));
