// eslint-disable-next-line import/no-extraneous-dependencies
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.js';
import homeRouter from './routes/home.js';
import charRouter from './routes/character.js';
import battleRouter from './routes/battle.js';
import authUser from './utils/authMiddleware.js';
import { reqSize, sendSize } from './utils/transactionSizeMiddleware.js';

// configure cors
const corsOptions = {
  origin: 'http://localhost:5000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  optionsSuccessStatus: 200,
};

const app = express();

// Set up mongoose connection
const conn = process.env.MONGODB_URI;
async function main() {
  await mongoose.connect(conn);
}
main().catch((err) => console.log(err));

// middleware
app.use(reqSize);
app.use(express.json());
app.use(sendSize);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

// routes
app.use('/api/auth', authRouter);
// authenticate user on requests on home-routes
app.use(authUser);
app.use('/api/home', homeRouter);
app.use('/api/char', charRouter);
app.use('/api/battle', battleRouter);

export default app;
