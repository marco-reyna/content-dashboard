import axios from 'axios';
import type { ContentResponse } from '@content-dashboard/shared';

const API_URL = 'http://localhost:4000/api/content';

export async function fetchContent(
  page: number,
  limit: number,
  search?: string,
): Promise<ContentResponse> {
  const response = await axios.get<ContentResponse>(API_URL, {
    params: { page, limit, search },
  });

  return response.data;
}
