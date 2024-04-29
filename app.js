// eslint-disable-next-line import/no-extraneous-dependencies
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.js';
import homeRouter from './routes/home.js';
import authUser from './utils/authMiddleware.js';

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

// routes
app.use('/api/auth', authRouter);
// always authenticate users on routes beyond auth
app.use(authUser);
app.use('/api/home', homeRouter);

export default app;
