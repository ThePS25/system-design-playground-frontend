export type NodeStatus = 'healthy' | 'degraded' | 'down' | 'saturated';
export type NodeType = 'componentNode' | 'userNode' | 'groupNode';
export type EdgeType = 'dataFlow' | 'asyncFlow' | 'replication';

export interface FlowNode {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  data: {
    componentId: string;
    label: string;
    status?: 'healthy' | 'degraded' | 'down';
  };
  parentId?: string;
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  type: EdgeType;
  label?: string;
  animated?: boolean;
  data?: { protocol?: string; description?: string };
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  meta?: { page?: number; limit?: number; total?: number };
}

export interface ApiErrorResponse {
  success: false;
  error: { code: string; message: string; details?: unknown };
}

export interface TemplateSummary {
  id: string;
  slug: string;
  name: string;
  description: string;
  tagline: string;
  difficulty: string;
  tags: string[];
  thumbnailUrl?: string;
  stageCount: number;
}

export interface TemplateDetail extends TemplateSummary {
  trafficProfile: {
    defaultRps: number;
    peakRps: number;
    readWriteRatio: number;
    avgPayloadKb: number;
  };
  nodes: FlowNode[];
  edges: FlowEdge[];
  scalingStages: ScalingStage[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ScalingStage {
  stage: number;
  title: string;
  userCount: string;
  description: string;
  newTraffic: string;
  bottlenecks: string[];
  scalingSolution: string;
  whyPreviousFailed: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
}

export interface ComponentSummary {
  id: string;
  slug: string;
  name: string;
  category: string;
  icon: string;
  purpose: string;
  interviewQuestionCount: number;
}

export interface ComponentDetail extends ComponentSummary {
  responsibilities: string[];
  advantages: string[];
  disadvantages: string[];
  alternatives: { name: string; description: string; whenToUse: string }[];
  tradeoffs: string[];
  scalingConsiderations: string[];
  interviewQuestions: { question: string; hint?: string; category: string }[];
  realWorldExamples: string[];
  simulation: { baseCapacityRps: number; cacheHitRateDefault?: number };
  failure: {
    userFacingImpact: string;
    internalImpact: string;
    recoveryMechanisms: string[];
    industryMitigations: string[];
    dependentComponents: string[];
    cascadeSeverity: string;
  };
  cost: { unitType: string; unitPriceMonthly: number; minUnits: number };
}

export interface ChallengeSummary {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: string;
  requirementCount: number;
  maxScore: number;
  timeLimitMinutes?: number;
}

export interface ChallengeDetail extends ChallengeSummary {
  requirements: { id: string; text: string; priority: string }[];
  traffic: Record<string, string | number>;
  scale: Record<string, string>;
  constraints: string[];
  starterNodes: FlowNode[];
  starterEdges: FlowEdge[];
}

export interface SimulationResult {
  rps: number;
  metrics: {
    cpu: number;
    memory: number;
    throughput: number;
    latency: number;
    cacheHitRate: number;
    queueDepth: number;
    errorRate: number;
  };
  nodeMetrics: Array<{
    nodeId: string;
    componentSlug: string;
    label: string;
    utilization: number;
    latencyMs: number;
    status: NodeStatus;
    requestsPerSecond: number;
  }>;
  bottlenecks: Array<{
    type: string;
    label: string;
    severity: string;
    affectedNodeIds: string[];
    description: string;
    recommendation: string;
  }>;
  timestamp: string;
}

export interface ValidationResult {
  score: number;
  maxScore: number;
  percentage: number;
  grade: string;
  correct: ValidationItem[];
  missing: ValidationItem[];
  optional: ValidationItem[];
  antiPatternsFound: ValidationItem[];
  feedback: string[];
  submissionId?: string;
}

export interface ValidationItem {
  componentSlug?: string;
  label: string;
  points: number;
  reason: string;
}

export interface InfraConfiguration {
  applicationServers: { count: number; instanceType?: string };
  redisClusters: { count: number; memoryGb?: number };
  databases: { count: number; instanceType?: string; readReplicas?: number };
  cdn: { enabled: boolean; bandwidthTb?: number };
  loadBalancers: { count: number };
  kafkaClusters?: { count: number; brokers?: number };
  objectStorage?: { storageTb: number };
  searchServices?: { count: number };
}

export interface CostLineItem {
  category: string;
  component: string;
  units: number;
  unitType: string;
  unitPrice: number;
  monthlyCost: number;
  percentage: number;
}

export interface CostEstimate {
  monthly: { total: number; currency: string };
  yearly: { total: number; currency: string };
  breakdown: CostLineItem[];
  charts: {
    byCategory: { category: string; amount: number }[];
    monthlyProjection: { month: string; amount: number }[];
  };
}

export type AppModule =
  | 'home'
  | 'explorer'
  | 'traffic'
  | 'failure'
  | 'scaling'
  | 'challenge'
  | 'interview'
  | 'glossary'
  | 'learn'
  | 'cost';

export interface LearnLessonSection {
  heading: string;
  body: string;
}

export interface LearnPracticeLink {
  label: string;
  route: string;
  description?: string;
}

export interface LearnLesson {
  slug: string;
  order: number;
  title: string;
  subtitle: string;
  durationMinutes: number;
  sections: LearnLessonSection[];
  keyTakeaways: string[];
  practiceLinks: LearnPracticeLink[];
}

export type GlossaryCategory = 'hld' | 'lld';

export interface GlossaryRelatedTerm {
  slug: string;
  category: GlossaryCategory;
}

export interface GlossaryTerm {
  slug: string;
  name: string;
  category: GlossaryCategory;
  shortDefinition: string;
  definition: string;
  keyPoints: string[];
  examples: string[];
  relatedTerms: GlossaryRelatedTerm[];
  interviewTips: string[];
}

export interface GlossaryCategoryMeta {
  slug: GlossaryCategory;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}
