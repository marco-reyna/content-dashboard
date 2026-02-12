export interface Content {
  id: string;
  title: string;
  body: string;
  author: string;
  createdAt: string;
}

export interface ContentResponse {
  data: Content[];
  total: number;
  page: number;
  totalPages: number;
}