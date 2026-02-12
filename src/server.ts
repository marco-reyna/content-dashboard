import express from 'express';
import cors from 'cors';
import contentRouter from './routes/content.route';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/content', contentRouter);

app.listen(4000, () => {
  console.log('API running on http://localhost:4000');
});
