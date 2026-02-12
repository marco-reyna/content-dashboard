import { contentData } from "../data/content.data";
import { Content } from "../models/content.model";

interface QueryParams {
  page: number;
  limit: number;
  search?: string;
}

export function getContent({ page, limit, search }: QueryParams) {
  let filtered: Content[] = contentData;

  if (search) {
    filtered = filtered.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return {
    data: paginated,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}