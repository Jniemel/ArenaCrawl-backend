/* eslint-disable camelcase */
import express from 'express';
import {
  start_get,
  save_post,
  finish_post,
} from '../controllers/battleController.js';
import { validateFinishGame, validateSaveGame } from '../utils/validation.js';

const router = express.Router();

router.get('/start', start_get);

// #TODO add equipment to validation
router.post('/save', validateSaveGame, save_post);
router.post('/finish', validateFinishGame, finish_post);

export default router;
