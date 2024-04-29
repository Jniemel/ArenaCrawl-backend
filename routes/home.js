/* eslint-disable camelcase */
import express from 'express';
import { getGameState } from '../controllers/homeController.js';
// import { logOut_post } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getGameState);

export default router;
