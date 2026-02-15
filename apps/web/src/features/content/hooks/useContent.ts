import { useQuery } from '@tanstack/react-query';
import { fetchContent } from '../content.api';
import type { ContentResponse } from '@content-dashboard/shared';

interface UseContentParams {
  page: number;
  limit: number;
  search?: string;
}

export function useContent({ page, limit, search }: UseContentParams) {
  return useQuery<ContentResponse>({
    queryKey: ['content', { page, limit, search }],
    queryFn: async (): Promise<ContentResponse> => {
      return fetchContent(page, limit, search);
    },
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 30,
  });
}
