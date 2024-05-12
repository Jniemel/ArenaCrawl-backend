/* eslint-disable camelcase */
import express from 'express';
import {
  start_get,
  save_post,
  finish_post,
} from '../controllers/battleController.js';

const router = express.Router();

router.get('/start', start_get);
router.post('/save', /* #todo add validation */ save_post);
router.post('/finish' /* #todo add validation */, finish_post);

export default router;
