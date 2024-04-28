/* eslint-disable camelcase */
import express from 'express';
import { validateSignUp, validateLogIn } from '../utils/validation.js';
import { signUp_post, logIn_post } from '../controllers/userController.js';

const router = express.Router();

/* router.get("/", function(req, res) {
    res.send({ msg: "hello" });
}); */

router.post('/sign-up', validateSignUp, signUp_post);

router.post('/login', validateLogIn, logIn_post);

export default router;
