import type { FlowEdge, FlowNode } from '@/types';

export interface ComponentFailureMeta {
  slug: string;
  name: string;
  dependentComponents: string[];
  userFacingImpact: string;
  internalImpact: string;
  recoveryMechanisms: string[];
  industryMitigations: string[];
  cascadeSeverity: 'none' | 'partial' | 'full';
}

export interface FailureAnalysis {
  nodeStatuses: Record<string, 'healthy' | 'degraded' | 'down'>;
  userFacingImpacts: string[];
  internalImpacts: string[];
  recoveryMechanisms: string[];
  industryMitigations: string[];
  failedLabels: string[];
  degradedCount: number;
  downCount: number;
}

function buildAdjacency(edges: FlowEdge[]): Map<string, string[]> {
  const adjacency = new Map<string, string[]>();
  for (const edge of edges) {
    const targets = adjacency.get(edge.source) ?? [];
    targets.push(edge.target);
    adjacency.set(edge.source, targets);
  }
  return adjacency;
}

function collectDownstream(nodeId: string, adjacency: Map<string, string[]>): Set<string> {
  const visited = new Set<string>();
  const queue = [nodeId];

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current || visited.has(current)) continue;
    visited.add(current);

    for (const neighbor of adjacency.get(current) ?? []) {
      if (!visited.has(neighbor)) queue.push(neighbor);
    }
  }

  return visited;
}

export function analyzeFailure(
  nodes: FlowNode[],
  edges: FlowEdge[],
  failedSlugs: Set<string>,
  componentMeta: Map<string, ComponentFailureMeta>,
): FailureAnalysis {
  const statuses: Record<string, 'healthy' | 'degraded' | 'down'> = {};
  for (const node of nodes) {
    statuses[node.id] = 'healthy';
  }

  const adjacency = buildAdjacency(edges);
  const failedSlugList = Array.from(failedSlugs);

  for (const node of nodes) {
    if (failedSlugs.has(node.data.componentId)) {
      statuses[node.id] = 'down';
    }
  }

  for (const slug of failedSlugList) {
    const meta = componentMeta.get(slug);
    if (!meta) continue;

    for (const depSlug of meta.dependentComponents) {
      for (const node of nodes) {
        if (node.data.componentId === depSlug && statuses[node.id] !== 'down') {
          statuses[node.id] = meta.cascadeSeverity === 'full' ? 'down' : 'degraded';
        }
      }
    }
  }

  for (const node of nodes) {
    if (statuses[node.id] === 'down') {
      const downstream = collectDownstream(node.id, adjacency);
      for (const downstreamId of downstream) {
        if (downstreamId !== node.id && statuses[downstreamId] === 'healthy') {
          statuses[downstreamId] = 'degraded';
        }
      }
    }
  }

  const userFacingImpacts: string[] = [];
  const internalImpacts: string[] = [];
  const recoveryMechanisms = new Set<string>();
  const industryMitigations = new Set<string>();
  const failedLabels: string[] = [];

  for (const slug of failedSlugList) {
    const meta = componentMeta.get(slug);
    if (!meta) {
      failedLabels.push(slug);
      continue;
    }
    failedLabels.push(meta.name);
    userFacingImpacts.push(`${meta.name}: ${meta.userFacingImpact}`);
    internalImpacts.push(`${meta.name}: ${meta.internalImpact}`);
    meta.recoveryMechanisms.forEach((r) => recoveryMechanisms.add(r));
    meta.industryMitigations.forEach((m) => industryMitigations.add(m));
  }

  const downCount = Object.values(statuses).filter((s) => s === 'down').length;
  const degradedCount = Object.values(statuses).filter((s) => s === 'degraded').length;

  return {
    nodeStatuses: statuses,
    userFacingImpacts,
    internalImpacts,
    recoveryMechanisms: Array.from(recoveryMechanisms),
    industryMitigations: Array.from(industryMitigations),
    failedLabels,
    downCount,
    degradedCount,
  };
}

export const PRESET_FAILURES = [
  { slug: 'redis', label: 'Redis Down' },
  { slug: 'kafka', label: 'Kafka Down' },
  { slug: 'database', label: 'Database Down' },
  { slug: 'cdn', label: 'CDN Down' },
  { slug: 'load-balancer', label: 'Load Balancer Down' },
] as const;
