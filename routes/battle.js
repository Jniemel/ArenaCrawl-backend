/* eslint-disable camelcase */
import express from 'express';
import { start_get } from '../controllers/battleController.js';

const router = express.Router();

router.get('/start', start_get);

export default router;
