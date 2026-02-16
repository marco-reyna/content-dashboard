import { Router } from 'express';
import { z } from 'zod';
import { getContent } from '../services/content.service';

const router = Router();

const querySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  search: z.string().optional(),
});

router.get('/', async (req, res, next) => {
  try {
    const parsed = querySchema.safeParse(req.query);

    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid query parameters' });
    }

    const page = Number(parsed.data.page) || 1;
    const limit = Number(parsed.data.limit) || 10;

    const result = await getContent({
      page,
      limit,
      search: parsed.data.search,
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
