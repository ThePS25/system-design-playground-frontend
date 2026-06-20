import { useQueries } from '@tanstack/react-query';
import { componentsApi } from '@/api';
import type { ComponentFailureMeta } from '@/services/failure/failureEngine';

export function useComponentFailureMeta(slugs: string[]) {
  const queries = useQueries({
    queries: slugs.map((slug) => ({
      queryKey: ['components', slug, 'failure'],
      queryFn: () => componentsApi.get(slug),
      staleTime: 5 * 60 * 1000,
      enabled: !!slug,
    })),
  });

  const isLoading = queries.some((q) => q.isLoading);
  const metaMap = new Map<string, ComponentFailureMeta>();

  for (const query of queries) {
    if (!query.data) continue;
    const c = query.data;
    metaMap.set(c.slug, {
      slug: c.slug,
      name: c.name,
      dependentComponents: c.failure.dependentComponents ?? [],
      userFacingImpact: c.failure.userFacingImpact,
      internalImpact: c.failure.internalImpact,
      recoveryMechanisms: c.failure.recoveryMechanisms,
      industryMitigations: c.failure.industryMitigations,
      cascadeSeverity: c.failure.cascadeSeverity as ComponentFailureMeta['cascadeSeverity'],
    });
  }

  return { metaMap, isLoading };
}
