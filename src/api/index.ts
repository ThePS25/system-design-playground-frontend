import { api } from './client';
import type {
  ApiSuccessResponse,
  ChallengeDetail,
  ChallengeSummary,
  ComponentDetail,
  ComponentSummary,
  CostEstimate,
  InfraConfiguration,
  SimulationResult,
  TemplateDetail,
  TemplateSummary,
  ValidationResult,
} from '@/types';

export const templatesApi = {
  list: (params?: { difficulty?: string; tag?: string }) => {
    const query = new URLSearchParams();
    if (params?.difficulty) query.set('difficulty', params.difficulty);
    if (params?.tag) query.set('tag', params.tag);
    const qs = query.toString();
    return api.get<TemplateSummary[]>(`/templates${qs ? `?${qs}` : ''}`);
  },
  get: (id: string) => api.get<TemplateDetail>(`/templates/${id}`),
};

export const componentsApi = {
  list: (params?: { category?: string; search?: string }) => {
    const query = new URLSearchParams();
    if (params?.category) query.set('category', params.category);
    if (params?.search) query.set('search', params.search);
    const qs = query.toString();
    return api.get<ComponentSummary[]>(`/components${qs ? `?${qs}` : ''}`);
  },
  get: (id: string) => api.get<ComponentDetail>(`/components/${id}`),
};

export const challengesApi = {
  list: (difficulty?: string) => {
    const qs = difficulty ? `?difficulty=${difficulty}` : '';
    return api.get<ChallengeSummary[]>(`/challenges${qs}`);
  },
  get: (id: string) => api.get<ChallengeDetail>(`/challenges/${id}`),
  validate: (payload: {
    challengeId: string;
    nodes: unknown[];
    edges: unknown[];
    saveSubmission?: boolean;
  }) => api.post<ValidationResult>('/challenge/validate', payload),
};

export const simulationApi = {
  run: (payload: {
    rps: number;
    nodes: unknown[];
    edges: unknown[];
    templateId?: string;
    disabledComponents?: string[];
  }) => api.post<SimulationResult>('/simulation', payload),
};

export const costApi = {
  calculate: (payload: { rps: number; configuration: InfraConfiguration }) =>
    api.post<CostEstimate>('/cost/calculate', payload),
};

export const healthApi = {
  check: () => api.get<{ status: string; database: string }>('/health'),
};

export type ListResponse<T> = ApiSuccessResponse<T>;
