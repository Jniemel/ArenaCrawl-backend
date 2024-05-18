/* eslint-disable camelcase */
import express from 'express';
import { inventory_get, buy_post } from '../controllers/equipmentController.js';

const router = express.Router();

router.get('/inventory', inventory_get);
router.post('/buy', buy_post);

export default router;
