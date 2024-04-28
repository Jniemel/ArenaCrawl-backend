// eslint-disable-next-line import/no-extraneous-dependencies
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.js';

// conf cors
const corsOptions = {
  origin: 'http://localhost:5000',
  optionsSuccessStatus: 200,
  credentials: true,
};

const app = express();

// Set up mongoose connection
const conn = process.env.MONGODB_URI;
async function main() {
  await mongoose.connect(conn);
}
main().catch((err) => console.log(err));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

// routes
app.use('/', authRouter);

export default app;
