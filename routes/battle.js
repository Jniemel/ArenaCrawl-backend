/* eslint-disable camelcase */
import express from 'express';
import { start_get, save_post } from '../controllers/battleController.js';

const router = express.Router();

router.get('/start', start_get);
router.post('/save', /* #todo add validation */ save_post);

export default router;
