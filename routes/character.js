/* eslint-disable camelcase */
import express from 'express';
import { getRecruits } from '../controllers/characterController.js';

const router = express.Router();

router.get('/recruits', getRecruits);

export default router;
