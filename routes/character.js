/* eslint-disable camelcase */
import express from 'express';
import { new_get, buy_post } from '../controllers/characterController.js';
import { validateChamp } from '../utils/validation.js';

const router = express.Router();

// get new recruit
router.get('/new', new_get);

// buy recruit
// #TODO add equipment to validation
router.post('/buy', validateChamp, buy_post);

export default router;
