/* eslint-disable camelcase */
import express from 'express';
import { new_get, buy_post } from '../controllers/characterController.js';
import { validateChamp } from '../utils/validation.js';

const router = express.Router();

router.get('/new', new_get);
router.post('/buy', validateChamp, buy_post);

export default router;
