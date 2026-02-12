import { contentData } from '../data/content.data';
import { Content } from '@content-dashboard/shared';
import { ContentModel } from '../models/content.model';

interface QueryParams {
  page: number;
  limit: number;
  search?: string;
}

export function getContent({ page, limit, search }: QueryParams) {
  let filtered: ContentModel[] = contentData;

  if (search) {
    filtered = filtered.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    );
  }

  const total = filtered.length;
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
    totalPages: Math.ceil(total / limit),
  };
}