import express from 'express';
import cors from 'cors';
import contentRouter from './routes/content.route';
import type { Request, Response, NextFunction } from 'express';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/content', contentRouter);

app.listen(4000, () => {
  console.log('API running on http://localhost:4000');
});

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});
