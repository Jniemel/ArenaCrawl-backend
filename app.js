import 'dotenv/config';
import express from 'express';
import homeRouter from './routes/home.js';
import mongoose from 'mongoose';
import cors from 'cors';

// conf cors
const corsOptions = {
  origin: 'http://localhost:5000',
  optionsSuccessStatus: 200,
};

const app = express();

// Set up mongoose connection
const conn = process.env.MONGODB_URI;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(conn);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use('/', homeRouter);

export default app;