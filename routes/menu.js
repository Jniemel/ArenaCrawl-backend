/* eslint-disable camelcase */
import express from 'express';
import checkAuth from '../controllers/menuController.js';

const router = express.Router();

router.get('/', checkAuth);

export default router;
