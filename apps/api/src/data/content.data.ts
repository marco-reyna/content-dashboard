import { ContentModel } from '../models/content.model';

export const contentData: ContentModel[] = Array.from(
  { length: 120 },
  (_, i) => ({
    id: crypto.randomUUID(),
    title: `Article ${i + 1}`,
    body: `This is the content body for article ${i + 1}.`,
    author: `Author ${i % 8}`,
    createdAt: new Date(Date.now() - i * 1000000),
  }),
);