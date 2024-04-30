/* eslint-disable camelcase */
import express from 'express';
import { validateSignUp, validateLogIn } from '../utils/validation.js';
import {
  signUp_post,
  logIn_post,
  logOut_get,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/sign-up', validateSignUp, signUp_post);

router.post('/login', validateLogIn, logIn_post);

router.get('/logout', logOut_get);

export default router;
