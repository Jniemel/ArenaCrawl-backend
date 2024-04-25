import express from 'express';
import homeRouter from './routes/home.js';

const app = express();

app.use(express.json());
app.use('/', homeRouter);

export default app;