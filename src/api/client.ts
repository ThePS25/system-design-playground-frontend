import type { ApiErrorResponse, ApiSuccessResponse } from '@/types';

const BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

export class ApiClientError extends Error {
  constructor(
    public code: string,
    message: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });

  const json = (await response.json()) as ApiSuccessResponse<T> | ApiErrorResponse;

  if (!response.ok || !json.success) {
    const error = json as ApiErrorResponse;
    throw new ApiClientError(
      error.error?.code ?? 'UNKNOWN',
      error.error?.message ?? 'Request failed',
      error.error?.details,
    );
  }

  return json.data;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
};
