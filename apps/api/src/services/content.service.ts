import { contentData } from '../data/content.data';
import type { Content } from '@content-dashboard/shared';
import { ContentModel } from '../models/content.model';

interface QueryParams {
  page: number;
  limit: number;
  search?: string;
}

export async function getContent({ page, limit, search }: QueryParams) {
  // Simulate async data source (e.g., DB call)
  await new Promise((resolve) => setTimeout(resolve, 50));

  let filtered: ContentModel[] = contentData;

  if (search) {
    filtered = filtered.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    );
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  const data: Content[] = paginated.map((item) => ({
    id: item.id,
    title: item.title,
    body: item.body,
    author: item.author,
    createdAt: item.createdAt.toISOString(),
  }));

  return {
    data,
    total,
    page,
    totalPages,
  };
}
