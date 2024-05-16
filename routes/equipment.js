/* eslint-disable camelcase */
import express from 'express';
import { inventory_get } from '../controllers/equipmentController.js';

const router = express.Router();

router.get('/inventory', inventory_get);
router.get('/buy');

export default router;
